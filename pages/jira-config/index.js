import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Head from 'next/head';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import Router from 'next/router';
import Link from 'next/link';

import fetch from 'cross-fetch';
import { Base64 } from 'js-base64';

import { storeTasks } from 'store/actions/tasks';

import './index.scss';

const LOCALSTORAGE_PROJECT_KEY = 'stickeropis-project';
const LOCALSTORAGE_ACCESS_TOKEN_KEY = 'stickeropis-access-token';

const Loading = () => (
    <div className="jira-config__loader">
        <CircularProgress />
    </div>
);

const Profile = (displayName, emailAddress, handleTasksUpdateActionCall) => (
    <Grid container spacing={24}>
        <Grid item xs={12}>
            User: {displayName} ({emailAddress})
        </Grid>
        <Grid item xs={12}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleTasksUpdateActionCall}
                >
                Get Tickets
            </Button>
        </Grid>
    </Grid>
);

const Form = (values, handleInputChange, handleSubmit) => {
    const { project, email, token } = values;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        name="project"
                        label="Project"
                        margin="normal"
                        value={project}
                        onChange={handleInputChange}
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        label="Email"
                        margin="normal"
                        value={email}
                        onChange={handleInputChange}
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="token"
                        label="Token"
                        margin="normal"
                        value={token}
                        onChange={handleInputChange}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Link href="https://id.atlassian.com/manage/api-tokens" passHref>
                        <a target="_blank">Create token in your Jira account</a>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading="true"
                        >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

class JiraConfigPage extends Component {

    state = {
        ui: {
            isPageLoading: true,
            isLogin: false
        },
        form: {
            project: '',
            token: '',
            email: ''
        },
        filter: {

        },
        profile: {
            displayName: '',
            emailAddress: ''
        }
    };

    async componentDidMount() {
        const project = localStorage.getItem(LOCALSTORAGE_PROJECT_KEY);
        const accessToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);

        if (!project || !accessToken) {
            this.setPageLoadingState(false);

            return;
        }

        try {
            const data = await this.fetchProfile(project, accessToken);

            this.handleLoginEvent(data);
        } catch (err) {
            console.log(err);
        } finally {
            this.setPageLoadingState(false);
        }
    }

    setPageLoadingState = value => {
        this.setState({ ui: { ...this.state.ui, isPageLoading: value } });
    }

    setLocalStorageData = ({ project, accessToken }) => {
        localStorage.setItem(LOCALSTORAGE_PROJECT_KEY, project);
        localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_KEY, accessToken);
    }

    setStateProfile = ({ displayName, emailAddress }) => {
        this.setState({
            profile: {
                ...this.state.data,
                displayName,
                emailAddress
            }
        });
    }

    handleInputChange = event => {
        const { target } = event;
        const { name, value } = target;

        this.setState({
            form: { ...this.state.form, [name]: value }
        });
    }

    handleLoginEvent = profileData => {
        this.setStateProfile(profileData);
        this.setState({ ui: { ...this.state.ui, isLogin: true } });
    }

    handleAuthActionCall = async event => {
        event.preventDefault();

        try {
            const { project, email, token } = this.state.form;
            const accessToken = Base64.encode(`${email}:${token}`);

            const data = await this.fetchProfile(project, accessToken);

            this.setStateProfile(data);
            this.setLocalStorageData({ project, accessToken });
            this.setState({ ui: { ...this.state.ui, isLogin: true } });

        } catch (err) {
            console.log(err);
        }
    }

    handleTasksUpdateActionCall = async event => {
        event.preventDefault();

        try {
            this.setState({ ui: { ...this.state.ui, isTasksLoading: true } });
            const project = localStorage.getItem(LOCALSTORAGE_PROJECT_KEY);
            const accessToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);

            const tasks = await this.fetchTasks(project, accessToken);

            if (Array.isArray(tasks) && tasks.length > 0) {
                this.props.storeTasks(tasks);
                Router.push('/tasks');
            }

        } catch (err) {
            console.log(err);
        }
    }

    fetchData = async ({ url, body }) => {
        try {
            const fetchedData = await fetch(url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            });

            const data = await fetchedData.json();

            return data;

        } catch (err) {
            throw new Error(err);
        }
    };

    fetchProfile = async (project, accessToken) => {
        try {
            const data = await this.fetchData({
                url: '/api/jira/auth',
                body: JSON.stringify({
                    project,
                    accessToken
                })
            });

            return data;
        } catch (err) {
            console.log(err);
        }
    }

    async fetchTasks(project, accessToken, params) {
        try {
            const tasks = await this.fetchData({
                url: '/api/jira/tasks',
                body: JSON.stringify({
                    project,
                    accessToken,
                    params
                })
            });

            return tasks;

        } catch (err) {
            console.log(err);
        }
    }

    render() {

        const {
            ui: {
                isPageLoading,
                isLogin
            },
            form: { project, email, token },
            profile: { displayName, emailAddress }
        } = this.state;

        if (isPageLoading) {
            return (
                <div className="jira-config">
                    <Head>
                        <title>Loading</title>
                    </Head>

                    {Loading()}
                </div>
            );
        }

        return (
            <div className="jira-config">
                <Head>
                    <title>Jira конфигурация</title>
                </Head>

                {isLogin &&
                    Profile(displayName,
                        emailAddress,
                        this.handleTasksUpdateActionCall)}

                {!isLogin &&
                    Form({ project, email, token },
                        this.handleInputChange,
                        this.handleAuthActionCall)}
            </div>
        );
    }

    static propTypes = {
        storeTasks: PropTypes.func
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        storeTasks
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(JiraConfigPage);
