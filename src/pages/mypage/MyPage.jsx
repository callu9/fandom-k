import Header from "../../components/header/Header";
import IdolContextProvider, { useIdols, useSetIdols } from "../../contexts/IdolContext";
import FavoriteIdols from "./components/FavoriteIdols";
import IdolList from "./components/IdolList";
import "./mypage.scss";

export default function MyPage() {
	return (
		<IdolContextProvider>
			<Header />
			<MyPageContainer />
		</IdolContextProvider>
	);
}
function MyPageContainer() {
	const idols = useIdols();
	const setIdols = useSetIdols();

	function handleRemove(id) {
		setIdols(idols.filter((idol) => idol.id !== id));
	}
	function handleAdd(list) {
		setIdols([...idols, ...list]);
	}

	return (
		<main className="display-grid justify-stretch gap-40 mx-auto my-76" id="my-page">
			<FavoriteIdols idols={idols} onRemove={handleRemove} />
			<hr />
			<IdolList favoriteIdols={idols} onAdd={handleAdd} />
		</main>
	);
}
