<<<<<<< HEAD
# Josh Yeung — Portfolio

A clean, modern, fully responsive one-page portfolio for recruiters, hiring managers, and collaborators.

## Features
- One-page layout: Hero, About, Projects, Experience, CV, Contact
- Minimal design with electric blue accent (#00BFFF)
- Dark/Light mode toggle with saved preference
- Smooth scrolling and active nav highlight
- Responsive grid (mobile-first)
- Accessible (labels, alt text, focus states, contrast)
- Back-to-top button
- EmailJS-ready contact form (with mailto fallback)

## Getting Started
1. Open `index.html` in your browser, or serve locally:
   - With VS Code Live Server or any static server
2. Replace placeholders:
   - `assets/Josh_Yeung_CV.pdf`
   - Images in `assets/images/`
   - Social links, email address, and project links in `index.html`

## EmailJS Setup (optional)
1. Create an account at `https://www.emailjs.com/`
2. Add a service and email template. Ensure your template has fields: `name`, `email`, `message`.
3. In `index.html`, set these attributes on the contact container:
   - `data-emailjs-public-key="YOUR_PUBLIC_KEY"`
   - `data-emailjs-service-id="YOUR_SERVICE_ID"`
   - `data-emailjs-template-id="YOUR_TEMPLATE_ID"`
4. Deploy. The form will send via EmailJS. If not configured, it falls back to opening the user's email client.

## Customize
- Colors and spacing: `styles.css` CSS variables in `:root`
- Typography: Poppins (headings), Inter (body)
- Section content: Edit relevant sections in `index.html`
- Add more projects: Duplicate a `.project-card`

## Notes
- Fully static. Works on GitHub Pages/Netlify/Vercel.
- Cross-browser: modern evergreen browsers. `color-mix()` has wide support; you can replace with rgba if needed.

## License
MIT — feel free to use and adapt. 
=======
# PortfolioWebsite
>>>>>>> d5416f70e8634f4adeb04e0a98295f4834e78c8a
