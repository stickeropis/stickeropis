import React from 'react';
import { block } from 'bem-cn';
import Link from 'next/link';

import './index.scss';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const b = block('menu');

export default class Menu extends React.Component {
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
