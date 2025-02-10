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
      button.setAttribute("position", "0.6 0 0.01"); // Ajustado para ficar mais próximo e ligeiramente acima
      button.setAttribute("rotation", "-90 0 0");
      button.setAttribute("width", "0.3"); // Aumentado o tamanho
      button.setAttribute("height", "0.3"); // Aumentado o tamanho
      button.setAttribute("color", "#4285f4");
      button.setAttribute("class", "clickable");

      // Cria o ícone do botão (usando texto)
      const buttonIcon = document.createElement("a-text");
      buttonIcon.setAttribute("value", "✓");
      buttonIcon.setAttribute("position", "0 0 0.01");
      buttonIcon.setAttribute("rotation", "0 0 0");
      buttonIcon.setAttribute("align", "center");
      buttonIcon.setAttribute("color", "#FFFFFF");
      buttonIcon.setAttribute("scale", "2 2 2"); // Aumentado o tamanho do ícone
      buttonIcon.setAttribute("baseline", "center");
      buttonIcon.setAttribute("wrapCount", "1");

      // Adiciona evento de clique ao botão
      button.addEventListener("click", () => {
        const texto = document.getElementById("texto-principal");
        if (texto) {
          // Alterna entre azul e preto
          const novaCor = texto.getAttribute("color") === "#000000" ? "#0000FF" : "#000000";
          texto.setAttribute("color", novaCor);
        }
      });

      // Adiciona animação de hover ao botão
      button.addEventListener("mouseenter", () => {
        button.setAttribute("color", "#2962FF");
      });

      button.addEventListener("mouseleave", () => {
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

      // Adiciona cursor para interação
      const cursor = document.createElement("a-entity");
      cursor.setAttribute("cursor", {
        fuse: false,  // false = precisa clicar, true = olhar fixamente
        rayOrigin: "mouse",  // permite clique do mouse em desktop
      });
      cursor.setAttribute("position", "0 0 -1");
      cursor.setAttribute("geometry", {
        primitive: "ring",
        radiusInner: 0.02,
        radiusOuter: 0.03
      });
      cursor.setAttribute("material", {
        color: "#FFFFFF",
        shader: "flat",
        opacity: 0.8
      });
      cursor.setAttribute("animation__click", {
        property: "scale",
        startEvents: "click",
        easing: "easeInCubic",
        dur: 150,
        from: "0.1 0.1 0.1",
        to: "1 1 1"
      });
      camera.appendChild(cursor);

      // Adiciona texto de instrução
      const instruction = document.createElement("div");
      instruction.className = "ar-instruction";
      instruction.textContent = "Alinhe o círculo com o botão e toque na tela para interagir";
      document.body.appendChild(instruction);

      // Remove instrução quando marcador for perdido
      marker.addEventListener("markerLost", () => {
        instruction.style.opacity = "0";
      });

      // Mostra instrução quando marcador for encontrado
      marker.addEventListener("markerFound", () => {
        instruction.style.opacity = "1";
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
