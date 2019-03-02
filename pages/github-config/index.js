import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';

import GitHubInput from 'components/github-input';
import { classname } from 'helpers/classname';
import { storeTasks } from 'store/actions/tasks';
import './index.scss';

const b = classname('github-config-page');

class GitHubConfigPage extends Component {
    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>GitHub конфигурация</title>
                </Head>
                <GitHubInput onChange={this.onChange} />
            </div>
        );
    }

    onChange = data => {
        const tasks = data;

        this.props.storeTasks(tasks);
    };

    static propTypes = {
        storeTasks: PropTypes.func
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(GitHubConfigPage);
