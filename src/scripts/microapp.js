var Ayoba = getAyoba();
var TITLE = "";
var donateBTN = null
var toastElem = null;
var toastBody = null;
var paymentStatus = "";

/**
 * Determine the mobile operating system and returns the
 * proper javascript interface
 */
function getAyoba() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return null;
  }

  if (/android/i.test(userAgent)) {
    return Android;
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return null; // todo
  }

  return "unknown";
}

// ============================================================= FUNCTIONS ============================================================================

function startPayment(title) {
  let inputCurrency = document.getElementById("currency_" + title);
  let pm = "Ozow";
  let currency = inputCurrency.dataset.currency;
  let amount = parseFloat(inputCurrency.value);
  let description = document.getElementById("textarea").value;

  return amount > 0 && currency
    ? Ayoba.startPayment(pm, amount, currency, description)
    : null;
}

function startPaymentOverlay(title) {
  TITLE = title;
  let currency = document.getElementById("currency_" + title);
  let tag = document.querySelector(".tag_" + title);
  let amount = "";
  toastElem = document.getElementById("toast_" + title);
  toastBody = document.getElementById("toast_body_" + title);
  const toast = new bootstrap.Toast(toastElem);
  donateBTN = document.getElementById("payment_" + title);

  try {
    amount = parseFloat(currency.value);
  } catch {
    toastBody.innerHTML = "Currency Amount must be decimal";
    toast.show();
    return null;
  }

  let description = document.getElementById("textarea_" + title).value;

  if (amount > 0 && currency.dataset.currency) {
    try {
      Ayoba.startPayment(amount, currency.dataset.currency, description);
      donateBTN.disabled = true;
    } catch {
      toastBody.innerHTML = "Could not connect to Ozow";
      toast.show();
    }
  } else {
    toastBody.innerHTML = "Please Provide a valid Amount and Currency";
    toast.show();
  }
}
function onPaymentStatusChanged(transactionId, status, error) {
  let res = `Transaction ID: ${transactionId}, Status: ${status}, Error: ${error}`;
  paymentStatus = status;
  const regSuccess = new RegExp("Success", "i");
  const regProgress = new RegExp("In progress", "i");
  console.log(res);
  const toast = new bootstrap.Toast(toastElem);
  // donateBTN.disabled = true;
  if (!regSuccess.test(status) && !regProgress.test(status)) {
    toastBody.innerHTML = "Request was Unsuccessful";
    donateBTN.disabled = false;
    toast.show();
  } else if (regSuccess.test(status)) {
    donateBTN.disabled = false;
    window.location.href = "success.html";
    TITLE = "";
  }
}

function getPaymentStatus() {
  console.log("Payment Status: " + paymentStatus);
}
console.log("Out side Payment Status: " + paymentStatus);

getPaymentStatus();
function getCountry() {
  try {
    return Ayoba.getCountry();
  } catch {
    return "ZA";
  }
}
