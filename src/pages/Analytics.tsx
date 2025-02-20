
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { category: "Food", amount: 850 },
  { category: "Transportation", amount: 450 },
  { category: "Entertainment", amount: 320 },
  { category: "Utilities", amount: 580 },
  { category: "Shopping", amount: 670 },
  { category: "Healthcare", amount: 230 },
];

const categoryData = [
  { name: "Food", value: 850, color: "#FF6B6B" },
  { name: "Transportation", value: 450, color: "#4ECDC4" },
  { name: "Entertainment", value: 320, color: "#45B7D1" },
  { name: "Utilities", value: 580, color: "#96CEB4" },
  { name: "Shopping", value: 670, color: "#FFEEAD" },
  { name: "Healthcare", value: 230, color: "#D4A5A5" },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Analyze your spending patterns
            </p>
          </div>
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Monthly breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Expense Distribution</CardTitle>
              <CardDescription>Percentage split by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm">{category.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Top Expenses</CardTitle>
              <CardDescription>Highest spending categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 3)
                  .map((category, index) => (
                    <div
                      key={category.category}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-muted-foreground">
                          #{index + 1}
                        </span>
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <span className="font-medium">
                        ${category.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
