import React from "react";
import { Link } from "react-router-dom";
import { InvestorType } from "../../types/investorType";
import { format as formatDate } from "date-fns";

interface InvestorListItemProps {
  investors: InvestorType[];
}

const formatLocalDate = (dateString: string) => {
  const date = new Date(dateString);
  return formatDate(date, "MMMM do, yyyy");
};

const InvestorListItem: React.FC<InvestorListItemProps> = ({ investors }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-tight">
            ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date Added
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Address
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total Commitment
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {investors.map((investor) => (
          <tr key={investor.id} className="hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-2">
              <Link
                to={`/investor/${investor.id}`}
                className="text-blue-600 hover:underline"
              >
                {investor.id}
              </Link>
            </td>
            <td className="px-6 py-2">
              <Link
                to={`/investor/${investor.id}`}
                className="text-blue-600 hover:underline"
              >
                {investor.investor_name}
              </Link>
            </td>
            <td className="px-6 py-2">{investor.investor_type}</td>
            <td className="px-6 py-2">
              {formatLocalDate(investor.investor_date_added)}
            </td>
            <td className="px-6 py-2">{investor.investor_country}</td>
            <td className="px-6 py-2">{investor.total_commitments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvestorListItem;
