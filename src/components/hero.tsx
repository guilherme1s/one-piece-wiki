import Image from "next/image";
import { Wrapper } from "./wrapper";
import { Badge } from "./badge";

export const Hero = () => {
  return (
    <section className="relative flex h-125 w-full items-center overflow-hidden">
      <Image
        src="/hero.jpg"
        alt="One Piece"
        fill
        priority
        className="object-cover object-[30%_center] lg:object-center"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-bg via-bg/70 to-transparent" />

      <Wrapper>
        <div className="relative z-10 max-w-3xl text-text">
          <Badge color="gold" className="mb-2" rounded="full">
            One Piece Wiki
          </Badge>

          <h1 className="font-oswald text-4xl font-bold uppercase leading-[0.95] tracking-wide sm:text-5xl md:text-6xl">
            Explore o mundo de
            <br />
            <span className="text-primary">One Piece</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text/75 sm:text-lg">
            Descubra personagens, Akuma no Mi, tripulações, recompensas e muito
            mais. Explore a enciclopédia definitiva do universo de One Piece.
          </p>
        </div>
      </Wrapper>
    </section>
  );
};
