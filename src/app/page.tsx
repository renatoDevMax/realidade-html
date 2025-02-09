import { ARScene } from "@/components/ARScene";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ARScene />

      <div className="telaQuadrados">
        <div className="quadrado quadrado1"></div>
        <div className="quadrado quadrado2"></div>
        <div className="quadrado quadrado3"></div>
        <div className="quadrado quadrado4"></div>
        <div className="quadrado quadrado5"></div>
        <div className="quadrado quadrado6"></div>
        <div className="quadrado quadrado7"></div>
        <div className="quadrado quadrado8"></div>
      </div>
    </main>
  );
}
