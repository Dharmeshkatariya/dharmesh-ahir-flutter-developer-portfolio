const fs = require('fs');
const path = require('path');

function generatePdf() {
  const chunks = [];
  let offset = 0;
  const objects = [];

  function addObj(content) {
    const id = objects.length + 1;
    const body = `${id} 0 obj\n${content}\nendobj\n`;
    objects.push({ id, body });
  }

  // Object 1: Catalog
  addObj('<< /Type /Catalog /Pages 2 0 R >>');

  // Object 2: Pages
  addObj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');

  // Object 3: Page
  addObj('<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 595 842] /Contents 5 0 R >>');

  // Object 4: Resources
  addObj('<< /Font << /F1 6 0 R /F2 7 0 R >> >>');

  // Objective Text Stream formatting for the Resume
  const textContent = `
BT
/F1 22 Tf
14 TL
50 780 Td
(DHARMESH AHIR - FLUTTER DEVELOPER) Tj
T*
/F2 10 Tf
(Email: katariyadharmesh658@gmail.com   |   Mobile: +91 6354464371) Tj
T*
(GitHub: github.com/Dharmeshkatariya   |   LinkedIn: linkedin.com/in/dharmesh-ahir) Tj
T*
(Address: 419, Nilkanth Plaza, Yogi Chowk, Nana Varachha, Surat, Gujarat 395010) Tj
T*
0 -15 Td
/F1 14 Tf
(PROFESSIONAL PROFILE) Tj
T*
/F2 10 Tf
(Senior Flutter Developer with 3+ years of expert engineering experience crafting high-performance,) Tj
T*
(multithreaded cross-platform mobile apps using clean BLoC/Riverpod setups.) Tj
T*
0 -15 Td
/F1 14 Tf
(KEY DELIVERED METRICS & HERO NUMBERS) Tj
T*
/F2 10 Tf
(- Core Latency Reduction: 45% reduction across high-volume real-time feeds) Tj
T*
(- Direct Frame Paint Speed: Guaranteed 120 FPS render locks on custom render pipelines) Tj
T*
(- Scaled User Reach: 25,000+ active users with sustained positive feedback loops) Tj
T*
0 -15 Td
/F1 14 Tf
(WORK EXPERIENCE) Tj
T*
/F1 11 Tf
(Senior Flutter Developer at Shree Software Solution | Sep 2023 - Present) Tj
T*
/F2 10 Tf
(- Developed and engineered multiple high-performance cross-platform mobile applications in Dart.) Tj
T*
(- Constructed highly responsive client interface architectures on top of clean state models.) Tj
T*
(- Integrated unified REST API gateways to drive resilient and secure backend communication feeds.) Tj
T*
(- Diagnosed heavy heap layouts to identify and terminate lingering runtime memory leaks.) Tj
T*
0 -10 Td
/F1 11 Tf
(Flutter Developer at MTZ Infotech | Sep 2022 - Sep 2023) Tj
T*
/F2 10 Tf
(- Architected, certified, and deployed complete cross-platform mobile solutions for Android & iOS.) Tj
T*
(- Managed direct continuous mobile pipelines using TestFlight & Google Developer panels.) Tj
T*
(- Programmed smooth web modules using standard layouts and hardware-accelerated transitions.) Tj
T*
0 -15 Td
/F1 14 Tf
(FEATURED PRODUCTION PORTFOLIO PROJECTS) Tj
T*
/F2 10 Tf
(1. HELIX CARE TELEHEALTH: HIPAA-compliant appointment booking, medical chats, WebRTC video consultation.) Tj
T*
(2. RESIDO PROPERTY MANAGER: Offline-first real-estate ledger with high-frequency database sync caches.) Tj
T*
(3. KHATA CASH BOOK LEDGER: Micro-merchant credit tracking ledger using HiveDB local indexing.) Tj
T*
(4. PATEL SAMAJ: village society dashboard with verified news boards and student registries.) Tj
T*
(5. VISION NEWS: high-scroll speed magazine system running heavy HTML content parser in Dart isolates.) Tj
T*
0 -15 Td
/F1 14 Tf
(TECHNICAL SKILLSET & COMPETENCIES) Tj
T*
/F2 10 Tf
(Languages: Dart, JavaScript, TypeScript, HTML/CSS, SQL) Tj
T*
(Framework & Design: Flutter SDK, Custom Painters, Platform Channels) Tj
T*
(State Management Tools: BLoC / Cubit, Riverpod, GetX) Tj
T*
(Databases & Local Storage: SQLite, HiveDB, Firebase Firestore, PostgreSQL) Tj
T*
(Protocols & Integrations: WebRTC (STUN/TURN), REST APIs, WebSockets, Stripe Payments) Tj
ET
`.trim();

  // Object 5: Content Stream
  const streamBody = `<< /Length ${textContent.length} >>\nstream\n${textContent}\nendstream`;
  addObj(streamBody);

  // Object 6: Font 1 Bold
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  // Object 7: Font 2 Regular
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  // Build the complete PDF buffer
  let pdfContent = '%PDF-1.4\n';
  const xrefs = [];

  objects.forEach((obj) => {
    xrefs.push(pdfContent.length);
    pdfContent += obj.body;
  });

  const startxref = pdfContent.length;
  pdfContent += 'xref\n';
  pdfContent += `0 ${objects.length + 1}\n`;
  pdfContent += '0000000000 65535 f \n';

  xrefs.forEach((pos) => {
    const formatted = String(pos).padStart(10, '0');
    pdfContent += `${formatted} 00000 n \n`;
  });

  pdfContent += 'trailer\n';
  pdfContent += `<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdfContent += 'startxref\n';
  pdfContent += `${startxref}\n`;
  pdfContent += '%%EOF\n';

  const dir = path.join(process.cwd(), 'assets');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const pdfPath = path.join(dir, 'Dharmesh_Ahir_Flutter_Resume.pdf');
  fs.writeFileSync(pdfPath, Buffer.from(pdfContent, 'utf-8'));
  console.log('PDF Resume successfully generated at:', pdfPath);
}

generatePdf();
