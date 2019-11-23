using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

using NDream.AirConsole;
using Newtonsoft.Json.Linq;

public enum AirConsoleControllerState
{
    Loading,
    Spectating,
    Help,
    Ready,
    PressAnywhere
}

public enum AirConsoleControllerInput
{
    Keyboard,
    Dpad,
    ClickAndDrag,
    ListSelect,
}

public enum AirConsoleControllerDpadButton
{
    Up,
    Right,
    Down,
    Left,
    Center
}

public enum AirConsoleControllerClickAndDragInputType
{
    Move,
    End
}

[RequireComponent(typeof(AirConsole))]
public class AirConsoleController : MonoBehaviour
{
    public static AirConsoleController instance;

    #region MonoBehaviour
    private void Awake()
    {
        if (instance == null) instance = this;
        else Destroy(this);
    }
    void OnEnable()
    {
        AirConsole.instance.onReady += OnReady;
        AirConsole.instance.onMessage += OnMessage;
        AirConsole.instance.onConnect += OnConnect;
        AirConsole.instance.onDisconnect += OnDisconnect;
        AirConsole.instance.onDeviceStateChange += OnDeviceStateChange;
        AirConsole.instance.onCustomDeviceStateChange += OnCustomDeviceStateChange;
        AirConsole.instance.onDeviceProfileChange += OnDeviceProfileChange;
        AirConsole.instance.onAdShow += OnAdShow;
        AirConsole.instance.onAdComplete += OnAdComplete;
        AirConsole.instance.onGameEnd += OnGameEnd;
        AirConsole.instance.onPremium += OnPremium;
    }

    void OnDisable()
    {
        AirConsole.instance.onReady -= OnReady;
        AirConsole.instance.onMessage -= OnMessage;
        AirConsole.instance.onConnect -= OnConnect;
        AirConsole.instance.onDisconnect -= OnDisconnect;
        AirConsole.instance.onDeviceStateChange -= OnDeviceStateChange;
        AirConsole.instance.onCustomDeviceStateChange -= OnCustomDeviceStateChange;
        AirConsole.instance.onDeviceProfileChange -= OnDeviceProfileChange;
        AirConsole.instance.onAdShow -= OnAdShow;
        AirConsole.instance.onAdComplete -= OnAdComplete;
        AirConsole.instance.onGameEnd -= OnGameEnd;
        AirConsole.instance.onPremium -= OnPremium;
    }
    #endregion

    #region AirConsole Message Handlers
    void OnReady(string code)
    {
        Debug.Log("AirConsole is ready " + code);
    }

    void OnMessage(int from, JToken data)
    {
        int action = (int)data["a"];
        Debug.Log("ActionHandler from device " + from + ", action " + action);
        switch (action)
        {
            case 0: // Press anywhere
                Debug.Log("Device " + from + " pressed anywhere");
                SetDeviceState(false, from, AirConsoleControllerState.Ready);
                SetDeviceMessage(false, from, "Watch the screen");
                SetDeviceButtonState(false, from, true, true);
                SetDeviceColor(from, Color.grey, Color.red);
                StartCoroutine(GetAndSetProfilePic(from));
                break;
            case 1: // Make sound
                Debug.Log("Device " + from + " made noise");
                break;
            case 2: // Open/close help modal
                if ((bool)data["o"])
                {
                    Debug.Log("Device " + from + " wants to open help modal");
                    SetDeviceState(false, from, AirConsoleControllerState.Help);
                }
                else
                {
                    Debug.Log("Device " + from + " wants to close help modal");
                    SetDeviceState(false, from, AirConsoleControllerState.Ready);
                }
                break;
            case 3: // input
                switch ((AirConsoleControllerInput)(int)data["i"])
                {
                    case AirConsoleControllerInput.Keyboard:
                        string userInput = (string)data["d"]["s"];
                        bool final = (bool)data["d"]["f"];
                        if (final) Debug.Log("Device " + from + " keyboard closed, input: " + userInput);
                        else Debug.Log("Device " + from + " keyboard typed, input: " + userInput);
                        break;
                    case AirConsoleControllerInput.Dpad:
                        bool down = (bool)data["d"]["d"];
                        AirConsoleControllerDpadButton dir = (AirConsoleControllerDpadButton)((int)data["d"]["dr"]);
                        Debug.Log("Device " + from + " dpad " + (int)dir + (down ? " pressed" : " released"));
                        break;
                    case AirConsoleControllerInput.ClickAndDrag:
                        AirConsoleControllerClickAndDragInputType type = (AirConsoleControllerClickAndDragInputType)((int)data["d"]["t"]);
                        float distance = (float)data["d"]["d"];
                        float angle = (float)data["d"]["a"];
                        Debug.Log("Device " + from + " click and drag " + (int)type + " distance " + distance + " angle " + angle);
                        break;
                    case AirConsoleControllerInput.ListSelect:
                        int selectedIndex = (int)data["d"]["i"];
                        bool finalChoice = (bool)data["d"]["f"];
                        Debug.Log("Device " + from + " selected list item index " + selectedIndex + " it was" + (finalChoice ? "" : " not") + " their final choice");
                        break;
                    default:
                        break;
                }
                break;
            default:
                Debug.Log("Device " + from + " unknown action " + action);
                break;
        }
    }

    void OnConnect(int device_id)
    {
        Debug.Log("Device: " + device_id + " connected.");
        
        // If a controller connects after starting, put it to spectating
        if (AirConsole.instance.GetCustomDeviceState() != null && (bool)AirConsole.instance.GetCustomDeviceState()["loaded"] && (bool)AirConsole.instance.GetCustomDeviceState()["canJoin"])
        {
            SetDeviceState(false, device_id, AirConsoleControllerState.PressAnywhere);
            SetDeviceMessage(false, device_id, "Tap when ready");
        }
    }

    void OnDisconnect(int device_id)
    {
        //Debug.Log("Device: " + device_id + " disconnected.");
    }

    void OnDeviceStateChange(int device_id, JToken data)
    {
        //Debug.Log("Device State Change on device: " + device_id + ", data: " + data);
    }

    void OnCustomDeviceStateChange(int device_id, JToken custom_data)
    {
        //Debug.Log("Custom Device State Change on device: " + device_id + ", data: " + custom_data);
    }

    void OnDeviceProfileChange(int device_id)
    {
        //Debug.Log("Device " + device_id + " made changes to its profile.");
    }

    void OnAdShow()
    {
        //Debug.Log("On Ad Show \n \n");
    }

    void OnAdComplete(bool adWasShown)
    {
        //Debug.Log("Ad Complete. Ad was shown: " + adWasShown);
    }

    void OnGameEnd()
    {
        //Debug.Log("OnGameEnd is called");
        // Mute all sounds, stop animations, etc
        //Camera.main.enabled = false;
        //Time.timeScale = 0.0f;
    }

    void OnPremium(int device_id)
    {
        //Debug.Log("On Premium (device " + device_id + ")");
    }
    #endregion

    #region Game State Methods
    public void GameReady()
    {
        AirConsole.instance.SetCustomDeviceState(new
        {
            loaded = true,
            canJoin = true
        });
        SetDeviceState(true, 0, AirConsoleControllerState.PressAnywhere);
        SetDeviceMessage(true, 0, "Tap when ready");
    }

    public void GameFull()
    {
        AirConsole.instance.SetCustomDeviceStateProperty("canJoin", false);
    }
    #endregion

    #region Controller Methods
    public void ShowDeviceInput(bool all, int device, AirConsoleControllerInput input)
    {
        object m = new
        {
            a = 4,
            i = (int)input
        };
        if (all) AirConsole.instance.Broadcast(m);
        else AirConsole.instance.Message(device, m);
    }

    public void HideDeviceInput(bool all, int device)
    {
        object m = new
        {
            a = 4,
            i = -1
        };

        if (all) AirConsole.instance.Broadcast(m);
        else AirConsole.instance.Message(device, m);
    }

    public void SetDeviceState(bool all, int device, AirConsoleControllerState state)
    {
        object m = new
        {
            a = 0,
            s = (int)state
        };

        if (all) AirConsole.instance.Broadcast(m);
        else AirConsole.instance.Message(device, m);
    }

    public void SetDeviceColor(int device, Color color, Color backgroundColor)
    {
        AirConsole.instance.Message(device, new
        {
            a = 1,
            r = (int)(color.r * 255f),
            g = (int)(color.g * 255f),
            b = (int)(color.b * 255f),
            bgr = (int)(backgroundColor.r * 255),
            bgg = (int)(backgroundColor.g * 255),
            bgb = (int)(backgroundColor.b * 255)
        });
    }

    public void SetDeviceMessage(bool all, int device, string message = null)
    {
        object m = new
        {
            a = 2,
            m = message
        };
        if (all) AirConsole.instance.Broadcast(m);
        else AirConsole.instance.Message(device, m);
    }

    public void SetDeviceButtonState(bool all, int device, bool canShowHelpButton, bool canShowSoundButton)
    {
        object m = new
        {
            a = 3,
            h = canShowHelpButton,
            so = canShowSoundButton
        };
        if (all) AirConsole.instance.Broadcast(m);
        else AirConsole.instance.Message(device, m);
    }
    #endregion

    #region Controller Input Helpers
    public void ShowDeviceKeyboard(bool all, int device)
    {
        SetDeviceMessage(all, device);
        ShowDeviceInput(all, device, AirConsoleControllerInput.Keyboard);
    }

    public void ShowDeviceDpad(bool all, int device)
    {
        ShowDeviceInput(all, device, AirConsoleControllerInput.Dpad);
    }

    public void ShowDeviceClickAndDrag(bool all, int device)
    {
        ShowDeviceInput(all, device, AirConsoleControllerInput.ClickAndDrag);
    }

    public void ShowDeviceListSelect(bool all, int device)
    {
        SetDeviceMessage(true, 0);

        object m = new
        {
            a = 4,
            i = (int)AirConsoleControllerInput.ListSelect,
            d = new[] { "Red", "Green", "Blue", "Yellow" }
        };

        if (all) AirConsole.instance.Broadcast(m);
        else AirConsole.instance.Message(device, m);
    }
    #endregion

    private IEnumerator GetAndSetProfilePic(int deviceId)
    {
        // Start a download of the given URL
        //UnityWebRequest www = UnityWebR
        UnityWebRequest www = UnityWebRequestTexture.GetTexture(AirConsole.instance.GetProfilePicture(deviceId, 512));

        // Wait for download to complete
        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }

        // assign texture
        Texture2D texture = DownloadHandlerTexture.GetContent(www);
        Sprite sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), new Vector2(0, 0));

        PlayerCanvas.instance.AddPlayerProfilePanel(new PlayerProfileInfo(deviceId, AirConsole.instance.GetNickname(deviceId), sprite));
    }
}
