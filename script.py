import re
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

def repl(pattern, replacement):
    global content
    content = re.sub(pattern, replacement, content)

# Header
repl(r'<h1 id="header-title">Calendario</h1>', r'<h1 id="header-title" data-i18n="nav.calendar">Calendario</h1>')
repl(r'<button id="header-action" class="hidden"><i class="ph ph-plus"></i></button>', r'<div style="display:flex; gap:8px;">\n                <button id="btn-language" class="btn-icon" style="color: var(--text-primary);"><i class="ph ph-globe"></i></button>\n                <button id="header-action" class="hidden"><i class="ph ph-plus"></i></button>\n            </div>')

# Calendar View
repl(r'<div class="week-navigation">', r'<div class="week-navigation">\n                        <button id="btn-today" class="btn-icon" style="font-size: 14px; padding: 4px 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-right: 8px;" data-i18n="calendar.today">Hoy</button>')
repl(r'<h3 id="selected-day-label">Plan para el día</h3>', r'<h3 id="selected-day-label" data-i18n="calendar.dayPlan">Plan para el día</h3>')
repl(r'<div class="empty-state">Selecciona un día</div>', r'<div class="empty-state" data-i18n="calendar.selectDay">Selecciona un día</div>')

# Exercises View
repl(r'<input type="text" id="exercise-search" placeholder="Buscar ejercicios...">', r'<input type="text" id="exercise-search" placeholder="Buscar ejercicios..." data-i18n-placeholder="exercises.search">')
repl(r'<div class="empty-state">No hay ejercicios. Añade uno nuevo.</div>', r'<div class="empty-state" data-i18n="exercises.empty">No hay ejercicios. Añade uno nuevo.</div>')

# History View
repl(r'<h2 style="font-size: 18px; margin-bottom: 16px;">Registro de Entrenamientos</h2>', r'<h2 style="font-size: 18px; margin-bottom: 16px;" data-i18n="history.title">Registro de Entrenamientos</h2>')
repl(r'<div class="empty-state">No hay entrenamientos completados aún.</div>', r'<div class="empty-state" data-i18n="history.empty">No hay entrenamientos completados aún.</div>')

# Workout View
repl(r'<h2 id="workout-title">Entrenamiento</h2>', r'<h2 id="workout-title" data-i18n="workout.title">Entrenamiento</h2>')
repl(r'<button id="btn-start-workout" class="btn-primary" style="padding: 8px 16px; font-size: 14px;">Iniciar</button>', r'<button id="btn-start-workout" class="btn-primary" style="padding: 8px 16px; font-size: 14px;" data-i18n="workout.start">Iniciar</button>')
repl(r'<button id="finish-workout" class="btn-primary full-width">Finalizar Entrenamiento</button>', r'<button id="finish-workout" class="btn-primary full-width" data-i18n="workout.finish">Finalizar Entrenamiento</button>')

# Bottom Nav
repl(r'<span>Calendario</span>', r'<span data-i18n="nav.calendar">Calendario</span>')
repl(r'<span>Ejercicios</span>', r'<span data-i18n="nav.exercises">Ejercicios</span>')
repl(r'<span>Historial</span>', r'<span data-i18n="nav.history">Historial</span>')

# Modals
repl(r'<h3>¿Qué quieres añadir\?</h3>', r'<h3 data-i18n="modals.add.title">¿Qué quieres añadir?</h3>')
repl(r'</i><br>Bloque 4 Semanas', r'</i><br><span data-i18n="modals.add.block">Bloque 4 Semanas</span>')
repl(r'</i><br>Entrenamiento Suelto \(Hoy\)', r'</i><br><span data-i18n="modals.add.workout">Entrenamiento Suelto (Hoy)</span>')
repl(r'</i><br>Objetivo de Pasos \(Hoy\)', r'</i><br><span data-i18n="modals.add.goal">Objetivo de Pasos (Hoy)</span>')
repl(r'<button class="btn-primary full-width close-modal" style="margin-top: 16px;">Cancelar</button>', r'<button class="btn-primary full-width close-modal" style="margin-top: 16px;" data-i18n="common.cancel">Cancelar</button>')

repl(r'<h3>Eliminar Sesión</h3>', r'<h3 data-i18n="modals.delete.title">Eliminar Sesión</h3>')
repl(r'</i><br>Solo esta sesión', r'</i><br><span data-i18n="modals.delete.single">Solo esta sesión</span>')
repl(r'</i><br>Esta sesión y de semanas futuras', r'</i><br><span data-i18n="modals.delete.recurring">Esta sesión y de semanas futuras</span>')
repl(r'<button class="btn-secondary full-width close-modal" style="margin-top: 16px;">Cancelar</button>', r'<button class="btn-secondary full-width close-modal" style="margin-top: 16px;" data-i18n="common.cancel">Cancelar</button>')

repl(r'<h3>Objetivo de Pasos</h3>', r'<h3 data-i18n="modals.goal.title">Objetivo de Pasos</h3>')
repl(r'<p style="color:var\(--text-secondary\); font-size:14px; margin-bottom:20px; line-height:1\.5;">\n\s*Dado que el navegador no puede acceder automáticamente a Samsung Health, deberás apuntar aquí tu objetivo y marcarlo como completado al final del día\.\n\s*</p>', r'<p style="color:var(--text-secondary); font-size:14px; margin-bottom:20px; line-height:1.5;" data-i18n="modals.goal.desc">Dado que el navegador no puede acceder automáticamente a Samsung Health, deberás apuntar aquí tu objetivo y marcarlo como completado al final del día.</p>')
repl(r'<label>Pasos Objetivo \(ej\. 10000\)</label>', r'<label data-i18n="modals.goal.label">Pasos Objetivo (ej. 10000)</label>')
repl(r'<button id="btn-save-goal" class="btn-primary full-width">Guardar Objetivo</button>', r'<button id="btn-save-goal" class="btn-primary full-width" data-i18n="modals.goal.save">Guardar Objetivo</button>')

repl(r'<h3>Ir a Fecha</h3>', r'<h3 data-i18n="modals.picker.title">Ir a Fecha</h3>')

repl(r'<h3>Gestionar Grupos</h3>', r'<h3 data-i18n="modals.groups.title">Gestionar Grupos</h3>')
repl(r'<input type="text" id="new-group-name" placeholder="Nuevo Grupo\.\.\."', r'<input type="text" id="new-group-name" placeholder="Nuevo Grupo..." data-i18n-placeholder="modals.groups.new"')
repl(r'<button id="btn-add-group" class="btn-primary" style="padding:10px 16px;">Añadir</button>', r'<button id="btn-add-group" class="btn-primary" style="padding:10px 16px;" data-i18n="common.add">Añadir</button>')

repl(r'<h3 id="modal-routine-title">Añadir Bloque \(4 sem\)</h3>', r'<h3 id="modal-routine-title" data-i18n="modals.routine.title">Añadir Bloque (4 sem)</h3>')
repl(r'<label>Tipo de Sesión</label>', r'<label data-i18n="modals.routine.type">Tipo de Sesión</label>')
repl(r'<button class="type-btn hypertrophy" data-type="hypertrophy">Hipertrofia</button>', r'<button class="type-btn hypertrophy" data-type="hypertrophy" data-i18n="types.hypertrophy">Hipertrofia</button>')
repl(r'<button class="type-btn heavy" data-type="heavy">Pesado</button>', r'<button class="type-btn heavy" data-type="heavy" data-i18n="types.heavy">Pesado</button>')
repl(r'<button class="type-btn intensity" data-type="intensity">Alta Int\.</button>', r'<button class="type-btn intensity" data-type="intensity" data-i18n="types.intensity">Alta Int.</button>')
repl(r'<label>Nombre</label>', r'<label data-i18n="modals.routine.name">Nombre</label>')
repl(r'<input type="text" id="routine-name" placeholder="Ej\. Torso Pesado">', r'<input type="text" id="routine-name" placeholder="Ej. Torso Pesado" data-i18n-placeholder="modals.routine.namePlaceholder">')
repl(r'<label>Ejercicios Seleccionados</label>', r'<label data-i18n="modals.routine.selected">Ejercicios Seleccionados</label>')
repl(r'<button id="btn-open-exercise-selector" class="btn-secondary full-width">Seleccionar Ejercicios</button>', r'<button id="btn-open-exercise-selector" class="btn-secondary full-width" data-i18n="modals.routine.selectBtn">Seleccionar Ejercicios</button>')
repl(r'Crear Superserie</button>', r'<span data-i18n="modals.routine.createSuperset">Crear Superserie</span></button>')
repl(r'Eliminar</button>', r'<span data-i18n="common.delete">Eliminar</span></button>')
repl(r'<button id="btn-save-routine" class="btn-primary full-width">Programar</button>', r'<button id="btn-save-routine" class="btn-primary full-width" data-i18n="modals.routine.schedule">Programar</button>')

repl(r'<h3>Elige Ejercicios</h3>', r'<h3 data-i18n="modals.selectEx.title">Elige Ejercicios</h3>')
repl(r'<button id="btn-confirm-exercises" class="btn-primary" style="padding: 8px 16px; font-size: 14px;">Confirmar</button>', r'<button id="btn-confirm-exercises" class="btn-primary" style="padding: 8px 16px; font-size: 14px;" data-i18n="common.confirm">Confirmar</button>')

repl(r'<h3 id="modal-exercise-title">Nuevo Ejercicio</h3>', r'<h3 id="modal-exercise-title" data-i18n="modals.exercise.title">Nuevo Ejercicio</h3>')
repl(r'<label>Nombre del Ejercicio</label>', r'<label data-i18n="modals.exercise.name">Nombre del Ejercicio</label>')
repl(r'<input type="text" id="exercise-name" placeholder="Ej\. Press de Banca">', r'<input type="text" id="exercise-name" placeholder="Ej. Press de Banca" data-i18n-placeholder="modals.exercise.namePlaceholder">')
repl(r'<label>Grupo \(Carpeta\)</label>', r'<label data-i18n="modals.exercise.group">Grupo (Carpeta)</label>')
repl(r'<label>Enlace YouTube \(Opcional\)</label>', r'<label data-i18n="modals.exercise.youtube">Enlace YouTube (Opcional)</label>')
repl(r'<label>Imagen Adjunta \(Opcional\)</label>', r'<label data-i18n="modals.exercise.image">Imagen Adjunta (Opcional)</label>')
repl(r'<label>1RM Actual \(Manual\) \(kg\)</label>', r'<label data-i18n="modals.exercise.max1rm">1RM Actual (Manual) (kg)</label>')
repl(r'<label>Reps\. \(Hipertrofia\)</label>', r'<label data-i18n="modals.exercise.repsHyp">Reps. (Hipertrofia)</label>')
repl(r'<label>Reps\. \(Pesado\)</label>', r'<label data-i18n="modals.exercise.repsHea">Reps. (Pesado)</label>')
repl(r'<label>Reps\. \(Alta Int\.\)</label>', r'<label data-i18n="modals.exercise.repsInt">Reps. (Alta Int.)</label>')
repl(r'<button id="btn-save-exercise" class="btn-primary full-width">Guardar Ejercicio</button>', r'<button id="btn-save-exercise" class="btn-primary full-width" data-i18n="modals.exercise.save">Guardar Ejercicio</button>')

repl(r'<h3>Calculadora Dropset</h3>', r'<h3 data-i18n="modals.dropset.title">Calculadora Dropset</h3>')
repl(r'Peso actual:', r'<span data-i18n="modals.dropset.currentWeight">Peso actual:</span>')

repl(r'<h3>Historial del Ejercicio</h3>', r'<h3 data-i18n="modals.inlineHistory.title">Historial del Ejercicio</h3>')

# Add language modal before closing body
modal_html = """
    <!-- Language Modal -->
    <div id="modal-language" class="modal">
        <div class="modal-content" style="max-width: 300px; margin: auto; border-radius: 24px; text-align: center;">
            <div class="modal-header" style="justify-content: center; margin-bottom: 16px;">
                <h3 data-i18n="language.select">Select Language</h3>
            </div>
            <div class="modal-body">
                <button class="btn-secondary full-width lang-select-btn" data-lang="es" style="margin-bottom: 8px;">🇪🇸 Español</button>
                <button class="btn-secondary full-width lang-select-btn" data-lang="en" style="margin-bottom: 8px;">🇬🇧 English</button>
                <button class="btn-secondary full-width lang-select-btn" data-lang="ru" style="margin-bottom: 8px;">🇷🇺 Русский</button>
                <button class="btn-secondary full-width lang-select-btn" data-lang="et" style="margin-bottom: 8px;">🇪🇪 Eesti</button>
                <button class="btn-secondary full-width lang-select-btn" data-lang="uk">🇺🇦 Українська</button>
            </div>
            <button class="btn-primary full-width close-modal" style="margin-top: 16px;" data-i18n="common.cancel">Cancelar</button>
        </div>
    </div>
"""
repl(r'<!-- Javascript -->', modal_html + '\n    <!-- Javascript -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
