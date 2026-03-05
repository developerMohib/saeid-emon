
import Author from "./Author";
import Aboutme from "./homepagesection/Aboutme";
import Tabs from "./Tab";

const Homepage = () => {
    return (
        <div className="md:grid md:grid-cols-3">
            <div className="grid-cols-1 w-3/4 mx-auto">
                <Author />
                {/* Hide on mobile, show from md and up */}
                <div className="hidden md:block">
                    <Aboutme />
                </div>
            </div>
            <div className="col-span-2 md:px-0 px-5">
                <Tabs />
            </div>
        </div>
    );
};

export default Homepage;
