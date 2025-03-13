export const formatDonations = (num = 0) => new Intl.NumberFormat("ko-kr").format(num);

export const formatDate = (dateStr) => {
  if (!dateStr) return "0000.00.00";
  const dateObj = new Date(dateStr);
  return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, "0")}.${String(
    dateObj.getDate()
  ).padStart(2, "0")}`;
};

export const formatTimeBefore = (dateStr) => {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr);
  const currentTime = new Date();
  const hour = new Date(dateObj - currentTime).getTime() / (60 * 60 * 1000);
  return hour >= 24
    ? `${Math.floor(hour / 24)}일 전`
    : hour < 1
    ? `${Math.ceil(hour * 100)}분 전`
    : `${Math.floor(hour)}시간 전`;
};
