import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import React,{useEffect} from 'react'
import './App.css'

function App() {
  const [apiInput, set_api_input] = useState('')
  const [apiKey, set_api_key] = useState('')
  const [agentData, set_agent_data] = useState(null)
  const [error, set_error] = useState(null)

  function handleSubmit() {
    let new_api_key = apiInput;
    set_api_key(new_api_key);
    fetch('http://localhost:8000/api/store-key', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({new_api_key})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Sucess', data)
    })
    .catch((error) => {
      console.error('Error', error)
    })
  }

  function fetchAgent() {
    fetch('http://localhost:8000/api/fetch-agent',{method:'POST'})
    .then(response => response.json())
    .then(data => {
      set_agent_data(data);
      set_error(null)
    })
    .catch(error => {
      set_error(error.message)
      set_agent_data(null)
    })

  }

  return (
    <>
      {
      <div>
        <h1>My agent Info</h1>

        <label>
          Enter API Key:
          <input type='text'
          value={apiInput}
          onChange={(e) => set_api_input(e.target.value)}
          placeholder='Enter API key'
          />
        </label>
        <button onClick={handleSubmit} disabled={!apiInput}>Submit API</button>
        <button onClick={fetchAgent} disabled={!apiKey}> Fetch Agent Data</button>
        {agentData && (
          <div>
            <h2>Agent Data:</h2>
            <pre>{(JSON.stringify(agentData.data,null,2))}</pre>
          </div>
        )}
        
        {error && (
          <div>
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )}
      </div>

      
      }
    </>
  )
}

export default App
