import 'react-native-svg';
declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
    fill?: string | undefined;
    stroke?: string | undefined;
  }
}
