import React, { Component } from 'react';
import { Container, Card, CircularProgress } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

import { expenseLogic } from '../ExpenseList/keaListLogic';
import firebase from '../../Firebase';

const database = firebase.database();

class ExpenseStatsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Expenses: [],
            isLoading: true,
            expenseSum: 0,
            expenseNumber: 0
        }

        this.doughnutData = {
            datasets: [{
                data: [],
                backgroundColor: []
            }],

            labels: []
        }
    }

    componentDidMount() {
        database.ref('/Expenses').once('value').then((snapshot) => {
            this.props.actions.setExpenses(snapshot.val());
        });
        this.calculateStats();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoading===false && this.state.isLoading===true) {
            this.setState({isLoading: false});
            this.calculateStats();
        }
    }

    calculateStats = () => {
        const totalExpenses = this.calculateTotalExpenses();
    }

    calculateTotalExpenses = () => {
        const expenseArray = this.props.Expenses.map((item) => {
            return (item[1].Amount);
        })
        const expenseSum = expenseArray.reduce((a, b) => a+b, 0)
        const expenseNumber = expenseArray.length
        const pieData = this.getPieData();
        this.setState({expenseSum, expenseNumber, pieData})
    }

    generateColor () {
        return '#' +  Math.random().toString(16).substr(-6);
      }

    getPieData = () => {
        const expenseData = this.props.Expenses.map((item) => {
            return (item[1]);
        })
        const pieData = expenseData.map((item) => {
            this.doughnutData.datasets[0].data.push(item.Amount);
            this.doughnutData.datasets[0].backgroundColor.push(this.generateColor());
            this.doughnutData.labels.push(item.Description);
            return;
        })
        return pieData;
    }

    render() {
        return(
            <Container>
            { this.props.isLoading ?
                (
                    <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <CircularProgress color='secondary' />
                        <p>Loading..</p>
                    </Card>
                ) :
                (
                <Card>
                    <p>Expenses sum is {this.state.expenseSum} and the number of expenses is {this.state.expenseNumber}</p>
                    <Doughnut data={this.doughnutData} />
                </Card>
                )
            }
            </Container>
        )
    }
}

export default expenseLogic(ExpenseStatsPage);