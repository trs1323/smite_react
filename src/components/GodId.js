import React, { Component } from 'react';
import Axios from 'axios';
import md5 from 'md5';
import uuid from 'uuid';
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

export default class GodId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: 'getgods', api2: 'getgodrecommendeditems', api3: 'getitems', api4: 'getgodskins', api5: 'getesportsproleaguedetails', lang: '1', active: 'false', build: 'false', loaded: false,
            data: this.props.gods.filter((god) => {
                return god.id == this.props.god_id
            })
        }
        this.dropdown = this.dropdown.bind(this);
        this.BuildDropdown = this.BuildDropdown.bind(this);
    }

    componentDidMount() {
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        //get god info
        // const signature = md5(`${this.props.devid}${this.state.api}${this.props.authkey}${this.props.timestamp}`);
        // trackPromise(
        //     Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api}json/${this.props.devid}/${signature}/${this.props.session}/${this.props.timestamp}/${this.state.lang}`, config)
        //         .then(res => {
        //             this.setState({
        //                 data: res.data.filter((god) => {
        //                     return god.id == this.props.god_id
        //                 })
        //             })
        //         })
        //         .catch(err => {
        //             alert('404 Please try again')
        //             console.log(err)
        //         }))
        //get rec items

        const signature2 = md5(`${this.props.devid}${this.state.api2}${this.props.authkey}${this.props.timestamp}`);
        trackPromise(
            Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api2}json/${this.props.devid}/${signature2}/${this.props.session}/${this.props.timestamp}/${this.props.god_id}/${this.state.lang}`, config)
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
        )
        //get all items 
        const signature3 = md5(`${this.props.devid}${this.state.api3}${this.props.authkey}${this.props.timestamp}`);
        Axios.get(`https://cors-anywhere.herokuapp.com/http://api.smitegame.com/smiteapi.svc/${this.state.api3}json/${this.props.devid}/${signature3}/${this.props.session}/${this.props.timestamp}/${this.state.lang}`)
            .then(res => {
                this.setState({
                    AllItems: res.data, loaded: true
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

    isLoaded() {
        return ((this.state.loaded === false) ? 'godid-background' : 'godid-background-loaded')
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

    MergeArry(arr1, arr2) {
        let merged = []

        for (let i = 0; i < arr1.length; i++) {
            merged.push({
                ...arr1[i],
                ...(arr2.find((itmInner) => itmInner.ItemId === arr1[i].item_id))
            }
            );
        }
        return merged
    }

    render() {
        return (
            <div className={this.isLoaded()} >
                <Header />
                <div className="godid-container">
                    <LoadingIndicator />
                    {this.state && this.state.data && this.state.AllItems && this.state.skins && this.state.RecItems && this.state.DamageItems && this.state.DefensiveItems && this.state.StarterItems &&
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
                                    <img src={this.state.data[0].Ability_5.URL} alt='' />
                                    <p className="ability-name"><b>{this.state.data[0].Ability5}</b> <i>Passive</i></p>
                                    <p>{this.state.data[0].Ability_5.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_5.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}><b>{val.description}</b> <i>{val.value}</i></p>
                                    )}
                                </div>
                                <div >
                                    <img src={this.state.data[0].Ability_1.URL} alt='' />
                                    <p className="ability-name"><b>{this.state.data[0].Ability1}</b></p>
                                    <p>{this.state.data[0].Ability_1.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_1.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}><b>{val.description}</b> <i>{val.value}</i></p>
                                    )}
                                    <br />
                                    <p><b>Cooldown:</b> <i>{this.state.data[0].Ability_1.Description.itemDescription.cooldown}</i></p>
                                    <p><b>Mana Cost:</b> <i>{this.state.data[0].Ability_1.Description.itemDescription.cost}</i></p>
                                </div>
                                <div >
                                    <img src={this.state.data[0].Ability_2.URL} alt='' />
                                    <p className="ability-name"><b>{this.state.data[0].Ability2}</b></p>
                                    <p>{this.state.data[0].Ability_2.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_2.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}><b>{val.description}</b> <i>{val.value}</i></p>
                                    )}
                                    <br />
                                    <p><b>Cooldown:</b> <i>{this.state.data[0].Ability_2.Description.itemDescription.cooldown}</i></p>
                                    <p><b>Mana Cost:</b> <i>{this.state.data[0].Ability_2.Description.itemDescription.cost}</i></p>
                                </div>
                                <div >
                                    <img src={this.state.data[0].Ability_3.URL} alt='' />
                                    <p className="ability-name"><b>{this.state.data[0].Ability3}</b></p>
                                    <p>{this.state.data[0].Ability_3.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_3.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}><b>{val.description}</b> <i>{val.value}</i></p>
                                    )}
                                    <br />
                                    <p><b>Cooldown:</b> <i>{this.state.data[0].Ability_3.Description.itemDescription.cooldown}</i></p>
                                    <p><b>Mana Cost:</b> <i>{this.state.data[0].Ability_3.Description.itemDescription.cost}</i></p>
                                </div>
                                <div >
                                    <img src={this.state.data[0].Ability_4.URL} alt='' />
                                    <p className="ability-name"><b>{this.state.data[0].Ability4}</b></p>
                                    <p>{this.state.data[0].Ability_4.Description.itemDescription.description}</p>
                                    <br />
                                    {this.state.data[0].Ability_4.Description.itemDescription.rankitems.map((val) =>
                                        <p key={uuid.v4()}><b>{val.description}</b> <i>{val.value}</i></p>
                                    )}
                                    <br />
                                    <p><b>Cooldown:</b> <i>{this.state.data[0].Ability_4.Description.itemDescription.cooldown}</i></p>
                                    <p><b>Mana Cost:</b> <i>{this.state.data[0].Ability_4.Description.itemDescription.cost}</i></p>
                                </div>
                            </div>
                            <div className="build-menu" onClick={this.BuildDropdown}>
                                <h3 >Reccommend Builds By Titan</h3>
                                <div className={this.BuildMenu()}>
                                    <div className="btn-line"></div>
                                    <div className="btn-line"></div>
                                    <div className="btn-line"></div>
                                </div>
                            </div>
                            <div className={this.BuildisActive()}>
                                <div className='starter'>
                                    <h1>Starter Items</h1>
                                    {this.MergeArry(this.state.StarterItems, this.state.AllItems).map((item) =>
                                        <div key={uuid.v4()} className="rec-items">
                                            <img key={uuid.v4()} src={item.itemIcon_URL} alt='' />
                                            <p key={uuid.v4()}><b>{item.Item}</b></p>
                                            <p key={uuid.v4()}>{item.ShortDesc}</p>
                                        </div>
                                    )}
                                </div>
                                <div className='core'>
                                    <h1>Core Items</h1>
                                    {this.MergeArry(this.state.CoreItems, this.state.AllItems).map((item) =>
                                        <div key={uuid.v4()} className="rec-items">
                                            <img key={uuid.v4()} src={item.itemIcon_URL} alt='' />
                                            <p key={uuid.v4()}><b>{item.Item}</b></p>
                                            <p key={uuid.v4()}>{item.ShortDesc}</p>
                                        </div >
                                    )}
                                </div>
                                <div className='damage'>
                                    <h1>Damage Items</h1>
                                    {this.MergeArry(this.state.DamageItems, this.state.AllItems).map((item) =>
                                        <div key={uuid.v4()} className="rec-items">
                                            <img key={uuid.v4()} src={item.itemIcon_URL} alt='' />
                                            <p key={uuid.v4()}><b>{item.Item}</b></p>
                                            <p key={uuid.v4()}>{item.ShortDesc}</p>
                                        </div>
                                    )}
                                </div>
                                <div className='defensive'>
                                    <h1>Defensive Items</h1>
                                    {this.MergeArry(this.state.DefensiveItems, this.state.AllItems).map((item) =>
                                        <div key={uuid.v4()} className="rec-items">
                                            <img key={uuid.v4()} src={item.itemIcon_URL} alt='' />
                                            <p key={uuid.v4()}><b>{item.Item}</b></p>
                                            <p key={uuid.v4()}>{item.ShortDesc}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='godid-bottom'>
                            </div>
                        </div>}
                </div>
                <Footer />
            </div>
        )
    }
}
