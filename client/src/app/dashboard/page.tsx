"use client";
import useProducts from "@/hooks/useProducts";
import Link from "next/link";
import Loading from "../loading";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useAuthUser } from "@/hooks/useAuthUser";
import instance from "@/hooks/instance";
import toast from "react-hot-toast";
import { useState } from "react";
import { ICard } from "@/types/workCardTypes";
import axios from "axios";
const optionalAvatar = "https://res.cloudinary.com/dnfjdkspi/image/upload/v1759129164/projects/4821b1302963013.5d29ed92444b7-1759129160723.png";
const Dashboard = () => {
  useAuthUser();
  const [loading, setLoading] = useState(false);
  const { user, logout } = useUser();
  const { data, isPending, refetch, error, isError } = useProducts();

  if (isPending || loading) return <Loading />;
  if (isError || error) return <p>Error: {(error as Error).message}</p>;
  if (!data || data.length === 0) {
    return <p className="text-center py-4">No design found.</p>;
  }

  const handleDelete = async (prod: ICard) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) return;
    setLoading(true);

    try {
      const res = await instance.delete(`/products/delete/${prod._id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        refetch();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Failed to delete product");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (prod: ICard) => {
    console.log("Edit product:", prod);
  };

  return (
    <div className="grid grid-cols-4 gap-4 container mx-auto py-6">
      {/* LEFT SIDEBAR */}
      <div className="col-span-1">
        {user && (
          <div className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800">
            <div className="relative h-32 bg-gradient-to-r from-indigo-600 to-blue-700">
              <Image
                src={user?.avatar || optionalAvatar}
                alt={user.name || "Seaid Emon"}
                width={96}
                height={96}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white dark:border-gray-800"
              />
            </div>

            <div className="pt-16 pb-6 px-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{user.name}</h1>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{user.role}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{user.bio}</p>
            </div>

            <div className="px-6 mb-4">
              <Link href="/create-project">
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Create Project
                </button>
              </Link>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
              <button
                onClick={logout}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="col-span-3">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {["#", "Image", "Name", "Category", "Visit", "Action"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((prod, i) => (
              <tr key={prod._id}>
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">
                  <Image
                    src={prod.images[0]}
                    alt={prod.title}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">{prod.title}</td>
                <td className="px-6 py-4">{prod.category}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/design-details/${prod._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
                <td className="px-6 py-4 flex items-center">
                  <button
                    onClick={() => handleEdit(prod)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prod)}
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
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
  );
};

export default Dashboard;
