import React from "react";
import JokeList from ".";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../utils";

const props = {
  numJokesToGet: 10
};

const setUp = props => {
  return shallow(<JokeList {...props} />);
};

describe("JokeList Component", () => {
  let wrapper;

  it("Should render without errors", () => {
    wrapper = setUp();

    const response = findByTestAttr(wrapper, "JokeListComponent");
    expect(response.length).toBe(1);
  });

  // it("Should get more jokes", () => {
  //   wrapper = setUp();

  //   wrapper.find("[data-test='JokeList-getmore']").simulate("click");
  //   expect(wrapper.state("jokes")).toBe(props.numJokesToGet * 2);
  // });
});
