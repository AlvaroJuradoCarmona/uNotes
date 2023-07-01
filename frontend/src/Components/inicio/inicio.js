import * as React from 'react';
import Button from '@mui/material/Button';

import "./inicio.css";

export default function Inicio() {
  return (
  <>
    <div className="nav">
      <div className="buttonSignin">
        <Button variant="contained">Iniciar Sesión</Button>
      </div>

      <div className="buttonSignup">
        <Button variant="contained">Regístrate</Button>
      </div>
    </div>

    <div className="header">
      <div className="indeximg" />
      <svg
        className="vector"
        width="532"
        height="533"
        viewBox="0 0 532 533"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M270.108 0.414969C349.007 -4.08455 427.554 28.1136 477.599 91.5882C528.381 155.996 542.097 242.425 525.034 323.746C507.74 406.162 462.45 483.63 388.164 517.816C316.166 550.948 236.333 524.565 165.28 489.302C93.8965 453.874 19.2112 407.022 2.96315 326.641C-13.0654 247.346 38.8099 175.462 89.3625 113.729C137.322 55.1623 196.168 4.63163 270.108 0.414969Z"
          fill="white"
        />
      </svg>

      <svg
        className="vector2"
        width="493"
        height="509"
        viewBox="0 0 493 509"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M250.307 0.396284C323.422 -3.90063 396.211 26.8477 442.587 87.4641C489.646 148.972 502.357 231.509 486.544 309.168C470.519 387.874 428.548 461.853 359.708 494.499C292.988 526.14 219.008 500.945 153.164 467.27C87.0131 433.437 17.8029 388.695 2.74593 311.933C-12.1076 236.209 35.9648 167.561 82.8115 108.608C127.256 52.6784 181.788 4.42308 250.307 0.396284Z"
          fill="#6750A4"
          fillOpacity="0.28"
        />
      </svg>

      <div className="button">
        <div className="state-layer">
          <div className="label-text">Regístrate</div>
        </div>
      </div>

      <div className="aprueba">APRUEBA</div>

      <div className="aprende">APRENDE</div>

      <div className="comparte">COMPARTE</div>
    </div>
    <div className="container">
      <div className="vineta1" />
      <div className="texto1">
        <h1>Comparte, descubre y triunfa en tus examenes! </h1>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui anim id est laborum . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"</p>
      </div>
    </div>
    <div className="container2">
      <div className="texto2">
        <h1>Consigue experiencia, puntos y sube a lo más alto del ranking </h1>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui anim id est laborum . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"</p>
      </div>
      <div className="vineta2" />
    </div>
  </>
  );
};
