import { useRef } from "react";
import { GridIcon } from "../../../assets"
import SideMenu from "../../SideMenu"

const Home = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // Handle the file upload
            console.log(files);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <SideMenu>
            {/* NavBar searchbar and account icon*/}

            {/* header*/}
            <div className="px-9 pt-6">
                <div className="pb-4 flex justify-between items-center">
                    {/* Title */}
                    <h1 className="text-[22px] font-semibold">All files</h1>

                    {/* Buttons */}
                    <div className="flex gap-4 ">
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <button
                                onClick={handleButtonClick}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                <span className="flex flex-row gap-2 items-center justify-center">
                                    <GridIcon />
                                    Upload
                                </span>
                            </button>
                        </div>
                        <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                            <span className="flex flex-row gap-2 items-center justify-center">
                                <GridIcon />New folder
                            </span>

                        </button>
                    </div>
                </div>

                {/* hover buttons and toggle view */}
                <div className="text-center text-sm flex justify-between items-center">
                    <div className="flex gap-3">
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Share</button>
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Copy link</button>
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Download</button>
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Move</button>
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Delete</button>
                        <button className="rotate-90">• • •</button>
                    </div>
                    <div className="flex gap-3 items-center justify-center">
                        <h2 className="font-medium text-center">1 selected</h2>
                        <button className="">
                            <GridIcon />
                        </button>
                        <button className="">
                            <GridIcon />
                        </button>
                    </div>
                </div>
            </div>
        </SideMenu>

    )
}

export default Home