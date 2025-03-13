export const formatVotes = (num = 0) => `${new Intl.NumberFormat("ko-kr").format(num)}표`;
