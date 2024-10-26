import { useState, useCallback, useEffect } from 'react';
import { translateText } from '../utils/translationService';

interface Language {
  key: string;
  name: string;
}

export const useTranslation = (initialText: string) => {
  const [text, setText] = useState(initialText);
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({ key: '', name: '' });
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = useCallback(async () => {
    if (selectedLanguage.key && text) {
      setIsLoading(true);
      setError(null);
      try {
        const translated = await translateText(text, 'en', selectedLanguage.key);
        setTranslatedText(translated);
      } catch (err) {
        setError((err as Error).message || 'An error occurred during translation');
        setTranslatedText('');
      } finally {
        setIsLoading(false);
      }
    } else {
      setTranslatedText('');
    }
  }, [selectedLanguage.key, text]);

  useEffect(() => {
    if (selectedLanguage.key) {
      handleTranslate();
    }
  }, [selectedLanguage, handleTranslate]);

  return {
    text,
    setText,
    translatedText,
    isLoading,
    selectedLanguage,
    setSelectedLanguage,
    error
  };
};
