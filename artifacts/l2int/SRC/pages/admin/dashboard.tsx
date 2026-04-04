import React, { useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  useListAllAds, useCreateAd, useUpdateAd, useDeleteAd, useToggleAd
} from "@workspace/api-client-react";
import {
  Settings, Plus, Trash2, Edit2, Eye, EyeOff, Save, X,
  Clock, LogOut, Monitor, Smartphone, Image, Link, Upload,
  LayoutDashboard, Megaphone, RefreshCw, CheckCircle, AlertCircle,
  BarChart2
} from "lucide-react";

const POSITIONS_PC = [
  { value: "sidebar-top", label: "Сайдбар — верх (ПК)", device: "desktop" },
  { value: "sidebar-bottom", label: "Сайдбар — низ (ПК)", device: "desktop" },
  { value: "sidebar-middle", label: "Сайдбар — середина (ПК)", device: "desktop" },
  { value: "content-top", label: "Контент — верх (ПК)", device: "desktop" },
  { value: "content-bottom", label: "Контент — низ (ПК)", device: "desktop" },
  { value: "header", label: "Шапка (ПК)", device: "desktop" },
  { value: "footer", label: "Подвал (ПК)", device: "desktop" },
];

const POSITIONS_MOBILE = [
  { value: "mobile-top", label: "Над контентом (Телефон)", device: "mobile" },
  { value: "mobile-bottom", label: "Под контентом (Телефон)", device: "mobile" },
  { value: "mobile-sticky", label: "Прилипающий низ (Телефон)", device: "mobile" },
  { value: "mobile-interstitial", label: "Между блоками (Телефон)", device: "mobile" },
];

const ALL_POSITIONS = [...POSITIONS_PC, ...POSITIONS_MOBILE];

const PAGES = [
  { value: "home", label: "Главная" },
  { value: "quests", label: "Квесты" },
  { value: "classes", label: "Классы" },
  { value: "skills", label: "Умения" },
  { value: "items", label: "Предметы" },
  { value: "guides", label: "Гайды" },
  { value: "subclass", label: "Сабкласс" },
  { value: "mamon", label: "Мамон" },
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
  deviceTarget: "all" as "all" | "desktop" | "mobile",
};

type AdForm = typeof emptyForm;

type Tab = "ads" | "stats";

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const { data: ads, refetch, isLoading } = useListAllAds();
  const createAd = useCreateAd();
  const updateAd = useUpdateAd();
  const deleteAd = useDeleteAd();
  const toggleAd = useToggleAd();

  const [tab, setTab] = useState<Tab>("ads");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<AdForm>({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [filterDevice, setFilterDevice] = useState<"all" | "desktop" | "mobile">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditId(null);
    setShowForm(false);
    setImageMode("url");
  };

  const openCreate = () => {
    setForm({ ...emptyForm });
    setEditId(null);
    setShowForm(true);
    setImageMode("url");
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
      deviceTarget: ad.deviceTarget || "all",
    });
    setEditId(ad.id);
    setShowForm(true);
    setImageMode(ad.imageUrl ? "url" : "url");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/ads/upload-image", { method: "POST", body: fd, credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setForm(f => ({ ...f, imageUrl: data.imageUrl }));
      }
    } finally {
      setUploadingImage(false);
    }
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
        displayMode: form.displayMode,
        pages: form.displayMode === "all-pages" ? [] : form.pages,
        maxShows: form.maxShows ? parseInt(form.maxShows) : null,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
        deviceTarget: form.deviceTarget,
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
    if (!confirm("Удалить эту рекламу?")) return;
    await deleteAd.mutateAsync({ id });
    await refetch();
  };

  const handleToggle = async (id: number) => {
    await toggleAd.mutateAsync({ id });
    await refetch();
  };

  const filteredAds = (ads as any[] || []).filter(ad => {
    if (filterDevice === "all") return true;
    const target = ad.deviceTarget || "all";
    return target === "all" || target === filterDevice;
  });

  const activeCount = (ads as any[] || []).filter((a: any) => a.active).length;
  const expiredCount = (ads as any[] || []).filter((a: any) => a.expiresAt && new Date(a.expiresAt) < new Date()).length;

  return (
    <div className="min-h-screen bg-[#0a0b12] flex flex-col">
      <header className="border-b border-[#2a2d3e] bg-[#0e0f1a] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3 max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
              <Settings className="text-amber-400" size={16} />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white font-cinzel tracking-wide">Панель управления</h1>
              <p className="text-xs text-gray-600">L2INT.RU Admin</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-400/10"
          >
            <LogOut size={14} />
            Выйти
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#0e0f1a] border border-[#2a2d3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Megaphone size={15} className="text-amber-400" />
              <span className="text-xs text-gray-500">Всего реклам</span>
            </div>
            <p className="text-2xl font-bold text-white">{(ads as any[] || []).length}</p>
          </div>
          <div className="bg-[#0e0f1a] border border-[#2a2d3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle size={15} className="text-green-400" />
              <span className="text-xs text-gray-500">Активных</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{activeCount}</p>
          </div>
          <div className="bg-[#0e0f1a] border border-[#2a2d3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Monitor size={15} className="text-blue-400" />
              <span className="text-xs text-gray-500">Для ПК</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">
              {(ads as any[] || []).filter((a: any) => !a.deviceTarget || a.deviceTarget === "all" || a.deviceTarget === "desktop").length}
            </p>
          </div>
          <div className="bg-[#0e0f1a] border border-[#2a2d3e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Smartphone size={15} className="text-purple-400" />
              <span className="text-xs text-gray-500">Для телефонов</span>
            </div>
            <p className="text-2xl font-bold text-purple-400">
              {(ads as any[] || []).filter((a: any) => !a.deviceTarget || a.deviceTarget === "all" || a.deviceTarget === "mobile").length}
            </p>
          </div>
        </div>

        <div className="bg-[#0e0f1a] border border-[#2a2d3e] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2d3e]">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold text-white">Рекламные объявления</h2>
              <div className="flex items-center gap-1 text-xs bg-[#1a1b26] border border-[#2a2d3e] rounded-lg overflow-hidden">
                {(["all", "desktop", "mobile"] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setFilterDevice(d)}
                    className={`px-3 py-1.5 transition-colors flex items-center gap-1.5 ${filterDevice === d ? "bg-amber-400/15 text-amber-400" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {d === "all" && <span>Все</span>}
                    {d === "desktop" && <><Monitor size={12} /><span>ПК</span></>}
                    {d === "mobile" && <><Smartphone size={12} /><span>Телефон</span></>}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => refetch()}
                className="p-2 text-gray-600 hover:text-gray-300 rounded-lg hover:bg-white/5 transition-all"
                title="Обновить"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={openCreate}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={14} />
                Добавить рекламу
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="py-16 text-center text-gray-600 text-sm">Загрузка...</div>
          ) : filteredAds.length === 0 ? (
            <div className="py-16 text-center">
              <Megaphone size={32} className="text-gray-700 mx-auto mb-3" />
              <p className="text-gray-600 text-sm">Рекламных объявлений пока нет</p>
              <button
                onClick={openCreate}
                className="mt-4 text-amber-400 text-xs hover:text-amber-300 underline underline-offset-2"
              >
                Добавить первую рекламу
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#2a2d3e]">
              {filteredAds.map((ad: any) => {
                const isExpired = ad.expiresAt && new Date(ad.expiresAt) < new Date();
                const posInfo = ALL_POSITIONS.find(p => p.value === ad.position);
                return (
                  <div key={ad.id} className={`px-5 py-4 flex items-start gap-4 hover:bg-[#0c0d18] transition-colors ${isExpired ? "opacity-50" : ""}`}>
                    {ad.imageUrl && (
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-[#2a2d3e] shrink-0 bg-[#1a1b26]">
                        <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium ${ad.active ? "text-green-400 bg-green-400/10" : "text-gray-600 bg-gray-600/10"}`}>
                          {ad.active ? <><Eye size={10} /> Активно</> : <><EyeOff size={10} /> Неактивно</>}
                        </span>
                        {isExpired && (
                          <span className="text-xs text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                            <AlertCircle size={10} /> Истекло
                          </span>
                        )}
                        <span className={`text-xs px-1.5 py-0.5 rounded-md ${(ad.deviceTarget === "desktop") ? "text-blue-400 bg-blue-400/10" : (ad.deviceTarget === "mobile") ? "text-purple-400 bg-purple-400/10" : "text-gray-500 bg-gray-500/10"}`}>
                          {ad.deviceTarget === "desktop" ? <span className="flex items-center gap-1"><Monitor size={10} /> ПК</span> : ad.deviceTarget === "mobile" ? <span className="flex items-center gap-1"><Smartphone size={10} /> Телефон</span> : "Все устройства"}
                        </span>
                        <span className="text-xs text-gray-600 bg-[#1a1b26] px-1.5 py-0.5 rounded-md">
                          {posInfo?.label || ad.position}
                        </span>
                        {ad.displayMode === "specific-pages" && ad.pages?.length > 0 && (
                          <span className="text-xs text-blue-400">Страницы: {ad.pages.join(", ")}</span>
                        )}
                        {ad.maxShows && (
                          <span className="text-xs text-gray-500">макс. {ad.maxShows} показов</span>
                        )}
                        {ad.expiresAt && !isExpired && (
                          <span className="text-xs text-orange-400 flex items-center gap-0.5">
                            <Clock size={10} /> до {new Date(ad.expiresAt).toLocaleDateString("ru")}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-200 truncate">{ad.title}</p>
                      {ad.description && (
                        <p className="text-xs text-gray-600 truncate mt-0.5">{ad.description}</p>
                      )}
                      {ad.linkUrl && (
                        <p className="text-xs text-amber-400/60 truncate mt-0.5">{ad.linkUrl}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleToggle(ad.id)}
                        title={ad.active ? "Деактивировать" : "Активировать"}
                        className={`p-2 rounded-lg transition-all text-sm ${ad.active ? "text-gray-500 hover:text-orange-400 hover:bg-orange-400/10" : "text-gray-500 hover:text-green-400 hover:bg-green-400/10"}`}
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
              })}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={resetForm} />
          <div className="relative bg-[#0e0f1a] border border-[#2a2d3e] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2d3e] sticky top-0 bg-[#0e0f1a] z-10">
              <h3 className="text-sm font-bold text-white">
                {editId !== null ? "Редактировать рекламу" : "Новая реклама"}
              </h3>
              <button onClick={resetForm} className="text-gray-600 hover:text-gray-300 p-1.5 rounded-lg hover:bg-white/5">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Заголовок *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none transition-colors"
                  placeholder="Название рекламы..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Описание</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none transition-colors resize-none"
                  rows={2}
                  placeholder="Краткое описание..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Изображение</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setImageMode("url")}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${imageMode === "url" ? "bg-amber-400/15 text-amber-400 border border-amber-400/30" : "bg-[#1a1b26] text-gray-500 border border-[#2a2d3e] hover:text-gray-300"}`}
                  >
                    <Link size={12} /> По ссылке
                  </button>
                  <button
                    onClick={() => setImageMode("upload")}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${imageMode === "upload" ? "bg-amber-400/15 text-amber-400 border border-amber-400/30" : "bg-[#1a1b26] text-gray-500 border border-[#2a2d3e] hover:text-gray-300"}`}
                  >
                    <Upload size={12} /> Загрузить файл
                  </button>
                </div>
                {imageMode === "url" ? (
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                    className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                ) : (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="w-full border-2 border-dashed border-[#2a2d3e] hover:border-amber-400/40 rounded-lg py-6 text-center transition-colors group disabled:opacity-50"
                    >
                      <Image size={24} className="text-gray-600 group-hover:text-amber-400 mx-auto mb-2 transition-colors" />
                      <p className="text-xs text-gray-500 group-hover:text-gray-300">
                        {uploadingImage ? "Загрузка..." : "Нажмите чтобы выбрать файл"}
                      </p>
                      <p className="text-xs text-gray-700 mt-1">PNG, JPG, GIF до 5MB</p>
                    </button>
                    {form.imageUrl && (
                      <div className="mt-2 flex items-center gap-2 p-2 bg-green-400/10 border border-green-400/20 rounded-lg">
                        <CheckCircle size={14} className="text-green-400 shrink-0" />
                        <span className="text-xs text-green-400 truncate">Изображение загружено</span>
                      </div>
                    )}
                  </div>
                )}
                {form.imageUrl && imageMode === "url" && (
                  <div className="mt-2 h-20 rounded-lg overflow-hidden border border-[#2a2d3e]">
                    <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Ссылка</label>
                  <input
                    type="url"
                    value={form.linkUrl}
                    onChange={e => setForm(f => ({ ...f, linkUrl: e.target.value }))}
                    className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Текст кнопки</label>
                  <input
                    type="text"
                    value={form.linkText}
                    onChange={e => setForm(f => ({ ...f, linkText: e.target.value }))}
                    className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none transition-colors"
                    placeholder="Подробнее..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Устройство показа</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["all", "desktop", "mobile"] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setForm(f => ({ ...f, deviceTarget: d }))}
                      className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg border transition-all text-xs font-medium ${form.deviceTarget === d ? "border-amber-400/50 bg-amber-400/10 text-amber-400" : "border-[#2a2d3e] bg-[#1a1b26] text-gray-500 hover:text-gray-300"}`}
                    >
                      {d === "all" && <><LayoutDashboard size={16} /><span>Все</span></>}
                      {d === "desktop" && <><Monitor size={16} /><span>ПК</span></>}
                      {d === "mobile" && <><Smartphone size={16} /><span>Телефон</span></>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Позиция на странице</label>
                <select
                  value={form.position}
                  onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                  className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none transition-colors"
                >
                  <optgroup label="Компьютер (ПК)">
                    {POSITIONS_PC.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Мобильные устройства (Телефон)">
                    {POSITIONS_MOBILE.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Показывать на страницах</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setForm(f => ({ ...f, displayMode: "all-pages" }))}
                    className={`text-xs py-2 px-3 rounded-lg border transition-colors text-left ${form.displayMode === "all-pages" ? "border-amber-400/50 bg-amber-400/10 text-amber-400" : "border-[#2a2d3e] bg-[#1a1b26] text-gray-500 hover:text-gray-300"}`}
                  >
                    Все страницы
                  </button>
                  <button
                    onClick={() => setForm(f => ({ ...f, displayMode: "specific-pages" }))}
                    className={`text-xs py-2 px-3 rounded-lg border transition-colors text-left ${form.displayMode === "specific-pages" ? "border-amber-400/50 bg-amber-400/10 text-amber-400" : "border-[#2a2d3e] bg-[#1a1b26] text-gray-500 hover:text-gray-300"}`}
                  >
                    Выбрать страницы
                  </button>
                </div>
                {form.displayMode === "specific-pages" && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {PAGES.map(p => (
                      <button
                        key={p.value}
                        onClick={() => setForm(f => ({
                          ...f,
                          pages: f.pages.includes(p.value) ? f.pages.filter(x => x !== p.value) : [...f.pages, p.value]
                        }))}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${form.pages.includes(p.value) ? "border-amber-400/50 bg-amber-400/10 text-amber-400" : "border-[#2a2d3e] bg-[#1a1b26] text-gray-500 hover:text-gray-300"}`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Макс. показов</label>
                  <input
                    type="number"
                    value={form.maxShows}
                    onChange={e => setForm(f => ({ ...f, maxShows: e.target.value }))}
                    className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none transition-colors"
                    placeholder="Не ограничено"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Дата окончания</label>
                  <input
                    type="datetime-local"
                    value={form.expiresAt}
                    onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                    className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-3 px-4 bg-[#1a1b26] rounded-lg border border-[#2a2d3e]">
                <div>
                  <p className="text-xs font-semibold text-gray-300">Активна</p>
                  <p className="text-xs text-gray-600">Реклама будет показана посетителям</p>
                </div>
                <button
                  onClick={() => setForm(f => ({ ...f, active: !f.active }))}
                  className={`relative w-10 h-5.5 rounded-full transition-colors ${form.active ? "bg-amber-400" : "bg-[#2a2d3e]"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.active ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-4 border-t border-[#2a2d3e] sticky bottom-0 bg-[#0e0f1a]">
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-40"
              >
                <Save size={15} />
                {saving ? "Сохранение..." : editId !== null ? "Сохранить изменения" : "Создать рекламу"}
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2.5 text-sm text-gray-400 hover:text-gray-200 border border-[#2a2d3e] hover:border-gray-600 rounded-lg transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
