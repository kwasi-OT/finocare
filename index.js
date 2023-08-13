"use strict";
// initialize the bugfender sdk
// import { Bugfender } from '@bugfender/sdk';

// Bugfender.init({
//     appKey: 'zYAkTJ7dVug4Zx4zvoS6sQuKC7oQv6Co',
//     apiURL: 'https://api.bugfender.com',
//     baseURL: 'https://dashboard.bugfender.com',
//     overrideConsoleMethods: true,
//     printToConsole: true,
//     registerErrorHandler: true,
//     logBrowserEvents: true,
//     logUIEvents: true,
//     version: 1.0,
//     build: 1,
// });


// mobile menu event handler
function displayOverlay() {
    document.getElementById("mobileMenu").style.display = 'none';
    document.getElementById("overlay").style.display = "block";
}

// display overlay and bmi form
const bmiForm = document.querySelector("#bmiForm");
bmiForm.addEventListener("click", displayPageOverlay);

function displayPageOverlay() {
    document.querySelector("#bmiPageOverlay").style.display = "flex";
}


// close the overlay on the homepage
function closeOverlay() {
    document.getElementById("mobileMenu").style.display = 'block';
    document.getElementById("overlay").style.display = "none";
}

// close the overlay on the bmi page
const bmiPageOverlayClose = document.querySelector(".bmiPageOverlayClose");
bmiPageOverlayClose.addEventListener("click", closePageOverlay);

function closePageOverlay() {
    document.getElementById("bmiPageOverlay").style.display = "none";
}


function showUnitFields(unit) { // select unit field based on selected type
    if (unit === "standard") {
        document.getElementById("standardFields").style.display = "flex";
        document.getElementById("metricFields").style.display = "none";
    } else if (unit === "metric") {
        document.getElementById("metricFields").style.display = "flex";
        document.getElementById("standardFields").style.display = "none";
    } 
}


// calculate the bmi upon click event
function calculateBMI() {
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const weight = parseFloat(unit === "standard" ? document.getElementById('weight').value : document.getElementById("kilograms").value);

    let height = 0;
    if (unit === "standard") {
            const feet = parseFloat(document.getElementById("feet").value);
            const inches = parseFloat(document.getElementById("inches").value);
            height = (feet * 12) +inches;
        } else if (unit === "metric"){
            height = parseFloat(document.getElementById("centimeters").value);
        }
            

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert("Please enter a valid weight and height.");
            return;
        }
        
        let calculations;
        if (unit === "standard") {
            // Calculate BMI using standard units (inches and pounds)
            calculations = (weight / (height * height)) * 703;
        } else {
            // Calculate BMI using metric units (centimeters and kilograms)
            calculations = (weight / ((height / 100) ** 2));
        }
        const bmi = calculations.toFixed(1);

        // save the calculated bmi in local storage for later use
        localStorage.setItem("bmiOutcome", bmi);

        // display health tips as per results
        let healthTips = '';
        if (bmi < 18.5) {
            healthTips = 'You are Underweight. Try to gain some weight.';
        } else if (bmi >= 18.5 && bmi < 24.9){
            healthTips = 'You have a healthy weight. Keep it up!';
        } else if (bmi >= 25 && bmi < 29.9) {
            healthTips = 'You are Overweight. Try to lose some weight.';
        } else {
            healthTips = 'You are Obese. Consider consulting a  healthcare professional.';
        }

        document.getElementById("bmiResult").innerText = bmi;
        document.getElementById("healthTips").textContent = healthTips;
        document.getElementById("result").style.display = 'flex';
        document.getElementById("bmiWelcome").style.display = 'none';
}



// const bmiPage = document.getElementById("openBMIPage");
// bmiPage.addEventListener("click", openPage());

function openPage() {
    window.location.href = "bmi.html";
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



// function to reset the BMI value, clear the local storage and reload the page
function resetBmiValue() {
    const resetValue = 0;
    localStorage.setItem("bmiOutcome", resetValue);
    window.location.reload();
}


// footer 'year' settings
const dateNow = new Date();
const year = dateNow.getFullYear();
document.querySelector(".year").textContent = year;
// document.querySelector(".indexYear").innerText = year;



