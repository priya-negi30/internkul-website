"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Trash2, Users } from "lucide-react";
import { AdminPageHeading, AdminPanel } from "@/components/admin/AdminUI";
import { Pagination } from "@/components/admin/Pagination";
import { adminDeleteStudent, adminGetStudents } from "@/lib/api/admin";
import type { AdminStudent } from "@/lib/api/types";

export default function StudentsPage() {
  const [rows, setRows] = useState<AdminStudent[]>([]);
  const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, perPage: 20, total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminGetStudents({ page, search: query });
      setRows(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load students.");
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(student: AdminStudent) {
    if (!window.confirm(`Delete student “${student.fullName}”? This cannot be undone.`)) return;
    try {
      await adminDeleteStudent(student.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete student.");
    }
  }

  return (
    <>
      <AdminPageHeading
        eyebrow="People"
        title="Students"
        description="Learners who registered through the website. Registrations are stored in the Internkul API."
      />

      <AdminPanel>
        <form
          className="p-4 sm:p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]/50 flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setQuery(search.trim());
          }}
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or student ID…"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 pl-10 pr-3 text-xs sm:text-sm outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft"
            />
          </div>
          <button className="rounded-xl bg-[#3157D5] px-4 text-xs sm:text-sm font-semibold text-white hover:bg-[#193B8F] cursor-pointer">
            Search
          </button>
        </form>

        {error && <p role="alert" className="m-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#F8FAFC] text-[11px] font-mono uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Interested course</th>
                <th className="px-5 py-4">Registered</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {rows.map((s) => (
                <tr key={s.id} className="hover:bg-[#F8FAFC]/80">
                  <td className="px-5 py-4">
                    <div className="font-bold text-[#172033]">{s.fullName}</div>
                    <div className="text-[11px] font-mono text-[#64748B] mt-0.5">{s.id}</div>
                  </td>
                  <td className="px-5 py-4 text-[#475569]">
                    <div>{s.email}</div>
                    <div className="text-[#64748B]">{s.countryCode} {s.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-[#475569]">
                    {s.interestedCourseName || "—"}
                    {s.interestedTopics.length > 0 && (
                      <div className="text-[11px] text-[#64748B] mt-0.5">{s.interestedTopics.slice(0, 3).join(", ")}</div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-[#64748B]">{new Date(s.registeredAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => remove(s)}
                      title="Delete student"
                      className="rounded-xl border border-[#E2E8F0] bg-white p-2 text-[#64748B] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && rows.length === 0 && !error && (
            <div className="p-12 text-center">
              <Users className="w-8 h-8 mx-auto text-[#94A3B8] mb-3" />
              <p className="font-semibold text-sm text-[#172033]">No students found</p>
            </div>
          )}
          {loading && <p className="p-8 text-center text-xs text-[#64748B]">Loading…</p>}
        </div>
        <Pagination page={meta.currentPage} lastPage={meta.lastPage} total={meta.total} onChange={setPage} />
      </AdminPanel>
    </>
  );
}
