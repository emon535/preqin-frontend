import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchInvestors } from "../../features/investors/investorSlice";
import InvestorListItem from "./InvestorListItem";
import {
  selectInvestorError,
  selectInvestorStatus,
  selectInvestors,
} from "../../features/investors/investorSelectors";

const InvestorList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const investors = useSelector(selectInvestors);
  const status = useSelector(selectInvestorStatus);
  const error = useSelector(selectInvestorError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInvestors());
    }
  }, [dispatch, status]);

  return (
    <div className="flex space-x-4">
      <div className="m-20 border-4 w-full">
        <h1 className="text-2xl font-bold m-4">Investors</h1>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        <InvestorListItem investors={investors} />
      </div>
    </div>
  );
};

export default InvestorList;
