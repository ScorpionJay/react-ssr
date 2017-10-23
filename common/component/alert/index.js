import React from 'react'
import './style.scss'

const Alert = ({data}) => (
    <div className='alert'>
        <span>
            {data}
        </span>
    </div>
)

export default Alert