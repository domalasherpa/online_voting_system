function passwordMatch(password1, password2) {
	if (password1.value !== password2.value) {
		password2.classList.add("error");
		password2.parentElement.parentElement.classList.add("error");
	} else {
		password2.classList.remove("error");
		password2.parentElement.parentElement.classList.remove("error");
	}
}

function checkPassword(password) {
	const passwordRegex =
		/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
	if (!password.value.match(passwordRegex)) {
		password.classList.add("error");
		password.parentElement.parentElement.classList.add("error");
	} else {
		password.classList.remove("error");
		password.parentElement.parentElement.classList.remove("error");
	}
}

function checkChange(item){
	item.addEventListener("keyup", ()=>{
		if(item.value != ""){
			item.classList.remove("error");
			item.parentElement.parentElement.classList.remove("error");
		}
		else{
			item.classList.add("error");
			item.parentElement.parentElement.classList.add("error");
		}
	})
}

export default function resetPassword(password, confirmPassword, id, token) {
	document.addEventListener("DOMContentLoaded", function () {
		const form = document.querySelector("form");

		form.addEventListener("submit", async function (event) {
			event.preventDefault(); // Prevent the default form submission
			if (password.value != "") {
				checkPassword(password);
			}
			if(confirmPassword.value != ""){
				passwordMatch(password, confirmPassword);
			}
			checkChange(password);
			checkChange(confirmPassword);
			const data = {
				password: password.value,
				password2: confirmPassword.value
			};
			
			if(!password.classList.contains('error') && !confirmPassword.classList.contains('error')){
				try {
					// Make a POST request to your backend endpoint to reset the password
					const response = await fetch(`/api/v1/reset-password/${id}/${token}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					});
					// Check if the request was successful
					const result = await response.json();
					alert(result.message);
					if (result.success) {
						window.location = "/frontend/markup/login.html";
					}
				} catch (error) {
					alert("An error occurred while resetting the password"); // Show generic error message
				}
			}
			
		});
	});
}
