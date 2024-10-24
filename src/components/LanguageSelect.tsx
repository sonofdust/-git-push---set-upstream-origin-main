import React, { useState } from 'react';
import { translateText } from '../utils/translationService';
//import { pipeline } from '@huggingface/transformers';

// Update the type definition

interface LanguageSelectProps {
    onLanguageChange: (language: string) => void;
    text: string;
    setTranslatedText: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ onLanguageChange, text, setTranslatedText }) => {
    const [loading, setLoading] = useState(false); // Add loading state
    const [selectedLanguage, setSelectedLanguage] = useState(''); // Track selected language

    const handleLanguageChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const language = event.target.value;
        setSelectedLanguage(language); // Update selected language
        setLoading(true);

        try {
            const translatedText = await translateText(text, 'en', language);
            setTranslatedText(translatedText);
            console.log(translatedText);
        } catch (error) {
            console.error('Translation error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start w-full">
            <div
                className={`w-full h-10 flex items-center justify-center border border-gray-300 rounded-md ${loading ? 'visible' : 'invisible'
                    }`}
            >
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 border-t-transparent"></div>
            </div>

            <select
                id="language-select"
                value={selectedLanguage} // Set the value to the selected language
                onChange={handleLanguageChange}
                className="px-3 py-2 mb-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
                <option value="">Select a language</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ro">Romanian</option>
                <option value="ru">Russian</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="ar">Arabic</option>
                <option value="de">German</option>
                <option value="nl">Dutch</option>
                <option value="ko">Korean</option>
            </select>
        </div>
    );
};

export default LanguageSelect;
