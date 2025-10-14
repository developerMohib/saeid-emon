"use client"
import instance from "@/hooks/instance";
import axios, { AxiosProgressEvent } from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const CreateProjectPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const progressRef = useRef(progress);
    progressRef.current = progress;
    const smoothProgress = (target: number) => {
        const step = () => {
            setProgress((prev) => {
                if (prev < target) return prev + 1;
                return prev;
            });
            if (progressRef.current < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };




    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            toast.error("No files selected!");
            return;
        }
        if (e.target.files.length > 5) {
            toast.error("You can upload max 5 images");
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
            setLoading(true);
            setProgress(0);
            const res = await instance.post("/products/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        smoothProgress(percent);
                    }
                },
            });
            if (res?.data?.success) {
                toast.success(res?.data.message);
                setTitle("");
                setIntro("");
                setCategory("");
                setImages([]);
                setLoading(false);
                setProgress(100);
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


    const radius = 20;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;


    return (
        <div className="max-w-2xl mx-auto py-8">

            {loading && (
                <div className="fixed top-10 right-5 z-50">
                    <svg height={radius * 2} width={radius * 2}>
                        <circle
                            stroke="#e5e7eb"
                            fill="transparent"
                            strokeWidth={stroke}
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        <circle
                            stroke="#3b82f6"
                            fill="transparent"
                            strokeWidth={stroke}
                            strokeLinecap="round"
                            strokeDasharray={circumference + " " + circumference}
                            strokeDashoffset={strokeDashoffset}
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                            className="transition-all duration-200"
                        />
                        <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            className="text-xs font-bold fill-blue-600"
                        >
                            {progress}%
                        </text>
                    </svg>
                </div>
            )}

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
                    <label className="block font-medium mb-2">Upload Images <span className="text-xs text-seGray">max 5 images less than 10 MB </span></label>
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