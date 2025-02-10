"use client";

import { ARScene } from "@/components/ARScene";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ARScene />
    </main>
  );
}
