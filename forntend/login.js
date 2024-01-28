document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    
    fetch('http://localhost:8000/hash_time/?username=' + username)
        .then(response => response.json())
        .then(data => {
            var hashTime = data.hash_time;
            console.log(hashTime);
            hashPassword(password, hashTime)
                .then(hashedPassword => {
                    console.log(hashedPassword);
                    return fetch('http://localhost:8000/login/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            password: hashedPassword,
                        })
                    });
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Login successful!');
                        displayMessage('Login successful!', 'success');
                    } else {
                        console.error('Login failed.');
                        displayMessage('Login failed.', 'error');
                        response.text().then(text => {
                            console.error(text);
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    displayMessage('An error occurred.', 'error');
                });
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('An error occurred.', 'error');
        });
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

function displayMessage(message, type){
    var messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.parentNode.removeChild(messageElement);
    }
    
    messageElement = document.createElement('div');
    messageElement.id = 'message';
    messageElement.textContent = message;
    messageElement.classList.add('message-' + type);

    document.body.appendChild(messageElement);

    setTimeout(function () {
        messageElement.parentNode.removeChild(messageElement);
    }, 3000);
}
