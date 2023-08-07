// Select DOM Elements

let
    cars = document.querySelector('#cars select'),
    years = document.querySelector('#years select'),
    backIcon = document.querySelector('#insurance-type i'),
    finalResult = document.querySelector('#insurance-type'),
    container = document.querySelector('#car-insurance'),
    submitBtn = document.querySelector('#submitBtn'),
    buyBtn = document.querySelector('#BuyBtn'),
    spinner = document.querySelector('#spinner');

// Adds a click event listener to the backIcon element
backIcon.addEventListener('click', () => {
    toggleVisibility(container, finalResult);
});

// Defines a submit function
function submit() {
    // Adds a click event listener to the submitBtn element
    submitBtn.addEventListener('click', () => {
        toggleVisibility(finalResult, container);
    });
}
submit()

// Function to hide elements
function toggleVisibility(remove, add) {
    // Remove the 'hide' class from the remove element
    remove.classList.remove('hide');
    // Add the 'hide' class to the add element
    add.classList.add('hide');
}

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
})

// Use the silver box library to give an alert module
function successAlert() {
    return silverBox({
        title: {
            text: "Success",
            alertIcon: "success"
        },
        text: "Congratulations! Your insurance has been successfully registered"
    });
}