export interface Quest {
  id: string;
  title: string;
  titleEn: string;
  level: string;
  repeat: "once" | "repeatable" | "daily";
  startNpc: string;
  location: string;
  reward: string;
  description: string;
  steps: string[];
}

export interface QuestCategory {
  id: string;
  title: string;
  titleEn: string;
  quests: Quest[];
}

export const QUEST_CATEGORIES: QuestCategory[] = [
  {
    id: "prof",
    title: "КВЕСТЫ НА ПРОФЕССИИ",
    titleEn: "PROFESSION QUESTS",
    quests: [
      {
        id: "prof-1",
        title: "Квесты на первую профессию (I)",
        titleEn: "1st Class Transfer Quests",
        level: "20+",
        repeat: "once",
        startNpc: "Различные NPC (зависит от расы)",
        location: "Различные стартовые города",
        reward: "Смена класса, SP, Adena",
        description: "Переход на первую профессию — важный шаг развития вашего персонажа. Каждая раса и стартовый класс имеет свою уникальную цепочку квестов. После выполнения вы получаете доступ к продвинутым умениям.",
        steps: [
          "Найдите наставника своего класса (Class Master) в городе",
          "Получите задание от наставника",
          "Соберите необходимые предметы или убейте указанных монстров",
          "Вернитесь к наставнику для получения новой профессии",
          "Посетите Guild Master для финального подтверждения смены класса"
        ]
      },
      {
        id: "prof-2",
        title: "Квесты на вторую профессию (II)",
        titleEn: "2nd Class Transfer Quests",
        level: "40+",
        repeat: "once",
        startNpc: "Hierarch (Giran)",
        location: "Giran, Dark Elven Village, Goddard",
        reward: "Смена класса, опыт, SP",
        description: "Вторая профессия открывает значительно больше возможностей: новые скиллы, статы. Квест состоит из нескольких этапов и требует посещения разных локаций. Рекомендуется иметь хорошую группу.",
        steps: [
          "Поговорите с Hierarch в Giran при достижении 40 уровня",
          "Пройдите испытание — Trials of the Seeker / Scholar / Pilgrim / Martyr (зависит от класса)",
          "Соберите все необходимые предметы для испытания",
          "Получите 'Mark of the ...' — знак вашей профессии",
          "Вернитесь к Hierarch и пройдите финальную смену класса"
        ]
      },
      {
        id: "prof-3",
        title: "Квесты на третью профессию (III)",
        titleEn: "3rd Class Transfer Quests",
        level: "76+",
        repeat: "once",
        startNpc: "Berbatis (Goddard)",
        location: "Goddard, Hellbound, Imperial Tomb",
        reward: "3-я профессия, Forgotten Scroll",
        description: "Смена на третью профессию — одно из важнейших событий в Lineage 2. Квест требует прохождения сложных подземелий и сбора множества предметов. Лучше выполнять в группе. Включает поход в Imperial Tomb.",
        steps: [
          "Достигните 76 уровня и поговорите с Berbatis в Goddard",
          "Получите задание 'Saga of the ...' для вашего класса",
          "Найдите все 5 Knowledge Fragment в разных подземельях",
          "Войдите в Imperial Tomb и пройдите испытание",
          "Соберите Ancient Hero Soul и вернитесь к Berbatis",
          "Получите финальное благословение и смените профессию"
        ]
      },
      {
        id: "prof-4",
        title: "Квест на четвертую профессию (IV)",
        titleEn: "4th Class Transfer Quest (Awakening)",
        level: "85+",
        repeat: "once",
        startNpc: "Sebion (Goddard Castle Town)",
        location: "Goddard, Gracia Continent, Dimensional Rift",
        reward: "Пробуждение (Awakening), Angel Cat Buff, XP Boost",
        description: "Пробуждение — переломный момент в истории персонажа. При достижении 85 уровня вы получаете доступ к квесту пробуждения, который трансформирует ваш класс в один из классов-наследников (Ertheia). Вы получаете мощные новые умения.",
        steps: [
          "Достигните 85 уровня",
          "Поговорите с Sebion — он расскажет о вашем пробуждении",
          "Войдите в Dimensional Rift через специальный портал",
          "Пройдите испытания в Dimensional Rift (несколько волн монстров)",
          "Поговорите с Духом вашего класса внутри Rift",
          "Вернитесь к Sebion и завершите пробуждение",
          "Получите Angel Cat Buff и новые умения"
        ]
      },
    ]
  },
  {
    id: "special",
    title: "ПРОКАЧКА И ОСОБЫЕ",
    titleEn: "LEVELING & SPECIAL",
    quests: [
      {
        id: "sa",
        title: "Прокачка Кристалла Души (SA)",
        titleEn: "Soul Crystal (SA) Leveling",
        level: "40+",
        repeat: "repeatable",
        startNpc: "Spirit Vortex (зависит от уровня SA)",
        location: "Разные подземелья",
        reward: "Повышение уровня Soul Crystal",
        description: "Soul Crystal (Кристалл Души) — особый предмет, который наделяет оружие специальными характеристиками. Для его прокачки нужно убить определённых боссов с активным кристаллом в инвентаре. Кристалл имеет 14 уровней (SA 1-14).",
        steps: [
          "Получите Soul Crystal у NPC Warehouse Chief или купите на рынке",
          "Узнайте у Spirit Vortex какого монстра нужно убить для следующего уровня",
          "Активируйте кристалл в инвентаре и убейте нужного монстра",
          "После убийства кристалл повысит уровень (шанс не 100%)",
          "Повторяйте до нужного уровня SA"
        ]
      },
      {
        id: "pk",
        title: "Квест на отмытие РК (PK Count)",
        titleEn: "PK Count Removal Quest",
        level: "Any",
        repeat: "repeatable",
        startNpc: "Priest of the Birth (различные деревни)",
        location: "Giran, Oren, Aden, Rune",
        reward: "Снятие 1 PK-очка",
        description: "Если вы убивали других игроков (PK kills), ваш персонаж получает красное имя и штрафы. Этот квест позволяет снять PK-очки. За каждое PK нужно выполнить квест отдельно. Требует уничтожения определённых монстров.",
        steps: [
          "Найдите Priest of the Birth в ближайшем городе",
          "Получите задание на уничтожение злых существ",
          "Убейте необходимое количество монстров (около 100-200 штук)",
          "Вернитесь к священнику для отпущения грехов",
          "Один квест снимает одно PK-очко"
        ]
      },
      {
        id: "cubic",
        title: "Квест на Кубик (Cubic)",
        titleEn: "Cubic Quest",
        level: "35+",
        repeat: "repeatable",
        startNpc: "Mion (Primeval Isle / разные локации)",
        location: "Primeval Isle",
        reward: "Различные кубики-помощники",
        description: "Кубики (Cubics) — магические сущности, следующие за персонажем и помогающие в бою. Разные кубики имеют разные эффекты: атака, лечение, дебаф. Квест выдаётся в зависимости от класса персонажа.",
        steps: [
          "Найдите NPC, выдающего задание для вашего класса",
          "Соберите необходимые ингредиенты",
          "Выполните условия (убийства, сбор предметов)",
          "Получите нужный кубик"
        ]
      },
      {
        id: "transform",
        title: "Квест на Трансформацию",
        titleEn: "Transformation Quest",
        level: "55+",
        repeat: "once",
        startNpc: "Maestro Leorin (Dion / Goddard)",
        location: "Dion, Goddard, Shilen's Mystic",
        reward: "Transformation Sealbook",
        description: "Трансформация позволяет персонажу принять облик могущественного монстра, получив его умения и характеристики. Квест требует сбора душ существ и посещения нескольких NPC.",
        steps: [
          "Поговорите с Maestro Leorin в Dion на 55+ уровне",
          "Получите Crystal of Purity и отправьтесь к Shilen's Mystic",
          "Соберите Darkness Fragment убивая Shade в Cemetary of Execution",
          "Убейте Dark Soul Collector и принесите Dark Crystal",
          "Вернитесь к Leorin для получения трансформационной книги"
        ]
      },
      {
        id: "family",
        title: "Квест семьи Нейт (Nate's Family)",
        titleEn: "Nate's Family Quest",
        level: "15+",
        repeat: "once",
        startNpc: "Nate (Gludin Village)",
        location: "Gludin Village, Ruins of Despair",
        reward: "Ring of Nate, Adena",
        description: "Трогательная история о семье, разлучённой трагедией. Начинается в Gludin Village и ведёт вас через руины к загадочным событиям. Хорошая награда для начального уровня.",
        steps: [
          "Найдите Nate в Gludin Village",
          "Узнайте историю его семьи и получите задание",
          "Отправьтесь в Ruins of Despair на поиски",
          "Соберите необходимые предметы",
          "Вернитесь к Nate с результатами"
        ]
      },
    ]
  },
  {
    id: "pailaka",
    title: "ПАЙЛАКА (PAILAKA)",
    titleEn: "PAILAKA INSTANCES",
    quests: [
      {
        id: "pailaka-1",
        title: "Пайлака — Песня льда и огня",
        titleEn: "Pailaka — Song of Ice and Fire",
        level: "36–42",
        repeat: "daily",
        startNpc: "Ketra Orc Shaman (Ketra Orc Outpost)",
        location: "Ketra Orc Outpost / Pailaka Instance",
        reward: "Pailaka Ring, XP/SP, Adena",
        description: "Первый Pailaka — инстанс-квест для персонажей 36–42 уровня. Можно проходить в одиночку. Внутри вас ждут несколько боссов и ловушки. Предметы из инстанса нельзя вынести — только XP и специальная награда.",
        steps: [
          "Поговорите с Ketra Orc Shaman при уровне 36-42",
          "Войдите в инстанс Pailaka (Song of Ice & Fire)",
          "Убейте первого мини-босса Adiantum",
          "Пройдите ледяную и огненную зоны",
          "Убейте финального босса Brakiel",
          "Соберите награду и выйдите из инстанса"
        ]
      },
      {
        id: "pailaka-2",
        title: "Пайлака — Наследие Дьявола",
        titleEn: "Pailaka — Devil's Legacy",
        level: "61–67",
        repeat: "daily",
        startNpc: "Adventurer Guide (Goddard)",
        location: "Goddard / Pailaka Instance",
        reward: "Pailaka Earring, XP/SP",
        description: "Второй Pailaka подходит для одиночной игры с 61 по 67 уровень. Он сложнее первого — больше врагов и боссы с особой механикой. Рекомендуется иметь сет D-grade или C-grade.",
        steps: [
          "Поговорите с Adventurer Guide в Goddard",
          "Войдите в Pailaka (Devil's Legacy)",
          "Уничтожьте охранников-боссов по порядку",
          "Не забывайте использовать специальные предметы из инстанса",
          "Убейте финального босса Greed",
          "Заберите награду"
        ]
      },
      {
        id: "pailaka-3",
        title: "Пайлака — Раненый Дракон",
        titleEn: "Pailaka — Injured Dragon",
        level: "73–77",
        repeat: "daily",
        startNpc: "Adventurer Guide (Aden / Rune)",
        location: "Aden Castle Town / Pailaka Instance",
        reward: "Pailaka Necklace, XP/SP высокий",
        description: "Самый сложный из трёх Pailaka — для уровней 73–77. Требует хорошей экипировки и понимания механик. Финальный boss Latana может вызвать проблемы даже опытным игрокам. Отличный источник XP на этом уровне.",
        steps: [
          "Поговорите с Adventurer Guide в Aden или Rune",
          "Войдите в Pailaka (Injured Dragon)",
          "Пройдите зону с многочисленными ловушками",
          "Убейте мини-боссов Dragon Keeper",
          "Деактивируйте кристаллы-ловушки",
          "Победите Latana и заберите награду"
        ]
      },
    ]
  },
  {
    id: "pets",
    title: "ПИТОМЦЫ И МАУНТЫ",
    titleEn: "PETS & MOUNTS",
    quests: [
      {
        id: "wolf",
        title: "Квест на Волка (Wolf Collar)",
        titleEn: "Wolf Quest (Wolf Collar)",
        level: "15+",
        repeat: "once",
        startNpc: "Martin (Gludin Village)",
        location: "Gludin Village, Ruins of Agony",
        reward: "Wolf Collar — призыв обычного волка",
        description: "Волк — первый питомец-компаньон, доступный практически всем персонажам. Следует за вами, помогает в бою, получает опыт и растёт. При правильной прокачке превращается в Great Wolf.",
        steps: [
          "Найдите Martin в Gludin Village (16+ уровень)",
          "Получите задание на поиск волка",
          "Убейте 100 Kasha Wolf в Ruins of Agony",
          "Соберите 50 Wolf Fang",
          "Вернитесь к Martin и получите Wolf Collar"
        ]
      },
      {
        id: "subclass",
        title: "Квест на Сабкласс (Sub-class)",
        titleEn: "Sub-class Quest",
        level: "75+",
        repeat: "once",
        startNpc: "Hardin (Hardin's Private Academy)",
        location: "Hardin's Academy, Forge of Gods, Blazing Swamp",
        reward: "Право добавить сабкласс",
        description: "Сабкласс позволяет персонажу иметь второй (дополнительный) класс. На сабклассе можно прокачаться до 80 уровня. Квест сложный: требует убийства эпик-боссов Cabrio, Hallate, Kernon, Golkonda.",
        steps: [
          "Поговорите с Hardin на 75 уровне",
          "Убейте всех 4 Baium's Guards в Tower of Insolence",
          "Убейте Cabrio в Forest of the Dead",
          "Убейте Hallate в Forge of Gods",
          "Убейте Kernon в Blazing Swamp",
          "Убейте Golkonda в Dragon Valley",
          "Соберите Seal of Binding и вернитесь к Hardin"
        ]
      },
      {
        id: "freya",
        title: "Квесты на Фрею",
        titleEn: "Freya Quests",
        level: "82+",
        repeat: "repeatable",
        startNpc: "Rafforty (Jinia Guild Hideout)",
        location: "Jinia Guild Hideout, Freya's instance",
        reward: "Ice Queen's Tiara, Freya's Ring/Earring/Necklace",
        description: "Целая серия квестов, связанных с ледяной королевой Freyou. Включает как сюжетные задания, так и повторяемые. Финальная награда — уникальные украшения Freya, одни из лучших в игре на данном уровне.",
        steps: [
          "Найдите Rafforty в Jinia Guild Hideout",
          "Пройдите вводный квест Ice Queen's Sorrow",
          "Выполните серию дополнительных заданий от Jinia",
          "Войдите в инстанс Ice Palace и убейте Ice Queen Freya",
          "Соберите Ice Queen's Tears и вернитесь к Rafforty",
          "Получите финальную награду"
        ]
      },
      {
        id: "buffalo",
        title: "Квест на Большого Волка (Baby Buffalo)",
        titleEn: "Baby Buffalo Quest",
        level: "25+",
        repeat: "once",
        startNpc: "Melia (Elven Village)",
        location: "Elven Village, Elven Ruins",
        reward: "Baby Buffalo Collar",
        description: "Baby Buffalo — особый питомец-маг, который помогает своему хозяину магическими атаками и баффами. Квест проходится в Elven Village и окрестностях.",
        steps: [
          "Найдите Melia в Elven Village",
          "Соберите необходимые ингредиенты в Elven Ruins",
          "Убейте Starving Elven Rabbit и Starving Elven Boar",
          "Принесите предметы обратно к Melia",
          "Получите Baby Buffalo Collar"
        ]
      },
      {
        id: "cougar",
        title: "Квест на Большого Кота (Baby Cougar)",
        titleEn: "Baby Cougar Quest",
        level: "24+",
        repeat: "once",
        startNpc: "Martin (Gludio)",
        location: "Gludio Territory",
        reward: "Baby Cougar Collar",
        description: "Baby Cougar — проворный питомец-воин, атакующий физически. Отличается высокой скоростью атаки. Квест проходится в районе Gludio.",
        steps: [
          "Найдите Martin в Gludio",
          "Получите задание на сбор Cougar Soul",
          "Убейте 200 Plains Cougar в Gludio Territory",
          "Принесите Cougar Soul к Martin",
          "Получите Baby Cougar Collar"
        ]
      },
      {
        id: "kookaburra",
        title: "Квест на Большого Крокодила (Baby Kookaburra)",
        titleEn: "Baby Kookaburra Quest",
        level: "24+",
        repeat: "once",
        startNpc: "Mion (Dark Elven Village)",
        location: "Dark Elven Village Territory",
        reward: "Baby Kookaburra Collar",
        description: "Baby Kookaburra — вспомогательный питомец с умениями лечения. Особенно полезен для соло-игроков — периодически лечит хозяина.",
        steps: [
          "Найдите Mion в Dark Elven Village",
          "Соберите Kookaburra Feather от Dark Kookaburra",
          "Убейте монстров в Dark Elven Territory",
          "Вернитесь к Mion с собранными предметами",
          "Получите Baby Kookaburra Collar"
        ]
      },
      {
        id: "lion",
        title: "Квест на Льва (Great Wolf)",
        titleEn: "Great Wolf Quest",
        level: "55+",
        repeat: "once",
        startNpc: "Martin (Gludin Village)",
        location: "Gludin, Cruma Tower, Sea of Spores",
        reward: "Great Wolf Collar (эволюция волка)",
        description: "Great Wolf — улучшенная версия обычного Волка. Значительно мощнее, быстрее и может носить специальную броню. Для его получения нужен уже прокачанный Wolf до определённого уровня.",
        steps: [
          "Иметь Wolf 55+ уровня",
          "Поговорите с Martin в Gludin Village",
          "Получите задание на Evolution",
          "Соберите специальные предметы в Cruma Tower",
          "Убейте Named Monster в Sea of Spores",
          "Вернитесь к Martin и получите Great Wolf Collar"
        ]
      },
      {
        id: "horse",
        title: "Квест на Рыцарского Коня",
        titleEn: "Strider Quest",
        level: "55+",
        repeat: "once",
        startNpc: "Lekon (Hunter's Village)",
        location: "Hunter's Village, Alligator Island",
        reward: "Hatchling (Strider Egg) → Strider",
        description: "Страйдер — боевой маунт, позволяющий передвигаться быстрее. Выращивается из яйца (Hatchling) через несколько стадий. Может перевозить пассажира в мирных условиях.",
        steps: [
          "Поговорите с Lekon в Hunter's Village",
          "Получите Hatchling Egg",
          "Вырастите Hatchling до 55 уровня (долго!)",
          "Вернитесь к Lekon с Hatchling 55+ уровня",
          "Пройдите эволюцию — получите настоящего Strider"
        ]
      },
    ]
  },
  {
    id: "epic",
    title: "ЭПИК КВЕСТЫ И БОССЫ",
    titleEn: "EPIC QUESTS & BOSSES",
    quests: [
      {
        id: "baium",
        title: "Квест на Байума (Baium)",
        titleEn: "Baium Quest",
        level: "75+",
        repeat: "repeatable",
        startNpc: "Вход через Tower of Insolence",
        location: "Tower of Insolence (13 этаж)",
        reward: "Baium's Ring, Baium's Soul Crystal",
        description: "Байум — один из первых Эпик боссов в Lineage 2. Находится на вершине Tower of Insolence. Убивается кланами и альянсами. Респавн примерно 5 дней. Ring of Baium — один из лучших аксессуаров для многих классов.",
        steps: [
          "Соберите рейд-группу (20+ человек рекомендуется)",
          "Поднимитесь на 13-й этаж Tower of Insolence",
          "Найдите Статую Ангела у входа к Baium",
          "Один участник использует специальную статую для призыва",
          "Убейте Baium (много HP, сильные атаки)",
          "Соберите лут — Ring of Baium, Baium Crystal"
        ]
      },
      {
        id: "antharas",
        title: "Квест на Антараса (Antharas)",
        titleEn: "Antharas Quest",
        level: "80+",
        repeat: "repeatable",
        startNpc: "High Priest Orven (Giran)",
        location: "Dragon Valley, Antharas Lair",
        reward: "Antharas' Earring, Dragon Scale",
        description: "Антарас — огромный дракон, один из сильнейших боссов в игре. Требует организованного рейда от 36 до 200+ человек. Квест открывает доступ в его логово — Antharas Lair. Earring of Antharas — лучшая серьга для многих билдов.",
        steps: [
          "Поговорите с High Priest Orven в Giran",
          "Соберите 10 Heart of Warding (от монстров в Dragon Valley)",
          "Возьмите квест на вход в Antharas Lair",
          "Соберите рейд из нескольких десятков человек",
          "Войдите в Antharas Lair и убейте Antharas",
          "Заберите Earring of Antharas"
        ]
      },
      {
        id: "valakas",
        title: "Квест на Валакаса (Valakas)",
        titleEn: "Valakas Quest",
        level: "80+",
        repeat: "repeatable",
        startNpc: "Witch Kalis (Aden)",
        location: "Hot Springs / Valakas Lair",
        reward: "Valakas' Necklace",
        description: "Валакас — ещё один дракон-босс. Его нашейник считается лучшим в игре долгое время. Для входа нужно набрать 'тепло' в Hot Springs. Сам бой крайне сложный — применяет массовый AoE и заклинания.",
        steps: [
          "Поговорите с Witch Kalis в Aden",
          "Отправьтесь в Hot Springs и охотьтесь там, набирая 'тепловые очки'",
          "После набора необходимого количества очков вернитесь к Kalis",
          "Получите доступ в Valakas Lair",
          "Соберите 45–200 человек и войдите в логово",
          "Убейте Valakas и заберите Necklace of Valakas"
        ]
      },
    ]
  },
  {
    id: "clan",
    title: "КЛАНОВЫЕ КВЕСТЫ",
    titleEn: "CLAN QUESTS",
    quests: [
      {
        id: "clan-hall",
        title: "Квест на Клан Холл (Clan Hall)",
        titleEn: "Clan Hall Quest",
        level: "40+",
        repeat: "once",
        startNpc: "Clan Manager (города)",
        location: "Различные Clan Hall",
        reward: "Клановый особняк",
        description: "Клановые особняки — дома для кланов, предоставляющие баффы и другие преимущества. Часть из них продаётся на аукционе, другие — зарабатываются через клановые квесты.",
        steps: [
          "Имейте клан уровня 3+",
          "Найдите доступный Clan Hall на карте",
          "Заплатите залог или выиграйте аукцион",
          "Заселите Clan Hall"
        ]
      },
    ]
  },
];

export function findQuestById(id: string): Quest | undefined {
  for (const cat of QUEST_CATEGORIES) {
    const quest = cat.quests.find(q => q.id === id);
    if (quest) return quest;
  }
  return undefined;
}
