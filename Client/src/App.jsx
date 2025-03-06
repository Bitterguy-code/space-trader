import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import React,{useEffect} from 'react'
import './App.css'

function App() {
  let apiKey;
  async function handeApiSubmit(e) {
    const result = await new Promise(resolve => {
      e.preventDefault()
      let api_key = document.getElementById('user_api')
      resolve(api_key.value)
    })
    apiKey = result;
  }
  
  async function handleDisplayApi(e) {
    let displayApi = document.getElementById('displayApi')
    const result = await new Promise(resolve => {
      e.preventDefault()
      if (apiKey === undefined || apiKey == ''){
        resolve('No API submitted')
      } else {
        resolve(apiKey)
      }
      
    })
    displayApi.innerText = result
  }

  async function handleStoreApi(e) {
    let displayApi = document.getElementById('displayApi')
    const result = await new Promise(resolve => {
      e.preventDefault()
      fetch("http://localhost:8000/api/store-key", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({apiKey})
      })
      .then(response => response.json())
      .then(data => {
        
        resolve(data)
      })
      .catch(error => {
        displayApi.innerText = 'Error' + error
        resolve(error)
      })
    })
    if (result.succes != null){
      displayApi.innerText = 'API succesfully submitted'
    } else {
      displayApi.innerText = 'Error:' + result.error
    }
    console.log(result)
    }

  


  return (
    <>
      <h1>Enter API Key</h1>
      <form onSubmit={(event) => handeApiSubmit(event)}>
        <input id='user_api' type='text'></input>
        <input id='submitApi' type='submit' value='Submit API'/>
      </form>
      <button onClick={(event) => handleDisplayApi(event)}>Display API</button>
      <button onClick={(event) => handleStoreApi(event)}>Store API</button>
      <p id='displayApi'></p>
    </>
  )
}

export default App
