import React, { Component } from 'react'
import { DescriptionList } from './DescriptionList'

export class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            descriptions:[]
        };
    }
    componentDidUpdate(prevProp) {
        if (prevProp.term != this.props.term) {
            fetch('api/dictionary/Extract?term=' + this.props.term)
                .then(resp => resp.json())
                .then(data => this.setState(data));
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.term}</h1>
                <div>{this.state.descriptions.length}</div>
                <DescriptionList list={this.state.descriptions} title={this.state.term} />
            </div>
        );
    }
}