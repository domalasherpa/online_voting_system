
async function deleteResource(resourceType, resourceId) {
    if (confirm(`Are you sure you want to delete this ${resourceType.slice(0, -1)}?`)) {
        try {
            const response = await fetch(`/api/v1/${resourceType}/${resourceId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Failed to delete ${resourceType}`);
            }
            location.reload(); // Reload the page
        } catch (error) {
            console.error(`Error deleting ${resourceType}:`, error);
        }
    }
}

async function addResource(resourceType, data){
    try{
        alert(`ok the date is : ${data}`);
        const res = await fetch(`/api/v1/${resourceType}/`, {
            method: 'post',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(res.status == 201){
            alert("sucessfully added");
        }else{
            alert("Error performing operation");
        }
    }
    catch(error){
        console.log(`Error adding ${resourceType}`, error);
    }
}
