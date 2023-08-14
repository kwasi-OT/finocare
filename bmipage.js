// display overlay and bmi form
const bmiPageForm = document.querySelector("#bmiForm");
console.log(bmiPageForm);
if (bmiPageForm) {
    bmiPageForm.addEventListener("click", displayPageOverlay);
    function displayPageOverlay() {
        document.querySelector("#bmiPageOverlay").style.display = "flex";
    }
}


// close the overlay on the bmi page
const bmiPageOverlayClose = document.querySelector(".bmiPageOverlayClose");
bmiPageOverlayClose.addEventListener("click", closePageOverlay);

function closePageOverlay() {
    document.getElementById("bmiPageOverlay").style.display = "none";
}



// function to update page depending on state of local storage
(function updatePage() {
    const receiveBMI = localStorage.getItem("bmiOutcome");
    const receiveBMIInt = parseInt(receiveBMI);

    if (receiveBMIInt === 0) {
        document.querySelector("#showBMI").style.display = "none";
        document.querySelector("#checkBMI").style.display = "flex";
    } else {
        document.querySelector("#showBMI").style.display = "flex";
        document.querySelector("#checkBMI").style.display = "none";  
        document.getElementById("bmiValue").textContent = receiveBMI;      
    }
})();