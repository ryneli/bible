import React, { Component } from "react";
import { AppStateStore } from "./store";
import "./SearchBar.css";
import { formatQueryToOsis } from "./verse_utils";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null,
      osisText: null
    };
    document.addEventListener("keydown", e => this.onKeyDown(e));
  }

  onKeyDown(e) {
    switch (e.keyCode) {
      case /* Enter = */ 13:
        this.onSearchClicked();
        break;
      default:
        this.updateOsisText(e);
    }
  }

  onSearchClicked() {
    AppStateStore.updateOsisText(this.state.osisText);
  }

  updateOsisText(e) {
    var elem = e.srcElement || e.target;
    var inputBoxValue = elem.value + String.fromCharCode(e.keyCode);
    if (inputBoxValue !== undefined) {
      this.setState({
        searchText: elem.value,
        osisText: formatQueryToOsis(inputBoxValue)
      });
    }
  }

  render() {
    return (
      <div>
        <input
          class="search-textbox"
          type="text"
          placeholder="eg: John3:16"
          onKeyDown={this.onKeyDown.bind(this)}
        ></input>
        <button
          class="search-button"
          disabled={this.state.osisText === null || this.state.osisText === ""}
          onClick={() => this.onSearchClicked()}
        >
          Search
        </button>
        <br />
        <ul class="instruction">
          <li>
            <span class="key">ESC</span> : get back to search bar
          </li>
          <li>
            <span class="key">&#8592;</span> / <span class="key">,</span>: go to
            previous verse
          </li>
          <li>
            <span class="key">&#8594;</span> / <span class="key">.</span>: go to
            next verse
          </li>
        </ul>
      </div>
    );
  }
}

export default SearchBar;
