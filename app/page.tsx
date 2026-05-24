"use client";

import { saveAs } from "file-saver";

import PropertyTable from "./components/PropertyTable";
import AIChat from "./components/AIChat";
import CollectionChart from "./components/CollectionChart";

import { useMemo, useState } from "react";

import properties from "./data/properties.json";

export default function Home() {

  const [selectedCity, setSelectedCity] =
    useState("All Cities");

  const [search, setSearch] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(false);

  const cities = [
    "All Cities",

    ...new Set(
      properties.map(
        (property) =>
          property.tenant
      )
    ),
  ];

  const filteredProperties =
    useMemo(() => {

      return properties.filter(
        (property) => {

          const matchesCity =
            selectedCity === "All Cities"

              ? true

              : property.tenant ===
                selectedCity;

          const matchesSearch =

            property.owner_name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            property.property_id
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            property.tenant
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          return (
            matchesCity &&
            matchesSearch
          );
        }
      );

    }, [selectedCity, search]);

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

  const exportCSV = () => {

    const headers = [

      "Property ID",
      "Owner Name",
      "City",
      "Status",
      "Annual Tax",

    ];

    const rows =
      filteredProperties.map(
        (property) => [

          property.property_id,
          property.owner_name,
          property.tenant,
          property.status,
          property.annual_tax_inr,

        ]
      );

    const csvContent =

      [
        headers.join(","),

        ...rows.map(
          (row) => row.join(",")
        ),

      ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    saveAs(
      blob,
      "property-data.csv"
    );
  };

  return (

    <main
      className={`min-h-screen p-8 transition-all duration-300 ${
        darkMode
          ? "bg-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1
              className={`text-5xl font-bold ${
                darkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >

              NUDM Property Dashboard

            </h1>

            <p
              className={`mt-2 text-lg ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >

              Property Tax Analytics Platform

            </p>

          </div>

          <div className="flex flex-col gap-4">

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-black text-white px-6 py-3 rounded-xl"
            >

              {darkMode
                ? "☀️ Light Mode"
                : "🌙 Dark Mode"}

            </button>

            <select
              value={selectedCity}
              onChange={(e) =>
                setSelectedCity(
                  e.target.value
                )
              }
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-lg shadow-sm text-black"
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

            <input
              type="text"
              placeholder="Search property, owner, city..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-lg shadow-sm md:w-96 text-black"
            />

            <button
              onClick={exportCSV}
              className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
            >

              Export CSV

            </button>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-2xl p-6 shadow-lg">

            <p className="text-gray-500 text-lg">

              Total Properties

            </p>

            <h2 className="text-5xl font-bold mt-4 text-black">

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

      <PropertyTable
        properties={filteredProperties}
      />

    </main>
  );
}