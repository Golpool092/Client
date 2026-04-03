import { Router } from "express";
import { db, adsTable } from "@workspace/db";
import { eq, and, or, arrayContains } from "drizzle-orm";

const router = Router();

function isAdmin(req: any): boolean {
  return req.session?.authenticated === true;
}

function formatAd(ad: any) {
  return {
    ...ad,
    pages: ad.pages ?? [],
    displayMode: ad.displayMode ?? "all-pages",
    expiresAt: ad.expiresAt ? ad.expiresAt.toISOString() : null,
    createdAt: ad.createdAt.toISOString(),
    updatedAt: ad.updatedAt.toISOString(),
  };
}

router.get("/", async (req, res) => {
  try {
    const { page, position } = req.query as { page?: string; position?: string };
    
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
