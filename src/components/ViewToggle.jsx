const ViewToggle = ({ view, setView }) => (
  <div className="flex justify-center gap-4 mt-6">
    <button
      onClick={() => setView("hourly")}
      className="bg-[#1e1e2f] text-[#00ffe0] border border-[#00ffe0] px-4 py-2 rounded-lg shadow-[0_0_10px_#00ffe0] hover:text-[#ff6ec7] transition duration-300"
    >
      🌡️ Hourly
    </button>
    <button
      onClick={() => setView("daily")}
      className="bg-[#1e1e2f] text-[#00ffe0] border border-[#00ffe0] px-4 py-2 rounded-lg shadow-[0_0_10px_#00ffe0] hover:text-[#ff6ec7] transition duration-300"
    >
      📅 6-Day
    </button>
  </div>
);

export default ViewToggle;
