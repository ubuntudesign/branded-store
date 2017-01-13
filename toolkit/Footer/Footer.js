import React from 'react'
import './Footer.css'
import logo from './assets/logo.svg'

function Footer(props) {
  return (
    <footer className='Footer'>
      <div className='Footer-in'>
        <div className='Footer-infos'>
          <p>
            <strong>Snappy version 1.0</strong>
            {props.firstLine}
          </p>
          <p className='Footer-copyright'>
            © 2017 Canonical Ltd. Ubuntu and Canonical are registered trademarks of Canonical Ltd.
          </p>
        </div>
        <img className='Footer-logo' src={logo} alt='Ubuntu' />
      </div>
    </footer>
  )
}

export default Footer
