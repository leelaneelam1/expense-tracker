
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { expenseApi } from "@/lib/api";

const Expenses = () => {
  const queryClient = useQueryClient();
  const { data: expenses, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: expenseApi.getExpenses,
  });

  const handleExpenseAdded = () => {
    queryClient.invalidateQueries({ queryKey: ['expenses'] });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
            <p className="text-muted-foreground">
              Manage and track your expenses
            </p>
          </div>
          <AddExpenseDialog onExpenseAdded={handleExpenseAdded} />
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="march">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="march">March 2024</SelectItem>
                <SelectItem value="february">February 2024</SelectItem>
                <SelectItem value="january">January 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
            <CardDescription>A detailed list of all your expenses</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading expenses...</div>
            ) : (
              <div className="space-y-4">
                {expenses?.data?.map((expense: any) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.category} • {new Date(expense.date).toLocaleDateString()} • {expense.paymentMethod}
                      </p>
                    </div>
                    <div className="font-medium">
                      ${Number(expense.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Expenses;
