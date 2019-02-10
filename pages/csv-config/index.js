import React from 'react';
import { block } from 'bem-cn';
import Head from 'next/head';

import './index.scss';

const b = block('csv-config-page');

export default class CsvConfigPage extends React.Component {
    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>CSV конфигурация</title>
                </Head>
                <h2 className={b('title')}>Выберите файл:</h2>
                выбор файла
            </div>
        );
    }
}
