import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import React, { useEffect } from "react";
import { Agent, Error } from "./components/Agents";
import AgentDetails from "./components/AgentDetails";
import "./App.scss";
import _ from "lodash";
import Button from "react-bootstrap/Button";

function App() {
  const [apiKey, set_api_key] = useState("");
  const [agentData, set_agent_data] = useState([]);
  const [error, set_error] = useState(null);
  const [currentApi, set_current_api] = useState(null);
  

  const handleAgentSelect = (selectedApi) => {
    set_current_api(selectedApi);
  }

  function addAgent(newData, apiKey) {
    newData['api'] = apiKey;
    // console.log(newData);
    let agentArr = [...agentData];
    agentArr.push(newData);
    set_agent_data(agentArr);
  }

  function handleFetchAgent() {
    const isObjectInArray = (object, array) => {
      return array.some((item) => _.isEqual(object, item));
    };
    console.log("Bearer " + apiKey);

    fetch("https://api.spacetraders.io/v2/my/agent", {
      method: "GET",
      headers: {
        "content-type": "applicaton/json",
        authorization: "Bearer " + apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Object.keys(data)[0] == "data") {
          data['api'] = apiKey
          if (isObjectInArray(data, agentData)) {
            set_error({
              error: {
                message: "Agent already exist",
                code: "PEBCAK",
              },
            });
          } else {
            addAgent(data,apiKey);
            set_error(null);
          }
        } else {
          set_error(data);
        }
      })
      .catch((error) => {
        set_error(error);
      });
  }

  return (
    <>
      {

        //Webpage is one row
        <div className="container-fluid h-100 d-flex flex-column">
          {error && (
            <div>
              <Error agenterror={error} />
            </div>
          )}
          <div className="row g-0 h-100 flex-grow-1 bg-dark-subtle">
            {/* Agent input/select area on left side*/}
            <div className="col-4 h-100 border border-dark bg-dark-subtle">
              {/* Left Column */}
              <div className="row g-0 h-25">
                {/* text field and submit button */}
                <div className="col-8 ">
                  {/* text field */}
                  <input
                    type="text"
                    className="form-control"
                    value={apiKey}
                    onChange={(e) => set_api_key(e.target.value)}
                    placeholder="Enter API key"
                  />
                </div>
                <div className="col-4 g-0">
                  {/*submit button*/}
                  <Button
                    onClick={handleFetchAgent}
                    disabled={!apiKey}
                    className="btn btn-primary bg-gray-200"
                  >
                    Fetch Agent Data
                  </Button>
                </div>
              </div>
              <div className="row g-0 h-75">
                {/*Display card for agents*/}
                <div className="col-10 g-0">
                  {agentData &&
                  (console.log(agentData),
                      agentData.map((data) => <Agent
                        key={data.api}
                        agentdata={data}
                        onSelect={handleAgentSelect}
                        isSelected={currentApi===data.api}
                      />))}
                </div>
              </div>
            </div>
            <div className="col-8">
              {/*Agent specifics*/}
              <AgentDetails currentApi={currentApi} agentData={agentData} />
            </div>
          </div>
          
        </div>

        
      }
    </>
  );
}

export default App;
