import React, { useState, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';

// Update the type definition

interface LanguageSelectProps {
    onLanguageChange: (language: string) => void;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ onLanguageChange, text, setText }) => {
    const [model, setModel] = useState<any>(null);
    const [tokenizer, setTokenizer] = useState<any>(null);

    useEffect(() => {
        const loadModel = async () => {
            const translator: q8 = await pipeline('translation', 'Xenova/m2m100_418M');
            const output: string = await translator('生活就像一盒巧克力。', {
                src_lang: 'zh', // Chinese
                tgt_lang: 'en', // English
            });
            setText(output);
            console.log(output);
            // const loadedTokenizer = await AutoTokenizer.from_pretrained('Helsinki-NLP/opus-mt-en-ROMANCE');
            // const loadedModel = await AutoModelForSeq2SeqLM.from_pretrained('Helsinki-NLP/opus-mt-en-ROMANCE');
            // setTokenizer(loadedTokenizer);
            // setModel(loadedModel);
        };
        loadModel();


    }, []);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        console.log(text)
        console.log(selectedLanguage)
        //        onLanguageChange(selectedLanguage);
    };

    return (
        <div className="flex flex-col items-start w-full">
            <select
                id="language-select"
                onChange={handleLanguageChange}
                className="px-3 py-2 mb-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
                <option value="">Select a language</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ro">Romanian</option>
            </select>
        </div>
    );
};

export default LanguageSelect;
