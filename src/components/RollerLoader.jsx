// RollerLoaderComponent.jsx
import React from "react";

export default function RollerLoader({ message = "Loading..." }) {
  const dots = Array.from({ length: 8 });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D87D4A]">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="w-30 h-30"
          viewBox="0 0 50 50"
          role="img"
          aria-label={message}
        >
          <g transform="translate(25 25)">
            <g>
              {dots.map((_, i) => {
                const angle = i * (360 / dots.length);
                const opacity = (i + 1) / dots.length;
                return (
                  <circle
                    key={i}
                    cx="18"
                    cy="0"
                    r="3.5"
                    fill="#fff"
                    transform={`rotate(${angle})`}
                    opacity={opacity}
                  />
                );
              })}

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="1s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        </svg>

        {/* visible label on wider screens, SR-only for a11y */}
        <span className="sr-only">{message}</span>
      </div>
    </div>
  );
}

/*
How to use
-----------
Import and use in your component where you currently check `loading`:

import RollerLoader from './RollerLoaderComponent';

if (loading) return <RollerLoader />;

Customization
-------------
- To change size: adjust the svg `w-20 h-20` classes.
- To slow down / speed up: change `dur` on <animateTransform> (e.g. "1.5s" or "0.7s").
- To change color: change `fill` on the <circle> elements.
*/
