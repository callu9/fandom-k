import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createIdol } from "../../api/idols";
import { uploadImage } from "../../api/image";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import Icon from "../../components/icon/Icon";
import Toast from "../../components/toast/Toast";
import { useSetModal, useSetToast } from "../../contexts/GlobalContext";
import ErrorModal from "../../modal/ErrorModal";
import "./addidol.scss";

export default function AddIdol() {
	const navigate = useNavigate();
	const setToast = useSetToast();
	const setModal = useSetModal();
	const [thumbnail, setThumbnail] = useState();
	const [formData, setFormData] = useState({
		profilePicture: "",
		group: "",
		gender: "female",
		name: "",
	});
	function onUploadImage(e) {
		if (e.target.files) {
			const file = e.target.files[0];
			setFormData({ ...formData, image: file });
			const objectURL = URL.createObjectURL(file);
			setThumbnail(objectURL);
		}
	}
	async function handleAddIdol(e) {
		e.preventDefault();
		try {
			const { url: profilePicture } = await uploadImage(formData.image);
			const result = await createIdol({ ...formData, profilePicture, image: undefined });
			if (result?.id) {
				setToast(<Toast message="아이돌 등록에 성공하였습니다." onClose={() => setToast()} />);
				setTimeout(() => navigate(`/list`), 2 * 1000);
			}
		} catch (e) {
			setModal(<ErrorModal message="아이돌 등록에 실패하였습니다." />);
		}
	}
	return (
		<>
			<Header />
			<main className="display-grid justify-stretch gap-40 my-50" id="add-idol">
				<div className="display-grid gap-12">
					<div className="display-flex justify-sides align-upper">
						<h1 className="text-26">아이돌 등록하기</h1>
						<Link to="/add_tribute">
							<Button btnStyle="outlined" size="extra-small">
								조공 생성하기
							</Button>
						</Link>
					</div>
					<h2 className="text-20 text-regular">
						내가 <span className="text-brand-pink">좋아하는 아이돌</span>의 프로필을 등록해보세요.
					</h2>
				</div>
				<form className="display-grid gap-24" onSubmit={handleAddIdol}>
					<div className="input-wrapper">
						<label htmlFor="profile-picture">프로필 이미지</label>
						{thumbnail ? (
							<div className="img-wrapper">
								<img src={thumbnail} alt="프로필 이미지 미리보기" />
								<button onClick={() => setThumbnail()}>
									<Icon iconNm="delete" size={24} />
								</button>
							</div>
						) : (
							<input type="file" accept="image/*" id="profile-picture" onChange={onUploadImage} />
						)}
					</div>
					<div className="input-wrapper">
						<label htmlFor="group">그룹명</label>
						<input
							type="text"
							id="group"
							placeholder="그룹명을 입력해주세요."
							value={formData.group}
							onChange={(e) => setFormData({ ...formData, group: e.target.value })}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="gender">그룹명</label>
						<div className="display-flex gap-16">
							<div className="display-flex gap-8">
								<input
									type="radio"
									id="gender"
									value="female"
									checked={formData.gender === "female"}
									onChange={(e) => setFormData({ ...formData, gender: "female" })}
								/>
								<span>여성</span>
							</div>
							<div className="display-flex gap-8">
								<input
									type="radio"
									id="gender"
									value="male"
									checked={formData.gender === "male"}
									onChange={(e) => setFormData({ ...formData, gender: "male" })}
								/>
								<span>남성</span>
							</div>
						</div>
					</div>
					<div className="input-wrapper">
						<label htmlFor="name">이름</label>
						<input
							type="text"
							id="name"
							placeholder="아이돌의 활동명을 입력해주세요."
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						/>
					</div>
					<div className="display-grid justify-stretch mt-32">
						<Button
							type="submit"
							size="free"
							height={48}
							disabled={!thumbnail || !formData.group || !formData.name}>
							등록하기
						</Button>
					</div>
				</form>
			</main>
		</>
	);
}
