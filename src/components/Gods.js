import React, { Component } from 'react';
import Axios from 'axios';
import md5 from 'md5';
import { Link } from "react-router-dom";
import uuid from 'uuid'
import { trackPromise } from 'react-promise-tracker'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import Header from './layout/Header'
import Footer from './layout/Footer';

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
        this.state = { api: 'getgods', lang: '1', active: '', loaded: 'false' }
        this.onclick = this.onclick.bind(this)
        this.setGodId = this.setGodId.bind(this)
    }

    isLoaded() {
        return ((this.state.loaded === 'false') ? 'god-background' : 'god-background-loaded')
    }

    //highlight the filter
    isActive(val) {
        return ((val === this.state.active) ? 'active' : '');
    }

    setGodId(event) {
        this.props.god_id(event.target.id)
    }


    //sorting the gods
    onclick(event) {
        if (event.target.id === 'Reset') {
            this.setState({
                data: this.state.base,
                active: ''
            })
        } else {
            this.setState({
                data: this.state.base.filter((god) => {
                    return god.Roles === ` ${event.target.id}`
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
                    this.setState({ data: res.data, base: res.data, loaded: 'true' })
                })
                .catch(err => {
                    alert('404 Please try again')
                    console.log(err)
                }))
    }

    render() {
        return (
            <div className={this.isLoaded()}>
                <Header />
                <div className="god-title">
                    <h1>Gods</h1>
                    <div className="god-sort">
                        <ul>
                            <li>Sort By:</li>
                            <li className={this.isActive('Assassin')} id='Assassin' onClick={this.onclick} >Assassin</li>
                            <img src={require('../img/class/Assassin.png')} alt="" />
                            <li className={this.isActive('Hunter')} id='Hunter' onClick={this.onclick} >Hunter</li>
                            <img src={require('../img/class/Hunter.png')} alt="" />
                            <li className={this.isActive('Warrior')} id='Warrior' onClick={this.onclick} >Warrior</li>
                            <img src={require('../img/class/Warrior.png')} alt="" />
                            <li className={this.isActive('Guardian')} id='Guardian' onClick={this.onclick} >Guardian</li>
                            <img src={require('../img/class/Guardian.png')} alt="" />
                            <li className={this.isActive('Mage')} id='Mage' onClick={this.onclick} >Mage</li>
                            <img src={require('../img/class/Mage.png')} alt="" />
                            <li className={this.isActive('Reset')} id='Reset' onClick={this.onclick} >Reset</li>
                        </ul>
                    </div>
                </div>
                <div className="gods">
                    <LoadingIndicator />
                    {this.state && this.state.data &&
                        <div className="gods-loaded">
                            {this.state.data.map((god) =>
                                <Link key={uuid.v4()} to={{ pathname: "/god_id" }}>
                                    <div key={uuid.v4()} className="single-god" onClick={this.setGodId}>
                                        <img key={uuid.v4()} src={god.godIcon_URL} alt="" id={god.id} />
                                        <p key={uuid.v4()}  >{god.Name}</p>
                                        <h5 key={uuid.v4()} ><i>{god.Title}</i></h5>
                                        <div className="class">
                                            <h6 key={uuid.v4()}>{god.Roles}</h6>
                                            <img key={uuid.v4()} src={require(`../img/class/${god.Roles.replace(/\s/g, '')}.png`)} alt=""></img></div>
                                        <div className="pantheon">
                                            <h6 key={uuid.v4()}>{god.Pantheon}</h6>
                                            <img key={uuid.v4()} src={require(`../img/pantheon/${god.Pantheon}.png`)} alt=""></img> </div>
                                    </div>
                                </Link>
                            )}
                        </div>}</div>
                <Footer />
            </div>
        )
    }
}
