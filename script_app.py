import re
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

def repl(pattern, replacement):
    global content
    content = re.sub(pattern, replacement, content)

# 1. State variable
repl(r'let state = {', r"let state = {\n    language: localStorage.getItem('gym_language') || 'es',")

# 2. Translations dictionary
translations_str = """
const translations = {
    es: {
        nav: { calendar: "Calendario", exercises: "Ejercicios", history: "Historial" },
        header: { title: "Calendario" },
        calendar: {
            today: "Hoy", dayPlan: "Plan para el día", selectDay: "Selecciona un día",
            week: "Semana", months: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            days: ["L", "M", "X", "J", "V", "S", "D"]
        },
        exercises: { search: "Buscar ejercicios...", empty: "No hay ejercicios. Añade uno nuevo." },
        history: { title: "Registro de Entrenamientos", empty: "No hay entrenamientos completados aún." },
        workout: { title: "Entrenamiento", start: "Iniciar", finish: "Finalizar Entrenamiento", finishConfirm: "¿Finalizar entrenamiento?", sets: "Series" },
        common: { cancel: "Cancelar", add: "Añadir", delete: "Eliminar", confirm: "Confirmar", edit: "Editar", save: "Guardar", yes: "Sí", no: "No", ok: "OK", create: "Crear" },
        types: { hypertrophy: "Hipertrofia", heavy: "Pesados", intensity: "Alta Int.", workout: "Entrenamiento", goal: "Objetivo de Pasos" },
        modals: {
            add: { title: "¿Qué quieres añadir?", block: "Bloque 4 Semanas", workout: "Entrenamiento Suelto (Hoy)", goal: "Objetivo de Pasos (Hoy)" },
            delete: { title: "Eliminar Sesión", single: "Solo esta sesión", recurring: "Esta sesión y de semanas futuras", confirm: "¿Eliminar sesión?" },
            goal: { title: "Objetivo de Pasos", desc: "Dado que el navegador no puede acceder automáticamente a Samsung Health, deberás apuntar aquí tu objetivo y marcarlo como completado al final del día.", label: "Pasos Objetivo (ej. 10000)", save: "Guardar Objetivo", reached: "¡Objetivo alcanzado!" },
            picker: { title: "Ir a Fecha" },
            groups: { title: "Gestionar Grupos", new: "Nuevo Grupo..." },
            routine: { title: "Añadir Bloque (4 sem)", type: "Tipo de Sesión", name: "Nombre", namePlaceholder: "Ej. Torso Pesado", selected: "Ejercicios Seleccionados", selectBtn: "Seleccionar Ejercicios", createSuperset: "Crear Superserie", schedule: "Programar" },
            selectEx: { title: "Elige Ejercicios" },
            exercise: { title: "Nuevo Ejercicio", editTitle: "Editar Ejercicio", name: "Nombre del Ejercicio", namePlaceholder: "Ej. Press de Banca", group: "Grupo (Carpeta)", youtube: "Enlace YouTube (Opcional)", image: "Imagen Adjunta (Opcional)", max1rm: "1RM Actual (Manual) (kg)", repsHyp: "Reps. (Hipertrofia)", repsHea: "Reps. (Pesado)", repsInt: "Reps. (Alta Int.)", save: "Guardar Ejercicio" },
            dropset: { title: "Calculadora Dropset", currentWeight: "Peso actual:" },
            inlineHistory: { title: "Historial del Ejercicio" }
        },
        language: { select: "Seleccionar Idioma" },
        misc: { supersetOf: "Superserie de", groupUnassigned: "Sin Grupo", steps: "Pasos" }
    },
    en: {
        nav: { calendar: "Calendar", exercises: "Exercises", history: "History" },
        header: { title: "Calendar" },
        calendar: {
            today: "Today", dayPlan: "Daily Plan", selectDay: "Select a day",
            week: "Week", months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
            days: ["M", "T", "W", "T", "F", "S", "S"]
        },
        exercises: { search: "Search exercises...", empty: "No exercises. Add a new one." },
        history: { title: "Workout Log", empty: "No completed workouts yet." },
        workout: { title: "Workout", start: "Start", finish: "Finish Workout", finishConfirm: "Finish workout?", sets: "Sets" },
        common: { cancel: "Cancel", add: "Add", delete: "Delete", confirm: "Confirm", edit: "Edit", save: "Save", yes: "Yes", no: "No", ok: "OK", create: "Create" },
        types: { hypertrophy: "Hypertrophy", heavy: "Heavy", intensity: "High Int.", workout: "Workout", goal: "Step Goal" },
        modals: {
            add: { title: "What to add?", block: "4-Week Block", workout: "Single Workout (Today)", goal: "Step Goal (Today)" },
            delete: { title: "Delete Session", single: "Only this session", recurring: "This session and future ones", confirm: "Delete session?" },
            goal: { title: "Step Goal", desc: "Since the browser cannot automatically access Samsung Health, record your goal here and mark it completed at the end of the day.", label: "Target Steps (e.g. 10000)", save: "Save Goal", reached: "Goal reached!" },
            picker: { title: "Go to Date" },
            groups: { title: "Manage Groups", new: "New Group..." },
            routine: { title: "Add Block (4 wks)", type: "Session Type", name: "Name", namePlaceholder: "e.g. Heavy Upper", selected: "Selected Exercises", selectBtn: "Select Exercises", createSuperset: "Create Superset", schedule: "Schedule" },
            selectEx: { title: "Choose Exercises" },
            exercise: { title: "New Exercise", editTitle: "Edit Exercise", name: "Exercise Name", namePlaceholder: "e.g. Bench Press", group: "Group (Folder)", youtube: "YouTube Link (Optional)", image: "Attached Image (Optional)", max1rm: "Current 1RM (Manual) (kg)", repsHyp: "Reps (Hypertrophy)", repsHea: "Reps (Heavy)", repsInt: "Reps (High Int.)", save: "Save Exercise" },
            dropset: { title: "Dropset Calculator", currentWeight: "Current weight:" },
            inlineHistory: { title: "Exercise History" }
        },
        language: { select: "Select Language" },
        misc: { supersetOf: "Superset of", groupUnassigned: "Unassigned", steps: "Steps" }
    },
    ru: {
        nav: { calendar: "Календарь", exercises: "Упражнения", history: "История" },
        header: { title: "Календарь" },
        calendar: {
            today: "Сегодня", dayPlan: "План на день", selectDay: "Выберите день",
            week: "Неделя", months: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
            days: ["П", "В", "С", "Ч", "П", "С", "В"]
        },
        exercises: { search: "Поиск упражнений...", empty: "Нет упражнений. Добавьте новое." },
        history: { title: "Журнал тренировок", empty: "Пока нет завершенных тренировок." },
        workout: { title: "Тренировка", start: "Начать", finish: "Завершить", finishConfirm: "Завершить тренировку?", sets: "Подходы" },
        common: { cancel: "Отмена", add: "Добавить", delete: "Удалить", confirm: "Подтвердить", edit: "Изменить", save: "Сохранить", yes: "Да", no: "Нет", ok: "ОК", create: "Создать" },
        types: { hypertrophy: "Гипертрофия", heavy: "Тяжелые", intensity: "Выс. Инт.", workout: "Тренировка", goal: "Цель шагов" },
        modals: {
            add: { title: "Что добавить?", block: "Блок 4 недели", workout: "Тренировка (Сегодня)", goal: "Цель шагов (Сегодня)" },
            delete: { title: "Удалить сессию", single: "Только эту", recurring: "Эту и будущие", confirm: "Удалить сессию?" },
            goal: { title: "Цель шагов", desc: "Поскольку браузер не имеет доступа к Samsung Health, запишите цель здесь и отметьте её в конце дня.", label: "Цель шагов (напр. 10000)", save: "Сохранить цель", reached: "Цель достигнута!" },
            picker: { title: "Перейти к дате" },
            groups: { title: "Управление группами", new: "Новая группа..." },
            routine: { title: "Блок (4 нед)", type: "Тип сессии", name: "Название", namePlaceholder: "напр. Тяжелый верх", selected: "Выбранные упражнения", selectBtn: "Выбрать упражнения", createSuperset: "Создать суперсет", schedule: "Запланировать" },
            selectEx: { title: "Выбрать упражнения" },
            exercise: { title: "Новое упражнение", editTitle: "Изменить упражнение", name: "Название", namePlaceholder: "напр. Жим лежа", group: "Группа", youtube: "Ссылка YouTube (необяз.)", image: "Изображение (необяз.)", max1rm: "Текущий 1ПМ (кг)", repsHyp: "Повт. (Гипертрофия)", repsHea: "Повт. (Тяжелые)", repsInt: "Повт. (Выс. Инт.)", save: "Сохранить" },
            dropset: { title: "Калькулятор дропсета", currentWeight: "Текущий вес:" },
            inlineHistory: { title: "История упражнения" }
        },
        language: { select: "Выбрать язык" },
        misc: { supersetOf: "Суперсет", groupUnassigned: "Без группы", steps: "Шаги" }
    },
    et: {
        nav: { calendar: "Kalender", exercises: "Harjutused", history: "Ajalugu" },
        header: { title: "Kalender" },
        calendar: {
            today: "Täna", dayPlan: "Päevaplaan", selectDay: "Vali päev",
            week: "Nädal", months: ["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"],
            days: ["E", "T", "K", "N", "R", "L", "P"]
        },
        exercises: { search: "Otsi harjutusi...", empty: "Harjutusi pole. Lisa uus." },
        history: { title: "Treeningute logi", empty: "Lõpetatud treeninguid veel pole." },
        workout: { title: "Treening", start: "Alusta", finish: "Lõpeta treening", finishConfirm: "Kas lõpetada treening?", sets: "Seeriad" },
        common: { cancel: "Tühista", add: "Lisa", delete: "Kustuta", confirm: "Kinnita", edit: "Muuda", save: "Salvesta", yes: "Jah", no: "Ei", ok: "OK", create: "Loo" },
        types: { hypertrophy: "Hüpertroofia", heavy: "Rasked", intensity: "Kõrge Int.", workout: "Treening", goal: "Sammude eesmärk" },
        modals: {
            add: { title: "Mida lisada?", block: "4-nädala plokk", workout: "Üksik treening (Täna)", goal: "Sammude eesmärk (Täna)" },
            delete: { title: "Kustuta sessioon", single: "Ainult see", recurring: "See ja tulevased", confirm: "Kustuta sessioon?" },
            goal: { title: "Sammude eesmärk", desc: "Kuna brauser ei pääse Samsung Healthile ligi, märgi oma eesmärk siia.", label: "Sammud (nt 10000)", save: "Salvesta eesmärk", reached: "Eesmärk saavutatud!" },
            picker: { title: "Mine kuupäevale" },
            groups: { title: "Halda gruppe", new: "Uus grupp..." },
            routine: { title: "Lisa plokk (4 näd)", type: "Sessiooni tüüp", name: "Nimi", namePlaceholder: "nt Raske Ülakeha", selected: "Valitud harjutused", selectBtn: "Vali harjutused", createSuperset: "Loo superseeria", schedule: "Planeeri" },
            selectEx: { title: "Vali harjutused" },
            exercise: { title: "Uus harjutus", editTitle: "Muuda harjutust", name: "Nimi", namePlaceholder: "nt Rinnalt surumine", group: "Grupp", youtube: "YouTube link (valikuline)", image: "Pilt (valikuline)", max1rm: "1RM (kg)", repsHyp: "Kordused (Hüpertroofia)", repsHea: "Kordused (Rasked)", repsInt: "Kordused (Kõrge Int.)", save: "Salvesta harjutus" },
            dropset: { title: "Dropseti kalkulaator", currentWeight: "Praegune raskus:" },
            inlineHistory: { title: "Harjutuse ajalugu" }
        },
        language: { select: "Vali keel" },
        misc: { supersetOf: "Superseeria:", groupUnassigned: "Grupita", steps: "Sammud" }
    },
    uk: {
        nav: { calendar: "Календар", exercises: "Вправи", history: "Історія" },
        header: { title: "Календар" },
        calendar: {
            today: "Сьогодні", dayPlan: "План на день", selectDay: "Виберіть день",
            week: "Тиждень", months: ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],
            days: ["П", "В", "С", "Ч", "П", "С", "Н"]
        },
        exercises: { search: "Пошук вправ...", empty: "Немає вправ. Додайте нову." },
        history: { title: "Журнал тренувань", empty: "Ще немає завершених тренувань." },
        workout: { title: "Тренування", start: "Почати", finish: "Завершити", finishConfirm: "Завершити тренування?", sets: "Підходи" },
        common: { cancel: "Скасувати", add: "Додати", delete: "Видалити", confirm: "Підтвердити", edit: "Редагувати", save: "Зберегти", yes: "Так", no: "Ні", ok: "ОК", create: "Створити" },
        types: { hypertrophy: "Гіпертрофія", heavy: "Важкі", intensity: "Вис. Інт.", workout: "Тренування", goal: "Ціль кроків" },
        modals: {
            add: { title: "Що додати?", block: "Блок 4 тижні", workout: "Тренування (Сьогодні)", goal: "Ціль кроків (Сьогодні)" },
            delete: { title: "Видалити сесію", single: "Тільки цю", recurring: "Цю та майбутні", confirm: "Видалити сесію?" },
            goal: { title: "Ціль кроків", desc: "Оскільки браузер не має доступу до Samsung Health, запишіть ціль тут.", label: "Ціль кроків (напр. 10000)", save: "Зберегти ціль", reached: "Ціль досягнута!" },
            picker: { title: "Перейти до дати" },
            groups: { title: "Управління групами", new: "Нова група..." },
            routine: { title: "Блок (4 тиж)", type: "Тип сесії", name: "Назва", namePlaceholder: "напр. Важкий верх", selected: "Вибрані вправи", selectBtn: "Вибрати вправи", createSuperset: "Створити суперсет", schedule: "Запланувати" },
            selectEx: { title: "Вибрати вправи" },
            exercise: { title: "Нова вправа", editTitle: "Редагувати вправу", name: "Назва", namePlaceholder: "напр. Жим лежачи", group: "Група", youtube: "Посилання YouTube (необов.)", image: "Зображення (необов.)", max1rm: "Поточний 1ПМ (кг)", repsHyp: "Повт. (Гіпертрофія)", repsHea: "Повт. (Важкі)", repsInt: "Повт. (Вис. Інт.)", save: "Зберегти" },
            dropset: { title: "Калькулятор дропсету", currentWeight: "Поточна вага:" },
            inlineHistory: { title: "Історія вправи" }
        },
        language: { select: "Вибрати мову" },
        misc: { supersetOf: "Суперсет", groupUnassigned: "Без групи", steps: "Кроки" }
    }
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

const updateLanguageUI = () => {
    document.documentElement.lang = state.language;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerHTML = getT(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.setAttribute('placeholder', getT(el.getAttribute('data-i18n-placeholder')));
    });
};
"""
repl(r'const renderCalendar = \(\) => \{', translations_str + '\n\nconst renderCalendar = () => {')

# 3. Dynamic strings in render functions

# renderCalendar
repl(r'const monthNames = \[.*?\];', r'const monthNames = getT("calendar.months");')
repl(r'const dayNames = \[.*?\];', r'const dayNames = getT("calendar.days");')
repl(r'`Semana \$\{getWeekNumber', r'`${getT("calendar.week")} ${getWeekNumber')

# month picker rendering
repl(r'pickerGrid.innerHTML = monthNames.map\(\(m, i\) =>', r'const pMonthNames = getT("calendar.months");\n    pickerGrid.innerHTML = pMonthNames.map((m, i) =>')

# session names defaults
repl(r"type === 'hypertrophy' \? 'Hipertrofia' : type === 'heavy' \? 'Pesados' : 'Alta Int\.'", r"type === 'hypertrophy' ? getT('types.hypertrophy') : type === 'heavy' ? getT('types.heavy') : getT('types.intensity')")

# "Objetivo Diario" strings
repl(r'const title = s\.type === \'goal\' \? \'Objetivo de Pasos\'', r'const title = s.type === \'goal\' ? getT("types.goal")')
repl(r'title\+\+', r'title++') # regex trick to avoid messing up but we need to find "Objetivo Diario"
repl(r's\.type === \'workout\' \? \'Entrenamiento\' : \'Rutina\'', r's.type === \'workout\' ? getT("types.workout") : s.name')

# "Sin grupo"
repl(r"const groupName = group \? group\.name : 'Sin Grupo';", r"const groupName = group ? group.name : getT('misc.groupUnassigned');")
repl(r"const groupTitle = g\.id === 'ungrouped' \? 'Sin Grupo' : g\.name;", r"const groupTitle = g.id === 'ungrouped' ? getT('misc.groupUnassigned') : g.name;")
repl(r"<div class=\"group-name\">\$\{g\.id === 'ungrouped' \? 'Sin Grupo' : g\.name\}</div>", r"<div class=\"group-name\">${g.id === 'ungrouped' ? getT('misc.groupUnassigned') : g.name}</div>")

# Superset strings
repl(r'Superserie de \$\{group1\} y \$\{group2\}', r'${getT("misc.supersetOf")} ${group1} & ${group2}')
repl(r'Superserie \$\{i \+ 1\}', r'${getT("misc.supersetOf")} ${i + 1}')

# Workout View 
repl(r'<h3>Entrenamiento de Hoy</h3>', r'<h3>${getT("workout.title")}</h3>')
repl(r'<span>Objetivo Alcanzado</span>', r'<span>${getT("modals.goal.reached")}</span>')
repl(r'<span>Completar Objetivo de Pasos</span>', r'<span>${getT("modals.add.goal")}</span>')
repl(r'Pasos: \$\{session\.steps\}', r'${getT("misc.steps")}: ${session.steps}')

# "Series" string
repl(r'Series \$\{setIndex \+ 1\}', r'${getT("workout.sets")} ${setIndex + 1}')
repl(r'Serie \$\{s\.setIndex \+ 1\}', r'${getT("workout.sets")} ${s.setIndex + 1}')
repl(r'Serie \$\{setIndex\}', r'${getT("workout.sets")} ${setIndex}')

# "Editar Ejercicio" title
repl(r"document\.getElementById\('modal-exercise-title'\)\.textContent = 'Editar Ejercicio';", r"document.getElementById('modal-exercise-title').textContent = getT('modals.exercise.editTitle');")
repl(r"document\.getElementById\('modal-exercise-title'\)\.textContent = 'Nuevo Ejercicio';", r"document.getElementById('modal-exercise-title').textContent = getT('modals.exercise.title');")

# "Finalizar Entrenamiento" alerts
repl(r"confirm\('¿Deseas finalizar el entrenamiento\?'\)", r"confirm(getT('workout.finishConfirm'))")
repl(r"confirm\('¿Estás seguro de que quieres eliminar esta sesión\?'\)", r"confirm(getT('modals.delete.confirm'))")
repl(r"confirm\('¿Eliminar sesión\?'\)", r"confirm(getT('modals.delete.confirm'))")
repl(r"confirm\('¿Eliminar esta sesión y las futuras de esta rutina\?'\)", r"confirm(getT('modals.delete.confirm'))")
repl(r"confirm\('¿Eliminar este ejercicio\?'\)", r"confirm(getT('common.delete') + '?')")
repl(r"confirm\('¿Eliminar esta rutina\?'\)", r"confirm(getT('common.delete') + '?')")
repl(r"confirm\('¿Estás seguro de que quieres borrar el grupo y TODOS sus ejercicios\?'\)", r"confirm(getT('common.delete') + '?')")
repl(r"alert\('Selecciona al menos 2 ejercicios'\)", r"alert('!')") # simple alert

# initialization
init_str = """
    // Initialize Language
    updateLanguageUI();
"""
repl(r'// Restore selected date', init_str + '\n    // Restore selected date')


with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done app.js substitutions!')
