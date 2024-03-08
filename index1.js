const form = document.getElementById('form');
const username = document.getElementById('username');
const phonenumber = document.getElementById('phonenumber');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password1 = document.getElementById('password1');

form.addEventListener('submit',e => {
    e.preventDefault();

    validateInputs();

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.ennerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success')
    }

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
    }
});

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function phonenumber(inputtxt) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputtxt.value.match(phoneno)) {
	    return true;
	    } else{
	    alert("Not a valid Phone Number");
	    return false;
        }
}


const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password1Value = password1.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if(!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if(passwordValue.length<8){
        setError(password, 'Password must be at least 8 character.');
    } else {
        setSuccess(password);
    }

    if(password1Value === '') {
        setError(password1, 'Please confirm your password');
    } else if (password1Value !== passwordValue) {
        setError(password1, "Password doesn't match");
    } else {
        setSuccess(password1);
    }
}
