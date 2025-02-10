"use client";

import { useEffect, useRef } from "react";
import { AR_CONFIG } from "@/constants/ar";

export function ARScene() {
  const sceneInitializedRef = useRef(false);

  useEffect(() => {
    if (sceneInitializedRef.current) return;

    const initializeScene = async () => {
      // Carrega A-Frame
      const aframe = document.createElement("script");
      aframe.src = AR_CONFIG.scripts.aframe;
      document.head.appendChild(aframe);

      await new Promise((resolve) => (aframe.onload = resolve));

      // Carrega AR.js
      const arjs = document.createElement("script");
      arjs.src = AR_CONFIG.scripts.arjs;
      document.head.appendChild(arjs);

      await new Promise((resolve) => (arjs.onload = resolve));

      // Cria a cena AR
      const scene = document.createElement("a-scene");
      scene.setAttribute("embedded", "");
      scene.setAttribute("arjs", AR_CONFIG.scene.arjs);
      scene.setAttribute("renderer", AR_CONFIG.scene.renderer);
      scene.setAttribute("vr-mode-ui", "enabled: false");

      // Cria o marcador
      const marker = document.createElement("a-marker");
      marker.setAttribute("preset", AR_CONFIG.defaultMarker);

      // Cria um plano branco como fundo
      const plane = document.createElement("a-plane");
      plane.setAttribute("position", "0 0 0");
      plane.setAttribute("rotation", "-90 0 0");
      plane.setAttribute("width", "1");
      plane.setAttribute("height", "0.5");
      plane.setAttribute("color", "#FFFFFF");

      // Cria o texto
      const text = document.createElement("a-text");
      text.setAttribute("value", "Cartão de Visita Teste");
      text.setAttribute("position", "0 0 0.01"); // Ligeiramente acima do plano
      text.setAttribute("rotation", "-90 0 0");
      text.setAttribute("align", "center");
      text.setAttribute("color", "#000000");
      text.setAttribute("scale", "0.5 0.5 0.5");

      // Adiciona o plano e o texto ao marcador
      marker.appendChild(plane);
      marker.appendChild(text);

      // Cria a câmera
      const camera = document.createElement("a-entity");
      camera.setAttribute("camera", "");
      camera.setAttribute("look-controls", "enabled: false");

      // Monta a hierarquia
      scene.appendChild(marker);
      scene.appendChild(camera);

      // Adiciona a cena ao body
      document.body.appendChild(scene);

      // Cria o indicador de detecção
      const markerIndicator = document.createElement("div");
      markerIndicator.className = "marker-indicator";
      document.body.appendChild(markerIndicator);

      // Adiciona eventos de detecção do marcador
      marker.addEventListener("markerFound", () => {
        markerIndicator.classList.add("detected");
      });

      marker.addEventListener("markerLost", () => {
        markerIndicator.classList.remove("detected");
      });

      sceneInitializedRef.current = true;
    };

    initializeScene();

    return () => {
      const scene = document.querySelector("a-scene");
      const indicator = document.querySelector(".marker-indicator");
      if (scene) scene.remove();
      if (indicator) indicator.remove();
    };
  }, []);

  return null;
}
