"use client";

import { useEffect } from "react";
import { PRODUCTS } from "@/constants/products";

interface ARSceneProps {
  currentIndex: number;
}

export function ARScene({ currentIndex }: ARSceneProps) {
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

      // Cria os três modelos
      const model1 = document.createElement("a-entity");
      model1.setAttribute("gltf-model", "/modelos/hipo3d.glb");
      model1.setAttribute("scale", "3 3 3");
      model1.setAttribute("rotation", "-35 0 0");
      model1.setAttribute("position", currentIndex === 0 ? "0 0 0" : "-8 0 0");

      const model2 = document.createElement("a-entity");
      model2.setAttribute("gltf-model", "/modelos/tulimix3d.glb");
      model2.setAttribute("scale", "3 3 3");
      model2.setAttribute("rotation", "-35 0 0");
      model2.setAttribute("position", currentIndex === 1 ? "0 0 0" : "-8 0 0");

      const model3 = document.createElement("a-entity");
      model3.setAttribute("gltf-model", "/modelos/aguasanit3d.glb");
      model3.setAttribute("scale", "3 3 3");
      model3.setAttribute("rotation", "-35 0 0");
      model3.setAttribute("position", currentIndex === 2 ? "0 0 0" : "-8 0 0");

      // Adiciona todos os modelos ao marcador
      marker.appendChild(model1);
      marker.appendChild(model2);
      marker.appendChild(model3);

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
