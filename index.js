"use strict";
// initialize the bugfender sdk
Bugfender.init({
    appKey: 'zYAkTJ7dVug4Zx4zvoS6sQuKC7oQv6Co',
    apiURL: 'https://api.bugfender.com',
    baseURL: 'https://dashboard.bugfender.com',
    overrideConsoleMethods: true,
    printToConsole: true,
    registerErrorHandler: true,
    logBrowserEvents: true,
    logUIEvents: true,
    version: 1.0,
    build: 1,
});

// mobile menu event handler

function displayOverlay() {
    document.getElementById("mobileMenu").style.display = 'none';
    document.getElementById("overlay").style.display = "block";
}

// close the overlay
function closeOverlay() {
    document.getElementById("mobileMenu").style.display = 'block';
    document.getElementById("overlay").style.display = "none";
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
        
        // const bmi = (weight / (height * height)).toFixed(1);
        let calculations;
        if (unit === "standard") {
            // Calculate BMI using standard units (inches and pounds)
            calculations = (weight / (height * height)) * 703;
        } else {
            // Calculate BMI using metric units (centimeters and kilograms)
            calculations = (weight / ((height / 100) ** 2));
        }
        const bmi = calculations.toFixed(1);


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

function openBMIPage() {
    window.open("./bmi.html","_self");
}