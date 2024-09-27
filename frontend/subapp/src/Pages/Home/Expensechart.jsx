import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const ExpenseChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("month");
  const [sortedExpenses, setSortedExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("https://subscriptiontrack-1.onrender.com/api/expenses");
        setExpenses(response.data.expenses || []);
        setTotalExpense(response.data.totalExpense || 0);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const sortExpenses = () => {
      let sortedArray = [...expenses];
      switch (sortCriteria) {
        case "month":
          sortedArray.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
          break;
        case "cost":
          sortedArray.sort((a, b) => a.cost - b.cost);
          break;
        case "category":
          sortedArray.sort((a, b) => a.category.localeCompare(b.category));
          break;
        default:
          break;
      }
      setSortedExpenses(sortedArray);
    };
    sortExpenses();
  }, [expenses, sortCriteria]);

  const calculateCategoryBreakdown = () => {
    const breakdown = {};
    sortedExpenses.forEach((expense) => {
      breakdown[expense.category] = (breakdown[expense.category] || 0) + expense.cost;
    });
    return breakdown;
  };

  const categoryBreakdown = calculateCategoryBreakdown();

  if (loading) return <div>Loading...</div>;

  if (sortedExpenses.length === 0) return <div>No expenses found</div>;

  return (
    <div className="Expenses p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Total Expenses Card */}
        <div className="bg-blue-400 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white">Total Expenses</h2>
          <p className="text-3xl font-bold text-white">${totalExpense.toFixed(2)}</p>
          <h3 className="text-lg text-white mt-4">Category Breakdown:</h3>
          <ul className="list-none mt-2">
            {Object.entries(categoryBreakdown).map(([category, cost]) => (
              <li key={category} className="text-white">
                {category}: ${cost.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        {/* Subscriptions Card */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Subscriptions</h2>
          <div className="mb-4">
            <label htmlFor="sortCriteria" className="block mb-2 text-gray-700">Sort By:</label>
            <select
              id="sortCriteria"
              className="border border-gray-300 rounded-md p-2"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="month">Month</option>
              <option value="cost">Cost</option>
              <option value="category">Category</option>
            </select>
          </div>
          <ul className="list-none">
            {sortedExpenses.map((expense, index) => (
              <li key={index} className="text-lg mb-2 text-gray-800">
                {expense.name} - ${expense.cost} ({expense.category})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Animated Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sortedExpenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ExpenseChart;
