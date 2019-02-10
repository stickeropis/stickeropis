import React from 'react';
import { block } from 'bem-cn';
import Link from 'next/link';

import './index.scss';

const b = block('menu');

export default class Menu extends React.Component {
    render() {
        const items = ['csv'];

        return (
            <ul className={b()}>
                {items.map(item => {
                    return (
                        <li key={item} className={b('item')}>
                            <Link href={`/${item}-config`}>
                                <a>{item}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    }

    _onItemClick = item => {
        return () => console.log(item);
    }
}
