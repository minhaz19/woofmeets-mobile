export interface AddPetCheckType {
  id: number;
  header: string;
  title: string;
  subTitle: string;
  name: string;
  pet: Pet[];
}

export interface Pet {
  id: number;
  type: string;
}

export type addPetInfoInputsType = Input1[];

export interface Input1 {
  title: string;
  placeholder: string;
  name: string;
  flex?: number;
  select?: boolean;
}

export type additionalPetDetailsCheckType = Check2[];

export interface Check2 {
  title: string;
  name: string;
  id: number;
  radio: Radio[];
}

export interface CareInfoChecksType {
  header: string;
  subTitle: string;
  careInfo: CareInfo[];
}

export interface CareInfo {
  title: string;
  id: number;
  name: string;
  radio: Radio[];
}

export interface Radio {
  type: string;
  id: number;
}
