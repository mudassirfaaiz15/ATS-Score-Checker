import { motion } from 'motion/react';

interface ATSScoreMeterProps {
  score: number;
}

export function ATSScoreMeter({ score }: ATSScoreMeterProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 60) return '#eab308'; // yellow
    if (score >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-64 h-64">
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke="#e5e7eb"
            strokeWidth="16"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="128"
            cy="128"
            r="90"
            stroke={getScoreColor(score)}
            strokeWidth="16"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-6xl font-bold"
            style={{ color: getScoreColor(score) }}
          >
            {score}
          </motion.div>
          <div className="text-gray-500 mt-2">ATS Score</div>
        </div>
      </div>
      <div className="mt-4 text-xl font-semibold" style={{ color: getScoreColor(score) }}>
        {getScoreLabel(score)}
      </div>
    </div>
  );
}
