import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faEye,
    faPenToSquare,
    faTrash,
    faAngleLeft,
    faAngleRight
} from '@fortawesome/free-solid-svg-icons' // <-- import styles to be used


const myIcons = {
    faPlus,
    faEye,
    faPenToSquare,
    faTrash,
    faAngleLeft,
    faAngleRight
}

export const Icon = ({ icon }) => {
    return (
        <>
            <FontAwesomeIcon icon={myIcons[icon]} />
        </>
    )
}
