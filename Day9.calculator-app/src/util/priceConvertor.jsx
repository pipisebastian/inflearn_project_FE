// int숫자가 들어올때. 1000단위로 콤마를 찍어주는 함수
export const priceConvertor = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
