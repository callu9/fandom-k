import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import Toast from "../components/toast/Toast";

/**
 * 크레딧, 크레딧 관련 모달 및 로더를 제어하는 Context API입니다.
 */
export const GlobalContext = createContext();
export default function GlobalContextProvider({ children }) {
	const [credit, setCredit] = useState(0);
	const [modal, setModal] = useState();
	const [toast, setToast] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const data = localStorage.getItem("credit");
		if (data) setCredit(Number(data));
		else {
			console.log("크레딧 정보를 불러올 수 없습니다. 새로 세팅합니다.");
			localStorage.setItem("credit", 0);
			setCredit(0);
		}
	}, []);

	return (
		<GlobalContext value={{ credit, setCredit, setModal, setToast, setLoading }}>
			{children}
			{modal}
			{toast && <Toast message={toast} onClose={() => setToast()} />}
			{loading && <Loader />}
		</GlobalContext>
	);
}
export function useCredit() {
	const { credit } = useContext(GlobalContext);
	return credit;
}
export function useSetCredit() {
	const { setCredit } = useContext(GlobalContext);
	function handleChangeCredit(value = 0) {
		setCredit(value);
		localStorage.setItem("credit", value);
	}
	return handleChangeCredit;
}
export function useSetModal() {
	const { setModal } = useContext(GlobalContext);
	return setModal;
}
export function useSetToast() {
	const { setToast } = useContext(GlobalContext);
	return setToast;
}
export function useSetLoading() {
	const { setLoading } = useContext(GlobalContext);
	return setLoading;
}
