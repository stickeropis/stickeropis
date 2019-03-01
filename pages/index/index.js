import React from 'react';
import Head from 'next/head';

import Menu from 'components/menu';
import { cn } from 'helpers/classname';

import './index.scss';

const b = cn('index-page');

export default class IndexPage extends React.Component {
    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>Печать стикеров</title>
                </Head>
                <h2 className={b('title')}>Выберите источник:</h2>
                <Menu />
            </div>
        );
    }
}
