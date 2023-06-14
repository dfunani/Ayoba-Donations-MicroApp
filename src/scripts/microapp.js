/**
 * A boilerplate microapp for ayoba that implements a stub interface and debug logging on the page
 */
var debug = false;
var ready = false;
var context;
var appcontext;
// This is the magic line that pushes error event to the magic console
window.onerror = function (msg, url, line, col, error) {
  console.log(msg, url, line, col, error);
};
var Ayoba = getAyoba();
// Let's wait for the page to load before doing anything
window.onload = function afterpagedLoad() {
  context = getURLParameter("context");
  debug = getURLParameter("debug");
  if (debug) {
    console.log("Debug mode: " + debug);
    document.getElementById("log-container").hidden = false;
    console.log("Hosted at: " + window.location.href);
  }
  if (!Ayoba) {
    console.log(
      "Development Context..."
    );
    Ayoba = new AyobaStub();
    Ayoba.triggerNicknameChanged();
  } else {
    console.log("Production Context...");
    start()
  }
  
};

/**
 * This function ensures that the console output is visible to the user on the page for debugging purposes
 */
(function (logger) {
  console.old = console.log;
  console.log = function () {
    var output = "",
      arg,
      i;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      output += '<span class="log-' + typeof arg + '">';

      if (
        typeof arg === "object" &&
        typeof JSON === "object" &&
        typeof JSON.stringify === "function"
      ) {
        output += JSON.stringify(arg);
      } else {
        output += arg;
      }

      output += "</span>&nbsp;";
    }

    logger.innerHTML += output + "<br>";
    console.old.apply(undefined, arguments);
  };
})(document.getElementById("logger"));

/**
 * Checks if the microapp is running inside ayoba and on which OS
 * returns the OS name or null if not running inside ayoba
 */
function getAyoba() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return null;
  }

  if (/android/i.test(userAgent)) {
    try {
      return Android;
    } catch (error) {
      return null;
    }
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return null;
  }

  return null;
}

/**
 * Get URL Query Parameters
 * De-Constructs http(s)://www.webpage.com/resource-page?search-string
 * Returns the value for the param in the query string matching the argument param
 */
function getURLParameter(param) {
  // Window.Location returns an Object with a search key ?query-param1=value1&query-param2=value2...
  let paramString = window.location.search.substring(1);
  // From the second char of the query param split by "&" delimiter
  let queryParams = paramString.split("&");

  for (let i = 0; i < queryParams.length; i++) {
    let paramKeyValuePair = queryParams[i].split("=");
    if (paramKeyValuePair.length < 2) continue;
    if (paramKeyValuePair[0] === param) {
      return paramKeyValuePair[1];
    }
  }
}

function startPaymentOverlay(){
  const [amount, currency, description] = [100, "ZAR", "Donation Testing"]
  Ayoba.startPayment(amount, currency, description)
}

// /**
//  * This function is called when the microapp is loaded and ready to be used
//  */
// function start() {
//   //Now that presence is updated and Ayoba is initialised, let's try calling a few functions
//   ready = true;
//   console.log("Storing User Context...");
//   if (Object.getOwnPropertyNames(Ayoba).includes("getSelfJid")) {
//     console.log("User ID: " + getSelfJid());
//   }
//   if (Object.getOwnPropertyNames(Ayoba).includes("getMsisdn")) {
//     console.log("User Number: " + getMsisdn());
//   }
//   if (Object.getOwnPropertyNames(Ayoba).includes("getCountry")) {
//     console.log("User Country: " + getCountry());
//   }
//   if (Object.getOwnPropertyNames(Ayoba).includes("getLanguage")) {
//     console.log("User Language: " + getLanguage());
//   }
// }

// /**
//  * This function is called to close the microapp
//  */
// function finish() {
//   console.log(Ayoba.finish());
// }

// function sendMessage() {
//   Ayoba.sendMessage(document.getElementById("inputText").value);
// }

// function composeMessage() {
//   Ayoba.composeMessage(document.getElementById("inputText").value);
// }

// function copyMessage(theIndex) {
//   var strInputCode = document.getElementById(theIndex).innerHTML;
//   var cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "\n");
//   const el = document.createElement("textarea");
//   el.value = cleanText;
//   document.body.appendChild(el);
//   el.select();
//   document.execCommand("copy");
//   document.body.removeChild(el);
// }

// function sendMedia() {
//   Ayoba.sendMedia(
//     "https://i.ytimg.com/vi/d5PP4vIX7P8/maxresdefault.jpg",
//     "image/jpg"
//   );
// }

// function sendLocation() {
//   Ayoba.sendLocation(
//     document.getElementById("inputTextLat").value,
//     document.getElementById("inputTextLon").value
//   );
// }

// function getCountry() {
//   var country = Ayoba.getCountry();
//   document.getElementById("countryText").textContent = country;
//   return country;
// }

// function getMsisdn() {
//   var msisdn = Ayoba.getMsisdn();
//   document.getElementById("msisdnText").textContent = msisdn;
//   return msisdn;
// }


// function getSelfJid() {
//   var jid = Ayoba.getSelfJid();
//   document.getElementById("selfjidText").textContent = jid;
//   return jid;
// }

// function getCanSendMessage() {
//   var canSendMessage = Ayoba.getCanSendMessage();
//   document.getElementById("cansendText").textContent = canSendMessage;
//   return canSendMessage;
// }

// function getLanguage() {
//   var language = Ayoba.getLanguage();
//   document.getElementById("languageText").textContent = language;
//   return language;
// }

// function getSelfJidFromUrl() {
//   var selfJid = getURLParameter("jid");
//   document.getElementById("selfjidText").textContent = selfJid;
//   return selfJid;
// }

// /*
//  * The Ayoba native interface calls this method every time
//  * the app receives a new location event.
//  *
//  * Remember this listener will only be called when the native
//  * permission is accepted by the user.
//  *
//  * In some border cases, also can receive lat=0.0, lon=0.0. Most of
//  * cases, will mean Ayoba cannot retrieve the GPS coordinates.
//  */
// function onLocationChanged(lat, lon) {
//   document.getElementById("locationInputText").textContent = lat + ", " + lon;
//   console.log("Event: location changed, lat: " + lat + ", lon: " + lon);
// }

// /*
//  * The Ayoba native interface calls this method every time
//  * the user profile changes (nickname or avatar)
//  */
// function onProfileChanged(nickname, avatarPath) {
//   document.getElementById("nicknameInputText").textContent = nickname;
//   document.getElementById("avatarImage").src = avatarPath;
//   console.log(
//     "Event: profile changed, nickname: " +
//       nickname +
//       ", avatar path: " +
//       avatarPath
//   );
// }

// /*
//  * The Ayoba native interface calls this method every time
//  * the user nickname changes (infact, always online)
//  */
// function onNicknameChanged(nickname) {
//   document.getElementById("nicknameInputText").textContent = nickname;
//   console.log(nickname + " is the Current User");
//   //Only call start the 1st time the app is loaded
//   if (!ready) {
//     start();
//   }
// }

// /*
//  * The Ayoba native interface calls this method every time
//  * the user presence changes (infact, always online)
//  */
// function onPresenceChanged(presence) {
//   document.getElementById("presenceInputText").textContent = presence;
//   console.log("Event: presence changed: " + presence);
// }

// /*
//  * The Ayoba native interface calls this method every time
//  * the user avatar changes (infact, always online)
//  */
// function onAvatarChanged(avatar) {
//   document.getElementById("avatarImage").src = avatar;
//   console.log("Event: avatar changed: " + avatar);
// }

// /*
//  * This method should be implemented to retrieve the "sendMedia(...)" result
//  *
//  * @param {int} responseCode: result code
//  *  0: the location could not be sent
//  *  1: the location has been sent successfully
//  * @param encodedUrl: Base64 encoded media file’s url
//  */
// function onMediaSentResponse(responseCode, encodedUrl) {
//   document.getElementById("inputText").value =
//     responseCode + " - " + encodedUrl;
//   console.log(
//     "Event: media sent, response code: " + responseCode + " URL: " + encodedUrl
//   );
// }

// /*
//  * This method should be implemented to retrieve the "sendLocation(...)" result
//  *
//  * @param {int} responseCode: result code
//  *  0: the location could not be sent
//  *  1: the location has been sent successfully
//  */
// function onLocationSentResponse(responseCode) {
//   document.getElementById("inputText").value = responseCode;
// }

// function getContactJid() {
//   var contactJid = getURLParameter("contactjid");
//   document.getElementById("inputText").value = contactJid;
//   return contactJid;
// }

// function getContactName() {
//   var contactName = getURLParameter("contactname");
//   document.getElementById("inputText").value = contactName;
//   return contactName;
// }

// function getContacts() {
//   var contactsJson = Ayoba.getContacts();
//   document.getElementById("inputText").value = contactsJson;
//   return contactsJson;
// }

// function takePicture() {
//   var responseCode = Ayoba.takePicture();
//   return responseCode;
// }

// /*
//  * This method should be implemented to retrieve the "sendPicture(...)" result
//  *
//  * @param {int} responseCode: result code
//  *  0: the picture could not be taken
//  *  1: the picture has been taken successfully
//  */
// function onPictureRetrievedResponse(responseCode, picturePath) {
//   document.getElementById("inputText").value = responseCode;
//   document.getElementById("pictureRetrieved").src = picturePath;
// }

// /*
//  * Starts a conversation with a user using his JID
//  */
// function startConversation() {
//   Ayoba.startConversation(
//     "07aaf1be5b25b7c8c6a89159bc849e1d37ca7d1c@dev.ayoba.me"
//   );
// }

// function getFile() {
//   var responseCode = Ayoba.getFile();
//   return responseCode;
// }

// /*
//  * This method should be implemented to retrieve the "sendFileRetrievedResponse(...)" result
//  *
//  * @param {int} responseCode: result code
//  *  -1: the file could not be retrieved
//  *  1: the file has retrieved successfully
//  * @param {String} filePath: user selected files paths array
//  */
// function onFileRetrievedResponse(responseCode, filePath) {
//   document.getElementById("inputText").value = responseCode
//     .concat(" - ")
//     .concat(filePath);
//   document.getElementById("pictureRetrieved").src = filePath;
// }

