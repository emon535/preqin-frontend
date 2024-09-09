import React from "react";
import { Route, Routes } from "react-router-dom";
import InvestorList from "../components/investors/InvestorList";
import InvestorDetail from "../components/investors/InvestorDetail";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<InvestorList />} />
      <Route path="/investor/:id" element={<InvestorDetail />} />
    </Routes>
  );
};

export default AppRoutes;
