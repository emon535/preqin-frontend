import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { setCommitments } from "../../features/commitments/commitmentSlice";

const CommitmentList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const commitments = useSelector((state: RootState) => state.commitments.list);
  const selectedInvestor = useSelector(
    (state: RootState) => state.investors.selectedInvestor
  );

  useEffect(() => {
    if (selectedInvestor) {
      // Simulate fetching commitments data based on the selected investor
      const fetchCommitments = async () => {
        const response = await fetch(
          `/api/commitments?investorId=${selectedInvestor.id}`
        );
        const data = await response.json();
        dispatch(setCommitments(data));
      };

      fetchCommitments();
    }
  }, [selectedInvestor, dispatch]);

  return (
    <div>
      <h2>Commitments</h2>
      {selectedInvestor ? (
        <ul>
          {commitments.map((commitment) => (
            <li key={commitment.id}>
              {commitment.assetClass}: {commitment.amount} GBP
            </li>
          ))}
        </ul>
      ) : (
        <p>Select an investor to view commitments.</p>
      )}
    </div>
  );
};

export default CommitmentList;
