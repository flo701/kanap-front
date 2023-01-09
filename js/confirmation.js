/**
 * Get orderId from URL :
 */
 const orderId = new URLSearchParams(window.location.search).get("id");

 // ------------------------------------------------------------------------
 /**
  * Display orderId :
  */
 document.getElementById("orderId").textContent = orderId;
 
 // ------------------------------------------------------------------------
 /**
  * Create a "thank-you" message :
  */
 const thankYou = document.createElement("div");
 thankYou.textContent = "KANAP vous remercie pour votre commande";
 
 document.querySelector(".confirmation").appendChild(thankYou);
 
 document.querySelector(".confirmation").style.flexDirection = `column`;
 document.querySelector(".confirmation").style.textAlign = `center`;
 document.querySelector(".confirmation").style.fontSize = `18px`;
 
 // -----------------------------------------------------------------------
 /**
  * Clear local storage :
  */
 localStorage.clear();
