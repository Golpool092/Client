export interface Item {
  id: string;
  name: string;
  nameEn: string;
  grade: "D" | "C" | "B" | "A" | "S" | "S80" | "S84" | "No Grade" | "Special";
  type: "weapon" | "armor" | "jewelry" | "etc" | "consumable";
  subtype?: string;
  pAtk?: number;
  mAtk?: number;
  pDef?: number;
  mDef?: number;
  slotsHp?: number;
  description: string;
  classes: string;
  price?: string;
}

export interface ItemCategory {
  id: string;
  name: string;
  items: Item[];
}

export const ITEM_CATEGORIES: ItemCategory[] = [
  {
    id: "weapon-s",
    name: "Оружие S-грейд",
    items: [
      { id: "w1", name: "Tallum Blade (двойной меч)", nameEn: "Tallum Blade", grade: "S", type: "weapon", subtype: "Двойной меч", pAtk: 284, mAtk: 137, description: "Один из лучших двойных мечей S-грейда. Отлично подходит для Дуэлянтов.", classes: "Дуэлянт, Гладиатор", price: "~200kk Adena" },
      { id: "w2", name: "Dragon Hunter Axe", nameEn: "Dragon Hunter Axe", grade: "S", type: "weapon", subtype: "Боевой топор", pAtk: 344, mAtk: 137, description: "Топор охотника на драконов. Мощное оружие для воинов S-грейда.", classes: "Воин, Дредноут", price: "~300kk Adena" },
      { id: "w3", name: "Arcana Mace", nameEn: "Arcana Mace", grade: "S", type: "weapon", subtype: "Жезл", pAtk: 183, mAtk: 231, description: "Аркановый жезл — оружие магов высшего уровня. Высокий M.Atk.", classes: "Маг, Хилер, Баффер", price: "~250kk Adena" },
      { id: "w4", name: "Draconic Bow", nameEn: "Draconic Bow", grade: "S", type: "weapon", subtype: "Лук", pAtk: 378, mAtk: 137, description: "Лук из драконьей кости. Наиболее мощный лук S-грейда.", classes: "Сагиттариус, Лунный Страж", price: "~280kk Adena" },
      { id: "w5", name: "Forgotten Blade", nameEn: "Forgotten Blade", grade: "S", type: "weapon", subtype: "Одноручный меч", pAtk: 325, mAtk: 137, description: "Забытый клинок — легендарный меч высшей силы.", classes: "Все воины S", price: "~350kk Adena" },
      { id: "w6", name: "Imperial Staff", nameEn: "Imperial Staff", grade: "S", type: "weapon", subtype: "Посох", pAtk: 122, mAtk: 295, description: "Императорский посох — лучший посох для магов.", classes: "Маги S-грейда", price: "~320kk Adena" },
    ]
  },
  {
    id: "weapon-a",
    name: "Оружие A-грейд",
    items: [
      { id: "wa1", name: "Damascus Sword", nameEn: "Damascus Sword", grade: "A", type: "weapon", subtype: "Одноручный меч", pAtk: 236, mAtk: 103, description: "Дамасский меч — надёжное оружие A-грейда.", classes: "Воины", price: "~30kk Adena" },
      { id: "wa2", name: "Branch of the Mother Tree", nameEn: "Branch of the Mother Tree", grade: "A", type: "weapon", subtype: "Лук", pAtk: 278, mAtk: 103, description: "Ветвь Дерева Матери — лучший лук A-грейда.", classes: "Лучники", price: "~45kk Adena" },
      { id: "wa3", name: "Wizard's Tear", nameEn: "Wizard's Tear", grade: "A", type: "weapon", subtype: "Посох", pAtk: 92, mAtk: 215, description: "Слеза мага — отличный посох A-грейда.", classes: "Маги", price: "~40kk Adena" },
      { id: "wa4", name: "Meteor Shower", nameEn: "Meteor Shower", grade: "A", type: "weapon", subtype: "Жезл", pAtk: 140, mAtk: 172, description: "Метеоритный ливень — мощный жезл для магов ближнего боя.", classes: "Маги, Хилеры", price: "~35kk Adena" },
    ]
  },
  {
    id: "armor-s",
    name: "Броня S-грейд",
    items: [
      { id: "armor1", name: "Imperial Crusader Heavy", nameEn: "Imperial Crusader", grade: "S", type: "armor", subtype: "Тяжёлая броня", pDef: 294, mDef: 0, description: "Тяжёлая имперская броня крестоносца. Максимальная физическая защита.", classes: "Танки, Воины S", price: "~500kk Adena (сет)" },
      { id: "armor2", name: "Draconic Leather Armor", nameEn: "Draconic Leather", grade: "S", type: "armor", subtype: "Лёгкая броня", pDef: 239, mDef: 0, description: "Драконья кожаная броня — лучший вариант для лучников и разведчиков.", classes: "Лучники, Следопыты S", price: "~400kk Adena (сет)" },
      { id: "armor3", name: "Arcana Robe", nameEn: "Arcana Robe", grade: "S", type: "armor", subtype: "Мантия", pDef: 173, mDef: 94, description: "Аркановые мантии — лучшая защита для магов S-грейда. Повышают M.Def.", classes: "Маги, Хилеры, Баффер S", price: "~450kk Adena (сет)" },
    ]
  },
  {
    id: "armor-a",
    name: "Броня A-грейд",
    items: [
      { id: "armor4", name: "Dark Crystal Heavy", nameEn: "Dark Crystal Heavy", grade: "A", type: "armor", subtype: "Тяжёлая броня", pDef: 238, mDef: 0, description: "Тяжёлая броня из тёмного кристалла. Популярный сет A-грейда.", classes: "Танки, Воины A", price: "~80kk Adena (сет)" },
      { id: "armor5", name: "Nightmare Leather", nameEn: "Nightmare Leather", grade: "A", type: "armor", subtype: "Лёгкая броня", pDef: 193, mDef: 0, description: "Кошмарная кожаная броня — легкий A-грейд для ловкачей.", classes: "Лучники, Ассасины A", price: "~70kk Adena (сет)" },
      { id: "armor6", name: "Tallum Robe", nameEn: "Tallum Robe", grade: "A", type: "armor", subtype: "Мантия", pDef: 140, mDef: 77, description: "Мантия Таллума — стандартные мантии A-грейда для магов.", classes: "Маги A", price: "~75kk Adena (сет)" },
    ]
  },
  {
    id: "jewelry",
    name: "Украшения / Аксессуары",
    items: [
      { id: "j1", name: "Baium's Ring", nameEn: "Baium's Ring", grade: "S", type: "jewelry", subtype: "Кольцо", description: "Кольцо Байюма — одно из лучших колец. Даёт +STR, +CON, +DEX. Дроп с Байюма.", classes: "Все классы", price: "Бесценно / ~500kk+" },
      { id: "j2", name: "Antharas's Earring", nameEn: "Antharas's Earring", grade: "S", type: "jewelry", subtype: "Серьга", description: "Серьга Антараса — мощный аксессуар с бонусами к MAX HP, P.Def.", classes: "Все классы", price: "Бесценно / ~600kk+" },
      { id: "j3", name: "Valakas's Necklace", nameEn: "Valakas's Necklace", grade: "S", type: "jewelry", subtype: "Ожерелье", description: "Ожерелье Валакаса — лучшее ожерелье игры. Бонусы к огромному количеству статов.", classes: "Все классы", price: "Бесценно / ~1kk+" },
      { id: "j4", name: "Ring of Queen Ant", nameEn: "Ring of Queen Ant", grade: "A", type: "jewelry", subtype: "Кольцо", description: "Кольцо Королевы Муравьёв — доступное кольцо с хорошими бонусами. Дроп с Queen Ant.", classes: "Все классы", price: "~50kk" },
      { id: "j5", name: "Earring of Orfen", nameEn: "Earring of Orfen", grade: "A", type: "jewelry", subtype: "Серьга", description: "Серьга Орфен — популярная серьга, даёт регенерацию MP и бонус M.Atk.", classes: "Маги, Хилеры", price: "~60kk" },
      { id: "j6", name: "Necklace of Frintezza", nameEn: "Necklace of Frintezza", grade: "S", type: "jewelry", subtype: "Ожерелье", description: "Ожерелье Фринтеззы — отличное ожерелье с бонусом к магической атаке.", classes: "Маги, Хилеры", price: "~150kk" },
    ]
  },
  {
    id: "consumable",
    name: "Расходники / Свитки",
    items: [
      { id: "c1", name: "Greater Healing Potion", nameEn: "Greater Healing Potion", grade: "No Grade", type: "consumable", description: "Зелье лечения — восстанавливает 350 HP. Базовый расходник.", classes: "Все", price: "~100 Adena" },
      { id: "c2", name: "Scroll: Enchant Weapon (S)", nameEn: "Scroll: Enchant Weapon (S)", grade: "S", type: "consumable", description: "Свиток зачарования оружия S-грейда. +1 к зачарованию. Шанс провала.", classes: "Все", price: "~300kk+" },
      { id: "c3", name: "Blessed Scroll: Enchant Weapon (S)", nameEn: "Blessed Scroll: Enchant Weapon (S)", grade: "S", type: "consumable", description: "Благословлённый свиток зачарования S — при провале оружие не ломается.", classes: "Все", price: "~700kk+" },
      { id: "c4", name: "Life Stone (High Grade)", nameEn: "Life Stone (High Grade)", grade: "Special", type: "consumable", description: "Камень жизни высокого уровня — вставляется в SA кристалл для активации свойств оружия.", classes: "Все", price: "~10kk" },
      { id: "c5", name: "Ancient Book: Divine Inspiration", nameEn: "Ancient Book: Divine Inspiration", grade: "Special", type: "consumable", description: "Книга Вдохновения — обучает дополнительным ячейкам баффов. До 4 дополнительных слотов.", classes: "Все классы с баффами", price: "~500kk за последнюю книгу" },
    ]
  }
];
