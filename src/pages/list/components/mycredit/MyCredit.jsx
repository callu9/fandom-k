import Icon from "../../../../components/icon/Icon";
import { useSetModal } from "../../../../contexts/GlobalContext";
import ChargeModal from "../../../../modal/ChargeModal";
import { formatCredit } from "../../../../util/credit";

export default function MyCredit({ credit = 0, setCredit }) {
  const setModal = useSetModal();
  return (
    <section
      className="display-flex justify-sides align-center border-default radius-8 px-64 py-36"
      id="my-credit"
    >
      <div className="display-grid gap-14">
        <span className="text-invert-60">내 크레딧</span>
        <div className="display-flex justify-left align-center gap-4">
          <Icon iconNm="credit" size={16} aria-label="크레딧 아이콘 이미지" />
          <span className="text-bold text-24">{formatCredit(credit)}</span>
        </div>
      </div>
      <button
        className="text-brand-orange"
        onClick={() =>
          setModal(
            <ChargeModal {...{ currentCredit: credit, setCredit, onClose: () => setModal() }} />
          )
        }
      >
        충전하기
      </button>
    </section>
  );
}
