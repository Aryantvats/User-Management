export default function Header({ title }) {
  return (
    <header className="bg-gray-900 text-white py-3 px-6">
      <h1 className="text-center text-sm font-semibold tracking-wide">
        {title}
      </h1>
    </header>
  );
}
