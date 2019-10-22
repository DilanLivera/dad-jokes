import React from "react";
import Joke from ".";
import { shallow, mount } from "enzyme";
import { findByTestAttr } from "../../../utils";

const props = {
  text: "This is a joke",
  votes: 0,
  upvote: jest.fn(),
  downvote: jest.fn()
};

describe("JokeList Component", () => {
  let wrapper;

  it("Should render without errors", () => {
    wrapper = shallow(<Joke {...props} />);

    const response = findByTestAttr(wrapper, "Joke");
    expect(response.length).toBe(1);
  });

  it("Should upvote", () => {
    wrapper = shallow(<Joke {...props} />);

    expect(wrapper.instance().props.text).toEqual("This is a joke");
    expect(wrapper.instance().props.votes).toEqual(0);
  });
});
