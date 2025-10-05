/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import useResume from "@/hooks/useResume";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { IResume } from "@/types/resumeTypes";
import useCheckAuth from "@/hooks/useCheckAuth";
import Loader from "@/components/Loader";
import { useAuthUser } from "@/hooks/useAuthUser";

const ResumePage = () => {
  const { data: author, refetch } = useAuthUser();
  const { isPending, isError, error, data } = useResume();
  const isAuthenticated = useCheckAuth();
  const authorData = author[0];

  if (isPending) return <Loader />;
  if (isError) return <div>Error: {error?.message}</div>;

  // Ensure data exists and take the first resume
  const resume: IResume | null = data && data.length > 0 ? data[0] : null;
  if (!resume) return <div>No resume found.</div>;

  return (
    <main>
      <div className="max-w-6xl mx-auto pb-5 md:pb-20 px-4 sm:px-6 lg:px-10">
        {/* Top buttons */}
        <div className="py-6 sm:py-10 gap-4 text-right">
          <button onClick={() => window.print()} className="text-seBlack px-4 py-2 rounded-full border border-seGray/30 shadow-sm hover:bg-seGray/10 transition-colors cursor-pointer w-full sm:w-auto">
            Print Resume
          </button>
        </div>

        {/* Resume card */}
        <div className="py-10 sm:py-16 px-4 sm:px-8 md:px-14 lg:px-24 rounded-lg shadow-lg bg-seWhite print-section">
          <div className="divide-y divide-seGray/20 relative">
            {/* Header */}
            <header className="text-start py-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-seBlack/90">
                {authorData.name}
              </h1>
              <h2 className="text-lg sm:text-xl text-seBlack/90">
                {authorData.proffession}
              </h2>
              <p className="text-seBlack/60 text-sm sm:text-base">
                {authorData.location}
              </p>
            </header>

            {isAuthenticated && (
              <button className="absolute top-3 right-3 bg-seRed p-2 rounded-full shadow cursor-pointer text-white hover:bg-red-700 transition">
                <PenLine size={16} />
              </button>
            )}

            {/* About */}
            <div className="md:pt-6 pt-3 divide-y divide-seWhite/20">
              <p className="text-seBlack font-medium py-6 text-sm sm:text-base">
                {resume.about}
              </p>
            </div>

            {/* Work Experience */}
            {resume.workExperience?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 text-seBlack my-10 gap-6">
                <div>
                  <h1 className="font-semibold text-lg">Work Experience</h1>
                </div>
                <div className="md:col-span-3 space-y-6">
                  {resume.workExperience.map((work, index) => (
                    <div
                      key={index}
                      className={
                        index !== resume.workExperience.length - 1
                          ? "border-b border-slate-300 pb-4"
                          : ""
                      }
                    >
                      {work.link && (
                        <Link
                          className="text-blue-600 font-semibold hover:underline"
                          href={work.link}
                        >
                          {work.company}
                        </Link>
                      )}
                      <h1 className="font-medium">{work.role}</h1>
                      <p className="text-sm sm:text-base">{work.description}</p>
                      <p className="text-gray-400 text-xs mt-2 flex flex-wrap items-center gap-2">
                        <span>{work.period}</span>
                        <span className="text-seGray/30">|</span>
                        <span>{work.location}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resume.education?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 text-seBlack my-10 gap-6">
                <div>
                  <h1 className="font-semibold text-lg">Education</h1>
                </div>
                <div className="md:col-span-3 space-y-4">
                  {resume.education.map((edu, index) => (
                    <div key={index}>
                      {edu.link && (
                        <Link
                          className="text-blue-600 font-semibold hover:underline"
                          href={edu.link}
                        >
                          {edu.institution}
                        </Link>
                      )}
                      <h1 className="font-medium">{edu.degree}</h1>
                      <p className="text-sm sm:text-base">{edu.description}</p>
                      <p className="text-gray-400 text-xs mt-2 flex flex-wrap items-center gap-2">
                        <span>{edu.period}</span>
                        <span className="text-seGray/30">|</span>
                        <span>{edu.location}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {resume.languages?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 text-seBlack my-10 gap-6">
                <div>
                  <h1 className="font-semibold text-lg">Languages</h1>
                </div>
                <div className="md:col-span-3 space-y-3">
                  {resume.languages.map((lang, index) => (
                    <div
                      key={index}
                      className={
                        index !== resume.languages.length - 1
                          ? "border-b border-slate-300 pb-2"
                          : ""
                      }
                    >
                      {lang.language} ({lang.level})
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {resume.skills?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 text-seBlack my-10 gap-6">
                <div>
                  <h1 className="font-semibold text-lg">Skills</h1>
                </div>
                <div className="md:col-span-3 flex flex-wrap gap-2">
                  {resume.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-seGray/10 text-seBlack text-sm sm:text-base px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumePage;
