import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Circle, Use} from 'react-native-svg';

export const ProfileIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    {...props}
    viewBox="0 0 24 24">
    <G data-name="Group 17901">
      <Path data-name="Rectangle 6436" d="M0 0h24v24H0z" />
      <G
        data-name="Icon feather-user"
        fill="none"
        stroke="#ffc18b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}>
        <Path
          data-name="Path 6118"
          d="M20.067 21.201v-2.133a4.267 4.267 0 0 0-4.267-4.267H7.267A4.267 4.267 0 0 0 3 19.068v2.133"
        />
        <Path
          data-name="Path 6119"
          d="M15.801 6.267A4.267 4.267 0 1 1 11.534 2a4.267 4.267 0 0 1 4.267 4.267Z"
        />
      </G>
    </G>
  </Svg>
);

export const PaymentIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <G data-name="Group 17901">
      <Path data-name="Rectangle 6436" d="M0 0h24v24H0z" />
      <Path
        data-name="Icon material-payment"
        d="M21.5 3H3.278a2.26 2.26 0 0 0-2.267 2.278L1 18.943a2.27 2.27 0 0 0 2.278 2.277H21.5a2.27 2.27 0 0 0 2.278-2.278V5.278A2.27 2.27 0 0 0 21.5 3Zm0 15.943H3.278V12.11H21.5Zm0-11.388H3.278V5.278H21.5Z"
        fill="#ffc18b"
      />
    </G>
  </Svg>
);

export const CardsIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <G data-name="Group 17901">
      <Path data-name="Rectangle 6436" d="M0 0h24v24H0z" />
      <Path
        data-name="Icon material-card-giftcard"
        d="M19.663 6.925h-2.14a2.937 2.937 0 0 0-5.22-2.6l-.491.657-.491-.667A2.938 2.938 0 0 0 6.1 6.925H3.962A1.947 1.947 0 0 0 2.01 8.887L2 19.681a1.956 1.956 0 0 0 1.962 1.962h15.7a1.956 1.956 0 0 0 1.962-1.962V8.887a1.956 1.956 0 0 0-1.961-1.962Zm-4.907-1.963a.981.981 0 1 1-.981.981.984.984 0 0 1 .981-.981Zm-5.887 0a.981.981 0 1 1-.981.981.984.984 0 0 1 .981-.981Zm10.794 14.719H3.962v-1.962h15.7Zm0-4.906H3.962V8.887h4.985l-2.041 2.777L8.5 12.813l2.335-3.179.978-1.334.981 1.335 2.335 3.179 1.59-1.148-2.041-2.779h4.985Z"
        fill="#ffc18b"
      />
    </G>
  </Svg>
);

export const SitterIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <G data-name="Group 17901">
      <Path data-name="Rectangle 6436" d="M0 0h24v24H0z" />
      <Path
        data-name="Icon material-card-giftcard"
        d="M19.663 6.925h-2.14a2.937 2.937 0 0 0-5.22-2.6l-.491.657-.491-.667A2.938 2.938 0 0 0 6.1 6.925H3.962A1.947 1.947 0 0 0 2.01 8.887L2 19.681a1.956 1.956 0 0 0 1.962 1.962h15.7a1.956 1.956 0 0 0 1.962-1.962V8.887a1.956 1.956 0 0 0-1.961-1.962Zm-4.907-1.963a.981.981 0 1 1-.981.981.984.984 0 0 1 .981-.981Zm-5.887 0a.981.981 0 1 1-.981.981.984.984 0 0 1 .981-.981Zm10.794 14.719H3.962v-1.962h15.7Zm0-4.906H3.962V8.887h4.985l-2.041 2.777L8.5 12.813l2.335-3.179.978-1.334.981 1.335 2.335 3.179 1.59-1.148-2.041-2.779h4.985Z"
        fill="#ffc18b"
      />
    </G>
  </Svg>
);

export const InviteIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Defs>
      <ClipPath id="a">
        <Path
          data-name="Rectangle 6436"
          transform="translate(16 270)"
          fill="#fff"
          d="M0 0h24v24H0z"
        />
      </ClipPath>
    </Defs>
    <G data-name="Group 17901">
      <G
        data-name="Mask Group 230"
        clipPath="url(#a)"
        transform="translate(-16 -270)">
        <G data-name="010-promotion" fill="#ffc18b">
          <Path
            data-name="Path 6191"
            d="M37.342 279.575h-2.629a.282.282 0 1 0 0 .564h2.632a.282.282 0 0 0 0-.564Z"
          />
          <Path
            data-name="Path 6192"
            d="M34.284 278.285a19.151 19.151 0 0 0 1.86-1.32.282.282 0 1 0-.338-.452l-1.687 1.264a.284.284 0 0 0 .165.508Z"
          />
          <Path
            data-name="Path 6193"
            d="m34.119 281.941 1.692 1.264a.282.282 0 0 0 .338-.452l-1.692-1.264a.282.282 0 1 0-.338.452Z"
          />
          <Path
            data-name="Path 6194"
            d="M34.185 286.36a.282.282 0 1 0 .564 0 1.377 1.377 0 0 0-1.26-1.254v-.438a.282.282 0 0 0-.564 0v.432a1.386 1.386 0 0 0-1.3 1.26 1.386 1.386 0 0 0 1.3 1.26v1.421c-.417-.085-.733-.366-.733-.688a.282.282 0 0 0-.564 0 1.386 1.386 0 0 0 1.3 1.26v.432a.282.282 0 1 0 .564 0v-.435a1.377 1.377 0 0 0 1.26-1.254 1.377 1.377 0 0 0-1.26-1.254v-1.421a.8.8 0 0 1 .7.68Zm-1.993 0c0-.322.316-.6.733-.688v1.375c-.42-.084-.733-.364-.733-.687Zm1.993 1.993a.8.8 0 0 1-.7.68v-1.36a.8.8 0 0 1 .7.68Z"
          />
          <Path
            data-name="Path 6195"
            d="M33.188 283.259a4.075 4.075 0 0 0-1.579.317v-1.425a2.351 2.351 0 0 0 2.033-2.737.282.282 0 1 0-.556.1 1.788 1.788 0 0 1-1.477 2.071v-3.529a1.775 1.775 0 0 1 .955.475.282.282 0 1 0 .391-.407 2.337 2.337 0 0 0-1.346-.638v-3.683a1.259 1.259 0 0 0-2.508-.164l-6.2 3.83h-2.176a2.35 2.35 0 0 0-.47 4.652v2.492a.282.282 0 0 0 .564 0v-2.444h1.128v.753a10.3 10.3 0 0 0 .521 3.237.283.283 0 0 1-.268.37h-1.381v-.639a.282.282 0 0 0-.564 0v.921a.282.282 0 0 0 .282.282H22.2a.85.85 0 0 0 .8-1.111 9.734 9.734 0 0 1-.493-3.06v-.753h.39l3.228 1.994a.283.283 0 1 0 .3-.48l-1.47-.908v-5.912l4.136-2.554v11.024l-1.578-.975a.283.283 0 1 0-.3.48l2.008 1.24.029.015.027.01a4.1 4.1 0 1 0 3.9-2.844Zm-10.489-1.654h-1.974a1.786 1.786 0 1 1 0-3.572h1.974Zm1.692.821-1.128-.693v-3.825l1.128-.7Zm5.959-9.318a.7.7 0 0 1 .7.7v10.058a4.13 4.13 0 0 0-1.391 1.419v-11.482a.7.7 0 0 1 .691-.695Zm2.839 17.783a3.534 3.534 0 1 1 3.534-3.534 3.538 3.538 0 0 1-3.535 3.534Z"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export const CuponIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Defs>
      <ClipPath id="a">
        <Path
          data-name="Rectangle 6436"
          transform="translate(16 270)"
          fill="#fff"
          d="M0 0h24v24H0z"
        />
      </ClipPath>
    </Defs>
    <G data-name="Group 17901">
      <G
        data-name="Mask Group 227"
        clipPath="url(#a)"
        transform="translate(-16 -270)">
        <G data-name="017-discount" fill="#ffc18b">
          <Path
            data-name="Path 6182"
            d="M26.219 291.551a1.768 1.768 0 0 1-1.26-.522l-4.987-4.989a1.78 1.78 0 0 1-.034-2.483l8.034-8.328a2.5 2.5 0 0 1 1.809-.778h4.987a1.783 1.783 0 0 1 1.783 1.781v4.987a2.5 2.5 0 0 1-.779 1.81l-8.325 8.03a1.776 1.776 0 0 1-1.228.492Zm3.562-16.388a1.764 1.764 0 0 0-1.294.557l-8.036 8.331a1.068 1.068 0 0 0 .023 1.487l4.987 4.987a1.093 1.093 0 0 0 1.49.021l8.324-8.029a1.762 1.762 0 0 0 .557-1.294v-4.991a1.07 1.07 0 0 0-1.064-1.069Z"
          />
          <Path
            data-name="Path 6183"
            d="M32.987 279.438a1.425 1.425 0 1 1 1.425-1.425 1.426 1.426 0 0 1-1.425 1.425Zm0-2.137a.713.713 0 1 0 .681.712.713.713 0 0 0-.681-.713Z"
          />
          <Path
            data-name="Path 6184"
            d="M25.863 288.699a1.425 1.425 0 1 1 1.425-1.425 1.426 1.426 0 0 1-1.425 1.425Zm0-2.137a.713.713 0 1 0 .681.712.713.713 0 0 0-.681-.713Z"
          />
          <Path
            data-name="Path 6185"
            d="M27.288 282.288a1.425 1.425 0 1 1 1.425-1.425 1.426 1.426 0 0 1-1.425 1.425Zm0-2.137a.713.713 0 1 0 .681.712.713.713 0 0 0-.681-.713Z"
          />
          <Path
            data-name="Path 6186"
            d="M22.656 285.137a.356.356 0 0 1-.063-.707l7.836-1.429a.356.356 0 1 1 .128.7l-7.836 1.43a.286.286 0 0 1-.065.006Z"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export const CallIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <G data-name="Group 17901">
      <Path data-name="Rectangle 6436" d="M0 0h24v24H0z" />
      <Path
        data-name="Icon material-call"
        d="M6.558 10.656a14.888 14.888 0 0 0 6.477 6.477l2.165-2.162a.977.977 0 0 1 1-.236 11.211 11.211 0 0 0 3.509.56.986.986 0 0 1 .983.983v3.43a.986.986 0 0 1-.983.983A16.706 16.706 0 0 1 3 3.983.986.986 0 0 1 3.983 3h3.44a.986.986 0 0 1 .983.983 11.165 11.165 0 0 0 .56 3.509.986.986 0 0 1-.246 1Z"
        fill="#ffc18b"
      />
    </G>
  </Svg>
);

export const HelpIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Defs>
      <ClipPath id="a">
        <Path
          data-name="Rectangle 6436"
          transform="translate(16 270)"
          fill="#fff"
          d="M0 0h24v24H0z"
        />
      </ClipPath>
    </Defs>
    <G data-name="Group 17901">
      <G
        data-name="Mask Group 228"
        clipPath="url(#a)"
        transform="translate(-16 -270)">
        <Path
          data-name="Path 6187"
          d="M28 273.24a8.76 8.76 0 1 1-8.76 8.76 8.76 8.76 0 0 1 8.76-8.76Zm0 13.14a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1Zm0-10.95a3.285 3.285 0 0 1 3.285 3.285 2.024 2.024 0 0 1-.622 1.464l-.139.139-.665.594a2.682 2.682 0 0 0-.764 2.183 1.1 1.1 0 0 1-.967 1.087l-.128.008a1.1 1.1 0 0 1-1.1-1.1l.005-.314a4.743 4.743 0 0 1 1.252-3.265l.169-.173.246-.226.5-.44c.012-.008.016-.007.019 0l-.01-.107a1.1 1.1 0 0 0-2.173.018l-.015.256a1.1 1.1 0 0 1-2.182-.128A3.285 3.285 0 0 1 28 275.43Z"
          fill="#ffc18b"
          fillRule="evenodd"
        />
      </G>
    </G>
  </Svg>
);

export const PreferenceIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Defs>
      <ClipPath id="a">
        <Path
          data-name="Rectangle 6436"
          transform="translate(16 270)"
          fill="#fff"
          d="M0 0h24v24H0z"
        />
      </ClipPath>
    </Defs>
    <G data-name="Group 17901">
      <G
        data-name="Mask Group 229"
        clipPath="url(#a)"
        transform="translate(-16 -270)">
        <G fill="#ffc18b">
          <Path
            data-name="Path 6188"
            d="M32.785 282.156a4.658 4.658 0 0 0 4.258-4.258 5.081 5.081 0 0 0-.2-1.766l-2.474 2.475-2.974-2.974 2.473-2.477a5.078 5.078 0 0 0-1.765-.2 4.658 4.658 0 0 0-4.259 4.265 5.079 5.079 0 0 0 .2 1.767l-8.666 7.821a1.3 1.3 0 0 0-.093 1.847l.045.047 1.972 1.972a1.3 1.3 0 0 0 1.844 0 .956.956 0 0 0 .044-.046l7.827-8.673a5.083 5.083 0 0 0 1.768.2Z"
          />
          <Path
            data-name="Path 6189"
            d="M21.587 277.885h1.064l2.554 2.554 1.3-1.171-2.62-2.617v-1.064a.411.411 0 0 0-.12-.291l-2.348-2.348-2.469 2.469 2.348 2.348a.411.411 0 0 0 .291.12Z"
          />
          <Path
            data-name="Path 6190"
            d="m36.224 286.679-4.293-3.714a5.948 5.948 0 0 1-.633-.088l-2.641 2.921 4.022 4.426q.041.048.088.093a2.51 2.51 0 0 0 3.55 0l.088-.092a2.51 2.51 0 0 0-.181-3.546Z"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export const Profile2Icon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    {...props}>
    <Defs>
      <ClipPath id="a">
        <Path
          data-name="Rectangle 6302"
          transform="translate(15.805 225.805)"
          fill="#ffc18b"
          d="M0 0h20v20H0z"
        />
      </ClipPath>
    </Defs>
    <G
      data-name="Mask Group 204"
      transform="translate(-15.805 -225.805)"
      clipPath="url(#a)">
      <G transform="translate(18.615 226)" fill="#ffc18b">
        <Path
          data-name="Path 5506"
          d="M7.19 9.151A7.19 7.19 0 0 0 0 16.341v1.31a1.961 1.961 0 0 0 1.961 1.961h10.458a1.961 1.961 0 0 0 1.961-1.961v-1.31a7.19 7.19 0 0 0-7.19-7.19Z"
        />
        <Circle
          data-name="Ellipse 338"
          cx={3.922}
          cy={3.922}
          r={3.922}
          transform="translate(3.268)"
        />
      </G>
    </G>
  </Svg>
);

export const Payment2Icon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Defs>
      <ClipPath id="a">
        <Path
          data-name="Rectangle 6409"
          transform="translate(15.714 378.714)"
          fill="#ffc18b"
          d="M0 0h20v20H0z"
        />
      </ClipPath>
    </Defs>
    <G
      data-name="Mask Group 213"
      transform="translate(-15.714 -378.714)"
      clipPath="url(#a)">
      <G data-name="001---Vet" fill="#ffc18b">
        <Path d="M26.22 393.634a2.607 2.607 0 0 1 .621-2.724 5.135 5.135 0 0 0 .744-1.013 2.984 2.984 0 0 1 1.272-1.334v-.916a1.4 1.4 0 0 1-.937.359 1.619 1.619 0 0 1-1.158-.533 2.67 2.67 0 0 1-.694-1.48 2.669 2.669 0 0 1 .249-1.615 1.572 1.572 0 0 1 1.157-.88 1.6 1.6 0 0 1 1.384.555v-2.674a2.448 2.448 0 0 0-2.446-2.445h-1.4a2.448 2.448 0 0 0-2.442 2.445v3.493a.7.7 0 0 1-.7.7h-3.491a2.448 2.448 0 0 0-2.445 2.443v1.4a2.448 2.448 0 0 0 2.445 2.445h3.493a.7.7 0 0 1 .7.7v3.493a2.448 2.448 0 0 0 2.443 2.441h1.4a2.448 2.448 0 0 0 2.445-2.445v-1.69a1.966 1.966 0 0 1-1.08.292 1.607 1.607 0 0 1-1.56-1.017Zm-7.841-6.667a1.048 1.048 0 0 0-1.045 1.048.35.35 0 0 1-.7 0 1.749 1.749 0 0 1 1.745-1.746.35.35 0 0 1 0 .7Zm1.746 0h-.349a.35.35 0 0 1 0-.7h.349a.35.35 0 0 1 0 .7Zm5.222 3.491a1.785 1.785 0 0 1-1.513-1.075 1.6 1.6 0 0 1 .5-2.181 1.6 1.6 0 0 1 2.019.962 1.6 1.6 0 0 1-.5 2.181 1.147 1.147 0 0 1-.505.114Z" />
        <Path
          data-name="Shape"
          d="M27.573 384.19a.894.894 0 0 0-.638.515 2.113 2.113 0 0 0 .328 2.283.8.8 0 0 0 1.4-.2 1.847 1.847 0 0 0 .2-.862v-.01a2.29 2.29 0 0 0-.023-.318c-.121-.843-.7-1.487-1.261-1.407ZM24.841 387.783a.472.472 0 0 0-.21.046c-.341.165-.419.737-.171 1.248s.744.8 1.086.638.419-.737.171-1.248a1.108 1.108 0 0 0-.876-.684ZM31.63 390.263c-.442-.723-.735-1.2-1.724-1.2s-1.282.477-1.724 1.2a5.758 5.758 0 0 1-.848 1.144 1.938 1.938 0 0 0-.466 1.963.911.911 0 0 0 .911.583 1.372 1.372 0 0 0 .88-.294 2.125 2.125 0 0 1 2.5 0 1.372 1.372 0 0 0 .88.294.911.911 0 0 0 .911-.583 1.938 1.938 0 0 0-.474-1.964 5.759 5.759 0 0 1-.847-1.144ZM33.051 385.894c-.1.669-.591 1.5-1.261 1.407s-.91-1.032-.813-1.7c.1-.722.625-1.5 1.261-1.407.665.091.911 1.023.813 1.7ZM35.349 389.078c-.248.511-.745.8-1.086.638s-.419-.737-.172-1.248c.21-.432.7-.825 1.086-.638.341.165.42.738.172 1.248Z"
        />
      </G>
    </G>
  </Svg>
);

export const PetsIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Defs>
      <ClipPath id="a">
        <Path
          data-name="Rectangle 6307"
          transform="translate(16 529)"
          fill="#ffc18b"
          d="M0 0h22v22H0z"
        />
      </ClipPath>
    </Defs>
    <G
      data-name="Mask Group 208"
      transform="translate(-16 -529)"
      clipPath="url(#a)">
      <Path
        data-name="Path 5511"
        d="m33.026 532.928.944-2.2-2.284-1.43a1.963 1.963 0 0 0-1.041-.3H26.89a1.963 1.963 0 0 0-1.041.3l-2.284 1.428.944 2.2h.527v-1.569a.393.393 0 0 1 .042-.176l.786-1.571.7.351-.743 1.488v3.836h5.893v-3.836l-.743-1.488.7-.351.786 1.571a.393.393 0 0 1 .041.176v1.571Zm-6.419-2.357h.786v.786h-.786Zm3.929 3.929h-.786a1.568 1.568 0 0 1-1.179-.529 1.568 1.568 0 0 1-1.179.533h-.786v-.79h.786a.786.786 0 0 0 .682-.4.762.762 0 0 1-.682-.756v-.441a.761.761 0 0 1 .761-.761h.836a.761.761 0 0 1 .761.761v.443a.762.762 0 0 1-.682.756.786.786 0 0 0 .682.4h.786Zm0-3.143h-.786v-.786h.786Zm-4.715 4.714h5.893v.786h-5.893Zm11.667 3.319a.393.393 0 0 0 .023.378 3.363 3.363 0 0 1 .427 2.342 7.176 7.176 0 0 1-.439 1.643 9.738 9.738 0 0 0-1.579-2.067l-.047-.047a8.057 8.057 0 0 0-.8-5.822l.322-.1a.959.959 0 0 1 .856.154 1.115 1.115 0 0 1 .443.908.393.393 0 0 0 .149.308l.159.126a1.8 1.8 0 0 1 .486 2.177Zm-9.31-7.248h.786v.393h-.786Zm-11.393 10.782a6.294 6.294 0 0 0-.786 1.113v-2.145a1.958 1.958 0 0 1 .33-1.09l.78-1.171a2.737 2.737 0 0 0 .462-1.522v-.025a2.857 2.857 0 0 0-1.136-2.276c-.173-.13-.435-.259-.435-.506v-.015a.468.468 0 0 1 .756-.309l.243.195a3.619 3.619 0 0 1 .75 4.833l-.634.951a1.958 1.958 0 0 0-.33 1.09Zm3.929 7.29h-1.179a.393.393 0 0 1-.393-.393v-1.083a3.607 3.607 0 0 0-1.063-2.567l.556-.556a4.388 4.388 0 0 1 1.294 3.123v.69h.786a1.568 1.568 0 0 1 .393.05v-4.371h.786v4.855a1.565 1.565 0 0 1 .393 1.038h.784v-5.893h.786v5.5a1.574 1.574 0 0 1 1.179-1.522v-13.637a1.716 1.716 0 0 0-.827.8.393.393 0 0 1-.351.217h-1.966a.393.393 0 0 1-.351-.217 1.729 1.729 0 0 0-.827-.8v4.5a1.961 1.961 0 0 1-.875 1.634l-1.39.927A5.5 5.5 0 0 0 16 547.085v3.918h5.5a.787.787 0 0 0-.786-.786Zm2.75-12.964h.786v.786h-.786Zm-1.964 0h.786v.786H21.5Zm13.865 4.992A8.937 8.937 0 0 1 38 548.603v2.4h-7.465v-.393a.787.787 0 0 1 .786-.786H32.5a.393.393 0 0 0 .393-.393v-2.1a4.94 4.94 0 0 1 1.456-3.516l-.556-.556a5.721 5.721 0 0 0-1.686 4.072v1.706h-.786a1.561 1.561 0 0 0-.786.211v-7.284h-.786V551h-2.75v-.393a.787.787 0 0 1 .786-.786.393.393 0 0 0 .393-.393v-7.464h-.786v7.121a1.574 1.574 0 0 0-1.179 1.522V551h-1.571v-.393a.787.787 0 0 1 .786-.786.393.393 0 0 0 .393-.393v-11.786h5.917a3.213 3.213 0 0 0 .924 1.9Z"
        fill="#ffc18b"
      />
    </G>
  </Svg>
);

export const USAFlag = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={1235}
    height={650}
    viewBox="0 0 7410 3900"
    {...props}
  >
    <Path fill="#b22234" d="M0 0h7410v3900H0z" />
    <Path
      d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
      stroke="#fff"
      strokeWidth={300}
    />
    <Path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
    <G fill="#fff">
      <G id="d">
        <G id="c">
          <G id="e">
            <G id="b">
              <Path
                id="a"
                d="m247 90 70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
              />
              <Use xlinkHref="#a" y={420} />
              <Use xlinkHref="#a" y={840} />
              <Use xlinkHref="#a" y={1260} />
            </G>
            <Use xlinkHref="#a" y={1680} />
          </G>
          <Use xlinkHref="#b" x={247} y={210} />
        </G>
        <Use xlinkHref="#c" x={494} />
      </G>
      <Use xlinkHref="#d" x={988} />
      <Use xlinkHref="#c" x={1976} />
      <Use xlinkHref="#e" x={2470} />
    </G>
  </Svg>
);
