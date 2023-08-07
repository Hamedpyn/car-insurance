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

// Use the silver box library to give an success alert module
function successAlert() {
    return silverBox({
        title: {
            text: "Success",
            alertIcon: "success"
        },
        text: "Congratulations ! Your insurance has been successfully registered"
    });
}

// Use the silver box library to give an failed alert module
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
        // Calculate final price
        this.calculateFinalPrice();
    }

    // Calculates total price applying different factors
    calculateFinalPrice() {
        // Apply year depreciation
        this.applyYearDepreciation();
        // Apply insurance type price adjustment
        this.applyInsuranceTypeRate();
        // Apply car model price adjustment
        this.applyCarModelRate();
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

    // Increase price based on car model 
    applyCarModelRate() {
        if (this.car == 'Porsche 911') {
            this.price += this.price * 43 / 100
        } else if (this.car == 'Jaguar XF') {
            this.price += this.price * 24 / 100
        } else if (this.car == 'Rolls-Royce') {
            this.price += this.price * 55 / 100
        } else if (this.car == 'Audi R8') {
            this.price += this.price * 29 / 100
        } else if (this.car == 'BMW i8') {
            this.price += this.price * 33 / 100
        } else if (this.car == 'Benz G-Class') {
            this.price += this.price * 35 / 100
        } else if (this.car == 'Bugatti Chiron') {
            this.price += this.price * 40 / 100
        }
        return this.price;
    }
}

// Display results in HTML
function resultPage(insurance) {
    // Show fields
    userCar.innerHTML = insurance.car;
    userYear.innerHTML = insurance.year;
    userType.innerHTML = insurance.insuranceType;
    userPrice.innerHTML = `${insurance.price.toFixed(2)}$`;
}