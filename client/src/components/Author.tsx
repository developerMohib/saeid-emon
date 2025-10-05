"use client";
import Image from "next/image";
import Link from "next/link";
import {
    CircleAlert,
    MapPinCheck,
    PenLine,
} from "lucide-react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useState } from "react";
import instance from "@/hooks/instance";
import toast from "react-hot-toast";
import useCheckAuth from "@/hooks/useCheckAuth";
import Loader from "./Loader";

const Author = () => {
    const { isPending, isError, error, data, refetch } = useAuthUser();
    const isAuthenticated = useCheckAuth();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    if (isPending) return <Loader />;
    if (isError) return <p>Error: {error?.message}</p>;

    const newdata = data[0];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!avatarFile) return;

        const formData = new FormData();
        formData.append("avatar", avatarFile);
        setLoading(true);
        try {
            const res = await instance.put("/api/user/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.success) {
                newdata.avatar = res.data.data.avatar;
                refetch();
                toast.success(res.data.message);
            }
            setShowModal(false);
            setLoading(false);
            setAvatarFile(null);
            setPreview(null);

        } catch (err) {
            setLoading(false);
            if (err instanceof Error) {
                toast.error(err.message);
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <section aria-labelledby="author-heading" className="relative">
            {/* Profile image */}
            <div className="absolute left-0 -top-16">
                <div className="relative h-24 w-24">
                    <Image
                        src={newdata?.avatar}
                        alt="User Avatar"
                        width={96}
                        height={96}
                        className="rounded-full h-24 w-24 border-2 border-seWhite object-cover"
                        priority
                    />

                    {isAuthenticated && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="absolute bottom-0 right-0 bg-seRed p-2 rounded-full shadow cursor-pointer text-white hover:bg-red-700 transition"
                        >
                            <PenLine size={12} />
                        </button>
                    )}
                </div>
            </div>

            {/* Author Info */}
            <header className="pt-16 pb-6 space-y-8 text-start">
                <h1 id="author-heading" className="text-2xl font-semibold">
                    {newdata?.name}
                </h1>

                <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                        <CircleAlert className="w-4 h-4 text-seBlack" />
                        <span className="text-seSlack tracking-wide">{newdata?.proffession}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <MapPinCheck className="w-4 h-4 text-seBlack" />
                        <span className="text-seSlack tracking-wide">{newdata?.location}</span>
                    </li>
                </ul>
            </header>

            {/* Hire me button */}
            <footer>
                <Link href="/contact">
                    <button className="flex items-center justify-center gap-2 w-full bg-seGray/20 text-seRed hover:text-seWhite py-2 rounded-lg hover:bg-seRed transition-colors cursor-pointer">
                        Hire Me
                    </button>
                </Link>
            </footer>

            {/* Modal for Upload */}
            {showModal && (
                <div className="fixed inset-0 bg-seBlack flex justify-center items-center z-50">
                    <div className="bg-seWhite p-5 rounded-lg w-96 space-y-4">
                        <h2 className="text-lg font-semibold">Change Profile Picture <span className="text-xs font-light text-seGray/60" >Max 2MB</span></h2>

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
                                width={200}
                                height={200}
                                className="rounded-full object-cover mx-auto"
                            />
                        )}

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-seGray px-4 py-2 rounded cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button disabled={loading}
                                onClick={handleSubmit}
                                className={`bg-seRed text-seWhite px-4 py-2 rounded cursor-pointer ${loading || !avatarFile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                            >
                                {loading ? 'Uploading...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Author;
