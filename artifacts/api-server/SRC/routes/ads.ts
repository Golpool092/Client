import { Router } from "express";
import { db, adsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const uploadDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `ad-${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"));
  },
});

function isAdmin(req: any): boolean {
  return req.session?.authenticated === true;
}

function formatAd(ad: any) {
  return {
    ...ad,
    pages: ad.pages ?? [],
    displayMode: ad.displayMode ?? "all-pages",
    deviceTarget: ad.deviceTarget ?? "all",
    expiresAt: ad.expiresAt ? ad.expiresAt.toISOString() : null,
    createdAt: ad.createdAt.toISOString(),
    updatedAt: ad.updatedAt.toISOString(),
  };
}

router.post("/upload-image", (req: any, res: any) => {
  if (!isAdmin(req)) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  upload.single("image")(req, res, (err: any) => {
    if (err) {
      res.status(400).json({ error: err.message || "Upload failed" });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const imageUrl = `/api/ads/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  });
});

router.get("/uploads/:filename", (req: any, res: any) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "File not found" });
    return;
  }
  res.sendFile(filePath);
});

router.get("/", async (req, res) => {
  try {
    const { page, position, device } = req.query as { page?: string; position?: string; device?: string };

    let allAds = await db.select().from(adsTable).where(eq(adsTable.active, true));

    const now = new Date();
    allAds = allAds.filter(ad => !ad.expiresAt || ad.expiresAt > now);

    if (page) {
      allAds = allAds.filter(ad => {
        if (ad.displayMode === "all-pages") return true;
        return ad.pages && ad.pages.includes(page);
      });
    }

    if (position) {
      allAds = allAds.filter(ad => ad.position === position);
    }

    if (device) {
      allAds = allAds.filter(ad => {
        const target = (ad as any).deviceTarget ?? "all";
        return target === "all" || target === device;
      });
    }

    res.json(allAds.map(formatAd));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all", async (req, res) => {
  if (!isAdmin(req)) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  try {
    const allAds = await db.select().from(adsTable);
    res.json(allAds.map(formatAd));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  if (!isAdmin(req)) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  try {
    const body = req.body as any;
    const [created] = await db.insert(adsTable).values({
      title: body.title,
      description: body.description ?? null,
      imageUrl: body.imageUrl ?? null,
      linkUrl: body.linkUrl ?? null,
      linkText: body.linkText ?? null,
      position: body.position ?? "sidebar-top",
      active: body.active !== undefined ? body.active : true,
      displayMode: body.displayMode ?? "all-pages",
      pages: body.pages ?? [],
      maxShows: body.maxShows ?? null,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    }).returning();
    res.status(201).json(formatAd(created));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [ad] = await db.select().from(adsTable).where(eq(adsTable.id, id));
    if (!ad) {
      res.status(404).json({ error: "Ad not found" });
      return;
    }
    res.json(formatAd(ad));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  if (!isAdmin(req)) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  try {
    const id = parseInt(req.params.id, 10);
    const body = req.body as any;
    const update: any = { updatedAt: new Date() };

    if (body.title !== undefined) update.title = body.title;
    if (body.description !== undefined) update.description = body.description;
    if (body.imageUrl !== undefined) update.imageUrl = body.imageUrl;
    if (body.linkUrl !== undefined) update.linkUrl = body.linkUrl;
    if (body.linkText !== undefined) update.linkText = body.linkText;
    if (body.position !== undefined) update.position = body.position;
    if (body.active !== undefined) update.active = body.active;
    if (body.displayMode !== undefined) update.displayMode = body.displayMode;
    if (body.pages !== undefined) update.pages = body.pages;
    if (body.maxShows !== undefined) update.maxShows = body.maxShows;
    if (body.expiresAt !== undefined) update.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;

    const [updated] = await db.update(adsTable).set(update).where(eq(adsTable.id, id)).returning();
    if (!updated) {
      res.status(404).json({ error: "Ad not found" });
      return;
    }
    res.json(formatAd(updated));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  if (!isAdmin(req)) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  try {
    const id = parseInt(req.params.id, 10);
    const [deleted] = await db.delete(adsTable).where(eq(adsTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: "Ad not found" });
      return;
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id/toggle", async (req, res) => {
  if (!isAdmin(req)) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  try {
    const id = parseInt(req.params.id, 10);
    const [ad] = await db.select().from(adsTable).where(eq(adsTable.id, id));
    if (!ad) {
      res.status(404).json({ error: "Ad not found" });
      return;
    }
    const [updated] = await db.update(adsTable).set({ active: !ad.active, updatedAt: new Date() }).where(eq(adsTable.id, id)).returning();
    res.json(formatAd(updated));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
