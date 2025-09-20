import Tabs from "./Tab";

const Homepage = () => {
    return (
        <div className="grid grid-cols-3">
            <div className="grid-cols-1">
                <h1>User profile and logo and details</h1>
            </div>
            <div className="col-span-2 bg-red-400">
                <Tabs />
            </div>
        </div>
    );
};

export default Homepage;