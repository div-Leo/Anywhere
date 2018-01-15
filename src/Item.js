import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Item extends Component {

    onEntering(callback) {
        console.log("component will enter");
        callback();
    }

    onEntered() {
        console.log("component did enter");
    }

    onExiting(callback) {
        console.log("component will leave");
        callback();
    }

    render() {
        return (
            <div>Item</div>
        )
    }
}

export default Item;
