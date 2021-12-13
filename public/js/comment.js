const commentFormHandler = async (event) => {
    event.preventDefault();
    console.log("sending comment");
  
    // Collect values from the login form
    const comment_text = document.querySelector('.comment_text').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
  
    if (comment_text) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ post_id, comment_text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.reload();
      } else {
        alert("Failed to post a comment");
        
      }
    }
  };
  document.querySelector('#comment').addEventListener('click', commentFormHandler);
  
  
  
  
  