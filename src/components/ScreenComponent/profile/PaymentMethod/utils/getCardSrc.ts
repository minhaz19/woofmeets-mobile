export const getCardSrc = (brand: string) => {
  let src = `../../../../../assets/svgs/credit-card/${brand
    .toLowerCase()
    .split(' ')
    .join('-')}.svg`;
  // let defaultSrc = "/credit-card/default.svg";
  // if (typeof window !== "undefined") {
  //   const image = new Image();
  //   image.src = src;

  //   if (image.width === 0) {
  //     return defaultSrc;
  //   }
  // }

  return src;
};
