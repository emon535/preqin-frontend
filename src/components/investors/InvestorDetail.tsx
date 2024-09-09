import React, { useEffect, useState } from "react";
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

const InvestorDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const selectedInvestor = useSelector(selectSelectedInvestor);
  const status = useSelector(selectInvestorStatus);
  const error = useSelector(selectInvestorError);
  const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchInvestorById(Number(id)));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!selectedInvestor) {
    return <p>No investor details available.</p>;
  }

  // Calculate total amounts for each asset class
  const assetClassTotals = selectedInvestor.commitments.reduce(
    (acc, commitment) => {
      if (!acc[commitment.asset_class]) {
        acc[commitment.asset_class] = 0;
      }
      acc[commitment.asset_class] += commitment.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const filteredCommitments = selectedAssetClass
    ? selectedInvestor.commitments.filter(
        (commitment) => commitment.asset_class === selectedAssetClass
      )
    : selectedInvestor.commitments;

  const assetClasses = Object.keys(assetClassTotals);

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
              {selectedInvestor.total_commitments.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="text-lg font-semibold mb-4">Commitments</h1>
      <h3 className="text-xs font-semibold mb-4">Filter by Asset Class</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedAssetClass(null)}
          className={`px-4 py-2 rounded-md shadow-sm text-white font-semibold ${
            selectedAssetClass === null
              ? "bg-blue-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          All
        </button>
        {assetClasses.map((assetClass) => (
          <button
            key={assetClass}
            onClick={() => setSelectedAssetClass(assetClass)}
            className={`px-4 py-2 rounded-md shadow-sm text-white font-semibold ${
              selectedAssetClass === assetClass
                ? "bg-blue-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {assetClass}
            <p className="text-lg font-bold">
              £{formatNumber(assetClassTotals[assetClass])}
            </p>
          </button>
        ))}
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset Class
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Currency
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCommitments.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No commitments
              </td>
            </tr>
          ) : (
            filteredCommitments.map((commitment) => (
              <tr key={commitment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {commitment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {commitment.asset_class}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  £{formatNumber(commitment.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {commitment.currency}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvestorDetail;
