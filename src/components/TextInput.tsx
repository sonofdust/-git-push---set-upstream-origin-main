import React from 'react';

interface TextInputProps {
  initialText: string;
  setInitialText: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean
}

const TextInput: React.FC<TextInputProps> = ({ initialText, setInitialText, isLoading }) => {
  return (
    <div className="flex flex-row items-center justify-start space-x-4 mb-4">

      <textarea
        disabled={isLoading}
        value={initialText}
        onChange={(e) => setInitialText(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-full resize-none"
        cols={40}
        rows={1}
        style={{
          maxWidth: '100%',
          maxHeight: '70vh',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default TextInput;
