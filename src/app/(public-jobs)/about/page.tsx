import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const VALUES = [
  { title: "Transparence", body: "Chaque partie visualise l'état d'avancement réel du mandat." },
  { title: "Rapidité", body: "Réduction des délais de traitement à chaque étape." },
  { title: "Proximité", body: "Une équipe qui accompagne recruteurs et candidats à chaque étape." },
];

export default function AboutPage() {
  return (
    <div className="max-w-[820px] mx-auto px-8 py-16">
      <h1 className="font-heading font-extrabold text-[32px] text-ink-900 text-center">Notre mission</h1>
      <p className="text-base leading-loose text-ink-700 mt-5.5">
        Talentis Consult est né d&apos;un constat simple : dans la majorité des cabinets marocains, le suivi d&apos;un
        mandat de recrutement repose sur des échanges d&apos;e-mails, des fichiers Excel et des relances
        téléphoniques. Nous construisons Talentis Connect pour que chaque étape du processus soit visible,
        mesurable et collaborative pour l&apos;entreprise cliente, notre équipe et le candidat.
      </p>
      <p className="text-base leading-loose text-ink-700 mt-4">
        Basée à Casablanca, notre équipe accompagne des entreprises de toutes tailles et des candidats de tous
        secteurs — de la tech à la santé, du BTP à la finance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {VALUES.map((v) => (
          <Card key={v.title} className="p-5.5">
            <div className="font-heading font-extrabold text-base text-teal">{v.title}</div>
            <p className="text-sm text-ink-500 mt-2 leading-relaxed">{v.body}</p>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-3.5 mt-11">
        <LinkButton href="/results" variant="primary">
          Voir les offres
        </LinkButton>
        <LinkButton href="/espace-recruteur" variant="secondary">
          Publier une offre
        </LinkButton>
      </div>
    </div>
  );
}
