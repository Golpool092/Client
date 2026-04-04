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
  bonuses: string[];
  paths: ClassNode[];
}

export const RACES: RaceData[] = [
  {
    id: "human",
    name: "Люди (Human)",
    nameEn: "Human",
    description: "Люди — наиболее универсальная раса. Имеют сбалансированные характеристики и самое большое разнообразие классов. Подходят как новичкам, так и опытным игрокам.",
    bonuses: ["Сбалансированные характеристики", "Большое разнообразие классов", "Хорошая репутация в игровом мире"],
    paths: [
      {
        name: "Воин (Fighter)", nameEn: "Fighter", level: 1, role: "Физический ДД/Танк",
        children: [
          { name: "Гладиатор (Gladiator)", nameEn: "Gladiator", level: 20, role: "Физический ДД (мечи)",
            children: [{ name: "Дуэлянт (Duelist)", nameEn: "Duelist", level: 76, role: "Мастер дуэлей" }]
          },
          { name: "Военачальник (Warlord)", nameEn: "Warlord", level: 20, role: "Копьё + AoE",
            children: [{ name: "Дредноут (Dreadnought)", nameEn: "Dreadnought", level: 76, role: "AoE воин" }]
          },
          { name: "Паладин (Paladin)", nameEn: "Paladin", level: 20, role: "Танк (свет)",
            children: [{ name: "Рыцарь Феникса (Phoenix Knight)", nameEn: "Phoenix Knight", level: 76, role: "Светлый танк" }]
          },
          { name: "Тёмный Мститель (Dark Avenger)", nameEn: "Dark Avenger", level: 20, role: "Танк (тьма)",
            children: [{ name: "Адский Рыцарь (Hell Knight)", nameEn: "Hell Knight", level: 76, role: "Тёмный танк" }]
          },
          { name: "Следопыт (Rogue)", nameEn: "Rogue", level: 20, role: "Ловкач/Лучник",
            children: [
              { name: "Мастер клинков (Treasure Hunter)", nameEn: "Treasure Hunter", level: 40, role: "Разведчик",
                children: [{ name: "Пред. судьбы (Fortune Seeker)", nameEn: "Fortune Seeker", level: 76, role: "Авантюрист" }]
              },
              { name: "Ястреб (Hawkeye)", nameEn: "Hawkeye", level: 40, role: "Лучник",
                children: [{ name: "Сагиттариус (Sagittarius)", nameEn: "Sagittarius", level: 76, role: "Лучник-мастер" }]
              }
            ]
          }
        ]
      },
      {
        name: "Маг (Mage)", nameEn: "Mage", level: 1, role: "Магический ДД/Поддержка",
        children: [
          { name: "Волшебник (Wizard)", nameEn: "Wizard", level: 20, role: "Маг огня/воды/земли",
            children: [
              { name: "Маг Огня (Sorcerer)", nameEn: "Sorcerer", level: 40, role: "Маг огня",
                children: [{ name: "Ар. маг (Archmage)", nameEn: "Archmage", level: 76, role: "Верховный маг огня" }]
              },
              { name: "Маг Воды (Necromancer)", nameEn: "Necromancer", level: 40, role: "Некромант",
                children: [{ name: "Соев. мертвецов (Soultaker)", nameEn: "Soultaker", level: 76, role: "Мастер мёртвых" }]
              },
              { name: "Призыватель (Warlock)", nameEn: "Warlock", level: 40, role: "Призыватель",
                children: [{ name: "Аркан призыв (Arcana Lord)", nameEn: "Arcana Lord", level: 76, role: "Повелитель духов" }]
              }
            ]
          },
          { name: "Клирик (Cleric)", nameEn: "Cleric", level: 20, role: "Лекарь/Поддержка",
            children: [
              { name: "Епископ (Bishop)", nameEn: "Bishop", level: 40, role: "Главный хилер",
                children: [{ name: "Кардинал (Cardinal)", nameEn: "Cardinal", level: 76, role: "Высший жрец" }]
              },
              { name: "Пророк (Prophet)", nameEn: "Prophet", level: 40, role: "Баффер",
                children: [{ name: "Иерофант (Hierophant)", nameEn: "Hierophant", level: 76, role: "Мастер баффов" }]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "elf",
    name: "Светлые эльфы (Elf)",
    nameEn: "Elf",
    description: "Эльфы — изящная и быстрая раса. Отличные лучники и маги воды/воздуха. Имеют бонусы к скорости и ловкости.",
    bonuses: ["Высокая скорость передвижения", "Бонус к DEX и WIT", "Сильные лучники и маги воды"],
    paths: [
      {
        name: "Эльф-воин (Elven Fighter)", nameEn: "Elven Fighter", level: 1, role: "Физический ДД",
        children: [
          { name: "Эльф-рыцарь (Elven Knight)", nameEn: "Elven Knight", level: 20, role: "Танк/ДД",
            children: [
              { name: "Темплар (Temple Knight)", nameEn: "Temple Knight", level: 40, role: "Эльф-танк",
                children: [{ name: "Эваст. рыцарь (Eva's Templar)", nameEn: "Eva's Templar", level: 76, role: "Светлый танк-эльф" }]
              },
              { name: "Страж (Swordsinger)", nameEn: "Swordsinger", level: 40, role: "Поддержка-певец",
                children: [{ name: "Мастер клинка (Sword Muse)", nameEn: "Sword Muse", level: 76, role: "Мастер клинка-певец" }]
              }
            ]
          },
          { name: "Эльф-следопыт (Elven Scout)", nameEn: "Elven Scout", level: 20, role: "Лучник/Ловкач",
            children: [
              { name: "Планарный странник (Plainswalker)", nameEn: "Plainswalker", level: 40, role: "Скоростной ДД",
                children: [{ name: "Ветер леса (Wind Rider)", nameEn: "Wind Rider", level: 76, role: "Мастер скорости" }]
              },
              { name: "Серебряный рейнджер (Silver Ranger)", nameEn: "Silver Ranger", level: 40, role: "Лучник",
                children: [{ name: "Мунлайт сентинел (Moonlight Sentinel)", nameEn: "Moonlight Sentinel", level: 76, role: "Лунный страж" }]
              }
            ]
          }
        ]
      },
      {
        name: "Эльф-маг (Elven Mage)", nameEn: "Elven Mage", level: 1, role: "Маг воды/воздуха",
        children: [
          { name: "Эльф-волшебник (Elven Wizard)", nameEn: "Elven Wizard", level: 20, role: "Маг",
            children: [
              { name: "Ворожея (Spellsinger)", nameEn: "Spellsinger", level: 40, role: "Маг воды",
                children: [{ name: "Архзаклинатель (Mystic Muse)", nameEn: "Mystic Muse", level: 76, role: "Высшая ворожея" }]
              },
              { name: "Элементалист (Elemental Summoner)", nameEn: "Elemental Summoner", level: 40, role: "Призыватель",
                children: [{ name: "Эваст. призыватель (Elemental Master)", nameEn: "Elemental Master", level: 76, role: "Мастер стихий" }]
              }
            ]
          },
          { name: "Эльф-жрец (Elven Oracle)", nameEn: "Elven Oracle", level: 20, role: "Хилер/Поддержка",
            children: [
              { name: "Прорицатель (Elven Elder)", nameEn: "Elven Elder", level: 40, role: "Хилер",
                children: [{ name: "Страж Эвы (Eva's Saint)", nameEn: "Eva's Saint", level: 76, role: "Верховный жрец Эвы" }]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "dark-elf",
    name: "Тёмные эльфы (Dark Elf)",
    nameEn: "Dark Elf",
    description: "Тёмные эльфы — сильные и опасные. Высокая атака, хорошие маги тьмы и некроманты. Имеют бонус к STR и INT.",
    bonuses: ["Высокий STR и INT", "Лучшие маги тьмы", "Мощные воины-ДД"],
    paths: [
      {
        name: "Тёмный воин (Dark Fighter)", nameEn: "Dark Fighter", level: 1, role: "Физический ДД",
        children: [
          { name: "Рыцарь тьмы (Palus Knight)", nameEn: "Palus Knight", level: 20, role: "Танк/ДД",
            children: [
              { name: "Тёмный рыцарь (Shillien Knight)", nameEn: "Shillien Knight", level: 40, role: "Тёмный танк",
                children: [{ name: "Шилл. стражник (Shillien Templar)", nameEn: "Shillien Templar", level: 76, role: "Верховный тёмный танк" }]
              },
              { name: "Мастер лезвий (Bladedancer)", nameEn: "Bladedancer", level: 40, role: "Поддержка-танцор",
                children: [{ name: "Спектральный танцор (Spectral Dancer)", nameEn: "Spectral Dancer", level: 76, role: "Мастер танца" }]
              }
            ]
          },
          { name: "Ассасин (Assassin)", nameEn: "Assassin", level: 20, role: "Ловкач/Убийца",
            children: [
              { name: "Абисс-ходок (Abyss Walker)", nameEn: "Abyss Walker", level: 40, role: "Теневой ДД",
                children: [{ name: "Призрак охотника (Ghost Hunter)", nameEn: "Ghost Hunter", level: 76, role: "Мастер теней" }]
              },
              { name: "Тёмный рейнджер (Phantom Ranger)", nameEn: "Phantom Ranger", level: 40, role: "Тёмный лучник",
                children: [{ name: "Призрак стрелка (Ghost Sentinel)", nameEn: "Ghost Sentinel", level: 76, role: "Тёмный лучник-мастер" }]
              }
            ]
          }
        ]
      },
      {
        name: "Тёмный маг (Dark Mage)", nameEn: "Dark Mage", level: 1, role: "Маг тьмы",
        children: [
          { name: "Тёмный волшебник (Dark Wizard)", nameEn: "Dark Wizard", level: 20, role: "Маг тьмы",
            children: [
              { name: "Тёмный наг (Spellhowler)", nameEn: "Spellhowler", level: 40, role: "Маг тьмы/огня",
                children: [{ name: "Штормовой вестник (Storm Screamer)", nameEn: "Storm Screamer", level: 76, role: "Верховный маг тьмы" }]
              },
              { name: "Тёмный призыватель (Phantom Summoner)", nameEn: "Phantom Summoner", level: 40, role: "Призыватель теней",
                children: [{ name: "Спект. маг (Spectral Master)", nameEn: "Spectral Master", level: 76, role: "Мастер призраков" }]
              }
            ]
          },
          { name: "Жрица Шиллены (Shillien Oracle)", nameEn: "Shillien Oracle", level: 20, role: "Тёмный хилер",
            children: [
              { name: "Шилл. прорицательница (Shillien Elder)", nameEn: "Shillien Elder", level: 40, role: "Тёмный хилер",
                children: [{ name: "Шилл. святая (Shillien Saint)", nameEn: "Shillien Saint", level: 76, role: "Верховная жрица тьмы" }]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "orc",
    name: "Орки (Orc)",
    nameEn: "Orc",
    description: "Орки — самая сильная и выносливая раса. Высокий STR и CON. Лучшие в ближнем бою, отличные шаманы.",
    bonuses: ["Наивысший STR и CON", "Стойкость к стунам", "Мощные шаманы-баферы"],
    paths: [
      {
        name: "Орк-воин (Orc Fighter)", nameEn: "Orc Fighter", level: 1, role: "Сильнейший физ. ДД",
        children: [
          { name: "Монах (Monk)", nameEn: "Monk", level: 20, role: "Бой без оружия",
            children: [
              { name: "Тиран (Tyrant)", nameEn: "Tyrant", level: 40, role: "Мощный кулачный боец",
                children: [{ name: "Grand Khavatari", nameEn: "Grand Khavatari", level: 76, role: "Верховный кулачный мастер" }]
              }
            ]
          },
          { name: "Орк-рейдер (Orc Raider)", nameEn: "Orc Raider", level: 20, role: "Мощный воин",
            children: [
              { name: "Разрушитель (Destroyer)", nameEn: "Destroyer", level: 40, role: "AoE ДД с большой силой",
                children: [{ name: "Титан (Titan)", nameEn: "Titan", level: 76, role: "Верховный разрушитель" }]
              }
            ]
          }
        ]
      },
      {
        name: "Орк-шаман (Orc Shaman)", nameEn: "Orc Shaman", level: 1, role: "Шаман/Баффер",
        children: [
          { name: "Захватчик душ (Overlord)", nameEn: "Overlord", level: 20, role: "Клановый баффер",
            children: [{ name: "Доминатор (Dominator)", nameEn: "Dominator", level: 76, role: "Верховный клановый маг" }]
          },
          { name: "Варвар (Warcryer)", nameEn: "Warcryer", level: 20, role: "Групповой баффер",
            children: [{ name: "Досплетатель (Doomcryer)", nameEn: "Doomcryer", level: 76, role: "Групповой баффер высшего уровня" }]
          }
        ]
      }
    ]
  },
  {
    id: "dwarf",
    name: "Гномы (Dwarf)",
    nameEn: "Dwarf",
    description: "Гномы — мастера ремёсел и торговли. Спойлеры и крафтеры. Единственная раса с доступом к крафту высокого уровня.",
    bonuses: ["Уникальный спойл (получение ресурсов с монстров)", "Крафт и создание предметов", "Высокий CON"],
    paths: [
      {
        name: "Гном-воин (Dwarf Fighter)", nameEn: "Dwarf Fighter", level: 1, role: "Воин/Спойлер",
        children: [
          { name: "Спойлер (Scavenger)", nameEn: "Scavenger", level: 20, role: "Спойл ресурсов с монстров",
            children: [{ name: "Мастер удара (Bounty Hunter)", nameEn: "Bounty Hunter", level: 76, role: "Спойлер высшего уровня" }]
          },
          { name: "Артизан (Artisan)", nameEn: "Artisan", level: 20, role: "Крафтер",
            children: [{ name: "Варфоргер (Warsmith)", nameEn: "Warsmith", level: 76, role: "Верховный крафтер" }]
          }
        ]
      }
    ]
  },
  {
    id: "kamael",
    name: "Камаэли (Kamael)",
    nameEn: "Kamael",
    description: "Камаэли — уникальная раса с крыльями. Только мужские и женские с разными путями развития. Поглощают умения убитых существ.",
    bonuses: ["Уникальная способность: поглощение душ", "Эксклюзивные классы", "Два саб-класса для 3-й профессии"],
    paths: [
      {
        name: "Воин-камаэль (Kamael Soldier)", nameEn: "Kamael Soldier", level: 1, role: "Воин особой расы",
        children: [
          { name: "Инспектор (Inspector)", nameEn: "Inspector", level: 20, role: "Особый воин",
            children: [{ name: "Юисис (Judicator)", nameEn: "Judicator", level: 76, role: "Верховный инспектор" }]
          },
          { name: "Страж (Trooper)", nameEn: "Trooper", level: 20, role: "Воин (мужской)",
            children: [{ name: "Берсерк (Berserker)", nameEn: "Berserker", level: 76, role: "Ярый берсерк" }]
          },
          { name: "Ополченка (Warder)", nameEn: "Warder", level: 20, role: "Воин (женский)",
            children: [{ name: "Соукастер (Soulbreaker)", nameEn: "Soulbreaker", level: 76, role: "Ломательница душ" }]
          }
        ]
      }
    ]
  }
];
