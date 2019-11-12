import React, { Component } from 'react'
import Axios from 'axios';
import md5 from 'md5';
import { Link } from "react-router-dom";
import '../App.css';
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
            <Loader type="ThreeDots" color="#ba8c59" height="100" width="100" />
        </div>
    )
}


export default class Seach extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', api: 'searchplayers', name: '', player_id: '', portal_id: '' }
        this.onsubmit = this.onsubmit.bind(this)
        this.onchange = this.onchange.bind(this)
        this.setPlayer = this.setPlayer.bind(this)
    }



    onsubmit(event) {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        var username = this.state.value;
        this.setState({ value: '' });
        const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`)
        event.preventDefault();
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${username}`, config)
                .then(res => {
                    this.setState({ data: res.data })
                })
                .catch(err => {
                    alert('404 Please try again')
                    console.log(err)
                }))
    }


    //sets player_id to state for stat lookup
    setPlayer(event) {
        this.setState({ player_id: event.target.id })
        this.props.change(event.target.id)
    }


    //sets the name typed in to lookup users
    onchange(event) {
        this.setState({ value: event.target.value })

    }


    render() {
        return (
            <div>
                <div className="search-bg">
                    <div className='search'>
                        <Header />
                        <div className="search-form">
                            <form onSubmit={this.onsubmit}>
                                <input type="text" onChange={this.onchange} value={this.state.value}></input> <input type="submit" value="Search Player"></input>
                            </form>
                        </div>
                        <div className="search-result">
                            <LoadingIndicator />
                            {this.state && this.state.data &&
                                <Link to={{
                                    pathname: "/player"
                                }} >{this.state.data.slice(0, 5).map((person) =>
                                    <div key={uuid.v4()} className="nameIcon" onClick={this.setPlayer} >
                                        <h4 key={uuid.v4()} id={person.player_id} >{person.Name}</h4>
                                        <img key={uuid.v4()} src={require(`../img/icon/${person.portal_id}.png`)} alt="" />
                                    </div>
                                )}
                                </Link>}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div >


        )
    }
}



