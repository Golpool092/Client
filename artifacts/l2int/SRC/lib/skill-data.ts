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
    name: "Воин / Гладиатор / Дуэлянт",
    nameEn: "Warrior / Gladiator / Duelist",
    skills: [
      { id: "s1", name: "Двойной удар", nameEn: "Dual Strike", type: "active", level: 1, mp: 12, reuse: "3 сек", description: "Наносит два быстрых удара мечом, суммарный урон 200% от P.Atk.", classes: ["Гладиатор", "Дуэлянт"] },
      { id: "s2", name: "Вихрь клинков", nameEn: "Blade Flurry", type: "active", level: 40, mp: 24, reuse: "8 сек", description: "AoE атака мечом — поражает всех врагов в радиусе 200. Урон 150% от P.Atk.", classes: ["Гладиатор", "Дуэлянт"] },
      { id: "s3", name: "Сокрушительный удар", nameEn: "Crushing Strike", type: "active", level: 20, mp: 18, reuse: "5 сек", description: "Мощный удар с шансом оглушить цель на 2 секунды.", classes: ["Воин", "Гладиатор"] },
      { id: "s4", name: "Боевой дух", nameEn: "Battle Roar", type: "active", level: 30, mp: 30, reuse: "120 сек", description: "Повышает P.Atk всей группы в радиусе 900 на 10% в течение 2 минут.", classes: ["Воин", "Гладиатор", "Дуэлянт"] },
      { id: "s5", name: "Мастерство двойных мечей", nameEn: "Dual Sword Mastery", type: "passive", level: 40, mp: 0, reuse: "—", description: "Пассивно увеличивает урон при использовании двух мечей на 15%.", classes: ["Гладиатор", "Дуэлянт"] },
      { id: "s6", name: "Непоколебимость", nameEn: "Fortitude", type: "passive", level: 1, mp: 0, reuse: "—", description: "Значительно снижает шанс получить Stun и Knockback.", classes: ["Гладиатор", "Дуэлянт"] },
      { id: "s7", name: "Вихрь (Whirlwind)", nameEn: "Whirlwind", type: "active", level: 40, mp: 36, reuse: "15 сек", description: "Мощная AoE атака по кругу с уроном 200% P.Atk. Только для двойных мечей.", classes: ["Дуэлянт"] },
      { id: "s8", name: "Дуэль", nameEn: "Duel", type: "active", level: 77, mp: 55, reuse: "120 сек", description: "Вызывает цель на дуэль. В период дуэли оба противника не могут атаковать других.", classes: ["Дуэлянт"] },
    ]
  },
  {
    id: "knight",
    name: "Рыцарь / Паладин / Танк",
    nameEn: "Knight / Paladin / Tank",
    skills: [
      { id: "k1", name: "Щитовой удар", nameEn: "Shield Slam", type: "active", level: 10, mp: 14, reuse: "5 сек", description: "Удар щитом с шансом оглушить цель. Требует щит в руках.", classes: ["Паладин", "Тёмный Мститель"] },
      { id: "k2", name: "Вызов агрессии", nameEn: "Aggression", type: "active", level: 1, mp: 24, reuse: "4 сек", description: "Вызывает агрессию монстра или игрока, перетягивая на себя атаку.", classes: ["Паладин", "Тёмный Мститель"] },
      { id: "k3", name: "Щитовая Фортеция", nameEn: "Fortify", type: "active", level: 40, mp: 0, reuse: "300 сек", description: "Резко повышает защиту щита на 30 секунд. Снижает собственную атаку.", classes: ["Паладин"] },
      { id: "k4", name: "Барьер", nameEn: "Blocking", type: "toggle", level: 30, mp: 5, reuse: "—", description: "Переключение в режим блокировки — высокий шанс блока щитом, снижение скорости.", classes: ["Паладин", "Тёмный Мститель"] },
      { id: "k5", name: "Аура Паладина", nameEn: "Holy Aura", type: "active", level: 56, mp: 45, reuse: "60 сек", description: "Создаёт святую ауру вокруг паладина, нанося урон нежити и усиливая союзников.", classes: ["Паладин"] },
      { id: "k6", name: "Обет Защиты", nameEn: "Vow of Protection", type: "active", level: 40, mp: 36, reuse: "30 сек", description: "Баффает всю группу защитным заклятьем на 2 минуты. P.Def +20%.", classes: ["Рыцарь Феникса"] },
    ]
  },
  {
    id: "archer",
    name: "Лучник / Рейнджер",
    nameEn: "Archer / Ranger",
    skills: [
      { id: "a1", name: "Точный выстрел", nameEn: "Rapid Shot", type: "active", level: 1, mp: 8, reuse: "2 сек", description: "Быстрый выстрел со скоростью выше обычного. Урон 110% от P.Atk.", classes: ["Ястреб", "Сагиттариус"] },
      { id: "a2", name: "Снайперский выстрел", nameEn: "Snipe", type: "active", level: 40, mp: 30, reuse: "15 сек", description: "Дальний выстрел с уроном 300% P.Atk. Дальность +50%.", classes: ["Ястреб", "Сагиттариус"] },
      { id: "a3", name: "Дождь стрел", nameEn: "Arrow Rain", type: "active", level: 30, mp: 36, reuse: "12 сек", description: "AoE выстрел стрелами по площади — поражает всех врагов в конусе перед персонажем.", classes: ["Ястреб", "Сагиттариус"] },
      { id: "a4", name: "Стрела Охоты", nameEn: "Hunter's Arrow", type: "active", level: 20, mp: 16, reuse: "5 сек", description: "Выстрел с эффектом замедления цели на 10 секунд.", classes: ["Серебряный Рейнджер"] },
      { id: "a5", name: "Мастерство лука", nameEn: "Bow Mastery", type: "passive", level: 1, mp: 0, reuse: "—", description: "Пассивно увеличивает урон луком на 10%. Снижает штраф за расстояние.", classes: ["Ястреб", "Сагиттариус", "Серебряный Рейнджер"] },
    ]
  },
  {
    id: "mage",
    name: "Маг / Волшебник / Некромант",
    nameEn: "Mage / Sorcerer / Necromancer",
    skills: [
      { id: "m1", name: "Огненный шар", nameEn: "Prominence", type: "active", level: 1, mp: 29, reuse: "3 сек", description: "Выстреливает огненным шаром. Урон от M.Atk. Базовый скилл мага огня.", classes: ["Волшебник", "Маг Огня"] },
      { id: "m2", name: "Огненная буря", nameEn: "Hydro Blast", type: "active", level: 40, mp: 86, reuse: "8 сек", description: "Мощный удар магией огня по одной цели. Урон 600%+ от M.Atk.", classes: ["Маг Огня", "Архмаг"] },
      { id: "m3", name: "Ледяная стрела", nameEn: "Ice Dagger", type: "active", level: 20, mp: 40, reuse: "5 сек", description: "Пронзает цель ледяным копьём, замедляя на 10 секунд.", classes: ["Эльф-волшебник"] },
      { id: "m4", name: "Воды смерти", nameEn: "Death Spike", type: "active", level: 40, mp: 55, reuse: "5 сек", description: "Атака силой смерти, игнорирует часть M.Def цели.", classes: ["Некромант", "Похититель душ"] },
      { id: "m5", name: "Призыв нежити", nameEn: "Summon Zombie", type: "active", level: 40, mp: 80, reuse: "120 сек", description: "Призывает зомби-прислужника, который атакует врагов.", classes: ["Некромант"] },
      { id: "m6", name: "Ослабление", nameEn: "Weaken", type: "active", level: 20, mp: 32, reuse: "8 сек", description: "Снижает все статы цели на 10% на 30 секунд.", classes: ["Волшебник", "Маг Огня"] },
      { id: "m7", name: "Магический крит", nameEn: "Magic Crit. Rate", type: "passive", level: 40, mp: 0, reuse: "—", description: "Пассивно увеличивает шанс магического крита на 10%.", classes: ["Архмаг"] },
    ]
  },
  {
    id: "healer",
    name: "Хилер / Жрец / Поддержка",
    nameEn: "Healer / Priest / Support",
    skills: [
      { id: "h1", name: "Лечение", nameEn: "Heal", type: "active", level: 1, mp: 30, reuse: "3 сек", description: "Восстанавливает 300 HP одной цели. Основной скилл лекаря.", classes: ["Клирик", "Епископ", "Кардинал"] },
      { id: "h2", name: "Великое Лечение", nameEn: "Greater Heal", type: "active", level: 40, mp: 60, reuse: "5 сек", description: "Восстанавливает 800 HP. Мощное одиночное лечение.", classes: ["Епископ", "Кардинал"] },
      { id: "h3", name: "Групповое лечение", nameEn: "Group Heal", type: "active", level: 52, mp: 86, reuse: "8 сек", description: "Лечит всю группу в радиусе 600. Восстанавливает 450 HP каждому.", classes: ["Епископ", "Кардинал"] },
      { id: "h4", name: "Воскрешение", nameEn: "Resurrection", type: "active", level: 20, mp: 60, reuse: "15 сек", description: "Воскрешает погибшего игрока с 30% HP. Требует заклинание без боя.", classes: ["Клирик", "Епископ", "Кардинал"] },
      { id: "h5", name: "Снятие яда", nameEn: "Purify", type: "active", level: 20, mp: 15, reuse: "3 сек", description: "Снимает все яды и болезни с цели.", classes: ["Клирик", "Епископ", "Кардинал"] },
    ]
  },
  {
    id: "buffer",
    name: "Баффер / Пророк",
    nameEn: "Buffer / Prophet",
    skills: [
      { id: "b1", name: "Скорость заклинаний (Acumen)", nameEn: "Acumen", type: "active", level: 1, mp: 36, reuse: "5 сек", description: "Ускоряет скорость применения заклинаний на 20%. Длительность 20 мин.", classes: ["Пророк", "Иерофант"] },
      { id: "b2", name: "Ветер (Wind Walk)", nameEn: "Wind Walk", type: "active", level: 1, mp: 30, reuse: "5 сек", description: "Повышает скорость передвижения на 20%. Длительность 20 мин.", classes: ["Пророк", "Иерофант"] },
      { id: "b3", name: "Сила (Might)", nameEn: "Might", type: "active", level: 1, mp: 36, reuse: "5 сек", description: "Повышает физическую атаку на 25%. Длительность 20 мин.", classes: ["Пророк", "Иерофант"] },
      { id: "b4", name: "Щит (Shield)", nameEn: "Shield", type: "active", level: 1, mp: 36, reuse: "5 сек", description: "Повышает физическую защиту на 25%. Длительность 20 мин.", classes: ["Пророк", "Иерофант"] },
      { id: "b5", name: "Ментальный барьер", nameEn: "Mental Shield", type: "active", level: 30, mp: 32, reuse: "5 сек", description: "Снижает шанс ментального контроля на 50%. Длительность 20 мин.", classes: ["Пророк", "Иерофант"] },
      { id: "b6", name: "Дар природы", nameEn: "Gift of Nature", type: "active", level: 40, mp: 42, reuse: "5 сек", description: "Повышает регенерацию HP на 60%. Длительность 20 мин.", classes: ["Иерофант"] },
      { id: "b7", name: "Гимн Магнуса", nameEn: "Magnus's Chant", type: "active", level: 60, mp: 86, reuse: "5 сек", description: "Мощный групповой бафф: +STR, +DEX, +INT, +WIT, +CON, +MEN одновременно.", classes: ["Иерофант"] },
    ]
  },
  {
    id: "singer-dancer",
    name: "Певец / Танцор",
    nameEn: "Swordsinger / Bladedancer",
    skills: [
      { id: "sd1", name: "Песня Ветра", nameEn: "Song of Wind", type: "active", level: 22, mp: 13, reuse: "2 сек", description: "Групповая песня: +20% скорость передвижения. Действует пока поётся.", classes: ["Мастер клинка"] },
      { id: "sd2", name: "Песня Охотника", nameEn: "Song of Hunter", type: "active", level: 26, mp: 13, reuse: "2 сек", description: "Групповая песня: +5% критический шанс.", classes: ["Мастер клинка"] },
      { id: "sd3", name: "Танец Воина", nameEn: "Dance of Warrior", type: "active", level: 22, mp: 13, reuse: "2 сек", description: "Групповой танец: +P.Atk на 10%. Действует пока танцуется.", classes: ["Спектральный Танцор"] },
      { id: "sd4", name: "Танец Стойкости", nameEn: "Dance of Shielding", type: "active", level: 28, mp: 13, reuse: "2 сек", description: "Групповой танец: +P.Def на 10%.", classes: ["Спектральный Танцор"] },
      { id: "sd5", name: "Финальная Песня", nameEn: "Final Song", type: "active", level: 78, mp: 100, reuse: "300 сек", description: "Накладывает до 4 песен одновременно на всю группу.", classes: ["Мастер клинка"] },
    ]
  },
  {
    id: "summoner",
    name: "Призыватель",
    nameEn: "Summoner",
    skills: [
      { id: "sum1", name: "Призыв Фантома", nameEn: "Summon Phantom", type: "active", level: 10, mp: 50, reuse: "30 сек", description: "Призывает фантомного прислужника для атаки врагов.", classes: ["Боевой призыватель"] },
      { id: "sum2", name: "Призыв Голема", nameEn: "Summon Mighty Golem", type: "active", level: 36, mp: 130, reuse: "60 сек", description: "Призывает мощного голема — стойкого существа с высоким HP.", classes: ["Военный призыватель"] },
      { id: "sum3", name: "Распределение боли", nameEn: "Transfer Pain", type: "toggle", level: 20, mp: 2, reuse: "—", description: "Перекладывает часть получаемого урона на прислужника (30%).", classes: ["Все призыватели"] },
      { id: "sum4", name: "Усиление прислужника", nameEn: "Buff Servitor", type: "active", level: 40, mp: 36, reuse: "5 сек", description: "Накладывает мощный бафф на прислужника, повышая его атаку и защиту.", classes: ["Элементальный призыватель"] },
    ]
  },
];
