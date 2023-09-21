import { ChangeEvent, useState } from 'react'
import './App.css'

function App() {
    const [inputText, setInputText] = useState('')
    const [result, setResult] = useState({})

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value)
    }

    const handleOnClick = async () => {
        try {
            const response = await fetch(
                `https://z33gkont1a.execute-api.us-east-1.amazonaws.com/calculateTypes?text=${inputText}`
            )

            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }

            const data = await response.json()
            setResult(data.result)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const resultEntries: [string, number][] = Object.entries(result)

    return (
        <div className="container">
            <div className="containerText">
                <label htmlFor="inputText">Input Text</label>
                <textarea
                    className="textArea"
                    name="inputText"
                    value={inputText}
                    onChange={handleTextChange}
                />
            </div>
            <div className="containerResults">
                <label htmlFor="results">Results</label>
                <div className="results">
                    {resultEntries.map(([key, value]) => (
                        <div key={key}>
                            {key}: {value}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleOnClick}>Submit</button>
        </div>
    )
}

export default App
