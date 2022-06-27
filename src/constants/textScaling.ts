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
        ? 9
        : SCREEN_WIDTH <= 600
        ? SCREEN_WIDTH * 0.035 <= 16
          ? SCREEN_WIDTH * 0.035
          : 16
        : 16,
    Text_2:
      SCREEN_WIDTH <= 380 ? 14 : SCREEN_WIDTH <= 600 ? SCREEN_WIDTH * 0.05 : 18,
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
    Text_8: SCREEN_WIDTH * 0.08,
    Text_9: SCREEN_WIDTH * 0.085,
  },
};

const Text_Size = Text_Size_Type.Scale;

export default Text_Size;
