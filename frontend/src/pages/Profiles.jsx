import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import Header from "../components/layout/Header.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import Button from "../components/common/Button.jsx";
import UserTable from "../components/table/UserTable.jsx";
import Pagination from "../components/common/Pagination.jsx";

export default function Profiles() {
  const navigate = useNavigate();

  const {
    profiles,
    fetchProfiles,
    searchProfiles,
    exportProfiles,
    authReady,
    page,
    totalPages,
  } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (authReady) {
      fetchProfiles(1);
    }
  }, [authReady, fetchProfiles]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      fetchProfiles(1);
      return;
    }
    searchProfiles(searchQuery);
  };

  const handlePageChange = (newPage) => {
    fetchProfiles(newPage);
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="MERN stack developer practical task" />
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="MERN stack developer practical task" />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <section className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              label="+ Add User"
              onClick={() => navigate("/profiles/add")}
            />
            <Button
              label="Export To CSV"
              onClick={exportProfiles}
            />
          </div>
        </section>

        <section className="overflow-x-auto">
          <UserTable users={profiles} page={page} limit={8} />

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
