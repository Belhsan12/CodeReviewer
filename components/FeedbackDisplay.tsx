
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface FeedbackDisplayProps {
  feedback: string;
  isLoading: boolean;
  error: string | null;
}

// A simple component to render markdown-like text
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    // Split by newlines to handle paragraphs
    const paragraphs = content.split('\n').map((line, index) => {
        // Basic handling for markdown elements
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-cyan-300">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-cyan-200">{line.substring(3)}</h2>;
        }
        if (line.startsWith('# ')) {
            return <h1 key={index} className="text-2xl font-extrabold mt-8 mb-4 text-cyan-100">{line.substring(2)}</h1>;
        }
        if (line.startsWith('```')) {
            // This is a naive implementation; it doesn't handle multi-line code blocks well.
            // For this app, we will assume code blocks are single lines or we can just render the raw text.
            // For better UX, we'll wrap the entire feedback in a <pre> tag to preserve all formatting.
            return null; // Let the parent <pre> tag handle this.
        }
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            return <li key={index} className="ml-6 list-disc">{line.substring(line.indexOf(' ')+1)}</li>;
        }
        return <p key={index} className="mb-2">{line || <br/>}</p>;
    });

    // Using a <pre> tag is the most reliable way to preserve formatting without a full markdown parser
    return <pre className="font-mono text-sm whitespace-pre-wrap break-words">{content}</pre>
};


export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <svg className="animate-spin h-10 w-10 text-cyan-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg font-semibold">Gemini is analyzing your code...</p>
          <p className="text-sm">This may take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-semibold">An Error Occurred</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }
    
    if (feedback) {
      return (
          <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-gray-900/50 prose-pre:p-4 prose-pre:rounded-md prose-code:text-cyan-300">
             <MarkdownRenderer content={feedback} />
          </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <SparklesIcon className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-semibold text-gray-400">AI Code Review</h3>
        <p className="text-center max-w-sm">
          Enter your code on the left, select the language, and click "Review Code" to get instant feedback from Gemini.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">Feedback</h2>
      </div>
      <div className="p-6 overflow-y-auto h-full" style={{maxHeight: 'calc(100vh - 200px)'}}>
        {renderContent()}
      </div>
    </div>
  );
};
