"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthUser } from "@/hooks/useAuthUser";
import instance from "@/hooks/instance";
import { ICard } from "@/types/workCardTypes";
import { Briefcase, Edit3, Eye, LogOut, MapPin, Menu, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useManageDashboard from "@/hooks/useManageDashboard";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const { isPending: userPending, data: user } = useAuthUser();
  const [loading, setLoading] = useState(false);
  const { data: projects, isPending, isError, error, refetch } = useManageDashboard();
  const router = useRouter();
  const categories = ["All", ...new Set(projects?.map(p => p.category) || [])];


  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [editProduct, setEditProduct] = useState<ICard | null>(null);


    const filteredProjects = projects?.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === "All" || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

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
    <div className="min-h-screen bg-seWhite">
      {/* MOBILE SIDEBAR TOGGLE */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* OVERLAY FOR MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* FIXED SIDEBAR */}
      <aside
        className={`fixed left-0 h-screen w-80 z-40 transform transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* PROFILE SECTION */}

          {/* Avatar */}
          <div className="relative px-6 pb-6">
            <div className="text-center">
              <Image
                src={avatar}
                alt={name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="pt-5 space-y-3">
              <div>
                <h1 className="text-2xl font-bold text-seBlack">{name}</h1>
                <p className="text-sm font-medium text-seBlue">Creator</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-seBlack/80">
                  <Briefcase size={16} className="text-indigo-600 shrink-0" />
                  <span>{proffession}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-seBlack/80">
                  <MapPin size={16} className="text-indigo-600 shrink-0" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>

        {/* DIVIDER */}
        <div className="px-6 my-3">
          <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* ACTION BUTTONS */}
        <div className="px-6 space-y-3">
          <Link href="/create-project" className="block">
            <button className="w-full group relative overflow-hidden bg-linear-to-r from-blue-600 to-indigo-600 text-seBlack py-3 px-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
              <span className="flex items-center justify-center gap-2">
                <Plus size={18} />
                Create Project
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-seRed hover:bg-red-50 text-seBlack hover:text-red-600 py-3 px-4 rounded-lg font-semibold transition-all border border-transparent hover:border-red-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* FOOTER STATS */}
        <div className="px-6 py-4 z-20">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-600">{projects?.length || 0}</p>
              <p className="text-xs text-seBlack/70 font-medium">Projects</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="text-2xl font-bold text-indigo-600">{projects?.length || 0}</p>
              <p className="text-xs text-seBlack/70 font-medium">Created</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="md:ml-80 pt-16 md:pt-6 bg-transparent">
        <div className="p-4 md:p-8">
          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-seBlack mb-2">My Projects</h2>
            <p className="text-seBlack">Manage and showcase your creative work</p>
          </div>

          {/* SEARCH & FILTERS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
              />
            </div>
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-seBlack focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* PROJECTS TABLE - DESKTOP */}
          <div className="hidden md:block">
            <div className="rounded-xl shadow-lg overflow-hidden border border-seGray">              <table className="w-full">
                <thead>
                  <tr className="">
                    {["#", "Image", "Name", "Category", "Action"].map((head) => (
                      <th
                        key={head}
                        className="px-6 py-4 text-left text-sm font-semibold text-seBlack uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-seGray">
                  {filteredProjects?.map((project, i) => (
                    <tr key={project._id} className="hover:bg-seGray/30 transition-colors group">
                      <td className="px-6 py-4 text-sm font-medium text-seBlack">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="relative overflow-hidden rounded-lg w-16 h-16 shadow-md group-hover:shadow-lg transition-shadow">
                          <Image
                            src={project?.images[0] || '/placeholder.jpg'}
                            alt={project.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-seBlack">{project.title}</p>
                          <p className="text-xs text-seBlack/70 mt-1">ID: {project._id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/design-details/${project._id}`}>
                            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View">
                              <Eye size={18} />
                            </button>
                          </Link>
                          <button
                            onClick={() => openEditModal(project)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(project)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProjects?.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <Briefcase size={48} className="mx-auto text-seBlue mb-4" />
                  <p className="text-slate-600 font-medium">No projects found</p>
                  <p className="text-sm text-slate-500">Create your first project to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* PROJECTS GRID - MOBILE */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {filteredProjects?.map((project) => (
              <div
                key={project._id}
                className=" rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-100"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={project?.images[0] || '/placeholder.jpg'}
                    alt={project.title}
                    fill
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-seBlack mb-2">{project.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                      {project.category}
                    </span>
                    <p className="text-xs text-slate-500">ID: {project._id?.slice(-6)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/design-details/${project._id}`} className="flex-1">
                      <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                        <Eye size={16} />
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => openEditModal(project)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredProjects?.length === 0 && (
              <div className="text-center py-12">
                <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-600 font-medium">No projects found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-50 duration-300">
            {/* MODAL HEADER */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit3 size={20} />
                Edit Project
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Project Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Enter project title"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  placeholder="Enter category"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="px-6 py-4 border-t border-slate-100 rounded-b-2xl flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-6 py-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 font-medium transition-all active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Dashboard;
