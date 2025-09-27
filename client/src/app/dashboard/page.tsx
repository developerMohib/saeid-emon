"use client"
import useProducts from "@/hooks/useProducts";
import Link from "next/link";

const Dashboard = () => {
  const { data } = useProducts()
  if (!data || data.length === 0) {
    return <p className="text-center py-4">No users found.</p>;
  }
  
  const handleDelete = async (prod) => {
    console.log(' prp', prod)
  }
  const handleEdit = async (prod) => {
    console.log(' prp', prod)
  }
  const status = "Active"
  return (
    <div className="grid grid-cols-4 gap-x-3">
      <div className="grid-cols-1">
         

        <Link href={'/create-project'} > <button className="cursor-pointer"> Create Project </button> </Link>
      </div>
      <div className="col-span-3">
        <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {["Name", "Email", "Role", "Status", "Action"].map((head) => (
            <th
              key={head}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((user, i) => (
          <tr key={i}>
            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">user.email</td>
            <td className="px-6 py-4 whitespace-nowrap">user.role</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
                  }`}
              >
                {status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => handleEdit?.(user)}
                className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete?.(user)}
                className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  )
};

export default Dashboard;
