import jsdom from 'mocha-jsdom';
import { expect } from "chai";
import { createStarGroup } from "../src/stars.js";


global.document = jsdom({
  url: "http://localhost"
});

describe('createStarGroup()', () => {
  it('Creates a Group object with correct number of stars', () => {
    const starGroup = createStarGroup(1000);

    expect(starGroup.children.length).eql(1);
    expect(starGroup.children[0].geometry.attributes.position.count).eql(1000);
  })
})