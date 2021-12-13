// Delete post function
async function deleteHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
    
    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert("Failed to delete post");
    }
  }
  
  // Delete button handler
  document.querySelector("#delete").addEventListener("click", deleteHandler);