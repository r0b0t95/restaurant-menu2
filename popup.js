// Add this to your script.js file or include as a separate script

// Function to open the popup
function openPopup() {
    const popup = document.getElementById('promoPopup');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
  }
  
  // Function to close the popup
  function closePopup() {
    const popup = document.getElementById('promoPopup');
    
    // Add closing animation class
    popup.querySelector('.popup-content').classList.add('popup-closing');
    
    // Wait for animation to finish before hiding
    setTimeout(() => {
      popup.style.display = 'none';
      popup.querySelector('.popup-content').classList.remove('popup-closing');
      document.body.style.overflow = ''; // Restore scrolling
    }, 300);
  }
  
  // Show popup when page loads (after a delay)
  window.addEventListener('load', () => {
    setTimeout(() => {
      openPopup();
    }, 2000); // 2 second delay
  });
  
  // Connect the popup button to close the popup and navigate to menu
  document.getElementById('popup-button').addEventListener('click', () => {
    closePopup();
    // Scroll to menu section if needed
    const menuSection = document.querySelector('.menu-container');
    menuSection.scrollIntoView({ behavior: 'smooth' });
  });
  
  // Close popup when clicking outside content area
  document.getElementById('promoPopup').addEventListener('click', (e) => {
    if (e.target === document.getElementById('promoPopup')) {
      closePopup();
    }
  });