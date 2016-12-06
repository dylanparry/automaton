import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NavLink extends Component {
    static propTypes = {
        to: React.PropTypes.string,
    };

    static contextTypes = {
        router: React.PropTypes.object,
    };

    isActive() {
        return this.context.router.isActive(this.props.to, true);
    }

    render() {
        const className = this.isActive() ? 'active' : '';

        /* eslint-disable jsx-a11y/anchor-has-content */
        return (
            <li className={className}>
                <Link {...this.props} />
            </li>
        );
        /* eslint-enable */
    }
}
