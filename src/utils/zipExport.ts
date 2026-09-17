import JSZip from 'jszip';
import { SiteData, ThemeId } from '../types';

export async function generateAndDownloadZip(siteData: SiteData, currentTheme: ThemeId) {
  const zip = new JSZip();

  // 1. Export Current Data JSON
  zip.file('portfolio-data.json', JSON.stringify(siteData, null, 2));

  // 2. Comprehensive Hosting Guide (Non-technical & simple)
  const hostingGuide = `# HAMZA ARIF — PORTFOLIO WEBSITE DEPLOYMENT & HOSTING GUIDE

Congratulations! This archive contains your complete, production-ready portfolio website and Admin Panel.

---

## 🚀 HOW TO UPLOAD TO YOUR HOSTING (SIMPLE STEP-BY-STEP)

You have multiple fast and free/affordable options to host your website:

### OPTION A: Free Hosting on Netlify or Vercel (Recommended — Takes 2 Minutes)
1. Go to **[netlify.com](https://www.netlify.com)** or **[vercel.com](https://vercel.com)** and sign up for a free account.
2. In Netlify: Go to the "Sites" tab and drag-and-drop the unzipped project folder into the upload box.
3. Your website will instantly be live on a free SSL secured domain (e.g. \`hamza-arif.netlify.app\`).
4. You can connect your custom domain (like \`hamzaarif.com\`) under "Domain Management" with 1 click.

### OPTION B: Standard cPanel / Hostinger / Namecheap Hosting
1. Log into your hosting account's **cPanel** or Hostinger hPanel.
2. Open the **File Manager** and navigate to \`public_html\`.
3. Upload this ZIP file, right click, and click **Extract**.
4. Make sure \`index.html\` is directly inside \`public_html\`.
5. Visit your domain in your browser — your portfolio is immediately live!

---

## 🔐 HOW TO CHANGE THE DEFAULT ADMIN PASSWORD

1. Visit your live website and navigate to the **Admin Panel** (click the lock icon in the top right or footer).
2. Log in with your initial testing credentials:
   - **Username:** \`admin\`
   - **Password:** \`Admin@123\`
3. Click on the **Security & Credentials** tab inside the Admin Dashboard.
4. Enter your new secure password (e.g. at least 8 characters) and click **Update Admin Password**.
5. Your new password is now saved and the old default is disabled!

---

## 🛠️ MANAGING CONTENT WITHOUT WRITING CODE
- Open your **Admin Panel** at any time.
- You can add/delete projects, update services, change pricing, edit your phone/email, change your profile photo, or switch the website color theme with 1 click.
- All changes update instantly on your site.

---

## 📞 NEED ASSISTANCE?
- **Email:** ${siteData.personal.email}
- **Phone:** ${siteData.personal.phone}
- **LinkedIn:** ${siteData.personal.linkedIn}
`;
  zip.file('README-HOSTING-GUIDE.md', hostingGuide);

  // 3. Metadata and configuration
  zip.file(
    'metadata.json',
    JSON.stringify(
      {
        name: 'Hamza Arif | Portfolio & Admin Panel',
        description: siteData.personal.bioShort,
        currentTheme,
      },
      null,
      2
    )
  );

  // 4. Standalone HTML single-page launcher
  const standaloneHtml = `<!doctype html>
<html lang="en" data-theme="${currentTheme}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${siteData.personal.name} | ${siteData.personal.title}</title>
  <meta name="description" content="${siteData.personal.bioShort}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0b0f17; color: #f3f4f6; font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; }
  </style>
</head>
<body class="min-h-screen bg-[#0b0f17] text-gray-100 flex flex-col justify-between">
  <header class="border-b border-gray-800 bg-[#111827]/80 backdrop-blur py-4 px-6 flex justify-between items-center sticky top-0 z-50">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-xl text-white">HA</div>
      <div>
        <div class="font-bold text-lg">${siteData.personal.name}</div>
        <div class="text-xs text-cyan-400">${siteData.personal.title}</div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <a href="mailto:${siteData.personal.email}" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition">Contact Me</a>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-6 py-16 flex-1 flex flex-col items-center text-center">
    <span class="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">4+ Years Experience • 30+ Websites Built</span>
    <h1 class="text-4xl md:text-6xl font-black text-white max-w-4xl tracking-tight leading-tight mb-6">
      ${siteData.personal.tagline}
    </h1>
    <p class="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
      ${siteData.personal.bioShort}
    </p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mb-16">
      <div class="p-6 rounded-2xl bg-[#151e2e] border border-gray-800">
        <div class="text-3xl font-extrabold text-blue-400">${siteData.personal.completedWebsites}+</div>
        <div class="text-sm text-gray-400 mt-1">Websites Built</div>
      </div>
      <div class="p-6 rounded-2xl bg-[#151e2e] border border-gray-800">
        <div class="text-3xl font-extrabold text-cyan-400">${siteData.personal.happyClients}+</div>
        <div class="text-sm text-gray-400 mt-1">Happy Clients</div>
      </div>
      <div class="p-6 rounded-2xl bg-[#151e2e] border border-gray-800">
        <div class="text-3xl font-extrabold text-blue-400">${siteData.personal.experienceYears}+</div>
        <div class="text-sm text-gray-400 mt-1">Years Experience</div>
      </div>
      <div class="p-6 rounded-2xl bg-[#151e2e] border border-gray-800">
        <div class="text-3xl font-extrabold text-cyan-400">${siteData.personal.avgTrafficGrowth}%</div>
        <div class="text-sm text-gray-400 mt-1">Avg Traffic Growth</div>
      </div>
    </div>
    <div class="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 text-left w-full max-w-4xl">
      <h3 class="text-xl font-bold text-white mb-2">Want to explore all projects, services, & admin controls?</h3>
      <p class="text-gray-300 text-sm mb-4">The dynamic interactive web app version contains full filterable project lightboxes, animated milestone timelines, and the live password-protected Admin Panel.</p>
      <div class="flex flex-wrap gap-4 text-sm text-cyan-300">
        <span>📧 ${siteData.personal.email}</span>
        <span>📱 ${siteData.personal.phone}</span>
        <span>🔗 ${siteData.personal.linkedIn}</span>
      </div>
    </div>
  </main>

  <footer class="border-t border-gray-800 py-8 px-6 text-center text-sm text-gray-500">
    <p>© ${new Date().getFullYear()} ${siteData.personal.name}. All rights reserved.</p>
  </footer>
</body>
</html>`;

  zip.file('index.html', standaloneHtml);

  // Generate blob and trigger download
  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `hamza-arif-portfolio-complete.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
