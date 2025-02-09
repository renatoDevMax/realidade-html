export interface ARSceneProps {
  markerType?: "hiro" | "kanji" | "pattern";
  debugMode?: boolean;
  children?: React.ReactNode;
}

export interface ARMarkerProps {
  type: "hiro" | "kanji" | "pattern";
  patternUrl?: string;
  children?: React.ReactNode;
}

export interface ARObjectProps {
  position?: string;
  rotation?: string;
  scale?: string;
  color?: string;
}
