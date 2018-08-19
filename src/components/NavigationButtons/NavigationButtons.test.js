import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationButtons from "./NavigationButtons";

configure({adapter: new Adapter()});

describe("<NavigationButtons />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationButtons />);
    });
    
    it("should receive a prop prevClick so to user is able to navigate to previous page", () => {
        expect(wrapper.props().prevClick);
    });

    it("should receive a prop nextClick so to user is able to navigate to next page", () => {
        expect(wrapper.props().nextClick);
    });

    it("should receive a prop prevDisabled to disable or enable previous button", () => {
        expect(wrapper.props().prevDisabled);
    });

    it("should receive a prop nextDisabled to disable or enable next button", () => {
        expect(wrapper.props().nextDisabled);
    });

});