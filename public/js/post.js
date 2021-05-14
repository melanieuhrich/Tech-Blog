const newFormHandler = async (event) => {
    event.preventDefault();

    const contents = document.querySelector('.comment').value.trim();
    let post_id = window.location.pathname.split('/')[2];
    if (contents) {
        const response = await fetch(`/api/comments/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({contents}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
}; 
document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
