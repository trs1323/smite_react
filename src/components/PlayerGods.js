import React, { Component } from 'react'
import Axios from 'axios';
import md5 from 'md5';
import { trackPromise } from 'react-promise-tracker'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Header from './layout/Header'
import Footer from './layout/Footer';

const style = {
    width: '75vw',
    height: '100%',
    background: '#e7e7e7',
    boxShadow: '11px 7px 17px 0px rgba(10, 10, 10, 0.473)',
    border: '.4rem ridge #ba8c59'
}

//loading bar
const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <div style={style}>
            <div className="loader" >
                <Loader type="ThreeDots" color="#ba8c59" height="100" width="100" />
            </div>
        </div>
    )
}

//table
const columns = [
    {
        id: 'godimg',
        Header: 'Sort:',
        accessor: d => { return <img className='god-img-table' src={`https://web2.hirez.com/smite/god-icons/${d.god.toString().toLowerCase().replace(/'/g, '').replace(/\s/g, '-')}.jpg`} alt="" /> },
        width: 60

    },
    {
        id: 'godName',
        Header: 'God',
        accessor: d => d.god,
        width: 175

    }, {
        id: 'godMatchs',
        Header: 'Matchs',
        accessor: d => (d.Wins + d.Losses)
    }, {
        id: 'godWins',
        Header: 'Wins',
        accessor: d => d.Wins,
        width: 75
    }, {
        id: 'godLosses',
        Header: 'Losses',
        accessor: d => d.Losses
    }, {
        id: 'godWinRate',
        Header: 'Winrate',
        accessor: d => `${((d.Wins / (d.Wins + d.Losses)) * 100).toFixed(2)}%`
    }, {
        id: 'godKills',
        Header: 'Kills',
        accessor: d => d.Kills
    }, {
        id: 'godDeaths',
        Header: 'Deaths',
        accessor: d => d.Deaths
    }, {
        id: 'godAssists',
        Header: 'Assists',
        accessor: d => d.Assists
    }, {
        id: 'godKDA',
        Header: 'KDA',
        accessor: d => ((d.Kills + d.Assists) / d.Deaths).toFixed(2)
    },

]


export default class PlayerGods extends Component {
    constructor(props) {
        super(props)
        this.state = { api: 'getplayer', api2: 'getgodranks', api5: 'getqueuestats', loaded: false, res: this.props.player_info }
    }

    componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        // const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`)
        // trackPromise(
        //     Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}`, config)
        //         .then(res => {
        //             this.setState({
        //                 res: res.data[0]
        //             })
        //         })
        //         .catch(err => {
        //             alert('404 Please try again')
        //             console.log(err)
        //         })
        // )

        const signature2 = md5(`${this.props.devid}${this.state.api2}${this.props.authkey}${this.props.timestamp}`)
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api2}json/${this.props.devid}/${signature2}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}`, config)
                .then(res => {
                    this.setState({
                        godranks: res.data,
                        loaded: true
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        )

        //Conquest history
        var signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/426`, config)
                .then(res => {
                    this.setState({
                        ConquestHistory: res.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        )
        //Joust History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/448`, config)
            .then(res => {
                this.setState({
                    JoustHistory: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        //Arena History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/435`, config)
            .then(res => {
                this.setState({
                    ArenaHistory: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        //Assalt History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/445`, config)
            .then(res => {
                this.setState({
                    AssaltHistory: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        //Clash History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/466`, config)
            .then(res => {
                this.setState({
                    ClashHistory: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        //Siege History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/459`, config)
            .then(res => {
                this.setState({
                    SiegeHistory: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    //fills the page with background
    isLoaded() {
        return ((this.state.loaded === false) ? 'background-player-gods' : 'background-player-gods-loaded')
    }

    render() {
        return (
            <div className={this.isLoaded()}>
                <Header />
                <LoadingIndicator />
                {this.state && this.state.godranks &&
                    <div>
                        <ReactTable
                            data={this.state.godranks}
                            columns={columns}
                            resizable={false}
                        />
                    </div>}
                <Footer />
            </div>
        )
    }
}
