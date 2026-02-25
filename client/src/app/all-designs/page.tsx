
import React from "react";
import type { Metadata } from "next";
import Works2 from "@/components/Works2";

export const metadata: Metadata = {
    title: "Contact | Work with Saeid Emon",
    description: "Get in touch with professional graphics designer Saeid Emon for your next creative project or collaboration.",
    openGraph: {
        title: "Contact | Saeid Emon",
        url: "https://www.saeidemon.com/contact",
    },
};

const Works = () => {


    return (

        <section
            aria-label="Works Gallery"
        >
            <Works2 />

        </section>
    );
};

export default Works;