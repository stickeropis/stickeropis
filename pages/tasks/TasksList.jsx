/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';

import withStyles from '@material-ui/core/es/styles/withStyles';

import tasksMock from '../../store/reducers/tasks.types';

import formatValue from './tasks.helpers';

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
    state = {
        checkedRows: new Set([])
    };

    render() {
        if (tasksMock.length === 0) {
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
                            {tasksMock.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell component="th" scope="row">
                                        <Checkbox
                                            checked={this.state.checkedRows.has(
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
        if (tasksMock.length === 0) {
            return false;
        }
        return tasksMock.length === this.state.checkedRows.size;
    }

    handleCheck = (id, checked) => {
        const currentChecked = this.state.checkedRows;
        checked ? currentChecked.add(id) : currentChecked.delete(id);
        this.setState({ checkedRows: currentChecked });
    };

    handleCheckAll = () => {
        const newChecked = this.allChecked
            ? this.state.checkedRows.clear()
            : tasksMock.map(task => task.id);
        this.setState({ checkedRows: new Set(newChecked) });
    };
}

export default TasksList;

const StyledPaper = withStyles({
    root: { overflow: 'auto' }
})(Paper);
