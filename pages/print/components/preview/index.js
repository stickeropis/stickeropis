import React, { PureComponent } from 'react';
import './index.scss';
import { classname } from 'helpers/classname';
import PropTypes from 'prop-types';

const b = classname('preview');

class Preview extends PureComponent {
    static propTypes = {
        children: PropTypes.node
    };

    classes = ['header-left', 'header-right', 'body', 'footer-left', 'footer-right'];

    addClass = (child, index) => {
        const props = {
            ...child.props,
            className: b(this.classes[index], [b('field'), child.props.className])
        };

        return React.cloneElement(child, props);
    };

    render() {
        return (
            <article className={b()}>
                {React.Children.map(this.props.children, this.addClass)}
            </article>
        );
    }
}

export default Preview;
