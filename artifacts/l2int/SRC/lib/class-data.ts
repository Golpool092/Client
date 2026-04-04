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

export interface ClassDetail {
  id: string;
  name: string;
  nameRu: string;
  race: string;
  type: "fighter" | "mage" | "priest" | "rogue";
  tier: number;
  requiredLevel: number;
  description: string;
  descriptionRu: string;
  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wit: number;
    men: number;
  };
  role: string;
  roleRu: string;
  strengths: string[];
  weaknesses: string[];
  equipment: {
    weapon: string;
    armor: string;
    jewelry: string;
  };
  skills: string[];
  skillsRu: string[];
  farmZones: string[];
  pvpRating: number;
  pveRating: number;
  difficultyRating: number;
}

export const RACES: RaceData[] = [
  {
    id: "human",
    name: "Люди (Human)",
    nameEn: "Human",
    description:
      "Люди — наиболее универсальная раса. Имеют сбалансированные характеристики и самое большое разнообразие классов. Подходят как новичкам, так и опытным игрокам. Стартовый город — Talking Island Village.",
    descriptionEn:
      "Humans are the most versatile race with balanced stats and widest class selection. Suitable for beginners and veterans alike.",
    bonuses: [
      "Сбалансированные характеристики",
      "Большое разнообразие классов",
      "Хорошая репутация в игровом мире",
      "Доступны все роли: танк, хилер, баффер, маг, воин, лучник",
    ],
    bonusesEn: [
      "Balanced stats",
      "Widest class variety",
      "Good reputation in-game",
      "All roles available: tank, healer, buffer, mage, fighter, archer",
    ],
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
            children: [
              {
                name: "Дуэлянт (Duelist)",
                nameEn: "Duelist",
                level: 76,
                role: "Мастер дуэлей и AoE ближнего боя",
              },
            ],
          },
          {
            name: "Воин → Военачальник (Warlord)",
            nameEn: "Warrior → Warlord",
            level: 20,
            role: "Копьё + AoE атаки",
            children: [
              {
                name: "Дредноут (Dreadnought)",
                nameEn: "Dreadnought",
                level: 76,
                role: "Мощный AoE воин с копьём",
              },
            ],
          },
          {
            name: "Рыцарь → Паладин (Paladin)",
            nameEn: "Knight → Paladin",
            level: 20,
            role: "Светлый танк + поддержка",
            children: [
              {
                name: "Рыцарь Феникса (Phoenix Knight)",
                nameEn: "Phoenix Knight",
                level: 76,
                role: "Лучший светлый танк со способностями поддержки",
              },
            ],
          },
          {
            name: "Рыцарь → Тёмный Мститель (Dark Avenger)",
            nameEn: "Knight → Dark Avenger",
            level: 20,
            role: "Тёмный танк + урон",
            children: [
              {
                name: "Рыцарь Ада (Hell Knight)",
                nameEn: "Hell Knight",
                level: 76,
                role: "Агрессивный тёмный танк с высоким уроном",
              },
            ],
          },
          {
            name: "Разбойник → Охотник за Сокровищами (Treasure Hunter)",
            nameEn: "Rogue → Treasure Hunter",
            level: 20,
            role: "Ловкач / Скаут / Критический урон",
            children: [
              {
                name: "Авантюрист (Adventurer)",
                nameEn: "Adventurer",
                level: 76,
                role: "Мастер скрытности и критических ударов с кинжалами",
              },
            ],
          },
          {
            name: "Разбойник → Ястребиный Глаз (Hawkeye)",
            nameEn: "Rogue → Hawkeye",
            level: 20,
            role: "Лучник / Дальний ДД",
            children: [
              {
                name: "Сагиттариус (Sagittarius)",
                nameEn: "Sagittarius",
                level: 76,
                role: "Элитный лучник с широким набором навыков",
              },
            ],
          },
        ],
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
            role: "Маг огня и стихий",
            children: [
              {
                name: "Архмаг (Archmage)",
                nameEn: "Archmage",
                level: 76,
                role: "Величайший маг с Cancel и огненными заклинаниями",
              },
            ],
          },
          {
            name: "Маг → Некромант (Necromancer)",
            nameEn: "Wizard → Necromancer",
            level: 20,
            role: "Тёмная магия + призыв нежити",
            children: [
              {
                name: "Похититель Душ (Soultaker)",
                nameEn: "Soultaker",
                level: 76,
                role: "Мастер тёмной магии и повелитель нежити",
              },
            ],
          },
          {
            name: "Маг → Варлок (Warlock)",
            nameEn: "Wizard → Warlock",
            level: 20,
            role: "Призыватель духов и питомцев",
            children: [
              {
                name: "Аркана Лорд (Arcana Lord)",
                nameEn: "Arcana Lord",
                level: 76,
                role: "Верховный призыватель с мощными питомцами",
              },
            ],
          },
          {
            name: "Жрец → Епископ (Bishop)",
            nameEn: "Cleric → Bishop",
            level: 20,
            role: "Главный хилер",
            children: [
              {
                name: "Кардинал (Cardinal)",
                nameEn: "Cardinal",
                level: 76,
                role: "Верховный целитель — лучший хил в игре",
              },
            ],
          },
          {
            name: "Жрец → Пророк (Prophet)",
            nameEn: "Cleric → Prophet",
            level: 20,
            role: "Баффер / Усилитель группы",
            children: [
              {
                name: "Иерофант (Hierophant)",
                nameEn: "Hierophant",
                level: 76,
                role: "Мастер баффов — усиливает всю группу",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "elf",
    name: "Эльфы (Elf)",
    nameEn: "Elf",
    description:
      "Эльфы — грациозная раса, живущая в лесах у Озера Советов. Высокая скорость и ловкость, уступают людям в силе. Отличные лучники и быстрые воины. Имеют бонус к скорости передвижения и специальные водные умения.",
    descriptionEn:
      "Elves are a graceful forest race with high speed and dexterity. Excellent archers and water mages.",
    bonuses: [
      "Высокая скорость передвижения",
      "Бонус к DEX (ловкость)",
      "Специальные умения воды",
      "Хорошие лучники и маги воды",
      "Стартовый город: Elven Village",
    ],
    bonusesEn: [
      "High movement speed",
      "DEX bonus",
      "Water skills",
      "Excellent archers and water mages",
      "Starting city: Elven Village",
    ],
    paths: [
      {
        name: "Воин-Эльф",
        nameEn: "Elven Fighter",
        level: 1,
        role: "Быстрый воин с уклонением",
        children: [
          {
            name: "Рыцарь Эльфов → Храмовник (Temple Knight)",
            nameEn: "Elven Knight → Temple Knight",
            level: 20,
            role: "Светлый эльфийский танк",
            children: [
              {
                name: "Эвасор (Evas Templar)",
                nameEn: "Eva's Templar",
                level: 76,
                role: "Эльфийский храмовник Эвы — сильный танк с уникальными умениями",
              },
            ],
          },
          {
            name: "Следопыт → Охотник за Призраками (Plainswalker)",
            nameEn: "Scout → Plainswalker",
            level: 20,
            role: "Скаут / Разведчик",
            children: [
              {
                name: "Ветер Ночи (Wind Rider)",
                nameEn: "Wind Rider",
                level: 76,
                role: "Элитный эльфийский разведчик с кинжалами",
              },
            ],
          },
          {
            name: "Следопыт → Серебряный Рейнджер (Silver Ranger)",
            nameEn: "Scout → Silver Ranger",
            level: 20,
            role: "Лучник — быстрый и меткий",
            children: [
              {
                name: "Ночной Страж (Moonlight Sentinel)",
                nameEn: "Moonlight Sentinel",
                level: 76,
                role: "Быстрый лучник-эльф с высокой скоростью атаки",
              },
            ],
          },
        ],
      },
      {
        name: "Маг-Эльф",
        nameEn: "Elven Mystic",
        level: 1,
        role: "Поддержка / Магия воды",
        children: [
          {
            name: "Маг Эльфов → Певец Заклинаний (Spellsinger)",
            nameEn: "Elven Wizard → Spellsinger",
            level: 20,
            role: "Маг воды с контроль-умениями",
            children: [
              {
                name: "Мистик Эвы (Mystic Muse)",
                nameEn: "Mystic Muse",
                level: 76,
                role: "Могущественный маг воды и контроля",
              },
            ],
          },
          {
            name: "Жрица Эльфов → Хранитель Эльфов (Elven Elder)",
            nameEn: "Elven Oracle → Elven Elder",
            level: 20,
            role: "Хилер-баффер с водными умениями",
            children: [
              {
                name: "Евангелист (Eva's Saint)",
                nameEn: "Eva's Saint",
                level: 76,
                role: "Святой целитель Эвы — мощный хилер с баффами",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "darkelf",
    name: "Тёмные Эльфы (Dark Elf)",
    nameEn: "Dark Elf",
    description:
      "Тёмные Эльфы — изгнанная часть эльфийского народа, поклоняющаяся Богине Тьмы Шиллен. Высокая атака и скорость, тёмная магия. Один из лучших классов для ДД-роли. Слабее в защите. Стартовый город — Dark Elf Village.",
    descriptionEn:
      "Dark Elves — banished elves who worship the goddess Shilen. High attack, dark magic. Best DPS race in the game.",
    bonuses: [
      "Высокий физический и магический урон",
      "Тёмная магия — уникальные умения",
      "Отличные одиночные ДД",
      "Высокий INT и STR",
      "Лучшие убийцы (Assassin/Abyss Walker)",
    ],
    bonusesEn: [
      "High physical and magical damage",
      "Dark magic — unique skills",
      "Excellent solo DPS",
      "High INT and STR",
      "Best assassin class",
    ],
    paths: [
      {
        name: "Воин Тёмных Эльфов",
        nameEn: "Dark Fighter",
        level: 1,
        role: "Быстрый агрессивный воин / убийца",
        children: [
          {
            name: "Рыцарь Тьмы → Рыцарь Призраков (Shillien Knight)",
            nameEn: "Dark Knight → Shillien Knight",
            level: 20,
            role: "Тёмный танк Шиллен",
            children: [
              {
                name: "Страж Шиллен (Shillien Templar)",
                nameEn: "Shillien Templar",
                level: 76,
                role: "Тёмный храмовник Шиллен — агрессивный танк",
              },
            ],
          },
          {
            name: "Убийца → Танцор Клинков (Bladedancer)",
            nameEn: "Assassin → Bladedancer",
            level: 20,
            role: "Тёмный танцор с баффами-дебаффами",
            children: [
              {
                name: "Спектральный Танцор (Spectral Dancer)",
                nameEn: "Spectral Dancer",
                level: 76,
                role: "Тёмный танцор с мощными дебаффами для врагов",
              },
            ],
          },
          {
            name: "Убийца → Ходок в Бездну (Abyss Walker)",
            nameEn: "Assassin → Abyss Walker",
            level: 20,
            role: "Убийца / Критический урон с кинжалами",
            children: [
              {
                name: "Призрачный Охотник (Ghost Hunter)",
                nameEn: "Ghost Hunter",
                level: 76,
                role: "Мастер убийства из засады — лучший кинжальщик",
              },
            ],
          },
          {
            name: "Убийца → Тёмный Рейнджер (Phantom Ranger)",
            nameEn: "Assassin → Phantom Ranger",
            level: 20,
            role: "Тёмный лучник с высоким уроном",
            children: [
              {
                name: "Призрачный Страж (Ghost Sentinel)",
                nameEn: "Ghost Sentinel",
                level: 76,
                role: "Лучший лучник-ДД с тёмными умениями",
              },
            ],
          },
        ],
      },
      {
        name: "Маг Тёмных Эльфов",
        nameEn: "Dark Mystic",
        level: 1,
        role: "Тёмный маг / ДД",
        children: [
          {
            name: "Тёмный Маг → Завывающий Маг (Spellhowler)",
            nameEn: "Dark Wizard → Spellhowler",
            level: 20,
            role: "Маг тьмы / молний — агрессивный ДД",
            children: [
              {
                name: "Буревестник (Storm Screamer)",
                nameEn: "Storm Screamer",
                level: 76,
                role: "Тёмный маг молний с мощными AoE заклинаниями",
              },
            ],
          },
          {
            name: "Жрица Шиллен → Старейшина Шиллен (Shillien Elder)",
            nameEn: "Shillien Oracle → Shillien Elder",
            level: 20,
            role: "Тёмный хилер с дебаффами",
            children: [
              {
                name: "Святая Шиллен (Shillien Saint)",
                nameEn: "Shillien Saint",
                level: 76,
                role: "Тёмный целитель с уникальными тёмными баффами",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "orc",
    name: "Орки (Orc)",
    nameEn: "Orc",
    description:
      "Орки — могучая воинственная раса. Самые высокие показатели силы и здоровья в игре. Ограниченное разнообразие классов, но каждый класс исключительно силён. Уникальный класс Шаман с боевой магией. Стартовый город — Orc Village.",
    descriptionEn:
      "Orcs — the mightiest warrior race. Highest STR and CON stats. Limited class variety but each class is exceptional in its role.",
    bonuses: [
      "Максимальная сила (STR)",
      "Высокая выносливость (CON)",
      "Большой запас HP",
      "Лучшие воины ближнего боя",
      "Уникальные шаманские умения",
    ],
    bonusesEn: [
      "Maximum STR",
      "High CON",
      "Large HP pool",
      "Best melee warriors",
      "Unique shamanic abilities",
    ],
    paths: [
      {
        name: "Воин-Орк",
        nameEn: "Orc Fighter",
        level: 1,
        role: "Бруталный воин ближнего боя",
        children: [
          {
            name: "Разрушитель → Разрушитель (Destroyer)",
            nameEn: "Raider → Destroyer",
            level: 20,
            role: "Берсерк — максимальный AoE урон",
            children: [
              {
                name: "Титан (Titan)",
                nameEn: "Titan",
                level: 76,
                role: "Непреодолимый воин-берсерк с огромным двуручным оружием",
              },
            ],
          },
          {
            name: "Монарх → Тиран (Tyrant)",
            nameEn: "Monk → Tyrant",
            level: 20,
            role: "Рукопашный боец / Кастет",
            children: [
              {
                name: "Великий Кхаватари (Grand Khavatari)",
                nameEn: "Grand Khavatari",
                level: 76,
                role: "Мастер рукопашного боя с невероятной скоростью атаки",
              },
            ],
          },
        ],
      },
      {
        name: "Шаман-Орк",
        nameEn: "Orc Mystic",
        level: 1,
        role: "Боевой шаман / Поддержка",
        children: [
          {
            name: "Шаман → Оверлорд (Overlord)",
            nameEn: "Shaman → Overlord",
            level: 20,
            role: "Клановый баффер / Лидер",
            children: [
              {
                name: "Доминатор (Dominator)",
                nameEn: "Dominator",
                level: 76,
                role: "Повелитель — мощные клановые баффы и дебаффы",
              },
            ],
          },
          {
            name: "Шаман → Военный Крикун (Warcryer)",
            nameEn: "Shaman → Warcryer",
            level: 20,
            role: "Боевой баффер с военными криками",
            children: [
              {
                name: "Крикун Гибели (Doomcryer)",
                nameEn: "Doomcryer",
                level: 76,
                role: "Мощный баффер с уникальными военными криками",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dwarf",
    name: "Гномы (Dwarf)",
    nameEn: "Dwarf",
    description:
      "Гномы — мастера ремесла, крафта и спойла. Уникальные способности: только Гномы могут создавать снаряжение высшего качества. Отличные собиратели ресурсов. Нет магических классов. Стартовый город — Dwarven Village.",
    descriptionEn:
      "Dwarves are masters of crafting and spoiling. Only Dwarves can create high-grade equipment. Excellent resource gatherers.",
    bonuses: [
      "Единственная раса с возможностью крафта",
      "Уникальный класс Спойлер (сбор ресурсов с монстров)",
      "Высокая прочность и HP",
      "Самодостаточность — могут создавать собственное снаряжение",
      "Экономически выгодная раса",
    ],
    bonusesEn: [
      "Only race that can craft equipment",
      "Unique Spoiler class for resource gathering",
      "High HP and CON",
      "Self-sufficient — can craft own gear",
      "Economically valuable race",
    ],
    paths: [
      {
        name: "Воин-Гном",
        nameEn: "Dwarven Fighter",
        level: 1,
        role: "Прочный воин / Добытчик ресурсов",
        children: [
          {
            name: "Собиратель → Охотник за Наградой (Bounty Hunter)",
            nameEn: "Scavenger → Bounty Hunter",
            level: 20,
            role: "Спойлер — специалист по сбору ресурсов с монстров",
            children: [
              {
                name: "Искатель Удачи (Fortune Seeker)",
                nameEn: "Fortune Seeker",
                level: 76,
                role: "Высший спойлер — максимальный сбор ресурсов и урон дубинками",
              },
            ],
          },
          {
            name: "Художник-Оружейник → Кузнец (Warsmith)",
            nameEn: "Artisan → Warsmith",
            level: 20,
            role: "Мастер крафта — создаёт снаряжение высшего качества",
            children: [
              {
                name: "Маэстро (Maestro)",
                nameEn: "Maestro",
                level: 76,
                role: "Верховный кузнец — создаёт лучшее снаряжение в игре",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "kamael",
    name: "Камаэли (Kamael)",
    nameEn: "Kamael",
    description:
      "Камаэли — раса тёмных существ с крыльями, появившаяся в хрониках Goddess of Destruction. Уникальные воинские классы, способны применять умение «поглощения душ». Могут брать саб только из Камаэлей. Стартовый город — Wild Beast Reserve.",
    descriptionEn:
      "Kamael — dark winged beings introduced in later chronicles. Unique soul-absorption abilities. Can only sub-class as Kamael.",
    bonuses: [
      "Уникальные умения поглощения душ",
      "Высокий урон единственным оружием — рапиры и двуручные мечи",
      "Способность Inspect (особый саб-класс)",
      "Особое визуальное оформление персонажа",
    ],
    bonusesEn: [
      "Unique soul absorption abilities",
      "High single-weapon damage",
      "Inspector sub-class ability",
      "Unique character appearance",
    ],
    paths: [
      {
        name: "Воин-Камаэль (мужской)",
        nameEn: "Kamael Fighter (Male)",
        level: 1,
        role: "Агрессивный воин с уникальными умениями",
        children: [
          {
            name: "Солдат → Тёмный Мечник (Dark Fighter/Berserker)",
            nameEn: "Soldier → Berserker",
            level: 20,
            role: "Берсерк с поглощением душ",
            children: [
              {
                name: "Душераздирающий (Soul Breaker)",
                nameEn: "Soul Breaker",
                level: 76,
                role: "Уничтожитель душ — мощный воин с тёмной силой",
              },
            ],
          },
          {
            name: "Солдат → Призыватель Арбалетчика (Trooper)",
            nameEn: "Soldier → Trooper",
            level: 20,
            role: "Дальний ДД с арбалетом",
            children: [
              {
                name: "Арбалетчик (Арбалетчик Камаэль)",
                nameEn: "Doombringer",
                level: 76,
                role: "Высший арбалетчик с особыми умениями тьмы",
              },
            ],
          },
        ],
      },
      {
        name: "Воин-Камаэль (женский)",
        nameEn: "Kamael Fighter (Female)",
        level: 1,
        role: "Быстрый ДД с уклонением",
        children: [
          {
            name: "Солдат → Инспектор (Inspector)",
            nameEn: "Soldier → Inspector",
            level: 40,
            role: "Уникальный саб-класс — только для Камаэлей",
            children: [
              {
                name: "Следователь (Judicator)",
                nameEn: "Judicator",
                level: 76,
                role: "Охотник с особыми способностями контроля",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const classes: ClassDetail[] = [
  {
    id: "duelist",
    name: "Duelist",
    nameRu: "Дуэлянт",
    race: "Human",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "The Duelist is the highest form of the Gladiator class, master of dual swords with powerful AoE attacks. One of the best PvP classes in melee combat.",
    descriptionRu:
      "Дуэлянт — высший класс Гладиатора. Мастер двойных мечей с огромным набором AoE-атак. Один из лучших ПвП-классов в ближнем бою. Уникальная способность вызывать на дуэль противника.",
    stats: { str: 87, dex: 65, con: 78, int: 31, wit: 42, men: 43 },
    role: "Physical DPS / PvP Fighter",
    roleRu: "Физический ДД / ПвП-боец",
    strengths: [
      "Лучший одиночный ДД в ближнем бою",
      "Мощные AoE умения",
      "Уникальный скилл Duel",
      "Высокий урон от двойных мечей",
    ],
    weaknesses: [
      "Уязвим к магическим атакам",
      "Сложно на ранних уровнях",
      "Требует дорогого снаряжения",
    ],
    equipment: {
      weapon: "Vesper Dual Blade (S84) / Tallum Blade (S-grade)",
      armor: "Imperial Crusader Heavy Set (S-grade)",
      jewelry: "Baium Ring, Antharas Earring, Frintezza Necklace",
    },
    skills: [
      "Dual Strike",
      "Whirlwind",
      "Duel Mastery",
      "Hurricane",
      "Chain Blow",
      "Sonic Barrier",
      "Force Storm",
      "Double Strike",
      "Mortal Blow",
    ],
    skillsRu: [
      "Двойной удар",
      "Вихрь",
      "Мастерство дуэли",
      "Ураган",
      "Серия ударов",
      "Звуковой щит",
      "Буря силы",
      "Двойной удар",
      "Смертельный удар",
    ],
    farmZones: ["Blazing Swamp", "Tower of Insolence", "Giants Cave", "Antharas Lair"],
    pvpRating: 9,
    pveRating: 7,
    difficultyRating: 6,
  },
  {
    id: "dreadnought",
    name: "Dreadnought",
    nameRu: "Дредноут",
    race: "Human",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "The Dreadnought is the ultimate spear warrior, capable of massive AoE damage. Excellent for grinding large groups of monsters.",
    descriptionRu:
      "Дредноут — высший воин с копьём. Способен наносить огромный AoE урон. Незаменим для фарма больших групп монстров. Слабее в одиночном PvP, но в групповых сражениях — страшная сила.",
    stats: { str: 88, dex: 63, con: 80, int: 28, wit: 40, men: 41 },
    role: "AoE Physical DPS",
    roleRu: "AoE физический ДД",
    strengths: [
      "Лучший AoE урон в ближнем бою",
      "Отличная дальность атаки копьём",
      "Незаменим в групповом фарме",
      "Высокий HP",
    ],
    weaknesses: [
      "Слабее в одиночном PvP",
      "Медленная скорость атаки",
      "Уязвим к магическим атакам",
    ],
    equipment: {
      weapon: "Vesper Spear (S84) / Icarus Spear (S80)",
      armor: "Imperial Crusader Heavy Set",
      jewelry: "Baium Ring, Antharas Earring, Zaken Earring",
    },
    skills: ["Lance Mastery", "Polearm Mastery", "Rush Impact", "Momentum", "Thunder Storm", "Mass Slow"],
    skillsRu: [
      "Мастерство копья",
      "Мастерство алебарды",
      "Удар натиска",
      "Момент силы",
      "Гром",
      "Массовое замедление",
    ],
    farmZones: ["Blazing Swamp", "Imperial Tomb", "Monastery of Silence", "Giants Cave"],
    pvpRating: 6,
    pveRating: 9,
    difficultyRating: 5,
  },
  {
    id: "phoenix-knight",
    name: "Phoenix Knight",
    nameRu: "Рыцарь Феникса",
    race: "Human",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "The Phoenix Knight is the pinnacle of the Paladin class — the best light tank with powerful support and aggro-control abilities.",
    descriptionRu:
      "Рыцарь Феникса — высший светлый танк. Лучший управляющий агрессией с поддерживающими умениями. Незаменим в группах для рейдов и фарма. Имеет уникальные умения возрождения.",
    stats: { str: 77, dex: 60, con: 83, int: 34, wit: 46, men: 56 },
    role: "Light Tank / Aggro Control",
    roleRu: "Светлый танк / Контроль агрессии",
    strengths: [
      "Лучший контроль агрессии",
      "Мощные защитные умения",
      "Поддержка группы — уникальные умения",
      "Высокая устойчивость",
    ],
    weaknesses: [
      "Низкий урон по сравнению с воинами-ДД",
      "Зависит от группы",
      "Долгое развитие до высоких уровней",
    ],
    equipment: {
      weapon: "Vesper Dual Sword (S84) или Vesper Buster (щит)",
      armor: "Imperial Crusader / Arcana Force Set",
      jewelry: "Tezza Necklace, Baium Ring, Antharas Earring",
    },
    skills: [
      "Counter Attack",
      "Holy Blade",
      "Holy Aura",
      "Aegis",
      "Shield Fortress",
      "Divine Protection",
      "Hammer Crush",
      "Aggression",
    ],
    skillsRu: [
      "Контратака",
      "Святой клинок",
      "Святая аура",
      "Эгида",
      "Крепость щита",
      "Божественная защита",
      "Удар молота",
      "Агрессия",
    ],
    farmZones: ["Antharas Lair", "TOI", "Monastery of Silence", "Forst of Mirrors"],
    pvpRating: 7,
    pveRating: 8,
    difficultyRating: 6,
  },
  {
    id: "hell-knight",
    name: "Hell Knight",
    nameRu: "Рыцарь Ада",
    race: "Human",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "Hell Knight is the dark tank class — more aggressive than Phoenix Knight, with higher damage output but somewhat weaker support abilities.",
    descriptionRu:
      "Рыцарь Ада — тёмный танк, производный от Dark Avenger. Более агрессивен чем Рыцарь Феникса, наносит больший урон, но чуть слабее в поддержке. Использует тёмные умения.",
    stats: { str: 82, dex: 62, con: 79, int: 36, wit: 44, men: 53 },
    role: "Dark Tank / Aggressive Tank",
    roleRu: "Тёмный танк / Агрессивный танк",
    strengths: [
      "Высокий урон для танка",
      "Тёмные умения — уникальные дебаффы",
      "Силён в PvP",
      "Хороший контроль агрессии",
    ],
    weaknesses: ["Слабее в поддержке группы чем Phoenix Knight", "Требует опыта в управлении"],
    equipment: {
      weapon: "Icarus Sawsword (S80) / Vesper Slasher (S84)",
      armor: "Dark Crystal Heavy (A) → Imperial Crusader (S)",
      jewelry: "Baium Ring, Tezza Necklace, Zaken Earring",
    },
    skills: [
      "Dark Slash",
      "Aggression",
      "Counter Attack",
      "Curse of Doom",
      "Dark Defense",
      "Hell's Gate",
      "Sword of Despair",
    ],
    skillsRu: [
      "Тёмный удар",
      "Агрессия",
      "Контратака",
      "Проклятие гибели",
      "Тёмная защита",
      "Врата ада",
      "Меч отчаяния",
    ],
    farmZones: ["Monastery of Silence", "TOI", "Giants Cave", "Antharas Lair"],
    pvpRating: 8,
    pveRating: 7,
    difficultyRating: 7,
  },
  {
    id: "adventurer",
    name: "Adventurer",
    nameRu: "Авантюрист",
    race: "Human",
    type: "rogue",
    tier: 3,
    requiredLevel: 76,
    description:
      "The Adventurer is the ultimate rogue — master of stealth, critical strikes, and hit-and-run tactics with daggers.",
    descriptionRu:
      "Авантюрист — высший убийца с кинжалами. Мастер скрытности, критических ударов и тактики удар-бегство. Очень высокий одиночный урон, но хрупкость требует мастерства.",
    stats: { str: 80, dex: 76, con: 70, int: 32, wit: 43, men: 45 },
    role: "Rogue / Stealth Assassin",
    roleRu: "Разбойник / Убийца",
    strengths: [
      "Высочайший разовый урон (Bleed + критический удар)",
      "Невидимость (Hide/Stealth)",
      "Отличная мобильность",
      "Хорош в Олимпиаде",
    ],
    weaknesses: [
      "Самый хрупкий класс воинов",
      "Сложен в освоении",
      "Полностью зависит от снаряжения",
    ],
    equipment: {
      weapon: "Icarus Disperser (S80) / Vesper Dual Dagger (S84)",
      armor: "Dark Crystal Light / Imperial Leather (S)",
      jewelry: "Zaken Earring, Baium Ring, Tezza Necklace",
    },
    skills: [
      "Bluff",
      "Critical Stab",
      "Mortal Blow",
      "Back Stab",
      "Deadly Blow",
      "Hide",
      "Shadow Chase",
      "Evasion",
    ],
    skillsRu: [
      "Блеф",
      "Критический удар",
      "Смертельный удар",
      "Удар в спину",
      "Смертоносный удар",
      "Скрытность",
      "Преследование тени",
      "Уклонение",
    ],
    farmZones: ["Blazing Swamp", "Ketra Orcs", "Varka Silenos", "Giants Cave"],
    pvpRating: 8,
    pveRating: 6,
    difficultyRating: 9,
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    nameRu: "Сагиттариус",
    race: "Human",
    type: "rogue",
    tier: 3,
    requiredLevel: 76,
    description:
      "Sagittarius is the human archer's pinnacle — balanced between power, range, and versatility. Excellent in both PvP and PvE.",
    descriptionRu:
      "Сагиттариус — высший лучник-человек. Баланс урона, дальности и гибкости. Один из лучших классов для Олимпиады благодаря разнообразию стрелковых умений.",
    stats: { str: 79, dex: 74, con: 70, int: 33, wit: 44, men: 46 },
    role: "Ranged Physical DPS / PvP Archer",
    roleRu: "Дальний физический ДД / ПвП лучник",
    strengths: [
      "Отличный дальний урон",
      "Хорош в Олимпиаде",
      "Versatile PvP стратегии",
      "Stun Shot для прерывания",
    ],
    weaknesses: [
      "Слаб в ближнем бою",
      "Постоянные расходы на стрелы",
      "Уязвим при потере дистанции",
    ],
    equipment: {
      weapon: "Vesper Thrower (S84) / Icarus Spitter (S80)",
      armor: "Imperial Leather Light Set (S)",
      jewelry: "Majestic Earring, Baium Ring, Zaken Earring",
    },
    skills: [
      "Rapid Shot",
      "Deadly Eye",
      "Sniper",
      "Multiple Shot",
      "Stun Shot",
      "Mortal Blow",
      "Arrow Rain",
      "Long Shot",
    ],
    skillsRu: [
      "Быстрая стрельба",
      "Смертоносный глаз",
      "Снайпер",
      "Множественный выстрел",
      "Оглушающий выстрел",
      "Смертельный удар",
      "Дождь стрел",
      "Дальний выстрел",
    ],
    farmZones: ["Ketra Orcs", "Varka Silenos", "Monastery of Silence", "TOI"],
    pvpRating: 8,
    pveRating: 7,
    difficultyRating: 6,
  },
  {
    id: "archmage",
    name: "Archmage",
    nameRu: "Архмаг",
    race: "Human",
    type: "mage",
    tier: 3,
    requiredLevel: 76,
    description:
      "The Archmage is the pinnacle of human spellcasting — master of fire magic with the powerful Cancel skill that strips buffs.",
    descriptionRu:
      "Архмаг — высший маг людей. Мастер огненной магии с уникальным умением Cancel (снятие баффов). Крайне опасен в PvP из-за Cancel. В PvE — мощный AoE фармер.",
    stats: { str: 39, dex: 43, con: 43, int: 88, wit: 67, men: 64 },
    role: "Elemental Mage DPS",
    roleRu: "Маг стихий / ДД",
    strengths: [
      "Уникальное умение Cancel (снятие баффов)",
      "Мощная огненная магия",
      "Отличный AoE в группе",
      "Сильный в PvP против баффированных врагов",
    ],
    weaknesses: [
      "Очень хрупкий — лёгкая цель",
      "Уязвим при быстром сближении врага",
      "Зависимость от MP",
    ],
    equipment: {
      weapon: "Vesper Caster (S84) / Arcana Mace (S)",
      armor: "Arcana Robe Set (S)",
      jewelry: "Majestic Earring, Orfen Earring, Baium Ring",
    },
    skills: [
      "Prominence",
      "Blaze",
      "Inferno",
      "Cancel",
      "Surrender to Fire",
      "Freezing Shackle",
      "Flame Strike",
    ],
    skillsRu: [
      "Выступ (огненная атака)",
      "Пламя",
      "Ад",
      "Отмена баффов",
      "Слабость к огню",
      "Ледяные оковы",
      "Огненный удар",
    ],
    farmZones: ["Blazing Swamp", "TOI", "Monastery of Silence", "Primeval Island"],
    pvpRating: 8,
    pveRating: 8,
    difficultyRating: 7,
  },
  {
    id: "soultaker",
    name: "Soultaker",
    nameRu: "Похититель Душ",
    race: "Human",
    type: "mage",
    tier: 3,
    requiredLevel: 76,
    description:
      "Soultaker is the dark necromancer class — commands undead servants, uses dark magic, and possesses powerful debuff skills.",
    descriptionRu:
      "Похититель Душ — высший некромант. Повелитель нежити и тёмной магии. Призывает мощных существ-нежить, использует дотовые заклинания. Хорош для соло-фарма благодаря нежити.",
    stats: { str: 41, dex: 44, con: 44, int: 87, wit: 65, men: 62 },
    role: "Dark Mage / Necromancer",
    roleRu: "Тёмный маг / Некромант",
    strengths: [
      "Мощные призванные нежити как щит и ДД",
      "Хороший для соло-фарма",
      "Fear — контроль врагов",
      "Дотовые заклинания для кайтинга",
    ],
    weaknesses: [
      "Нижний уровень прямого урона среди магов",
      "Медленный по сравнению с другими магами",
      "Управление нежитью требует внимания",
    ],
    equipment: {
      weapon: "Arcana Mace (S) / Vesper Caster (S84)",
      armor: "Arcana Robe Set (S)",
      jewelry: "Orfen Earring, Zaken Earring, Baium Ring",
    },
    skills: [
      "Poison Blade Dance",
      "Mass Curse",
      "Death Spike",
      "Soul Drain",
      "Summon Cursed Bones",
      "Summon Shadow",
      "Corpse Burst",
    ],
    skillsRu: [
      "Танец ядовитых клинков",
      "Массовое проклятие",
      "Шип смерти",
      "Поглощение душ",
      "Призыв проклятых костей",
      "Призыв тени",
      "Взрыв трупа",
    ],
    farmZones: ["Monastery of Silence", "TOI", "Primeval Isle", "Antharas Lair"],
    pvpRating: 7,
    pveRating: 8,
    difficultyRating: 7,
  },
  {
    id: "cardinal",
    name: "Cardinal",
    nameRu: "Кардинал",
    race: "Human",
    type: "priest",
    tier: 3,
    requiredLevel: 76,
    description:
      "The Cardinal is the supreme healer in Lineage 2. No group can survive without a Cardinal in high-level content.",
    descriptionRu:
      "Кардинал — верховный целитель. Незаменим в любой серьёзной группе. Массовое лечение, воскрешение, снятие негативных эффектов — лучший в своей роли. Без Кардинала сложно выжить на топ-контенте.",
    stats: { str: 40, dex: 44, con: 45, int: 80, wit: 65, men: 76 },
    role: "Supreme Healer / Support",
    roleRu: "Верховный хилер / Поддержка",
    strengths: [
      "Лучшее массовое лечение в игре",
      "Воскрешение и снятие дебаффов",
      "Noblesse Blessing",
      "Незаменим в рейд-группах",
    ],
    weaknesses: [
      "Нет боевой роли",
      "Уязвим в PvP",
      "Требует постоянного запаса MP Potion",
    ],
    equipment: {
      weapon: "Arcana Mace (S) / Vesper Retributer (S84)",
      armor: "Arcana Robe Set (S)",
      jewelry: "Orfen Earring (MP regen), Angel Ring, Baium Ring",
    },
    skills: [
      "Group Heal",
      "Greater Group Heal",
      "Resurrection",
      "Clarity",
      "Purify",
      "Holy Weapon",
      "Noblesse Blessing",
      "Mass Resurrection",
    ],
    skillsRu: [
      "Групповое лечение",
      "Усиленное групповое лечение",
      "Воскрешение",
      "Ясность (экономия MP)",
      "Очищение",
      "Освящение оружия",
      "Благословение дворян",
      "Массовое воскрешение",
    ],
    farmZones: ["Любые групповые зоны", "Antharas Lair", "Valakas Lair", "Baium Tower"],
    pvpRating: 4,
    pveRating: 10,
    difficultyRating: 5,
  },
  {
    id: "hierophant",
    name: "Hierophant",
    nameRu: "Иерофант",
    race: "Human",
    type: "priest",
    tier: 3,
    requiredLevel: 76,
    description:
      "Hierophant is the ultimate buffer — provides the strongest single-target and group buffs in the game.",
    descriptionRu:
      "Иерофант — высший баффер. Предоставляет сильнейшие единичные и групповые усиления. Незаменим для эффективного фарма и PvP. Хорошо настроенная группа с Иерофантом фармит в 2–3 раза быстрее.",
    stats: { str: 41, dex: 44, con: 46, int: 79, wit: 64, men: 74 },
    role: "Buffer / Group Support",
    roleRu: "Баффер / Поддержка группы",
    strengths: [
      "Сильнейшие баффы в игре",
      "Повышает эффективность всей группы",
      "Prayer of Protection для группы",
      "Ценен в любом контенте",
    ],
    weaknesses: [
      "Нет самостоятельного боевого потенциала",
      "Уязвим без группы",
      "Должен постоянно мониторить баффы",
    ],
    equipment: {
      weapon: "Arcana Mace / Majestic Staff (A)",
      armor: "Arcana Robe Set / Dark Crystal Robe (A)",
      jewelry: "Orfen Earring, Angel Ring",
    },
    skills: [
      "Might",
      "Shield",
      "Blessed Soul",
      "Holy Armor",
      "Battle Roar",
      "Prayer",
      "Haste",
      "Wind Walk",
    ],
    skillsRu: [
      "Мощь",
      "Щит",
      "Благословенная душа",
      "Святая броня",
      "Боевой клич",
      "Молитва",
      "Спешка",
      "Бег по ветру",
    ],
    farmZones: ["Любые групповые зоны — Иерофант всегда нужен"],
    pvpRating: 5,
    pveRating: 10,
    difficultyRating: 4,
  },
  {
    id: "evas-templar",
    name: "Eva's Templar",
    nameRu: "Эвасор (Храмовник Эвы)",
    race: "Elf",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "Eva's Templar is the elven tank — faster and more agile than human tanks, with unique water-based support abilities.",
    descriptionRu:
      "Храмовник Эвы — эльфийский танк. Быстрее и ловче человеческих танков. Уникальные водные умения поддержки. Отличная мобильность, хороший вариант для динамичного контента.",
    stats: { str: 76, dex: 66, con: 80, int: 35, wit: 47, men: 56 },
    role: "Agile Tank / Water Support",
    roleRu: "Подвижный танк / Водная поддержка",
    strengths: [
      "Лучшая мобильность среди танков",
      "Уникальные водные умения",
      "Быстрый и ловкий",
      "Хорошая поддержка группы",
    ],
    weaknesses: ["Чуть меньше HP чем у человеческих танков", "Меньший урон в ближнем бою"],
    equipment: {
      weapon: "Vesper Cleaver / Icarus Sawsword",
      armor: "Imperial Crusader Set",
      jewelry: "Baium Ring, Tezza Necklace",
    },
    skills: ["Evas Blessing", "Mirror Image", "Holy Blade", "Aegis", "Water Resistance"],
    skillsRu: [
      "Благословение Эвы",
      "Зеркальное отражение",
      "Святой клинок",
      "Эгида",
      "Сопротивление воде",
    ],
    farmZones: ["TOI", "Monastery of Silence", "Giants Cave"],
    pvpRating: 7,
    pveRating: 8,
    difficultyRating: 6,
  },
  {
    id: "moonlight-sentinel",
    name: "Moonlight Sentinel",
    nameRu: "Ночной Страж",
    race: "Elf",
    type: "rogue",
    tier: 3,
    requiredLevel: 76,
    description:
      "Moonlight Sentinel is the fastest archer in the game — elven speed combined with deadly precision.",
    descriptionRu:
      "Ночной Страж — самый быстрый лучник в игре. Эльфийская скорость + смертоносная точность. Высокая скорость атаки компенсирует немного меньший урон по сравнению с тёмным вариантом.",
    stats: { str: 76, dex: 82, con: 67, int: 32, wit: 45, men: 46 },
    role: "Fast Ranged DPS",
    roleRu: "Быстрый дальний ДД",
    strengths: [
      "Наибольшая скорость атаки среди лучников",
      "Высокое уклонение",
      "Хорошая мобильность",
      "Быстрый фарм с кайтингом",
    ],
    weaknesses: [
      "Немного меньший разовый урон чем Ghost Sentinel",
      "Слаб в ближнем бою",
    ],
    equipment: {
      weapon: "Elven Long Bow → Vesper Thrower",
      armor: "Dark Crystal Light / Imperial Leather",
      jewelry: "Majestic Earring, DEX Jewellery",
    },
    skills: ["Rapid Shot", "Multiple Arrow", "Evasion", "Arrow Shower", "Silver Arrow Strike"],
    skillsRu: ["Быстрая стрельба", "Множественный выстрел", "Уклонение", "Ливень стрел", "Удар серебряной стрелы"],
    farmZones: ["Ketra Orcs", "Varka Silenos", "Monastery", "TOI"],
    pvpRating: 8,
    pveRating: 7,
    difficultyRating: 6,
  },
  {
    id: "ghost-sentinel",
    name: "Ghost Sentinel",
    nameRu: "Призрачный Страж",
    race: "Dark Elf",
    type: "rogue",
    tier: 3,
    requiredLevel: 76,
    description:
      "Ghost Sentinel is the dark elf archer — combines highest single-shot damage with dark curse abilities. Top Olympiad archer.",
    descriptionRu:
      "Призрачный Страж — лучник тёмных эльфов. Наибольший единоразовый урон среди лучников. Тёмные проклятья и дотовые умения. Лучший вариант для Олимпиады среди арчеров.",
    stats: { str: 80, dex: 78, con: 67, int: 36, wit: 47, men: 46 },
    role: "High Damage Ranged DPS / Olympiad",
    roleRu: "Мощный дальний ДД / Олимпиада",
    strengths: [
      "Наибольший разовый урон среди лучников",
      "Тёмные умения — доты и проклятия",
      "Лучший для Олимпиады",
      "Focus Death — кратное усиление урона",
    ],
    weaknesses: [
      "Слабее скоростью атаки чем Moonlight Sentinel",
      "Уязвим в ближнем бою",
      "Высокая зависимость от снаряжения",
    ],
    equipment: {
      weapon: "Vesper Thrower (S84) / Icarus Spitter",
      armor: "Imperial Leather Light Set",
      jewelry: "Majestic Earring, Zaken Earring, Baium Ring",
    },
    skills: [
      "Focus Death",
      "Dark Curse",
      "Multiple Arrow",
      "Stun Shot",
      "Shadow Step",
      "Mortal Blow",
      "Evasion",
    ],
    skillsRu: [
      "Сосредоточение смерти",
      "Тёмное проклятие",
      "Множественный выстрел",
      "Оглушающий выстрел",
      "Шаг в тень",
      "Смертельный удар",
      "Уклонение",
    ],
    farmZones: ["Ketra Orcs", "Varka Silenos", "Monastery of Silence", "Giants Cave"],
    pvpRating: 9,
    pveRating: 7,
    difficultyRating: 7,
  },
  {
    id: "shillien-saint",
    name: "Shillien Saint",
    nameRu: "Святая Шиллен",
    race: "Dark Elf",
    type: "priest",
    tier: 3,
    requiredLevel: 76,
    description:
      "Shillien Saint is the dark elf healer — slightly less pure healing than Cardinal but has unique dark magic buffs and debuffs.",
    descriptionRu:
      "Святая Шиллен — тёмный хилер. Немного слабее Кардинала по лечению, но имеет уникальные тёмные баффы и дебаффы. Часто используется как второй хилер в топ-группах.",
    stats: { str: 40, dex: 46, con: 43, int: 83, wit: 66, men: 74 },
    role: "Dark Healer / Support",
    roleRu: "Тёмный хилер / Поддержка",
    strengths: [
      "Хорошее лечение",
      "Уникальные тёмные дебаффы",
      "Быстрый каст баффов",
      "Полезен в PvP",
    ],
    weaknesses: [
      "Немного слабее Кардинала по объёму лечения",
      "Уязвим в открытом PvP",
    ],
    equipment: {
      weapon: "Arcana Mace / Vesper Retributer",
      armor: "Arcana Robe / Dark Crystal Robe Set",
      jewelry: "Orfen Earring, Baium Ring",
    },
    skills: ["Heal", "Group Heal", "Resurrection", "Shillien Breath", "Dark Veil", "Purify"],
    skillsRu: ["Лечение", "Групповое лечение", "Воскрешение", "Дыхание Шиллен", "Тёмная завеса", "Очищение"],
    farmZones: ["TOI", "Monastery of Silence", "Antharas Lair"],
    pvpRating: 4,
    pveRating: 9,
    difficultyRating: 5,
  },
  {
    id: "titan",
    name: "Titan",
    nameRu: "Титан",
    race: "Orc",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "Titan is the ultimate berserker — insane AoE damage, high HP, unstoppable in large fights. The most feared warrior on the battlefield.",
    descriptionRu:
      "Титан — берсерк орков. Огромный AoE урон, максимальный HP. Один из самых страшных воинов на поле боя. Использует двуручное оружие для уничтожения групп врагов.",
    stats: { str: 93, dex: 60, con: 85, int: 26, wit: 38, men: 40 },
    role: "AoE Berserker / Mass Destruction",
    roleRu: "AoE берсерк / Массовое уничтожение",
    strengths: [
      "Наибольшая сила среди всех классов",
      "Огромный AoE урон",
      "Великолепный HP",
      "Страшен в осадах и массовом PvP",
    ],
    weaknesses: [
      "Медленный",
      "Уязвим к Magic и скоростным классам",
      "Сложно в соло PvP",
    ],
    equipment: {
      weapon: "Vesper Slasher (S84) двуручный / Icarus Hall (двуручный меч S80)",
      armor: "Imperial Crusader Heavy Set",
      jewelry: "Baium Ring, Antharas Earring, Zaken Earring",
    },
    skills: ["Rage", "Raging Force", "War Frenzy", "Battle Cry", "HP Limit", "Great Fury"],
    skillsRu: ["Ярость", "Яростная сила", "Боевое безумие", "Боевой клич", "Предел HP", "Великая ярость"],
    farmZones: ["Blazing Swamp", "TOI", "Imperial Tomb", "Giants Cave"],
    pvpRating: 7,
    pveRating: 9,
    difficultyRating: 5,
  },
  {
    id: "grand-khavatari",
    name: "Grand Khavatari",
    nameRu: "Великий Кхаватари",
    race: "Orc",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "Grand Khavatari is the master of hand-to-hand combat — fastest attack speed among melee classes, uses fists/cestus weapons.",
    descriptionRu:
      "Великий Кхаватари — мастер рукопашного боя. Наибольшая скорость атаки среди воинов ближнего боя. Использует кастеты. Буря ударов в секунду на близкой дистанции.",
    stats: { str: 90, dex: 68, con: 82, int: 27, wit: 40, men: 41 },
    role: "Melee DPS / Fast Attacker",
    roleRu: "Рукопашный ДД / Быстрый атакующий",
    strengths: [
      "Высочайшая скорость атаки",
      "Мощные удары рукопашного боя",
      "Высокий HP",
      "Хорошая мобильность для орка",
    ],
    weaknesses: ["Только ближний бой", "Слабее Дуэлянта в PvP", "Уязвим к магии"],
    equipment: {
      weapon: "Vesper Dual Fist (S84) / Icarus Hammer (кастеты S80)",
      armor: "Imperial Crusader Heavy Set",
      jewelry: "Baium Ring, Antharas Earring",
    },
    skills: ["Burning Fist", "Hurricane Kick", "Rushing Fist", "Punishing Kick", "Battle Cry"],
    skillsRu: ["Горящий кулак", "Ураганный удар ногой", "Молниеносный кулак", "Карающий удар", "Боевой клич"],
    farmZones: ["Blazing Swamp", "TOI", "Giants Cave"],
    pvpRating: 7,
    pveRating: 8,
    difficultyRating: 6,
  },
  {
    id: "fortune-seeker",
    name: "Fortune Seeker",
    nameRu: "Искатель Удачи",
    race: "Dwarf",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "Fortune Seeker is the ultimate spoiler — a Dwarf that excels at resource gathering with the Spoil/Sweep mechanic while being a competent melee fighter.",
    descriptionRu:
      "Искатель Удачи — высший спойлер. Специалист по сбору ресурсов с монстров через механику Spoil/Sweep. Компетентный воин в ближнем бою с дубинками. Самый экономически выгодный класс в игре.",
    stats: { str: 86, dex: 60, con: 78, int: 34, wit: 44, men: 50 },
    role: "Resource Gatherer / Support DPS",
    roleRu: "Сборщик ресурсов / Экономический класс",
    strengths: [
      "Уникальный спойл — в 2–5 раз больше ресурсов",
      "Самоокупаемый класс",
      "Компетентный воин с дубинками",
      "Ценен в любом сервере",
    ],
    weaknesses: [
      "Меньший урон чем чистые ДД",
      "Ограниченный набор умений ближнего боя",
      "Нет AoE атак",
    ],
    equipment: {
      weapon: "Vesper Slasher (S84) / Dynasty Buster (дубинка)",
      armor: "Imperial Crusader / Vesper Heavy Set",
      jewelry: "Baium Ring, Antharas Earring",
    },
    skills: ["Spoil", "Sweep", "Lucky", "Critical Chance", "Might of Heaven"],
    skillsRu: ["Спойл", "Сбор", "Удача", "Шанс критического удара", "Небесная мощь"],
    farmZones: ["Monastery of Silence", "TOI", "Primeval Island", "Giants Cave"],
    pvpRating: 5,
    pveRating: 8,
    difficultyRating: 4,
  },
  {
    id: "maestro",
    name: "Maestro",
    nameRu: "Маэстро",
    race: "Dwarf",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "Maestro is the supreme crafter — can create the best weapons and armor in the game and also fight competently as a melee warrior.",
    descriptionRu:
      "Маэстро — верховный кузнец. Единственный, кто может создавать лучшее снаряжение S84-grade. Также умеет призывать боевых кубов и воевать в ближнем бою. Один из самых ценных классов на сервере.",
    stats: { str: 84, dex: 58, con: 80, int: 35, wit: 45, men: 52 },
    role: "Master Crafter / Support Fighter",
    roleRu: "Мастер крафта / Боевой ремесленник",
    strengths: [
      "Единственный, кто может крафтить S84 снаряжение",
      "Ценнейший класс для экономики сервера",
      "Боевые кубы для поддержки",
      "Компетентный воин",
    ],
    weaknesses: ["Зависит от рецептов и материалов", "Не ДД-класс", "Прокачка дорого стоит"],
    equipment: {
      weapon: "Dynasty Buster / Vesper Slasher",
      armor: "Imperial Crusader / Vesper Heavy Set",
      jewelry: "Baium Ring, Zaken Earring",
    },
    skills: ["Manufacture", "Cubic Mastery", "Summon Battle Cubic", "Lucky", "Spoil Fortune"],
    skillsRu: ["Производство", "Мастерство кубов", "Призыв боевого куба", "Удача", "Богатый спойл"],
    farmZones: ["Различные зоны для сбора S-grade материалов"],
    pvpRating: 4,
    pveRating: 7,
    difficultyRating: 4,
  },
  {
    id: "spectral-dancer",
    name: "Spectral Dancer",
    nameRu: "Спектральный Танцор",
    race: "Dark Elf",
    type: "fighter",
    tier: 3,
    requiredLevel: 76,
    description:
      "Spectral Dancer is the dark elven dancer — provides powerful debuffs to enemies through dance skills while also dealing damage.",
    descriptionRu:
      "Спектральный Танцор — тёмный танцор. Накладывает мощные дебаффы на врагов через танцевальные умения. Работает в паре с Бардом (Symphony Singer). Уникальная роль в группе.",
    stats: { str: 80, dex: 72, con: 71, int: 37, wit: 50, men: 46 },
    role: "Debuffer / Support DPS",
    roleRu: "Дебаффер / Поддерживающий ДД",
    strengths: [
      "Мощные дебаффы через танцы",
      "Уникальная роль в группе",
      "Собственный урон",
      "Ценен в PvP для ослабления противника",
    ],
    weaknesses: ["Танцы требуют MP", "Ограничен в самостоятельном фарме", "Зависит от партнёра"],
    equipment: {
      weapon: "Icarus Sawsword / Vesper Shaper",
      armor: "Dark Crystal Light / Imperial Leather",
      jewelry: "Majestic Earring, Baium Ring",
    },
    skills: ["Dance of Warrior", "Dance of Siren", "Dance of Mystic", "Death Whisper", "Seal of Slow"],
    skillsRu: ["Танец воина", "Танец сирены", "Танец мистика", "Шёпот смерти", "Печать замедления"],
    farmZones: ["TOI", "Monastery of Silence", "Giants Cave"],
    pvpRating: 7,
    pveRating: 7,
    difficultyRating: 7,
  },
  {
    id: "storm-screamer",
    name: "Storm Screamer",
    nameRu: "Буревестник",
    race: "Dark Elf",
    type: "mage",
    tier: 3,
    requiredLevel: 76,
    description:
      "Storm Screamer is the dark elven lightning mage — combines devastating AoE storm spells with dark curse magic.",
    descriptionRu:
      "Буревестник — маг молний тёмных эльфов. Разрушительные AoE заклинания бури в сочетании с тёмными проклятиями. Один из сильнейших магов в открытом PvP.",
    stats: { str: 40, dex: 46, con: 42, int: 90, wit: 66, men: 62 },
    role: "Lightning Mage DPS",
    roleRu: "Маг молний / ДД",
    strengths: [
      "Мощнейшие AoE заклинания молнии",
      "Тёмные проклятия и дебаффы",
      "Силён в открытом PvP",
      "Высокий базовый INT",
    ],
    weaknesses: ["Очень хрупок", "Уязвим при сближении", "Требует поддержки хилера"],
    equipment: {
      weapon: "Vesper Caster / Arcana Mace",
      armor: "Arcana Robe Set",
      jewelry: "Orfen Earring, Baium Ring, Majestic Earring",
    },
    skills: ["Tempest", "Twister", "Hurricane", "Dark Vortex", "Surrender to Wind", "Death Whisper"],
    skillsRu: ["Буря", "Вихрь", "Ураган", "Тёмный водоворот", "Слабость к ветру", "Шёпот смерти"],
    farmZones: ["TOI", "Monastery of Silence", "Primeval Island", "Giants Cave"],
    pvpRating: 8,
    pveRating: 8,
    difficultyRating: 7,
  },
  {
    id: "doomcryer",
    name: "Doomcryer",
    nameRu: "Крикун Гибели",
    race: "Orc",
    type: "priest",
    tier: 3,
    requiredLevel: 76,
    description:
      "Doomcryer is the orc buffer — powerful war cries that empower the entire group. Complements the Prophet class perfectly.",
    descriptionRu:
      "Крикун Гибели — баффер-орк. Мощные военные крики усиливают всю группу. Хорошо дополняет Пророка/Иерофанта. Особенно ценен в PvP для боевых усилений.",
    stats: { str: 60, dex: 50, con: 62, int: 68, wit: 60, men: 72 },
    role: "War Buffer / Combat Support",
    roleRu: "Боевой баффер / Поддержка",
    strengths: [
      "Уникальные военные крики",
      "Повышает атаку и защиту группы",
      "Ценен в осадах",
      "Боевой дух — уникальный бафф",
    ],
    weaknesses: ["Меньше чистых хил-умений чем у Иерофанта", "Ограниченный набор баффов"],
    equipment: {
      weapon: "Majestic Staff (A) / Arcana Mace",
      armor: "Dark Crystal Robe / Arcana Robe Set",
      jewelry: "Orfen Earring, Baium Ring",
    },
    skills: ["War Cry", "Battle Roar", "Morale Boost", "Thunder Storm Shout", "Greater Battle Cry"],
    skillsRu: ["Боевой клич", "Клич битвы", "Поднятие боевого духа", "Раскат грома", "Великий боевой клич"],
    farmZones: ["Любые групповые зоны"],
    pvpRating: 6,
    pveRating: 9,
    difficultyRating: 4,
  },
];
