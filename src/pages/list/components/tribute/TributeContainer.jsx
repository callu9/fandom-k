import { useState } from "react";
import { getDonations } from "../../../../api/donations";
import Icon from "../../../../components/icon/Icon";
import useAsync from "../../../../hooks/useAsync";
import "./tribute.scss";
import TributeListItem from "./TributeListItem";
import TributeSkeleton from "./TributeSkeleton";

export default function TributeContainer() {
  const [cursor, setCursor] = useState([0]);
  const {
    loading,
    value: donations,
    setValue,
  } = useAsync(() => getDonations(cursor[0], 4), [cursor[0]]);

  function handleContributeDonation(idx, amount) {
    const list = donations.list || [];
    if (idx >= list.length) return;
    const value = list[idx];
    setValue({
      ...donations,
      list: [
        ...list.slice(0, idx),
        { ...value, receivedDonations: amount + value.receivedDonations },
        ...list.slice(idx + 1),
      ],
    });
  }
  return (
    <section className="display-grid justify-stretch gap-32" id="tribute-container">
      <h2 className="text-24">후원을 기다리는 조공</h2>
      <div className="display-flex justify-left align-center" id="tribute-list">
        <button id="btn-left" disabled={cursor[0] === 0} onClick={() => setCursor(cursor.slice(1))}>
          <Icon iconNm="button-left" size={40} />
        </button>
        <ul className="display-flex justify-stretch gap-24" id="tribute-box">
          {loading || donations?.list?.length === 0
            ? new Array(4).fill().map((_, idx) => <TributeSkeleton key={idx} />)
            : donations?.list?.map((donation, idx) => (
                <TributeListItem
                  key={donation.id}
                  {...donation}
                  onAmountChange={(amount) => handleContributeDonation(idx, amount)}
                />
              ))}
        </ul>
        <button
          id="btn-right"
          disabled={donations?.nextCursor === null}
          onClick={() => setCursor([donations.nexCursor, ...cursor])}
        >
          <Icon iconNm="button-right" size={40} />
        </button>
      </div>
    </section>
  );
}
