var Ayoba = getAyoba();

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

function startPayment() {
  var pm = "Ozow";
  var currency = document.getElementById("currency").dataset.currency;
  var amount = parseFloat(document.getElementById("currency").value);
  var description = document.getElementById("textarea").value;

  console.log(pm, amount, currency, description);

  amount && currency
    ? Ayoba.startPayment(pm, amount, currency, description)
    : null;
}

function startPaymentOverlay() {
  var currency = document.getElementById("currency").dataset.currency;
  try {
    var amount = parseFloat(document.getElementById("currency").value);
  } catch {
    return null;
  }
  var description = document.getElementById("textarea").value;

  amount && currency ? Ayoba.startPayment(amount, currency, description) : null;
}

function onPaymentStatusChanged(transactionId, status, error) {
  // let res = `Transaction ID:  ${transactionId}  Status:  ${status} Error: ${error} `;
  //  document.getElementById("txtPaymentStatusChanged").textContent = res;
  // txtPaymentStatusChanged.text = res;
}
