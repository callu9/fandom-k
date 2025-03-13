import Icon from "../../../components/icon/Icon";
import IdolProfile from "../../../components/idolprofile/IdolProfile";

export default function FavoriteIdols({ idols = [], onRemove }) {
  return (
    <section className="display-grid gap-32" id="favorite-idols">
      <h1 className="text-24 text-bold">내가 관심있는 아이돌</h1>
      {idols.length === 0 ? (
        <div className="display-flex justify-center align-center text-gray">
          관심있는 아이돌로 등록된 아이돌이 없습니다. 관심있는 아이돌을 추가해보세요.
        </div>
      ) : (
        <div className="display-flex gap-24" id="favorite-idol-box">
          {idols.map((idol) => (
            <FavoriteIdolItem key={idol.id} {...idol} onRemove={() => onRemove(idol.id)} />
          ))}
        </div>
      )}
    </section>
  );
}
function FavoriteIdolItem({ onRemove, totalVotes, teamId, ...idol }) {
  return (
    <div className="display-grid justify-center gap-8">
      <div className="profile-wrapper">
        <IdolProfile size="medium" type="mypage" {...idol} />
        <button className="icon-wrapper" onClick={onRemove}>
          <Icon iconNm="delete" size={32} />
        </button>
      </div>
      <div className="display-grid justify-center gap-2">
        <span className="text-16 line-height-26 text-bold">{idol.name}</span>
        <span className="text-14 text-invert-60">{idol.group}</span>
      </div>
    </div>
  );
}
