document.addEventListener("DOMContentLoaded", function() {
    
    // --- SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before it fully enters
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Stop observing once revealed to only animate once
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- OS DETECTION LOGIC ---
    const osBtns = document.querySelectorAll('.os-btn');
    const dlBtn = document.querySelector('.main-dl-btn');

    // Only run if the buttons actually exist on the page to prevent errors
    if (osBtns.length > 0 && dlBtn) {
        // Auto-detect OS (Basic)
        let userOS = "win"; 
        if (navigator.userAgent.indexOf("Mac") !== -1) userOS = "mac";
        if (navigator.userAgent.indexOf("Linux") !== -1) userOS = "linux";
        if (navigator.userAgent.indexOf("Android") !== -1) userOS = "android";

        // Set Active Button
        osBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.os === userOS) {
                btn.classList.add('active');
                dlBtn.innerText = `Download for ${btn.innerText}`;
            }

            btn.addEventListener('click', () => {
                osBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                dlBtn.innerText = `Download for ${btn.innerText}`;
            });
        });
    }
});