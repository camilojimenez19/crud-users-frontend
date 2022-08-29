import React from 'react'

export const Alert = ({message, type = 'danger'}) => {
    return (
        <div className={`alert ${type === 'danger' ? 'alert-danger' : 'alert-success'}`} role="alert">
           {message}
        </div>
    )
}