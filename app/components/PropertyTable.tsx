type Property = {
  property_id: string;
  owner_name: string;
  tenant: string;
  status: string;
  annual_tax_inr: number;
};

export default function PropertyTable({
  properties,
}: {
  properties: Property[];
}) {

  return (

    <div className="bg-white p-6 rounded-2xl shadow-lg mt-10 overflow-x-auto">

      <h2 className="text-3xl font-bold mb-6 text-black">

        Property Records

      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-gray-100">

            <th className="text-left p-4 text-black">
              Property ID
            </th>

            <th className="text-left p-4 text-black">
              Owner
            </th>

            <th className="text-left p-4 text-black">
              City
            </th>

            <th className="text-left p-4 text-black">
              Status
            </th>

            <th className="text-left p-4 text-black">
              Annual Tax
            </th>

          </tr>

        </thead>

        <tbody>

          {properties.slice(0, 10).map((property) => (

            <tr
              key={property.property_id}
              className="border-b border-gray-300"
            >

              <td className="p-4 text-black">
                {property.property_id}
              </td>

              <td className="p-4 text-black">
                {property.owner_name}
              </td>

              <td className="p-4 text-black">
                {property.tenant}
              </td>

              <td className="p-4 text-black">
                {property.status}
              </td>

              <td className="p-4 text-black">

                ₹
                {property.annual_tax_inr.toLocaleString()}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}