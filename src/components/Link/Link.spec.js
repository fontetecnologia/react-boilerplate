/* eslint-disable no-unused-expressions */

import React from 'react';
import chai from 'chai';
import sinon from 'sinon'; // eslint-disable-line  no-unused-vars
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount, render } from 'enzyme'; // eslint-disable-line  no-unused-vars

import Link from './Link';

chai.use(sinonChai);
chai.use(chaiEnzyme());

let expect = chai.expect;

const href = 'https://www.fontetecnologia.com.br';

const navigate = sinon.fake();
const generateUrls = sinon.fake.returns(href);
const event = {
  defaultPrevented: false,
  preventDefault: sinon.fake(() => {
    event.defaultPrevented = true;
  }),
  currentTarget: {
    getAttribute: sinon.fake.returns(href),
  },
};

describe('<Link />', () => {
  beforeEach(() => {
    event.defaultPrevented = false;
  });

  afterEach(() => {
    sinon.resetHistory();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Link href={href} navigate={navigate} generateUrls={generateUrls} />,
    );
    expect(wrapper.find('a')).to.have.length(1);
  });

  context('should have "href" attribute', () => {
    it('when pass "href" prop', () => {
      const wrapper = shallow(
        <Link href={href} navigate={navigate} generateUrls={generateUrls} />,
      );
      expect(wrapper).to.have.attr('href', href);
    });

    it('when pass "to" prop', () => {
      const wrapper = shallow(
        <Link to="home" navigate={navigate} generateUrls={generateUrls} />,
      );
      expect(wrapper).to.have.attr('href', href);
      expect(generateUrls).to.have.been.calledOnce;
    });
  });

  context('onClick', () => {
    it('should prevent default action when clicked', () => {
      const wrapper = shallow(
        <Link href={href} navigate={navigate} generateUrls={generateUrls} />,
      );
      wrapper.simulate('click', event);
      expect(event.preventDefault).to.have.been.calledOnce;
    });

    it('should execute the navigate function when clicked', () => {
      const wrapper = shallow(
        <Link href={href} navigate={navigate} generateUrls={generateUrls} />,
      );
      wrapper.simulate('click', event);
      expect(navigate).to.have.been.calledOnceWithExactly(href);
    });

    it('should execute first the prop onClick and after the internal onClick when clicked', () => {
      const onClick = sinon.fake();
      const wrapper = shallow(
        <Link
          href={href}
          onClick={onClick}
          navigate={navigate}
          generateUrls={generateUrls}
        />,
      );
      const _handleOnClick = sinon.stub(wrapper.instance(), '_handleOnClick');
      wrapper.simulate('click', event);
      expect(onClick).to.have.been.calledBefore(_handleOnClick);
    });

    it('should abort execution if onClick preventDefault when clicked', () => {
      const onClick = event => {
        event.preventDefault();
      };
      const wrapper = shallow(
        <Link
          href={href}
          onClick={onClick}
          navigate={navigate}
          generateUrls={generateUrls}
        />,
      );
      wrapper.simulate('click', event);
      expect(navigate).to.not.have.been.called;
    });
  });
});
