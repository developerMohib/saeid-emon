import Author from "./Author";
import Tabs from "./Tab";

const Homepage = () => {
    return (
        <div className="grid grid-cols-3">
            <div className="grid-cols-1">
                <Author />
            </div>
            <div className="col-span-2">
                <Tabs />
            </div>
        </div>
    );
};

export default Homepage;