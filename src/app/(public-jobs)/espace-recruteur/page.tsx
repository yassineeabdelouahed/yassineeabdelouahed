import { getSessionUser } from "@/lib/rbac";
import { EspaceRecruteurTabs } from "@/components/jobs/EspaceRecruteurTabs";

export default async function EspaceRecruteurPage() {
  const user = await getSessionUser();

  return (
    <div>
      <div
        className="px-8 py-14 text-center"
        style={{ background: "linear-gradient(120deg,#061527,#0b2545)" }}
      >
        <div className="font-heading font-extrabold text-[32px] text-white">
          Recrutez plus vite avec Talentis Consult
        </div>
        <p className="text-[15px] text-teal-tint mt-2.5">
          Décrivez le poste, publiez, recevez vos premières candidatures.
        </p>
        <div className="flex justify-center gap-9 mt-8 flex-wrap">
          <div className="text-white text-sm">
            <span className="font-bold">Visibilité</span>
            <br />
            <span className="text-[13px] text-[#bcebe3]">devant nos candidats actifs</span>
          </div>
          <div className="text-white text-sm">
            <span className="font-bold">Matching</span>
            <br />
            <span className="text-[13px] text-[#bcebe3]">candidatures qualifiées en 48h</span>
          </div>
          <div className="text-white text-sm">
            <span className="font-bold">Simplicité</span>
            <br />
            <span className="text-[13px] text-[#bcebe3]">publication en 3 minutes</span>
          </div>
        </div>
      </div>

      <EspaceRecruteurTabs canPublish={user?.role === "CLIENT"} />
    </div>
  );
}
