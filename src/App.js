import React, { Component } from 'react'
import './App.css'

import 'toolkit/lib/bundle.css'

import { If, Footer } from 'toolkit'
import ThemeChanger from './ThemeChanger/ThemeChanger'
import Loader from './Loader/Loader'

import ConfigurePage from './ConfigurePage/ConfigurePage'
import HomePage from './HomePage/HomePage'
import StorePage from './StorePage/StorePage'
import SnapPage from './SnapPage/SnapPage'
import SettingsPage from './SettingsPage/SettingsPage'
import MyUbuntu from './MyUbuntu/MyUbuntu'
import Header from './Header/Header'

import createStore from './store/store'
import createBrands from './brands'
import createApi from './api'
import createRouting, { routeSection } from './routing'

const DEFAULT_BRAND = 'lime'
const DEFAULT_API_BASE_URL = (
  `${window.location.protocol}//${window.location.host}/api/v2`
)
const pub = process.env.PUBLIC_URL

const categories = [
  'featured',
  'databases',
  'network',
  'robotics',
  'home',
  'private',
]

const getBrands = createBrands(`${pub}/brands`)

// Save the API URL using localStorage
const saveApiUrl = (value) => {
  localStorage.setItem('api-url', value)
  return value
}

// Read the API URL using localStorage
const readApiUrl = (defaultValue) => {
  const value = (localStorage.getItem('api-url') || '').trim()
  return value || defaultValue
}

class App extends Component {

  constructor(props) {
    super(props)

    const store = createStore()
    const api = createApi(readApiUrl(DEFAULT_API_BASE_URL))

    this.state = {
      route: { name: '', params: [], value: '' },
      store: store,
      api: api,
      allSnaps: [],
      featuredSnapIds: [],
      brands: [],
      brand: DEFAULT_BRAND,
      // waitingPayment: true,
      quickBuySnap: '',
      routing: () => {},
    }
  }

  getBrandData = () => {
    return this.state.brands.find(br => br.id === this.state.brand) || {}
  }

  componentDidMount() {
    this.state.store.listen(this.handleStoreEvents)
    this.state.api.listen(this.handleApiMessage)
    this.reloadBrands()
    this.setState({
      routing: createRouting(this.handleRouteUpdate)
    })
  }

  handleConfigureSave = (data) => {
    if (data.apiBaseUrl !== this.state.api.getBaseUrl()) {
      this.updateApiUrl(data.apiBaseUrl)
    }
  }



  updateApiUrl = (baseUrl) => {
    this.state.api.removeListeners()
    this.setState({
      api: createApi(saveApiUrl(baseUrl))
    }, () => {
      this.state.api.listen(this.handleApiMessage)
    })
  }

  resetApiUrl = () => {
    this.updateApiUrl(DEFAULT_API_BASE_URL)
  }

  handleApiMessage = (message) => {
    console.log(message)
  }

  handleRouteUpdate = (route, previous) => {
    this.setState({ route })
    window.scrollTo(0, 0)
  }

  goto = (path) => {
    const pathname = `/${!path || path === 'home'? '' : path}`
    if (path !== this.state.route.path) {
      this.state.store.cancelPurchases()
      this.state.routing(pathname)
    }
  }

  handleStoreEvents = (event) => {
    //console.log('[STORE EVENT]', event.type, event)
    if (event.type === 'ALL_SNAPS') {
      return this.setState({ allSnaps: event.snaps })
    }
    if (event.type === 'FEATURED_SNAPS') {
      return this.setState({ featuredSnapIds: event.ids })
    }
    if (event.type === 'GO_HOME') {
      return this.goto('')
    } 
  }

  reloadBrands = () => {
    this.setState(
      { brands: [], brand: DEFAULT_BRAND },
      () => {
        getBrands().then(brands => {
          this.setState({
            brands,
            brand: brands[0].id,
          })
        })
      }
    )
  }

  changeBrand = (id) => {
    this.setState({ brand: id })
    window.scrollTo(0, 0)
  }

  getSnap = (id) => (
    this.state.allSnaps.find(snap => snap.id === id)
  )

  requestInstall = (snapId) => {
    const { store, api } = this.state
    store.install(snapId)
    api.request('enable', { name: snapId })
  }
  requestRemove = (snapId) => {
    const { store, api } = this.state
    store.remove(snapId)
    api.request('disable', { name: snapId })
  }
  requestSignin = (snapId) => {
    this.state.store.signin(snapId)
  }
  requestAuthorize = (snapId) => {
    this.state.store.authorize(snapId)
  }
  requestConfirm = (snapId) => {
    this.state.store.confirm(snapId)
  }
  requestCancel = () => {
    this.state.store.cancelPurchases()
  }

  quickRemove = (snapId) => {
    const snap = this.getSnap(snapId)
    if (!snap) return
    this.state.store.remove(snapId)
  }

  quickInstall = (snapId) => {
    const snap = this.getSnap(snapId)
    if (!snap) return

    this.requestInstall(snapId)
    if (snap.price !== 'free' ) {
      this.setState({ quickBuySnap: snapId })
    }
  }

  handleMenuItemClick = (id) => {
    this.goto(id === 'home'? '' : id)
  }

  handleProfileClick = () => {
    // do nothing for now
  }

  handleBackClick = () => {
    this.goto('')
  }

  handleOpenSnap = (id) => {
    if (id === 'add') {
      return this.goto('store')
    }
    const snap = this.getSnap(id)
    // if (snap && !snap.preinstalled) {
    if (snap) {
      this.goto(`snap/${id}`)
    }
  }

  handleOpenStore = () => {
    this.goto('store')
  }

  handleOpenSettings = () => {
    this.goto('settings')
  }

  handleOpenDocumentation = () => {
    const brandData = this.getBrandData()
    if (brandData.docUrl) {
      window.open(brandData.docUrl)
    }
  }

  handleSettingsNavChange = (id) => {
    this.goto(`settings${id? `/${id}` : ''}`)
  }

  snapIdsToSnaps = (ids) => (
    ids.map(this.getSnap).filter(snap => snap)
  )

  getFeaturedSnaps = () => {
    return this.snapIdsToSnaps(this.state.featuredSnapIds)
  }

  handleTagClick = (name) => {
    // tag clicks disabled for now
    //this.goto(`store/category/${name}`)
  }

  render() {

    const {
      allSnaps,
      brands,
      route,
    } = this.state

    const homeSnaps = allSnaps.filter(
      snap => (
        snap.status === 'installed' || snap.status === 'installing'
      )
    )

    const brandData = this.getBrandData()

    const themeChanger = brands.length < 2? null : (
      <ThemeChanger
        brands={brands}
        onChangeBrand={this.changeBrand}
        reloadBrands={this.reloadBrands}
      />
    )

    const currSnap = allSnaps.find(snap => (
      snap.id === route.params[route.params.length - 1] ||
      snap.id === this.state.quickBuySnap
    ))

    const section = routeSection(route.name)

    let waitingPayment = false
    if ((section === 'store' || section === 'snap') && currSnap) {
      waitingPayment = (
        currSnap.status === 'wait-confirm' ||
        currSnap.status === 'confirming1' ||
        currSnap.status === 'confirming2'
      )
    }

    let waitStoreToPay = false
    let waitPayToStore = false
    if ((section === 'store' || section === 'snap') && currSnap) {
      waitStoreToPay = (
        currSnap.status === 'authorizing'
      )
      waitPayToStore = (
        currSnap.status === 'confirming1' ||
        currSnap.status === 'confirming2'
      )
    }

    return (
      <div className='App'>
        <style>{`a { color: ${brandData.color || '#333'} }`}</style>

        <If cond={!waitingPayment}>
          <div className='App-main'>
            <div className='App-header'>
              <Header 
                hasBack={section !== 'home'}
                hasSignIn={section === 'home'}
                signedIn={true}
                currentSection={section}
                onMenuItemClick={this.handleMenuItemClick}
                onProfileClick={this.handleProfileClick}
                onBackClick={this.handleBackClick}
              />
            </div>
            <main className='App-content'>
              <If cond={section === 'configure'}>
                <ConfigurePage
                  apiBaseUrl={this.state.api.getBaseUrl()}
                  apiBaseUrlDefault={DEFAULT_API_BASE_URL}
                  onSave={this.handleConfigureSave}
                />
              </If>
              <If cond={section === 'home'}>
                <HomePage
                  snaps={homeSnaps}
                  brandData={brandData}
                  onOpenSnap={this.handleOpenSnap}
                  onOpenSettings={this.handleOpenSettings}
                  onOpenDocumentation={this.handleOpenDocumentation}
                />
              </If>
              <If cond={section === 'store'}>
                <StorePage
                  featuredSnaps={this.getFeaturedSnaps()}
                  onOpenSnap={this.handleOpenSnap}
                  onTagClick={this.handleTagClick}
                  onInstallSnap={this.quickInstall}
                  onRemoveSnap={this.quickRemove}
                  categories={categories}
                  category={route.name === 'store-category'? route.params[0] : ''}
                  brandData={brandData}
                />
              </If>
              <If cond={section === 'snap'}>
                <div className='App-SnapPage'>
                  <SnapPage
                    snap={allSnaps.find(snap => (
                      snap.id === route.params[route.params.length - 1]
                    ))}
                    onRequestInstall={this.requestInstall}
                    onRequestRemove={this.requestRemove}
                    onRequestSignin={this.requestSignin}
                    onRequestAuthorize={this.requestAuthorize}
                    onRequestConfirm={this.requestConfirm}
                    onRequestCancel={this.requestCancel}
                    onRequestStore={this.handleOpenStore}
                  />
                </div>
              </If>
              <If cond={section === 'settings'}>
                <SettingsPage
                  screenId={route.params[0]}
                  onNavChange={this.handleSettingsNavChange}
                />
              </If>
            </main>
            <div className='App-footer'>
              <Footer 
                name={brandData.brandName}
                firstLine={themeChanger}
                copyright={`© ${(new Date()).getFullYear()} ${brandData.brandName}`}
                logo={`${pub}/brand-settings/brand/logo.png`}
                link={brandData.website}
                termsUrl={brandData.termsUrl}
              />
            </div>
          </div>
        </If>

        <If cond={waitingPayment}>
          <MyUbuntu
            onPurchase={this.requestConfirm}
            onCancel={this.requestCancel}
            snap={currSnap}
          />
        </If>

        <Loader
          visible={waitStoreToPay || waitPayToStore}
          label={
            waitStoreToPay
            ? 'You are being redirected to the payment portal my.ubuntu.com…'
            : (
              currSnap && currSnap.status === 'confirming1'
              ? 'Your payment was successful.'
              : 'Redirecting you to the store to complete installation…'
            )
          }
          label2={(
            <span style={{
              fontSize: '14px'
            }}>
              <a
                role='button'
                style={{
                  textDecoration: 'underline',
                  color: '#007AA6',
                }}
              >
                Click here
              </a>
              {' if you are not being redirected.'}
            </span>
          )}
        />
      </div>
    )
  }
}

export default App
