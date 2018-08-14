/* eslint-disable no-unused-expressions */

import React from 'react';
import chai from 'chai';
import sinon from 'sinon'; // eslint-disable-line  no-unused-vars
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount, render } from 'enzyme'; // eslint-disable-line  no-unused-vars

import App from './App';

chai.use(sinonChai);
chai.use(chaiEnzyme());

let expect = chai.expect;

describe('<App />', () => {
  it('should render without break', () => {
    const wrapper = shallow(<App children={'OK'} />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div')).to.have.text('OK');
  });
});
