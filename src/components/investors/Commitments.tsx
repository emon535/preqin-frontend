import React, { useState } from "react";
import { formatNumber } from "../../utils/formatNumber";
import { Commitment } from "../../types/investorType";

interface CommitmentsProps {
  commitments: Commitment[];
}

const Commitments: React.FC<CommitmentsProps> = ({ commitments }) => {
  const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(
    null
  );

  // Calculate total amounts for each asset class
  const assetClassTotals = commitments.reduce((acc, commitment) => {
    if (!acc[commitment.asset_class]) {
      acc[commitment.asset_class] = 0;
    }
    acc[commitment.asset_class] += commitment.amount;
    return acc;
  }, {} as Record<string, number>);

  const filteredCommitments = selectedAssetClass
    ? commitments.filter(
        (commitment) => commitment.asset_class === selectedAssetClass
      )
    : commitments;

  const assetClasses = Object.keys(assetClassTotals);

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md ">
      <h1 className="text-lg font-semibold mb-4">Commitments</h1>
      <h3 className="text-xs font-semibold mb-4">Filter by Asset Class</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedAssetClass(null)}
          className={`px-4 py-2 rounded-md shadow-sm text-white font-thin ${
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
            className={`px-4 py-2 rounded-md shadow-sm text-white font-normal ${
              selectedAssetClass === assetClass
                ? "bg-blue-900"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {assetClass}
            <p className="text-lg font-normal">
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

export default Commitments;
