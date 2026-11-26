# ResumePro 📄

Create professional resumes easily — build modern resumes in minutes with **live preview** and one-click **PDF download**.

🔗 **Live demo:** https://ashudhanda.github.io/resumepro/

## ✨ Features

- **Resume Builder form** — name, job role, email, phone, location, about me, education, experience, skills
- **Live preview** — the resume updates on the right side as you type
- **Validation** — inline error messages for required fields (valid email, 10-digit phone, etc.)
- **Download as PDF** — export your finished resume (opens the browser print dialog, so choose "Save as PDF" as the destination)
- **Print-ready** — the print stylesheet hides the nav, form, contact and about sections and formats just the resume for A4 (15mm margins)
- **Contact form** — powered by EmailJS
- **Keyboard friendly** — press Enter in any field to submit the builder or the contact section (Enter inside a text area still adds a new line)

## ✅ Validation rules

Every field in the builder is required. On Download PDF the form checks:

- **Name, role, location, about me, education, experience, skills** — must not be empty
- **Email** — must look like `name@example.com` (a domain with at least a 2-character ending)
- **Phone** — exactly 10 digits; the field only accepts digits, so pasted text is cleaned up automatically (pasting "+91 98765 43210" or "09876543210" keeps just the 10-digit number)
- **Skills** — comma-separated; the same skill typed twice (even with different capitalisation) shows up once in the preview; a field with only commas counts as empty

Errors appear under the field, the field gets a red border, and focus moves to the first field that failed. The contact form checks name, a valid email, and a non-empty message the same way.

## ♿ Accessibility

- **Skip link** — keyboard users can jump straight to the resume builder
- **Live error messages** — validation errors are announced via `aria-live="polite"`, and focus moves to the first field that failed
- **Visible focus** — links, buttons and fields get a clear outline on keyboard focus (`:focus-visible`)
- **Reduced motion** — smooth scrolling is disabled when the OS asks for it
- **Single h1** — the page has one top-level heading; the resume preview name is an h2
- **No-JS notice** — a `<noscript>` message explains the builder needs JavaScript

## 📁 Project structure

- `index.html` — page markup: builder form, live preview, contact and about sections
- `style.css` — all styling, including the A4 print stylesheet
- `script.js` — live preview, validation, phone cleanup, PDF via print, EmailJS contact form
- `favicon.svg` — site icon
- `ashu.png`, `shinu.png`, `teacher.png` — team and mentor photos

## 🛠 Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- [EmailJS](https://www.emailjs.com/) for the contact form

## 🚀 Run locally

```bash
git clone https://github.com/ashudhanda/resumepro.git
cd resumepro
# open index.html in your browser
```

## 👥 Team

Built by **Ashu** and **Deepansh**, under the guidance of **Dr. Abhishek Thakur**.
