import Header from "../../components/header/Header";
import { useCredit, useSetCredit } from "../../contexts/GlobalContext";
import ChartContainer from "./components/chart/ChartContainer";
import MyCredit from "./components/mycredit/MyCredit";
import TributeContainer from "./components/tribute/TributeContainer";
import "./listpage.scss";

export default function ListPage() {
  const credit = useCredit();
  const setCredit = useSetCredit();
  return (
    <>
      <Header />
      <main className="display-grid justify-stretch gap-50 my-50" id="list-page">
        <MyCredit {...{ credit, setCredit }} />
        <TributeContainer />
        <ChartContainer />
      </main>
    </>
  );
}
