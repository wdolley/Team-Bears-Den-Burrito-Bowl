document.querySelectorAll('.profile-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    });
});
