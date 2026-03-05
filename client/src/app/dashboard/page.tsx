"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthUser } from "@/hooks/useAuthUser";
import instance from "@/hooks/instance";
import { TbHttpDelete } from "react-icons/tb";
import { FiEdit3 } from "react-icons/fi";

import { ICard } from "@/types/workCardTypes";
import { MapPinCheck, School } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import Swal from "sweetalert2";
import useManageDashboard from "@/hooks/useManageDashboard";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const { isPending: userPending, data: user } = useAuthUser();
  const [loading, setLoading] = useState(false);
  const { data:projects, isPending, isError, error, refetch } = useManageDashboard();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ICard | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const openEditModal = (prod: ICard) => {
    setEditProduct(prod);
    setEditTitle(prod.title ?? "");
    setEditCategory(prod.category ?? "");
    setIsModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editProduct) return;

    setLoading(true);
    try {
      const res = await instance.put(`/products/update/${editProduct._id}`, {
        title: editTitle,
        category: editCategory,
      });
      if (res.data.success) {
        toast.success("Product updated successfully!");
        refetch();
        setIsModalOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Failed to update product");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (prod: ICard) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const res = await instance.delete(`/products/delete/${prod._id}`);
          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message || "Failed to delete product");
          } else {
            toast.error("Something went wrong");
          }
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleLogout = async () => {
    try {
      setLoading(true)
      const res = await instance.post(`/auth/logout`, {}, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/");
        window.dispatchEvent(new Event("authChange"));
        setLoading(false)
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false)
    }
  };

  if (isPending || loading || userPending) return <Loader />;

  if (isError || error) return <p>Error: {(error as Error).message}</p>;
  if (!projects || projects.length === 0) return <p className="text-center py-4">No design found.</p>;

  const { avatar, name, proffession, location } = user[0];

  return (
    <>
      <div className="grid grid-cols-4 gap-4 container mx-auto py-6">
        {/* LEFT SIDEBAR */}
        <div className="col-span-1">
          {/* Sidebar content */}
          <div className="rounded-xl shadow-lg overflow-hidden bg-seWhite">
            <div className="relative h-32 bg-seBlue/70">
              <Image
                src={avatar}
                alt={name}
                width={96}
                height={96}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-seWhite"
              />
            </div>

            <div className="pt-16 pb-6 px-6 text-start">
              <h1 className="text-2xl font-bold text-seSlack ml-1.5">{name}</h1>
              <p className="text-seSlack flex items-center text-xs font-light">
                <School className="mr-2 w-5" /> {proffession}
              </p>
              <p className="text-seSlack flex items-center text-xs font-light">
                <MapPinCheck className="mr-2 w-5" /> {location}
              </p>
            </div>

            <div className="px-6 mb-4">
              <Link href="/create-project">
                <button className="w-full bg-seRed text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer">
                  Create Project
                </button>
              </Link>
            </div>

            <div className="bg-gray-50 px-6 py-4">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 cursor-pointer text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-3">
          <table className="w-full divide-y divide-gray-200">
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

            <tbody className="my-2">
              {projects?.map((prod, i) => (
                <tr key={prod._id}>
                  <td className="px-6">{i + 1}</td>
                  <td className="px-6">
                    <Image
                      src={prod.images[0]}
                      alt={prod.title}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6">{prod.title}</td>
                  <td className="px-6">{prod.category}</td>
                  <td className="px-6">
                    <Link
                      href={`/design-details/${prod._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-6 py-4 flex items-center">
                    <button title="Edit"
                      onClick={() => openEditModal(prod)}
                      className="px-4 cursor-pointer py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      <FiEdit3 />
                    </button>
                    <button title="Delete"
                      onClick={() => handleDelete(prod)}
                      className="ml-2 cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      <TbHttpDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded bg-seWhite p-6">
            <Dialog.Title className="text-lg font-bold mb-4">Edit Product</Dialog.Title>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              placeholder="Category"
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Dashboard;
