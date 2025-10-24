// Load Brevo form component dynamically
document.addEventListener('DOMContentLoaded', function() {
  const formContainer = document.getElementById('brevo-form-container');
  if (formContainer) {
    fetch('components/brevo-form.html')
      .then(response => response.text())
      .then(html => {
        formContainer.innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading Brevo form:', error);
        formContainer.innerHTML = '<p>Error loading newsletter form. Please try again later.</p>';
      });
  }
});
