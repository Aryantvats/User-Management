export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="border border-gray-300 px-3 py-1 rounded outline-none focus:ring-2 focus:ring-gray-400"
      />

      <button
        onClick={onSearch}
        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
      >
        Search
      </button>
    </div>
  );
}
