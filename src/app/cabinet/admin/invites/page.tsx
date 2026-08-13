import { requireAdmin } from "@/lib/rbac";
import { listInvites } from "@/server/actions/invites";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { InviteForm } from "@/components/cabinet/InviteForm";
import { InviteLink } from "@/components/cabinet/InviteLink";

export default async function CabinetInvitesPage() {
  await requireAdmin();
  const invites = await listInvites();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-ink-900">Invitations cabinet</h1>
      <p className="text-ink-500 mt-2">
        Les comptes cabinet ne peuvent pas s&apos;inscrire librement — invitez vos collaborateurs ici.
      </p>

      <Card className="mt-6 p-6">
        <InviteForm />
      </Card>

      <div className="mt-8 flex flex-col gap-3">
        {invites.length === 0 && <p className="text-sm text-ink-500">Aucune invitation envoyée.</p>}
        {invites.map((invite) => {
          const status = invite.acceptedAt
            ? { label: "Acceptée", tone: "success" as const }
            : invite.expiresAt < new Date()
              ? { label: "Expirée", tone: "danger" as const }
              : { label: "En attente", tone: "warning" as const };

          return (
            <Card key={invite.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-ink-900">{invite.email}</div>
                <div className="text-xs text-ink-500 mt-1">
                  Invité par {invite.invitedBy.name}
                  {invite.isAdmin ? " · Admin" : ""}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {!invite.acceptedAt && invite.expiresAt >= new Date() && (
                  <InviteLink token={invite.token} />
                )}
                <Tag tone={status.tone}>{status.label}</Tag>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
