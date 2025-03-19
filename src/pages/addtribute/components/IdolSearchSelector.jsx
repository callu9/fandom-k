import { useState } from "react";
import { getIdolList } from "../../../api/idols";
import IdolProfile from "../../../components/idolprofile/IdolProfile";
import useAsync from "../../../hooks/useAsync";
import Icon from "../../../components/icon/Icon";

export default function IdolSearchSelector({ onChange }) {
	const [keyword, setKeyword] = useState("");
	const [idol, setIdol] = useState();
	const { value: idols } = useAsync(() => getIdolList(keyword, null, null), [keyword]);

	// 디바운스 구현
	let timer;
	const checkInput = (e) => {
		const search = e.target.value;
		if (timer) {
			// 200ms 전에 입력이 발생되면 이전 타이머 취소
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			if (search) setKeyword(search);
		}, 200);
	};

	function handleSelectIdol(idol) {
		setIdol(idol);
		onChange(idol?.id);
	}

	return (
		<div className="input-wrapper">
			<div className="display-flex justify-sides align-lower">
				<label>아이돌</label>
				<input
					id="keyword"
					type="text"
					onChange={checkInput}
					placeholder="검색할 아이돌의 키워드를 입력하세요."
				/>
			</div>
			{idol ? (
				<div className="display-grid justify-left">
					<div className="display-grid justify-center gap-8" id="idol-selected">
						<IdolProfile
							profilePicture={idol.profilePicture}
							type="mypage"
							size="large"
							name={idol.name}
						/>
						<div className="display-grid justify-center gap-4">
							<span className="text-gray">{idol.group}</span>
							<span className="text-medium">{idol.name}</span>
						</div>
						<button onClick={() => setIdol()}>
							<Icon iconNm="delete" size={32} />
						</button>
					</div>
				</div>
			) : (
				<ul className="display-flex flex-wrap gap-24" id="idol-selector">
					{idols?.list?.map((idol) => (
						<li
							key={idol.id}
							className="display-grid justify-center gap-8"
							onClick={() => handleSelectIdol(idol)}>
							<IdolProfile profilePicture={idol.profilePicture} name={idol.name} />
							<div className="display-grid justify-center gap-4">
								<span className="text-gray">{idol.group}</span>
								<span className="text-medium">{idol.name}</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
