import axios from 'axios';

const fakeData = {"Expenses": {}}

export function putJson(url, data) {
    axios.put(url, data);
}