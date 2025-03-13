import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ShipDisplayCard from './ShipDisplayCard'
import { useState } from 'react';



const AgentDetails = ({ currentApi, agentData }) => {
    const selectedAgent = agentData.find(agent => agent.api === currentApi);
    const [ships, set_ships] = useState([])

    useEffect(() => {
        if (currentApi) {
            fetchShipData()
        }
    }, [currentApi])
    
    const fetchShipData = async () => {
        try {
            const response = await fetch("https://api.spacetraders.io/v2/my/ships", {
                method: "GET",
                headers: {
                    "content-type": "applicaton/json",
                    authorization: "Bearer " + currentApi,
                },
            })
            const data = await response.json()
            if (data.data) {
                set_ships(data.data)
            }
        } catch (error) {
            console.error(error)
        }   
        }
    

    if (!selectedAgent) return <div className='text-muted p-3'>Please select an agent</div>;

    return (
        <div className='p-3'>
            <h2>{selectedAgent.data.symbol}</h2>
            <div className='mb-2'>Credits: {selectedAgent.data.credits}</div>
            <div className='mb-2'>Faction: {selectedAgent.data.startingFaction}</div>
            <div className='mb-2'>Headquarters: {selectedAgent.data.headquarters}</div>
            {/* <div className='mb-2'>Ships: {selectedAgent.data.shipCount}</div> */}
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>Ships: {selectedAgent.data.shipCount}</Accordion.Header>
                    <Accordion.Body>
                        {ships.length > 0 ? (
                            ships.map(ship => (
                                <ShipDisplayCard key={ship.symbol} ship={ship} />
                            ))
                        ) : (
                                <div>No ships available</div>
                        )
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {console.log(ships)}
        </div>
    )
}



export default AgentDetails;