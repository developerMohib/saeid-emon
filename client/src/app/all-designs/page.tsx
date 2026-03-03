
import React, { Suspense } from "react";
import type { Metadata } from "next";
import Loader from "@/components/Loader";
import Alldesigns from "@/components/Alldesigns";

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
        <Suspense fallback={<Loader />}>
            <section aria-label="Works Gallery" >
                <Alldesigns />
            </section>
        </Suspense>
    );
};

export default Works;