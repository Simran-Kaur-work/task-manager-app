import React, { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import { IoMdArrowDropdown } from "react-icons/io";
import IMAGE from "../../../../../../Assets/Images/option.png";
import { BiLoader } from "react-icons/bi";
import { IoPeopleSharp, IoCalendarOutline } from "react-icons/io5";
import Rocket from "../../../../../../Assets/Icons/rocket.png";
import DropDown from "../DropDowns/DropDown";
import { TableContext } from "../../../../../../Context/Context";

const Table = ({ searchTerm }) => {
  const { tasks, addTask, updateTask, deleteTask } = useContext(TableContext);

  const [isInputBoxVisible, setIsInputBoxVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [filter, setFilter] = useState({ status: "", assign: "", due: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e) => {
    setCurrentTask((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleAssignChange = (e) => {
    setCurrentTask((prev) => ({ ...prev, assign: e.target.value }));
  };

  const openInputBox = (task = null) => {
    setIsEditing(task !== null);
    setCurrentTask(
      task || {
        id: tasks.length + 1,
        name: "",
        status: "",
        assign: "",
        due: "",
      }
    );
    setIsInputBoxVisible(true);
  };

  const closeInputBox = () => {
    setIsInputBoxVisible(false);
    setCurrentTask(null);
  };

  const saveTask = () => {
    if (isEditing) {
      updateTask(currentTask);
    } else {
      addTask(currentTask);
    }
    closeInputBox();
  };

  const confirmDeleteTask = (task) => {
    setIsConfirmationVisible(true);
    setTaskToDelete(task);
  };

  const deleteSelectedTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setIsConfirmationVisible(false);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsConfirmationVisible(false);
    setTaskToDelete(null);
  };

  const statusOptions = ["Not Started", "In Progress", "Done", "On Hold"];
  const assignOptions = ["Manager", "Developer", "Employees", "EndUser"];

  const handleFilterChange = (type, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value,
    }));
  };

  const clearFilters = () => {
    setFilter({ status: "", assign: "", due: "" });
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filter.status === "" || task.status === filter.status) &&
      (filter.assign === "" || task.assign === filter.assign) &&
      (filter.due === "" || task.due === filter.due) &&
      (searchTerm === "" ||
        task.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div>
      <DropDown onSelect={handleFilterChange} filter={filter} />
      <div className="container mx-auto p-4">
        <div className="py-4 flex gap-3 items-center">
          <div>
            <IoMdArrowDropdown className="h-8 w-8" />
          </div>
          <div className="flex items-center gap-1">
            <img src={Rocket} alt="Rocket Icon" className="h-6 w-6" />
            <p className="font-semibold text-xl">Help Center Revamp</p>
          </div>
          <div className="font-semibold text-xl text-slate-400">
            {filteredTasks.length}
          </div>
          <div>
            <img src={IMAGE} alt="Options" />
          </div>
        </div>

        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-slate-400 border border-gray-300 bg-gray-100">
                Task Name
              </th>
              <th className="py-2 px-4 border-b text-slate-400 border border-gray-300 bg-gray-100">
                <div className="flex items-center gap-1">
                  <BiLoader />
                  Status
                </div>
              </th>
              <th className="py-2 px-4 border-b text-slate-400 border border-gray-300 bg-gray-100">
                <div className="flex items-center gap-1">
                  <IoPeopleSharp />
                  Assign
                </div>
              </th>
              <th className="py-2 px-4 border-b text-slate-400 border border-gray-300 bg-gray-100">
                <div className="flex items-center gap-1">
                  <IoCalendarOutline />
                  Due Date
                </div>
              </th>
              <th className="py-2 px-4 border-b text-slate-400 border border-gray-300 bg-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length ? (
              filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {task.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {task.status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {task.assign}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {task.due}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <div className="flex gap-2">
                      <LuFileEdit
                        className="cursor-pointer bg-green-500 text-white h-6 w-6 p-1 rounded"
                        onClick={() => openInputBox(task)}
                      />
                      <MdDeleteForever
                        className="cursor-pointer bg-red-500 text-white rounded h-6 w-6 p-1"
                        onClick={() => confirmDeleteTask(task)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Clear Filters Button */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => openInputBox()}
          >
            Add New Task
          </button>
        </div>

        {isInputBoxVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                {isEditing ? "Edit Task" : "Add New Task"}
              </h3>
              <input
                type="text"
                name="name"
                placeholder="Task Name"
                className="border-2 border-gray-300 p-2 rounded w-full mb-4"
                value={currentTask?.name || ""}
                onChange={handleInputChange}
              />
              <select
                name="status"
                className="border-2 border-gray-300 p-2 rounded w-full mb-4"
                value={currentTask?.status || ""}
                onChange={handleStatusChange}
              >
                <option value="">Select Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <select
                name="assign"
                className="border-2 border-gray-300 p-2 rounded w-full mb-4"
                value={currentTask?.assign || ""}
                onChange={handleAssignChange}
              >
                <option value="">Select Assignee </option>
                {assignOptions.map((assign) => (
                  <option key={assign} value={assign}>
                    {assign}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="due"
                className="border-2 border-gray-300 p-2 rounded w-full mb-4"
                value={currentTask?.due || ""}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={saveTask}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={closeInputBox}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isConfirmationVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this task?
              </h3>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={deleteSelectedTask}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={cancelDelete}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
