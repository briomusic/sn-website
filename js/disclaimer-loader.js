// Load general disclaimer component dynamically
document.addEventListener('DOMContentLoaded', function() {
  const disclaimerContainer = document.getElementById('general-disclaimer-container');
  if (disclaimerContainer) {
    fetch('components/general-disclaimer.html')
      .then(response => response.text())
      .then(html => {
        disclaimerContainer.innerHTML = html;
        console.log('General disclaimer loaded successfully');
      })
      .catch(error => {
        console.error('Error loading general disclaimer:', error);
        disclaimerContainer.innerHTML = '<p>Disclaimer could not be loaded.</p>';
      });
  }
});
