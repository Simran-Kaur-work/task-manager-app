

import { useState } from "react";
import { HiMiniTableCells } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import ImageOption from "../../../../../../../../Assets/Images/option.png";
//import { IoIosArrowDown } from "react-icons/io";
import Table from "../../../Tables/Tables";
import ContextProvider from "../../../../../../../../Context/Context";
import ReactSearchBox from "react-search-box";
import Logout from "../../../../../../../Components/Logout";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: 0, title: "By Project", icon: HiMiniTableCells },
    { id: 1, title: "Mine", icon: HiMiniTableCells },
  ];

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const closeSearchBar = () => {
    setIsSearchBarVisible(false);
  };

  const handleSearch = (searchValue) => {
  
    setSearchTerm(searchValue);
  };

  return (
    <ContextProvider>
      <div className="bg-white rounded-lg">
        <div className="flex justify-between items-center px-5 border-b border-slate-300">
          <div className="flex items-center space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center px-4 py-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-gray-900 font-semibold border-b-2 border-black"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="text-xl mr-2" />
                {tab.title}
              </button>
            ))}
            <p className="text-gray-500 font-medium">3 more...</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-500 flex items-center space-x-1 hover:text-gray-700">
              <span>Filter</span>
            </button>
            <button className="text-gray-500 flex items-center space-x-1 hover:text-gray-700">
              <span>Sort</span>
            </button>
            <button
              className="text-gray-500 p-2 hover:text-gray-700"
              onClick={toggleSearchBar}
            >
              <IoSearch className="text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <img src={ImageOption} alt="Options" className="w-6 h-6" />
              
            </button>
            

            <Logout/>
          </div>
        </div>

        <div className="p-5">
          {isSearchBarVisible && (
            <div className="relative pb-3">
              <ReactSearchBox
                placeholder="Search Task"
                className="w-full p-2 border border-gray-300 rounded-md pr-10"
                onChange={(e)=>{handleSearch(e)}}
                
              />
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                onClick={closeSearchBar}
              >
                <IoIosClose className="text-2xl" />
              </button>
            </div>
          )}

          {activeTab === 0 && (
            <div>
              <Table searchTerm={searchTerm}   />
            </div>
          )}
          {activeTab === 1 && <Table searchTerm={searchTerm} />}
        </div>
      </div>
    </ContextProvider>
  );
};

export default Tab;
