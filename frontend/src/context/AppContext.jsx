import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3080/api/v1";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUser = async () => {
    const { data } = await axios.get("/auth/me");
    if (data?.success) setUser(data.user);
  };

  const fetchProfiles = useCallback(async (pageNumber = 1) => {
    const { data } = await axios.get(
      `/profiles?page=${pageNumber}&limit=8`
    );

    if (data?.success) {
      setProfiles(data.data);
      setPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
    }
  }, []);

  const searchProfiles = async (query) => {
    const { data } = await axios.get(
      `/profiles/search?q=${encodeURIComponent(query)}`
    );
    if (data?.success) {
      setProfiles(data.data);
      setPage(1);
      setTotalPages(1);
    }
  };

  const fetchProfileById = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`/profiles/${id}`);
      if (data?.success) setSelectedProfile(data.data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Session expired");
        logout();
      } else {
        toast.error("Profile not found");
      }
    }
  }, []);

  const login = async (formData) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/auth/login", formData);

      localStorage.setItem("token", data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      setToken(data.token);

      await Promise.all([fetchUser(), fetchProfiles(1)]);

      toast.success("Login successful");
      navigate("/profiles");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/auth/register", formData);

      if (data?.success) {
        toast.success("Signup successful. Please login.");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;

    setUser(null);
    setToken(null);
    setProfiles([]);
    setSelectedProfile(null);

    navigate("/login");
  };

  const exportProfiles = async () => {
    try {
      const res = await axios.get("/profiles/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "profiles.csv");
      document.body.appendChild(link);
      link.click();
    } catch {
      toast.error("Export failed");
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setAuthReady(true);
        return;
      }

      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      setToken(storedToken);

      try {
        await Promise.all([fetchUser(), fetchProfiles(1)]);
      } catch {
        logout();
      } finally {
        setAuthReady(true);
      }
    };

    restoreSession();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        profiles,
        loading,
        selectedProfile,
        authReady,
        page,
        totalPages,

        login,
        signup,
        logout,

        fetchProfiles,
        searchProfiles,
        fetchProfileById,
        exportProfiles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
