export type addPetTypes = Root2[];

export interface Root2 {
  id?: number;
  title?: string;
  pet?: Pet[];
  inputs?: Input[];
  additionalDetails?: AdditionalDetail[];
  placeholder?: string;
  name?: string;
  numberOfLines?: number;
  header?: string;
  subTitle?: string;
  careInfo?: CareInfo[];
  image?: Image;
}

export interface Pet {
  id: number;
  type: string;
}

export interface Input {
  title: string;
  placeholder: string;
  name: string;
  numberOfLines?: number;
  subTitle?: string;
  flex?: number;
  select?: boolean;
}

export interface AdditionalDetail {
  id: number;
  title: string;
  radio: Radio[];
}

export interface Radio {
  type: string;
  id: number;
}

export interface CareInfo {
  title: string;
  id: number;
  radio: Radio2[];
}

export interface Radio2 {
  id: number;
  type: string;
}

export interface Image {
  title: string;
  subTitle: string;
}

// export type addPetTypes = {
//   title: string;
//   placeholder: string;
//   name: string;
//   numberOfLines: number;
//   pet: {type: string}[];
//   inputs: {
//     title: string;
//     placeholder: string;
//     select?: boolean;
//     name: string;
//   }[];
//   additionalDetails: {
//     title: string;
//     radio: {type: string}[];
//   }[];
//   header: string;
//   subTitle: string;
//   careInfo: {
//     title: string;
//     radio: {type: string}[];
//   }[];
//   image: {
//     title: string;
//     subTitle: string;
//   };
// };
