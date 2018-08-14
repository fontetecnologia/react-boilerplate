/* eslint-disable no-unused-expressions */

import React from 'react';
import chai from 'chai';
import sinon from 'sinon'; // eslint-disable-line  no-unused-vars
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount, render } from 'enzyme'; // eslint-disable-line  no-unused-vars

import Home from './Home';

chai.use(sinonChai);
chai.use(chaiEnzyme());

let expect = chai.expect;

describe('<Home />', () => {
  it('should render without break', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.be.ok;
  });
});
