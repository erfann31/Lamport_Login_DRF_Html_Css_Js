document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        hash_time: parseInt(document.getElementById('hash_time').value)
    };

    fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                console.log('User registered successfully!');
                window.location.href = './login.html';
            } else {
                console.error('Registration failed.');
                response.text().then(text => {
                    console.error(text);
                });
            }
        })
        .catch(error => console.error('Error:', error));
});
