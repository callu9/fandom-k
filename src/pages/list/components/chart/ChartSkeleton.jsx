export default function ChartSkeleton() {
  return (
    <div className="chart-list-item skeleton display-flex justify-sides align-center">
      <div className="display-flex align-center gap-12 text-16">
        <div className="idol-profile-wrapper" />
        <span className="radius-8" />
        <div className="radius-8" />
      </div>
      <div className="radius-8" />
    </div>
  );
}
