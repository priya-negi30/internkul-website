"use client";

import { useMemo, useState } from "react";
import { Archive, CalendarDays, CheckCircle2, Pencil, Plus, RotateCcw, Save, Trash2, X } from "lucide-react";
import { useCourses, ManagedBatch } from "@/context/CourseContext";
import { AdminPageHeading, AdminPanel } from "@/components/admin/AdminUI";

const inputClass =
  "w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs sm:text-sm text-[#172033] placeholder:text-[#94A3B8] outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] shadow-soft transition-colors";

export default function BatchSchedulerPage() {
  const { courses, cohorts: batches, timings, addBatch, updateBatch, deleteBatch } = useCourses();
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const visible = useMemo(
    () => batches.filter((b) => filter === "all" || b.trackSlug === filter),
    [batches, filter]
  );
  const [draft, setDraft] = useState<Partial<ManagedBatch>>({});

  function begin(batch: ManagedBatch) {
    setEditing(batch.id);
    setDraft({ ...batch });
  }

  async function run(action: () => Promise<void>, success?: string) {
    setErrorMsg("");
    try {
      await action();
      if (success) setNotice(success);
    } catch (err) {
      setNotice("");
      setErrorMsg(err instanceof Error ? err.message : "Request failed. Please try again.");
    }
  }

  async function save() {
    if (!editing) return;
    await run(async () => {
      await updateBatch(editing, {
        trackSlug: draft.trackSlug,
        timingId: draft.timingId,
        startDate: draft.startDate,
        seatLimit: draft.seatLimit,
        enrolled: draft.enrolled,
        status: draft.status,
      });
      setEditing(null);
    }, "Batch schedule details saved successfully.");
  }

  async function create() {
    const track = courses.find((c) => c.status === "active");
    if (!track) {
      setNotice("Create an active course before adding a batch schedule.");
      return;
    }
    const timing = timings[0];
    if (!timing) {
      setNotice("No batch time slots exist yet. Add a time slot in the API first.");
      return;
    }
    await run(async () => {
      const created = await addBatch({
        trackSlug: track.slug,
        timingId: timing.id,
        status: "OPEN",
        seatLimit: 30,
        enrolled: 0,
        archived: false,
      });
      begin(created);
    }, "New batch added. Configure start date and seats, then save.");
  }

  return (
    <>
      <AdminPageHeading
        eyebrow="Scheduling"
        title="Batches & timings"
        description="Schedule live cohort dates, time slots, seat capacities, enrollment statuses, and archived cohort sessions."
        action={
          <button
            onClick={create}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3157D5] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#193B8F] shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add batch</span>
          </button>
        }
      />

      {notice && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3 text-xs font-semibold text-[#0F9F6E] flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0F9F6E]" />
          <span>{notice}</span>
        </div>
      )}

      {errorMsg && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700"
        >
          {errorMsg}
        </div>
      )}

      <AdminPanel>
        {/* Header and Filter */}
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between bg-[#F8FAFC]/50">
          <div>
            <h2 className="font-bold text-sm sm:text-base text-[#172033]">All scheduled batches</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              {batches.filter((b) => !b.archived).length} active batches ·{" "}
              {batches.filter((b) => b.archived).length} archived
            </p>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`${inputClass} sm:max-w-xs`}
          >
            <option value="all">All course tracks</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Batch Cards List */}
        <div className="divide-y divide-[#E2E8F0]">
          {visible.map((batch) => {
            const course = courses.find((c) => c.slug === batch.trackSlug);
            const isEditing = editing === batch.id;
            return (
              <div
                key={batch.id}
                className={`p-4 sm:p-5 transition-colors ${
                  batch.archived ? "opacity-60 bg-slate-50/60" : "hover:bg-[#F8FAFC]/40"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-[#172033]">
                        {course?.name || batch.trackSlug}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-semibold ${
                          batch.archived
                            ? "bg-slate-100 border border-[#E2E8F0] text-[#64748B]"
                            : batch.status === "CLOSED"
                            ? "bg-rose-50 border border-rose-200 text-rose-700"
                            : batch.status === "FILLING_FAST"
                            ? "bg-amber-50 border border-amber-200 text-amber-700"
                            : "bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            batch.archived
                              ? "bg-slate-400"
                              : batch.status === "CLOSED"
                              ? "bg-rose-500"
                              : batch.status === "FILLING_FAST"
                              ? "bg-amber-500"
                              : "bg-[#0F9F6E]"
                          }`}
                        />
                        {batch.archived ? "ARCHIVED" : batch.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#64748B] mt-1 font-mono">
                      {batch.timeLabel} · {batch.name}
                    </p>

                    {isEditing ? (
                      <div className="rounded-xl border border-[#D8E5FF] bg-[#EEF4FF]/30 p-4 mt-4 shadow-soft">
                        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                          <div>
                            <label className="block text-xs font-semibold text-[#172033] mb-1">
                              Start date
                            </label>
                            <input
                              type="date"
                              className={inputClass}
                              value={String(draft.startDate || "")}
                              onChange={(e) =>
                                setDraft((d) => ({ ...d, startDate: e.target.value }))
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#172033] mb-1">
                              Time slot
                            </label>
                            <select
                              className={inputClass}
                              value={String(draft.timingId || "")}
                              onChange={(e) =>
                                setDraft((d) => ({ ...d, timingId: e.target.value as ManagedBatch["timingId"] }))
                              }
                            >
                              {timings.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.timeLabel} · {t.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#172033] mb-1">
                              Seat limit
                            </label>
                            <input
                              type="number"
                              min={1}
                              className={inputClass}
                              value={Number(draft.seatLimit || 1)}
                              onChange={(e) =>
                                setDraft((d) => ({ ...d, seatLimit: Number(e.target.value) }))
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#172033] mb-1">
                              Enrolled
                            </label>
                            <input
                              type="number"
                              min={0}
                              className={inputClass}
                              value={Number(draft.enrolled || 0)}
                              onChange={(e) =>
                                setDraft((d) => ({ ...d, enrolled: Number(e.target.value) }))
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#172033] mb-1">
                              Status
                            </label>
                            <select
                              className={inputClass}
                              value={String(draft.status || "OPEN")}
                              onChange={(e) =>
                                setDraft((d) => ({
                                  ...d,
                                  status: e.target.value as ManagedBatch["status"],
                                }))
                              }
                            >
                              <option value="OPEN">Open</option>
                              <option value="FILLING_FAST">Filling fast</option>
                              <option value="CLOSED">Closed</option>
                            </select>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-[#172033] mb-1">
                              Course track
                            </label>
                            <select
                              className={inputClass}
                              value={String(draft.trackSlug || "")}
                              onChange={(e) => setDraft((d) => ({ ...d, trackSlug: e.target.value }))}
                            >
                              {courses.map((c) => (
                                <option key={c.slug} value={c.slug}>
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-end gap-2">
                            <button
                              onClick={save}
                              className="flex-1 rounded-xl bg-[#3157D5] text-white font-semibold text-xs py-2 px-3 hover:bg-[#193B8F] shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditing(null)}
                              className="rounded-xl border border-[#CBD5E1] bg-white text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC] p-2 transition-all cursor-pointer"
                              title="Cancel editing"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs text-[#64748B]">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 text-[#3157D5]" />
                          <span>{batch.startDate || "Start date not set"}</span>
                        </span>
                        <span className="font-medium text-[#475569]">
                          {batch.enrolled}/{batch.seatLimit} seats filled
                        </span>
                        <span>{batch.suitableFor}</span>
                      </div>
                    )}
                  </div>

                  {!isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => begin(batch)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#172033] hover:border-[#3157D5] hover:text-[#3157D5] hover:bg-[#EEF4FF] shadow-soft transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() =>
                          run(
                            () => updateBatch(batch.id, { archived: !batch.archived }),
                            batch.archived ? "Batch restored." : "Batch archived."
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC] shadow-soft transition-colors cursor-pointer"
                      >
                        {batch.archived ? (
                          <RotateCcw className="w-3.5 h-3.5" />
                        ) : (
                          <Archive className="w-3.5 h-3.5" />
                        )}
                        <span>{batch.archived ? "Restore" : "Archive"}</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Delete this batch permanently?"))
                            run(() => deleteBatch(batch.id), "Batch deleted.");
                        }}
                        className="rounded-xl border border-[#E2E8F0] bg-white p-2 text-[#64748B] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 shadow-soft transition-colors cursor-pointer"
                        title="Delete batch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {visible.length === 0 && (
            <div className="p-12 text-center">
              <CalendarDays className="w-8 h-8 mx-auto text-[#94A3B8] mb-3" />
              <p className="font-semibold text-sm text-[#172033]">No batch schedules found</p>
              <p className="text-xs text-[#64748B] mt-1">
                Add a new batch or select another course track filter.
              </p>
            </div>
          )}
        </div>
      </AdminPanel>

      <p className="text-xs text-[#64748B] mt-4 font-sans">
        Batch schedules are saved to the Internkul API. Seat counts are managed manually here.
      </p>
    </>
  );
}
