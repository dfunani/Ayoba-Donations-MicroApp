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
    var pm = 'Ozow';
    var currency = "ZAR";
    var amount = parseFloat(10);
    var description = 'donation';

    console.log(pm, amount, currency, description);

    Ayoba.startPayment(pm, amount, currency, description);
}


function startPaymentOverlay() {
    var currency = "ZAR";
    var amount = parseFloat(10);
    var description = 'donation';

    console.log(amount, currency, description);

    Ayoba.startPayment(amount, currency, description);
}


function onPaymentStatusChanged(transactionId, status, error) {
    // let res = `Transaction ID:  ${transactionId}  Status:  ${status} Error: ${error} `;
    //  document.getElementById("txtPaymentStatusChanged").textContent = res;
    // txtPaymentStatusChanged.text = res;
}
