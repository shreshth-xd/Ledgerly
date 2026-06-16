import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const expenses = [
  {
    title: "Uber Ride",
    category: "Travel",
    amount: "₹250",
  },
  {
    title: "McDonald's",
    category: "Food",
    amount: "₹420",
  },
  {
    title: "Netflix",
    category: "Entertainment",
    amount: "₹649",
  },
  {
    title: "AWS",
    category: "Development",
    amount: "₹1,200",
  },
];

export function RecentExpensesTable() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.title}>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}