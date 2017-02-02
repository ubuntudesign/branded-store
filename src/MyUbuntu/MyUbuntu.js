import React, { Component } from 'react'
import './MyUbuntu.css'

import {
  Link,
  classes,
  Button,
  Header,
  Footer,
  ContentWrapper,
  SnapPageSummary as Summary,
} from 'toolkit'

const linkColor = '#007AA6'

const pub = process.env.PUBLIC_URL

export default class MyUbuntu extends Component {
  onPurchase = () => {
    this.props.onPurchase(this.props.snap.id)
  }
  render() {

    const {
      snap={},
      cardImgRootUrl,
    } = this.props

    const name = (snap && snap.name) || 'Cassandra'
    const icon = `${cardImgRootUrl}${snap.id}.png`

    const content = {
      title: `Purchasing`,
      listTitle: `Buying ${name} is easy, all you need to do is:`,
      listItems: [
        `Log in using Ubuntu Single Sign On`,
        `Provide us your payment details`,
      ],
      par1: `Once you authorize the payment you’ll be returned to the store.`,
      welcome: `Welcome, Lola Chang`,
      youAreSignedIn: `You are signed in with the email address`,
      email: `lola.chang@canonical.com`,
      notYou: `Not Lola? `,
      manage: `Sign in with a different account`,
    }

    const { onCancel } = this.props
    const onPurchase = this.onPurchase

    return (
      <div>
        <Header
          menuitems={[]}
          onMenuItemClick={() => {}}
        />
        <main className='App-content'>
          <div className='App-payment'>
            <ContentWrapper background>
              <div className='MyUbuntu-content'>
                <div className='MyUbuntu-content-in'>
                  <Block>
                    <h1>{content.title}</h1>

                    <div className='MyUbuntuBlock-app'>
                      <Summary
                        icon={icon}
                        name={snap.name}
                        author={snap.author}
                        rating={-1}
                      />                    
                      <span className='MyUbuntuBlock-app-price'>
                        <span>Snap Price: </span>
                        {snap.price}
                      </span>
                    </div>

                    <div className='MyUbuntuBlock-list' style={{ display: 'none' }}>
                      <h2>{content.listTitle}</h2>
                      <ul>
                        {content.listItems.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Block>
                  <Block>
                    <div className='MyUbuntuBlock-row'>
                      <div>
                        <div className='MyUbuntuBlock-title'>
                          {content.welcome}
                        </div>
                        <p>
                          <span>{content.youAreSignedIn}</span>
                          <span>{' '}</span>
                          <span>{content.email}</span>
                          <span>{'.'}</span>
                        </p>
                      </div>
                      <p>
                        <strong style={{ marginRight: '5px' }}>
                          {content.notYou}
                        </strong>

                        <Link
                          color={linkColor}
                          label={content.manage}
                          external
                        />
                      </p>
                    </div>
                  </Block>
                  <Block>
                    <div className='MyUbuntuBlock-row'>
                      <div>
                        <div className='MyUbuntuBlock-title'>
                          {'Stored payment details'}
                          <img
                            style={{ marginLeft: '11px' }}
                            src={`${pub}/128bits.png`}
                            width={442/2}
                            height={34/2}
                            alt=''
                          />
                        </div>
                        <p>
                          <strong>Mastercard - xxxx-xxx-xxxx-xxxx-4567</strong>
                        </p>
                        <p>
                          Expires: 09/2020
                        </p>
                      </div>
                      <p>
                        <Link
                          color={linkColor}
                          label={'Edit payment details'}
                          external
                        />
                      </p>
                    </div>
                  </Block>

                  <Block noborder>
                    <PurchaseSummary
                      items={[]}
                      onPurchase={onPurchase}
                      onCancel={onCancel}
                    />
                  </Block>
                </div>
              </div>
            </ContentWrapper>
          </div>
        </main>

        <Footer>
          <div className='Footer-MyUbuntu'>
            <ContentWrapper>
              <p>
                {`© ${(new Date()).getFullYear()} Canonical Ltd. Ubuntu and Canonical are registered trademarks of Canonical Ltd.`}
              </p>
              <p>
                <a className='link'>Terms of Service</a>
                <span>{' · '}</span>
                <a className='link'>Report a bug on this site</a>
              </p>
            </ContentWrapper>
          </div>
        </Footer>
      </div>
    )
  }
}

class PurchaseSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      checked: false,
    }
  }
  passwordUpdate = (event) => {
    this.setState({
      password: event.currentTarget.value
    })
  }
  checkboxUpdate = (event) => {
    this.setState({
      checked: event.currentTarget.checked
    })
  }
  render() {
    const { onCancel, onPurchase } = this.props
    return (
      <div className='PurchaseSummary'>
        <div className='MyUbuntuBlock-title'>Confirm your password to complete purchase</div>

        <p>
          Once you authorize the payment you’ll be returned to the store.
        </p>

        <div className='MyUbuntuBlock-authorize' style={{
          marginTop: '30px',
        }}>
          <div style={{
            width: '50%',
          }}>
            <form autoComplete='off'>
              <label htmlFor='password' style={{
                display: 'block',
                marginBottom: '10px',
              }}>Enter your Ubuntu password</label>
              <input
                className='PurchaseSummary-input'
                type='password'
                id='password'
                onChange={this.passwordUpdate}
                value={this.state.password}
              />
            </form>
          </div>
          <p style={{
            marginTop: '5px',
            marginBottom: '26px',
          }}>
            <label style={{ cursor: 'pointer' }}>
              <input
                type='checkbox'
                onChange={this.checkboxUpdate}
                value={this.state.checked}
              />
              <span style={{ marginLeft: '5px' }}>
                {'I have read and agree to the '}
                <Link
                  color={linkColor}
                  label={'terms and conditions'}
                  external
                />
              </span>
            </label>
          </p>
          <div className='SnapPageLogin-validateGroup'
            style={{
              display: 'flex',
              width: '50%',
            }}
          >
            <a
              role='button'
              className='SnapPageLogin-validateGroup-cancel'
              style={{
                color: '#333',
              }}
              onClick={onCancel}
            >
              Cancel
            </a>
            <Button
              label={'Buy and install'}
              type='positive'
              disabled={
                this.state.password === '' ||
                !this.state.checked
              }
              onClick={onPurchase}
              variableWidth={true}
            />
          </div>
        </div>
      </div>
    )
  }
    // <table>
    //   <tr>
    //     <th>Name</th>
    //     <th>Publisher</th>
    //     <th>Ratings</th>
    //     <th></th>
    //   </tr>
    // {items.map(item => (
    //   <
    // ))}
    // </table>
}

function Block({ noborder, leftspace, children }) {
  return (
    <div className={classes({
      'MyUbuntuBlock': true,
      'MyUbuntuBlock-leftspace': leftspace,
      'MyUbuntuBlock-noborder': noborder,
    })}>
      {children}
    </div>
  )
}
