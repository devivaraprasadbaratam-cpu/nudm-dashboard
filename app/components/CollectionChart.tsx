"use client";

import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,

} from "recharts";

type Property = {
  tenant: string;
  collection_inr: number;
};

export default function CollectionChart({
  properties,
}: {
  properties: Property[];
}) {

  const groupedData =
    Object.values(

      properties.reduce((acc, property) => {

        if (!acc[property.tenant]) {

          acc[property.tenant] = {

            city: property.tenant,
            total: 0,

          };
        }

        acc[property.tenant].total +=
          property.collection_inr;

        return acc;

      }, {} as any)

    );

  return (

    <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">

      <h2 className="text-3xl font-bold mb-6 text-black">

        Collection Per City

      </h2>

      <div className="w-full h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={groupedData}>

            <XAxis
              dataKey="city"
              stroke="#000000"
            />

            <YAxis stroke="#000000" />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="#000000"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}