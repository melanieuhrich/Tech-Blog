const newFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();

    if (comment) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: comment,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/post');
        } else {
            alert('Failed to create comment');
        }
    }
}; 

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
