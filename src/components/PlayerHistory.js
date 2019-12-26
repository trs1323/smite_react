import React, { Component } from 'react'
import Axios from 'axios';
import md5 from 'md5';
// import uuid from 'uuid'
import { Link } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import Header from './layout/Header'
import Footer from './layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

//loading bar
const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <div className="loader">
            <Loader type="ThreeDots" color="#ba8c59" height="100" width="100" />
        </div>
    )
}

export default class PlayerHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            api: 'getplayer', api2: 'getgods', api3: 'getitems', api4: 'getmatchhistory', api5: 'getmatchdetailsbatch', loaded: false, res: this.props.player_info
        }
        this.setPlayer = this.setPlayer.bind(this)
    }

    componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        // const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`)
        // //player info
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




        const signature4 = md5(`${this.props.devid}${this.state.api4}${this.props.authkey}${this.props.timestamp}`)

        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api4}json/${this.props.devid}/${signature4}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}`, config)
                .then(res => {
                    this.setState({
                        matchHistory: res.data.filter((id) => {
                            return id.Match_Queue_Id === 423 ||
                                id.Match_Queue_Id === 426 ||
                                id.Match_Queue_Id === 430 ||
                                id.Match_Queue_Id === 433 ||
                                id.Match_Queue_Id === 435 ||
                                id.Match_Queue_Id === 440 ||
                                id.Match_Queue_Id === 445 ||
                                id.Match_Queue_Id === 448 ||
                                id.Match_Queue_Id === 451 ||
                                id.Match_Queue_Id === 452 ||
                                id.Match_Queue_Id === 459 ||
                                id.Match_Queue_Id === 466 ||
                                id.Match_Queue_Id === 450 ||
                                id.Match_Queue_Id === 502 ||
                                id.Match_Queue_Id === 503 ||
                                id.Match_Queue_Id === 504
                        })
                    })
                })
                .then(res => {
                    this.setState({
                        match_id: this.state.matchHistory.map((item) => {
                            return item.Match
                        })
                    })
                    const signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
                    Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.state.match_id[0]},${this.state.match_id[1]},${this.state.match_id[2]},${this.state.match_id[3]},${this.state.match_id[4]}`, config)
                        .then((res) => {
                            console.log(res)
                            this.setState({
                                match1: res.data.filter((id) => {
                                    return id.Match == this.state.match_id[0]
                                }),
                                match2: res.data.filter((id) => {
                                    return id.Match == this.state.match_id[1]
                                }),
                                match3: res.data.filter((id) => {
                                    return id.Match == this.state.match_id[2]
                                }),
                                match4: res.data.filter((id) => {
                                    return id.Match == this.state.match_id[3]
                                }),
                                match5: res.data.filter((id) => {
                                    return id.Match == this.state.match_id[4]
                                })
                            })
                            this.setState({
                                match1Player: this.state.match1.filter((id) => {
                                    return id.playerId == this.props.player_id
                                }),
                                match2Player: this.state.match2.filter((id) => {
                                    return id.playerId == this.props.player_id
                                }),
                                match3Player: this.state.match3.filter((id) => {
                                    return id.playerId == this.props.player_id
                                }),
                                match4Player: this.state.match4.filter((id) => {
                                    return id.playerId == this.props.player_id
                                }),
                                match5Player: this.state.match5.filter((id) => {
                                    return id.playerId == this.props.player_id
                                }),
                                loaded: true
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        )


    }

    setPlayer(event) {
        this.setState({ player_id: event.target.id })
        this.props.change(event.target.id)
    }

    checkItem(item) {
        if (item !== "") {
            return <img src={`https://web2.hirez.com/smite/item-icons/${item.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite items" />
        } else {
            return <img src={require('../img/icon/item.png')} alt="smite blank item" />
        }
    }


    numOfPlayers(match) {
        if (match.length === 2) {
            return 'duel-container'
        } else if (match.length === 6) {
            return 'joust-container'
        } else if (match.length === 8) {
            return 'siege-container'
        } else if (match.length === 10) {
            return 'conquest-container'
        }
    }


    //fills the page with background
    isLoaded() {
        return ((this.state.loaded === false) ? 'player-background' : 'player-background-loaded')
    }

    render() {
        return (
            <div className={this.isLoaded()}>
                <Header />
                <LoadingIndicator />
                {this.state && this.state.matchHistory && this.state.match1 && this.state.match2 && this.state.match3 && this.state.match4 && this.state.match5 && this.state.match1Player && this.state.match2Player && this.state.match3Player && this.state.match4Player && this.state.match5Player &&
                    <div className="recent_history">
                        <div className="title">
                            <Link to={{
                                pathname: "/player"
                            }} >
                                <FontAwesomeIcon icon={faChevronLeft} size='2x' /></Link>
                            <h1>Recent Match History</h1>
                        </div>
                        <div className="match">

                            <div className="ownPlayer">
                                <h2>{this.state.match1Player[0].name} - {this.state.match1Player[0].Win_Status}</h2>
                                <img src={`https://web2.hirez.com/smite/god-icons/${this.state.match1Player[0].Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite god" />
                                <p>{this.state.match1Player[0].Reference_Name}</p>
                                <p>{this.state.match1Player[0].playerName}</p>
                                <p><b>KDA:</b> {this.state.match1Player[0].Kills_Player}/{this.state.match1Player[0].Deaths}/{this.state.match1Player[0].Assists}</p>
                                <p><b>Damage:</b> {this.state.match1Player[0].Damage_Player}</p>
                                <p><b>Damage Mitigated:</b> {this.state.match1Player[0].Damage_Mitigated}</p>
                                <p><b>Damage Taken:</b> {this.state.match1Player[0].Damage_Taken}</p>
                                <p><b>GPM:</b> {this.state.match1Player[0].Gold_Per_Minute}</p>
                                <div className="items">
                                    {this.checkItem(this.state.match1Player[0].Item_Purch_1)}
                                    {this.checkItem(this.state.match1Player[0].Item_Purch_2)}
                                    {this.checkItem(this.state.match1Player[0].Item_Purch_3)}
                                    {this.checkItem(this.state.match1Player[0].Item_Purch_4)}
                                    {this.checkItem(this.state.match1Player[0].Item_Purch_5)}
                                    {this.checkItem(this.state.match1Player[0].Item_Purch_6)}
                                    <div className="relics">
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match1Player[0].Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match1Player[0].Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relic" />
                                    </div>
                                </div>
                            </div>
                            <div className={this.numOfPlayers(this.state.match1)}>
                                {this.state.match1.map((match) =>

                                    <div className="players" id={match.Win_Status} >
                                        <div className="players-img">
                                            <img src={`https://web2.hirez.com/smite/god-icons/${match.Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite gods" />
                                            <div>
                                                <Link to={{
                                                    pathname: "/player"
                                                }} >
                                                    <p id={match.playerId} onClick={this.setPlayer}>{((match.playerName === "") ? match.hz_gamer_tag : match.playerName)}</p>
                                                </Link>
                                                <p>{match.Kills_Player}/{match.Deaths}/{match.Assists}</p>
                                            </div>
                                        </div>

                                        <div className="player-items">
                                            {this.checkItem(match.Item_Purch_1)}
                                            {this.checkItem(match.Item_Purch_2)}
                                            {this.checkItem(match.Item_Purch_3)}
                                            {this.checkItem(match.Item_Purch_4)}
                                            {this.checkItem(match.Item_Purch_5)}
                                            {this.checkItem(match.Item_Purch_6)}

                                            <div className="relics">
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                            </div>
                                        </div>
                                    </div>

                                )

                                }
                            </div>
                        </div>
                        {/*match 2*/}
                        <div className="match">
                            <div className="ownPlayer">
                                <h2>{this.state.match2Player[0].name} - {this.state.match2Player[0].Win_Status}</h2>
                                <img src={`https://web2.hirez.com/smite/god-icons/${this.state.match2Player[0].Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite gods" />
                                <p>{this.state.match2Player[0].Reference_Name}</p>
                                <p>{this.state.match2Player[0].playerName}</p>
                                <p><b>KDA:</b> {this.state.match2Player[0].Kills_Player}/{this.state.match2Player[0].Deaths}/{this.state.match2Player[0].Assists}</p>
                                <p><b>Damage:</b> {this.state.match2Player[0].Damage_Player}</p>
                                <p><b>Damage Mitigated:</b> {this.state.match2Player[0].Damage_Mitigated}</p>
                                <p><b>Damage Taken:</b> {this.state.match2Player[0].Damage_Taken}</p>
                                <p><b>GPM:</b> {this.state.match2Player[0].Gold_Per_Minute}</p>
                                <div className="items">
                                    {this.checkItem(this.state.match2Player[0].Item_Purch_1)}
                                    {this.checkItem(this.state.match2Player[0].Item_Purch_2)}
                                    {this.checkItem(this.state.match2Player[0].Item_Purch_3)}
                                    {this.checkItem(this.state.match2Player[0].Item_Purch_4)}
                                    {this.checkItem(this.state.match2Player[0].Item_Purch_5)}
                                    {this.checkItem(this.state.match2Player[0].Item_Purch_6)}
                                    <div className="relics">
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match2Player[0].Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match2Player[0].Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                    </div>
                                </div>
                            </div>
                            <div className={this.numOfPlayers(this.state.match2)}>
                                {this.state.match2.map((match) =>

                                    <div className="players" id={match.Win_Status} >
                                        <div className="players-img">
                                            <img src={`https://web2.hirez.com/smite/god-icons/${match.Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite god" />
                                            <div>
                                                <Link to={{
                                                    pathname: "/player"
                                                }} >
                                                    <p id={match.playerId} onClick={this.setPlayer}>{((match.playerName === "") ? match.hz_gamer_tag : match.playerName)}</p>
                                                </Link>
                                                <p>{match.Kills_Player}/{match.Deaths}/{match.Assists}</p>
                                            </div>
                                        </div>

                                        <div className="player-items">
                                            {this.checkItem(match.Item_Purch_1)}
                                            {this.checkItem(match.Item_Purch_2)}
                                            {this.checkItem(match.Item_Purch_3)}
                                            {this.checkItem(match.Item_Purch_4)}
                                            {this.checkItem(match.Item_Purch_5)}
                                            {this.checkItem(match.Item_Purch_6)}
                                            <div className="relics">
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                            </div>
                                        </div>
                                    </div>

                                )

                                }
                            </div>
                        </div>
                        {/*match 3*/}
                        <div className="match">
                            <div className="ownPlayer">
                                <h2>{this.state.match3Player[0].name} - {this.state.match3Player[0].Win_Status}</h2>
                                <img src={`https://web2.hirez.com/smite/god-icons/${this.state.match3Player[0].Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite gods" />
                                <p>{this.state.match3Player[0].Reference_Name}</p>
                                <p>{this.state.match3Player[0].playerName}</p>
                                <p><b>KDA:</b> {this.state.match3Player[0].Kills_Player}/{this.state.match3Player[0].Deaths}/{this.state.match3Player[0].Assists}</p>
                                <p><b>Damage:</b> {this.state.match3Player[0].Damage_Player}</p>
                                <p><b>Damage Mitigated:</b> {this.state.match3Player[0].Damage_Mitigated}</p>
                                <p><b>Damage Taken:</b> {this.state.match3Player[0].Damage_Taken}</p>
                                <p><b>GPM:</b> {this.state.match3Player[0].Gold_Per_Minute}</p>
                                <div className="items">
                                    {this.checkItem(this.state.match3Player[0].Item_Purch_1)}
                                    {this.checkItem(this.state.match3Player[0].Item_Purch_2)}
                                    {this.checkItem(this.state.match3Player[0].Item_Purch_3)}
                                    {this.checkItem(this.state.match3Player[0].Item_Purch_4)}
                                    {this.checkItem(this.state.match3Player[0].Item_Purch_5)}
                                    {this.checkItem(this.state.match3Player[0].Item_Purch_6)}
                                    <div className="relics">
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match3Player[0].Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite items" />
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match3Player[0].Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite items" />
                                    </div>
                                </div>
                            </div>
                            <div className={this.numOfPlayers(this.state.match3)}>
                                {this.state.match3.map((match) =>

                                    <div className="players" id={match.Win_Status} >
                                        <div className="players-img">
                                            <img src={`https://web2.hirez.com/smite/god-icons/${match.Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite gods" />
                                            <div>
                                                <Link to={{
                                                    pathname: "/player"
                                                }} >
                                                    <p id={match.playerId} onClick={this.setPlayer}>{((match.playerName === "") ? match.hz_gamer_tag : match.playerName)}</p>
                                                </Link>
                                                <p>{match.Kills_Player}/{match.Deaths}/{match.Assists}</p>
                                            </div>
                                        </div>

                                        <div className="player-items">
                                            {this.checkItem(match.Item_Purch_1)}
                                            {this.checkItem(match.Item_Purch_2)}
                                            {this.checkItem(match.Item_Purch_3)}
                                            {this.checkItem(match.Item_Purch_4)}
                                            {this.checkItem(match.Item_Purch_5)}
                                            {this.checkItem(match.Item_Purch_6)}
                                            <div className="relics">
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite items" />
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite items" />
                                            </div>
                                        </div>
                                    </div>

                                )

                                }
                            </div>
                        </div>
                        {/*match 4*/}
                        <div className="match">
                            <div className="ownPlayer">
                                <h2>{this.state.match4Player[0].name} - {this.state.match4Player[0].Win_Status}</h2>
                                <img src={`https://web2.hirez.com/smite/god-icons/${this.state.match4Player[0].Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite gods" />
                                <p>{this.state.match4Player[0].Reference_Name}</p>
                                <p>{this.state.match4Player[0].playerName}</p>
                                <p><b>KDA:</b> {this.state.match4Player[0].Kills_Player}/{this.state.match4Player[0].Deaths}/{this.state.match4Player[0].Assists}</p>
                                <p><b>Damage:</b> {this.state.match4Player[0].Damage_Player}</p>
                                <p><b>Damage Mitigated:</b> {this.state.match4Player[0].Damage_Mitigated}</p>
                                <p><b>Damage Taken:</b> {this.state.match4Player[0].Damage_Taken}</p>
                                <p><b>GPM:</b> {this.state.match4Player[0].Gold_Per_Minute}</p>
                                <div className="items">
                                    {this.checkItem(this.state.match4Player[0].Item_Purch_1)}
                                    {this.checkItem(this.state.match4Player[0].Item_Purch_2)}
                                    {this.checkItem(this.state.match4Player[0].Item_Purch_3)}
                                    {this.checkItem(this.state.match4Player[0].Item_Purch_4)}
                                    {this.checkItem(this.state.match4Player[0].Item_Purch_5)}
                                    {this.checkItem(this.state.match4Player[0].Item_Purch_6)}
                                    <div className="relics">
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match4Player[0].Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match4Player[0].Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                    </div>
                                </div>
                            </div>
                            <div className={this.numOfPlayers(this.state.match4)}>
                                {this.state.match4.map((match) =>

                                    <div className="players" id={match.Win_Status} >
                                        <div className="players-img">
                                            <img src={`https://web2.hirez.com/smite/god-icons/${match.Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite gods" />
                                            <div>
                                                <Link to={{
                                                    pathname: "/player"
                                                }} >
                                                    <p id={match.playerId} onClick={this.setPlayer}>{((match.playerName === "") ? match.hz_gamer_tag : match.playerName)}</p>
                                                </Link>
                                                <p>{match.Kills_Player}/{match.Deaths}/{match.Assists}</p>
                                            </div>
                                        </div>

                                        <div className="player-items">
                                            {this.checkItem(match.Item_Purch_1)}
                                            {this.checkItem(match.Item_Purch_2)}
                                            {this.checkItem(match.Item_Purch_3)}
                                            {this.checkItem(match.Item_Purch_4)}
                                            {this.checkItem(match.Item_Purch_5)}
                                            {this.checkItem(match.Item_Purch_6)}
                                            <div className="relics">
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                            </div>
                                        </div>
                                    </div>

                                )

                                }
                            </div>
                        </div>
                        {/*match 5*/}
                        <div className="match">
                            <div className="ownPlayer">
                                <h2>{this.state.match5Player[0].name} - {this.state.match5Player[0].Win_Status}</h2>
                                <img src={`https://web2.hirez.com/smite/god-icons/${this.state.match5Player[0].Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite gods" />
                                <p>{this.state.match5Player[0].Reference_Name}</p>
                                <p>{this.state.match5Player[0].playerName}</p>
                                <p><b>KDA:</b> {this.state.match5Player[0].Kills_Player}/{this.state.match5Player[0].Deaths}/{this.state.match5Player[0].Assists}</p>
                                <p><b>Damage:</b> {this.state.match5Player[0].Damage_Player}</p>
                                <p><b>Damage Mitigated:</b> {this.state.match5Player[0].Damage_Mitigated}</p>
                                <p><b>Damage Taken:</b> {this.state.match5Player[0].Damage_Taken}</p>
                                <p><b>GPM:</b> {this.state.match5Player[0].Gold_Per_Minute}</p>
                                <div className="items">
                                    {this.checkItem(this.state.match5Player[0].Item_Purch_1)}
                                    {this.checkItem(this.state.match5Player[0].Item_Purch_2)}
                                    {this.checkItem(this.state.match5Player[0].Item_Purch_3)}
                                    {this.checkItem(this.state.match5Player[0].Item_Purch_4)}
                                    {this.checkItem(this.state.match5Player[0].Item_Purch_5)}
                                    {this.checkItem(this.state.match5Player[0].Item_Purch_6)}
                                    <div className="relics">
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match5Player[0].Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                        <img src={`https://web2.hirez.com/smite/item-icons/${this.state.match5Player[0].Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite items" />
                                    </div>
                                </div>
                            </div>
                            <div className={this.numOfPlayers(this.state.match5)}>
                                {this.state.match5.map((match) =>

                                    <div className="players" id={match.Win_Status} >
                                        <div className="players-img">
                                            <img src={`https://web2.hirez.com/smite/god-icons/${match.Reference_Name.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} className="history-god-img" alt="smite gods" />
                                            <div>
                                                <Link to={{
                                                    pathname: "/player"
                                                }} >
                                                    <p id={match.playerId} onClick={this.setPlayer}>{((match.playerName === "") ? match.hz_gamer_tag : match.playerName)}</p>
                                                </Link>
                                                <p>{match.Kills_Player}/{match.Deaths}/{match.Assists}</p>
                                            </div>
                                        </div>

                                        <div className="player-items">
                                            {this.checkItem(match.Item_Purch_1)}
                                            {this.checkItem(match.Item_Purch_2)}
                                            {this.checkItem(match.Item_Purch_3)}
                                            {this.checkItem(match.Item_Purch_4)}
                                            {this.checkItem(match.Item_Purch_5)}
                                            {this.checkItem(match.Item_Purch_6)}
                                            <div className="relics">
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_1.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                                <img src={`https://web2.hirez.com/smite/item-icons/${match.Item_Active_2.toLowerCase().replace(/'/g, "").replace(/ /g, "-")}.jpg`} alt="smite relics" />
                                            </div>
                                        </div>
                                    </div>

                                )

                                }
                            </div>
                        </div>
                    </div>
                }
                <Footer />
            </div>
        )
    }
}
