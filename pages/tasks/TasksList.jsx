/* eslint-disable */
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';

import withStyles from '@material-ui/core/es/styles/withStyles';

import { setCheckedTasks } from '../../store/actions/tasks';
import formatValue from './tasks.helpers';
import { connect } from 'react-redux';
import {
    checkedTaskIdsSelector,
    filteredTasksSelector
} from '../../store/reducers/tasks';

export const Headers = {
    id: { caption: 'ID', type: 'string' },
    title: { caption: 'Название', type: 'string' },
    description: { caption: 'Описание', type: 'string' },
    author: { caption: 'Автор', type: 'string' },
    priority: { caption: 'Приоритет', type: 'string' },
    storyPoints: { caption: 'Стоимость', type: 'string' },
    date: { caption: 'Дата', type: 'object' },
    deadline: { caption: 'Дедлайн', type: 'object' },
    sprint: { caption: 'Спринт', type: 'string' },
    type: { caption: 'Тип', type: 'string' },
    tags: { caption: 'Теги', type: 'array' }
};

class TasksList extends Component {

    render() {
        if (this.props.tasks.length === 0) {
            return null;
        }

        return (
            <>
                <div>Список задач</div>
                <StyledPaper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        checked={this.allChecked}
                                        onChange={this.handleCheckAll}
                                    />
                                </TableCell>
                                {Object.values(Headers).map(header => (
                                    <TableCell
                                        key={header.caption}
                                        align="left">
                                        {header.caption}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.tasks.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell component="th" scope="row">
                                        <Checkbox
                                            checked={this.props.checkedRows.has(
                                                task.id
                                            )}
                                            onChange={(_, checked) =>
                                                this.handleCheck(
                                                    task.id,
                                                    checked
                                                )
                                            }
                                        />
                                    </TableCell>
                                    {Object.keys(Headers).map(header => (
                                        <TableCell
                                            key={header.caption}
                                            align="left">
                                            {formatValue(task[header])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledPaper>
            </>
        );
    }

    get allChecked() {
        if (this.props.tasks.length === 0) {
            return false;
        }

        return this.props.tasks.length === this.props.checkedRows.size;
    }

    handleCheck = (id, checked) => {
        const currentChecked = new Set(this.props.checkedRows);

        if (checked) {
            currentChecked.add(id);
        } else {
            currentChecked.delete(id);
        }
        this.props.setCheckedTasks(currentChecked);
    };

    handleCheckAll = () => {
        const newChecked = this.allChecked
            ? []
            : this.props.tasks.map(task => task.id);

        this.props.setCheckedTasks(new Set(newChecked));
    };
}
const mapStateToProps = state => {
    return {
        checkedRows: checkedTaskIdsSelector(state),
        tasks: filteredTasksSelector(state)
    };
};

export default connect(
    mapStateToProps,
    { setCheckedTasks }
)(TasksList);

const StyledPaper = withStyles({
    root: { overflow: 'auto' }
})(Paper);
