using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerCanvas : MonoBehaviour
{
    public static PlayerCanvas instance;

    public GameObject playerProfilePanelPrefab, playerProfilePanelParent;
    public List<PlayerProfilePanel> playerProfilePanels;

    public void Awake()
    {
        instance = this;
        playerProfilePanels = new List<PlayerProfilePanel>();
    }

    public void AddNewPlayerProfilePanel(PlayerProfileInfo playerProfileInfo)
    {
        PlayerProfilePanel panel = GetNextProfilePanel();
        panel.Setup(playerProfileInfo);
        panel.gameObject.SetActive(true);
    }

    public void AddPlayerProfilePanel(PlayerProfileInfo playerProfileInfo)
    {
        Debug.Log("Add player profile panel");
        if (!PanelsContainsInfo(playerProfileInfo)) AddNewPlayerProfilePanel(playerProfileInfo);
    }

    public void RemovePlayerProfilePanel(PlayerProfileInfo playerProfileInfo)
    {
        if (PanelsContainsInfo(playerProfileInfo)) RemovePanel(playerProfileInfo);
    }

    public void RemovePanel(PlayerProfileInfo playerProfileInfo)
    {
        for (int i = 0; i < playerProfilePanels.Count; i++)
        {
            if (playerProfilePanels[i].playerProfileInfo.id == playerProfileInfo.id) playerProfilePanels.RemoveAt(i);
        }
    }

    public bool PanelsContainsInfo(PlayerProfileInfo playerProfileInfo)
    {
        for (int i = 0; i < playerProfilePanels.Count; i++)
        {
            if (playerProfilePanels[i].playerProfileInfo.id == playerProfileInfo.id) return true;
        }

        return false;
    }

    PlayerProfilePanel GetNextProfilePanel()
    {
        for (int i = 0; i < playerProfilePanels.Count; i++)
        {
            if (!playerProfilePanels[i].gameObject.activeInHierarchy) return playerProfilePanels[i];
        }

        PlayerProfilePanel panel = Instantiate<GameObject>(playerProfilePanelPrefab, playerProfilePanelParent.transform).GetComponent<PlayerProfilePanel>();
        panel.gameObject.SetActive(false);
        playerProfilePanels.Add(panel);
        return panel;
    }
}
