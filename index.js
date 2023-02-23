const container = document.getElementById("container");

let myData = [];
const fetchDataFunc = async () => {
  try {
    const res = await fetch(`https://cars-mock-api-wjnb.onrender.com/cars`);
    const data = await res.json();
    myData = data;
    displayDataFunction(myData);
  } catch (err) {
    console.log(err);
  }
};
fetchDataFunc();

const displayDataFunction = (myData) => {
  container.innerHTML = "";
  // console.log(allData);
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

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "EDIT";
    editBtn.addEventListener("click", () => {
      console.log("Edited ....");
      handleEditFunction(element);
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "DELETE";
    deleteBtn.addEventListener("click", () => {
      console.log("Deleted ....");
      handleDeleteFunction(element.id);
    });
    const heartIcon = document.createElement("span");
    heartIcon.innerHTML = "	&#x2764;"; // Unicode character code for heart emoji
    heartIcon.style.color = "blue";
    heartIcon.style.fontSize = "24px";
    heartIcon.style.cursor = "pointer";
    heartIcon.addEventListener("click", () => {
      console.log("Add to Cart ....");
    });

    const Description = document.createElement("p");
    Description.classList.add("Description");
    Description.innerText = `Description : ${element.Description}`;
    cards.append(
      image,
      brand,
      type,
      year,
      kms,
      Price,
      Description,
      deleteBtn,
      editBtn,
      heartIcon
    );
    container.append(cards);
  });
};
//Implementing Sort By Price Functinality Here

const sortByPriceFunction = () => {
  let selected = document.getElementById("sortByPrice").value;
  if (selected === "HTL") {
    myData.sort((a, b) => {
      return b.Price - a.Price;
    });
    // console.log(myData)
    displayDataFunction(myData);
  }
  if (selected === "LTH") {
    myData.sort((a, b) => {
      return a.Price - b.Price;
    });
    // console.log(myData)
    displayDataFunction(myData);
  }
};

//Implementing Sort by KMS Functinality Here

const sortByKmsFunction = () => {
  const selected = document.getElementById("sortByKms").value;
  if (selected === "HTL") {
    myData.sort((a, b) => {
      return b.kms - a.kms;
    });
    // console.log(myData)
    displayDataFunction(myData);
  }
  if (selected === "LTH") {
    myData.sort((a, b) => {
      return a.kms - b.kms;
    });
    // console.log(myData)
    displayDataFunction(myData);
  }
};

//Implementing Filter Functinality Here

const FilterByBrandFunction = () => {
  const selected = document.getElementById("FilterByBrand").value;
  console.log(selected, "Checking Filter Items is there or not");
  const filteredList = myData.filter((elem) => {
    if (selected == []) {
      displayDataFunction(myData);
      return "Empty";
    }
    return elem.brand === selected;
  });
  //   console.log(filteredList) ;
  displayDataFunction(filteredList);
};

const handleDeleteFunction = async (deleteITem) => {
  console.log(deleteITem, "Am i Getting delte item or not");
  const displayContainer = document.getElementById("container");

  const modal = document.createElement("div");
  modal.classList.add("modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.onclick = function () {
    modal.style.display = "block";
  };
  const DELETE = document.createElement("button");
  DELETE.innerText = `DELETE`;
  const confirmPara = document.createElement("p");
  confirmPara.innerText = "Are you sure to delete this ?";
  DELETE.addEventListener("click", () => {
    deleteModalOpen(deleteITem);
  });

  modalContent.append(confirmPara, DELETE);
  modal.append(modalContent);
  displayContainer.append(modal);

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};

const deleteModalOpen = async (deleteITem) => {
  const deleteData = await fetch(
    `https://cars-mock-api-wjnb.onrender.com/cars/${deleteITem}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await deleteData.json();
  console.log(data);
  displayDataFunction(myData);
  alert("Car Deleted Successfully");
  window.location.reload();
};

const handleEditFunction = (editITem) => {
  console.log(editITem.brand);
  const displayContainer = document.getElementById("container");

  const modal = document.createElement("div");
  modal.classList.add("modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.onclick = function () {
    modal.style.display = "block";
  };

  const EditFormTag = document.createElement("form");
  EditFormTag.classList.add("EditFormTag");

  const editBrandInput = document.createElement("input");
  editBrandInput.classList.add("editBrandInput");
  editBrandInput.setAttribute("placeholder", "Edit Brand Name");
  editBrandInput.setAttribute("type", "text");
  editBrandInput.setAttribute("value", editITem.brand);

  const EditPriceInput = document.createElement("input");
  EditPriceInput.classList.add("EditPriceInput");
  EditPriceInput.setAttribute("placeholder", "Edit Price Name");
  EditPriceInput.setAttribute("type", "number");
  EditPriceInput.setAttribute("value", editITem.Price);

  const editImageInput = document.createElement("input");
  editImageInput.classList.add("editImageInput");
  editImageInput.setAttribute("placeholder", "Edit Image Name");
  editImageInput.setAttribute("type", "url");
  editImageInput.setAttribute("value", editITem.image);

  const editSaveBtn = document.createElement("input");
  editSaveBtn.classList.add("editSaveBtn");
  editSaveBtn.setAttribute("value", "UPDATE CARS");
  editSaveBtn.setAttribute("type", "submit");

  EditFormTag.addEventListener("submit", () => {
    EditSaveBtnToUpdate(
      editITem,
      editITem.id,
      editBrandInput,
      EditPriceInput,
      editImageInput
    );
  });

  EditFormTag.append(
    editBrandInput,
    EditPriceInput,
    editImageInput,
    editSaveBtn
  );
  modalContent.append(EditFormTag);
  modal.append(modalContent);
  displayContainer.append(modal);

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};

const EditSaveBtnToUpdate = (EditITem, id ,brand,price,image) => {
  console.log(EditITem);
  event.preventDefault();
  const updatedDataObj = {
    brand : brand.value,
    Price : price.value,
    image : image.value,
  }
  console.log("Updated...");
  fetch(`https://cars-mock-api-wjnb.onrender.com/cars/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedDataObj),
    headers : {
        "Content-Type" : "application/json"
    }
  });
  const data = updatedDataObj;
  alert("Car Updated Successfully ");
  window.location.reload();
  console.log(data)
};
