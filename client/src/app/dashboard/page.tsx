"use client"
import useProducts from "@/hooks/useProducts";
import Link from "next/link";
import Loading from "../loading";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useAuthUser } from "@/hooks/useAuthUser";
import instance from "@/hooks/instance";
import toast from "react-hot-toast";
import { useState } from "react";

const Dashboard = () => {
  useAuthUser();
const [loading, setLoading] = useState(false);
  const { user, logout } = useUser();
  const { data, isPending, refetch, error, isError } = useProducts();
console.log('data user', user)
  if (isPending || loading) return <Loading />;
  if (isError || error) return <p>Error: {(error as Error).message}</p>;
  console.log('user', user)
  if (!data || data.length === 0) {
    return <p className="text-center py-4">No design found.</p>;
  }

const handleDelete = async (prod) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this product?");
  if (!isConfirmed) return;
setLoading(true);

  try {
    const res = await instance.delete(`/products/delete/${prod._id}`);
    if(res.data.success){
      toast.success(res.data.message);
      refetch(); // refresh data
      setLoading(false);
    }
  } catch (err: any) {
    toast.error("Failed to delete product");
    console.error(err);
  }
};


  const handleEdit = async (prod) => {
    console.log(' prp', prod)
    refetch()
  }

  return (
    <div className="grid grid-cols-6 gap-x-3">
      <div className="grid-cols-1">
        {user ? (
          <div className="flex items-center gap-2">
            <Image width={500} height={500}
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
      <div className="col-span-5">
        <table className="divide-y divide-seGray/20">
          <thead>
            <tr>
              {["#", "Image", "Name", "Category", "visit", "Action"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-seSlack/70 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-seGray/20">
            {data?.map((prod, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image src={prod.images[0]} alt={prod.title} width={500} height={500} className="w-28 h-28 rounded-lg" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{prod.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prod.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/design-details/${prod._id}`} className="text-seBlue hover:text-seRed hover:underline">
                    View
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit?.(prod)}
                    className="px-4 py-2 font-medium text-seWhite bg-seBlue rounded-md hover:bg-blue-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete?.(prod)}
                    className="ml-2 px-4 py-2 font-medium text-seWhite bg-seRed rounded-md hover:bg-red-500 transition"
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
