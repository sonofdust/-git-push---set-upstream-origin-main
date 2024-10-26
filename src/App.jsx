import { useState, useEffect, useCallback } from 'react';
import './App.css';
import TextInput from './components/TextInput';
import LanguageSelect from './components/LanguageSelect';
import Spinner from './components/Spinner';
import TextOutput from './components/TextOutput';
import { translateText } from './utils/translationService';

function App() {
  const [text, setText] = useState('What is your name?');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({ key: 'en', name: 'English' });

  const handleTranslate = useCallback(async () => {
    if (selectedLanguage.key !== 'en') {
      setIsLoading(true); // Set loading to true when translation starts
      try {
        const translated = await translateText(text, 'en', selectedLanguage.key);
        setTranslatedText(translated);
      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setIsLoading(false); // Ensure loading is set to false after translation
      }
    }
  }, [selectedLanguage.key, text]);
  useEffect(() => {
    console.log("handleTranslate called");
    if (selectedLanguage.key)
      handleTranslate();
    else setTranslatedText('');
  }, [handleTranslate, selectedLanguage.key])

  // Log changes in `selectedLanguage` and `text`
  useEffect(() => {
    console.log('Selected language changed:', selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    console.log('Text to translate updated:', text);
  }, [text]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row items-center justify-between space-x-4 mb-2">
        <div className="flex-shrink-0">
          {isLoading ? <Spinner /> : <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />}
        </div>
        <div className="flex-grow">
          <TextInput initialText={text} setInitialText={setText} isLoading={isLoading} />
        </div>
      </div>
      <TextOutput text={translatedText} />
    </div>
  );
}

export default App;
