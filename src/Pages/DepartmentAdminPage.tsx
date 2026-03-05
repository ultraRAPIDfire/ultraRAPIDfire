import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { departments, type DeptCode } from "../data/department";
import {
  clearDeptOverrides,
  extractEditableContent,
  loadDeptOverrides,
  saveDeptOverrides,
  type DepartmentEditableContent,
} from "../lib/departmentAdmin";

export default function DepartmentAdminPage() {
  const { deptCode } = useParams();

  const code = (deptCode?.toUpperCase() || "") as DeptCode;
  const dept = departments[code];

  const defaultEditable = useMemo(
    () => (dept ? extractEditableContent(dept) : null),
    [dept]
  );

  const [form, setForm] = useState<DepartmentEditableContent | null>(() => {
    if (!dept || !defaultEditable) return null;
    return loadDeptOverrides(code) ?? defaultEditable;
  });
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (!dept || !defaultEditable) return;
    setForm(loadDeptOverrides(code) ?? defaultEditable);
    setStatus("");
  }, [code, dept, defaultEditable]);

  if (!dept || !defaultEditable || !form) {
    return <Navigate to="/departments" replace />;
  }

  const handleSave = () => {
    saveDeptOverrides(code, form);
    setStatus("Saved. Department page now uses your admin content.");
  };

  const handleReset = () => {
    clearDeptOverrides(code);
    setForm(defaultEditable);
    setStatus("Reset complete. Department content restored to defaults.");
  };

  const updateArrayItem = <T,>(
    items: T[],
    index: number,
    updater: (current: T) => T
  ) => items.map((item, idx) => (idx === index ? updater(item) : item));

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="rounded-2xl border bg-white p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-gray-500">
            DEPARTMENT ADMIN
          </p>
          <h1 className="mt-2 text-3xl font-black text-gray-900">
            {dept.title} Admin Editor
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Edit content here using normal form fields. No JSON required.
          </p>

          <section className="mt-8 rounded-xl border p-5">
            <h2 className="text-lg font-bold text-gray-900">Program Overview</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Heading">
                <input
                  value={form.programOverview.heading}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      programOverview: {
                        ...form.programOverview,
                        heading: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Overview Text" className="md:col-span-2">
                <textarea
                  value={form.programOverview.text}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      programOverview: { ...form.programOverview, text: e.target.value },
                    })
                  }
                  className="h-24 w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Non-Teaching Personnel">
                <input
                  type="number"
                  value={form.programOverview.stats.nonTeaching}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      programOverview: {
                        ...form.programOverview,
                        stats: {
                          ...form.programOverview.stats,
                          nonTeaching: Number(e.target.value || 0),
                        },
                      },
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Faculty">
                <input
                  type="number"
                  value={form.programOverview.stats.faculty}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      programOverview: {
                        ...form.programOverview,
                        stats: {
                          ...form.programOverview.stats,
                          faculty: Number(e.target.value || 0),
                        },
                      },
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Students">
                <input
                  type="number"
                  value={form.programOverview.stats.students}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      programOverview: {
                        ...form.programOverview,
                        stats: {
                          ...form.programOverview.stats,
                          students: Number(e.target.value || 0),
                        },
                      },
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
            </div>
          </section>

          <section className="mt-6 rounded-xl border p-5">
            <h2 className="text-lg font-bold text-gray-900">Program Educational Objectives (PEO)</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Title">
                <input
                  value={form.peo.title}
                  onChange={(e) => setForm({ ...form, peo: { ...form.peo, title: e.target.value } })}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Subtitle">
                <input
                  value={form.peo.subtitle}
                  onChange={(e) =>
                    setForm({ ...form, peo: { ...form.peo, subtitle: e.target.value } })
                  }
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
            </div>

            <div className="mt-4 space-y-3">
              {form.peo.bullets.map((bullet, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    value={bullet}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        peo: {
                          ...form.peo,
                          bullets: updateArrayItem(form.peo.bullets, idx, () => e.target.value),
                        },
                      })
                    }
                    className="col-span-10 rounded-lg border px-3 py-2"
                    placeholder={`PEO ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        peo: {
                          ...form.peo,
                          bullets: form.peo.bullets.filter((_, i) => i !== idx),
                        },
                      })
                    }
                    className="col-span-2 rounded-lg border px-2 py-2 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm({ ...form, peo: { ...form.peo, bullets: [...form.peo.bullets, ""] } })
                }
                className="rounded-lg border px-4 py-2 text-sm font-semibold"
              >
                Add PEO Bullet
              </button>
            </div>
          </section>

          <section className="mt-6 rounded-xl border p-5">
            <h2 className="text-lg font-bold text-gray-900">Student Outcomes (SO)</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Title">
                <input
                  value={form.so.title}
                  onChange={(e) => setForm({ ...form, so: { ...form.so, title: e.target.value } })}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Subtitle">
                <input
                  value={form.so.subtitle}
                  onChange={(e) => setForm({ ...form, so: { ...form.so, subtitle: e.target.value } })}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
            </div>

            <div className="mt-4 space-y-4">
              {form.so.outcomes.map((outcome, idx) => (
                <div key={idx} className="rounded-lg border p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field label={`Outcome ${idx + 1} Title`}>
                      <input
                        value={outcome.title}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            so: {
                              ...form.so,
                              outcomes: updateArrayItem(form.so.outcomes, idx, (current) => ({
                                ...current,
                                title: e.target.value,
                              })),
                            },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label={`Outcome ${idx + 1} Description`}>
                      <input
                        value={outcome.text}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            so: {
                              ...form.so,
                              outcomes: updateArrayItem(form.so.outcomes, idx, (current) => ({
                                ...current,
                                text: e.target.value,
                              })),
                            },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        so: {
                          ...form.so,
                          outcomes: form.so.outcomes.filter((_, i) => i !== idx),
                        },
                      })
                    }
                    className="mt-3 rounded-lg border px-3 py-2 text-sm"
                  >
                    Remove Outcome
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    so: {
                      ...form.so,
                      outcomes: [...form.so.outcomes, { title: "", text: "" }],
                    },
                  })
                }
                className="rounded-lg border px-4 py-2 text-sm font-semibold"
              >
                Add Outcome
              </button>
            </div>
          </section>

          <section className="mt-6 rounded-xl border p-5">
            <h2 className="text-lg font-bold text-gray-900">Curriculum Overview</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Title">
                <input
                  value={form.curriculum.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      curriculum: { ...form.curriculum, title: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Overview Text" className="md:col-span-2">
                <textarea
                  value={form.curriculum.text}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      curriculum: { ...form.curriculum, text: e.target.value },
                    })
                  }
                  className="h-24 w-full rounded-lg border px-3 py-2"
                />
              </Field>
            </div>

            <div className="mt-4 space-y-3">
              {form.curriculum.bullets.map((bullet, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    value={bullet}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        curriculum: {
                          ...form.curriculum,
                          bullets: updateArrayItem(
                            form.curriculum.bullets,
                            idx,
                            () => e.target.value
                          ),
                        },
                      })
                    }
                    className="col-span-10 rounded-lg border px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        curriculum: {
                          ...form.curriculum,
                          bullets: form.curriculum.bullets.filter((_, i) => i !== idx),
                        },
                      })
                    }
                    className="col-span-2 rounded-lg border px-2 py-2 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    curriculum: {
                      ...form.curriculum,
                      bullets: [...form.curriculum.bullets, ""],
                    },
                  })
                }
                className="rounded-lg border px-4 py-2 text-sm font-semibold"
              >
                Add Curriculum Bullet
              </button>
            </div>
          </section>

          <section className="mt-6 rounded-xl border p-5">
            <h2 className="text-lg font-bold text-gray-900">Laboratories</h2>
            <Field label="Section Title" className="mt-4">
              <input
                value={form.laboratories.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    laboratories: { ...form.laboratories, title: e.target.value },
                  })
                }
                className="w-full rounded-lg border px-3 py-2"
              />
            </Field>
            <div className="mt-4 space-y-3">
              {form.laboratories.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    value={item}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        laboratories: {
                          ...form.laboratories,
                          items: updateArrayItem(
                            form.laboratories.items,
                            idx,
                            () => e.target.value
                          ),
                        },
                      })
                    }
                    className="col-span-10 rounded-lg border px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        laboratories: {
                          ...form.laboratories,
                          items: form.laboratories.items.filter((_, i) => i !== idx),
                        },
                      })
                    }
                    className="col-span-2 rounded-lg border px-2 py-2 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    laboratories: {
                      ...form.laboratories,
                      items: [...form.laboratories.items, ""],
                    },
                  })
                }
                className="rounded-lg border px-4 py-2 text-sm font-semibold"
              >
                Add Laboratory
              </button>
            </div>
          </section>

          <section className="mt-6 rounded-xl border p-5">
            <h2 className="text-lg font-bold text-gray-900">Faculty</h2>
            <Field label="Section Title" className="mt-4">
              <input
                value={form.faculty.title}
                onChange={(e) =>
                  setForm({ ...form, faculty: { ...form.faculty, title: e.target.value } })
                }
                className="w-full rounded-lg border px-3 py-2"
              />
            </Field>
            <div className="mt-4 space-y-4">
              {form.faculty.members.map((member, idx) => (
                <div key={idx} className="rounded-lg border p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field label="Name">
                      <input
                        value={member.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            faculty: {
                              ...form.faculty,
                              members: updateArrayItem(form.faculty.members, idx, (current) => ({
                                ...current,
                                name: e.target.value,
                              })),
                            },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Role">
                      <input
                        value={member.role}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            faculty: {
                              ...form.faculty,
                              members: updateArrayItem(form.faculty.members, idx, (current) => ({
                                ...current,
                                role: e.target.value,
                              })),
                            },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        faculty: {
                          ...form.faculty,
                          members: form.faculty.members.filter((_, i) => i !== idx),
                        },
                      })
                    }
                    className="mt-3 rounded-lg border px-3 py-2 text-sm"
                  >
                    Remove Faculty Member
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    faculty: {
                      ...form.faculty,
                      members: [...form.faculty.members, { name: "", role: "" }],
                    },
                  })
                }
                className="rounded-lg border px-4 py-2 text-sm font-semibold"
              >
                Add Faculty Member
              </button>
            </div>
          </section>

          <section className="mt-6 rounded-xl border p-5">
            <h2 className="text-lg font-bold text-gray-900">Career Opportunities</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Title">
                <input
                  value={form.careers.title}
                  onChange={(e) =>
                    setForm({ ...form, careers: { ...form.careers, title: e.target.value } })
                  }
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
              <Field label="Subtitle">
                <input
                  value={form.careers.subtitle}
                  onChange={(e) =>
                    setForm({ ...form, careers: { ...form.careers, subtitle: e.target.value } })
                  }
                  className="w-full rounded-lg border px-3 py-2"
                />
              </Field>
            </div>
            <div className="mt-4 space-y-4">
              {form.careers.cards.map((card, idx) => (
                <div key={idx} className="rounded-lg border p-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Field label="Icon (emoji or text)">
                      <input
                        value={card.icon}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            careers: {
                              ...form.careers,
                              cards: updateArrayItem(form.careers.cards, idx, (current) => ({
                                ...current,
                                icon: e.target.value,
                              })),
                            },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Career Title">
                      <input
                        value={card.title}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            careers: {
                              ...form.careers,
                              cards: updateArrayItem(form.careers.cards, idx, (current) => ({
                                ...current,
                                title: e.target.value,
                              })),
                            },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                    <Field label="Description">
                      <input
                        value={card.text}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            careers: {
                              ...form.careers,
                              cards: updateArrayItem(form.careers.cards, idx, (current) => ({
                                ...current,
                                text: e.target.value,
                              })),
                            },
                          })
                        }
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </Field>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        careers: {
                          ...form.careers,
                          cards: form.careers.cards.filter((_, i) => i !== idx),
                        },
                      })
                    }
                    className="mt-3 rounded-lg border px-3 py-2 text-sm"
                  >
                    Remove Career Card
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    careers: {
                      ...form.careers,
                      cards: [...form.careers.cards, { icon: "", title: "", text: "" }],
                    },
                  })
                }
                className="rounded-lg border px-4 py-2 text-sm font-semibold"
              >
                Add Career Card
              </button>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-[#a90000] px-5 py-2 text-sm font-semibold text-white hover:bg-[#8f0000]"
            >
              Save Content
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              Reset to Department Defaults
            </button>
            <Link
              to={`/dept/${dept.code}`}
              className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              View Department Page
            </Link>
          </div>

          {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-sm font-semibold text-gray-800">{label}</span>
      {children}
    </label>
  );
}
