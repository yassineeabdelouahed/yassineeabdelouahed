import { LegalLayout } from "@/components/legal/LegalLayout";

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" lastUpdated="[À compléter à la mise en production]">
      <p>
        Talentis Consult accorde une attention particulière à la protection des données personnelles traitées
        via Talentis Connect, conformément à la loi marocaine n° 09-08 relative à la protection des personnes
        physiques à l&apos;égard du traitement des données à caractère personnel, et aux textes pris pour son
        application.
      </p>
      <p>
        [À compléter avant mise en production : numéro et date de la déclaration ou de l&apos;autorisation
        obtenue auprès de la Commission Nationale de contrôle de la protection des Données à caractère
        Personnel (CNDP), le cas échéant.]
      </p>

      <h2>Données collectées</h2>
      <p>Selon votre profil, nous collectons :</p>
      <ul>
        <li>
          <strong>Candidats</strong> : nom, prénom, e-mail, téléphone, CV, compétences, années d&apos;expérience,
          localisation, et le cas échéant les informations transmises par Google ou LinkedIn lors d&apos;une
          connexion via ces services.
        </li>
        <li>
          <strong>Entreprises clientes</strong> : nom de l&apos;entreprise, nom et coordonnées du contact,
          critères de recrutement transmis dans le cadre d&apos;un mandat.
        </li>
        <li>
          <strong>Toutes catégories</strong> : adresse e-mail, mot de passe (stocké de façon chiffrée),
          messages échangés sur la plateforme, historique des candidatures et des inscriptions aux formations.
        </li>
      </ul>

      <h2>Finalités du traitement</h2>
      <ul>
        <li>Mise en relation entre entreprises clientes et candidats dans le cadre de mandats de recrutement ;</li>
        <li>Gestion des candidatures spontanées et des offres publiées sur le job board ;</li>
        <li>Gestion des inscriptions aux sessions de formation ;</li>
        <li>Envoi de notifications liées à votre compte (candidatures, messages, alertes emploi) ;</li>
        <li>Sécurité du compte (vérification d&apos;e-mail, réinitialisation de mot de passe, prévention des abus).</li>
      </ul>

      <h2>Destinataires des données</h2>
      <p>
        Vos données sont accessibles à l&apos;équipe de Talentis Consult et, selon le contexte, à
        l&apos;entreprise cliente pour laquelle un mandat de recrutement est en cours (uniquement les
        candidatures que vous avez soumises ou qui ont été présélectionnées pour ce mandat). Elles ne sont
        jamais vendues à des tiers.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Nous conservons vos données pendant la durée nécessaire aux finalités décrites ci-dessus, puis
        appliquons les durées de conservation suivantes, purgées automatiquement :
      </p>
      <ul>
        <li>Notifications lues : 90 jours ;</li>
        <li>Invitations d&apos;équipe (cabinet ou entreprise cliente) non acceptées : 30 jours après leur expiration ;</li>
        <li>Jetons de vérification d&apos;e-mail et de réinitialisation de mot de passe expirés : 30 jours ;</li>
        <li>
          CV et notes de qualification associés à une candidature refusée (offre publique ou mandat) : 24 mois
          après le refus, puis anonymisation (le CV et les notes sont supprimés, le statut de la candidature
          est conservé à des fins statistiques) ;
        </li>
        <li>
          Compte et profil : conservés tant que le compte est actif, supprimés ou anonymisés immédiatement en
          cas de suppression de compte à votre demande (voir &quot;Vos droits&quot; ci-dessous).
        </li>
      </ul>

      <h2>Vos droits</h2>
      <p>
        Conformément à la loi 09-08, vous disposez d&apos;un droit d&apos;accès, de rectification et
        d&apos;opposition sur vos données personnelles. Vous pouvez supprimer votre compte à tout moment
        depuis la rubrique &quot;Paramètres&quot; (ou &quot;Mon profil&quot; pour les candidats) de votre
        espace : vos données personnelles sont alors supprimées ou anonymisées. Les échanges et candidatures
        déjà liés à d&apos;autres utilisateurs sont conservés, votre identité y apparaissant comme
        &quot;Utilisateur supprimé&quot;. Pour toute autre demande relative à vos droits, contactez-nous à
        [e-mail de contact à compléter].
      </p>

      <h2>Cookies</h2>
      <p>
        La plateforme utilise un cookie de session strictement nécessaire à l&apos;authentification. [À
        compléter si des cookies de mesure d&apos;audience ou publicitaires sont ajoutés ultérieurement.]
      </p>
    </LegalLayout>
  );
}
