import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';

import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import './index.scss';

import { classname } from 'helpers/classname';
import { storeTasks } from 'store/actions/tasks';

import moment from 'moment';

import 'moment/locale/ru';
import MomentUtils from '@date-io/moment';

moment.locale('ru');

const b = classname('form-config-page');

const dateFormat = 'DD.MM.YYYY';

const defaultTask = () => ({
    id: '',
    name: '',
    description: '',
    priority: 1, // 0..10
    cost: 1,
    // date: moment().format(dateFormat)
    date: new Date()
});

const priorityIds = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

const costIds = [
    1, 2, 3, 4, 5
];

const formInputs = [
    {
        id: 'id',
        type: 'text', // Variants: text, multiline, select
        // May also be: choices
        //
        label: 'Идентификатор',
        required: true
    },
    {
        id: 'name',
        type: 'text',
        label: 'Краткое описание',
        required: true
    },
    {
        id: 'description',
        type: 'multiline',
        label: 'Полное описание'
    },
    {
        id: 'priority',
        type: 'select',
        label: 'Приоритет',
        choices: priorityIds
    },
    {
        id: 'cost',
        type: 'select',
        label: 'Сложность',
        choices: costIds
    },
    {
        id: 'date',
        type: 'date',
        label: 'Дата создания'
    }
];

const formatDateLabel = date => {
    const m = moment(date);

    return m.format(dateFormat);
};

class FormConfigPage extends Component {
    _fields = ['id', 'name', 'description', 'priority'];

    constructor(props) {
        super(props);

        const task = { ...defaultTask() };

        this.state = {
            task
        };

        this.storeSingleTask = this.storeSingleTask.bind(this);
    }

    handleChange = name => event => {
        const { state: { task } } = this;
        const value = typeof event.format === 'function' ? event._d : event.target.value;

        this.setState({
            task: {
                ...task,
                [name]: value
            }
        });
    }

    storeSingleTask() {
        const { props: { tasks } } = this;
        const { id, name } = this.state.task;

        const appendTask = task => this.props.storeTasks([
            ...tasks,
            task
        ]);

        const cleanupState = () => {
            const task = { ...defaultTask() };

            this.setState({ task });
        };

        if (id && name) {
            appendTask(this.state.task);
            cleanupState();
        }
    }



    renderForm() {
        const typeMethods = {
            text: ({ id, label, required }) => (
                <FormGroup key={id}>
                    <TextField
                        id={`form-input-${id}`}
                        label={label}
                        margin="normal"
                        required={required}
                        value={this.state.task[id]}
                        onChange={this.handleChange(id)}
                        />
                </FormGroup>
            ),
            multiline: ({ id, label, required }) => (
                <FormGroup key={id}>
                    <TextField
                        id={`form-input-${id}`}
                        label={label}
                        margin="normal"
                        multiline
                        required={required}
                        value={this.state.task[id]}
                        onChange={this.handleChange(id)}
                        />
                </FormGroup>
            ),
            date: ({ id, label, required }) => (
                <FormGroup key={id}>
                    <DatePicker
                        labelFunc={formatDateLabel}
                        value={this.state.task[id]}
                        onChange={this.handleChange(id)}
                        />
                </FormGroup>
            ),
            select: ({ id, label, required, choices }) => (
                <FormGroup key={id}>
                    <InputLabel>{label}</InputLabel>
                    <Select
                        value={this.state.task[id]}
                        label={label}
                        required={required}
                        margin="dense"
                        onChange={this.handleChange(id)}
                        >
                        {
                            choices.map(choice => (
                                <MenuItem key={choice} value={choice}>{choice}</MenuItem>
                            ))
                        }
                    </Select>
                </FormGroup>
            )
        };

        return (
            <form className={b('form')} noValidate autoComplete="off">
                <MuiPickersUtilsProvider utils={MomentUtils} locale="ru" moment={moment}>
                    {formInputs.map(opts => (
                        typeMethods[opts.type](opts)
                    ))}
                </MuiPickersUtilsProvider>

                <Button
                    onClick={this.storeSingleTask}
                    >Добавить задачу
                </Button>

                <Link href="/tasks" passHref>
                    <Button variant="contained" color="primary">Далее</Button>
                </Link>
            </form>
        );
    }

    renderList() {
        const tableItems = formInputs.filter(({ required }) => required);
        const { props: { tasks } } = this;

        return (
            <Table className={b('task-list')}>
                <TableHead>
                    <TableRow>
                        {
                            tableItems.map(({ id, label }) => (
                                <TableCell key={id}>{label}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tasks.map(task => (
                            <TableRow key={task.id}>
                                {
                                    tableItems.map(({ id }) => (
                                        <TableCell key={`${id}-${task.id}`}>
                                            {task[id]}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        );
    }

    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>Вводим содержимое стикера ручками</title>
                </Head>
                <h2 className={b('title')}>Стикер</h2>

                <div>
                    Всего заданий добавлено: {
                        (this.props.tasks && this.props.tasks.length) || 0
                    }
                </div>

                {this.renderForm()}

                {this.renderList()}
            </div>
        );
    }

    static propTypes = {
        tasks: PropTypes.array,
        storeTasks: PropTypes.func
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.list
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        storeTasks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormConfigPage);
