import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';

import { cn } from 'helpers/classname';

import './index.scss';

const b = cn('print-page');

class PrintPage extends React.Component {
    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>Печать</title>
                </Head>
                {this.props.tasks.map(task => (
                    <div className={b('task')} key={task.id}>
                        {JSON.stringify(task)}
                    </div>
                ))}
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

export default connect(mapStateToProps)(PrintPage);
