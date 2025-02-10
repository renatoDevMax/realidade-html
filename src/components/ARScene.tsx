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

      // Cria um plano branco como fundo do texto
      const plane = document.createElement("a-plane");
      plane.setAttribute("position", "0 0 0");
      plane.setAttribute("rotation", "-90 0 0");
      plane.setAttribute("width", "1");
      plane.setAttribute("height", "0.5");
      plane.setAttribute("color", "#FFFFFF");

      // Cria o texto
      const text = document.createElement("a-text");
      text.setAttribute("value", "Cartão de Visita Teste");
      text.setAttribute("position", "0 0 0.01");
      text.setAttribute("rotation", "-90 0 0");
      text.setAttribute("align", "center");
      text.setAttribute("color", "#000000");
      text.setAttribute("scale", "0.5 0.5 0.5");
      text.id = "texto-principal";

      // Cria o botão (usando um plano)
      const button = document.createElement("a-plane");
      button.setAttribute("position", "0.6 0.1 0"); // Elevamos um pouco o botão
      button.setAttribute("rotation", "-90 0 0");
      button.setAttribute("width", "0.3");
      button.setAttribute("height", "0.3");
      button.setAttribute("color", "#4285f4");
      button.setAttribute("class", "clickable");
      button.setAttribute("raycaster", "objects: [camera]"); // Habilita detecção de interação física

      // Cria o ícone do botão
      const buttonIcon = document.createElement("a-text");
      buttonIcon.setAttribute("value", "✓");
      buttonIcon.setAttribute("position", "0 0 0.01");
      buttonIcon.setAttribute("rotation", "0 0 0");
      buttonIcon.setAttribute("align", "center");
      buttonIcon.setAttribute("color", "#FFFFFF");
      buttonIcon.setAttribute("scale", "2 2 2");
      buttonIcon.setAttribute("baseline", "center");
      buttonIcon.setAttribute("wrapCount", "1");

      // Adiciona evento de proximidade ao botão
      let isNearButton = false;
      button.addEventListener("raycaster-intersected", () => {
        if (!isNearButton) {
          isNearButton = true;
          button.setAttribute("color", "#2962FF");
          const texto = document.getElementById("texto-principal");
          if (texto) {
            const novaCor = texto.getAttribute("color") === "#000000" ? "#0000FF" : "#000000";
            texto.setAttribute("color", novaCor);
          }
        }
      });

      button.addEventListener("raycaster-intersected-cleared", () => {
        isNearButton = false;
        button.setAttribute("color", "#4285f4");
      });

      // Monta a hierarquia
      button.appendChild(buttonIcon);
      marker.appendChild(plane);
      marker.appendChild(text);
      marker.appendChild(button);

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

      // Adiciona nova instrução
      const instruction = document.createElement("div");
      instruction.className = "ar-instruction";
      instruction.textContent = "Aproxime sua mão do botão para interagir";
      document.body.appendChild(instruction);

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
