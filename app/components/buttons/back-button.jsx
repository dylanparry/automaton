import React from 'react';
import { hashHistory } from 'react-router';

const BackButton = ({ to, children }) => (
    <div className="place-right">
        <button className="button primary" onClick={() => hashHistory.push(to)}>
            <span className="fa fa-fw fa-arrow-left" />
            {children}
        </button>
    </div>
);

BackButton.propTypes = {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
};

export default BackButton;
