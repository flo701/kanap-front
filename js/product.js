/**
 * Get product id from URL
 */
 const params = new URLSearchParams(window.location.search);
 const productId = params.get("id");
 
 // -------------------------------------------------------------------------------------
 const buttonAddToCart = document.getElementById("addToCart");
 
 const selectedColor = document.getElementById("colors");
 
 const selectedQuantity = document.getElementById("quantity");
 
 const selectedName = document.getElementById("title");
 
 // -------------------------------------------------------------------------------------
 /**
  * Declare variables for messages when click event on button addToCart :
  */
 let chooseColor;
 
 let chooseQuantity;
 
 let productSentIntoBasket;
 
 // -------------------------------------------------------------------------------------
 /**
  * Send request to API to get data, and create a card for the product :
  * @param {string} id
  */
 function getProductById(id) {
   fetch(`http://localhost:3000/api/products/` + id)
     .then((res) => res.json())
     .then((data) => {
       makeProductCard(
         data.imageUrl,
         data.altTxt,
         data.name,
         data.price,
         data.description,
         data.colors
       );
     })
     .catch((error) => errorMessage(error));
 }
 
 getProductById(productId);
 
 // -------------------------------------------------------------------------------------
 /**
  * Create an Error Message :
  */
 function errorMessage(errorMessage) {
   console.log(errorMessage);
 
   const errorRequestMsg = document.querySelector(".item");
 
   errorRequestMsg.innerText = "Oups ! Erreur lors de la requête du produit ...";
 
   errorRequestMsg.style.fontSize = `20px`;
   errorRequestMsg.style.fontWeight = `500`;
   errorRequestMsg.style.color = `red`;
   errorRequestMsg.style.backgroundColor = `white`;
   errorRequestMsg.style.borderRadius = `20px`;
   errorRequestMsg.style.padding = `5px`;
   errorRequestMsg.style.textAlign = `center`;
 }
 
 // -------------------------------------------------------------------------------------
 /**
  * Create a card for product :
  * @param {string} image
  * @param {string} alt
  * @param {string} title
  * @param {number} price
  * @param {string} description
  * @param {array of string} colors
  */
 function makeProductCard(image, alt, title, price, description, colors) {
   document.title = title;
 
   const newImage = document.createElement("img");
   newImage.setAttribute("src", image);
   newImage.setAttribute("alt", alt);
   document.querySelector(".item__img").appendChild(newImage);
 
   const newTitle = document.getElementById("title");
   newTitle.innerText = title;
 
   const newPrice = document.getElementById("price");
   newPrice.innerText = price;
 
   const newDescription = document.getElementById("description");
   newDescription.innerText = description;
 
   for (const color of colors) {
     const newOption = document.createElement("option");
     newOption.setAttribute("value", color);
     newOption.innerText = color;
     document.getElementById("colors").appendChild(newOption);
   }
 
   // Create <div> to display message in case of missing color :
   chooseColor = document.createElement("div");
 
   document
     .querySelector(".item__content__settings__color")
     .appendChild(chooseColor);
 
   chooseColor.innerText = "Veuillez sélectionner une couleur";
 
   chooseColor.style.maxWidth = `375px`;
   chooseColor.style.margin = `auto`;
   chooseColor.style.textAlign = `center`;
   chooseColor.style.fontWeight = 500;
   chooseColor.style.fontSize = `16px`;
   chooseColor.style.color = `red`;
   chooseColor.style.backgroundColor = `white`;
   chooseColor.style.borderRadius = `20px`;
   chooseColor.style.textAlign = `center`;
   chooseColor.style.padding = `2px`;
   chooseColor.style.visibility = `hidden`;
 
   // Create <div> to display message in case of wrong quantity :
   chooseQuantity = document.createElement("div");
 
   document
     .querySelector(".item__content__settings__quantity")
     .appendChild(chooseQuantity);
 
   chooseQuantity.innerText = "Veuillez choisir une quantité entre 1 et 100";
 
   chooseQuantity.style.maxWidth = `375px`;
   chooseQuantity.style.margin = `auto`;
   chooseQuantity.style.textAlign = `center`;
   chooseQuantity.style.fontWeight = 500;
   chooseQuantity.style.fontSize = `16px`;
   chooseQuantity.style.color = `red`;
   chooseQuantity.style.backgroundColor = `white`;
   chooseQuantity.style.borderRadius = `20px`;
   chooseQuantity.style.textAlign = `center`;
   chooseQuantity.style.padding = `2px`;
   chooseQuantity.style.visibility = `hidden`;
 
   // Create "div" to display message when product is sent into basket :
   productSentIntoBasket = document.createElement("span");
 
   document.querySelector(".item__content").appendChild(productSentIntoBasket);
 
   productSentIntoBasket.innerText = "Le produit a bien été ajouté au panier";
 
   productSentIntoBasket.style.fontSize = `20px`;
   productSentIntoBasket.style.fontWeight = 500;
   productSentIntoBasket.style.color = `white`;
   productSentIntoBasket.style.textAlign = `center`;
   productSentIntoBasket.style.padding = `2px`;
   productSentIntoBasket.style.marginTop = `15px`;
   productSentIntoBasket.style.visibility = `hidden`;
 }
 
 // -------------------------------------------------------------------------------------
 /**
  * Listen to click event on button #addToCart :
  */
 buttonAddToCart.addEventListener("click", (e) => {
   const selectedProduct = {
     id: productId,
     title: selectedName.innerText,
     color: selectedColor.value,
     quantity: Math.floor(selectedQuantity.value),
   };
 
   let localStorageArray = JSON.parse(localStorage.getItem("products"));
 
   // Check if color and quantity are selected, and display message(s) if false :
   if (
     selectedColor.value == false ||
     selectedQuantity.value < 1 ||
     selectedQuantity.value > 100
   ) {
     if (selectedColor.value == false) {
       chooseColor.style.visibility = `visible`;
     } else {
       chooseColor.style.visibility = `hidden`;
     }
     if (selectedQuantity.value < 1 || selectedQuantity.value > 100) {
       chooseQuantity.style.visibility = `visible`;
     } else {
       chooseQuantity.style.visibility = `hidden`;
     }
   }
   // When selected color and quantity are true,
   // if local storage is empty, we create an array ...
   // ... and we push the selected product into that array :
   else {
     if (localStorageArray == null) {
       localStorageArray = [];
       localStorageArray.push(selectedProduct);
     }
     // If local storage contains at least one product ...
     // ... we verify if it contains product with same id and color as selected product :
     else {
       let foundProduct = localStorageArray.find(
         (item) =>
           item.id == selectedProduct.id && item.color == selectedProduct.color
       );
       // If true, we adjust quantity :
       if (foundProduct) {
         foundProduct.quantity =
           parseInt(foundProduct.quantity) + parseInt(selectedProduct.quantity);
         if (foundProduct.quantity > 100) foundProduct.quantity = 100;
       }
 
       // If false, we push the selected product into the localStorageArray :
       else {
         localStorageArray.push(selectedProduct);
       }
     }
     // We set the localStorageArray into the local storage :
     localStorage.setItem("products", JSON.stringify(localStorageArray));
 
     chooseColor.style.visibility = `hidden`;
     chooseQuantity.style.visibility = `hidden`;
 
     productSentIntoBasket.style.visibility = `visible`;
     // This message will disappear after 3 seconds :
     setTimeout(function () {
       productSentIntoBasket.style.visibility = "hidden";
     }, 3000);
 
     // Set back the original options values :
     let colors = document.getElementById("colors");
     colors.value = "";
 
     let quantity = document.querySelector(
       ".item__content__settings__quantity input"
     );
     quantity.value = 0;
   }
 });
