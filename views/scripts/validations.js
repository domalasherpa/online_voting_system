
function checkEmail(email){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");
    }
    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

function checkPassword(password){
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if(!password.value.match(passwordRegex)){
        password.classList.add("error");
        password.parentElement.classList.add("error");
    }
    else{
        password.classList.remove("error");
        password.parentElement.classList.remove("error");
    }
}

function validatePhoneNumber(phonenumber) {
    var phonenumberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if(!phonenumber.value.match(phonenumberRegex)){
        phonenumber.classList.add("error");
        phonenumber.parentElement.classList.add("error");
    }
    else{
        phonenumber.classList.remove("error");
        phonenumber.parentElement.classList.remove("error");
    }
}

function passwordMatch(password1, password2){
    if(password1.value !== password2.value){
        password2.classList.add("error");
        password2.parentElement.classList.add("error");
    }
    else{
        password2.classList.remove("error");
        password2.parentElement.classList.remove("error");
    }
}

export {checkEmail, checkPassword, validatePhoneNumber, passwordMatch};