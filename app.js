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
        
        if (target === 'view-workout') {
            if (!(state.activeWorkoutState && state.activeWorkoutState.startTime)) {
                alert('No hay ningún entrenamiento activo.');
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
            headerTitle.textContent = 'Calendario';
            headerAction.classList.remove('hidden');
            headerAction.innerHTML = '<i class="ph ph-calendar-plus"></i> <span style="font-size:14px; font-weight:600; margin-left:4px;" data-i18n="calendar.createSession">Crear sesión</span>';
            headerAction.style.width = 'auto';
            headerAction.style.padding = '0 12px';
            headerAction.style.borderRadius = '16px';
            headerAction.onclick = () => { editingSessionId = null; openModal(modalEventType); };
            renderCalendar();
        } else if (target === 'view-exercises') {
            headerTitle.textContent = 'Ejercicios';
            headerAction.classList.remove('hidden');
            headerAction.innerHTML = '<i class="ph ph-plus"></i> <span style="font-size:14px; font-weight:600; margin-left:4px;">Crear ejercicio</span>';
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
        } else if (target === 'view-progression') {
            headerTitle.textContent = 'Progresión';
            if (typeof renderProgressionView !== 'undefined') renderProgressionView();
        } else if (target === 'view-evolution') {
            headerTitle.textContent = 'Evolución';
            if (typeof renderEvolutionHistory !== 'undefined') renderEvolutionHistory();
        } else if (target === 'view-export') {
            headerTitle.textContent = 'Exportar';
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
    es: {
        nav: { calendar: "Calendario", exercises: "Ejercicios", history: "Historial", workout: "En curso" },
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
            exercise: { title: "Nuevo Ejercicio", editTitle: "Editar ejercicio", name: "Nombre del ejercicio", namePlaceholder: "Ej. Press de Banca", group: "Grupo (carpeta)", youtube: "Enlace YouTube (opcional)", image: "Imagen adjunta (opcional)", max1rm: "1RM Actual (Manual) (kg)", repsHyp: "Reps. (Hipertrofia)", repsHea: "Reps. (Pesado)", repsInt: "Reps. (Alta Int.)", save: "Guardar ejercicio" },
            dropset: { title: "Calculadora Dropset", currentWeight: "Peso actual:" },
inlineHistory: { title: "Historial del Ejercicio" }
        },
        language: { select: "Seleccionar Idioma" },
        misc: { supersetOf: "Superserie de", groupUnassigned: "Sin Grupo", steps: "Pasos" }
    ,
        evolution: {
            measurementsTitle: "Medidas Corporales (cm)",
            m1: "1. Pecho",
            m2: "2. Brazo Izq.",
            m3: "3. Brazo Der.",
            m4: "4. Abdomen",
            m5: "5. Cintura",
            m6: "6. Caderas",
            m7: "7. Muslo Izq.",
            m8: "8. Muslo Der."
        },
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
        evolution: {
            measurementsTitle: "Body Measurements (cm)",
            m1: "1. Chest",
            m2: "2. L. Arm",
            m3: "3. R. Arm",
            m4: "4. Abdomen",
            m5: "5. Waist",
            m6: "6. Hips",
            m7: "7. L. Thigh",
            m8: "8. R. Thigh"
        },
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
        evolution: {
            measurementsTitle: "Размеры тела (см)",
            m1: "1. Грудь",
            m2: "2. Л. Рука",
            m3: "3. П. Рука",
            m4: "4. Живот",
            m5: "5. Талия",
            m6: "6. Бедра",
            m7: "7. Л. Бедро",
            m8: "8. П. Бедро"
        },
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
        evolution: {
            measurementsTitle: "Kehamõõdud (cm)",
            m1: "1. Rind",
            m2: "2. V. Käsi",
            m3: "3. P. Käsi",
            m4: "4. Kõht",
            m5: "5. Talje",
            m6: "6. Puusad",
            m7: "7. V. Reis",
            m8: "8. P. Reis"
        },
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
            exercise: { title: "Нова вправа", editTitle: "Редагувати вправу", name: "Назва", namePlaceholder: "напр. Жим лежачи", group: "Група", youtube: "Посилання YouTube (необов.)", image: "Зображення (необяз.)", max1rm: "Поточний 1ПМ (кг)", repsHyp: "Повт. (Гіпертрофія)", repsHea: "Повт. (Важкі)", repsInt: "Повт. (Вис. Інт.)", save: "Зберегти" },
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
    document.getElementById('current-lang-text').textContent = state.language.toUpperCase();
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
            const indContainer = document.createElement('div');
            indContainer.classList.add('indicators-flex');
            const uniqueTypes = [...new Set(daySessions.map(s => s.type))];
            uniqueTypes.forEach(type => {
                const indicator = document.createElement('div');
                indicator.classList.add('day-indicator', `indicator-${type}`);
                indContainer.appendChild(indicator);
            });
            cell.appendChild(indContainer);
            
            if (dStr === selectedDateStr) {
                const colors = [];
                if(daySessions.some(s => s.type === 'hypertrophy')) colors.push('#2563EB');
                if(daySessions.some(s => s.type === 'heavy')) colors.push('#DC2626');
                if(daySessions.some(s => s.type === 'intensity')) colors.push('#10B981');
                
                if (colors.length === 1) {
                    cell.style.border = `3px solid ${colors[0]}`;
                    cell.style.background = "transparent";
                } else if (colors.length > 1) {
                    const gradient = colors.join(', ');
                    cell.style.border = `3px solid transparent`;
                    cell.style.background = `linear-gradient(var(--bg-surface), var(--bg-surface)) padding-box, linear-gradient(to bottom right, ${gradient}) border-box`;
                }
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
        
        card.innerHTML = `<span style="font-size: 26px; margin-bottom: 6px; display: block; line-height: 1;">${typeof getGroupEmoji !== 'undefined' ? getGroupEmoji(g) : '🏋️'}</span><span style="font-size:12px; font-weight:600;">${g}</span>`;
        
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
        filteredEx = filteredEx.filter(ex => ex.name.toLowerCase().includes(searchVal));
    }
    
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
                    <h3 class="exercise-name">${ex.name}</h3>
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
    
    const max1rmEl = document.getElementById('exercise-max1rm');
    if (max1rmEl) max1rmEl.value = ex.max1RM || '';
    const prHypEl = document.getElementById('exercise-pr-hyp');
    if (prHypEl) prHypEl.value = ex.prHyp || '';
    const prHeavyEl = document.getElementById('exercise-pr-heavy');
    if (prHeavyEl) prHeavyEl.value = ex.prHeavy || '';
    
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
    
    if (!name) return alert('Pon un nombre al ejercicio');
    
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
        exList.sort((a, b) => a.name.localeCompare(b.name));
        
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
            itemDiv.innerHTML = `
                <input type="checkbox" id="chk-${ex.id}" value="${ex.id}">
                <label for="chk-${ex.id}">${ex.name}</label>
            `;
            itemsContainer.appendChild(itemDiv);
        });
        
        groupDiv.appendChild(itemsContainer);
        list.appendChild(groupDiv);
    }
    openModal(modalSelectExercises);
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
        dragHandle.innerHTML = '<i class="ph ph-list"></i>';
        
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
            contentDiv.innerHTML = `<span style="font-size:14px; font-weight:700;">${item.exercises[0].dbEx.name}</span>`;
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
                exContainer.innerHTML = `<div style="font-size:13px; font-weight:600; margin-bottom:8px; color:var(--text-secondary);">- ${ex.dbEx.name}</div>`;
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
                            <option value="Calentamiento" ${set.type==='Calentamiento'?'selected':''}>Calentamiento</option>
                            <option value="Aproximación" ${set.type==='Aproximación'?'selected':''}>Aproximación</option>
                            <option value="Efectiva" ${set.type==='Efectiva'?'selected':''}>Efectiva</option>
                            <option value="Al fallo" ${set.type==='Al fallo'?'selected':''}>Al fallo</option>
                            <option value="Dropset" ${set.type==='Dropset'?'selected':''}>Dropset</option>
                            <option value="Dropset fallo" ${set.type==='Dropset fallo'?'selected':''}>Dropset fallo</option>
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
            addSetBtn.textContent = '+ Añadir Serie';
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
    document.querySelectorAll('#exercise-selection-list input[type="checkbox"]:checked').forEach(cb => {
        const ex = state.exercises.find(e => e.id === cb.value);
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
        document.getElementById('workout-timer').style.display = 'block';
        document.getElementById('workout-timer').textContent = 'Completado';
        document.getElementById('workout-footer').style.display = 'none';
        clearInterval(timerInterval);
    } else if(isActive && state.activeWorkoutState.startTime) {
        // Resuming
        activeSession = state.activeWorkoutState.session;
        document.getElementById('btn-start-workout').style.display = 'none';
        document.getElementById('workout-timer').style.display = 'block';
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
        
        document.getElementById('workout-timer').style.display = 'none';
        document.getElementById('workout-footer').style.display = 'none';
        document.getElementById('workout-timer').textContent = '00:00';
        clearInterval(timerInterval);
    }
    
    renderWorkout();
};

document.getElementById('btn-start-workout').addEventListener('click', (e) => {
    if (state.activeWorkoutState && state.activeWorkoutState.startTime) {
        if (!confirm('Ya tienes un entrenamiento en curso. ¿Deseas cancelarlo e iniciar este nuevo?')) {
            return;
        }
    }
    
    state.activeWorkoutState = {
        sessionId: activeSession.id,
        session: activeSession,
        startTime: Date.now()
    };
    
    e.target.style.display = 'none';
    document.getElementById('workout-timer').style.display = 'block';
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
            commentDiv.innerHTML = `<input type="text" placeholder="Comentarios ${ex.name}..." value="${ex.comments || ''}">`;
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
                const baseName = sessionToDelete.name.split(' (Semana')[0];
                const sBaseName = s.name.split(' (Semana')[0];
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
        if (!swipeTarget) return;
        touchCurrentX = e.changedTouches[0].screenX;
        let delta = touchCurrentX - touchStartX;
        swipeTarget.style.transform = `translateX(${delta}px)`;
    }, {passive: true});
    
    calendarContainer.addEventListener('touchend', e => {
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
        if (e.target.closest('#view-calendar') || e.target.closest('.scrollable') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('.modal')) return;
        touchStartX = e.changedTouches[0].screenX;
        touchCurrentX = touchStartX;
        
        const tabs = Array.from(document.querySelectorAll('.nav-item'));
        const activeIndex = tabs.findIndex(t => t.classList.contains('active'));
        currentView = document.querySelector('.view.active');
        if (currentView) currentView.style.transition = 'none';
    }, {passive: true});
    
    mainContent.addEventListener('touchmove', e => {
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
        
        card.innerHTML = `<span style="font-size: 26px; margin-bottom: 6px; display: block; line-height: 1;">${getGroupEmoji(g)}</span><span style="font-size:12px; font-weight:600;">${g}</span>`;
        
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
        if (searchVal && !ex.name.toLowerCase().includes(searchVal)) return false;
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
        item.textContent = ex.name;
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
            if (titleEl) titleEl.textContent = ex.name;

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
            measurementsHtml = `
            <div style="display: grid; grid-template-columns: auto auto; gap: 8px 16px; justify-content: start; font-size: 12px; margin-top: 12px; color: var(--text-secondary); background: var(--bg-background); padding: 8px; border-radius: 4px;">
                ${item.m2 ? `<div><strong>Brz Izq:</strong> ${item.m2} cm</div>` : '<div></div>'}
                ${item.m3 ? `<div><strong>Brz Der:</strong> ${item.m3} cm</div>` : '<div></div>'}
                ${item.m7 ? `<div><strong>Msl Izq:</strong> ${item.m7} cm</div>` : '<div></div>'}
                ${item.m8 ? `<div><strong>Msl Der:</strong> ${item.m8} cm</div>` : '<div></div>'}
                ${item.m1 ? `<div><strong>Pecho:</strong> ${item.m1} cm</div>` : '<div></div>'}
                ${item.m4 ? `<div><strong>Abdomen:</strong> ${item.m4} cm</div>` : '<div></div>'}
                ${item.m5 ? `<div><strong>Cintura:</strong> ${item.m5} cm</div>` : '<div></div>'}
                ${item.m6 ? `<div><strong>Caderas:</strong> ${item.m6} cm</div>` : '<div></div>'}
            </div>`;
        }

        let photosHtml = '';
        if (item.photos && item.photos.length > 0) {
            photosHtml = `
            <div style="display:flex; gap:8px; margin-top:12px; overflow-x:auto;">`;
            item.photos.forEach(photo => {
                if (photo) {
                    photosHtml += `<img src="${photo}" style="height: 100px; border-radius: 8px; object-fit: cover; cursor: pointer;" onclick="document.getElementById('lightbox-img').src=this.src; document.getElementById('modal-lightbox').style.display='flex';">`;
                }
            });
            photosHtml += `</div>`;
        }
        
        const folderId = 'evol-details-' + item.id;
        
        div.innerHTML = `
            <div style="padding: 16px; cursor: pointer;" onclick="const d = document.getElementById('${folderId}'); d.style.display = d.style.display === 'none' ? 'block' : 'none';">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap: 8px;">
                        <i class="ph ph-folder" style="font-size: 20px; color: var(--primary-color);"></i>
                        <h4 style="margin:0; font-size:16px;">${dateStr}</h4>
                    </div>
                    <button class="btn-icon" style="color: var(--color-heavy); margin-left: 12px; padding: 4px;" onclick="event.stopPropagation(); deleteEvolution('${item.id}')"><i class="ph ph-trash"></i></button>
                </div>
                <div style="margin-top: 8px; color: var(--text-secondary); font-size: 14px; display: flex; gap: 8px; align-items: center;">
                    <span style="background: var(--bg-surface-elevated); padding: 4px 8px; border-radius: 12px;"><strong>Peso:</strong> ${item.weight} kg</span>
                    ${item.bf ? `<span style="background: var(--bg-surface-elevated); padding: 4px 8px; border-radius: 12px;"><strong>Grasa:</strong> ${item.bf}%</span>` : ''}
                    ${item.photos && item.photos.length > 0 ? `<span style="color: var(--text-secondary); font-size: 12px; margin-left: auto;"><i class="ph ph-camera"></i> ${item.photos.length}</span>` : ''}
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
            return alert('Por favor, introduce el peso.');
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
        alert('Error al guardar: ' + err.message);
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
    const monthNamesFull = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
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
            if (dStr === selectedDateStr) {
                const colors = [];
                if(daySessions.some(s => s.type === 'hypertrophy')) colors.push('#2563EB');
                if(daySessions.some(s => s.type === 'heavy')) colors.push('#DC2626');
                if(daySessions.some(s => s.type === 'intensity')) colors.push('#10B981');
                if (colors.length === 1) {
                    cell.style.border = `3px solid ${colors[0]}`;
                    cell.style.background = "transparent";
                } else if (colors.length > 1) {
                    const gradient = colors.join(', ');
                    cell.style.border = `3px solid transparent`;
                    cell.style.borderImage = `linear-gradient(to bottom right, ${gradient}) 1`;
                    cell.style.background = "transparent";
                }
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
                document.getElementById('export-selected-count').textContent = exportSelected.size + " seleccionados";
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
            const baseName = w.name ? w.name.split(' (Semana')[0].trim() : 'Entrenamiento';
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
        alert('Por favor, selecciona al menos un entrenamiento para exportar.');
        return;
    }
    
    const sessionsToExport = state.sessions.filter(s => selectedIds.includes(s.id));
    sessionsToExport.sort((a,b) => new Date(a.date) - new Date(b.date));
    
    if (sessionsToExport.length === 0) return alert("No se encontraron entrenamientos planificados con los IDs seleccionados.");
    
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
                exName.textContent = ex.name + (ex.comments ? ` (Nota: ${ex.comments})` : '');
                tableContent.appendChild(exName);

                const table = document.createElement('table');
                table.classList.add('print-table');
                const hasDropset = (ex.sets || []).some(s => s.type && s.type.toLowerCase().includes('dropset'));
                const showFallo = session.type === 'intensity' && hasDropset;
                
                table.innerHTML = `
                    <thead>
                        <tr style="background-color: #f3f4f6;">
                            <th style="width: 12%;">Serie</th>
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
                    let setTypeLabel = set.type === 'warmup' ? 'Calentamiento' : 
                                    set.type === 'approach' ? 'Aproximación' : 
                                    set.type === 'effective' ? 'Efectiva' : 
                                    set.type === 'dropset' ? 'Dropset' : 'Dropset (Fallo)';
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
        if (window.Capacitor && window.Capacitor.isNativePlatform() && typeof html2pdf !== 'undefined') {
            printContainer.style.position = 'absolute';
            printContainer.style.left = '-9999px';
            printContainer.style.top = '0';
            
            const opt = {
                margin:       10,
                filename:     'entrenamientos.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            try {
                const pdfBase64 = await html2pdf().set(opt).from(printContainer).outputPdf('datauristring');
                const base64Data = pdfBase64.split(',')[1];
                
                const { Filesystem, Directory, Share } = window.Capacitor.Plugins;
                
                const result = await Filesystem.writeFile({
                    path: 'entrenamientos.pdf',
                    data: base64Data,
                    directory: Directory.Cache
                });
                
                await Share.share({
                    title: 'Entrenamientos PDF',
                    url: result.uri,
                    dialogTitle: 'Compartir PDF'
                });
            } catch (e) {
                console.error(e);
                alert('Error al generar PDF: ' + e.message);
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
    document.getElementById('routine-name').value = session.name || '';
    document.getElementById('routine-duration').value = session.duration || 1;
    document.getElementById('routine-type').value = session.type || 'hypertrophy';
    
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
