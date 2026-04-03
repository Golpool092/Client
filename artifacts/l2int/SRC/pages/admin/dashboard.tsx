import React, { useState } from "react";
import { useLocation } from "wouter";
import { Plus, LogOut, Edit, Trash2, CheckCircle, XCircle, Image as ImageIcon, Loader2, Eye } from "lucide-react";
import {
  useGetMe,
  useLogout,
  useListAds,
  useCreateAd,
  useUpdateAd,
  useDeleteAd,
  useToggleAd,
  useUploadAdImage,
  getListAdsQueryKey,
  type Ad
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const PRESET_POSITIONS = [
  { value: "header", label: "Шапка (header)" },
  { value: "sidebar", label: "Сайдбар (sidebar)" },
  { value: "content", label: "В контенте (content)" },
  { value: "footer", label: "Подвал (footer)" },
  { value: "custom", label: "Своё место..." },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: me, isLoading: isLoadingMe, error: authError } = useGetMe({
    query: { retry: false }
  });

  const logoutMutation = useLogout();
  const { data: ads, isLoading: isLoadingAds } = useListAds({
    query: { queryKey: getListAdsQueryKey() }
  });

  const createAd = useCreateAd();
  const updateAd = useUpdateAd();
  const deleteAd = useDeleteAd();
  const toggleAd = useToggleAd();
  const uploadImage = useUploadAdImage();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [positionPreset, setPositionPreset] = useState("sidebar");
  const [customPosition, setCustomPosition] = useState("");
  const [active, setActive] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const isCustomPosition = positionPreset === "custom";
  const effectivePosition = isCustomPosition ? customPosition : positionPreset;

  React.useEffect(() => {
    if (authError || (me && !me.ok)) {
      setLocation("/admin/login");
    }
  }, [authError, me, setLocation]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => setLocation("/admin/login")
    });
  };

  const resetForm = () => {
    setTitle(""); setDescription(""); setLinkUrl(""); setLinkText("");
    setPositionPreset("sidebar"); setCustomPosition(""); setActive(true); setImageUrl("");
  };

  const openNewForm = () => {
    setEditingAd(null);
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (ad: Ad) => {
    setEditingAd(ad);
    setTitle(ad.title);
    setDescription(ad.description);
    setLinkUrl(ad.linkUrl);
    setLinkText(ad.linkText);
    const preset = PRESET_POSITIONS.find(p => p.value === ad.position && p.value !== "custom");
    if (preset) {
      setPositionPreset(ad.position);
      setCustomPosition("");
    } else {
      setPositionPreset("custom");
      setCustomPosition(ad.position);
    }
    setActive(ad.active);
    setImageUrl(ad.imageUrl);
    setIsFormOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setIsUploading(true);
      uploadImage.mutate({ data: { base64, filename: file.name } }, {
        onSuccess: (res) => { setImageUrl(res.url); setIsUploading(false); },
        onError: () => { toast({ variant: "destructive", title: "Ошибка загрузки изображения" }); setIsUploading(false); }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCustomPosition && !customPosition.trim()) {
      toast({ variant: "destructive", title: "Укажите название позиции" });
      return;
    }
    const adData = { title, description, linkUrl, linkText, position: effectivePosition, active, imageUrl };
    if (editingAd) {
      updateAd.mutate({ id: editingAd.id, data: adData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdsQueryKey() });
          setIsFormOpen(false);
          toast({ title: "Баннер обновлён" });
        }
      });
    } else {
      createAd.mutate({ data: adData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdsQueryKey() });
          setIsFormOpen(false);
          toast({ title: "Баннер создан" });
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Удалить этот баннер?")) {
      deleteAd.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAdsQueryKey() });
          toast({ title: "Баннер удалён" });
        }
      });
    }
  };

  const handleToggle = (id: number) => {
    toggleAd.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListAdsQueryKey() })
    });
  };

  if (isLoadingMe) {
    return <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>;
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-4 sm:pb-6 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground">Панель управления</h1>
          <p className="text-sm text-muted-foreground mt-1">Управление рекламными баннерами</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded">
            {me?.role}
          </span>
          <Button variant="outline" onClick={handleLogout} size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10">
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Выйти
          </Button>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg sm:text-xl font-cinzel">Рекламные баннеры</CardTitle>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewForm} size="sm" className="font-bold text-xs sm:text-sm">
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Создать баннер
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-[560px] border-primary/30 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-cinzel text-lg sm:text-xl text-primary">
                  {editingAd ? "Редактировать баннер" : "Новый баннер"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Заголовок</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Описание</Label>
                  <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} required className="min-h-[80px]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="link">URL ссылки</Label>
                    <Input id="link" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkText">Текст кнопки</Label>
                    <Input id="linkText" value={linkText} onChange={(e) => setLinkText(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Позиция на сайте</Label>
                  <Select value={positionPreset} onValueChange={setPositionPreset}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRESET_POSITIONS.map(p => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isCustomPosition && (
                    <div className="mt-2 space-y-1">
                      <Input
                        value={customPosition}
                        onChange={(e) => setCustomPosition(e.target.value)}
                        placeholder="Например: под-шапкой, между-квестами"
                        required={isCustomPosition}
                      />
                      <p className="text-xs text-muted-foreground">
                        Введите уникальное название места для этого баннера. Используйте компонент &lt;AdDisplay position="это-значение"/&gt; на странице.
                      </p>
                    </div>
                  )}
                  {!isCustomPosition && (
                    <p className="text-xs text-muted-foreground">
                      Баннер будет показан в позиции <code className="text-primary bg-primary/10 px-1 rounded">{positionPreset}</code> на всём сайте
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="active" checked={active} onCheckedChange={setActive} />
                  <Label htmlFor="active">Активный</Label>
                </div>

                <div className="space-y-2">
                  <Label>Изображение</Label>
                  <div className="flex items-start gap-3">
                    <div className="w-24 h-18 sm:w-32 sm:h-24 bg-muted border border-border rounded flex items-center justify-center overflow-hidden shrink-0">
                      {imageUrl ? (
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground/50" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs" />
                      <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Или вставьте URL изображения..." className="text-sm" />
                      {isUploading && (
                        <span className="text-xs text-primary flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" /> Загружаем...
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsFormOpen(false)}>Отмена</Button>
                  <Button type="submit" size="sm" disabled={createAd.isPending || updateAd.isPending || isUploading}>
                    {editingAd ? "Сохранить" : "Создать"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoadingAds ? (
            <div className="py-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" /></div>
          ) : !ads || ads.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground text-sm">
              <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-30" />
              Нет добавленных баннеров
            </div>
          ) : (
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px] text-xs">ID</TableHead>
                    <TableHead className="w-[60px] text-xs">Статус</TableHead>
                    <TableHead className="text-xs">Название</TableHead>
                    <TableHead className="text-xs">Позиция</TableHead>
                    <TableHead className="text-right text-xs">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ads.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell className="font-mono text-xs">{ad.id}</TableCell>
                      <TableCell>
                        <button onClick={() => handleToggle(ad.id)} title="Переключить" className="focus:outline-none">
                          {ad.active
                            ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                            : <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                          }
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-xs sm:text-sm">{ad.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-[180px]">{ad.linkUrl}</div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-0.5 bg-muted rounded text-xs font-semibold uppercase">{ad.position}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEditForm(ad)} className="text-primary hover:bg-primary/10 h-7 w-7 sm:h-8 sm:w-8">
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(ad.id)} className="text-destructive hover:bg-destructive/10 h-7 w-7 sm:h-8 sm:w-8 ml-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
