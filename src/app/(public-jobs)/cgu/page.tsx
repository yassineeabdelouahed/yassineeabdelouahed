import { LegalLayout } from "@/components/legal/LegalLayout";

export default function CGUPage() {
  return (
    <LegalLayout title="Conditions générales d'utilisation" lastUpdated="[À compléter à la mise en production]">
      <h2>Objet</h2>
      <p>
        Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;accès et l&apos;utilisation
        de la plateforme Talentis Connect, éditée par Talentis Consult, par les entreprises clientes, les
        candidats et les visiteurs du job board public.
      </p>

      <h2>Accès à la plateforme</h2>
      <p>
        L&apos;inscription en tant que candidat ou entreprise cliente est libre. La création d&apos;un compte
        cabinet est réservée aux membres de l&apos;équipe Talentis Consult, sur invitation. L&apos;utilisateur
        s&apos;engage à fournir des informations exactes et à jour lors de son inscription et à ne créer
        qu&apos;un seul compte par personne physique.
      </p>

      <h2>Comptes et sécurité</h2>
      <p>
        Chaque utilisateur est responsable de la confidentialité de son mot de passe et de toute activité
        réalisée depuis son compte. Talentis Consult peut suspendre un compte en cas d&apos;usage frauduleux,
        de non-respect des présentes CGU ou de tentative répétée d&apos;accès non autorisé.
      </p>

      <h2>Utilisation du service</h2>
      <p>Les utilisateurs s&apos;engagent à ne pas :</p>
      <ul>
        <li>publier des offres d&apos;emploi ou des contenus mensongers, discriminatoires ou illicites ;</li>
        <li>utiliser la messagerie directe à des fins de prospection commerciale non sollicitée ;</li>
        <li>tenter de contourner les mécanismes de sécurité de la plateforme (limitation de fréquence, validation des fichiers, etc.) ;</li>
        <li>extraire ou réutiliser massivement les données de la plateforme sans autorisation.</li>
      </ul>

      <h2>Offres sponsorisées et formations payantes</h2>
      <p>
        Les entreprises clientes peuvent mettre en avant leurs offres moyennant paiement, selon les modalités
        décrites lors de la publication de l&apos;offre. Les inscriptions aux sessions de formation sont
        soumises à confirmation manuelle du paiement par l&apos;équipe Talentis Consult. [À compléter :
        conditions d&apos;annulation et de remboursement.]
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Le contenu de la plateforme (hors contenus publiés par les utilisateurs) est protégé par le droit de
        la propriété intellectuelle. L&apos;utilisateur conserve la propriété des contenus qu&apos;il publie
        (CV, offres, messages) et concède à Talentis Consult le droit de les traiter dans le cadre du
        fonctionnement du service.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Talentis Consult met en œuvre des moyens raisonnables pour assurer la disponibilité et la sécurité de
        la plateforme, sans garantie de continuité absolue. Talentis Consult n&apos;est pas partie aux relations
        contractuelles (contrat de travail, prestation) qui pourraient résulter d&apos;une mise en relation via
        la plateforme.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes CGU sont soumises au droit marocain. Tout litige relatif à leur interprétation ou à leur
        exécution relève de la compétence exclusive des tribunaux de Casablanca.
      </p>

      <h2>Modification des CGU</h2>
      <p>
        Talentis Consult se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs
        seront informés de toute modification substantielle.
      </p>
    </LegalLayout>
  );
}
