// --- Scroll Reveal Animation ---
// This ensures your content smoothly fades in as you scroll down the page
document.addEventListener("DOMContentLoaded", function() {
    const revealElements = document.querySelectorAll('.reveal');

    const scrollObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once it appears
            }
        });
    }, { 
        threshold: 0.1, // Triggers when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" 
    });

    revealElements.forEach(element => {
        scrollObserver.observe(element);
    });
});