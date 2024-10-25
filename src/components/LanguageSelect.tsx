import React, { useState } from 'react';
import { translateText } from '../utils/translationService';
//import { pipeline } from '@huggingface/transformers';

// Update the type definition

interface LanguageSelectProps {
    onLanguageChange: (language: string) => void;
    text: string;
    setTranslatedText: React.Dispatch<React.SetStateAction<string>>;
}

const languageOptions = {
    fr: "French",
    es: "Spanish",
    it: "Italian",
    pt: "Portuguese",
    ro: "Romanian",
    ru: "Russian",
    zh: "Chinese",
    ja: "Japanese",
    ar: "Arabic",
    de: "German",
    nl: "Dutch",
    ko: "Korean"
};

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
            <select
                id="language-select"
                value={selectedLanguage} // Set the value to the selected language
                onChange={handleLanguageChange}
                className="px-3 py-2 mb-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
                <option value="">Select a language</option>
                {Object.entries(languageOptions).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelect;
