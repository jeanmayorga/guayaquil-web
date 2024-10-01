import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default async function Loading() {
  return (
    <>
      <section className="relative w-full p-12 bg-cyan-500 overflow-hidden">
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex items-center justify-start">
              <div className="bg-slate-900 shadow-black rounded-lg w-2/3" />
            </div>
            <div className="flex items-start justify-center flex-col lg:pt-0 pt-8">
              <div className="font-medium text-4xl text-white drop-shadow-lg">
                Cargando
              </div>

              <div>
                <div className="flex items-center text-gray-100 text-xs gap-2 transition-all mb-1">
                  <MapPin className="w-4 h-4" />
                  Lugar
                </div>
              </div>

              <a target="_blank" className="w-full my-8">
                <Button className="rounded-full w-full" variant="secondary">
                  Comprar entradas
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
