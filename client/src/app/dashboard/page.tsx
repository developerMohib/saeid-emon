"use client"
import useProducts from "@/hooks/useProducts";
import Link from "next/link";
import Loading from "../loading";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

const Dashboard = () => {
  const { user, logout } = useUser();
  const { data, isPending, refetch, error, isError } = useProducts();
  if (isPending) return <Loading />;
  if (isError || error) return <p>Error: {(error as Error).message}</p>;

  console.log(' data',data)
  console.log('user',user)

  if (!data || data.length === 0) {
    return <p className="text-center py-4">No users found.</p>;
  }

  const handleDelete = async (prod) => {
    console.log(' prp', prod);
    refetch()
  }
  const handleEdit = async (prod) => {
    console.log(' prp', prod)
    refetch()
  }

  return (
    <div className="grid grid-cols-4 gap-x-3">
      <div className="grid-cols-1">
        {user ? (
        <div className="flex items-center gap-2">
          <Image
            src={user.avatar || "https://i.pravatar.cc/50"}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span>{user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <span>Guest</span>
      )}

        <Link href={'/create-project'} > <button className="cursor-pointer"> Create Project </button> </Link>
      </div>
      <div className="col-span-3">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {["#", "Image","Name",  "Category", "Action"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((user, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">{i+1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image src={user.image} alt={user.name} width={500} height={500} className="w-28 h-28 rounded-lg"/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.category}</td>                
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
