async function newFormHandler(event) {
   event.preventDefault();
 
   const title = document.querySelector('input[name="post-title"]').value;
   const post_content = document.querySelector('textarea[name="post-content"]').value;
   // alert("Button Add got clicked!")
   const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
         title,
         post_content // user ID can be obtained from the session, see post-routes.js
      }),
      headers: {
         'Content-Type': 'application/json'
      }
   });
   if (response.ok) {
      document.location.replace('/dashboard'); // Use replace method
   } else {
      alert(response.statusText);
   }
 }

 document.getElementById('new-post-form').addEventListener('submit', newFormHandler);
 