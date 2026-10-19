/**
 * Generates public/og.png — the link-preview card shown when the site is
 * shared on WhatsApp / LinkedIn / Slack / X.
 *   node scripts/make-og.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { metrics, profile } from "../src/data/portfolio.js";

const W = 1200;
const H = 630;
const out = fileURLToPath(new URL("../public/og.png", import.meta.url));

const stats = [metrics.calls, metrics.latency, metrics.campaigns, metrics.clients];
const statW = 250;
const statGap = 16;
const statX0 = 80;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 40) scale(900 620)">
      <stop offset="0" stop-color="#ffb454" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#ffb454" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="name" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#d9d9de"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0c0c0e"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- title bar -->
  <rect width="${W}" height="56" fill="#1c1c1e"/>
  <rect y="56" width="${W}" height="1" fill="#2c2c2e"/>
  <circle cx="32" cy="28" r="8" fill="#ff5f57"/>
  <circle cx="58" cy="28" r="8" fill="#febc2e"/>
  <circle cx="84" cy="28" r="8" fill="#28c840"/>
  <text x="${W / 2}" y="35" text-anchor="middle" font-family="Segoe UI, Arial" font-size="18" fill="#aeaeb2">${profile.handle} — -zsh</text>

  <!-- prompt -->
  <text x="80" y="140" font-family="Consolas, monospace" font-size="26" xml:space="preserve"><tspan fill="#3dd68c" font-weight="700">${profile.handle}</tspan><tspan fill="#6e6e73">@</tspan><tspan fill="#64d2ff" font-weight="700">mac</tspan><tspan fill="#ffd60a"> ~ % </tspan><tspan fill="#ffffff">whoami</tspan></text>

  <text x="76" y="250" font-family="Segoe UI, Arial" font-weight="700" font-size="96" letter-spacing="-3" fill="url(#name)">${esc(profile.name)}</text>
  <text x="80" y="310" font-family="Segoe UI, Arial" font-weight="600" font-size="32" fill="#ffb454">${esc(profile.title)} · ${esc(profile.company)}</text>
  <text x="80" y="356" font-family="Segoe UI, Arial" font-size="24" fill="#8e8e93">AI voice platforms · Backend &amp; distributed systems · AWS</text>

  ${stats
    .map((m, i) => {
      const x = statX0 + i * (statW + statGap);
      return `
  <rect x="${x}" y="410" width="${statW}" height="118" rx="12" fill="#141416" stroke="#2c2c2e"/>
  <text x="${x + 22}" y="478" font-family="Segoe UI, Arial" font-weight="700" font-size="46" letter-spacing="-1.5" fill="#ffffff">${esc(m.value)}</text>
  <text x="${x + 22}" y="509" font-family="Consolas, monospace" font-size="15" fill="#8e8e93">${esc(m.label.toUpperCase())}</text>`;
    })
    .join("")}

  <text x="80" y="590" font-family="Consolas, monospace" font-size="20" fill="#6e6e73">${esc(profile.location)}</text>
  <text x="${W - 80}" y="590" text-anchor="end" font-family="Consolas, monospace" font-size="20" fill="#ffb454">parthivvarati.me ↗</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`wrote ${out}`);
