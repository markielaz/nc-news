import React from 'react'
import { Link } from 'react-router-dom'
import {FaLightbulb} from 'react-icons/fa'
import {TbFaceIdError} from 'react-icons/tb'

export const Error = (error) => {
    return (
        <>
        <section className="error-message">
            <h2>Ooops! We can't find that, sorry!</h2>
            <figure className='error-icon'>
                <TbFaceIdError/>
            </figure>
            <p>Not to worry, you can simply return to the home page</p>
            <Link to={`/`}><button className='nav-login-button back-home'><FaLightbulb/>Click Here</button></Link>
        </section>
        </>
    )
}