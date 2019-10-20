import React, { Component } from 'react';
import Axios from 'axios';
import md5 from 'md5';
import uuid from 'uuid';
import { Link } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <div className="loader">
            <Loader type="ThreeDots" color="#ba8c59" height="100" width="100" />
        </div>
    )
}

export default class GodId extends Component {
    constructor(props) {
        super(props);
        this.state = { api: 'getgods', api2: 'getgodrecommendeditems', api3: 'getitems', api4: 'getgodskins', lang: '1', active: 'true', build: 'true' }
        this.dropdown = this.dropdown.bind(this);
        this.BuildDropdown = this.BuildDropdown.bind(this);
        //this.isActive = this.isActive.bind(this)
    }

    componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        //get god info
        const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`);
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${this.state.lang}`, config)
                .then(res => {
                    this.setState({
                        data: res.data.filter((god) => {
                            return god.id == this.props.god_id
                        })
                    })
                })
                .catch(err => {
                    alert('404 Please try again')
                    console.log(err)
                }))
        //get rec items
        const signature2 = md5(`${this.props.devid}${this.state.api2}${this.props.authkey}${this.props.timestamp}`);
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api2}json/${this.props.devid}/${signature2}/${this.props.session}/${this.props.timestamp}/${this.props.god_id}/${this.state.lang}`)
            .then(res => {
                this.setState({
                    RecItems: res.data.filter((item) => {
                        return item.Role == "Standard"
                    })
                })
                this.setState({
                    StarterItems: this.state.RecItems.filter((item) => {
                        return item.Category === "Starter"
                    }),
                    CoreItems: this.state.RecItems.filter((item) => {
                        return item.Category === "Core"
                    }),
                    DamageItems: this.state.RecItems.filter((item) => {
                        return item.Category === "Damage"
                    }),
                    DefensiveItems: this.state.RecItems.filter((item) => {
                        return item.Category === "Defensive"
                    })
                })
            })
        //get all items
        const signature3 = md5(`${this.props.devid}${this.state.api3}${this.props.authkey}${this.props.timestamp}`);
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api3}json/${this.props.devid}/${signature3}/${this.props.session}/${this.props.timestamp}/${this.state.lang}`)
            .then(res => {
                this.setState({
                    items: res.data
                })
            })
        //get skins for god
        const signature4 = md5(`${this.props.devid}${this.state.api4}${this.props.authkey}${this.props.timestamp}`);
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api4}json/${this.props.devid}/${signature4}/${this.props.session}/${this.props.timestamp}/${this.props.god_id}/${this.state.lang}`)
            .then(res => {
                this.setState({
                    skins: res.data
                })
            })

    }


    //setting the state to then activate the dropdowns
    dropdown() {

        if (this.state.active === 'true') {
            this.setState({ active: 'false' })
        } else if (this.state.active === 'false') {
            this.setState({ active: 'true' })
        }

    }

    BuildDropdown() {

        if (this.state.build === 'true') {
            this.setState({ build: 'false' })
        } else if (this.state.build === 'false') {
            this.setState({ build: 'true' })
        }

    }


    isActive() {
        return ((this.state.active === 'true') ? 'abilitys hide' : 'abilitys show')
    }

    BuildisActive() {
        return ((this.state.build === 'true') ? 'build hide' : 'build show')
    }

    //changing the menu btns to a cross
    menu() {
        return ((this.state.active === 'true') ? 'menu-btn' : 'menu-btn close')
    }

    BuildMenu() {
        return ((this.state.build === 'true') ? 'menu-btn' : 'menu-btn close')
    }

    render() {

        return (

            <div className='godid-background' >
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
                <div >
                    <LoadingIndicator />
                    {this.state && this.state.data &&
                        <div className="godid">

                            <div className='god-lore'>
                                <div className='god-profile'>
                                    <img src={this.state.skins[0].godSkin_URL} alt="" className="god-profile-img" />

                                    <h5><i>{this.state.data[0].Title}</i></h5>
                                    <div className="class">
                                        <h6>{this.state.data[0].Roles}</h6>
                                        <img src={require(`../img/class/${this.state.data[0].Roles.replace(/\s/g, '')}.png`)} alt=""></img>
                                    </div>
                                    <div className="pantheon">
                                        <h6>{this.state.data[0].Pantheon}</h6>
                                        <img src={require(`../img/pantheon/${this.state.data[0].Pantheon}.png`)} alt=""></img>
                                    </div>
                                </div>
                                <div className="lore">
                                    <h1 >{this.state.data[0].Name}</h1>
                                    <p>{this.state.data[0].Lore}</p>
                                </div>
                            </div>

                            <div className="abilitys-menu" onClick={this.dropdown}>
                                <h3 >Abilitys</h3>
                                <div className={this.menu()}>
                                    <div className="btn-line"></div>
                                    <div className="btn-line"></div>
                                    <div className="btn-line"></div>
                                </div>
                            </div>

                            <div className={this.isActive()}>
                                <div>
                                    <p><b>{this.state.data[0].Ability5}</b> <i>Passive</i></p>
                                    <img src={this.state.data[0].Ability_5.URL} alt='' />
                                    <p>{this.state.data[0].Ability_5.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_5.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}>{val.description} {val.value}</p>
                                    )}
                                </div>
                                <div >
                                    <p><b>{this.state.data[0].Ability1}</b></p>
                                    <img src={this.state.data[0].Ability_1.URL} alt='' />
                                    <p>{this.state.data[0].Ability_1.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_1.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}>{val.description} {val.value}</p>
                                    )}
                                    <br />
                                    <p><b>Cooldown:</b> {this.state.data[0].Ability_1.Description.itemDescription.cooldown}</p>
                                    <p><b>Mana Cost:</b> {this.state.data[0].Ability_1.Description.itemDescription.cost}</p>
                                </div>
                                <div >
                                    <p><b>{this.state.data[0].Ability2}</b></p>
                                    <img src={this.state.data[0].Ability_2.URL} alt='' />
                                    <p>{this.state.data[0].Ability_2.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_2.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}>{val.description} {val.value}</p>
                                    )}
                                    <br />
                                    <p><b>Cooldown:</b> {this.state.data[0].Ability_2.Description.itemDescription.cooldown}</p>
                                    <p><b>Mana Cost:</b> {this.state.data[0].Ability_2.Description.itemDescription.cost}</p>
                                </div>
                                <div >
                                    <p><b>{this.state.data[0].Ability3}</b></p>
                                    <img src={this.state.data[0].Ability_3.URL} alt='' />
                                    <p>{this.state.data[0].Ability_3.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_3.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}>{val.description} {val.value}</p>
                                    )}
                                    <br />
                                    <p><b>Cooldown:</b> {this.state.data[0].Ability_3.Description.itemDescription.cooldown}</p>
                                    <p><b>Mana Cost:</b> {this.state.data[0].Ability_3.Description.itemDescription.cost}</p>
                                </div>
                                <div >
                                    <p><b>{this.state.data[0].Ability4}</b></p>
                                    <img src={this.state.data[0].Ability_4.URL} alt='' />
                                    <p>{this.state.data[0].Ability_4.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_4.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}>{val.description} {val.value}</p>
                                    )}
                                    <br />
                                    <p><b>Cooldown:</b> {this.state.data[0].Ability_4.Description.itemDescription.cooldown}</p>
                                    <p><b>Mana Cost:</b> {this.state.data[0].Ability_4.Description.itemDescription.cost}</p>
                                </div>
                            </div>
                            <div className="build-menu" onClick={this.BuildDropdown}>
                                <h3 >Builds</h3>
                                <div className={this.BuildMenu()}>
                                    <div className="btn-line"></div>
                                    <div className="btn-line"></div>
                                    <div className="btn-line"></div>
                                </div>
                            </div>

                            <div className={this.BuildisActive()}>
                                <div className='starter'>
                                    <h1>Starter Items</h1>
                                    {this.state.StarterItems.map((item) =>
                                        <p key={uuid.v4()}>{item.Item}</p>
                                    )}
                                </div>
                                <div className='core'>
                                    <h1>Core Items</h1>
                                    {this.state.CoreItems.map((item) =>
                                        <p key={uuid.v4()}>{item.Item}</p>
                                    )}
                                </div>
                                <div className='damage'>
                                    <h1>Damage Items</h1>
                                    {this.state.DamageItems.map((item) =>
                                        <p key={uuid.v4()}>{item.Item}</p>
                                    )}
                                </div>
                                <div className='defensive'>
                                    <h1>Defensive Items</h1>
                                    {this.state.DefensiveItems.map((item) =>
                                        <p key={uuid.v4()}>{item.Item}</p>

                                    )}
                                </div>
                            </div>

                        </div>}
                </div>
            </div>
        )
    }
}
