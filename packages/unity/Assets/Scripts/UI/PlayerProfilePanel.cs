using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

[System.Serializable]
public class PlayerProfileInfo
{
    public PlayerProfileInfo() { }
    public PlayerProfileInfo(int id, string name, Sprite profileImage)
    {
        this.id = id;
        this.name = name;
        this.profileImage = profileImage;
    }
    public int id;
    public string name;
    public Sprite profileImage;
}

public class PlayerProfilePanel : MonoBehaviour
{
    public PlayerProfileInfo playerProfileInfo;

    public Text nameText;
    public Image profileImage;

    public void Setup(PlayerProfileInfo playerProfileInfo)
    {
        this.playerProfileInfo = playerProfileInfo;
        nameText.text = playerProfileInfo.name;
        profileImage.sprite = playerProfileInfo.profileImage;
    }
}
