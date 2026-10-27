
import { useEffect, useState } from "react";
import {
  RefreshCw,
  CalendarDays,
  Users,
  MapPin,
  Mail,
  UserRound,
  LockKeyhole,
  LogOut,
} from "lucide-react";
import "../App.css";

const API_URL = "https://luxury-travel-3mio.onrender.com";
const TOKEN_KEY = "adminToken";

function AdminDashboard() {
  const [token, setToken] = useState(
    () => sessionStorage.getItem(TOKEN_KEY) || ""
  );
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setLoginError(err.message || "Backend se connect nahi ho raha.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setBookings([]);
    setPassword("");
    setError("");
    setLoginError("");
  };

  const fetchBookings = async () => {
    if (!token) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401 || response.status === 403) {
        handleLogout();
        setLoginError("Session expire ho gaya. Please dobara login karo.");
        return;
      }

      if (!response.ok) {
        throw new Error("Bookings load nahi ho paayin.");
      }

      const data = await response.json();
      setBookings(data);
    } catch {
      setError(
        "Backend se connection nahi ho raha. Check karo ki MongoDB aur backend server running hain."
      );
    } finally {
      setLoading(false);
    }
  };

  
  const updateBookingStatus = async (bookingId, status) => {
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update nahi hua.");
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId ? data.booking : booking
        )
      );
    } catch (err) {
      setError(err.message || "Status update nahi ho saka.");
    }
  };


  useEffect(() => {
    if (token) fetchBookings();
  }, [token]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 18px",
    background: "#1f4d3a",
    color: "#fff",
    border: 0,
    borderRadius: "8px",
    cursor: "pointer",
  };

  if (!token) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f7f5f0",
          color: "#172b25",
          display: "grid",
          placeItems: "center",
          padding: "24px",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            width: "100%",
            maxWidth: "420px",
            boxSizing: "border-box",
            background: "#fff",
            padding: "32px",
            borderRadius: "16px",
            border: "1px solid #e8e3d8",
            boxShadow: "0 12px 40px rgba(23, 43, 37, 0.08)",
          }}
        >
          <LockKeyhole size={32} color="#a47c35" />

          <p
            style={{
              color: "#a47c35",
              letterSpacing: "3px",
              fontSize: "12px",
              fontWeight: "700",
              marginTop: "20px",
            }}
          >
            LUXURY TRAVEL
          </p>

          <h1 style={{ fontSize: "30px", margin: "8px 0" }}>
            Admin Login
          </h1>

          <p style={{ color: "#68736e", marginBottom: "26px" }}>
            Login to manage customer bookings.
          </p>

          <label
            htmlFor="admin-username"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Username
          </label>

          <input
            id="admin-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginBottom: "18px",
              border: "1px solid #d9d5ca",
              borderRadius: "8px",
            }}
          />

          <label
            htmlFor="admin-password"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Password
          </label>

          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginBottom: "18px",
              border: "1px solid #d9d5ca",
              borderRadius: "8px",
            }}
          />

          {loginError && (
            <p role="alert" style={{ color: "#b42318" }}>
              {loginError}
            </p>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            style={{ ...buttonStyle, width: "100%" }}
          >
            {loginLoading ? "Logging in..." : "Login Securely"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f5f0",
        color: "#172b25",
        padding: "32px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div>
            <p
              style={{
                color: "#a47c35",
                letterSpacing: "3px",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              LUXURY TRAVEL
            </p>

            <h1 style={{ fontSize: "clamp(28px, 4vw, 38px)", margin: "8px 0" }}>
              Admin Dashboard
            </h1>

            <p style={{ color: "#68736e", margin: 0 }}>
              Manage and review customer booking requests
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={fetchBookings}
              disabled={loading}
              style={buttonStyle}
            >
              <RefreshCw size={17} />
              {loading ? "Loading..." : "Refresh Bookings"}
            </button>

            <button
              onClick={handleLogout}
              style={{ ...buttonStyle, background: "#6b3b2a" }}
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        <section
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "14px",
            border: "1px solid #e8e3d8",
            marginBottom: "28px",
          }}
        >
          <p style={{ color: "#68736e", margin: "0 0 8px" }}>
            Total Bookings
          </p>
          <h2 style={{ fontSize: "36px", margin: 0 }}>
            {loading ? "—" : bookings.length}
          </h2>
        </section>

        <section
          style={{
            background: "#fff",
            border: "1px solid #e8e3d8",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "22px 24px", borderBottom: "1px solid #eee9df" }}>
            <h2 style={{ margin: 0, fontSize: "21px" }}>All Bookings</h2>
          </div>

          {loading ? (
            <p style={{ padding: "24px" }}>Bookings load ho rahi hain...</p>
          ) : error ? (
            <div style={{ padding: "24px", color: "#b42318" }}>
              <p>{error}</p>
              <button onClick={fetchBookings}>Try Again</button>
            </div>
          ) : bookings.length === 0 ? (
            <p style={{ padding: "24px" }}>Abhi koi booking nahi mili.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: "850px",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead style={{ background: "#f7f5f0" }}>
                  <tr>
                    {["Customer", "Destination", "Travel Date", "Guests", "Booking Date", "Status"].map(
                      (heading) => (
                        <th
                          key={heading}
                          style={{
                            padding: "16px",
                            fontSize: "13px",
                            color: "#53635b",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      style={{ borderTop: "1px solid #eee9df" }}
                    >
                      <td style={{ padding: "16px" }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <UserRound size={17} color="#a47c35" />
                          <span>{booking.name}</span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                            color: "#68736e",
                            marginTop: "7px",
                            fontSize: "13px",
                          }}
                        >
                          <Mail size={14} />
                          {booking.email}
                        </div>
                      </td>

                      <td style={{ padding: "16px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <MapPin size={16} color="#a47c35" />
                          {booking.destination}
                        </span>
                      </td>

                      <td style={{ padding: "16px", whiteSpace: "nowrap" }}>
                        <CalendarDays
                          size={15}
                          style={{ display: "inline", marginRight: "7px" }}
                        />
                        {formatDate(booking.travelDate)}
                      </td>

                      <td style={{ padding: "16px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <Users size={16} />
                          {booking.guests}
                        </span>
                      </td>

                      <td style={{ padding: "16px", whiteSpace: "nowrap" }}>
                        {formatDate(booking.createdAt)}
                      </td>

                      
<td style={{ padding: "16px" }}>
  <select
    value={booking.status || "Pending"}
    onChange={(event) =>
      updateBookingStatus(booking._id, event.target.value)
    }
    style={{
      padding: "8px 10px",
      borderRadius: "8px",
      border: "1px solid #d9d5ca",
      background: "#fff",
      color: "#172b25",
      cursor: "pointer",
    }}
  >
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;

