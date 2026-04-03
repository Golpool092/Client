import React, { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "../../hooks/useAuth";
import {
  useListAllAds, useCreateAd, useUpdateAd, useDeleteAd, useToggleAd
} from "@workspace/api-client-react";
import {
  Settings, Plus, Trash2, Edit2, Eye, EyeOff, ChevronLeft, Save, X,
  Clock, Layout, ToggleLeft, ToggleRight, Monitor, Sliders
} from "lucide-react";

const POSITIONS = [
  { value: "sidebar-top", label: "Боковая панель (верх)" },
  { value: "sidebar-bottom", label: "Боковая панель (низ)" },
  { value: "content-top", label: "Контент (верх)" },
  { value: "content-bottom", label: "Контент (низ)" },
  { value: "header", label: "Шапка" },
  { value: "footer", label: "Подвал" },
];

const PAGES = [
  { value: "home", label: "Главная" },
  { value: "quests", label: "Задания" },
  { value: "classes", label: "Классы" },
  { value: "skills", label: "Умения" },
  { value: "items", label: "Предметы" },
];

const emptyForm = {
  title: "",
  description: "",
  imageUrl: "",
  linkUrl: "",
  linkText: "",
  position: "sidebar-top",
  active: true,
  displayMode: "all-pages" as "all-pages" | "specific-pages",
  pages: [] as string[],
  maxShows: "",
  expiresAt: "",
  mode: "simple" as "simple" | "advanced",
};

type AdForm = typeof emptyForm;

export default function AdminDashboard() {
  const { signOut, login } = useAuth();
  const { data: ads, refetch } = useListAllAds();
  const createAd = useCreateAd();
  const updateAd = useUpdateAd();
  const deleteAd = useDeleteAd();
  const toggleAd = useToggleAd();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<AdForm>({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditId(null);
    setShowForm(false);
  };

  const openCreate = () => {
    setForm({ ...emptyForm });
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (ad: any) => {
    setForm({
      title: ad.title || "",
      description: ad.description || "",
      imageUrl: ad.imageUrl || "",
      linkUrl: ad.linkUrl || "",
      linkText: ad.linkText || "",
      position: ad.position || "sidebar-top",
      active: ad.active !== undefined ? ad.active : true,
      displayMode: ad.displayMode || "all-pages",
      pages: ad.pages || [],
      maxShows: ad.maxShows != null ? String(ad.maxShows) : "",
      expiresAt: ad.expiresAt ? new Date(ad.expiresAt).toISOString().slice(0, 16) : "",
      mode: (ad.displayMode === "all-pages" && !ad.maxShows && !ad.expiresAt) ? "simple" : "advanced",
    });
    setEditId(ad.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload: any = {
        title: form.title,
        description: form.description || null,
        imageUrl: form.imageUrl || null,
        linkUrl: form.linkUrl || null,
        linkText: form.linkText || null,
        position: form.position,
        active: form.active,
        displayMode: form.mode === "simple" ? "all-pages" : form.displayMode,
        pages: form.mode === "simple" ? [] : form.pages,
        maxShows: form.mode === "advanced" && form.maxShows ? parseInt(form.maxShows) : null,
        expiresAt: form.mode === "advanced" && form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      };

      if (editId !== null) {
        await updateAd.mutateAsync({ id: editId, data: payload });
      } else {
        await createAd.mutateAsync({ data: payload });
      }
      await refetch();
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить это объявление?")) return;
    await deleteAd.mutateAsync({ id });
    await refetch();
  };

  const handleToggle = async (id: number) => {
    await toggleAd.mutateAsync({ id });
    await refetch();
  };

  const togglePage = (page: string) => {
    setForm(f => ({
      ...f,
      pages: f.pages.includes(page) ? f.pages.filter(p => p !== page) : [...f.pages, page],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0b12]">
      {/* Admin Header */}
      <header className="border-b border-[#2a2d3e] bg-[#0e0f1a] sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-amber-400 transition-colors">
              <ChevronLeft size={18} />
            </Link>
            <Settings className="text-amber-400" size={18} />
            <span className="font-bold text-gray-200 font-cinzel">Панель управления</span>
            <span className="text-xs text-gray-600 hidden sm:block">· {login}</span>
          </div>
          <button
            onClick={signOut}
            className="text-sm text-gray-500 hover:text-red-400 transition-colors"
          >
            Выйти
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Ads section */}
        <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl">
          <div className="flex items-center justify-between p-5 border-b border-[#2a2d3e]">
            <div>
              <h2 className="font-bold text-gray-200 font-cinzel">Объявления</h2>
              <p className="text-xs text-gray-600 mt-0.5">{ads?.length || 0} {(ads?.length || 0) === 1 ? "объявление" : "объявлений"}</p>
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <Plus size={15} />
              Добавить
            </button>
          </div>

          {/* Ad form */}
          {showForm && (
            <div className="p-5 border-b border-[#2a2d3e] bg-[#0c0d18]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-200 text-sm">
                  {editId !== null ? "Редактировать объявление" : "Новое объявление"}
                </h3>
                {/* Mode toggle */}
                <div className="flex items-center gap-1 bg-[#1a1b26] rounded-lg p-1">
                  <button
                    onClick={() => setForm(f => ({ ...f, mode: "simple" }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      form.mode === "simple" ? "bg-amber-400 text-black" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    <Layout size={13} /> Простой
                  </button>
                  <button
                    onClick={() => setForm(f => ({ ...f, mode: "advanced" }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      form.mode === "advanced" ? "bg-amber-400 text-black" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    <Sliders size={13} /> Расширенный
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Заголовок *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
                      placeholder="Название объявления"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Описание</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      rows={2}
                      className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50 resize-none"
                      placeholder="Краткое описание..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">URL изображения</label>
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                      className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Ссылка (URL)</label>
                      <input
                        type="url"
                        value={form.linkUrl}
                        onChange={e => setForm(f => ({ ...f, linkUrl: e.target.value }))}
                        className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Текст ссылки</label>
                      <input
                        type="text"
                        value={form.linkText}
                        onChange={e => setForm(f => ({ ...f, linkText: e.target.value }))}
                        className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
                        placeholder="Подробнее"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Позиция</label>
                    <select
                      value={form.position}
                      onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                      className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
                    >
                      {POSITIONS.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, active: !f.active }))}
                      className="flex items-center gap-2 text-sm"
                    >
                      {form.active
                        ? <ToggleRight size={20} className="text-amber-400" />
                        : <ToggleLeft size={20} className="text-gray-600" />
                      }
                      <span className={form.active ? "text-amber-400" : "text-gray-500"}>
                        {form.active ? "Активно" : "Неактивно"}
                      </span>
                    </button>
                  </div>

                  {/* Advanced mode fields */}
                  {form.mode === "advanced" && (
                    <>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 flex items-center gap-1">
                          <Monitor size={11} /> Показывать на страницах
                        </label>
                        <div className="space-y-1.5">
                          <button
                            type="button"
                            onClick={() => setForm(f => ({ ...f, displayMode: "all-pages" }))}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs border transition-all ${
                              form.displayMode === "all-pages"
                                ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                                : "border-[#2a2d3e] text-gray-500 hover:border-gray-600"
                            }`}
                          >
                            На всех страницах
                          </button>
                          <button
                            type="button"
                            onClick={() => setForm(f => ({ ...f, displayMode: "specific-pages" }))}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs border transition-all ${
                              form.displayMode === "specific-pages"
                                ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                                : "border-[#2a2d3e] text-gray-500 hover:border-gray-600"
                            }`}
                          >
                            На выбранных страницах
                          </button>
                        </div>
                        {form.displayMode === "specific-pages" && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {PAGES.map(p => (
                              <button
                                key={p.value}
                                type="button"
                                onClick={() => togglePage(p.value)}
                                className={`px-2 py-1 rounded text-xs border transition-all ${
                                  form.pages.includes(p.value)
                                    ? "bg-amber-400/10 border-amber-400/40 text-amber-400"
                                    : "border-[#2a2d3e] text-gray-600 hover:border-gray-600"
                                }`}
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Layout size={11} /> Показов за сессию
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={form.maxShows}
                            onChange={e => setForm(f => ({ ...f, maxShows: e.target.value }))}
                            className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
                            placeholder="∞ (без ограничений)"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Clock size={11} /> Истекает
                          </label>
                          <input
                            type="datetime-local"
                            value={form.expiresAt}
                            onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                            className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#2a2d3e]">
                <button
                  onClick={handleSave}
                  disabled={saving || !form.title.trim()}
                  className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold px-5 py-2 rounded-lg text-sm disabled:opacity-50 transition-colors"
                >
                  <Save size={14} />
                  {saving ? "Сохранение..." : "Сохранить"}
                </button>
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
                >
                  <X size={14} /> Отмена
                </button>
              </div>
            </div>
          )}

          {/* Ads list */}
          <div className="divide-y divide-[#2a2d3e]">
            {!ads || ads.length === 0 ? (
              <div className="py-12 text-center text-gray-600">
                <p>Нет объявлений. Нажмите «Добавить» для создания первого.</p>
              </div>
            ) : (
              ads.map((ad: any) => {
                const isExpired = ad.expiresAt && new Date(ad.expiresAt) < new Date();
                return (
                  <div key={ad.id} className={`p-4 flex items-start gap-4 hover:bg-[#0c0d18] transition-colors ${isExpired ? "opacity-60" : ""}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded ${ad.active ? "text-green-400 bg-green-400/10" : "text-gray-600 bg-gray-600/10"}`}>
                          {ad.active ? <><Eye size={10} /> Активно</> : <><EyeOff size={10} /> Неактивно</>}
                        </span>
                        {isExpired && <span className="text-xs text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">Истекло</span>}
                        <span className="text-xs text-gray-600">{POSITIONS.find(p => p.value === ad.position)?.label || ad.position}</span>
                        {ad.displayMode === "specific-pages" && ad.pages?.length > 0 && (
                          <span className="text-xs text-blue-400">{ad.pages.join(", ")}</span>
                        )}
                        {ad.maxShows && <span className="text-xs text-purple-400">max {ad.maxShows} показов</span>}
                        {ad.expiresAt && !isExpired && <span className="text-xs text-orange-400 flex items-center gap-0.5"><Clock size={10} /> до {new Date(ad.expiresAt).toLocaleDateString("ru")}</span>}
                      </div>
                      <p className="text-sm font-medium text-gray-300 truncate">{ad.title}</p>
                      {ad.description && <p className="text-xs text-gray-600 truncate mt-0.5">{ad.description}</p>}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleToggle(ad.id)}
                        title={ad.active ? "Деактивировать" : "Активировать"}
                        className="p-2 text-gray-600 hover:text-amber-400 rounded-lg hover:bg-amber-400/10 transition-all"
                      >
                        {ad.active ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      <button
                        onClick={() => openEdit(ad)}
                        className="p-2 text-gray-600 hover:text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="p-2 text-gray-600 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
