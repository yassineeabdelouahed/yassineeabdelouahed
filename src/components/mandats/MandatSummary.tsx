import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export function MandatSummary({
  title,
  reference,
  skillsRequired,
  experienceLevel,
  salaryMin,
  salaryMax,
  currency,
  location,
  remotePolicy,
}: {
  title: string;
  reference: string;
  skillsRequired: string[];
  experienceLevel: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
  location: string | null;
  remotePolicy: string | null;
}) {
  const salary =
    salaryMin || salaryMax
      ? `${salaryMin?.toLocaleString("fr-FR") ?? "?"} – ${salaryMax?.toLocaleString("fr-FR") ?? "?"} ${currency}/mois`
      : null;

  return (
    <Card className="p-6">
      <div className="text-xs font-semibold text-ink-300">{reference}</div>
      <div className="font-heading font-extrabold text-xl text-ink-900 mt-0.5">{title}</div>

      <div className="flex flex-wrap gap-2 mt-4">
        {skillsRequired.map((skill) => (
          <Tag key={skill} tone="teal">
            {skill}
          </Tag>
        ))}
      </div>

      <dl className="grid grid-cols-2 gap-3 mt-5 text-sm">
        {experienceLevel && (
          <div>
            <dt className="text-ink-300 text-xs">Expérience</dt>
            <dd className="text-ink-900 font-medium">{experienceLevel}</dd>
          </div>
        )}
        {salary && (
          <div>
            <dt className="text-ink-300 text-xs">Salaire</dt>
            <dd className="text-ink-900 font-medium">{salary}</dd>
          </div>
        )}
        {location && (
          <div>
            <dt className="text-ink-300 text-xs">Localisation</dt>
            <dd className="text-ink-900 font-medium">{location}</dd>
          </div>
        )}
        {remotePolicy && (
          <div>
            <dt className="text-ink-300 text-xs">Télétravail</dt>
            <dd className="text-ink-900 font-medium">{remotePolicy}</dd>
          </div>
        )}
      </dl>
    </Card>
  );
}
