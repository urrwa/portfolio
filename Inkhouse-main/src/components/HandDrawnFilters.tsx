/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export default function HandDrawnFilters() {
  const [wiggleIndex, setWiggleIndex] = useState(0);

  // Rotate between different turbulence seeds to create the subtle wiggling animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWiggleIndex((prev) => (prev + 1) % 3);
    }, 180); // Quick animation to simulate natural drawing breathing
    return () => clearInterval(interval);
  }, []);

  return (
    <svg className="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Sketch filter 1 */}
        <filter id="sketch-wiggle-0" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" seed="45" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Sketch filter 2 */}
        <filter id="sketch-wiggle-1" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="noise" seed="98" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Sketch filter 3 */}
        <filter id="sketch-wiggle-2" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.038" numOctaves="3" result="noise" seed="12" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Paper texture overlay filter */}
        <filter id="paper-texture-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" />
          <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="1.5" result="light">
            <feDistantLight azimuth="55" elevation="65" />
          </feDiffuseLighting>
          <feBlend mode="multiply" in="SourceGraphic" in2="light" />
        </filter>
      </defs>

      {/* Inject style helper to assign filters globally */}
      <style>
        {`
          .sketch-element {
            filter: url('#sketch-wiggle-${wiggleIndex}');
          }
          .sketch-text {
            filter: url('#sketch-wiggle-${(wiggleIndex + 1) % 3}');
          }
        `}
      </style>
    </svg>
  );
}
