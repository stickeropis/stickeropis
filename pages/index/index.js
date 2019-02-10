import React from 'react';
import { block } from 'bem-cn';
import Head from 'next/head';

import Menu from 'components/menu';

import './index.scss';

const b = block('index-page');

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
