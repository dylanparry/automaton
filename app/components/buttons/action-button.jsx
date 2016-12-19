import React from 'react';

const ActionButton = ({ title, icon, action }) => (
  <button className="shortcut-button bg-steel fg-white text-shadow" style={{ margin: 5, width: '7rem', height: '7rem' }} onClick={action}>
    <span className={`icon ${icon}`} />
    <span className="title">{title}</span>
  </button>
);

ActionButton.propTypes = {
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  action: React.PropTypes.func.isRequired,
};

export default ActionButton;
