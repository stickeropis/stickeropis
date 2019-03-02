import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import { Headers } from "./TasksList";

class Filter extends React.Component {
    state = {
        key: "",
        type: "",
        value: null,
        values: null,
        from: null,
        to: null
    };

    render() {
        return (
            <FormControl>
                <Select value={this.state.key} onChange={this.handleChangeKey}>
                    {Object.entries(Headers).map(([key, header]) => (
                        <MenuItem key={key} value={key}>
                            {header.caption}
                        </MenuItem>
                    ))}
                </Select>
                {this.renderContol(this.state.key)}
            </FormControl>
        );
    }

    renderContol(key) {
        if (!key) {
            return null;
        }

        switch (Headers[key].type) {
            case "array": {
                return <TextField />;
            }
            case "object": {
                return <TextField />;
            }
            case "string":
            default: {
                return (
                    <TextField
                        value={this.state.value}
                        onChange={this.handleStringFilterChange}
                    />
                );
            }
        }
    }

    handleStringFilterChange = e => {
        this.setState({ value: e.target.value }, () => {
            this.props.onChange(this.state.key, this.state.value);
        });
    };

    handleChangeKey = event => {
        this.setState({ key: event.target.value });
    };
}

export default Filter;
