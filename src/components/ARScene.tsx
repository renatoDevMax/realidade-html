"use client";

import { useEffect } from "react";
import { PRODUCTS } from "@/constants/products";

interface ARSceneProps {
  modelUrl: string;
  currentIndex: number;
}

export function ARScene({ modelUrl, currentIndex }: ARSceneProps) {
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;

    // Função para solicitar o wake lock
    const requestWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock ativado");
      } catch (err) {
        console.log("Wake Lock não suportado", err);
      }
    };

    // Função para reativar o wake lock quando o documento ficar visível novamente
    const handleVisibilityChange = async () => {
      if (wakeLock !== null && document.visibilityState === "visible") {
        await requestWakeLock();
      }
    };

    // Carrega os scripts necessários
    const loadScripts = async () => {
      // Solicita o wake lock
      await requestWakeLock();

      // Adiciona listener para mudanças de visibilidade
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Carrega A-Frame
      const aframe = document.createElement("script");
      aframe.src = "https://aframe.io/releases/1.4.0/aframe.min.js";
      aframe.crossOrigin = "anonymous";
      document.head.appendChild(aframe);

      await new Promise((resolve) => (aframe.onload = resolve));

      // Carrega AR.js
      const arjs = document.createElement("script");
      arjs.src =
        "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js";
      arjs.crossOrigin = "anonymous";
      document.head.appendChild(arjs);

      await new Promise((resolve) => (arjs.onload = resolve));

      // Cria a cena AR
      const scene = document.createElement("a-scene");
      scene.setAttribute("embedded", "");
      scene.setAttribute(
        "arjs",
        "sourceType: webcam; debugUIEnabled: false; trackingMethod: best;"
      );
      scene.setAttribute("renderer", "antialias: true; alpha: true;");
      scene.setAttribute("vr-mode-ui", "enabled: false");

      // Cria o marcador
      const marker = document.createElement("a-marker");
      marker.setAttribute("preset", "hiro");
      marker.setAttribute("type", "pattern");

      // Cria todos os modelos
      const models = PRODUCTS.map((product, index) => {
        const model = document.createElement("a-entity");
        model.setAttribute("gltf-model", product.model);
        model.setAttribute("scale", "3 3 3");
        model.setAttribute("rotation", "-35 0 0");

        // Posiciona os modelos: atual no centro (0), outros à esquerda (-10)
        const xPosition = index === currentIndex ? 0 : -10;
        model.setAttribute("position", `${xPosition} 0 0`);

        // Adiciona animação para transição suave
        model.setAttribute(
          "animation",
          `property: position; dur: 300; easing: easeInOutQuad; to: ${xPosition} 0 0`
        );

        return model;
      });

      // Adiciona todos os modelos ao marcador
      models.forEach((model) => marker.appendChild(model));

      // Cria a câmera
      const camera = document.createElement("a-entity");
      camera.setAttribute("camera", "");
      camera.setAttribute("look-controls", "enabled: false");

      // Monta a hierarquia
      scene.appendChild(marker);
      scene.appendChild(camera);

      // Adiciona a cena ao body
      document.body.appendChild(scene);
    };

    loadScripts();

    // Cleanup
    return () => {
      // Remove o wake lock
      if (wakeLock) {
        wakeLock.release().then(() => {
          console.log("Wake Lock liberado");
        });
      }

      // Remove o listener de visibilidade
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Remove os scripts
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
  }, [currentIndex]);

  return null;
}
