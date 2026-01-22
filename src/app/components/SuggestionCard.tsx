import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Lightbulb, Award, FileText, TrendingUp, AlertCircle } from 'lucide-react';

interface Suggestion {
  category: 'keywords' | 'certifications' | 'skills' | 'improvements' | 'format';
  title: string;
  items: string[];
  priority: 'high' | 'medium' | 'low';
}

interface SuggestionCardProps {
  suggestions: Suggestion[];
}

export function SuggestionCard({ suggestions }: SuggestionCardProps) {
  const getIcon = (category: Suggestion['category']) => {
    switch (category) {
      case 'keywords':
        return <FileText className="h-5 w-5" />;
      case 'certifications':
        return <Award className="h-5 w-5" />;
      case 'skills':
        return <TrendingUp className="h-5 w-5" />;
      case 'improvements':
        return <Lightbulb className="h-5 w-5" />;
      case 'format':
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: Suggestion['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                {getIcon(suggestion.category)}
              </div>
              <h3 className="text-lg font-semibold">{suggestion.title}</h3>
            </div>
            <Badge className={getPriorityColor(suggestion.priority)}>
              {suggestion.priority.toUpperCase()}
            </Badge>
          </div>
          <ul className="space-y-2">
            {suggestion.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
