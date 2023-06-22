var Ayoba = getAyoba();
let TITLE = "";
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
  const toastElem = document.getElementById("toast_" + title);
  const toastBody = document.getElementById("toast_body_" + title);
  const toast = new bootstrap.Toast(toastElem);

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
  const regSuccess = new RegExp("success", "i");
  const regProgress = new RegExp("progress", "i");
  const toastElem = document.getElementById("toast_" + TITLE);
  const toastBody = document.getElementById("toast_body_" + TITLE);
  const toast = new bootstrap.Toast(toastElem);
  console.log(res)
  if (!regSuccess.test(status) && !regProgress.test(status)) {
    toastBody.innerHTML = "Request was Unsuccessful"
    toast.show()
  }
  else if(regSuccess.test(status)){
    window.location.href = "success.html";
    TITLE = ""
  }
}

function getCountry() {
  try {
    return Ayoba.getCountry();
  } catch {
    return "ZA";
  }
}
