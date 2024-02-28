//this is for current testing purposes only. USERNAME, PASSWORD AND EMAIL SHOULD be later changed from elastic email
const token = "77aa694c-a0cb-41a4-9dcd-87777ffde52c"; //token generated from smtp js
const username = "csit211830_domala@achsnepal.edu.np";

//email, subject and message comes from the contact/feedback form
export const details = {
    SecureToken: token,
    To : username,
    From : username,                               
    Subject : "subject",
    Body : "bodyMessage",
};

//swal is from sweetAlert script
export default function sendMail (subject, bodyMessage) {
    details.Subject = subject;
    details.Body = bodyMessage;
    Email.send(details).then(
        message=>{
            if(message == "OK"){
                Swal.fire({
                    title: "Thanks!",
                    text: "Message sent sucessfully!",
                    icon: "success"
                });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: message
                });
            }
        }
    );
};
