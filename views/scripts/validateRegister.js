const username = document.getElementById('username');
const phonenumber = document.getElementById('phonenumber');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const form = document.getElementById('form');
import { checkEmail, checkPassword, confirmPassword, validatePhoneNumber, passwordMatch } from "./validations";

export default function validateInputs(){
    const items = document.querySelectorAll(".item");

    for(const item of items){
        if(item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value != ""){
            checkEmail(email);
        }

        if(items[2].value != ""){
            validatePhoneNumber(phonenumber);
        }

        if(items[3].value != ""){
            checkPassword(password);
        }

        items[1].addEventListener("keyup", ()=>{
            checkEmail(email);
        })

        items[2].addEventListener("keyup", ()=>{
            validatePhoneNumber(phonenumber);
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

    if(!username.classList.contains('error') && 
        !phonenumber.classList.contains('error') &&
        !email.classList.contains('error') &&
        !password.classList.contains('error') &&
        !confirmPassword.classList.contains('error')){
            return true;
        }
    else{
        return false;
    }
}