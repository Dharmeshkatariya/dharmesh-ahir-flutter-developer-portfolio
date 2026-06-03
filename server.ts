import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper for offline fallback mode when GEMINI_API_KEY is not configured
function getOfflineResponse(message: string): string {
  const query = message.toLowerCase();
  const db = getDb();
  const offline = db.offlineResponses || {};
  
  const intro = "### Dharmesh AI Representative (Offline Mode)\n\n";
  const note = "\n\n---\n*🌐 You are seeing an offline response from a local representative engine because no server-side **GEMINI_API_KEY** was found in Settings > Secrets. You can add one anytime to unlock real-time Gemini-3.5-Flash interactions!*";

  if (query.includes("cv") || query.includes("resume") || query.includes("bio") || query.includes("profile")) {
    return (offline.cv || (intro + 
      "Dharmesh is a specialized Flutter & Dart Engineer (Surat, Gujarat) with 3+ years of professional high-performance development experience.\n\n" +
      "**Get Print-Ready Resume:**\n" +
      "You can easily download his structured PDF resume by clicking the **\"Download CV\"** button located directly in the header of this portfolio interface. It will generate a beautiful, modern, print-ready layout instantly!\n\n" +
      "Would you like me to tell you about his expert skills or major projects like the Helix Care Platform?")) + note;
  }
  
  if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("hire") || query.includes("mobile") || query.includes("call") || query.includes("address")) {
    return (offline.contact || (intro +
      "Here are Dharmesh Ahir's official direct coordinates for design, consulting, and full-time hiring enquiries:\n\n" +
      "- **Email Link:** [katariyadharmesh658@gmail.com](mailto:katariyadharmesh658@gmail.com)\n" +
      "- **Mobile Direct:** [+91 6354464371](tel:+916354464371)\n" +
      "- **GitHub:** [github.com/katariyadharmesh](https://github.com/katariyadharmesh)\n" +
      "- **LinkedIn:** [linkedin.com/in/dharmesh-ahir](https://linkedin.com/in/dharmesh-ahir)\n" +
      "- **Studio Address:** 419, 4th Floor, Nilkanth Plaza, Yogi Chowk, Surat, Gujarat, India (395010)\n\n" +
      "I highly recommend reaching out directly via email or phone call to discuss critical timelines, architectures, or collaborations!")) + note;
  }
  
  if (query.includes("skill") || query.includes("tech") || query.includes("flutter") || query.includes("dart") || query.includes("bloc") || query.includes("riverpod") || query.includes("getx") || query.includes("state")) {
    return (offline.skills || (intro +
      "Dharmesh Ahir has built a robust masterclass of technical expertise around Dart and the cross-platform Flutter framework:\n\n" +
      "1. **Core Architecture Principles:** Multithreading concepts utilizing custom Dart Isolates for background computation, custom painters for advanced custom UI, and sound memory management patterns (mitigating controller/stream leaks).\n" +
      "2. **State Management Masterclass:** Fully proficient in BLoC (ideal/robust patterns for scalable enterprise teams), Riverpod (declarative compile-time state safety), and GetX (high-velocity MVP deployment).\n" +
      "3. **Database & Sync:** Implementation of offline-first synchronizations with local caches like HiveDB and SQLite repositories combined with real-time Firebase Firestore database listeners.\n" +
      "4. **WebRTC & Streaming:** Configured end-to-end encrypted video and audio consultation pipelines over custom STUN/TURN nodes for low-latency calls.")) + note;
  }
  
  if (query.includes("project") || query.includes("work") || query.includes("experience") || query.includes("app") || query.includes("portfolio")) {
    return (offline.projects || (intro +
      "Dharmesh's professional software portfolio is highlight-packed with reliable high-volume apps:\n\n" +
      "- **Helix Care Platform:** A healthcare/telehealth ecosystem featuring interactive medical dashboard analytics, calendar synchronizations, and low-latency encrypted consultation channels (powered by custom WebRTC layers).\n" +
      "- **Resido Property Admin:** A full-stack real-estate management administration application comprising advanced maps integrations, image/document upload queues, and automated reporting systems.\n" +
      "- **Khata Ledger:** An ledger utility for offline-safe commercial or individual credits tracking, utilizing high-performance Hive local storage triggers combined with automated cloud backup nodes.\n\n" +
      "All these applications stand as testament to his focus on optimized frame rendering, absolute type-safety, and meticulous visual alignment!")) + note;
  }
  
  if (query.includes("hello") || query.includes("hi ") || query.includes("hey")) {
    return (offline.hello || (intro +
      "Greetings! I am **Dharmesh AI**, the virtual representative of Dharmesh Ahir. 👋\n\n" +
      "I am here to tell you everything you want to know about his 3+ years of expert Flutter & Dart capabilities, his state management architecture structures (BLoC, Riverpod, GetX), and how we can add pristine layouts and high performance under the hood of your next mobile apps.\n\n" +
      "How can I assist you today? You can ask me about his contact channels, main projects, or downloading his Resume.")) + note;
  }
  
  return (offline.default || (intro +
    "I am **Dharmesh AI**, Dharmesh Ahir's custom-trained digital representative. I'm glad you asked!\n\n" +
    "Dharmesh is a high-volume **Senior Flutter Developer** based in Surat, Gujarat, specialized in building industrial-scale, offline-first mobile apps with BLoC, Riverpod, and WebRTC streaming capacities.\n\n" +
    "Please ask me anything about:\n" +
    "- His direct contact channels (email, phone, studio address)\n" +
    "- State management paradigms comparison (BLoC vs GetX vs Riverpod)\n" +
    "- Highlights of projects like the **Helix Care Platform**\n" +
    "- How to download a print-ready copy of his CV\n\n" +
    "Let me know what you are looking for!")) + note;
}

// API route for AI Portfolio Assistant Q&A
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message content cannot be blank" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const text = getOfflineResponse(message);
      return res.json({ text });
    }

    // Modern SDK client initialization as defined in gemini-api skill
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `You are "Dharmesh AI", the highly polished, friendly, and expert AI Representative of Dharmesh Ahir.
Dharmesh Ahir is a Senior Flutter Developer with over 3 years of professional experience building high-performance cross-platform Android, iOS, and Web solutions. He lives in Surat, Gujarat, India.

His Contact Channels (Always specify clearly and accurately if asked):
- Email Connection: katariyadharmesh658@gmail.com
- Mobile Direct: +91 6354464371
- Studio Address: 419, 4th Floor, Nilkanth Plaza, Yogi Chowk, Chikuwadi, Nana Varachha, Surat, Gujarat 395010
- GitHub profile: https://github.com/katariyadharmesh
- LinkedIn Profile: https://linkedin.com/in/dharmesh-ahir

Key Information Base on Dharmesh:
- Flutter & Dart Ecosystem Expert. Excellent with asynchronous design, Multi-threading (Isolates), custom painters, platform channels, and memory leak mitigation.
- State Management Stack: Fully proficient in comparing, structuring, and using BLoC (ideal/robust patterns for large teams), GetX (fast-paced MVP scaling), and Riverpod (declarative compile-time state safety).
- Database Architectures: Experienced building Offline-first synchronizations with local HiveDB triggers, SQLite repositories, and cloud repositories like Firebase Firestore.
- WebRTC & Streaming: Handled encrypted low-latency video and audio consultation sessions over STUN/TURN configurations.
- REST & WebSockets: Implemented optimized telemetry feeds, real-time message structures, and complex payment channels (Stripe and Razorpay).

Your Personality & Conversational Directives:
- Respond in a warm, clean, and professional "Creative Director" persona. Keep text explanations clear, concise, highly informative, and easy to read.
- If they ask about his resume/CV, let them know they can click the custom "Get CV" action button centered directly in the top header section, which automatically generates a print-ready modern PDF!
- Do not make up facts. If asked about arbitrary details outside his profile, politely bridge it back to his Flutter architect capabilities and availability.
- Be technical and elegant when describing code systems. For instance, if asked about BLoC, discuss stream event loops, structured transitions, and state encapsulation.
- Offer to recommend specific projects like "Helix Care Platform", "Resido property admin", or "Khata ledger" for their requirements.`;

    // Map client conversation history to Gemini parts
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    // Append the active prompt
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: result.text || "I apologize, I could not formulate a response. Please query again." });
  } catch (error: any) {
    console.error("Gemini Assistant Engine Error:", error);
    res.status(500).json({ error: error.message || "Internal server error occurred." });
  }
});

// Helper to read database safely
function getDb() {
  const dbPath = path.join(process.cwd(), "db.json");
  try {
    if (!fs.existsSync(dbPath)) {
      return { profile: {}, projects: [], experiences: [], contacts: [], socials: [] };
    }
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database:", err);
    return { profile: {}, projects: [], experiences: [], contacts: [], socials: [] };
  }
}

// Helper to write database safely
function saveDb(data: any) {
  const dbPath = path.join(process.cwd(), "db.json");
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

// Dynamic endpoints for live portfolio sync
app.get("/api/profile", (req, res) => {
  const db = getDb();
  res.json(db.profile || {});
});

app.get("/api/projects", (req, res) => {
  const db = getDb();
  res.json(db.projects || []);
});

app.get("/api/experience", (req, res) => {
  const db = getDb();
  res.json(db.experiences || []);
});

app.get("/api/contacts", (req, res) => {
  const db = getDb();
  res.json(db.contacts || []);
});

app.get("/api/socials", (req, res) => {
  const db = getDb();
  res.json(db.socials || []);
});

app.post("/api/contact", (req, res) => {
  try {
    const { name, email, message, layoutType } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required fields" });
    }
    
    const db = getDb();
    if (!db.contacts) {
      db.contacts = [];
    }
    
    const newInquiry = {
      id: "msg-" + Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString(),
      layoutType: layoutType || "classic",
      replied: false
    };
    
    db.contacts.push(newInquiry);
    saveDb(db);
    
    res.status(201).json({ success: true, message: "Inquiry logged successfully in backend database!", data: newInquiry });
  } catch (error: any) {
    console.error("Error recording inquiry:", error);
    res.status(500).json({ error: "Failed to save dynamic backend inquiry." });
  }
});

app.get("/api/cv/download", (req, res) => {
  const possiblePaths = [
    path.join(process.cwd(), "assets", "Dharmesh_Ahir_Flutter_Resume.pdf"),
    path.join(process.cwd(), "assets", "Resume.pdf"),
    path.join(process.cwd(), "assets", ".aistudio", "Dharmesh_Ahir_Flutter_Resume.pdf")
  ];
  
  let pdfPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      pdfPath = p;
      break;
    }
  }

  if (pdfPath) {
    res.setHeader("Content-Disposition", "attachment; filename=Dharmesh_Ahir_Flutter_Resume.pdf");
    res.setHeader("Content-Type", "application/pdf");
    return res.sendFile(pdfPath);
  }

  const db = getDb();
  const p = db.profile || {};
  
  const projectsStr = (db.projects || []).map((proj: any) => {
    const metricsStr = (proj.metrics || []).map((m: any) => `- ${m.label}: ${m.value}`).join("\n");
    return `### ${proj.title}
Role: Expert Flutter Developer
Category: ${proj.category || "Development"}
Problem: ${proj.problem || ""}
Solution: ${proj.solution || ""}
Architecture: ${proj.architecture || ""}
Results: ${proj.results || ""}
Key Metrics:
${metricsStr || "- Metrics compiled: 100% compliant"}
Tech Stack: ${(proj.techStack || []).join(", ")}
Source/Demo: ${proj.github || ""} | ${proj.demoUrl || ""}\n`;
  }).join("\n---\n\n");

  const expStr = (db.experiences || []).map((exp: any) => {
    const detailsStr = (exp.details || []).map((d: any) => `- ${d}`).join("\n");
    return `### ${exp.role} at ${exp.company}
Period: ${exp.period} | Location: ${exp.location}
Key Achievements:
${detailsStr}
Core Technologies: ${(exp.skills || []).join(", ")}\n`;
  }).join("\n---\n\n");

  const resumeText = `========================================================
             DHARMESH AHIR - RESUME / CV
========================================================
Role: ${p.title || "Flutter Developer"}
Email: ${p.email || "katariyadharmesh658@gmail.com"}
Phone: ${p.mobile || "+91 6354464371"}
GitHub: ${p.github || "https://github.com/Dharmeshkatariya"}
LinkedIn: ${p.linkedin || "https://linkedin.com/in/dharmesh-ahir"}
Address: ${p.address || ""}

BIO & EXECUTIVE SUMMARY:
${p.bio || "Senior Flutter Developer with 3+ years of expert engineering experience crafting high-performance, multithreaded cross-platform mobile apps using clean BLoC/Riverpod setups."}

--------------------------------------------------------
KEY PRODUCTION METRICS DELIVERED:
- Latency Reduction: ${p.metrics?.latencyReduction || "45%"}
- Frame Paint Rate: ${p.metrics?.renderingRate || "120 FPS"}
- Scaled User Reach: ${p.metrics?.activeUsers || "25k+"}

========================================================
PROFESSIONAL EXPERIENCE RECORD:
========================================================
${expStr}

========================================================
KEY CAPTIONED PORTFOLIO PROJECTS:
========================================================
${projectsStr}

========================================================
Generated Dynamically from Live Portfolio Backend Engine
========================================================`;

  res.setHeader("Content-Disposition", "attachment; filename=Dharmesh_Ahir_Flutter_Resume.txt");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(resumeText);
});

app.get(["/Resume.pdf", "/Dharmesh_Ahir_Flutter_Resume.pdf"], (req, res) => {
  const possiblePaths = [
    path.join(process.cwd(), "assets", "Dharmesh_Ahir_Flutter_Resume.pdf"),
    path.join(process.cwd(), "assets", "Resume.pdf"),
    path.join(process.cwd(), "assets", ".aistudio", "Dharmesh_Ahir_Flutter_Resume.pdf")
  ];
  let pdfPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      pdfPath = p;
      break;
    }
  }
  if (pdfPath) {
    res.setHeader("Content-Disposition", "attachment; filename=Dharmesh_Ahir_Flutter_Resume.pdf");
    res.setHeader("Content-Type", "application/pdf");
    return res.sendFile(pdfPath);
  }
  res.status(404).send("Resume PDF asset not found");
});

async function runApplication() {
  // Vite integration in development, static build files in production module
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dharmesh Portfolio Fullstart Server running on port ${PORT}`);
  });
}

runApplication();
