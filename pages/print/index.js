import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { classname } from 'helpers/classname';
import './index.scss';
import Button from '@material-ui/core/Button';

import { MenuItem, Select } from '@material-ui/core';

import { checkedTasksSelector } from '../../store/reducers/tasks';

import Sticker from './components/sticker';
import Preview from './components/preview';

const b = classname('print-page');

class PrintPage extends Component {
    state = {
        lockTemplate: false,
        isTemplate: false,
        placement: {
            headerLeft: 'id',
            headerRight: 'type',
            body: 'title',
            footerLeft: 'date',
            footerRight: 'author'
        }
    };

    componentDidMount() {
        const isTemplateUrl = window.location.search.includes('template');

        // eslint-disable-next-line
        this.setState(({ placement }) => ({
            lockTemplate: isTemplateUrl,
            isTemplate: isTemplateUrl,
            placement: {
                headerLeft: localStorage.getItem('headerLeft') || placement.headerLeft,
                headerRight: localStorage.getItem('headerRight') || placement.headerRight,
                body: localStorage.getItem('body') || placement.body,
                footerLeft: localStorage.getItem('footerLeft') || placement.footerLeft,
                footerRight: localStorage.getItem('footerRight') || placement.footerRight
            }
        }));
    }

    getEmptyTemplate = () => new Array(6).fill({});

    get getFieldList() {
        return [
            {
                key: 'priority',
                name: 'Приоритет'
            },
            {
                key: 'storyPoints',
                name: 'Story Points'
            },
            {
                key: 'author',
                name: 'Автор'
            },
            {
                key: 'title',
                name: 'Заголовок'
            },
            {
                key: 'description',
                name: 'Описание'
            },
            {
                key: 'assign',
                name: 'Назначено'
            },
            {
                key: 'id',
                name: 'ID'
            },
            {
                key: 'date',
                name: 'Дата'
            },
            {
                key: 'deadLine',
                name: 'DeadLine'
            },
            {
                key: 'sprint',
                name: 'Спринт'
            },
            {
                key: 'type',
                name: 'Тип'
            },
            {
                key: 'tags',
                name: 'Таги'
            },
            {
                key: 'link',
                name: 'Ссылки'
            },
            {
                key: 'other',
                name: 'Другое'
            }
        ];
    }

    print = () => {
        setTimeout(() => {
            window.print();
            this.setState({ isTemplate: this.state.lockTemplate });
        }, 0);
    };

    printTemplate = () => {
        this.setState(() => ({ isTemplate: true }));
        this.print();
    };

    printStickers = () => {
        this.setState(() => ({ isTemplate: false }));
        this.print();
    };

    getMock = () => {
        return [
            {
                priority: 0,
                storyPoints: 1,
                author: '@ivanov',
                title: 'Сверстать шапку',
                description: 'Вывести название полей и контролы сортировки',
                id: 'STICKER-101',
                date: new Date(2019, 1, 2),
                deadline: new Date(2019, 1, 2),
                sprint: '#29. Мартовский код',
                type: 'task',
                tags: ['Вёрстка']
            },
            {
                priority: 0,
                storyPoints: 2,
                author: '@ivanov',
                title: 'Сверстать карточку',
                description: 'Вывести все поля задачи',
                id: 'STICKER-102',
                date: new Date(2019, 1, 2),
                deadline: new Date(2019, 1, 2),
                sprint: '#29. Мартовский код',
                type: 'task',
                tags: ['Вёрстка']
            },
            {
                priority: 0,
                storyPoints: 3,
                author: '@ivanov',
                title: 'Починить прогрузку стилей',
                description: 'При первом посещении сайта не применяются все стили',
                id: 'STICKER-103',
                date: new Date(2019, 1, 2),
                deadline: new Date(2019, 1, 2),
                sprint: '#29. Мартовский код',
                type: 'bug',
                tags: ['Вёрстка']
            },
            {
                priority: 10,
                storyPoints: 1,
                author: '@ivanov',
                title: ' Настроить деплой',
                description: 'Задеплоить проект на heroku',
                id: 'STICKER-104',
                date: new Date(2019, 1, 2),
                deadline: new Date(2019, 1, 2),
                sprint: '#29. Мартовский код',
                type: 'task',
                link: ['STICKER-101', 'STICKER-102', 'STICKER-103'],
                other: 'Собрать команду DevOps',
                tags: ['Деплой']
            }
        ];
    };

    get isTemplate() {
        return this.state.isTemplate;
    }

    get rawData() {
        if (this.isTemplate) {
            return this.getEmptyTemplate();
        }

        const data = this.props.tasks;

        if (data && data.length) {
            return data;
        }

        return this.getMock();
    }

    formatString = raw => {
        if (Array.isArray(raw)) {
            return raw.join(', ');
        }

        if (raw instanceof Date) {
            return raw.toLocaleDateString();
        }

        return raw;
    };

    get data() {
        const { placement } = this.state;

        return this.rawData.map(source => ({
            headerLeft: this.formatString(source[placement.headerLeft]),
            headerRight: this.formatString(source[placement.headerRight]),
            body: this.formatString(source[placement.body]),
            footerLeft: this.formatString(source[placement.footerLeft]),
            footerRight: this.formatString(source[placement.footerRight])
        }));
    }

    get groupedData() {
        const data = this.data.slice();
        const groupedData = [];

        while (data.length) {
            groupedData.push(data.splice(0, 6));
        }

        return groupedData;
    }

    setPlacement = event => {
        const { target: { name, value } } = event;

        localStorage.setItem(name, value);

        this.setState({ placement: { ...this.state.placement, [name]: value } });
    };

    render() {
        const { placement, lockTemplate } = this.state;

        return (
            <div className={b('', { format: 'a4' })}>
                <Head>
                    <title>Печать</title>
                </Head>
                <header className={b('tools')}>
                    <Button variant="contained" color="secondary" onClick={this.printTemplate}>
                        Распечатать шаблон
                    </Button>
                    {
                        !lockTemplate &&
                        <Button variant="contained" color="primary" onClick={this.printStickers}>
                            Распечатать стикеры
                        </Button>
                    }
                    <br />
                    {
                        !lockTemplate &&
                        <Preview>
                            {
                                Object.keys(placement).map(field => (
                                    <Select
                                        key={field}
                                        onChange={this.setPlacement}
                                        name={field}
                                        value={placement[field]}
                                        >
                                        {this.getFieldList.map(({ key, name }) => (
                                            <MenuItem key={key} value={key}>{name}</MenuItem>
                                        ))}
                                    </Select>
                                ))
                            }
                        </Preview>
                    }
                </header>
                {
                    this.groupedData.map((taskGroup, groupIndex) => (
                        <section
                            key={groupIndex.toString()}
                            className={
                                b('stickers', { isTemplate: this.isTemplate ? 'yes' : 'no' })
                            }
                            >
                            {
                                taskGroup.map((task, index) => (
                                    <Sticker key={index.toString()} sticker={task} />
                                ))}
                        </section>
                    ))
                }
            </div>
        );
    }

    static propTypes = {
        tasks: PropTypes.array
    }
}

function mapStateToProps(state) {
    return {
        tasks: checkedTasksSelector(state)
    };
}

export default connect(mapStateToProps)(PrintPage);
