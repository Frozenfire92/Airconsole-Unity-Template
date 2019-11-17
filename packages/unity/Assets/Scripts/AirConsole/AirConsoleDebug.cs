using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AirConsoleDebug : MonoBehaviour
{
    public void HideInput()
    {
        AirConsoleController.instance.HideDeviceInput(true, 0);
    }

    public void ShowKeyboard()
    {
        AirConsoleController.instance.ShowDeviceKeyboard(true, 0);
    }

    public void ShowDpad()
    {
        AirConsoleController.instance.ShowDeviceDpad(true, 0);
    }

    public void ShowClickAndDrag()
    {
        AirConsoleController.instance.ShowDeviceClickAndDrag(true, 0);
    }

    public void ShowListSelet()
    {
        AirConsoleController.instance.ShowDeviceListSelect(true, 0);
    }
}
