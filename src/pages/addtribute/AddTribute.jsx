import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDonation } from "../../api/donations";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import Toast from "../../components/toast/Toast";
import { useSetModal, useSetToast } from "../../contexts/GlobalContext";
import ErrorModal from "../../modal/ErrorModal";
import "./addtribute.scss";
import DeadlineSelector from "./components/DeadlineSelector";
import IdolSearchSelector from "./components/IdolSearchSelector";

export default function AddTribute() {
	const navigate = useNavigate();
	const setToast = useSetToast();
	const setModal = useSetModal();
	const [formData, setFormData] = useState({
		deadline: "",
		targetDonation: 0,
		subtitle: "",
		title: "",
		idolId: 0,
	});
	async function handleAddTribute(e) {
		e.preventDefault();
		try {
			const result = await createDonation(formData);
			if (result?.id) {
				setToast(<Toast message="조공 등록에 성공하였습니다." onClose={() => setToast()} />);
				setTimeout(() => navigate(`/list`), 2 * 1000);
			}
		} catch (e) {
			setModal(<ErrorModal message="조공 등록에 실패하였습니다." />);
		}
	}
	return (
		<>
			<Header />
			<main className="display-grid justify-stretch gap-40 my-50" id="add-tribute">
				<div className="display-grid gap-12" id="form-header">
					<div className="display-flex justify-sides align-upper">
						<h1 className="text-26">후원을 받을 조공 생성하기</h1>
						<Link to="/add_idol">
							<Button btnStyle="outlined" size="small" height={32}>
								아이돌 프로필 등록하기
							</Button>
						</Link>
					</div>
					<h2 className="text-20 text-regular">
						내가 좋아하는 <span className="text-brand-pink">아이돌에게 후원</span>할 수 있는 조공을
						생성해보세요.
					</h2>
				</div>
				<form className="display-grid gap-24" onSubmit={handleAddTribute}>
					<IdolSearchSelector onChange={(idolId) => setFormData({ ...formData, idolId })} />
					<div className="input-wrapper">
						<label htmlFor="title">조공 제목</label>
						<input
							type="text"
							id="title"
							placeholder="조공의 제목을 입력해주세요. (ex. OOO 솔로 데뷔 축하 기념)"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="subtitle">조공 상세 설명</label>
						<input
							type="text"
							id="subtitle"
							placeholder="조공의 상세 설명을 입력해주세요. (ex. XX역 생일 광고)"
							value={formData.subtitle}
							onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="targetDonation">후원 목표 금액</label>
						<input
							type="text"
							id="targetDonation"
							placeholder="조공의 목표 크레딧을 입력해주세요."
							value={formData.targetDonation}
							onChange={(e) => setFormData({ ...formData, targetDonation: e.target.value })}
						/>
					</div>
					<DeadlineSelector onChange={(deadline) => setFormData({ ...formData, deadline })} />
					<div className="display-grid justify-stretch mt-32">
						<Button
							type="submit"
							size="free"
							height={48}
							disabled={
								!formData.idolId ||
								!formData.title ||
								!formData.subtitle ||
								!formData.targetDonation ||
								!formData.deadline
							}>
							생성하기
						</Button>
					</div>
				</form>
			</main>
		</>
	);
}
