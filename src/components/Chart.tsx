"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const chartData = [
  { date: "2024-04-01",  emissions: 150 },
  { date: "2024-04-02",  emissions: 180 },
  { date: "2024-04-03",  emissions: 120 },
  { date: "2024-04-04",  emissions: 260 },
  { date: "2024-04-05",  emissions: 290 },
  { date: "2024-04-06",  emissions: 340 },
  { date: "2024-04-07",  emissions: 180 },
  { date: "2024-04-08",  emissions: 320 },
  { date: "2024-04-09", emissions: 110 },
  { date: "2024-04-10",  emissions: 190 },
  { date: "2024-04-11",  emissions: 350 },
  { date: "2024-04-12",  emissions: 210 },
  { date: "2024-04-13",  emissions: 380 },
  { date: "2024-04-14",  emissions: 220 },
  { date: "2024-04-15",  emissions: 170 },
  { date: "2024-04-16",  emissions: 190 },
  { date: "2024-04-17",  emissions: 360 },
  { date: "2024-04-18",  emissions: 410 },
  { date: "2024-04-19",  emissions: 180 },
  { date: "2024-04-20",  emissions: 150 },
  { date: "2024-04-21", emissions: 200 },
  { date: "2024-04-22",  emissions: 170 },
  { date: "2024-04-23",  emissions: 230 },
  { date: "2024-04-24",  emissions: 290 },
  { date: "2024-04-25",  emissions: 250 },
  { date: "2024-04-26", emissions: 130 },
  { date: "2024-04-27",  emissions: 420 },
  { date: "2024-04-28",  emissions: 180 },
  { date: "2024-04-29",  emissions: 240 },
  { date: "2024-04-30",  emissions: 380 },
  { date: "2024-05-01",  emissions: 220 },
  { date: "2024-05-02",  emissions: 310 },
  { date: "2024-05-03",  emissions: 190 },
  { date: "2024-05-04",  emissions: 420 },
  { date: "2024-05-05",  emissions: 390 },
  { date: "2024-05-06",  emissions: 520 },
  { date: "2024-05-07",  emissions: 300 },
  { date: "2024-05-08",  emissions: 210 },
  { date: "2024-05-09",  emissions: 180 },
  { date: "2024-05-10",  emissions: 330 },
  { date: "2024-05-11",  emissions: 270 },
  { date: "2024-05-12",  emissions: 240 },
  { date: "2024-05-13",  emissions: 160 },
  { date: "2024-05-14",  emissions: 490 },
  { date: "2024-05-15",  emissions: 380 },
  { date: "2024-05-16",  emissions: 400 },
  { date: "2024-05-17",  emissions: 420 },
  { date: "2024-05-18",  emissions: 350 },
  { date: "2024-05-19",  emissions: 180 },
  { date: "2024-05-20",  emissions: 230 },
  { date: "2024-05-21", emissions: 140 },
  { date: "2024-05-22", emissions: 120 },
  { date: "2024-05-23",  emissions: 290 },
  { date: "2024-05-24",  emissions: 220 },
  { date: "2024-05-25",  emissions: 250 },
  { date: "2024-05-26",  emissions: 170 },
  { date: "2024-05-27",  emissions: 460 },
  { date: "2024-05-28",  emissions: 190 },
  { date: "2024-05-29", emissions: 130 },
  { date: "2024-05-30",  emissions: 280 },
  { date: "2024-05-31",  emissions: 230 },
  { date: "2024-06-01",  emissions: 200 },
  { date: "2024-06-02",  emissions: 410 },
  { date: "2024-06-03",  emissions: 160 },
  { date: "2024-06-04",  emissions: 380 },
  { date: "2024-06-05", emissions: 140 },
  { date: "2024-06-06",  emissions: 250 },
  { date: "2024-06-07",  emissions: 370 },
  { date: "2024-06-08",  emissions: 320 },
  { date: "2024-06-09",  emissions: 480 },
  { date: "2024-06-10",  emissions: 200 },
  { date: "2024-06-11", emissions: 150 },
  { date: "2024-06-12",  emissions: 420 },
  { date: "2024-06-13", emissions: 130 },
  { date: "2024-06-14",  emissions: 380 },
  { date: "2024-06-15",  emissions: 350 },
  { date: "2024-06-16",  emissions: 310 },
  { date: "2024-06-17",  emissions: 520 },
  { date: "2024-06-18",  emissions: 170 },
  { date: "2024-06-19",  emissions: 290 },
  { date: "2024-06-20",  emissions: 450 },
  { date: "2024-06-21",  emissions: 210 },
  { date: "2024-06-22",  emissions: 270 },
  { date: "2024-06-23",  emissions: 530 },
  { date: "2024-06-24",  emissions: 180 },
  { date: "2024-06-25",  emissions: 190 },
  { date: "2024-06-26",  emissions: 380 },
  { date: "2024-06-27",  emissions: 490 },
  { date: "2024-06-28",  emissions: 200 },
  { date: "2024-06-29", emissions: 160 },
  { date: "2024-06-30",  emissions: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  emissions: {
    label: "Emissions",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Chart() {
    const [timeRange, setTimeRange] = React.useState("90d");
  
    const filteredData = chartData.filter((item) => {
      const date = new Date(item.date);
      const referenceDate = new Date("2024-06-30");
      let daysToSubtract = 90;
      if (timeRange === "30d") {
        daysToSubtract = 30;
      } else if (timeRange === "7d") {
        daysToSubtract = 7;
      }
      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);
      return date >= startDate;
    });
  
    return (
      <div className="flex justify-center items-center bg-gray-100">
        <Card className="w-[67vw]">
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
              <CardTitle>Emission Chart</CardTitle>
              <CardDescription>
                Showing total emissions for the last 3 months
              </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[20vh] rounded-lg sm:ml-auto"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="fillemissions" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-emissions)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-emissions)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="emissions"
                  type="natural"
                  fill="url(#fillemissions)"
                  stroke="var(--color-emissions)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  export default Chart;
  