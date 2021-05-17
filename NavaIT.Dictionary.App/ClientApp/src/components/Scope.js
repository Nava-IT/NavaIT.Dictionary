import React, { Component } from 'react';

export class Scope extends Component {
    constructor(props) {
        super(props);
        this.name = props.match?.params?.name;
        this.state = {
            scopes: [],
            isFetching: true
        };
    }

    componentDidMount() {
        fetch('api/dictionary/Scope?name='+this.name)
            .then(resp => resp.json())
            .then(data => this.setState({ scopes: data, isFetching: false }));

    }
    render() {
        return (
            <div className='row'>
                <div className='col-12'>{this.name}</div>
                {this.state.scopes.map((s) => {
                    return (
                        <div className='listitem col-lg-2 col-md-4 col-sm-6'>
                            <a href={'dictionary/'+s}>{s}</a>
                        </div>
                    );
                })}
            </div>
        );
    }
}