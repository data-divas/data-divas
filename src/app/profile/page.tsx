'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Title, Subtitle, BarChart } from '@tremor/react'
import { Leaf, Car, Lightbulb, ShoppingBag } from 'lucide-react'
import Chart from '../../components/Chart'

// Sample data for the carbon emissions chart
const carbonData = [
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

// Sample data for shops
const shopData = [
    { name: "EcoStore", co2PerShop: 200, totalPurchases: 20 },
    { name: "GreenMart", co2PerShop: 80, totalPurchases: 15 },
    { name: "SustainableGoods", co2PerShop: 330, totalPurchases: 25 },
  ]

export default function CarbonProfile() {
  const totalEmissions = carbonData.reduce((sum, data) => sum + data.emissions, 0)
  const emissionsSaved = 50000 - totalEmissions // Assuming a baseline of 1200
  const co2PerYear = totalEmissions
  const totalShopEmissions = shopData.reduce((sum, shop) => sum + (shop.co2PerShop * shop.totalPurchases), 0)

  return (
    <div className="container mx-auto p-4 bg-background text-foreground">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Image
            src="/placeholder.svg?height=128&width=128"
            alt="Profile picture of Jane Doe"
            width={128}
            height={128}
            className="rounded-full"
          />
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold">Jane Doe</CardTitle>
            <p className="text-muted-foreground">Environmental Enthusiast</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Carbon Emissions Overview</h2>
            <Chart/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Shopping Emissions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* <Card>
                <CardHeader>
                    <CardTitle>Total Emissions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{totalEmissions} kg CO2</p>
                    <p className="text-sm text-muted-foreground">This year</p>
                </CardContent>
                </Card> */}
                <Card>
              <CardHeader>
                <CardTitle>Emissions Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600">{emissionsSaved} kg CO2</p>
                <p className="text-sm text-muted-foreground">Compared to last year</p>
              </CardContent>
            </Card>
              <Card>
                <CardHeader>
                  <CardTitle>CO2 from Shopping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{totalShopEmissions} kg CO2</p>
                  <p className="text-sm text-muted-foreground">Emissions from all purchases</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>CO2 per Shop</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  className="h-48 mt-4"
                  data={shopData}
                  index="name"
                  categories={["co2PerShop"]}
                  color={"green"}
                  yAxisWidth={48}
                  showLegend={false}
                  showTooltip={false}
                >
                  <Title>CO2 Emissions per Shop</Title>
                  <Subtitle>Measured in kg CO2 per purchase</Subtitle>
                </BarChart>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Carbon Saving Achievements</h2>
            <div className="space-y-4">
              <Badge variant="secondary" className="text-lg p-2 flex items-center w-full sm:w-auto">
                <Leaf className="mr-2 h-4 w-4" />
                Planted 10 trees, offsetting 100 kg CO2
              </Badge>
              <Badge variant="secondary" className="text-lg p-2 flex items-center w-full sm:w-auto">
                <Car className="mr-2 h-4 w-4" />
                Reduced car usage by 30%, saving 300 kg CO2
              </Badge>
              <Badge variant="secondary" className="text-lg p-2 flex items-center w-full sm:w-auto">
                <Lightbulb className="mr-2 h-4 w-4" />
                Switched to LED bulbs, saving 50 kg CO2
              </Badge>
              <Badge variant="secondary" className="text-lg p-2 flex items-center w-full sm:w-auto">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Chose eco-friendly shops, reducing shopping emissions by 20%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}