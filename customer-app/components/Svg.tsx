import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  G,
  LinearGradient,
  Defs,
  Stop,
} from "react-native-svg";

export const Home = (props: SvgProps) => (
  <Svg viewBox="0 0 472 512" {...props}>
    <Path
      fill={props.fill}
      d="M209 10.8c15.2-14.3 38.9-14.3 54.1 0L453.6 191c11.8 11.1 18.5 26.7 18.5 42.9V452c0 33.1-26.9 60-60 60h-76.7c-33.1 0-60-26.9-60-60v-97.1c0-11-9-20-20-20h-38.7c-11 0-20 9-20 20V452c0 33.1-26.9 60-60 60H60c-33.1 0-60-26.9-60-60V233.8c0-16.2 6.7-31.7 18.5-42.9L209 10.8zm40.7 41.5c-7.7-7.3-19.8-7.3-27.5 0L45.5 219.5c-3.9 3.7-6.2 8.9-6.2 14.3V453c0 10.9 8.8 19.7 19.7 19.7h78.6c10.9 0 19.7-8.8 19.7-19.7v-98.4c0-32.6 26.4-59 59-59h39.3c32.6 0 59 26.4 59 59V453c0 10.9 8.8 19.7 19.7 19.7H413c10.9 0 19.7-8.8 19.7-19.7V233.8c0-5.4-2.2-10.6-6.2-14.3L249.7 52.3z"
    />
  </Svg>
);

export const Discover = (props: SvgProps) => (
  <Svg viewBox="0 0 472 512" {...props}>
    <Path
      fill={props.fill}
      d="M414.1 61 254.5 414.2V308.5c0-35.7-28.8-64.7-64.2-64.7H83.8L414.1 61m33.7-61c-3.8 0-7.7 1-11.6 3.1L12.7 237.4c-22.1 12.2-13.6 46.4 11.5 46.4h166c13.4 0 24.2 11.1 24.2 24.7v178.8c0 15.6 12.2 24.7 24.5 24.7 8.6 0 17.2-4.5 21.7-14.4l209-462.5c8-17.5-5.5-35.1-21.8-35.1z"
    />
  </Svg>
);

export const Favorites = (props: SvgProps) => (
  <Svg viewBox="0 0 512 508.4" {...props}>
    <Path
      fill={props.fill}
      d="m255.1 64.7 35.3 75.2c14 29.9 41.8 50.7 74.3 55.7l85.9 13.1-65.2 67c-21.8 22.3-31.8 54-26.8 84.8l14.9 91.9-70.7-39.1c-14.6-8.1-31-12.3-47.7-12.3-16.4 0-32.7 4.2-47.1 12l-71.1 38.8 14.8-91.1c5-30.8-5-62.6-26.8-84.9l-65.2-66.9 85.9-13.1c32.5-5 60.3-25.8 74.3-55.7l35.2-75.4m0-64.7c-7.9 0-15.8 4.2-19.7 12.5L183.6 123c-8.3 17.7-24.9 30.1-44.2 33.1L18.5 174.6c-17.5 2.7-24.6 24-12.3 36.7l90 92.4c13 13.4 18.9 32.1 15.9 50.6L91.3 482.1c-2.3 14 8.9 25.3 21.5 25.3 3.4 0 7-.8 10.4-2.7L227 448.1c8.7-4.8 18.3-7.1 28-7.1s19.5 2.4 28.3 7.3l103.6 57.3c3.4 1.9 7 2.8 10.5 2.8 12.6 0 23.7-11.2 21.5-25.3L398 354.2c-3-18.4 2.9-37.2 15.9-50.5l92.4-94.8c11.4-11.7 4.8-31.3-11.3-33.7l-124.3-19c-19.3-3-35.9-15.4-44.2-33.1L274.8 12.5C270.8 4.2 263 0 255.1 0z"
    />
  </Svg>
);

export const Account = (props: SvgProps) => (
  <Svg viewBox="0 0 445.6 512" {...props}>
    <Path
      fill={props.fill}
      d="M384.6 266H61c-33.7 0-61 27.3-61 61l9 166.1c.6 10.6 9.3 18.9 19.9 18.9 11.5 0 20.6-9.6 19.9-21L40 327c0-11.6 9.4-21 21-21h323.7c11.5 0 21 9.4 21 21l-8.9 164c-.6 11.4 8.5 21 19.9 21 10.6 0 19.4-8.3 19.9-18.9l9-166.1c0-33.7-27.3-61-61-61zM222.8 40c45.8 0 83 37.2 83 83s-37.2 83-83 83-83-37.2-83-83 37.2-83 83-83m0-40c-67.9 0-123 55.1-123 123s55.1 123 123 123 123-55.1 123-123S290.7 0 222.8 0z"
    />
  </Svg>
);

export const BusinessName = (props: SvgProps) => (
  <Svg viewBox="0 0 512 512" {...props}>
    <Path d="M510.9 184.3 473.1 26.9C469.2 11 455.9 0 440.7 0H71.3C56.1 0 42.8 11 39 26.9L1.1 184.3c-2.5 10.4-.6 21.3 5.2 29.9 3.7 5.4 8.6 9.5 14.2 11.9-.3 2.6-.5 5.2-.5 7.8V452c0 33.1 26.9 60 60 60h76.7c33.1 0 60-26.9 60-60v-97.1c0-11 9-20 20-20h38.7c11 0 20 9 20 20V452c0 33.1 26.9 60 60 60H432c33.1 0 60-26.9 60-60V233.8c0-2.6-.2-5.2-.5-7.8 5.7-2.4 10.6-6.4 14.2-11.9 5.8-8.5 7.7-19.4 5.2-29.8zM373.4 40h60.3c.8 0 1.4.5 1.6 1.3l35.4 147.1.3 1.2c-24.6 3-45.5 2.1-58.1-2.5-.4-.1-.8-.3-1.3-.5-5.4-2.1-12.4-6-20.4-11-6.7-4.2-10.9-11.3-11.5-19.2l-4.1-58-4-56.7c.1-.9.9-1.7 1.8-1.7zM189.2 142l3-42.3 4.1-58v-.1c.1-.9.8-1.5 1.7-1.5h116.1c.9 0 1.6.7 1.7 1.5v.1l4.1 58 3 42.3c1.4 19.3-9.8 37.5-27.8 44.7-.4.2-.8.3-1.1.4-29 10.6-46.7 10.6-75.7 0-.4-.1-.7-.3-1.1-.4-18.2-7.2-29.3-25.4-28-44.7zM41.3 188.3l35.3-147c.2-.7.8-1.3 1.6-1.3h60.3c1 0 1.7.8 1.7 1.8l-4 56.7-4.1 58c-.6 7.8-4.8 15-11.5 19.2-8 5-15 8.8-20.4 11-.5.2-.9.4-1.3.5-12.6 4.6-33.5 5.5-58.1 2.5l.5-1.4zM452.7 453c0 10.9-8.8 19.7-19.7 19.7h-78.6c-10.9 0-19.7-8.8-19.7-19.7v-98.4c0-32.6-26.4-59-59-59h-39.4c-32.6 0-59 26.4-59 59V453c0 10.9-8.8 19.7-19.7 19.7H79c-10.9 0-19.7-8.8-19.7-19.7V233.8c0-.9.1-1.8.2-2.7 2.7.1 5.5.2 8.2.2 15.6 0 31.5-1.7 45-6.6 14.6-5.3 31.9-16.5 43.7-24.9.4-.3.8-.5 1.1-.8.6-.5 1.5-.5 2.1 0 .7.6 1.5 1.2 2.2 1.7 11.5 8.1 28.2 18.8 42.4 24 18.8 6.9 35.2 10.3 51.6 10.3 8.2 0 16.4-.9 24.9-2.6 8.5-1.7 17.3-4.3 26.7-7.7 14.2-5.2 30.9-15.9 42.4-24 .8-.5 1.5-1.1 2.2-1.7.6-.5 1.5-.5 2.1 0 .4.3.7.6 1.1.8 11.9 8.4 29.1 19.6 43.8 24.9 13.5 4.9 29.4 6.6 45 6.6 2.8 0 5.5 0 8.2-.2.1.9.2 1.8.2 2.7V453z" />
  </Svg>
);

export const LocationPin = (props: SvgProps) => (
  <Svg viewBox="0 0 342 512" {...props}>
    <Path d="M171.8 40c37.5 0 71.6 14.5 96 40.7 24.6 26.4 36.6 61.9 33.8 100-2 27.1-12.2 52.6-29.5 73.6-2.8 3.1-5.6 6.2-8.7 9.6-.8.9-1.6 1.8-2.3 2.7l-3.3 3.9c-.7.8-1.2 1.5-1.6 1.8-43.4 49.1-68.7 113-85.8 161.4-19-50.6-48-120.3-92-169.8l-10.1-11.4c-8.7-10.9-15.5-23-20.4-36.1-5.2-14.5-7.9-29.8-7.9-45.4 0-69.6 54.3-127 123.7-130.8 2.7-.1 5.4-.2 8.1-.2m0-40c-3.4 0-6.8.1-10.2.3C71.5 5.2 0 79.7 0 171c0 41.7 14.9 79.9 39.7 109.6 3 3.3 11.1 12.5 14 15.8l-5.1-5.9c57 64.3 87.6 170.1 103.9 209.2 3.4 8.2 10.9 12.3 18.4 12.3s15-4.1 18.4-12.3c16.3-39.1 40-136.9 97.1-201.2l6.9-8.1c2.9-3.3 5.8-6.5 8.9-9.8 22.3-26.7 36.6-60.2 39.3-97C348.9 81.6 272.4 0 171.8 0zm-.8 121c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40z" />
  </Svg>
);

export const BusinessType = (props: SvgProps) => (
  <Svg viewBox="0 0 323.2 635" {...props}>
    <Path d="M263.2 123H60C23.4 123-4.7 155.5.6 191.7l57.4 392c4.3 29.5 29.6 51.3 59.4 51.3h88.3c29.8 0 55-21.8 59.4-51.3L300 345.2l22.5-153.5c5.3-36.2-22.7-68.7-59.3-68.7zm19.7 62.9-20.6 140.6-1.9 12.9-2.5 17.2L225.5 578c-1.4 9.8-9.9 17.1-19.8 17.1h-88.3c-9.8 0-18.4-7.4-19.8-17.1L65.1 355.7l-4.6-31.4-20.3-138.4c-1.2-7.9 2.4-13.4 4.7-16 2.2-2.6 7.2-6.9 15.1-6.9h203.1c8 0 12.9 4.3 15.1 6.9 2.3 2.6 5.9 8.2 4.7 16zm-20.6 140.6-1.9 12.9-2.5 17.2c-3.9-1.1-7.5-2.3-10.9-3.5-10.9-3.7-20.2-6.9-40.3-6.9-20.1 0-29.5 3.2-40.3 6.9-11.7 4-24.9 8.5-50 8.5-24.2 0-36.5-2.7-48.3-5.2l-3-.6-4.6-31.4c5.1.8 9.5 1.8 13.9 2.7 7.7 1.7 15 3.2 26.1 4 4.6.3 9.8.5 15.9.5 5.5 0 10.2-.2 14.4-.7 11-1.1 18.1-3.6 25.9-6.2 11.7-4 24.9-8.5 50-8.5s38.3 4.5 50 8.5c2 .6 3.8 1.2 5.6 1.8zM182.9 78.2c4.3-30.7 26.6-55.2 56.8-62.5l64-15.3c8-1.9 16.1 3 18.1 11.1 1.9 8.1-3 16.2-11.1 18.1l-64 15.4c-18.1 4.3-31.5 19.1-34.1 37.5l-5.7 40.6h-30.3l6.3-44.9zM171 163h30.3l-23.7 168c-4.6.3-9.8.5-15.9.5-5.5 0-10.2-.2-14.4-.7L171 163z" />
  </Svg>
);

export const AccountStatisticsPin = (props: SvgProps) => (
  <Svg width={34} height={50} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="M16.92 0c.338 0 .676.01 1.014.03C26.892.507 34 7.782 34 16.7c0 4.072-1.481 7.802-3.947 10.702-.298.313-1.083 1.201-1.382 1.534l-.01.01c-2.584 3.056-4.603 6.943-6.173 10.556-1.67 3.848-2.834 7.383-3.649 9.297C18.501 49.599 17.756 50 17 50s-1.491-.4-1.84-1.201c-1.62-3.828-3.976-13.37-9.642-19.649l-.686-.79a38.775 38.775 0 0 0-.885-.958A16.48 16.48 0 0 1 .04 17.93C-.686 7.959 6.92 0 16.92 0ZM17 19.629c2.197 0 3.977-1.748 3.977-3.906 0-2.159-1.78-3.907-3.977-3.907s-3.977 1.748-3.977 3.907c0 2.158 1.78 3.906 3.977 3.906Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={17}
        x2={17}
        y1={50}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopOpacity={0} />
        <Stop offset={1} stopOpacity={0.25} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export const AccountStatisticsDollar = (props: SvgProps) => (
  <Svg width={32} height={50} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="M32 32.874c0 3.01-1.015 5.608-3.045 7.792-2.011 2.166-5.112 3.46-9.304 3.883a1.43 1.43 0 0 0-.93.44c-.226.257-.339.56-.339.909V50h-4.736v-4.268c0-.33-.122-.624-.367-.88a1.451 1.451 0 0 0-.845-.441c-4.042-.606-7.124-2.047-9.248-4.323C1.062 37.794 0 34.894 0 31.388h9.699c0 1.688.61 3.028 1.832 4.02 1.24.972 2.848 1.459 4.821 1.459 1.842 0 3.29-.33 4.342-.991 1.072-.661 1.607-1.551 1.607-2.671 0-1.248-.573-2.194-1.72-2.836-1.127-.66-3.326-1.367-6.597-2.12-4.51-1.01-7.81-2.496-9.896-4.46C2.021 21.823.987 19.264.987 16.106c0-2.753.93-5.103 2.791-7.049 1.88-1.945 4.765-3.148 8.655-3.606.339-.037.62-.175.846-.413.245-.24.367-.551.367-.937V0h4.736v4.268c0 .33.104.624.31.88.207.24.49.377.846.414 3.628.605 6.372 2.01 8.233 4.212 1.86 2.203 2.791 4.846 2.791 7.93h-9.699c0-1.432-.46-2.552-1.381-3.36-.902-.807-2.18-1.21-3.834-1.21-3.309 0-4.963 1.027-4.963 3.083 0 .936.499 1.735 1.495 2.395 1.015.661 2.922 1.35 5.723 2.065 2.162.533 4.022 1.12 5.582 1.762a23.151 23.151 0 0 1 4.37 2.368c1.373.936 2.406 2.084 3.102 3.442.695 1.358 1.043 2.9 1.043 4.625Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={16.07}
        x2={16.07}
        y1={-0.599}
        y2={53.62}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopOpacity={0.3} />
        <Stop offset={1} stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export const AccountStatisticsArrow = (props: SvgProps) => (
  <Svg width={35} height={50} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="M24.196 50H10.804V24.747H0L17.5 0 35 24.747H24.196V50Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={17.5}
        x2={17.5}
        y1={50}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopOpacity={0} />
        <Stop offset={1} stopOpacity={0.3} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export const AccountStatisticsPicture = (props: SvgProps) => (
  <Svg width={50} height={50} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="M41.667 0H8.333A8.333 8.333 0 0 0 0 8.333v33.334A8.333 8.333 0 0 0 8.333 50h33.334A8.333 8.333 0 0 0 50 41.667V8.333A8.333 8.333 0 0 0 41.667 0ZM8.333 5.556h33.334a2.778 2.778 0 0 1 2.777 2.777v23.223l-8.888-7.584a7.695 7.695 0 0 0-9.778 0L5.556 40.833v-32.5a2.778 2.778 0 0 1 2.777-2.777Z"
    />
    <Path
      fill="url(#b)"
      d="M12.379 17.33a3.714 3.714 0 1 0 0-7.427 3.714 3.714 0 0 0 0 7.427Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={25}
        x2={25}
        y1={0}
        y2={50}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopOpacity={0.3} />
        <Stop offset={1} stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={25}
        x2={25}
        y1={0}
        y2={50}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopOpacity={0.3} />
        <Stop offset={1} stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export const AccountSettings = (props: SvgProps) => (
  <Svg viewBox="0 0 512 512" {...props}>
    <Path d="m290.6 40 3.8 19.5c4.7 24.3 19.8 45.3 41.4 57.8l.3.2c13.2 7.6 28.1 11.7 43.3 11.7 9.4 0 18.7-1.5 27.6-4.6l14.5-5c.6-.2 1.2-.3 1.8-.3 1.5 0 3.6.7 4.7 2.7l30.1 52.1c1.3 2.3.8 5.1-1.1 6.8L445.3 191c-18.7 16.2-29.3 39.7-29.3 64.5v1c0 24.7 10.7 48.2 29.3 64.5l15 13.1-34.6 59.9-18.8-6.4c-8.9-3.1-18.2-4.6-27.6-4.6-15.1 0-30.1 4-43.3 11.7l-.3.2c-21.6 12.5-36.7 33.5-41.4 57.8l-3.8 19.5h-69.1l-3.8-19.5c-4.7-24.3-19.8-45.3-41.5-57.8l-.3-.1c-13.2-7.6-28.1-11.7-43.3-11.7-9.4 0-18.7 1.5-27.6 4.6l-18.8 6.4-34.6-59.9 15-13.1C85.3 304.8 96 281.3 96 256.5v-1c0-24.7-10.7-48.2-29.3-64.5l-15-13.1L86.3 118l18.8 6.4c8.9 3.1 18.2 4.6 27.6 4.6 15.1 0 30.1-4 43.3-11.7l.3-.2c21.6-12.5 36.7-33.5 41.4-57.8l3.8-19.5h69.1M307 0H205c-9.6 0-17.8 6.8-19.6 16.2l-7 35.7c-2.5 13-10.7 24.2-22.2 30.8-.1.1-.2.1-.4.2-7.1 4.1-15.2 6.3-23.2 6.3-4.9 0-9.9-.8-14.6-2.4L83.6 74.9c-2.1-.7-4.3-1.1-6.5-1.1-7 0-13.7 3.7-17.3 10l-51 88.4c-4.8 8.3-3 18.8 4.2 25.1l27.4 23.9c9.9 8.6 15.6 21.1 15.6 34.3v1c0 13.1-5.7 25.7-15.6 34.3L13 314.7c-7.2 6.3-9 16.8-4.2 25.1l51 88.4c3.7 6.3 10.3 10 17.3 10 2.2 0 4.4-.4 6.5-1.1l34.4-11.8c4.8-1.6 9.7-2.4 14.6-2.4 8.1 0 16.1 2.1 23.2 6.3.1.1.2.1.4.2 11.5 6.6 19.6 17.8 22.2 30.8l7 35.7c1.8 9.4 10.1 16.2 19.6 16.2h102c9.6 0 17.8-6.8 19.6-16.2l7-35.7c2.5-13 10.7-24.2 22.2-30.8.1-.1.2-.1.4-.2 7.1-4.1 15.2-6.3 23.2-6.3 4.9 0 9.9.8 14.6 2.4l34.4 11.8c2.1.7 4.3 1.1 6.5 1.1 7 0 13.7-3.7 17.3-10l51-88.4c4.8-8.3 3-18.8-4.2-25.1l-27.4-23.9c-9.9-8.6-15.6-21.1-15.6-34.3v-1c0-13.1 5.7-25.7 15.6-34.3l11.6-10.1c16.4-14.3 20.4-38.2 9.5-57l-30-52.1c-8.3-14.4-23.5-22.7-39.4-22.7-4.9 0-9.9.8-14.8 2.5l-14.5 5c-4.8 1.6-9.7 2.4-14.6 2.4-8.1 0-16.1-2.1-23.2-6.3-.1-.1-.2-.1-.4-.2-11.5-6.6-19.6-17.8-22.2-30.8l-7-35.7C324.8 6.8 316.6 0 307 0zm-51 196c33.1 0 60 26.9 60 60s-26.9 60-60 60-60-26.9-60-60 26.9-60 60-60m0-40c-55.2 0-100 44.8-100 100s44.8 100 100 100 100-44.8 100-100-44.8-100-100-100z" />
  </Svg>
);
