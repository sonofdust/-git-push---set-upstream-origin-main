import React from 'react';

interface TextOutputProps {
    text: string;
}

const TextOutput: React.FC<TextOutputProps> = ({ text }) => {
    return (
        <div
            className="px-3 py-2 mb-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            aria-label="Translated text output"
            tabIndex={0} // For accessibility, allows focus
        >
            {text}
        </div>
    );
};

export default TextOutput;