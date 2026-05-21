"use client";
import AIChat from "./components/AIChat";
import CollectionChart from "./components/CollectionChart";
import { useMemo, useState } from "react";

import properties from "./data/properties.json";

export default function Home() {

  const [selectedCity, setSelectedCity] =
    useState("All Cities");

  const cities = [
    "All Cities",
    ...new Set(
      properties.map(
        (property) => property.tenant
      )
    ),
  ];

  const filteredProperties =
    selectedCity === "All Cities"

      ? properties

      : properties.filter(
          (property) =>
            property.tenant === selectedCity
        );

  const totalProperties =
    filteredProperties.length;

  const totalApproved =
    filteredProperties.filter(
      (property) =>
        property.status === "Approved"
    ).length;

  const totalRejected =
    filteredProperties.filter(
      (property) =>
        property.status === "Rejected"
    ).length;

  const totalCollection =
    filteredProperties.reduce(
      (sum, property) =>
        sum + property.collection_inr,
      0
    );

  return (

    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-5xl font-bold text-gray-900">
              NUDM Property Dashboard
            </h1>

            <p className="text-gray-600 mt-2 text-lg">
              Property Tax Analytics Platform
            </p>

          </div>

          <select
            value={selectedCity}
            onChange={(e) =>
              setSelectedCity(e.target.value)
            }
            className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-lg shadow-sm"
          >

            {cities.map((city) => (

              <option
                key={city}
                value={city}
              >
                {city}
              </option>

            ))}

          </select>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-2xl p-6 shadow-lg">

            <p className="text-gray-500 text-lg">
              Total Properties
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {totalProperties}
            </h2>

          </div>

          <div className="bg-green-500 text-white rounded-2xl p-6 shadow-lg">

            <p className="text-lg">
              Approved
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {totalApproved}
            </h2>

          </div>

          <div className="bg-red-500 text-white rounded-2xl p-6 shadow-lg">

            <p className="text-lg">
              Rejected
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {totalRejected}
            </h2>

          </div>

          <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">

            <p className="text-lg">
              Total Collection
            </p>

            <h2 className="text-4xl font-bold mt-4">
              ₹
              {totalCollection.toLocaleString()}
            </h2>

          </div>

        </div>

      </div>
    <CollectionChart
  properties={filteredProperties}
/>
    <AIChat />
    </main>
  );
}