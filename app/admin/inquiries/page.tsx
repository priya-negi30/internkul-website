"use client";

import { useCallback, useEffect, useState } from "react";
import { Inbox, Search, Trash2 } from "lucide-react";
import { AdminPageHeading, AdminPanel } from "@/components/admin/AdminUI";
import { Pagination } from "@/components/admin/Pagination";
import { adminDeleteInquiry, adminGetInquiries, adminUpdateInquiry } from "@/lib/api/admin";
import type { AdminInquiry } from "@/lib/api/types";

const selectClass =
  "rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs sm:text-sm text-[#172033] outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft";

const statusStyle: Record<AdminInquiry["status"], string> = {
  new: "bg-blue-50 border-blue-200 text-blue-700",
  contacted: "bg-amber-50 border-amber-200 text-amber-700",
  closed: "bg-[#ECFDF5] border-[#A7F3D0] text-[#0F9F6E]",
};

export default function InquiriesPage() {
  const [rows, setRows] = useState<AdminInquiry[]>([]);
  const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, perPage: 20, total: 0 });
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminGetInquiries({ page, type, status, search: query });
      setRows(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load inquiries.");
    } finally {
      setLoading(false);
    }
  }, [page, type, status, query]);

  useEffect(() => {
    void load();
  }, [load]);

  async function changeStatus(row: AdminInquiry, next: AdminInquiry["status"]) {
    try {
      const saved = await adminUpdateInquiry(row.id, { status: next });
      setRows((cur) => cur.map((r) => (r.id === row.id ? saved : r)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update inquiry.");
    }
  }

  async function saveNotes(row: AdminInquiry, notes: string) {
    try {
      const saved = await adminUpdateInquiry(row.id, { adminNotes: notes });
      setRows((cur) => cur.map((r) => (r.id === row.id ? saved : r)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save notes.");
    }
  }

  async function remove(row: AdminInquiry) {
    if (!window.confirm(`Delete the inquiry from “${row.name}”?`)) return;
    try {
      await adminDeleteInquiry(row.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete inquiry.");
    }
  }

  return (
    <>
      <AdminPageHeading
        eyebrow="Leads"
        title="Inquiries"
        description="Contact-form and college/institution inquiries submitted from the website."
      />

      <AdminPanel>
        <form
          className="p-4 sm:p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]/50 flex flex-col lg:flex-row gap-3"
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
              placeholder="Search name, email or institution…"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 pl-10 pr-3 text-xs sm:text-sm outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft"
            />
          </div>
          <select className={selectClass} value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
            <option value="">All types</option>
            <option value="contact">Contact</option>
            <option value="college">College</option>
          </select>
          <select className={selectClass} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
          <button className="rounded-xl bg-[#3157D5] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#193B8F] cursor-pointer">
            Search
          </button>
        </form>

        {error && <p role="alert" className="m-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">{error}</p>}

        <div className="divide-y divide-[#E2E8F0]">
          {rows.map((r) => (
            <div key={r.id} className="p-4 sm:p-5">
              <div className="flex flex-col lg:flex-row lg:items-start gap-3">
                <button type="button" className="flex-1 min-w-0 text-left cursor-pointer" onClick={() => setOpen(open === r.id ? null : r.id)}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-[#172033]">{r.name}</span>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md bg-[#EEF4FF] border border-[#D8E5FF] text-[#193B8F]">
                      {r.type}
                    </span>
                    <span className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md border ${statusStyle[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1">
                    {r.email}
                    {r.phone ? ` · ${r.phone}` : ""}
                    {r.institutionName ? ` · ${r.institutionName}` : ""}
                  </p>
                  <p className="text-xs text-[#475569] mt-1">
                    {r.interestedCourse || "—"} · {new Date(r.createdAt).toLocaleString("en-IN")}
                  </p>
                </button>
                <div className="flex items-center gap-2">
                  <select className={selectClass} value={r.status} onChange={(e) => changeStatus(r, e.target.value as AdminInquiry["status"])}>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button
                    onClick={() => remove(r)}
                    title="Delete inquiry"
                    className="rounded-xl border border-[#E2E8F0] bg-white p-2 text-[#64748B] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {open === r.id && (
                <div className="mt-4 rounded-xl border border-[#D8E5FF] bg-[#EEF4FF]/30 p-4 text-xs text-[#475569] space-y-2">
                  {r.message && <p><strong className="text-[#172033]">Message:</strong> {r.message}</p>}
                  {r.type === "college" && (
                    <p>
                      <strong className="text-[#172033]">College details:</strong> {r.designation} · {r.numberOfStudents} students ·{" "}
                      {r.preferredDuration} · {r.preferredTrainingWindow}
                    </p>
                  )}
                  {r.enquiryCategory && <p><strong className="text-[#172033]">Category:</strong> {r.enquiryCategory}</p>}
                  <label className="block">
                    <span className="font-semibold text-[#172033]">Internal notes</span>
                    <textarea
                      defaultValue={r.adminNotes || ""}
                      rows={2}
                      onBlur={(e) => e.target.value !== (r.adminNotes || "") && saveNotes(r, e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-xs outline-none focus:border-[#3157D5]"
                      placeholder="Notes are saved when you click outside the box"
                    />
                  </label>
                </div>
              )}
            </div>
          ))}
          {!loading && rows.length === 0 && !error && (
            <div className="p-12 text-center">
              <Inbox className="w-8 h-8 mx-auto text-[#94A3B8] mb-3" />
              <p className="font-semibold text-sm text-[#172033]">No inquiries found</p>
            </div>
          )}
          {loading && <p className="p-8 text-center text-xs text-[#64748B]">Loading…</p>}
        </div>
        <Pagination page={meta.currentPage} lastPage={meta.lastPage} total={meta.total} onChange={setPage} />
      </AdminPanel>
    </>
  );
}
