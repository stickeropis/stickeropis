import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { block } from 'bem-cn';

const b = block('csv-input');

export default class CsvInput extends React.Component {
    _input = createRef('input')

    render() {
        return (
            <div className={b()}>
                <input
                    accept=".csv"
                    className={b('input')}
                    type="file"
                    onChange={this._onChange}
                    ref={this._input}
                    />
            </div>
        );
    }

    _onChange = () => {
        const reader = new FileReader();

        reader.readAsText(this._input.current.files[0]);
        reader.addEventListener('loadend', () => {
            this.props.onChange(reader.result);
        });
    }

    static propTypes = {
        onChange: PropTypes.func
    }
}
