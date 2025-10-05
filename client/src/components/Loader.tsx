import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-row gap-4">
            <div
                className="w-12 h-12 rounded-full animate-spin border-y border-solid border-cyan-500 border-t-transparent shadow-md"
            >

            </div>
        </div>
    );
};

export default Loader;