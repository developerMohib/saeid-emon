"use client"
import instance from "@/hooks/instance";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateProjectPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
         if (!e.target.files || e.target.files.length === 0) {
      toast.error("No files selected!");
      return;
    }
    if (e.target.files.length > 4) {
      toast.error("You can upload max 4 images");
      return;
    }

        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !intro || images.length === 0) {
            toast.error("Fill all fields and upload at least 1 image");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("intro", intro);
            formData.append("category", category);
            setLoading(true);
            images.forEach((img) => {
                formData.append("images", img);
            });
            setLoading(true)
            const res = await instance.post("/products/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res?.data?.success) {
                toast.success(res?.data.message);
                setTitle("");
                setIntro("");
                setCategory("");
                setImages([]);
                setLoading(false);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Images Need To Compress for MB or Dimension");
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-2">Project Name</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter project name"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2"> Intro </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        required
                        placeholder="Are you looking for...."
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2"> Category </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        placeholder="Enter Project Category"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Upload Images <span className="text-xs text-seGray">max 4 images less than 10 MB </span></label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full border rounded px-3 py-2"
                    />
                    <div className="flex flex-wrap mt-2 gap-2">
                        {images.map((img, idx) => (
                            <Image
                                key={idx}
                                src={URL.createObjectURL(img)}
                                alt="preview"
                                className="w-full h-52 object-cover rounded border"
                                width={500} height={500}
                            />
                        ))}
                    </div>
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''} `}
                >
                    {loading ? 'Publishing...' : 'Publish Project'}
                </button>
            </form>
        </div>
    );
};

export default CreateProjectPage;