import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification.content === null) {
        return null
    }

    return (
        notification.variant === 'error' ?
            <div className="error">{notification.content}</div>
            :
            <div className="success">{notification.content}</div>
    )
}

export default Notification