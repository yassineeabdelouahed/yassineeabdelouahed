export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[760px] mx-auto px-8 py-16">
      <h1 className="font-heading font-extrabold text-[28px] text-ink-900">{title}</h1>
      <p className="text-sm text-ink-300 mt-1.5">Dernière mise à jour : {lastUpdated}</p>

      <div className="bg-warning-bg text-warning-text text-sm rounded-[var(--radius-card)] p-4 mt-6 leading-relaxed">
        <strong>Document à valider.</strong> Cette page fournit une structure et un contenu de base ; les
        informations entre crochets doivent être complétées et l&apos;ensemble doit être relu par un juriste
        avant mise en production.
      </div>

      <div className="prose-legal mt-8 text-[15px] leading-relaxed text-ink-700 [&_h2]:font-heading [&_h2]:font-extrabold [&_h2]:text-lg [&_h2]:text-ink-900 [&_h2]:mt-9 [&_h2]:mb-3 [&_p]:mb-3.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3.5 [&_li]:mb-1.5">
        {children}
      </div>
    </div>
  );
}
