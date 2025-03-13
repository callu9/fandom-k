import Button from "../../../../components/button/Button";
import Icon from "../../../../components/icon/Icon";
import { useSetModal } from "../../../../contexts/GlobalContext";
import TributeModal from "../../../../modal/TributeModal";
import { formatDonations, formatTimeBefore } from "../../../../util/donation";

export default function TributeListItem({
  idol,
  receivedDonations,
  targetDonation,
  subtitle,
  title: mainTitle,
  deadline,
  id,
  onAmountChange,
}) {
  const setModal = useSetModal();
  return (
    <li className="donation-item display-grid gap-12">
      <div className="img-wrapper radius-8">
        <div className="gradient" />
        <img src={idol?.profilePicture} alt={`${mainTitle} 대표 이미지`} />
        <Button
          size="free"
          onClick={() =>
            setModal(
              <TributeModal
                {...{ id, mainTitle, subtitle, idol, onAmountChange }}
                onClose={() => setModal()}
              />
            )
          }
        >
          후원하기
        </Button>
      </div>
      <div
        className="donation-item-info display-grid gap-24"
        style={{
          "--p": receivedDonations / targetDonation < 1 ? receivedDonations / targetDonation : 1,
        }}
      >
        <div className="donation-item-title display-grid gap-8">
          <div className="text-16 text-gray">{subtitle}</div>
          <div className="text-18 text-medium">{mainTitle}</div>
        </div>
        <div className="donation-item-graph display-flex justify-sides align-upper">
          <div className="display-flex align-center gap-2 text-brand-orange">
            <Icon iconNm="credit" size={12} />
            {formatDonations(receivedDonations)}
          </div>
          <span>{formatTimeBefore(deadline)}</span>
        </div>
        <div className="graph-line" />
      </div>
    </li>
  );
}
