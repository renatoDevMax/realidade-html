"use client";

import { useEffect, useState } from "react";

interface AFrameProps {
  embedded?: boolean;
  arjs?: string;
  renderer?: string;
  "vr-mode-ui"?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & AFrameProps,
        HTMLElement
      >;
      "a-entity": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "a-marker": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "a-box": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function Home() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Importa os scripts necessários dinamicamente
    const loadScripts = async () => {
      const aframeScript = document.createElement("script");
      aframeScript.src = "https://aframe.io/releases/1.4.0/aframe.min.js";
      document.head.appendChild(aframeScript);

      await new Promise((resolve) => (aframeScript.onload = resolve));

      const arjsScript = document.createElement("script");
      arjsScript.src =
        "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js";
      document.head.appendChild(arjsScript);

      await new Promise((resolve) => (arjsScript.onload = resolve));
      setScriptsLoaded(true);
    };

    loadScripts();

    // Cleanup
    return () => {
      const scripts = document.querySelectorAll("script");
      scripts.forEach((script) => {
        if (
          script.src.includes("aframe.min.js") ||
          script.src.includes("aframe-ar.js")
        ) {
          script.remove();
        }
      });
    };
  }, []);

  if (!scriptsLoaded) {
    return <div>Loading AR experience...</div>;
  }

  return (
    <a-scene
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; sourceWidth: 1080; sourceHeight: 1920; displayWidth: 1080; displayHeight: 1920;"
      renderer="logarithmicDepthBuffer: true; precision: medium; antialias: true; alpha: true;"
      vr-mode-ui="enabled: false"
    >
      {/* Criando um cubo vermelho */}
      <a-marker preset="hiro">
        <a-box
          position="0 0.5 0"
          material="color: red;"
          scale="1 1 1"
          rotation="0 45 0"
        ></a-box>
      </a-marker>

      {/* Câmera */}
      <a-entity camera></a-entity>
    </a-scene>
  );
}
