import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';

import CsvInput from 'components/csv-input';
import { classname } from 'helpers/classname';
import { storeTasks } from 'store/actions/tasks';

import './index.scss';

const b = classname('csv-config-page');

class CsvConfigPage extends Component {
    _fields = ['id', 'name', 'description', 'cost']

    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>CSV конфигурация</title>
                </Head>
                <h2 className={b('title')}>Выберите файл:</h2>
                <CsvInput onChange={this.onFileChange} />
                {this.props.tasks.length > 0 && (
                    <Link href="/tasks">
                        <Button variant="contained" color="primary">Далее</Button>
                    </Link>
                )}
            </div>
        );
    }

    onFileChange = csv => {
        const tasks = this.parseCsv(csv);

        this.props.storeTasks(tasks);
    }

    parseCsv = csv => {
        return csv
            .split('\n')
            .map(row => {
                if (!row) {
                    return null;
                }

                return row
                    .split(',')
                    .slice(0, this._fields.length)
                    .reduce((rowData, cell, index) => {
                        const field = this._fields[index];

                        rowData[field] = this.parseCell(cell);

                        return rowData;
                    }, {});
            })
            .filter(Boolean);
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

export default connect(mapStateToProps, mapDispatchToProps)(CsvConfigPage);
