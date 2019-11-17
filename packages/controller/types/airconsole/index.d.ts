declare global {
  namespace AirConsoleStates {

    /**
    * DeviceState contains information about a device in this session. Use the helper methods getUID, getNickname, getProfilePicture and getCustomDeviceState to access this data.
    * @interface DeviceState
    */
    interface DeviceState {
      uid: string; // The globally unique ID of the user.
      custom: string | undefined; // Custom device data that this API can set.
      nickname: string | undefined; // The nickname of the user.
      slow_connection: boolean // If the user has a high server latency.
    }


    /**
     * The configuration for the AirConsole constructor.
     * @interface Config
     */
    interface Config {
      orientation: orientation; // 	AirConsole.ORIENTATION_PORTRAIT or AirConsole.ORIENTATION_LANDSCAPE.
      synchronize_time?: boolean; // If set to true, you can call getServerTime() to get the time on the game server. Default is false.
      setup_document?: boolean; // Sets up the document so nothing is selectable, zoom is fixed to 1 and scrolling is disabled (iOS 8 clients drop out of fullscreen when scrolling). Default: true
      device_motion?: number; // If set, onDeviceMotion gets called every "device_motion" milliseconds with data from the accelerometer and the gyroscope. Only for controllers.
    }


    /**
     * HighScore contains information about a users high score We highly recommend to read the High Score guide (developers.airconsole.com)
     * @interface HighScore
     */
    interface HighScore {
      level_name: string; // The name of the level the user was playing.
      level_version: string; // The version of the level the user was playing.
      score: number; // The score the user has achieved.
      score_string: string; // A human readable version of score.
      ranks: Object; // A dictionary of rank type to actual ranks.
      data: any; // Custom High Score data. Can be used to implement Ghost modes or to verify that it is not a fake high score.
      uids: string; // The unique ID of the users that achieved the high score.
      timestamp: number; // The timestamp of the high score.
      nicknames: string; // The nicknames of the users.
      relationship: string; //  How the user relates to the current user.
      location_country_code: string; // The iso3166 country code.
      location_country_name: string; // The name of the country.
      location_region_code: string; // String	The iso3166 region CodeLine.
      location_region_name: string; // The name of the region.
      location_city_name: string; // The name of the city.
      share_url: string; // The URL that should be used to share this high score.
      share_image: string; // The URL to an image that displays this high score.
    }
  }
  class AirConsole {

    /**
     *  Your gateway object to AirConsole. There are getter and setter functions for all properties. Do not access properties of this object directly
     *
     *  opts: Constructor config.
     *  @constructor
     *  @param {opts}
     */
    constructor(opts?: AirConsoleStates.Config);


    // STATIC PROPERTIES //

    /**
     *  The device ID of the game screen.
     */
    static ORIENTATION_PORTRAIT: AirConsoleConstants.ORIENTATION_PORTRAIT;
    /**
     *  The device ID of the game screen.
     */
    static ORIENTATION_LANDSCAPE: AirConsoleConstants.ORIENTATION_LANDSCAPE;
    /**
     *  The device ID of the game screen.
     */
    static SCREEN: AirConsoleConstants.SCREEN;
    // STATIC PROPERTIES ENDS //


    // CONNECTIVITY //

    /**
     * Returns all controller device ids that have loaded your game.
     * @returns {Array<number>}
     * @memberOf AirConsole
     */
    getControllerDeviceIds(): Array<number>;

    /**
     * Returns the device_id of this device. Every device in an AirConsole session has a device_id. The screen always has device_id 0. You can use the AirConsole.
     * SCREEN constant instead of 0. All controllers also get a device_id. You can NOT assume that the device_ids of controllers are consecutive or that they start at 1.
     * DO NOT HARDCODE CONTROLLER DEVICE IDS! If you want to have a logic with "players numbers" (Player 0, Player 1, Player 2, Player 3) use the setActivePlayers helper function!.
     * You can hardcode player numbers, but not device_ids. Within an AirConsole session, devices keep the same device_id when they disconnect and reconnect.
     * Different controllers will never get the same device_id in a session. Every device_id remains reserved for the device that originally got it.
     * @returns {number}
     * @memberOf AirConsole
     */
    getDeviceId(): number;

    /**
     * Returns the device ID of the master controller. In the future, Premium devices are prioritzed.
     * @returns {(number | undefined)}
     * @memberOf AirConsole
     */
    getMasterControllerDeviceId(): number | undefined;

    /**
     * Returns the current time of the game server. This allows you to have a synchronized clock:
     * You can send the server time in a message to know exactly at what point something happened on a device.
     * This function can only be called if the AirConsole was instantiated with the "synchronize_time" opts set to true and after onReady was called.
     * Returns: Timestamp in milliseconds.
     * @returns {number}
     * @memberOf AirConsole
     */
    getServerTime(): number;

    /**
     * Gets called when a device has connected and loaded the game.
     *
     * device_id: the device ID that loaded the game.
     * @param {number} device_id
     * @memberOf AirConsole
     */
    onConnect(device_id: number): void;

    /**
     * Gets called when a device has left the game.
     *
     * device_id: the device ID that left the game.
     * @param {number} device_id
     * @memberOf AirConsole
     */
    onDisconnect(device_id: number): void;

    /**
     * Gets called when the game console is ready. This event also fires onConnect for all devices that already are connected and have loaded your game.
     * This event also fires onCustomDeviceStateChange for all devices that are connected, have loaded your game and have set a custom Device State.
     *
     * code: The AirConsole join code
     * @param {string} code
     * @memberOf AirConsole
     */
    onReady(code: string): void;
    // CONNECTIVITY ENDS //


    // MESSAGING //
    /**
    * Sends a message to all connected devices.
    * @param {*} data
    * @memberOf AirConsole
    */
    broadcast(data: any): void;

    /**
   * Sends a message to another device.
   *
   * device_id: The device ID to send the message to. If "device_id" is undefined, the message is sent to all devices (except this one).
   * @param {any} device_id
   * @param {any} data
   * @memberOf AirConsole
   */
    message(device_id: number | undefined, data: any): void;

    /**
     * Gets called when a message is received from another device that called message() or broadcast().
     * If you dont want to parse messages yourself and prefer an event driven approach
     *
     * device_id: The device ID that sent the message.
     * data: The data that was sent
     * @param {number} from
     * @param {*} data
     * @memberOf AirConsole
     */
    onMessage(device_id: number, data: any): void;
    // MESSAGES ENDS //


    // DEVICE STATE //

    /**
     * Gets the custom DeviceState of a device.
     *
     * device_id: The device ID of which you want the custom state. Default is this device.
     * @param {number} device_id
     * @memberOf AirConsole
     */
    getCustomDeviceState(device_id?: number): Object | undefined;

    /**
      * Gets called when a device updates it's custom DeviceState by calling setCustomDeviceState or setCustomDeviceStateProperty. Make sure you understand the power of device states:

      * device_id: the device ID that changed its custom DeviceState.
      * custom_data: The custom DeviceState data value
      * @param {number} device_id
      * @param {Object} custom_data
      * @memberOf AirConsole
      */
    onCustomDeviceStateChange(device_id: number, custom_data: Object): void;


    /**
     * Gets called when a device joins/leaves a game session or updates its DeviceState (custom DeviceState, profile pic, nickname, internal state).
     * This is function is also called every time onConnect, onDisconnect or onCustomDeviceStateChange, onDeviceProfileChange is called. It's like their root function.
     *
     * device_id: the device_id that changed its DeviceState.
     * user_data: the data of that device. If undefined, the device has left.
     * @param {number} device_id
     * @param {DeviceState} user_data
     *
     * @memberOf AirConsole
     */
    onDeviceStateChange(device_id: number, user_data: AirConsoleStates.DeviceState): void;

    /**
     * Sets the custom DeviceState of this device.
     *
     * data: 	The custom data to set.
     * @param {Object} data
     * @memberOf AirConsole
     */
    setCustomDeviceState(data: Object): void;


    /**
     * Sets a property in the custom DeviceState of this device.
     *
     * key: The property name.
     * value: The property value
     * @param {string} key
     * @param {*} value
     * @memberOf AirConsole
     */
    setCustomDeviceStateProperty(key: string, value: any): void;
    // DEVICE STATES ENDS //


    // PROFILE //
    /**
     * Lets the user change his nickname, profile picture and email address. If you need a real nickname of the user, use this function. onDeviceProfileChange will be called if the user logs in.
     * @memberOf AirConsole
     */
    editProfile(): void;

    /**
    * Returns the nickname of a user.
    *
    * device_id: The device id for which you want the nickname. Default is this device. Screens don't have nicknames.
    * @param {number} [device_id]
    * @returns {(string | undefined)}
    * @memberOf AirConsole
    */
    getNickname(device_id?: number): string | undefined;

    /**
     * Returns the url to a profile picture of the user.
     * device_id: The device id or uid for which you want the profile picture. Default is the current user. Screens don't have profile pictures.
     * size: The size of in pixels of the picture. Default is 64.
     * @param {(number | string)} [device_id_or_uid]
     * @param {number} [size]
     * @returns {(string | undefined)}
     * @memberOf AirConsole
     */
    getProfilePicture(device_id_or_uid?: number | string, size?: number): string | undefined;

    /**
   * Returns the globally unique id of a device.
   *
   * device_id: The device id for which you want the uid. Default is this device.
   * @param {number} [device_id]
   * @returns {(string|undefined)}
   * @memberOf AirConsole
   */
    getUID(device_id?: number): string | undefined;

    /**
    * Returns true if a user is logged in.
    *
    * device_id: The device_id of the user. Default is this device.
    * @param {number} [device_id]
    * @returns {boolean}
    * @memberOf AirConsole
    */
    isUserLoggedIn(device_id?: number): boolean;

    /**
   * Gets called when a device updates it's profile pic, nickname or email.
   * device_id: The device_id that changed its profile.
   * @param {number} device_id
   * @memberOf AirConsole
   */
    onDeviceProfileChange(device_id: number): void;

    /**
    * Gets called if the request of requestEmailAddress() was granted. For privacy reasons, you need to whitelist your game in order to receive the email address of the user.
    * To whitelist your game, contact developers@airconsole.com. For development purposes, localhost is always allowed.
    * email_address: The email address of the user if it was set.
    * @param {string|undefined} email_address
    * @memberOf AirConsole
    */
    onEmailAddress(email_address: string | undefined): void;

    /**
     * Requests the email address of this device and calls onEmailAddress iff the request was granted.
     * For privacy reasons, you need to whitelist your game in order to receive the email address of the user.
     * To whitelist your game, contact developers@airconsole.com. For development purposes, localhost is always allowed.
     * @memberOf AirConsole
     */
    requestEmailAddress(): void;
    // PROFILE ENDS //


    // ACTIVE PLAYERS //

    /**
     * Returns the player number for a device_id, if the device_id is part of the active players previously set by the screen by calling setActivePlayers.
     * Player numbers are zero based and are consecutive. If the device_id is not part of the active players, this function returns undefined.
     * @param {any} device_id
     * @returns {(number | undefined)}
     * @memberOf AirConsole
     */
    convertDeviceIdToPlayerNumber(device_id: number): number | undefined;

    /**
     * Returns the device_id of a player, if the player is part of the active players previously set by the screen by calling setActivePlayers.
     * If fewer players are in the game than the passed in player_number or the active players have not been set by the screen, this function returns undefined.
     * @param {any} player_number
     * @returns {(number | undefined)}
     * @memberOf AirConsole
     */
    convertPlayerNumberToDeviceId(player_number: number): number | undefined;

    /**
     * Returns an array of device_ids of the active players previously set by the screen by calling setActivePlayers.
     * The first device_id in the array is the first player, the second device_id in the array is the second player, ...
     * @returns {Array<number>}
     * @memberOf AirConsole
     */
    getActivePlayerDeviceIds(): Array<number>;

    /**
     * Gets called when the screen sets the active players by calling setActivePlayers().
     *
     *  player_number: The player number of this device. Can be undefined if this device is not part of the active players.
     * @param {(number | undefined)} player_number
     * @memberOf AirConsole
     */
    onActivePlayersChange(player_number: number | undefined): void;

    /**
     * Takes all currently connected controllers and assigns them a player number.
     * Can only be called by the screen. You don't have to use this helper function, but this mechanism is very convenient if you want to know which device is the first player,
     * the second player, the third player ...
     * The assigned player numbers always start with 0 and are consecutive. You can hardcode player numbers, but not device_ids.
     * Once the screen has called setActivePlayers you can get the device_id of the first player by calling convertPlayerNumberToDeviceId(0),
     * the device_id of the second player by calling convertPlayerNumberToDeviceId(1), ...
     * You can also convert device_ids to player numbers by calling convertDeviceIdToPlayerNumber(device_id).
     * You can get all device_ids that are active players by calling getActivePlayerDeviceIds().
     * The screen can call this function every time a game round starts.
     *
     * max_players: The maximum number of controllers that should get a player number assigned.
     * @param {number} max_players
     * @memberOf AirConsole
     */
    setActivePlayers(max_players: number): void;
    // ACTIVE PLAYERS ENDS //


    // CONTROLLER INPUT //

    /**
    * Gets called every X milliseconds with device motion data iff the AirConsole was instantiated with the "device_motion" opts set to the interval in milliseconds.
    * Only works for controllers. Note: Some browsers do not allow games to access accelerometer and gyroscope in an iframe (your game). So use this method if you need gyroscope or accelerometer data.
    *
    *  data: {data.x, data.y, data.z for accelerometer data.alpha, data.beta, data.gamma for gyroscope}
    * @param {Object} data
    * @memberOf AirConsole
    */
    onDeviceMotion(data: Object): void;
    // CONTROLLER INPUT ENDS //


    // ADS //
    /**
      * Gets called when an advertisement is finished or no advertisement was shown.
      * ad_was_shown: True iff an ad was shown and onAdShow was called.
      * @
      * @param {boolean} ad_was_shown
      *
      * @memberOf AirConsole
      */
    onAdComplete(ad_was_shown: boolean): void;

    /**
     * Gets called if a fullscreen advertisement is shown on this screen. In case this event gets called, please mute all sounds.
     * @memberOf AirConsole
     */
    onAdShow(): void;

    /**
     * Requests that AirConsole shows a multiscreen advertisment.
     * Can only be called by the AirConsole.SCREEN. onAdShow is called on all connected devices if an advertisement is shown (in this event please mute all sounds).
     * onAdComplete is called on all connected devices when the advertisement is complete or no advertisement was shown.
     * @memberOf AirConsole
     */
    showAd(): void;
    // ADS ENDS //

    // PREMIUM //

    /**
     * Offers the user to become a premium member. Can only be called from controllers. If you call getPremium in development mode, the device becomes premium immediately.
     * @memberOf AirConsole
     */
    getPremium(): void;

    /**
     * Returns all device ids that are premium.
     * @returns {Array<number>}
     * @memberOf AirConsole
     */
    getPremiumDeviceIds(): Array<number>;

    /**
     * Returns true if the device is premium
     *
     *  device_id: The device_id that should be checked. Only controllers can be premium. Default is this device.
     * @param {number} [device_id]
     * @returns {(boolean | undefined)}
     * @memberOf AirConsole
     */
    isPremium(device_id?: number): boolean | undefined;

    /**
     * Gets called when a device becomes premium or when a premium device connects.
     * @param {number} device_id
     * @memberOf AirConsole
     */
    onPremium(device_id: number): void;
    // PREMIUM ENDS //


    // NAVIGATION //

    /**
     * Request that all devices return to the AirConsole store.
     * @memberOf AirConsole
     */
    navigateHome(): void;

    /**
   * Request that all devices load a game by url.
   *
   * url: The base url of the game to navigate to (excluding screen.html or controller.html).
   * @param {string} url
   * @memberOf AirConsole
   */
    navigateTo(url: string): void;

    /**
     * Opens url in external (default-system) browser. Call this method instead of calling window.open. In-App it will open the system's default browser.
     * Because of Safari iOS you can only use it with the onclick handler:
     * Open browser
     * OR in JS with assigning element.onclick.
     * url: The url to open
     * @param {string} url
     * @memberOf AirConsole
     */
    openExternalUrl(url: string): void;
    // NAVIGATION ENDS //


    // USER INTERFACE //

    /**
      *  Sets the device orientation.
      *  @param orientation {string} AirConsole.ORIENTATION_PORTRAIT or AirConsole.ORIENTATION_LANDSCAPE.
      */
    setOrientation(orientation: orientation): void;

    /**
   *  Shows or hides the default UI.
   *  @param visible {boolean} Whether to show or hide the default UI.
   */
    showDefaultUI(visible: boolean): void;
    // USER INTERFACE ENDS //

    // PERSISTENT DATA //

    /**
     * Gets called when persistent data was loaded from requestPersistentData().
     *
     * data: An object mapping uids to all key value pairs.
     * @param {Object} data
     * @memberOf AirConsole
     */
    onPersistentDataLoaded(data: Object): void;

    /**
     * Gets called when persistent data was stored from storePersistentData().
     *
     * uid: The uid for which the data was stored.
     * @param {string} uid
     * @memberOf AirConsole
     */
    onPersistentDataStored(uid: string): void;

    /**
     * Requests persistent data from the servers.
     * uids: The uids for which you would like to request the persistent data. Default is the uid of this device.
     * @param {Array<string>} [uids]
     * @memberOf AirConsole
     */
    requestPersistentData(uids?: Array<string>): void;

    /**
     * Stores a key-value pair persistently on the AirConsole servers. Storage is per game. Total storage can not exceed 1 MB per game and uid.
     * Storage is public, not secure and anyone can request and tamper with it. Do not store sensitive data.
     *
     * key: The key of the data entry.
     * value: The value of the data entry.
     * uid: The uid for which the data should be stored. Default is the uid of this device.
     * @param {string} key
     * @param {*} value
     * @param {string} [uid]
     * @memberOf AirConsole
     */
    storePersistentData(key: string, value: any, uid?: string): void;
    // PERSISTENT DATA ENDS //


    // HIGH SCORES //

    /**
     * Gets called when high scores are returned after calling requestHighScores. We highly recommend to read the High Score guide (developers.airconsole.com)
     * @param {Array<HighScore>} high_scores
     * @memberOf AirConsole
     */
    onHighScores(high_scores: Array<AirConsoleStates.HighScore>): void;

    /**
     * Gets called when a high score was successfully stored. We highly recommend to read the High Score guide
     * The stored high score if it is a new best for the user or else null. Ranks include "world", "country", "region", "city" if a high score is passed.
     * @param {HighScore} high_score
     * @memberOf AirConsole
     */
    onHighScoreStored(high_score: AirConsoleStates.HighScore | null): void;


    /**
     * Requests high score data of players (including global high scores and friends). Will call onHighScores when data was received.
     *
     * level_name: The name of the level.
     * level_version: The version of the level.
     * uids: An array of UIDs of the users that should be included in the result. Default is all connected controllers.
     * ranks: An array of high score rank types. High score rank types can include data from across the world, only a specific area or a users friends. Valid array entries are "world", "country", "region", "city", "friends". Default is ["world"].
     * total: Amount of high scores to return per rank type. Default is 8.
     * top: Amount of top high scores to return per rank type. top is part of total. Default is 5.
     * @param {string} level_name
     * @param {string} level_version
     * @param {Array<string>} [uids]
     * @param {Array<string>} [ranks]
     * @param {number} [total]
     * @param {number} [top]
     * @memberOf AirConsole
     */
    requestHighScores(level_name: string, level_version: string, uids?: Array<string>, ranks?: Array<string>, total?: number, top?: number): void;

    /**
     * Stores a high score of the current user on the AirConsole servers. High Scores are public, not secure and anyone can request and tamper with them. Do not store sensitive data.
     * Only updates the high score if it was a higher or same score. Calls onHighScoreStored when the request is done.
     *
     * level_name: The name of the level the user was playing. This should be a human readable string because it appears in the high score sharing image. You can also just pass an empty string.
     * level_version:	The version of the level the user was playing. This is for your internal use.
     * score: The score the user has achieved.
     * uid: The UIDs of the users that achieved the high score. Can be a single uid or an array of uids. Default is the uid of this device.
     * data: Custom high score data (e.g. can be used to implement Ghost modes or include data to verify that it is not a fake high score).
     * score_string: A short human readable representation of the score. (e.g. "4 points in 3s"). Defaults to "X points" where x is the score converted to an integer.
     * @param {string} level_name
     * @param {string} level_version
     * @param {number} score
     * @param {(string | Array<string>)} [uid]
     * @param {*} [data]
     * @param {string} [score_string]
     * @memberOf AirConsole
     */
    storeHighScore(level_name: string, level_version: string, score: number, uid?: string | Array<string>, data?: any, score_string?: string): void;
  }
  class AirConsoleKeyboard {
    constructor(element_id: string)
    bind(element_id: string, options: AirConsoleKeyboardBindOptions): void
    hide(): void
  }
  interface AirConsoleKeyboardBindOptions {
    onHide?: (_input_id: string, text: string) => void
    onChange?: (_input_id: string, text: string) => void
  }
  class SwipeAnalog {
    constructor(element: Element | string, options: AirConsoleSwipeAnalogOptions)
  }
  interface AirConsoleSwipeAnalogOptions {
    touchstart?: () => void
    touchmove?: (event: any) => void
    touchend?: (event: any) => void
    min_swipe_distance?: number
  }
}

type orientation = AirConsoleConstants.ORIENTATION_LANDSCAPE | AirConsoleConstants.ORIENTATION_PORTRAIT;

declare enum AirConsoleConstants {

  ORIENTATION_PORTRAIT = 0,
  ORIENTATION_LANDSCAPE = 1,
  SCREEN = 2
}

export { }
