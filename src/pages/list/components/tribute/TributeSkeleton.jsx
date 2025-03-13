import Button from "../../../../components/button/Button";

export default function TributeSkeleton() {
  return (
    <li className="donation-item skeleton display-grid justify-stretch gap-12">
      <div className="img-wrapper radius-8">
        <Button size="free" disabled>
          후원하기
        </Button>
      </div>
      <div className="donation-item-info display-grid justify-stretch gap-24">
        <div className="donation-item-title display-grid gap-8">
          <div className="radius-8" />
          <div className="radius-8" />
        </div>
        <div className="donation-item-graph display-flex justify-sides align-upper">
          <div className="radius-8" />
          <div className="radius-8" />
        </div>
        <div className="graph-line" />
      </div>
    </li>
  );
}
