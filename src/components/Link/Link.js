import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    generateUrls: PropTypes.func.isRequired,
    href: (props, propName, componentName) => {
      if (!props.href && !props.to) {
        return new Error(
          `Uma das props 'href' ou 'to' deve ser especificada '${componentName}'.`,
        );
      }
    },
    to: (props, propName, componentName) => {
      if (!props.href && !props.to) {
        return new Error(
          `Uma das props 'href' ou 'to' deve ser especificada '${componentName}'.`,
        );
      }
    },
    onClick: PropTypes.func,
  };

  _handleOnClick = (event, ...args) => {
    const { navigate, onClick = false } = this.props;

    if (onClick) {
      onClick(event, ...args);
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    navigate(event.currentTarget.getAttribute('href'));
  };

  render() {
    const {
      href = '',
      to = '',
      onClick,
      navigate,
      generateUrls,
      ...props
    } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        href={href || generateUrls(to)}
        onClick={this._handleOnClick}
        {...props}
      />
    );
  }
}

export default Link;
