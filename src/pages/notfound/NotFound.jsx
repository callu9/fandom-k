import { Link } from "react-router-dom";
import ImgCredit from "../../assets/img/credit_jewel.svg";
import Button from "../../components/button/Button";

export default function NotFound() {
	return (
		<main className="display-grid justify-center align-center my-150">
			<div className="display-grid justify-center align-center gap-48">
				<img src={ImgCredit} alt="Not Found 에러 이미지" />
				<div className="display-grid gap-12">
					<h1 className="text-26 text-semibold text-brand-orange">404 Not Found</h1>
					<p className="text-gray">잘못된 페이지 접근입니다.</p>
				</div>
				<Link to="/">
					<Button>시작화면으로 돌아가기</Button>
				</Link>
			</div>
		</main>
	);
}
