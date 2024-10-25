import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput'
import LanguageSelect from './components/LanguageSelect'
import TextOutput from './components/TextOutput'
import Spinner from './components/Spinner'
function App() {
  const [text, setText] = useState('Hello World')
  const [translatedText, setTranslatedText] = useState('')
  return (
    <>
      <Spinner />
      <h1>Hello World</h1>
      <LanguageSelect text={text} setTranslatedText={setTranslatedText} />
      <TextInput initialText={text} setInitialText={setText} />
      <TextOutput text={translatedText} />
    </>
  )
}

export default App
