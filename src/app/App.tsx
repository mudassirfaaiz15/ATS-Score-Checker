import { useState } from 'react';
import { FileUpload } from '@/app/components/FileUpload';
import { JobDescriptionInput } from '@/app/components/JobDescriptionInput';
import { ATSScoreMeter } from '@/app/components/ATSScoreMeter';
import { SuggestionCard } from '@/app/components/SuggestionCard';
import { AnalysisResults } from '@/app/components/AnalysisResults';
import { analyzeResume } from '@/app/utils/atsAnalyzer';
import { Button } from '@/app/components/ui/button';
import { FileCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface AnalysisData {
  score: number;
  suggestions: any[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

export default function App() {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescText, setJobDescText] = useState<string>('');
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [jobDescFileName, setJobDescFileName] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleResumeUpload = (text: string) => {
    setResumeText(text);
    setResumeFileName('resume.txt');
    setAnalysis(null);
  };

  const handleJobDescUpload = (text: string) => {
    setJobDescText(text);
    setJobDescFileName(text.length > 0 ? 'job-description.txt' : '');
    setAnalysis(null);
  };

  const handleAnalyze = () => {
    if (!resumeText || !jobDescText) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = analyzeResume(resumeText, jobDescText);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleClearResume = () => {
    setResumeText('');
    setResumeFileName('');
    setAnalysis(null);
  };

  const handleClearJobDesc = () => {
    setJobDescText('');
    setJobDescFileName('');
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileCheck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ATS Resume Checker</h1>
              <p className="text-gray-600">Optimize your resume for Applicant Tracking Systems</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FileUpload
            title="Upload Your Resume"
            description="Upload your resume in TXT, PDF, DOC, or DOCX format"
            onFileSelect={handleResumeUpload}
            fileName={resumeFileName}
            onClear={handleClearResume}
          />
          <JobDescriptionInput
            onTextChange={handleJobDescUpload}
            fileName={jobDescFileName}
            textContent={jobDescText}
            onClear={handleClearJobDesc}
          />
        </div>

        {/* Analyze Button */}
        {resumeText && jobDescText && !analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Analyze Resume
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Results Section */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Score Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <ATSScoreMeter score={analysis.score} />
              
              {analysis.score < 60 && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 text-center">
                    Your resume needs improvement. Review the suggestions below to increase your ATS score.
                  </p>
                </div>
              )}
              {analysis.score >= 60 && analysis.score < 80 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 text-center">
                    Good start! Consider the suggestions below to optimize your resume further.
                  </p>
                </div>
              )}
              {analysis.score >= 80 && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 text-center">
                    Excellent! Your resume is well-optimized for this job. Review minor suggestions to perfect it.
                  </p>
                </div>
              )}
            </div>

            {/* Keyword Analysis */}
            <AnalysisResults
              matchedKeywords={analysis.matchedKeywords}
              missingKeywords={analysis.missingKeywords}
            />

            {/* AI Suggestions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Smart Suggestions</h2>
              </div>
              <SuggestionCard suggestions={analysis.suggestions} />
            </div>

            {/* Re-analyze Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleAnalyze}
                variant="outline"
                size="lg"
                className="px-8"
              >
                Re-analyze Resume
              </Button>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!resumeText && !jobDescText && !analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FileCheck className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Get Started
            </h3>
            <p className="text-gray-500">
              Upload your resume and job description to receive your ATS score and personalized suggestions
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}