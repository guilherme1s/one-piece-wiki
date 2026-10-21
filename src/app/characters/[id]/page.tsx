import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCharacterById } from "@/api/routes/get-character";
import {
  findCharacterExtras,
  getCharacterCrewMembers,
} from "@/lib/character-extras";
import { getCharacterDisplayName } from "@/lib/character-name";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
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
      title: "Personagem não encontrado",
    };
  }

  const displayName = getCharacterDisplayName(character.name);
  const epithet = character.extra_data?.epithet ?? null;

  const description = epithet
    ? `${displayName}, ${epithet}. Veja recompensa, tripulação, akuma no mi e informações.`
    : `${displayName} — veja recompensa, tripulação, akuma no mi e informações.`;

  return {
    title: displayName,
    description,
    openGraph: {
      title: `${displayName} | ${SITE_NAME}`,
      description,
      ...(character.image_url && {
        images: [{ url: character.image_url }],
      }),
    },
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

  const epithet = character.extra_data?.epithet ?? null;

  const description = epithet
    ? `${displayName}, ${epithet}. Veja recompensa, tripulação, akuma no mi e informações.`
    : `${displayName} — veja recompensa, tripulação, akuma no mi e informações.`;

  const characterJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: displayName,
    description,
    url: `${SITE_URL}/characters/${character.id}`,
    ...(character.image_url && { image: character.image_url }),
  };

  return (
    <>
      <JsonLd data={characterJsonLd} />

      <Wrapper className="py-12">
        <div className="w-full">
          <CharacterDetail
            character={character}
            extras={extras}
            members={members}
          />
        </div>
      </Wrapper>
    </>
  );
}
