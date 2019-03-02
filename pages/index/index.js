import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

import Menu from 'components/menu';
import { classname } from 'helpers/classname';

import './index.scss';

const b = classname('index-page');

class IndexPage extends Component {
    render() {
        return (
            <div className={b('root')}>
                <Head>
                    <title>Печать стикеров</title>
                </Head>
                <h1 className={b('title')}>Печать Стикеров</h1>
                <p className={b('descr')}>
                  Это сервис для формирования листа со стикерами
                  и возможностью печати.<br />
                  Набор стикеров формируется путем импорта из популярных
                  трекеров задач (таких как Trello, GitHub Issues),
                  из CSV-файла или вручную через специальную форму. <br />
                </p>

                <Menu />

                <p className={b('descr')}>
                  Также вы можете распечатать <a href="/print?template">шаблон для печати</a>.
                  Он необходим для того, чтобы знать куда наклеить стикеры.
                </p>

                <div className={b('template-button-wrap')}>
                    <Link href="/print?template" passHref>
                        <Button className={b('imageBtn')}>
                            <img className={b(`image`)} src={`static/images/template.png`} />
                        </Button>
                    </Link>
                </div>

                <h2>Как это работает?</h2>
                <p className={b('subtitle')}>Получение данных из сторонних сервисов</p>
                <p className={b('descr')}>
                  Выберите сервис трекинга задач, из которого хотите импортировать данные.
                  В зависимости от сервиса нужно заполнить параметры для импорта.
                  Далее — на страницу с фильтрацией и выбором задач для печати.
                  И после подтверждения — на страницу печати.
                </p>

                <p className={b('subtitle')}>Ручное заполнение</p>
                <p className={b('descr')}>
                  На <a href="/form-config">странице ручного заполнения</a> с
                  помощью предложенных инструментов сформируйте
                  необходимый лист со стикерами. После этого отправьте его на печать.
                </p>
            </div>
        );
    }
}

export default IndexPage;
