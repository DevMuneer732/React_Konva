import { Configurator } from '@/compoents/Configurator';
import { BottlePreview } from '../compoents/BottlePreview';

export default function Home() {
  return (
   <main className="flex flex-col md:flex-row min-h-screen">
      <BottlePreview />
      <Configurator />
    </main>
  );
}
