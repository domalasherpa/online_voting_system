import {passwordMatch, checkPassword} from '../../../views/scripts/validations.js';

export default function resetPassword(){
    document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Retrieve password and confirm password values from the form
      const password = passwordField.value;
      const confirmPassword = confirmpassword.value;

      // Validate password and confirm password fields
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

    //   // Construct the data object to send in the request
    //   const data = {
    //     password: password,
    //     password2: confirmPassword,
    //   };

      try {
        // Make a POST request to your backend endpoint to reset the password
        const response = await fetch(
          "/api/v1/reset-password/" + "<%-id%>" + "/" + "<%- token %>",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        // Check if the request was successful
        const result = response.json();
        alert(result.message);
        if (response.success) {
          window.location = '/views/markup/login.html";';
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while resetting the password"); // Show generic error message
      }
    });
  })};