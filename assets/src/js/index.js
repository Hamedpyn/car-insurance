// Select DOM Elements

let
    cars = document.querySelector('#cars select'),
    years = document.querySelector('#years select'),
    backIcon = document.querySelector('#insurance-type i'),
    finalResult = document.querySelector('#insurance-type'),
    container = document.querySelector('#car-insurance'),
    submitBtn = document.querySelector('#submitBtn'),
    buyBtn = document.querySelector('#BuyBtn'),
    spinner = document.querySelector('#spinner'),
    userCar = document.querySelector('#car'),
    userType = document.querySelector('#type'),
    userPrice = document.querySelector('#carPrice'),
    userYear = document.querySelector('#madeYear'),
    thirdParty = document.querySelector('#thirdParty');

//Events
document.addEventListener('DOMContentLoaded', () => {
    FinalPage()
    submit()
})

// Function to hide elements
function toggleVisibility(remove, add) {
    // Remove the 'hide' class from the remove element
    remove.classList.remove('hide');
    // Add the 'hide' class to the add element
    add.classList.add('hide');
}

function FinalPage() {
    // Adds a click event listener to the backIcon element
    backIcon.addEventListener('click', () => {
        toggleVisibility(container, finalResult);
    });
    buyBtn.addEventListener('click', () => {
        // Increase the height of the finalResult element to 500px
        finalResult.style.height = '500px';
        // Display the spinner by modifying its style
        spinner.style.display = 'block';

        // Set a timeout function to simulate a delay
        setTimeout(() => {
            // Revert the height of finalResult to 400px
            finalResult.style.height = '400px';
            // Hide the spinner by modifying its style
            spinner.style.display = 'none';
            // Call the successAlert function
            successAlert();
        }, 2000);
    });
}

// Use the silver box library to give an alert module
function successAlert() {
    return silverBox({
        title: {
            text: "Success",
            alertIcon: "success"
        },
        text: "Congratulations ! Your insurance has been successfully registered"
    });
}

function errorAlert(error) {
    return silverBox({
        alertIcon: "error",
        text: `${error}`,
        centerContent: true,
        cancelButton: {
            text: "OK"
        }
    })
}

// Submit button click handler 
function submit() {

    // Validate form inputs
    submitBtn.addEventListener('click', () => {
        // Check if car is selected
        if (cars.value == 'Select a car') {
            errorAlert('Select a car please')
            // Check if year is selected
        } else if (years.value == 'Select a year') {
            errorAlert('Select a year please')
            // If inputs valid, calculate and show results
        } else {
            // Show results section
            toggleVisibility(finalResult, container);
            // Get user selected inputs
            let inputRadio = document.querySelector('input:checked+label'),
                year = years.value,
                car = cars.value,
                insuranceType = inputRadio.innerHTML,
                // Create Insurance instance with user inputs
                newInsurance = new Insurance(car, year, insuranceType);

            // Display calculated results  
            resultPage(newInsurance)
        }
    });
}

// Insurance policy price calculation 
class Insurance {
    // Initialize with parameters
    constructor(car, year, insuranceType, price = 1700) {
        // Set initial property values
        this.car = car;
        this.year = year;
        this.insuranceType = insuranceType;
        this.price = price;
    }
    // Apply depreciation based on year  
    applyYearDepreciation() {
        // Get year diff
        let decrease = 2023 - this.year;
        // Apply 7% depreciation per year 
        this.price += this.price * decrease * 7 / 100;
    }
    // Increase price based on insurance type
    applyInsuranceTypeRate() {
        if (this.insuranceType === "All Risks") {
            this.price += this.price * 16 / 100;
        } else if (this.insuranceType === "Third Party") {
            this.price += this.price * 8 / 100;
        }
    }
}