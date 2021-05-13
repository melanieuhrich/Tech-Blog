const newFormHandler = async (event) => {
    event.preventDefault();

    const contents = document.querySelector('.comment').value.trim();
    console.log('about to save new comment !!');
    let post_id = window.location.pathname.split('/')[2];
    console.log(post_id)
    if (contents) {
        const response = await fetch(`/api/comments/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({contents}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        let newCommentId = 2;

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
}; 
console.log(window.location)
document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
