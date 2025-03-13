import { useState } from "react";
import { getIdolList } from "../../../api/idols";
import IdolProfile from "../../../components/idolprofile/IdolProfile";
import useAsync from "../../../hooks/useAsync";
import useViewPortSize from "../../../hooks/useViewportSize";
import Icon from "../../../components/icon/Icon";
import Button from "../../../components/button/Button";

export default function IdolList({ favoriteIdols = [], onAdd }) {
  const [selected, setSelected] = useState([]);
  const [cursor, setCursor] = useState([]);
  const { viewportSize } = useViewPortSize();
  const pageSize = viewportSize === "mobile" ? 6 : viewportSize === "tablet" ? 8 : 16;

  const { value: idols } = useAsync(
    () => getIdolList(undefined, cursor[0], pageSize),
    [cursor[0], pageSize]
  );

  function IdolSelectItem({ totalVotes, teamId, ...idol }) {
    const isAdded = favoriteIdols.findIndex((el) => el.id === idol.id) >= 0;
    const isSelected = selected.findIndex((el) => el.id === idol.id) >= 0;
    function handleSelect() {
      if (isAdded) return;
      if (isSelected) setSelected(selected.filter((el) => el.id !== idol.id));
      else setSelected((prev) => [...prev, idol]);
    }
    return (
      <div className="idol-list-item display-grid justify-center gap-8">
        <IdolProfile
          size="large"
          type={isAdded ? "profile" : "mypage"}
          {...idol}
          selected={isSelected}
          onSelect={handleSelect}
          className={isAdded ? "disabled" : ""}
        />
        <div className="display-grid justify-center gap-2">
          <span className="text-16 line-height-26 text-bold">{idol.name}</span>
          <span className="text-14 text-invert-60">{idol.group}</span>
        </div>
      </div>
    );
  }

  function handleAddSelected() {
    onAdd(selected);
    setSelected([]);
  }

  return (
    <section className="display-grid justify-stretch gap-32" id="idol-list-area">
      <div className="display-grid gap-48">
        <h2 className="text-24 text-bold">관심 있는 아이돌을 추가해보세요.</h2>
        <article className="display-flex align-center" id="idol-list-box">
          <button disabled={cursor[0] === 0} onClick={() => setCursor(cursor.slice(1))}>
            <Icon iconNm="chevron" size={6} alt="뒤로 가기 버튼 이미지" />
          </button>
          <div className="display-grid gap-24" id="idol-list">
            {idols?.list?.map((idol) => (
              <IdolSelectItem key={idol.id} {...idol} />
            ))}
          </div>
          <button
            disabled={idols?.nextCursor === null}
            onClick={() => setCursor([idols.nextCursor, ...cursor])}
          >
            <Icon iconNm="chevron" rotate={180} size={6} alt="앞으로 가기 버튼 이미지" />
          </button>
        </article>
        <div className="display-flex justify-center">
          <Button isRound={true} onClick={handleAddSelected}>
            <Icon iconNm="plus" size={24} />
            추가하기
          </Button>
        </div>
      </div>
    </section>
  );
}
