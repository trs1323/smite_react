import React, { Component } from 'react'
import Axios from 'axios';
import md5 from 'md5';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Seach from './Seach'

export default class Player extends Component {
    constructor(props) {
        super(props)
        this.state = { api: 'getplayer' }
    }


    componentDidMount() {


        const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}`)
            .then(res => {
                console.log(res);
                this.setState({ res: res.data[0] })
            })
            .catch(err => {
                alert('404 Please try again')
                console.log(err)
            })
    }


    render() {

        return (

            <div>
                <h1>
                    Stats
                </h1>
                <Link to="/">Home</Link>
                <Link to="/seach" >X</Link>
                {this.state && this.state.res &&
                    <div>
                        <h2>{this.state.res.Name}</h2>
                        <p>Level: {this.state.res.Level}</p>
                        <p>Masterys: {this.state.res.MasteryLevel}</p>
                        <p>Wins: {this.state.res.Wins}</p>
                        <p>Loses: {this.state.res.Losses}</p>
                        <p>Winrate: {this.state.res.Wins / this.state.res.Losses}</p>
                    </div>
                }
            </div>


        )
    }
}
