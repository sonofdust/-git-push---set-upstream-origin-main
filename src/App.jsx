import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput'
import LanguageSelect from './components/LanguageSelect'
function App() {
  const [text, setText] = useState('Hello World')
  return (
    <>
      <h1>Hello World</h1>
      <LanguageSelect text={text} setText={setText} />
      <TextInput initialText={text} setInitialText={setText} />
    </>
  )
}

export default App
