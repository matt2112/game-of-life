import React, { Component } from 'react';

import Grid from './Grid';

class Layout extends Component {

    constructor() {
        super();

        this.state = {
            rows: 20,
            cols: 20,
            board: []
        };

    }

    generateRandomBoard() {
        let board = [];
        for (var i = 0; i < this.state.rows; i++) {
            let row = [];
            for (var j = 0; j < this.state.cols; j++) {
                let cell = Math.random() > 0.7 ? "alive" : "dead";
                row.push(cell);
            }
            board.push(row);
        }
        this.setState({ board });
    }

    componentWillMount() {
        this.generateRandomBoard();
    }

    render() {
        return (
            <div className="wrapper">
                <h1>Game of Life</h1>
                <div className="main">
                    <Grid board={this.state.board} />
                    <button onClick={this.generateRandomBoard.bind(this)}>Generate new board</button>
                </div>
                <footer className="footer">
                    Coded by <a href="https://github.com/matt2112" target="_blank">Matt Lewis</a>
                </footer>
            </div>
        );
    }
}

export default Layout;