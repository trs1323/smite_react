import React, { Component } from 'react'
import Axios from 'axios';
import md5 from 'md5'

export default class Player extends Component {
    constructor(props) {
        super(props)
        this.state = { api: 'getplayer' }
    }


    componentDidMount() {
        const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`)
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${this.props.player}`)
            .then(res => this.setState({ res: res.data[0] }))
            .catch(err => console.log(err))
    }
    render() {

        return (
            <div>
                <h1>
                    Stats
                </h1>
                {this.state && this.state.res &&
                    <div><h2>{this.state.res.Name}</h2></div>
                }
            </div>
        )
    }
}
