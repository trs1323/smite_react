import React, { Component } from 'react'
import Seach from './Seach';
import md5 from 'md5'
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import '../App.css';
import Player from './Player';
import Gods from './Gods';
import GodId from './GodId';
import PlayerGods from './PlayerGods';
import Home from './Home'
import Items from './Items'


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devId: 3359,
            authKey: 'A73937BDE832463B8251CFEE8FB45862',
            session: '',
            player_id: '',
            god_id: ''
        }
        this.childstate = this.childstate.bind(this)
        this.setGodState = this.setGodState.bind(this)
    }

    componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'
            }
        }
        var dt = new Date();
        var timestamp = `${
            dt.getFullYear().toString().padStart(4, '0')}${
            (dt.getMonth() + 1).toString().padStart(2, '0')}${
            dt.getUTCDate().toString().padStart(2, '0')}${
            dt.getUTCHours().toString().padStart(2, '0')}${
            dt.getUTCMinutes().toString().padStart(2, '0')}${
            dt.getUTCSeconds().toString().padStart(2, '0')}`;
        var signature = md5(`${this.state.devId}createsession${this.state.authKey}${timestamp}`);
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/createsessionjson/${this.state.devId}/${signature}/${timestamp}`, config)
            .then(res => this.setState({ session: res.data.session_id }))
            .catch(err => {
                alert('404 Please try again')
                console.log(err)
            })
    }


    //grabs player id from search bar
    childstate(player) {
        this.setState({ player_id: player })
    }

    setGodState(god) {
        this.setState({ god_id: god })
    }


    render() {
        var dt = new Date();
        var timestamp = `${
            dt.getFullYear().toString().padStart(4, '0')}${
            (dt.getMonth() + 1).toString().padStart(2, '0')}${
            dt.getUTCDate().toString().padStart(2, '0')}${
            dt.getUTCHours().toString().padStart(2, '0')}${
            dt.getUTCMinutes().toString().padStart(2, '0')}${
            dt.getUTCSeconds().toString().padStart(2, '0')}`;
        const devid = this.state.devId;
        const authkey = this.state.authKey;
        var session = this.state.session;

        return (
            <Router>
                <div className='main'>
                    <Switch>
                        <Route exact path={process.env.PUBLIC_URL + '/'}>
                            {this.state && this.state.session &&
                                <Home
                                    dt={dt}
                                    timestamp={timestamp}
                                    devid={devid}
                                    authkey={authkey}
                                    session={session}
                                    god_id={this.setGodState}
                                />}
                        </Route>
                        <Route path="/seach">
                            {this.state && this.state.session &&
                                <Seach
                                    dt={dt}
                                    timestamp={timestamp}
                                    devid={devid}
                                    authkey={authkey}
                                    session={session}
                                    change={this.childstate}
                                />}
                        </Route>
                        <Route path="/player">
                            {this.state && this.state.session &&
                                <Player
                                    timestamp={timestamp}
                                    devid={devid}
                                    authkey={authkey}
                                    session={session}
                                    player_id={this.state.player_id} />}
                        </Route>
                        <Route path="/gods">
                            {this.state && this.state.session &&
                                <Gods
                                    timestamp={timestamp}
                                    devid={devid}
                                    authkey={authkey}
                                    session={session}
                                    god_id={this.setGodState} />}
                        </Route>
                        <Route path="/god_id">
                            {this.state && this.state.session &&
                                <GodId
                                    timestamp={timestamp}
                                    devid={devid}
                                    authkey={authkey}
                                    session={session}
                                    god_id={this.state.god_id} />}
                        </Route>
                        <Route path="/player_gods">
                            {this.state && this.state.session &&
                                <PlayerGods
                                    timestamp={timestamp}
                                    devid={devid}
                                    authkey={authkey}
                                    session={session}
                                    player_id={this.state.player_id}
                                />}
                        </Route>
                        <Route path="/items">
                            {this.state && this.state.session &&
                                <Items
                                    timestamp={timestamp}
                                    devid={devid}
                                    authkey={authkey}
                                    session={session}
                                />}
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
