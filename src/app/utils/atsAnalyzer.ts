interface AnalysisResult {
  score: number;
  suggestions: Suggestion[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

interface Suggestion {
  category: 'keywords' | 'certifications' | 'skills' | 'improvements' | 'format';
  title: string;
  items: string[];
  priority: 'high' | 'medium' | 'low';
}

export function analyzeResume(resumeText: string, jobDescription: string): AnalysisResult {
  const resume = resumeText.toLowerCase();
  const jobDesc = jobDescription.toLowerCase();

  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobDesc);
  const resumeKeywords = extractKeywords(resume);

  // Calculate keyword match
  const matchedKeywords = jobKeywords.filter(keyword => resume.includes(keyword));
  const missingKeywords = jobKeywords.filter(keyword => !resume.includes(keyword));
  const keywordScore = (matchedKeywords.length / jobKeywords.length) * 40;

  // Check for formatting issues
  const formatScore = checkFormatting(resumeText) * 20;

  // Check for relevant skills
  const skillsScore = checkSkills(resume, jobDesc) * 20;

  // Check for certifications
  const certScore = checkCertifications(resume, jobDesc) * 10;

  // Check for action verbs and metrics
  const contentScore = checkContent(resume) * 10;

  const totalScore = Math.min(
    Math.round(keywordScore + formatScore + skillsScore + certScore + contentScore),
    100
  );

  const suggestions = generateSuggestions(
    missingKeywords,
    jobDesc,
    resume,
    resumeText,
    totalScore
  );

  return {
    score: totalScore,
    suggestions,
    matchedKeywords,
    missingKeywords,
  };
}

function extractKeywords(text: string): string[] {
  // Common stop words to filter out
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
  ]);

  // Extract words (2-3 word phrases and single words)
  const words = text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  // Get unique keywords with frequency > 1
  const wordFreq: { [key: string]: number } = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  // Get bigrams (two-word phrases)
  const bigrams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    if (!stopWords.has(words[i]) && !stopWords.has(words[i + 1])) {
      bigrams.push(bigram);
    }
  }

  const keywords = [
    ...Object.keys(wordFreq).filter(word => wordFreq[word] > 1),
    ...bigrams.filter(bg => text.split(bg).length - 1 > 1),
  ];

  return [...new Set(keywords)].slice(0, 30);
}

function checkFormatting(text: string): number {
  let score = 0;

  // Check for sections
  const hasSections = /experience|education|skills|summary/i.test(text);
  if (hasSections) score += 0.3;

  // Check for bullet points or structured format
  const hasStructure = /[•\-\*]|^\d+\./m.test(text);
  if (hasStructure) score += 0.3;

  // Check for contact information
  const hasContact = /@|phone|email|linkedin/i.test(text);
  if (hasContact) score += 0.2;

  // Not too short, not too long
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 200 && wordCount < 1500) score += 0.2;

  return Math.min(score, 1);
}

function checkSkills(resume: string, jobDesc: string): number {
  const commonSkills = [
    'python', 'java', 'javascript', 'react', 'node', 'sql', 'aws', 'azure',
    'docker', 'kubernetes', 'git', 'agile', 'scrum', 'leadership', 'communication',
    'project management', 'data analysis', 'machine learning', 'ai', 'excel',
  ];

  const jobSkills = commonSkills.filter(skill => jobDesc.includes(skill));
  const resumeSkills = jobSkills.filter(skill => resume.includes(skill));

  if (jobSkills.length === 0) return 0.7; // Default if no common skills found
  return resumeSkills.length / jobSkills.length;
}

function checkCertifications(resume: string, jobDesc: string): number {
  const certKeywords = [
    'certified', 'certification', 'license', 'aws certified', 'pmp', 'scrum master',
    'google certified', 'microsoft certified', 'cisco', 'comptia',
  ];

  const jobMentionsCerts = certKeywords.some(cert => jobDesc.includes(cert));
  const resumeHasCerts = certKeywords.some(cert => resume.includes(cert));

  if (!jobMentionsCerts) return 1; // No certs required
  if (resumeHasCerts) return 1;
  return 0.3;
}

function checkContent(resume: string): number {
  let score = 0;

  // Check for action verbs
  const actionVerbs = [
    'achieved', 'improved', 'led', 'managed', 'developed', 'created', 'increased',
    'reduced', 'implemented', 'designed', 'launched', 'established',
  ];
  const hasActionVerbs = actionVerbs.some(verb => resume.includes(verb));
  if (hasActionVerbs) score += 0.5;

  // Check for quantifiable metrics
  const hasMetrics = /\d+%|\d+\+|increased by|reduced by|grew|saved \$/.test(resume);
  if (hasMetrics) score += 0.5;

  return score;
}

function generateSuggestions(
  missingKeywords: string[],
  jobDesc: string,
  resume: string,
  resumeText: string,
  score: number
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Missing Keywords
  if (missingKeywords.length > 0) {
    suggestions.push({
      category: 'keywords',
      title: 'Missing Keywords from Job Description',
      items: [
        `Add these important keywords: ${missingKeywords.slice(0, 10).join(', ')}`,
        'Incorporate keywords naturally throughout your resume',
        'Use exact phrases from the job description where applicable',
      ],
      priority: 'high',
    });
  }

  // Skills suggestions
  const techSkills = extractTechnicalSkills(jobDesc);
  const missingTechSkills = techSkills.filter(skill => !resume.includes(skill));
  
  if (missingTechSkills.length > 0) {
    suggestions.push({
      category: 'skills',
      title: 'Technical Skills to Highlight',
      items: [
        `Add or emphasize: ${missingTechSkills.slice(0, 5).join(', ')}`,
        'Create a dedicated "Technical Skills" section if not present',
        'Match skill proficiency levels mentioned in job description',
      ],
      priority: 'high',
    });
  }

  // Certifications
  if (/certified|certification/i.test(jobDesc) && !/certified|certification/i.test(resume)) {
    suggestions.push({
      category: 'certifications',
      title: 'Recommended Certifications',
      items: extractCertificationSuggestions(jobDesc),
      priority: 'medium',
    });
  }

  // Format improvements
  const formatIssues = [];
  if (!/experience/i.test(resumeText)) formatIssues.push('Add a clear "Experience" section');
  if (!/education/i.test(resumeText)) formatIssues.push('Add an "Education" section');
  if (!/skills/i.test(resumeText)) formatIssues.push('Add a "Skills" section');
  if (!/[•\-\*]/m.test(resumeText)) formatIssues.push('Use bullet points for better readability');

  if (formatIssues.length > 0) {
    suggestions.push({
      category: 'format',
      title: 'Format & Structure Improvements',
      items: formatIssues,
      priority: 'medium',
    });
  }

  // Content improvements
  const contentImprovements = [];
  if (!/\d+%|\d+\+/.test(resume)) {
    contentImprovements.push('Add quantifiable achievements (e.g., "Increased sales by 25%")');
  }
  if (!/achieved|improved|led|managed|developed/i.test(resume)) {
    contentImprovements.push('Start bullet points with strong action verbs');
  }
  contentImprovements.push('Tailor your experience to match job requirements');
  contentImprovements.push('Include relevant projects or accomplishments');

  suggestions.push({
    category: 'improvements',
    title: 'Content Enhancement Tips',
    items: contentImprovements,
    priority: score < 60 ? 'high' : 'low',
  });

  return suggestions;
}

function extractTechnicalSkills(text: string): string[] {
  const skills = [
    'python', 'java', 'javascript', 'typescript', 'react', 'angular', 'vue',
    'node.js', 'express', 'django', 'flask', 'spring', 'sql', 'nosql',
    'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'gcp', 'docker',
    'kubernetes', 'jenkins', 'ci/cd', 'git', 'agile', 'scrum', 'jira',
    'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'excel',
    'tableau', 'power bi', 'salesforce', 'sap', 'rest api', 'graphql',
  ];

  return skills.filter(skill => text.includes(skill));
}

function extractCertificationSuggestions(jobDesc: string): string[] {
  const suggestions = [];

  if (/aws|cloud|amazon web services/i.test(jobDesc)) {
    suggestions.push('AWS Certified Solutions Architect');
    suggestions.push('AWS Certified Developer');
  }
  if (/azure|microsoft cloud/i.test(jobDesc)) {
    suggestions.push('Microsoft Azure Fundamentals (AZ-900)');
    suggestions.push('Azure Administrator Associate');
  }
  if (/project management|pmp/i.test(jobDesc)) {
    suggestions.push('PMP (Project Management Professional)');
    suggestions.push('Certified Scrum Master (CSM)');
  }
  if (/data|analytics/i.test(jobDesc)) {
    suggestions.push('Google Data Analytics Certificate');
    suggestions.push('Tableau Desktop Specialist');
  }
  if (/security|cybersecurity/i.test(jobDesc)) {
    suggestions.push('CompTIA Security+');
    suggestions.push('CISSP (Certified Information Systems Security Professional)');
  }
  if (/google|gcp/i.test(jobDesc)) {
    suggestions.push('Google Cloud Professional Cloud Architect');
  }

  if (suggestions.length === 0) {
    suggestions.push('Research industry-standard certifications for this role');
    suggestions.push('Consider LinkedIn Learning or Coursera certifications');
  }

  return suggestions.slice(0, 4);
}
