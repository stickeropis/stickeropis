import React, { Component } from 'react';
import Head from 'next/head';

import Menu from 'components/menu';
import { classname } from 'helpers/classname';

import './index.scss';

const b = classname('index-page');

class IndexPage extends Component {
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

export default IndexPage;
