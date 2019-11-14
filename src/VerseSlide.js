import React, { Component } from "react";
import "./VerseSlide.css";

class VerseSlide extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="verses">
        {this.props.value.getVerseNumber()} {this.props.value.getVerseCn()}
        <br />
        {this.props.value.getVerseNumber()} {this.props.value.getVerseEn()}
      </div>
    );
  }
}

export default VerseSlide;
