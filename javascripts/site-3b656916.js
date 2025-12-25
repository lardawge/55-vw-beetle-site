// This is where it all goes :)
import '../stylesheets/site-162dc86e.css.scss'
// import 'bootstrap/js/dist/alert';
// import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/carousel';
import Collapse from 'bootstrap/js/dist/collapse';
// import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/offcanvas';
// import 'bootstrap/js/dist/popover';
// import 'bootstrap/js/dist/scrollspy';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/toast';
// import 'bootstrap/js/dist/tooltip';

import Lightbox from './bs5-lightbox'

const options = {
	keyboard: true,
	size: 'fullscreen',
	constrain: true,
	ride: false
};

document.querySelectorAll('[data-toggle="lightbox-c"]').forEach((el) => el.addEventListener('click', (e) => {
	e.preventDefault();

	if (window.sa_event) {
		window.sa_event('lightbox_opened');
	}

	const lightbox = new Lightbox(el, options);
	lightbox.show();
}));

// Make magnifying glass icons trigger lightbox
document.querySelectorAll('.magnify-icon').forEach((icon) => {
	icon.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();

		// Find the parent link with lightbox trigger
		const link = icon.closest('.img-thumb')?.querySelector('[data-toggle="lightbox-c"]');
		if (link) {
			if (window.sa_event) {
				window.sa_event('lightbox_opened');
			}
			const lightbox = new Lightbox(link, options);
			lightbox.show();
		}
	});

	// Make icon appear clickable
	icon.style.cursor = 'pointer';
});

// Smooth scrolling and analytics for navigation links
document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"], .navbar-brand[href^="#"]');

	navLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (!href || href === '#') return;

			// Track analytics
			const section = href.substring(1); // Remove the #
			const eventName = `nav_${section}_clicked`;
			if (window.sa_event) {
				window.sa_event(eventName);
			}

			// Smooth scroll
			const targetId = href.substring(1);
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				e.preventDefault();

				// Close mobile menu if open
				const navbarCollapse = document.getElementById('navbarNav');
				if (navbarCollapse && navbarCollapse.classList.contains('show')) {
					const bsCollapse = Collapse.getInstance(navbarCollapse) || new Collapse(navbarCollapse, {
						toggle: false
					});
					bsCollapse.hide();
				}

				// Calculate offset for sticky navbar
				const navbar = document.querySelector('.navbar');
				const navbarHeight = navbar ? navbar.offsetHeight : 0;
				const targetPosition = targetElement.offsetTop - navbarHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
});
