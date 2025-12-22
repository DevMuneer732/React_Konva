"use client"
import dynamic from 'next/dynamic';

const KonvaCanvas = dynamic(() => import('../compoents/KonvaCanvas'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading Canvas...</div>
});
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">React Konva + Next.js</h1>
      <KonvaCanvas />
    </main>
  );
}
