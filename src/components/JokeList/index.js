import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import "./JokeList.css";
import Joke from "../Joke/";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  async componentDidMount() {
    let jokes = [];

    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json"
        }
      });

      let jokeExist = jokes.some(jokeObj => jokeObj.text === response.data.joke);
      if (!jokeExist) jokes.push({ id: uuid(), text: response.data.joke, votes: 0 });
    }

    this.setState({ jokes });
  }

  handleVote(id, delta) {
    this.setState(state => ({
      /* 
        go through jokes
        find the joke with the id passed in and add the delta to that jokes votes
      */
      jokes: state.jokes.map(joke => (joke.id === id ? { ...joke, votes: joke.votes + delta } : joke))
    }));
  }

  render() {
    const jokes = this.state.jokes.map(jokeObj => (
      <Joke
        key={jokeObj.id}
        text={jokeObj.text}
        votes={jokeObj.votes}
        upvote={() => this.handleVote(jokeObj.id, 1)}
        downvote={() => this.handleVote(jokeObj.id, -1)}
      />
    ));

    return (
      <div data-test='JokeListComponent' className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1 className='JokeList-title'>
            <span>Dad</span> Jokes
          </h1>
          <img
            alt='sidebar smiley face'
            src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
          />
          <button data-test='JokeList-getmore' className='JokeList-getmore'>
            New Jokes
          </button>
        </div>
        <div className='JokeList-jokes'>{jokes}</div>
      </div>
    );
  }
}

export default JokeList;
