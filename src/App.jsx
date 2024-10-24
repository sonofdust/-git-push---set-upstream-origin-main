import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput'
import LanguageSelect from './components/LanguageSelect'
import TextOutput from './components/TextOutput'
function App() {
  const [text, setText] = useState('Hello World')
  const [translatedText, setTranslatedText] = useState('')
  return (
    <>
      <h1>Hello World</h1>
      <LanguageSelect text={text} setTranslatedText={setTranslatedText} />
      <TextInput initialText={text} setInitialText={setText} />
      <TextOutput text={translatedText} />
    </>
  )
}

export default App
