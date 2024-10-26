import React, { useState, useEffect } from 'react';
import { translateText } from '../utils/translationService';

interface LanguageSelectProps {
    // text: string;
    // isLoading: boolean;
    selectedLanguage: { key: string, name: string }
    setSelectedLanguage: React.Dispatch<React.SetStateAction<{ key: string, name: string }>>;
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

const LanguageSelect: React.FC<LanguageSelectProps> = ({ selectedLanguage, setSelectedLanguage }) => {

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //        event.preventDefault();
        const language = event.target.value;
        if (language in languageOptions) {
            setSelectedLanguage({ key: language, name: languageOptions[language] });
        } else {
            setSelectedLanguage({ key: '', name: '' });
        }
    };

    return (
        <div>
            <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative">
                    <select
                        className="w-full bg-transparent mb-3 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                        onChange={handleLanguageChange}>
                        <option selected>Choose a language</option>
                        {Object.entries(languageOptions).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div>
            </div>
        </div >
    );
};

export default LanguageSelect;
