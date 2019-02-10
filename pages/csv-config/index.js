import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { storeTasks } from 'store/actions/tasks';

import Link from 'next/link';

import { block } from 'bem-cn';
import Head from 'next/head';

import CsvInput from 'components/csv-input';

import './index.scss';

const b = block('csv-config-page');

class CsvConfigPage extends React.Component {
    _fields = ['id', 'name', 'description', 'cost']

    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>CSV конфигурация</title>
                </Head>
                <h2 className={b('title')}>Выберите файл:</h2>
                <CsvInput onChange={this._onFileChange} />
                {this.props.tasks.length > 0 && (
                    <Link href={`/tasks`}>
                        <a>Далее</a>
                    </Link>
                )}
            </div>
        );
    }

    _onFileChange = csv => {
        const tasks = this._parseCsv(csv);

        this.props.storeTasks(tasks);
    }

    _parseCsv = csv => {
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

                        rowData[field] = this._parseCell(cell);

                        return rowData;
                    }, {});
            })
            .filter(Boolean);
    }

    _parseCell = cell => {
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
