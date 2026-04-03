export type ItemGrade = "D" | "C" | "B" | "A" | "S" | "S80" | "S84" | "No Grade";
export type ItemType = "sword" | "blunt" | "dagger" | "spear" | "bow" | "staff" | "fist" | "dual" | "heavy" | "light" | "robe" | "ring" | "earring" | "necklace" | "shield";

export interface Item {
  id: string;
  name: string;
  nameEn: string;
  grade: ItemGrade;
  type: ItemType;
  category: "weapon" | "armor" | "jewelry" | "shield";
  pAtk?: number;
  mAtk?: number;
  pDef?: number;
  mDef?: number;
  critical?: number;
  atkSpd?: string;
  description: string;
  where: string;
}

export const ITEMS: Item[] = [
  { id: "w1", name: "Короткий меч", nameEn: "Short Sword", grade: "No Grade", type: "sword", category: "weapon", pAtk: 14, mAtk: 0, critical: 4, atkSpd: "375", description: "Короткий одноручный меч. Стандартное оружие начального уровня.", where: "Квест, магазин NPC" },
  { id: "w2", name: "Меч Деймоса (Demon Sword)", nameEn: "Demon Sword", grade: "D", type: "sword", category: "weapon", pAtk: 51, mAtk: 0, critical: 4, atkSpd: "325", description: "Одноручный меч D-грейда с неплохим уроном.", where: "Магазины, крафт D-грейда" },
  { id: "w3", name: "Ятаган (Scimitar)", nameEn: "Scimitar", grade: "C", type: "sword", category: "weapon", pAtk: 81, mAtk: 0, critical: 8, atkSpd: "350", description: "Изогнутый меч C-грейда, высокий крит-шанс.", where: "Крафт, рынок" },
  { id: "w4", name: "Меч Демона (Sword of Valhalla)", nameEn: "Sword of Valhalla", grade: "B", type: "sword", category: "weapon", pAtk: 137, mAtk: 0, critical: 8, atkSpd: "325", description: "Мощный меч B-грейда.", where: "Крафт, рейды" },
  { id: "w5", name: "Стрела Самаэля (Samael's Dark Arrow)", nameEn: "Dark Elven Long Bow", grade: "A", type: "bow", category: "weapon", pAtk: 183, mAtk: 0, critical: 8, atkSpd: "293", description: "Лучшее оружие A-грейда для лучников.", where: "Крафт, магазин (дорого)" },
  { id: "w6", name: "Антарасий Меч (Antharas Slayer Longsword)", nameEn: "Antharas Slayer Longsword", grade: "S", type: "sword", category: "weapon", pAtk: 251, mAtk: 0, critical: 4, atkSpd: "325", description: "Легендарный меч из лута Антараса — один из сильнейших в игре.", where: "Лут с Antharas, крафт S-грейда" },
  { id: "w7", name: "Посох Магии (Staff of Evil Spirits)", nameEn: "Staff of Evil Spirits", grade: "C", type: "staff", category: "weapon", pAtk: 40, mAtk: 183, critical: 4, atkSpd: "377", description: "Хороший посох для магов C-грейда.", where: "Крафт, рынок" },
  { id: "w8", name: "Посох Мага (Wizard's Staff)", nameEn: "Wizard's Staff", grade: "B", type: "staff", category: "weapon", pAtk: 45, mAtk: 245, critical: 4, atkSpd: "377", description: "Усиленный посох B-грейда, отличный для чародеев.", where: "Крафт B-грейда" },
  { id: "w9", name: "Кинжал Рвения (Dagger of Avidity)", nameEn: "Dagger of Avidity", grade: "D", type: "dagger", category: "weapon", pAtk: 44, mAtk: 0, critical: 12, atkSpd: "400", description: "Быстрый кинжал с высоким шансом крита.", where: "Магазин D-грейда" },
  { id: "w10", name: "Копьё Власти (Spear of Rulership)", nameEn: "Spear of Rulership", grade: "A", type: "spear", category: "weapon", pAtk: 208, mAtk: 0, critical: 4, atkSpd: "253", description: "Мощное копьё A-грейда для Warlord и Dreadnought.", where: "Крафт A-грейда, рынок" },

  { id: "a1", name: "Кожаный доспех", nameEn: "Leather Armor", grade: "No Grade", type: "light", category: "armor", pDef: 28, mDef: 0, description: "Базовая лёгкая броня для начального уровня.", where: "NPC магазин" },
  { id: "a2", name: "Кольчуга", nameEn: "Chain Mail", grade: "D", type: "heavy", category: "armor", pDef: 97, mDef: 0, description: "Базовая тяжёлая броня D-грейда.", where: "NPC магазин, крафт" },
  { id: "a3", name: "Рясa Мага (Robe of Magic)", nameEn: "Robe of Magic", grade: "C", type: "robe", category: "armor", pDef: 58, mDef: 38, description: "Мантия для магов C-грейда, повышает M.Def и M.Atk.", where: "Крафт, NPC" },
  { id: "a4", name: "Доспех Рыцаря (Full Plate Armor)", nameEn: "Full Plate Armor", grade: "B", type: "heavy", category: "armor", pDef: 195, mDef: 0, description: "Тяжёлая броня B-грейда — хорошая защита для танков.", where: "Крафт B-грейда" },
  { id: "a5", name: "Dynasty Mail", nameEn: "Dynasty Mail", grade: "S80", type: "heavy", category: "armor", pDef: 311, mDef: 0, description: "Элитная тяжёлая броня S80 с особыми характеристиками.", where: "Крафт S80, Boss loot" },
  { id: "a6", name: "Доспех Пасхального Рыцаря (Icarus Heavy Armor)", nameEn: "Icarus Heavy Armor", grade: "S", type: "heavy", category: "armor", pDef: 295, mDef: 0, description: "Топовый сет тяжёлой брони S-грейда.", where: "Крафт S-грейда, рейды" },

  { id: "j1", name: "Кольцо Бойца (Ring of Protection)", nameEn: "Ring of Protection", grade: "D", type: "ring", category: "jewelry", mDef: 15, description: "Базовое кольцо, даёт бонус к M.Def.", where: "NPC, рынок" },
  { id: "j2", name: "Серьга Байума (Earring of Baium)", nameEn: "Earring of Baium", grade: "S", type: "earring", category: "jewelry", mDef: 52, description: "Эпическая серьга — выпадает с Baium. Одна из лучших в игре.", where: "Лут с Baium" },
  { id: "j3", name: "Серьга Антараса (Earring of Antharas)", nameEn: "Earring of Antharas", grade: "S", type: "earring", category: "jewelry", mDef: 52, description: "Эпическая серьга с Antharas. Даёт бонус к HP и сопротивлению яду.", where: "Лут с Antharas" },
  { id: "j4", name: "Кольцо Квена (Ring of Queen Ant)", nameEn: "Ring of Queen Ant", grade: "A", type: "ring", category: "jewelry", mDef: 43, description: "Кольцо с эпик-босса Queen Ant. Отличная защита.", where: "Лут с Queen Ant" },
  { id: "j5", name: "Ожерелье Валакаса (Necklace of Valakas)", nameEn: "Necklace of Valakas", grade: "S", type: "necklace", category: "jewelry", mDef: 62, description: "Лучшее ожерелье в игре. Дополнительно увеличивает силу умений.", where: "Лут с Valakas" },
  { id: "j6", name: "Кольцо Фрейи (Freya's Ring)", nameEn: "Freya's Ring", grade: "S", type: "ring", category: "jewelry", mDef: 48, description: "Кольцо с Freya. Отличный вариант для магов.", where: "Серия квестов Freya" },
];

export const GRADES: ItemGrade[] = ["No Grade", "D", "C", "B", "A", "S", "S80", "S84"];
export const CATEGORIES = ["weapon", "armor", "jewelry", "shield"] as const;
