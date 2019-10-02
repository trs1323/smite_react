import React, { Component } from 'react'
import Axios from 'axios';
import md5 from 'md5';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Player from './Player';
import '../App.css';

export default class Seach extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', api: 'searchplayers', name: '', player_id: '', portal_id: '' }
        this.onsubmit = this.onsubmit.bind(this)
        this.onchange = this.onchange.bind(this)
    }

    onsubmit(event) {
        var username = this.state.value;
        this.setState({ value: '' });
        const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`)
        console.log('pressed')
        event.preventDefault();
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${username}`)
            .then(res => {
                console.log(res);
                this.setState({ name: res.data[0].Name, player_id: res.data[0].player_id, portal_id: res.data[0].portal_id })
            })
            .catch(err => console.log(err))


    }

    onchange(event) {
        this.setState({ value: event.target.value })

    }

    render() {
        var player = this.state.player_id
        const devid = this.props.devid;
        const session = this.props.session;
        var timestamp = this.props.timestamp
        const authkey = this.props.authkey;
        return (
            <Router>
                <div>
                    <div className='search'>
                        <form onSubmit={this.onsubmit}>
                            <input type="text" onChange={this.onchange} value={this.state.value}></input> <input type="submit" value="Search Player"></input>
                        </form>
                    </div>
                    <Link to='/player'><h4>{this.state.name}</h4></Link>

                    <Switch>
                        <Route path="/player">
                            <Player
                                player={player}
                                devid={devid}
                                session={session}
                                timestamp={timestamp}
                                authkey={authkey}
                            />
                        </Route>
                    </Switch>
                </div>
            </Router>

        )
    }
}



