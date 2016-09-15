import React, { Component } from 'react';

import Grid from './Grid';

class Layout extends Component {

    constructor() {
        super();

        this.state = {
            rows: 20,
            cols: 50,
            board: [],
            timer: 0,
            ms: 500,
            generation: 0
        };

    }

    generateRandomBoard() {
        clearInterval(this.state.timer);
        this.state.generation = 0;
        let board = [];
        for (var i = 0; i < this.state.rows; i++) {
            let row = [];
            for (var j = 0; j < this.state.cols; j++) {
                let cell = Math.random() > 0.85 ? "alive" : "dead";
                row.push(cell);
            }
            board.push(row);
        }
        this.setState({ board });
    }

    nextStep() {
        let oldBoard = this.state.board;
        let newBoard = [];
        let finished = true;
        for (var i = 0; i < oldBoard.length; i++) {
            let row = [];
            for (var j = 0; j < oldBoard[i].length; j++) {
                let neighbours = 0;
                let thisPosX = i;
                let thisPosY = j;
                let startPosX = (thisPosX === 0) ? thisPosX : thisPosX - 1;
                let startPosY = (thisPosY === 0) ? thisPosY : thisPosY - 1;
                let endPosX = (thisPosX + 1 === oldBoard.length) ? thisPosX : thisPosX + 1;
                let endPosY = (thisPosY + 1 === oldBoard[i].length) ? thisPosY : thisPosY + 1;
                for (var k = startPosX; k <= endPosX; k++) {
                    for (var l = startPosY; l <= endPosY; l++) {
                        if (oldBoard[k][l] === "alive") {
                            neighbours += 1;
                            finished = false;
                        }
                    }
                }
                let cell = "";
                if (oldBoard[i][j] === "alive") {
                    neighbours -= 1;
                    if (neighbours === 2 || neighbours === 3) { 
                        cell = "alive";
                    } else {
                        cell= "dead";
                    }
                } else {
                    if (neighbours === 3) {
                        cell = "alive";
                    }
                }
                row.push(cell);
            }
            newBoard.push(row);
        }
        this.setState({ board: newBoard });

        if (finished) {
            this.stopTimer();
        } else {
            let generation = this.state.generation += 1; 
            this.setState({ generation });
        }
    }

    startTimer() {
        clearInterval(this.state.timer);
        let timer = setInterval(this.nextStep.bind(this), this.state.ms);
        this.setState({ timer });
    }

    stopTimer() {
        clearInterval(this.state.timer);
    }

    clearBoard() {
        clearInterval(this.state.timer);
        let emptyBoard = [];
        for (var i = 0; i < this.state.rows; i++) {
            let row = [];
            for (var j = 0; j < this.state.cols; j++) {
                row.push("dead");
            }
            emptyBoard.push(row);
        }
        this.setState({ board: emptyBoard });
        this.setState({ generation: 0 });
    }

    toggleCell(row, col) {
        let board = this.state.board;
        if (board[row][col] === "dead") {
            board[row][col] = "alive";
        } else {
            board[row][col] = "dead";
        }
        this.setState({ board });
    }

    componentWillMount() {
        this.generateRandomBoard();
        this.startTimer();
    }

    render() {
        return (
            <div className="wrapper">
                <h1>Game of Life</h1>
                <div className="main">
                    <Grid
                        board={this.state.board}
                        toggleCell={this.toggleCell.bind(this) } />
                    <button onClick={this.generateRandomBoard.bind(this) }>Generate new board</button>
                    <button onClick={this.nextStep.bind(this) }>Next step</button>
                    <button onClick={this.startTimer.bind(this) }>Start</button>
                    <button onClick={this.stopTimer.bind(this) }>Pause</button>
                    <input onChange={event => {
                        let ms = event.target.value;
                        this.setState({ ms });
                    } }
                        value={this.state.ms}></input>
                    <button onClick={this.clearBoard.bind(this) }>Clear board</button>
                    <h3>Generation: {this.state.generation}</h3>
                    <p>Read about Conway's Game of Life <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">here</a>.</p>
                </div>
                <footer className="footer">
                    Coded by <a href="https://github.com/matt2112" target="_blank">Matt Lewis</a>
                </footer>
            </div>
        );
    }
}

export default Layout;