import React, { Component } from 'react';
import './App.css';
import './SearchBar';
import './VerseSlide';
import {VerseCursor} from './VerseCursor';
import {AppStateStore} from './store';

import SearchBar from './SearchBar';
import VerseSlide from './VerseSlide';
var ESV = require('./assets/ESV.json');
var ChiUns = require('./assets/ChiUns.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ESV: ESV,
      ChiUns: ChiUns,
      verseList: [],
      current: 0,
    };

    AppStateStore.observeOsisText().subscribe((osisText) =>
      {
        
        const verseList = [];
        let osisTextList = [];
        if (osisText.includes(',')) {
          osisTextList = osisText.split(',').map((s) => s.trim());
        } else if (osisText !== '') {
          osisTextList.push(osisText);
        }
        
        console.log('App#updateVerse osisTextList %o', osisTextList);
        osisTextList.forEach((s) => {
          const subVerseList = this.getVerses(s);
          console.log('App#updateVerse subVerseList %o', subVerseList);
          subVerseList.forEach((e) => verseList.push(e));
        });

        this.setState({verseList, current: 0});
      }
    );
    
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  onKeyDown(e) {
    switch(e.keyCode) {
      case /* ArrowRight = */ 39 :
      case /* Period = */ 190:
        this.nextVerse();
        break;
      case /* ArrowLeft = */ 37:
      case /* Comma = */ 188:
        this.previousVerse();
        break;
      case /* Escape = */ 27:
        this.showSearch();
        break;
      default:
        // do nothing
    }
  }

  nextVerse() {
    const next = this.state.current + 1;
    if (this.state.verseList.length > 0 && next < this.state.verseList.length) {
      this.setState({current: next});
    }
  }

  previousVerse() {
    const next = this.state.current - 1;
    if (this.state.verseList.length > 0 && next >= 0) {
      this.setState({current: next});
    }
  }

  showSearch() {
    this.setState({verseList: []});
  }

  getVerses(osisText) {
    const [start, end] = osisText.split('-');
    const startVerseCursor = VerseCursor.fromOsis(start);
    let endVerseCursor = startVerseCursor.next();
    if (end) {
      endVerseCursor = VerseCursor.fromOsis(end).next();
    }
    const verseList = [];
    let currentVerseCursor = startVerseCursor;
    while(currentVerseCursor && !currentVerseCursor.equals(endVerseCursor)) {
      verseList.push(currentVerseCursor);
      currentVerseCursor = currentVerseCursor.next();
    }
    return verseList;
  }

  render() {
    if (this.state.verseList.length > 0) {
      return (
        <div className="App">
          <header className="App-header">
            <VerseSlide value={this.state.verseList[this.state.current]}></VerseSlide>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <SearchBar ></SearchBar>
          </header>
        </div>
      );
    }
  }
}

export default App;
