const ViewToggle = ({ view, setView }) => (
  <div className="flex justify-center gap-4 mt-6">
    <button
      onClick={() => setView("hourly")}
      className={`transition-colors duration-300 px-4 py-2 rounded ${view === "hourly" ? "bg-indigo-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
    >
      🌡️ Hourly
    </button>
    <button
      onClick={() => setView("daily")}
      className={`transition-colors duration-300 px-4 py-2 rounded ${view === "daily" ? "bg-indigo-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
    >
      📅 7-Day
    </button>
  </div>
);

export default ViewToggle;
