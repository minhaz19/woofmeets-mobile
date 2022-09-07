import {useAppSelector} from '../../../store/store';
import * as Yup from 'yup';
export const usePetPreferenceInitialData = () => {
  const {petPreference} = useAppSelector(state => state?.petPreference);
  // console.log('pet preference init', petPreference);
  // console.log(
  //   'checking ',
  // petPreference?.smallDog,
  // petPreference?.mediumDog,
  // petPreference?.largeDog,
  // petPreference?.giantDog,
  // petPreference?.cat,
  // );

  return {
    smallDog: petPreference?.smallDog ? petPreference?.smallDog : false,
    mediumDog: petPreference?.mediumDog ? petPreference?.mediumDog : false,
    largeDog: petPreference?.largeDog ? petPreference?.largeDog : false,
    giantDog: petPreference?.giantDog ? petPreference?.giantDog : false,
    cat: petPreference?.cat ? petPreference?.cat : false,
  };
};
export const petPreferenceSchema = Yup.object().shape({
  smallDog: Yup.boolean(),
  mediumDog: Yup.boolean(),
  largeDog: Yup.boolean(),
  giantDog: Yup.boolean(),
  cat: Yup.boolean(),
});
// .required('select at least one');
