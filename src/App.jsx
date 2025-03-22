import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [ length, setLength ] = useState(8);
  const [ addNumber, setAddNumber ] = useState(false);
  const [ addChar, setAddChar ] = useState(false);
  const [ password, setPassword ] = useState("");

  // useRef is used to store the previous value of the state
  // here useRef is used to copy the password
  let passwordRef = useRef(null);

  // useCallback is used to prevent the function from being recreated on every render or, for optimization purposes.
  // useCallback(fn, [dependencies])
  const passwordGenerator = useCallback(() => {
    let _password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (addNumber) str += "0123456789";
    if (addChar) str += "`!@#$%^&*(){}[]=+_<>?|~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      _password += str.charAt(char);
    }

    setPassword(_password)

  }, [ length, addNumber, addChar, setPassword ])

  // for password generation on refresh the page
  // useEffect(callback, [dependencies])
  useEffect(() => {
    passwordGenerator()
  }, [ length, addNumber, addChar, passwordGenerator ])

  // copy the password in clipboard
  const copyPasswordInClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="w-full max-w-md px-4 mx-auto my-9 shadow-md rounded-2xl bg-gray-800 text-orange-600 text-center text-lg font-semibold">
        <h1 className="text-white text-center text-lg">Password Generator</h1>
        <div className="flex shadow rounded-xl overflow-hidden mb-2">
          <input
            type="text"
            value={ password }
            className="outline-none w-full bg-white my-3 px-2 py-1 rounded-tl-lg rounded-bl-lg"
            placeholder="password" readOnly
            ref={ passwordRef }
          />
          <button className="outline-none bg-blue-700 text-white my-3 px-2 py-1 rounded-tr-lg rounded-br-lg cursor-pointer" onClick={copyPasswordInClipboard}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2 mb-2">
            <input
              type="range"
              value={ length }
              min={ 6 }
              max={ 38 }
              className="cursor-pointer"
              onChange={ (e) => {setLength(e.target.value)} }
            />
            <label>Length: { length }</label>
          </div>
          <div className="flex items-center gap-x-2 mb-2">
            <label htmlFor="numberInput">Numbers : </label>
            <input
              type="checkbox"
              defaultChecked={ addNumber }
              id="numberInput"
              onChange={ () => {
                setAddNumber((prev) => !prev)
              }}
            />
          </div>
          <div className="flex items-center gap-x-2 mb-2">
            <label htmlFor="charInput">Characters : </label>
            <input
              type="checkbox"
              defaultChecked={ addChar }
              id="charInput"
              onChange={ () => {
                setAddChar((prev) => !prev)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
