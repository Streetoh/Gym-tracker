// Gym Tracker PWA Logic - Phase 4

let savedExercises = JSON.parse(localStorage.getItem('gym_exercises'));
let savedGroups = JSON.parse(localStorage.getItem('gym_groups'));

let state = {
    language: localStorage.getItem('gym_language') || 'es',
    exercises: (savedExercises && savedExercises.length > 0) ? savedExercises : (typeof defaultExercises !== 'undefined' ? defaultExercises : []),
    sessions: JSON.parse(localStorage.getItem('gym_sessions')) || [],
    selectedDate: new Date(),
    currentWeekStart: new Date(),
    completedWorkouts: JSON.parse(localStorage.getItem('gym_completed')) || [],
    groups: (savedGroups && savedGroups.length > 0) ? savedGroups : (typeof defaultGroups !== 'undefined' ? defaultGroups : ['Sin Grupo']),
    activeWorkoutState: JSON.parse(localStorage.getItem('gym_active_workout')) || null
};

// UI State
let openExerciseAccordions = []; // Store indices of open exercises to persist across re-renders

// Utils
const saveState = () => {
    localStorage.setItem('gym_exercises', JSON.stringify(state.exercises));
    localStorage.setItem('gym_sessions', JSON.stringify(state.sessions));
    localStorage.setItem('gym_completed', JSON.stringify(state.completedWorkouts));
    localStorage.setItem('gym_groups', JSON.stringify(state.groups));
    localStorage.setItem('gym_active_workout', JSON.stringify(state.activeWorkoutState));
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
        
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        views.forEach(view => {
            if(!view.classList.contains('overlay-view')) {
                view.classList.remove('active');
            }
        });
        document.getElementById(target).classList.add('active');
        
        headerAction.classList.add('hidden');
        if (target === 'view-calendar') {
            headerTitle.textContent = 'Calendario';
            headerAction.classList.remove('hidden');
            headerAction.innerHTML = '<i class="ph ph-calendar-plus"></i>';
            headerAction.onclick = () => openModal(modalEventType);
            renderCalendar();
        } else if (target === 'view-exercises') {
            headerTitle.textContent = 'Ejercicios';
            headerAction.classList.remove('hidden');
            headerAction.innerHTML = '<i class="ph ph-plus"></i>';
            headerAction.onclick = () => {
                document.getElementById('exercise-id').value = '';
                document.getElementById('exercise-name').value = '';
                document.getElementById('exercise-max1rm').value = '';
                document.getElementById('exercise-youtube').value = '';
                document.getElementById('exercise-image').value = '';
                document.getElementById('exercise-image-preview').style.display = 'none';
                document.getElementById('exercise-image-data').value = '';
                
                const select = document.getElementById('exercise-group');
                select.innerHTML = '';
                state.groups.forEach(g => {
                    select.innerHTML += `<option value="${g}">${g}</option>`;
                });
                
                document.getElementById('btn-delete-exercise').style.display = 'none';
                
                document.getElementById('modal-exercise-title').textContent = getT('modals.exercise.title');
                openModal(modalExercise);
            };
            renderExercises();
        } else if (target === 'view-history') {
            headerTitle.textContent = 'Historial';
            renderGlobalHistory();
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
        document.getElementById('modal-routine-title').textContent = 'Añadir Bloque (4 sem)';
        document.getElementById('routine-duration').value = '4';
        openModal(modalAddRoutine);
    } else if (type === 'workout') {
        document.getElementById('modal-routine-title').textContent = 'Añadir Entreno (Hoy)';
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


// --- CALENDAR RENDER ---
let pickerYear = new Date().getFullYear();
const renderMonthPicker = () => {
    document.getElementById('picker-year-display').textContent = pickerYear;
    const grid = document.getElementById('picker-months-grid');
    grid.innerHTML = '';
    const monthNames = getT("calendar.months");
    monthNames.forEach((m, idx) => {
        const btn = document.createElement('button');
        btn.classList.add('picker-month-btn');
        if(pickerYear === state.selectedDate.getFullYear() && idx === state.selectedDate.getMonth()) {
            btn.classList.add('selected');
        }
        btn.textContent = m;
        btn.addEventListener('click', () => {
            state.selectedDate = new Date(pickerYear, idx, 1);
            state.currentWeekStart = getMonday(state.selectedDate);
            renderCalendar();
            closeModal(modalMonthPicker);
        });
        grid.appendChild(btn);
    });
};
document.getElementById('btn-open-month-picker').addEventListener('click', () => {
    pickerYear = state.selectedDate.getFullYear();
    renderMonthPicker();
    openModal(modalMonthPicker);
});
document.getElementById('picker-prev-year').addEventListener('click', () => { pickerYear--; renderMonthPicker(); });
document.getElementById('picker-next-year').addEventListener('click', () => { pickerYear++; renderMonthPicker(); });


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


const renderCalendar = () => {
    const grid = document.getElementById('weekly-grid');
    grid.innerHTML = '';
    
    const weekStart = new Date(state.currentWeekStart);
    const monthNamesFull = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
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
            const indicator = document.createElement('div');
            indicator.classList.add('day-indicator', `indicator-${daySessions[0].type}`);
            cell.appendChild(indicator);
            
            if (dStr === selectedDateStr) {
                cell.classList.add(`selected-${daySessions[0].type}`);
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
        list.innerHTML = `<div class="empty-state">No hay entrenamientos para este día.</div>`;
        return;
    }
    
    daySessions.forEach(session => {
        const card = document.createElement('div');
        card.classList.add('session-card', `type-${session.type}`);
        
        let typeName = session.type === 'hypertrophy' ? 'Hipertrofia' : session.type === 'heavy' ? 'Pesado' : session.type === 'intensity' ? 'Alta Intensidad' : 'Objetivo';
        
        card.innerHTML = `
            <div class="session-info">
                <h4 style="${session.completed ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${session.name}</h4>
                <p>${typeName}</p>
            </div>
            <div class="session-action" style="display:flex; align-items:center; gap:8px;">
                <button class="btn-icon delete-session-btn" style="color:var(--color-heavy);"><i class="ph ph-trash"></i></button>
                <i class="${session.completed ? 'ph-check-circle' : session.type === 'goal' ? 'ph-circle' : 'ph-play-circle'}" style="${session.completed ? 'color: var(--color-intensity); font-size:24px;' : 'font-size:24px;'}"></i>
            </div>
        `;
        
        card.querySelector('.delete-session-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            sessionToDelete = session;
            openModal(modalDeleteSession);
        });
        
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
    const container = document.querySelector('.exercise-groups-container');
    container.innerHTML = '';
    
    if (state.exercises.length === 0) {
        container.innerHTML = `<div class="empty-state">No hay ejercicios. Añade uno nuevo.</div>`;
        return;
    }
    
    const grouped = {};
    state.groups.forEach(g => grouped[g] = []);
    state.exercises.forEach(ex => {
        const g = ex.group || 'Sin Grupo';
        if (!grouped[g]) grouped[g] = [];
        grouped[g].push(ex);
    });
    
    for (const [groupName, exList] of Object.entries(grouped)) {
        if(exList.length === 0) continue;
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('exercise-group');
        
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('exercise-group-title');
        
        const isOpen = !window.closedGroupAccordions?.includes(groupName);
        titleDiv.innerHTML = `<i class="ph ph-folder"></i> <span style="margin-left: 8px;">${groupName}</span> <i class="ph ph-caret-${isOpen ? 'up' : 'down'}" style="margin-left: auto;"></i>`;
        groupDiv.appendChild(titleDiv);
        
        const cardsContainer = document.createElement('div');
        cardsContainer.style.display = isOpen ? 'block' : 'none';
        
        titleDiv.addEventListener('click', () => {
            window.closedGroupAccordions = window.closedGroupAccordions || [];
            const currentlyOpen = !window.closedGroupAccordions.includes(groupName);
            if (currentlyOpen) {
                window.closedGroupAccordions.push(groupName);
                cardsContainer.style.display = 'none';
                titleDiv.querySelector('.ph-caret-up').classList.replace('ph-caret-up', 'ph-caret-down');
            } else {
                window.closedGroupAccordions = window.closedGroupAccordions.filter(g => g !== groupName);
                cardsContainer.style.display = 'block';
                titleDiv.querySelector('.ph-caret-down').classList.replace('ph-caret-down', 'ph-caret-up');
            }
        });
        
        exList.forEach(ex => {
            const card = document.createElement('div');
            card.classList.add('exercise-card');
            card.innerHTML = `
                <div class="exercise-info">
                    <h4>${ex.name}</h4>
                    <p>1RM: ${ex.max1RM ? ex.max1RM + 'kg' : '--'} | Default: ${ex.defaults.hypertrophy}</p>
                </div>
                <div class="exercise-action"><i class="ph ph-pencil-simple"></i></div>
            `;
            card.addEventListener('click', () => editExercise(ex));
            cardsContainer.appendChild(card);
        });
        groupDiv.appendChild(cardsContainer);
        container.appendChild(groupDiv);
    }
};

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
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

const editExercise = (ex) => {
    document.getElementById('exercise-id').value = ex.id;
    document.getElementById('exercise-name').value = ex.name;
    document.getElementById('exercise-youtube').value = ex.youtubeLink || '';
    document.getElementById('exercise-max1rm').value = ex.max1RM || '';
    
    const select = document.getElementById('exercise-group');
    select.innerHTML = '';
    state.groups.forEach(g => {
        select.innerHTML += `<option value="${g}" ${ex.group === g ? 'selected' : ''}>${g}</option>`;
    });
    
    const imgData = ex.imageData || '';
    document.getElementById('exercise-image-data').value = imgData;
    const preview = document.getElementById('exercise-image-preview');
    if (imgData) {
        preview.src = imgData;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }
    
    document.getElementById('exercise-reps-hypertrophy').value = ex.defaults.hypertrophy;
    document.getElementById('exercise-reps-heavy').value = ex.defaults.heavy;
    document.getElementById('exercise-reps-intensity').value = ex.defaults.intensity;
    
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
    const max1rm = document.getElementById('exercise-max1rm').value;
    
    const rH = document.getElementById('exercise-reps-hypertrophy').value;
    const rHe = document.getElementById('exercise-reps-heavy').value;
    const rI = document.getElementById('exercise-reps-intensity').value;
    
    if (!name) return alert('Pon un nombre al ejercicio');
    
    if (id) {
        const ex = state.exercises.find(e => e.id === id);
        if (ex) {
            ex.name = name;
            ex.group = group;
            ex.youtubeLink = yLink;
            ex.imageData = iData;
            ex.max1RM = max1rm;
            ex.defaults = { hypertrophy: rH, heavy: rHe, intensity: rI };
        }
    } else {
        state.exercises.push({
            id: Date.now().toString(),
            name, group, youtubeLink: yLink, imageData: iData,
            defaults: { hypertrophy: rH, heavy: rHe, intensity: rI },
            max1RM: max1rm
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
    
    for (const [gName, exList] of Object.entries(grouped)) {
        list.innerHTML += `<div style="font-weight:700; margin-top:12px; color:var(--text-secondary); text-transform:uppercase; font-size:12px;">${gName}</div>`;
        exList.forEach(ex => {
            // Checkboxes are always empty when opening, as we are appending to the routine
            list.innerHTML += `
                <div class="checkbox-item">
                    <input type="checkbox" id="chk-${ex.id}" value="${ex.id}">
                    <label for="chk-${ex.id}">${ex.name}</label>
                </div>
            `;
        });
    }
    openModal(modalSelectExercises);
});

const renderRoutineItems = () => {
    const ul = document.getElementById('routine-selected-exercises-list');
    ul.innerHTML = '';
    routineItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.cssText = "display:flex; align-items:flex-start; background:var(--bg-surface-elevated); padding:12px; margin-bottom:8px; border-radius:8px;";
        
        const chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.value = item.id;
        chk.className = 'builder-chk';
        chk.style.marginRight = '12px';
        chk.style.marginTop = '4px';
        
        const content = document.createElement('div');
        content.style.flex = "1";
        
        if (item.isSuperset) {
            content.innerHTML = `<strong style="color:var(--color-hypertrophy); font-size:14px; margin-bottom:4px; display:block;"><i class="ph ph-link"></i> ${item.name}</strong>`;
            item.exercises.forEach(e => {
                content.innerHTML += `<div style="font-size:12px; color:var(--text-secondary); margin-left:8px; padding-bottom:2px;">- ${e.dbEx.name}</div>`;
            });
            const btnUngroup = document.createElement('button');
            btnUngroup.innerHTML = '<i class="ph ph-link-break"></i>';
            btnUngroup.className = 'btn-icon';
            btnUngroup.onclick = () => {
                const singles = item.exercises.map(e => ({ id: Date.now()+Math.random(), isSuperset: false, exercises: [e] }));
                routineItems.splice(index, 1, ...singles);
                renderRoutineItems();
            };
            li.appendChild(chk);
            li.appendChild(content);
            li.appendChild(btnUngroup);
        } else {
            content.innerHTML = `<span style="font-size:14px;">${item.exercises[0].dbEx.name}</span>`;
            li.appendChild(chk);
            li.appendChild(content);
        }
        ul.appendChild(li);
    });
};

document.getElementById('btn-confirm-exercises').addEventListener('click', () => {
    document.querySelectorAll('#exercise-selection-list input[type="checkbox"]:checked').forEach(cb => {
        const ex = state.exercises.find(e => e.id === cb.value);
        if(ex) {
            routineItems.push({ id: Date.now() + Math.random().toString(), isSuperset: false, exercises: [{ exerciseId: ex.id, dbEx: ex }] });
        }
    });
    renderRoutineItems();
    closeModal(modalSelectExercises);
});

document.getElementById('btn-create-superset').addEventListener('click', () => {
    const checkedBoxes = Array.from(document.querySelectorAll('.builder-chk:checked'));
    if(checkedBoxes.length < 2) return alert('Selecciona al menos 2 elementos para crear una superserie.');
    
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
    if(routineItems.length === 0) return alert('Selecciona al menos un ejercicio.');
    
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
                sets: [
                    { type: 'Calentamiento', weight: 0, reps: '' },
                    { type: 'Efectiva', weight: 0, reps: '' }
                ],
                comments: ''
            });
        });
    });
    
    for (let i = 0; i < duration; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + (i * 7));
        state.sessions.push({
            id: Date.now().toString() + i,
            date: formatDate(d),
            name: duration > 1 ? `${name} (Semana ${i+1})` : name,
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
    if(activeSession) {
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
    workoutView.classList.add('active');
    document.getElementById('workout-title').textContent = session.name;
    document.documentElement.style.setProperty('--color-accent', `var(--color-${session.type})`);
    
    if(state.activeWorkoutState && state.activeWorkoutState.session && state.activeWorkoutState.session.id === session.id) {
        // Resuming
        activeSession = state.activeWorkoutState.session;
        document.getElementById('btn-start-workout').style.display = 'none';
        document.getElementById('workout-timer').style.display = 'block';
        document.getElementById('workout-footer').style.display = 'block';
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimerUI, 1000);
        updateTimerUI();
    } else {
        // Starting fresh
        state.activeWorkoutState = {
            session: activeSession,
            startTime: null
        };
        openExerciseAccordions = [0]; // Open first exercise by default
        document.getElementById('btn-start-workout').style.display = 'block';
        document.getElementById('workout-timer').style.display = 'none';
        document.getElementById('workout-footer').style.display = 'none';
        document.getElementById('workout-timer').textContent = '00:00';
    }
    
    renderWorkout();
};

document.getElementById('btn-start-workout').addEventListener('click', (e) => {
    e.target.style.display = 'none';
    document.getElementById('workout-timer').style.display = 'block';
    document.getElementById('workout-footer').style.display = 'block';
    state.activeWorkoutState.startTime = Date.now();
    saveState();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimerUI, 1000);
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

    displayBlocks.forEach((block, blockIndex) => {
        const exDiv = document.createElement('div');
        exDiv.classList.add('workout-exercise');
        
        let headerTitle = '';
        let allCompleted = true;
        
        block.exercises.forEach(ex => {
            if(!ex.completed) allCompleted = false;
        });
        
        if (block.type === 'superset') {
            headerTitle = `<i class="ph ph-link"></i> ${block.name}`;
        } else {
            const dbEx = state.exercises.find(e => e.id === block.exercises[0].exerciseId);
            const groupName = dbEx ? (dbEx.group || 'Sin Grupo') : 'Sin Grupo';
            headerTitle = `(${groupName}) ${block.name}`;
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
                ${block.type === 'superset' ? `<div style="font-weight:700; color:var(--text-primary); margin-bottom:12px;">${ex.name}</div>` : ''}
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 12px;">
                    <div class="media-links" style="margin:0; width:100%; display:flex; flex-wrap:wrap; gap:8px;">${mediaHtml}</div>
                    <button class="history-btn" onclick="openInlineHistory('${ex.exerciseId}')" style="min-width: 80px;"><i class="ph ph-clock-counter-clockwise"></i> Hist.</button>
                </div>
                
                <div class="set-row header-row" style="margin-top: 16px;">
                    <div></div>
                    <div style="font-size:12px; color:var(--text-secondary); text-align:center;">Tipo</div>
                    <div style="font-size:12px; color:var(--text-secondary); text-align:center;">KG</div>
                    <div style="font-size:12px; color:var(--text-secondary); text-align:center;">Reps</div>
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
                
                setRow.innerHTML = `
                    <div class="set-number" style="margin-top: 8px;">${setIndex + 1}</div>
                    <div style="display:flex; flex-direction:column; justify-content: flex-start;">
                        <select class="set-type-select">
                            <option value="Calentamiento" ${set.type==='Calentamiento'?'selected':''}>Calentamiento</option>
                            <option value="Aproximación" ${set.type==='Aproximación'?'selected':''}>Aproximación</option>
                            <option value="Efectiva" ${set.type==='Efectiva'?'selected':''}>Efectiva</option>
                            <option value="Al fallo" ${set.type==='Al fallo'?'selected':''}>Al fallo</option>
                            <option value="Dropset" ${set.type==='Dropset'?'selected':''}>Dropset</option>
                            <option value="Dropset fallo" ${set.type==='Dropset fallo'?'selected':''}>Dropset fallo</option>
                        </select>
                        <div class="target-reps-text" style="margin-top: 4px;">Obj: ${targetReps}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content: flex-start;">
                        <input type="number" class="set-input weight-input" value="${set.weight || ''}" placeholder="0" style="margin-bottom:4px; max-width:50px;">
                        <button class="calc-dropset-btn" style="font-size:9px; padding:2px 4px;">Drop</button>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content: flex-start;">
                        <input type="text" class="set-input reps-input" value="${set.reps || ''}" placeholder="-" style="max-width:50px;">
                    </div>
                    <div style="display:flex; justify-content: center; margin-top: 4px;">
                        <button class="btn-icon delete-set" style="padding:4px;"><i class="ph ph-trash"></i></button>
                    </div>
                `;
                
                const wInput = setRow.querySelector('.weight-input');
                const rInput = setRow.querySelector('.reps-input');
                const tInput = setRow.querySelector('.set-type-select');
                
                tInput.addEventListener('change', (e) => { set.type = e.target.value; autoSaveWorkout(); renderWorkout(); }); 
                wInput.addEventListener('change', (e) => { set.weight = parseFloat(e.target.value); autoSaveWorkout(); });
                rInput.addEventListener('change', (e) => { set.reps = e.target.value; autoSaveWorkout(); });
                setRow.querySelector('.calc-dropset-btn').addEventListener('click', () => openDropsetCalc(set.weight, wInput));
                
                setRow.querySelector('.delete-set').addEventListener('click', () => {
                    ex.sets.splice(setIndex, 1);
                    autoSaveWorkout();
                    renderWorkout();
                });
                
                setsContainer.appendChild(setRow);
            });
            
            exSection.appendChild(setsContainer);
            
            const addSetBtn = document.createElement('button');
            addSetBtn.classList.add('add-set-btn');
            addSetBtn.textContent = '+ Añadir Serie';
            addSetBtn.addEventListener('click', () => {
                const lastSet = ex.sets[ex.sets.length - 1] || { type: 'Efectiva', weight: 0, reps: '' };
                ex.sets.push({ ...lastSet });
                autoSaveWorkout();
                renderWorkout();
            });
            exSection.appendChild(addSetBtn);
            
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('exercise-comments');
            commentDiv.innerHTML = `<input type="text" placeholder="Comentarios ${ex.name}..." value="${ex.comments || ''}">`;
            commentDiv.querySelector('input').addEventListener('change', (e) => { ex.comments = e.target.value; autoSaveWorkout(); });
            exSection.appendChild(commentDiv);
            
            body.appendChild(exSection);
        });
        
        const finishExBtn = document.createElement('button');
        finishExBtn.classList.add('btn-secondary', 'full-width');
        finishExBtn.textContent = block.type === 'superset' ? 'Finalizar Superserie' : 'Finalizar Ejercicio';
        finishExBtn.addEventListener('click', () => {
            block.exercises.forEach(e => e.completed = true);
            autoSaveWorkout();
            header.click(); 
            header.classList.add('completed');
        });
        body.appendChild(finishExBtn);
        
        // Accordion logic
        header.addEventListener('click', () => {
            header.classList.toggle('open');
            body.classList.toggle('open');
            if(header.classList.contains('open')) {
                if(!openExerciseAccordions.includes(block.id)) openExerciseAccordions.push(block.id);
            } else {
                openExerciseAccordions = openExerciseAccordions.filter(i => i !== block.id);
            }
        });
        
        // Use blockIndex === 0 logic to ensure the first block is open on fresh start if [0] was in state
        if(openExerciseAccordions.includes(block.id) || (openExerciseAccordions.includes(0) && blockIndex === 0)) {
            header.classList.add('open');
            body.classList.add('open');
        }
        
        exDiv.appendChild(header);
        exDiv.appendChild(body);
        content.appendChild(exDiv);
    });
};

document.getElementById('close-workout').addEventListener('click', () => {
    workoutView.classList.remove('active');
    document.documentElement.style.setProperty('--color-accent', 'var(--color-hypertrophy)');
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
            if (s.type !== sessionToDelete.type) return true;
            const sDate = parseDateStr(s.date);
            if (sDate < deletedDate) return true;
            if (sDate.getDay() !== dayOfWeek) return true;
            return false;
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
    activeSession = null;
    openExerciseAccordions = [];
    saveState();
    renderCalendar();
    alert(`¡Entrenamiento Finalizado! Duración: ${formatTimer(duration > 0 ? duration : 0)}`);
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
                <strong style="color:var(--text-primary);">${ex.name}</strong> 
                <span style="color:var(--color-accent); font-weight:600;">Max: ${maxW}kg</span>
            </div>`;
            
            ex.sets.forEach((s, idx) => {
                body.innerHTML += `<div style="font-size:11px; display:flex; justify-content:space-between; color:var(--text-secondary); padding: 2px 0;">
                    <span>Serie ${idx+1} (${s.type})</span> <span>${s.reps || '-'} x ${s.weight || 0}kg</span>
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
                    <span style="color:var(--text-secondary);">Serie ${idx+1} (${s.type})</span> 
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
        startWorkoutTimer();
        renderWorkout();
    } else {
        state.activeWorkoutState = null;
    }
}

document.querySelector('[data-target="view-calendar"]').click();

