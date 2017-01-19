import React, { Component } from 'react'
import './App.css'

import If from 'toolkit/If'
import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'

import cards from './cards-data'

import SnapPageWrapper from './SnapPage/SnapPageWrapper'
import HomePage from './HomePage'

import createHistory from 'history/createBrowserHistory'

const publicUrl = process.env.PUBLIC_URL

// @todo: Replace this url with the real snapweb link on the device
const snapwebUrl = 'http://localhost:3001/'
const history = createHistory()
const sections = ['service']

const brandData = {
    name: 'KEYMILE',
    id: 'keymile',
    color: '#FF7301',
}

function sectionFromPath(path) {
  return path === '/' ? 'home' : (
    sections.find(section => (
      path.startsWith(`/${section}`)
    )) || ''
  )
}

function serviceIdFromPath(path) {
  const parts = path.split('/').slice(1)
  return (parts[0] === 'service' && parts[1]) || ''
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      installedServices: cards(7),
      location: history.location,
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
  }

  handleNavigation(location) {
    this.setState({ location: location })
    window.scrollTo(0, 0)
  }

  onMenuItemClick(id) {
    if (id === 'store') {
      const win = window.open(snapwebUrl, '_blank');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      }
    } 
    if (id === 'home') history.push('/')
  }

  onOpenService(id) {
    history.push('/service/' + id)
  }

  render() {

    const {
      location,
      installedServices,
    } = this.state

    const currentSection = sectionFromPath(location.pathname)

    const cardImgRootUrl = `${publicUrl}/icons/cards/`

    return (
      <div className='App'>
        <Header
          menuitems={[
            { id: 'store', name: 'Store' },
          ]}
          currentSection={currentSection}
          onMenuItemClick={this.onMenuItemClick}
          name={brandData.name}
          logo={`${publicUrl}/brands/${brandData.id}/logo.png`}
          customColor={brandData.color}
        />

        <main className='App-content'>
          <If cond={currentSection === 'home'}>
            <HomePage
              cardImgRootUrl={cardImgRootUrl}
              services={installedServices}
              onOpenService={this.onOpenService}
            />
          </If>
          <If cond={currentSection === 'service'}>
            <SnapPageWrapper
              cardImgRootUrl={cardImgRootUrl}
              snap={installedServices.find(service => (
                  service.id === serviceIdFromPath(location.pathname)
                ))}
            />
          </If>
        </main>

        <Footer 
          logo={`${publicUrl}/brands/${brandData.id}/logo.png`}
        />
      </div>
    )
  }
}

export default App
