"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import useProducts from "@/hooks/useProducts";
import { useAuthUser } from "@/hooks/useAuthUser";
import instance from "@/hooks/instance";
import Loading from "../loading";
import { ICard } from "@/types/workCardTypes";
import useRequireAuth from "@/hooks/useRequireAuth";
import { MapPinCheck, School } from "lucide-react";

const optionalAvatar =
  "https://res.cloudinary.com/dnfjdkspi/image/upload/v1759129164/projects/4821b1302963013.5d29ed92444b7-1759129160723.png";

const Dashboard = () => {
  const { isPending: userPending, data: user } = useAuthUser();
  const [loading, setLoading] = useState(false);
  const { data :product, isPending, refetch, error, isError } = useProducts();
  const checked = useRequireAuth("token");
  if (!checked) return <Loading />;

  const handleDelete = async (prod: ICard) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
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

  const handleEdit = (prod: ICard) => {
    console.log("Edit product:", prod);
  };

  if (isPending || loading || userPending) return <Loading />;
  if (isError || error) return <p>Error: {(error as Error).message}</p>;
  if (!product || product.length === 0) return <p className="text-center py-4">No design found.</p>;
  if (!checked) return null;
  const { avatar, name, proffession, location } = user[0];
  
  return (
    <div className="grid grid-cols-4 gap-4 container mx-auto py-6">
      {/* LEFT SIDEBAR */}
      <div className="col-span-1">

        <div className="rounded-xl shadow-lg overflow-hidden bg-seWhite ">
          <div className="relative h-32 bg-seBlue/80">
            <Image
              src={avatar}
              alt={name}
              width={96}
              height={96}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-seWhite "
            />
          </div>

          <div className="pt-16 pb-6 px-6 text-start">
            <h1 className="text-2xl font-bold text-seSlack ml-1.5">
              {name}
            </h1>
            <p className="text-seSlack flex items-center text-xs font-light"> <span> <School  className="mr-2 w-5"/> </span> {proffession}</p>
            <p className="text-seSlack flex items-center text-xs font-light"> <span className="mr-2 w-5" > <MapPinCheck className="mr-2 w-5"/> </span> {location}</p>
          </div>

          <div className="px-6 mb-4">
            <Link href="/create-project">
              <button className="w-full bg-seBlue text-seWhite py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                Create Project
              </button>
            </Link>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

      </div>

      {/* RIGHT CONTENT */}
      <div className="col-span-3">
        <table className="w-full divide-y divide-gray-200 ">
          <thead className="">
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

          <tbody className="divide-y divide-gray-200">
            {product?.map((prod, i) => (
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
