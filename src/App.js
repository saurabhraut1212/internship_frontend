import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TransactionTable from './components/TransactionTable';
import MonthDropDown from './components/MonthDropDown';
import SearchBox from './components/SearchBox';
import Pagination from './components/Pagination';
import Statistics from './components/Statistics';
import TransactionsChart from './components/TransactionChart';

import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [transactionChart, setTransactionChart] = useState([]);
  const [month, setMonth] = useState(3);
  const [year, setYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndPaginateData();
  }, [month, year, searchTerm, page]);

  useEffect(() => {
    fetchStatistics();
    fetchBarChartData();
  }, [month, year]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getAllData');
      const allTransactions = response.data.data;
      setAllTransactions(allTransactions);
      filterAndPaginateData(allTransactions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterAndPaginateData = (transactionsToFilter = allTransactions) => {
    let filteredTransactions = transactionsToFilter;


    if (month && year) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.dateOfSale);
        const transactionMonth = transactionDate.getMonth() + 1;
        const transactionYear = transactionDate.getFullYear();
        return transactionMonth === month && transactionYear === year;
      });
    }


    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);


    if (searchTerm) {
      paginatedTransactions = paginatedTransactions.filter((transaction) =>
        transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setTransactions(paginatedTransactions);
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getStatistics?month=${month}&year=${year}`
      );
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getBarChartData?month=${month}`
      );
      setTransactionChart(response.data.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
    setPage(1);
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const hasNextPage = transactions.length > 0 && transactions.length === 10;

  return (
    <div className="container">
      <h1>Transactions Dashboard</h1>
      <div className="filters">
        <MonthDropDown value={month} onChange={handleMonthChange} />
        <input
          type="number"
          value={year}
          onChange={handleYearChange}
          placeholder="Enter year"
          className="year-input"
        />
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
      </div>
      <TransactionTable transactions={transactions} />
      <Pagination page={page} onPageChange={handlePageChange} hasNextPage={hasNextPage} />
      <div className="statistics-container">
        <Statistics statistics={statistics} />
        <TransactionsChart transactionChart={transactionChart} />
      </div>
    </div>
  );
};

export default App;
