import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export const CameraIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22.31}
    height={17.8}
    viewBox="0 0 22 19"
    {...props}>
    <G
      data-name="Icon feather-camera"
      fill="none"
      stroke="#F87315"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path
        data-name="Path 3987"
        d="M21.31 15.044a1.8 1.8 0 0 1-1.846 1.756H2.846A1.8 1.8 0 0 1 1 15.044V5.389a1.8 1.8 0 0 1 1.846-1.756h3.693L8.385 1h5.539l1.846 2.633h3.693a1.8 1.8 0 0 1 1.847 1.756Z"
      />
      <Path
        data-name="Path 3988"
        d="M14.666 9.778a3.511 3.511 0 1 1-3.511-3.511 3.511 3.511 0 0 1 3.511 3.511Z"
      />
    </G>
  </Svg>
);

export const SendIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24.217}
    height={20.757}
    viewBox="0 0 24 20"
    {...props}>
    <Path
      data-name="Icon material-send"
      d="m.012 20.757 24.205-10.378L.012 0 0 8.072l17.3 2.306L0 12.685Z"
      fill="#F87315"
    />
  </Svg>
);
