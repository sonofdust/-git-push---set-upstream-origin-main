import React, { useState } from 'react';
import { translateText } from '../utils/translationService';

const TranslationComponent: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      const result = await translateText(sourceText, 'en', 'fr'); // Example: English to French
      setTranslatedText(result);
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedText('Translation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <button onClick={handleTranslate} disabled={isLoading}>
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
      <div>{translatedText}</div>
    </div>
  );
};

export default TranslationComponent;
