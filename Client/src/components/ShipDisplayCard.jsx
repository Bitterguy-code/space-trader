import React from "react";
import Accordion from 'react-bootstrap/Accordion'

const ShipDisplayCards = ({ ship }) => {
    return(
    <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>{ship.symbol}</Accordion.Header>
                <Accordion.Body className="scrollable-accordion-body">
                <p>Name: {ship.registration.name}</p>
                <p>Faction: {ship.registration.factionSymbol}</p>
                <p>Role: {ship.registration.role}</p>
                <Accordion>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Crew</Accordion.Header>
                        <Accordion.Body className="scrollable-accordion-body">
                                <p>Current: {ship.crew.current}</p>
                                <p>Max: {ship.crew.capacity}</p>
                                <p>Required: {ship.crew.required}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                    <Accordion>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Fuel</Accordion.Header>
                            <Accordion.Body className="scrollable-accordion-body">
                                <p>Current: {ship.fuel.current}</p>
                                <p>Capacity: {ship.fuel.capacity}</p>
                                <p>Total consumed as of {ship.fuel.consumed.timestamp}: {ship.fuel.consumed.amount}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
    )
}

export default ShipDisplayCards