/* eslint-disable */
import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import Filter from "./Filter";

class FilterList extends Component {
    render() {
        return (
            <>
                <div>Фильтр</div>
                <Button onClick={this.handleAddFilter}>
                    + Добавить фильтр
                </Button>
                <div>
                    {Array.from(this.props.filters).map(filter => {
                        const handleClick = () =>
                            this.handleRemoveFilter(filter[0]);

                        return (
                            <>
                                <Filter
                                    onChange={this.handleChange(filter[0])}
                                />
                                <Button onClick={handleClick}>X</Button>
                            </>
                        );
                    })}
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

    handleChange = id => (key, value) => {
        const filters = new Map(this.props.filters);
        filters.set(id, { [key]: value });
        this.props.onChange(filters);
    };
}

export default FilterList;
