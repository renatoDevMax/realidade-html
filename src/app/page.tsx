"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Carrega os scripts necessários
    const loadScripts = async () => {
      // Carrega A-Frame
      const aframe = document.createElement("script");
      aframe.src = "https://aframe.io/releases/1.4.0/aframe.min.js";
      document.head.appendChild(aframe);

      await new Promise((resolve) => (aframe.onload = resolve));

      // Carrega AR.js
      const arjs = document.createElement("script");
      arjs.src =
        "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js";
      document.head.appendChild(arjs);

      await new Promise((resolve) => (arjs.onload = resolve));

      // Cria a cena AR
      const scene = document.createElement("a-scene");
      scene.setAttribute("embedded", "");
      scene.setAttribute("arjs", "sourceType: webcam; debugUIEnabled: false;");

      // Cria o marcador
      const marker = document.createElement("a-marker");
      marker.setAttribute("preset", "hiro");

      // Cria o cubo vermelho
      const box = document.createElement("a-box");
      box.setAttribute("position", "0 0.5 0");
      box.setAttribute("material", "color: red;");
      box.setAttribute("scale", "1 1 1");
      box.setAttribute("rotation", "0 45 0");

      // Cria a câmera
      const camera = document.createElement("a-entity");
      camera.setAttribute("camera", "");

      // Monta a hierarquia
      marker.appendChild(box);
      scene.appendChild(marker);
      scene.appendChild(camera);

      // Adiciona a cena ao body
      document.body.appendChild(scene);
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

      const scene = document.querySelector("a-scene");
      if (scene) {
        scene.remove();
      }
    };
  }, []);

  return null;
}
