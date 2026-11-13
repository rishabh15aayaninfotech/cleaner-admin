import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../lib/api";
export default function EmployeesListPage() {
  const navigate = useNavigate(),
    adminId = JSON.parse(localStorage.getItem("user") || "{}")._id;
  const [rows, setRows] = useState([]),
    [page, setPage] = useState(1),
    [pages, setPages] = useState(1),
    [search, setSearch] = useState(""),
    [working, setWorking] = useState("All"),
    [status, setStatus] = useState("All"),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getAllEmployees(adminId, page, 10, {
      search: search.trim(),
      workingStatus: working,
      employeeStatus: status,
    })
      .then((r) => {
        setRows(r?.data || []);
        setPages(r?.pagination?.totalPages || 1);
      })
      .catch(() => {
        setRows([]);
        setPages(1);
      })
      .finally(() => setLoading(false));
  }, [adminId, page, search, working, status]);
  const items =
    pages <= 7
      ? Array.from({ length: pages }, (_, i) => i + 1)
      : page <= 4
        ? [1, 2, 3, 4, 5, "…", pages]
        : page >= pages - 3
          ? [1, "…", pages - 4, pages - 3, pages - 2, pages - 1, pages]
          : [1, "…", page - 1, page, page + 1, "…", pages];
  const reset = () => {
    setSearch("");
    setWorking("All");
    setStatus("All");
    setPage(1);
  };
  useEffect(() => {
    const filters = document.querySelector(".employee-api-page .api-filters");
    if (!filters || filters.querySelector(".employee-filter-actions")) return;
    const actions = document.createElement("div");
    actions.className = "employee-filter-actions";
    [
      ["bi-briefcase", "Manage Job Titles", () => {}],
      ["bi-shield-check", "Manage Roles", () => {}],
      ["bi-clock-history", "Time Card", () => {}],
      ["bi-person-plus", "Add Employee", () => {}],
    ].forEach(([icon, label, handler]) => {
      const button = document.createElement("button");
      button.innerHTML = `<i class="bi ${icon}"></i> ${label}`;
      button.onclick = handler;
      actions.appendChild(button);
    });
    filters.appendChild(actions);
  }, []);
  return (
    <div className="all-events-page employee-api-page">
      <div className="employee-page-banner">
        <div>
          <small>
            <i className="bi bi-house" /> Home <b>›</b> User Management <b>›</b>{" "}
            Employees
          </small>
          <h2>
            <i className="bi bi-people" /> Employees Data
          </h2>
        </div>
        <strong>
          <span>{rows.length}</span>
          <small>EMPLOYEES ON PAGE</small>
        </strong>
      </div>
      <div className="employee-filters api-filters">
        <input
          placeholder="Search Employees"
          aria-label="Search Employees"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <label>
          Working Status:
          <select
            value={working}
            onChange={(e) => {
              setWorking(e.target.value);
              setPage(1);
            }}
          >
            <option>All</option>
            <option>Working</option>
            <option>On Break</option>
            <option>Traveling</option>
            <option>Unavailable</option>
            <option>Day Off</option>
          </select>
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option>All</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>
        </label>
        <button className="filter-clear" onClick={reset}>
          <i className="bi bi-x-lg" /> Clear
        </button>
      </div>
      <section className="panel reference-table-card">
        <div className="table-responsive">
          <table className="reference-table">
            <thead>
              <tr>
                <th>SRL NO.</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE NUMBER</th>
                <th>WORKING STATUS</th>
                <th>EMPLOYMENT STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="table-state">
                    Loading employees...
                  </td>
                </tr>
              ) : rows.length ? (
                rows.map((e, i) => (
                  <tr key={e._id}>
                    <td>{(page - 1) * 10 + i + 1}</td>
                    <td className="event-title-link">
                      {e.employee_name || "Unnamed"}
                    </td>
                    <td>{e.employee_email || "—"}</td>
                    <td>{e.employee_contact || "—"}</td>
                    <td>
                      <span className="pill-status working">
                        {e.employee_workingStatus || "—"}
                      </span>
                    </td>
                    <td>
                      <span className="pill-status active-status">
                        {e.employee_employeeStatus || "—"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="row-view-action"
                        aria-label="View employee"
                        onClick={() => navigate(`/employee-details/${e._id}`)}
                      >
                        <i className="bi bi-eye" />
                      </button>
                      <button
                        className="row-action"
                        aria-label="Delete employee"
                      >
                        <i className="bi bi-trash3" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="table-state">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="numbered-pagination">
          <button
            className="page-arrow"
            disabled={page === 1}
            onClick={() => setPage((v) => Math.max(1, v - 1))}
          >
            ‹
          </button>
          {items.map((item, i) =>
            item === "…" ? (
              <span className="page-ellipsis" key={`e${i}`}>
                …
              </span>
            ) : (
              <button
                className={`page-number ${page === item ? "active" : ""}`}
                key={item}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            ),
          )}
          <button
            className="page-arrow"
            disabled={page === pages}
            onClick={() => setPage((v) => Math.min(pages, v + 1))}
          >
            ›
          </button>
        </div>
      </section>
    </div>
  );
}
