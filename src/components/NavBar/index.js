import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

import { Drawer } from '@material-ui/core';

import styles from './styles.module.css';

export default class NavBar extends Component {
    render() {
        return(
            <div className={styles.Container}>
            <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
                <li className={styles.listItem} key='list'>
                    <Link to='/expenselist'>
                        <p className={styles.listText}>Expenses List</p>
                    </Link>
                </li>
                <li className={styles.listItem} key='stats'>
                    <Link to='/expensestats'>
                        <p className={styles.listText}>Expenses Statistics</p>
                    </Link>
                </li>
                <li className={styles.listItem} key='Add'>
                    <Link to='/expense/add'>
                        <p className={styles.listText}>Add Expense</p>
                    </Link>
                </li>
            </ul>
            </div>
        )
    }
}
