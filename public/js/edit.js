async function editFormHandler(event) {
  console.log("working")
    event.preventDefault();
  
    const title = document.querySelector("#post_title").value;
    const post_content = document.querySelector("#post_content").value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content,
            id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert("Failed to edit post");
      }
  }
  
  document.querySelector("#update").addEventListener('click', editFormHandler);