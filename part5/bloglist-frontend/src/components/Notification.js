import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        message.variant === 'error' ?
            <div className="error">{message.text}</div>
            :
            <div className="success">{message.text}</div>
    )
}

export default Notification