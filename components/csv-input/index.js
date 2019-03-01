import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { cn } from '../../helpers/classname';

import './index.scss';

const b = cn('csv-input');

export default class CsvInput extends React.Component {
    input = createRef('input')

    render() {
        return (
            <div className={b()}>
                <input
                    accept=".csv"
                    id={b('input')}
                    className={b('input')}
                    type="file"
                    onChange={this.onChange}
                    ref={this.input}
                    />
                <label htmlFor={b('input')}>
                    <Button variant="contained" component="span" color="secondary">
                        Загрузить файл
                    </Button>
                </label>
            </div>
        );
    }

    onChange = () => {
        const reader = new FileReader();

        reader.readAsText(this.input.current.files[0]);
        reader.addEventListener('loadend', () => {
            this.props.onChange(reader.result);
        });
    }

    static propTypes = {
        onChange: PropTypes.func
    }
}
