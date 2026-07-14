/* ═══════════════════════════════════════════════════════════════════
   problems.js — раздел «Проблемы» Mini App TechWine.

   15 дефектов вина: симптомы → аналитические пороги → ветки решений
   → продукты Vason / оборудование Juclas с дозировками.

   ВАЖНО: имена в products[] должны ТОЧНО совпадать с названиями в
   catalog.json — приложение по ним открывает карточку продукта.
   Проверяется скриптом check_problems.py. Дозы — из каталога Vason 2H2026.

   Молекулярный SO₂ = свободный / (1 + 10^(pH − 1,81)).
   Таблица «pH → свободный SO₂» посчитана по этой формуле.
   ═══════════════════════════════════════════════════════════════════ */

const PROBLEMS = [

/* ─── 1. ОКИСЛЕНИЕ ─────────────────────────────────────────────── */
{
  id: "ox", icon: "🍂",
  title: { ru: "Окисление", en: "Oxidation", ro: "Oxidare" },
  sub: {
    ru: "Потемнение, тона яблока и хереса, потеря фруктовости",
    en: "Browning, apple and sherry notes, loss of fruit",
    ro: "Brunificare, note de măr și sherry, pierderea fructuozității"
  },
  symptoms: {
    ru: ["Белые темнеют: соломенный → золотой → янтарный",
         "Красные буреют, теряют яркость по краю",
         "Аромат: печёное яблоко, орех, херес, лак",
         "Вкус плоский, короткий, без свежести"],
    en: ["Whites darken: straw → gold → amber",
         "Reds turn brown, lose rim brightness",
         "Nose: baked apple, nut, sherry, varnish",
         "Palate flat, short, no freshness"],
    ro: ["Albele se închid: pai → auriu → chihlimbar",
         "Roșiile se brunifică, pierd strălucirea",
         "Nas: măr copt, nucă, sherry, lac",
         "Gust plat, scurt, fără prospețime"]
  },
  diag: {
    ru: ["Растворённый O₂ (мг/л) — ключевой параметр",
         "Свободный SO₂ (мг/л) и pH → молекулярный SO₂",
         "Цвет: поглощение A420 (белые) — рост = окисление"],
    en: ["Dissolved O₂ (mg/L) — the key parameter",
         "Free SO₂ (mg/L) and pH → molecular SO₂",
         "Colour: A420 absorbance (whites) — rising = oxidation"],
    ro: ["O₂ dizolvat (mg/L) — parametrul cheie",
         "SO₂ liber (mg/L) și pH → SO₂ molecular",
         "Culoare: absorbanța A420 (albe) — creștere = oxidare"]
  },
  branches: [
    { when: { ru: "O₂ < 0,5 мг/л", en: "O₂ < 0.5 mg/L", ro: "O₂ < 0,5 mg/L" },
      lvl: "ok",
      act: { ru: "Норма для хранения. Контролировать свободный SO₂ раз в 2–4 недели.",
             en: "Normal for storage. Check free SO₂ every 2–4 weeks.",
             ro: "Normal pentru stocare. Verificați SO₂ liber la 2–4 săptămâni." },
      products: [] },

    { when: { ru: "O₂ 0,5–1,5 мг/л", en: "O₂ 0.5–1.5 mg/L", ro: "O₂ 0,5–1,5 mg/L" },
      lvl: "warn",
      act: { ru: "Повышенный кислород. Довести свободный SO₂ до нормы по pH (таблица ниже), долить ёмкость, укрыть инертным газом.",
             en: "Elevated oxygen. Bring free SO₂ to the pH-based target (table below), top up the tank, blanket with inert gas.",
             ro: "Oxigen ridicat. Aduceți SO₂ liber la ținta după pH (tabel mai jos), umpleți cisterna, protejați cu gaz inert." },
      products: ["METABISOLFITO DI K (порошок)", "SOLFITAN® 63", "SOLFO K L"] },

    { when: { ru: "O₂ 1,5–3 мг/л", en: "O₂ 1.5–3 mg/L", ro: "O₂ 1,5–3 mg/L" },
      lvl: "bad",
      act: { ru: "Активное окисление. Срочно: инертизация N₂/CO₂, SO₂ по таблице, антиоксидантная защита. Проверить герметичность насосов и шлангов.",
             en: "Active oxidation. Act now: N₂/CO₂ inerting, SO₂ per table, antioxidant protection. Check pumps and hoses for air leaks.",
             ro: "Oxidare activă. Urgent: inertizare N₂/CO₂, SO₂ conform tabelului, protecție antioxidantă. Verificați pompele și furtunurile." },
      products: ["V ANTIOX®", "X-PRO® PROTECTION", "SAFE TAN® SG"] },

    { when: { ru: "O₂ > 3 мг/л", en: "O₂ > 3 mg/L", ro: "O₂ > 3 mg/L" },
      lvl: "bad",
      act: { ru: "Критично — вино теряет аромат необратимо. Инертизация немедленно, SO₂ в верхней границе, оценить ущерб дегустацией.",
             en: "Critical — aroma is being lost irreversibly. Inert immediately, SO₂ at the upper limit, assess damage by tasting.",
             ro: "Critic — aroma se pierde ireversibil. Inertizare imediat, SO₂ la limita superioară, evaluați prin degustare." },
      products: ["V ANTIOX®", "ACIDO L-ASCORBICO"] },

    { when: { ru: "Вино уже окислено (тона хереса, A420 высокая)",
              en: "Wine already oxidised (sherry notes, high A420)",
              ro: "Vin deja oxidat (note de sherry, A420 mare)" },
      lvl: "bad",
      act: { ru: "Снять окисленные полифенолы. PVPP — для белых, убирает жёлтые тона и горечь. Уголь — крайняя мера: забирает и аромат. Обязательна пробная обработка на 50 мл.",
             en: "Strip oxidised polyphenols. PVPP for whites — removes yellow tones and bitterness. Carbon is a last resort: it also strips aroma. Always bench-trial on 50 mL first.",
             ro: "Îndepărtați polifenolii oxidați. PVPP pentru albe — elimină tonurile galbene și amăreala. Cărbunele e ultima soluție: ia și aroma. Testați întâi pe 50 mL." },
      products: ["PVPP", "SMARTVIN® PVPP", "CARBOCROMOS® ENO", "MICOSORB® PLUS"] }
  ],
  so2table: true,
  equip: ["app_mmr_plus", "app_gas_mixer", "app_microdue"],
  prevent: {
    ru: ["Ёмкости всегда полные; свободный объём — под инертным газом",
         "Проверять насосы, шланги и уплотнения на подсос воздуха",
         "Контролировать O₂ и CO₂ в потоке — MMR-PLUS",
         "При розливе: свободный SO₂ по pH + гуммиарабик для стабильности"],
    en: ["Keep tanks full; blanket any headspace with inert gas",
         "Check pumps, hoses and seals for air ingress",
         "Monitor O₂ and CO₂ in-line — MMR-PLUS",
         "At bottling: free SO₂ per pH + gum arabic for stability"],
    ro: ["Cisterne mereu pline; spațiul liber — sub gaz inert",
         "Verificați pompele, furtunurile și garniturile",
         "Monitorizați O₂ și CO₂ în flux — MMR-PLUS",
         "La îmbuteliere: SO₂ liber după pH + gumă arabică"]
  }
},

/* ─── 2. РЕДУКЦИЯ / H₂S ────────────────────────────────────────── */
{
  id: "red", icon: "🥚",
  title: { ru: "Редукция и H₂S", en: "Reduction and H₂S", ro: "Reducere și H₂S" },
  sub: {
    ru: "Тухлое яйцо, варёная капуста, резина, чеснок",
    en: "Rotten egg, boiled cabbage, rubber, garlic",
    ro: "Ou stricat, varză fiartă, cauciuc, usturoi"
  },
  symptoms: {
    ru: ["H₂S — тухлое яйцо, канализация (порог ~1 мкг/л)",
         "Меркаптаны — варёная капуста, лук, резина",
         "Дисульфиды — чеснок, жжёная резина (стойкие)",
         "Аромат «закрыт», вино кажется грязным"],
    en: ["H₂S — rotten egg, drain (threshold ~1 µg/L)",
         "Mercaptans — boiled cabbage, onion, rubber",
         "Disulphides — garlic, burnt rubber (persistent)",
         "Aroma 'closed', wine smells dirty"],
    ro: ["H₂S — ou stricat, canal (prag ~1 µg/L)",
         "Mercaptani — varză fiartă, ceapă, cauciuc",
         "Disulfuri — usturoi, cauciuc ars (persistente)",
         "Aromă „închisă”, vin murdar la nas"]
  },
  diag: {
    ru: ["Медный тест: капля раствора меди в пробу — запах ушёл = H₂S/меркаптаны",
         "YAN сусла (мг/л) — главный предиктор",
         "Момент появления: во время брожения или после"],
    en: ["Copper test: a drop of copper solution — if the smell goes, it's H₂S/mercaptans",
         "Must YAN (mg/L) — the main predictor",
         "Timing: during fermentation or after"],
    ro: ["Test cu cupru: o picătură de soluție — dacă mirosul dispare = H₂S/mercaptani",
         "YAN-ul mustului (mg/L) — principalul predictor",
         "Momentul apariției: în timpul fermentației sau după"]
  },
  branches: [
    { when: { ru: "YAN сусла < 150 мг/л", en: "Must YAN < 150 mg/L", ro: "YAN must < 150 mg/L" },
      lvl: "warn",
      act: { ru: "Дефицит азота — главная причина H₂S. Питание в две дачи: при засеве и на 1/3 брожения. Не позже 2/3 — иначе азот останется в вине.",
             en: "Nitrogen deficit is the main cause of H₂S. Feed in two additions: at inoculation and at 1/3 of fermentation. Never after 2/3 — nitrogen would remain in the wine.",
             ro: "Deficitul de azot e cauza principală. Hrăniți în două reprize: la însămânțare și la 1/3 din fermentație. Niciodată după 2/3." },
      products: ["V ACTIV PREMIUM®", "BOOSTER ACTIV PREMIUM®", "FOSFOACTIV PREMIUM®"] },

    { when: { ru: "H₂S во время брожения, лёгкий",
              en: "H₂S during fermentation, mild",
              ro: "H₂S în timpul fermentației, ușor" },
      lvl: "warn",
      act: { ru: "Открытый ремонтаж с аэрацией — самый быстрый приём. Дрожжам нужен кислород в первой трети. Плюс азотное питание.",
             en: "Open pump-over with aeration — the fastest fix. Yeast needs oxygen in the first third. Add nitrogen nutrition.",
             ro: "Remontare deschisă cu aerare — cea mai rapidă soluție. Drojdiile au nevoie de oxigen în prima treime. Plus hrană azotată." },
      products: ["V ACTIV PREMIUM®", "SMARTVIN® ACTIV"] },

    { when: { ru: "Редукция после брожения, запах уходит при взбалтывании",
              en: "Reduction post-fermentation, smell clears on swirling",
              ro: "Reducere după fermentație, mirosul dispare la agitare" },
      lvl: "warn",
      act: { ru: "Свежий H₂S — переливка с аэрацией снимает его. Дальше — микрооксигенация малыми дозами под контролем дегустации.",
             en: "Fresh H₂S — an aerative racking removes it. Then micro-oxygenation in small doses, controlled by tasting.",
             ro: "H₂S proaspăt — pritocul cu aerare îl elimină. Apoi microoxigenare în doze mici, controlată prin degustare." },
      products: [] },

    { when: { ru: "Запах НЕ уходит при аэрации (меркаптаны, дисульфиды)",
              en: "Smell does NOT clear on aeration (mercaptans, disulphides)",
              ro: "Mirosul NU dispare la aerare (mercaptani, disulfuri)" },
      lvl: "bad",
      act: { ru: "Связанные формы — аэрация уже не поможет, а лишь окислит вино. Классическое решение — сульфат меди (в каталоге Vason его нет, берётся отдельно, макс. остаток Cu 1 мг/л). Хитозан частично связывает тиолы. Всегда пробная обработка.",
             en: "Bound forms — aeration will not help, it will only oxidise the wine. The classic remedy is copper sulphate (not in the Vason catalogue, sourced separately; max residual Cu 1 mg/L). Chitosan partially binds thiols. Always bench-trial.",
             ro: "Forme legate — aerarea nu ajută, doar oxidează vinul. Soluția clasică e sulfatul de cupru (nu e în catalogul Vason; Cu rezidual max. 1 mg/L). Chitozanul leagă parțial tiolii. Testați întâi." },
      products: ["KITOSMART", "SMARTVIN® CARB"] }
  ],
  equip: ["app_microdue", "app_easyferm"],
  prevent: {
    ru: ["YAN сусла 150–250 мг/л — измерять, а не угадывать",
         "Питание дробно: засев + 1/3 брожения, не позже 2/3",
         "Аэрация в первой трети брожения",
         "Дрожжи с низкой потребностью в азоте на бедных суслах"],
    en: ["Must YAN 150–250 mg/L — measure it, don't guess",
         "Split nutrition: inoculation + 1/3 of fermentation, never after 2/3",
         "Aerate during the first third of fermentation",
         "Low-nitrogen-demand yeasts on poor musts"],
    ro: ["YAN must 150–250 mg/L — măsurați, nu ghiciți",
         "Hrănire fracționată: însămânțare + 1/3 fermentație, nu după 2/3",
         "Aerare în prima treime a fermentației",
         "Drojdii cu cerințe mici de azot pe musturi sărace"]
  }
},

/* ─── 3. ЛЕТУЧАЯ КИСЛОТНОСТЬ ───────────────────────────────────── */
{
  id: "va", icon: "🧪",
  title: { ru: "Летучая кислотность", en: "Volatile acidity", ro: "Aciditate volatilă" },
  sub: {
    ru: "Запах уксуса и лака для ногтей, жгучесть в финале",
    en: "Vinegar and nail-polish nose, burning finish",
    ro: "Miros de oțet și acetonă, final iritant"
  },
  symptoms: {
    ru: ["Уксусный тон (уксусная кислота)",
         "Лак для ногтей, растворитель (этилацетат)",
         "Жгучесть, царапающий финал",
         "Часто вместе с плёнкой на поверхности"],
    en: ["Vinegar tone (acetic acid)",
         "Nail polish, solvent (ethyl acetate)",
         "Burning, scratchy finish",
         "Often together with a surface film"],
    ro: ["Ton de oțet (acid acetic)",
         "Ojă, solvent (acetat de etil)",
         "Final iritant, zgâriat",
         "Deseori împreună cu peliculă la suprafață"]
  },
  diag: {
    ru: ["Летучая кислотность (г/л в пересчёте на уксусную)",
         "Свободный SO₂ и pH",
         "Остаточный сахар — топливо для бактерий",
         "Осмотр поверхности: плёнка = доступ воздуха"],
    en: ["Volatile acidity (g/L as acetic acid)",
         "Free SO₂ and pH",
         "Residual sugar — fuel for bacteria",
         "Inspect the surface: film = air ingress"],
    ro: ["Aciditate volatilă (g/L acid acetic)",
         "SO₂ liber și pH",
         "Zahăr rezidual — combustibil pentru bacterii",
         "Inspectați suprafața: peliculă = acces de aer"]
  },
  branches: [
    { when: { ru: "ЛК < 0,4 г/л", en: "VA < 0.4 g/L", ro: "AV < 0,4 g/L" },
      lvl: "ok",
      act: { ru: "Норма. Контроль раз в месяц, особенно в неполных ёмкостях.",
             en: "Normal. Check monthly, especially in partially filled tanks.",
             ro: "Normal. Verificare lunară, mai ales în cisterne parțial pline." },
      products: [] },

    { when: { ru: "ЛК 0,4–0,7 г/л", en: "VA 0.4–0.7 g/L", ro: "AV 0,4–0,7 g/L" },
      lvl: "warn",
      act: { ru: "Процесс идёт. Перекрыть кислород (ацетобактерии без него не работают), поднять свободный SO₂ по pH, долить ёмкость. Найти источник: неполный танк, тёплый склад, грязный шланг.",
             en: "The process is running. Cut off oxygen (acetobacter cannot work without it), raise free SO₂ per pH, top up the tank. Find the source: half-empty tank, warm cellar, dirty hose.",
             ro: "Procesul e activ. Tăiați oxigenul (acetobacteriile nu lucrează fără el), ridicați SO₂ liber după pH, umpleți cisterna. Găsiți sursa." },
      products: ["METABISOLFITO DI K (порошок)", "SOLFITAN® 63", "KITOSMART"] },

    { when: { ru: "ЛК 0,7–0,9 г/л", en: "VA 0.7–0.9 g/L", ro: "AV 0,7–0,9 g/L" },
      lvl: "bad",
      act: { ru: "Близко к пределу. Немедленно: SO₂, санитарная фильтрация, изоляция партии. Планировать купаж с вином низкой ЛК — снизить её химически нельзя.",
             en: "Close to the legal limit. Immediately: SO₂, sterile filtration, isolate the batch. Plan a blend with low-VA wine — VA cannot be removed chemically.",
             ro: "Aproape de limită. Imediat: SO₂, filtrare sterilă, izolați lotul. Planificați cupajarea cu vin cu AV mică — nu se poate elimina chimic." },
      products: ["BACTOZYM® SG", "X-PRO® BACTOCLEAN", "CLARITO® BACTOCLEAN"] },

    { when: { ru: "ЛК > 0,9 г/л", en: "VA > 0.9 g/L", ro: "AV > 0,9 g/L" },
      lvl: "bad",
      act: { ru: "Коммерчески непригодно как моновино. Пределы ЕС: около 1,08 г/л (белые) и 1,2 г/л (красные) — уточнить по своему регламенту. Варианты: купаж (если позволяет закон) или списание. Партию изолировать, оборудование продезинфицировать.",
             en: "Not commercially viable on its own. EU limits are roughly 1.08 g/L (whites) and 1.2 g/L (reds) — confirm against your own regulation. Options: blending (if legally allowed) or write-off. Isolate the batch, disinfect equipment.",
             ro: "Nevandabil ca atare. Limitele UE: cca 1,08 g/L (albe) și 1,2 g/L (roșii) — verificați reglementarea locală. Opțiuni: cupajare (dacă e permis) sau casare. Izolați lotul, dezinfectați echipamentul." },
      products: ["BIOCIDA V", "BLASTOKILL"] }
  ],
  so2table: true,
  prevent: {
    ru: ["Полные ёмкости — главное правило против уксусных бактерий",
         "Свободный SO₂ по pH, а не «по привычке»",
         "Санитария шлангов, насосов, кранов после каждой перекачки",
         "Контроль остаточного сахара: < 2 г/л или стерильный розлив"],
    en: ["Full tanks — the number one rule against acetic bacteria",
         "Free SO₂ set by pH, not by habit",
         "Sanitise hoses, pumps and valves after every transfer",
         "Control residual sugar: < 2 g/L or sterile bottling"],
    ro: ["Cisterne pline — regula nr. 1 împotriva bacteriilor acetice",
         "SO₂ liber stabilit după pH, nu din obișnuință",
         "Igienizați furtunurile, pompele și robinetele după fiecare transfer",
         "Controlați zahărul rezidual: < 2 g/L sau îmbuteliere sterilă"]
  }
},

/* ─── 4. BRETTANOMYCES ─────────────────────────────────────────── */
{
  id: "brett", icon: "🐴",
  title: { ru: "Brettanomyces", en: "Brettanomyces", ro: "Brettanomyces" },
  sub: {
    ru: "Конюшня, лошадиный пот, пластырь, копчёность",
    en: "Stable, horse sweat, band-aid, smoky",
    ro: "Grajd, transpirație de cal, plasture, afumat"
  },
  symptoms: {
    ru: ["4-этилфенол — конюшня, лошадь, пластырь",
         "4-этилгваякол — копчёность, гвоздика, бекон",
         "Изовалериановая кислота — прогорклый сыр, пот",
         "Вино «сохнет», теряет фрукт, финал металлический"],
    en: ["4-ethylphenol — stable, horse, band-aid",
         "4-ethylguaiacol — smoke, clove, bacon",
         "Isovaleric acid — rancid cheese, sweat",
         "Wine dries out, loses fruit, metallic finish"],
    ro: ["4-etilfenol — grajd, cal, plasture",
         "4-etilguaiacol — fum, cuișoare, bacon",
         "Acid izovaleric — brânză râncedă, transpirație",
         "Vinul se „usucă”, pierde fructul, final metalic"]
  },
  diag: {
    ru: ["4-этилфенол (мкг/л) — лабораторный анализ",
         "pH, свободный SO₂ → молекулярный SO₂",
         "Остаточный сахар (Brett доедает следовые сахара)",
         "Температура склада"],
    en: ["4-ethylphenol (µg/L) — lab analysis",
         "pH, free SO₂ → molecular SO₂",
         "Residual sugar (Brett feeds on trace sugars)",
         "Cellar temperature"],
    ro: ["4-etilfenol (µg/L) — analiză de laborator",
         "pH, SO₂ liber → SO₂ molecular",
         "Zahăr rezidual (Brett consumă zaharuri urme)",
         "Temperatura pivniței"]
  },
  branches: [
    { when: { ru: "4-ЭФ < 300 мкг/л", en: "4-EP < 300 µg/L", ro: "4-EF < 300 µg/L" },
      lvl: "ok",
      act: { ru: "Ниже порога восприятия у большинства. Держать молекулярный SO₂ ≥ 0,5 мг/л и не расслабляться: Brett растёт незаметно.",
             en: "Below most tasters' threshold. Keep molecular SO₂ ≥ 0.5 mg/L and stay alert: Brett grows unnoticed.",
             ro: "Sub pragul de percepție. Mențineți SO₂ molecular ≥ 0,5 mg/L și fiți atenți: Brett crește neobservat." },
      products: [] },

    { when: { ru: "4-ЭФ 300–600 мкг/л", en: "4-EP 300–600 µg/L", ro: "4-EF 300–600 µg/L" },
      lvl: "warn",
      act: { ru: "Заметно в дегустации, особенно в белых и лёгких красных. Поднять молекулярный SO₂ до 0,6 мг/л (по таблице), охладить склад ниже 15 °C, обработать хитозаном.",
             en: "Perceptible on tasting, especially in whites and light reds. Raise molecular SO₂ to 0.6 mg/L (see table), cool the cellar below 15 °C, treat with chitosan.",
             ro: "Perceptibil la degustare. Ridicați SO₂ molecular la 0,6 mg/L (vezi tabel), răciți pivnița sub 15 °C, tratați cu chitozan." },
      products: ["CLARITO® BRETTLESS", "KITOSMART"] },

    { when: { ru: "4-ЭФ > 600 мкг/л", en: "4-EP > 600 µg/L", ro: "4-EF > 600 µg/L" },
      lvl: "bad",
      act: { ru: "Явный дефект. Убить популяцию (хитозан + SO₂ + стерильная фильтрация 0,45 мкм), затем частично снять фенолы адсорбентами. Полностью этилфенолы НЕ удаляются — рассчитывайте на смягчение, а не на исцеление.",
             en: "Clear fault. Kill the population (chitosan + SO₂ + 0.45 µm sterile filtration), then partially strip the phenols with adsorbents. Ethylphenols cannot be fully removed — expect mitigation, not a cure.",
             ro: "Defect evident. Eliminați populația (chitozan + SO₂ + filtrare sterilă 0,45 µm), apoi reduceți parțial fenolii cu adsorbanți. Etilfenolii NU se elimină complet." },
      products: ["CLARITO® BRETTLESS", "MICOSORB® PLUS", "CARBOCROMOS® ENO", "PVPP"] },

    { when: { ru: "Условия риска: pH > 3,6 · сахар > 2 г/л · T > 15 °C",
              en: "Risk conditions: pH > 3.6 · sugar > 2 g/L · T > 15 °C",
              ro: "Condiții de risc: pH > 3,6 · zahăr > 2 g/L · T > 15 °C" },
      lvl: "warn",
      act: { ru: "Идеальная среда для Brett. При pH 3,6 для молекулярного 0,6 мг/л нужно 38 мг/л свободного SO₂ — вдвое больше, чем при pH 3,2. Досушить вино или стерильно отфильтровать перед выдержкой в дубе.",
             en: "Perfect environment for Brett. At pH 3.6 you need 38 mg/L free SO₂ for 0.6 mg/L molecular — twice as much as at pH 3.2. Ferment to dryness or sterile-filter before barrel ageing.",
             ro: "Mediu ideal pentru Brett. La pH 3,6 sunt necesare 38 mg/L SO₂ liber pentru 0,6 mg/L molecular. Fermentați până la sec sau filtrați steril înainte de baric." },
      products: ["CLARITO® BRETTLESS"] }
  ],
  so2table: true,
  equip: ["app_mftc", "app_microfiltrazione", "app_sofos"],
  prevent: {
    ru: ["Молекулярный SO₂ ≥ 0,5–0,6 мг/л на всём пути после ЯМБ",
         "Сахар < 2 г/л — не оставлять Brett еды",
         "Бочки — главный резервуар: озон/пар, не «просто вода»",
         "Стерильная фильтрация перед розливом при риске"],
    en: ["Molecular SO₂ ≥ 0.5–0.6 mg/L at all times after MLF",
         "Sugar < 2 g/L — leave Brett nothing to eat",
         "Barrels are the main reservoir: ozone/steam, not 'just water'",
         "Sterile filtration before bottling when at risk"],
    ro: ["SO₂ molecular ≥ 0,5–0,6 mg/L după FML",
         "Zahăr < 2 g/L — nu lăsați hrană pentru Brett",
         "Baricurile sunt rezervorul principal: ozon/abur, nu doar apă",
         "Filtrare sterilă înainte de îmbuteliere la risc"]
  }
},

/* ─── 5. БЕЛКОВЫЙ КАСС ─────────────────────────────────────────── */
{
  id: "prot", icon: "🌫️",
  title: { ru: "Белковая муть", en: "Protein haze", ro: "Casă proteică" },
  sub: {
    ru: "Помутнение белых вин в бутылке при нагреве",
    en: "White wines go hazy in bottle when warm",
    ro: "Vinurile albe se tulbură în sticlă la căldură"
  },
  symptoms: {
    ru: ["Вино прозрачное в погребе, мутнеет в тепле",
         "Молочно-белая опалесценция, потом хлопья",
         "Проблема почти исключительно белых и розовых",
         "Проявляется у клиента — репутационный удар"],
    en: ["Clear in the cellar, hazy when warm",
         "Milky opalescence, then flocs",
         "Almost exclusively whites and rosés",
         "Shows up at the customer — a reputational hit"],
    ro: ["Limpede în pivniță, tulbure la căldură",
         "Opalescență lăptoasă, apoi flocoane",
         "Aproape exclusiv la albe și rozé",
         "Apare la client — lovitură de imagine"]
  },
  diag: {
    ru: ["Тепловой тест: 80 °C, 2–6 ч, охладить, замерить мутность",
         "ΔNTU = мутность после теста − до теста",
         "Обязателен для КАЖДОЙ партии белого перед розливом"],
    en: ["Heat test: 80 °C for 2–6 h, cool, measure turbidity",
         "ΔNTU = turbidity after − before",
         "Mandatory for EVERY white lot before bottling"],
    ro: ["Test termic: 80 °C, 2–6 h, răcire, măsurare turbiditate",
         "ΔNTU = turbiditate după − înainte",
         "Obligatoriu pentru FIECARE lot de alb înainte de îmbuteliere"]
  },
  branches: [
    { when: { ru: "ΔNTU < 2", en: "ΔNTU < 2", ro: "ΔNTU < 2" },
      lvl: "ok",
      act: { ru: "Стабильно. Бентонит не нужен — каждый лишний грамм забирает аромат и объём.",
             en: "Stable. No bentonite needed — every extra gram strips aroma and body.",
             ro: "Stabil. Nu e nevoie de bentonită — fiecare gram în plus ia din aromă și corp." },
      products: [] },

    { when: { ru: "ΔNTU 2–5", en: "ΔNTU 2–5", ro: "ΔNTU 2–5" },
      lvl: "warn",
      act: { ru: "Граница. Подобрать минимальную дозу бентонита пробной обработкой: 20 / 40 / 60 г/гл на образцах по 50 мл, тепловой тест каждого.",
             en: "Borderline. Find the minimum bentonite dose by bench trial: 20 / 40 / 60 g/hL on 50 mL samples, heat-test each.",
             ro: "La limită. Găsiți doza minimă de bentonită prin test: 20 / 40 / 60 g/hL pe probe de 50 mL, test termic la fiecare." },
      products: ["PLUSGRAN®", "MASTERVIN® COMPACT"] },

    { when: { ru: "ΔNTU > 5", en: "ΔNTU > 5", ro: "ΔNTU > 5" },
      lvl: "bad",
      act: { ru: "Нестабильно — в бутылке помутнеет. Бентонит обязателен, доза по титрованию (обычно 40–80 г/гл). Работать на сусле выгоднее: там бентонит не бьёт по аромату.",
             en: "Unstable — it will haze in bottle. Bentonite is mandatory, dose by titration (typically 40–80 g/hL). Treating the must is better: bentonite there does not hurt aroma.",
             ro: "Instabil — se va tulbura în sticlă. Bentonita e obligatorie, doza prin titrare (uzual 40–80 g/hL). Tratarea mustului e preferabilă." },
      products: ["PLUSGRAN®", "PLUSGRAN® GEL", "MASTERVIN® COMPACT", "MASTERVIN® UFC"] },

    { when: { ru: "Нужно сохранить аромат (тиоловые сорта)",
              en: "Aroma must be preserved (thiol varieties)",
              ro: "Trebuie păstrată aroma (soiuri tiolice)" },
      lvl: "warn",
      act: { ru: "Бентонит забирает тиолы. Обрабатывать сусло, а не вино; комбинировать минимальную дозу бентонита с хитозаном; вернуть объём маннопротеинами.",
             en: "Bentonite strips thiols. Treat the must, not the wine; combine a minimal bentonite dose with chitosan; restore body with mannoproteins.",
             ro: "Bentonita ia tiolii. Tratați mustul, nu vinul; combinați o doză minimă cu chitozan; refaceți corpul cu manoproteine." },
      products: ["KITOSMART", "X-PRO® BATONNAGE", "MASTERVIN® UFC"] }
  ],
  equip: ["app_easyfloat", "app_dosacom"],
  prevent: {
    ru: ["Тепловой тест каждой партии — правило без исключений",
         "Бентонит на сусле (флотация) вместо вина",
         "Не «на глаз»: доза по титрованию, иначе теряете аромат",
         "Ботритис поднимает белок — с такого урожая тест обязателен"],
    en: ["Heat-test every lot — no exceptions",
         "Bentonite on the must (flotation) rather than the wine",
         "Never by eye: dose by titration or you lose aroma",
         "Botrytis raises protein — testing is mandatory on such fruit"],
    ro: ["Test termic la fiecare lot — fără excepții",
         "Bentonită pe must (flotație) în loc de vin",
         "Niciodată „din ochi”: doza prin titrare",
         "Botrytis crește proteina — testul e obligatoriu"]
  }
},

/* ─── 6. ТАРТРАТНАЯ НЕСТАБИЛЬНОСТЬ ─────────────────────────────── */
{
  id: "tart", icon: "❄️",
  title: { ru: "Тартратные кристаллы", en: "Tartrate instability", ro: "Instabilitate tartrică" },
  sub: {
    ru: "«Винный камень» в бутылке — покупатель считает это стеклом",
    en: "'Wine diamonds' in bottle — customers mistake them for glass",
    ro: "„Diamante de vin” în sticlă — clienții cred că e sticlă"
  },
  symptoms: {
    ru: ["Прозрачные кристаллы на дне и на пробке",
         "Появляются после холода при перевозке или в витрине",
         "Дефект косметический, но возвраты реальные"],
    en: ["Clear crystals on the base and on the cork",
         "Appear after cold in transit or on the shelf",
         "A cosmetic fault, but the returns are real"],
    ro: ["Cristale transparente pe fund și pe dop",
         "Apar după frig, în transport sau pe raft",
         "Defect cosmetic, dar retururile sunt reale"]
  },
  diag: {
    ru: ["Мини-контакт-тест: падение проводимости < 5 % = стабильно",
         "Тест холодом: −4 °C, 6 суток (долго, но надёжно)",
         "SMARTCHECK® даёт ответ за часы, а не за неделю"],
    en: ["Mini-contact test: conductivity drop < 5 % = stable",
         "Cold test: −4 °C for 6 days (slow but reliable)",
         "SMARTCHECK® answers in hours, not a week"],
    ro: ["Mini-contact test: scădere conductivitate < 5 % = stabil",
         "Test la rece: −4 °C, 6 zile (lent, dar sigur)",
         "SMARTCHECK® răspunde în ore, nu într-o săptămână"]
  },
  branches: [
    { when: { ru: "Падение проводимости < 5 %", en: "Conductivity drop < 5 %", ro: "Scădere conductivitate < 5 %" },
      lvl: "ok",
      act: { ru: "Стабильно. Обработка не нужна — не тратьте деньги и не трогайте вино.",
             en: "Stable. No treatment needed — save the money and leave the wine alone.",
             ro: "Stabil. Nu e nevoie de tratament." },
      products: [] },

    { when: { ru: "Нестабильно, вино идёт в розлив скоро",
              en: "Unstable, bottling soon",
              ro: "Instabil, îmbuteliere apropiată" },
      lvl: "warn",
      act: { ru: "Ингибиторы кристаллизации — быстро, дёшево, без холода. Гуммиарабик добавляют ПОСЛЕ финальной фильтрации (он забивает мембрану). Работает и на цветовую стабильность красных.",
             en: "Crystallisation inhibitors — fast, cheap, no cold. Gum arabic is added AFTER final filtration (it blinds the membrane). It also helps colour stability in reds.",
             ro: "Inhibitori de cristalizare — rapid, ieftin, fără frig. Guma arabică se adaugă DUPĂ filtrarea finală (colmatează membrana)." },
      products: ["SMARTGUM®", "ICON® GUM", "ARABAN®", "CRISTALLITE®"] },

    { when: { ru: "Большой объём, нужна полная стабильность",
              en: "Large volume, full stability required",
              ro: "Volum mare, stabilitate completă necesară" },
      lvl: "warn",
      act: { ru: "Физическая стабилизация. Электродиализ (ED) — при комнатной температуре, без добавок, экономит энергию против холода. Холодная стабилизация — дёшево по оборудованию, дорого по электричеству.",
             en: "Physical stabilisation. Electrodialysis (ED) — at room temperature, no additives, saves energy versus cold. Cold stabilisation — cheap in equipment, expensive in electricity.",
             ro: "Stabilizare fizică. Electrodializă (ED) — la temperatura camerei, fără aditivi. Stabilizarea la rece — ieftină ca echipament, scumpă la energie." },
      products: ["BITARTRATO DI K (микронизированный)", "CRISTALLITE® SPECIAL"] },

    { when: { ru: "Кальциевая нестабильность (Ca > 80 мг/л)",
              en: "Calcium instability (Ca > 80 mg/L)",
              ro: "Instabilitate calcică (Ca > 80 mg/L)" },
      lvl: "bad",
      act: { ru: "Тартрат кальция коварнее: выпадает медленно, холод не помогает и тест холодом его не ловит. Причина часто — раскисление мелом или контакт с бетоном. Решение: электродиализ.",
             en: "Calcium tartrate is trickier: it precipitates slowly, cold does not help and the cold test misses it. Often caused by chalk de-acidification or concrete contact. Solution: electrodialysis.",
             ro: "Tartratul de calciu e mai perfid: precipită lent, frigul nu ajută. Cauza: dezacidifiere cu cretă sau contact cu betonul. Soluție: electrodializă." },
      products: [] }
  ],
  equip: ["app_ed", "app_smart_check", "app_smartcheckmini", "app_mastermind_ph"],
  prevent: {
    ru: ["Тест перед КАЖДЫМ розливом, а не «по опыту»",
         "Гуммиарабик — только после финальной фильтрации",
         "Следить за кальцием при раскислении",
         "Электродиализ окупается на больших объёмах"],
    en: ["Test before EVERY bottling, not 'from experience'",
         "Gum arabic — only after final filtration",
         "Watch calcium when de-acidifying",
         "Electrodialysis pays off at volume"],
    ro: ["Test înainte de FIECARE îmbuteliere",
         "Gumă arabică — doar după filtrarea finală",
         "Atenție la calciu la dezacidifiere",
         "Electrodializa se amortizează la volume mari"]
  }
},

/* ─── 7. ЗАСТРЯВШЕЕ БРОЖЕНИЕ ───────────────────────────────────── */
{
  id: "stuck", icon: "🛑",
  title: { ru: "Застрявшее брожение", en: "Stuck fermentation", ro: "Fermentație blocată" },
  sub: {
    ru: "Плотность стоит, сахар остался — самая дорогая ошибка",
    en: "Density static, sugar left — the most expensive failure",
    ro: "Densitatea stă, zahărul rămâne — cea mai scumpă eroare"
  },
  symptoms: {
    ru: ["Плотность не падает более 48 часов",
         "Остаточный сахар выше 5 г/л, брожение «замерло»",
         "Запах редукции, вино вялое",
         "Риск: уксусные бактерии сядут на остаточный сахар"],
    en: ["Density static for more than 48 hours",
         "Residual sugar above 5 g/L, fermentation 'frozen'",
         "Reductive smell, wine sluggish",
         "Risk: acetic bacteria will feed on the leftover sugar"],
    ro: ["Densitatea nu scade peste 48 de ore",
         "Zahăr rezidual peste 5 g/L, fermentație „înghețată”",
         "Miros de reducere, vin apatic",
         "Risc: bacteriile acetice se hrănesc cu zahărul rămas"]
  },
  diag: {
    ru: ["Остаточный сахар (г/л) и плотность в динамике",
         "YAN — был ли азот вообще",
         "Температура: > 30 °C (красные) или > 20 °C (белые) убивает дрожжи",
         "Спирт: выше 15 % — предел для многих штаммов"],
    en: ["Residual sugar (g/L) and density trend",
         "YAN — was there any nitrogen at all",
         "Temperature: > 30 °C (reds) or > 20 °C (whites) kills yeast",
         "Alcohol: above 15 % is the limit for many strains"],
    ro: ["Zahăr rezidual (g/L) și evoluția densității",
         "YAN — a existat azot?",
         "Temperatura: > 30 °C (roșii) sau > 20 °C (albe) omoară drojdiile",
         "Alcool: peste 15 % e limita multor tulpini"]
  },
  branches: [
    { when: { ru: "Брожение идёт < 2/3, но замедлилось",
              en: "Fermentation below 2/3 but slowing",
              ro: "Fermentație sub 2/3, dar încetinește" },
      lvl: "warn",
      act: { ru: "Ещё можно спасти питанием. Азот усваивается только пока дрожжи активны — после 2/3 добавка бесполезна и опасна (останется в вине как еда для бактерий). Температуру держать 20–25 °C.",
             en: "Still rescuable with nutrition. Nitrogen is only taken up while yeast is active — after 2/3 an addition is useless and risky (it stays as bacterial food). Hold temperature at 20–25 °C.",
             ro: "Încă se poate salva cu hrană. Azotul se asimilează doar cât drojdiile sunt active — după 2/3 adaosul e inutil și riscant. Mențineți 20–25 °C." },
      products: ["V ACTIV PREMIUM®", "BOOSTER ACTIV PREMIUM®", "FOSFOACTIV PREMIUM®", "D.A.P. ACTIV"] },

    { when: { ru: "Брожение полностью встало",
              en: "Fermentation fully stuck",
              ro: "Fermentație complet blocată" },
      lvl: "bad",
      act: { ru: "Нужен рестарт новой закваской. Порядок: 1) снять вино с осадка, 2) убрать ингибиторы адсорбентом, 3) развести спиртоустойчивые дрожжи и адаптировать их, приливая вино порциями, 4) внести в объём. Просто «досыпать дрожжей» — не работает.",
             en: "A restart culture is required. Order: 1) rack off the lees, 2) remove inhibitors with an adsorbent, 3) rehydrate alcohol-tolerant yeast and acclimatise it by adding wine in steps, 4) inoculate. Simply 'adding more yeast' does not work.",
             ro: "E nevoie de restart cu cultură nouă. Ordinea: 1) pritocire, 2) eliminarea inhibitorilor cu adsorbant, 3) rehidratarea drojdiilor alcool-tolerante și aclimatizare, 4) însămânțare." },
      products: ["L.P.A. — АКТИВИРОВАННАЯ ДРОЖЖЕВАЯ ПАСТА", "LIEVITO PREMIUM FRUCTO", "LIEVITO CLASSIC BAYANUS", "MICOSORB® PLUS"] },

    { when: { ru: "Остаток фруктозы (глюкоза съедена)",
              en: "Fructose left (glucose consumed)",
              ro: "Fructoză rămasă (glucoza consumată)" },
      lvl: "warn",
      act: { ru: "Классика конца брожения: дрожжи предпочитают глюкозу, фруктоза остаётся. Нужны фруктофильные штаммы — обычные её не доедят.",
             en: "The classic end-of-ferment problem: yeast prefers glucose, fructose is left behind. Fructophilic strains are needed — ordinary ones will not finish it.",
             ro: "Clasica problemă de final: drojdiile preferă glucoza, fructoza rămâne. Sunt necesare tulpini fructofile." },
      products: ["LIEVITO PREMIUM FRUCTO", "V ACTIV CLEVER"] },

    { when: { ru: "Вино с остаточным сахаром стоит > 3 дней",
              en: "Wine with residual sugar sitting > 3 days",
              ro: "Vin cu zahăr rezidual > 3 zile" },
      lvl: "bad",
      act: { ru: "Гонка со временем: сахар + низкий SO₂ = уксусные и молочные бактерии. Пока решаете судьбу брожения, защитите вино: лизоцим против ЯМБ, SO₂ — только если рестарт отменяется (SO₂ убьёт и новые дрожжи).",
             en: "A race against time: sugar + low SO₂ = acetic and lactic bacteria. While you decide, protect the wine: lysozyme against LAB; SO₂ only if you abandon the restart (it will kill the new yeast too).",
             ro: "Cursă contra cronometru: zahăr + SO₂ mic = bacterii acetice și lactice. Protejați vinul: lizozim contra bacteriilor lactice; SO₂ doar dacă renunțați la restart." },
      products: ["BACTOZYM® SG", "X-PRO® BACTOCLEAN"] }
  ],
  equip: ["app_easyferm", "app_mastermind_qft"],
  prevent: {
    ru: ["Измерять YAN, а не надеяться: 150–250 мг/л",
         "Питание дробно, не одной дачей",
         "Контроль температуры: пик брожения — самый опасный момент",
         "Регидратация дрожжей по протоколу — EASYFERM® делает это точно"],
    en: ["Measure YAN, don't hope: 150–250 mg/L",
         "Split the nutrition, don't dump it all at once",
         "Control temperature: the peak of fermentation is the danger zone",
         "Rehydrate yeast to protocol — EASYFERM® does it precisely"],
    ro: ["Măsurați YAN: 150–250 mg/L",
         "Hrănire fracționată",
         "Controlați temperatura: vârful fermentației e zona de risc",
         "Rehidratare după protocol — EASYFERM® o face precis"]
  }
},

/* ─── 8. МАЛОЛАКТИКА ───────────────────────────────────────────── */
{
  id: "mlf", icon: "🦠",
  title: { ru: "ЯМБ не идёт", en: "MLF won't start", ro: "FML nu pornește" },
  sub: {
    ru: "Яблочная кислота стоит, вино зелёное и жёсткое",
    en: "Malic acid static, wine green and harsh",
    ro: "Acidul malic stagnează, vinul e verde și dur"
  },
  symptoms: {
    ru: ["Яблочная кислота не падает неделями",
         "Вкус резкий, «зелёное яблоко»",
         "Риск: ЯМБ проснётся в бутылке — газ и муть"],
    en: ["Malic acid does not drop for weeks",
         "Sharp, 'green apple' palate",
         "Risk: MLF restarts in bottle — gas and haze"],
    ro: ["Acidul malic nu scade săptămâni",
         "Gust ascuțit, „măr verde”",
         "Risc: FML pornește în sticlă — gaz și tulbureală"]
  },
  diag: {
    ru: ["Яблочная кислота (г/л): завершено при < 0,2 г/л",
         "pH — ниже 3,2 бактериям тяжело",
         "Общий SO₂ — выше 40–50 мг/л блокирует ЯМБ",
         "Температура — ниже 16 °C процесс стоит",
         "Спирт — выше 14–15 % угнетает бактерии"],
    en: ["Malic acid (g/L): complete below 0.2 g/L",
         "pH — below 3.2 is hard for bacteria",
         "Total SO₂ — above 40–50 mg/L blocks MLF",
         "Temperature — below 16 °C it stalls",
         "Alcohol — above 14–15 % inhibits bacteria"],
    ro: ["Acid malic (g/L): complet sub 0,2 g/L",
         "pH — sub 3,2 e greu pentru bacterii",
         "SO₂ total — peste 40–50 mg/L blochează FML",
         "Temperatura — sub 16 °C stagnează",
         "Alcool — peste 14–15 % inhibă bacteriile"]
  },
  branches: [
    { when: { ru: "Нужно ЗАПУСТИТЬ ЯМБ", en: "MLF needs to START", ro: "FML trebuie PORNITĂ" },
      lvl: "warn",
      act: { ru: "Условия важнее бактерий: T 18–22 °C, общий SO₂ < 40 мг/л, pH > 3,2. Засев отобранной культурой + питание для бактерий. Спонтанная ЯМБ — лотерея с Brett в призах.",
             en: "Conditions matter more than the bacteria: T 18–22 °C, total SO₂ < 40 mg/L, pH > 3.2. Inoculate a selected culture and feed it. Spontaneous MLF is a lottery where Brett is a prize.",
             ro: "Condițiile contează mai mult decât bacteriile: T 18–22 °C, SO₂ total < 40 mg/L, pH > 3,2. Însămânțați cultură selecționată + hrană. FML spontană e o loterie." },
      products: ["БАКТЕРИИ ЯМБ — AMAR04", "БАКТЕРИИ ЯМБ — CHARD15", "V MALO ACTIV", "V MALO CLEAR"] },

    { when: { ru: "ЯМБ встала на середине", en: "MLF stalled halfway", ro: "FML s-a oprit la jumătate" },
      lvl: "bad",
      act: { ru: "Проверить SO₂ (связанный тоже мешает), температуру и питание. Остатки лизоцима блокируют бактерии наглухо. Подогреть до 20 °C и внести питание — чаще всего этого хватает.",
             en: "Check SO₂ (bound SO₂ also interferes), temperature and nutrition. Residual lysozyme blocks bacteria completely. Warm to 20 °C and feed — that usually does it.",
             ro: "Verificați SO₂ (și cel legat), temperatura și hrana. Lizozimul rezidual blochează complet bacteriile. Încălziți la 20 °C și hrăniți." },
      products: ["V MALO ACTIV", "V MALO CLEAR"] },

    { when: { ru: "Нужно ОСТАНОВИТЬ или не допустить ЯМБ",
              en: "MLF must be STOPPED or prevented",
              ro: "FML trebuie OPRITĂ sau prevenită" },
      lvl: "warn",
      act: { ru: "Для свежих ароматных белых ЯМБ вредна. Лизоцим + SO₂ + холод + стерильная фильтрация. Одного SO₂ мало при высоком pH.",
             en: "In fresh aromatic whites MLF is undesirable. Lysozyme + SO₂ + cold + sterile filtration. SO₂ alone is not enough at high pH.",
             ro: "La albele aromate proaspete FML e nedorită. Lizozim + SO₂ + frig + filtrare sterilă. Doar SO₂ nu ajunge la pH mare." },
      products: ["BACTOZYM® SG", "SORBATO DI POTASSIO"] },

    { when: { ru: "Сорбат при живых бактериях",
              en: "Sorbate with live bacteria",
              ro: "Sorbat cu bacterii vii" },
      lvl: "bad",
      act: { ru: "ОПАСНО: молочные бактерии превращают сорбиновую кислоту в гераниол — тон герани, вино испорчено необратимо. Сорбат вносить ТОЛЬКО в вино без живых ЯМБ-бактерий и вместе с SO₂.",
             en: "DANGER: lactic bacteria convert sorbic acid into geraniol — a geranium taint, irreversibly ruining the wine. Add sorbate ONLY to wine free of live LAB, and always with SO₂.",
             ro: "PERICOL: bacteriile lactice transformă acidul sorbic în geraniol — tentă de mușcată, vin distrus iremediabil. Sorbat DOAR în vin fără bacterii lactice vii, mereu cu SO₂." },
      products: ["BACTOZYM® SG"] }
  ],
  prevent: {
    ru: ["Решить заранее: ЯМБ нужна или нет — и вести вино под это решение",
         "Засев культурой вместо спонтанной ЯМБ",
         "После ЯМБ сразу поднять SO₂ — вино беззащитно",
         "Сорбат — никогда при живых бактериях"],
    en: ["Decide in advance whether you want MLF — then steer the wine accordingly",
         "Inoculate rather than rely on spontaneous MLF",
         "Right after MLF, raise SO₂ — the wine is defenceless",
         "Never use sorbate with live bacteria"],
    ro: ["Decideți din start dacă vreți FML",
         "Însămânțare în loc de FML spontană",
         "Imediat după FML ridicați SO₂",
         "Niciodată sorbat cu bacterii vii"]
  }
},

/* ─── 9. ЦВЕТ ──────────────────────────────────────────────────── */
{
  id: "color", icon: "🍒",
  title: { ru: "Потеря цвета", en: "Colour loss", ro: "Pierderea culorii" },
  sub: {
    ru: "Красное бледнеет, оттенок уходит в кирпич",
    en: "Reds fade, hue drifts to brick",
    ro: "Roșiile pălesc, nuanța devine cărămizie"
  },
  symptoms: {
    ru: ["Цвет бледный, водянистый край",
         "Оттенок от рубина к кирпичному раньше срока",
         "Антоцианы выпадают в осадок с дрожжами",
         "После осветления цвет «съеден»"],
    en: ["Pale colour, watery rim",
         "Hue turns brick too early",
         "Anthocyanins drop out with the lees",
         "Colour 'eaten' after fining"],
    ro: ["Culoare palidă, margine apoasă",
         "Nuanță cărămizie prea devreme",
         "Antocianii precipită cu drojdia",
         "Culoare „mâncată” după cleire"]
  },
  diag: {
    ru: ["Интенсивность цвета: A420 + A520 + A620",
         "Оттенок: A420 / A520 — рост = старение/окисление",
         "Антоцианы (мг/л) и индекс полимеризации"],
    en: ["Colour intensity: A420 + A520 + A620",
         "Hue: A420 / A520 — rising = ageing/oxidation",
         "Anthocyanins (mg/L) and polymerisation index"],
    ro: ["Intensitate: A420 + A520 + A620",
         "Nuanță: A420 / A520 — creștere = îmbătrânire/oxidare",
         "Antociani (mg/L) și indice de polimerizare"]
  },
  branches: [
    { when: { ru: "Слабая экстракция на мацерации",
              en: "Weak extraction during maceration",
              ro: "Extracție slabă la macerare" },
      lvl: "warn",
      act: { ru: "Действовать надо СЕЙЧАС — потом цвет не добавить. Ферменты вскрывают клетки кожицы, танины связывают антоцианы в стабильные комплексы.",
             en: "Act NOW — colour cannot be added later. Enzymes open the skin cells; tannins bind anthocyanins into stable complexes.",
             ro: "Acționați ACUM — culoarea nu se adaugă mai târziu. Enzimele deschid celulele pieliței; taninurile leagă antocianii." },
      products: ["ZIMARED® PLUS", "EXTRARED L", "COLORSTAB® SG", "PREMIUM® COLOR SG"] },

    { when: { ru: "Цвет есть, но нестабилен (выпадает)",
              en: "Colour present but unstable (dropping out)",
              ro: "Culoare prezentă, dar instabilă" },
      lvl: "warn",
      act: { ru: "Свободные антоцианы нужно «пришить» к танинам. Эллаговые и катехиновые танины + микрооксигенация малыми дозами полимеризуют цвет.",
             en: "Free anthocyanins must be bound to tannins. Ellagic and catechin tannins plus low-dose micro-oxygenation polymerise the colour.",
             ro: "Antocianii liberi trebuie legați de taninuri. Taninuri elagice și catehinice + microoxigenare polimerizează culoarea." },
      products: ["X-TAN® DEEP", "COLORSTAB® SG", "TI PREMIUM® SG", "X-TAN® FULL"] },

    { when: { ru: "Цвет потерян после осветления",
              en: "Colour lost after fining",
              p: "", ro: "Culoare pierdută după cleire" },
      lvl: "bad",
      act: { ru: "Передозировка желатина или бентонита забирает антоцианы. Вернуть цвет нельзя — только компенсировать танинами и купажом. На будущее: доза только по пробной обработке.",
             en: "An overdose of gelatin or bentonite strips anthocyanins. Colour cannot be restored — only compensated with tannins and blending. In future: dose only by bench trial.",
             ro: "Supradoza de gelatină sau bentonită ia antocianii. Culoarea nu se recuperează — doar compensată cu taninuri și cupaj." },
      products: ["COLORSTAB® SG", "PREMIUM® COLOR SG"] },

    { when: { ru: "Окисление цвета (кирпичный оттенок)",
              en: "Colour oxidation (brick hue)",
              ro: "Oxidarea culorii (nuanță cărămizie)" },
      lvl: "bad",
      act: { ru: "Разбираться с кислородом, а не с цветом: см. раздел «Окисление». Танины работают как антиоксидантный щит и защищают антоцианы.",
             en: "Fix the oxygen, not the colour: see the 'Oxidation' section. Tannins act as an antioxidant shield protecting the anthocyanins.",
             ro: "Rezolvați oxigenul, nu culoarea: vezi „Oxidare”. Taninurile protejează antocianii ca un scut antioxidant." },
      products: ["X-TAN® DEEP", "SAFE TAN® SG", "V ANTIOX®"] }
  ],
  equip: ["app_microdue", "app_macrodue"],
  prevent: {
    ru: ["Цвет создаётся на мацерации — потом только теряется",
         "Танины с первых дней: они защищают и стабилизируют",
         "Микрооксигенация малыми дозами вместо резких переливок",
         "Осветлители — по титрованию, а не «как обычно»"],
    en: ["Colour is built during maceration — afterwards it can only be lost",
         "Tannins from day one: they protect and stabilise",
         "Micro-oxygenation in small doses instead of harsh rackings",
         "Fining agents by titration, not 'as usual'"],
    ro: ["Culoarea se face la macerare — apoi doar se pierde",
         "Taninuri din prima zi: protejează și stabilizează",
         "Microoxigenare în doze mici",
         "Agenți de cleire prin titrare, nu „ca de obicei”"]
  }
},

/* ─── 10. ГОРЕЧЬ И АСТРИНГЕНТНОСТЬ ─────────────────────────────── */
{
  id: "bitter", icon: "😖",
  title: { ru: "Горечь и грубость", en: "Bitterness and harshness", ro: "Amăreală și duritate" },
  sub: {
    ru: "Сухой, царапающий финал, зелёные танины",
    en: "Dry, scratchy finish, green tannins",
    ro: "Final uscat, zgâriat, taninuri verzi"
  },
  symptoms: {
    ru: ["Горечь в послевкусии (белые — часто от окисления)",
         "Танины сушат язык и царапают дёсны",
         "Финал короткий и жёсткий, вино «не пьётся»",
         "Часто от пережатия прессом или дроблёных косточек"],
    en: ["Bitter aftertaste (in whites often from oxidation)",
         "Tannins dry the tongue and scratch the gums",
         "Short, hard finish, the wine 'doesn't drink'",
         "Often from over-pressing or crushed seeds"],
    ro: ["Amăreală în final (la albe, deseori din oxidare)",
         "Taninuri care usucă limba",
         "Final scurt și dur",
         "Deseori din presare excesivă sau semințe zdrobite"]
  },
  diag: {
    ru: ["Дегустация — основной инструмент",
         "Общие полифенолы, индекс желатина (для красных)",
         "Для белых: A420 — горечь часто идёт с окислением"],
    en: ["Tasting is the main tool",
         "Total polyphenols, gelatin index (reds)",
         "For whites: A420 — bitterness often comes with oxidation"],
    ro: ["Degustarea e instrumentul principal",
         "Polifenoli totali, indice de gelatină (roșii)",
         "La albe: A420 — amăreala vine deseori cu oxidarea"]
  },
  branches: [
    { when: { ru: "Горечь в БЕЛОМ вине", en: "Bitterness in WHITE wine", ro: "Amăreală în vin ALB" },
      lvl: "warn",
      act: { ru: "Чаще всего это окисленные фенолы. PVPP снимает их избирательно, почти не трогая аромат. Доза по пробной обработке: передоз обедняет вино.",
             en: "Usually these are oxidised phenols. PVPP removes them selectively, with little aroma loss. Dose by bench trial: overdosing thins the wine.",
             ro: "De obicei sunt fenoli oxidați. PVPP îi elimină selectiv. Doza prin test: supradoza sărăcește vinul." },
      products: ["PVPP", "SMARTVIN® PVPP", "MOLECULAR P", "FITOPROTEINA P"] },

    { when: { ru: "Жёсткие танины в КРАСНОМ",
              en: "Harsh tannins in RED",
              ro: "Taninuri dure în ROȘU" },
      lvl: "warn",
      act: { ru: "Белковые осветлители связывают агрессивные танины. Желатин работает сильно — легко переосветлить и убить тело. Альбумин мягче, растительные белки — самые деликатные и веганские.",
             en: "Protein fining agents bind aggressive tannins. Gelatin is powerful — it is easy to over-fine and strip the body. Albumin is gentler; plant proteins are the most delicate and vegan.",
             ro: "Agenții proteici leagă taninurile agresive. Gelatina e puternică — ușor de exagerat. Albumina e mai blândă; proteinele vegetale, cele mai delicate." },
      products: ["GELAXINA® ATO", "PREMIUM® GEL GRADO 2", "ALBUCLAR® SPECIAL GRAIN", "MOLECULAR P"] },

    { when: { ru: "Нужно смягчить без потери тела",
              en: "Soften without losing body",
              ro: "Înmuiere fără pierderea corpului" },
      lvl: "ok",
      act: { ru: "Маннопротеины дают объём и обволакивают танины, ничего не забирая. Работают и на стабильность. Дуб (чипсы) добавляет сладость и округлость.",
             en: "Mannoproteins add volume and coat the tannins without stripping anything. They also aid stability. Oak chips add sweetness and roundness.",
             ro: "Manoproteinele dau volum și îmbracă taninurile. Ajută și la stabilitate. Stejarul adaugă dulceață și rotunjime." },
      products: ["X-PRO® BATONNAGE", "X-PRO® FINESSE", "FRAMMENTO® SOFT", "X-PRO® VERVE"] },

    { when: { ru: "Горечь от косточек и гребней",
              en: "Bitterness from seeds and stems",
              ro: "Amăreală din semințe și ciorchini" },
      lvl: "bad",
      act: { ru: "Причина в прессовании — исправлять поздно, но смягчить можно. Полировка альбумином или растительным белком + маннопротеины. На будущее: мягче пресс, отсекать жёсткие фракции.",
             en: "The cause is pressing — too late to fix, but it can be softened. Polish with albumin or plant protein plus mannoproteins. Next time: press gently and cut off the hard fractions.",
             ro: "Cauza e presarea — prea târziu de corectat, dar se poate înmuia. Albumină sau proteină vegetală + manoproteine." },
      products: ["ALBUCLAR® SPECIAL GRAIN", "FITOPROTEINA XP", "X-PRO® BATONNAGE"] }
  ],
  prevent: {
    ru: ["Не пережимать пресс — последние фракции всегда горькие",
         "Пробная обработка перед любым осветлением",
         "Дегустировать после каждой дозы, а не после всей",
         "Танины на брожении дают мягкость, а не грубость"],
    en: ["Do not over-press — the last fractions are always bitter",
         "Bench-trial before any fining",
         "Taste after each incremental dose, not at the end",
         "Tannins during fermentation give softness, not harshness"],
    ro: ["Nu presați excesiv — ultimele fracțiuni sunt amare",
         "Test înainte de orice cleire",
         "Degustați după fiecare doză",
         "Taninurile la fermentație dau finețe, nu duritate"]
  }
},

/* ─── 11. МУТЬ И ФИЛЬТРУЕМОСТЬ ─────────────────────────────────── */
{
  id: "haze", icon: "🌁",
  title: { ru: "Муть и фильтруемость", en: "Haze and filterability", ro: "Tulbureală și filtrabilitate" },
  sub: {
    ru: "Вино не осветляется, фильтр забивается за минуты",
    en: "Wine won't clear, the filter blinds within minutes",
    ro: "Vinul nu se limpezește, filtrul se colmatează rapid"
  },
  symptoms: {
    ru: ["Стойкая муть, не оседает неделями",
         "Фильтр забивается мгновенно, давление растёт",
         "После фильтрации муть возвращается",
         "Часто на урожае с ботритисом"],
    en: ["Persistent haze that won't settle for weeks",
         "The filter blinds instantly, pressure climbs",
         "Haze returns after filtration",
         "Common with botrytised fruit"],
    ro: ["Tulbureală persistentă, nu se depune",
         "Filtrul se colmatează instant, presiunea crește",
         "Tulbureala revine după filtrare",
         "Frecvent la struguri cu botrytis"]
  },
  diag: {
    ru: ["Индекс фильтруемости (Q.F.T.®) — измерить ДО выбора фильтра",
         "Мутность NTU: перед розливом < 1",
         "Тест на пектин: спирт → сгустки = пектины остались",
         "Тест на глюканы: спирт → слизистые нити = ботритис"],
    en: ["Filterability index (Q.F.T.®) — measure BEFORE choosing the filter",
         "Turbidity NTU: below 1 before bottling",
         "Pectin test: alcohol → clots = pectins remain",
         "Glucan test: alcohol → slimy threads = botrytis"],
    ro: ["Indice de filtrabilitate (Q.F.T.®) — măsurat ÎNAINTE de a alege filtrul",
         "Turbiditate NTU: sub 1 înainte de îmbuteliere",
         "Test pectine: alcool → cheaguri = pectine rămase",
         "Test glucani: alcool → filamente = botrytis"]
  },
  branches: [
    { when: { ru: "Тест на пектин положительный",
              en: "Pectin test positive",
              ro: "Test pectine pozitiv" },
      lvl: "warn",
      act: { ru: "Пектины держат муть во взвеси. Пектолитический фермент решает проблему за ночь. Работает при T > 12 °C и низком SO₂.",
             en: "Pectins keep the haze in suspension. A pectolytic enzyme fixes it overnight. Works at T > 12 °C and low SO₂.",
             ro: "Pectinele mențin tulbureala. Enzima pectolitică rezolvă peste noapte. Funcționează la T > 12 °C și SO₂ mic." },
      products: ["ZIMACLAR®", "ZIMACLAR® PLUS", "ZIMAFLOW"] },

    { when: { ru: "Глюканы (виноград с ботритисом)",
              en: "Glucans (botrytised fruit)",
              ro: "Glucani (struguri cu botrytis)" },
      lvl: "bad",
      act: { ru: "Главный убийца фильтров. Нужна бета-глюканаза, и ей нужно ВРЕМЯ: 7–10 дней при 15–18 °C. Фильтровать раньше — выбросить картриджи.",
             en: "The number-one filter killer. A beta-glucanase is required and it needs TIME: 7–10 days at 15–18 °C. Filtering sooner means binning the cartridges.",
             ro: "Ucigașul filtrelor. E nevoie de beta-glucanază și de TIMP: 7–10 zile la 15–18 °C." },
      products: ["MANNOZYM®", "ZIMAFLOW"] },

    { when: { ru: "Муть без пектинов и глюканов",
              en: "Haze without pectins or glucans",
              ro: "Tulbureală fără pectine sau glucani" },
      lvl: "warn",
      act: { ru: "Коллоидная муть — нужна флокуляция. Классика: кремнезём + желатин (сначала кремнезём, через час желатин). Работает быстро и не съедает тело.",
             en: "Colloidal haze — flocculation is needed. The classic: silica sol then gelatin (silica first, gelatin an hour later). Fast, and it does not strip the body.",
             ro: "Tulbureală coloidală — e nevoie de floculare. Clasic: silice + gelatină (întâi silicea)." },
      products: ["30 SIL", "40 SIL", "GELAXINA® ATO", "CLARITO® SUPERFLOW"] },

    { when: { ru: "Нужно выбрать фильтр под вино",
              en: "Choosing the right filter for the wine",
              ro: "Alegerea filtrului potrivit" },
      lvl: "ok",
      act: { ru: "Не подбирайте фильтр наугад. Q.F.T.® измеряет индекс фильтруемости и говорит, выдержит ли вино мембрану или сначала нужен предфильтр.",
             en: "Do not pick a filter by guesswork. Q.F.T.® measures the filterability index and tells you whether the wine will pass a membrane or needs a pre-filter first.",
             ro: "Nu alegeți filtrul la întâmplare. Q.F.T.® măsoară indicele de filtrabilitate." },
      products: ["V CELL® PLUS 3", "V MINERAL® 3"] }
  ],
  equip: ["app_mastermind_qft", "app_qft", "app_mftc", "app_mmf_hybrid", "app_sofos"],
  prevent: {
    ru: ["Ферменты на сусле — там они работают лучше и дешевле",
         "Ботритис: глюканаза сразу, не перед самым розливом",
         "Q.F.T.® перед каждой фильтрацией — экономит картриджи",
         "Осветлять поэтапно: грубо → тонко → мембрана"],
    en: ["Enzymes on the must — they work better and cheaper there",
         "Botrytis: glucanase early, not right before bottling",
         "Q.F.T.® before every filtration — it saves cartridges",
         "Clarify in stages: coarse → fine → membrane"],
    ro: ["Enzime pe must — acolo lucrează mai bine",
         "Botrytis: glucanază devreme, nu chiar înainte de îmbuteliere",
         "Q.F.T.® înainte de fiecare filtrare",
         "Limpezire în etape: grosier → fin → membrană"]
  }
},

/* ─── 12. МЕТАЛЛЫ ──────────────────────────────────────────────── */
{
  id: "metal", icon: "🔩",
  title: { ru: "Медь и железо", en: "Copper and iron", ro: "Cupru și fier" },
  sub: {
    ru: "Касс в бутылке через недели после розлива",
    en: "Casse in bottle, weeks after filling",
    ro: "Casă în sticlă, la săptămâni după îmbuteliere"
  },
  symptoms: {
    ru: ["Медный касс: красновато-бурый осадок, в бутылке без кислорода",
         "Железный касс: сизая муть (красные) или белёсая (белые) после контакта с воздухом",
         "Вино в танке чистое, а в бутылке через месяц — муть"],
    en: ["Copper casse: reddish-brown deposit, in bottle without oxygen",
         "Iron casse: bluish haze (reds) or whitish (whites) after air contact",
         "Clear in tank, hazy in bottle a month later"],
    ro: ["Casă cuprică: depozit roșu-brun, în sticlă fără oxigen",
         "Casă ferică: tulbureală albăstruie (roșii) sau albicioasă (albe)",
         "Limpede în cisternă, tulbure în sticlă după o lună"]
  },
  diag: {
    ru: ["Медь Cu (мг/л): выше 0,5 — риск, законный предел 1 мг/л",
         "Железо Fe (мг/л): выше 7–10 — риск железного касса",
         "Источники: медные обработки в винограднике, латунь, старое железо"],
    en: ["Copper Cu (mg/L): above 0.5 is risky, the legal limit is 1 mg/L",
         "Iron Fe (mg/L): above 7–10 risks iron casse",
         "Sources: copper sprays in the vineyard, brass fittings, old ironwork"],
    ro: ["Cupru Cu (mg/L): peste 0,5 e risc, limita legală 1 mg/L",
         "Fier Fe (mg/L): peste 7–10 risc de casă ferică",
         "Surse: tratamente cu cupru în vie, alamă, fier vechi"]
  },
  branches: [
    { when: { ru: "Cu > 0,5 мг/л", en: "Cu > 0.5 mg/L", ro: "Cu > 0,5 mg/L" },
      lvl: "bad",
      act: { ru: "Хитозан связывает медь — это его признанное применение. Обработка до розлива обязательна: в бутылке медный касс уже не исправить.",
             en: "Chitosan binds copper — this is its recognised use. Treat before bottling: copper casse cannot be fixed in the bottle.",
             ro: "Chitozanul leagă cuprul — utilizare recunoscută. Tratați înainte de îmbuteliere." },
      products: ["KITOSMART", "CLARITO® FITO K"] },

    { when: { ru: "Fe > 7 мг/л", en: "Fe > 7 mg/L", ro: "Fe > 7 mg/L" },
      lvl: "warn",
      act: { ru: "Лимонная кислота связывает железо в комплекс (предел ЕС — 1 г/л, и только в готовом вине). Полное удаление железа требует голубой оклейки — в каталоге Vason её нет, покупается отдельно и делается только под контролем лаборатории.",
             en: "Citric acid complexes iron (EU limit 1 g/L, and only in finished wine). Full iron removal requires blue fining, which is not in the Vason catalogue — sourced separately and done only under laboratory supervision.",
             ro: "Acidul citric complexează fierul (limita UE 1 g/L). Eliminarea completă necesită cleire albastră — nu e în catalogul Vason." },
      products: ["ACIDO CITRICO"] },

    { when: { ru: "Профилактика на винограднике",
              en: "Prevention in the vineyard",
              ro: "Prevenție în vie" },
      lvl: "ok",
      act: { ru: "Медь попадает в сусло с обработок от милдью. Мойка винограда снимает значительную часть меди и остатков пестицидов до дробления.",
             en: "Copper enters the must from downy-mildew sprays. Washing the grapes removes a substantial share of copper and pesticide residues before crushing.",
             ro: "Cuprul ajunge în must din tratamentele contra manei. Spălarea strugurilor elimină o parte importantă." },
      products: [] }
  ],
  equip: ["app_grape_washer"],
  prevent: {
    ru: ["Анализ Cu и Fe перед розливом — дёшево против возвратов",
         "Убрать латунь и незащищённое железо из контура",
         "Мойка винограда при интенсивных медных обработках",
         "Хитозан — до фильтрации, не после"],
    en: ["Analyse Cu and Fe before bottling — cheap insurance against returns",
         "Remove brass and bare iron from the circuit",
         "Wash the grapes when copper spraying was heavy",
         "Chitosan — before filtration, not after"],
    ro: ["Analiză Cu și Fe înainte de îmbuteliere",
         "Eliminați alama și fierul neprotejat",
         "Spălarea strugurilor la tratamente intense cu cupru",
         "Chitozan — înainte de filtrare"]
  }
},

/* ─── 13. ПЛЁНКА И ЦВЕЛЬ ───────────────────────────────────────── */
{
  id: "film", icon: "⚪",
  title: { ru: "Плёнка на поверхности", en: "Surface film", ro: "Peliculă la suprafață" },
  sub: {
    ru: "Цвель в неполной ёмкости — предвестник уксуса",
    en: "Flor in a part-empty tank — the herald of vinegar",
    ro: "Floare în cisternă parțial plină — vestitorul oțetului"
  },
  symptoms: {
    ru: ["Белёсая или сероватая плёнка на поверхности вина",
         "Плёнка морщинистая, при встряхивании тонет хлопьями",
         "Вино теряет тело, появляется уксусный тон",
         "Только в НЕПОЛНЫХ ёмкостях — плёнке нужен воздух"],
    en: ["Whitish or greyish film on the wine surface",
         "Wrinkled film that sinks in flakes when shaken",
         "Wine loses body, a vinegar tone appears",
         "Only in PART-EMPTY tanks — the film needs air"],
    ro: ["Peliculă albicioasă sau cenușie la suprafață",
         "Peliculă zbârcită, se scufundă în fulgi la agitare",
         "Vinul pierde corp, apare tonul de oțet",
         "Doar în cisterne PARȚIAL PLINE — pelicula are nevoie de aer"]
  },
  diag: {
    ru: ["Визуальный осмотр поверхности — раз в неделю",
         "Летучая кислотность (плёнка почти всегда идёт с ней)",
         "Свободный SO₂ и уровень заполнения ёмкости"],
    en: ["Visual check of the surface — weekly",
         "Volatile acidity (film almost always comes with it)",
         "Free SO₂ and tank fill level"],
    ro: ["Inspecție vizuală săptămânală",
         "Aciditate volatilă",
         "SO₂ liber și nivelul de umplere"]
  },
  branches: [
    { when: { ru: "Плёнка только появилась",
              en: "Film has just appeared",
              ro: "Pelicula tocmai a apărut" },
      lvl: "warn",
      act: { ru: "Действовать в тот же день. Снять плёнку, долить ёмкость доверху или укрыть инертным газом, поднять свободный SO₂ по pH. Проверить летучую кислотность — плёнка редко приходит одна.",
             en: "Act the same day. Skim the film, top the tank right up or blanket with inert gas, raise free SO₂ per pH. Check volatile acidity — the film rarely comes alone.",
             ro: "Acționați în aceeași zi. Îndepărtați pelicula, umpleți cisterna sau protejați cu gaz inert, ridicați SO₂ liber." },
      products: ["FLOR STOP VASCHE", "FLOR STOP DAMIGIANE", "METABISOLFITO DI K (порошок)"] },

    { when: { ru: "Плёнка держится, вино в бутылях/демижонах",
              en: "Film persists, wine in demijohns",
              ro: "Pelicula persistă, vin în damigene" },
      lvl: "warn",
      act: { ru: "Специальные препараты против цвели для бутылей. Долить нельзя — значит нужен барьер на поверхности.",
             en: "Dedicated anti-flor products for demijohns. If you cannot top up, you need a surface barrier.",
             ro: "Produse dedicate contra florii pentru damigene. Dacă nu puteți umple, aveți nevoie de o barieră." },
      products: ["FLOR STOP DAMIGIANE", "DISCHI ZOLFO"] },

    { when: { ru: "Плёнка вернулась после обработки",
              en: "Film returned after treatment",
              ro: "Pelicula a revenit după tratament" },
      lvl: "bad",
      act: { ru: "Проблема не в вине, а в ёмкости и режиме хранения. Полная санитария танка, замена уплотнений, стерильная фильтрация вина, хранение только в полной ёмкости.",
             en: "The problem is the tank and the storage regime, not the wine. Full tank sanitation, new seals, sterile-filter the wine, store only in a full tank.",
             ro: "Problema e cisterna și regimul de stocare. Igienizare completă, garnituri noi, filtrare sterilă." },
      products: ["BIOCIDA V", "BLASTOKILL", "V SANEX"] }
  ],
  equip: ["app_gas_mixer", "app_linea_detersione", "app_microfiltrazione"],
  prevent: {
    ru: ["Полная ёмкость — единственная настоящая профилактика",
         "Еженедельный осмотр поверхности каждого танка",
         "Свободный SO₂ по pH, а не «примерно 30»",
         "Инертный газ на свободный объём после каждой отборки"],
    en: ["A full tank is the only real prevention",
         "Weekly surface check of every tank",
         "Free SO₂ set by pH, not 'about 30'",
         "Inert gas over the headspace after every draw-off"],
    ro: ["Cisterna plină e singura prevenție reală",
         "Inspecție săptămânală a suprafeței",
         "SO₂ liber după pH",
         "Gaz inert peste spațiul liber după fiecare tragere"]
  }
},

/* ─── 14. УПРАВЛЕНИЕ SO₂ ───────────────────────────────────────── */
{
  id: "so2", icon: "🛡️",
  title: { ru: "Управление SO₂", en: "SO₂ management", ro: "Gestionarea SO₂" },
  sub: {
    ru: "Главный щит вина — и главный источник ошибок",
    en: "The wine's main shield — and the main source of mistakes",
    ro: "Scutul principal al vinului — și sursa principală de erori"
  },
  symptoms: {
    ru: ["Мало SO₂ → окисление, Brett, уксус, цвель",
         "Много SO₂ → жжёная спичка, аромат «задушен»",
         "Одна и та же доза при разном pH работает по-разному",
         "SO₂ падает быстро: связывается сахарами и ацетальдегидом"],
    en: ["Too little SO₂ → oxidation, Brett, vinegar, flor",
         "Too much SO₂ → burnt match, aroma smothered",
         "The same dose behaves differently at different pH",
         "SO₂ drops fast: it binds to sugars and acetaldehyde"],
    ro: ["Prea puțin SO₂ → oxidare, Brett, oțet, floare",
         "Prea mult SO₂ → chibrit ars, aromă sufocată",
         "Aceeași doză se comportă diferit la pH diferit",
         "SO₂ scade rapid: se leagă de zaharuri și acetaldehidă"]
  },
  diag: {
    ru: ["Свободный SO₂ (мг/л) — то, что работает",
         "Общий SO₂ (мг/л) — законный лимит",
         "pH — определяет, сколько свободного нужно",
         "Молекулярный SO₂ = свободный / (1 + 10^(pH − 1,81))"],
    en: ["Free SO₂ (mg/L) — the fraction that works",
         "Total SO₂ (mg/L) — the legal limit",
         "pH — decides how much free SO₂ you need",
         "Molecular SO₂ = free / (1 + 10^(pH − 1.81))"],
    ro: ["SO₂ liber (mg/L) — fracția care lucrează",
         "SO₂ total (mg/L) — limita legală",
         "pH — decide cât SO₂ liber e necesar",
         "SO₂ molecular = liber / (1 + 10^(pH − 1,81))"]
  },
  branches: [
    { when: { ru: "Цель: 0,5 мг/л молекулярного (сухие вина)",
              en: "Target: 0.5 mg/L molecular (dry wines)",
              ro: "Țintă: 0,5 mg/L molecular (vinuri seci)" },
      lvl: "ok",
      act: { ru: "Рабочая защита для сухих вин на хранении. Смотрите таблицу ниже: при pH 3,2 хватит 13 мг/л свободного, при pH 3,6 нужен уже 31.",
             en: "Working protection for dry wines in storage. See the table below: at pH 3.2 13 mg/L free is enough; at pH 3.6 you already need 31.",
             ro: "Protecție de lucru pentru vinuri seci. Vezi tabelul: la pH 3,2 ajung 13 mg/L liber; la pH 3,6 sunt necesari 31." },
      products: ["METABISOLFITO DI K (порошок)", "SOLFITAN® 63", "SOLFO K L"] },

    { when: { ru: "Цель: 0,6 мг/л молекулярного (риск Brett)",
              en: "Target: 0.6 mg/L molecular (Brett risk)",
              ro: "Țintă: 0,6 mg/L molecular (risc Brett)" },
      lvl: "warn",
      act: { ru: "Красные с высоким pH и выдержкой в дубе. При pH 3,8 потребуется 59 мг/л свободного — проверьте, не упрётесь ли в законный предел по общему SO₂.",
             en: "Reds with high pH and barrel ageing. At pH 3.8 you will need 59 mg/L free — check you are not hitting the legal total-SO₂ ceiling.",
             ro: "Roșii cu pH mare și maturare în baric. La pH 3,8 sunt necesari 59 mg/L liber — verificați limita legală." },
      products: ["METABISOLFITO DI K (порошок)", "SOLFITAN® 63"] },

    { when: { ru: "Хочу снизить дозы SO₂",
              en: "I want to reduce SO₂ doses",
              ro: "Vreau să reduc dozele de SO₂" },
      lvl: "ok",
      act: { ru: "SO₂ заменить полностью нельзя, но нагрузку снижают: хитозан (микробиология), танины и глутатион (антиоксидантная защита), инертизация (кислород). Правильный pH экономит SO₂ лучше любой добавки.",
             en: "SO₂ cannot be fully replaced, but the load can be cut: chitosan (microbiology), tannins and glutathione (antioxidant defence), inerting (oxygen). Getting the pH right saves more SO₂ than any additive.",
             ro: "SO₂ nu poate fi înlocuit complet, dar sarcina poate fi redusă: chitozan, taninuri și glutation, inertizare. Un pH corect economisește mai mult SO₂ decât orice aditiv." },
      products: ["KITOSMART", "X-PRO® PROTECTION", "SAFE TAN® SG", "V ANTIOX®"] },

    { when: { ru: "SO₂ падает слишком быстро",
              en: "SO₂ drops too fast",
              ro: "SO₂ scade prea repede" },
      lvl: "warn",
      act: { ru: "Значит, есть что связывать: остаточный сахар, ацетальдегид (следствие окисления), ботритис. Лечить причину, а не подсыпать SO₂ снова и снова — иначе упрётесь в лимит по общему.",
             en: "Something is binding it: residual sugar, acetaldehyde (a product of oxidation), botrytis. Treat the cause instead of topping up SO₂ again and again — otherwise you will hit the total-SO₂ limit.",
             ro: "Ceva îl leagă: zahăr rezidual, acetaldehidă, botrytis. Tratați cauza, nu adăugați SO₂ la nesfârșit." },
      products: ["V ANTIOX®", "X-PRO® PROTECTION"] }
  ],
  so2table: true,
  prevent: {
    ru: ["Дозу считать от pH, а не от привычки",
         "Проверять свободный SO₂ каждые 2–4 недели",
         "Мерить перед розливом обязательно",
         "Общий SO₂ держать в запасе под законный лимит"],
    en: ["Calculate the dose from pH, not from habit",
         "Check free SO₂ every 2–4 weeks",
         "Always measure before bottling",
         "Keep total SO₂ headroom under the legal ceiling"],
    ro: ["Calculați doza după pH, nu din obișnuință",
         "Verificați SO₂ liber la 2–4 săptămâni",
         "Măsurați obligatoriu înainte de îmbuteliere",
         "Păstrați rezervă sub limita legală de SO₂ total"]
  }
},

/* ─── 15. СЛАБЫЙ АРОМАТ ────────────────────────────────────────── */
{
  id: "aroma", icon: "🌸",
  title: { ru: "Слабый аромат", en: "Weak aroma", ro: "Aromă slabă" },
  sub: {
    ru: "Вино немое: сорт не читается, нос пустой",
    en: "A mute wine: no varietal character, empty nose",
    ro: "Vin mut: fără caracter varietal, nas gol"
  },
  symptoms: {
    ru: ["Сортовой характер не читается",
         "Нос пустой, вино «немое»",
         "Аромат был и пропал за месяцы",
         "Тиоловые сорта (Совиньон) особенно уязвимы"],
    en: ["No varietal character",
         "Empty nose, the wine is 'mute'",
         "Aroma was there and faded within months",
         "Thiol varieties (Sauvignon) are especially vulnerable"],
    ro: ["Caracter varietal absent",
         "Nas gol, vin „mut”",
         "Aroma a existat și a dispărut în câteva luni",
         "Soiurile tiolice (Sauvignon) sunt vulnerabile"]
  },
  diag: {
    ru: ["Когда пропал аромат: не родился или потерялся?",
         "Растворённый O₂ — тиолы гибнут от кислорода",
         "Доза бентонита — не переосветлили ли",
         "Свободный SO₂ — защищает ароматы"],
    en: ["When did the aroma go: never formed, or lost?",
         "Dissolved O₂ — thiols die from oxygen",
         "Bentonite dose — was the wine over-fined?",
         "Free SO₂ — it protects the aromas"],
    ro: ["Când a dispărut aroma: nu s-a format sau s-a pierdut?",
         "O₂ dizolvat — tiolii mor din cauza oxigenului",
         "Doza de bentonită — s-a exagerat cleirea?",
         "SO₂ liber — protejează aromele"]
  },
  branches: [
    { when: { ru: "Аромат не родился (слабое сусло)",
              en: "Aroma never formed (weak must)",
              ro: "Aroma nu s-a format (must slab)" },
      lvl: "warn",
      act: { ru: "Предшественники аромата связаны в кожице — их надо высвободить ферментом и раскрыть правильным штаммом дрожжей. После брожения делать это уже поздно.",
             en: "Aroma precursors are bound in the skins — release them with an enzyme and reveal them with the right yeast strain. After fermentation it is too late.",
             ro: "Precursorii sunt legați în pieliță — eliberați-i cu enzimă și dezvăluiți-i cu tulpina potrivită. După fermentație e prea târziu." },
      products: ["ZIMAROM®", "ZIMASKIN®", "ZIMAFRUIT®", "LIEVITO PREMIUM 3MH", "VIW® SUPERTHIOL"] },

    { when: { ru: "Аромат был и потерялся",
              en: "Aroma was there and got lost",
              ro: "Aroma a existat și s-a pierdut" },
      lvl: "bad",
      act: { ru: "Виноват кислород — тиолы окисляются первыми. Разбирайтесь с O₂ и SO₂ (см. «Окисление»), защищайте вино глутатионом. Вернуть потерянные тиолы невозможно.",
             en: "Oxygen is to blame — thiols oxidise first. Deal with O₂ and SO₂ (see 'Oxidation') and protect the wine with glutathione. Lost thiols cannot be brought back.",
             ro: "Oxigenul e vinovat — tiolii se oxidează primii. Rezolvați O₂ și SO₂, protejați cu glutation. Tiolii pierduți nu se recuperează." },
      products: ["X-PRO® PROTECTION", "V ANTIOX®", "SAFE TAN® SG"] },

    { when: { ru: "Аромат улетает с CO₂ при брожении",
              en: "Aroma escapes with CO₂ during fermentation",
              ro: "Aroma se pierde cu CO₂ la fermentație" },
      lvl: "warn",
      act: { ru: "До 30 % летучих ароматов уносит углекислый газ. AROMALOC® улавливает их из потока CO₂ и возвращает в вино — особенно эффективно на тиоловых и терпеновых сортах.",
             en: "Up to 30 % of volatile aromas are carried away by CO₂. AROMALOC® captures them from the CO₂ stream and returns them to the wine — especially effective on thiol and terpene varieties.",
             ro: "Până la 30 % din aromele volatile sunt antrenate de CO₂. AROMALOC® le captează și le readuce în vin." },
      products: [] },

    { when: { ru: "Вино плоское, без объёма",
              en: "Wine flat, lacking volume",
              ro: "Vin plat, fără volum" },
      lvl: "ok",
      act: { ru: "Не аромат, а тело. Маннопротеины дают объём и длину без выдержки на осадке. Батонаж работает, но требует времени и риска редукции.",
             en: "This is body, not aroma. Mannoproteins add volume and length without lees ageing. Bâtonnage works but costs time and risks reduction.",
             ro: "E vorba de corp, nu de aromă. Manoproteinele dau volum și lungime fără maturare pe drojdie." },
      products: ["X-PRO® BATONNAGE", "X-PRO® FINESSE", "X-PRO® IDENTITY WHITE", "X-PRO® VERVE"] }
  ],
  equip: ["app_aromaloc", "app_easyferm"],
  prevent: {
    ru: ["Холодная мацерация и ферменты — аромат делается на сусле",
         "Штамм дрожжей под сорт, а не «универсальный»",
         "Кислород — враг тиолов: инертизация с первого дня",
         "Бентонит по титрованию: он забирает ароматы вместе с белком"],
    en: ["Cold soak and enzymes — aroma is built in the must",
         "Match the yeast strain to the variety, no 'universal' strain",
         "Oxygen is the enemy of thiols: inert from day one",
         "Bentonite by titration: it strips aroma along with protein"],
    ro: ["Macerare la rece și enzime — aroma se face în must",
         "Tulpina de drojdie potrivită soiului",
         "Oxigenul e dușmanul tiolilor: inertizare din prima zi",
         "Bentonită prin titrare: ia aroma odată cu proteina"]
  }
},
/* ─── 16. ВИНОДЕЛИЕ БЕЗ ОХЛАЖДЕНИЯ ─────────────────────────────
   Сценарий, а не дефект: хозяйство без холодильного оборудования.
   Продукты и дозы — из каталога Vason 2H2026. */
{
  id: "nocold", icon: "🌡️",
  title: { ru: "Виноделие без холода", en: "Winemaking without cooling", ro: "Vinificație fără frig" },
  sub: {
    ru: "Нет холодильного оборудования: что заменит холод на каждом этапе",
    en: "No cooling equipment: what replaces cold at each stage",
    ro: "Fără echipament de răcire: ce înlocuiește frigul la fiecare etapă"
  },
  symptoms: {
    ru: ["Сусло не отстаивается — нечем охладить на ночь",
         "Брожение уходит за 30 °C, аромат «выкипает»",
         "Вино в тёплом погребе окисляется и ловит Brett",
         "Тартраты выпадают у клиента: холодной стабилизации не было"],
    en: ["The must won't settle — nothing to chill it overnight",
         "Fermentation runs past 30 °C, aroma boils off",
         "Wine in a warm cellar oxidises and picks up Brett",
         "Tartrates drop at the customer: no cold stabilisation was done"],
    ro: ["Mustul nu se limpezește — nimic cu ce să-l răcești",
         "Fermentația depășește 30 °C, aroma se pierde",
         "Vinul în pivnița caldă se oxidează și prinde Brett",
         "Tartrații precipită la client: nu a fost stabilizare la rece"]
  },
  diag: {
    ru: ["Температура сусла и вина — измерять, а не «на ощупь»",
         "YAN сусла: в жару дрожжи требуют больше азота",
         "pH — от него зависит доза SO₂ (таблица ниже)",
         "Объём ёмкости: чем меньше, тем легче держать температуру"],
    en: ["Must and wine temperature — measure it, don't guess",
         "Must YAN: in the heat yeast needs more nitrogen",
         "pH — it sets the SO₂ dose (table below)",
         "Tank size: the smaller it is, the easier to hold temperature"],
    ro: ["Temperatura mustului și a vinului — măsurați, nu ghiciți",
         "YAN must: la căldură drojdiile cer mai mult azot",
         "pH — determină doza de SO₂ (tabel mai jos)",
         "Volumul cisternei: cu cât mai mic, cu atât mai ușor de controlat"]
  },
  branches: [
    { when: { ru: "Этап 1. Осветление сусла без холодного отстоя",
              en: "Stage 1. Clarifying the must without cold settling",
              ro: "Etapa 1. Limpezirea mustului fără decantare la rece" },
      lvl: "warn",
      act: { ru: "Флотация вместо холода: фермент разрушает пектины, флотатор поднимает муть за час. Это дешевле чиллера и решает задачу в жару. Без флотатора — фермент + бентонит и отстой при той температуре, что есть.",
             en: "Flotation instead of cold: the enzyme breaks the pectins, the flotation unit lifts the haze within an hour. Cheaper than a chiller and it works in the heat. Without a flotation unit — enzyme plus bentonite and settle at whatever temperature you have.",
             ro: "Flotație în loc de frig: enzima descompune pectinele, flotatorul ridică tulbureala într-o oră. Mai ieftin decât un chiller. Fără flotator — enzimă plus bentonită." },
      products: ["FLOTTOZIMA® P", "ZIMACLAR® FLOT", "FLOTTOBENT®", "FLOTTOPLUS® 2.0", "FLOTTOGEL®"] },

    { when: { ru: "Этап 2. Старт: защита сусла, пока нет холода",
              en: "Stage 2. Start: protecting the must without cold",
              ro: "Etapa 2. Start: protecția mustului fără frig" },
      lvl: "warn",
      act: { ru: "Биопротекция заменяет холод и часть SO₂: отобранные не-Saccharomyces заселяют сусло и не дают развиваться дикой флоре и окислению. Вносить сразу на дробилке, до засева основных дрожжей.",
             en: "Bioprotection replaces cold and part of the SO₂: selected non-Saccharomyces colonise the must and keep wild flora and oxidation at bay. Add at the crusher, before the main yeast.",
             ro: "Bioprotecția înlocuiește frigul și o parte din SO₂: non-Saccharomyces selecționate colonizează mustul. Adăugați la zdrobitor, înainte de drojdia principală." },
      products: ["VIW® SHIELD MP", "VIW® SHIELD TD", "VIW® SHIELD LT", "X-PRO® GRAPES"] },

    { when: { ru: "Этап 3. Брожение при 25–30 °C",
              en: "Stage 3. Fermenting at 25–30 °C",
              ro: "Etapa 3. Fermentație la 25–30 °C" },
      lvl: "bad",
      act: { ru: "Обычные штаммы в жару встают и дают H₂S. Нужны дрожжи с широким температурным окном: IFRUIT® WHITE работает 15–30 °C. Азота в жару нужно больше — питание в две дачи, не одной. Красные не пускать выше 30 °C, белые выше 20 °C — иначе аромат уходит безвозвратно.",
             en: "Ordinary strains stall in the heat and produce H₂S. You need yeast with a wide temperature window: IFRUIT® WHITE works at 15–30 °C. Heat means more nitrogen — feed in two additions, not one. Keep reds below 30 °C and whites below 20 °C, otherwise the aroma is gone for good.",
             ro: "Tulpinile obișnuite se blochează la căldură și produc H₂S. Aveți nevoie de drojdii cu fereastră largă: IFRUIT® WHITE lucrează la 15–30 °C. La căldură e nevoie de mai mult azot — hrănire în două reprize." },
      products: ["LIEVITO IFRUIT® WHITE", "LIEVITO IFRUIT® RED", "V ACTIV PREMIUM®", "BOOSTER ACTIV PREMIUM®"] },

    { when: { ru: "Брожение встало от перегрева",
              en: "Fermentation stuck from overheating",
              ro: "Fermentație blocată din cauza căldurii" },
      lvl: "bad",
      act: { ru: "Спасать сразу: сахар + тепло = уксусные бактерии за сутки. Рестарт спиртоустойчивым штаммом с адаптацией, детоксикация среды адсорбентом. Подробнее — раздел «Застрявшее брожение».",
             en: "Act at once: sugar plus warmth breeds acetic bacteria within a day. Restart with an alcohol-tolerant strain, acclimatised, and detoxify the medium with an adsorbent. See the 'Stuck fermentation' section.",
             ro: "Acționați imediat: zahăr plus căldură = bacterii acetice în 24 h. Restart cu tulpină alcool-tolerantă și detoxifierea mediului. Vezi „Fermentație blocată”." },
      products: ["LIEVITO CLASSIC BAYANUS", "L.P.A. — АКТИВИРОВАННАЯ ДРОЖЖЕВАЯ ПАСТА", "MICOSORB® PLUS"] },

    { when: { ru: "Этап 4. Хранение в тёплом погребе",
              en: "Stage 4. Storage in a warm cellar",
              ro: "Etapa 4. Stocare în pivniță caldă" },
      lvl: "warn",
      act: { ru: "Тепло ускоряет окисление и будит Brett. Свободный SO₂ считать по pH (таблица ниже), а не «как обычно»: при pH 3,6 нужен 31 мг/л вместо привычных 25. Антиоксидантный щит и хитозан против микробиологии обязательны.",
             en: "Warmth speeds up oxidation and wakes Brett. Set free SO₂ by pH (see table), not by habit: at pH 3.6 you need 31 mg/L instead of the usual 25. An antioxidant shield and chitosan against microbiology are essential.",
             ro: "Căldura accelerează oxidarea și trezește Brett. SO₂ liber după pH (vezi tabel): la pH 3,6 sunt necesari 31 mg/L, nu 25. Scut antioxidant și chitozan — obligatorii." },
      products: ["X-PRO® PROTECTION", "V ANTIOX®", "SAFE TAN® SG", "KITOSMART"] },

    { when: { ru: "Этап 5. Тартратная стабильность без холода",
              en: "Stage 5. Tartrate stability without cold",
              ro: "Etapa 5. Stabilitate tartrică fără frig" },
      lvl: "warn",
      act: { ru: "Единственный доступный путь без оборудования — ингибиторы кристаллизации. Гуммиарабик вносить ПОСЛЕ финальной фильтрации. CRISTALLITE® здесь НЕ поможет: это ускоритель кристаллизации, ему всё равно нужен холод. Альтернатива на объёмах — электродиализ: работает при комнатной температуре.",
             en: "Without equipment the only route is crystallisation inhibitors. Gum arabic goes in AFTER final filtration. CRISTALLITE® will NOT help here: it accelerates crystallisation and still needs cold. At volume, electrodialysis is the alternative — it runs at room temperature.",
             ro: "Fără echipament, singura cale sunt inhibitorii de cristalizare. Guma arabică se adaugă DUPĂ filtrarea finală. CRISTALLITE® NU ajută aici: are nevoie tot de frig. La volume — electrodializă, la temperatura camerei." },
      products: ["SMARTGUM®", "ICON® GUM", "ARABAN®"] }
  ],
  so2table: true,
  equip: ["app_easyfloat", "app_ed", "app_mastermind_qft"],
  prevent: {
    ru: ["Собирать ночью или ранним утром — самый дешёвый «холод»",
         "Бродить в мелких ёмкостях: они не разгоняются по температуре",
         "Флотатор окупается быстрее чиллера и решает больше задач",
         "Мокрая мешковина на танке и вентилятор дают −3…5 °C бесплатно",
         "Биопротекция вместо холода на старте — не роскошь, а замена оборудования"],
    en: ["Harvest at night or early morning — the cheapest 'cold' available",
         "Ferment in small tanks: they do not run away in temperature",
         "A flotation unit pays back faster than a chiller and solves more problems",
         "Wet hessian on the tank plus a fan gives −3…5 °C for free",
         "Bioprotection instead of cold at the start is equipment replacement, not luxury"],
    ro: ["Recoltați noaptea sau dimineața devreme — cel mai ieftin „frig”",
         "Fermentați în cisterne mici: temperatura nu scapă de sub control",
         "Flotatorul se amortizează mai repede decât un chiller",
         "Pânză udă pe cisternă plus ventilator: −3…5 °C gratuit",
         "Bioprotecția la start înlocuiește echipamentul, nu e un lux"]
  }
}

];

/* Таблица «pH → свободный SO₂» для целевого молекулярного SO₂.
   Посчитана по формуле молекулярный = свободный / (1 + 10^(pH − 1,81)). */
const SO2_TABLE = [
  { ph: "3,0", m05:  8, m06: 10, m08: 13 },
  { ph: "3,1", m05: 10, m06: 12, m08: 16 },
  { ph: "3,2", m05: 13, m06: 15, m08: 20 },
  { ph: "3,3", m05: 16, m06: 19, m08: 26 },
  { ph: "3,4", m05: 20, m06: 24, m08: 32 },
  { ph: "3,5", m05: 25, m06: 30, m08: 40 },
  { ph: "3,6", m05: 31, m06: 38, m08: 50 },
  { ph: "3,7", m05: 39, m06: 47, m08: 63 },
  { ph: "3,8", m05: 49, m06: 59, m08: 79 }
];
