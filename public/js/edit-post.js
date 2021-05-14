const newFormHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');

    const title = document.querySelector('.title').value.trim();
    const contents = document.querySelector('.content').value.trim();

    if (title && contents) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, contents }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
    .querySelector('#update')
    .addEventListener('click', newFormHandler);

document
    .querySelector('#delete')
    .addEventListener('click', delButtonHandler);
