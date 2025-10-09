import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-row gap-4">
            <div
                className="w-12 h-12 rounded-full animate-spin shadow-md"
            >
{/*  border-y border-solid border-cyan-500 border-t-transparent */}
            </div>
        </div>
    );
};

export default Loader;