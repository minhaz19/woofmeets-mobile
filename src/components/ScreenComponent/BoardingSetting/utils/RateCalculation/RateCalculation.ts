const rateCalculation = (values: any) => {
  console.log(values);
  const holidayRate = (values.holidayRate * 115) / 100;
  const additionalDogRate = (values.additionalDogRate * 80) / 100;
  const puppyRate = (values.puppyRate * 110) / 100;
  const catRate = (values.catRate * 90) / 100;
  const additionalCat = (values.additionalCat * 70) / 100;
  const extendedStayRate = (values.extendedStayRate * 80) / 100;
  const bathingGrooming = (values.bathingGrooming * 80) / 100;
  const pickUpDropOff = (values.pickUpDropOff * 80) / 100;

  return {
    holidayRate,
    additionalDogRate,
    puppyRate,
    catRate,
    additionalCat,
    extendedStayRate,
    bathingGrooming,
    pickUpDropOff,
  };
};

export default rateCalculation;
