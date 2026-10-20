import { CharacterDetailSkeleton } from "@/components/character/character-skeleton";
import { Wrapper } from "@/components/wrapper";

export default function Loading() {
  return (
    <Wrapper className="py-12">
      <div className="w-full">
        <CharacterDetailSkeleton />
      </div>
    </Wrapper>
  );
}
