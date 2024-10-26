import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput'
import LanguageSelect from './components/LanguageSelect'
import TextOutput from './components/TextOutput'

function App() {
  const [text, setText] = useState('Hello World')
  const [translatedText, setTranslatedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleLoading = () => setIsLoading(!isLoading)

  return (
    <div className="container mx-auto p-4">

      <div className="flex flex-row items-center justify-start space-x-4 mb-4">
        <button
          onClick={handleToggleLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isLoading ? 'Stop Loading' : 'Start Loading'}
        </button>
        <LanguageSelect
          text={text}
          setTranslatedText={setTranslatedText}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </div>
      <TextInput initialText={text} setInitialText={setText} isLoading={isLoading} />
      <TextOutput text={translatedText} />
    </div>
  )
}

export default App
