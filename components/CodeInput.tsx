
import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import type { Language } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  onReview: () => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  code,
  setCode,
  language,
  setLanguage,
  onReview,
  isLoading,
}) => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = SUPPORTED_LANGUAGES.find(lang => lang.id === e.target.value);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  };

  return (
    <div className="flex flex-col bg-gray-800 rounded-lg border border-gray-700 h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">Your Code</h2>
        <select
          value={language.id}
          onChange={handleLanguageChange}
          className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-auto p-2.5"
        >
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`// Paste your ${language.name} code here...`}
          className="w-full h-full bg-transparent text-gray-300 p-3 font-mono text-sm resize-none focus:outline-none placeholder-gray-500"
          style={{ minHeight: '400px' }}
        />
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onReview}
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Reviewing...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2 -ml-1" />
              Review Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};
