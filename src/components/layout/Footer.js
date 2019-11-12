import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

export default class Footer extends Component {
    render() {
        return (
            <div className='footer-container'>
                <footer className='footer'>
                    <img className='footer-img' src={require('../../img/smite-training.png')} alt='' />
                    <p>© Smite.Training 2019. All rights reserved.
                        Data provided by Hi-Rez Studios. © Hi-Rez Studios, Inc. All rights reserved.
                    </p>
                    <a href="https://twitter.com/SMITEGame" target='_blank' rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="2x" /></a>
                    <a href="https://www.instagram.com/smitegame/?hl=en" target='_blank' rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                    <a href="https://www.youtube.com/channel/UCLB_2GSFGa4Unb5fjq49SOw" target='_blank' rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faYoutube} size='2x' /></a>
                </footer>
            </div>
        )
    }
}
