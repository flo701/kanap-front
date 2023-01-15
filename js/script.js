/**
 * Send request to API to get data of all products.
 * With the data, create card for each item :
 */
 function getAllProducts() {
  fetch(`${apiUrl}/api/products`)
    .then((res) => res.json())
    .then((res) => {
      for (const item of res) {
        makeCard(
          item._id,
          item.imageUrl,
          item.altTxt,
          item.name,
          item.description
        );
      }
    })
    .catch((error) => errorMessage(error));
}

getAllProducts();

/**
 * Create an Error Message :
 */
function errorMessage(errorMessage) {
  console.log(errorMessage);

  const errorRequestMsg = document.getElementById("items");

  errorRequestMsg.innerText =
    "Oups ! Erreur lors de la requête des produits ...";

  errorRequestMsg.style.fontSize = `20px`;
  errorRequestMsg.style.fontWeight = `500`;
  errorRequestMsg.style.color = `red`;
  errorRequestMsg.style.backgroundColor = `white`;
  errorRequestMsg.style.borderRadius = `20px`;
  errorRequestMsg.style.padding = `5px`;
  errorRequestMsg.style.textAlign = `center`;
}

/**
 * Create a card for each item :
 * @param {string} id
 * @param {string} image
 * @param {string} alt
 * @param {string} name
 * @param {string} description
 */
function makeCard(id, image, alt, name, description) {
  const newLink = document.createElement("a");
  newLink.setAttribute("href", `./html/product.html?id=${id}`);

  const newItem = document.getElementById("items");
  newItem.appendChild(newLink);

  const newArticle = document.createElement("article");
  newLink.appendChild(newArticle);

  const newImage = document.createElement("img");
  newImage.setAttribute("src", image);
  newImage.setAttribute("alt", alt);
  newArticle.appendChild(newImage);

  const newH3 = document.createElement("h3");
  newH3.innerText = name;
  newArticle.appendChild(newH3);

  const newParagraphe = document.createElement("p");
  newParagraphe.innerText = description;
  newArticle.appendChild(newParagraphe);
}
