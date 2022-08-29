import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons' // <-- import styles to be used
// import { solid } from '@fortawesome/free-brand-svg-icons' // <-- import styles to be used


const myIcons = {
    plus:  faPlus
}

export const Icon = ({ icon }) => {
    return (
        <>
            <FontAwesomeIcon icon={myIcons[icon]} />
        </>
    )
}
