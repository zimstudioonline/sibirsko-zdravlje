import { Card, CardContent } from "@repo/ui";

const REFERRAL_URL = "https://rs.siberianhealth.com/rs/?referral=5633043";

export function ConsultantSiteNotice() {
  return (
    <Card className="mb-6 bg-muted/40">
      <CardContent className="p-5">
        <h2 className="font-semibold text-ink text-sm">
          Lični sajt Konsultanta Siberian Wellness-a
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-muted-foreground text-xs">Zvaničan sajt</p>
            <a
              href={REFERRAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary text-sm hover:underline"
            >
              Referalni link
            </a>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Zvanična Stranica</p>
            <a
              href={REFERRAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary text-sm hover:underline"
            >
              Referalni link
            </a>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Konsultant</p>
            <p className="font-medium text-ink text-sm">Ugovor: 5633043</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
