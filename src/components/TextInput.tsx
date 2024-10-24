import React from 'react';

interface TextInputProps {
  initialText: string;
  setInitialText: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput: React.FC<TextInputProps> = ({ initialText, setInitialText }) => {
  return (
    <div className="w-64 h-96 overflow-auto">
      <textarea
        value={initialText}
        onChange={(e) => setInitialText(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-full resize-none"
        cols={40}
        rows={40}
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default TextInput;
