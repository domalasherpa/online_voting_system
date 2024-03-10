const form = document.getElementById('form');
const username = document.getElementById('username');
const phonenumber = document.getElementById('phonenumber');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');


form.addEventListener('submit',e => {
    e.preventDefault();

    validateInputs();

    
});

function validateInputs(){
    const items = document.querySelectorAll(".item");
    console.log(items.length);
    for(const item of items){
        if(item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value != ""){
            checkEmail(email);
        }

        if(items[3].value != ""){
            checkPassword(password);
        }

        items[1].addEventListener("keyup", ()=>{
            checkEmail(email);
        })

        items[3].addEventListener("keyup", ()=>{
            checkPassword(password);
        })

        if(items[4].value != ""){
            passwordMatch(password, confirmPassword);
        }

        items[4].addEventListener("keyup", ()=>{
            checkPassword(password);
        })

        item.addEventListener("keyup", ()=>{
            if(item.value != ""){
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else{
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        })
    }
}

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