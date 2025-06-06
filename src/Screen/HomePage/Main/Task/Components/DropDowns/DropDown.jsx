
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { BiLoader } from "react-icons/bi";
import { IoPeopleSharp, IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const Status = [
  { id: 1, category: "In Progress" },
  { id: 2, category: "Not Started" },
  { id: 3, category: "Done" },
  { id: 4, category: "Hold" },
];

const Assign = [
  { id: 1, Profile: "Manager" },
  { id: 2, Profile: "Developer" },
  { id: 3, Profile: "Employees" },
  { id: 4, Profile: "EndUsers" },
];

const DropDown = ({ onSelect, filter }) => {
  const handleSelect = (type, value) => {
    onSelect(type, value);
  };

  return (
    <div className="flex gap-4 items-center mb-4">
      {[
        {
          icon: <BiLoader />,
          title: filter.status || "Status",
          items: Status,
          type: "status",
        },
        {
          icon: <IoPeopleSharp />,
          title: filter.assign || "Assign",
          items: Assign,
          type: "assign",
        },
        {
          icon: <IoCalendarOutline />,
          title: filter.Due || "Due",
          items: [], 
          type: "due",
        },
      ].map((button, index) => (
        <div className="relative flex flex-row gap-4" key={index}>
          <Menu as="div" className="text-left">
            <MenuButton className="flex gap-x-1.5 items-center rounded-2xl px-2 py-1 text-sm font-semibold text-slate-500 bg-slate-50 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <div className="h-4">{button.icon}</div>
              {button.title}
              <IoIosArrowDown />
            </MenuButton>
            <MenuItems className="absolute z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {button.items.map((item, itemIndex) => (
                  <MenuItem
                    key={itemIndex}
                    onClick={() => handleSelect(button.type, item.category || item.Profile)}
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                    >
                      {item.category || item.Profile}
                    </a>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
