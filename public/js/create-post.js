const newFormHandler = async (event) => {
    event.preventDefault();
    console.log("post created!");

    const title = document.querySelector('.title').value.trim();
    const contents = document.querySelector('.content').value.trim();

    if (title && contents) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('response after we made the post!!!', response)
        if (response.ok) {
            document.location.replace('/dashboard'); 
        } else {
            alert('Failed to create post');
        }
    }
};

document
    .querySelector('#create-button')
    .addEventListener('click', newFormHandler);
