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
                let cell = Math.random() > 0.8 ? "alive" : "dead";
                row.push(cell);
            }
            board.push(row);
        }
        this.setState({ board });
    }

    nextStep() {
        let oldBoard = this.state.board;
        let newBoard = [];
        for (var i = 0; i < oldBoard.length; i++) {
            let row = [];
            for (var j = 0; j < oldBoard[i].length; j++) {
                let neighbours = 0;
                let thisPosX = i;
                let thisPosY = j;
                let startPosX = (thisPosX === 0) ? thisPosX : thisPosX - 1;
                let startPosY = (thisPosY === 0) ? thisPosY : thisPosY - 1;
                let endPosX =   (thisPosX + 1 === oldBoard.length) ? thisPosX : thisPosX + 1;
                let endPosY =   (thisPosY + 1 === oldBoard[i].length) ? thisPosY : thisPosY + 1;
                for (var k = startPosX; k <= endPosX; k++) {
                    for (var l = startPosY; l <= endPosY; l++) {
                        if (oldBoard[k][l] === "alive") {
                            neighbours += 1;
                        }
                    }
                }
                if (oldBoard[i][j] === "alive") {
                    neighbours -= 1;
                }
                let cell = "dead";
                if (neighbours > 1 && neighbours < 4) {
                    cell = "alive";
                } else {
                    cell = "dead";
                }
                row.push(cell);
            }
            newBoard.push(row);
        }
        this.setState({ board: newBoard});
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
                    <button onClick={this.nextStep.bind(this)}>Next step</button>
                </div>
                <footer className="footer">
                    Coded by <a href="https://github.com/matt2112" target="_blank">Matt Lewis</a>
                </footer>
            </div>
        );
    }
}

export default Layout;