import React from "react";
import Joke from ".";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../utils";

const props = {
  text: "joke text",
  votes: 0,
  upvote: () => {},
  downvote: () => {}
};

const setUp = props => {
  return shallow(<Joke {...props} />);
};

describe("JokeList Component", () => {
  let wrapper;

  it("Should render without errors", () => {
    wrapper = setUp();

    const response = findByTestAttr(wrapper, "Joke");
    expect(response.length).toBe(1);
  });

  it("Should upvote", () => {
    wrapper = setUp();

    const vote = wrapper.instance().props("text");

    console.log(vote);

    wrapper.find("[data-test='Joke-upvote']").simulate("click");
    expect(wrapper.prop("votes")).toBe(2);
  });
});
