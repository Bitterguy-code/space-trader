import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';

export const Agent = ({ agentdata, onSelect, isSelected }) => {
  console.log(agentdata);
  return (
    <>
      <div className="row g-0">
        <div
          className={`card ${isSelected ? 'selected' : ''}`}
          onClick={() => onSelect(agentdata.api)}
        >
          <div className="card-header">{agentdata.data.symbol}</div>
          <p className="card-text">
            HQ: {agentdata.data.headquarters} <br />
            Faction: {agentdata.data.startingFaction} <br />
            Creds: {agentdata.data.credits} <br />
            Ships: {agentdata.data.shipCount} <br />
          </p>
        </div>
      </div>
    </>
  );
};

export const Error = ({ agenterror }) => {
  console.log(agenterror);
  return (
    <>
      <Alert variant="warning" dismissible>
        <Alert.Heading>Error</Alert.Heading>
        <p>{agenterror.error.message} ({agenterror.error.code})</p>
      </Alert>
    </>
  );
};
