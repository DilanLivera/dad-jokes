import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  getColor() {
    if (this.props.votes >= 15) return "#4CAF50";
    else if (this.props.votes >= 12) return "#8BC34A";
    else if (this.props.votes >= 9) return "#CDDC39";
    else if (this.props.votes >= 6) return "#FFEB3B";
    else if (this.props.votes >= 3) return "#FFC107";
    else if (this.props.votes >= 0) return "#FF9800";
    else return "#F44336";
  }

  getEmoji() {
    if (this.props.votes >= 15) return "em em-rolling_on_the_floor_laughing";
    else if (this.props.votes >= 12) return "em em-laughing";
    else if (this.props.votes >= 9) return "em em-smiley";
    else if (this.props.votes >= 6) return "em em-slightly_smiling_face";
    else if (this.props.votes >= 3) return "em em-neutral_face";
    else if (this.props.votes >= 0) return "em em-confused";
    else return "em em-angry";
  }

  render() {
    const styles = {
      borderColor: {
        borderColor: this.getColor()
      }
    };
    return (
      <div data-test='Joke' className='Joke'>
        <div className='Joke-buttons'>
          <i data-test='Joke-upvote' className='fas fa-arrow-up' onClick={this.props.upvote}></i>
          <span className='Joke-votes' style={styles.borderColor}>
            {this.props.votes}
          </span>
          <i className='fas fa-arrow-down' onClick={this.props.downvote}></i>
        </div>
        <div className='Joke-text'>{this.props.text}</div>
        <div className='Joke-smiley'>
          <i className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}

export default Joke;
