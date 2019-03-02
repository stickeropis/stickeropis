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

import './index.scss';

import { classname } from 'helpers/classname';
import { storeTasks } from 'store/actions/tasks';

const b = classname('form-config-page');

const defaultTask = {
    id: '',
    name: '',
    description: '',
    priority: 1 // 0..10
};

const priorityIds = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

const formInputs = [
    {
        id: 'id',
        type: 'text', // text, multiline, select
        // choices
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
    }
];

class FormConfigPage extends Component {
    _fields = ['id', 'name', 'description', 'priority'];

    constructor(props) {
        super(props);

        const task = { ...defaultTask };

        this.state = {
            task
        };

        this.storeSingleTask = this.storeSingleTask.bind(this);
    }

    handleChange = name => event => {
        const { state: { task } } = this;

        this.setState({
            task: {
                ...task,
                [name]: event.target.value
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
            const task = { ...defaultTask };

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
                <TextField
                    id={`form-input-${id}`}
                    label={label}
                    margin="normal"
                    required={required}
                    value={this.state.task[id]}
                    onChange={this.handleChange(id)}
                    />
            ),
            multiline: ({ id, label, required }) => (
                <TextField
                    id={`form-input-${id}`}
                    label={label}
                    margin="normal"
                    multiline
                    required={required}
                    value={this.state.task[id]}
                    onChange={this.handleChange(id)}
                    />
            ),
            select: ({ id, label, required, choices }) => (
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
            )
        };

        return (
            <form className={b('form')} noValidate autoComplete="off">
                {formInputs.map(opts => (
                    <FormGroup key={opts.id}>
                        {typeMethods[opts.type](opts)}
                    </FormGroup>
                ))}

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
