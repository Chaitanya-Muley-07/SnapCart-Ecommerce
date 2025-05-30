"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Colors } from "../../constants/color";
import { TrendingUp } from "lucide-react";
const chartData = [
  { month: "January", keyboard: 186, mouse: 80, headset: 50 },
  { month: "February", keyboard: 305, mouse: 200, headset: 50 },
  { month: "March", keyboard: 237, mouse: 120, headset: 50 },
  { month: "April", keyboard: 73, mouse: 190, headset: 50 },
  { month: "May", keyboard: 209, mouse: 130, headset: 50 },
  { month: "June", keyboard: 214, mouse: 140, headset: 50 },
];

const chartConfig = {
  keyboard: {
    label: "Keyboard",
    color: Colors.customGray,
  },
  mouse: {
    label: "Mouse",
    color: Colors.customYellow,
  },
  headset: {
    label: "Headset",
    color: "#9acd32",
  },
};

export function Chart1() {
  return (
    <Card className="flex-1 rounded-xl bg-muted/50 md:min-hmin">
      <CardHeader>
        <CardTitle>Bar Chart-Multiple</CardTitle>
        <CardDescription>January-June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="keyboard" fill="var(--color-keyboard)" radius={4} />
            <Bar dataKey="mouse" fill="var(--color-mouse)" radius={4} />
            <Bar dataKey="headset" fill="var(--color-headset)" radius={4} />
          </BarChart>
        </ChartContainer>
        <CardFooter className="flex-col items-start gap-2 ">
          <div className="flex gap-2 text-xl leading-none" >Trending up by 5.2% this month<TrendingUp className="h-5 w-5" /></div>
          <div className="leading-none text-muted-foreground" >Showing Total visitors for last 6 months</div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
