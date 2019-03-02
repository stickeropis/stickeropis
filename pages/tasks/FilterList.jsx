import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Filter from './Filter';

class FilterList extends Component {
    render() {
        return (
            <>
                <div>Фильтр</div>
                <Button onClick={this.handleAddFilter}>
                    + Добавить фильтр
                </Button>
                <div>
                    {Array.from(this.props.filters).map(filter => (
                        <>
                            <Filter onChangeFilter={this.handleChangeFilter} />
                            <Button
                                onClick={() =>
                                    this.handleRemoveFilter(filter[0])
                                }>
                                X
                            </Button>
                        </>
                    ))}
                </div>
            </>
        );
    }

    handleAddFilter = () => {
        const filters = new Map(this.props.filters);
        const id = Number(Date.now());

        filters.set(id, { id });
        this.props.onChange(filters);
    };

    handleRemoveFilter = filterId => {
        const filters = new Map(this.props.filters);

        filters.delete(filterId);
        this.props.onChange(filters);
    };

    handleChange = () => {
        // todo
    };
}

export default FilterList;
