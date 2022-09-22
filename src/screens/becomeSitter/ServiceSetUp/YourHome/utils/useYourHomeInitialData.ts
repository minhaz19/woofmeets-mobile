export const useYourHomeInitialData = (homeData: any) => {
  const data = homeData !== null && homeData;
  const id = data?.HomeAttributes?.map(
    (item: any) => item?.homeAttributeTypeId,
  );
  return {
    homeType: data.homeType ? data.homeType : '',
    yardType: data.yardType ? data.yardType : '',
    homeAttributes: id ? id : [],
  };
};
