# Josh Yeung — Portfolio

A clean, modern, fully responsive one-page portfolio.

## Features
- One-page layout: Hero, About, Projects, Experience, CV, Contact
- Minimal design with electric blue accent (#00BFFF)
- Smooth scrolling and active nav highlight
- Responsive grid (mobile-first)
- Accessible (labels, alt text, focus states, contrast)
- Back-to-top button
- EmailJS-ready contact form
 
## Education Journey (new)

This project now includes an "Education Journey" section — a vertical timeline that visually showcases academic milestones. Features:

- Vertical timeline with logo/icon on the left, a connecting center line and dot, and a detail card on the right.
- Scroll-triggered reveal animations (IntersectionObserver). Items are keyboard-focusable and respect the user's reduced-motion preference.

How to edit:

- File: `index.html`
	- The section has id `education`.
	- Each timeline entry is a `.timeline-item` block. Duplicate an existing `.timeline-item` to add more entries and update text and dates.
	- Replace the placeholder `.edu-logo` content with an `<img>` if you want institution logos (use `loading="lazy"` for images).

- File: `styles.css`
	- Timeline styling is under the comment `/* Education Journey / Timeline */`.
	- Tweak colors, spacing, and transitions here.

- File: `script.js`
	- IntersectionObserver logic handles reveal. You can adjust threshold and stagger timings here. The script also adds `tabindex="0"` for keyboard focus.

Accessibility notes:

- Keyboard: timeline items are focusable (use Tab). Focus adds the same visual emphasis as scrolling into view.
- Motion: users with `prefers-reduced-motion` enabled will not see stagger delays.


