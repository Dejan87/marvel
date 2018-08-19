import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Character from "./Character";

configure({adapter: new Adapter()});

describe("<Character />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Character />);
    });
    
    it("should receive a prop path to display an image", () => {
        expect(wrapper.props().path);
    });

    it("should receive a prop name to display character's name", () => {
        expect(wrapper.props().name);
    });

    it("should receive a prop bookmarkCharacter so the is able to bookmark that character", () => {
        expect(wrapper.props().bookmarkCharacter);
    });

    it("should receive a prop status to correctly display character's status - bookmarked or not", () => {
        expect(wrapper.props().status);
    });

});