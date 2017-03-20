import React from 'react';

const BackButton = ({ to, children }, context) => (
  <div className="place-right">
    <button className="button primary" onClick={() => context.router.history.push(to)}>
      <span className="fa fa-fw fa-arrow-left" />
      {children}
    </button>
  </div>
);

BackButton.propTypes = {
  to: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

BackButton.contextTypes = {
  router: React.PropTypes.object,
};

export default BackButton;
