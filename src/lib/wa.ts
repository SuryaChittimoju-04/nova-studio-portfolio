/**
 * Shared WhatsApp link — used on every CTA across the site.
 * Opens Surya's WhatsApp with a pre-filled message so the customer
 * can tap Send without typing anything.
 */

const WA_NUMBER = "916305779552"; // Surya · +91 63057 79552

const WA_MESSAGE = encodeURIComponent(
  "Hi Nova Studio! 👋 I'm interested in working with you."
);

export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
