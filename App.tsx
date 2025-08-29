
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { reviewCode } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';
import type { Language } from './types';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter some code to review.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setFeedback('');
    try {
      const result = await reviewCode(code, language.name);
      setFeedback(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          onReview={handleReview}
          isLoading={isLoading}
        />
        <FeedbackDisplay
          feedback={feedback}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
