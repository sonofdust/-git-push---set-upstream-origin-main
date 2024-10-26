import React, { useState, useEffect } from 'react';
import { translateText } from '../utils/translationService';

interface LanguageSelectProps {
    text: string;
    setTranslatedText: React.Dispatch<React.SetStateAction<string>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
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

const LanguageSelect: React.FC<LanguageSelectProps> = ({ text, setTranslatedText, setIsLoading, isLoading }) => {
    // const [loading, setLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        const translateLanguage = async () => {
            if (!selectedLanguage) return;
            try {
                setIsLoading(true)
                const translatedText = await translateText(text, 'en', selectedLanguage);
                setTranslatedText(translatedText);
                // setIsLoading(false);
            } catch (error) {
                console.error('Translation error:', error);
            } finally {
                setIsLoading(false)
            }
        };

        //        console.log("Before: ", isLoading)
        translateLanguage();
        return () => setIsLoading(false);
        //        console.log("After: ", isLoading)
    }, [selectedLanguage]);

    const handleLanguageChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const language = event.target.value;
        setIsLoading(true);
        setSelectedLanguage(language);
        //console.log("Before call", isLoading)
    };

    return (
        <div className="flex flex-col items-start w-full relative">
            <select
                id="language-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className={`px-3 py-2 mb-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none ${isLoading ? 'hidden' : ''}`}
                hidden={isLoading}
                disabled={isLoading}
            >
                <option value="">Select a language</option>
                {Object.entries(languageOptions).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </select>
            {isLoading && (<div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>)}
        </div>
    );
};

export default LanguageSelect;
