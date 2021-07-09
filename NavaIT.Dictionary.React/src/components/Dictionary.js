import React, { Component } from 'react';
import { Content } from './Content';
import { Search } from './Search';


export class Dictionary extends Component {
    constructor(props) {
        super(props);
        this.term = props.match?.params?.term;
        this.state = { searchValue : this.term }; 
    }

    searched = (value) => {
        this.setState({ searchValue: value });
    }
    render() {
        return (
            <div>
                <Search select={this.searched} />
                <Content term={ this.state.searchValue } />
            </div>
        );
    }
}
