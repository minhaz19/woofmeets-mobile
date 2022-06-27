import Colors from './Colors';
import {SCREEN_WIDTH} from './WindowSize';

export const descriptionLightText = {
  fontSize: SCREEN_WIDTH <= 380 ? 13 : SCREEN_WIDTH <= 600 ? 16 : 18,
  fontColor: Colors.text,
};

export const descriptionDarkText = {
  fontSize: SCREEN_WIDTH <= 380 ? 13 : SCREEN_WIDTH <= 600 ? 17 : 18,
  fontColor: 'black',
};
export const descriptionPrimaryText = {
  fontSize: SCREEN_WIDTH <= 380 ? 12 : SCREEN_WIDTH <= 600 ? 15 : 16,
  fontColor: 'black',
};

export const shortText = {
  fontSize: SCREEN_WIDTH <= 380 ? 11 : SCREEN_WIDTH <= 600 ? 13 : 14,
  fontColor: 'black',
};

export const titlePrimaryText = {
  fontSize: SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 18 : 20,
  fontColor: Colors.primary,
};
export const titlePrimaryTextSup = {
  fontSize: SCREEN_WIDTH <= 380 ? 18 : SCREEN_WIDTH <= 600 ? 20 : 22,
  fontColor: Colors.primary,
};

export const titleDarkText = {
  fontSize: SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 18 : 20,
  fontColor: 'black',
};

export const titleDarkBiggerText = {
  fontSize: SCREEN_WIDTH <= 380 ? 18 : SCREEN_WIDTH <= 600 ? 20 : 22,
  fontColor: 'black',
};

export const titleDarkBiggerTextB = {
  fontSize: SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 24 : 26,
  fontColor: 'black',
};

export const titleUserName = {
  fontSize: SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 30,
  fontColor: 'black',
};

export const titleWhiteText = {
  fontSize: SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 18 : 20,
  fontColor: 'white',
};

export const useArialNormal = {
  fontFamily: 'ARIAL',
};
