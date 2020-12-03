/* eslint react/display-name: 0 */
import React from "react";

export const icons = {
  print: (): React.ReactElement => (
    <i>
      <svg xmlns="http://www.w3.org/2000/svg" width="56.81" height="50.77" viewBox="0 0 56.81 50.77">
        <defs>
          <linearGradient id="a" x1="29.18" y1="34.39" x2="29.18" y2="18.05" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#faa94e" />
            <stop offset="1" stopColor="#f47d4d" />
          </linearGradient>
        </defs>
        <title>Print</title>
        <path
          d="M13.08,26.42V6.48a3.64,3.64,0,0,1,3.64-3.64H42.05a3.64,3.64,0,0,1,3.64,3.64V25M17.21,49.61H51.94A3.64,3.64,0,0,0,55.58,46V30.06a3.64,3.64,0,0,0-3.64-3.64H6.41a3.64,3.64,0,0,0-3.64,3.64V46a3.64,3.64,0,0,0,3.64,3.65H9.93M21.87,11.7H37.58m-15.71,7H37.58m5.58,15,6.81,0"
          transform="translate(-0.77 -0.84)"
          fill="#fff"
          strokeWidth="4"
          stroke="url(#a)"
        />
      </svg>
    </i>
  ),
  send: (): React.ReactElement => (
    <i>
      <svg xmlns="http://www.w3.org/2000/svg" width="59.6" height="44.2" viewBox="0 0 59.6 44.2">
        <defs>
          <linearGradient
            id="a"
            x1="29.8"
            y1="17.28"
            x2="29.8"
            y2="31.55"
            gradientTransform="matrix(1, 0, 0, -1, 0, 47)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#faa94e" />
            <stop offset="1" stopColor="#f47d4d" />
          </linearGradient>
          <linearGradient
            id="b"
            x1="-569.09"
            y1="98.35"
            x2="-569.09"
            y2="100.46"
            gradientTransform="matrix(36.9, 0, 0, -14.68, 21029.48, 1503.59)"
            xlinkHref="#a"
          />
          <linearGradient
            id="c"
            x1="30.56"
            y1="55.8"
            x2="30.56"
            y2="61.4"
            gradientTransform="matrix(0.99, 0.17, 0.19, -1, -21.61, 83.11)"
            xlinkHref="#a"
          />
          <linearGradient
            id="d"
            x1="-456.93"
            y1="-19.99"
            x2="-456.93"
            y2="-14.38"
            gradientTransform="matrix(0.12, -0.99, -0.99, -0.11, 78.63, -424.23)"
            xlinkHref="#a"
          />
        </defs>
        <title>Email</title>
        <path
          d="M57.6,32.1V39a3.69,3.69,0,0,1-3.7,3.7H5.7A3.69,3.69,0,0,1,2,39V6.2A3.69,3.69,0,0,1,5.7,2.5H53.8a3.69,3.69,0,0,1,3.7,3.7V23.3"
          transform="translate(0 -0.5)"
          fill="#fff"
          strokeWidth="4"
          stroke="url(#a)"
        />
        <g>
          <path
            d="M6.8,9.5,29.4,27.4,52,9.5"
            transform="translate(0 -0.5)"
            fill="#fff"
            strokeWidth="4"
            stroke="url(#b)"
          />
          <line x1="12.6" y1="36.3" x2="26.6" y2="23.3" fill="none" strokeWidth="4" stroke="url(#c)" />
          <line x1="46.5" y1="36.2" x2="33.1" y2="23.3" fill="none" strokeWidth="4" stroke="url(#d)" />
        </g>
      </svg>
    </i>
  ),
  check: (): React.ReactElement => (
    <i>
      <svg xmlns="http://www.w3.org/2000/svg" width="17.32" height="11.83" viewBox="0 0 17.32 11.83">
        <title>check</title>
        <path
          d="M17.86,2.34,8.08,12.11a1,1,0,0,1-1.45,0L1.14,6.62A1,1,0,1,1,2.59,5.17L7.36,9.94,16.41.88a1,1,0,0,1,1.45,0A1,1,0,0,1,17.86,2.34Z"
          transform="translate(-0.84 -0.58)"
          fill="#fff"
        />
      </svg>
    </i>
  ),
  checkCircle: (): React.ReactElement => (
    <i>
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
        <title>check-circle</title>
        <path
          d="M29.87,5.13a17.48,17.48,0,0,0-24.74,0,17.48,17.48,0,0,0,0,24.74,17.48,17.48,0,0,0,24.74,0,17.48,17.48,0,0,0,0-24.74Z"
          fill="#09a63b"
        />
        <path
          d="M25.86,13.34l-9.78,9.77a1,1,0,0,1-1.45,0L9.14,17.62a1,1,0,0,1,1.45-1.45l4.77,4.77,9.05-9.06a1,1,0,0,1,1.45,0A1,1,0,0,1,25.86,13.34Z"
          fill="#fff"
        />
      </svg>
    </i>
  ),
  arrow: (): React.ReactElement => (
    <i>
      <svg xmlns="http://www.w3.org/2000/svg" width="8.1" height="14.36" viewBox="0 0 8.1 14.36">
        <title>arrow</title>
        <polyline points="0.74 0.68 6.74 7.13 0.74 13.68" fill="none" stroke="#09a63b" strokeWidth="2" />
      </svg>
    </i>
  ),
};
