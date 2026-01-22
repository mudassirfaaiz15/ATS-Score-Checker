# 📄 ATS Score Checker – Resume Analyzer

🔗 **Live Demo:** https://ats-by-faaiz.vercel.app/

A modern, real-world web application that analyzes resumes against job descriptions to generate an **ATS (Applicant Tracking System) compatibility score** and provide **actionable suggestions** for resume optimization.

Built to help students and job seekers improve shortlisting chances by making resumes more aligned with how actual ATS systems work.

---

## 📌 Problem Statement

Many resumes are rejected automatically by ATS systems before reaching recruiters due to:
- Poor keyword alignment  
- Weak formatting  
- Missing skills  
- Unoptimized content  

This project addresses that gap by providing a tool that:
> Simulates ATS evaluation and guides users to improve their resumes effectively.

---

## ✨ Key Features

- 📄 **Resume Upload** – Supports TXT, PDF, DOC, and DOCX formats  
- 📝 **Job Description Input** – Upload a JD file or paste text directly  
- 📊 **ATS Score Analysis** – Generates score from 0–100  
- 💡 **Smart Suggestions** – Categorized feedback for improvement  
- 🎯 **Keyword Matching** – Shows matched and missing keywords  
- ⚡ **Real-time Analysis** – Fast, client-side processing  
- 🎨 **Modern UI** – Clean, responsive design  
- 📱 **Mobile Friendly** – Fully responsive on all devices  

---

## 🧠 How It Works

1. Upload your resume (PDF/DOCX/TXT)  
2. Upload or paste the job description  
3. Click **"Analyze Resume"**  
4. Get:
   - ATS Compatibility Score  
   - Matched vs Missing Keywords  
   - Personalized improvement suggestions  

---

## 📊 Scoring Algorithm

The ATS score is calculated using a weighted evaluation model:

| Component           | Weight |
|--------------------|--------|
| Keyword Matching    | 40%    |
| Formatting & Structure | 20% |
| Skills Match        | 20%    |
| Certifications      | 10%    |
| Content Quality     | 10%    |

**Content Quality checks include:**
- Use of action verbs  
- Presence of quantifiable achievements  
- Clarity of bullet points  
- Professional tone  

This creates a realistic simulation of how resumes are evaluated by automated screening systems.

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript  
- **Build Tool:** Vite  
- **Styling:** Tailwind CSS v4  
- **UI Components:** shadcn/ui + Radix UI  
- **Animations:** Motion (Framer Motion)  
- **Icons:** Lucide React  
- **Deployment:** Vercel  
- **Version Control:** Git & GitHub  

---

## 📂 Project Structure

├── src/
│   ├── app/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   └── figma/        # Figma-specific components
│   │   ├── utils/            # Utility functions
│   │   └── App.tsx           # Main application component
│   ├── styles/               # CSS and styling files
│   └── main.tsx              # Application entry point
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration

└── package.json              # Dependencies and scripts


