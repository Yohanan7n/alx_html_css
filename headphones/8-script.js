Yohan, [6/18/2025 9:54 PM]
document.addEventListener('DOMContentLoaded', function() {
    const heroHeader = document.querySelector('.hero-header');
    const mainNav = document.querySelector('.top-right-nav');

    if (!heroHeader || !mainNav) {
        console.error('Required elements not found: .hero-header or .top-right-nav. Make sure their classes are correct in HTML.');
        return; // Exit if elements are missing
    }

    // 1. Dynamically create and insert the hamburger icon
    const hamburgerIcon = document.createElement('div');
    hamburgerIcon.className = 'hamburger-icon';
    hamburgerIcon.id = 'hamburger-icon'; // Give it an ID for easier selection
    hamburgerIcon.innerHTML = '<i class="fas fa-bars"></i>';
    // Add ARIA attributes for accessibility
    hamburgerIcon.setAttribute('aria-controls', 'main-nav'); // Assuming mainNav will get ID 'main-nav'
    hamburgerIcon.setAttribute('aria-expanded', 'false');

    // Give the main navigation an ID for aria-controls
    mainNav.id = 'main-nav';
    mainNav.setAttribute('aria-hidden', 'true'); // Initially hidden on mobile

    // Insert hamburger icon before the nav within the header
    heroHeader.insertBefore(hamburgerIcon, mainNav);

    // 2. Dynamically inject CSS for responsiveness and hamburger menu
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        /* Hamburger Menu Specific Styles */

        /* Hide the hamburger icon by default on larger screens */
        .hamburger-icon {
            display: none; /* Hidden by default */
            font-size: 1.8em;
            color: #333; /* Adjust color as needed */
            cursor: pointer;
            z-index: 100; /* Ensure it's above other content */
            order: 2; /* To place it visually to the right of the logo */
            margin-left: auto; /* Push it to the right if hero-header is flex */
            padding: 5px; /* Add some clickable area */
            transition: transform 0.3s ease-out; /* Smooth rotation */
        }

        /* Styles for the navigation when it's closed (mobile) */
        .top-right-nav {
            transition: transform 0.3s ease-out, height 0.3s ease-out, opacity 0.3s ease-out; /* Smooth transitions */
        }

        /* Media Query for screens 480px or less */
        @media (max-width: 480px) {
            .hero-header {
                position: relative; /* Essential for absolute positioning of nav */
                flex-wrap: wrap; /* Allow items to wrap */
                justify-content: space-between; /* Space out logo and icon */
                align-items: center;
                padding: 10px 20px; /* Add some padding to the header itself */
            }

            .top-right-nav {
                display: flex; /* Always flex on mobile for positioning/transitions */
                flex-direction: column; /* Stack links vertically */
                width: 100%; /* Take full width */
                position: absolute; /* Position relative to .hero-header */
                top: 100%; /* Position below the header */
                left: 0;
                background-color: rgba(255, 255, 255, 0.95); /* Semi-transparent background */
                border-top: 1px solid #ddd;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                transform: translateY(-100%); /* Start off-screen upwards */
                padding: 0; /* Reset padding from default nav */
                overflow: hidden; /* Hide overflow during transition */
                height: 0; /* Collapse height when hidden */
                opacity: 0; /* Start invisible */
                pointer-events: none; /* Prevent clicks when hidden */
                z-index: 99; /* Below hamburger, above other content */
            }

            .top-right-nav.active {

Yohan, [6/18/2025 9:54 PM]
transform: translateY(0); /* Slide into view */
                height: auto; /* Expand height */
                padding: 20px 0; /* Add padding when open */
                opacity: 1; /* Fully visible */
                pointer-events: auto; /* Enable clicks */
            }

            .top-right-nav ul {
                flex-direction: column; /* Ensure links stack */
                align-items: center; /* Center links */
                width: 100%;
            }

            .top-right-nav li {
                margin: 10px 0; /* Spacing for vertical links */
                width: 100%;
                text-align: center;
            }

            .top-right-nav a {
                display: block; /* Make links block level for full clickable area */
                padding: 10px 0;
                color: #333; /* Ensure readability */
            }

            .hamburger-icon {
                display: block; /* Show the hamburger icon on small screens */
            }

            /* Adjust the default nav display on mobile so only hamburger shows */
            /* This hides the full navigation on mobile when the hamburger menu is closed */
            .hero-header .top-right-nav:not(.active) {
                display: none;
            }

            /* Optional: Adjust header items alignment if needed */
            .hero-header .icon1 {
                 order: 1; /* Keep logo first */
            }

            /* Content adjustments for smaller screens if needed */
            .hero-content h1 {
                font-size: 1.8em;
            }

            .hero-content p {
                font-size: 1em;
            }

            .intro-section,
            .what-we-do-section,
            .results-hero-section,
            .contact-section,
            .footer-content {
                padding-left: 15px;
                padding-right: 15px;
            }

            .features, .stats-container {
                flex-direction: column;
            }

            .feature-item, .stat-item {
                max-width: 90%; /* Adjust width for single column layout */
            }
        }

        .hamburger-icon.open {
            transform: rotate(90deg); /* Rotate when open */
            color: #007bff; /* Change color when open */
        }
    `;
    document.head.appendChild(styleTag);


    // 3. JavaScript for toggling menu
    hamburgerIcon.addEventListener('click', function() {
        const isCurrentlyActive = mainNav.classList.contains('active');

        mainNav.classList.toggle('active'); // Toggles the active class
        this.classList.toggle('open'); // Toggles open class on icon itself

        // Update ARIA attributes for accessibility
        this.setAttribute('aria-expanded', !isCurrentlyActive);
        mainNav.setAttribute('aria-hidden', isCurrentlyActive); // If it was active, it's now hidden
    });

    // Close the menu if a link inside it is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            hamburgerIcon.classList.remove('open');
            hamburgerIcon.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-hidden', 'true');
        });
    });

    // Close the menu if clicked anywhere outside (optional, but good for UX)
    document.addEventListener('click', (event) => {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnHamburger = hamburgerIcon.contains(event.target);

        if (mainNav.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
            mainNav.classList.remove('active');
            hamburgerIcon.classList.remove('open');
            hamburgerIcon.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-hidden', 'true');
        }
    });

Yohan, [6/18/2025 9:54 PM]
// Set initial aria-hidden state based on screen size
    const mediaQuery = window.matchMedia('(max-width: 480px)');
    function handleMediaQueryChange(e) {
        if (e.matches) { // Screen is 480px or less
            // Ensure menu starts hidden when entering mobile view
            if (!mainNav.classList.contains('active')) {
                mainNav.setAttribute('aria-hidden', 'true');
                hamburgerIcon.setAttribute('aria-expanded', 'false');
            }
        } else { // Screen is larger than 480px
            mainNav.setAttribute('aria-hidden', 'false'); // Always visible on desktop
            hamburgerIcon.setAttribute('aria-expanded', 'false'); // Hamburger is not "expanding" anything on desktop
            mainNav.classList.remove('active'); // Close menu if resized to desktop view
            hamburgerIcon.classList.remove('open');
        }
    }

    handleMediaQueryChange(mediaQuery); // Set initial state
    mediaQuery.addEventListener('change', handleMediaQueryChange); // Listen for changes in screen size
});
