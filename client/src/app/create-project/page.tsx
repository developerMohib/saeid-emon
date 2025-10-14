"use client"
import instance from "@/hooks/instance";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UploadState {
    progress: number;
    status: 'idle' | 'uploading' | 'success' | 'error';
    url?: string;
}

const CreateProjectPage: React.FC = () => {
    // Form states
    const [formData, setFormData] = useState({
        title: "",
        intro: "",
        category: ""
    });
    const [images, setImages] = useState<File[]>([]);
    const [uploadStates, setUploadStates] = useState<UploadState[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Handle form input changes
    const handleInputChange = (field: keyof typeof formData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({ ...prev, [field]: e.target.value }));
        };

    // Handle image selection with validation
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            toast.error("No files selected!");
            return;
        }

        const files = Array.from(e.target.files);

        // Validation
        if (files.length > 5) {
            toast.error("You can upload max 5 images");
            return;
        }

        const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            toast.error(`Some files exceed 10MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
            return;
        }

        setImages(files);
        setUploadStates(files.map(() => ({
            progress: 0,
            status: 'idle'
        })));
    };

    // Upload single file to Cloudinary with better error handling
    const uploadToCloudinary = async (file: File, index: number): Promise<string | null> => {
        // Update state to uploading
        setUploadStates(prev => prev.map((state, i) =>
            i === index ? { ...state, status: 'uploading' } : state
        ));

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "project_product_preset");

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/dsqqllu6n/image/upload`,
                formData,
                {
                    timeout: 120000, // 2 minutes timeout
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setUploadStates(prev => prev.map((state, i) =>
                                i === index ? { ...state, progress: percent } : state
                            ));
                        }
                    },
                }
            );

            // Mark as successful
            setUploadStates(prev => prev.map((state, i) =>
                i === index ? { ...state, status: 'success', progress: 100 } : state
            ));

            return res.data.secure_url;
        } catch (err) {
            console.error("Cloudinary upload error:", err);

            console.error("Cloudinary upload error:", err);

            let errorMessage = "Image upload failed";

            // Type-safe error handling
            if (axios.isAxiosError(err)) {
                if (err.code === 'ECONNABORTED') {
                    errorMessage = "Upload timeout";
                } else if (err.response?.status === 400) {
                    errorMessage = "Invalid file format";
                } else if (err.response?.status === 413) {
                    errorMessage = "File too large";
                } else if (!err.response) {
                    errorMessage = "Network error - check your connection";
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            toast.error(`Failed to upload ${file.name}: ${errorMessage}`);

            // Mark as error
            setUploadStates(prev => prev.map((state, i) =>
                i === index ? { ...state, status: 'error', progress: 0 } : state
            ));

            return null;
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim() || !formData.intro.trim() || images.length === 0) {
            toast.error("Please fill all fields and upload at least 1 image");
            return;
        }

        setIsSubmitting(true);

        try {
            // Upload all images with progress tracking
            const uploadPromises = images.map((img, index) => uploadToCloudinary(img, index));
            const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];

            if (uploadedUrls.length === 0) {
                toast.error("No images were successfully uploaded");
                return;
            }

            // Show creating project toast
            const createToast = toast.loading("Creating project...");

            // Send data to backend
            const payload = {
                ...formData,
                images: uploadedUrls,
            };

            const res = await instance.post("/products/create", payload);

            if (res?.data?.success) {
                toast.success("Project created successfully!", { id: createToast });

                // Reset form
                setFormData({ title: "", intro: "", category: "" });
                setImages([]);
                setUploadStates([]);
            } else {
                throw new Error(res?.data?.message || "Failed to create project");
            }

        } catch (error) {
            console.error("Submission error:", error);

            // Type-safe error handling
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Network error occurred");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong!");
            }

        } finally {
            setIsSubmitting(false);
        }
    };

    // Progress circle component
    const ProgressCircle = ({ progress, status }: UploadState) => {
        const radius = 20;
        const stroke = 4;
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset = circumference - (progress / 100) * circumference;

        const getStrokeColor = () => {
            switch (status) {
                case 'success': return '#10b981';
                case 'error': return '#ef4444';
                case 'uploading': return '#3b82f6';
                default: return '#e5e7eb';
            }
        };

        return (
            <svg height={radius * 2} width={radius * 2} className="inline-block">
                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={getStrokeColor()}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference + " " + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-300"
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="text-xs font-bold fill-gray-700"
                >
                    {progress}%
                </text>
            </svg>
        );
    };

    const overallProgress = uploadStates.length > 0
        ? Math.round(uploadStates.reduce((sum, state) => sum + state.progress, 0) / uploadStates.length)
        : 0;

    const isUploading = uploadStates.some(state => state.status === 'uploading');

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            {/* Global Progress Indicator */}
            {(isUploading || isSubmitting) && (
                <div className="fixed top-5 right-5 z-50 bg-white p-3 rounded-lg shadow-lg border">
                    <div className="text-center">
                        <ProgressCircle
                            progress={overallProgress}
                            status={isUploading ? 'uploading' : 'success'}
                        />
                        <p className="text-xs mt-1 text-gray-600">
                            {isUploading ? 'Uploading...' : 'Processing...'}
                        </p>
                    </div>
                </div>
            )}

            <h1 className="text-3xl font-bold mb-6 text-center">Create New Project</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-seWhite p-6 rounded-lg shadow-sm border">
                {/* Project Name */}
                <div>
                    <label className="block font-medium mb-2 text-seSlack">Project Name *</label>
                    <input
                        type="text"
                        className="w-full border border-seGray/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        value={formData.title}
                        onChange={handleInputChange('title')}
                        required
                        placeholder="Enter project name"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Intro */}
                <div>
                    <label className="block font-medium mb-2 text-seSlack">Introduction *</label>
                    <input
                        type="text"
                        className="w-full border border-seGray/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        value={formData.intro}
                        onChange={handleInputChange('intro')}
                        required
                        placeholder="Describe your project..."
                        disabled={isSubmitting}
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium mb-2 text-seSlack">Category *</label>
                    <input
                        type="text"
                        className="w-full border border-seGray/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        value={formData.category}
                        onChange={handleInputChange('category')}
                        required
                        placeholder="Enter project category"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium mb-2 text-seSlack">
                        Upload Images *
                        <span className="text-xs text-gray-500 ml-2">max 5 images, less than 10MB each</span>
                    </label>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full border border-seGray/40 rounded-lg px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                        disabled={isSubmitting}
                    />

                    {/* Upload Progress for each file */}
                    {uploadStates.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {images.map((img, index) => (
                                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                    <ProgressCircle {...uploadStates[index]} />
                                    <span className="text-sm text-seSlack flex-1 truncate">{img.name}</span>
                                    <span className={`text-xs px-2 py-1 rounded ${uploadStates[index].status === 'uploading' ? 'bg-blue-100 text-blue-800' :
                                            uploadStates[index].status === 'success' ? 'bg-green-100 text-green-800' :
                                                uploadStates[index].status === 'error' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }`}>
                                        {uploadStates[index].status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Image Previews */}
                    <div className="flex flex-wrap gap-3 mt-3">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative group">
                                <Image
                                    src={URL.createObjectURL(img)}
                                    alt="preview"
                                    className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                                    width={96}
                                    height={96}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImages(prev => prev.filter((_, i) => i !== idx));
                                            setUploadStates(prev => prev.filter((_, i) => i !== idx));
                                        }}
                                        className="text-white text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition"
                                        disabled={isSubmitting}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition cursor-pointer ${isSubmitting || isUploading
                            ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        }`}
                >
                    {isUploading ? 'Uploading Images...' :
                        isSubmitting ? 'Creating Project...' :
                            'Publish Project'}
                </button>
            </form>
        </div>
    );
};

export default CreateProjectPage;