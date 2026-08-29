import { LegalLayout } from "@/components/legal/LegalLayout";

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" lastUpdated="[À compléter à la mise en production]">
      <h2>Éditeur du site</h2>
      <p>
        Le site et l&apos;application Talentis Connect sont édités par <strong>Talentis Consult</strong>,
        [forme juridique — ex. SARL], au capital de [montant] MAD, immatriculée au Registre du Commerce de
        Casablanca sous le numéro [RC], Identifiant Commun de l&apos;Entreprise (ICE) [ICE], dont le siège
        social est situé à [adresse complète, Casablanca, Maroc].
      </p>
      <p>
        Numéro de téléphone : [à compléter] · Adresse e-mail de contact : [à compléter] · Directeur de la
        publication : [nom et fonction].
      </p>

      <h2>Hébergement</h2>
      <p>
        L&apos;application est hébergée par [nom de l&apos;hébergeur — ex. Vercel Inc. / le fournisseur choisi
        pour la mise en production], [adresse de l&apos;hébergeur]. La base de données est hébergée par
        [fournisseur de base de données — ex. Neon / Supabase], [adresse].
      </p>

      <h2>Activité</h2>
      <p>
        Talentis Consult est un cabinet de recrutement basé à Casablanca. La plateforme Talentis Connect permet
        la mise en relation entre entreprises clientes, candidats et l&apos;équipe du cabinet dans le cadre de
        mandats de recrutement et de formations professionnelles.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du site (textes, logo, charte graphique, structure de la base de données)
        est la propriété de Talentis Consult ou de ses partenaires, sauf mention contraire, et est protégé par
        le droit marocain et les conventions internationales relatives à la propriété intellectuelle. Toute
        reproduction, représentation ou exploitation, totale ou partielle, sans autorisation préalable est
        interdite.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l&apos;adresse
        [e-mail de contact à compléter].
      </p>
    </LegalLayout>
  );
}
