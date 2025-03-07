import React, { useState } from 'react'



export const Agent = ({agentdata}) => {

    console.log(agentdata)
        return (
            <>
                <ul className='bigAgent'>
                    <li>{agentdata.data.symbol}</li>
                    <ul className='littleAgent'>
                        <li>
                            HQ: {agentdata.data.headquarters}
                        </li>
                        <li>
                            Creds: {agentdata.data.credits}
                        </li>
                        <li>
                            Faction: {agentdata.data.startingFaction}
                        </li>
                        <li>
                            Ships: {agentdata.data.shipCount}
                        </li>
                    </ul>
                </ul>
            </>
        )
    }

export const Error = ({agenterror}) => {
    console.log(agenterror)
    return (
        <>
            <h2 className='errorDisplay'>ERROR</h2>
            <p>{agenterror.error.message} ({agenterror.error.code})</p>
        </>
    )
}