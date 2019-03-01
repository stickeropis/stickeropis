import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';

import { classname } from 'helpers/classname';

import './index.scss';

const b = classname('tasks-page');

class TasksPage extends Component {
    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>Задачи</title>
                </Head>
                {this.props.tasks.map(task => (
                    <div className={b('task')} key={task.id}>
                        {JSON.stringify(task)}
                    </div>
                ))}
                <Link href={`/print`} passHref>
                    <Button variant="contained" color="primary">Далее</Button>
                </Link>
            </div>
        );
    }

    static propTypes = {
        tasks: PropTypes.array
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.list
    };
}

export default connect(mapStateToProps)(TasksPage);
