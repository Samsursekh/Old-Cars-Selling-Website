
  const myForm = document.getElementById("myForm");
    
    myForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let myDataObj = {
            brand: document.getElementById("brandOfCar").value,
            type: document.getElementById("manualOrAutomated").value,
            year: document.getElementById("yearOfPurchase").value,
            kms: document.getElementById("KM_Driven").value,
            Description: document.getElementById("Description").value,
            Price: document.getElementById("Price").value,
            image: document.getElementById("image").value,
        }
        fetch(`https://cars-mock-api-wjnb.onrender.com/cars`, {
            method: "POST",
            body: JSON.stringify(myDataObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = myDataObj;
        alert("Car Added Successfully")
        myForm.reset();
        return false;
        // myDataObj.brand.value = "";
        // myDataObj.Description.value = "";
        // myDataObj.kms.value = "";
        // myDataObj.Price.value = "";

    })
   

// addDetaFunction()
