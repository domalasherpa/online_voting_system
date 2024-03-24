
export async function sendotp(email){
    try {
        const res = await fetch('http://localhost:4000/api/v1/sendotp', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: `${email}` }),
        });
        
        const newItem = await res.json();
        return newItem;
    } catch (err) {
        console.error(err);
    }
}

export async function signup(formData){
    try {
        const res = await fetch('http://localhost:4000/api/v1/signup', {
            method: "POST",
            body:formData
        });
        
        const newItem = await res.json();
        console.log(newItem);
        return newItem;
    } catch (err) {
        alert("Client side: ", err);
    }
}

export async function verifyOtp(email, otp){
    try {
        const res = await fetch('http://localhost:4000/api/v1/verifyotp', {
            method: "POST",
            credentials: "include",
            headers: {
                // "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: `${email}`, otp: `${otp}`})
        });
        
        const newItem = await res.json();
        return newItem;
    } catch (err) {
        alert("Client side: ", err);
    }
}

export async function signin(email, password){
    try{
        const res = await fetch('http://localhost:4000/api/v1/signin', 
            {
                method: "POST",
                credentials: 'include',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: `${email}`, password: `${password}`})
            }   
        )
        let response = await res.json();
        return response;
    }
    catch(error){
        console.log("client side error: ", error);
    }
}




