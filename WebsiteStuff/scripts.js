document.querySelector('.profile-link').addEventListener('click', function(e) {
    e.preventDefault();
    const dropdown = this.nextElementSibling;
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});