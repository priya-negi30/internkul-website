"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Award, Plus, RotateCcw, Search, ShieldOff, Trash2, X } from "lucide-react";
import { AdminPageHeading, AdminPanel } from "@/components/admin/AdminUI";
import { Pagination } from "@/components/admin/Pagination";
import { useCourses } from "@/context/CourseContext";
import {
  adminCreateCredential,
  adminDeleteCredential,
  adminGetCredentials,
  adminUpdateCredential,
} from "@/lib/api/admin";
import type { CredentialRecord, CohortDuration } from "@/types";

const inputClass =
  "w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs sm:text-sm text-[#172033] outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft";
const labelClass = "block text-xs font-semibold text-[#172033] mb-1";

const DURATION_DAYS: Record<string, number> = { "1D": 1, "10D": 10, "20D": 20, "30D": 30, "45D": 45 };

const blank = {
  studentName: "",
  degree: "",
  collegeName: "",
  trackSlug: "",
  duration: "45D",
  issueDate: new Date().toISOString().slice(0, 10),
  githubUrl: "",
  liveDeploymentUrl: "",
  capstoneTitle: "",
  skills: "",
  codeQuality: 0,
  milestoneSprints: 0,
  technicalInterview: 0,
  lorQualified: false,
  ppoQualified: false,
  verifiedBy: "",
};

export default function CredentialsPage() {
  const { courses } = useCourses();
  const [rows, setRows] = useState<CredentialRecord[]>([]);
  const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, perPage: 20, total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...blank });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminGetCredentials({ page, search: query, status });
      setRows(res.data);
      setMeta(res.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load credentials.");
    } finally {
      setLoading(false);
    }
  }, [page, query, status]);

  useEffect(() => {
    void load();
  }, [load]);

  async function create(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const created = await adminCreateCredential({
        studentName: form.studentName.trim(),
        degree: form.degree.trim() || undefined,
        collegeName: form.collegeName.trim() || undefined,
        trackSlug: form.trackSlug || undefined,
        duration: form.duration as CohortDuration,
        durationDays: DURATION_DAYS[form.duration],
        issueDate: form.issueDate || undefined,
        githubUrl: form.githubUrl.trim() || undefined,
        liveDeploymentUrl: form.liveDeploymentUrl.trim() || undefined,
        capstoneTitle: form.capstoneTitle.trim() || undefined,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        lorQualified: form.lorQualified,
        ppoQualified: form.ppoQualified,
        verifiedBy: form.verifiedBy.trim() || undefined,
        scoreBreakdown: {
          codeQuality: Number(form.codeQuality),
          milestoneSprints: Number(form.milestoneSprints),
          technicalInterview: Number(form.technicalInterview),
          totalScore: 0, // calculated by the API
        },
      });
      setNotice(`Credential ${created.id} issued.`);
      setForm({ ...blank });
      setShowForm(false);
      setPage(1);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to issue credential.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleRevoke(c: CredentialRecord) {
    const next = c.verificationStatus === "REVOKED" ? "VERIFIED" : "REVOKED";
    if (next === "REVOKED" && !window.confirm(`Revoke credential ${c.id}? Verification will show it as revoked.`)) return;
    try {
      const saved = await adminUpdateCredential(c.id, { verificationStatus: next });
      setRows((cur) => cur.map((r) => (r.id === c.id ? saved : r)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update credential.");
    }
  }

  async function remove(c: CredentialRecord) {
    if (!window.confirm(`Permanently delete credential ${c.id}? Verification links will stop working.`)) return;
    try {
      await adminDeleteCredential(c.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete credential.");
    }
  }

  const set = <K extends keyof typeof blank>(k: K, v: (typeof blank)[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <AdminPageHeading
        eyebrow="Verification"
        title="Credentials"
        description="Issue, revoke, and manage the certificates that students and employers verify on the public /verify page."
        action={
          <button
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#3157D5] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#193B8F] shadow-sm cursor-pointer"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{showForm ? "Close form" : "Issue credential"}</span>
          </button>
        }
      />

      {notice && <div role="status" className="mb-5 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3 text-xs font-semibold text-[#0F9F6E]">{notice}</div>}
      {error && <div role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">{error}</div>}

      {showForm && (
        <AdminPanel className="p-5 sm:p-6 mb-6">
          <form onSubmit={create} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Student name *</label>
              <input required className={inputClass} value={form.studentName} onChange={(e) => set("studentName", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Degree</label>
              <input className={inputClass} value={form.degree} onChange={(e) => set("degree", e.target.value)} placeholder="B.Tech CSE" />
            </div>
            <div>
              <label className={labelClass}>College</label>
              <input className={inputClass} value={form.collegeName} onChange={(e) => set("collegeName", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Course track</label>
              <select className={inputClass} value={form.trackSlug} onChange={(e) => set("trackSlug", e.target.value)}>
                <option value="">— none —</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Duration</label>
              <select className={inputClass} value={form.duration} onChange={(e) => set("duration", e.target.value)}>
                {Object.keys(DURATION_DAYS).map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Issue date</label>
              <input type="date" className={inputClass} value={form.issueDate} onChange={(e) => set("issueDate", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>GitHub URL</label>
              <input type="url" className={inputClass} value={form.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} placeholder="https://github.com/…" />
            </div>
            <div>
              <label className={labelClass}>Live deployment URL</label>
              <input type="url" className={inputClass} value={form.liveDeploymentUrl} onChange={(e) => set("liveDeploymentUrl", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Capstone title</label>
              <input className={inputClass} value={form.capstoneTitle} onChange={(e) => set("capstoneTitle", e.target.value)} />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className={labelClass}>Skills (comma separated)</label>
              <input className={inputClass} value={form.skills} onChange={(e) => set("skills", e.target.value)} placeholder="React, Node.js, MongoDB" />
            </div>
            <div>
              <label className={labelClass}>Code quality (0–40)</label>
              <input type="number" min={0} max={40} className={inputClass} value={form.codeQuality} onChange={(e) => set("codeQuality", Number(e.target.value))} />
            </div>
            <div>
              <label className={labelClass}>Milestone sprints (0–30)</label>
              <input type="number" min={0} max={30} className={inputClass} value={form.milestoneSprints} onChange={(e) => set("milestoneSprints", Number(e.target.value))} />
            </div>
            <div>
              <label className={labelClass}>Technical interview (0–30)</label>
              <input type="number" min={0} max={30} className={inputClass} value={form.technicalInterview} onChange={(e) => set("technicalInterview", Number(e.target.value))} />
            </div>
            <div>
              <label className={labelClass}>Verified by</label>
              <input className={inputClass} value={form.verifiedBy} onChange={(e) => set("verifiedBy", e.target.value)} />
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#172033] mt-6">
              <input type="checkbox" checked={form.lorQualified} onChange={(e) => set("lorQualified", e.target.checked)} /> LOR qualified
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#172033] mt-6">
              <input type="checkbox" checked={form.ppoQualified} onChange={(e) => set("ppoQualified", e.target.checked)} /> PPO qualified
            </label>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
              <button
                disabled={saving}
                className="rounded-xl bg-[#3157D5] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#193B8F] disabled:opacity-60 cursor-pointer"
              >
                {saving ? "Issuing…" : "Issue credential"}
              </button>
            </div>
          </form>
        </AdminPanel>
      )}

      <AdminPanel>
        <form
          className="p-4 sm:p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]/50 flex flex-col sm:flex-row gap-3"
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
              placeholder="Search name, college or credential ID…"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 pl-10 pr-3 text-xs sm:text-sm outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft"
            />
          </div>
          <select className={inputClass + " sm:max-w-[10rem]"} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All statuses</option>
            <option value="verified">Verified</option>
            <option value="revoked">Revoked</option>
          </select>
          <button className="rounded-xl bg-[#3157D5] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#193B8F] cursor-pointer">Search</button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#F8FAFC] text-[11px] font-mono uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-5 py-4">Credential</th>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Track</th>
                <th className="px-5 py-4">Score</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {rows.map((c) => (
                <tr key={c.id} className="hover:bg-[#F8FAFC]/80">
                  <td className="px-5 py-4 font-mono font-semibold text-[#172033]">{c.id}</td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-[#172033]">{c.studentName}</div>
                    <div className="text-[#64748B]">{c.collegeName}</div>
                  </td>
                  <td className="px-5 py-4 text-[#475569]">{c.trackName || c.trackSlug || "—"} · {c.duration}</td>
                  <td className="px-5 py-4 text-[#475569]">{c.scoreBreakdown.totalScore}/100</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${
                        c.verificationStatus === "VERIFIED"
                          ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#0F9F6E]"
                          : "bg-rose-50 border-rose-200 text-rose-700"
                      }`}
                    >
                      {c.verificationStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleRevoke(c)}
                        title={c.verificationStatus === "REVOKED" ? "Restore" : "Revoke"}
                        className="rounded-xl border border-[#E2E8F0] bg-white p-2 text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC] cursor-pointer"
                      >
                        {c.verificationStatus === "REVOKED" ? <RotateCcw className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => remove(c)}
                        title="Delete"
                        className="rounded-xl border border-[#E2E8F0] bg-white p-2 text-[#64748B] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && rows.length === 0 && (
            <div className="p-12 text-center">
              <Award className="w-8 h-8 mx-auto text-[#94A3B8] mb-3" />
              <p className="font-semibold text-sm text-[#172033]">No credentials yet</p>
            </div>
          )}
          {loading && <p className="p-8 text-center text-xs text-[#64748B]">Loading…</p>}
        </div>
        <Pagination page={meta.currentPage} lastPage={meta.lastPage} total={meta.total} onChange={setPage} />
      </AdminPanel>
    </>
  );
}
