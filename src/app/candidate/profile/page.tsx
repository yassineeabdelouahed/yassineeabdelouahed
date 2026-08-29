import { notFound } from "next/navigation";
import { getMyCandidateProfile } from "@/server/actions/profile";
import { ProfileForm } from "@/components/candidate/ProfileForm";

export default async function CandidateProfilePage() {
  const candidate = await getMyCandidateProfile();
  if (!candidate) notFound();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900 mb-2">Mon profil</h1>
      <p className="text-ink-500 mb-8">
        Un profil complet avec CV permet de postuler en un clic sur les offres qui vous intéressent.
      </p>
      <ProfileForm candidate={candidate} />
    </div>
  );
}
