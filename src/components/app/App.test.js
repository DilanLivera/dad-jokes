import React from "react";
import App from ".";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../utils";

const setUp = (props = {}) => {
  return shallow(<App {...props} />);
};

describe("App Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp();
  });

  it("Should render without errors", () => {
    const response = findByTestAttr(wrapper, "AppComponent");
    expect(response.length).toBe(1);
  });
});
