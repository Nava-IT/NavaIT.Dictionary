import React, { Component } from 'react'
import { DescriptionList } from './DescriptionList'

export class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { items : [] };
        /*
        this.state = {
            term: props.term,
            descriptions: []
        };*/
    }
    componentDidUpdate(prevProp) {
        if (prevProp.term != this.props.term) {
            fetch('api/dictionary/Extract?term=' + this.props.term)
                .then(resp => resp.json())
                .then(data => this.setState({ items: data }));
        }
    }
    componentDidMount(prevProp) {
        //if (!prevProp.hasOwnProperty('term') || prevProp.term != this.props.term) {
        fetch('api/dictionary/Extract?term=' + this.props.term)
            .then(resp => resp.json())
            .then(data => this.setState({ items: data }));
        //}
    }
    render() {
        var html = null;
        if (this.state != null)
            html = this.state.items.map(a => (<DescriptionList list={a.descriptions} title={a.term} />));
        return (
            <div>
                
                {html}
            </div>
        );
    }
}