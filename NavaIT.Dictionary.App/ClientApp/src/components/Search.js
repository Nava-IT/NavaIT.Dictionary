import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';

import './Search.css'

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        <strong>{suggestion.title}</strong><br/>
        {suggestion.shortDescription}
    </div>
);

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = async ({ value }) => {
        this.SearchData(value);
/*        this.setState({
            suggestions: getSuggestions(value)
        });*/
    };

    async SearchData(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const response = await fetch('api/dictionary/search?q='+value);
        const data = await response.json();
        this.setState({
            suggestions: inputLength === 0 ? [] : data
        });
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a programming language',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={(event, s) => this.props.select(s.suggestionValue) }
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}