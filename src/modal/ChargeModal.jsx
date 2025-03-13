import { useState } from "react";
import Button from "../components/button/Button";
import Icon from "../components/icon/Icon";
import "./modal.scss";

export default function ChargeModal({ currentCredit, setCredit, onClose }) {
  // const currentCredit = useCredit();
  // const setCredit = useSetCredit();
  const [selected, setSelected] = useState(100);
  const CREDIT_LIST = [100, 500, 1000];

  function handleCharge() {
    setCredit(currentCredit + selected);
    onClose();
  }

  function CreditItem({ credit }) {
    const isChecked = credit === selected;

    function handleSelectCredit(e) {
      e.stopPropagation();
      setSelected(credit);
    }
    return (
      <div
        className={`credit-item ${
          isChecked ? "border-brand-orange" : "border-default"
        } display-flex justify-sides align-center radius-8 px-20 py-18`}
        onClick={() => setSelected(credit)}
      >
        <div className="display-flex align-center gap-4 text-20 text-bold">
          <Icon iconNm="credit" size={16} aria-label="크레딧 아이콘" />
          <span>{credit}</span>
        </div>
        <input
          type="radio"
          name="charge-credit"
          checked={isChecked}
          onChange={handleSelectCredit}
        />
      </div>
    );
  }

  return (
    <div className="modal-wrapper display-flex justify-center align-center">
      <section
        id="charge-modal"
        className="display-grid gap-24 surface-secondary radius-8 pt-24 px-16 pb-32"
      >
        <div className="display-flex justify-sides align-center">
          <h3 className="text-secondary text-18 text-semibold">크레딧 충전하기</h3>
          <button onClick={onClose}>
            <Icon iconNm="close" size={24} alt="크레딧 충전하기 모달 닫기 아이콘" />
          </button>
        </div>
        <div className="display-grid justify-stretch gap-8">
          {CREDIT_LIST.map((credit) => (
            <CreditItem key={`credit-charge-${credit}`} credit={credit} />
          ))}
        </div>
        <Button onClick={handleCharge}>
          <Icon iconNm="credit-white" size={13} aria-label="충전하기 버튼 아이콘 이미지" />
          충전하기
        </Button>
      </section>
    </div>
  );
}
