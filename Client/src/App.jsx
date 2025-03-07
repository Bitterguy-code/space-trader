import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import React,{useEffect} from 'react'
import {Agent, Error} from './components/Agents'
import './App.css'
import _ from 'lodash'

function App() {
  const [apiInput, set_api_input] = useState('')
  const [apiKey, set_api_key] = useState('')
  const [agentData, set_agent_data] = useState([])
  const [error, set_error] = useState(null)


  function handleFetchAgent() {
    const isObjectInArray = (object, array) => {
      return array.some((item) => _.isEqual(object, item))
    }
    console.log('Bearer ' + apiKey)
    
    fetch('https://api.spacetraders.io/v2/my/agent', {
      method: 'GET',
      headers:{
      'content-type':'applicaton/json',
      'authorization':'Bearer ' + apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      if (Object.keys(data)[0] == 'data'){
        if(isObjectInArray(data, agentData)){
          set_error({
            error:{
              message:'Agent already exist',
              code:'PEBCAK'
            }
          })
        } else {
          let agentArr = [...agentData]
          agentArr.push(data)
          set_agent_data(agentArr)
          set_error(null)
        } 
      } else {
        set_error(data)
      }
    })
    .catch(error => {
      set_error(error)
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
          value={apiKey}
          onChange={(e) => set_api_key(e.target.value)}
          placeholder='Enter API key'
          />
        </label>

        <button onClick={handleFetchAgent} disabled={!apiKey}> Fetch Agent Data</button>
        
        {error && (
          <div>
            <Error agenterror={error} />
          </div>
        )}

        {agentData && (
          console.log(agentData),
          agentData.map((data) =>  <Agent agentdata={data} />)
        )}
      </div>
      }
    </>
  )
}

export default App
