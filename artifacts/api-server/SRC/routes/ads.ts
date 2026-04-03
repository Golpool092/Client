import { Router } from "express";
import { db, adsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { sessions } from "./auth";
import { CreateAdBody, UpdateAdBody } from "@workspace/api-zod";
import fs from "fs";
import path from "path";

const router = Router();

function requireAdmin(req: any, res: any, next: any) {
  const token = req.cookies?.admin_token;
  if (token && sessions.has(token)) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

function formatAd(ad: any) {
  return {
    id: ad.id,
    title: ad.title,
    description: ad.description,
    imageUrl: ad.imageUrl,
    linkUrl: ad.linkUrl,
    linkText: ad.linkText,
    position: ad.position,
    active: ad.active,
    createdAt: ad.createdAt?.toISOString() ?? new Date().toISOString(),
  };
}

router.get("/ads", async (req, res) => {
  try {
    const ads = await db.select().from(adsTable).orderBy(adsTable.id);
    res.json(ads.map(formatAd));
  } catch (err) {
    req.log.error({ err }, "Failed to list ads");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/ads", requireAdmin, async (req, res) => {
  const parsed = CreateAdBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  try {
    const [ad] = await db.insert(adsTable).values({
      title: parsed.data.title,
      description: parsed.data.description,
      imageUrl: parsed.data.imageUrl,
      linkUrl: parsed.data.linkUrl,
      linkText: parsed.data.linkText,
      position: parsed.data.position,
      active: parsed.data.active,
    }).returning();
    res.status(201).json(formatAd(ad));
  } catch (err) {
    req.log.error({ err }, "Failed to create ad");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/ads/upload-image", requireAdmin, (req, res) => {
  res.json({ url: "" });
});

router.post("/ads/upload-image", requireAdmin, async (req, res) => {
  const parsed = req.body;
  if (!parsed.base64 || !parsed.filename) {
    res.status(400).json({ error: "base64 and filename required" });
    return;
  }
  try {
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const ext = path.extname(parsed.filename) || ".png";
    const name = `${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, name);
    const base64Data = parsed.base64.replace(/^data:[^;]+;base64,/, "");
    fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
    res.json({ url: `/api/ads/images/${name}` });
  } catch (err) {
    req.log.error({ err }, "Failed to upload image");
    res.status(500).json({ error: "Upload failed" });
  }
});

router.get("/ads/images/:name", (req, res) => {
  const uploadsDir = path.join(process.cwd(), "uploads");
  const filePath = path.join(uploadsDir, req.params.name);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

router.get("/ads/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  try {
    const [ad] = await db.select().from(adsTable).where(eq(adsTable.id, id));
    if (!ad) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(formatAd(ad));
  } catch (err) {
    req.log.error({ err }, "Failed to get ad");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/ads/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const parsed = UpdateAdBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  try {
    const [ad] = await db.update(adsTable).set({
      title: parsed.data.title,
      description: parsed.data.description,
      imageUrl: parsed.data.imageUrl,
      linkUrl: parsed.data.linkUrl,
      linkText: parsed.data.linkText,
      position: parsed.data.position,
      active: parsed.data.active,
    }).where(eq(adsTable.id, id)).returning();
    if (!ad) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(formatAd(ad));
  } catch (err) {
    req.log.error({ err }, "Failed to update ad");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/ads/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  try {
    await db.delete(adsTable).where(eq(adsTable.id, id));
    res.json({ message: "Deleted" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete ad");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/ads/:id/toggle", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  try {
    const [current] = await db.select().from(adsTable).where(eq(adsTable.id, id));
    if (!current) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const [ad] = await db.update(adsTable).set({ active: !current.active }).where(eq(adsTable.id, id)).returning();
    res.json(formatAd(ad));
  } catch (err) {
    req.log.error({ err }, "Failed to toggle ad");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
