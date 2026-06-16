import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  {
    title: "Total Spending",
    value: "₹18,420",
  },
  {
    title: "Budget Used",
    value: "61%",
  },
  {
    title: "Remaining Budget",
    value: "₹11,580",
  },
  {
    title: "Active Recurring",
    value: "4",
  },
];

export function DashboardSummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {card.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}