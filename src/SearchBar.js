import React, { Component } from 'react';
import {AppStateStore} from './store';
import './SearchBar.css';
var bcv_parser = require("bible-passage-reference-parser/js/full_bcv_parser").bcv_parser;
var bcv = new bcv_parser();

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            osisText: null,
        };
    }
    onSearchClicked() {
        AppStateStore.updateOsisText(this.state.osisText);
    }

    onSearchTextBoxKeyUp(e) {
        if (e.keycode === 13) {
            AppStateStore.updateOsisText(this.state.osisText);
            return;
        }
        var elem = e.srcElement || e.target;
        bcv.parse(elem.value);
        this.setState({
            searchText: elem.value,
            osisText: bcv.osis(),
        });
    }

    render() {
        return (
        <div >
            <input 
            id='search-textbox' 
            type='text'
            onKeyUp={(evt) => this.onSearchTextBoxKeyUp(evt)}
            placeholder='eg: John3:16'
            ></input>
            <button 
            id='search-button'
            disabled={this.state.osisText === null || this.state.osisText === ''}
            onClick={() => this.onSearchClicked()}
            >Search</button>
        </div>);
    }
}

export default SearchBar;
