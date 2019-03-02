import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { classname } from 'helpers/classname';

const b = classname('sticker');

class Sticker extends PureComponent {
    static propTypes = {
        sticker: PropTypes.object
    };

    static defaultProps = {
        sticker: {
            headerLeft: '',
            headerRight: '',
            body: '',
            footerLeft: '',
            footerRight: ''
        }
    };

    render() {
        const { headerLeft, headerRight, body, footerLeft, footerRight } = this.props.sticker;

        return (
            <article className={b()}>
                <div className={b('header-left', [b('field')])}>
                    {headerLeft}
                </div>
                <div className={b('header-right', [b('field')])}>
                    {headerRight}
                </div>
                <div className={b('body', [b('field')])}>
                    {body}
                </div>
                <div className={b('footer-left', [b('field')])}>
                    {footerLeft}
                </div>
                <div className={b('footer-right', [b('field')])}>
                    {footerRight}
                </div>
            </article>
        );
    }
}

export default Sticker;
