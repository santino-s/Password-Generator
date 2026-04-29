// SELECTION OF THE FOUR MAIN CHECKBOXES
const allInputs = document.querySelectorAll('.selectors input');

// SELECTION OF VARIABLES THAT WILL CHANGE
const lengthNumber = document.querySelector('.range-length');
let length = document.querySelector('#length');
const password = document.querySelector('#password');
const strengthLevel = document.querySelector('.strength-lvl');

// SELECT BUTTONS
const copyBtn = document.querySelector('#btn-copy');
const newBtn = document.querySelector('.btn-new');

// ARRAY OF PASSWORD COMBINATION POSSIBILITIES
const inventory = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
    "abcdefghijklmnopqrstuvwxyz", 
    "0123456789",
    "!@#$%^&*()-_=+[]{}|;:,.<>?"
    ];


// VARIABLES TO MAKE THE POOL NEEDED FOR PASSWORD
let randomPassword = "";
let count = 0;

// VARIABLE FOR STRENGTH TEST SET IN GLOBAL SCOPE SO IT DOESN'T RESET IN EVENT CHANGE
let strengthTest = 0;
const color = strengthLevel.classList;

// RANDOM NUMBER FUNCTION TO MAKE PASSWORD
function randomNumber() {
    return Math.floor(Math.random() * randomPassword.length);
};


// FUNCTION TO DETERMINE PASSWORD STRENGTH
function passwordStrength () {
    if (randomPassword === "") {
        password.innerText = "YOUR PASSWORD HERE";
    };
    
    if (strengthTest === 1) {
        if (length.value < 12) {
            strengthLevel.innerText = "Weak";
        } else {
            strengthLevel.innerText = "Okay";
        };
    } else if (strengthTest === 2){
        if (length.value < 8) {
            strengthLevel.innerText = "Weak";
        } else if (length.value <= 12) {
            strengthLevel.innerText = "Okay";
        } else {
            strengthLevel.innerText = "Good";
        };
    } else if (strengthTest === 3) {
        if (length.value <= 8) {
            strengthLevel.innerText = "Okay";
        } else if (length.value <= 12) {
            strengthLevel.innerText = "Good";
        } else if (length.value <= 15) {
            strengthLevel.innerText = "Strong";
        } else {
            strengthLevel.innerText = "Very Strong";
        };
    } else if (strengthTest >= 4) {
        if (length.value < 8) {
            strengthLevel.innerText = "Good";
        } else if (length.value < 12) {
            strengthLevel.innerText = "Strong";
        } else {
            strengthLevel.innerText = "Very Strong";  
        };
    } else {
        strengthLevel.innerText = "Weak - Very Strong";
    };
    
    changeColor();
};

// FUNCTION TO CHANGE PASSWORD STRENGTH COLOR
function changeColor () {
    if (strengthLevel.innerText === "Strong" || strengthLevel.innerText === "Very Strong") {
        color.remove("yellow", "red", "light-green", "white");
        color.add("green");
    } else if (strengthLevel.innerText === "Good") {
        color.remove("yellow", "green", "red", "white");
        color.add("light-green");
    } else if (strengthLevel.innerText === "Okay") {
        color.remove("red", "green", "light-green", "white");
        color.add("yellow");
    } else if (strengthLevel.innerText === "Weak") {
        color.remove("yellow", "green", "light-green", "white");
        color.add("red");
    } else {
        color.remove("yellow", "red", "green", "light-green");
        color.add("white")
    }
};

// LOOP AND EVENT FUNCTION TO CHECKBOXES AND MAKE PASSWORD
for (let i = 0; i < inventory.length; i++) {
    allInputs[i].addEventListener('change', function (){
        let finalPassword = ""; 
        
        if (allInputs[i].checked) {
            randomPassword += inventory[i];
            strengthTest += 1;
        } else {
            randomPassword = randomPassword.replace(inventory[i], "");
            strengthTest -= 1;
        };

        while (count < Number(length.value)) {
            finalPassword += randomPassword[randomNumber()]; 
            count++;
        };

        count = 0;

        password.innerText = finalPassword;

        passwordStrength();
       
    });
};

// PASSWORD LENGTH DISPLAY
length.addEventListener('change', function(){
    lengthNumber.innerText = length.value;
    
    let finalPassword = ""; 
    

    while (count < Number(length.value)) {
        finalPassword += randomPassword[randomNumber()]; 
        count++;
    };
    
    count = 0;

    password.innerText = finalPassword;

    passwordStrength();
    
});

// NEW PASSWORD BUTTON TO RESET CODE
newBtn.addEventListener('click', function(){
    password.innerText = "YOUR PASSWORD HERE";
    randomPassword = "";
    count = 0;
    length.value = 8;
    lengthNumber.innerText = length.value;
    strengthTest = 0;
    strengthLevel.innerText = "Weak - Very Strong";
    changeColor();
    for (let i = 0; i < inventory.length; i++) {
        allInputs[i].checked = false;
    }
});

// BUTTON TO PRODUCE A RANDOM PASSWORD LENGTH
allInputs[5].addEventListener('click', function(){
    length.value = Math.floor(Math.random() * (20 - 6)) + 6;
    lengthNumber.innerText = length.value;
    
    let finalPassword = ""; 

    while (count < Number(length.value)) {
        finalPassword += randomPassword[randomNumber()]; 
        count++;
    };

    count = 0;

    password.innerText = finalPassword;

    passwordStrength();

});

// BUTTON TO COPY THE PASSWORD TO CLIPBOARD
copyBtn.addEventListener('click', function(){

    // COPY THE TEXT
    navigator.clipboard.writeText(password.innerText);

});


















