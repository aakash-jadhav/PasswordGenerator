import "./App.css"
import { useState, useEffect, useCallback, useRef } from "react"
function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(6)
  const [symbols, setSymbols] = useState(false)
  const [numbers, setNumbers] = useState(false)

  const generatePassword = useCallback(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let password = ""
    let charSet = chars
    if (numbers) {
      charSet += "0123456789"
    }
    if (symbols) {
      charSet += "!@#$%^&*()_+~`|}{[]:;?.>,<"
    }
    for (let i = 0; i < length; i++) {
      password += charSet.charAt(Math.floor(Math.random() * charSet.length))
    }
    setPassword(password)
  }, [length, numbers, symbols])

  useEffect(() => {
    generatePassword()
  }, [length, numbers, symbols])

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    inputRef.current?.select()
  }

  const inputRef = useRef()
  return (
    <>
      <div className="container">
        <div className="box">
          <h1>Password Generator</h1>
          <div className="input-container">
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              readOnly={true}
              ref={inputRef}
            ></input>
            <button className="copy-button" onClick={handleCopy}>
              Copy
            </button>
          </div>
          <div className="controls">
            <input
              type="range"
              name="length"
              id="length"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length:{length}</label>
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
              onChange={(e) => setSymbols(e.target.checked)}
            />
            <label htmlFor="symbols">Symbols</label>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              onChange={(e) => setNumbers(e.target.checked)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
