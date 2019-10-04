import React, { Component } from 'react'
import Header from './layout/Header';
import Seach from './Seach';
import md5 from 'md5'
//import CreateSession from './CreateSession';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import '../App.css';
import Player from './Player';
import { AnimatedSwitch } from 'react-router-transition';

function mapStyles(styles) {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
    };
}

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devId: 3359,
            authKey: 'A73937BDE832463B8251CFEE8FB45862',
            session: '',
            player_id: ''
        }
        this.childstate = this.childstate.bind(this)
    }


    componentDidMount() {
        var dt = new Date();
        var timestamp = `${
            dt.getFullYear().toString().padStart(4, '0')}${
            (dt.getMonth() + 1).toString().padStart(2, '0')}${
            dt.getUTCDate().toString().padStart(2, '0')}${
            dt.getUTCHours().toString().padStart(2, '0')}${
            dt.getUTCMinutes().toString().padStart(2, '0')}${
            dt.getUTCSeconds().toString().padStart(2, '0')}`;
        console.log(dt.getUTCDate())
        var signature = md5(`${this.state.devId}createsession${this.state.authKey}${timestamp}`);
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/createsessionjson/${this.state.devId}/${signature}/${timestamp}`)
            .then(res => this.setState({ session: res.data.session_id }))
            .catch(err => console.log(err))

    }

    childstate(player) {
        this.setState({ player_id: player })
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
        //var signature = md5(`${this.devId}${api}${this.authKey}${timestamp}`);
        var session = this.state.session;

        return (
            <Router>
                <div className='main'>
                    <AnimatedSwitch atEnter={{
                        opacity: 0,
                        scale: 2.0,
                    }}
                        atLeave={{
                            opacity: 0

                        }}
                        atActive={{ opacity: 1 }}
                        mapStyles={mapStyles}
                        className="switch-wrapper">
                        <Route exact path="/">
                            <Header />
                        </Route>

                        <Route path="/seach">
                            <Seach
                                dt={dt}
                                timestamp={timestamp}
                                devid={devid}
                                authkey={authkey}
                                session={session}
                                change={this.childstate}
                            />
                        </Route>

                        <Route path="/player">
                            <Player
                                timestamp={timestamp}
                                devid={devid}
                                authkey={authkey}
                                session={session}
                                player_id={this.state.player_id} />
                        </Route>
                    </AnimatedSwitch>
                </div>
            </Router>
        )
    }
}
