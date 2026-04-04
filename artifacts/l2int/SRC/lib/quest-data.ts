export interface Quest {
  id: string;
  title: string;
  titleEn: string;
  level: string;
  repeat: "once" | "repeatable" | "daily";
  type?: string;
  startNpc: string;
  location: string;
  reward: string;
  description: string;
  steps: string[];
  requirements?: string;
  chronicle?: string;
}

export interface QuestCategory {
  id: string;
  title: string;
  quests: Quest[];
}

export const QUEST_CATEGORIES: QuestCategory[] = [
  {
    id: "profession",
    title: "КВЕСТЫ НА ПРОФЕССИИ",
    quests: [
      {
        id: "1st-profession",
        title: "Квест на первую профессию (I)",
        titleEn: "1st Class Transfer Quests",
        level: "20+",
        repeat: "once",
        startNpc: "Class Master (мастер класса вашей расы)",
        location: "Стартовые города (в зависимости от расы)",
        reward: "Смена класса, SP, Adena",
        requirements: "Нет требований",
        chronicle: "Chronicle 1",
        description: "Переход на первую профессию — важный шаг развития персонажа. Каждая раса и стартовый класс имеет свою цепочку квестов. После выполнения вы получаете доступ к продвинутым умениям и снаряжению.",
        steps: [
          "Достигните 20 уровня",
          "Найдите наставника своего класса (Class Master) в ближайшем городе",
          "Получите задание от наставника и выполните все требования",
          "Соберите необходимые предметы или убейте указанных монстров",
          "Вернитесь к наставнику для получения новой профессии",
          "Посетите Guild Master для финального подтверждения смены класса"
        ]
      },
      {
        id: "2nd-profession",
        title: "Квест на вторую профессию (II)",
        titleEn: "2nd Class Transfer Quests",
        level: "40+",
        repeat: "once",
        startNpc: "Hierarch (Giran)",
        location: "Giran, Dark Elven Village, Goddard",
        reward: "Смена класса, опыт, SP",
        requirements: "Нет требований",
        chronicle: "Chronicle 1",
        description: "Вторая профессия открывает значительно больше возможностей: новые скиллы, статы. Квест состоит из нескольких этапов и требует посещения разных локаций. Рекомендуется иметь хорошую группу.",
        steps: [
          "Поговорите с Hierarch в Giran при достижении 40 уровня",
          "Пройдите испытание — Trials of the Seeker / Scholar / Pilgrim / Martyr (в зависимости от класса)",
          "Соберите все необходимые предметы для испытания",
          "Получите 'Mark of the ...' — знак вашей профессии",
          "Вернитесь к Hierarch и пройдите финальную смену класса"
        ]
      },
      {
        id: "3rd-profession",
        title: "Квест на третью профессию (III)",
        titleEn: "3rd Class Transfer Quests",
        level: "76+",
        repeat: "once",
        startNpc: "Berbatis (Goddard)",
        location: "Goddard, Hellbound, Imperial Tomb",
        reward: "3-я профессия, Forgotten Scroll",
        requirements: "Нет требований",
        chronicle: "Chronicle 5",
        description: "Смена на третью профессию — одно из важнейших событий в Lineage 2. Квест требует прохождения сложных подземелий и сбора множества предметов. Лучше выполнять в группе. Включает поход в Imperial Tomb.",
        steps: [
          "Достигните 76 уровня и поговорите с Berbatis в Goddard",
          "Получите задание 'Saga of the ...' для вашего класса",
          "Пройдите испытания в Imperial Tomb и соберите все необходимые предметы",
          "Убейте боссов подземелья (с группой)",
          "Вернитесь к Berbatis и получите 3-ю профессию и Forgotten Scrolls"
        ]
      },
      {
        id: "4th-profession",
        title: "Квест на четвертую профессию (IV) — Awakening",
        titleEn: "4th Class Transfer / Awakening",
        level: "85+",
        repeat: "once",
        startNpc: "Pantheon (Goddard), Orion (Elven Village)",
        location: "Различные локации",
        reward: "4-я профессия, Awaken Power",
        requirements: "Нет требований",
        chronicle: "Goddess of Destruction",
        description: "Четвёртая профессия — Пробуждение (Awakening). Доступна с патча Goddess of Destruction. Открывает новые возможности и существенно изменяет геймплей персонажа.",
        steps: [
          "Достигните 85 уровня",
          "Получите и выполните квест 'Awakening of Destiny'",
          "Пройдите инстанс Purgatory — испытание на силу",
          "Выберите финальный класс из доступных вариантов",
          "Завершите квест и получите Awaken Power"
        ]
      }
    ]
  },
  {
    id: "subclass",
    title: "КВЕСТЫ НА СУБКЛАСС",
    quests: [
      {
        id: "an-arrogant-search",
        title: "An Arrogant Search (Самонадеянный поиск)",
        titleEn: "An Arrogant Search",
        level: "75+",
        repeat: "once",
        startNpc: "Arujien — Ivory Tower (Башня из слоновой кости)",
        location: "Ivory Tower (Башня Слоновой Кости)",
        reward: "Доступ к Baium / Прохождение к Bayum",
        requirements: "Sub-class квест (предшественник)",
        chronicle: "Chronicle 2",
        description: "Квест для прохода к Байму. После обновления Gracia Final, есть альтернативное прохождение. Необходим для выполнения квестов на сабкласс.",
        steps: [
          "Поговорите с Arujien в Ivory Tower",
          "Исследуйте подземелья и соберите ключевые предметы",
          "Убейте необходимых монстров в указанных локациях",
          "Верните предметы Arujien для получения доступа к Baium"
        ]
      },
      {
        id: "fate-whisper",
        title: "Fate's Whisper (Шепот Судьбы)",
        titleEn: "Fate's Whisper",
        level: "75+",
        repeat: "once",
        startNpc: "Pantheon (Goddard)",
        location: "Goddard и различные локации",
        reward: "Право на взятие саб-классов (для всех рас кроме камаэль)",
        requirements: "An Arrogant Search (завершён), 75+ уровень",
        chronicle: "Chronicle 3",
        description: "Основной квест для получения права на саб-класс (для рас кроме камаэлей). Включает несколько подквестов: Mimir's Elixir и Seeds of Chaos.",
        steps: [
          "Поговорите с Pantheon в Goddard",
          "Выполните подквест Mimir's Elixir (для всех рас кроме камаэль)",
          "Соберите 3 Sacred Elixir у боссов: Baium, Antharas, Valakas",
          "Верните эликсиры Pantheon",
          "Получите право на взятие сабклассов"
        ]
      },
      {
        id: "seeds-of-chaos",
        title: "Seeds of Chaos (Семена Хаоса)",
        titleEn: "Seeds of Chaos",
        level: "75+",
        repeat: "once",
        startNpc: "Chaos Witch Valerie",
        location: "Различные локации",
        reward: "Право на взятие саб-классов (только для камаэль)",
        requirements: "Только для расы Kamael",
        chronicle: "Chronicle 5",
        description: "Квест на право взятия сабклассов исключительно для расы Kamael. Является альтернативой Mimir's Elixir.",
        steps: [
          "Поговорите с Chaos Witch Valerie",
          "Соберите Seeds of Chaos из указанных мест",
          "Выполните ритуал для расы Kamael",
          "Получите разрешение на взятие сабкласса"
        ]
      }
    ]
  },
  {
    id: "weapon-enhancement",
    title: "КВЕСТ НА УЛУЧШЕНИЕ ОРУЖИЯ (SA)",
    quests: [
      {
        id: "enhance-your-weapon",
        title: "Enhance Your Weapon (Усиление оружия)",
        titleEn: "Enhance Your Weapon",
        level: "40+",
        repeat: "repeatable",
        startNpc: "Grand Magister Jurek (Гиран), Magister Gideon (Орен), Magister Winonin (Аден)",
        location: "Town of Giran, Town of Oren, Town of Aden",
        reward: "Soul Crystal (кристалл душ, уровень повышается)",
        requirements: "Нет требований",
        chronicle: "Chronicle 2",
        description: "Квест на прокачку Кристалла Души (SA — Special Ability). Кристаллы бывают трёх видов: Синий, Зелёный, Красный. Уровень кристалла от 1 до 18. При убийстве определённых монстров кристалл может повыситься в уровне. Разные уровни кристалла дают разные SA-эффекты на оружие.",
        steps: [
          "Возьмите задание у одного из трёх NPC магов",
          "Получите кристалл нужного вида (синий/зелёный/красный) в инвентарь",
          "Убивайте боссов-монстров с кристаллом в руках (шанс повышения уровня)",
          "Если нужно несколько кристаллов — выбросьте предыдущий на землю и возьмите новый",
          "При достижении нужного уровня кристалла — вставьте SA в оружие"
        ]
      }
    ]
  },
  {
    id: "noblesse",
    title: "КВЕСТ НА ДВОРЯНСТВО (NOBLESSE)",
    quests: [
      {
        id: "noblesse",
        title: "Квест на Noblesse (Дворянство)",
        titleEn: "Noblesse Quest",
        level: "75+",
        repeat: "once",
        startNpc: "Shadith (Valley of Saints), Giran",
        location: "Valley of Saints, различные локации",
        reward: "Noblesse статус, Noblesse Tiara",
        requirements: "Saб-класс 75+ уровня",
        chronicle: "Chronicle 2",
        description: "Для получения Noblesse (Дворянства) необходимо прокачать сабкласс до 75 уровня и выполнить цепочку квестов. Noblesse открывает Олимпиаду, дополнительные скиллы и возможность воскрешения бесплатно.",
        steps: [
          "Прокачайте любой сабкласс до 75 уровня",
          "Поговорите с Shadith в Valley of Saints",
          "Выполните требования квеста (сбор предметов, убийство боссов)",
          "Получите Noblesse статус и Noblesse Tiara"
        ]
      }
    ]
  },
  {
    id: "pailaka",
    title: "КВЕСТЫ ПАЙЛАКА",
    quests: [
      {
        id: "pailaka-ice-fire",
        title: "Pailaka — Song of Ice and Fire (Песня льда и огня)",
        titleEn: "Pailaka — Song of Ice and Fire",
        level: "36–42",
        repeat: "repeatable",
        startNpc: "Уточните у Travel Guide NPC",
        location: "Pailaka Dungeon (инстанс)",
        reward: "Серьги Omen Beast (D-grade), SP, опыт",
        requirements: "Уровень 36–42",
        chronicle: "Chronicle 5",
        description: "Пайлака — серия инстанс-квестов для разных диапазонов уровней. Первый Пайлака (Песня льда и огня) рассчитан на уровни 36-42. Выполняется в одиночку в инстансе со своей экипировкой внутри.",
        steps: [
          "Возьмите квест у соответствующего NPC",
          "Войдите в инстанс Pailaka",
          "Внутри инстанса вы получите временное снаряжение",
          "Убейте боссов инстанса и выполните задачи",
          "Выйдите и получите награды"
        ]
      },
      {
        id: "pailaka-devil-legacy",
        title: "Pailaka — Devil's Legacy (Наследие Дьявола)",
        titleEn: "Pailaka — Devil's Legacy",
        level: "61–67",
        repeat: "repeatable",
        startNpc: "Уточните у Travel Guide NPC",
        location: "Pailaka Dungeon (инстанс)",
        reward: "Браслет C-grade, SP, опыт",
        requirements: "Уровень 61–67",
        chronicle: "Chronicle 5",
        description: "Второй Пайлака для уровней 61-67. Продолжение серии квестов-инстансов с уникальными испытаниями.",
        steps: [
          "Возьмите квест у соответствующего NPC (уровень 61-67)",
          "Войдите в инстанс",
          "Выполните задания и убейте боссов",
          "Получите награду — браслет C-grade"
        ]
      },
      {
        id: "pailaka-injured-dragon",
        title: "Pailaka — Injured Dragon (Раненый Дракон)",
        titleEn: "Pailaka — Injured Dragon",
        level: "73–77",
        repeat: "repeatable",
        startNpc: "Уточните у Travel Guide NPC",
        location: "Pailaka Dungeon (инстанс)",
        reward: "Рубашка A-grade, SP, опыт",
        requirements: "Уровень 73–77",
        chronicle: "Chronicle 5",
        description: "Третий и финальный Пайлака для уровней 73-77. Самый сложный из трёх инстансов серии.",
        steps: [
          "Возьмите квест у соответствующего NPC (уровень 73-77)",
          "Войдите в инстанс Pailaka Injured Dragon",
          "Пройдите испытания и победите дракона",
          "Получите Рубашку A-grade"
        ]
      }
    ]
  },
  {
    id: "pk-clean",
    title: "КВЕСТ НА ОТМЫТИЕ PK",
    quests: [
      {
        id: "repent-sins",
        title: "Repent Your Sins (Покайтесь в грехах)",
        titleEn: "Repent Your Sins",
        level: "0+",
        repeat: "repeatable",
        startNpc: "Priest of Repentance — разные города",
        location: "Различные города Аден",
        reward: "Снижение PK-счётчика",
        requirements: "Наличие PK kills",
        chronicle: "Chronicle 1",
        description: "Квест на отмытие PK (Player Kill) счётчика. Выполняется у священника в городах. Позволяет снизить количество PK и избежать штрафов.",
        steps: [
          "Найдите Priest of Repentance в любом городе",
          "Возьмите задание и выполните требуемые условия",
          "Принесите предметы-жертвоприношения",
          "Получите снижение PK-счётчика"
        ]
      }
    ]
  },
  {
    id: "pets",
    title: "КВЕСТЫ НА ПИТОМЦЕВ",
    quests: [
      {
        id: "wolf-quest",
        title: "Get a Pet — Волк (Wolf Collar)",
        titleEn: "Get a Pet — Wolf",
        level: "15+",
        repeat: "once",
        startNpc: "Terry (Gludin Village) / пастух",
        location: "Gludin Village и окрестности",
        reward: "Wolf Collar (поводок волка)",
        requirements: "Нет требований",
        chronicle: "Chronicle 1",
        description: "Квест на получение волка-питомца. Волк — боевой питомец, который помогает в бою. Требует поводок для призыва.",
        steps: [
          "Поговорите с Terry в Gludin Village",
          "Выполните задание: соберите необходимые предметы",
          "Убейте указанных монстров в окрестностях",
          "Вернитесь к Terry и получите Wolf Collar"
        ]
      },
      {
        id: "buffalo-quest",
        title: "Help the Uncle — Бык (Baby Buffalo)",
        titleEn: "Help the Uncle — Baby Buffalo",
        level: "15+",
        repeat: "once",
        startNpc: "Mia (Gludin Village)",
        location: "Gludin Village",
        reward: "Baby Buffalo Panpipe (флейта для призыва буйвола)",
        requirements: "Нет требований",
        chronicle: "Chronicle 3",
        description: "Квест для получения питомца — бычка Baby Buffalo. Питомец восстанавливает здоровье и ману владельца.",
        steps: [
          "Поговорите с Mia в Gludin Village",
          "Выполните поручения дяди",
          "Соберите необходимые предметы",
          "Получите Baby Buffalo Panpipe"
        ]
      }
    ]
  },
  {
    id: "transformation",
    title: "КВЕСТ НА ТРАНСФОРМАЦИЮ",
    quests: [
      {
        id: "more-than-meets-eye",
        title: "More Than Meets the Eye (Трансформация)",
        titleEn: "More Than Meets the Eye",
        level: "55+",
        repeat: "once",
        startNpc: "Бетти — Gludio или другие NPC",
        location: "Различные локации",
        reward: "Книга трансформации (Transformation Sealbook)",
        requirements: "Нет требований",
        chronicle: "Chronicle 3",
        description: "Квест на получение трансформации. Позволяет персонажу временно превращаться в монстров, получая их умения и характеристики.",
        steps: [
          "Поговорите с NPC трансформации",
          "Соберите необходимые предметы для ритуала",
          "Убейте определённых монстров",
          "Получите Transformation Sealbook"
        ]
      }
    ]
  },
  {
    id: "cubic",
    title: "КВЕСТ НА КУБИК",
    quests: [
      {
        id: "special-order",
        title: "A Special Order — Кубик (Cubic)",
        titleEn: "A Special Order",
        level: "50+",
        repeat: "once",
        startNpc: "Mimi the Fairy — Ivory Tower",
        location: "Ivory Tower (Башня Слоновой Кости)",
        reward: "Cubic (кубик) — магический помощник в бою",
        requirements: "Нет требований",
        chronicle: "Chronicle 2",
        description: "Квест на получение кубика (Cubic) — специального магического существа, которое помогает в бою: атакует врагов, лечит, баффает. Разные классы получают разные кубики.",
        steps: [
          "Поговорите с Mimi the Fairy в Ivory Tower",
          "Соберите необходимые ингредиенты для создания кубика",
          "Убейте нужных монстров и принесите трофеи",
          "Создайте кубик и получите его"
        ]
      }
    ]
  },
  {
    id: "freya",
    title: "КВЕСТЫ НА ФРЕЮ",
    quests: [
      {
        id: "other-side-truth",
        title: "The Other Side of Truth (Квест Фреи)",
        titleEn: "The Other Side of Truth",
        level: "82+",
        repeat: "repeatable",
        startNpc: "Rafforty — Freya (Ice Palace)",
        location: "Freya's Domain (Ледяной Дворец)",
        reward: "Ожерелье Фреи (Queen of Ice Necklace), опыт, SP",
        requirements: "82+ уровень, рекомендуется группа",
        chronicle: "Gracia Final",
        description: "Серия квестов связанных с Фреей — ледяной королевой. Включает несколько этапов и инстансов. Награда — мощное ожерелье S84-грейда.",
        steps: [
          "Поговорите с Rafforty в Freya's Domain",
          "Выполните серию заданий, связанных с Фреей",
          "Пройдите инстанс Ice Palace в группе",
          "Победите Фрею и получите ожерелье Queen of Ice Necklace"
        ]
      }
    ]
  },
  {
    id: "lord-path",
    title: "ПУТЬ ЛОРДА (ТЕРРИТОРИАЛЬНЫЕ ВОЙНЫ)",
    quests: [
      {
        id: "lord-aden",
        title: "Path to Becoming a Lord — Aden",
        titleEn: "Path to Becoming a Lord — Aden",
        level: "0+",
        repeat: "repeatable",
        type: "Повторяемый, Групповой",
        startNpc: "Chamberlain of Light (Камергер Света)",
        location: "Aden Territory (Земли Адена)",
        reward: "Выбор Награды (Unknown Reward)",
        requirements: "Нет требований",
        chronicle: "Gracia",
        description: "Квест на становление лордом территории Аден. Связан с системой Territory Wars (территориальных войн). Победители могут управлять территорией и получать доходы.",
        steps: [
          "Поговорите с Chamberlain of Light в Aden Territory",
          "Выполните задания для становления лордом",
          "Участвуйте в Territorial Wars",
          "При победе — получите статус лорда территории"
        ]
      },
      {
        id: "lord-innadril",
        title: "Path to Becoming a Lord — Innadril",
        titleEn: "Path to Becoming a Lord — Innadril",
        level: "0+",
        repeat: "repeatable",
        type: "Повторяемый, Групповой",
        startNpc: "Chamberlain of Light (Камергер Света)",
        location: "Innadril Territory (Земли Иннадрила)",
        reward: "Выбор Награды",
        requirements: "Нет требований",
        chronicle: "Gracia",
        description: "Квест на становление лордом территории Иннадрил. Часть системы Territory Wars.",
        steps: [
          "Поговорите с Chamberlain of Light в Innadril Territory",
          "Выполните задания для территории",
          "Участвуйте в Territory Wars",
          "Станьте лордом Иннадрила"
        ]
      },
      {
        id: "lord-schuttgart",
        title: "Path to Becoming a Lord — Schuttgart",
        titleEn: "Path to Becoming a Lord — Schuttgart",
        level: "0+",
        repeat: "repeatable",
        type: "Повторяемый, Групповой",
        startNpc: "Chamberlain of Light (Камергер Света)",
        location: "Schuttgart Territory (Земли Шутгарта)",
        reward: "Выбор Награды",
        requirements: "Нет требований",
        chronicle: "Gracia",
        description: "Квест на становление лордом территории Шутгарт.",
        steps: [
          "Поговорите с Chamberlain of Light в Schuttgart Territory",
          "Выполните задания квеста",
          "Участвуйте в Territory Wars",
          "Станьте лордом Шутгарта"
        ]
      },
      {
        id: "lord-oren",
        title: "Path to Becoming a Lord — Oren",
        titleEn: "Path to Becoming a Lord — Oren",
        level: "0+",
        repeat: "repeatable",
        type: "Повторяемый, Групповой",
        startNpc: "Chamberlain of Light (Камергер Света)",
        location: "Oren Territory (Земли Орена)",
        reward: "Выбор Награды",
        requirements: "Нет требований",
        chronicle: "Gracia",
        description: "Квест на становление лордом территории Орен.",
        steps: [
          "Поговорите с Chamberlain of Light в Oren Territory",
          "Выполните задания квеста",
          "Участвуйте в Territory Wars",
          "Станьте лордом Орена"
        ]
      }
    ]
  }
];
