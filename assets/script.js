// Assignment Code
var generateBtn = document.querySelector("#generate");
// variables that contain the string choices for selection by the randomizer
var alphabet = "abcdefghijklmnopqrstuvwxz";
var upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numberString = "1234567890";
var specialCharacters = "!@#$%^&*()-="

// Write password to the #password input
// I didn't write this, but it essentially changes the text of the element with the attribute of password
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
// I added this because undefined or false was showing in text area if I tried to cancel at the end of the prompts or if I failed to reply with a Y at any point. This ensures a better user experience.
if (password === undefined || password === false) {
    passwordText.value = passwordText.innerHTML;
} else {
  passwordText.value = password;
}}

// I'm quite proud of this! So here we go!
var generatePassword = function(){
    // the alphabet is now stored in the newly created choices var which we will call later!
    var choices = alphabet;
    // this prompt is asking for length as well as using an if statement to check if the password is less than 8 or greater than 128, and if either are true it will return to the calling function writePassword
    var length = prompt("How long would you like your password to be? \nPlease enter a value ranging from 8-128");
    var passwordLength = length;
    if (passwordLength === null){
        return;
    } else if (passwordLength < 8 || passwordLength > 128) {
        return writePassword();
    } else {
    // this is the beginning of prompts which ask if you would like specific characters in your password, and if they do, it concatenates the corresponding string held in the variable.
    var upper = prompt("Would you like your password to contain upper case characters? (Y / N)");
    var upperCase = upper.toUpperCase();
    if (upperCase === "Y") {
        choices = choices.concat(upperAlphabet)
    }
    var numeric = prompt("Would you like your poassword to contain numbers? (Y / N)");
    var numbers = numeric.toUpperCase();
    if (numbers === "Y") {
        choices = choices.concat(numberString)
    }
    var special = prompt("Would you like your password to contain special characters?(Y / N)");
    var specialChar = special.toUpperCase();
    if (specialChar === "Y") {
        choices = choices.concat(specialCharacters)
    } 
    // this last if statement, kind of acts like an else statement, and asks, if choices is exactly the same, because no criteria was selected, and nothing was concatenated to the the original value, it confirms if they really would like a password and returns to the beginning of genereatePassword or to exit.
    if (choices === alphabet) {
        var again = confirm("Do you want a password or not? \nYou gotta reply Y to at least one criteria");
        if (again === true) {
            (generatePassword())
        }  else {
            return;
        }
    }
}
// this is my randomizer. it first establishes a newPassword variable to hold an empty string. it then loops the same number of times as the desired length of the password input by the user, outputting a random index number to chose a character from the recently concatenated string held in choices. it then adds to the newPassword string, one by one, a character from the choices string held at the randomly generated index number.
var newPassword = "";
for (let i = 0; i < passwordLength; i++) {
    var index = Math.floor(Math.random() * choices.length);
    newPassword += choices[index];
    }
    return newPassword;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
