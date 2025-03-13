import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Icon from "../components/icon/Icon";
import { useCredit, useSetCredit, useSetModal } from "../contexts/GlobalContext";
import "./modal.scss";
import { contributeDonation } from "../api/donations";

const TributeModal = ({ id, mainTitle, subtitle, idol, onAmountChange, onClose }) => {
  const setModal = useSetModal();
  const credit = useCredit();
  const setCredit = useSetCredit();

  const [inputValue, setInputValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const isButtonDisabled = Number(inputValue || 0) <= 0 || Number(inputValue || 0) > credit;

  useEffect(() => {
    const value = Number(inputValue);
    if (isNaN(value) || value <= 0) return;
    if (credit < value) {
      setErrMsg("갖고 있는 크레딧보다 더 많이 후원할 수 없어요");
      return;
    } else setErrMsg("");
  }, [inputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value.replaceAll(/[^0-9]/g, "");
    setInputValue(Number(value));
  };

  const handleButtonClick = async () => {
    const value = Number(inputValue);
    if (isNaN(value) || value <= 0) return;
    const res = await contributeDonation(id, value);
    if (res) {
      onAmountChange(value);
      setCredit(credit - value);
      onClose();
    }
  };

  return (
    <div className="modal-wrapper display-flex justify-center align-center">
      <section
        id="tribute-modal"
        className="display-grid jutify-stretch gap-24 surface-secondary radius-8 px-16 py-24"
      >
        <div className="display-flex justify-sides align-center">
          <h3 className="text-secondary text-18 text-medium">후원하기</h3>
          <button onClick={onClose}>
            <Icon iconNm="close" size={24} alt="후원하기 모달 닫기 아이콘" />
          </button>
        </div>
        <div className="display-grid justify-center">
          <div className="display-grid gap-10">
            <div className="img-wrapper radius-8">
              <img src={idol?.profilePicture} alt="후원하기 대표 이미지" />
            </div>
            <div className="donation-item-title display-grid gap-8">
              <div className="text-16 text-gray">{subtitle}</div>
              <div className="text-18 text-medium">{mainTitle}</div>
            </div>
          </div>
        </div>
        <div className="credit-input-wrapper display-grid gap-6">
          <div className="input-wrapper display-flex justify-sides align-center gap-8 px-16 py-16 radius-8">
            <input
              type="text"
              placeholder="크레딧 입력"
              className="text-20 text-bold"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="icon-24" />
          </div>
          {errMsg?.length > 0 && <p className="text-12 text-error">{errMsg}</p>}
        </div>
        <Button
          size="free"
          disabled={isButtonDisabled}
          style={{ backgroundColor: isButtonDisabled ? "gray" : null }}
          onClick={handleButtonClick}
        >
          후원하기
        </Button>
      </section>
    </div>
  );
};

export default TributeModal;
