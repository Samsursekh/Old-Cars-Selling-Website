const container = document.getElementById("container");
let TotalCarsData = [];
const fetchData = async () => {
  const result = await fetch(
    `https://cars-mock-api-wjnb.onrender.com/wishlisted_cars/`
  );
  const data = await result.json();
  TotalCarsData = data;
  displayDataFunction(TotalCarsData);
};

fetchData();

const displayDataFunction = (myData) => {
  container.innerHTML = "";
  myData.forEach((element) => {
    const cards = document.createElement("div");
    cards.classList.add("cards");

    const image = document.createElement("img");
    image.classList.add("image");
    image.src = element.image;

    const brand = document.createElement("h3");
    brand.classList.add("brand");
    brand.innerText = `Brand Name : ${element.brand}`;

    const type = document.createElement("h3");
    type.classList.add("type");
    type.innerText = `Type : ${element.type}`;

    const year = document.createElement("h3");
    year.classList.add("year");
    year.innerText = `Year of purchase : ${element.year}`;

    const kms = document.createElement("h3");
    kms.classList.add("kms");
    kms.innerText = `Total Kms : ${element.kms}  (kms)`;

    const Price = document.createElement("h3");
    Price.classList.add("Price");
    Price.innerText = `Car Price : ${element.Price} (₹)`;

    const Description = document.createElement("p");
    Description.classList.add("Description");
    Description.innerText = `Description : ${element.Description}`;
    cards.append(image, brand, type, year, kms, Price, Description);
    container.append(cards);
  });
};
