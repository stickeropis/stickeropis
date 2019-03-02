import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';

import { classname } from 'helpers/classname';

import './index.scss';
import { filteredTasksSelector, filtersSelector } from 'store/reducers/tasks';
import { setFilters } from 'store/actions/tasks';

import FilterList from './FilterList';
import TasksList from './TasksList';

const b = classname('tasks-page');

class TasksPage extends Component {
    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>Задачи</title>
                </Head>
                <FilterList
                    /* eslint-disable-next-line */
                    filters={this.props.filters}
                    onChange={this.handleChangeFilter}
                    />
                <TasksList tasks={this.props.tasks} />
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

    handleChangeFilter = filters => {
        // eslint-disable-next-line
        return this.props.setFilters(filters);
    };
}

function mapStateToProps(state) {
    return {
        tasks: filteredTasksSelector(state),
        filters: filtersSelector(state)
    };
}

export default connect(
    mapStateToProps,
    { setFilters }
)(TasksPage);
