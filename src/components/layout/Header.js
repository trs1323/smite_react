import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <div >
                <div className="btn-family">
                    <div className="logo">
                        <img src={require("../../img/smite-training.png")} alt="s"></img>
                    </div>
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
        )
    }
}
