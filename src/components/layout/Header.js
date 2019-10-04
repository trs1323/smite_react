import React, { Component } from 'react'
import '../../App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



export default class Header extends Component {
    render() {
        return (

            <div className="header">
                <div className="ocp-background">

                    <img src={require("../../img/Smite.png")} alt="s"></img>
                    <p>Smite Stats and Data for Nerds</p>
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
                </div>
            </div>

        )
    }
}
