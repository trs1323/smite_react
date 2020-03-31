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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Gods from '../backup/gods.json';
import Server from '../backup/server.json';


const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <div className="loader">
            <Loader type="ThreeDots" color="#2a374a" height="100" width="100" />
        </div>
    )
}


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { api: 'getgods', api2: 'gethirezserverstatus', loaded: false }
        this.setGodId = this.setGodId.bind(this)
    }

    componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`);
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/1`, config)
                .then(res => {

                    this.setState({
                        AllGods: res.data,
                        LatestGod: res.data.filter((newGod) => {
                            return newGod.latestGod === 'y'
                        }),
                        WeeklyGods: res.data.filter((free) => {
                            return free.OnFreeRotation === 'true'
                        }),
                        loaded: true
                    })
                    this.props.setGods(this.state.AllGods)
                })

                .catch(err => {
                    console.log(err)
                    this.setState({
                        AllGods: { Gods }.Gods,
                        LatestGod: { Gods }.Gods.filter((newGod) => {
                            return newGod.latestGod === 'y'
                        }),
                        WeeklyGods: { Gods }.Gods.filter((free) => {
                            return free.OnFreeRotation === 'true'
                        }),
                        loaded: true
                    })
                    this.props.setGods(this.state.AllGods)
                }))
        const signature2 = md5(`${this.props.devid}${this.state.api2}${this.props.authkey}${this.props.timestamp}`);
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api2}json/${this.props.devid}/${signature2}/${this.props.session}/${this.props.timestamp}`, config)
            .then(res => {
                this.setState({
                    serverStatus: res.data
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    serverStatus: { Server }.Server
                })
            })


    }

    isLoaded() {

        return ((this.state.loaded === false) ? 'header' : 'header-loaded')
    }

    setGodId(event) {
        this.props.god_id(event.target.id)
    }

    serverStatus(status) {
        return ((status === 'UP') ? 'circle-up' : 'circle-down')
    }

    serverStatusText(status) {
        return ((status === 'UP') ? 'text-up' : 'text-down')
    }

    render() {
        return (
            <div className={this.isLoaded()}>
                <div className="ocp-background">
                    <Header />
                    <p className="website-title">Smite Stats and Data for Nerds</p>
                    <div className='home'>
                        <LoadingIndicator />
                        {this.state && this.state.LatestGod && this.state.serverStatus &&
                            <div className='home-inside'>

                                <div className="home-info">
                                    <div className="patch-notes">
                                        <h2>Lastest Patch</h2>
                                        <a href="https://www.smitegame.com/news/the-vigilant-update-notes/" target="_blank" rel="noopener noreferrer">
                                            <img src={require('../img/patch/new-patch.png')} alt='' />
                                            <h3 className="patch-title">6.12  Update Notes</h3>
                                        </a>
                                    </div>
                                    <div className="esports">
                                        <h2>Esports</h2>
                                        <div className="esports-container">
                                            <a href="https://esports.smitegame.com/" target="_blank" rel="noopener noreferrer">
                                                <img src={require('../img/esport.png')} className="esports-img" alt="Smite eSports" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="server">
                                        <h2>Server Status</h2>
                                        <div className="server-container">
                                            {this.state.serverStatus.slice(0, 4).map((server) =>
                                                <div key={uuid.v4()} className="server-platform">
                                                    <div key={uuid.v4()} className={this.serverStatus(server.status)}></div>
                                                    <p key={uuid.v4()}>
                                                        {(server.platform).toUpperCase()}
                                                    </p>
                                                    <img key={uuid.v4()} src={require(`../img/icon/${server.platform}.png`)} alt="" />
                                                    <p key={uuid.v4()} className={this.serverStatusText(server.status)}>{server.status}</p>
                                                </div>)}
                                            <p className="server-last-updated">Last Updated: {this.state.serverStatus[0].entry_datetime}</p>
                                        </div>
                                    </div>
                                    <div className="newest-god">
                                        <h2>Newest God</h2>
                                        <div className="newest-god-container">
                                            <Link to={{ pathname: "/god_id" }}>
                                                <img src={this.state.LatestGod[0].godIcon_URL} className="new-god-img" id={this.state.LatestGod[0].id} alt="" onClick={this.setGodId} />
                                            </Link>
                                            <p className="new-god-name">{this.state.LatestGod[0].Name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="free-gods">
                                    <h2>Weekly Free Rotation</h2>
                                    <div className="free-gods-container">
                                        {this.state.WeeklyGods.map((god) =>
                                            <Link key={uuid.v4()} to={{ pathname: "/god_id" }}>
                                                <div key={uuid.v4()} className="free-god" onClick={this.setGodId}>
                                                    <img key={uuid.v4()} className="free-gods-img" src={god.godIcon_URL} alt="" id={god.id} />
                                                    <p key={uuid.v4()} className="free-god-name" >{god.Name}</p>
                                                    <h6 key={uuid.v4()} ><i>{god.Title}</i></h6>
                                                    <div className="class">
                                                        <h6 key={uuid.v4()}>{god.Roles}</h6>
                                                        <img key={uuid.v4()} src={require(`../img/class/${god.Roles.replace(/\s/g, '')}.png`)} alt=""></img></div>
                                                    <div className="pantheon">
                                                        <h6 key={uuid.v4()}>{god.Pantheon}</h6>
                                                        <img key={uuid.v4()} src={require(`../img/pantheon/${god.Pantheon}.png`)} alt=""></img> </div>
                                                </div>
                                            </Link>
                                        )}
                                        <div className="see-all-gods">
                                            <Link to={'/gods'}>
                                                <p>All Gods</p>
                                                <FontAwesomeIcon icon={faChevronRight} size='2x' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div >
                    <Footer />
                </div>
            </div>
        )
    }
}
