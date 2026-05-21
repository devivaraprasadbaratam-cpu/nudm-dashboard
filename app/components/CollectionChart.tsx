"use client";

import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,

} from "recharts";

type Property = {
  tenant: string;
  collection_inr: number;
};

type Props = {
  properties: Property[];
};

export default function CollectionChart({
  properties,
}: Props) {

  const cityMap: Record<
    string,
    number
  > = {};

  properties.forEach((property) => {

    if (!cityMap[property.tenant]) {

      cityMap[property.tenant] = 0;
    }

    cityMap[property.tenant] +=
      property.collection_inr;
  });

  const chartData = Object.entries(
    cityMap
  ).map(([city, value]) => ({
    city,
    collection: value,
  }));

  return (

    <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">

      <h2 className="text-3xl font-bold mb-6">
        Collection Per City
      </h2>

      <div className="w-full h-[400px]">

        <ResponsiveContainer>

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="city" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="collection"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}