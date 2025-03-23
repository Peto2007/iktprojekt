document.addEventListener('DOMContentLoaded', function() {
    console.log('South Park bemutató weboldal betöltődött!');
    
    // Simább scrollozás a navigációs linkekre kattintva
    document.querySelectorAll('a.nav-link').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if(this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  });
  