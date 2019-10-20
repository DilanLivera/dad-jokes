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
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false
    };
    /*
      create a Set to keep track of jokes to prevent duplicate jokes
    */
    this.seenJokes = new Set(this.state.jokes.map(joke => joke.text));
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    try {
      let jokes = [];

      while (jokes.length < this.props.numJokesToGet) {
        let response = await axios.get("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json"
          }
        });

        let newJoke = response.data.joke;
        /*
          if the joke doesnt exist in the Set, add the new joke
        */
        if (!this.seenJokes.has(newJoke)) jokes.push({ id: uuid(), text: response.data.joke, votes: 0 });
      }

      this.setState(
        state => ({
          jokes: [...state.jokes, ...jokes],
          loading: false
        }),
        /*
          update the local storage jokes
        */
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (error) {
      /*
        set loading false to load the jokes in the local storage in case if there was something wrong with getting jokes from the API 
      */
      this.setState({ loading: false });
    }
  }

  handleVote(id, delta) {
    this.setState(
      state => ({
        /* 
          go through jokes
          find the joke with the id passed in and add the delta to that jokes votes
        */
        jokes: state.jokes.map(joke => (joke.id === id ? { ...joke, votes: joke.votes + delta } : joke))
      }),
      /*
        update the local storage jokes
      */
      () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='JokeList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin'></i>
          <h1 className='JokeList-title'>Loading...</h1>
        </div>
      );
    }

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
          <button data-test='JokeList-getmore' className='JokeList-getmore' onClick={this.handleClick}>
            New Jokes
          </button>
        </div>
        <div className='JokeList-jokes'>{jokes}</div>
      </div>
    );
  }
}

export default JokeList;
