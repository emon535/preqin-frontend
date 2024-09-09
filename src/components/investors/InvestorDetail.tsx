// components/InvestorDetail.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { fetchInvestorById } from "../../features/investors/investorSlice";
import {
  selectSelectedInvestor,
  selectInvestorStatus,
  selectInvestorError,
} from "../../features/investors/investorSelectors";
import { formatNumber } from "../../utils/formatNumber";
import Commitments from "./Commitments";

const InvestorDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const selectedInvestor = useSelector(selectSelectedInvestor);
  const status = useSelector(selectInvestorStatus);
  const error = useSelector(selectInvestorError);

  useEffect(() => {
    if (id) {
      dispatch(fetchInvestorById(Number(id)));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (error || status === "failed") {
    return (
      <div className="p-4 border border-gray-200 rounded-lg shadow-md m-20">
        <h2 className="text-xl font-semibold mb-4">
          Investor Details Not found
        </h2>
      </div>
    );
  }

  if (!selectedInvestor) {
    return <p>No investor details available.</p>;
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md m-20">
      <h2 className="text-xl font-semibold mb-4">Investor Details</h2>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Attribute
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              ID
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {selectedInvestor.id}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Name
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {selectedInvestor.investor_name}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Type
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {selectedInvestor.investor_type}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Country
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {selectedInvestor.investor_country}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Total Commitments
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatNumber(selectedInvestor.total_commitments)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Use the Commitments component */}
      <Commitments commitments={selectedInvestor.commitments} />
    </div>
  );
};

export default InvestorDetail;
