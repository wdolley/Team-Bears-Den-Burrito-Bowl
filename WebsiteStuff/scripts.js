document.querySelectorAll('.profile-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    });
});
//login
document.getElementById('login-link').addEventListener('click', function(e) {
	e.preventDefault();
	const modal = document.getElementById('login-modal');
	modal.style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', function() {
	const modal = document.getElementById('login-modal');
	modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
	const modal = document.getElementById('login-modal');
	if (e.target === modal) {
		modal.style.display = 'none';
	}
});

// for invalid login
document.getElementById('close-error-btn').addEventListener('click', function() {
    const errorModal = document.getElementById('error-modal');
    errorModal.style.display = 'none';
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const existingUsers = ['existingUser']; 

    if (!existingUsers.includes(username)) {
        // handle user not found"
        const loginModal = document.getElementById('login-modal');
        loginModal.style.display = 'none';
        
        const errorModal = document.getElementById('error-modal');
        document.getElementById('error-message').innerText = 'User not found. Please sign up!';
        errorModal.style.display = 'block';
    } else if (username !== 'correctUsername' || password !== 'correctPassword') {
        // handles invalid names or passwordl
        const loginModal = document.getElementById('login-modal');
        loginModal.style.display = 'none';
        
        const errorModal = document.getElementById('error-modal');
        document.getElementById('error-message').innerText = 'Incorrect username or password. Please try again.';
        errorModal.style.display = 'block';
    } else {
        // handle successful login
        console.log('Login successful');
    }
});
