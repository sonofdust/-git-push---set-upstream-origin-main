import React from 'react';
import './App.css';
import TextInput from './components/TextInput';
import LanguageSelect from './components/LanguageSelect';
import Spinner from './components/Spinner';
import TextOutput from './components/TextOutput';
import Modal from './components/Modal';
import { useTranslation } from './hooks/useTranslation';

const App: React.FC = () => {
    const {
        text,
        setText,
        translatedText,
        isLoading,
        selectedLanguage,
        setSelectedLanguage,
        error
    } = useTranslation('What is your name?');

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-between space-x-4 mb-2">
                <div className="flex-shrink-0">
                    <LanguageSelect
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                    />
                </div>
            </div>
            <div className="flex-grow">
                <TextInput initialText={text} setInitialText={setText} isLoading={isLoading} />
            </div>
            <div className="flex-grow">
                <TextOutput text={translatedText} />
            </div>
            <Modal isOpen={isLoading || !!error}>
                <div className="flex flex-col items-center">
                    {isLoading ? (
                        <>
                            <Spinner />
                            <p className="mt-2 text-gray-700">Translating...</p>
                        </>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : null}
                </div>
            </Modal>
        </div>
    );
};

export default App;
