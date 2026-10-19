import type { CharacterExtras, CrewMember } from "@/lib/character-extras";
import { JOB_LABELS_PT } from "@/lib/job-labels-pt";
import { Badge } from "../../badge";
import { SectionTitle } from "./section-title";

interface CharacterCrewSectionProps {
  crew: NonNullable<CharacterExtras["crew"]>;
  crewLabel: string | null;
  members: CrewMember[];
}

const getJobLabel = (job: string | null) =>
  job ? (JOB_LABELS_PT[job] ?? job) : null;

export const CharacterCrewSection = ({
  crew,
  crewLabel,
  members,
}: CharacterCrewSectionProps) => {
  const crewName = crewLabel ?? crew.romanName ?? crew.name ?? "Tripulação";

  const crewDetails = [
    crewLabel ? crew.romanName : null,
    crew.totalPrime != null
      ? `Total de recompensa: ₿ ${crew.totalPrime}`
      : null,
  ]
    .filter(Boolean)
    .join(" — ");

  return (
    <section>
      <SectionTitle>Tripulação</SectionTitle>

      <div className="rounded-xl border border-border bg-bg-card p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-xl font-semibold text-text">
              {crewName}
            </h3>

            <p className="text-sm text-text-muted">{crewDetails}</p>
          </div>

          {crew.isYonko && <Badge color="red">Yonko</Badge>}
        </div>

        {members.length > 0 && (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {members.map((member) => {
              const memberJob = getJobLabel(member.job);

              return (
                <div
                  key={member.name}
                  className="flex flex-col gap-1 rounded-lg border border-border bg-bg-elevated p-3"
                >
                  <span className="text-sm font-semibold text-text">
                    {member.name}
                  </span>

                  {memberJob && (
                    <span className="text-xs text-text-dim">{memberJob}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
