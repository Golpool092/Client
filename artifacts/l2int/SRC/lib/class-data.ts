export interface ClassNode {
  name: string;
  nameEn: string;
  level: number;
  role: string;
  children?: ClassNode[];
}

export interface RaceData {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  bonuses: string[];
  bonusesEn: string[];
  paths: ClassNode[];
}

export const RACES: RaceData[] = [
  {
    id: "human",
    name: "Люди (Human)",
    nameEn: "Human",
    description: "Люди — наиболее универсальная раса. Имеют сбалансированные характеристики и самое большое разнообразие классов. Подходят как новичкам, так и опытным игрокам.",
    descriptionEn: "Humans are the most versatile race with balanced stats and widest class selection.",
    bonuses: ["Сбалансированные характеристики", "Большое разнообразие классов", "Хорошая репутация в игровом мире"],
    bonusesEn: ["Balanced stats", "Widest class variety", "Good reputation in-game"],
    paths: [
      {
        name: "Воин (Fighter)",
        nameEn: "Fighter",
        level: 1,
        role: "Физический ДД/Танк",
        children: [
          {
            name: "Воин → Гладиатор (Gladiator)",
            nameEn: "Warrior → Gladiator",
            level: 20,
            role: "Физический ДД (мечи)",
            children: [{ name: "Дуэлянт (Duelist)", nameEn: "Duelist", level: 76, role: "Мастер дуэлей" }]
          },
          {
            name: "Воин → Военачальник (Warlord)",
            nameEn: "Warrior → Warlord",
            level: 20,
            role: "Копьё + AoE",
            children: [{ name: "Дредноут (Dreadnought)", nameEn: "Dreadnought", level: 76, role: "AoE воин" }]
          },
          {
            name: "Рыцарь → Паладин (Paladin)",
            nameEn: "Knight → Paladin",
            level: 20,
            role: "Танк (свет)",
            children: [{ name: "Рыцарь Феникса (Phoenix Knight)", nameEn: "Phoenix Knight", level: 76, role: "Светлый танк" }]
          },
          {
            name: "Рыцарь → Тёмный Мститель (Dark Avenger)",
            nameEn: "Knight → Dark Avenger",
            level: 20,
            role: "Танк (тьма)",
            children: [{ name: "Рыцарь Ада (Hell Knight)", nameEn: "Hell Knight", level: 76, role: "Тёмный танк" }]
          },
          {
            name: "Разбойник → Охотник за Сокровищами",
            nameEn: "Rogue → Treasure Hunter",
            level: 20,
            role: "Ловкач / Скаут",
            children: [{ name: "Авантюрист (Adventurer)", nameEn: "Adventurer", level: 76, role: "Мастер скрытности" }]
          },
          {
            name: "Разбойник → Ястребиный Глаз (Hawkeye)",
            nameEn: "Rogue → Hawkeye",
            level: 20,
            role: "Лучник",
            children: [{ name: "Сагиттариус (Sagittarius)", nameEn: "Sagittarius", level: 76, role: "Элитный лучник" }]
          },
        ]
      },
      {
        name: "Маг (Mystic)",
        nameEn: "Mystic",
        level: 1,
        role: "Магический ДД/Саппорт",
        children: [
          {
            name: "Маг → Чародей (Sorcerer)",
            nameEn: "Wizard → Sorcerer",
            level: 20,
            role: "Маг огня",
            children: [{ name: "Архмаг (Archmage)", nameEn: "Archmage", level: 76, role: "Величайший маг" }]
          },
          {
            name: "Маг → Некромант (Necromancer)",
            nameEn: "Wizard → Necromancer",
            level: 20,
            role: "Тёмная магия",
            children: [{ name: "Похититель Душ (Soultaker)", nameEn: "Soultaker", level: 76, role: "Мастер тьмы" }]
          },
          {
            name: "Маг → Варлок (Warlock)",
            nameEn: "Wizard → Warlock",
            level: 20,
            role: "Призыватель",
            children: [{ name: "Аркана Лорд (Arcana Lord)", nameEn: "Arcana Lord", level: 76, role: "Мастер призыва" }]
          },
          {
            name: "Жрец → Епископ (Bishop)",
            nameEn: "Cleric → Bishop",
            level: 20,
            role: "Хилер",
            children: [{ name: "Кардинал (Cardinal)", nameEn: "Cardinal", level: 76, role: "Верховный целитель" }]
          },
          {
            name: "Жрец → Пророк (Prophet)",
            nameEn: "Cleric → Prophet",
            level: 20,
            role: "Баффер",
            children: [{ name: "Иерофант (Hierophant)", nameEn: "Hierophant", level: 76, role: "Мастер баффов" }]
          },
        ]
      }
    ]
  },
  {
    id: "elf",
    name: "Эльфы (Elf)",
    nameEn: "Elf",
    description: "Эльфы — грациозная раса, живущая в лесах. Высокая скорость и ловкость, уступают людям в силе. Отличные лучники и быстрые воины. Имеют бонус к скорости передвижения.",
    descriptionEn: "Elves are a graceful race living in forests. High speed and dexterity, excellent archers.",
    bonuses: ["Высокая скорость передвижения", "Бонус к DEX", "Специальные умения воды", "Хорошие лучники"],
    bonusesEn: ["High movement speed", "DEX bonus", "Water skills", "Excellent archers"],
    paths: [
      {
        name: "Воин-Эльф",
        nameEn: "Elven Fighter",
        level: 1,
        role: "Быстрый воин",
        children: [
          {
            name: "Рыцарь Эльфов → Храмовник (Temple Knight)",
            nameEn: "Elven Knight → Temple Knight",
            level: 20,
            role: "Танк",
            children: [{ name: "Эвасор (Evas Templar)", nameEn: "Evas Templar", level: 76, role: "Эльфийский танк" }]
          },
          {
            name: "Следопыт → Охотник за Призраками (Plainswalker)",
            nameEn: "Scout → Plainswalker",
            level: 20,
            role: "Скаут",
            children: [{ name: "Ветер Ночи (Wind Rider)", nameEn: "Wind Rider", level: 76, role: "Элитный разведчик" }]
          },
          {
            name: "Следопыт → Серебряный Ranger",
            nameEn: "Scout → Silver Ranger",
            level: 20,
            role: "Лучник",
            children: [{ name: "Мумус (Moonlight Sentinel)", nameEn: "Moonlight Sentinel", level: 76, role: "Лучник-эльф" }]
          },
        ]
      },
      {
        name: "Маг-Эльф",
        nameEn: "Elven Mystic",
        level: 1,
        role: "Поддержка / Маг",
        children: [
          {
            name: "Маг Эльфов → Чародей Эльфов",
            nameEn: "Elven Wizard → Spellsinger",
            level: 20,
            role: "Маг воды",
            children: [{ name: "Мистик Эвы (Mystic Muse)", nameEn: "Mystic Muse", level: 76, role: "Могущественный маг" }]
          },
          {
            name: "Жрица Эльфов → Хранитель Эльфов",
            nameEn: "Elven Oracle → Elven Elder",
            level: 20,
            role: "Хилер-баффер",
            children: [{ name: "Евангелист (Eva's Saint)", nameEn: "Eva's Saint", level: 76, role: "Святой целитель" }]
          },
        ]
      }
    ]
  },
  {
    id: "darkelf",
    name: "Тёмные Эльфы (Dark Elf)",
    nameEn: "Dark Elf",
    description: "Тёмные Эльфы — изгнанная часть эльфийского народа. Высокая атака и скорость, тёмная магия. Один из лучших классов для ДД-роли. Слабее в защите.",
    descriptionEn: "Dark Elves — banished elves with high attack and dark magic. Best DPS race.",
    bonuses: ["Высокий урон", "Тёмная магия", "Отличные одиночные ДД", "Высокий INT и STR"],
    bonusesEn: ["High damage", "Dark magic", "Excellent solo DPS", "High INT and STR"],
    paths: [
      {
        name: "Воин Тёмных Эльфов",
        nameEn: "Dark Fighter",
        level: 1,
        role: "Быстрый агрессивный воин",
        children: [
          {
            name: "Рыцарь Тьмы → Рыцарь Призраков (Shillien Knight)",
            nameEn: "Dark Knight → Shillien Knight",
            level: 20,
            role: "Тёмный танк",
            children: [{ name: "Страж Шиллен (Shillien Templar)", nameEn: "Shillien Templar", level: 76, role: "Тёмный танк" }]
          },
          {
            name: "Убийца → Аббадон Воин (Bladedancer)",
            nameEn: "Assassin → Bladedancer",
            level: 20,
            role: "Танцор/Баффер",
            children: [{ name: "Спектр (Spectral Dancer)", nameEn: "Spectral Dancer", level: 76, role: "Тёмный танцор" }]
          },
          {
            name: "Убийца → Охотник-призрак (Abyss Walker)",
            nameEn: "Assassin → Abyss Walker",
            level: 20,
            role: "Убийца",
            children: [{ name: "Призрачный Скиталец (Ghost Hunter)", nameEn: "Ghost Hunter", level: 76, role: "Мастер убийства" }]
          },
          {
            name: "Убийца → Тёмный Рейнджер (Phantom Ranger)",
            nameEn: "Assassin → Phantom Ranger",
            level: 20,
            role: "Тёмный лучник",
            children: [{ name: "Phantom Ranger → Ghost Sentinel", nameEn: "Ghost Sentinel", level: 76, role: "Тёмный стрелок" }]
          },
        ]
      },
      {
        name: "Маг Тёмных Эльфов",
        nameEn: "Dark Mystic",
        level: 1,
        role: "Тёмный маг",
        children: [
          {
            name: "Тёмный Маг → Тёмный Маг (Spellhowler)",
            nameEn: "Dark Wizard → Spellhowler",
            level: 20,
            role: "Маг тьмы / ДД",
            children: [{ name: "Штормовой Страдалец (Storm Screamer)", nameEn: "Storm Screamer", level: 76, role: "Тёмный маг" }]
          },
          {
            name: "Жрица Шиллен → Жрица Шиллен",
            nameEn: "Shillien Oracle → Shillien Elder",
            level: 20,
            role: "Хилер тьмы",
            children: [{ name: "Жрица Шиллен (Shillien Saint)", nameEn: "Shillien Saint", level: 76, role: "Тёмный целитель" }]
          },
        ]
      }
    ]
  },
  {
    id: "orc",
    name: "Орки (Orc)",
    nameEn: "Orc",
    description: "Орки — мощная воинственная раса с огромной физической силой. Лучшие танки и шаманы. Имеют уникальные боевые кличи и гимны, усиливающие всю группу.",
    descriptionEn: "Orcs are powerful warriors with immense physical strength. Best tanks and group support.",
    bonuses: ["Высокий CON и STR", "Уникальные боевые кличи", "Отличные танки", "Бонус к HP"],
    bonusesEn: ["High CON and STR", "Unique war cries", "Excellent tanks", "HP bonus"],
    paths: [
      {
        name: "Воин-Орк",
        nameEn: "Orc Fighter",
        level: 1,
        role: "Тяжёлый воин",
        children: [
          {
            name: "Орк-воин → Орк-разрушитель (Destroyer)",
            nameEn: "Orc Raider → Destroyer",
            level: 20,
            role: "Тяжёлый физический ДД",
            children: [{ name: "Тиран (Titan)", nameEn: "Titan", level: 76, role: "Непобедимый воин" }]
          },
          {
            name: "Орк-монах → Тайкун (Tyrant)",
            nameEn: "Orc Monk → Tyrant",
            level: 20,
            role: "Кулачный боец",
            children: [{ name: "Повелитель Гран Кейна (Grand Khavatari)", nameEn: "Grand Khavatari", level: 76, role: "Мастер ближнего боя" }]
          },
        ]
      },
      {
        name: "Шаман-Орк",
        nameEn: "Orc Mystic",
        level: 1,
        role: "Шаман / Поддержка",
        children: [
          {
            name: "Шаман → Оверлорд (Overlord)",
            nameEn: "Shaman → Overlord",
            level: 20,
            role: "Клановый поддерживатель",
            children: [{ name: "Доминатор (Dominator)", nameEn: "Dominator", level: 76, role: "Клановый лидер" }]
          },
          {
            name: "Шаман → Плакальщик (Warcryer)",
            nameEn: "Shaman → Warcryer",
            level: 20,
            role: "Баффер-певец",
            children: [{ name: "Дум Крайер (Doomcryer)", nameEn: "Doomcryer", level: 76, role: "Мастер боевых гимнов" }]
          },
        ]
      }
    ]
  },
  {
    id: "dwarf",
    name: "Дворфы (Dwarf)",
    nameEn: "Dwarf",
    description: "Дворфы — мастера ремёсел и торговли. Единственная раса, способная добывать ресурсы и создавать предметы путём крафта. В бою используют молоты и топоры.",
    descriptionEn: "Dwarves are masters of crafting and trade. Only race capable of crafting items.",
    bonuses: ["Только они могут крафтить", "Добыча руды (Spoil)", "Высокая защита", "Личный склад увеличен"],
    bonusesEn: ["Only crafters in game", "Spoil skill", "High defense", "Expanded personal storage"],
    paths: [
      {
        name: "Воин-Дворф",
        nameEn: "Dwarven Fighter",
        level: 1,
        role: "Боец / Крафтер",
        children: [
          {
            name: "Дворфийский Воин → Щитоносец (Scavenger)",
            nameEn: "Dwarven Fighter → Scavenger",
            level: 20,
            role: "Фармер ресурсов",
            children: [{ name: "Бурильщик Фортуны (Fortune Seeker)", nameEn: "Fortune Seeker", level: 76, role: "Мастер добычи" }]
          },
          {
            name: "Дворфийский Воин → Крафтер (Artisan)",
            nameEn: "Dwarven Fighter → Artisan",
            level: 20,
            role: "Мастер крафта",
            children: [{ name: "Мастер Артефактов (Maestro)", nameEn: "Maestro", level: 76, role: "Лучший крафтер" }]
          },
        ]
      }
    ]
  },
  {
    id: "kamael",
    name: "Камаэль (Kamael)",
    nameEn: "Kamael",
    description: "Камаэль — загадочная раса крылатых существ с уникальными умениями. Имеют свою уникальную 1-ю профессию и особые механики. Используют мечи одной рукой и стрелковое оружие особого типа.",
    descriptionEn: "Kamael are mysterious winged beings with unique skills and mechanics.",
    bonuses: ["Уникальные умения расы", "Особый тип оружия", "Поглощение опыта врагов", "Высокая скорость атаки"],
    bonusesEn: ["Unique race skills", "Special weapon type", "Experience absorption", "High attack speed"],
    paths: [
      {
        name: "Воин-Камаэль",
        nameEn: "Kamael Soldier",
        level: 1,
        role: "Универсальный воин",
        children: [
          {
            name: "Инквизитор (Trooper)",
            nameEn: "Trooper",
            level: 20,
            role: "Физический ДД",
            children: [
              { name: "Доминатор (Doombringer)", nameEn: "Doombringer", level: 76, role: "Мощный воин" },
              { name: "Мастер Душ (Soul Hound)", nameEn: "Soul Hound", level: 76, role: "Охотник за душами" }
            ]
          },
          {
            name: "Разведчик (Warder)",
            nameEn: "Warder",
            level: 20,
            role: "Скаут",
            children: [
              { name: "Арбалетчик (Trickster)", nameEn: "Trickster", level: 76, role: "Ловкий стрелок" }
            ]
          },
        ]
      },
    ]
  },
];
