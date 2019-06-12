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
            class='search-textbox' 
            type='text'
            onKeyUp={(evt) => this.onSearchTextBoxKeyUp(evt)}
            placeholder='eg: John3:16'
            ></input>
            <button 
            class='search-button'
            disabled={this.state.osisText === null || this.state.osisText === ''}
            onClick={() => this.onSearchClicked()}
            >Search</button>
            <br/>
            <ul class="instruction">
                <li><span class='key'>ESC</span> : get back to search bar</li>
                <li><span class='key'>&#8592;</span> / <span class='key'>,</span>: go to previous verse</li>
                <li><span class='key'>&#8594;</span> / <span class='key'>.</span>: go to next verse</li>
            </ul>
        </div>);
    }
}

export default SearchBar;
