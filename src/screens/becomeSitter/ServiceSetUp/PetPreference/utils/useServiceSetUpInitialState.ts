import {useAppSelector} from '../../../../../store/store';
import * as Yup from 'yup';
export const usePetPreferenceInitialData = () => {
  const {petPreference, petPerDay} = useAppSelector(
    state => state?.petPreference,
  );
  return {
    smallDog: petPreference?.smallDog ? petPreference?.smallDog : false,
    mediumDog: petPreference?.mediumDog ? petPreference?.mediumDog : false,
    largeDog: petPreference?.largeDog ? petPreference?.largeDog : false,
    giantDog: petPreference?.giantDog ? petPreference?.giantDog : false,
    cat: petPreference?.cat ? petPreference?.cat : false,
    petPerDay: petPerDay,
  };
};
export const petPreferenceSchema = Yup.object().shape({
  petSize: Yup.bool()
    .oneOf([true], 'Field must be checked')
    .required('field must be checked'),
});
// {
//   smallDog: Yup.boolean().when(['mediumDog', 'largeDog', 'giantDog', 'cat'], {
//     is: (
//       mediumDog: boolean,
//       largeDog: boolean,
//       giantDog: boolean,
//       cat: boolean,
//     ) => !mediumDog && !largeDog && !giantDog && !cat,
//     then: Yup.boolean().required(),
//   }),
//   mediumDog: Yup.boolean().when(['smallDog', 'largeDog', 'giantDog', 'cat'], {
//     is: (
//       smallDog: boolean,
//       largeDog: boolean,
//       giantDog: boolean,
//       cat: boolean,
//     ) => !smallDog && !largeDog && !giantDog && !cat,
//     then: Yup.boolean().required(),
//   }),
//   largeDog: Yup.boolean().when(['smallDog', 'mediumDog', 'giantDog', 'cat'], {
//     is: (
//       smallDog: boolean,
//       mediumDog: boolean,
//       giantDog: boolean,
//       cat: boolean,
//     ) => !smallDog && !mediumDog && !giantDog && !cat,
//     then: Yup.boolean().required(),
//   }),
//   giantDog: Yup.boolean().when(['smallDog', 'mediumDog', 'largeDog', 'cat'], {
//     is: (
//       smallDog: boolean,
//       mediumDog: boolean,
//       largeDog: boolean,
//       cat: boolean,
//     ) => !smallDog && !mediumDog && !largeDog && !cat,
//     then: Yup.boolean().required(),
//   }),
//   cat: Yup.boolean().when(['smallDog', 'mediumDog', 'largeDog', 'giantDog'], {
//     is: (
//       smallDog: boolean,
//       mediumDog: boolean,
//       largeDog: boolean,
//       giantDog: boolean,
//     ) => !smallDog && !mediumDog && !largeDog && !giantDog,
//     then: Yup.boolean().required(),
// }),
// },
// [
//   ['smallDog', 'mediumDog'],
//   ['smallDog', 'largeDog'],
//   ['smallDog', 'giantDog'],
//   ['smallDog', 'cat'],
//   ['mediumDog', 'largeDog'],
//   ['mediumDog', 'giantDog'],
//   ['mediumDog', 'cat'],
//   ['largeDog', 'giantDog'],
//   ['largeDog', 'cat'],
//   ['giantDog', 'cat'],
// ],
// );
// ({
//   smallDog: Yup.boolean()
//     .required('Field must be checked')
//     .oneOf([true], 'Field must be checked'),
//   mediumDog: Yup.boolean(),
//   largeDog: Yup.boolean(),
//   giantDog: Yup.boolean(),
//   cat: Yup.boolean(),
// });
