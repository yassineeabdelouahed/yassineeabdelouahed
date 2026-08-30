import { LegalLayout } from "@/components/legal/LegalLayout";

export default function CGVPage() {
  return (
    <LegalLayout title="Conditions générales de vente" lastUpdated="[À compléter à la mise en production]">
      <h2>Objet</h2>
      <p>
        Les présentes conditions générales de vente (CGV) régissent les prestations payantes proposées par
        Talentis Consult sur la plateforme Talentis Connect : mise en avant d&apos;offres d&apos;emploi
        (sponsoring), accès à la base de candidats (CVthèque), et inscription aux sessions de formation. Elles
        complètent les conditions générales d&apos;utilisation (CGU).
      </p>

      <h2>Prestations concernées</h2>
      <ul>
        <li>
          <strong>Sponsoring d&apos;offre :</strong> mise en avant d&apos;une offre publiée pour une durée
          déterminée (7, 14 ou 30 jours), au tarif affiché lors de la demande.
        </li>
        <li>
          <strong>Accès CVthèque :</strong> accès de l&apos;entreprise cliente à la recherche de candidats pour
          une durée déterminée (30, 90 ou 365 jours), au tarif affiché lors de la demande.
        </li>
        <li>
          <strong>Formations :</strong> inscription à une session de formation animée par Talentis Consult, au
          tarif affiché sur la fiche de la session.
        </li>
      </ul>

      <h2>Commande et paiement</h2>
      <p>
        La commande d&apos;une prestation payante se fait directement sur la plateforme. Le règlement
        s&apos;effectue actuellement par virement bancaire, en espèces, ou par un autre moyen convenu avec
        l&apos;équipe Talentis Consult [À compléter si une passerelle de paiement en ligne est mise en place].
        La prestation est activée après confirmation manuelle de la réception du paiement par Talentis
        Consult ; un délai de traitement peut s&apos;appliquer entre la commande et l&apos;activation.
      </p>

      <h2>Tarifs</h2>
      <p>
        Les tarifs affichés sur la plateforme au moment de la commande sont exprimés en dirhams marocains
        (MAD) [À compléter : mention TVA le cas échéant]. Talentis Consult se réserve le droit de modifier ses
        tarifs à tout moment ; le tarif applicable à une commande est celui affiché au moment de sa validation.
      </p>

      <h2>Annulation et remboursement</h2>
      <p>
        [À compléter : conditions d&apos;annulation d&apos;une demande en attente de confirmation, et
        modalités de remboursement en cas de non-exécution de la prestation par Talentis Consult.]
      </p>

      <h2>Facturation</h2>
      <p>
        Un reçu est mis à disposition de l&apos;entreprise cliente dans son espace dès la confirmation du
        paiement par Talentis Consult. [À compléter : mentions légales obligatoires sur facture selon la
        réglementation marocaine applicable.]
      </p>

      <h2>Responsabilité</h2>
      <p>
        Talentis Consult met en œuvre des moyens raisonnables pour assurer l&apos;exécution des prestations
        décrites ci-dessus. La mise en avant d&apos;une offre ou l&apos;accès à la CVthèque ne constitue pas
        une garantie de résultat (candidature, recrutement).
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit marocain. Tout litige relatif à leur interprétation ou à leur
        exécution relève de la compétence exclusive des tribunaux de Casablanca.
      </p>
    </LegalLayout>
  );
}
