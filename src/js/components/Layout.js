import React, { Component } from 'react';

import Grid from './Grid';

class Layout extends Component {

    constructor() {
        super();

        this.state = {

        };

    }

    render() {
        return (
            <div className="wrapper">
                <h1>Game of Life</h1>
                <div className="main">
                   <Grid />
                </div>
                <footer className="footer">
                    Coded by <a href="https://github.com/matt2112" target="_blank">Matt Lewis</a>
                </footer>
            </div>
        );
    }
}

export default Layout;