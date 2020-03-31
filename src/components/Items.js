import React, { Component } from 'react';
import Axios from 'axios';
import md5 from 'md5';
import uuid from 'uuid'
import { trackPromise } from 'react-promise-tracker'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import Header from './layout/Header'
import Footer from './layout/Footer';
import Items from '../backup/items.json'

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <div className="loader">
            <Loader type="ThreeDots" color="#2a374a" height="100" width="100" />
        </div>
    )
}

export default class Gods extends Component {
    constructor(props) {
        super(props);
        this.state = { api: 'getitems', lang: '1', active: '3', loaded: false }
        this.onclick = this.onclick.bind(this)
    }

    isLoaded() {
        return ((this.state.loaded === false) ? 'item-background' : 'item-background-loaded')
    }

    //highlight the filter
    isActive(val) {
        return ((val === this.state.active) ? 'active' : '');
    }


    //sorting the gods
    onclick(event) {
        if (event.target.id === 'Reset') {
            this.setState({
                AllItems: this.state.base,
                active: ''
            })
        } else if (event.target.id === 'Starter') {
            this.setState({
                AllItems: this.state.base.filter((item) => {
                    return item.StartingItem === true
                }),
                active: event.target.id
            })
        } else {
            this.setState({
                AllItems: this.state.base.filter((item) => {
                    return item.ItemTier == event.target.id
                }),
                active: event.target.id
            })
        }



    }

    componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`);
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${this.state.lang}`, config)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        AllItems: res.data.filter((item) => {
                            return item.ItemTier == 3
                        }),
                        base: res.data,
                        loaded: true
                    })
                })
                .catch(err => {
                    this.setState({
                        AllItems: { Items }.Items.filter((item) => {
                            return item.ItemTier == 3
                        }),
                        base: { Items }.Items,
                        loaded: true
                    })
                }))
    }

    render() {
        return (
            <div className={this.isLoaded()}>
                <Header />
                <div className="god-title">
                    <h1>Items</h1>
                    <div className="god-sort">
                        <ul>
                            <li>Sort By:</li>
                            <li className={this.isActive('Starter')} id='Starter' onClick={this.onclick} >Starter Items</li>
                            <li className={this.isActive('1')} id='1' onClick={this.onclick} >Tier 1</li>
                            <li className={this.isActive('2')} id='2' onClick={this.onclick} >Tier 2</li>
                            <li className={this.isActive('3')} id='3' onClick={this.onclick} >Tier 3</li>
                            <li className={this.isActive('Reset')} id='Reset' onClick={this.onclick} >Reset</li>
                        </ul>
                    </div>
                </div>
                <div className="gods">
                    <LoadingIndicator />
                    {this.state && this.state.AllItems &&
                        <div className="items-loaded">
                            {this.state.AllItems.map((item) =>
                                <div key={uuid.v4()} className="single-item">
                                    <img key={uuid.v4()} src={item.itemIcon_URL} alt="" />
                                    <p key={uuid.v4()}  >{item.DeviceName}</p>
                                    <h5 key={uuid.v4()} ><i>{item.ShortDesc}</i></h5>
                                    <div className='tooltip' key={uuid.v4()}>
                                        <p key={uuid.v4()}  >{item.DeviceName}</p>
                                        <p key={uuid.v4()}  >{item.ItemDescription.SecondaryDescription}</p>
                                        {item.ItemDescription.Menuitems.map((menu) =>
                                            <p key={uuid.v4()}>
                                                {menu.Description}: {menu.Value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>}</div>
                <Footer />
            </div>
        )
    }
}
