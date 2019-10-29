import React, { Component } from 'react'
import Axios from 'axios';
import md5 from 'md5';
import uuid from 'uuid'
import { Link } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import PieChart from 'react-minimal-pie-chart';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const columns = [{
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
}, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
}, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
}]

export default class PlayerGods extends Component {
    constructor(props) {
        super(props)
        this.state = { api: 'getplayer', api2: 'getgodranks', api5: 'getqueuestats' }
    }

    componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`)
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}`, config)
                .then(res => {
                    console.log(res);
                    this.setState({
                        res: res.data[0]
                    })
                })
                .catch(err => {
                    alert('404 Please try again')
                    console.log(err)
                })
        )

        const signature2 = md5(`${this.props.devid}${this.state.api2}${this.props.authkey}${this.props.timestamp}`)
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api2}json/${this.props.devid}/${signature2}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}`, config)
                .then(res => {
                    this.setState({
                        godranks: res.data
                    })
                })
                .catch(err => {
                    alert('404 Please try again')
                    console.log(err)
                })
        )

        //Conquest history
        var signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/426`, config)
                .then(res => {
                    console.log(res)
                    this.setState({
                        ConquestHistory: res.data
                    })
                })
                .catch(err => {
                    alert(err)
                    console.log(err)
                })
        )
        //Joust History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/448`, config)
            .then(res => {
                console.log(res)
                this.setState({
                    JoustHistory: res.data
                })
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })

        //Arena History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/435`, config)
            .then(res => {
                console.log(res)
                this.setState({
                    ArenaHistory: res.data
                })
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })

        //Assalt History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/445`, config)
            .then(res => {
                console.log(res)
                this.setState({
                    AssaltHistory: res.data
                })
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })

        //Clash History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/466`, config)
            .then(res => {
                console.log(res)
                this.setState({
                    ClashHistory: res.data
                })
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })

        //Siege History
        signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/459`, config)
            .then(res => {
                console.log(res)
                this.setState({
                    SiegeHistory: res.data
                })
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })


    }
    render() {
        return (
            <div>
                <div className="btn-family">
                    <div className="btn">
                        <Link to="/">Home</Link></div>
                    <div className="btn">
                        <Link to="/seach">Players</Link></div>
                    <div className="btn">
                        <Link to="/gods">Gods</Link></div>
                    <div className="btn">
                        <Link to="/items">Items</Link></div>
                </div>

                {this.state && this.state.res &&

                    <div>
                        <ReactTable
                            data={this.state.res}
                        />
                    </div>}
            </div>
        )
    }
}
