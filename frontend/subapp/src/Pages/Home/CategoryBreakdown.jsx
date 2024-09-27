import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CategoryBreakdown = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("https://subscriptiontrack-1.onrender.com/api/expenses");
        setExpenses(response.data.expenses || []);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const calculateCategoryBreakdown = () => {
    const breakdown = {};
    expenses.forEach((expense) => {
      breakdown[expense.category] = (breakdown[expense.category] || 0) + expense.cost;
    });

    return Object.entries(breakdown).map(([category, cost]) => ({
      name: category,
      value: cost,
    }));
  };

  const categoryData = calculateCategoryBreakdown();

  if (loading) return <div>Loading...</div>;
  if (categoryData.length === 0) return <div>No expenses found</div>;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

  return (
    <div className="mt-22shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBreakdown;
