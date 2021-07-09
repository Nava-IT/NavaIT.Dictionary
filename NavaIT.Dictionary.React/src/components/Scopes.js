import React, { Component } from 'react';
import Configs from '../Configuration/Config.json';

export class Scopes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scopes: [],
            isFetching: true
        };
    }

    componentDidMount() {
        fetch(Configs.Urls.Scopes)
            .then(resp => resp.json())
            .then(data => this.setState({ scopes: data, isFetching: false }));

    }
    render() {
        return (
            <div className='row'>
                {this.state.scopes.map((s) => {
                    return (
                        <div className='listitem col-lg-4 col-md-4 col-sm-4'>
                            <a href={'scope/'+s}>{s}</a>
                        </div>
                    );
                })}
            </div>
        );
    }
}