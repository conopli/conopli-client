const year = new Date().getFullYear();
const m = new Date().getMonth() + 1;
const month = m <= 9 ? '0' + m : m;

const yearMaker = () => {
  const origin = 2002;
  const itemArr = [];
  for (let i = year; i >= origin; i--) {
    itemArr.push({ label: `${i}년`, value: i });
  }
  return itemArr;
};

const monthMaker = (curYear) => {
  const itemArr = [];
  if (curYear === year) {
    for (let i = 1; i <= m; i++) {
      itemArr.push({ label: `${i}월`, value: i <= 9 ? '0' + i : i });
    }
  } else {
    for (let i = 1; i <= 12; i++) {
      itemArr.push({ label: `${i}월`, value: i <= 9 ? '0' + i : i });
    }
  }
  return itemArr;
};

export { year, month, yearMaker, monthMaker };
