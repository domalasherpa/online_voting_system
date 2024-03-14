
export async function sendotp(email){
    try {
        const res = await fetch('http://localhost:4000/api/v1/sendotp', {
            method: "POST",
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
        return newItem;
    } catch (err) {
        alert("Client side: ", err);
    }
}






