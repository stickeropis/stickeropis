import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Head from 'next/head';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Link from 'next/link';

import fetch from 'cross-fetch';

import { classname } from 'helpers/classname';
import { storeTasks } from 'store/actions/tasks';

const b = classname('csv-config-page');

class JiraConfigPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            displayName: '',
            emailAddress: '',
            project: '',
            token: ''
        };

        this.fetchProfile = this.fetchProfile.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const project = localStorage.getItem('stickeropis-project');
        const token = localStorage.getItem('stickeropis-token');

        if (project && token) {
            this.fetchProfile(project, token);
        }
    }

    async fetchTasks(event) {
        event.preventDefault();

        const body = JSON.stringify({
            project: localStorage.getItem('stickeropis-project'),
            token: localStorage.getItem('stickeropis-token')
        });

        try {

            const fetchedData = await fetch('/api/jira/tasks', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            });

            const tasks = await fetchedData.json();

            if (Array.isArray(tasks) && tasks.length > 0) {
                this.props.storeTasks(tasks);
            }

        } catch (err) {
            console.log(err);
        }
    }

    /* eslint-disable */
    async fetchProfile(project, token) {

        try {

            const fetchedData = await fetch('/api/jira/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    project: project && project.length ? project : this.state.project,
                    token: token && token.length ? token : this.state.token
                })
            });

            const { displayName, emailAddress } = await fetchedData.json();

            console.log(emailAddress, displayName, project, token)

            if (emailAddress) {
                this.setState({
                    isLogin: true,
                    displayName,
                    emailAddress
                });

                localStorage.setItem('stickeropis-project', project);
                localStorage.setItem('stickeropis-token', token);
            }

        } catch (err) {
            console.log(err);
        }
    }
    /* eslint-enable */

    handleChange(event) {
        const { target } = event;
        const { name, value } = target;

        this.setState({
            [name]: value
        });
    }

    handleAuth() {
        this.fetchProfile(this.state.project, this.state.token);
    }

    /* eslint-disable */
    render() {

        return (
            <div className={b()}>
                <Head>
                    <title>Jira конфигурация</title>
                </Head>

                {this.state.isLogin && (
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Hello {this.state.displayName} ({this.state.emailAddress})!
                            </Typography>
                        </Toolbar>
                    </AppBar>
                )}


                {!this.state.isLogin && (
                    <form noValidate autoComplete="off" onSubmit={this.fetchTasks}>
                        <List>
                            <ListItem>
                                <TextField
                                    name="project"
                                    label="Project"
                                    margin="normal"
                                    value={this.state.project}
                                    onChange={this.handleChange}
                                    />
                            </ListItem>

                            <ListItem>
                                <TextField
                                    name="token"
                                    label="Token"
                                    margin="normal"
                                    value={this.state.token}
                                    onChange={this.handleChange}
                                    />
                            </ListItem>

                            <ListItem>
                                <Link href="https://confluence.atlassian.com/cloud/api-tokens-938839638.html" passHref>
                                    How to get token
                                </Link>
                            </ListItem>
                        </List>
                    </form>
                )}

                <List>
                    {this.state.isLogin && (
                        <ListItem>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={this.fetchTasks}
                                >
                                Get Tickets
                            </Button>
                        </ListItem>
                    )}

                    {!this.state.isLogin && (
                        <ListItem>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleAuth}
                                >
                                Auth
                            </Button>
                        </ListItem>
                    )}

                    <ListItem>
                        {this.props.tasks.length > 0 && (
                            <Link href="/tasks" passHref>
                                <Button variant="contained" color="primary">Далее</Button>
                            </Link>
                        )}
                    </ListItem>
                </List>
            </div>
        );
    }
    /* eslint-enable */

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

export default connect(mapStateToProps, mapDispatchToProps)(JiraConfigPage);
