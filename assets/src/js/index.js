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

// Function to hide elements
function toggleVisibility(remove, add) {
    // Remove the 'hide' class from the remove element
    remove.classList.remove('hide');
    // Add the 'hide' class to the add element
    add.classList.add('hide');
}