"use client";
import { useState } from "react";

interface BannerData {
  badge: string;
  titleLine1: string;
  highlight: string;
  titleLine3: string;
  description: string;
}

interface Props {
  initialData: BannerData;
  onClose: () => void;
  onSave: (data: BannerData) => void;
}

const BannerModal = ({ initialData, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState<BannerData>(initialData);

  const handleChange = (key: keyof BannerData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };
console.log(formData)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-5 transform transition-all duration-300 ease-out scale-95 animate-[fadeIn_0.3s_ease-out]">

        <div className="space-y-3 mt-3">
          {/* Badge */}
          <div>
            <label className="text-sm font-medium text-gray-700">Badge</label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-seRed focus:outline-none"
              maxLength={40} // keeps it short
            />
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.titleLine1}
              onChange={(e) => handleChange("titleLine1", e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-seRed focus:outline-none"
              maxLength={60}
            />
          </div>

          {/* Highlight */}
          <div>
            <label className="text-sm font-medium text-gray-700">Highlight</label>
            <input
              type="text"
              value={formData.highlight}
              onChange={(e) => handleChange("highlight", e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-seRed focus:outline-none"
              maxLength={40}
            />
          </div>

          {/* Heading (Line 3) */}
          <div>
            <label className="text-sm font-medium text-gray-700">Heading</label>
            <input
              type="text"
              value={formData.titleLine3}
              onChange={(e) => handleChange("titleLine3", e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-seRed focus:outline-none"
              maxLength={60}
            />
          </div>

          {/* One‑line Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Short Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-seRed focus:outline-none resize-none"
              rows={2} // restricts to one or two lines
              maxLength={120}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1.5 bg-seRed text-white rounded-md hover:bg-red-600 shadow-md transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>

  );
};

export default BannerModal;
