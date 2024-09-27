import React from "react";
import ExpenseChart from "./Expensechart.jsx";
import Sidebar from "./Navbar.jsx";
import Header from "./Header.jsx";
import CategoryBreakdown from "./CategoryBreakdown.jsx";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-56 bg-white shadow-md">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col p-2 md:p-10 bg-gray-100">
        <Header />
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <ExpenseChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
