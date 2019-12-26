import React, { Component } from 'react'
import Axios from 'axios';
import md5 from 'md5';
import uuid from 'uuid'
import { Link } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import PieChart from 'react-minimal-pie-chart';
import Header from './layout/Header'
import Footer from './layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

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

//gets the ranked name for the img
function CheckRankTier(tier) {
    switch (tier) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return 'Bronze'
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            return 'Silver';
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            return 'Gold';
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
            return 'Platinum';
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
            return 'Diamond';
        case 26:
            return 'Master'
        case 27:
            return 'GrandMaster'

    }
}

//get exact name
function GetRankTier(tier) {
    switch (tier) {
        case 1:
            return 'Bronze V'
        case 2:
            return 'Bronze IV'
        case 3:
            return 'Bronze III'
        case 4:
            return 'Bronze II'
        case 5:
            return 'Bronze I'
        case 6:
            return 'Silver V';
        case 7:
            return 'Silver IV';
        case 8:
            return 'Silver III';
        case 9:
            return 'Silver II';
        case 10:
            return 'Silver I';
        case 11:
            return 'Gold V';
        case 12:
            return 'Gold IV';
        case 13:
            return 'Gold III';
        case 14:
            return 'Gold II';
        case 15:
            return 'Gold I';
        case 16:
            return 'Platinum V';
        case 17:
            return 'Platinum IV';
        case 18:
            return 'Platinum III';
        case 19:
            return 'Platinum II';
        case 20:
            return 'Platinum I';
        case 21:
            return 'Diamond V';
        case 22:
            return 'Diamond IV';
        case 23:
            return 'Diamond III';
        case 24:
            return 'Diamond II';
        case 25:
            return 'Diamond I';
        case 26:
            return 'Master'
        case 27:
            return 'GrandMaster'

    }
}

function GetGodKills(kills) {
    if (kills <= 99) {
        return <img src={require('../img/achievements/GodKills_0.png')} alt='' />
    } else if (kills <= 499) {
        return <img src={require('../img/achievements/GodKills_Bronze.png')} alt='' />
    } else if (kills <= 999) {
        return <img src={require('../img/achievements/GodKills_Silver.png')} alt='' />
    } else if (kills <= 4999) {
        return <img src={require('../img/achievements/GodKills_Gold.png')} alt='' />
    } else if (kills <= 9999) {
        return <img src={require('../img/achievements/GodKills_Platinum.png')} alt='' />
    } else if (kills >= 10000) {
        return <img src={require('../img/achievements/GodKills_Diamond.png')} alt='' />
    }
}

function GetTripleKills(kills) {
    if (kills <= 4) {
        return <img src={require('../img/achievements/TripleKills_0.png')} alt='' />
    } else if (kills <= 9) {
        return <img src={require('../img/achievements/TripleKills_Bronze.png')} alt='' />
    } else if (kills <= 19) {
        return <img src={require('../img/achievements/TripleKills_Silver.png')} alt='' />
    } else if (kills <= 29) {
        return <img src={require('../img/achievements/TripleKills_Gold.png')} alt='' />
    } else if (kills <= 39) {
        return <img src={require('../img/achievements/TripleKills_Platinum.png')} alt='' />
    } else if (kills >= 40) {
        return <img src={require('../img/achievements/TripleKills_Diamond.png')} alt='' />
    }
}

//check quada kills to return right image
function GetQuadaKills(kills) {
    if (kills === 0) {
        return <img src={require('../img/achievements/QuadraKills_0.png')} alt='' />
    } else if (kills <= 4) {
        return <img src={require('../img/achievements/QuadraKills_Bronze.png')} alt='' />
    } else if (kills <= 9) {
        return <img src={require('../img/achievements/QuadraKills_Silver.png')} alt='' />
    } else if (kills <= 14) {
        return <img src={require('../img/achievements/QuadraKills_Gold.png')} alt='' />
    } else if (kills <= 19) {
        return <img src={require('../img/achievements/QuadraKills_Platinum.png')} alt='' />
    } else if (kills >= 20) {
        return <img src={require('../img/achievements/QuadraKills_Diamond.png')} alt='' />
    }

}

//check penta kills to return right image
function GetPentaKills(kills) {
    if (kills === 0) {
        return <img src={require('../img/achievements/PentaKills_0.png')} alt='' />
    } else if (kills === 1) {
        return <img src={require('../img/achievements/PentaKills_Bronze.png')} alt='' />
    } else if (kills === 2) {
        return <img src={require('../img/achievements/PentaKills_Silver.png')} alt='' />
    } else if (kills === 3) {
        return <img src={require('../img/achievements/PentaKills_Gold.png')} alt='' />
    } else if (kills === 4) {
        return <img src={require('../img/achievements/PentaKills_Platinum.png')} alt='' />
    } else if (kills >= 5) {
        return <img src={require('../img/achievements/PentaKills_Diamond.png')} alt='' />
    }

}

//check god like kills spree to return right image
function CheckGodLike(godlike) {
    if (godlike === 0) {
        return <img src={require('../img/achievements/Godlike_0.png')} alt='' />
    } else {
        return <img src={require('../img/achievements/Godlike.png')} alt='' />
    }
}



export default class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            api: 'getplayer', api2: 'getgodranks', api3: 'getplayerachievements', api4: 'getmatchhistory', api5: 'getqueuestats', loaded: false
        }
        this.CheckRankConquest = this.CheckRankConquest.bind(this);
        this.CheckRankJoust = this.CheckRankJoust.bind(this);
        this.CheckRankDuel = this.CheckRankDuel.bind(this);
        this.CheckAvatar = this.CheckAvatar.bind(this);
        this.CheckName = this.CheckName.bind(this);
        this.AddMatchs = this.AddMatchs.bind(this);
    }


    componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }

        const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`)

        if (this.props.player_id == this.props.playerInfo.Id) {
            this.setState({
                res: this.props.playerInfo
            })
        } else (
            trackPromise(
                Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}`, config)
                    .then(res => {
                        this.setState({
                            res: res.data[0]
                        })
                        this.props.playerInfo(this.state.res)
                        //Rank Conquest History
                        var signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
                        if (this.state.res.RankedConquestController.Season === 6) {

                            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/504
        `, config)
                                .then(res => {
                                    this.setState({
                                        RankedConquestHistory: res.data
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        } else (

                            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/451
        `, config)
                                .then(res => {
                                    this.setState({
                                        RankedConquestHistory: res.data
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        )
                        //Rank Joust History
                        var signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
                        if (this.state.res.RankedJoustController.Season === 6) {
                            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/503
        `, config)
                                .then(res => {
                                    this.setState({
                                        RankedJoustHistory: res.data
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        } else (
                            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/450
        `, config)
                                .then(res => {
                                    this.setState({
                                        RankedJoustHistory: res.data
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        )
                        //Rank Duel History
                        var signature5 = md5(`${this.props.devid}${this.state.api5}${this.props.authkey}${this.props.timestamp}`)
                        if (this.state.res.RankedDuelController.Season === 6) {
                            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/502
        `, config)
                                .then(res => {
                                    this.setState({
                                        RankedDuelHistory: res.data
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        } else (
                            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api5}json/${this.props.devid}/${signature5}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}/440
        `, config)
                                .then(res => {
                                    this.setState({
                                        RankedDuelHistory: res.data
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        )

                    })

                    .catch(err => {
                        alert('404 Please try again')
                        console.log(err)
                    })
            )

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
                    console.log(err)
                })
        )
        const signature3 = md5(`${this.props.devid}${this.state.api3}${this.props.authkey}${this.props.timestamp}`)
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api3}json/${this.props.devid}/${signature3}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}`, config)
                .then(res => {
                    this.setState({
                        achievements: res.data, loaded: true
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        )
        const signature4 = md5(`${this.props.devid}${this.state.api4}${this.props.authkey}${this.props.timestamp}`)
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api4}json/${this.props.devid}/${signature4}/${this.props.session}/${this.props.timestamp}/${this.props.player_id}`, config)
                .then(res => {
                    this.setState({
                        matchHistory: res.data
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

    CheckAvatar() {
        if (this.state.res.Avatar_URL === "") {
            return (
                <img src={require('../img/default.png')} alt='' />
            )
        } else {
            return (
                <img src={this.state.res.Avatar_URL} alt='' />
            )
        }
    }

    CheckName() {
        if (this.state.res.hz_gamer_tag === null) {
            return <h2>{this.state.res.hz_player_name}</h2>
        } else {
            return <h2>{this.state.res.hz_gamer_tag}</h2>
        }
    }

    //check to see if player plays on console or computer and returns the right one
    CheckRankConquest() {
        if (this.state.res.RankedConquestController.Season === 6) {
            var rank = CheckRankTier(this.state.res.RankedConquestController.Tier)
            var rankName = GetRankTier(this.state.res.RankedConquestController.Tier)
            return (
                <div className='conquest'>
                    <h3>Conquest</h3>
                    <img src={require(`../img/rank/conquest/Conquest_${rank}.png`)} alt='' />
                    <h3>{rankName}</h3>
                    <p>TP: {this.state.res.RankedConquestController.Points}/100</p>
                    <p>MMR: {Math.trunc(this.state.res.RankedConquestController.Rank_Stat)}</p>
                    <p>Wins: {this.state.res.RankedConquestController.Wins}</p>
                    <p>Losses: {this.state.res.RankedConquestController.Losses}</p>
                </div>
            )
        } else if (this.state.res.RankedConquest.Season === 6) {
            rank = CheckRankTier(this.state.res.RankedConquest.Tier)
            rankName = GetRankTier(this.state.res.RankedConquest.Tier)
            return (
                <div className='conquest'>
                    <h3>Conquest</h3>
                    <img src={require(`../img/rank/conquest/Conquest_${rank}.png`)} alt='' />
                    <h3>{rankName}</h3>
                    <p>TP: {this.state.res.RankedConquest.Points}/100</p>
                    <p>MMR: {Math.trunc(this.state.res.RankedConquest.Rank_Stat)}</p>
                    <p>Wins: {this.state.res.RankedConquest.Wins}</p>
                    <p>Losses: {this.state.res.RankedConquest.Losses}</p>
                </div>
            )
        } else {
            return (
                <div className='conquest'>
                    <h3>Conquest</h3>
                    <img src={require('../img/rank/conquest/Conquest_Unranked.png')} alt='' />
                    <h3>Unranked</h3>
                    <p>TP: 0/100</p>
                    <p>MMR: -</p>
                    <p>Wins: -</p>
                    <p>Losses: -</p>
                </div>
            )
        }
    }

    //check to see if player plays on console or computer and returns the right one
    CheckRankJoust() {
        if (this.state.res.RankedJoustController.Season === 6) {
            var rank = CheckRankTier(this.state.res.RankedJoustController.Tier)
            var rankName = GetRankTier(this.state.res.RankedJoustController.Tier)
            return (
                <div className='Joust'>
                    <h3>Joust</h3>
                    <img src={require(`../img/rank/joust/Joust_${rank}.png`)} alt='' />
                    <h3>{rankName}</h3>
                    <p>TP: {this.state.res.RankedJoustController.Points}/100</p>
                    <p>MMR: {Math.trunc(this.state.res.RankedJoustController.Rank_Stat)}</p>
                    <p>Wins: {this.state.res.RankedJoustController.Wins}</p>
                    <p>Losses: {this.state.res.RankedJoustController.Losses}</p>
                </div>
            )
        } else if (this.state.res.RankedJoust.Season === 6) {
            rank = CheckRankTier(this.state.res.RankedJoust.Tier)
            rankName = GetRankTier(this.state.res.RankedJoust.Tier)
            return (
                <div className='Joust'>
                    <h3>Joust</h3>
                    <img src={require(`../img/rank/joust/Joust_${rank}.png`)} alt='' />
                    <h3>{rankName}</h3>
                    <p>TP: {this.state.res.RankedJoust.Points}/100</p>
                    <p>MMR: {Math.trunc(this.state.res.RankedJoust.Rank_Stat)}</p>
                    <p>Wins: {this.state.res.RankedJoust.Wins}</p>
                    <p>Losses: {this.state.res.RankedJoust.Losses}</p>
                </div>
            )
        } else {
            return (
                <div className='Joust'>
                    <h3>Joust</h3>
                    <img src={require('../img/rank/joust/Joust_Unranked.png')} alt='' />
                    <h3>Unranked</h3>
                    <p>TP: 0/100</p>
                    <p>MMR: -</p>
                    <p>Wins: -</p>
                    <p>Losses: -</p>
                </div>
            )
        }
    }

    //check to see if player plays on console or computer and returns the right one
    CheckRankDuel() {
        if (this.state.res.RankedDuelController.Season === 6) {
            var rank = CheckRankTier(this.state.res.RankedDuelController.Tier)
            var rankName = GetRankTier(this.state.res.RankedDuelController.Tier)
            return (
                <div className='Duel'>
                    <h3>Duel</h3>
                    <img src={require(`../img/rank/duel/Duel_${rank}.png`)} alt='' />
                    <h3>{rankName}</h3>
                    <p>TP: {this.state.res.RankedDuelController.Points}/100</p>
                    <p>MMR: {Math.trunc(this.state.res.RankedDuelController.Rank_Stat)}</p>
                    <p>Wins: {this.state.res.RankedDuelController.Wins}</p>
                    <p>Losses: {this.state.res.RankedDuelController.Losses}</p>
                </div>
            )
        } else if (this.state.res.RankedDuel.Season === 6) {
            rank = CheckRankTier(this.state.res.RankedDuel.Tier)
            rankName = GetRankTier(this.state.res.RankedDuel.Tier)
            return (
                <div className='Duel'>
                    <h3>Duel</h3>
                    <img src={require(`../img/rank/duel/Duel_${rank}.png`)} alt='' />
                    <h3>{rankName}</h3>
                    <p>TP: {this.state.res.RankedDuel.Points}/100</p>
                    <p>MMR: {Math.trunc(this.state.res.RankedDuel.Rank_Stat)}</p>
                    <p>Wins: {this.state.res.RankedDuel.Wins}</p>
                    <p>Losses: {this.state.res.RankedDuel.Losses}</p>
                </div>
            )
        } else {
            return (
                <div className='Duel'>
                    <h3>Duel</h3>
                    <img src={require('../img/rank/duel/Duel_Unranked.png')} alt='' />
                    <h3>Unranked</h3>
                    <p>TP: 0/100</p>
                    <p>MMR: -</p>
                    <p>Wins: -</p>
                    <p>Losses: -</p>
                </div>
            )
        }
    }

    //fills the page with background
    isLoaded() {
        return ((this.state.loaded === false) ? 'player-background' : 'player-background-loaded')
    }


    //adds the matches together and makes pie chart
    AddMatchs() {
        const Conquest = Object.values(this.state.ConquestHistory).reduce((t, { Matches }) => t + Matches, 0);
        const Joust = Object.values(this.state.JoustHistory).reduce((t, { Matches }) => t + Matches, 0);
        const Arena = Object.values(this.state.ArenaHistory).reduce((t, { Matches }) => t + Matches, 0);
        const Assault = Object.values(this.state.AssaltHistory).reduce((t, { Matches }) => t + Matches, 0);
        const Clash = Object.values(this.state.ClashHistory).reduce((t, { Matches }) => t + Matches, 0);
        const Siege = Object.values(this.state.SiegeHistory).reduce((t, { Matches }) => t + Matches, 0);
        const RankConquest = Object.values(this.state.RankedConquestHistory).reduce((t, { Matches }) => t + Matches, 0);
        const RankJoust = Object.values(this.state.RankedJoustHistory).reduce((t, { Matches }) => t + Matches, 0);
        const RankDuel = Object.values(this.state.RankedDuelHistory).reduce((t, { Matches }) => t + Matches, 0);
        return (
            <div className="match-history">
                <h1>Match History</h1>
                <PieChart
                    animate={false}
                    animationDuration={500}
                    animationEasing="ease-out"
                    cx={50}
                    cy={50}
                    data={[

                        {
                            color: '#2a374a',
                            title: 'Conquest',
                            value: Conquest
                        },
                        {
                            color: '#ba8c59',
                            title: 'Joust',
                            value: Joust
                        },
                        {
                            color: '#60b0eb',
                            title: 'Arena',
                            value: Arena
                        },
                        {
                            color: '#a4d260',
                            title: 'Ranked Conquest',
                            value: RankConquest
                        },
                        {
                            color: '#6a77a4',
                            title: 'Ranked Joust',
                            value: RankJoust
                        },
                        {
                            color: '#6fb1a3',
                            title: 'Duel',
                            value: RankDuel
                        },
                        {
                            color: '#e3aa25',
                            title: 'Assault',
                            value: Assault
                        },
                        {
                            color: '#fe8efe',
                            title: 'Clash',
                            value: Clash
                        },
                        {
                            color: '#564162',
                            title: 'Siege',
                            value: Siege
                        }

                    ]}
                    label={props => {
                        return `${props.data[props.dataIndex].title}-${props.data[props.dataIndex].value}`;
                    }}
                    labelPosition={112}
                    labelStyle={{
                        fontFamily: 'sans-serif',
                        fontSize: '3px',
                        color: 'black',
                        fontWeight: '500'
                    }}
                    lineWidth={50}
                    onClick={undefined}
                    onMouseOut={undefined}
                    onMouseOver={undefined}
                    paddingAngle={5}
                    radius={30}
                    ratio={1}
                    rounded={false}
                    startAngle={0}
                />
            </div>
        )
    }


    render() {

        return (

            <div className={this.isLoaded()}>
                <Header />
                <div className="player-container">
                    <LoadingIndicator />
                    {this.state && this.state.res && this.state.godranks && this.state.achievements &&
                        < div >
                            <div className="player">
                                <div className="player_info_container">
                                    <h1>Stats</h1>
                                    <div className="player_info">
                                        {this.CheckAvatar()}
                                        {this.CheckName()}
                                        <h5>{this.state.res.Team_Name}</h5>
                                        <p>Level: {this.state.res.Level}</p>
                                        <p>Hours: {this.state.res.HoursPlayed}</p>
                                        <p>Masterys: {this.state.res.MasteryLevel}</p>
                                        <p>Wins: {this.state.res.Wins}</p>
                                        <p>Loses: {this.state.res.Losses}</p>
                                        <p>Winrate: {((this.state.res.Wins / (this.state.res.Wins + this.state.res.Losses)) * 100).toFixed(2)}%</p>
                                    </div>
                                </div>
                                {this.state && this.state.ConquestHistory && this.state.ArenaHistory && this.state.JoustHistory && this.state.AssaltHistory && this.state.ClashHistory && this.state.SiegeHistory && this.state.RankedConquestHistory && this.state.RankedDuelHistory && this.state.RankedJoustHistory &&
                                    <div className='match-history-container'>
                                        {this.AddMatchs()}
                                        <div className="match-history-link">
                                            <Link to='/player_history'>Match History <FontAwesomeIcon icon={faChevronRight} /></Link>
                                        </div>
                                    </div>}
                                <div className="rank-container">
                                    <h1>Rank</h1>
                                    <div className="ranked">
                                        {this.CheckRankConquest()}
                                        {this.CheckRankJoust()}
                                        {this.CheckRankDuel()}
                                    </div>
                                    <div className="rank-history-link">
                                        <Link to='/player_rank_history'>Rank Match History <FontAwesomeIcon icon={faChevronRight} /></Link>
                                    </div>
                                </div>
                            </div>
                            <h1 className="top-gods-title">Top Gods</h1>
                            <div className="top-god-container">
                                {this.state.godranks.slice(0, 5).map((god) =>
                                    <div key={uuid.v4()} className="top-god">
                                        <img key={uuid.v4()} src={`https://web2.hirez.com/smite/god-icons/${god.god.toString().toLowerCase().replace(/'/g, '').replace(/\s/g, '-')}.jpg`} alt='' />
                                        <h4 key={uuid.v4()}>{god.god}</h4>
                                        <p key={uuid.v4()}>Kills: {god.Kills}</p>
                                        <p key={uuid.v4()}>Deaths: {god.Deaths}</p>
                                        <p key={uuid.v4()}>Assists: {god.Assists}</p>
                                        <p key={uuid.v4()}>KDA: {((god.Kills + god.Assists) / god.Deaths).toFixed(2)}</p>
                                        <p key={uuid.v4()}>Wins: {god.Wins}</p>
                                        <p key={uuid.v4()}>Losses: {god.Losses}</p>
                                        <p key={uuid.v4()}>Winrate: {((god.Wins / (god.Wins + god.Losses)) * 100).toFixed(2)}%</p>
                                    </div>
                                )}
                                <Link to='/player_gods'>See All</Link>
                            </div>
                            <h1 className="achievements-title">Achievements</h1>
                            <div className="achievements">
                                <div>
                                    {GetGodKills(this.state.achievements.PlayerKills)}
                                    <h4>Kills</h4>
                                    <p>{this.state.achievements.PlayerKills}</p>
                                </div>
                                <div>
                                    {CheckGodLike(this.state.achievements.GodLikeSpree)}
                                    <h4>Godlike</h4>
                                    <p>{this.state.achievements.GodLikeSpree}</p>
                                </div>
                                <div>
                                    {GetTripleKills(this.state.achievements.TripleKills)}
                                    <h4>Triple Kills</h4>
                                    <p>{this.state.achievements.TripleKills}</p>
                                </div>
                                <div>
                                    {GetQuadaKills(this.state.achievements.QuadraKills)}
                                    <h4>Quadra Kills</h4>
                                    <p>{this.state.achievements.QuadraKills}</p>
                                </div>
                                <div>
                                    {GetPentaKills(this.state.achievements.PentaKills)}
                                    <h4>Penta Kills</h4>
                                    <p>{this.state.achievements.PentaKills}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <Footer />
            </div >
        )
    }
}
