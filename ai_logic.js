
window.getLevelExplanation = (level) => {
    switch((level || '').toLowerCase()) {
        case 'principiante':
            return '• Menos de 1 año entrenando. Aprendiendo técnica básica y patrones de movimiento.';
        case 'intermedio':
            return '• De 1 a 3 años entrenando constante. Buena técnica y progresión regular de cargas.';
        case 'avanzado':
            return '• Más de 3 años entrenando continuo. Dominio técnico avanzado y estancamientos superados.';
        default:
            return '• De 1 a 3 años entrenando constante. Buena técnica y progresión regular de cargas.';
    }
};

window.updateProfileLevelHint = (prefix) => {
    const select = document.getElementById(prefix === 'modal' ? 'modal-profile-level' : 'ai-profile-level');
    const hint = document.getElementById(prefix === 'modal' ? 'modal-level-hint' : 'ai-level-hint');
    if (select && hint) {
        hint.textContent = window.getLevelExplanation(select.value);
    }
};


// ==========================================
// SELECTION QUOTE & USER PROFILE LOGIC
// ==========================================
let currentSelectionData = null; // { sender: 'user'|'ai', text: '...' }

function getAiUserProfile() {
    const saved = localStorage.getItem('gym_ai_user_profile');
    if (!saved) return null;
    try {
        return JSON.parse(saved);
    } catch(e) {
        return null;
    }
}

window.openAiProfileModal = () => {
    const modalSettings = document.getElementById('modal-ai-settings');
    if (modalSettings) modalSettings.classList.remove('active');
    
    const profile = getAiUserProfile() || {};
    const nameInput = document.getElementById('modal-profile-name');
    const goalInput = document.getElementById('modal-profile-goal');
    const weightInput = document.getElementById('modal-profile-weight');
    const heightInput = document.getElementById('modal-profile-height');
    const levelInput = document.getElementById('modal-profile-level');
    const daysInput = document.getElementById('modal-profile-days');
    const notesInput = document.getElementById('modal-profile-notes');
    
    if (nameInput) nameInput.value = profile.nickname || '';
    if (goalInput) goalInput.value = profile.goal || 'Hipertrofia / Ganancia muscular';
    if (weightInput) weightInput.value = profile.weight || '';
    if (heightInput) heightInput.value = profile.height || '';
    if (levelInput) {
        levelInput.value = profile.experience || 'Intermedio';
        updateProfileLevelHint('modal');
    }
    if (daysInput) daysInput.value = profile.preferredDays || '4';
    if (notesInput) notesInput.value = profile.customNotes || '';
    
    const modalProfile = document.getElementById('modal-ai-profile');
    if (modalProfile) modalProfile.classList.add('active');
};

window.saveAiUserProfileFromModal = () => {
    const name = document.getElementById('modal-profile-name')?.value.trim() || 'Campeón';
    const goal = document.getElementById('modal-profile-goal')?.value || 'Hipertrofia / Ganancia muscular';
    const weight = document.getElementById('modal-profile-weight')?.value || '';
    const height = document.getElementById('modal-profile-height')?.value || '';
    const level = document.getElementById('modal-profile-level')?.value || 'Intermedio';
    const days = document.getElementById('modal-profile-days')?.value || '4';
    const notes = document.getElementById('modal-profile-notes')?.value.trim() || '';
    
    const profile = { nickname: name, goal, weight, height, experience: level, preferredDays: days, customNotes: notes };
    localStorage.setItem('gym_ai_user_profile', JSON.stringify(profile));
    
    const modalProfile = document.getElementById('modal-ai-profile');
    if (modalProfile) modalProfile.classList.remove('active');
    
    if (typeof showToast === 'function') showToast('Perfil actualizado correctamente');
    window.renderFullChatHistory();
};

window.saveAiUserProfile = () => {
    const name = document.getElementById('ai-profile-name')?.value.trim() || 'Campeón';
    const goal = document.getElementById('ai-profile-goal')?.value || 'Hipertrofia / Ganancia muscular';
    const weight = document.getElementById('ai-profile-weight')?.value || '';
    const height = document.getElementById('ai-profile-height')?.value || '';
    const level = document.getElementById('ai-profile-level')?.value || 'Intermedio';
    const days = document.getElementById('ai-profile-days')?.value || '4';
    
    const profile = { nickname: name, goal, weight, height, experience: level, preferredDays: days, customNotes: '' };
    localStorage.setItem('gym_ai_user_profile', JSON.stringify(profile));
    
    if (typeof showToast === 'function') showToast(`¡Perfil guardado! Hola, ${name} 💪`);
    
    // Append a personal welcome message from AI
    const aiWelcomeTime = Date.now();
    const personalizedWelcome = `¡Hola, **${name}**! 👋 Me alegra tenerte aquí.\n\nHe configurado tu perfil con tu objetivo de **${goal}** (Peso: ${weight ? weight + ' kg' : 'No indicado'}, Altura: ${height ? height + ' cm' : 'No indicada'}, Nivel: ${level}, Preferencia: ${days} días/semana).\n\nTengo acceso en tiempo real a tu base de datos y calendario de entrenamientos. ¿En qué te gustaría que te ayude hoy? ¿Revisamos tus rutinas o planificamos una nueva sesión? 💪`;
    
    aiChatHistory.push({ role: "model", parts: [{ text: personalizedWelcome }], timestamp: aiWelcomeTime });
    localStorage.setItem('gemini_chat_history', JSON.stringify(aiChatHistory));
    
    window.renderFullChatHistory();
};

// Selection quote handler
function setupTextSelectionListener() {
    const container = document.getElementById('ai-chat-messages');
    const tooltip = document.getElementById('ai-selection-quote-btn');
    if (!container || !tooltip) return;

    const handleSelection = () => {
        const selection = window.getSelection();
        const selectedStr = selection ? selection.toString().trim() : '';

        if (!selectedStr || selectedStr.length < 2) {
            tooltip.style.display = 'none';
            currentSelectionData = null;
            return;
        }

        const anchorNode = selection.anchorNode;
        if (!anchorNode || !container.contains(anchorNode)) {
            tooltip.style.display = 'none';
            currentSelectionData = null;
            return;
        }

        const bubbleWrapper = anchorNode.nodeType === 1 
            ? anchorNode.closest('.chat-bubble-wrapper') 
            : anchorNode.parentElement?.closest('.chat-bubble-wrapper');

        if (!bubbleWrapper) {
            tooltip.style.display = 'none';
            currentSelectionData = null;
            return;
        }

        const sender = bubbleWrapper.classList.contains('user-wrapper') ? 'user' : 'ai';
        currentSelectionData = { sender, text: selectedStr };

        try {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                tooltip.style.top = `${rect.top - 10}px`;
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.display = 'inline-flex';
                return;
            }
        } catch(e) {}
        
        tooltip.style.display = 'none';
    };

    document.addEventListener('selectionchange', handleSelection);
    container.addEventListener('mouseup', handleSelection);
    container.addEventListener('touchend', handleSelection);
}

window.quoteSelectedText = () => {
    if (currentSelectionData && currentSelectionData.text) {
        window.startReplyTo(currentSelectionData.sender, currentSelectionData.text);
        const tooltip = document.getElementById('ai-selection-quote-btn');
        if (tooltip) tooltip.style.display = 'none';
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }
};

// ==========================================
// AI ASSISTANT (GEMINI) - REAL-TIME GYM INTEGRATION
// ==========================================
let aiChatHistory = [];
let replyingTo = null; // { sender: 'user'|'ai', text: '...', id: '...' }

const formatChatTime = (timestamp) => {
    const d = timestamp ? new Date(timestamp) : new Date();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const getCurrentAppLang = () => {
    if (typeof state !== 'undefined' && state && state.language) {
        return state.language.toLowerCase();
    }
    const saved = localStorage.getItem('gym_language');
    if (saved) return saved.toLowerCase();
    return 'es';
};

const formatChatDateDivider = (timestamp) => {
    const d = timestamp ? new Date(timestamp) : new Date();
    const now = new Date();
    
    const isSameDay = (d1, d2) => 
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
        
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    
    const lang = getCurrentAppLang();
    
    if (isSameDay(d, now)) {
        if (lang === 'es') return 'Hoy';
        if (lang === 'en') return 'Today';
        if (lang === 'ru') return 'Сегодня';
        if (lang === 'uk') return 'Сьогодні';
        if (lang === 'et') return 'Täna';
        return 'Hoy';
    }
    if (isSameDay(d, yesterday)) {
        if (lang === 'es') return 'Ayer';
        if (lang === 'en') return 'Yesterday';
        if (lang === 'ru') return 'Вчера';
        if (lang === 'uk') return 'Вчора';
        if (lang === 'et') return 'Eile';
        return 'Ayer';
    }
    
    try {
        const localeMap = { es: 'es-ES', en: 'en-US', ru: 'ru-RU', uk: 'uk-UA', et: 'et-EE' };
        return d.toLocaleDateString(localeMap[lang] || 'es-ES', { day: 'numeric', month: 'short' });
    } catch(e) {
        return `${d.getDate()}/${d.getMonth()+1}`;
    }
};

const parseMarkdown = (text) => {
    if (!text) return '';
    
    // First escape HTML
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
        
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="chat-code-block"><code>$1</code></pre>');
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');
    // Bold
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong style="color: var(--text-primary);">$1</strong>');
    // Italic
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    
    // Horizontal dividers (--- or ***)
    html = html.replace(/^(?:---|\*\*\*)\s*$/gm, '<hr style="border:none; border-top:1px solid var(--border-color); margin:14px 0; opacity:0.6;">');
    
    // Day/Date Headers (e.g. 📅 Viernes, 04/09/2026)
    html = html.replace(/^(?:[#\s>]*)(📅\s*[^\n<]+)$/gm, '<div style="background: rgba(37, 99, 235, 0.12); border-left: 3px solid var(--color-accent); padding: 8px 12px; border-radius: 8px; font-weight: 700; font-size: 15px; margin-top: 14px; margin-bottom: 8px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">$1</div>');
    
    // Session Titles (e.g. > 🏋️‍♂️ Sesión 1: ... or > Sesión 1: ...)
    html = html.replace(/^>\s*(?:🏋️‍♂️|🏋️)?\s*(Sesión\s*\d+[^\n<]*)$/gim, '<div style="font-size: 14.5px; font-weight: 700; color: #60a5fa; margin: 10px 0 4px 0; display: flex; align-items: center; gap: 6px;"><span style="font-size:16px;">🏋️‍♂️</span> $1</div>');
    
    // Session Type Badges (🔴 Pesado/Heavy, 🔵 Hipertrofia/Hypertrophy, 🟢 Intensidad/Intensity)
    // Matches "Tipo: Pesado (Heavy)", "Tipo: Hipertrofia", "Tipo: Intensidad", etc.
    html = html.replace(/Tipo:\s*Pesado(?:\s*\([^)]*\))?/gi, 'Tipo: <span style="background: rgba(220, 38, 38, 0.2); color: #f87171; border: 1px solid rgba(220, 38, 38, 0.45); padding: 2px 9px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-flex; align-items: center; gap: 4px;">🔴 Pesado</span>');
    html = html.replace(/Tipo:\s*Hipertrofia(?:\s*\([^)]*\))?/gi, 'Tipo: <span style="background: rgba(37, 99, 235, 0.2); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.45); padding: 2px 9px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-flex; align-items: center; gap: 4px;">🔵 Hipertrofia</span>');
    html = html.replace(/Tipo:\s*Intensidad(?:\s*\([^)]*\))?/gi, 'Tipo: <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.45); padding: 2px 9px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-flex; align-items: center; gap: 4px;">🟢 Intensidad</span>');
    html = html.replace(/Tipo:\s*Objetivo(?:\s*\([^)]*\))?/gi, 'Tipo: <span style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.45); padding: 2px 9px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-flex; align-items: center; gap: 4px;">🟡 Objetivo</span>');

    // Standalone badges like [Pesado], [Hipertrofia], [Intensidad]
    html = html.replace(/\[Pesado\]/gi, '<span style="background: rgba(220, 38, 38, 0.2); color: #f87171; border: 1px solid rgba(220, 38, 38, 0.45); padding: 1px 7px; border-radius: 5px; font-weight: 700; font-size: 11px;">🔴 Pesado</span>');
    html = html.replace(/\[Hipertrofia\]/gi, '<span style="background: rgba(37, 99, 235, 0.2); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.45); padding: 1px 7px; border-radius: 5px; font-weight: 700; font-size: 11px;">🔵 Hipertrofia</span>');
    html = html.replace(/\[Intensidad\]/gi, '<span style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.45); padding: 1px 7px; border-radius: 5px; font-weight: 700; font-size: 11px;">🟢 Intensidad</span>');
    
    // Headers (H1, H2, H3, H4) with hierarchy
    html = html.replace(/^#\s+(.+)$/gm, '<div style="font-weight:800; color:var(--color-accent); margin-top:16px; margin-bottom:8px; font-size:18px; line-height:1.3;">$1</div>');
    html = html.replace(/^##\s+(.+)$/gm, '<div style="font-weight:800; color:var(--text-primary); margin-top:16px; margin-bottom:8px; font-size:16px; border-bottom:1px solid var(--border-color); padding-bottom:4px;">$1</div>');
    html = html.replace(/^###\s+(.+)$/gm, '<div style="font-weight:700; color:var(--text-primary); margin-top:14px; margin-bottom:6px; font-size:15px;">$1</div>');
    html = html.replace(/^####\s+(.+)$/gm, '<div style="font-weight:700; color:var(--color-accent); margin-top:12px; margin-bottom:4px; font-size:13.5px; display:flex; align-items:center; gap:6px;"><i class="ph ph-caret-right" style="font-size:14px;"></i> $1</div>');
    
    // Numbered lists (e.g. 1. Exercise name)
    html = html.replace(/^(\d+)\.\s+(.+)$/gm, '<div style="display:flex; align-items:baseline; gap:8px; margin-bottom:6px; line-height:1.4;"><span style="color:var(--color-accent); font-weight:700; font-size:13px; min-width:18px;">$1.</span><div style="flex:1;">$2</div></div>');
    
    // Bullet points (* or -)
    html = html.replace(/^[\*\-]\s+(.+)$/gm, '<div style="display:flex; align-items:baseline; gap:8px; margin-bottom:6px; line-height:1.4;"><span style="color:var(--color-accent); font-weight:bold; font-size:14px;">•</span><div style="flex:1;">$1</div></div>');
    
    // Line breaks for remaining regular text
    html = html.replace(/\n\n/g, '<div style="height:8px;"></div>');
    html = html.replace(/\n/g, '<br>');
    
    // Clean up code block line breaks
    html = html.replace(/<pre class="chat-code-block"><code>([\s\S]*?)<\/code><\/pre>/g, (m, codeBlock) => {
        return `<pre class="chat-code-block"><code>${codeBlock.replace(/<br>/g, '\n').replace(/<div style="height:8px;"><\/div>/g, '\n\n')}</code></pre>`;
    });
    
    return html;
};

window.updateAiButtonsVisibility = () => {
    const isAiTab = document.getElementById('view-ai')?.classList.contains('active');
    const hasKey = !!localStorage.getItem('gemini_api_key');
    const btnSettings = document.getElementById('btn-ai-settings');
    const btnClear = document.getElementById('btn-ai-clear');
    
    if (btnSettings) btnSettings.style.display = (isAiTab && hasKey) ? 'flex' : 'none';
    if (btnClear) btnClear.style.display = (isAiTab && hasKey) ? 'flex' : 'none';
};

const appendDateDivider = (timestamp) => {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return;
    const divider = document.createElement('div');
    divider.className = 'chat-date-divider';
    divider.innerHTML = `<span>${formatChatDateDivider(timestamp)}</span>`;
    messagesContainer.appendChild(divider);
};

window.startReplyTo = (sender, rawText) => {
    let textToQuote = rawText;
    const selection = window.getSelection() ? window.getSelection().toString().trim() : '';
    if (selection && rawText && rawText.includes(selection)) {
        textToQuote = selection;
    } else if (currentSelectionData && currentSelectionData.text && rawText.includes(currentSelectionData.text)) {
        textToQuote = currentSelectionData.text;
    }
    replyingTo = { sender, text: textToQuote };
    const bar = document.getElementById('ai-reply-preview-bar');
    const authorLabel = document.getElementById('reply-author-label');
    const textLabel = document.getElementById('reply-text-label');
    const inputBar = document.getElementById('ai-input-bar');
    const input = document.getElementById('ai-chat-input');
    
    if (bar && authorLabel && textLabel) {
        const lang = (window.currentLang || (typeof state !== 'undefined' ? state.language : 'es') || 'es').toLowerCase();
        let authorText = sender === 'user' 
            ? (lang === 'es' ? 'Tú' : (lang === 'en' ? 'You' : 'Вы'))
            : (lang === 'es' ? 'Asistente IA' : (lang === 'en' ? 'AI Assistant' : 'ИИ Ассистент'));
            
        authorLabel.textContent = (lang === 'es' ? 'Respondiendo a: ' : (lang === 'en' ? 'Replying to: ' : 'В ответ на: ')) + authorText;
        textLabel.textContent = rawText;
        bar.style.display = 'flex';
        if (inputBar) inputBar.classList.add('with-reply');
        if (input) input.focus();
    }
};

window.cancelReply = () => {
    replyingTo = null;
    const bar = document.getElementById('ai-reply-preview-bar');
    const inputBar = document.getElementById('ai-input-bar');
    if (bar) bar.style.display = 'none';
    if (inputBar) inputBar.classList.remove('with-reply');
};

window.copyMessageText = (rawText) => {
    navigator.clipboard.writeText(rawText).then(() => {
        if (typeof showToast === 'function') showToast('Mensaje copiado al portapapeles');
    }).catch(err => {
        console.error('Error copying text:', err);
    });
};

// Navigation helper when user clicks on an AI created workout card
window.goToCalendarDate = (dateStr) => {
    try {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            const d = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
            if (typeof state !== 'undefined' && state) {
                state.selectedDate = d;
                if (typeof getMonday === 'function') {
                    state.currentWeekStart = getMonday(d);
                }
            }
        }
        const calNav = document.querySelector('.nav-item[data-target="view-calendar"]');
        if (calNav) calNav.click();
        if (typeof renderCalendar === 'function') renderCalendar();
    } catch(e) {
        console.error("Error navigating to calendar date:", e);
    }
};

// Render message in chat
const appendAiMessage = (text, sender, scrollToBottom = true, timestamp = Date.now(), quote = null, createdSessions = []) => {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return;
    
    if (sender === 'loading') {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'ai-loading-msg';
        loadingDiv.className = 'chat-bubble-wrapper ai-wrapper';
        loadingDiv.innerHTML = `
            <div class="chat-bubble chat-bubble-ai loading-bubble">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
                <span class="loading-text">${text}</span>
            </div>
        `;
        messagesContainer.appendChild(loadingDiv);
        if (scrollToBottom) messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return;
    }
    
    const wrapper = document.createElement('div');
    wrapper.className = `chat-bubble-wrapper ${sender}-wrapper`;
    
    const timeStr = formatChatTime(timestamp);
    const parsedText = sender === 'user' 
        ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br>')
        : parseMarkdown(text);
        
    let quoteHtml = '';
    if (quote && quote.text) {
        const lang = (window.currentLang || (typeof state !== 'undefined' ? state.language : 'es') || 'es').toLowerCase();
        let authorName = quote.sender === 'user' 
            ? (lang === 'es' ? 'Tú' : (lang === 'en' ? 'You' : 'Вы'))
            : (lang === 'es' ? 'Asistente IA' : (lang === 'en' ? 'AI Assistant' : 'ИИ Ассистент'));
        quoteHtml = `
            <div class="chat-quote-box">
                <span class="chat-quote-author">${authorName}</span>
                <span class="chat-quote-snippet">${quote.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>
            </div>
        `;
    }

    // Render interactive cards for newly created sessions
    let sessionsHtml = '';
    if (createdSessions && createdSessions.length > 0) {
        createdSessions.forEach(ses => {
            let typeName = ses.type === 'hypertrophy' ? 'Hipertrofia' : ses.type === 'heavy' ? 'Pesado' : ses.type === 'intensity' ? 'Alta Intensidad' : 'Objetivo';
            sessionsHtml += `
                <div class="ai-created-workout-card" style="background: rgba(37, 99, 235, 0.12); border: 1px solid var(--color-accent); border-radius: 12px; padding: 12px; margin-top: 10px;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 6px;">
                        <span style="color:var(--color-accent); font-weight:700; font-size:13px; display:flex; align-items:center; gap:6px;">
                            <i class="ph ph-calendar-check" style="font-size:16px;"></i> Sesión creada en tu Calendario
                        </span>
                        <span style="font-size:12px; font-weight:600; color:var(--text-secondary);">📅 ${ses.date}</span>
                    </div>
                    <div style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:4px;">${ses.name}</div>
                    <div style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">
                        <span>Tipo: ${typeName}</span> &bull; <span>${ses.exercises.length} ejercicios configurados</span>
                    </div>
                    <button class="btn-primary" style="width:100%; padding:8px 12px; font-size:13px; font-weight:600; border-radius:8px; display:flex; align-items:center; justify-content:center; gap:6px;" onclick="goToCalendarDate('${ses.date}')">
                        <i class="ph ph-calendar"></i> Ver en Calendario
                    </button>
                </div>
            `;
        });
    }
    
    const escapedRaw = encodeURIComponent(text);
    
    wrapper.innerHTML = `
        <div class="chat-actions-btn-group">
            <button class="chat-action-btn" onclick="startReplyTo('${sender}', decodeURIComponent('${escapedRaw}'))" title="Responder"><i class="ph ph-arrow-bend-up-left"></i></button>
            <button class="chat-action-btn" onclick="copyMessageText(decodeURIComponent('${escapedRaw}'))" title="Copiar"><i class="ph ph-copy"></i></button>
        </div>
        <div class="chat-bubble chat-bubble-${sender}">
            ${quoteHtml}
            <div class="chat-bubble-content">${parsedText}</div>
            ${sessionsHtml}
            <div class="chat-bubble-footer">
                <span class="chat-time">${timeStr}</span>
                ${sender === 'user' ? '<i class="ph ph-check-double chat-check"></i>' : ''}
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(wrapper);
    if (scrollToBottom) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};

window.renderFullChatHistory = () => {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return;
    messagesContainer.innerHTML = '';
    
    const profile = getAiUserProfile();
    if (!profile) {
        const welcomeDate = Date.now();
        appendDateDivider(welcomeDate);
        
        // Render onboarding setup card
        const cardDiv = document.createElement('div');
        cardDiv.className = 'ai-onboarding-card';
        cardDiv.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom: 12px;">
                <span style="font-size: 24px;">👋</span>
                <div>
                    <h4 style="margin:0; font-size:15px; font-weight:700; color:var(--text-primary);">¡Hola! Cuéntame sobre ti</h4>
                    <p style="margin:0; font-size:12px; color:var(--text-secondary);">Para que tus entrenamientos y consejos sean 100% personalizados.</p>
                </div>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <div>
                    <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:3px;">¿Cómo quieres que te llame?</label>
                    <input type="text" id="ai-profile-name" placeholder="Ej. Carlos / Campeón" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-surface); color:var(--text-primary); font-size:13px; box-sizing:border-box;">
                </div>
                <div>
                    <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:3px;">Objetivo Principal</label>
                    <select id="ai-profile-goal" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-surface); color:var(--text-primary); font-size:13px; box-sizing:border-box;">
                        <option value="Hipertrofia / Ganancia muscular">Hipertrofia / Masa muscular</option>
                        <option value="Pérdida de grasa / Definición">Pérdida de grasa / Definición</option>
                        <option value="Fuerza y Rendimiento">Fuerza y Rendimiento</option>
                        <option value="Salud y Mantenimiento">Salud y Mantenimiento</option>
                    </select>
                </div>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <div>
                    <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:3px;">Peso (kg)</label>
                    <input type="number" id="ai-profile-weight" placeholder="Ej. 75" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-surface); color:var(--text-primary); font-size:13px; box-sizing:border-box;">
                </div>
                <div>
                    <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:3px;">Altura (cm)</label>
                    <input type="number" id="ai-profile-height" placeholder="Ej. 178" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-surface); color:var(--text-primary); font-size:13px; box-sizing:border-box;">
                </div>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:6px;">
                <div>
                    <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:3px;">Nivel de experiencia</label>
                    <select id="ai-profile-level" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-surface); color:var(--text-primary); font-size:13px; box-sizing:border-box;" onchange="updateProfileLevelHint('onboard')">
                        <option value="Principiante">Principiante (< 1 año)</option>
                        <option value="Intermedio" selected>Intermedio (1 a 3 años)</option>
                        <option value="Avanzado">Avanzado (> 3 años)</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:3px;">Días preferidos / sem.</label>
                    <select id="ai-profile-days" style="width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-surface); color:var(--text-primary); font-size:13px; box-sizing:border-box;">
                        <option value="2">2 días / semana</option>
                        <option value="3">3 días / semana</option>
                        <option value="4" selected>4 días / semana</option>
                        <option value="5">5 días / semana</option>
                        <option value="6">6 días / semana</option>
                    </select>
                </div>
            </div>
            <div id="ai-level-hint" style="font-size:11.5px; color:var(--color-accent); margin-bottom:12px; line-height:1.3;">
                • De 1 a 3 años entrenando constante. Buena técnica y progresión regular de cargas.
            </div>
            <button class="btn-primary" style="width:100%; padding:10px; font-size:13px; font-weight:600; border-radius:10px; display:flex; align-items:center; justify-content:center; gap:6px;" onclick="saveAiUserProfile()">
                <i class="ph ph-check-circle" style="font-size:16px;"></i> Guardar Perfil y Empezar
            </button>
        `;
        messagesContainer.appendChild(cardDiv);
        return;
    }

    if (!aiChatHistory || aiChatHistory.length === 0) {
        const welcomeDate = Date.now();
        appendDateDivider(welcomeDate);
        const name = profile.nickname || 'Campeón';
        const welcomeText = `¡Hola, **${name}**! Soy tu entrenador personal de Gym Tracker. Conozco tu objetivo de **${profile.goal}** y tengo sincronizado tu calendario y base de datos en tiempo real. ¿Qué te gustaría entrenar o consultar hoy? 💪`;
        appendAiMessage(welcomeText, 'ai', false, welcomeDate);
        return;
    }
    
    let lastDate = null;
    aiChatHistory.forEach(msg => {
        const msgTime = msg.timestamp || Date.now();
        const msgDate = new Date(msgTime).toDateString();
        
        if (msgDate !== lastDate) {
            appendDateDivider(msgTime);
            lastDate = msgDate;
        }
        
        const text = (msg.parts && msg.parts[0] && msg.parts[0].text) || msg.text || '';
        const role = msg.role === 'user' ? 'user' : 'ai';
        appendAiMessage(text, role, false, msgTime, msg.quote, msg.createdSessions || []);
    });
    
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 50);
};

const initAi = () => {
    const apiKey = localStorage.getItem('gemini_api_key');
    const setupContainer = document.getElementById('ai-setup-container');
    const chatContainer = document.getElementById('ai-chat-container');
    
    if (!setupContainer || !chatContainer) return;

    if (apiKey) {
        setupContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
        
        // Load history
        const savedHistory = localStorage.getItem('gemini_chat_history');
        if (savedHistory) {
            try {
                aiChatHistory = JSON.parse(savedHistory);
            } catch(e) {
                aiChatHistory = [];
            }
        } else {
            aiChatHistory = [];
        }
        window.renderFullChatHistory();
    } else {
        setupContainer.style.display = 'flex';
        chatContainer.style.display = 'none';
    }
    
    window.updateAiButtonsVisibility();
    setupTextSelectionListener();
};

window.saveAiKey = () => {
    const key = document.getElementById('ai-api-key-input').value.trim();
    if (!key) {
        if(typeof showToast === 'function') showToast('Introduce una API Key válida', 'error');
        else alert('Introduce una API Key válida');
        return;
    }
    localStorage.setItem('gemini_api_key', key);
    initAi();
    if(typeof showToast === 'function') showToast('API Key guardada correctamente');
};

window.openAiSettings = () => {
    const modal = document.getElementById('modal-ai-settings');
    if(modal) modal.classList.add('active');
};

window.clearAiChatHistory = () => {
    if (!confirm('¿Quieres vaciar toda la conversación con el asistente?')) return;
    aiChatHistory = [];
    localStorage.removeItem('gemini_chat_history');
    cancelReply();
    window.renderFullChatHistory();
    if (typeof showToast === 'function') showToast('Conversación vaciada');
};

window.confirmClearChatFromModal = () => {
    const modal = document.getElementById('modal-ai-settings');
    if (modal) modal.classList.remove('active');
    setTimeout(() => {
        window.clearAiChatHistory();
    }, 200);
};

window.confirmResetAiKey = () => {
    if (!confirm('¿Seguro que quieres eliminar tu Clave API guardada?')) return;
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('gemini_chat_history');
    aiChatHistory = [];
    cancelReply();
    const input = document.getElementById('ai-api-key-input');
    if(input) input.value = '';
    input.style.height = 'auto';
    initAi();
    const modal = document.getElementById('modal-ai-settings');
    if(modal) modal.classList.remove('active');
    if (typeof showToast === 'function') showToast('Clave API eliminada');
};

// Builds a live, comprehensive data context for the AI
function buildLiveAppContext() {
    if (typeof state === 'undefined' || !state) return '';
    
    const now = new Date();
    const todayStr = (typeof formatDate === 'function') ? formatDate(now) : `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const currentDayName = daysOfWeek[now.getDay()];
    
    // User Profile
    const profile = getAiUserProfile() || {};
    const profileContext = `PERFIL DEL USUARIO:
- Nombre / Cómo dirigirse: ${profile.nickname || 'Usuario'}
- Objetivo principal: ${profile.goal || 'Hipertrofia y ganancia muscular'}
- Peso actual: ${profile.weight ? profile.weight + ' kg' : 'No especificado'}
- Altura: ${profile.height ? profile.height + ' cm' : 'No especificada'}
- Nivel de experiencia: ${profile.experience || 'Intermedio'}
- Días de entrenamiento preferidos: ${profile.preferredDays || '4'} días por semana
- Notas / Preferencias: ${profile.customNotes || 'Ninguna'}`;

    // 1. Planned Calendar Sessions
    let calendarContext = 'No hay sesiones planificadas.';
    if (state.sessions && state.sessions.length > 0) {
        calendarContext = state.sessions.map(s => {
            const exSummary = (s.exercises || []).map(e => {
                const setsCount = (e.sets || []).length;
                return `${e.name || e.exerciseId} (${setsCount} series)`;
            }).join(', ');
            return `- Fecha: ${s.date} | Nombre: "${s.name}" | Tipo: ${s.type} | Ejercicios: [${exSummary}]`;
        }).join('\n');
    }
    
    // 2. Exercises Database
    let exercisesContext = 'No hay ejercicios registrados.';
    if (state.exercises && state.exercises.length > 0) {
        exercisesContext = state.exercises.map(e => `${e.name} (Grupo: ${e.group || 'Sin Grupo'})`).join(', ');
    }
    
    // 3. Muscle Groups
    let groupsContext = (state.groups || []).join(', ');
    
    // 4. Completed Workouts History (recent 5)
    let historyContext = 'No hay historial completado aún.';
    if (state.completedWorkouts && state.completedWorkouts.length > 0) {
        const recent = state.completedWorkouts.slice(-5).reverse();
        historyContext = recent.map(w => {
            return `- ${w.date}: "${w.name}" (${w.type}, duración: ${w.duration || 'N/A'}) con ${w.exercises?.length || 0} ejercicios`;
        }).join('\n');
    }
    
    // 5. Body Evolution / Measurements
    let evolutionContext = 'No hay registros de evolución corporal aún.';
    if (state.evolution && state.evolution.length > 0) {
        const latest = state.evolution[state.evolution.length - 1];
        const m = latest.measurements || {};
        evolutionContext = `Último registro (${latest.date}): Peso: ${latest.weight || 'N/A'} kg, % Grasa: ${latest.bf || 'N/A'}%, Medidas: Pecho ${m.m1 || 'N/A'}cm, Brazo Izq ${m.m2 || 'N/A'}cm, Brazo Der ${m.m3 || 'N/A'}cm, Abdomen ${m.m4 || 'N/A'}cm, Cintura ${m.m5 || 'N/A'}cm, Caderas ${m.m6 || 'N/A'}cm, Muslo Izq ${m.m7 || 'N/A'}cm, Muslo Der ${m.m8 || 'N/A'}cm`;
    }

    return `
ESTADO ACTUAL EN TIEMPO REAL DE LA APLICACIÓN GYM TRACKER:
- Fecha de hoy: ${currentDayName}, ${todayStr} (Formato DD/MM/YYYY)
- Idioma de la app: ${state.language || 'es'}

0. ${profileContext}

1. ENTRENAMIENTOS PLANIFICADOS EN EL CALENDARIO DEL USUARIO:
${calendarContext}

2. BASE DE DATOS DE EJERCICIOS REGISTRADOS EN LA APP:
${exercisesContext}

3. GRUPOS MUSCULARES DISPONIBLES:
${groupsContext}

4. HISTORIAL DE ENTRENAMIENTOS COMPLETADOS RECIENTES:
${historyContext}

5. ÚLTIMAS MEDIDAS / EVOLUCIÓN:
${evolutionContext}
`;
}

// Executes and adds created sessions to state.sessions
function executeAiGymActions(responseText) {
    const regex = /```(?:json:)?gym_action\s*([\s\S]*?)```/i;
    const match = responseText.match(regex);
    if (!match) return { cleanedText: responseText, createdSessions: [] };
    
    let createdSessions = [];
    try {
        const actionData = JSON.parse(match[1].trim());
        if (actionData.action === 'create_sessions' && Array.isArray(actionData.sessions) && typeof state !== 'undefined') {
            actionData.sessions.forEach(ses => {
                if (!ses.name || !ses.date) return;
                
                const blockId = Date.now().toString() + Math.random().toString().slice(2, 6);
                const workoutExercises = [];
                
                (ses.exercises || []).forEach(exItem => {
                    let matchedEx = null;
                    if (state.exercises) {
                        const norm = (exItem.name || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
                        matchedEx = state.exercises.find(e => e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "") === norm);
                        if (!matchedEx) {
                            matchedEx = state.exercises.find(e => e.name.toLowerCase().includes((exItem.name || '').toLowerCase()));
                        }
                    }
                    
                    const exId = matchedEx ? matchedEx.id : (Date.now().toString() + Math.random().toString().slice(2, 6));
                    const exName = matchedEx ? matchedEx.name : (exItem.name || 'Ejercicio');
                    
                    // If exercise doesn't exist, create it in state.exercises
                    if (!matchedEx && state.exercises) {
                        state.exercises.push({
                            id: exId,
                            name: exName,
                            group: 'Sin Grupo',
                            description: '',
                            imageData: '',
                            defaults: { hypertrophy: '8-12', heavy: '4-6', intensity: '12-15' },
                            prWeight: 0,
                            prReps: 0
                        });
                    }
                    
                    const sets = (exItem.sets && exItem.sets.length > 0) ? exItem.sets.map(s => ({
                        type: s.type || 'Efectiva',
                        weight: parseFloat(s.weight) || 0,
                        reps: s.reps ? String(s.reps) : '',
                        targetReps: s.reps ? String(s.reps) : '8-12',
                        repsDrop: '',
                        restTime: s.restTime || '60s'
                    })) : [
                        { type: 'Calentamiento', weight: 0, reps: '15', targetReps: '15', restTime: '45s' },
                        { type: 'Aproximación', weight: 0, reps: '10', targetReps: '10', restTime: '45s' },
                        { type: 'Efectiva', weight: 0, reps: '8-10', targetReps: '8-10', restTime: '60s' }
                    ];
                    
                    workoutExercises.push({
                        exerciseId: exId,
                        name: exName,
                        supersetId: null,
                        supersetName: null,
                        sets: sets,
                        comments: ''
                    });
                });
                
                const newSession = {
                    id: Date.now().toString() + Math.random().toString().slice(2, 6),
                    blockId: blockId,
                    date: ses.date,
                    name: ses.name,
                    type: ['hypertrophy', 'heavy', 'intensity', 'goal'].includes(ses.type) ? ses.type : 'hypertrophy',
                    exercises: workoutExercises
                };
                
                state.sessions.push(newSession);
                createdSessions.push(newSession);
            });
            
            if (typeof saveState === 'function') saveState();
            if (typeof renderCalendar === 'function') renderCalendar();
            if (typeof showToast === 'function') showToast(`${createdSessions.length} entrenamiento(s) añadido(s) al calendario`);
        }
    } catch (e) {
        console.error('Error executing AI Gym Action:', e);
    }
    
    // Clean the action block from user text
    const cleanedText = responseText.replace(regex, '').trim();
    return { cleanedText, createdSessions };
}


window.handleAiChatKeydown = (e) => {
    if (e.key === 'Enter') {
        if (e.shiftKey) {
            setTimeout(() => {
                const input = document.getElementById('ai-chat-input');
                if (input) {
                    input.style.height = 'auto';
                    input.style.height = Math.min(input.scrollHeight, 140) + 'px';
                }
            }, 10);
        } else {
            e.preventDefault();
            sendAiMessage();
        }
    }
};

window.handleAiChatInput = (el) => {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
};

window.sendAiMessage = async () => {
    const input = document.getElementById('ai-chat-input');
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    input.style.height = 'auto';
    const userTimestamp = Date.now();
    const activeQuote = replyingTo ? { ...replyingTo } : null;
    cancelReply();
    
    appendAiMessage(text, 'user', true, userTimestamp, activeQuote);
    
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) return;
    
    appendAiMessage('Pensando...', 'loading');
    
    try {
        const lang = (window.currentLang || (typeof state !== 'undefined' ? state.language : 'es') || 'es').toUpperCase();
        const appContext = buildLiveAppContext();
        
        const systemPrompt = `You are the expert AI personal trainer, nutritionist, and assistant integrated directly into the Gym Tracker app.
Respond in ${lang} in a helpful, direct, motivating, structured, and expert manner.

You have full real-time access to the user's live database, calendar, workouts, history, exercises, and physical evolution below.
Use this information directly and precisely to answer questions about what workouts are scheduled, history, progression, or exercises.

${appContext}

FORMATTING AND VISUAL DESIGN GUIDELINES:
- Create visually rich, structured and appealing responses.
- USE HEADERS TO VARY TEXT SIZES:
  * Use \`# Big Header\` (Large font size) for main topic announcements.
  * Use \`## Section Header\` (Medium-large with underline) for primary sections.
  * Use \`### Subheader\` (Medium font) for sub-sections.
  * Use \`#### Subsection\` for small categorizations.
- WORKOUT SESSION TYPES COLOR CODING:
  * When mentioning a session type, write it as 'Tipo: Pesado', 'Tipo: Hipertrofia', or 'Tipo: Intensidad'. The app will automatically highlight them in their official colors:
    - 🔴 Pesado (Heavy) -> Red badge
    - 🔵 Hipertrofia (Hypertrophy) -> Blue badge
    - 🟢 Intensidad (Intensity) -> Green badge
    - 🟡 Objetivo (Goal) -> Yellow badge
- DATES AND SESSIONS:
  * Use '📅 Día, DD/MM/YYYY' for day headers (e.g. 📅 Viernes, 04/09/2026) to render a highlighted calendar card.
  * Use '> Sesión 1: [Nombre]' for session headers.
  * Use horizontal dividers '---' between days to separate them cleanly.
- EXERCISES LISTS:
  * Present exercises in clean numbered lists: '1. **Nombre del ejercicio** — 3 series (8-10 reps) [Grupo muscular]'.

INSTRUCTIONS FOR CREATING / SCHEDULING WORKOUTS IN THE CALENDAR:
When the user asks you to create, plan, add, or schedule a workout/routine (for today, tomorrow, a specific date DD/MM/YYYY, or multiple days):
1. Explain the routine clearly in your text (exercises, sets, target reps, rest times, technique cues).
2. AT THE VERY END of your response, output a JSON action block enclosed in triple backticks with tag "json:gym_action".
Schema:
\`\`\`json:gym_action
{
  "action": "create_sessions",
  "sessions": [
    {
      "name": "Nombre de la sesión (ej. Pecho y Tríceps Hipertrofia)",
      "date": "DD/MM/YYYY",
      "type": "hypertrophy" | "heavy" | "intensity" | "goal",
      "exercises": [
        {
          "name": "Nombre exacto o aproximado de un ejercicio de la app",
          "sets": [
            { "type": "Calentamiento", "reps": "15", "weight": 0, "restTime": "45s" },
            { "type": "Aproximación", "reps": "10", "weight": 20, "restTime": "45s" },
            { "type": "Efectiva", "reps": "8-10", "weight": 40, "restTime": "60s" },
            { "type": "Efectiva", "reps": "8-10", "weight": 40, "restTime": "60s" }
          ]
        }
      ]
    }
  ]
}
\`\`\`
Valid set types: "Calentamiento", "Aproximación", "Efectiva", "Al fallo", "Dropset", "Dropset fallo".
Always format dates as DD/MM/YYYY. If the user asks for tomorrow, calculate the exact date based on today's date.
`;
        
        // Format history for Gemini API
        const apiContents = aiChatHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: (msg.parts && msg.parts[0] && msg.parts[0].text) || msg.text || '' }]
        }));
        
        // If user replied to a message, inject clear quote context for Gemini
        let userMessageForApi = text;
        if (activeQuote && activeQuote.text) {
            const author = activeQuote.sender === 'user' ? 'el usuario' : 'el asistente';
            userMessageForApi = `[Respondiendo al mensaje anterior de ${author}: "${activeQuote.text}"]\n${text}`;
        }
        
        apiContents.push({ role: "user", parts: [{ text: userMessageForApi }] });
        
        const requestBody = {
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: apiContents
        };
        
        const modelsToTry = [
            { version: 'v1', name: 'gemini-3.6-flash' },
            { version: 'v1beta', name: 'gemini-3.6-flash' },
            { version: 'v1', name: 'gemini-3.5-flash' },
            { version: 'v1beta', name: 'gemini-3.5-flash' },
            { version: 'v1', name: 'gemini-2.5-flash' },
            { version: 'v1beta', name: 'gemini-2.5-flash' }
        ];
        
        let response = null;
        let lastError = '';
        
        for (const config of modelsToTry) {
            try {
                response = await fetch(`https://generativelanguage.googleapis.com/${config.version}/models/${config.name}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });
                
                if (response.ok) {
                    break;
                } else {
                    const errorData = await response.json();
                    lastError = (errorData.error && errorData.error.message) ? errorData.error.message : 'Error desconocido de la API';
                    if (!lastError.includes('is not found') && !lastError.includes('no longer available') && !lastError.includes('deprecated')) {
                        throw new Error(lastError);
                    }
                }
            } catch(fetchErr) {
                if (!fetchErr.message.includes('is not found') && !fetchErr.message.includes('no longer available') && !fetchErr.message.includes('deprecated')) {
                    throw fetchErr;
                }
                lastError = fetchErr.message;
            }
        }
        
        if (!response || !response.ok) {
            throw new Error('No se ha podido contactar con la API de Gemini (probados modelos 3.6, 3.5 y 2.5). Genera una nueva clave en aistudio.google.com. Error: ' + lastError);
        }
        
        document.getElementById('ai-loading-msg')?.remove();
        
        const data = await response.json();
        const rawReply = data.candidates[0].content.parts[0].text;
        const aiTimestamp = Date.now();
        
        // Execute any actions returned by AI (e.g. creating workout sessions in calendar)
        const { cleanedText, createdSessions } = executeAiGymActions(rawReply);
        
        appendAiMessage(cleanedText, 'ai', true, aiTimestamp, null, createdSessions);
        
        aiChatHistory.push({ role: "user", parts: [{ text: text }], timestamp: userTimestamp, quote: activeQuote });
        aiChatHistory.push({ role: "model", parts: [{ text: rawReply }], timestamp: aiTimestamp, createdSessions: createdSessions });
        localStorage.setItem('gemini_chat_history', JSON.stringify(aiChatHistory));
        
    } catch(e) {
        document.getElementById('ai-loading-msg')?.remove();
        appendAiMessage('Error: ' + e.message + '<br><br><small>Revisa que tu API Key sea correcta o comprueba tu conexión.</small>', 'ai');
        console.error(e);
    }
};

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initAi, 400);
});
