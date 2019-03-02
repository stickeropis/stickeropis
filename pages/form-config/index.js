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

class FormConfigPage extends Component {
    _fields = ['id', 'name', 'description', 'priority'];

    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: '',
                name: '',
                description: '',
                priority: 0 // 0..10
            }
        };

        this.storeTask = this.storeTask.bind(this);
    }

    storeTask() {
        this.props.storeTasks([
            this.state.task
        ]);
    }

    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>Вводим содержимое стикера ручками</title>
                </Head>
                <h2 className={b('title')}>Стикер</h2>

                <div>
                    Всего заданий добавлено: {this.props.tasks.length}
                </div>

                <form className={b('form')} noValidate autoComplete="off">
                    <FormGroup>
                        <TextField
                            id="form-input-id"
                            label="Идентификатор"
                            margin="normal"
                            value={this.state.task.id}
                            />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                            id="form-input-name"
                            label="Краткое наименование"
                            margin="normal"
                            value={this.state.task.name}
                            />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                            id="form-input-description"
                            label="Полное наименование"
                            margin="normal"
                            multiline
                            value={this.state.description}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Select
                            margin="normal"
                            value={this.state.task.priority}
                            label="Приоритет"
                            >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormGroup>


                    <Button
                        onClick={this.storeTask()}
                        >Добавить задачу
                    </Button>

                    <Link href="/tasks" passHref>
                        <Button variant="contained" color="primary">Далее</Button>
                    </Link>
                </form>
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
        // TODO
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        storeTasks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormConfigPage);
