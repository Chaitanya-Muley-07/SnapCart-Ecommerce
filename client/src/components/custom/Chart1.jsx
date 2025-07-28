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

// 💡 Utility: transform metrics data
function transformChartData(rawData) {
  if (!rawData) return [];

  return Object.entries(rawData).map(([month, productTypes]) => ({
    month,
    ...productTypes,
  }));
}

// 💡 Utility: generate config based on available keys
function generateChartConfig(data) {
  if (!data || data.length === 0) return {};

  const keys = Object.keys(data[0]).filter((key) => key !== "month");
  const colorPalette = [
    Colors.customGray,
    Colors.customYellow,
    "#9acd32",
    "#ff69b4",
    "#00ced1",
  ];

  const config = {};
  keys.forEach((key, index) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: colorPalette[index % colorPalette.length],
    };
  });
  return config;
}

export function Chart1({ metrics }) {
  const rawChartData = metrics?.sixMonthsBarChartData;
  const chartData = transformChartData(rawChartData);
  const chartConfig = generateChartConfig(chartData);

  return (
    <Card className="flex-1 rounded-xl bg-muted/50 md:min-hmin">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          {chartData.length > 0
            ? "Showing data for last 6 months"
            : "No data available"}
        </CardDescription>
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
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartConfig[key].color}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
        <CardFooter className="flex-col items-start gap-2">
          <div className="flex gap-2 text-xl leading-none">
            Trending up by 5.2% this month
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total sales for the last 6 months
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
