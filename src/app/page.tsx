import { ARScene } from "@/components/ARScene";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ARScene />

      <div className="telaQuadrados">
        <div className="quadrado quadrado1"></div>
        <div className="quadrado quadrado2"></div>
        <div className="quadrado quadrado3"></div>

        <div className="quadradoProduto">
          <div className="nomeProduto">Hipoclorito de Sódio 10% </div>
          <div className="descricaoProduto">
            Hipoclorito de sódio 10% - 5 Litros
          </div>
          <div className="precoProduto">Hoje por R$ 29,50!</div>
          <div className="bolaFundo1"></div>
          <div className="bolaFundo2"></div>
        </div>
      </div>

      <div className="telaBotoes w-full fixed bottom-0 left-0 z-[101] flex justify-between items-center">
        <button className="btnCtrl btnRetornar">{"<"}</button>
        <button className="btnCtrl btnAvancar">{">"}</button>
      </div>
    </main>
  );
}
