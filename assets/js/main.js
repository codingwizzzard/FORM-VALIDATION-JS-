function clearErrors() {
    errors = document.getElementsByClassName('formerror');
    for (let i = 0; i < errors.length; i++) {
        errors[i].innerHTML = "";
    }
}

function seterror(id, error) {
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

function showSuccessMessage(message) {
    const successMessageElement = document.getElementById('successMessage');
    successMessageElement.textContent = message;
    successMessageElement.style.color = '#0a0e83';

    document.getElementById('myForm').style.display = 'none';
}

function isWhitespaceOrEmpty(str) {
    return !str || !str.replace(/\s/g, '').length;
}

function containsOnlyAlphabets(str) {
    for (var i = 0; i < str.length; i++) {
        var char = str.charAt(i);
        if (!(char >= 'a' && char <= 'z') && !(char >= 'A' && char <= 'Z')) {
            return false;
        }
    }
    return true;
}

function validateForm() {
    var returnval = true;
    clearErrors();

    var name = document.forms['myForm']["fname"].value;
    if (isWhitespaceOrEmpty(name) || name.length < 3 || !containsOnlyAlphabets(name)) {
        seterror("name", "*Name should be at least 3 characters long and contain only alphabets");
        returnval = false;
    }

    var email = document.forms['myForm']["femail"].value;
    if (isWhitespaceOrEmpty(email)) {
        seterror("email", "*Email cannot be empty");
        returnval = false;
    }else if(!email.includes('@') || !email.endsWith('.com')) {
        seterror("email", "*Email is not written in proper format")
        returnval = false;
    }

    var phone = document.forms['myForm']["fphone"].value;
    if (isWhitespaceOrEmpty(phone) || phone.length !== 10 || isNaN(phone)) {
        seterror("phone", "*Phone number should be of 10 digits!");
        returnval = false;
    }

    var password = document.forms['myForm']["fpass"].value;

    function containsUppercase(password) {
        return password.toLowerCase() !== password;
    }

    function containsLowercase(password) {
        return password.toUpperCase() !== password;
    }

    function containsDigit(password) {
        return password.split('').some(char => '0123456789'.includes(char));
    }

    function containsSpecialCharacter(password) {
        var specialChars = '!@#$%^&*()_+';
        return [...password].some(char => specialChars.includes(char));
    }

    if (
        isWhitespaceOrEmpty(password) ||
        password.length < 6 ||
        !containsUppercase(password) ||
        !containsLowercase(password) ||
        !containsDigit(password) ||
        !containsSpecialCharacter(password)
    ) {
        seterror("pass", "*Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!");
        returnval = false;
    }

    var cpassword = document.forms['myForm']["fcpass"].value;
    if (isWhitespaceOrEmpty(cpassword)) {
        seterror("cpass", "*Confirm Password cannot be empty!");
        returnval = false;
    } else if (cpassword !== password) {
        seterror("cpass", "*Password and Confirm Password should match!");
        returnval = false;
    }

    if (returnval) {
        showSuccessMessage("Form successfully submitted!!");
        return false; 
    }

    return false;
}