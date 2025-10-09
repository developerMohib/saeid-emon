"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAuthUser } from "@/hooks/useAuthUser";
import { PenLine } from "lucide-react";
import instance from "@/hooks/instance";
import toast from "react-hot-toast";
import useCheckAuth from "@/hooks/useCheckAuth";
import Loader from "./Loader";

const Banner = () => {
    const { isPending, isError, error, data, refetch } = useAuthUser();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const { isAuthenticated, loading: isLoading } = useCheckAuth();

    if (isPending || isLoading) return <Loader />;
    if (isError) return <p>Error: {error?.message}</p>;
    const newdata = data?.[0] || {};

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setBannerFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!bannerFile) return;

        const formData = new FormData();
        formData.append("banner", bannerFile);
        setLoading(true);
        try {
            const res = await instance.put("/api/user/banner", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // Update UI manually (replace this with your logic)
            if (res.data.success) {
                newdata.banner = res.data.bannerUrl;
                refetch();
                toast.success(res.data.message);
            }

            setShowModal(false);
            setPreview(null);
            setBannerFile(null);
            setLoading(false);
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative w-full h-56 pt-0 -mt-3.5">
            <Image
                src={newdata?.banner}
                alt="Banner"
                fill
                className="object-cover md:object-contain"
                priority
            />

            {isAuthenticated && (
                <button
                    onClick={() => setShowModal(true)}
                    className="absolute top-3 right-3 bg-seRed p-2 rounded-full shadow cursor-pointer text-white hover:bg-red-700 transition"
                >
                    <PenLine size={16} />
                </button>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-seSlack flex justify-center items-center z-50">
                    <div className="bg-seWhite p-5 rounded-lg w-96 space-y-4">
                        <h2 className="text-lg font-semibold">Change Banner <span className="text-xs font-light text-seGray/60" >Max 2MB</span> </h2>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border p-2"
                        />

                        {preview && (
                            <Image
                                src={preview}
                                alt="Preview"
                                width={300}
                                height={150}
                                className="rounded-md object-cover"
                            />
                        )}

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-seGray/60 px-4 py-2 rounded cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button disabled={loading || !bannerFile}
                                onClick={handleSubmit}
                                className={`bg-seRed text-seWhite px-4 py-2 rounded cursor-pointer ${loading || !bannerFile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                            >
                                {loading ? 'Uploading...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner;
