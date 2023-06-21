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
  let inputCurrency = document.getElementById("currency_" + title);
  let pm = "Ozow";
  let currency = inputCurrency.dataset.currency;
  let amount = parseFloat(inputCurrency.value);
  let description = document.getElementById("textarea").value;

  return amount > 0 && currency ? Ayoba.startPayment(pm, amount, currency, description) : null;
}

function startPaymentOverlay(title) {
  let currency = document.getElementById("currency_" + title);
  let amount = "";
  try {
    amount = parseFloat(currency.value);
  } catch {
    return null;
  }
  let description = document.getElementById("textarea_" + title).value;
  console.log(currency, amount, description)
  return amount > 0 && currency ? Ayoba.startPayment(amount, currency.dataset.currency, description) : null;
}

function onPaymentStatusChanged(transactionId, status, error) {
  // let res = `Transaction ID:  ${transactionId}  Status:  ${status} Error: ${error} `;
  //  document.getElementById("txtPaymentStatusChanged").textContent = res;
  // txtPaymentStatusChanged.text = res;
}
