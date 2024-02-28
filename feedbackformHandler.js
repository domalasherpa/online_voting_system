import sendMail from "./emailSender.js";

const form = document.querySelector("form");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const name = document.querySelector("#fullname");
const message = document.querySelector("#message"); 


function checkInputs(){
    const items = document.querySelectorAll(".item");

    for(const item of items){
        if(item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value != ""){
            checkEmail(email);
        }

        items[1].addEventListener("keyup", ()=>{
            checkEmail(email);
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

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    checkInputs();
    if(!name.classList.contains("error") && !email.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")){
        const bodyMessage = `Full name: ${name.value} <br> Email: ${email.value}<br>Message: ${message.value}`;
        sendMail(subject.value, bodyMessage);
    }
   
})