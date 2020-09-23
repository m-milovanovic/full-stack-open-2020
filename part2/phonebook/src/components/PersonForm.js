import React from 'react'

const PersonForm = ({handleSubmit, formData, handleChange}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>name: <input value={formData.name} onChange={handleChange('name')} /></div>
            <div>number: <input value={formData.number} onChange={handleChange('number')} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;