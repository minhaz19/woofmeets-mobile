import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const PetSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox={'0 0 512 512'}
    {...props}>
    <Path d="M144 200h16v16h-16Zm40 16h16v-16h-16Zm296.837 138.967A198.213 198.213 0 0 1 496 431.2V488a8 8 0 0 1-8 8h-64v-16h56v-48.8a182 182 0 0 0-53.657-129.539l-55.029-55.03A65.428 65.428 0 0 1 352.5 208H232v240a8 8 0 0 1-8 8 16.019 16.019 0 0 0-16 16v8h32v-8a32.057 32.057 0 0 1 24-30.988V296h16v152a8 8 0 0 1-8 8 16.019 16.019 0 0 0-16 16v8h56V296h16v148.305A31.793 31.793 0 0 1 344 440h16v-34.745a116.491 116.491 0 0 1 34.343-82.912l11.314 11.314A100.588 100.588 0 0 0 376 405.255V448a8 8 0 0 1-8 8h-24a16.019 16.019 0 0 0-16 16v8h82v16H24a8 8 0 0 1-8-8V294.534a55.816 55.816 0 0 1 9.406-31.064L41.3 239.633A39.779 39.779 0 0 0 48 217.5v-.506a42.11 42.11 0 0 0-16.733-33.544l-5.945-4.458A23.421 23.421 0 0 1 16 160.344v-.3A24.05 24.05 0 0 1 40 136h2.385a24.086 24.086 0 0 1 14.991 5.259l4.957 3.966A89.255 89.255 0 0 1 96 215.265a89.413 89.413 0 0 1-15.064 49.754l-12.9 19.357a23.97 23.97 0 0 0-3 6.358l-15.32-4.634a40.031 40.031 0 0 1 5-10.6l12.905-19.356A73.466 73.466 0 0 0 80 215.265a73.333 73.333 0 0 0-27.658-57.546l-4.957-3.966a8.029 8.029 0 0 0-5-1.753H40a8.032 8.032 0 0 0-8 8.042v.3a7.342 7.342 0 0 0 2.922 5.847l5.943 4.458A58.186 58.186 0 0 1 64 216.992v.506a55.73 55.73 0 0 1-9.39 31.01l-15.892 23.837A39.876 39.876 0 0 0 32 294.534v43.685a128.011 128.011 0 0 1 41.006-44.5l28.306-18.877A23.973 23.973 0 0 0 112 254.87V152a8 8 0 0 1 10.526-7.59l7.03 2.339A51.251 51.251 0 0 1 156.667 168h30.666a50.846 50.846 0 0 1 10.4-11.9l10.284 12.256a35 35 0 0 0-8.856 11.221A8 8 0 0 1 192 184h-40a8 8 0 0 1-7.155-4.422A35.206 35.206 0 0 0 128 163.311v91.559a39.943 39.943 0 0 1-17.809 33.284l-28.313 18.882A111.894 111.894 0 0 0 32 400.22V480h112a16.019 16.019 0 0 0-16-16h-24a8 8 0 0 1-8-8v-22.059a73.455 73.455 0 0 0-21.657-52.284l11.314-11.314A89.352 89.352 0 0 1 112 433.941V448h16a31.94 31.94 0 0 1 8 1.013V360h16v98.868A31.86 31.86 0 0 1 160 480h16V360h16v112a32.058 32.058 0 0 1 24-30.988V128h-16a8 8 0 0 1-7.353-4.849l-24-56a8 8 0 0 1 3.113-9.935l32.63-20.393 8.479 13.568-26.815 16.759L205.275 112H216V80a7.994 7.994 0 0 1 .845-3.578l16-32 14.31 7.156L232 81.889V160h120V81.889l-15.155-30.311 14.31-7.156 16 32A7.994 7.994 0 0 1 368 80v32h10.725l19.221-44.85-46.512-29.07a39.968 39.968 0 0 0-21.2-6.08h-76.468a39.968 39.968 0 0 0-21.2 6.08l-7.2 4.5-8.481-13.568 7.2-4.5A55.944 55.944 0 0 1 253.766 16h76.468a55.944 55.944 0 0 1 29.68 8.512l52.326 32.7a8 8 0 0 1 3.113 9.935l-24 56A8 8 0 0 1 384 128h-16v72a49.617 49.617 0 0 0 14.627 35.314l40.427 40.427c6.183-38.326-1.532-76.676-21.573-104.854a8 8 0 0 1 4.207-12.3l16.76-5.06a35.39 35.39 0 0 1 31.594 5.6 38.912 38.912 0 0 1 15.284 27.317l.4.32c17.606 13.937 23.988 38.417 16.036 59.615 8.635 15.3 11.219 31.368 8.9 54.211a128.993 128.993 0 0 1-5.463 24.648l-15.276-4.759a113.425 113.425 0 0 0 4.821-21.506c2.132-21.033-.307-34.408-8.7-47.7a8 8 0 0 1-.466-7.694c7.289-15.391 3.169-34.01-9.8-44.274l-3.233-2.562a8 8 0 0 1-3.031-6.27 22.715 22.715 0 0 0-9.029-18.5 19.533 19.533 0 0 0-17.431-3.13l-6.567 1.983c19.706 33.327 25.7 76.557 16.206 118.563l.948.948a198.206 198.206 0 0 1 43.196 64.63ZM352 176H232v16h120Zm-104-48h16a16 16 0 0 0 13.886-8.083A15.51 15.51 0 0 1 264 104.512v-9.024A15.506 15.506 0 0 1 279.488 80h17.024A15.506 15.506 0 0 1 312 95.488v9.024a15.51 15.51 0 0 1-13.886 15.405A16 16 0 0 0 312 128h16v16h-16a31.933 31.933 0 0 1-24-10.856A31.933 31.933 0 0 1 264 144h-16Zm32-24h16v-8h-16Zm-16-40h-16v16h16Zm64 0h-16v16h16Z" />
  </Svg>
);

export default PetSvg;
