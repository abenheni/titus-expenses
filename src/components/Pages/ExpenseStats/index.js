import React, { Component } from 'react';
import { Container, Card, CircularProgress, FormLabel, FormControl, Input } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, ResponsiveContainer } from 'recharts';

import { expenseLogic } from '../ExpenseList/keaListLogic';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class ExpenseStatsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Expenses: [],
            isLoading: true,
            isInitialized: false,
            expenseSum: 0,
            expenseNumber: 0,
            monthExpenseSum: 0,
            monthExpenseNumber: 0,
            currentMonth: '2020-01',
            totalData: [],
            monthlyData: []
        }
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.isLoading===false && this.state.isLoading===true) {
            this.setState({isLoading: false});
            await this.setExpenseList();
            this.initializeData();
        }
    }

    setExpenseList = () => {
        const expenseArray = this.props.Expenses.map((item) => {
            return (item[1]);
        })
        this.setState({Expenses: expenseArray});
        return;
    }

    initializeData = () => {
        this.calculateTotalExpenses();
        this.getTotalChartData();
        this.getMonthlyChartData();
    }

    calculateTotalExpenses = () => {
        let expenseSum = 0, expenseNumber = 0;
        if (this.state.Expenses && this.state.Expenses.length > 0) {
            const expenseArray = this.state.Expenses.map((item) => {
                return item.Amount;
            })
            expenseSum = expenseArray.reduce((a, b) => a+b, 0)
            expenseNumber = expenseArray.length
        }
        this.setState({expenseSum, expenseNumber})
    }

    generateColor () {
        return '#' +  Math.random().toString(16).substr(-6);
      }

    getTotalChartData = () => {
        const currentLineData = [];
        if (this.state.Expenses && this.state.Expenses.length > 0){
            for (let item in this.state.Expenses) {
                const currentItem = {month: '', amount: 0};
                currentItem.month = this.state.Expenses[item].IssuingDate;
                currentItem.amount = this.state.Expenses[item].Amount;
                currentLineData.push(currentItem);
            }
        }
        this.setState({totalData: currentLineData}, () => {
            this.setState({isInitialized: true})
        })
    }

    getMonthlyChartData = () => {
        const currentMonthData = [];
        const monthExpenseArray = [];
        let monthData = [];
        let monthExpenseSum = 0, monthExpenseNumber = 0;
        if (this.state.Expenses && this.state.Expenses.length > 0){
            monthData = this.state.Expenses.filter((item) => {
                if (item.IssuingDate.substr(0,7) === this.state.currentMonth) {
                    return item
                }
            })
        }
        if (monthData && monthData.length > 0) {
            for (let item in monthData) {
                const currentItem = monthData[item];
                const newItem = {month: '', amount: 0};
                newItem.month = currentItem.IssuingDate;
                newItem.amount = currentItem.Amount;
                monthExpenseArray.push(currentItem.Amount);
                currentMonthData.push(newItem);
            }
            monthExpenseSum = monthExpenseArray.reduce((a, b) => a+b);
            monthExpenseNumber = monthExpenseArray.length;
        }
        this.setState({monthExpenseSum, monthExpenseNumber});
        this.setState({monthlyData: currentMonthData});
    }

    getMonthName = () => {
        const monthIndex = this.getMonthNumber() - 1;
        return monthNames[monthIndex]
    }

    getMonthNumber = () => {
        const monthNumber = parseInt(this.state.currentMonth.substr(5,2));
        return monthNumber;
    }

    changeMonth = async (month) => {
        await this.setState({currentMonth: month});
        this.getMonthlyChartData();
    }

    render() {
        return(
            <Container>
            { this.props.isLoading || this.state.isLoading || !this.state.isInitialized ?
                (
                    <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <CircularProgress color='secondary' />
                        <p>Loading..</p>
                    </Card>
                ) :
                (
                [<Card>
                    <p>Expenses sum is {this.state.expenseSum} and the number of expenses is {this.state.expenseNumber}</p>
                    <LineChart width={500} height={300} data={this.state.totalData} >
                        <Line type='monotone' dataKey='amount' stroke='#666666' />
                        <CartesianGrid stroke='#333333' />
                        <XAxis dataKey='month' />
                        <YAxis />
                    </LineChart>
                </Card>,
                <Card>
                    <FormControl>
                        <FormLabel>Select Month</FormLabel>
                        <Input type='month' defaultValue={'2020-01'} onChange={(e) => {this.changeMonth(e.target.value)}}/>
                        <p>Expenses for Month {this.getMonthName()}:</p>
                    </FormControl>
                        <ul>
                            <li><p>Total sum of expenses for this month: {this.state.monthExpenseSum}</p></li>
                            <li><p>Number of expenses for this month: {this.state.monthExpenseNumber}</p></li>
                        </ul>
                        <Card>
                        <ResponsiveContainer width={'100%'} height={300}>
                        <PieChart >
                            <Pie data={this.state.monthlyData} dataKey="amount" cx={300} cy={150} outerRadius={60} fill="#8884d8" label />
                        </PieChart>
                        </ResponsiveContainer>
                        </Card>
                    
                    
                </Card>]
                )
            }
            </Container>
        )
    }
}

export default expenseLogic(ExpenseStatsPage);