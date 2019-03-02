import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import { classname } from 'helpers/classname';

import './index.scss';
import TextField from '@material-ui/core/TextField/TextField';
import IssuesExtractor from 'pages/github-config/issues-exctractor';
import PropTypes from 'prop-types';
import Link from 'next/link';

const b = classname('github-input');

class GitHubInput extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            owner: '',
            repositoryName: ''
        };
    }

    submit = () => {
        const { token, owner, repositoryName } = this.state;

        new IssuesExtractor()
            .extract(token, owner, repositoryName)
            .then(this.props.onChange);
    }

    handleToken = event => {
        this.setState({ 'token': event.target.value });
    }

    handleOwner = event => {
        this.setState({ 'owner': event.target.value });
    }

    handleName = event => {
        this.setState({ 'repositoryName': event.target.value });
    }

    render() {
        return (
            <div className={b()}>
                <TextField
                    label="Token"
                    type="text"
                    name="tokenInput"
                    data-validators="isRequired"
                    onChange={this.handleToken}
                    />
                <br />
                <TextField
                    label="Repository Owner"
                    type="text"
                    name="ownerInput"
                    data-validators="isRequired"
                    onChange={this.handleOwner}
                    />
                <br />
                <TextField
                    label="Repository Name"
                    type="text"
                    name="repositoryInput"
                    data-validators="isRequired"
                    onChange={this.handleName}
                    />
                <br />
                <Link href="/tasks" passHref>
                    <Button variant="contained" onClick={this.submit}>Далее</Button>
                </Link>
            </div>
        );
    }
}

GitHubInput.propTypes = {
    onChange: PropTypes.func
};

export default GitHubInput;
