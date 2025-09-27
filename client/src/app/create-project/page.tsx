"use client"
import Image from "next/image";
import React, { useState } from "react";

const CreateProjectPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Submit project data to backend
        alert("Project submitted!");
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-2">Project Title</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter project title"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Description</label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Describe your project"
                        rows={5}
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Upload Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <div className="flex flex-wrap mt-2 gap-2">
                        {images.map((img, idx) => (
                            <Image
                                key={idx}
                                src={URL.createObjectURL(img)}
                                alt="preview"
                                className="w-24 h-24 object-cover rounded border"
                                width={500} height={500}
                            />
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
                >
                    Publish Project
                </button>
            </form>
        </div>
    );
};

export default CreateProjectPage;