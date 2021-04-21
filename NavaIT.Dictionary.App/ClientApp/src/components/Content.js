import React, { Component } from 'react'

export class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description:[]
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
                <h1>{this.state.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: this.state.description }}></div>
            </div>
        );
    }
}