export interface Skill {
  id: string;
  name: string;
  nameEn: string;
  type: "active" | "passive" | "toggle";
  level: number;
  mp: number;
  reuse: string;
  description: string;
  classes: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  nameEn: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "warrior",
    name: "Воин / Гладиатор",
    nameEn: "Warrior / Gladiator",
    skills: [
      { id: "s1", name: "Двойной удар", nameEn: "Dual Strike", type: "active", level: 1, mp: 12, reuse: "3 сек", description: "Наносит два быстрых удара мечом, суммарный урон 200% от P.Atk.", classes: ["Гладиатор", "Дуэлянт"] },
      { id: "s2", name: "Вихрь клинков", nameEn: "Blade Flurry", type: "active", level: 40, mp: 24, reuse: "8 сек", description: "AoE атака мечом — поражает всех врагов в радиусе 200. Урон 150% от P.Atk.", classes: ["Гладиатор", "Дуэлянт"] },
      { id: "s3", name: "Сокрушительный удар", nameEn: "Crushing Strike", type: "active", level: 20, mp: 18, reuse: "5 сек", description: "Мощный удар с шансом оглушить цель на 2 секунды.", classes: ["Воин", "Гладиатор"] },
      { id: "s4", name: "Боевой дух", nameEn: "Battle Roar", type: "active", level: 30, mp: 30, reuse: "120 сек", description: "Повышает ATK всей группы в радиусе 900 на 10% в течение 2 минут.", classes: ["Воин", "Гладиатор", "Дуэлянт"] },
      { id: "s5", name: "Мастерство двойных мечей", nameEn: "Dual Sword Mastery", type: "passive", level: 40, mp: 0, reuse: "—", description: "Пассивно увеличивает урон при использовании двух мечей на 15%.", classes: ["Гладиатор", "Дуэлянт"] },
      { id: "s6", name: "Непоколебимость", nameEn: "Fortitude", type: "passive", level: 1, mp: 0, reuse: "—", description: "Значительно снижает шанс получить Stun и Knockback.", classes: ["Гладиатор", "Дуэлянт"] },
    ]
  },
  {
    id: "knight",
    name: "Рыцарь / Паладин / Танк",
    nameEn: "Knight / Paladin / Tank",
    skills: [
      { id: "k1", name: "Щит веры", nameEn: "Shield of Faith", type: "active", level: 20, mp: 45, reuse: "60 сек", description: "Создаёт магический щит, поглощающий 500 единиц урона в течение 30 секунд.", classes: ["Паладин", "Рыцарь Феникса"] },
      { id: "k2", name: "Провокация", nameEn: "Provoke", type: "active", level: 1, mp: 8, reuse: "4 сек", description: "Заставляет цель атаковать вас. Обязательный скилл танка.", classes: ["Рыцарь", "Паладин", "Тёмный Мститель"] },
      { id: "k3", name: "Аура ненависти", nameEn: "Hate Aura", type: "toggle", level: 40, mp: 6, reuse: "—", description: "Пассивно генерирует угрозу (hate) для всех врагов в радиусе 400.", classes: ["Паладин", "Тёмный Мститель"] },
      { id: "k4", name: "Благословение Феникса", nameEn: "Phoenix Blessing", type: "active", level: 76, mp: 60, reuse: "300 сек", description: "Накладывает на союзника эффект воскрешения. При смерти — мгновенно воскресает.", classes: ["Рыцарь Феникса"] },
      { id: "k5", name: "Бастион брони", nameEn: "Armor Mastery", type: "passive", level: 1, mp: 0, reuse: "—", description: "Увеличивает P.Def при ношении тяжёлой брони на 20%.", classes: ["Рыцарь", "Паладин", "Тёмный Мститель"] },
      { id: "k6", name: "Щит-удар", nameEn: "Shield Bash", type: "active", level: 10, mp: 15, reuse: "8 сек", description: "Атака щитом — оглушает цель на 2 секунды.", classes: ["Рыцарь", "Паладин"] },
    ]
  },
  {
    id: "archer",
    name: "Лучник / Рейнджер",
    nameEn: "Archer / Ranger",
    skills: [
      { id: "a1", name: "Разящая стрела", nameEn: "Aimed Shot", type: "active", level: 1, mp: 10, reuse: "4 сек", description: "Прицельный выстрел с дополнительным уроном +150% P.Atk. Шанс крит увеличен.", classes: ["Ястребиный Глаз", "Сагиттариус", "Серебряный Рейнджер"] },
      { id: "a2", name: "Дождь стрел", nameEn: "Arrow Rain", type: "active", level: 40, mp: 32, reuse: "12 сек", description: "AoE выстрел — поражает несколько целей в зоне. Идеально для фарма.", classes: ["Ястребиный Глаз", "Сагиттариус"] },
      { id: "a3", name: "Отравленная стрела", nameEn: "Venomous Arrow", type: "active", level: 20, mp: 14, reuse: "5 сек", description: "Стрела, отравляющая цель на 30 секунд. Снимает регенерацию HP.", classes: ["Ястребиный Глаз", "Разведчик"] },
      { id: "a4", name: "Зоркий глаз", nameEn: "Keen Eye", type: "passive", level: 1, mp: 0, reuse: "—", description: "Увеличивает дальность атаки лучника на 100 единиц.", classes: ["Ястребиный Глаз", "Сагиттариус"] },
      { id: "a5", name: "Критический удар", nameEn: "Critical Power", type: "passive", level: 30, mp: 0, reuse: "—", description: "Увеличивает урон от критических ударов на 30%.", classes: ["Ястребиный Глаз", "Сагиттариус", "Разведчик"] },
    ]
  },
  {
    id: "mage",
    name: "Маг / Чародей",
    nameEn: "Mage / Sorcerer",
    skills: [
      { id: "m1", name: "Огненный шар", nameEn: "Blaze", type: "active", level: 1, mp: 20, reuse: "3 сек", description: "Бросает огненный шар, наносящий урон от огня. Может поджечь цель.", classes: ["Маг", "Чародей", "Архмаг"] },
      { id: "m2", name: "Заморозка", nameEn: "Freezing Shackle", type: "active", level: 20, mp: 35, reuse: "6 сек", description: "Сковывает цель льдом — полная остановка на 3 секунды.", classes: ["Чародей", "Архмаг"] },
      { id: "m3", name: "Молния", nameEn: "Lightning Strike", type: "active", level: 40, mp: 50, reuse: "10 сек", description: "Мощный удар молнией с шансом оглушить цель.", classes: ["Чародей", "Архмаг"] },
      { id: "m4", name: "Ускорение заклятий", nameEn: "Spell Quicken", type: "toggle", level: 30, mp: 8, reuse: "—", description: "В режиме переключателя ускоряет применение заклинаний за счёт MP.", classes: ["Маг", "Чародей", "Архмаг"] },
      { id: "m5", name: "Огненная буря", nameEn: "Prominence", type: "active", level: 76, mp: 90, reuse: "15 сек", description: "Мощнейшее AoE заклинание огня. Огромный урон по всем врагам в зоне.", classes: ["Архмаг"] },
      { id: "m6", name: "Усиление магии", nameEn: "Magic Amplification", type: "passive", level: 1, mp: 0, reuse: "—", description: "Пассивно усиливает M.Atk на 5% за каждый уровень навыка.", classes: ["Маг", "Чародей", "Архмаг"] },
    ]
  },
  {
    id: "healer",
    name: "Хилер / Поддержка",
    nameEn: "Healer / Support",
    skills: [
      { id: "h1", name: "Малое исцеление", nameEn: "Heal", type: "active", level: 1, mp: 18, reuse: "1 сек", description: "Восстанавливает 200-400 HP цели. Основное умение хилера.", classes: ["Жрец", "Епископ", "Кардинал"] },
      { id: "h2", name: "Великое исцеление", nameEn: "Greater Heal", type: "active", level: 40, mp: 55, reuse: "3 сек", description: "Мощное исцеление — восстанавливает 800-1500 HP. Требует сосредоточения.", classes: ["Епископ", "Кардинал"] },
      { id: "h3", name: "Воскрешение", nameEn: "Resurrection", type: "active", level: 20, mp: 120, reuse: "60 сек", description: "Воскрешает мёртвого союзника с 50% XP (меньше потерь от смерти).", classes: ["Епископ", "Кардинал", "Жрец"] },
      { id: "h4", name: "Щит Эвы", nameEn: "Eva's Shield", type: "active", level: 60, mp: 70, reuse: "30 сек", description: "Накладывает силовой щит на союзника — поглощает большой урон.", classes: ["Кардинал", "Эвас Сент"] },
      { id: "h5", name: "Баф силы", nameEn: "Blessing of the Body", type: "active", level: 1, mp: 25, reuse: "30 сек", description: "Увеличивает максимальное HP союзника на 20% на 20 минут.", classes: ["Жрец", "Епископ", "Кардинал"] },
    ]
  },
  {
    id: "buffer",
    name: "Баффер / Пророк",
    nameEn: "Buffer / Prophet",
    skills: [
      { id: "b1", name: "Благословение тела", nameEn: "Bless Body", type: "active", level: 1, mp: 22, reuse: "30 сек", description: "Увеличивает CON и максимальное HP на 20 минут.", classes: ["Пророк", "Иерофант"] },
      { id: "b2", name: "Благословение щита", nameEn: "Shield", type: "active", level: 1, mp: 20, reuse: "30 сек", description: "Увеличивает P.Def союзника на 20% на 20 минут.", classes: ["Пророк", "Иерофант"] },
      { id: "b3", name: "Мощь воина", nameEn: "Might", type: "active", level: 1, mp: 22, reuse: "30 сек", description: "Увеличивает P.Atk союзника на 20% на 20 минут.", classes: ["Пророк", "Иерофант", "Кардинал"] },
      { id: "b4", name: "Боевое бешенство", nameEn: "Berserker Spirit", type: "active", level: 40, mp: 45, reuse: "60 сек", description: "Усиливает всю группу — +15% к P.Atk, -15% к P.Def на 5 минут.", classes: ["Пророк", "Иерофант"] },
      { id: "b5", name: "Безвременная гибель", nameEn: "Death Whisper", type: "active", level: 20, mp: 30, reuse: "30 сек", description: "Увеличивает шанс крита союзника на 30% на 20 минут.", classes: ["Иерофант", "Пророк"] },
      { id: "b6", name: "Ускорение", nameEn: "Haste", type: "active", level: 10, mp: 20, reuse: "30 сек", description: "Увеличивает скорость атаки союзника на 20% на 20 минут.", classes: ["Пророк", "Иерофант"] },
    ]
  },
];
