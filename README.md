# ATS Score Checker

A modern web application that analyzes resumes against job descriptions to provide an ATS (Applicant Tracking System) compatibility score and actionable suggestions for optimization.

## Features

- 📄 **Resume Upload**: Support for TXT, PDF, DOC, and DOCX formats
- 📝 **Job Description Input**: Upload or type/paste job descriptions
- 📊 **ATS Score Analysis**: Get a comprehensive score based on keyword matching, formatting, skills, and certifications
- 💡 **Smart Suggestions**: Receive categorized, prioritized suggestions for improving your resume
- 🎨 **Modern UI**: Beautiful, responsive interface built with React, TypeScript, and Tailwind CSS
- ⚡ **Real-time Analysis**: Fast, client-side analysis with instant feedback

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for styling
- **Radix UI** components for accessible UI primitives
- **Motion** (Framer Motion) for animations
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
pnpm build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
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
```

## How It Works

1. **Upload Resume**: Upload your resume file (TXT, PDF, DOC, DOCX)
2. **Add Job Description**: Either upload a job description file or type/paste it directly
3. **Analyze**: Click "Analyze Resume" to get your ATS score
4. **Review Results**: 
   - View your ATS compatibility score (0-100)
   - See matched and missing keywords
   - Get categorized suggestions for improvement

## Scoring Algorithm

The ATS score is calculated based on:
- **Keyword Matching (40%)**: How well your resume matches job description keywords
- **Formatting (20%)**: Proper structure, sections, and formatting
- **Skills Match (20%)**: Alignment of technical and soft skills
- **Certifications (10%)**: Relevant certifications mentioned
- **Content Quality (10%)**: Action verbs, quantifiable metrics, and overall content

## Deployment

This application can be easily deployed to various hosting platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect Vite and deploy automatically
4. Your app will be live in ~2 minutes!

**Alternative platforms**: Netlify, GitHub Pages, Render (see DEPLOYMENT.md for details)

## License

This project includes components from [shadcn/ui](https://ui.shadcn.com/) used under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

## Original Design

The original Figma design is available at: https://www.figma.com/design/sqbSLT2aqWMF4GO0j3reDd/ATS-Score-Checker
