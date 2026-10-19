import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCharacterById } from "@/api/routes/get-character";
import {
  findCharacterExtras,
  getCharacterCrewMembers,
} from "@/lib/character-extras";
import { getCharacterDisplayName } from "@/lib/character-name";
import { CharacterDetail } from "@/components/character/character-details/character-detail";
import { Wrapper } from "@/components/wrapper";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: CharacterPageProps): Promise<Metadata> => {
  const { id } = await params;

  const character = await getCharacterById(id).catch(() => null);

  if (!character) {
    return {
      title: "Personagem não encontrado — One Piece Wiki",
    };
  }

  const displayName = getCharacterDisplayName(character.name);

  return {
    title: `${displayName} — One Piece Wiki`,
  };
};

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;

  const character = await getCharacterById(id);

  if (!character) {
    notFound();
  }

  const displayName = getCharacterDisplayName(character.name);

  const extras = await findCharacterExtras(displayName).catch(() => null);

  const members = extras?.crew?.id
    ? await getCharacterCrewMembers(extras.crew.id).catch(() => [])
    : [];

  return (
    <Wrapper className="py-12">
      <div className="w-full">
        <CharacterDetail
          character={character}
          extras={extras}
          members={members}
        />
      </div>
    </Wrapper>
  );
}
