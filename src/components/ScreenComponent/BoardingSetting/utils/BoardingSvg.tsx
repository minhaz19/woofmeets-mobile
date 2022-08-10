import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const MinusSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    {...props}>
    <Path
      data-name="Icon awesome-minus-circle"
      d="M8.999 0a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm-4.79 10.451a.437.437 0 0 1-.435-.435V7.983a.437.437 0 0 1 .435-.435h9.581a.437.437 0 0 1 .435.435v2.032a.437.437 0 0 1-.435.435Z"
      fill="#f0f2f6"
    />
  </Svg>
);

export const PlusSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    {...props}>
    <Path
      data-name="Icon awesome-plus-circle"
      d="M8.999 0a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm5.226 10.016a.437.437 0 0 1-.435.435h-3.339v3.339a.437.437 0 0 1-.435.435H7.983a.437.437 0 0 1-.435-.435v-3.339H4.209a.437.437 0 0 1-.435-.435V7.983a.437.437 0 0 1 .435-.435h3.339V4.209a.437.437 0 0 1 .435-.435h2.032a.437.437 0 0 1 .435.435v3.339h3.339a.437.437 0 0 1 .435.435Z"
      fill="#f0f2f6"
    />
  </Svg>
);
