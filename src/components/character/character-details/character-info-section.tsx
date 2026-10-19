import type { Character } from "@/api/routes/list-characters";
import { formatBirthday } from "@/lib/character-birthday";
import { getCharacterDisplayName } from "@/lib/character-name";
import { InfoItemCard } from "./info-item-card";
import { SectionTitle } from "./section-title";

interface CharacterInfoSectionProps {
  character: Character;
  jobLabel: string | null;
}

export const CharacterInfoSection = ({
  character,
  jobLabel,
}: CharacterInfoSectionProps) => {
  const { name, birthday, blood_type, extra_data, bounties } = character;

  const displayName = getCharacterDisplayName(name);
  const epithet = extra_data?.epithet ?? null;
  const origin = extra_data?.origin ?? null;
  const formattedBirthday = formatBirthday(birthday);

  const activeBounty = bounties.find(
    (bounty) => bounty.is_active && bounty.amount != null,
  );

  return (
    <section>
      <SectionTitle>Informações</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoItemCard label="Nome completo" value={displayName} />

        {epithet && <InfoItemCard label="Apelido" value={epithet} />}

        {jobLabel && <InfoItemCard label="Profissão" value={jobLabel} />}

        {origin && <InfoItemCard label="Origem" value={origin} />}

        <InfoItemCard label="Aniversário" value={formattedBirthday ?? "—"} />

        <InfoItemCard label="Grupo sanguíneo" value={blood_type || "—"} />

        {activeBounty?.amount != null && (
          <InfoItemCard
            label="Recompensa"
            value={
              <span className="font-heading font-semibold text-gold">
                ₿ {activeBounty.amount.toLocaleString("pt-BR")}
              </span>
            }
          />
        )}
      </div>
    </section>
  );
};
