import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Head from 'next/head';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Link from 'next/link';

import fetch from 'cross-fetch';

import { classname } from 'helpers/classname';
import { storeTasks } from 'store/actions/tasks';

import './index.scss';

const b = classname('csv-config-page');

class JiraConfigPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            project: '',
            token: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { target } = event;
        const { name, value } = target;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const { project, token } = this.state;

        const jiraProject = project.length ? project : 'https://stickeropis.atlassian.net';
        const jiraToken = token.length ?
            token : 'a2xpa2tuQHlhbmRleC5ydTpUQVplZWVqOHRBSll1QkhaakFxMzhGN0M';

        const body = JSON.stringify({
            project: jiraProject,
            token: jiraToken
        });

        try {

            const fetchedData = await fetch('/api/jira', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            });

            const tasks = await fetchedData.json();

            this.props.storeTasks(tasks);

        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>Jira конфигурация</title>
                </Head>

                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>

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
                            <Button type="submit" variant="contained" color="primary">
                                Get Tickets
                            </Button>
                        </ListItem>
                    </List>

                    <List>
                        <ListItem>
                            {this.props.tasks.length > 0 && (
                                <Link href="/tasks" passHref>
                                    <Button variant="contained" color="primary">Далее</Button>
                                </Link>
                            )}
                        </ListItem>
                    </List>
                </form>
            </div>
        );
    }

    parseCell = cell => {
        return cell.replace(/^"(.+?)"$/, '$1');
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

export default connect(mapStateToProps, mapDispatchToProps)(JiraConfigPage);
