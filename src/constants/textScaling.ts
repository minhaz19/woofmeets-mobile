import {SCREEN_WIDTH} from './WindowSize';

const Text_Size_Type = {
  Scale: {
    Text_0:
      SCREEN_WIDTH <= 380
        ? 9
        : SCREEN_WIDTH <= 600
        ? SCREEN_WIDTH * 0.03 <= 14
          ? SCREEN_WIDTH * 0.03
          : 14
        : 14,
    Text_1:
      SCREEN_WIDTH <= 380
        ? 11
        : SCREEN_WIDTH <= 600
        ? SCREEN_WIDTH * 0.038 <= 18
          ? SCREEN_WIDTH * 0.038
          : 18
        : 20,
    Text_2:
      SCREEN_WIDTH <= 380
        ? 14
        : SCREEN_WIDTH <= 600
        ? SCREEN_WIDTH * 0.045 <= 16
          ? SCREEN_WIDTH * 0.044
          : SCREEN_WIDTH * 0.05 <= 20
          ? SCREEN_WIDTH * 0.044
          : 22
        : 22,
    Text_3: SCREEN_WIDTH * 0.055,
    Text_4:
      SCREEN_WIDTH <= 380
        ? SCREEN_WIDTH * 0.045
        : SCREEN_WIDTH <= 600
        ? SCREEN_WIDTH * 0.06 <= 32
          ? SCREEN_WIDTH * 0.06
          : 36
        : 36,
    Text_5:
      SCREEN_WIDTH <= 380
        ? SCREEN_WIDTH * 0.045
        : SCREEN_WIDTH <= 600
        ? SCREEN_WIDTH * 0.065 <= 32
          ? SCREEN_WIDTH * 0.065
          : 38
        : 38,
    Text_6: SCREEN_WIDTH * 0.07,
    Text_7: SCREEN_WIDTH * 0.075,
    Text_8:
      SCREEN_WIDTH <= 380
        ? 10
        : SCREEN_WIDTH <= 600
        ? SCREEN_WIDTH * 0.024 <= 12
          ? SCREEN_WIDTH * 0.024
          : 12
        : 14,
    Text_9:
      SCREEN_WIDTH <= 380
        ? 11
        : SCREEN_WIDTH <= 600
        ? SCREEN_WIDTH * 0.033 <= 15
          ? SCREEN_WIDTH * 0.033
          : 15
        : 17,
  },
};

const Text_Size = Text_Size_Type.Scale;

export default Text_Size;
