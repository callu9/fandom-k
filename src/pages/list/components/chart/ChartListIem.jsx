import IdolProfile from "../../../../components/idolprofile/IdolProfile";
import { formatVotes } from "../../../../util/vote";

export default function ChartListIem({ ...idol }) {
  return (
    <div className="chart-list-item display-flex justify-sides align-center">
      <div className="display-flex align-center gap-12 text-16">
        <IdolProfile type="mypage" profilePicture={idol.profilePicture} />
        <span className="text-brand-orange">{idol.rank}</span>
        <div className="text-medium">
          {idol.group} {idol.name}
        </div>
      </div>
      <div className="text-invert-60">{formatVotes(idol.totalVotes)}</div>
    </div>
  );
}
