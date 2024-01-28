document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    var formData = {
        username: document.getElementById('username').value,
        password: await hashPassword(document.getElementById('password').value, parseInt(document.getElementById('hash_time').value) + 1),
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

async function hashPassword(password, hashTime) {
    let hashedPassword = await sha256(password);
    for (let i = 0; i < hashTime - 1; i++) {
        hashedPassword = await sha256(hashedPassword);
    }
    return hashedPassword;
}

async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
