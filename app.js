Object.defineProperty(window, 'isApkEnv', {
    get: function() {
        if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform) return Capacitor.isNativePlatform();
        if (window.Capacitor && window.Capacitor.isNativePlatform) return window.Capacitor.isNativePlatform();
        const ua = window.navigator.userAgent;
        const isAndroid = ua.includes('Android');
        const isCapacitor = (window.location.hostname === 'localhost' && window.location.port === '') || window.location.protocol === 'file:';
        return !!window.Capacitor || (isAndroid && isCapacitor);
    }
});

let savedExercises = JSON.parse(localStorage.getItem('gym_exercises'));
let savedGroups = JSON.parse(localStorage.getItem('gym_groups'));

const exerciseTranslations = {
  "Aperturas con cable en polea baja": {
    "es": "Aperturas con cable en polea baja",
    "en": "Low Cable Crossover / Flyes",
    "ru": "Сведение рук на нижнем блоке (кроссовер)",
    "et": "Ristivedu alaplokil",
    "uk": "Зведення рук на нижньому блоці (кросовер)"
  },
    "Prensa de piernas (pies elevados, énfasis posterior) (básico de pierna)": {
        "es": "Prensa de piernas (pies elevados, énfasis posterior) (básico de pierna)",
        "en": "Leg Press (High Feet, Posterior Focus) (Leg Basic)",
        "ru": "Жим ногами (высокая постановка, акцент на заднюю поверхность) (базовое)",
        "et": "Jalapress (kõrge asetus, tagakülje rõhk) (baasharjutus)",
        "uk": "Жим ногами (висока постановка, акцент на задню поверхню) (базова)"
    },
    "Zancada inversa dinámica con mancuernas": {
        "es": "Zancada inversa dinámica con mancuernas",
        "en": "Dynamic Dumbbell Reverse Lunge",
        "ru": "Динамические обратные выпады с гантелями",
        "et": "Dünaamiline tagurpidi väljaaste hantlitega",
        "uk": "Динамічні зворотні випади з гантелями"
    },
    "Peso muerto rumano con mancuerna (cadena posterior)": {
        "es": "Peso muerto rumano con mancuerna (cadena posterior)",
        "en": "Dumbbell Romanian Deadlift (Posterior Chain)",
        "ru": "Румынская тяга с гантелями (задняя цепь)",
        "et": "Rumeenia jõutõmme hantlitega (tagakett)",
        "uk": "Румунська тяга з гантелями (задній ланцюг)"
    },
    "Abductor sentado en máquina": {
        "es": "Abductor sentado en máquina",
        "en": "Seated Machine Hip Abduction",
        "ru": "Разведение ног сидя в тренажере",
        "et": "Jalgade eemaldamine trenažööril istudes",
        "uk": "Розведення ніг сидячи в тренажері"
    },
    "Aductor sentado en máquina": {
        "es": "Aductor sentado en máquina",
        "en": "Seated Machine Hip Adduction",
        "ru": "Сведение ног сидя в тренажере",
        "et": "Jalgade lähendamine trenažööril istudes",
        "uk": "Зведення ніг сидячи в тренажері"
    },
    "Crunch lateral de rodillas en polea alta": {
        "es": "Crunch lateral de rodillas en polea alta",
        "en": "Kneeling High Cable Side Crunch",
        "ru": "Боковые скручивания на коленях на верхнем блоке",
        "et": "Küljele kerepainutus põlvedel ülaplokil",
        "uk": "Бічні скручування на колінах на верхньому блоці"
    },
    "Swings con kettlebell": {
        "es": "Swings con kettlebell",
        "en": "Kettlebell Swings",
        "ru": "Махи с гирей",
        "et": "Sangpommi kiigutamine",
        "uk": "Махи з гирею"
    },
    "Press banca en multipower (básico de pectoral)": {
        "es": "Press banca en multipower (básico de pectoral)",
        "en": "Smith Machine Bench Press (Chest Basic)",
        "ru": "Жим лежа в тренажере Смита (базовое на грудь)",
        "et": "Lamades surumine Smithi masinal (rinna baasharjutus)",
        "uk": "Жим лежачи в тренажері Сміта (базова на груди)"
    },
    "Aperturas en banco inclinado con mancuernas (pectoral superior)": {
        "es": "Aperturas en banco inclinado con mancuernas (pectoral superior)",
        "en": "Incline Dumbbell Flyes (Upper Chest)",
        "ru": "Разводка гантелей на наклонной скамье (верх груди)",
        "et": "Hantlite lennutamine kaldpingil (ülarind)",
        "uk": "Розведення гантелей на похилій лаві (верх грудей)"
    },
    "Aperturas en banco declinado con mancuernas (pectoral inferior)": {
        "es": "Aperturas en banco declinado con mancuernas (pectoral inferior)",
        "en": "Decline Dumbbell Flyes (Lower Chest)",
        "ru": "Разводка гантелей на скамье с обратным наклоном (низ груди)",
        "et": "Hantlite lennutamine negatiivse kaldega pingil (alarind)",
        "uk": "Розведення гантелей на лаві зі зворотним нахилом (низ грудей)"
    },
    "Curl de bíceps unilateral en polea baja codo detrás del cuerpo": {
        "es": "Curl de bíceps unilateral en polea baja codo detrás del cuerpo",
        "en": "Single-Arm Cable Bicep Curl (Elbow Behind Body)",
        "ru": "Сгибание на бицепс одной рукой на нижнем блоке (локоть за корпусом)",
        "et": "Ühe käega biitsepsi kõverdus alaplokil küünarnukk kere taga",
        "uk": "Згинання на біцепс однією рукою на нижньому блоці (лікоть за корпусом)"
    },
    "Patada de tríceps en polea baja agarre supino": {
        "es": "Patada de tríceps en polea baja agarre supino",
        "en": "Underhand Cable Tricep Kickback",
        "ru": "Разгибание на трицепс назад на нижнем блоке обратным хватом",
        "et": "Triitsepsi sirutus taha alaplokil althaardega",
        "uk": "Розгинання на трицепс назад на нижньому блоці зворотним хватом"
    },
    "Curl martillo en banco inclinado con mancuernas": {
        "es": "Curl martillo en banco inclinado con mancuernas",
        "en": "Incline Dumbbell Hammer Curl",
        "ru": "Молотковые сгибания на наклонной скамье с гантелями",
        "et": "Hammer-kõverdused kaldpingil hantlitega",
        "uk": "Молоткові згинання на похилій лаві з гантелями"
    },
    "Extensión de tríceps sentado a 1 brazo por encima de la cabeza con mancuerna": {
        "es": "Extensión de tríceps sentado a 1 brazo por encima de la cabeza con mancuerna",
        "en": "Seated Single-Arm Overhead Dumbbell Tricep Extension",
        "ru": "Французский жим одной рукой сидя с гантелью из-за головы",
        "et": "Ühe käega triitsepsi sirutus istudes hantliga pea kohalt",
        "uk": "Французький жим однією рукою сидячи з гантеллю з-за голови"
    },
    "Jalón a 1 brazo al pecho sentado con cable en polea alta (espalda unilateral tracciones verticales)": {
        "es": "Jalón a 1 brazo al pecho sentado con cable en polea alta (espalda unilateral tracciones verticales)",
        "en": "Single-Arm Seated Lat Pulldown (Unilateral Vertical Pull)",
        "ru": "Тяга верхнего блока к груди одной рукой сидя (вертикальная тяга)",
        "et": "Ühe käega ülaploki tõmme rinnale istudes (ühepoolne vertikaalne tõmme)",
        "uk": "Тяга верхнього блоку до грудей однією рукою сидячи (вертикальна тяга)"
    },
    "Remo a 1 brazo sentado con cable en polea baja (espalda unilateral tracciones horizontales)": {
        "es": "Remo a 1 brazo sentado con cable en polea baja (espalda unilateral tracciones horizontales)",
        "en": "Single-Arm Seated Cable Row (Unilateral Horizontal Pull)",
        "ru": "Тяга нижнего блока к поясу одной рукой сидя (горизонтальная тяга)",
        "et": "Ühe käega alaploki tõmme istudes (ühepoolne horisontaalne tõmme)",
        "uk": "Тяга нижнього блоку до пояса однією рукою сидячи (горизонтальна тяга)"
    },
    "Hiperextensión lumbar (tradicional) (Espalda baja)": {
        "es": "Hiperextensión lumbar (tradicional) (Espalda baja)",
        "en": "Hyperextension (Traditional) (Lower Back)",
        "ru": "Гиперэкстензия (традиционная) (поясница)",
        "et": "Seljasirutus pingil (traditsiooniline) (alaselg)",
        "uk": "Гіперекстензія (традиційна) (поперек)"
    },
    "Press militar sentado en máquina (básico de hombro)": {
        "es": "Press militar sentado en máquina (básico de hombro)",
        "en": "Seated Machine Overhead Press (Shoulder Basic)",
        "ru": "Армейский жим сидя в тренажере (базовое на плечи)",
        "et": "Õlapress trenažööril istudes (õlgade baasharjutus)",
        "uk": "Армійський жим сидячи в тренажері (базова на плечі)"
    },
    "Elevación lateral a 1 brazo inclinado con cable en polea baja (hombro medio)": {
        "es": "Elevación lateral a 1 brazo inclinado con cable en polea baja (hombro medio)",
        "en": "Leaning Single-Arm Cable Lateral Raise (Lateral Delt)",
        "ru": "Махи в сторону одной рукой в наклоне на нижнем блоке (средняя дельта)",
        "et": "Kallutatud ühe käe külgmine tõste alaplokil (keskosa õlg)",
        "uk": "Махи вбік однією рукою в нахилі на нижньому блоці (середня дельта)"
    },
    "Pájaros simultáneos en polea alta (hombro posterior)": {
        "es": "Pájaros simultáneos en polea alta (hombro posterior)",
        "en": "High Cable Rear Delt Flyes (Rear Delt)",
        "ru": "Разведение рук на заднюю дельту на верхнем блоке",
        "et": "Tagumise õlalihase lennutus ülaplokil",
        "uk": "Розведення рук на задню дельту на верхньому блоці"
    },
    "Sentadilla a cajón en multipower": {
        "es": "Sentadilla a cajón en multipower",
        "en": "Smith Machine Box Squat",
        "ru": "Приседания на ящик в тренажере Смита",
        "et": "Kükk kastile Smithi masinal",
        "uk": "Присідання на ящик у тренажері Сміта"
    },
    "Sentadilla ATG en multipower (énfasus glúteo)": {
        "es": "Sentadilla ATG en multipower (énfasus glúteo)",
        "en": "Smith Machine ATG Squat (Glute Focus)",
        "ru": "Глубокие приседания (ATG) в тренажере Смита (акцент на ягодицы)",
        "et": "Sügav kükk (ATG) Smithi masinal (tuhararõhk)",
        "uk": "Глибокі присідання (ATG) в тренажері Сміта (акцент на сідниці)"
    },
    "Extensión de cuádriceps sentado en máquina (cuádriceps aislado)": {
        "es": "Extensión de cuádriceps sentado en máquina (cuádriceps aislado)",
        "en": "Seated Leg Extension (Isolated Quads)",
        "ru": "Разгибание ног сидя в тренажере (изоляция квадрицепса)",
        "et": "Jalgade sirutamine trenažööril istudes (nelipealihase isolatsioon)",
        "uk": "Розгинання ніг сидячи в тренажері (ізоляція квадрицепса)"
    },
    "Curl femoral tumbado en máquina (femoral aislado)": {
        "es": "Curl femoral tumbado en máquina (femoral aislado)",
        "en": "Lying Leg Curl (Isolated Hamstrings)",
        "ru": "Сгибание ног лежа в тренажере (изоляция бицепса бедра)",
        "et": "Jalgade kõverdamine kõhuli trenažööril (tagareie isolatsioon)",
        "uk": "Згинання ніг лежачи в тренажері (ізоляція біцепса стегна)"
    },
    "Leñador en polea media": {
        "es": "Leñador en polea media",
        "en": "Cable Woodchopper (Middle Pulley)",
        "ru": "Упражнение «Дровосек» на среднем блоке",
        "et": "Puuraidur keskmisel plokil",
        "uk": "Вправа «Дроворуб» на середньому блоці"
    },
    "Crunch en V": {
        "es": "Crunch en V",
        "en": "V-Ups / V-Crunch",
        "ru": "Складка на пресс (V-Crunch)",
        "et": "V-kõhulihaste harjutus",
        "uk": "Складка на прес (V-Crunch)"
    },
    "Press militar sentado con barra (tradicional) (básico de hombro)": {
        "es": "Press militar sentado con barra (tradicional) (básico de hombro)",
        "en": "Seated Barbell Military Press (Traditional) (Shoulder Basic)",
        "ru": "Армейский жим со штангой сидя (традиционный) (базовое на плечи)",
        "et": "Kangi surumine istudes (traditsiooniline) (õlgade baasharjutus)",
        "uk": "Армійський жим зі штангою сидячи (традиційний) (базова на плечі)"
    },
    "Remo con barra en multipower (espalda tracciones horizontales)": {
        "es": "Remo con barra en multipower (espalda tracciones horizontales)",
        "en": "Smith Machine Bent-Over Row (Horizontal Pull)",
        "ru": "Тяга штанги в наклоне в тренажере Смита (горизонтальная тяга)",
        "et": "Kangi tõmbed ettekallutatult Smithi masinal (horisontaalne tõmme)",
        "uk": "Тяга штанги в нахилі в тренажері Сміта (горизонтальна тяга)"
    },
    "Jalón al pecho sentado con barra agarre neutro abierto en polea alta (espalda tracciones verticales)": {
        "es": "Jalón al pecho sentado con barra agarre neutro abierto en polea alta (espalda tracciones verticales)",
        "en": "Wide Neutral-Grip Lat Pulldown (Vertical Pull)",
        "ru": "Тяга верхнего блока широким нейтральным хватом (вертикальная тяга)",
        "et": "Ülaploki tõmme laia neutraalse haardega rinnale (vertikaalne tõmme)",
        "uk": "Тяга верхнього блоку широким нейтральним хватом (вертикальна тяга)"
    },
    "Press banca con mancuernas (pectoral plano y estabilizadores)": {
        "es": "Press banca con mancuernas (pectoral plano y estabilizadores)",
        "en": "Flat Dumbbell Bench Press (Chest & Stabilizers)",
        "ru": "Жим гантелей на горизонтальной скамье (грудь и стабилизаторы)",
        "et": "Hantlite surumine lamades (rind ja stabiliseerijad)",
        "uk": "Жим гантелей на горизонтальній лаві (груди і стабілізатори)"
    },
    "Pájaros sentado con cable en polea media (hombro posterior)": {
        "es": "Pájaros sentado con cable en polea media (hombro posterior)",
        "en": "Seated Cable Rear Delt Flyes (Middle Pulley)",
        "ru": "Разведение рук на средних блоках сидя (задняя дельта)",
        "et": "Tagumise õlalihase lennutus istudes keskmisel plokil",
        "uk": "Розведення рук на середніх блоках сидячи (задня дельта)"
    },
    "Press banca inclinado con mancuernas (Pectoral y estabilizadores)": {
        "es": "Press banca inclinado con mancuernas (Pectoral y estabilizadores)",
        "en": "Incline Dumbbell Bench Press (Chest & Stabilizers)",
        "ru": "Жим гантелей на наклонной скамье (грудь и стабилизаторы)",
        "et": "Hantlite surumine kaldpingil (rind ja stabiliseerijad)",
        "uk": "Жим гантелей на похилій лаві (груди і стабілізатори)"
    },
    "Press militar sentado en multipower (Básico multiarticular de hombro)": {
        "es": "Press militar sentado en multipower (Básico multiarticular de hombro)",
        "en": "Smith Machine Overhead Press (Compound Shoulder Basic)",
        "ru": "Армейский жим сидя в тренажере Смита (базовое на плечи)",
        "et": "Kangi surumine istudes Smithi masinal (õlgade baasharjutus)",
        "uk": "Армійський жим сидячи в тренажері Сміта (базова на плечі)"
    },
    "Aperturas con cable en polea alta": {
        "es": "Aperturas con cable en polea alta",
        "en": "High Cable Crossover / Flyes",
        "ru": "Сведение рук на верхнем блоке (кроссовер)",
        "et": "Ristivedu ülaplokil",
        "uk": "Зведення рук на верхньому блоці (кросовер)"
    },
    "Elevaciones laterales tumbado con cable en polea baja": {
        "es": "Elevaciones laterales tumbado con cable en polea baja",
        "en": "Lying Cable Lateral Raise (Low Pulley)",
        "ru": "Махи в сторону лежа на нижнем блоке",
        "et": "Külgmine tõste lamades alaplokil",
        "uk": "Махи вбік лежачи на нижньому блоці"
    },
    "Extensión de tríceps con cuerda en polea alta": {
        "es": "Extensión de tríceps con cuerda en polea alta",
        "en": "High Cable Rope Tricep Pushdown",
        "ru": "Разгибание на трицепс с канатной рукоятью на верхнем блоке",
        "et": "Triitsepsi sirutus köiega ülaplokil",
        "uk": "Розгинання на трицепс з канатною рукояткою на верхньому блоці"
    },
    "Extensión de tríceps por encima de la cabeza con barra en polea alta": {
        "es": "Extensión de tríceps por encima de la cabeza con barra en polea alta",
        "en": "Overhead Cable Bar Tricep Extension (High Pulley)",
        "ru": "Разгибание на трицепс из-за головы с прямой рукоятью на верхнем блоке",
        "et": "Triitsepsi sirutus kangiga pea kohalt ülaplokil",
        "uk": "Розгинання на трицепс з-за голови з прямою рукояткою на верхньому блоці"
    },
    "Rueda abdominal": {
        "es": "Rueda abdominal",
        "en": "Ab Wheel Rollout",
        "ru": "Гимнастический ролик для пресса",
        "et": "Kõhurull",
        "uk": "Гімнастичний ролик для преса"
    },
    "Peso muerto (tradicional) (básico multiarticular)": {
        "es": "Peso muerto (tradicional) (básico multiarticular)",
        "en": "Deadlift (Traditional) (Compound Basic)",
        "ru": "Становая тяга (классическая) (базовое многосуставное)",
        "et": "Jõutõmme (traditsiooniline) (baasharjutus)",
        "uk": "Станова тяга (класична) (базова багатосуглобова)"
    },
    "Remo a 1 brazo con barra (espalda unilateral, tracciones horizontales)": {
        "es": "Remo a 1 brazo con barra (espalda unilateral, tracciones horizontales)",
        "en": "Single-Arm Barbell Row (Unilateral Horizontal Pull)",
        "ru": "Тяга штанги одной рукой (односторонняя горизонтальная тяга)",
        "et": "Ühe käega kangi tõmme (ühepoolne horisontaalne tõmme)",
        "uk": "Тяга штанги однією рукою (одностороння горизонтальна тяга)"
    },
    "Jalón al pecho sentado con agarre neutro cerrado en polea alta (espalda, tracciones verticales)": {
        "es": "Jalón al pecho sentado con agarre neutro cerrado en polea alta (espalda, tracciones verticales)",
        "en": "Close Neutral-Grip Lat Pulldown (Vertical Pull)",
        "ru": "Тяга верхнего блока узким нейтральным хватом (вертикальная тяга)",
        "et": "Ülaploki tõmme kitsa neutraalse haardega rinnale (vertikaalne tõmme)",
        "uk": "Тяга верхнього блоку вузьким нейтральним хватом (вертикальна тяга)"
    },
    "Curl con barra EZ agarre inverso": {
        "es": "Curl con barra EZ agarre inverso",
        "en": "Reverse-Grip EZ Bar Curl",
        "ru": "Сгибание рук с EZ-грифом обратным хватом",
        "et": "Biitsepsi kõverdus EZ-kangiga pealthaardes",
        "uk": "Згинання рук з EZ-грифом зворотним хватом"
    },
    "Curl martillo con mancuernas": {
        "es": "Curl martillo con mancuernas",
        "en": "Dumbbell Hammer Curl",
        "ru": "Молотковые сгибания с гантелями",
        "et": "Hammer-kõverdused hantlitega",
        "uk": "Молоткові згинання з гантелями"
    },
    "Facepull con cuerda en polea alta (Hombro posterior)": {
        "es": "Facepull con cuerda en polea alta (Hombro posterior)",
        "en": "Face Pull with Rope (Rear Delt)",
        "ru": "Тяга к лицу с канатом на верхнем блоке (Facepull)",
        "et": "Facepull köiega ülaplokil (tagumine õlg)",
        "uk": "Тяга до обличчя з канатом на верхньому блоці (Facepull)"
    },
    "Sentadilla en multipower": {
        "es": "Sentadilla en multipower",
        "en": "Smith Machine Squat",
        "ru": "Приседания в тренажере Смита",
        "et": "Kükk Smithi masinal",
        "uk": "Присідання в тренажері Сміта"
    },
    "Sentadilla búlgara con mancuerna (énfasis en glúteo)": {
        "es": "Sentadilla búlgara con mancuerna (énfasis en glúteo)",
        "en": "Dumbbell Bulgarian Split Squat (Glute Focus)",
        "ru": "Болгарские выпады с гантелями (акцент на ягодицы)",
        "et": "Bulgaaria väljaastekükk hantlitega (tuhararõhk)",
        "uk": "Болгарські випади з гантелями (акцент на сідниці)"
    },
    "Peso muerto rumano con barra (tradicional) (cadena posterior)": {
        "es": "Peso muerto rumano con barra (tradicional) (cadena posterior)",
        "en": "Barbell Romanian Deadlift (Traditional) (Posterior Chain)",
        "ru": "Румынская тяга со штангой (классическая) (задняя цепь)",
        "et": "Rumeenia jõutõmme kangiga (traditsiooniline) (tagakett)",
        "uk": "Румунська тяга зі штангою (класична) (задній ланцюг)"
    },
    "Curl femoral a 1 pierna de pie en máquina": {
        "es": "Curl femoral a 1 pierna de pie en máquina",
        "en": "Standing Single-Leg Curl Machine",
        "ru": "Сгибание одной ноги стоя в тренажере",
        "et": "Ühe jala kõverdamine seistes trenažööril",
        "uk": "Згинання однієї ноги стоячи в тренажері"
    },
    "Press banca inclinado en multipower (básico multiarticular de pectoral)": {
        "es": "Press banca inclinado en multipower (básico multiarticular de pectoral)",
        "en": "Smith Machine Incline Bench Press (Compound Chest Basic)",
        "ru": "Жим штанги на наклонной скамье в тренажере Смита (базовое на грудь)",
        "et": "Kaldpingil surumine Smithi masinal (rinna baasharjutus)",
        "uk": "Жим штанги на похилій лаві в тренажері Сміта (базова на груди)"
    },
    "Jalón al pecho sentado con barra agarre prono medio en polea alta (espalda, tracciones verticales)": {
        "es": "Jalón al pecho sentado con barra agarre prono medio en polea alta (espalda, tracciones verticales)",
        "en": "Medium Overhand Lat Pulldown (Vertical Pull)",
        "ru": "Тяга верхнего блока к груди средним прямым хватом (вертикальная тяга)",
        "et": "Ülaploki tõmme rinnale keskmise pealthaardega (vertikaalne tõmme)",
        "uk": "Тяга верхнього блоку до грудей середнім прямим хватом (вертикальна тяга)"
    },
    "Remo al pecho agarre supino (espalda, tracciones horizontales)": {
        "es": "Remo al pecho agarre supino (espalda, tracciones horizontales)",
        "en": "Underhand Barbell Row (Horizontal Pull)",
        "ru": "Тяга к поясу/груди обратным хватом (горизонтальная тяга)",
        "et": "Kangi tõmbed rinnale althaardega (horisontaalne tõmme)",
        "uk": "Тяга до пояса/грудей зворотним хватом (горизонтальна тяга)"
    },
    "Elevaciones laterales con cable en polea baja (deltoides medio)": {
        "es": "Elevaciones laterales con cable en polea baja (deltoides medio)",
        "en": "Low Cable Lateral Raise (Lateral Delt)",
        "ru": "Махи в сторону на нижнем блоке (средняя дельта)",
        "et": "Külgmised tõsted alaplokil (keskosa õlg)",
        "uk": "Махи вбік на нижньому блоці (середня дельта)"
    },
    "Pájaros con cable en polea baja (deltoides posterior)": {
        "es": "Pájaros con cable en polea baja (deltoides posterior)",
        "en": "Low Cable Rear Delt Flyes (Rear Delt)",
        "ru": "Разведение рук в наклоне на нижнем блоке (задняя дельта)",
        "et": "Tagumise õlalihase lennutus alaplokil",
        "uk": "Розведення рук у нахилі на нижньому блоці (задня дельта)"
    },
    "Curl con barra EZ en polea baja": {
        "es": "Curl con barra EZ en polea baja",
        "en": "Low Cable EZ Bar Bicep Curl",
        "ru": "Сгибание на бицепс с EZ-рукоятью на нижнем блоке",
        "et": "Biitsepsi kõverdus EZ-sangaga alaplokil",
        "uk": "Згинання на біцепс з EZ-рукояткою на нижньому блоці"
    },
    "Extensión de tríceps con barra en polea alta": {
        "es": "Extensión de tríceps con barra en polea alta",
        "en": "High Cable Straight Bar Tricep Pushdown",
        "ru": "Разгибание на трицепс с прямой рукоятью на верхнем блоке",
        "et": "Triitsepsi sirutus sirge kangiga ülaplokil",
        "uk": "Розгинання на трицепс з прямою рукояткою на верхньому блоці"
    },
    "Hip thrust (tradicional) (básico de glúteo)": {
        "es": "Hip thrust (tradicional) (básico de glúteo)",
        "en": "Barbell Hip Thrust (Traditional) (Glute Basic)",
        "ru": "Ягодичный мостик (классический) (базовое на ягодицы)",
        "et": "Puusatõste kangiga (traditsiooniline) (tuhara baasharjutus)",
        "uk": "Сідничний місток (класичний) (базова на сідниці)"
    },
    "Pull through en polea baja (glúteo mayor)": {
        "es": "Pull through en polea baja (glúteo mayor)",
        "en": "Cable Pull-Through (Gluteus Maximus)",
        "ru": "Тяга через ноги на нижнем блоке (Pull Through)",
        "et": "Pull-through alaplokil (suur tuharalihas)",
        "uk": "Тяга через ноги на нижньому блоці (Pull Through)"
    },
    "Prensa de piernas (tradicional) (básico de pierna)": {
        "es": "Prensa de piernas (tradicional) (básico de pierna)",
        "en": "Leg Press (Traditional) (Leg Basic)",
        "ru": "Жим ногами (классический) (базовое на ноги)",
        "et": "Jalapress (traditsiooniline) (jalgade baasharjutus)",
        "uk": "Жим ногами (класичний) (базова на ноги)"
    },
    "Extensión de cuádriceps a 1 pierna sentado en máquina": {
        "es": "Extensión de cuádriceps a 1 pierna sentado en máquina",
        "en": "Seated Single-Leg Extension Machine",
        "ru": "Разгибание одной ноги сидя в тренажере",
        "et": "Ühe jala sirutamine trenažööril istudes",
        "uk": "Розгинання однієї ноги сидячи в тренажері"
    },
    "Plancha lateral (estática, tradicional)": {
        "es": "Plancha lateral (estática, tradicional)",
        "en": "Side Plank (Static, Traditional)",
        "ru": "Боковая планка (статическая, классическая)",
        "et": "Küljeplank (staatiline, traditsiooniline)",
        "uk": "Бічна планка (статична, класична)"
    },
    "Plancha (tradicional)": {
        "es": "Plancha (tradicional)",
        "en": "Plank (Traditional)",
        "ru": "Планка (классическая)",
        "et": "Plank (traditsiooniline)",
        "uk": "Планка (класична)"
    },
    "Press banca con barra (tradicional)": {
        "es": "Press banca con barra (tradicional)",
        "en": "Barbell Bench Press (Traditional)",
        "ru": "Жим штанги лежа (классический)",
        "et": "Lamades surumine kangiga (traditsiooniline)",
        "uk": "Жим штанги лежачи (класичний)"
    },
    "Apertura sentado en máquina": {
        "es": "Apertura sentado en máquina",
        "en": "Seated Machine Chest Fly (Pec Deck)",
        "ru": "Сведение рук в тренажере «Бабочка» (Pec Deck)",
        "et": "Rinna lennutus trenažööril istudes (Pec Deck)",
        "uk": "Зведення рук у тренажері «Метелик» (Pec Deck)"
    },
    "Pájaros sentado en máquina": {
        "es": "Pájaros sentado en máquina",
        "en": "Seated Reverse Fly Machine (Rear Delt)",
        "ru": "Обратная бабочка в тренажере (задняя дельта)",
        "et": "Tagumise õlalihase trenažöör (Reverse Pec Deck)",
        "uk": "Зворотний метелик у тренажері (задня дельта)"
    },
    "Curl de bíceps alterno con mancuerna": {
        "es": "Curl de bíceps alterno con mancuerna",
        "en": "Alternating Dumbbell Bicep Curl",
        "ru": "Поочередное сгибание рук с гантелями на бицепс",
        "et": "Vahelduv biitsepsi kõverdus hantlitega",
        "uk": "Почергове згинання рук з гантелями на біцепс"
    },
    "Crunch abdominal de rodillas con cuerda en polea alta": {
        "es": "Crunch abdominal de rodillas con cuerda en polea alta",
        "en": "Kneeling Cable Rope Crunch",
        "ru": "Скручивания на коленях на блоке с канатом",
        "et": "Kõhulihaste kerepainutus põlvedel köiega ülaplokil",
        "uk": "Скручування на колінах на блоці з канатом"
    },
    "Pullover con barra en polea alta": {
        "es": "Pullover con barra en polea alta",
        "en": "Straight-Arm Lat Pulldown / Cable Pullover",
        "ru": "Пулловер на верхнем блоке с прямой рукоятью",
        "et": "Pullover kangiga ülaplokil",
        "uk": "Пуловер на верхньому блоці з прямою рукояткою"
    },
    "Press banca declinado con mancuernas": {
        "es": "Press banca declinado con mancuernas",
        "en": "Decline Dumbbell Bench Press",
        "ru": "Жим гантелей на наклонной скамье головой вниз",
        "et": "Surumine hantlitega negatiivsel kaldel",
        "uk": "Жим гантелей на похилій лаві головою вниз"
    },
    "Elevaciones laterales sentado con mancuernas": {
        "es": "Elevaciones laterales sentado con mancuernas",
        "en": "Seated Dumbbell Lateral Raise",
        "ru": "Махи гантелями в стороны сидя",
        "et": "Külgmised tõsted hantlitega istudes",
        "uk": "Махи гантелями вбік сидячи"
    },
    "Curl de bíceps en banco scott con barra EZ": {
        "es": "Curl de bíceps en banco scott con barra EZ",
        "en": "Preacher Curl with EZ Bar",
        "ru": "Сгибание рук на скамье Скотта с EZ-грифом",
        "et": "Biitsepsi kõverdus Scotti pingil EZ-kangiga",
        "uk": "Згинання рук на лаві Скотта з EZ-грифом"
    },
    "Patada de glúteo a 1 pierna con cable en polea baja": {
        "es": "Patada de glúteo a 1 pierna con cable en polea baja",
        "en": "Single-Leg Cable Glute Kickback",
        "ru": "Махи назад одной ногой на нижнем блоке на ягодицы",
        "et": "Ühe jala tuharasirutus taha alaplokil",
        "uk": "Махи назад однією ногою на нижньому блоці на сідниці"
    },
    "Prensa de piernas (pies abajo)": {
        "es": "Prensa de piernas (pies abajo)",
        "en": "Leg Press (Low Feet Placement, Quad Focus)",
        "ru": "Жим ногами (низкая постановка, акцент на квадрицепс)",
        "et": "Jalapress (madal jalgade asetus)",
        "uk": "Жим ногами (низька постановка, акцент на квадрицепс)"
    },
    "Peso muerto rumano a 1 pierna con mancuernas": {
        "es": "Peso muerto rumano a 1 pierna con mancuernas",
        "en": "Single-Leg Dumbbell Romanian Deadlift",
        "ru": "Румынская тяга на одной ноге с гантелями",
        "et": "Ühe jala Rumeenia jõutõmme hantlitega",
        "uk": "Румунська тяга на одній нозі з гантелями"
    },
    "Push press (tradicional)": {
        "es": "Push press (tradicional)",
        "en": "Push Press (Traditional)",
        "ru": "Швунг жимовой (классический)",
        "et": "Push press (traditsiooniline)",
        "uk": "Швунг жимовий (класичний)"
    },
    "Six ways con mancuernas": {
        "es": "Six ways con mancuernas",
        "en": "Dumbbell 6-Way Shoulder Raises",
        "ru": "Упражнение 6 Ways с гантелями на плечи",
        "et": "6-suunaline õlatõste hantlitega",
        "uk": "Вправа 6 Ways з гантелями на плечі"
    },
    "Curl martillo con cuerda en polea baja": {
        "es": "Curl martillo con cuerda en polea baja",
        "en": "Low Cable Rope Hammer Curl",
        "ru": "Молотковые сгибания с канатной рукоятью на нижнем блоке",
        "et": "Hammer-kõverdus köiega alaplokil",
        "uk": "Молоткові згинання з канатною рукояткою на нижньому блоці"
    },
    "Extensión de tríceps por encima de la cabeza con cuerda en polea alta": {
        "es": "Extensión de tríceps por encima de la cabeza con cuerda en polea alta",
        "en": "Overhead Rope Cable Tricep Extension",
        "ru": "Разгибание на трицепс из-за головы с канатом на верхнем блоке",
        "et": "Triitsepsi sirutus köiega pea kohalt ülaplokil",
        "uk": "Розгинання на трицепс з-за голови з канатом на верхньому блоці"
    },
    "Curl de bíceps con mancuerna": {
        "es": "Curl de bíceps con mancuerna",
        "en": "Dumbbell Bicep Curl",
        "ru": "Сгибание рук с гантелями на бицепс",
        "et": "Biitsepsi kõverdus hantlitega",
        "uk": "Згинання рук з гантелями на біцепс"
    },
    "Peso muerto rumano en multipower": {
        "es": "Peso muerto rumano en multipower",
        "en": "Smith Machine Romanian Deadlift",
        "ru": "Румынская тяга в тренажере Смита",
        "et": "Rumeenia jõutõmme Smithi masinal",
        "uk": "Румунська тяга в тренажері Сміта"
    },
    "Hollowman": {
        "es": "Hollowman",
        "en": "Hollow Body Hold",
        "ru": "Упражнение «Лодочка» / Холлоу (Hollow Hold)",
        "et": "Hollow body hoid",
        "uk": "Вправа «Човник» / Холлоу (Hollow Hold)"
    },
    "Remo en banco inclinado con mancuernas": {
        "es": "Remo en banco inclinado con mancuernas",
        "en": "Incline Dumbbell Chest-Supported Row",
        "ru": "Тяга гантелей на наклонной скамье с упором в грудь",
        "et": "Hantlite tõmbed toetudes kaldpingile",
        "uk": "Тяга гантелей на похилій лаві з упором у груди"
    },
    "Hip thrust a 1 pierna en máquina": {
        "es": "Hip thrust a 1 pierna en máquina",
        "en": "Single-Leg Machine Hip Thrust",
        "ru": "Ягодичный мостик на одной ноге в тренажере",
        "et": "Ühe jala puusatõste trenažööril",
        "uk": "Сідничний місток на одній нозі в тренажері"
    },
    "Crunch abdominal en banco declinado con giro": {
        "es": "Crunch abdominal en banco declinado con giro",
        "en": "Decline Twisting Abdominal Crunch",
        "ru": "Скручивания на римском стуле / наклонной скамье с поворотом",
        "et": "Kerepainutus pöördega negatiivse kaldega pingil",
        "uk": "Скручування на римському стільці / похилій лаві з поворотом"
    },
    "Remo a 1 brazo con mancuerna": {
        "es": "Remo a 1 brazo con mancuerna",
        "en": "Single-Arm Dumbbell Row",
        "ru": "Тяга гантели в наклоне одной рукой",
        "et": "Ühe käega hantli tõmme ettekallutatult",
        "uk": "Тяга гантелі в нахилі однією рукою"
    }
};

function getTrExName(originalName) {
    if (!originalName) return '';
    const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'es';
    if (exerciseTranslations[originalName] && exerciseTranslations[originalName][lang]) {
        return exerciseTranslations[originalName][lang];
    }
    return originalName;
}

let state = {
    language: localStorage.getItem('gym_language') || 'es',
    exercises: (savedExercises && savedExercises.length > 0) ? savedExercises : (typeof defaultExercises !== 'undefined' ? defaultExercises : []),
    sessions: JSON.parse(localStorage.getItem('gym_sessions')) || [],
    selectedDate: new Date(),
    currentWeekStart: new Date(),
    completedWorkouts: JSON.parse(localStorage.getItem('gym_completed')) || [],
    groups: (savedGroups && savedGroups.length > 0) ? savedGroups : (typeof defaultGroups !== 'undefined' ? defaultGroups : ['Sin Grupo']),
    activeWorkoutState: JSON.parse(localStorage.getItem('gym_active_workout')) || null,
    evolution: JSON.parse(localStorage.getItem('gym_evolution')) || []
};

// Reconcile missing default exercises and images
if (typeof defaultExercises !== 'undefined') {
    defaultExercises.forEach(defEx => {
        let existing = state.exercises.find(ex => ex.id === defEx.id);
        if (!existing) {
            state.exercises.push(defEx);
        } else if (defEx.imageData && existing.imageData === undefined) {
            existing.imageData = defEx.imageData;
        }
    });
}

// UI State
let openExerciseAccordions = [];

// Utils
// Notificación de entrenamiento activo
window.manageWorkoutNotification = async (show) => {
    if (window.Capacitor && window.Capacitor.Plugins.LocalNotifications) {
        const { LocalNotifications } = window.Capacitor.Plugins;
        try {
            if (show) {
                let perm = await LocalNotifications.checkPermissions();
                if (perm.display !== 'granted') {
                    perm = await LocalNotifications.requestPermissions();
                }
                if (perm.display === 'granted') {
                    try {
                        await LocalNotifications.createChannel({
                            id: 'workout_active',
                            name: 'Entrenamientos Activos',
                            importance: 4,
                            visibility: 1
                        });
                    } catch (e) {}

                    await LocalNotifications.schedule({
                        notifications: [
                            {
                                title: "Entrenamiento en curso",
                                body: "Tienes un entrenamiento activo. Pulsa para continuar.",
                                id: 1,
                                ongoing: true,
                                autoCancel: false,
                                channelId: 'workout_active'
                            }
                        ]
                    });
                }
            } else {
                await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
            }
        } catch (e) {
            console.error("Notification Error:", e);
        }
    }
};

const saveState = () => {
    localStorage.setItem('gym_exercises', JSON.stringify(state.exercises));
    localStorage.setItem('gym_sessions', JSON.stringify(state.sessions));
    localStorage.setItem('gym_completed', JSON.stringify(state.completedWorkouts));
    localStorage.setItem('gym_groups', JSON.stringify(state.groups));
    localStorage.setItem('gym_active_workout', JSON.stringify(state.activeWorkoutState));
    localStorage.setItem('gym_evolution', JSON.stringify(state.evolution));
};

const formatDate = (date) => {
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
};

const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff));
};

const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
};

// Initialize Week
state.currentWeekStart = getMonday(state.selectedDate);

// DOM Elements
const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');
const headerTitle = document.getElementById('header-title');
const headerAction = document.getElementById('header-action');

// Modals
const modalEventType = document.getElementById('modal-event-type');
const modalAddRoutine = document.getElementById('modal-add-routine');
const modalSingleGoal = document.getElementById('modal-single-goal');
const modalSelectExercises = document.getElementById('modal-select-exercises');
const modalExercise = document.getElementById('modal-exercise');
const modalDropset = document.getElementById('modal-dropset-calc');
const modalInlineHistory = document.getElementById('modal-inline-history');
const modalMonthPicker = document.getElementById('modal-month-picker');
const modalManageGroups = document.getElementById('modal-manage-groups');
const modalDeleteSession = document.getElementById('modal-delete-session');
const modalLightbox = document.getElementById('modal-lightbox');
const closeBtns = document.querySelectorAll('.close-modal');

// Navigation Logic
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        
        if (target === 'view-workout') {
            if (!(state.activeWorkoutState && state.activeWorkoutState.startTime)) {
                alert(getT('alerts.noActiveWorkout') || 'No active workout.');
                return;
            }
            startWorkout(state.activeWorkoutState.session);
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            updateWorkoutBanner();
            return;
        } else {
            document.getElementById('view-workout').classList.remove('active');
            updateWorkoutBanner();
        }
        
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        views.forEach(view => {
            if(!view.classList.contains('overlay-view')) {
                view.classList.remove('active');
            }
        });
        document.getElementById(target).classList.add('active');
        
        headerAction.classList.add('hidden');
        document.getElementById('header-edit-switch').style.display = target === 'view-calendar' ? 'flex' : 'none';
        if (target === 'view-calendar') {
            headerTitle.textContent = getT('header.calendar');
            headerAction.classList.remove('hidden');
            headerAction.innerHTML = `<i class="ph ph-calendar-plus"></i> <span style="font-size:14px; font-weight:600; margin-left:4px;" data-i18n="calendar.createSession">${getT('calendar.createSession')}</span>`;
            headerAction.style.width = 'auto';
            headerAction.style.padding = '0 12px';
            headerAction.style.borderRadius = '16px';
            headerAction.onclick = () => { editingSessionId = null; openModal(modalEventType); };
            renderCalendar();
        } else if (target === 'view-exercises') {
            headerTitle.textContent = getT('header.exercises');
            headerAction.classList.remove('hidden');
            headerAction.innerHTML = `<i class="ph ph-plus"></i> <span style="font-size:14px; font-weight:600; margin-left:4px;">${getT('modals.exercise.title')}</span>`;
            headerAction.style.width = 'auto';
            headerAction.style.padding = '0 12px';
            headerAction.style.borderRadius = '16px';
            headerAction.onclick = () => {
                document.getElementById('exercise-id').value = '';
                document.getElementById('exercise-name').value = '';
                if(document.getElementById('exercise-max1rm')) document.getElementById('exercise-max1rm').value = '';
                if(document.getElementById('exercise-pr-hyp')) document.getElementById('exercise-pr-hyp').value = '';
                if(document.getElementById('exercise-pr-heavy')) document.getElementById('exercise-pr-heavy').value = '';
                document.getElementById('exercise-youtube').value = '';
                document.getElementById('exercise-image').value = '';
                document.getElementById('exercise-image-preview').style.display = 'none';
                document.getElementById('btn-remove-exercise-image').style.display = 'none';
                document.getElementById('exercise-image-data').value = '';
                
                const select = document.getElementById('exercise-group');
                select.innerHTML = '';
                state.groups.forEach(g => {
                    let gKey = g === 'Abdominales y core' ? 'core' : (g === 'Tríceps' ? 'triceps' : (g === 'Bíceps' ? 'biceps' : g.toLowerCase()));
                    let trGroup = getT('groups.' + gKey);
                    trGroup = trGroup !== 'groups.' + g.toLowerCase() ? trGroup : g;
                    select.innerHTML += `<option value="${g}">${trGroup}</option>`;
                });
                
                document.getElementById('btn-delete-exercise').style.display = 'none';
                
                document.getElementById('modal-exercise-title').textContent = getT('modals.exercise.title');
                openModal(modalExercise);
            };
            renderExercises();
        } else if (target === 'view-history') {
            headerTitle.textContent = getT('header.history');
            renderGlobalHistory();
        } else if (target === 'view-progression') {
            headerTitle.textContent = getT('header.progression');
            if (typeof renderProgressionView !== 'undefined') renderProgressionView();
        } else if (target === 'view-evolution') {
            headerTitle.textContent = getT('header.evolution');
            if (typeof renderEvolutionHistory !== 'undefined') renderEvolutionHistory();
        } else if (target === 'view-export') {
            headerTitle.textContent = getT('header.export');
            if (typeof renderExportList !== 'undefined') renderExportList();
        }
    });
});

// Modal Logic
const openModal = (modal) => modal.classList.add('active');
const closeModal = (modal) => modal.classList.remove('active');
closeBtns.forEach(btn => btn.addEventListener('click', (e) => closeModal(e.target.closest('.modal'))));

// Event Type Selection
window.selectEventType = (type) => {
    closeModal(modalEventType);
    
    // Reset builder state
    if (typeof routineItems !== 'undefined') {
        routineItems = [];
        supersetCounter = 1;
        if(document.getElementById('routine-selected-exercises-list')) {
            document.getElementById('routine-selected-exercises-list').innerHTML = '';
        }
    }
    
    if(type === 'routine') {
        document.getElementById('modal-routine-title').textContent = getT('modals.routine.title');
        document.getElementById('routine-duration').value = '4';
        openModal(modalAddRoutine);
    } else if (type === 'workout') {
        document.getElementById('modal-routine-title').textContent = getT('modals.add.workout');
        document.getElementById('routine-duration').value = '1';
        openModal(modalAddRoutine);
    } else if (type === 'goal') {
        openModal(modalSingleGoal);
    }
};

document.getElementById('btn-save-goal').addEventListener('click', () => {
    const steps = document.getElementById('goal-steps-target').value;
    state.sessions.push({
        id: Date.now().toString(),
        date: formatDate(state.selectedDate),
        name: `Objetivo Pasos: ${steps}`,
        type: 'goal',
        exercises: [],
        goalData: steps
    });
    saveState();
    closeModal(modalSingleGoal);
    renderCalendar();
});


// --- DATEPICKER MODAL ---
let dpView = 'days'; // 'days', 'months', 'years'
let dpDate = new Date(); 
let dpDecadeStart = new Date().getFullYear() - (new Date().getFullYear() % 10);

const renderDatePicker = () => {
    const grid = document.getElementById('dp-grid');
    const titleBtn = document.getElementById('dp-title');
    if(!grid) return;
    grid.innerHTML = '';
    const monthNames = getT("calendar.months");
    
    if (dpView === 'days') {
        grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        titleBtn.textContent = `${monthNames[dpDate.getMonth()]} ${dpDate.getFullYear()}`;
        
        const dayNames = getT("calendar.days");
        dayNames.forEach(dName => {
            const h = document.createElement('div');
            h.style.textAlign = 'center';
            h.style.fontWeight = 'bold';
            h.style.fontSize = '12px';
            h.style.paddingBottom = '4px';
            h.textContent = dName;
            grid.appendChild(h);
        });
        
        const firstDay = new Date(dpDate.getFullYear(), dpDate.getMonth(), 1);
        let startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - startOffset);
        
        for (let i = 0; i < 42; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            const dStr = formatDate(d);
            
            const cell = document.createElement('div');
            cell.classList.add('weekly-day');
            if (d.getMonth() !== dpDate.getMonth()) cell.style.opacity = '0.3';
            if (dStr === formatDate(new Date())) cell.classList.add('today');
            if (dStr === formatDate(state.selectedDate)) cell.classList.add('selected');
            
            cell.innerHTML = `<div class="day-num">${d.getDate()}</div>`;
            
            const daySessions = state.sessions.filter(s => s.date === dStr);
            if (daySessions.length > 0) {
                const indContainer = document.createElement('div');
                indContainer.classList.add('indicators-flex');
                const uniqueTypes = [...new Set(daySessions.map(s => s.type))];
                uniqueTypes.forEach(type => {
                    const indicator = document.createElement('div');
                    indicator.classList.add('day-indicator', `indicator-${type}`);
                    indContainer.appendChild(indicator);
                });
                cell.appendChild(indContainer);
            }
            
            cell.addEventListener('click', () => {
                state.selectedDate = new Date(d);
                state.currentWeekStart = getMonday(state.selectedDate);
                renderCalendar();
                closeModal(document.getElementById('modal-datepicker'));
            });
            grid.appendChild(cell);
        }
    } else if (dpView === 'months') {
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        titleBtn.textContent = `${dpDate.getFullYear()}`;
        monthNames.forEach((m, idx) => {
            const btn = document.createElement('button');
            btn.classList.add('picker-month-btn');
            if(dpDate.getFullYear() === state.selectedDate.getFullYear() && idx === state.selectedDate.getMonth()) {
                btn.classList.add('selected');
            }
            btn.textContent = m;
            btn.addEventListener('click', () => {
                dpDate.setMonth(idx);
                dpView = 'days';
                renderDatePicker();
            });
            grid.appendChild(btn);
        });
    } else if (dpView === 'years') {
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        titleBtn.textContent = `${dpDecadeStart} - ${dpDecadeStart + 11}`;
        for (let i = 0; i < 12; i++) {
            const y = dpDecadeStart + i;
            const btn = document.createElement('button');
            btn.classList.add('picker-month-btn');
            if(y === state.selectedDate.getFullYear()) btn.classList.add('selected');
            btn.textContent = y;
            btn.addEventListener('click', () => {
                dpDate.setFullYear(y);
                dpView = 'months';
                renderDatePicker();
            });
            grid.appendChild(btn);
        }
    }
};

document.getElementById('dp-title')?.addEventListener('click', () => {
    if (dpView === 'days') dpView = 'months';
    else if (dpView === 'months') { dpView = 'years'; dpDecadeStart = dpDate.getFullYear() - (dpDate.getFullYear() % 10); }
    renderDatePicker();
});
document.getElementById('dp-prev')?.addEventListener('click', () => {
    if (dpView === 'days') dpDate.setMonth(dpDate.getMonth() - 1);
    else if (dpView === 'months') dpDate.setFullYear(dpDate.getFullYear() - 1);
    else if (dpView === 'years') dpDecadeStart -= 12;
    renderDatePicker();
});
document.getElementById('dp-next')?.addEventListener('click', () => {
    if (dpView === 'days') dpDate.setMonth(dpDate.getMonth() + 1);
    else if (dpView === 'months') dpDate.setFullYear(dpDate.getFullYear() + 1);
    else if (dpView === 'years') dpDecadeStart += 12;
    renderDatePicker();
});

document.getElementById('btn-open-month-picker')?.addEventListener('click', () => {
    dpDate = new Date(state.selectedDate);
    dpView = 'days';
    renderDatePicker();
    openModal(document.getElementById('modal-datepicker'));
});


const translations = {
    "es": {
        "setTypes": {
            "warmup": "Calentamiento",
            "approach": "Aproximación",
            "effective": "Efectiva",
            "failure": "Al fallo",
            "dropset": "Dropset",
            "dropsetFailure": "Dropset fallo"
        },
        "nav": {
            "calendar": "Calendario",
            "exercises": "Ejercicios",
            "history": "Historial",
            "workout": "En curso",
            "progression": "Progresión",
            "evolution": "Evolución",
            "export": "Exp / Imp"
        },
        "header": {
            "title": "Calendario",
            "calendar": "Calendario",
            "exercises": "Ejercicios",
            "history": "Historial",
            "workout": "Entrenamiento",
            "workoutActive": "En curso",
            "progression": "Progresión",
            "evolution": "Evolución",
            "export": "Exportar/Importar"
        },
        "calendar": {
            "today": "Hoy",
            "dayPlan": "Plan para el día",
            "selectDay": "Selecciona un día",
            "week": "Semana",
            "months": [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            "days": [
                "L",
                "M",
                "X",
                "J",
                "V",
                "S",
                "D"
            ],
            "createSession": "Crear Sesión",
            "editMode": "Modo Edición",
            "viewMode": "Modo Lectura",
            "emptyDay": "No hay entrenamientos para este día."
        },
        "exercises": {
            "search": "Buscar ejercicios...",
            "empty": "No hay ejercicios. Añade uno nuevo."
        },
        "history": {
            "title": "Registro de Entrenamientos",
            "empty": "No hay entrenamientos completados aún.",
            "deleteAllConfirm": "¿Eliminar todos los entrenamientos del historial? Esta acción no se puede deshacer."
        },
        "workout": {
            "title": "Entrenamiento",
            "start": "Iniciar",
            "finish": "Finalizar Entrenamiento",
            "finishConfirm": "¿Finalizar entrenamiento?",
            "sets": "Series",
            "series": "Serie",
            "addSet": "Añadir serie",
            "cancel": "Cancelar",
            "replaceConfirm": "Ya tienes un entrenamiento en curso. ¿Deseas cancelarlo e iniciar este nuevo?",
            "cancelConfirm": "¿Estás seguro de que deseas cancelar el entrenamiento? Se perderán los datos de esta sesión."
        },
        "common": {
            "cancel": "Cancelar",
            "add": "Añadir",
            "delete": "Eliminar",
            "confirm": "Confirmar",
            "edit": "Editar",
            "save": "Guardar",
            "yes": "Sí",
            "no": "No",
            "ok": "OK",
            "create": "Crear",
            "deleteAll": "Eliminar Todo"
        },
        "types": {
            "hypertrophy": "Hipertrofia",
            "heavy": "Pesados",
            "intensity": "Alta Int.",
            "workout": "Entrenamiento",
            "goal": "Objetivo de Pasos"
        },
        "alerts": {
            "noActiveWorkout": "No hay ningún entrenamiento activo.",
            "nameRequired": "Pon un nombre al ejercicio",
            "supersetMin": "Selecciona al menos 2 elementos para crear una superserie.",
            "exerciseRequired": "Selecciona al menos un ejercicio.",
            "weightRequired": "Por favor, introduce el peso.",
            "saveError": "Error al guardar: ",
            "backupSuccess": "Copia de seguridad guardada correctamente.",
            "exportError": "Error al exportar: ",
            "importSuccess": "Datos importados correctamente. La aplicación se reiniciará.",
            "readError": "Error al leer el archivo: ",
            "exportMin": "Por favor, selecciona al menos un entrenamiento para exportar.",
            "exportNotFound": "No se encontraron entrenamientos planificados con los IDs seleccionados.",
            "workoutFinished": "¡Entrenamiento Finalizado! Duración: "
        },
        "modals": {
            "add": {
                "title": "¿Qué quieres añadir?",
                "block": "Bloque 4 Semanas",
                "workout": "Entrenamiento Suelto (Hoy)",
                "goal": "Objetivo de Pasos (Hoy)"
            },
            "delete": {
                "title": "Eliminar Sesión",
                "single": "Solo esta sesión",
                "recurring": "Esta sesión y de semanas futuras",
                "confirm": "¿Eliminar sesión?"
            },
            "goal": {
                "title": "Objetivo de Pasos",
                "desc": "Dado que el navegador no puede acceder automáticamente a Samsung Health, deberás apuntar aquí tu objetivo y marcarlo como completado al final del día.",
                "label": "Pasos Objetivo (ej. 10000)",
                "save": "Guardar Objetivo",
                "reached": "¡Objetivo alcanzado!"
            },
            "picker": {
                "title": "Ir a Fecha"
            },
            "groups": {
                "title": "Gestionar Grupos",
                "new": "Nuevo Grupo...",
                "espalda": "Espalda",
                "hombro": "Hombro",
                "pecho": "Pecho",
                "triceps": "Tríceps",
                "biceps": "Bíceps",
                "multiarticular": "Multiarticular",
                "piernas": "Piernas",
                "core": "Abdominales y core",
                "todos": "Todos"
            },
            "routine": {
                "title": "Añadir Bloque (4 sem)",
                "type": "Tipo de Sesión",
                "name": "Nombre",
                "namePlaceholder": "Ej. Torso Pesado",
                "selected": "Ejercicios Seleccionados",
                "selectBtn": "Seleccionar Ejercicios",
                "createSuperset": "Crear Superserie",
                "schedule": "Programar"
            },
            "selectEx": {
                "title": "Elige Ejercicios"
            },
            "exercise": {
                "title": "Nuevo Ejercicio",
                "editTitle": "Editar ejercicio",
                "name": "Nombre del ejercicio",
                "namePlaceholder": "Ej. Press de Banca",
                "group": "Grupo (carpeta)",
                "youtube": "Enlace YouTube (opcional)",
                "image": "Imagen adjunta (opcional)",
                "max1rm": "1RM Actual (Manual) (kg)",
                "repsHyp": "Reps. (Hipertrofia)",
                "repsHea": "Reps. (Pesado)",
                "repsInt": "Reps. (Alta Int.)",
                "save": "Guardar ejercicio",
                "prHyp": "PR (Hipertrofia)",
                "prHeavy": "PR (Pesadas)"
            },
            "dropset": {
                "title": "Calculadora Dropset",
                "currentWeight": "Peso actual:"
            },
            "inlineHistory": {
                "title": "Historial del Ejercicio"
            }
        },
        "evolution": {
            "measurementsTitle": "Medidas Corporales (cm)",
            "newRecord": "Nuevo Registro",
            "saveRecord": "Guardar Registro",
            "m1": "1. Pecho",
            "m2": "2. Brazo Izq.",
            "m3": "3. Brazo Der.",
            "m4": "4. Abdomen",
            "m5": "5. Cintura",
            "m6": "6. Caderas",
            "m7": "7. Muslo Izq.",
            "m8": "8. Muslo Der.",
            "desc": "Registra y observa tus cambios físicos, medidas corporales, peso y porcentaje de grasa con el paso del tiempo.",
            "weightPlaceholder": "Peso (kg)",
            "bfPlaceholder": "% Grasa",
            "photosLabel": "Fotos (Frontal, Lateral, Espalda)"
        },
        "export": {
            "desc": "Guarda una copia de todos tus datos para no perderlos, o pásalos a otro dispositivo.",
            "exportBtn": "Exportar Datos (JSON)",
            "importBtn": "Importar Datos (JSON)",
            "modes": {
                "single": "Individuales",
                "block": "Bloques",
                "calendar": "Calendario"
            },
            "selected": "seleccionados",
            "deselectAll": "Deseleccionar todo",
            "selectDesc": "Selecciona los entrenamientos que deseas exportar.",
            "printPdf": "Imprimir / Guardar PDF",
            "exportPlanned": "Exportar sesiones",
            "importPlanned": "Importar sesiones"
        },
        "groups": {
            "espalda": "Espalda",
            "hombro": "Hombro",
            "pecho": "Pecho",
            "triceps": "Tríceps",
            "biceps": "Bíceps",
            "multiarticular": "Multiarticular",
            "piernas": "Piernas",
            "core": "Abdominales y core",
            "todos": "Todos"
        },
        "language": {
            "select": "Seleccionar Idioma"
        },
        "misc": {
            "supersetOf": "Superserie de",
            "groupUnassigned": "Sin Grupo",
            "steps": "Pasos"
        },
        "progression": {
            "searchPlaceholder": "Buscar ejercicio..."
        }
    },
    "en": {
        "setTypes": {
            "warmup": "Warm-up",
            "approach": "Approach",
            "effective": "Effective",
            "failure": "Failure",
            "dropset": "Dropset",
            "dropsetFailure": "Dropset failure"
        },
        "nav": {
            "calendar": "Calendar",
            "exercises": "Exercises",
            "history": "History",
            "workout": "Workout",
            "progression": "Progression",
            "evolution": "Evolution",
            "export": "Exp / Imp"
        },
        "header": {
            "title": "Calendar",
            "calendar": "Calendar",
            "exercises": "Exercises",
            "history": "History",
            "workout": "Workout",
            "workoutActive": "Workout Active",
            "progression": "Progression",
            "evolution": "Evolution",
            "export": "Export/Import"
        },
        "calendar": {
            "today": "Today",
            "dayPlan": "Plan for the day",
            "selectDay": "Select a day",
            "week": "Week",
            "months": [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            "days": [
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
                "S"
            ],
            "createSession": "Create Session",
            "editMode": "Edit Mode",
            "viewMode": "View Mode",
            "emptyDay": "No workouts for this day."
        },
        "exercises": {
            "search": "Search exercises...",
            "empty": "No exercises. Add a new one."
        },
        "history": {
            "title": "Workout History",
            "empty": "No completed workouts yet.",
            "deleteAllConfirm": "Delete all workouts from history? This cannot be undone."
        },
        "workout": {
            "title": "Workout",
            "start": "Start",
            "finish": "Finish Workout",
            "finishConfirm": "Finish workout?",
            "sets": "Sets",
            "series": "Set",
            "addSet": "Add set",
            "cancel": "Cancel",
            "replaceConfirm": "You already have an active workout. Cancel it and start this one?",
            "cancelConfirm": "Are you sure you want to cancel? Data will be lost."
        },
        "common": {
            "cancel": "Cancel",
            "add": "Add",
            "delete": "Delete",
            "confirm": "Confirm",
            "edit": "Edit",
            "save": "Save",
            "yes": "Yes",
            "no": "No",
            "ok": "OK",
            "create": "Create",
            "deleteAll": "Delete All"
        },
        "types": {
            "hypertrophy": "Hypertrophy",
            "heavy": "Heavy",
            "intensity": "High Int.",
            "workout": "Workout",
            "goal": "Step Goal"
        },
        "alerts": {
            "noActiveWorkout": "There is no active workout.",
            "nameRequired": "Enter an exercise name",
            "supersetMin": "Select at least 2 exercises.",
            "exerciseRequired": "Select at least one exercise.",
            "weightRequired": "Please enter weight.",
            "saveError": "Save error: ",
            "backupSuccess": "Backup saved successfully.",
            "exportError": "Export error: ",
            "importSuccess": "Data imported successfully. App will restart.",
            "readError": "Error reading file: ",
            "exportMin": "Please select at least one workout to export.",
            "exportNotFound": "No planned workouts found with selected IDs.",
            "workoutFinished": "Workout Finished! Duration: "
        },
        "modals": {
            "add": {
                "title": "What to add?",
                "block": "4-Week Block",
                "workout": "Single Workout (Today)",
                "goal": "Step Goal (Today)"
            },
            "delete": {
                "title": "Delete Session",
                "single": "Only this session",
                "recurring": "This and future weeks",
                "confirm": "Delete session?"
            },
            "goal": {
                "title": "Step Goal",
                "desc": "Since the browser can't access Samsung Health, log your goal here.",
                "label": "Step Goal (e.g. 10000)",
                "save": "Save Goal",
                "reached": "Goal Reached!"
            },
            "picker": {
                "title": "Go to Date"
            },
            "groups": {
                "title": "Manage Groups",
                "new": "New Group...",
                "espalda": "Back",
                "hombro": "Shoulders",
                "pecho": "Chest",
                "triceps": "Triceps",
                "biceps": "Biceps",
                "multiarticular": "Compound",
                "piernas": "Legs",
                "core": "Abs & Core",
                "todos": "All"
            },
            "routine": {
                "title": "Add Block (4 wk)",
                "type": "Session Type",
                "name": "Name",
                "namePlaceholder": "e.g. Heavy Upper",
                "selected": "Selected Exercises",
                "selectBtn": "Select Exercises",
                "createSuperset": "Create Superset",
                "schedule": "Schedule"
            },
            "selectEx": {
                "title": "Choose Exercises"
            },
            "exercise": {
                "title": "New Exercise",
                "editTitle": "Edit Exercise",
                "name": "Exercise Name",
                "namePlaceholder": "e.g. Bench Press",
                "group": "Group (Folder)",
                "youtube": "YouTube Link (optional)",
                "image": "Attached Image (optional)",
                "max1rm": "Current 1RM (Manual) (kg)",
                "repsHyp": "Reps (Hypertrophy)",
                "repsHea": "Reps (Heavy)",
                "repsInt": "Reps (High Int.)",
                "save": "Save Exercise",
                "prHyp": "PR (Hypertrophy)",
                "prHeavy": "PR (Heavy)"
            },
            "dropset": {
                "title": "Dropset Calculator",
                "currentWeight": "Current Weight:"
            },
            "inlineHistory": {
                "title": "Exercise History"
            }
        },
        "evolution": {
            "measurementsTitle": "Body Measurements (cm)",
            "newRecord": "New Record",
            "saveRecord": "Save Record",
            "m1": "1. Chest",
            "m2": "2. Left Arm",
            "m3": "3. Right Arm",
            "m4": "4. Abdomen",
            "m5": "5. Waist",
            "m6": "6. Hips",
            "m7": "7. Left Thigh",
            "m8": "8. Right Thigh",
            "desc": "Record and observe your physical changes, body measurements, weight, and body fat percentage over time.",
            "weightPlaceholder": "Weight (kg)",
            "bfPlaceholder": "Body Fat %",
            "photosLabel": "Photos (Front, Side, Back)"
        },
        "export": {
            "desc": "Save a copy of all your data so you don't lose it, or move it to another device.",
            "exportBtn": "Export Data (JSON)",
            "importBtn": "Import Data (JSON)",
            "modes": {
                "single": "Singles",
                "block": "Blocks",
                "calendar": "Calendar"
            },
            "selected": "selected",
            "deselectAll": "Deselect All",
            "selectDesc": "Select the workouts you wish to export.",
            "printPdf": "Print / Save PDF",
            "exportPlanned": "Export Sessions",
            "importPlanned": "Import Sessions"
        },
        "groups": {
            "espalda": "Back",
            "hombro": "Shoulders",
            "pecho": "Chest",
            "triceps": "Triceps",
            "biceps": "Biceps",
            "multiarticular": "Compound",
            "piernas": "Legs",
            "core": "Abs & Core",
            "todos": "All"
        },
        "language": {
            "select": "Select Language"
        },
        "misc": {
            "supersetOf": "Superset of",
            "groupUnassigned": "No Group",
            "steps": "Steps"
        },
        "progression": {
            "searchPlaceholder": "Search exercise..."
        }
    },
    "ru": {
        "setTypes": {
            "warmup": "Разминка",
            "approach": "Подводящий",
            "effective": "Рабочий",
            "failure": "До отказа",
            "dropset": "Дропсет",
            "dropsetFailure": "Дропсет отказ"
        },
        "nav": {
            "calendar": "Календарь",
            "exercises": "Упражнения",
            "history": "История",
            "workout": "Тренировка",
            "progression": "Прогресс",
            "evolution": "Эволюция",
            "export": "Эксп / Имп"
        },
        "header": {
            "title": "Календарь",
            "calendar": "Календарь",
            "exercises": "Упражнения",
            "history": "История",
            "workout": "Тренировка",
            "workoutActive": "Тренировка",
            "progression": "Прогресс",
            "evolution": "Эволюция",
            "export": "Экспорт/Импорт"
        },
        "calendar": {
            "today": "Сегодня",
            "dayPlan": "План на день",
            "selectDay": "Выберите день",
            "week": "Неделя",
            "months": [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            "days": [
                "П",
                "В",
                "С",
                "Ч",
                "П",
                "С",
                "В"
            ],
            "createSession": "Создать",
            "editMode": "Режим ред.",
            "viewMode": "Режим чт.",
            "emptyDay": "Нет тренировок на этот день."
        },
        "exercises": {
            "search": "Поиск...",
            "empty": "Нет упражнений. Добавьте."
        },
        "history": {
            "title": "История Тренировок",
            "empty": "Пока нет тренировок.",
            "deleteAllConfirm": "Удалить все тренировки из истории? Это нельзя отменить."
        },
        "workout": {
            "title": "Тренировка",
            "start": "Начать",
            "finish": "Завершить",
            "finishConfirm": "Завершить?",
            "sets": "Подходы",
            "series": "Подход",
            "addSet": "Добавить подход",
            "cancel": "Отмена",
            "replaceConfirm": "Есть активная. Заменить?",
            "cancelConfirm": "Отменить тренировку? Данные будут потеряны."
        },
        "common": {
            "cancel": "Отмена",
            "add": "Добавить",
            "delete": "Удалить",
            "confirm": "Подтвердить",
            "edit": "Изменить",
            "save": "Сохранить",
            "yes": "Да",
            "no": "Нет",
            "ok": "ОК",
            "create": "Создать",
            "deleteAll": "Удалить Все"
        },
        "types": {
            "hypertrophy": "Гипертрофия",
            "heavy": "Тяжелые",
            "intensity": "Выс. Инт.",
            "workout": "Тренировка",
            "goal": "Шаги"
        },
        "alerts": {
            "noActiveWorkout": "Нет активной тренировки.",
            "nameRequired": "Введите имя",
            "supersetMin": "Мин 2 упражнения.",
            "exerciseRequired": "Выберите хотя бы одно.",
            "weightRequired": "Введите вес.",
            "saveError": "Ошибка сохранения: ",
            "backupSuccess": "Резервная копия сохранена.",
            "exportError": "Ошибка экспорта: ",
            "importSuccess": "Данные импортированы. Перезапуск.",
            "readError": "Ошибка чтения: ",
            "exportMin": "Выберите тренировку.",
            "exportNotFound": "Не найдено.",
            "workoutFinished": "Тренировка завершена! Время: "
        },
        "modals": {
            "add": {
                "title": "Что добавить?",
                "block": "4-недельный блок",
                "workout": "Тренировка (Сегодня)",
                "goal": "Шаги (Сегодня)"
            },
            "delete": {
                "title": "Удалить Сессию",
                "single": "Только эту",
                "recurring": "Эту и будущие",
                "confirm": "Удалить?"
            },
            "goal": {
                "title": "Цель Шагов",
                "desc": "Укажите шаги здесь.",
                "label": "Цель (напр. 10000)",
                "save": "Сохранить",
                "reached": "Цель Достигнута!"
            },
            "picker": {
                "title": "Перейти к Дате"
            },
            "groups": {
                "title": "Управление Группами",
                "new": "Новая Группа...",
                "espalda": "Спина",
                "hombro": "Плечи",
                "pecho": "Грудь",
                "triceps": "Трицепс",
                "biceps": "Бицепс",
                "multiarticular": "Базовые",
                "piernas": "Ноги",
                "core": "Пресс и Кор",
                "todos": "Все"
            },
            "routine": {
                "title": "Добавить Блок",
                "type": "Тип",
                "name": "Имя",
                "namePlaceholder": "Напр. Тяжелый верх",
                "selected": "Выбрано",
                "selectBtn": "Выбрать",
                "createSuperset": "Создать Суперсет",
                "schedule": "Запланировать"
            },
            "selectEx": {
                "title": "Выберите Упражнения"
            },
            "exercise": {
                "title": "Новое",
                "editTitle": "Редактировать",
                "name": "Имя",
                "namePlaceholder": "Напр. Жим",
                "group": "Группа",
                "youtube": "YouTube (опционально)",
                "image": "Фото (опционально)",
                "max1rm": "Текущий 1RM (кг)",
                "repsHyp": "Повт. (Гипер)",
                "repsHea": "Повт. (Тяжелые)",
                "repsInt": "Повт. (Инт.)",
                "save": "Сохранить",
                "prHyp": "PR (Гипертрофия)",
                "prHeavy": "PR (Тяжелые)"
            },
            "dropset": {
                "title": "Калькулятор Дропсета",
                "currentWeight": "Текущий вес:"
            },
            "inlineHistory": {
                "title": "История Упражнения"
            }
        },
        "evolution": {
            "measurementsTitle": "Размеры Тела (см)",
            "newRecord": "Новая Запись",
            "saveRecord": "Сохранить",
            "m1": "1. Грудь",
            "m2": "2. Лев. Рука",
            "m3": "3. Прав. Рука",
            "m4": "4. Живот",
            "m5": "5. Талия",
            "m6": "6. Бедра",
            "m7": "7. Лев. Нога",
            "m8": "8. Прав. Нога",
            "desc": "Регистрируйте и наблюдайте за своими физическими изменениями, размерами тела, весом и процентом жира с течением времени.",
            "weightPlaceholder": "Вес (кг)",
            "bfPlaceholder": "% Жира",
            "photosLabel": "Фото (Спереди, Сбоку, Сзади)"
        },
        "export": {
            "desc": "Сохраните копию ваших данных.",
            "exportBtn": "Экспорт (JSON)",
            "importBtn": "Импорт (JSON)",
            "modes": {
                "single": "Отдельные",
                "block": "Блоки",
                "calendar": "Календарь"
            },
            "selected": "выбрано",
            "deselectAll": "Снять все",
            "selectDesc": "Выберите тренировки, которые вы хотите экспортировать.",
            "printPdf": "Печать / Сохранить PDF",
            "exportPlanned": "Экспорт Сессий",
            "importPlanned": "Импорт Сессий"
        },
        "groups": {
            "espalda": "Спина",
            "hombro": "Плечи",
            "pecho": "Грудь",
            "triceps": "Трицепс",
            "biceps": "Бицепс",
            "multiarticular": "Базовые",
            "piernas": "Ноги",
            "core": "Пресс и Кор",
            "todos": "Все"
        },
        "language": {
            "select": "Выбрать Язык"
        },
        "misc": {
            "supersetOf": "Суперсет",
            "groupUnassigned": "Без Группы",
            "steps": "Шаги"
        },
        "progression": {
            "searchPlaceholder": "Поиск упражнения..."
        }
    },
    "et": {
        "setTypes": {
            "warmup": "Soojendus",
            "approach": "Lähenemine",
            "effective": "Efektiivne",
            "failure": "Suutlikkuseni",
            "dropset": "Dropset",
            "dropsetFailure": "Dropset suutlikkuseni"
        },
        "nav": {
            "calendar": "Kalender",
            "exercises": "Harjutused",
            "history": "Ajalugu",
            "workout": "Treening",
            "progression": "Progress",
            "evolution": "Evolutsioon",
            "export": "Eksp / Imp"
        },
        "header": {
            "title": "Kalender",
            "calendar": "Kalender",
            "exercises": "Harjutused",
            "history": "Ajalugu",
            "workout": "Treening",
            "workoutActive": "Aktiivne Treening",
            "progression": "Progress",
            "evolution": "Evolutsioon",
            "export": "Eksport/Import"
        },
        "calendar": {
            "today": "Täna",
            "dayPlan": "Päeva plaan",
            "selectDay": "Vali päev",
            "week": "Nädal",
            "months": [
                "Jaanuar",
                "Veebruar",
                "Märts",
                "Aprill",
                "Mai",
                "Juuni",
                "Juuli",
                "August",
                "September",
                "Oktoober",
                "November",
                "Detsember"
            ],
            "days": [
                "E",
                "T",
                "K",
                "N",
                "R",
                "L",
                "P"
            ],
            "createSession": "Loo Sessioon",
            "editMode": "Muutmisrežiim",
            "viewMode": "Vaaterežiim",
            "emptyDay": "Selleks päevaks pole treeninguid."
        },
        "exercises": {
            "search": "Otsi...",
            "empty": "Harjutusi pole. Lisa."
        },
        "history": {
            "title": "Treeningute Ajalugu",
            "empty": "Pole treeninguid.",
            "deleteAllConfirm": "Kustuta kõik treeningud ajaloost? Seda ei saa tagasi võtta."
        },
        "workout": {
            "title": "Treening",
            "start": "Alusta",
            "finish": "Lõpeta Treening",
            "finishConfirm": "Lõpeta?",
            "sets": "Seeriad",
            "series": "Seeria",
            "addSet": "Lisa seeria",
            "cancel": "Tühista",
            "replaceConfirm": "Aktiivne treening on olemas. Kas tühistada?",
            "cancelConfirm": "Oled kindel? Andmed kaovad."
        },
        "common": {
            "cancel": "Tühista",
            "add": "Lisa",
            "delete": "Kustuta",
            "confirm": "Kinnita",
            "edit": "Muuda",
            "save": "Salvesta",
            "yes": "Jah",
            "no": "Ei",
            "ok": "OK",
            "create": "Loo",
            "deleteAll": "Kustuta Kõik"
        },
        "types": {
            "hypertrophy": "Hüpertroofia",
            "heavy": "Rasked",
            "intensity": "Kõrge Int.",
            "workout": "Treening",
            "goal": "Sammud"
        },
        "alerts": {
            "noActiveWorkout": "Aktiivset treeningut ei ole.",
            "nameRequired": "Sisesta nimi",
            "supersetMin": "Vali vähemalt 2.",
            "exerciseRequired": "Vali harjutus.",
            "weightRequired": "Sisesta kaal.",
            "saveError": "Viga salvestamisel: ",
            "backupSuccess": "Varukoopia tehtud.",
            "exportError": "Viga eksportimisel: ",
            "importSuccess": "Andmed imporditud. Taaskäivitus.",
            "readError": "Viga faili lugemisel: ",
            "exportMin": "Vali treening.",
            "exportNotFound": "Ei leitud.",
            "workoutFinished": "Treening lõpetatud! Aeg: "
        },
        "modals": {
            "add": {
                "title": "Mida lisada?",
                "block": "4-Nädalane Plokk",
                "workout": "Treening (Täna)",
                "goal": "Sammud (Täna)"
            },
            "delete": {
                "title": "Kustuta",
                "single": "Ainult see",
                "recurring": "See ja tulevased",
                "confirm": "Kustuta?"
            },
            "goal": {
                "title": "Sammude Eesmärk",
                "desc": "Märgi siia.",
                "label": "Eesmärk (nt 10000)",
                "save": "Salvesta",
                "reached": "Saavutatud!"
            },
            "picker": {
                "title": "Mine Kuupäevale"
            },
            "groups": {
                "title": "Halda Gruppe",
                "new": "Uus Grupp...",
                "espalda": "Selg",
                "hombro": "Õlad",
                "pecho": "Rind",
                "triceps": "Triitseps",
                "biceps": "Biitseps",
                "multiarticular": "Mitme liigese",
                "piernas": "Jalad",
                "core": "Kõht & Tuum",
                "todos": "Kõik"
            },
            "routine": {
                "title": "Lisa Plokk",
                "type": "Tüüp",
                "name": "Nimi",
                "namePlaceholder": "Nt Raske Ülakeha",
                "selected": "Valitud",
                "selectBtn": "Vali",
                "createSuperset": "Loo Superset",
                "schedule": "Plaani"
            },
            "selectEx": {
                "title": "Vali Harjutused"
            },
            "exercise": {
                "title": "Uus Harjutus",
                "editTitle": "Muuda Harjutust",
                "name": "Nimi",
                "namePlaceholder": "Nt Rinnaltsurumine",
                "group": "Grupp",
                "youtube": "YouTube (valikuline)",
                "image": "Pilt (valikuline)",
                "max1rm": "Praegune 1RM (kg)",
                "repsHyp": "Kord. (Hüper)",
                "repsHea": "Kord. (Rasked)",
                "repsInt": "Kord. (Int.)",
                "save": "Salvesta",
                "prHyp": "PR (Hüpertroofia)",
                "prHeavy": "PR (Raske)"
            },
            "dropset": {
                "title": "Dropset Kalkulaator",
                "currentWeight": "Praegune kaal:"
            },
            "inlineHistory": {
                "title": "Harjutuse Ajalugu"
            }
        },
        "evolution": {
            "measurementsTitle": "Kehamõõdud (cm)",
            "newRecord": "Uus Kirje",
            "saveRecord": "Salvesta",
            "m1": "1. Rind",
            "m2": "2. Vasak Käsi",
            "m3": "3. Parem Käsi",
            "m4": "4. Kõht",
            "m5": "5. Vöö",
            "m6": "6. Puusad",
            "m7": "7. Vasak Jalg",
            "m8": "8. Parem Jalg",
            "desc": "Salvestage ja jälgige oma füüsilisi muutusi, kehamõõte, kaalu ja keharasva protsenti ajas.",
            "weightPlaceholder": "Kaal (kg)",
            "bfPlaceholder": "Rasvaprotsent",
            "photosLabel": "Fotod (Eest, Küljelt, Tagant)"
        },
        "export": {
            "desc": "Salvesta oma andmete koopia.",
            "exportBtn": "Eksport (JSON)",
            "importBtn": "Import (JSON)",
            "modes": {
                "single": "Üksikud",
                "block": "Plokid",
                "calendar": "Kalender"
            },
            "selected": "valitud",
            "deselectAll": "Tühista kõik",
            "selectDesc": "Valige treeningud, mida soovite eksportida.",
            "printPdf": "Prindi / Salvesta PDF",
            "exportPlanned": "Ekspordi Sess.",
            "importPlanned": "Impordi Sess."
        },
        "groups": {
            "espalda": "Selg",
            "hombro": "Õlad",
            "pecho": "Rind",
            "triceps": "Triitseps",
            "biceps": "Biitseps",
            "multiarticular": "Mitme liigese",
            "piernas": "Jalad",
            "core": "Kõht & Tuum",
            "todos": "Kõik"
        },
        "language": {
            "select": "Vali Keel"
        },
        "misc": {
            "supersetOf": "Superset",
            "groupUnassigned": "Määramata",
            "steps": "Sammud"
        },
        "progression": {
            "searchPlaceholder": "Otsi harjutust..."
        }
    },
    "uk": {
        "setTypes": {
            "warmup": "Розминка",
            "approach": "Підвідний",
            "effective": "Робочий",
            "failure": "До відмови",
            "dropset": "Дропсет",
            "dropsetFailure": "Дропсет відмова"
        },
        "nav": {
            "calendar": "Календар",
            "exercises": "Вправи",
            "history": "Історія",
            "workout": "Тренування",
            "progression": "Прогрес",
            "evolution": "Еволюція",
            "export": "Експ / Імп"
        },
        "header": {
            "title": "Календар",
            "calendar": "Календар",
            "exercises": "Вправи",
            "history": "Історія",
            "workout": "Тренування",
            "workoutActive": "Тренування",
            "progression": "Прогрес",
            "evolution": "Еволюція",
            "export": "Експорт/Імпорт"
        },
        "calendar": {
            "today": "Сьогодні",
            "dayPlan": "План на день",
            "selectDay": "Виберіть день",
            "week": "Тиждень",
            "months": [
                "Січень",
                "Лютий",
                "Березень",
                "Квітень",
                "Травень",
                "Червень",
                "Липень",
                "Серпень",
                "Вересень",
                "Жовтень",
                "Листопад",
                "Грудень"
            ],
            "days": [
                "П",
                "В",
                "С",
                "Ч",
                "П",
                "С",
                "Н"
            ],
            "createSession": "Створити",
            "editMode": "Режим ред.",
            "viewMode": "Режим чит.",
            "emptyDay": "Немає тренувань на цей день."
        },
        "exercises": {
            "search": "Пошук...",
            "empty": "Немає вправ. Додайте."
        },
        "history": {
            "title": "Історія Тренувань",
            "empty": "Поки немає тренувань.",
            "deleteAllConfirm": "Видалити всі тренування з історії? Це неможливо скасувати."
        },
        "workout": {
            "title": "Тренування",
            "start": "Почати",
            "finish": "Завершити",
            "finishConfirm": "Завершити?",
            "sets": "Підходи",
            "series": "Підхід",
            "addSet": "Додати підхід",
            "cancel": "Скасувати",
            "replaceConfirm": "Є активне. Замінити?",
            "cancelConfirm": "Скасувати? Дані будуть втрачені."
        },
        "common": {
            "cancel": "Скасувати",
            "add": "Додати",
            "delete": "Видалити",
            "confirm": "Підтвердити",
            "edit": "Редагувати",
            "save": "Зберегти",
            "yes": "Так",
            "no": "Ні",
            "ok": "ОК",
            "create": "Створити",
            "deleteAll": "Видалити Всі"
        },
        "types": {
            "hypertrophy": "Гіпертрофія",
            "heavy": "Важкі",
            "intensity": "Вис. Інт.",
            "workout": "Тренування",
            "goal": "Кроки"
        },
        "alerts": {
            "noActiveWorkout": "Немає активного тренування.",
            "nameRequired": "Введіть ім'я",
            "supersetMin": "Мін 2 вправи.",
            "exerciseRequired": "Виберіть хоча б одну.",
            "weightRequired": "Введіть вагу.",
            "saveError": "Помилка збереження: ",
            "backupSuccess": "Резервну копію збережено.",
            "exportError": "Помилка експорту: ",
            "importSuccess": "Дані імпортовано. Перезапуск.",
            "readError": "Помилка читання: ",
            "exportMin": "Виберіть тренування.",
            "exportNotFound": "Не знайдено.",
            "workoutFinished": "Тренування завершено! Час: "
        },
        "modals": {
            "add": {
                "title": "Що додати?",
                "block": "4-тижневий блок",
                "workout": "Тренування (Сьогодні)",
                "goal": "Кроки (Сьогодні)"
            },
            "delete": {
                "title": "Видалити",
                "single": "Тільки цю",
                "recurring": "Цю і майбутні",
                "confirm": "Видалити?"
            },
            "goal": {
                "title": "Ціль Кроків",
                "desc": "Вкажіть кроки тут.",
                "label": "Ціль (напр. 10000)",
                "save": "Зберегти",
                "reached": "Ціль Досягнуто!"
            },
            "picker": {
                "title": "Перейти до Дати"
            },
            "groups": {
                "title": "Управління Групами",
                "new": "Нова Група...",
                "espalda": "Спина",
                "hombro": "Плечі",
                "pecho": "Груди",
                "triceps": "Трицепс",
                "biceps": "Біцепс",
                "multiarticular": "Базові",
                "piernas": "Ноги",
                "core": "Прес і Кор",
                "todos": "Всі"
            },
            "routine": {
                "title": "Додати Блок",
                "type": "Тип",
                "name": "Ім'я",
                "namePlaceholder": "Напр. Важкий верх",
                "selected": "Вибрано",
                "selectBtn": "Вибрати",
                "createSuperset": "Створити Суперсет",
                "schedule": "Запланувати"
            },
            "selectEx": {
                "title": "Виберіть Вправи"
            },
            "exercise": {
                "title": "Нова Вправа",
                "editTitle": "Редагувати",
                "name": "Ім'я",
                "namePlaceholder": "Напр. Жим",
                "group": "Група",
                "youtube": "YouTube (необов'язково)",
                "image": "Фото (необов'язково)",
                "max1rm": "Поточний 1RM (кг)",
                "repsHyp": "Повт. (Гіпер)",
                "repsHea": "Повт. (Важкі)",
                "repsInt": "Повт. (Інт.)",
                "save": "Зберегти",
                "prHyp": "PR (Гіпертрофія)",
                "prHeavy": "PR (Важкі)"
            },
            "dropset": {
                "title": "Калькулятор Дропсету",
                "currentWeight": "Поточна вага:"
            },
            "inlineHistory": {
                "title": "Історія Вправи"
            }
        },
        "evolution": {
            "measurementsTitle": "Розміри Тіла (см)",
            "newRecord": "Новий Запис",
            "saveRecord": "Зберегти",
            "m1": "1. Груди",
            "m2": "2. Лів. Рука",
            "m3": "3. Прав. Рука",
            "m4": "4. Живіт",
            "m5": "5. Талія",
            "m6": "6. Стегна",
            "m7": "7. Лів. Нога",
            "m8": "8. Прав. Нога",
            "desc": "Реєструйте та спостерігайте за своїми фізичними змінами, розмірами тіла, вагою та відсотком жиру з часом.",
            "weightPlaceholder": "Вага (кг)",
            "bfPlaceholder": "% Жиру",
            "photosLabel": "Фото (Спереду, Збоку, Ззаду)"
        },
        "export": {
            "desc": "Збережіть копію ваших даних.",
            "exportBtn": "Експорт (JSON)",
            "importBtn": "Імпорт (JSON)",
            "modes": {
                "single": "Окремі",
                "block": "Блоки",
                "calendar": "Календар"
            },
            "selected": "вибрано",
            "deselectAll": "Зняти всі",
            "selectDesc": "Виберіть тренування, які ви хочете експортувати.",
            "printPdf": "Друк / Зберегти PDF",
            "exportPlanned": "Експорт Сесій",
            "importPlanned": "Імпорт Сесій"
        },
        "groups": {
            "espalda": "Спина",
            "hombro": "Плечі",
            "pecho": "Груди",
            "triceps": "Трицепс",
            "biceps": "Біцепс",
            "multiarticular": "Базові",
            "piernas": "Ноги",
            "core": "Прес і Кор",
            "todos": "Всі"
        },
        "language": {
            "select": "Вибрати Мову"
        },
        "misc": {
            "supersetOf": "Суперсет",
            "groupUnassigned": "Без Групи",
            "steps": "Кроки"
        },
        "progression": {
            "searchPlaceholder": "Пошук вправи..."
        }
    }
};

const getSetTypeT = (str) => {
    const map = {
        'Calentamiento': 'warmup', 'Aproximación': 'approach', 'Efectiva': 'effective',
        'Al fallo': 'failure', 'Dropset': 'dropset', 'Dropset fallo': 'dropsetFailure'
    };
    if (map[str]) return getT('setTypes.' + map[str]);
    return str;
};

const getT = (path) => {
    const keys = path.split('.');
    let result = translations[state.language];
    for (const key of keys) {
        if (result === undefined) return path;
        result = result[key];
    }
    return result || path;
};


const formatSessionName = (name) => {
    if (!name) return name;
    // Match " (Week 1)", " (Semana 2)", etc. at the end of the string
    return name.replace(/\s+\(([^)]+)\s+(\d+)\)$/, (match, word, num) => {
        return ' (' + getT('calendar.week') + ' ' + num + ')';
    });
};

const updateLanguageUI = () => {
    try {
        document.documentElement.lang = state.language;
        const flagMap = { 'es': 'ES', 'en': 'EN', 'ru': 'RU', 'et': 'ET', 'uk': 'UA' };
        const textElem = document.getElementById('current-lang-text');
        if(textElem) textElem.textContent = flagMap[state.language] || state.language.toUpperCase();
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                const text = getT(key);
                if (text && text !== key) {
                    el.innerHTML = text;
                }
            }
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key) {
                const text = getT(key);
                if (text && text !== key) {
                    el.setAttribute('placeholder', text);
                }
            }
        });

        // Force header update
        const activeView = document.querySelector('.view.active');
        const headerTitle = document.getElementById('header-title');
        if (activeView && headerTitle) {
            const viewId = activeView.id;
            if(viewId === 'view-workout' && state.activeWorkoutState && state.activeWorkoutState.startTime) {
                headerTitle.textContent = getT('header.workoutActive');
            } else {
                headerTitle.textContent = getT('header.' + viewId.replace('view-', ''));
            }
            if (viewId === 'view-exercises') {
                const headerAction = document.getElementById('header-action');
                if (headerAction) {
                    headerAction.innerHTML = `<i class="ph ph-plus"></i> <span style="font-size:14px; font-weight:600; margin-left:4px;">${getT('modals.exercise.title')}</span>`;
                }
            }
        }
    } catch (e) {
        console.error('Language UI update error: ', e);
    }
};


const renderCalendar = () => {
    const grid = document.getElementById('weekly-grid');
    grid.innerHTML = '';
    
    const weekStart = new Date(state.currentWeekStart);
    const monthNamesFull = getT('calendar.months');
    const thurs = new Date(weekStart);
    thurs.setDate(thurs.getDate() + 3);
    
    document.getElementById('current-month-year').textContent = `${monthNamesFull[thurs.getMonth()]}, ${thurs.getFullYear()}`;
    document.getElementById('current-week-label').textContent = `${getT("calendar.week")} ${getWeekNumber(thurs)}`;
    
    const dayNames = getT("calendar.days");
    const todayStr = formatDate(new Date());

    // Restore selected date
    const selectedDateStr = formatDate(state.selectedDate);
    
    for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        const dStr = formatDate(d);
        
        const cell = document.createElement('div');
        cell.classList.add('weekly-day');
        if (dStr === todayStr) cell.classList.add('today');
        if (dStr === selectedDateStr) cell.classList.add('selected');
        
        cell.innerHTML = `
            <div class="day-name">${dayNames[i]}</div>
            <div class="day-num">${d.getDate()}</div>
        `;
        
        const daySessions = state.sessions.filter(s => s.date === dStr);
        if (daySessions.length > 0) {
            const indContainer = document.createElement('div');
            indContainer.classList.add('indicators-flex');
            const uniqueTypes = [...new Set(daySessions.map(s => s.type))];
            uniqueTypes.forEach(type => {
                const indicator = document.createElement('div');
                indicator.classList.add('day-indicator', `indicator-${type}`);
                indContainer.appendChild(indicator);
            });
            cell.appendChild(indContainer);
            
            const colors = [];
                if(daySessions.some(s => s.type === 'hypertrophy')) colors.push('#2563EB');
                if(daySessions.some(s => s.type === 'heavy')) colors.push('#DC2626');
                if(daySessions.some(s => s.type === 'intensity')) colors.push('#10B981');
                
                if (colors.length === 1) {
                    cell.style.border = '2px solid ' + colors[0];
                } else if (colors.length > 1) {
                    const gradient = colors.join(', ');
                    cell.style.border = '2px solid transparent';
                    const bg = cell.classList.contains('today') ? 'var(--color-hypertrophy-glow)' : 'var(--bg-surface)';
                    cell.style.background = `linear-gradient(${bg}, ${bg}) padding-box, linear-gradient(to bottom right, ${gradient}) border-box`;
                }
        }
        cell.addEventListener('click', () => {
            state.selectedDate = d;
            renderCalendar();
        });
        
        grid.appendChild(cell);
    }
    
    renderTodaySessions();
};

document.getElementById('prev-week').addEventListener('click', () => {
    state.currentWeekStart.setDate(state.currentWeekStart.getDate() - 7);
    const offset = state.selectedDate.getDay() === 0 ? 6 : state.selectedDate.getDay() - 1;
    state.selectedDate = new Date(state.currentWeekStart);
    state.selectedDate.setDate(state.selectedDate.getDate() + offset);
    renderCalendar();
});
document.getElementById('next-week').addEventListener('click', () => {
    state.currentWeekStart.setDate(state.currentWeekStart.getDate() + 7);
    const offset = state.selectedDate.getDay() === 0 ? 6 : state.selectedDate.getDay() - 1;
    state.selectedDate = new Date(state.currentWeekStart);
    state.selectedDate.setDate(state.selectedDate.getDate() + offset);
    renderCalendar();
});

const renderTodaySessions = () => {
    const list = document.getElementById('day-sessions-list');
    list.innerHTML = '';
    
    const dateStr = formatDate(state.selectedDate);
    const daySessions = state.sessions.filter(s => s.date === dateStr);
    
    if (daySessions.length === 0) {
        list.innerHTML = `<div class="empty-state">${getT('calendar.emptyDay') || 'No hay entrenamientos para este día.'}</div>`;
        return;
    }
    
    daySessions.forEach(session => {
        const card = document.createElement('div');
        card.classList.add('session-card', `type-${session.type}`);
        
        let typeName = getT('types.' + session.type);
        
        card.innerHTML = `
            <div class="session-info">
                <h4 style="${session.completed ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${session.name}</h4>
                <p>${typeName}</p>
            </div>
            <div class="session-action" style="display:flex; align-items:center; gap:8px;">
                ${state.calendarEditMode ? `<button class="btn-icon edit-session-btn" style="color:var(--text-primary);"><i class="ph ph-pencil-simple"></i></button>` : ''}
                <button class="btn-icon delete-session-btn" style="color:var(--color-heavy);"><i class="ph ph-trash"></i></button>
                <i class="${session.completed ? 'ph-check-circle' : session.type === 'goal' ? 'ph-circle' : 'ph-play-circle'}" style="${session.completed ? 'color: var(--color-intensity); font-size:24px;' : 'font-size:24px;'}"></i>
            </div>
        `;
        
        card.querySelector('.delete-session-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            sessionToDelete = session;
            openModal(modalDeleteSession);
        });
        
        if (state.calendarEditMode) {
            card.querySelector('.edit-session-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                editSession(session.id);
            });
        }
        
        card.addEventListener('click', () => {
            if (session.type === 'goal') {
                if(!session.completed) {
                    if(confirm('¿Marcar objetivo diario como completado?')) {
                        session.completed = true;
                        saveState();
                        renderCalendar();
                    }
                }
            } else {
                startWorkout(session);
            }
        });
        list.appendChild(card);
    });
};

// --- EXERCISES GROUPS MANAGER ---
const renderManageGroups = () => {
    const ul = document.getElementById('groups-manage-list');
    ul.innerHTML = '';
    state.groups.forEach(g => {
        ul.innerHTML += `
            <li style="display:flex; justify-content:space-between; padding:12px; background:var(--bg-surface-elevated); margin-bottom:8px; border-radius:8px;">
                <span>${g}</span>
                ${g !== 'Sin Grupo' ? `<button class="btn-icon" onclick="deleteGroup('${g}')"><i class="ph ph-trash"></i></button>` : ''}
            </li>
        `;
    });
};
document.getElementById('btn-manage-groups').addEventListener('click', () => {
    renderManageGroups();
    openModal(modalManageGroups);
});
document.getElementById('btn-add-group').addEventListener('click', () => {
    const name = document.getElementById('new-group-name').value.trim();
    if(name && !state.groups.includes(name)) {
        state.groups.push(name);
        saveState();
        renderManageGroups();
        document.getElementById('new-group-name').value = '';
    }
});
window.deleteGroup = (g) => {
    state.groups = state.groups.filter(x => x !== g);
    state.exercises.forEach(ex => {
        if(ex.group === g) ex.group = 'Sin Grupo';
    });
    saveState();
    renderManageGroups();
    renderExercises();
};

// EXCEL IMPORT
document.getElementById('btn-import-excel').addEventListener('click', () => {
    document.getElementById('input-import-excel').click();
});

document.getElementById('input-import-excel').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            let importedCount = 0;
            // Assumes row 0 is header: Grupo | Nombre | Hipertrofia | Pesado | Alta Int
            for (let i = 1; i < json.length; i++) {
                const row = json[i];
                if (!row || row.length < 2) continue; // Requires at least group and name
                
                const groupName = (row[0] || 'Sin Grupo').toString().trim();
                const exName = (row[1] || '').toString().trim();
                const repsHyp = (row[2] !== undefined ? row[2] : '10').toString().trim();
                const repsHeavy = (row[3] !== undefined ? row[3] : '5').toString().trim();
                const repsInt = (row[4] !== undefined ? row[4] : '8-12 + Fallo').toString().trim();
                
                if (!exName) continue;
                
                if (!state.groups.includes(groupName)) {
                    state.groups.push(groupName);
                }
                
                const existing = state.exercises.find(ex => ex.name.toLowerCase() === exName.toLowerCase());
                if (existing) {
                    existing.group = groupName;
                    existing.defaults = { hypertrophy: repsHyp, heavy: repsHeavy, intensity: repsInt };
                } else {
                    state.exercises.push({
                        id: Date.now().toString() + i,
                        name: exName,
                        group: groupName,
                        youtubeLink: '',
                        imageData: '',
                        max1RM: '',
                        defaults: { hypertrophy: repsHyp, heavy: repsHeavy, intensity: repsInt }
                    });
                }
                importedCount++;
            }
            
            saveState();
            renderExercises();
            alert(`¡Importación completada! Se procesaron ${importedCount} ejercicios.`);
        } catch(err) {
            alert('Error al leer el Excel. Asegúrate de usar la plantilla correcta.');
            console.error(err);
        }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = ''; // Reset input
});

// --- EXERCISES RENDER ---
const renderExercises = () => {
    if(typeof recalculatePRs !== 'undefined') recalculatePRs();
    const container = document.querySelector('.exercise-groups-container');
    container.innerHTML = '';
    
    if (state.exercises.length === 0) {
        container.innerHTML = `<div class="empty-state" data-i18n="exercises.empty">No hay ejercicios. Añade uno nuevo.</div>`;
        return;
    }
    
    // Group grid
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    grid.style.gap = '8px';
    grid.style.marginBottom = '24px';
    
    state.groups.forEach(g => {
        const card = document.createElement('div');
        let gKey = g === 'Abdominales y core' ? 'core' : (g === 'Tríceps' ? 'triceps' : (g === 'Bíceps' ? 'biceps' : g.toLowerCase()));
        let trGroup = getT('groups.' + gKey);
        trGroup = trGroup !== 'groups.' + g.toLowerCase() ? trGroup : g;
        card.style.background = window.exercisesSelectedGroup === g ? 'var(--color-accent)' : 'var(--bg-surface-elevated)';
        card.style.color = window.exercisesSelectedGroup === g ? '#fff' : 'var(--text-primary)';
        card.style.padding = '12px 8px';
        card.style.borderRadius = '8px';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.style.cursor = 'pointer';
        card.style.textAlign = 'center';
        card.style.border = '1px solid var(--border-color)';
        
        card.innerHTML = `<span style="font-size: 26px; margin-bottom: 6px; display: block; line-height: 1;">${typeof getGroupEmoji !== 'undefined' ? getGroupEmoji(g) : '🏋️'}</span><span style="font-size:12px; font-weight:600;">${trGroup}</span>`;

        
        card.onclick = () => {
            window.exercisesSelectedGroup = window.exercisesSelectedGroup === g ? null : g;
            renderExercises();
        };
        grid.appendChild(card);
    });
    container.appendChild(grid);
    
    const exListContainer = document.createElement('div');
    exListContainer.className = 'exercises-list';
    
    let filteredEx = state.exercises;
    if (window.exercisesSelectedGroup) {
        filteredEx = filteredEx.filter(ex => ex.group === window.exercisesSelectedGroup);
    }
    const searchVal = document.getElementById('exercise-search').value.toLowerCase();
    if (searchVal) {
        filteredEx = filteredEx.filter(ex => ex.name.toLowerCase().includes(searchVal) || getTrExName(ex.name).toLowerCase().includes(searchVal));
    }
    
    // Sort alphabetically by translated name
    filteredEx.sort((a, b) => getTrExName(a.name).localeCompare(getTrExName(b.name)));
    
    if (filteredEx.length === 0) {
        exListContainer.innerHTML = `<div class="empty-state">No hay ejercicios para esta selección.</div>`;
    } else {
        filteredEx.forEach(ex => {
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.style.cursor = 'pointer';
            card.onclick = (e) => {
                if(e.target.closest('button')) return;
                editExercise(ex);
            };
            card.innerHTML = `
                <div class="exercise-info">
                    <h3 class="exercise-name">${getTrExName(ex.name)}</h3>
                    <div class="exercise-group-label" style="font-size:12px; opacity:0.8; margin-top:2px;">${ex.group}</div>
                    <div class="exercise-prs" style="margin-top: 8px;">
                        <span class="pr-badge pr-hypertrophy">PR Hipertrofia: ${ex.prs && ex.prs.hypertrophy ? ex.prs.hypertrophy.weight + 'kg x ' + ex.prs.hypertrophy.reps : '-'}</span>
                        <span class="pr-badge pr-heavy">PR Pesado: ${ex.prs && ex.prs.heavy ? ex.prs.heavy.weight + 'kg x ' + ex.prs.heavy.reps : '-'}</span>
                    </div>
                </div>
                ${ex.imageData ? `<div style="flex-shrink: 0; margin-left: 12px; margin-right: auto;"><img src="${ex.imageData}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-color);"></div>` : ''}
                <div class="exercise-actions">
                    <button class="btn-icon" onclick="deleteExercise('${ex.id}')" style="color: var(--color-heavy);"><i class="ph ph-trash"></i></button>
                </div>
            `;
            exListContainer.appendChild(card);
        });
    }
    container.appendChild(exListContainer);
    if(typeof updateLanguageUI !== 'undefined') updateLanguageUI();
};


document.getElementById('btn-remove-exercise-image').addEventListener('click', () => {
    document.getElementById('exercise-image').value = '';
    document.getElementById('exercise-image-data').value = '';
    document.getElementById('exercise-image-preview').style.display = 'none';
    document.getElementById('btn-remove-exercise-image').style.display = 'none';
});
document.getElementById('exercise-image').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 400;
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6); 
            document.getElementById('exercise-image-data').value = dataUrl;
            
            const preview = document.getElementById('exercise-image-preview');
            preview.src = dataUrl;
            preview.style.display = 'block';
        document.getElementById('btn-remove-exercise-image').style.display = 'flex';
            document.getElementById('btn-remove-exercise-image').style.display = 'flex';
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

const editExercise = (ex) => {
    document.getElementById('exercise-id').value = ex.id;
    document.getElementById('exercise-name').value = ex.name;
    document.getElementById('exercise-youtube').value = ex.youtubeLink || '';
    
    const max1rmEl = document.getElementById('exercise-max1rm');
    if (max1rmEl) max1rmEl.value = ex.max1RM || '';
    const prHypEl = document.getElementById('exercise-pr-hyp');
    if (prHypEl) prHypEl.value = ex.prHyp || '';
    const prHeavyEl = document.getElementById('exercise-pr-heavy');
    if (prHeavyEl) prHeavyEl.value = ex.prHeavy || '';
    
    const select = document.getElementById('exercise-group');
    select.innerHTML = '';
    state.groups.forEach(g => {
        let gKey = g === 'Abdominales y core' ? 'core' : (g === 'Tríceps' ? 'triceps' : (g === 'Bíceps' ? 'biceps' : g.toLowerCase()));
        let trGroup = getT('groups.' + gKey);
        trGroup = trGroup !== 'groups.' + g.toLowerCase() ? trGroup : g;
        select.innerHTML += `<option value="${g}" ${ex.group === g ? 'selected' : ''}>${trGroup}</option>`;
    });
    
    const imgData = ex.imageData || '';
    document.getElementById('exercise-image-data').value = imgData;
    const preview = document.getElementById('exercise-image-preview');
    if (imgData) {
        preview.src = imgData;
        preview.style.display = 'block';
        document.getElementById('btn-remove-exercise-image').style.display = 'flex';
    } else {
        preview.style.display = 'none';
        document.getElementById('btn-remove-exercise-image').style.display = 'none';
    }
    
    document.getElementById('exercise-reps-hypertrophy').value = ex.defaults ? ex.defaults.hypertrophy : '10';
    document.getElementById('exercise-reps-heavy').value = ex.defaults ? ex.defaults.heavy : '5';
    document.getElementById('exercise-reps-intensity').value = ex.defaults ? ex.defaults.intensity : '8';
    
    document.getElementById('btn-delete-exercise').style.display = 'block';
    
    document.getElementById('modal-exercise-title').textContent = getT('modals.exercise.editTitle');
    openModal(modalExercise);
};

document.getElementById('btn-delete-exercise').addEventListener('click', () => {
    const id = document.getElementById('exercise-id').value;
    if (id && confirm(getT('common.delete') + '?')) {
        state.exercises = state.exercises.filter(e => e.id !== id);
        saveState();
        closeModal(modalExercise);
        renderExercises();
    }
});

document.getElementById('btn-save-exercise').addEventListener('click', () => {
    const id = document.getElementById('exercise-id').value;
    const name = document.getElementById('exercise-name').value;
    const group = document.getElementById('exercise-group').value || 'Sin Grupo';
    const yLink = document.getElementById('exercise-youtube').value;
    const iData = document.getElementById('exercise-image-data').value;
    
    const max1rmEl = document.getElementById('exercise-max1rm');
    const max1rm = max1rmEl ? max1rmEl.value : '';
    const prHypEl = document.getElementById('exercise-pr-hyp');
    const prHyp = prHypEl ? prHypEl.value : '';
    const prHeavyEl = document.getElementById('exercise-pr-heavy');
    const prHeavy = prHeavyEl ? prHeavyEl.value : '';
    
    const rH = document.getElementById('exercise-reps-hypertrophy').value;
    const rHe = document.getElementById('exercise-reps-heavy').value;
    const rI = document.getElementById('exercise-reps-intensity').value;
    
    if (!name) return alert(getT('alerts.nameRequired') || 'Exercise name required');
    
    if (id) {
        const ex = state.exercises.find(e => e.id === id);
        if (ex) {
            ex.name = name;
            ex.group = group;
            ex.youtubeLink = yLink;
            ex.imageData = iData;
            ex.max1RM = max1rm;
            ex.prHyp = prHyp;
            ex.prHeavy = prHeavy;
            ex.defaults = { hypertrophy: rH, heavy: rHe, intensity: rI };
        }
    } else {
        state.exercises.push({
            id: Date.now().toString(),
            name, group, youtubeLink: yLink, imageData: iData,
            defaults: { hypertrophy: rH, heavy: rHe, intensity: rI },
            max1RM: max1rm, prHyp: prHyp, prHeavy: prHeavy
        });
    }
    
    saveState();
    closeModal(modalExercise);
    renderExercises();
});

// --- ADD ROUTINE & EXERCISE SELECTION ---
const typeBtns = document.querySelectorAll('.type-btn');
let selectedBlockType = 'hypertrophy';
typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedBlockType = btn.dataset.type;
        
        // Update all existing items to new target reps and recalculate rest times
        routineItems.forEach(item => {
            item.exercises.forEach(ex => {
                ex.sets.forEach(set => {
                    if(set.type === 'Calentamiento' || set.type === 'Aproximación') {
                        // ignore, those are fixed usually? Wait, earlier we used defaults.
                        // Actually let's just update all reps to defaults[selectedBlockType] if they match old defaults?
                        // Or just override all 'Efectiva'/'Al fallo'/'Dropset' with new defaults.
                    }
                    if(['Efectiva', 'Al fallo', 'Dropset', 'Dropset fallo'].includes(set.type)) {
                        set.reps = ex.dbEx.defaults[selectedBlockType] || '';
                    }
                });
            });
        });
        renderRoutineItems(); // re-render to update rest times and placeholders
    });
});
document.querySelector('.type-btn.hypertrophy').classList.add('selected');

let routineItems = []; // { id, isSuperset, name, exercises: [ {exerciseId, dbEx} ] }
let supersetCounter = 1;

document.getElementById('btn-open-exercise-selector').addEventListener('click', () => {
    const list = document.getElementById('exercise-selection-list');
    list.innerHTML = '';
    
    const grouped = {};
    state.exercises.forEach(ex => {
        const g = ex.group || 'Sin Grupo';
        if (!grouped[g]) grouped[g] = [];
        grouped[g].push(ex);
    });
    
    const groupKeys = Object.keys(grouped).sort((a, b) => {
        if (a === 'Sin Grupo') return 1;
        if (b === 'Sin Grupo') return -1;
        return a.localeCompare(b);
    });
    
    for (const gName of groupKeys) {
        const exList = grouped[gName];
        exList.sort((a, b) => getTrExName(a.name).localeCompare(getTrExName(b.name)));
        
        const groupDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        titleDiv.style.cssText = "font-weight:700; margin-top:12px; color:var(--text-secondary); text-transform:uppercase; font-size:12px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; user-select:none; padding:8px 0;";
        
        const isOpen = window.openSelectorAccordions?.includes(gName) || false;
        titleDiv.innerHTML = `<span>${gName}</span> <i class="ph ph-caret-${isOpen ? 'up' : 'down'}"></i>`;
        groupDiv.appendChild(titleDiv);
        
        const itemsContainer = document.createElement('div');
        itemsContainer.style.display = isOpen ? 'block' : 'none';
        
        titleDiv.addEventListener('click', () => {
            window.openSelectorAccordions = window.openSelectorAccordions || [];
            const currentlyOpen = window.openSelectorAccordions.includes(gName);
            if (currentlyOpen) {
                window.openSelectorAccordions = window.openSelectorAccordions.filter(g => g !== gName);
                itemsContainer.style.display = 'none';
                titleDiv.querySelector('i').classList.replace('ph-caret-up', 'ph-caret-down');
            } else {
                window.openSelectorAccordions.push(gName);
                itemsContainer.style.display = 'block';
                titleDiv.querySelector('i').classList.replace('ph-caret-down', 'ph-caret-up');
            }
        });
        
        exList.forEach(ex => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'checkbox-item';
            itemDiv.style.alignItems = 'center';
            itemDiv.innerHTML = `
                <div style="position:relative; display:inline-flex; align-items:center;">
                    <input type="checkbox" id="chk-${ex.id}" value="${ex.id}" class="ex-select-cb" style="margin-right: 8px;">
                    <span class="ex-select-badge" style="position:absolute; left:-2px; top:-2px; background:var(--color-accent); color:white; border-radius:50%; font-size:10px; font-weight:bold; width:16px; height:16px; display:none; align-items:center; justify-content:center; pointer-events:none; z-index:2;"></span>
                </div>
                <label for="chk-${ex.id}" style="margin-left: 4px;">${getTrExName(ex.name)}</label>
            `;
            const cb = itemDiv.querySelector('input');
            cb.addEventListener('change', (e) => {
                window.exerciseSelectionOrder = window.exerciseSelectionOrder || [];
                if(e.target.checked) {
                    window.exerciseSelectionOrder.push(ex.id);
                } else {
                    window.exerciseSelectionOrder = window.exerciseSelectionOrder.filter(id => id !== ex.id);
                }
                document.querySelectorAll('.ex-select-cb').forEach(box => {
                    const idx = window.exerciseSelectionOrder.indexOf(box.value);
                    const badge = box.nextElementSibling;
                    if(idx !== -1) {
                        badge.textContent = idx + 1;
                        badge.style.display = 'flex';
                    } else {
                        badge.style.display = 'none';
                    }
                });
            });
            itemsContainer.appendChild(itemDiv);
        });
        
        groupDiv.appendChild(itemsContainer);
        list.appendChild(groupDiv);
    }
    window.exerciseSelectionOrder = []; openModal(modalSelectExercises);
});


function calculateRestTime(currentType, nextType, blockType, isSuperset) {
    if (currentType === 'Calentamiento' || currentType === 'Aproximación') return '45s';
    
    // Si estamos aquí, es Efectiva, Al fallo, Dropset, etc.
    if (isSuperset) return '60s';
    
    if (blockType === 'hypertrophy') return '60s';
    if (blockType === 'heavy') return '90s';
    if (blockType === 'intensity') {
        if (nextType && nextType.toLowerCase().includes('dropset')) return '90s';
        return '60s';
    }
    
    return '60s'; // default fallback
}

const renderRoutineItems = () => {
    const ul = document.getElementById('routine-selected-exercises-list');
    ul.innerHTML = '';
    
    const blockType = document.querySelector('.block-type-selector .type-btn.selected')?.dataset.type || 'hypertrophy';
    
    routineItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.dataset.id = item.id;
        li.style.cssText = "display:flex; align-items:flex-start; background:var(--bg-surface-elevated); padding:12px; margin-bottom:8px; border-radius:8px; flex-direction:column;";
        
        // --- TOP ROW: Checkbox, Title/Controls ---
        const topRow = document.createElement('div');
        topRow.style.cssText = "display:flex; width:100%; align-items:center;";
        
        const dragHandle = document.createElement('div');
        dragHandle.className = 'drag-handle';
        dragHandle.style.cssText = "cursor:grab; margin-right:8px; color:var(--text-secondary);";
        dragHandle.innerHTML = '<i class="ph ph-list"></i> <span class="exercise-number" style="margin-left: 4px; font-size: 14px;"></span>';
        
        const chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.value = item.id;
        chk.className = 'builder-chk';
        chk.style.marginRight = '12px';
        
        const contentDiv = document.createElement('div');
        contentDiv.style.flex = "1";
        
        let btnUngroup = null;
        if (item.isSuperset) {
            contentDiv.innerHTML = `<strong style="color:var(--color-hypertrophy); font-size:14px; margin-bottom:4px; display:block;"><i class="ph ph-link"></i> ${item.name}</strong>`;
            btnUngroup = document.createElement('button');
            btnUngroup.innerHTML = '<i class="ph ph-link-break"></i>';
            btnUngroup.className = 'btn-icon';
            btnUngroup.onclick = () => {
                const singles = item.exercises.map(e => ({ id: Date.now()+Math.random().toString(), isSuperset: false, exercises: [e] }));
                routineItems.splice(index, 1, ...singles);
                renderRoutineItems();
            };
        } else {
            contentDiv.innerHTML = `<span style="font-size:14px; font-weight:700;">${getTrExName(item.exercises[0].dbEx.name)}</span>`;
        }
        
        topRow.appendChild(dragHandle);
        topRow.appendChild(chk);
        topRow.appendChild(contentDiv);
        if (btnUngroup) topRow.appendChild(btnUngroup);
        li.appendChild(topRow);

        // --- SETS BUILDER ---
        item.exercises.forEach((ex, exIndex) => {
            const exContainer = document.createElement('div');
            exContainer.style.cssText = "width:100%; margin-top:12px; border-top:1px solid var(--border-color); padding-top:12px;";
            if (item.isSuperset) {
                exContainer.innerHTML = `<div style="font-size:13px; font-weight:600; margin-bottom:8px; color:var(--text-secondary);">- ${getTrExName(ex.dbEx.name)}</div>`;
            }
            
            const setsList = document.createElement('div');
            ex.sets = ex.sets || [];
            
            const renderSets = () => {
                setsList.innerHTML = '';
                ex.sets.forEach((set, setIndex) => {
                    const row = document.createElement('div');
                    row.style.cssText = "display:flex; align-items:center; gap:8px; margin-bottom:8px;";
                    row.innerHTML = `
                        <div style="font-size:12px; color:var(--text-secondary); width:16px;">${setIndex + 1}</div>
                        <select class="set-input set-type" style="flex:1; padding:4px; border-radius:4px; font-size:12px; height:auto;">
                            <option value="Calentamiento" ${set.type==='Calentamiento'?'selected':''}>${getSetTypeT('Calentamiento')}</option><option value="Aproximación" ${set.type==='Aproximación'?'selected':''}>${getSetTypeT('Aproximación')}</option>
                            <option value="Efectiva" ${set.type==='Efectiva'?'selected':''}>${getSetTypeT('Efectiva')}</option>
                            <option value="Al fallo" ${set.type==='Al fallo'?'selected':''}>${getSetTypeT('Al fallo')}</option>
                            <option value="Dropset" ${set.type==='Dropset'?'selected':''}>${getSetTypeT('Dropset')}</option>
                            <option value="Dropset fallo" ${set.type==='Dropset fallo'?'selected':''}>${getSetTypeT('Dropset fallo')}</option>
                        </select>
                        <div style="display:flex; flex-direction:column; align-items:center;">
                            <span style="font-size:9px; color:var(--text-secondary); line-height:1;">reps</span>
                            <input type="number" inputmode="numeric" class="set-input set-reps" value="${set.reps || ''}" placeholder="${ex.dbEx.defaults[blockType] || 'reps'}" style="width:50px; padding:4px; border-radius:4px; font-size:12px; height:auto; text-align:center;">
                        </div>
                        <button class="btn-icon delete-set"><i class="ph ph-trash"></i></button>
                    `;
                    row.querySelector('.set-type').addEventListener('change', (e) => {
                        set.type = e.target.value;
                        renderSets(); // Recalculate rest times on type change
                    });
                    row.querySelector('.set-reps').addEventListener('change', (e) => set.reps = e.target.value);
                    row.querySelector('.delete-set').addEventListener('click', () => {
                        ex.sets.splice(setIndex, 1);
                        renderSets();
                    });
                    setsList.appendChild(row);
                    
                    // Add Rest Time text if not the very last set of the item
                    // Or actually just between sets
                    if (setIndex < ex.sets.length - 1 || exIndex < item.exercises.length - 1) {
                        let nextType = null;
                        if (setIndex < ex.sets.length - 1) {
                            nextType = ex.sets[setIndex + 1].type;
                        } else if (item.isSuperset && exIndex < item.exercises.length - 1) {
                            // If superset, rest time between exercises? Usually there is no rest or very little. 
                            // But let's calculate based on Efectiva
                            nextType = item.exercises[exIndex + 1].sets[0]?.type || 'Efectiva';
                        }
                        
                        const restVal = calculateRestTime(set.type, nextType, blockType, item.isSuperset);
                        set.restTime = restVal; // Save to object for later
                        
                        const restDiv = document.createElement('div');
                        restDiv.style.cssText = "font-size:11px; color:var(--color-heavy); margin-bottom:8px; display:flex; align-items:center; gap:4px; margin-left: 24px;";
                        restDiv.innerHTML = `<i class="ph ph-timer"></i> ${restVal}`;
                        setsList.appendChild(restDiv);
                    }
                });
            };
            renderSets();
            
            const addSetBtn = document.createElement('button');
            addSetBtn.className = 'add-set-btn';
            addSetBtn.style.marginTop = '4px';
            addSetBtn.textContent = '+ ' + (getT('workout.addSet') || 'Añadir serie');
            addSetBtn.onclick = () => {
                const lastSet = ex.sets[ex.sets.length - 1] || { type: 'Efectiva', reps: '' };
                ex.sets.push({ ...lastSet });
                renderSets();
            };
            
            exContainer.appendChild(setsList);
            exContainer.appendChild(addSetBtn);
            li.appendChild(exContainer);
        });
        
        ul.appendChild(li);
    });
    
    // Init Sortable
    if(window.routineSortable) window.routineSortable.destroy();
    window.routineSortable = new Sortable(ul, {
        handle: '.drag-handle',
        animation: 150,
        onEnd: function (evt) {
            const temp = routineItems[evt.oldIndex];
            routineItems.splice(evt.oldIndex, 1);
            routineItems.splice(evt.newIndex, 0, temp);
            renderRoutineItems(); // re-render to update index
        }
    });
};


document.getElementById('btn-cancel-exercises').addEventListener('click', () => {
    closeModal(modalSelectExercises);
});

document.getElementById('btn-confirm-exercises').addEventListener('click', () => {
    const selectedBlockType = document.querySelector('.block-type-selector .type-btn.selected')?.dataset.type || 'hypertrophy';
    (window.exerciseSelectionOrder || []).forEach(exId => {
        const ex = state.exercises.find(e => e.id === exId);
        if(ex) {
            const targetReps = ex.defaults[selectedBlockType] || '';
            const initialSets = [
                { type: 'Calentamiento', reps: targetReps },
                { type: 'Aproximación', reps: targetReps },
                { type: 'Efectiva', reps: targetReps }
            ];
            routineItems.push({ 
                id: Date.now() + Math.random().toString(), 
                isSuperset: false, 
                exercises: [{ exerciseId: ex.id, dbEx: ex, sets: initialSets }] 
            });
        }
    });
    renderRoutineItems();
    closeModal(modalSelectExercises);
});

document.getElementById('btn-create-superset').addEventListener('click', () => {
    const checkedBoxes = Array.from(document.querySelectorAll('.builder-chk:checked'));
    if(checkedBoxes.length < 2) return alert(getT('alerts.supersetMin') || 'Select at least 2 items');
    
    const selectedIds = checkedBoxes.map(cb => cb.value);
    
    // Gather all underlying exercises from selected items
    let combinedExercises = [];
    routineItems.forEach(item => {
        if (selectedIds.includes(item.id)) {
            combinedExercises = combinedExercises.concat(item.exercises);
        }
    });
    
    // Remove old items
    routineItems = routineItems.filter(item => !selectedIds.includes(item.id));
    
    // Add new superset
    const groups = combinedExercises.map(e => e.dbEx.group || 'Sin Grupo');
    const uniqueGroups = [...new Set(groups)];
    const supersetName = `Superserie de ${uniqueGroups.join(' y ')}`;
    
    // Override sets to 3 Efectivas by default for supersets
    combinedExercises.forEach(ex => {
        const targetReps = ex.dbEx.defaults[selectedBlockType] || '';
        ex.sets = [
            { type: 'Efectiva', reps: targetReps },
            { type: 'Efectiva', reps: targetReps },
            { type: 'Efectiva', reps: targetReps }
        ];
    });

    routineItems.push({
        id: Date.now().toString(),
        isSuperset: true,
        name: supersetName,
        exercises: combinedExercises
    });
    
    renderRoutineItems();
});

document.getElementById('btn-remove-selected-items').addEventListener('click', () => {
    const selectedIds = Array.from(document.querySelectorAll('.builder-chk:checked')).map(cb => cb.value);
    routineItems = routineItems.filter(item => !selectedIds.includes(item.id));
    renderRoutineItems();
});

document.getElementById('btn-save-routine').addEventListener('click', () => {
    const name = document.getElementById('routine-name').value || 'Entrenamiento';
    const duration = parseInt(document.getElementById('routine-duration').value) || 1;
    if(routineItems.length === 0) return alert(getT('alerts.exerciseRequired') || 'Select at least 1 exercise');
    
    const startDate = state.selectedDate;
    
    let workoutExercises = [];
    routineItems.forEach(item => {
        const supersetId = item.isSuperset ? Date.now() + Math.random().toString() : null;
        const sName = item.isSuperset ? item.name : null;
        
        item.exercises.forEach(e => {
            workoutExercises.push({
                exerciseId: e.exerciseId,
                name: e.dbEx.name,
                supersetId: supersetId,
                supersetName: sName,
                sets: e.sets ? e.sets.map(s => ({ type: s.type, weight: 0, targetReps: s.reps, reps: '', repsDrop: '', restTime: s.restTime })) : [
                    { type: 'Calentamiento', weight: 0, reps: '', restTime: '45s' },
                    { type: 'Aproximación', weight: 0, reps: '', restTime: '45s' },
                    { type: 'Efectiva', weight: 0, reps: '', restTime: '60s' }
                ],
                comments: ''
            });
        });
    });
    
    const blockId = Date.now().toString() + Math.random().toString().slice(2, 6);
    for (let i = 0; i < duration; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + (i * 7));
        state.sessions.push({
            id: Date.now().toString() + i,
            blockId: blockId,
            date: formatDate(d),
            name: duration > 1 ? `${name} (${getT('calendar.week')} ${i+1})` : name,
            type: selectedBlockType,
            exercises: JSON.parse(JSON.stringify(workoutExercises))
        });
    }
    
    saveState();
    closeModal(modalAddRoutine);
    renderCalendar();
});

// --- WORKOUT VIEW LOGIC & AUTOSAVE ---

let activeSession = null;
let activeSessionType = null;
let workoutTimerInterval = null;
let workoutStartTime = null;
let sessionToDelete = null;
let editingSessionId = null;

const workoutView = document.getElementById('view-workout');
let timerInterval = null;
let currentDropsetTargetWeightInput = null;

const formatTimer = (ms) => {
    const totalS = Math.floor(ms / 1000);
    const m = Math.floor(totalS / 60);
    const s = totalS % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};

const updateTimerUI = () => {
    if(state.activeWorkoutState && state.activeWorkoutState.startTime) {
        let ms = Date.now() - state.activeWorkoutState.startTime;
        if(ms < 0 || isNaN(ms)) { // Fix bug where time is corrupt
            ms = 0;
            state.activeWorkoutState.startTime = Date.now();
        }
        document.getElementById('workout-timer').textContent = formatTimer(ms);
    }
};

const autoSaveWorkout = () => {
    if(activeSession && state.activeWorkoutState && state.activeWorkoutState.session && state.activeWorkoutState.session.id === activeSession.id) {
        state.activeWorkoutState.session = activeSession;
        saveState();
    }
};

const extractYouTubeID = (url) => {
    if(!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const startWorkout = (session) => {
    activeSession = JSON.parse(JSON.stringify(session)); 
    
    // Recover completed data lazily if needed
    if (activeSession.completed) {
        const dateStr = activeSession.date; 
        if (dateStr) {
            const [y, m, d] = dateStr.split('-');
            const formattedDate = `${d}/${m}/${y}`;
            const matched = state.completedWorkouts.find(w => w.name === activeSession.name && w.date === formattedDate);
            if (matched) {
                activeSession.exercises = JSON.parse(JSON.stringify(matched.exercises));
            }
        }
    }
    
    workoutView.classList.add('active');
    document.getElementById('workout-title').textContent = session.name;
    document.documentElement.style.setProperty('--color-accent', `var(--color-${session.type})`);
    
    const isActive = !activeSession.completed && state.activeWorkoutState && state.activeWorkoutState.session && state.activeWorkoutState.session.id === session.id;
    
    if (activeSession.completed) {
        openExerciseAccordions = [0]; 
        const startBtn = document.getElementById('btn-start-workout');
        startBtn.style.display = 'none';
        const tc = document.getElementById('workout-timer-container');
        if (tc) tc.style.display = 'flex';
        else document.getElementById('workout-timer').style.display = 'block';
        
        const bc = document.getElementById('btn-cancel-workout');
        if (bc) bc.style.display = 'none';
        
        document.getElementById('workout-timer').textContent = 'Completado';
        document.getElementById('workout-footer').style.display = 'none';
        clearInterval(timerInterval);
    } else if(isActive && state.activeWorkoutState.startTime) {
        // Resuming
        activeSession = state.activeWorkoutState.session;
        document.getElementById('btn-start-workout').style.display = 'none';
        const tc2 = document.getElementById('workout-timer-container');
        if (tc2) tc2.style.display = 'flex';
        else document.getElementById('workout-timer').style.display = 'block';
        
        const bc2 = document.getElementById('btn-cancel-workout');
        if (bc2) bc2.style.display = 'block';
        document.getElementById('workout-footer').style.display = 'block';
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimerUI, 1000);
        updateTimerUI();
    } else {
        // Previewing (Starting fresh or looking)
        openExerciseAccordions = [0]; // Open first exercise by default
        
        const isAnotherRunning = state.activeWorkoutState && state.activeWorkoutState.startTime;
        const startBtn = document.getElementById('btn-start-workout');
        startBtn.style.display = 'block';
        startBtn.textContent = isAnotherRunning ? 'Reemplazar Sesión Activa' : 'Iniciar';
        
        const tc3 = document.getElementById('workout-timer-container');
        if (tc3) tc3.style.display = 'none';
        else document.getElementById('workout-timer').style.display = 'none';
        document.getElementById('workout-footer').style.display = 'none';
        document.getElementById('workout-timer').textContent = '00:00';
        clearInterval(timerInterval);
    }
    
    renderWorkout();
};

document.getElementById('btn-start-workout').addEventListener('click', (e) => {
    if (state.activeWorkoutState && state.activeWorkoutState.startTime) {
        if (!confirm(getT('workout.replaceConfirm') || 'You already have an active workout. Cancel it and start this one?')) {
            return;
        }
    }
    
    state.activeWorkoutState = {
        sessionId: activeSession.id,
        session: activeSession,
        startTime: Date.now()
    };
    if (window.manageWorkoutNotification) window.manageWorkoutNotification(true);
    
    e.target.style.display = 'none';
    const tc4 = document.getElementById('workout-timer-container');
    if (tc4) tc4.style.display = 'flex';
    else document.getElementById('workout-timer').style.display = 'block';
    
    const bc4 = document.getElementById('btn-cancel-workout');
    if (bc4) bc4.style.display = 'block';
    document.getElementById('workout-footer').style.display = 'block';
    saveState();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimerUI, 1000);
    updateWorkoutBanner();
    renderWorkout(); // Fix: re-render to enable inputs
});

const openDropsetCalc = (weight, inputElem) => {
    if(!weight) return;
    currentDropsetTargetWeightInput = inputElem;
    document.getElementById('dropset-current-weight').textContent = weight;
    document.getElementById('dropset-20').textContent = (weight * 0.8).toFixed(1) + ' kg';
    document.getElementById('dropset-40').textContent = (weight * 0.6).toFixed(1) + ' kg';
    openModal(modalDropset);
};

document.querySelectorAll('.btn-apply-dropset').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const mult = parseFloat(e.currentTarget.dataset.multiplier);
        const w = parseFloat(document.getElementById('dropset-current-weight').textContent);
        if(currentDropsetTargetWeightInput) {
            currentDropsetTargetWeightInput.value = (w * mult).toFixed(1);
            currentDropsetTargetWeightInput.dispatchEvent(new Event('change'));
        }
        closeModal(modalDropset);
    });
});

window.openLightbox = (src) => {
    document.getElementById('lightbox-img').src = src;
    openModal(modalLightbox);
};

const renderWorkout = () => {
    try {
    const content = document.getElementById('workout-content');
    content.innerHTML = '';
    
    // Group exercises by supersetId
    const displayBlocks = [];
    let currentSupersetId = null;
    let currentBlock = null;
    
    activeSession.exercises.forEach((ex, index) => {
        if (ex.supersetId) {
            if (currentSupersetId === ex.supersetId) {
                currentBlock.exercises.push(ex);
            } else {
                currentSupersetId = ex.supersetId;
                currentBlock = { type: 'superset', id: ex.supersetId, name: ex.supersetName || 'Superserie', exercises: [ex] };
                displayBlocks.push(currentBlock);
            }
        } else {
            currentSupersetId = null;
            displayBlocks.push({ type: 'single', id: 'single_' + index, name: ex.name, exercises: [ex] });
        }
    });

    const isWorkoutActive = state.activeWorkoutState && state.activeWorkoutState.sessionId === activeSession.id;

    displayBlocks.forEach((block, blockIndex) => {
        const exDiv = document.createElement('div');
        exDiv.classList.add('workout-exercise');
        
        let headerTitle = '';
        let allCompleted = true;
        
        block.exercises.forEach(ex => {
            if(!ex.completed) allCompleted = false;
        });

        if(allCompleted) exDiv.classList.add('completed');
        
        if (block.type === 'superset') {
            headerTitle = `<i class="ph ph-link"></i> ${block.name}`;
        } else {
            const dbEx = state.exercises.find(e => e.id === block.exercises[0].exerciseId);
            const groupName = dbEx ? (dbEx.group || 'Sin Grupo') : 'Sin Grupo';
            headerTitle = `(${groupName}) ${getTrExName(block.name)}`;
        }
        
        // Header (Accordion)
        const header = document.createElement('div');
        header.classList.add('accordion-header');
        if(allCompleted) header.classList.add('completed');
        header.innerHTML = `
            <h3>${headerTitle} <i class="ph ph-check-circle status-icon"></i></h3>
            <i class="ph ph-caret-down"></i>
        `;
        
        // Body (Accordion content)
        const body = document.createElement('div');
        body.classList.add('accordion-body');
        
        block.exercises.forEach((ex, exInnerIndex) => {
            const dbEx = state.exercises.find(e => e.id === ex.exerciseId);
            
            let mediaHtml = '';
            if (dbEx) {
                const ytID = extractYouTubeID(dbEx.youtubeLink);
                if(ytID) mediaHtml += `<iframe src="https://www.youtube.com/embed/${ytID}" allowfullscreen style="width:120px; aspect-ratio:16/9; display:inline-block;"></iframe>`;
                if(dbEx.imageData) mediaHtml += `<img src="${dbEx.imageData}" onclick="openLightbox('${dbEx.imageData}')" style="max-height: 60px; object-fit: contain; margin-left: 8px;">`;
            }
            
            const exSection = document.createElement('div');
            exSection.style.marginBottom = '24px';
            if (block.type === 'superset') {
                exSection.style.border = '1px solid var(--border-color)';
                exSection.style.padding = '12px';
                exSection.style.borderRadius = '8px';
                exSection.style.background = 'var(--bg-surface)';
            }
            
            exSection.innerHTML = `
                ${block.type === 'superset' ? `<div style="font-weight:700; color:var(--text-primary); margin-bottom:12px;">${getTrExName(ex.name)}</div>` : ''}
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 12px;">
                    <div class="media-links" style="margin:0; width:100%; display:flex; flex-wrap:wrap; gap:8px;">${mediaHtml}</div>
                    <button class="history-btn" onclick="openInlineHistory('${ex.exerciseId}')" style="min-width: 80px;"><i class="ph ph-clock-counter-clockwise"></i> Hist.</button>
                </div>
                
                <div class="set-row header-row" style="margin-top: 16px;">
                    <div></div>
                    <div style="font-size:12px; color:var(--text-secondary); text-align:center;">Tipo</div>
                    <div style="font-size:12px; color:var(--text-secondary); text-align:center;">Reps</div>
                    <div style="font-size:12px; color:var(--text-secondary); text-align:center;">Kg</div>
                    <div></div>
                </div>
            `;
            
            const setsContainer = document.createElement('div');
            
            ex.sets.forEach((set, setIndex) => {
                let targetReps = '';
                if (set.type === 'Calentamiento') targetReps = '15-20';
                else if (set.type === 'Aproximación') targetReps = '3-5';
                else if (dbEx) targetReps = dbEx.defaults[activeSession.type] || '';
                
                const setRow = document.createElement('div');
                setRow.classList.add('set-row');
                setRow.style.padding = '4px 0';
                
                
                let targetRepsBase = targetReps;
                let targetRepsDrop = '';
                if (targetReps && typeof targetReps === 'string' && targetReps.includes('+')) {
                    const parts = targetReps.split('+');
                    if (targetReps.startsWith('(')) {
                        targetRepsBase = parts[0].trim() + ')';
                    } else {
                        targetRepsBase = parts[0].trim();
                    }
                    targetRepsDrop = targetReps; // The full string for dropset
                }

                let repsHtml = `<input type="number" inputmode="numeric" class="set-input reps-input" value="${set.reps || ''}" placeholder="${targetRepsBase}" style="max-width:65px;" ${!isWorkoutActive ? 'disabled' : ''}>`;
                let weightHtml = `<input type="number" inputmode="decimal" class="set-input weight-input" value="${set.weight || ''}" placeholder="0" style="margin-bottom:4px; max-width:65px;" ${!isWorkoutActive ? 'disabled' : ''}>`;
                
                if (set.type.includes('Dropset')) {
                    repsHtml += `<input type="number" inputmode="numeric" class="set-input reps-drop-input" value="${set.repsDrop || ''}" placeholder="${targetRepsDrop}" style="max-width:65px; margin-left:4px;" ${!isWorkoutActive ? 'disabled' : ''}>`;
                    weightHtml += `<input type="number" inputmode="decimal" class="set-input weight-drop-input" value="${set.weightDrop || ''}" placeholder="Drop kg" style="margin-bottom:4px; max-width:65px; margin-left:4px;" ${!isWorkoutActive ? 'disabled' : ''}>`;
                }

                setRow.innerHTML = `
                    <div class="set-number" style="margin-top: 8px;">${setIndex + 1}</div>
                    <div style="display:flex; flex-direction:column; justify-content: flex-start; flex: 1;">
                        <select class="set-type-select" ${!isWorkoutActive ? 'disabled' : ''}>
                            <option value="Calentamiento" ${set.type==='Calentamiento'?'selected':''}>${getSetTypeT('Calentamiento')}</option><option value="Aproximación" ${set.type==='Aproximación'?'selected':''}>${getSetTypeT('Aproximación')}</option>
                            <option value="Efectiva" ${set.type==='Efectiva'?'selected':''}>${getSetTypeT('Efectiva')}</option>
                            <option value="Al fallo" ${set.type==='Al fallo'?'selected':''}>${getSetTypeT('Al fallo')}</option>
                            <option value="Dropset" ${set.type==='Dropset'?'selected':''}>${getSetTypeT('Dropset')}</option>
                            <option value="Dropset fallo" ${set.type==='Dropset fallo'?'selected':''}>${getSetTypeT('Dropset fallo')}</option>
                        </select>
                        <div class="target-reps-text" style="margin-top: 4px;">Obj: ${targetReps}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content: flex-start;">
                        <div style="display:flex;">${repsHtml}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content: flex-start; margin-left: 8px;">
                        <div style="display:flex;">${weightHtml}</div>
                    </div>
                    <div style="display:flex; justify-content: center; margin-top: 4px; padding-left: 8px;">
                        <button class="btn-icon delete-set" style="padding:4px;"><i class="ph ph-trash"></i></button>
                    </div>
                `;
                
                const wInput = setRow.querySelector('.weight-input');
                const rInput = setRow.querySelector('.reps-input');
                const tInput = setRow.querySelector('.set-type-select');
                
                tInput.addEventListener('change', (e) => { set.type = e.target.value; autoSaveWorkout(); renderWorkout(); }); 
                wInput.addEventListener('change', (e) => { set.weight = parseFloat(e.target.value); autoSaveWorkout(); });
                rInput.addEventListener('change', (e) => { set.reps = e.target.value; autoSaveWorkout(); });
                setRow.querySelector('.calc-dropset-btn')?.addEventListener('click', () => openDropsetCalc(set.weight, wInput));
                const rDropInput = setRow.querySelector('.reps-drop-input');
                if (rDropInput) rDropInput.addEventListener('change', (e) => { set.repsDrop = e.target.value; autoSaveWorkout(); });
                
                setRow.querySelector('.delete-set').addEventListener('click', () => {
                    ex.sets.splice(setIndex, 1);
                    autoSaveWorkout();
                    renderWorkout();
                });
                
                setsContainer.appendChild(setRow);
                if (set.restTime && setIndex < ex.sets.length - 1) {
                    const restDiv = document.createElement('div');
                    restDiv.style.cssText = "font-size:11px; color:var(--color-heavy); margin: 4px 0 12px 24px; display:flex; align-items:center; gap:4px;";
                    restDiv.innerHTML = `<i class="ph ph-timer"></i> ${set.restTime}`;
                    setsContainer.appendChild(restDiv);
                }
            });
            
            exSection.appendChild(setsContainer);
            
            // "Añadir Serie" button removed as per user request

            
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('exercise-comments');
            commentDiv.innerHTML = `<input type="text" placeholder="Comentarios ${getTrExName(ex.name)}..." value="${ex.comments || ''}">`;
            commentDiv.querySelector('input').addEventListener('change', (e) => { ex.comments = e.target.value; autoSaveWorkout(); });
            exSection.appendChild(commentDiv);
            
            body.appendChild(exSection);
        });
        
        const finishExBtn = document.createElement('button');
        finishExBtn.classList.add('btn-secondary', 'full-width');
        finishExBtn.textContent = block.type === 'superset' ? 'Finalizar Superserie' : 'Finalizar Ejercicio';
        finishExBtn.disabled = !isWorkoutActive;
        if (!isWorkoutActive) finishExBtn.style.opacity = '0.5';
        finishExBtn.addEventListener('click', () => {
            block.exercises.forEach(e => e.completed = true);
            openExerciseAccordions = openExerciseAccordions.filter(i => i !== block.id && (blockIndex !== 0 || i !== 0));
            autoSaveWorkout();
            renderWorkout();
        });
        body.appendChild(finishExBtn);
        
        // Accordion logic
        header.addEventListener('click', () => {
            header.classList.toggle('open');
            body.classList.toggle('open');
            if(header.classList.contains('open')) {
                if(!openExerciseAccordions.includes(block.id)) openExerciseAccordions.push(block.id);
                // Also remove 0 if it's there and this is the first block
                if (blockIndex === 0) openExerciseAccordions = openExerciseAccordions.filter(i => i !== 0);
            } else {
                openExerciseAccordions = openExerciseAccordions.filter(i => i !== block.id && (blockIndex !== 0 || i !== 0));
            }
        });
        
        if(openExerciseAccordions.includes(block.id) || (openExerciseAccordions.includes(0) && blockIndex === 0)) {
            header.classList.add('open');
            body.classList.add('open');
        }
        
        exDiv.appendChild(header);
        exDiv.appendChild(body);
        content.appendChild(exDiv);
    });
    } catch(e) { alert("ERROR in renderWorkout: " + e.stack); }
};

document.getElementById('close-workout').addEventListener('click', () => {
    workoutView.classList.remove('active');
    document.documentElement.style.setProperty('--color-accent', 'var(--color-hypertrophy)');
    if (typeof updateWorkoutBanner !== 'undefined') updateWorkoutBanner();
});

// Lightbox is closed by generic modal handler

document.getElementById('btn-delete-single').addEventListener('click', () => {
    if(sessionToDelete) {
        state.sessions = state.sessions.filter(s => s.id !== sessionToDelete.id);
        saveState();
        renderCalendar();
        closeModal(modalDeleteSession);
        sessionToDelete = null;
    }
});

document.getElementById('btn-delete-recurring').addEventListener('click', () => {
    if(sessionToDelete) {
        const parseDateStr = (dStr) => {
            const parts = dStr.split('/');
            return new Date(parts[2], parts[1] - 1, parts[0]);
        };
        const deletedDate = parseDateStr(sessionToDelete.date);
        const dayOfWeek = deletedDate.getDay();
        
        state.sessions = state.sessions.filter(s => {
            const sDate = parseDateStr(s.date);
            if (sDate < deletedDate) return true; // Mantener sesiones pasadas
            
            if (sessionToDelete.blockId) {
                if (s.blockId === sessionToDelete.blockId) return false;
            } else {
                // Fallback para sesiones creadas antes del cambio
                const baseName = sessionToDelete.name.replace(/\s+\(.*?\d+\)$/, '');
                const sBaseName = s.name.replace(/\s+\(.*?\d+\)$/, '');
                if (s.type === sessionToDelete.type && sBaseName === baseName && sDate.getDay() === dayOfWeek) {
                    return false;
                }
            }
            return true;
        });
        
        saveState();
        renderCalendar();
        closeModal(modalDeleteSession);
        sessionToDelete = null;
    }
});

// Initialization in the end of file
document.getElementById('finish-workout').addEventListener('click', () => {
    clearInterval(timerInterval);
    const duration = Date.now() - state.activeWorkoutState.startTime;
    
    // Save to completed with real current date
    const realDate = formatDate(new Date());
    
    // Mark session as completed in calendar
    const sessionInCalendar = state.sessions.find(s => s.id === activeSession.id);
    if(sessionInCalendar) {
        sessionInCalendar.completed = true;
        sessionInCalendar.exercises = JSON.parse(JSON.stringify(activeSession.exercises));
    }
    
    state.completedWorkouts.push({
        id: Date.now().toString(),
        date: realDate,
        name: activeSession.name,
        type: activeSession.type,
        duration: formatTimer(duration > 0 ? duration : 0),
        exercises: JSON.parse(JSON.stringify(activeSession.exercises))
    });
    
    workoutView.classList.remove('active');
    state.activeWorkoutState = null; // CLEAR active state fully
    if (window.manageWorkoutNotification) window.manageWorkoutNotification(false);
    activeSession = null;
    openExerciseAccordions = [];
    saveState();
    renderCalendar();
    alert((getT('alerts.workoutFinished') || 'Workout finished! Duration: ') + formatTimer(duration > 0 ? duration : 0));
});


// --- HISTORY LOGIC ---
const renderGlobalHistory = () => {
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    
    if (state.completedWorkouts.length === 0) {
        list.innerHTML = `<div class="empty-state">Aún no hay entrenamientos completados.</div>`;
        return;
    }
    
    const sorted = [...state.completedWorkouts].reverse();
    
    sorted.forEach((w, wIndex) => {
        const item = document.createElement('div');
        item.classList.add('history-item', `type-${w.type}`);
        
        const typeName = w.type === 'hypertrophy' ? 'Hipertrofia' : w.type === 'heavy' ? 'Pesado' : 'Alta Int.';
        
        // Accordion for History
        item.innerHTML = `
            <div class="accordion-header" style="background:transparent;" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
                <div style="flex:1;">
                    <h4 style="margin-bottom:4px; font-size:16px;">${w.name}</h4>
                    <p style="font-size:12px; color:var(--text-secondary);"><i class="ph ph-calendar"></i> ${w.date} &bull; <i class="ph ph-clock"></i> ${w.duration || '00:00'} &bull; ${typeName}</p>
                </div>
                <button class="btn-icon delete-history-btn" style="color:var(--color-heavy); margin-right:8px; z-index:10;"><i class="ph ph-trash"></i></button>
                <i class="ph ph-caret-down"></i>
            </div>
            <div class="accordion-body"></div>
        `;
        
        item.querySelector('.delete-history-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if(confirm('¿Eliminar este entrenamiento del historial permanentemente?')) {
                state.completedWorkouts = state.completedWorkouts.filter(cw => cw.id !== w.id);
                saveState();
                renderGlobalHistory();
            }
        });
        
        const body = item.querySelector('.accordion-body');
        
        w.exercises.forEach(ex => {
            let maxW = 0;
            ex.sets.forEach(s => { if(s.weight > maxW) maxW = s.weight; });
            body.innerHTML += `<div class="history-set" style="margin-top:8px;">
                <strong style="color:var(--text-primary);">${getTrExName(ex.name)}</strong> 
                <span style="color:var(--color-accent); font-weight:600;">Max: ${maxW}kg</span>
            </div>`;
            
            ex.sets.forEach((s, idx) => {
                body.innerHTML += `<div style="font-size:11px; display:flex; justify-content:space-between; color:var(--text-secondary); padding: 2px 0;">
                    <span>${getT('workout.series') || 'Serie'} ${idx+1} (${getSetTypeT(s.type)})</span> <span>${s.reps || '-'} x ${s.weight || 0}kg</span>
                </div>`;
            });
        });
        
        list.appendChild(item);
    });
};

window.openInlineHistory = (exerciseId) => {
    const content = document.getElementById('inline-history-content');
    content.innerHTML = '';
    
    const pastSessions = state.completedWorkouts.filter(w => w.exercises.some(e => e.exerciseId === exerciseId)).reverse();
    
    if(pastSessions.length === 0) {
        content.innerHTML = '<p style="color:var(--text-secondary); text-align:center;">No hay historial previo para este ejercicio.</p>';
    } else {
        pastSessions.forEach(w => {
            const exData = w.exercises.find(e => e.exerciseId === exerciseId);
            
            const div = document.createElement('div');
            div.classList.add('history-item', `type-${w.type}`);
            div.style.marginBottom = '8px';
            
            div.innerHTML = `
                <div class="accordion-header" style="background:transparent; padding:12px;" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
                    <div style="flex:1;">
                        <h4 style="margin-bottom:2px; font-size:14px;">${w.date} - ${w.name}</h4>
                    </div>
                    <i class="ph ph-caret-down"></i>
                </div>
                <div class="accordion-body" style="padding:0 12px 12px 12px;"></div>
            `;
            
            const body = div.querySelector('.accordion-body');
            
            exData.sets.forEach((s, idx) => {
                body.innerHTML += `<div style="font-size:12px; display:flex; justify-content:space-between; margin-top:4px;">
                    <span style="color:var(--text-secondary);">${getT('workout.series') || 'Serie'} ${idx+1} (${getSetTypeT(s.type)})</span> 
                    <span style="font-weight:600;">${s.reps || '-'} x ${s.weight || 0}kg</span>
                </div>`;
            });
            if(exData.comments) body.innerHTML += `<div style="font-size:11px; color:var(--text-secondary); margin-top:8px; font-style:italic;">"${exData.comments}"</div>`;
            
            content.appendChild(div);
        });
    }
    openModal(modalInlineHistory);
};

// Language switcher
const btnLanguage = document.getElementById('btn-language');
if (btnLanguage) {
    btnLanguage.addEventListener('click', () => {
        document.getElementById('modal-language').classList.add('active');
    });
}

document.querySelectorAll('.lang-select-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        state.language = lang;
        localStorage.setItem('gym_language', lang);
        updateLanguageUI();
        document.getElementById('modal-language').classList.remove('active');
        
        // Re-render UI components to apply translations
        renderCalendar();
        renderExercises();
        renderGlobalHistory();
        if (typeof renderProgressionView !== 'undefined') renderProgressionView();
        if (typeof renderEvolutionHistory !== 'undefined') renderEvolutionHistory();
        if (typeof renderExportList !== 'undefined') renderExportList();
        if (typeof switchView !== 'undefined') {
            const activeView = document.querySelector('.view.active');
            if(activeView) switchView(activeView.id);
        }
    });
});

// Go to Today
const btnToday = document.getElementById('btn-today');
if (btnToday) {
    btnToday.addEventListener('click', () => {
        state.selectedDate = new Date();
        state.currentWeekStart = getMonday(state.selectedDate);
        renderCalendar();
    });
}

// INITIALIZATION
state.currentWeekStart = getMonday(state.selectedDate);
updateLanguageUI();

if (state.activeWorkoutState) {
    activeSession = state.sessions.find(ses => ses.id === state.activeWorkoutState.sessionId);
    if (activeSession) {
        workoutStartTime = state.activeWorkoutState.startTime;
        workoutView.classList.add('active');
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimerUI, 1000);
        updateTimerUI();
        renderWorkout();
        if (window.manageWorkoutNotification) window.manageWorkoutNotification(true);
    } else {
        state.activeWorkoutState = null;
        if (window.manageWorkoutNotification) window.manageWorkoutNotification(false);
    }
}

document.querySelector('[data-target="view-calendar"]').click();



function updateWorkoutBanner() {
    const banner = document.getElementById('active-workout-banner');
    if (!banner) return;
    
    // Si hay sesion activa y el view-workout NO esta activo
    if (state.activeWorkoutState && state.activeWorkoutState.startTime && !document.getElementById('view-workout').classList.contains('active')) {
        banner.classList.add('visible');
    } else {
        banner.classList.remove('visible');
    }
}
document.getElementById('active-workout-banner')?.addEventListener('click', () => {
    if (state.activeWorkoutState && state.activeWorkoutState.startTime) {
        document.querySelector('.nav-item[data-target="view-workout"]').click();
    }
});

// --- SWIPE GESTURES ---
let touchStartX = 0;
let touchCurrentX = 0;
let swipeTarget = null;
let incomingView = null;
let currentView = null;
const SWIPE_THRESHOLD = 50;

const handleCalendarSwipe = (diff) => {
    if (Math.abs(diff) < SWIPE_THRESHOLD) {
        if (swipeTarget) swipeTarget.style.transform = '';
        return;
    }
    
    if (diff > 0) {
        document.getElementById('next-week')?.click();
    } else {
        document.getElementById('prev-week')?.click();
    }
    if (swipeTarget) {
        swipeTarget.style.transition = 'transform 0.2s ease-out';
        swipeTarget.style.transform = 'translateX(0)';
        setTimeout(() => {
            if(swipeTarget) { swipeTarget.style.transition = ''; swipeTarget.style.transform = ''; swipeTarget = null;}
        }, 200);
    }
};

const calendarContainer = document.getElementById('view-calendar');
if (calendarContainer) {
    calendarContainer.addEventListener('touchstart', e => {
        if (window.isApkEnv) return;
        touchStartX = e.changedTouches[0].screenX;
        touchCurrentX = touchStartX;
        if (e.target.closest('.calendar-grid') || e.target.closest('.week-navigation')) {
            swipeTarget = e.target.closest('.calendar-grid') || e.target.closest('.week-navigation');
            if (swipeTarget) {
                swipeTarget.style.transition = 'none';
            }
        } else {
            swipeTarget = null;
        }
    }, {passive: true});
    
    calendarContainer.addEventListener('touchmove', e => {
        if (window.isApkEnv) return;
        if (!swipeTarget) return;
        touchCurrentX = e.changedTouches[0].screenX;
        let delta = touchCurrentX - touchStartX;
        swipeTarget.style.transform = `translateX(${delta}px)`;
    }, {passive: true});
    
    calendarContainer.addEventListener('touchend', e => {
        if (window.isApkEnv) return;
        const diff = touchStartX - touchCurrentX;
        if (e.target.closest('.sessions-list') && !swipeTarget) return;
        handleCalendarSwipe(diff);
    }, {passive: true});
}

const handleTabSwipe = (diff) => {
    const tabs = Array.from(document.querySelectorAll('.nav-item'));
    const activeIndex = tabs.findIndex(t => t.classList.contains('active'));
    
    let targetIndex = activeIndex;
    
    if (Math.abs(diff) >= SWIPE_THRESHOLD * 2) {
        if (diff > 0 && activeIndex < tabs.length - 1) {
            targetIndex = activeIndex + 1;
        } else if (diff < 0 && activeIndex > 0) {
            targetIndex = activeIndex - 1;
        }
        
        // Skip workout tab if not active
        const isWorkoutActive = state.activeWorkoutState && state.activeWorkoutState.startTime;
        if (!isWorkoutActive) {
            if (tabs[targetIndex] && tabs[targetIndex].dataset.target === 'view-workout') {
                if (diff > 0 && targetIndex < tabs.length - 1) {
                    targetIndex++; // skip forward
                } else if (diff < 0 && targetIndex > 0) {
                    targetIndex--; // skip backward
                } else {
                    targetIndex = activeIndex; // undo if out of bounds
                }
            }
        }
    }
    
    if (currentView) {
        currentView.style.transition = 'transform 0.25s ease-out';
        currentView.style.transform = 'translateX(0)';
    }
    if (incomingView) {
        incomingView.style.transition = 'transform 0.25s ease-out';
        incomingView.style.transform = diff > 0 ? 'translateX(100vw)' : 'translateX(-100vw)';
    }
    
    setTimeout(() => {
        if (currentView) { currentView.style.transition = ''; currentView.style.transform = ''; }
        if (incomingView) { 
            incomingView.style.transition = ''; 
            incomingView.style.transform = '';
            incomingView.style.display = 'none';
            incomingView.style.position = '';
            incomingView.style.top = '';
            incomingView.style.width = '';
        }
        if (targetIndex !== activeIndex) {
            tabs[targetIndex].click();
        }
        currentView = null;
        incomingView = null;
    }, 250);
}

const mainContent = document.getElementById('main-content');
if (mainContent) {
    mainContent.addEventListener('touchstart', e => {
        if (window.isApkEnv) return;
        if (e.target.closest('#view-calendar') || e.target.closest('.scrollable') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('.modal')) return;
        touchStartX = e.changedTouches[0].screenX;
        touchCurrentX = touchStartX;
        
        const tabs = Array.from(document.querySelectorAll('.nav-item'));
        const activeIndex = tabs.findIndex(t => t.classList.contains('active'));
        currentView = document.querySelector('.view.active');
        if (currentView) currentView.style.transition = 'none';
    }, {passive: true});
    
    mainContent.addEventListener('touchmove', e => {
        if (window.isApkEnv) return;
        if (e.target.closest('#view-calendar') || e.target.closest('.scrollable') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('.modal')) return;
        if (!currentView || touchStartX === 0) return;
        
        touchCurrentX = e.changedTouches[0].screenX;
        let delta = touchCurrentX - touchStartX;
        
        // Find incoming view
        if (!incomingView) {
            const tabs = Array.from(document.querySelectorAll('.nav-item'));
            const activeIndex = tabs.findIndex(t => t.classList.contains('active'));
            let nextIdx = delta < 0 ? activeIndex + 1 : activeIndex - 1;
            
            // Skip logic
            const isWorkoutActive = state.activeWorkoutState && state.activeWorkoutState.startTime;
            if (!isWorkoutActive && tabs[nextIdx] && tabs[nextIdx].dataset.target === 'view-workout') {
                nextIdx = delta < 0 ? nextIdx + 1 : nextIdx - 1;
            }
            
            if (tabs[nextIdx]) {
                incomingView = document.getElementById(tabs[nextIdx].dataset.target);
                if (incomingView) {
                    incomingView.style.display = 'block';
                    incomingView.style.position = 'absolute';
                    incomingView.style.top = '0';
                    incomingView.style.width = '100%';
                    incomingView.style.transition = 'none';
                }
            }
        }
        
        currentView.style.transform = `translateX(${delta}px)`;
        if (incomingView) {
            incomingView.style.transform = `translateX(${delta + (delta < 0 ? window.innerWidth : -window.innerWidth)}px)`;
        }
    }, {passive: true});
    
    mainContent.addEventListener('touchend', e => {
        if (window.isApkEnv) return;
        if (e.target.closest('#view-calendar') || e.target.closest('.scrollable') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('.modal')) return;
        if (touchStartX === 0) return;
        const diff = touchStartX - touchCurrentX;
        handleTabSwipe(diff);
        touchStartX = 0;
    }, {passive: true});
}

// --- PROGRESSION & EVOLUTION ---
if (!state.evolution) state.evolution = [];

let progressionChartInstance = null;
let evolutionChartInstance = null;

let progressionTypeFilter = 'hypertrophy';
let progressionSelectedGroup = null;
let progressionSelectedExId = null;

const getGroupEmoji = (groupName) => {
    if (!groupName) return '🏋️';
    const g = groupName.toLowerCase();
    if (g.includes('espalda')) return '🦇';
    if (g.includes('pecho')) return '🦍';
    if (g.includes('pierna') || g.includes('cuád') || g.includes('femoral')) return '🦵';
    if (g.includes('brazo') || g.includes('bícep') || g.includes('trícep')) return '💪';
    if (g.includes('hombro')) return '🥥';
    if (g.includes('core') || g.includes('abdom')) return '🍫';
    return '🏋️'; // default
};

const renderProgressionView = () => {
    const grid = document.getElementById('progression-groups-grid');
    if (!grid) return;
    
    // Setup buttons
    document.getElementById('btn-prog-hyp').className = progressionTypeFilter === 'hypertrophy' ? 'btn-primary' : 'btn-secondary';
    document.getElementById('btn-prog-heavy').className = progressionTypeFilter === 'heavy' ? 'btn-primary' : 'btn-secondary';
    document.getElementById('btn-prog-int').className = progressionTypeFilter === 'intensity' ? 'btn-primary' : 'btn-secondary';
    
    grid.innerHTML = '';
    const groups = state.groups.filter(g => g !== 'Sin Grupo');
    groups.forEach(g => {
        const card = document.createElement('div');
        card.style.background = progressionSelectedGroup === g ? 'var(--primary-color)' : 'var(--bg-surface-elevated)';
        card.style.color = progressionSelectedGroup === g ? '#fff' : 'var(--text-primary)';
        card.style.padding = '12px 8px';
        card.style.borderRadius = '8px';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.style.cursor = 'pointer';
        card.style.textAlign = 'center';
        card.style.border = '1px solid var(--border-color)';
        
        
        const gKey = g === 'Abdominales y core' ? 'core' : (g === 'Tríceps' ? 'triceps' : (g === 'Bíceps' ? 'biceps' : g.toLowerCase()));
        let trG = getT('groups.' + gKey);
        trG = trG !== 'groups.' + gKey ? trG : g;
        card.innerHTML = `<span style="font-size: 26px; margin-bottom: 6px; display: block; line-height: 1;">${getGroupEmoji(g)}</span><span style="font-size:12px; font-weight:600;">${trG}</span>`;
        
        card.onclick = () => {
            progressionSelectedGroup = progressionSelectedGroup === g ? null : g;
            progressionSelectedExId = null;
            // Clear search when clicking a group
            const searchInput = document.getElementById('progression-search');
            if (searchInput) searchInput.value = '';
            renderProgressionView();
        };
        grid.appendChild(card);
    });
    
    renderProgressionExerciseList();
    updateProgressionChart();
};

const renderProgressionExerciseList = () => {
    const list = document.getElementById('progression-exercise-list');
    const searchVal = document.getElementById('progression-search')?.value.toLowerCase() || '';
    
    if (!progressionSelectedGroup && !searchVal) {
        list.style.display = 'none';
        return;
    }
    
    list.style.display = 'flex';
    list.innerHTML = '';
    
    let filtered = state.exercises.filter(ex => {
        if (progressionSelectedGroup && ex.group !== progressionSelectedGroup) return false;
        if (searchVal && !ex.name.toLowerCase().includes(searchVal) && !getTrExName(ex.name).toLowerCase().includes(searchVal)) return false;
        return true;
    });
    
    if (filtered.length === 0) {
        list.innerHTML = '<div style="color:var(--text-muted); font-size:12px; padding:8px;">No hay ejercicios.</div>';
        return;
    }
    
    filtered.forEach(ex => {
        const item = document.createElement('div');
        item.style.padding = '12px';
        item.style.background = progressionSelectedExId === ex.id ? 'rgba(37, 99, 235, 0.1)' : 'var(--bg-surface)';
        item.style.border = progressionSelectedExId === ex.id ? '1px solid var(--primary-color)' : '1px solid var(--border-color)';
        item.style.borderRadius = '8px';
        item.style.fontSize = '14px';
        item.style.fontWeight = progressionSelectedExId === ex.id ? '600' : '400';
        item.style.cursor = 'pointer';
        item.textContent = getTrExName(ex.name);
        item.onclick = () => {
            progressionSelectedExId = ex.id;
            // Clear the search input so the list closes if no group is selected
            const searchInput = document.getElementById('progression-search');
            if (searchInput) searchInput.value = '';
            
            // To provide feedback to the user, we can display the selected exercise name above the chart
            let titleEl = document.getElementById('progression-chart-title');
            if (!titleEl) {
                titleEl = document.createElement('h3');
                titleEl.id = 'progression-chart-title';
                titleEl.style.fontSize = '14px';
                titleEl.style.marginBottom = '16px';
                titleEl.style.textAlign = 'center';
                
                const chartCanvas = document.getElementById('progression-chart');
                if (chartCanvas && chartCanvas.parentElement) {
                    chartCanvas.parentElement.insertBefore(titleEl, chartCanvas);
                }
            }
            if (titleEl) titleEl.textContent = getTrExName(ex.name);

            renderProgressionExerciseList();
            updateProgressionChart();
        };
        list.appendChild(item);
    });
};

document.getElementById('progression-search')?.addEventListener('input', renderProgressionExerciseList);

['btn-prog-hyp', 'btn-prog-heavy', 'btn-prog-int'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', (e) => {
        if (id.includes('hyp')) progressionTypeFilter = 'hypertrophy';
        if (id.includes('heavy')) progressionTypeFilter = 'heavy';
        if (id.includes('int')) progressionTypeFilter = 'intensity';
        
        document.getElementById('btn-prog-hyp').style.backgroundColor = progressionTypeFilter === 'hypertrophy' ? 'var(--color-hypertrophy)' : '';
        document.getElementById('btn-prog-heavy').style.backgroundColor = progressionTypeFilter === 'heavy' ? 'var(--color-heavy)' : '';
        document.getElementById('btn-prog-int').style.backgroundColor = progressionTypeFilter === 'intensity' ? 'var(--color-heavy)' : '';
        
        renderProgressionView();
    });
});

const updateProgressionChart = () => {
    if (!progressionSelectedExId) {
        if (progressionChartInstance) {
            progressionChartInstance.destroy();
            progressionChartInstance = null;
        }
        return;
    }
    
    const history = [];
    state.completedWorkouts.forEach(session => {
        // Apply filter by session type if requested by user
        if (session.type !== progressionTypeFilter) return;
        
        const sessionDate = session.date;
        let maxWeight = -1;
        let bestReps = -1;
        let found = false;
        
        session.exercises.forEach(sesEx => {
            if (sesEx.exerciseId === progressionSelectedExId) {
                sesEx.sets.forEach(set => {
                    const weight = parseFloat(set.weight) || 0;
                    const reps = parseFloat(set.reps) || 0;
                    // Find effective max weight/reps logic (higher weight prioritized, then reps)
                    if (weight > maxWeight || (weight === maxWeight && reps > bestReps)) {
                        maxWeight = weight;
                        bestReps = reps;
                    }
                    found = true;
                });
            }
        });
        
        if (found && maxWeight >= 0) {
            history.push({ date: sessionDate, weight: maxWeight, reps: bestReps });
        }
    });
    
    history.sort((a,b) => {
        const parseDate = d => {
            const [day, month, year] = d.split('/');
            return new Date(year, month - 1, day);
        };
        return parseDate(a.date) - parseDate(b.date);
    });
    
    const labels = history.map(h => h.date.substring(0, 5));
    const data = history.map(h => h.weight);
    const repsData = history.map(h => h.reps);
    
    const ctx = document.getElementById('progression-chart')?.getContext('2d');
    if (!ctx) return;
    
    if (progressionChartInstance) progressionChartInstance.destroy();
    
    progressionChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Peso Máximo (kg)',
                data: data,
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#2563EB',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const idx = context.dataIndex;
                            return context.raw + ' kg x ' + repsData[idx] + ' reps';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: true, color: 'rgba(0,0,0,0.05)' },
                    title: { display: true, text: 'Fecha' }
                },
                y: { 
                    beginAtZero: true,
                    grid: { display: true, color: 'rgba(0,0,0,0.05)' },
                    title: { display: true, text: 'Kg' }
                }
            }
        }
    });
};

const renderEvolutionView = () => {
    const ctx = document.getElementById('evolution-chart')?.getContext('2d');
    if (!ctx) return;
    
    const history = [...state.evolution].sort((a,b) => new Date(a.dateIso) - new Date(b.dateIso));
    
    const labels = history.map(h => {
        const d = new Date(h.dateIso);
        return d.getDate() + '/' + (d.getMonth() + 1);
    });
    const weightData = history.map(h => h.weight);
    
    if (evolutionChartInstance) evolutionChartInstance.destroy();
    
    evolutionChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Peso Corporal (kg)',
                data: weightData,
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#10B981',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: true, color: 'rgba(0,0,0,0.05)' } },
                y: { beginAtZero: false, grid: { display: true, color: 'rgba(0,0,0,0.05)' }, title: { display: true, text: 'Kg' } }
            }
        }
    });
    
    renderEvolutionHistory();
};

const renderEvolutionHistory = () => {
    const container = document.getElementById('evolution-history');
    if (!container) return;
    container.innerHTML = '';
    
    const history = [...state.evolution].sort((a,b) => new Date(b.dateIso) - new Date(a.dateIso));
    
    history.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.style.marginBottom = '12px';
        
        const d = new Date(item.dateIso);
        const dateStr = d.toLocaleDateString();
        
        let measurementsHtml = '';
        if (item.m1 || item.m2 || item.m3 || item.m4 || item.m5 || item.m6 || item.m7 || item.m8) {
            const isApk = window.isApkEnv;
            measurementsHtml = `
            <div style="margin-top: 12px; color: var(--text-secondary); background: var(--bg-background); padding: 8px; border-radius: 4px;">
                ${isApk ? `<div style="margin-bottom: 12px;"><img src="img/body-measurements.png" style="width: 100%; max-height: 200px; object-fit: contain; opacity: 0.8;"></div>` : ''}
                <div style="display: grid; grid-template-columns: auto auto; gap: 8px 16px; justify-content: start; font-size: 12px;">
                    ${item.m2 ? `<div><strong>${getT('evolution.m2').replace(/^\d+\.\s*/, '')}:</strong> ${item.m2} cm</div>` : '<div></div>'}
                    ${item.m3 ? `<div><strong>${getT('evolution.m3').replace(/^\d+\.\s*/, '')}:</strong> ${item.m3} cm</div>` : '<div></div>'}
                    ${item.m7 ? `<div><strong>${getT('evolution.m7').replace(/^\d+\.\s*/, '')}:</strong> ${item.m7} cm</div>` : '<div></div>'}
                    ${item.m8 ? `<div><strong>${getT('evolution.m8').replace(/^\d+\.\s*/, '')}:</strong> ${item.m8} cm</div>` : '<div></div>'}
                    ${item.m1 ? `<div><strong>${getT('evolution.m1').replace(/^\d+\.\s*/, '')}:</strong> ${item.m1} cm</div>` : '<div></div>'}
                    ${item.m4 ? `<div><strong>${getT('evolution.m4').replace(/^\d+\.\s*/, '')}:</strong> ${item.m4} cm</div>` : '<div></div>'}
                    ${item.m5 ? `<div><strong>${getT('evolution.m5').replace(/^\d+\.\s*/, '')}:</strong> ${item.m5} cm</div>` : '<div></div>'}
                    ${item.m6 ? `<div><strong>${getT('evolution.m6').replace(/^\d+\.\s*/, '')}:</strong> ${item.m6} cm</div>` : '<div></div>'}
                </div>
            </div>`;
        }

        let photosHtml = '';
        if (item.photos && item.photos.length > 0) {
            const isApk = window.isApkEnv;
            photosHtml = `
            <div style="display:flex; ${isApk ? 'flex-direction: column;' : 'flex-direction: row;'} gap:8px; margin-top:12px; overflow-x:auto;">`;
            item.photos.forEach(photo => {
                if (photo) {
                    photosHtml += `<img src="${photo}" style="height: ${isApk ? 'auto' : '100px'}; width: ${isApk ? '100%' : 'auto'}; max-height: ${isApk ? '300px' : 'none'}; border-radius: 8px; object-fit: cover; cursor: pointer;" onclick="document.getElementById('lightbox-img').src=this.src; document.getElementById('modal-lightbox').style.display='flex';">`;
                }
            });
            photosHtml += `</div>`;
        }
        
        const folderId = 'evol-details-' + item.id;
        
        const isApk = window.isApkEnv;
        div.innerHTML = `
            <div style="padding: 16px; cursor: pointer;" onclick="const d = document.getElementById('${folderId}'); d.style.display = d.style.display === 'none' ? 'block' : 'none';">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap: 8px;">
                        <i class="ph ph-folder" style="font-size: 20px; color: var(--primary-color);"></i>
                        <h4 style="margin:0; font-size:16px;">${dateStr}</h4>
                    </div>
                    <button class="btn-icon" style="color: var(--color-heavy); margin-left: 12px; padding: 4px;" onclick="event.stopPropagation(); deleteEvolution('${item.id}')"><i class="ph ph-trash"></i></button>
                </div>
                <div style="margin-top: 8px; color: var(--text-secondary); font-size: 14px; display: flex; ${isApk ? 'gap: 16px; justify-content: flex-start;' : 'gap: 8px; align-items: center;'}">
                    <span style="background: var(--bg-surface-elevated); padding: 4px 8px; border-radius: 12px; ${isApk ? 'width: 45%; text-align: left;' : ''}"><strong>Peso:</strong> ${item.weight} kg</span>
                    ${item.bf ? `<span style="background: var(--bg-surface-elevated); padding: 4px 8px; border-radius: 12px; ${isApk ? 'width: 45%; text-align: left;' : ''}"><strong>Grasa:</strong> ${item.bf}%</span>` : ''}
                    ${item.photos && item.photos.length > 0 && !isApk ? `<span style="color: var(--text-secondary); font-size: 12px; margin-left: auto;"><i class="ph ph-camera"></i> ${item.photos.length}</span>` : ''}
                    ${item.photos && item.photos.length > 0 && isApk ? `<div style="width: 100%; text-align: right; margin-top: 4px; font-size: 12px;"><i class="ph ph-camera"></i> ${item.photos.length}</div>` : ''}
                </div>
            </div>
            <div id="${folderId}" style="display:none; padding: 0 16px 16px 16px; border-top: 1px solid var(--border-color);">
                ${photosHtml}
                ${measurementsHtml}
            </div>
        `;
        
        container.appendChild(div);
    });
};

window.deleteEvolution = (id) => {
    if (confirm(getT('common.delete') + '?')) {
        state.evolution = state.evolution.filter(e => e.id !== id);
        saveState();
        renderEvolutionView();
    }
};

const getBase64Image = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 400;
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                const dataUrl = canvas.toDataURL('image/jpeg', 0.6); 
                resolve(dataUrl);
            };
            img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

document.getElementById('btn-save-evolution')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-save-evolution');
    const originalText = btn.textContent;
    btn.textContent = 'Guardando...';
    btn.disabled = true;

    try {
        const weight = document.getElementById('evolution-weight').value;
        const bf = document.getElementById('evolution-bf').value;
        
        if (!weight) {
            btn.textContent = originalText;
            btn.disabled = false;
            return alert(getT('alerts.weightRequired') || 'Weight required');
        }
        
        const frontInput = document.getElementById('evolution-photo-front');
        const sideInput = document.getElementById('evolution-photo-side');
        const backInput = document.getElementById('evolution-photo-back');
        
        const photos = [];
        if (frontInput.files[0]) photos.push(await getBase64Image(frontInput.files[0]));
        if (sideInput.files[0]) photos.push(await getBase64Image(sideInput.files[0]));
        if (backInput.files[0]) photos.push(await getBase64Image(backInput.files[0]));
        
        const m1 = parseFloat(document.getElementById('evol-m1')?.value) || null;
        const m2 = parseFloat(document.getElementById('evol-m2')?.value) || null;
        const m3 = parseFloat(document.getElementById('evol-m3')?.value) || null;
        const m4 = parseFloat(document.getElementById('evol-m4')?.value) || null;
        const m5 = parseFloat(document.getElementById('evol-m5')?.value) || null;
        const m6 = parseFloat(document.getElementById('evol-m6')?.value) || null;
        const m7 = parseFloat(document.getElementById('evol-m7')?.value) || null;
        const m8 = parseFloat(document.getElementById('evol-m8')?.value) || null;
        
        state.evolution.push({
            id: Date.now().toString(),
            dateIso: new Date().toISOString(),
            weight: parseFloat(weight),
            bf: bf ? parseFloat(bf) : null,
            photos: photos,
            m1, m2, m3, m4, m5, m6, m7, m8
        });
        
        saveState();
        
        document.getElementById('evolution-weight').value = '';
        document.getElementById('evolution-bf').value = '';
        if(frontInput) frontInput.value = '';
        if(sideInput) sideInput.value = '';
        if(backInput) backInput.value = '';
        
        for(let i=1; i<=8; i++) {
            const el = document.getElementById('evol-m' + i);
            if(el) el.value = '';
        }
        
        renderEvolutionView();
    } catch (err) {
        alert((getT('alerts.saveError') || 'Save error: ') + err.message);
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
});


// --- EXPORT LOGIC ---
let exportMode = "single"; // single, block, calendar
let exportSelected = new Set();

window.renderExportCalendar = () => {
    const grid = document.getElementById('export-weekly-grid');
    const sessionsList = document.getElementById('export-day-sessions-list');
    if(!grid || !sessionsList) return;
    
    grid.innerHTML = '';
    const viewDate = new Date(state.exportWeekStart || state.currentWeekStart); // using exportWeekStart as the month tracker now
    const viewMonth = viewDate.getMonth();
    const viewYear = viewDate.getFullYear();
    const monthNamesFull = getT('calendar.months');
    
    document.getElementById('export-current-week-label').textContent = `${monthNamesFull[viewMonth]} ${viewYear}`;
    
    const dayNames = getT("calendar.days");
    const todayStr = formatDate(new Date());
    const selDate = state.exportSelectedDate || state.selectedDate;
    const selectedDateStr = formatDate(selDate);
    
    // Add day headers
    dayNames.forEach(dName => {
        const h = document.createElement('div');
        h.style.textAlign = 'center';
        h.style.fontWeight = 'bold';
        h.style.fontSize = '12px';
        h.style.paddingBottom = '4px';
        h.textContent = dName;
        grid.appendChild(h);
    });
    
    // Calculate full month grid
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    let startOffset = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Monday is 0
    
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startOffset);
    
    for (let i = 0; i < 42; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        const dStr = formatDate(d);
        
        const cell = document.createElement('div');
        cell.classList.add('weekly-day');
        if (d.getMonth() !== viewMonth) cell.style.opacity = '0.3';
        if (dStr === todayStr) cell.classList.add('today');
        if (dStr === selectedDateStr) cell.classList.add('selected');
        
        cell.innerHTML = `
            <div class="day-num">${d.getDate()}</div>
        `;
        
        const daySessions = state.sessions.filter(s => s.date === dStr);
        if (daySessions.length > 0) {
            const indContainer = document.createElement('div');
            indContainer.classList.add('indicators-flex');
            const uniqueTypes = [...new Set(daySessions.map(s => s.type))];
            uniqueTypes.forEach(type => {
                const indicator = document.createElement('div');
                indicator.classList.add('day-indicator', `indicator-${type}`);
                indContainer.appendChild(indicator);
            });
            cell.appendChild(indContainer);
            
            const isApk = window.isApkEnv;
            if (isApk || dStr === selectedDateStr) {
                const colors = [];
                if(daySessions.some(s => s.type === 'hypertrophy')) colors.push('#2563EB');
                if(daySessions.some(s => s.type === 'heavy')) colors.push('#DC2626');
                if(daySessions.some(s => s.type === 'intensity')) colors.push('#10B981');
                if (colors.length === 1) {
                    cell.style.border = `2px solid ${colors[0]}`;
                } else if (colors.length > 1) {
                    const gradient = colors.join(', ');
                    cell.style.border = `2px solid transparent`;
                    cell.style.borderImage = `linear-gradient(to bottom right, ${gradient}) 1`;
                }
            }
            if (dStr === selectedDateStr && !isApk) {
                cell.style.border = '';
            }
        }
        
        if (dStr === selectedDateStr) {
            const isApk = window.isApkEnv;
            if (isApk) {
                cell.style.transform = 'scale(1.05)';
            }
        }
        
        cell.addEventListener('click', () => {
            state.exportSelectedDate = d;
            window.renderExportCalendar();
        });
        
        grid.appendChild(cell);
    }
    
    // Render sessions for the selected day
    sessionsList.innerHTML = '';
    const daySessions = state.sessions.filter(s => s.date === selectedDateStr);
    
    if (daySessions.length === 0) {
        sessionsList.innerHTML = `<div class="empty-state">No hay entrenamientos planificados para este día.</div>`;
    } else {
        daySessions.forEach(session => {
            const div = document.createElement("div");
            div.style.padding = "12px";
            div.style.borderRadius = "8px";
            div.style.border = "1px solid var(--border-color)";
            const isChecked = exportSelected.has(session.id);
            div.style.background = isChecked ? "var(--bg-export-selected)" : "var(--bg-surface-elevated)";
            div.style.borderLeft = `4px solid ${session.type === 'hypertrophy' ? 'var(--color-hypertrophy)' : session.type === 'heavy' ? 'var(--color-heavy)' : 'var(--color-intensity)'}`;
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.alignItems = "center";
            div.style.cursor = "pointer";
            div.style.marginBottom = "8px";
            
            let translatedType = session.type;
            if (session.type === 'hypertrophy') translatedType = 'Hipertrofia';
            if (session.type === 'heavy') translatedType = 'Pesado';
            if (session.type === 'intensity') translatedType = 'Alta intensidad';
            
            div.innerHTML = `
                <div>
                    <strong>${session.name || "Entrenamiento"}</strong><br>
                    <span style="font-size:12px; color:var(--text-secondary);">${translatedType}</span>
                </div>
                <input type="checkbox" ${isChecked ? "checked" : ""} style="pointer-events:none;">
            `;
            
            div.addEventListener("click", () => {
                if (exportSelected.has(session.id)) exportSelected.delete(session.id);
                else exportSelected.add(session.id);
                window.renderExportCalendar();
                renderExportList();
            });
            
            sessionsList.appendChild(div);
        });
    }
};

const renderExportList = () => {
    const container = document.getElementById("export-list-container");
    const countEl = document.getElementById("export-selected-count");
    const actionCont = document.getElementById("export-action-container");
    if(!container) return;
    
    if (window.isApkEnv) {
        const viewExport = document.getElementById("view-export");
        const modeButtons = viewExport.querySelector('div:first-child');
        const descText = viewExport.querySelector('p');
        if (modeButtons) modeButtons.style.display = 'none';
        if (descText) descText.style.display = 'none';
        if (actionCont) actionCont.style.display = 'none';
        
        container.innerHTML = `
            <div style="padding: 0 16px;">
                <h2 style="font-size: 18px; color: var(--text-primary); margin-bottom: 8px;">${getT('header.export')}</h2>
                <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px; line-height: 1.5;">${getT('export.desc')}</p>
                
                <button id="btn-backup-export" class="btn-secondary" style="width: 100%; padding: 16px; margin-bottom: 16px; font-weight: 600; display: flex; justify-content: center; gap: 8px;"><i class="ph ph-download-simple"></i> ${getT('export.exportBtn')}</button>
                <button id="btn-backup-import" class="btn-secondary" style="width: 100%; padding: 16px; font-weight: 600; display: flex; justify-content: center; gap: 8px;"><i class="ph ph-upload-simple"></i> ${getT('export.importBtn')}</button>
            </div>
            <input type="file" id="file-import-json" accept=".json" style="display: none;">
        `;
        
        document.getElementById('btn-backup-export').addEventListener('click', async () => {
            try {
                const data = {
                    gym_exercises: localStorage.getItem('gym_exercises'),
                    gym_groups: localStorage.getItem('gym_groups'),
                    gym_sessions: localStorage.getItem('gym_sessions'),
                    gym_evolution: localStorage.getItem('gym_evolution'),
                    gym_routines: localStorage.getItem('gym_routines'),
                    gym_goals: localStorage.getItem('gym_goals'),
                    gym_completed: localStorage.getItem('gym_completed')
                };
                const jsonStr = JSON.stringify(data);
                const filename = 'gymtracker_backup_' + new Date().toISOString().split('T')[0] + '.json';
                
                if (window.Capacitor && window.Capacitor.Plugins.SaveAs && window.Capacitor.Plugins.Filesystem) {
                    try {
                        const { Filesystem } = window.Capacitor.Plugins;
                        // Write to cache first to avoid memory limits in intents
                        const cacheResult = await Filesystem.writeFile({
                            path: 'temp_backup.json',
                            data: jsonStr,
                            directory: 'CACHE',
                            encoding: 'utf8'
                        });
                        
                        // Pass the absolute file path to the native SaveAs plugin
                        // The uri might be something like "file:///data/user/0/com.gymtracker.app/cache/temp_backup.json"
                        // Convert "file://" to normal path by removing it
                        const cachePath = cacheResult.uri.replace(/^file:\/\//, '');

                        await window.Capacitor.Plugins.SaveAs.save({
                            sourcePath: cachePath,
                            filename: filename,
                            mimeType: 'application/json'
                        });
                        alert(getT('alerts.backupSuccess') || 'Backup saved');
                    } catch (e) {
                        if (e.message !== 'User cancelled') {
                            alert((getT('alerts.saveError') || 'Save error: ') + e.message);
                        }
                    }
                } else {
                    const blob = new Blob([jsonStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }
            } catch (e) {
                console.error(e);
                alert((getT('alerts.exportError') || 'Export error: ') + e.message);
            }
        });

        document.getElementById('btn-backup-import').addEventListener('click', () => {
            document.getElementById('file-import-json').click();
        });

        document.getElementById('file-import-json').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    if (data.gym_exercises) localStorage.setItem('gym_exercises', data.gym_exercises);
                    if (data.gym_groups) localStorage.setItem('gym_groups', data.gym_groups);
                    if (data.gym_sessions) localStorage.setItem('gym_sessions', data.gym_sessions);
                    if (data.gym_evolution) localStorage.setItem('gym_evolution', data.gym_evolution);
                    if (data.gym_routines) localStorage.setItem('gym_routines', data.gym_routines);
                    if (data.gym_goals) localStorage.setItem('gym_goals', data.gym_goals);
                    if (data.gym_completed) localStorage.setItem('gym_completed', data.gym_completed);
                    alert(getT('alerts.importSuccess') || 'Import successful. App will restart.');
                    window.location.reload();
                } catch (err) {
                    alert((getT('alerts.readError') || 'Read error: ') + err.message + '\nPreview: ' + String(ev.target.result).substring(0, 100));
                }
            };
            reader.readAsText(file);
        });
        return;
    }
    
    container.innerHTML = "";
    
    const workouts = state.sessions ? [...state.sessions] : [];
    if(workouts.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay entrenamientos planificados para exportar. Añade entrenamientos al calendario primero.</div>';
        actionCont.style.display = "none";
        return;
    }
    
    actionCont.style.display = "flex";
    
    let renderData = [];
    if (exportMode === "single") {
        workouts.forEach(w => renderData.push({ type: 'item', label: w.name, sub: w.type, id: w.id, dateStr: w.date }));
    } else if (exportMode === "block") {
        const blocks = {};
        workouts.forEach(w => {
            const baseName = w.name ? w.name.replace(/\s+\(.*?\d+\)$/, '').trim() : getT('workout.title');
            if(!blocks[baseName]) blocks[baseName] = [];
            blocks[baseName].push(w.id);
        });
        Object.keys(blocks).forEach(key => {
            renderData.push({ type: 'group', label: 'Bloque: ' + key, count: blocks[key].length, ids: blocks[key] });
        });
    } else if (exportMode === "calendar") {
        container.innerHTML = `
            <div class="calendar-header-week" style="margin-bottom: 16px;">
                <div class="week-navigation" style="display:flex; align-items:center; justify-content:center; width:100%;">
                    <button id="export-prev-week" class="btn-icon" style="padding:8px;"><i class="ph ph-caret-left"></i></button>
                    <span id="export-current-week-label" style="margin: 0 16px; font-weight:600;">Semana</span>
                    <button id="export-next-week" class="btn-icon" style="padding:8px;"><i class="ph ph-caret-right"></i></button>
                </div>
            </div>
            <div id="export-weekly-grid" class="weekly-grid"></div>
            <div class="today-sessions">
                <h3 style="font-size:14px; margin-top:16px; margin-bottom:8px; color:var(--text-secondary);">Plan para el día</h3>
                <div id="export-day-sessions-list" class="sessions-list"></div>
            </div>
        `;
        
        state.exportWeekStart = state.exportWeekStart || new Date(state.currentWeekStart);
        state.exportSelectedDate = state.exportSelectedDate || new Date(state.selectedDate);
        
        document.getElementById('export-prev-week').addEventListener('click', () => {
            state.exportWeekStart.setMonth(state.exportWeekStart.getMonth() - 1);
            window.renderExportCalendar();
        });
        document.getElementById('export-next-week').addEventListener('click', () => {
            state.exportWeekStart.setMonth(state.exportWeekStart.getMonth() + 1);
            window.renderExportCalendar();
        });
        window.renderExportCalendar();
        return; // Skip renderData UI
    }
    
    renderData.forEach(item => {
        const div = document.createElement("div");
        div.className = item.type === 'item' ? `session-card type-${item.sub}` : `session-card type-goal`;
        div.style.marginBottom = "8px";
        
        if (item.type === 'item') {
            const isChecked = exportSelected.has(item.id);
            div.style.background = isChecked ? "var(--bg-export-selected)" : "var(--bg-surface)";
            
            let dateStr = item.dateStr ? item.dateStr : "Sin planificar";
            let typeName = item.sub === 'hypertrophy' ? 'Hipertrofia' : item.sub === 'heavy' ? 'Pesado' : item.sub === 'intensity' ? 'Alta Intensidad' : 'Objetivo';
            
            div.innerHTML = `
                <div class="session-info">
                    <h4>${item.label || "Entrenamiento"}</h4>
                    <p>${dateStr} &bull; ${typeName}</p>
                </div>
                <input type="checkbox" ${isChecked ? "checked" : ""} style="pointer-events:none;">
            `;
            
            div.addEventListener("click", () => {
                if(exportSelected.has(item.id)) exportSelected.delete(item.id);
                else exportSelected.add(item.id);
                renderExportList();
            });
        } else {
            const allSelected = item.ids.length > 0 && item.ids.every(id => exportSelected.has(id));
            div.style.background = allSelected ? "var(--bg-export-selected)" : "var(--bg-surface)";
            div.innerHTML = `
                <div class="session-info">
                    <h4>${item.label}</h4>
                    <p>${item.count} entrenamientos</p>
                </div>
                <input type="checkbox" ${allSelected ? "checked" : ""} style="pointer-events:none;">
            `;
            
            div.addEventListener("click", () => {
                if (allSelected) {
                    item.ids.forEach(id => exportSelected.delete(id));
                } else {
                    item.ids.forEach(id => exportSelected.add(id));
                }
                renderExportList();
            });
        }
        
        container.appendChild(div);
    });
    
    const labelEl = countEl.parentElement;
    if(labelEl && labelEl.tagName.toLowerCase() === 'span') {
        labelEl.innerHTML = `<strong id="export-selected-count">${exportSelected.size}</strong> ${exportSelected.size === 1 ? 'elemento seleccionado' : 'elementos seleccionados'}`;
    }
};

["single", "block", "calendar"].forEach(m => {
    const btn = document.getElementById("btn-export-mode-" + m);
    if(btn) {
        btn.addEventListener("click", (e) => {
            exportMode = m;
            document.getElementById("btn-export-mode-single").className = "btn-secondary";
            document.getElementById("btn-export-mode-block").className = "btn-secondary";
            document.getElementById("btn-export-mode-calendar").className = "btn-secondary";
            e.target.className = "btn-primary";
            exportSelected.clear();
            renderExportList();
        });
    }
});

document.getElementById("btn-deselect-all-export")?.addEventListener("click", () => {
    exportSelected.clear();
    renderExportList();
});

document.getElementById("btn-generate-pdf")?.addEventListener("click", async () => {
    const selectedIds = Array.from(exportSelected);
    if(selectedIds.length === 0) {
        alert(getT('alerts.exportMin') || 'Select at least 1 workout to export');
        return;
    }
    
    const sessionsToExport = state.sessions.filter(s => selectedIds.includes(s.id));
    sessionsToExport.sort((a,b) => new Date(a.date) - new Date(b.date));
    
    if (sessionsToExport.length === 0) return alert(getT('alerts.exportNotFound') || 'No planned workouts found');
    
    let printContainer = document.getElementById('print-container');
    if (!printContainer) {
        printContainer = document.createElement('div');
        printContainer.id = 'print-container';
        document.body.appendChild(printContainer);
    }
    printContainer.innerHTML = '';
    printContainer.style.display = 'block';
    
    sessionsToExport.forEach((session) => {
        const sessionDiv = document.createElement('div');
        sessionDiv.classList.add('print-session');
        
        let typeName = session.type === 'hypertrophy' ? 'Hipertrofia' : session.type === 'heavy' ? 'Pesado' : session.type === 'intensity' ? 'Alta Intensidad' : session.type;
        let themeColor = session.type === 'hypertrophy' ? '#2563EB' : session.type === 'heavy' ? '#DC2626' : session.type === 'intensity' ? '#10B981' : '#555';
        
        const groupSet = new Set();
        (session.exercises || []).forEach(ex => {
            const dbEx = state.exercises.find(e => e.id === ex.exerciseId);
            if (dbEx && dbEx.group) groupSet.add(dbEx.group);
        });
        const groupsString = groupSet.size > 0 ? ` &nbsp;|&nbsp; <strong>Grupos:</strong> ${Array.from(groupSet).join(', ')}` : '';

        const dropsetFormula = session.type === 'intensity' ? `<p style="margin: 8px 0 0 0; color: #4B5563; font-size: 13px;"><em>Fórmula Dropset: 20% = Peso × 0.2 &nbsp;|&nbsp; 40% = Peso × 0.4</em></p>` : '';
        sessionDiv.innerHTML = `
            <div style="border-left: 6px solid ${themeColor}; padding-left: 16px; margin-bottom: 32px;">
                <h1 style="margin: 0; font-size: 28px; color: #111827;">${session.name}</h1>
                <p style="margin: 8px 0 0 0; color: #6B7280; font-size: 14px;"><strong>Fecha Prevista:</strong> ${session.date} &nbsp;|&nbsp; <strong>Enfoque:</strong> ${typeName}${groupsString}</p>
                ${dropsetFormula}
            </div>
        `;
        
        const displayBlocks = [];
        let currentSupersetId = null;
        let currentBlock = null;
        
        (session.exercises || []).forEach((ex, index) => {
            if (ex.supersetId) {
                if (currentSupersetId === ex.supersetId) {
                    currentBlock.exercises.push(ex);
                } else {
                    currentSupersetId = ex.supersetId;
                    currentBlock = { type: 'superset', id: ex.supersetId, name: ex.supersetName || 'Superserie', exercises: [ex] };
                    displayBlocks.push(currentBlock);
                }
            } else {
                currentSupersetId = null;
                displayBlocks.push({ type: 'single', id: 'single_' + index, name: ex.name, exercises: [ex] });
            }
        });

        let exerciseCounter = 1;

        displayBlocks.forEach(block => {
            if (!block.exercises || block.exercises.length === 0) return;

            const blockContainer = document.createElement('div');
            blockContainer.classList.add('print-block-container');
            blockContainer.style.cssText = "margin-bottom: 16px; padding: 12px; border: 1px solid #E5E7EB; border-radius: 12px; background-color: #fafafa;";
            
            const blockTitle = document.createElement('h2');
            const prefix = block.type === 'superset' ? 'Superserie' : 'Ejercicio';
            blockTitle.textContent = `${prefix} ${exerciseCounter++}`;
            blockTitle.style.cssText = "margin: 0 0 12px 0; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #E5E7EB; padding-bottom: 4px;";
            blockContainer.appendChild(blockTitle);
            
            block.exercises.forEach(ex => {
                const dbEx = state.exercises.find(e => e.id === ex.exerciseId);
                const hasImage = dbEx && dbEx.imageData;
                
                const exContainer = document.createElement('div');
                exContainer.classList.add('print-exercise-container');
                exContainer.style.cssText = "display: flex; gap: 16px; margin-bottom: 16px; align-items: flex-start;";
                
                const tableContent = document.createElement('div');
                tableContent.style.flex = "1";
                
                const exName = document.createElement('h3');
                exName.style.cssText = "margin: 0 0 4px 0; font-size: 14px; color: #1f2937;";
                exName.textContent = getTrExName(ex.name) + (ex.comments ? ` (Nota: ${ex.comments})` : '');
                tableContent.appendChild(exName);

                const table = document.createElement('table');
                table.classList.add('print-table');
                const hasDropset = (ex.sets || []).some(s => s.type && s.type.toLowerCase().includes('dropset'));
                const showFallo = session.type === 'intensity' && hasDropset;
                
                table.innerHTML = `
                    <thead>
                        <tr style="background-color: #f3f4f6;">
                            <th style="width: 12%;">${getT('workout.series') || 'Serie'}</th>
                            <th style="width: 20%;">Tipo</th>
                            <th style="width: 16%;">Desc.</th>
                            <th style="width: 26%;">Peso</th>
                            <th style="width: 26%;">Reps</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `
                const tbody = table.querySelector('tbody');
                
                (ex.sets || []).forEach((set, i) => {
                    let setTypeLabel = getSetTypeT(set.type);
                    if (set.type && ['Calentamiento', 'Aproximación', 'Efectiva', 'Al fallo', 'Dropset', 'Dropset fallo'].includes(set.type)) {
                        setTypeLabel = set.type; 
                    }
                    
                    
                    const isDropset = set.type && set.type.toLowerCase().includes('dropset');
                    const isIntensityDropset = session.type === 'intensity' && isDropset;
                    
                    const weightBox = isIntensityDropset ? '<div style="display:flex; align-items:center; justify-content:center; gap:4px;"><div class="print-input-box" style="width:40px;"></div>/ <div class="print-input-box" style="width:40px;"></div></div>' : '<div class="print-input-box"></div>';
                    
                    const repsBox = isIntensityDropset ? '<div style="display:flex; align-items:center; justify-content:center; gap:4px;"><div class="print-input-box" style="width:40px;"></div>/ <div class="print-input-box" style="width:40px;"></div></div>' : '<div class="print-input-box"></div>';
                    
                    const rowHtml = `
                        <tr>
                            <td>${i+1}</td>
                            <td>${setTypeLabel}</td>
                            <td>${set.restTime || '-'}</td>
                            <td>${weightBox}</td>
                            <td>${repsBox}</td>
                        </tr>
                    `;
                    tbody.innerHTML += rowHtml;
                });
                
                tableContent.appendChild(table);
                exContainer.appendChild(tableContent);
                
                if (hasImage || (dbEx && dbEx.youtubeLink)) {
                    const imgContent = document.createElement('div');
                    imgContent.style.cssText = "width: 120px; flex-shrink: 0; display:flex; flex-direction:column; gap:8px;";
                    
                    if (hasImage) {
                        const img = document.createElement('img');
                        img.src = dbEx.imageData;
                        img.style.cssText = "width: 100%; border-radius: 8px; border: 1px solid #E5E7EB; object-fit: cover;";
                        imgContent.appendChild(img);
                    }
                    if (dbEx && dbEx.youtubeLink) {
                        const qr = document.createElement('img');
                        qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(dbEx.youtubeLink)}`;
                        qr.style.cssText = "width: 70px; margin: 0 auto; border-radius: 4px; border: 1px solid #E5E7EB; object-fit: contain;";
                        imgContent.appendChild(qr);
                    }
                    
                    exContainer.appendChild(imgContent);
                }
                
                blockContainer.appendChild(exContainer);
            });
            sessionDiv.appendChild(blockContainer);
        });
        
        printContainer.appendChild(sessionDiv);
    });
    
    const doPrint = async () => {
        if (window.isApkEnv && typeof html2pdf !== 'undefined') {
            let filename = prompt("Nombre del archivo PDF a guardar:", "Entrenamientos");
            if (!filename) return;
            if (!filename.toLowerCase().endsWith('.pdf')) filename += '.pdf';
            
            printContainer.style.display = 'block';
            printContainer.style.position = 'absolute';
            printContainer.style.left = '0';
            printContainer.style.top = '0';
            printContainer.style.width = '100%';
            printContainer.style.background = 'white';
            printContainer.style.zIndex = '9999';
            
            const opt = {
                margin:       10,
                filename:     filename,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            try {
                document.body.classList.remove('is-apk');
                const pdfBase64 = await html2pdf().set(opt).from(printContainer).outputPdf('datauristring');
                document.body.classList.add('is-apk');
                const base64Data = pdfBase64.split(',')[1];
                
                const { Filesystem } = window.Capacitor.Plugins;
                
                await Filesystem.writeFile({
                    path: filename,
                    data: base64Data,
                    directory: 'DOCUMENTS'
                });
                
                alert('ÉXITO: El PDF se ha guardado en la carpeta Documentos del almacenamiento de tu teléfono como "' + filename + '".');
            } catch (e) {
                console.error(e);
                alert('Error al generar PDF: ' + e.message);
                document.body.classList.add('is-apk');
            } finally {
                printContainer.style.display = 'none';
                printContainer.innerHTML = '';
            }
        } else {
            window.print();
            printContainer.style.display = 'none';
            printContainer.innerHTML = '';
        }
    };
    
    // Wait for images to load
    const images = printContainer.querySelectorAll('img');
    if (images.length === 0) {
        setTimeout(doPrint, 300);
    } else {
        let loaded = 0;
        const checkDone = () => {
            loaded++;
            if(loaded === images.length) setTimeout(doPrint, 200);
        };
        images.forEach(img => {
            if(img.complete) {
                checkDone();
            } else {
                img.onload = checkDone;
                img.onerror = checkDone;
            }
        });
        // fallback in case an image hangs
        setTimeout(() => { if(loaded < images.length) doPrint(); }, 3000);
    }
});

// INITIALIZE THEME LISTENER
document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-mode');
    const isLight = document.documentElement.classList.contains('light-mode');
    localStorage.setItem('gym_theme', isLight ? 'light' : 'dark');
    document.getElementById('theme-icon').className = isLight ? 'ph ph-moon' : 'ph ph-sun';
});
const savedTheme = localStorage.getItem('gym_theme');
if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
    if(document.getElementById('theme-icon')) document.getElementById('theme-icon').className = 'ph ph-moon';
}

// Delete History logic
document.getElementById('btn-delete-history')?.addEventListener('click', () => {
    if(confirm('¿Estás seguro de que quieres eliminar TODO tu historial de entrenamientos? Esta acción no se puede deshacer.')) {
        state.completedWorkouts = [];
        saveState();
        renderGlobalHistory();
    }
});

window.editSession = (sessionId) => {
    const session = state.sessions.find(s => s.id === sessionId);
    if(!session) return;
    
    editingSessionId = session.id;
    const rn = document.getElementById('routine-name'); if(rn) rn.value = session.name || '';
    const rd = document.getElementById('routine-duration'); if(rd) rd.value = session.duration || 1;
    const rt = document.getElementById('routine-type'); if(rt) rt.value = session.type || 'hypertrophy';
    
    routineItems = [];
    const grouped = {};
    (session.exercises || []).forEach(ex => {
        const id = ex.supersetId || 'single_' + ex.exerciseId;
        if(!grouped[id]) grouped[id] = { isSuperset: !!ex.supersetId, name: ex.supersetName || '', exercises: [] };
        
        const dbEx = state.exercises.find(e => e.id === ex.exerciseId);
        grouped[id].exercises.push({
            exerciseId: ex.exerciseId,
            dbEx: dbEx,
            sets: ex.sets.map(s => ({ type: s.type, reps: s.targetReps, restTime: s.restTime }))
        });
    });
    
    for(const key in grouped) {
        routineItems.push({
            id: Date.now().toString() + Math.random(),
            isSuperset: grouped[key].isSuperset,
            name: grouped[key].name,
            exercises: grouped[key].exercises
        });
    }
    
    renderRoutineItems();
    openModal(modalAddRoutine);
};

document.getElementById('header-edit-switch')?.querySelector('input').addEventListener('change', (e) => {
    state.calendarEditMode = e.target.checked;
    renderTodaySessions();
});

// Nav arrows logic
const navScroll = document.getElementById('bottom-nav');
const navArrows = document.querySelectorAll('.nav-arrow');
if(navScroll && navArrows.length === 2 && window.isApkEnv) {
  navArrows[0].addEventListener('click', () => navScroll.scrollBy({left: -100, behavior: 'smooth'}));
  navArrows[1].addEventListener('click', () => navScroll.scrollBy({left: 100, behavior: 'smooth'}));
  const checkScroll = () => {
    navArrows[0].style.opacity = navScroll.scrollLeft > 0 ? '1' : '0.3';
    navArrows[1].style.opacity = navScroll.scrollLeft < (navScroll.scrollWidth - navScroll.clientWidth - 5) ? '1' : '0.3';
  };
  navScroll.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', checkScroll);
  setTimeout(checkScroll, 500);
}

if (window.isApkEnv) {
    document.body.classList.add('is-apk');
    const exportNavLabel = document.querySelector('.nav-item[data-target="view-export"] span');
    if (exportNavLabel) exportNavLabel.textContent = 'Exp/Imp';
    
    // Evolution form layout for APK
    const weightInput = document.getElementById('evolution-weight');
    const bfInput = document.getElementById('evolution-bf');
    if (weightInput && bfInput) {
        weightInput.style.flex = 'none';
        weightInput.style.width = '45%';
        bfInput.style.flex = 'none';
        bfInput.style.width = '45%';
    }
    const frontPhoto = document.getElementById('evolution-photo-front');
    if (frontPhoto) {
        const photoContainer = frontPhoto.parentElement;
        if (photoContainer) photoContainer.style.flexDirection = 'column';
    }
    const m1 = document.getElementById('evol-m1');
    if (m1) {
        const grid = m1.parentElement.parentElement;
        const container = grid.parentElement;
        if (container && grid) {
            container.style.flexDirection = 'column';
            container.style.alignItems = 'flex-start';
            const img = container.querySelector('img');
            if (img) {
                img.style.width = '100%';
                img.style.maxWidth = '200px';
                img.style.marginBottom = '16px';
                img.style.alignSelf = 'center';
            }
            grid.style.marginLeft = '0';
            grid.style.width = '100%';
            grid.style.justifyContent = 'start';
        }
    }
}

// ...
document.addEventListener('DOMContentLoaded', async () => {
    // Fallback for cached index.html
    const timerElem = document.getElementById('workout-timer');
    if (timerElem && !document.getElementById('workout-timer-container')) {
        const container = document.createElement('div');
        container.id = 'workout-timer-container';
        container.style.display = 'none';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'flex-end';
        timerElem.parentNode.insertBefore(container, timerElem);
        container.appendChild(timerElem);
        timerElem.style.display = 'block';
        const cancelBtnEl = document.createElement('button');
        cancelBtnEl.id = 'btn-cancel-workout';
        cancelBtnEl.style.cssText = 'background:none; border:none; color:var(--error-color, #ff4d4f); font-size: 12px; cursor:pointer; padding: 2px 0 0 0; display:none;';
        cancelBtnEl.textContent = 'Cancelar';
        container.appendChild(cancelBtnEl);
    }
    if (window.Capacitor && window.Capacitor.Plugins.LocalNotifications) {
        const { LocalNotifications } = window.Capacitor.Plugins;
        LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction) => {
            if (state && state.activeWorkoutState) {
                if (window.manageWorkoutNotification) window.manageWorkoutNotification(true);
            }
        });
    }

    const cancelBtn = document.getElementById('btn-cancel-workout');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (confirm(getT('workout.cancelConfirm') || 'Cancel workout? Data will be lost.')) {
                const workoutView = document.getElementById('view-workout');
                if (workoutView) workoutView.classList.remove('active');
                state.activeWorkoutState = null;
                activeSession = null;
                openExerciseAccordions = [];
                if (typeof timerInterval !== 'undefined') clearInterval(timerInterval);
                if (window.manageWorkoutNotification) window.manageWorkoutNotification(false);
                saveState();
                if (typeof updateWorkoutBanner === 'function') updateWorkoutBanner();
                if (typeof renderCalendar === 'function') renderCalendar();
            }
        });
    }
});



document.getElementById('btn-export-calendar').addEventListener('click', async () => {
    try {
        const data = {
            gym_exercises: localStorage.getItem('gym_exercises'),
            gym_groups: localStorage.getItem('gym_groups'),
            gym_sessions: localStorage.getItem('gym_sessions'),
            gym_routines: localStorage.getItem('gym_routines')
        };
        const jsonStr = JSON.stringify(data);
        const filename = 'gymtracker_planned_' + new Date().toISOString().split('T')[0] + '.json';
        
        if (window.Capacitor && window.Capacitor.Plugins.SaveAs && window.Capacitor.Plugins.Filesystem) {
            try {
                const { Filesystem } = window.Capacitor.Plugins;
                const cacheResult = await Filesystem.writeFile({
                    path: 'temp_planned.json',
                    data: jsonStr,
                    directory: 'CACHE',
                    encoding: 'utf8'
                });
                
                const cachePath = cacheResult.uri.replace(/^file:\/\//, '');
                await window.Capacitor.Plugins.SaveAs.save({
                    sourcePath: cachePath,
                    filename: filename,
                    mimeType: 'application/json'
                });
                alert(getT('alerts.exportSuccess') || 'Export successful');
            } catch (err) {
                alert((getT('alerts.exportError') || 'Export error: ') + err.message);
            }
        } else {
            const blob = new Blob([jsonStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
    } catch (e) {
        alert((getT('alerts.exportError') || 'Export error: ') + e.message);
    }
});

document.getElementById('btn-import-calendar').addEventListener('click', () => {
    document.getElementById('file-import-calendar').click();
});

document.getElementById('file-import-calendar').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const data = JSON.parse(ev.target.result);
            if (data.gym_exercises) localStorage.setItem('gym_exercises', data.gym_exercises);
            if (data.gym_groups) localStorage.setItem('gym_groups', data.gym_groups);
            if (data.gym_sessions) localStorage.setItem('gym_sessions', data.gym_sessions);
            if (data.gym_routines) localStorage.setItem('gym_routines', data.gym_routines);
            alert(getT('alerts.importSuccess') || 'Import successful. App will restart.');
            window.location.reload();
        } catch (err) {
            alert((getT('alerts.readError') || 'Read error: ') + err.message + '\nPreview: ' + String(ev.target.result).substring(0, 100));
        }
    };
    reader.readAsText(file);
});
