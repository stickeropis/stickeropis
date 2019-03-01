import React, { Component } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { classname } from 'helpers/classname';

import './index.scss';

const b = classname('menu');

class Menu extends Component {
    render() {
        const items = ['csv'];

        return (
            <List className={b()}>
                {items.map(item => {
                    return (
                        <ListItem key={item}>
                            <Link href={`/${item}-config`}>
                                <Button variant="contained" color="secondary">{item}</Button>
                            </Link>
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}

export default Menu;
