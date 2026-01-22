import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface AnalysisResultsProps {
  matchedKeywords: string[];
  missingKeywords: string[];
}

export function AnalysisResults({ matchedKeywords, missingKeywords }: AnalysisResultsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Keyword Analysis</h3>
      <Tabs defaultValue="matched" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="matched">
            Matched ({matchedKeywords.length})
          </TabsTrigger>
          <TabsTrigger value="missing">
            Missing ({missingKeywords.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="matched" className="mt-4">
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.length > 0 ? (
              matchedKeywords.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <Check className="h-3 w-3 mr-1" />
                  {keyword}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">No keywords matched yet</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="missing" className="mt-4">
          <div className="flex flex-wrap gap-2">
            {missingKeywords.length > 0 ? (
              missingKeywords.slice(0, 20).map((keyword, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  <X className="h-3 w-3 mr-1" />
                  {keyword}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">All keywords matched!</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
