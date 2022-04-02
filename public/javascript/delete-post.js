async function deleteFormHandler(event) {
  event.preventDefault();
   
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // console.log(id)
  // alert("Button Delete got clicked!")
  // alert("extracted ID: " + id);

  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE' 
    });
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText + "\nCannot delete due to a foreign key constraint\nPlease choose a post that has not yet any comment to delete");
    }
}

document.getElementById('delete-post-btn').addEventListener('click', deleteFormHandler);
 
