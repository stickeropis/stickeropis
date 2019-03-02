import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';

import { classname } from 'helpers/classname';

import './index.scss';
import { filterTasks } from '../../store/reducers/tasks';

import FilterList from './FilterList';
import TasksList from './TasksList';

const b = classname('tasks-page');

class TasksPage extends Component {
    state = {
        filters: []
    };

    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>Задачи</title>
                </Head>
                <FilterList
                    filters={this.state.filters}
                    onChange={this.handleChangeFilter}
                />
                <TasksList tasks={this.filteredTasks} />
                <Link href={`/print`} passHref>
                    <Button variant="contained" color="primary">
                        Далее
                    </Button>
                </Link>
            </div>
        );
    }

    static propTypes = {
        tasks: PropTypes.array
    };

    get filteredTasks() {
        if (this.state.filters.length === 0) {
            return this.props.tasks;
        }

        return filterTasks(Array.from(this.state.filters), this.props.tasks);
    }

    handleChangeFilter = filters => this.setState({ filters });
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.list
    };
}

export default connect(mapStateToProps)(TasksPage);
