/* eslint-disable */
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { Headers } from './TasksList';

class Filter extends React.Component {
    render() {
        const [key, value] = Object.entries(this.props.value[1])[0];
        return (
            <FormControl>
                <Select value={key} onChange={this.handleChangeKey}>
                    {Object.entries(Headers).map(([key, header]) => (
                        <MenuItem key={key} value={key}>
                            {header.caption}
                        </MenuItem>
                    ))}
                </Select>
                {this.renderControl(key, value)}
            </FormControl>
        );
    }

    renderControl(key, value) {
        if (!key) {
            return null;
        }
        if (!Headers[key]) {
            return null;
        }

        switch (Headers[key].type) {
            case 'array': {
                return <TextField />;
            }
            case 'object': {
                return <TextField />;
            }
            case 'string':
            default: {
                return (
                    <TextField
                        value={value}
                        onChange={this.handleStringFilterChange(key)}
                    />
                );
            }
        }
    }

    handleStringFilterChange = key => e => {
        this.props.onChange(key, e.target.value);
    };

    handleChangeKey = event => {
        this.props.onChange(event.target.value, '');
    };
}

export default Filter;
