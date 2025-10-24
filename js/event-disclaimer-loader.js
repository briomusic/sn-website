// Load event disclaimer component dynamically
document.addEventListener('DOMContentLoaded', function() {
  const disclaimerContainer = document.getElementById('event-disclaimer-container');
  if (disclaimerContainer) {
    fetch('components/event-disclaimer.html')
      .then(response => response.text())
      .then(html => {
        disclaimerContainer.innerHTML = html;
        console.log('Event disclaimer loaded successfully');
      })
      .catch(error => {
        console.error('Error loading event disclaimer:', error);
        disclaimerContainer.innerHTML = '<p>Event disclaimer could not be loaded.</p>';
      });
  }
});
