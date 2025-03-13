import { useState } from "react";
import { getChart } from "../../../../api/charts";
import Button from "../../../../components/button/Button";
import Icon from "../../../../components/icon/Icon";
import useAsync from "../../../../hooks/useAsync";
import "./chart.scss";
import ChartListIem from "./ChartListIem";
import ChartSkeleton from "./ChartSkeleton";

export default function ChartContainer() {
  const [gender, setGender] = useState("female");
  const [cursor, setCursor] = useState([0]);
  const { value: chart } = useAsync(
    () => getChart(gender, 0, 10 * cursor.length),
    [gender, cursor]
  );

  function handleChangeGender(gender) {
    setCursor([0]);
    setGender(gender);
  }
  return (
    <section className="display-grid justify-stretch gap-24 mt-30 mb-100" id="chart-container">
      <div className="display-flex justify-sides align-center">
        <h2 className="text-24">이달의 차트</h2>
        <Button size="extra-small">
          <Icon iconNm="chart" size={24} />
          차트 투표하기
        </Button>
      </div>
      <article className="display-grid gap-24" id="chart-box">
        <div className="display-grid direction-column">
          <Button
            size="free"
            btnStyle={gender === "female" ? "outlined-bottom" : "invert"}
            onClick={() => handleChangeGender("female")}
          >
            이달의 여자 아이돌
          </Button>
          <Button
            size="free"
            btnStyle={gender === "male" ? "outlined-bottom" : "invert"}
            onClick={() => handleChangeGender("male")}
          >
            이달의 남자 아이돌
          </Button>
        </div>
        <div className="display-grid" id="chart-list">
          {!(chart?.idols?.length > 0)
            ? new Array(10).fill().map((_, idx) => <ChartSkeleton key={idx} />)
            : chart?.idols?.map((idol) => <ChartListIem key={idol.id} {...idol} />)}
        </div>
        {chart?.nextCursor !== null && (
          <div className="display-grid justify-center mt-28">
            <Button
              btnStyle="outlined"
              size="semi-large"
              onClick={() => setCursor([chart.nextCursor, ...cursor])}
            >
              더 보기
            </Button>
          </div>
        )}
      </article>
    </section>
  );
}
