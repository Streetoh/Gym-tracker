window.openExternalUrl = function(url) {
    if (!url) return;
    try {
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.SaveAs && typeof window.Capacitor.Plugins.SaveAs.openDefaultBrowser === 'function') {
            window.Capacitor.Plugins.SaveAs.openDefaultBrowser({ url: url });
            return;
        }
    } catch (e) {
        console.warn("SaveAs.openDefaultBrowser error:", e);
    }
    try {
        var opened = window.open(url, '_system');
        if (opened) return;
    } catch (e) {}
    try {
        var openedBlank = window.open(url, '_blank');
        if (openedBlank) return;
    } catch (e) {}
    try {
        var a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            if (a.parentNode) a.parentNode.removeChild(a);
        }, 200);
        return;
    } catch (e) {}
    try {
        window.location.href = url;
    } catch (e) {}
};

window.escapeHtml = function(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};
const exerciseDescTranslations = {
    "Aperturas con cable en polea baja": {
        "en": "Keep your torso upright. With slightly bent elbows, raise the cables upward and toward the center of your chest.",
        "ru": "Держите туловище прямо. Слегка согнутыми локтями поднимите тросы вверх и к центру груди.",
        "et": "Hoidke kere sirgena. Kergelt painutatud küünarnukkidega tõstke kaablid üles ja rinna keskosa suunas.",
        "uk": "Тримайте тулуб прямо. Зі злегка зігнутими ліктями підніміть троси вгору і до центру грудей."
    },
    "Prensa de piernas (pies elevados, énfasis posterior) (básico de pierna)": {
        "en": "Place feet high on the platform for greater hip flexion. Push with your heels without locking your knees.",
        "ru": "Поставьте ноги высоко на платформу. Толкайте пятками, не выпрямляя колени до конца.",
        "et": "Aseta jalad platvormil kõrgemale. Lükka kandadega, vältides põlvede lukustamist.",
        "uk": "Поставте ноги високо на платформу. Штовхайте п'ятами, не випрямляючи коліна повністю."
    },
    "Zancada inversa dinámica con mancuernas": {
        "en": "Take a large step backward. Lower under control until the back knee almost touches the floor. Keep chest high.",
        "ru": "Сделайте широкий шаг назад. Опускайтесь, пока заднее колено почти не коснется пола. Держите грудь высоко.",
        "et": "Astu lai samm taha. Lase end kontrollitult alla, kuni tagumine põlv peaaegu puudutab maad. Hoia rind üleval.",
        "uk": "Зробіть широкий крок назад. Опускайтесь, поки заднє коліно майже не торкнеться підлоги. Тримайте груди високо."
    },
    "Peso muerto rumano con mancuerna (cadena posterior)": {
        "en": "Lower by sliding dumbbells close to your legs. Keep a neutral spine and feel the stretch in the hamstrings.",
        "ru": "Опускайтесь, скользя гантелями по ногам. Держите спину ровно и чувствуйте растяжение в бицепсе бедра.",
        "et": "Lase alla, hoides hantleid jalgade lähedal. Hoia selg neutraalne ja tunneta venitust reie tagaosas.",
        "uk": "Опускайтесь, ковзаючи гантелями по ногах. Тримайте спину рівно і відчувайте розтягнення в біцепсі стегна."
    },
    "Abductor sentado en máquina": {
        "en": "Sit with a straight back. Push the pads outward using your glute strength, controlling the eccentric phase.",
        "ru": "Сядьте с прямой спиной. Выталкивайте подушки наружу за счет силы ягодиц, контролируя возврат.",
        "et": "Istu sirge seljaga. Lükka polstreid väljapoole tuharalihaste jõul, kontrollides tagasiliikumist.",
        "uk": "Сядьте з прямою спиною. Виштовхуйте подушки назовні за рахунок сили сідниць, контролюючи повернення."
    },
    "Aductor sentado en máquina": {
        "en": "Bring your legs together deliberately, squeezing the inner thigh. Don't let the weight drop when opening.",
        "ru": "Сводите ноги вместе, напрягая внутреннюю часть бедра. Не бросайте вес при раскрытии.",
        "et": "Too jalad kokku, pingutades reie sisekülge. Ära lase raskusel avanedes kukkuda.",
        "uk": "Зводьте ноги разом, напружуючи внутрішню частину стегна. Не кидайте вагу при розкритті."
    },
    "Crunch lateral de rodillas en polea alta": {
        "en": "Kneel and hold the rope behind your neck. Flex your torso to the side, contracting the obliques without pulling with your arms.",
        "ru": "Встаньте на колени и держите канат за шеей. Наклоните туловище в сторону, напрягая косые мышцы живота.",
        "et": "Põlvita ja hoia köit kaela taga. Painuta keha küljele, pingutades kaldlihaseid ilma kätega tõmbamata.",
        "uk": "Встаньте на коліна і тримайте канат за шиєю. Нахиліть тулуб убік, напружуючи косі м'язи живота."
    },
    "Swings con kettlebell": {
        "en": "Use your hips (hinge) to drive the weight forward, not your arms. Squeeze glutes at the top.",
        "ru": "Используйте бедра для выталкивания веса вперед, а не руки. Напрягите ягодицы в верхней точке.",
        "et": "Kasuta puusi raskuse ette lükkamiseks, mitte käsi. Pinguta tuharaid ülaosas.",
        "uk": "Використовуйте стегна для виштовхування ваги вперед, а не руки. Напружте сідниці у верхній точці."
    },
    "Press banca en multipower (básico de pectoral)": {
        "en": "Align the bar with your mid-chest. Retract scapulae, keep feet planted, and push explosively.",
        "ru": "Выровняйте штангу по центру груди. Сведите лопатки, упритесь ногами и мощно толкайте.",
        "et": "Joonda kang rinna keskosaga. Tõmba abaluud kokku, hoia jalad maas ja lükka plahvatuslikult.",
        "uk": "Вирівняйте штангу по центру грудей. Зведіть лопатки, упріться ногами і потужно штовхайте."
    },
    "Aperturas en banco inclinado con mancuernas (pectoral superior)": {
        "en": "Bench at 30-45 degrees. Lower by opening your arms with a slight elbow bend to avoid bicep stress.",
        "ru": "Скамья 30-45 градусов. Опускайте, разводя руки с легким изгибом в локте.",
        "et": "Pink 30-45 kraadi. Lase hantlid alla käsi avades, hoides küünarnukkides väikest painutust.",
        "uk": "Лава 30-45 градусів. Опускайте, розводячи руки з легким вигином у лікті."
    },
    "Aperturas en banco declinado con mancuernas (pectoral inferior)": {
        "en": "Secure your feet well. Open your chest and bring dumbbells together at the top like hugging a barrel.",
        "ru": "Хорошо зафиксируйте ноги. Разведите грудь и сведите гантели вверху, словно обнимаете бочку.",
        "et": "Kinnita jalad korralikult. Ava rind ja too hantlid ülal kokku, nagu kallistaksid tünni.",
        "uk": "Добре зафіксуйте ноги. Розведіть груди і зведіть гантелі вгорі, немов обіймаєте бочку."
    },
    "Curl de bíceps unilateral en polea baja codo detrás del cuerpo": {
        "en": "Turn your back to the pulley. Let your arm stretch behind your torso and curl, focusing on the bicep.",
        "ru": "Встаньте спиной к блоку. Позвольте руке вытянуться за туловище и сгибайте, концентрируясь на бицепсе.",
        "et": "Seisa seljaga ploki poole. Lase käel sirutuda keha taha ja kõverda, keskendudes biitsepsile.",
        "uk": "Встаньте спиною до блоку. Дозвольте руці витягнутися за тулуб і згинайте, концентруючись на біцепсі."
    },
    "Patada de tríceps en polea baja agarre supino": {
        "en": "Incline your torso, elbow fixed to your ribs. Extend your arm backward with palm facing up.",
        "ru": "Наклоните туловище, локоть прижат к ребрам. Разогните руку назад ладонью вверх.",
        "et": "Kalluta keha ette, küünarnukk ribide vastas. Siruta käsi taha, peopesa ülespoole.",
        "uk": "Нахиліть тулуб, лікоть притиснутий до ребер. Розігніть руку назад долонею вгору."
    },
    "Curl martillo en banco inclinado con mancuernas": {
        "en": "Rest your back on an incline bench for greater stretch. Neutral grip and curl without moving elbows.",
        "ru": "Обопритесь спиной на наклонную скамью. Нейтральный хват, сгибайте без движения локтей.",
        "et": "Toeta selg kaldpingile. Neutraalne hoie ja kõverda ilma küünarnukke liigutamata.",
        "uk": "Зіпріться спиною на похилу лаву. Нейтральний хват, згинайте без руху ліктів."
    },
    "Extensión de tríceps sentado a 1 brazo por encima de la cabeza con mancuerna": {
        "en": "Keep the elbow pointing to the ceiling. Lower the dumbbell behind your neck and fully extend.",
        "ru": "Локоть смотрит в потолок. Опустите гантель за шею и полностью выпрямите руку.",
        "et": "Hoia küünarnukk suunatud lakke. Lase hantel kaela taha ja siruta käsi täielikult välja.",
        "uk": "Лікоть дивиться в стелю. Опустіть гантель за шию і повністю випряміть руку."
    },
    "Jalón a 1 brazo al pecho sentado con cable en polea alta (espalda unilateral tracciones verticales)": {
        "en": "Pull the cable bringing the elbow toward your hip, depressing the shoulder. Control the stretch up.",
        "ru": "Тяните трос, направляя локоть к бедру и опуская плечо. Контролируйте растяжение вверх.",
        "et": "Tõmba kaablit, viies küünarnuki puusa poole ja õlg alla. Kontrolli venitust üles minnes.",
        "uk": "Тягніть трос, направляючи лікоть до стегна і опускаючи плече. Контролюйте розтягнення вгору."
    },
    "Remo a 1 brazo sentado con cable en polea baja (espalda unilateral tracciones horizontales)": {
        "en": "Pull toward your navel maintaining a neutral spine. Squeeze the scapula at the end of the movement.",
        "ru": "Тяните к пупку, сохраняя спину нейтральной. Сожмите лопатку в конце движения.",
        "et": "Tõmba naba poole, hoides selg neutraalne. Pinguta abaluud liigutuse lõpus.",
        "uk": "Тягніть до пупка, зберігаючи спину нейтральною. Стисніть лопатку в кінці руху."
    },
    "Hiperextensión lumbar (tradicional) (Espalda baja)": {
        "en": "Adjust the pad below your hips. Lower your torso and rise by contracting lower back and glutes without hyperextending.",
        "ru": "Отрегулируйте подушку ниже бедер. Опускайтесь и поднимайтесь за счет поясницы и ягодиц без переразгибания.",
        "et": "Seadista padi puusadest allapoole. Lase keha alla ja tõuse tuharate ja alaselja jõul ilma üle sirutamata.",
        "uk": "Відрегулюйте подушку нижче стегон. Опускайтеся і піднімайтеся за рахунок попереку і сідниць без перерозгинання."
    },
    "Press militar sentado en máquina (básico de hombro)": {
        "en": "Align grips with your shoulders. Push up without shrugging your neck and lower under control.",
        "ru": "Выровняйте рукоятки по уровню плеч. Жмите вверх, не поднимая шею, и опускайте под контролем.",
        "et": "Joonda käepidemed õlgadega. Lükka üles ilma kaela pingutamata ja lase kontrollitult alla.",
        "uk": "Вирівняйте рукоятки за рівнем плечей. Тисніть вгору, не піднімаючи шию, і опускайте під контролем."
    },
    "Elevación lateral a 1 brazo inclinado con cable en polea baja (hombro medio)": {
        "en": "Hold a support and lean slightly. Raise the cable to the side with a slight elbow bend.",
        "ru": "Держитесь за опору и слегка наклонитесь. Поднимайте трос в сторону с легким изгибом в локте.",
        "et": "Hoia toest kinni ja kalluta veidi. Tõsta kaabel küljele väikese küünarnuki paindega.",
        "uk": "Тримайтеся за опору і злегка нахиліться. Піднімайте трос убік з легким вигином у лікті."
    },
    "Pájaros simultáneos en polea alta (hombro posterior)": {
        "en": "Cross the cables. Pull back and out, feeling the contraction in the rear shoulder.",
        "ru": "Скрестите тросы. Тяните назад и наружу, чувствуя сокращение в задней дельте.",
        "et": "Rista kaablid. Tõmba taha ja välja, tunnetades tagumise õlalihase pingutust.",
        "uk": "Схрестіть троси. Тягніть назад і назовні, відчуваючи скорочення в задній дельті."
    },
    "Sentadilla a cajón en multipower": {
        "en": "Control the descent until sitting softly on the box; don't drop. Drive up powerfully from zero.",
        "ru": "Контролируйте спуск, мягко садясь на коробку. Мощно толкайтесь вверх с нуля.",
        "et": "Kontrolli laskumist, istudes pehmelt kastile. Lükka plahvatuslikult üles.",
        "uk": "Контролюйте спуск, м'яко сідаючи на коробку. Потужно штовхайтеся вгору з нуля."
    },
    "Sentadilla ATG en multipower (énfasis glúteo)": {
        "en": "Go as low as possible (Ass To Grass) keeping a neutral lumbar. Place feet slightly forward.",
        "ru": "Приседайте максимально низко (ATG), сохраняя поясницу ровной. Ноги чуть впереди.",
        "et": "Lasku nii madalale kui võimalik, hoides alaselg neutraalne. Aseta jalad veidi ettepoole.",
        "uk": "Присідайте максимально низько (ATG), зберігаючи поперек рівним. Ноги трохи попереду."
    },
    "Extensión de cuádriceps sentado en máquina (cuádriceps aislado)": {
        "en": "Align your knee with the machine's axis. Extend legs, contracting hard at the top, and hold for 1 second.",
        "ru": "Выровняйте колено по оси тренажера. Разгибайте ноги, сильно напрягая вверху.",
        "et": "Joonda põlv masina teljega. Siruta jalad, pingutades tugevalt ülaosas.",
        "uk": "Вирівняйте коліно по осі тренажера. Розгинайте ноги, сильно напружуючи вгорі."
    },
    "Curl femoral tumbado en máquina (femoral aislado)": {
        "en": "Keep hips pinned to the pad. Flex knees, bringing the roller toward your glutes.",
        "ru": "Прижмите таз к скамье. Сгибайте колени, приближая валик к ягодицам.",
        "et": "Hoia puusad pingi vastas. Kõverda põlvi, tuues rulliku tuharate poole.",
        "uk": "Притисніть таз до лави. Згинайте коліна, наближаючи валик до сідниць."
    },
    "Leñador en polea media": {
        "en": "Rotate your torso using core strength, keeping arms straight as you pass the cable side to side.",
        "ru": "Вращайте туловище за счет пресса, держа руки прямыми при движении из стороны в сторону.",
        "et": "Pööra keha kõhulihaste jõul, hoides käed sirgena kaablit küljelt küljele liigutades.",
        "uk": "Обертайте тулуб за рахунок преса, тримаючи руки прямими при русі з боку в бік."
    },
    "Crunch en V": {
        "en": "Raise your torso and straight legs simultaneously forming a V. Squeeze core hard at the top.",
        "ru": "Одновременно поднимите туловище и прямые ноги, образуя V. Сильно напрягите пресс вверху.",
        "et": "Tõsta torso ja sirged jalad korraga, moodustades V-kuju. Pinguta tugevalt kõhulihaseid.",
        "uk": "Одночасно підніміть тулуб і прямі ноги, утворюючи V. Сильно напружте прес вгорі."
    },
    "Press militar sentado con barra (tradicional) (básico de hombro)": {
        "en": "Lower bar to chin or upper chest. Press straight up, pushing your head under the bar at the end.",
        "ru": "Опустите штангу к подбородку. Жмите вверх, выводя голову под штангу в конце.",
        "et": "Lase kang lõua või rinna ülaosani. Lükka otse üles, viies pea liigutuse lõpus kangi alla.",
        "uk": "Опустіть штангу до підборіддя. Тисніть вгору, виводячи голову під штангу в кінці."
    },
    "Remo con barra en multipower (espalda tracciones horizontales)": {
        "en": "Torso bent almost parallel to the floor. Pull the bar to the lower abdomen with elbows tucked.",
        "ru": "Туловище почти параллельно полу. Тяните штангу к низу живота, прижав локти.",
        "et": "Keha painutatud peaaegu paralleelselt põrandaga. Tõmba kang alakõhuni, hoides küünarnukid keha lähedal.",
        "uk": "Тулуб майже паралельно підлозі. Тягніть штангу до низу живота, притиснувши лікті."
    },
    "Jalón al pecho sentado con barra agarre neutro abierto en polea alta (espalda tracciones verticales)": {
        "en": "Chest up, retract scapulae and pull bar to clavicle. Don't swing excessively.",
        "ru": "Грудь вперед, сведите лопатки и тяните к ключице. Не раскачивайтесь.",
        "et": "Rind ette, tõmba abaluud kokku ja kang rangluuni. Ära kiigu liigselt.",
        "uk": "Груди вперед, зведіть лопатки і тягніть до ключиці. Не розгойдуйтесь."
    },
    "Press banca con mancuernas (pectoral plano y estabilizadores)": {
        "en": "Feet planted, natural lumbar arch. Lower dumbbells to the sides of your chest and bring together above.",
        "ru": "Ноги на полу, естественный прогиб. Опустите гантели к бокам груди и сведите вверху.",
        "et": "Jalad maas, loomulik alaselja kumerus. Lase hantlid rinna kõrvale ja too ülal kokku.",
        "uk": "Ноги на підлозі, природний прогин. Опустіть гантелі до боків грудей і зведіть вгорі."
    },
    "Pájaros sentado con cable en polea media (hombro posterior)": {
        "en": "Cross cables in front of you. Open arms wide keeping elbows slightly below shoulders.",
        "ru": "Скрестите тросы перед собой. Разводите руки в стороны, локти чуть ниже уровня плеч.",
        "et": "Rista kaablid enda ees. Ava käed külgedele, hoides küünarnukid veidi õlgadest madalamal.",
        "uk": "Схрестіть троси перед собою. Розводьте руки в сторони, лікті трохи нижче рівня плечей."
    },
    "Press banca inclinado con mancuernas (Pectoral y estabilizadores)": {
        "en": "Incline at 30 degrees. Lower deep to stretch the pec, and press at a right angle to the ceiling.",
        "ru": "Наклон 30 градусов. Опускайте глубоко для растяжки и жмите прямо в потолок.",
        "et": "Kalle 30 kraadi. Lase sügavale rinnalihase venitamiseks ja lükka otse lae poole.",
        "uk": "Нахил 30 градусів. Опускайте глибоко для розтяжки і тисніть прямо в стелю."
    },
    "Press militar sentado en multipower (Básico multiarticular de hombro)": {
        "en": "Bench at 80-90 degrees. Lower bar to eye/chin level and press without snapping elbows.",
        "ru": "Скамья 80-90 градусов. Опускайте штангу до уровня глаз/подбородка и жмите плавно.",
        "et": "Pink 80-90 kraadi. Lase kang silmade/lõua tasemele ja lükka ilma küünarnukke paugutamata.",
        "uk": "Лава 80-90 градусів. Опускайте штангу до рівня очей/підборіддя і тисніть плавно."
    },
    "Aperturas con cable en polea alta": {
        "en": "Lean torso slightly forward. Close the cables in front of your lower abs, contracting chest maximally.",
        "ru": "Слегка наклонитесь вперед. Сводите тросы перед низом живота, максимально сокращая грудь.",
        "et": "Kalluta veidi ette. Too kaablid alakõhu ees kokku, pingutades rinda maksimaalselt.",
        "uk": "Злегка нахиліться вперед. Зводьте троси перед низом живота, максимально скорочуючи груди."
    },
    "Elevaciones laterales tumbado con cable en polea baja": {
        "en": "Lie sideways on a bench. Raise the arm to vertical; this angle eliminates dead spots.",
        "ru": "Лягте боком на скамью. Поднимайте руку вертикально, чтобы исключить мертвые зоны.",
        "et": "Lama pingil külili. Tõsta käsi vertikaalselt, see nurk eemaldab surnud punktid.",
        "uk": "Ляжте боком на лаву. Піднімайте руку вертикально, щоб виключити мертві зони."
    },
    "Extensión de tríceps con cuerda en polea alta": {
        "en": "Keep elbows pinned to your sides. Spread the rope apart at the bottom for peak contraction.",
        "ru": "Локти прижаты к бокам. Разведите концы каната в нижней точке для пикового сокращения.",
        "et": "Hoia küünarnukid külgedel. Tõmba köis allosas laiali maksimaalseks pingutuseks.",
        "uk": "Лікті притиснуті до боків. Розведіть кінці каната в нижній точці для пікового скорочення."
    },
    "Extensión de tríceps por encima de la cabeza con barra en polea alta": {
        "en": "Face away from pulley. Flex and extend elbows above your head focusing on the long head.",
        "ru": "Встаньте спиной к блоку. Сгибайте и разгибайте руки над головой.",
        "et": "Seisa seljaga ploki poole. Kõverda ja siruta küünarnukke pea kohal.",
        "uk": "Встаньте спиною до блоку. Згинайте і розгинайте руки над головою."
    },
    "Rueda abdominal": {
        "en": "Keep pelvis tucked (no lumbar curve). Extend as far as you can control, return using abs.",
        "ru": "Держите таз подкрученным. Раскатывайтесь под контролем, возвращайтесь за счет пресса.",
        "et": "Hoia vaagen all (ilma alaselja nõguseta). Rulli nii kaugele kui suudad, tagasi tulles kasuta kõhulihaseid.",
        "uk": "Тримайте таз підкрученим. Розкочуйтеся під контролем, повертайтеся за рахунок преса."
    },
    "Peso muerto (tradicional) (básico multiarticular)": {
        "en": "Bar over mid-foot. Chest up, push the floor away with legs and extend hips simultaneously.",
        "ru": "Штанга над серединой стопы. Грудь вверх, толкайте пол ногами и выпрямляйте таз.",
        "et": "Kang jala keskosa kohal. Rind üleval, lükka jalgu põrandast eemale ja siruta puusad korraga.",
        "uk": "Штанга над серединою стопи. Груди вгору, штовхайте підлогу ногами і випрямляйте таз."
    },
    "Remo a 1 brazo con barra (espalda unilateral, tracciones horizontales)": {
        "en": "Use a Landmine setup. Pull the loaded end toward your hip with elbow close to body.",
        "ru": "Т-тяга. Тяните нагруженный конец к бедру, локоть близко к телу.",
        "et": "Kasuta T-kangi seadistust. Tõmba raskusega otsa puusa poole, küünarnukk keha lähedal.",
        "uk": "Т-тяга. Тягніть навантажений кінець до стегна, лікоть близько до тіла."
    },
    "Jalón al pecho sentado con agarre neutro cerrado en polea alta (espalda, tracciones verticales)": {
        "en": "Pull the grip to your upper chest. Emphasize the lat stretch on the eccentric phase.",
        "ru": "Тяните рукоятку к верху груди. Подчеркивайте растяжение широчайших при подъеме.",
        "et": "Tõmba käepide rinna ülaosani. Rõhuta seljalihaste venitust tagasiliikumisel.",
        "uk": "Тягніть рукоятку до верху грудей. Підкреслюйте розтягнення найширших при підйомі."
    },
    "Curl con barra EZ agarre inverso": {
        "en": "Pronated grip (palms down). Curl the bar up toward your chest to work brachialis and forearms.",
        "ru": "Хват сверху. Поднимайте штангу к груди для работы брахиалиса и предплечий.",
        "et": "Pealthoie (peopesad all). Tõsta kang rinna poole biitsepsi ja käsivarte treenimiseks.",
        "uk": "Хват зверху. Піднімайте штангу до грудей для роботи брахіалісу і передпліч."
    },
    "Curl martillo con mancuernas": {
        "en": "Neutral grip (palms facing). Curl toward your shoulder squeezing hard. Avoid body swing.",
        "ru": "Нейтральный хват. Сгибайте к плечу, сильно напрягая. Избегайте раскачки.",
        "et": "Neutraalne hoie. Kõverda õla poole, tugevalt pingutades. Väldi keha kiikumist.",
        "uk": "Нейтральний хват. Згинайте до плеча, сильно напружуючи. Уникайте розгойдування."
    },
    "Facepull con cuerda en polea alta (Hombro posterior)": {
        "en": "Pull rope toward your eyes/forehead, separating hands and externally rotating shoulders.",
        "ru": "Тяните канат к уровню глаз/лба, разводя руки в стороны и вращая плечи наружу.",
        "et": "Tõmba köit silmade/otsaesise poole, eraldades käed ja pöörates õlgu väljapoole.",
        "uk": "Тягніть канат до рівня очей/лоба, розводячи руки в сторони і обертаючи плечі назовні."
    },
    "Sentadilla en multipower": {
        "en": "Place feet slightly forward. Squat keeping chest up and back neutral until breaking parallel.",
        "ru": "Ноги слегка вперед. Приседайте с прямой спиной и высокой грудью ниже параллели.",
        "et": "Aseta jalad veidi ettepoole. Kükita hoides rind üleval ja selg neutraalne alla paralleeli.",
        "uk": "Ноги злегка вперед. Присідайте з прямою спиною і високими грудьми нижче паралелі."
    },
    "Sentadilla búlgara con mancuerna (énfasis en glúteo)": {
        "en": "Lean torso slightly forward. Drop deep, feeling the glute of the front leg working.",
        "ru": "Слегка наклоните туловище вперед. Опускайтесь глубоко, чувствуя работу ягодицы передней ноги.",
        "et": "Kalluta torso veidi ette. Lasku sügavale, tunnetades esimese jala tuharalihase tööd.",
        "uk": "Злегка нахиліть тулуб вперед. Опускайтеся глибоко, відчуваючи роботу сідниці передньої ноги."
    },
    "Peso muerto rumano con barra (tradicional) (cadena posterior)": {
        "en": "Push hips back as you descend. Keep the bar gliding along your legs with a firm back.",
        "ru": "Отводите таз назад при спуске. Штанга скользит по ногам, спина прямая.",
        "et": "Lükka puusad taha laskumisel. Hoia kang mööda jalgu libisemas sirge seljaga.",
        "uk": "Відводьте таз назад при спуску. Штанга ковзає по ногах, спина пряма."
    },
    "Curl femoral a 1 pierna de pie en máquina": {
        "en": "Align knee with the axis. Flex by bringing heel to glute and control the way down.",
        "ru": "Колено по оси тренажера. Сгибайте ногу, подтягивая пятку к ягодице, и плавно опускайте.",
        "et": "Joonda põlv teljega. Kõverda viies kand tuharani ja kontrolli tagasiteed.",
        "uk": "Коліно по осі тренажера. Згинайте ногу, підтягуючи п'яту до сідниці, і плавно опускайте."
    },
    "Press banca inclinado en multipower (básico multiarticular de pectoral)": {
        "en": "Align bar with your clavicle. Press powerfully and control the descent.",
        "ru": "Штанга на уровне ключиц. Мощно жмите и контролируйте опускание.",
        "et": "Joonda kang rangluuga. Lükka tugevalt ja kontrolli laskumist.",
        "uk": "Штанга на рівні ключиць. Потужно тисніть і контролюйте опускання."
    },
    "Jalón al pecho sentado con barra agarre prono medio en polea alta (espalda, tracciones verticales)": {
        "en": "Palms facing forward. Pull to chest depressing and retracting scapulae. Don't pull behind neck.",
        "ru": "Хват сверху. Тяните к груди, сводя лопатки. Не тяните за голову.",
        "et": "Peopesad ette. Tõmba rinnale, viies abaluud kokku ja alla. Ära tõmba kukla taha.",
        "uk": "Хват зверху. Тягніть до грудей, зводячи лопатки. Не тягніть за голову."
    },
    "Remo al pecho agarre supino (espalda, tracciones horizontales)": {
        "en": "Palms facing up. Pull the bar to your navel to target the lower lats.",
        "ru": "Хват снизу. Тяните штангу к пупку для работы нижних широчайших.",
        "et": "Althoie. Tõmba kang naba poole alumiste seljalihaste treenimiseks.",
        "uk": "Хват знизу. Тягніть штангу до пупка для роботи нижніх найширших."
    },
    "Elevaciones laterales con cable en polea baja (deltoides medio)": {
        "en": "Run cable behind or in front of you. Raise laterally to shoulder height without shrugging.",
        "ru": "Трос спереди или сзади. Поднимайте в сторону до уровня плеча без участия трапеции.",
        "et": "Kaabel ees või taga. Tõsta külgmiselt õla kõrgusele ilma õlgu kehitamata.",
        "uk": "Трос спереду або ззаду. Піднімайте в сторону до рівня плеча без участі трапеції."
    },
    "Pájaros con cable en polea baja (deltoides posterior)": {
        "en": "Cross cables at the bottom. Raise arms diagonally backward for rear delts.",
        "ru": "Скрестите тросы внизу. Поднимайте руки по диагонали назад для задней дельты.",
        "et": "Rista kaablid allosas. Tõsta käed diagonaalselt taha tagumise õlalihase jaoks.",
        "uk": "Схрестіть троси внизу. Піднімайте руки по діагоналі назад для задньої дельти."
    },
    "Curl con barra EZ en polea baja": {
        "en": "Keep elbows glued to your sides. Curl the bar toward your shoulders.",
        "ru": "Локти прижаты к бокам. Сгибайте руки, поднимая штангу к плечам.",
        "et": "Hoia küünarnukid külgedel. Kõverda kang õlgade poole.",
        "uk": "Лікті притиснуті до боків. Згинайте руки, піднімаючи штангу до плечей."
    },
    "Extensión de tríceps con barra en polea alta": {
        "en": "Pronated grip. Lock elbows at your sides and push the bar down to full extension.",
        "ru": "Хват сверху. Зафиксируйте локти и жмите штангу вниз до полного выпрямления.",
        "et": "Pealthoie. Lukusta küünarnukid külgedele ja lükka kang lõpuni alla.",
        "uk": "Хват зверху. Зафіксуйте лікті і тисніть штангу вниз до повного випрямлення."
    },
    "Hip thrust (tradicional) (básico de glúteo)": {
        "en": "Upper back on bench. Extend hips driving through heels and squeeze glutes for a second at top.",
        "ru": "Лопатки на скамье. Выталкивайте таз пятками и зажмите ягодицы на секунду вверху.",
        "et": "Ülaselg pingil. Siruta puusad lükates läbi kandade ja pinguta tuharaid ülaosas.",
        "uk": "Лопатки на лаві. Виштовхуйте таз п'ятами і затисніть сідниці на секунду вгорі."
    },
    "Pull through en polea baja (glúteo mayor)": {
        "en": "Face away from pulley, rope between legs. Hinge hips back and drive forward to standing.",
        "ru": "Спиной к блоку, канат между ног. Отводите таз назад и возвращайтесь в стойку.",
        "et": "Seljaga ploki poole, köis jalgade vahel. Vii puusad taha ja tule tagasi püsti.",
        "uk": "Спиною до блоку, канат між ніг. Відводьте таз назад і повертайтеся в стійку."
    },
    "Prensa de piernas (tradicional) (básico de pierna)": {
        "en": "Feet shoulder-width. Drop deep without letting your lower back round off the seat, press with whole foot.",
        "ru": "Ноги на ширине плеч. Опускайте глубоко, не отрывая таз от спинки, жмите всей стопой.",
        "et": "Jalad õlgade laiuselt. Lase sügavale, hoides alaselg vastu tuge, lükka kogu jalaga.",
        "uk": "Ноги на ширині плечей. Опускайте глибоко, не відриваючи таз від спинки, тисніть всією стопою."
    },
    "Extensión de cuádriceps a 1 pierna sentado en máquina": {
        "en": "Isolate the quad unilaterally. Contract maximally at the top and control the lowering.",
        "ru": "Изолируйте квадрицепс одной ноги. Максимально сокращайте вверху и контролируйте спуск.",
        "et": "Isoleeri reielihas ühe jalaga. Pinguta maksimaalselt ülaosas ja kontrolli langetamist.",
        "uk": "Ізолюйте квадрицепс однієї ноги. Максимально скорочуйте вгорі і контролюйте спуск."
    },
    "Plancha lateral (estática, tradicional)": {
        "en": "Rest on forearm. Keep body in a straight line from head to heels, squeezing the core.",
        "ru": "Опора на предплечье. Тело в прямую линию, пресс напряжен.",
        "et": "Toeta käsivarrele. Hoia keha sirge joonena peast kandadeni, pingutades kõhtu.",
        "uk": "Опора на передпліччя. Тіло в пряму лінію, прес напружений."
    },
    "Plancha (tradicional)": {
        "en": "Forearms and toes on floor. Posterior pelvic tilt to engage core. Don't let hips sag.",
        "ru": "Опора на предплечья и носки. Подкрутите таз. Не давайте бедрам провисать.",
        "et": "Käsivarred ja varbad maas. Vaagen all, et aktiveerida kõhulihased. Ära lase puusadel vajuda.",
        "uk": "Опора на передпліччя і носки. Підкрутіть таз. Не давайте стегнам провисати."
    },
    "Press banca con barra (tradicional)": {
        "en": "Set shoulders, use leg drive. Lower the bar to the sternum and press up.",
        "ru": "Сведите лопатки, используйте упор ногами. Опустите штангу на грудину и выжмите.",
        "et": "Fikseeri õlad, kasuta jalgade tõuget. Lase kang rinnakule ja lükka üles.",
        "uk": "Зведіть лопатки, використовуйте упор ногами. Опустіть штангу на грудину і вичавте."
    },
    "Apertura sentado en máquina": {
        "en": "Maintain a slight elbow bend. Keep chest up and bring arms together in front, squeezing hard.",
        "ru": "Слегка согните локти. Грудь вперед, сводите руки перед собой, сильно сжимая.",
        "et": "Hoia väike küünarnuki paine. Rind üleval, too käed ette kokku, tugevalt pingutades.",
        "uk": "Злегка зігніть лікті. Груди вперед, зводьте руки перед собою, сильно стискаючи."
    },
    "Pájaros sentado en máquina": {
        "en": "Adjust machine for rear delts. Open arms backward without shrugging the traps.",
        "ru": "Настройте тренажер на задние дельты. Разводите руки назад, не поднимая плечи.",
        "et": "Seadista masin tagumisele õlale. Ava käed taha, vältides trapetsi pingutamist.",
        "uk": "Налаштуйте тренажер на задні дельти. Розводьте руки назад, не піднімаючи плечі."
    },
    "Curl de bíceps alterno con mancuerna": {
        "en": "Supinate (turn wrist up) as you curl the dumbbell for peak bicep contraction.",
        "ru": "Супинируйте (поворачивайте кисть вверх) при подъеме для пикового сокращения бицепса.",
        "et": "Supineeri (pööra rannet üles) hantlit tõstes maksimaalse biitsepsi kontraktsiooni jaoks.",
        "uk": "Супінуйте (повертайте кисть вгору) при підйомі для пікового скорочення біцепса."
    },
    "Crunch abdominal de rodillas con cuerda en polea alta": {
        "en": "Curl into a ball bringing forehead to knees using only abs. Don't pull with arms.",
        "ru": "Скручивайтесь в комок, приближая лоб к коленям только за счет пресса.",
        "et": "Tõmbu kera, viies otsaesise põlvedeni, kasutades ainult kõhulihaseid. Ära tõmba kätega.",
        "uk": "Скручуйтеся в грудку, наближаючи лоб до колін тільки за рахунок преса."
    },
    "Pullover con barra en polea alta": {
        "en": "Arms mostly straight. Pull the bar to your hips, focusing on lat stretch and contraction.",
        "ru": "Руки почти прямые. Тяните штангу к бедрам, концентрируясь на широчайших.",
        "et": "Käed peaaegu sirged. Tõmba kang puusadele, keskendudes selja venitamisele ja pingutamisele.",
        "uk": "Руки майже прямі. Тягніть штангу до стегон, концентруючись на найширших."
    },
    "Press banca declinado con mancuernas": {
        "en": "Use decline bench. Touch slightly the sides of your lower chest and press straight up.",
        "ru": "Наклонная скамья вниз. Касайтесь низа груди и жмите прямо вверх.",
        "et": "Kasuta allakalde pinki. Puuduta kergelt alumise rinna külgi ja lükka otse üles.",
        "uk": "Похила лава вниз. Торкайтеся низу грудей і тисніть прямо вгору."
    },
    "Elevaciones laterales sentado con mancuernas": {
        "en": "Sit to avoid momentum. Raise dumbbells out to the sides leaning torso slightly forward.",
        "ru": "Сядьте, чтобы исключить рывки. Поднимайте гантели в стороны с легким наклоном вперед.",
        "et": "Istu, et vältida hoogu. Tõsta hantlid külgedele, kallutades keha veidi ette.",
        "uk": "Сядьте, щоб виключити ривки. Піднімайте гантелі в сторони з легким нахилом вперед."
    },
    "Curl de bíceps en banco scott con barra EZ": {
        "en": "Armpits snug on pad. Lower under control (not to full lockout) and curl up.",
        "ru": "Подмышки плотно прижаты к подушке. Опускайте плавно (не до конца) и поднимайте.",
        "et": "Kaenlaalused tihedalt vastu patja. Lase alla kontrollitult (mitte lõpuni sirgu) ja tõsta üles.",
        "uk": "Пахви щільно притиснуті до подушки. Опускайте плавно (не до кінця) і піднімайте."
    },
    "Patada de glúteo a 1 pierna con cable en polea baja": {
        "en": "Attach ankle strap. Kick straight back squeezing the glute without arching your lower back.",
        "ru": "Манжета на щиколотке. Отведите ногу назад, напрягая ягодицу, без прогиба в пояснице.",
        "et": "Kinnita hüppeliigese rihm. Löö otse taha, pingutades tuharat ilma alaselga nõgusaks laskmata.",
        "uk": "Манжета на щиколотці. Відведіть ногу назад, напружуючи сідницю, без прогину в попереку."
    },
    "Prensa de piernas (pies abajo)": {
        "en": "Place feet low on platform to put maximum emphasis on the quads as knees flex.",
        "ru": "Ставьте ноги низко на платформе для максимального акцента на квадрицепсы.",
        "et": "Aseta jalad platvormil alla, et panna maksimaalne rõhk reielihastele põlve paindumisel.",
        "uk": "Ставте ноги низько на платформі для максимального акценту на квадрицепси."
    },
    "Peso muerto rumano a 1 pierna con mancuernas": {
        "en": "Balance by lifting one straight leg backward. Feel the stretch in the planted leg's hamstring.",
        "ru": "Балансируйте, отводя прямую ногу назад. Чувствуйте бицепс бедра опорной ноги.",
        "et": "Tasakaalusta tõstes ühe sirge jala taha. Tunneta venitust maas oleva jala reie tagaosas.",
        "uk": "Балансуйте, відводячи пряму ногу назад. Відчувайте біцепс стегна опорної ноги."
    },
    "Push press (tradicional)": {
        "en": "Initiate with a slight leg dip and drive the bar explosively overhead.",
        "ru": "Начните с легкого подседа и мощно вытолкните штангу над головой.",
        "et": "Alusta kerge põlvepainutusega ja lükka kang plahvatuslikult pea kohale.",
        "uk": "Почніть з легкого підсідання і потужно виштовхніть штангу над головою."
    },
    "Six ways con mancuernas": {
        "en": "Lateral raise, bring to front, raise up, lower to front, open laterally, and down. Strict control.",
        "ru": "В сторону, вперед, вверх, вперед, в сторону, вниз. Строгий контроль.",
        "et": "Külgmine tõste, too ette, tõsta üles, lase ette, ava küljele ja lase alla. Range kontroll.",
        "uk": "В сторону, вперед, вгору, вперед, в сторону, вниз. Суворий контроль."
    },
    "Curl martillo con cuerda en polea baja": {
        "en": "Neutral grip. Keep elbows tight to obliques and spread the rope slightly at the top.",
        "ru": "Нейтральный хват. Локти прижаты к бокам, слегка разводите концы каната вверху.",
        "et": "Neutraalne hoie. Hoia küünarnukid kere vastas ja tõmba köis ülaosas veidi laiali.",
        "uk": "Нейтральний хват. Лікті притиснуті до боків, злегка розводьте кінці каната вгорі."
    },
    "Extensión de tríceps por encima de la cabeza con cuerda en polea alta": {
        "en": "Face away from pulley. Extend arms forward and up, isolating the tricep long head.",
        "ru": "Спиной к блоку. Выпрямляйте руки вперед и вверх, изолируя длинную головку трицепса.",
        "et": "Seljaga ploki poole. Siruta käed ette ja üles, isoleerides triitsepsi pika pea.",
        "uk": "Спиною до блоку. Випрямляйте руки вперед і вгору, ізолюючи довгу головку трицепса."
    },
    "Curl de bíceps con mancuerna": {
        "en": "Curl both or alternating. Keep elbows from drifting forward.",
        "ru": "Поднимайте обе гантели вместе или поочередно. Не выводите локти вперед.",
        "et": "Kõverda mõlemat või vaheldumisi. Hoia küünarnukke ette liikumast.",
        "uk": "Піднімайте обидві гантелі разом або по черзі. Не виводьте лікті вперед."
    },
    "Peso muerto rumano en multipower": {
        "en": "Use the machine guide to focus purely on pushing hips back and stretching hamstrings.",
        "ru": "Используйте тренажер, чтобы сосредоточиться только на отведении таза и растяжке.",
        "et": "Kasuta masina tuge, et keskenduda ainult puusade taha lükkamisele ja reie tagaosa venitamisele.",
        "uk": "Використовуйте тренажер, щоб зосередитися тільки на відведенні таза і розтяжці."
    },
    "Hollowman": {
        "en": "Lie flat, raise scapulae and legs. Squeeze core hard keeping lumbar curve glued to the floor.",
        "ru": "Лягте ровно, поднимите лопатки и ноги. Сильно напрягите пресс, поясница прижата к полу.",
        "et": "Lama sirgelt, tõsta abaluud ja jalad. Pinguta tugevalt kõhtu, hoides alaselg põranda vastas.",
        "uk": "Ляжте рівно, підніміть лопатки і ноги. Сильно напружте прес, поперек притиснутий до підлоги."
    },
    "Remo en banco inclinado con mancuernas": {
        "en": "Chest supported on a 30-45 deg bench. Pull dumbbells to your hip, squeezing shoulder blades together.",
        "ru": "Грудь на скамье 30-45 град. Тяните гантели к бедру, сводя лопатки вместе.",
        "et": "Rind toetatud 30-45 kraadisel pingil. Tõmba hantlid puusa poole, viies abaluud kokku.",
        "uk": "Груди на лаві 30-45 град. Тягніть гантелі до стегна, зводячи лопатки разом."
    },
    "Hip thrust a 1 pierna en máquina": {
        "en": "Place a single foot. Drive the load pushing your hip hard upward without losing stability.",
        "ru": "Опора на одну ногу. Мощно выталкивайте вес тазом вверх, не теряя баланс.",
        "et": "Aseta üks jalg. Lükka raskust puusaga tugevalt üles, kaotamata stabiilsust.",
        "uk": "Опора на одну ногу. Потужно виштовхуйте вагу тазом вгору, не втрачаючи баланс."
    },
    "Crunch abdominal en banco declinado con giro": {
        "en": "As you rise, twist your torso bringing the elbow to the opposite knee to engage obliques.",
        "ru": "При подъеме скручивайте туловище, направляя локоть к противоположному колену.",
        "et": "Üles tõustes pööra keha, viies küünarnukk vastas põlve suunas, et kaasata kaldlihased.",
        "uk": "При підйомі скручуйте тулуб, направляючи лікоть до протилежного коліна."
    },
    "Remo a 1 brazo con mancuerna": {
        "en": "Hand and knee supported on a bench. Pull the dumbbell back toward your pants pocket.",
        "ru": "Рука и колено на скамье. Тяните гантель назад, к карману штанов.",
        "et": "Käsi ja põlv pingile toetatud. Tõmba hantel tagasi püksitasku suunas.",
        "uk": "Рука і коліно на лаві. Тягніть гантель назад, до кишені штанів."
    }
};

function getTrExDesc(originalName, currentDesc) {
    if (!originalName || !currentDesc) return currentDesc;
    const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'es';
    if (lang === 'es') return currentDesc;
    
    // Fallback normalization logic
    const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
    const target = normalize(originalName);
    
    for (const [k, v] of Object.entries(exerciseDescTranslations)) {
        if (normalize(k) === target) {
            if (v[lang]) return v[lang];
            return currentDesc; // fallback to spanish if missing
        }
    }
    
    return currentDesc; // Fallback to whatever user edited
}
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


// --- HEAL GROUPS (Recuperar grupos perdidos) ---
if (typeof defaultGroups !== 'undefined') {
    defaultGroups.forEach(g => {
        if (!state.groups.includes(g)) state.groups.push(g);
    });
}
state.exercises.forEach(ex => {
    if (ex.group && !state.groups.includes(ex.group)) {
        state.groups.push(ex.group);
    }
});
saveState();
// ---------------------------------------------
// Reconcile missing default exercises and images
if (typeof defaultExercises !== 'undefined') {
    defaultExercises.forEach(defEx => {
        let existing = state.exercises.find(ex => ex.id === defEx.id);
        if (!existing) {
            state.exercises.push(defEx);
        } else {
            if (defEx.imageData && (!existing.imageData || existing.imageData === '')) {
                existing.imageData = defEx.imageData;
            }
            if (defEx.description && !existing.description) {
                existing.description = defEx.description;
            }
        }
    });
}

saveState(); // Save after reconciliation
  
  // Deduplicate exercises (in case of old cache issues or ID mismatches)
const uniqueEx = [];
const seenNames = new Set();
state.exercises.forEach(ex => {
    // Normalize name to catch encoding differences (e.g. básico vs bǭsico)
    const normName = ex.name.toLowerCase().replace(/[^a-z]/g, '');
    let existingIdx = uniqueEx.findIndex(e => e.id === ex.id || e.name.toLowerCase().replace(/[^a-z]/g, '') === normName);
    
    if (existingIdx === -1) {
        uniqueEx.push(ex);
    } else {
        // Keep the one with an image if there's a conflict, but preserve the old object (which might have PRs)
        if (ex.imageData && !uniqueEx[existingIdx].imageData) {
            uniqueEx[existingIdx].imageData = ex.imageData;
        }
    }
});
state.exercises = uniqueEx;
window.state = state;
saveState();

// UI State
let openExerciseAccordions = [];

// Utils
// Notificación de entrenamiento activo
window.manageWorkoutNotification = async (show) => {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
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
                                title: (function(){ const t = typeof getT === 'function' ? getT('workout.activeNotificationTitle') : ''; return (t && t !== 'workout.activeNotificationTitle') ? t : 'Entrenamiento en curso'; })(),
                                body: (function(){ const b = typeof getT === 'function' ? getT('workout.activeNotificationBody') : ''; return (b && b !== 'workout.activeNotificationBody') ? b : 'Tienes un entrenamiento activo. Pulsa para continuar.'; })(),
                                id: 1,
                                ongoing: true,
                                autoCancel: false,
                                channelId: 'workout_active'
                            }
                        ]
                    });
                }
            } else {
                // Cancel scheduled notification
                try {
                    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
                } catch (e) {}
                try {
                    if (typeof LocalNotifications.cancelAll === 'function') {
                        await LocalNotifications.cancelAll();
                    }
                } catch (e) {}

                // Remove already delivered notification from Android notification tray/status bar
                try {
                    await LocalNotifications.removeDeliveredNotifications({ notifications: [{ id: 1 }] });
                } catch (e) {}
                try {
                    if (typeof LocalNotifications.removeAllDeliveredNotifications === 'function') {
                        await LocalNotifications.removeAllDeliveredNotifications();
                    }
                } catch (e) {}
            }
        } catch (e) {
            console.error("Notification Error:", e);
        }
    }
};

function saveState() {
    localStorage.setItem('gym_exercises', JSON.stringify(state.exercises));
    localStorage.setItem('gym_sessions', JSON.stringify(state.sessions));
    localStorage.setItem('gym_completed', JSON.stringify(state.completedWorkouts));
    localStorage.setItem('gym_groups', JSON.stringify(state.groups));
    localStorage.setItem('gym_active_workout', JSON.stringify(state.activeWorkoutState));
    localStorage.setItem('gym_evolution', JSON.stringify(state.evolution));
};

const formatDate = (date) => {
    if (!date) return '';
    if (typeof date === 'string' && date.includes('/')) return date;
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

const dateToInputFormat = (date) => {
    if (!date) return new Date().toISOString().split('T')[0];
    if (typeof date === 'string' && date.includes('/')) {
        const parts = date.split('/');
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = parts[1].padStart(2, '0');
            const year = parts[2];
            return `${year}-${month}-${day}`;
        }
    }
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const inputToDate = (inputStr) => {
    if (!inputStr) return new Date();
    if (typeof inputStr === 'string' && inputStr.includes('-')) {
        const parts = inputStr.split('-');
        if (parts.length === 3) {
            return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        }
    }
    return new Date(inputStr);
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
if (headerAction) {
    headerAction.addEventListener('click', () => {
        const activeNav = document.querySelector('.nav-item.active');
        const activeTarget = activeNav ? activeNav.getAttribute('data-target') : 'view-calendar';
        if (activeTarget === 'view-calendar') {
            openModal(modalEventType);
        } else if (activeTarget === 'view-exercises') {
            openNewExerciseModal();
        }
    });
}


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

// Calendar top create session button
const btnCreateSessionCalendar = document.getElementById('btn-create-session-calendar');
if (btnCreateSessionCalendar) {
    btnCreateSessionCalendar.addEventListener('click', () => {
        openModal(modalEventType);
    });
}


// --- MOBILE DRAWER NAVIGATION LOGIC ---
function openMobileDrawer() {
    const wrapper = document.getElementById('main-nav-wrapper') || document.querySelector('.nav-wrapper');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (wrapper) wrapper.classList.add('drawer-open');
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('drawer-is-open');
}

function closeMobileDrawer() {
    const wrapper = document.getElementById('main-nav-wrapper') || document.querySelector('.nav-wrapper');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (wrapper) wrapper.classList.remove('drawer-open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('drawer-is-open');
}

window.openMobileDrawer = openMobileDrawer;
window.closeMobileDrawer = closeMobileDrawer;

document.getElementById('btn-mobile-menu')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openMobileDrawer();
});

document.getElementById('btn-close-mobile-drawer')?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMobileDrawer();
});

document.getElementById('mobile-drawer-backdrop')?.addEventListener('click', () => {
    closeMobileDrawer();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileDrawer();
    }
});

// Update drawer version badge
function updateDrawerVersionDisplay() {
    const vEl = document.getElementById('mobile-drawer-version');
    if (vEl && typeof CURRENT_APP_VERSION !== 'undefined') {
        vEl.textContent = `Gym Tracker v${CURRENT_APP_VERSION}`;
    }
}

// Navigation Logic
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Auto-close mobile drawer when a tab is selected
        if (typeof closeMobileDrawer === 'function') {
            closeMobileDrawer();
        }
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
            const vw = document.getElementById('view-workout');
            if (vw) vw.classList.remove('active');
            updateWorkoutBanner();
        }
        
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        views.forEach(view => {
            if(!view.classList.contains('overlay-view')) {
                view.classList.remove('active');
            }
        });
        
        const activeTargetView = document.getElementById(target);
        if (activeTargetView) {
            activeTargetView.classList.add('active');
        }
        
        headerAction.classList.add('hidden');
        
        if (typeof updateAiButtonsVisibility === 'function') {
            updateAiButtonsVisibility();
        } else {
            const aiBtn = document.getElementById('btn-ai-settings');
            const aiClear = document.getElementById('btn-ai-clear');
            const isAi = target === 'view-ai' && localStorage.getItem('gemini_api_key');
            if(aiBtn) aiBtn.style.display = isAi ? 'flex' : 'none';
            if(aiClear) aiClear.style.display = isAi ? 'flex' : 'none';
        }
        
        if (target === 'view-calendar') {
            headerTitle.textContent = getT('header.calendar') || 'Calendario';
            if (typeof renderCalendar === 'function') renderCalendar();
        } else if (target === 'view-history') {
            headerTitle.textContent = getT('header.history') || getT('nav.history') || 'Historial';
            if (typeof renderGlobalHistory === 'function') renderGlobalHistory();
        } else if (target === 'view-evolution') {
            headerTitle.textContent = getT('header.evolution') || getT('nav.evolution') || 'Evolución';
            if (typeof renderEvolutionHistory === 'function') renderEvolutionHistory();
            if (typeof renderEvolutionView === 'function') renderEvolutionView();
        } else if (target === 'view-activity') {
            headerTitle.textContent = getT('header.activity') || getT('nav.activity') || 'Actividad';
            if (typeof renderActivityView === 'function') renderActivityView();
        } else if (target === 'view-progression') {
            headerTitle.textContent = getT('header.progression') || getT('nav.progression') || 'Progresión';
            if (typeof renderProgressionView === 'function') renderProgressionView();
        } else if (target === 'view-exercises') {
            headerTitle.textContent = getT('header.exercises') || getT('nav.exercises') || 'Ejercicios';
            if (typeof renderExercises === 'function') renderExercises();
        } else if (target === 'view-export') {
            headerTitle.textContent = getT('header.export') || getT('nav.export') || 'Exp / Imp';
            if (typeof renderExportList === 'function') renderExportList();
        } else if (target === 'view-ai') {
            headerTitle.textContent = getT('header.ai') || getT('nav.ai') || 'Asistente IA';
            if (typeof initAi === 'function') initAi();
        } else {
            const cleanId = target.replace('view-', '');
            headerTitle.textContent = getT('header.' + cleanId) || getT('nav.' + cleanId) || cleanId;
        }
    });
});

// Modal Logic
window.openModal = (modal) => { if (modal) modal.classList.add('active'); };
window.closeModal = (modal) => { if (modal) modal.classList.remove('active'); };
const openModal = window.openModal;
const closeModal = window.closeModal;
closeBtns.forEach(btn => btn.addEventListener('click', (e) => closeModal(e.target.closest('.modal'))));

// Event Type Selection
window.selectEventType = (type) => {
    closeModal(modalEventType);
    editingSessionId = null;
    
    // Reset builder state
    if (typeof routineItems !== 'undefined') {
        routineItems = [];
        supersetCounter = 1;
        if(document.getElementById('routine-selected-exercises-list')) {
            document.getElementById('routine-selected-exercises-list').innerHTML = '';
        }
    }
    
    const rName = document.getElementById('routine-name');
    if (rName) rName.value = '';
    
    const rDate = document.getElementById('routine-date');
    if (rDate) rDate.value = dateToInputFormat(state.selectedDate);
    
    const saveBtn = document.getElementById('btn-save-routine');
    if (saveBtn) saveBtn.textContent = getT('modals.routine.schedule') || 'Programar';
    
    if(type === 'routine') {
        document.getElementById('modal-routine-title').textContent = getT('modals.routine.title') || 'Añadir Bloque (4 sem)';
        document.getElementById('routine-duration').value = '4';
        openModal(modalAddRoutine);
    } else if (type === 'workout') {
        document.getElementById('modal-routine-title').textContent = getT('modals.routine.workoutTitle') || getT('modals.add.workout') || 'Entrenamiento Suelto';
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
        "story": {
          "title": "Tarjeta para Historias",
          "createStoryBtn": "Compartir Historia (Instagram / WhatsApp)",
          "shareBtn": "Compartir",
          "downloadBtn": "Descargar Imagen",
          "storyWorkout": "Entrenamiento",
          "duration": "Tiempo",
          "volume": "Volumen",
          "sets": "Series",
          "prs": "Nuevos Récords",
          "highlights": "DESTACADOS DE LA SESIÓN",
          "watermark": "Gym Tracker • Superando límites cada día"
},
        "achievements": {
          "title": "Muro de Logros y Trofeos",
          "globalProgress": "{count} / {total} Desbloqueados ({pct}%)",
          "toastUnlocked": "¡Logro Desbloqueado!",
            "resetBtn": "Restablecer logros",
            "resetHint": "Protegido con 3 ventanas de confirmación para evitar borrados accidentales.",
            "resetBtn": "Restablecer logros",
            "resetHint": "Protegido con 3 ventanas de confirmación para evitar borrados accidentales.",
          "unlockedOn": "Desbloqueado el",
          "locked": "Bloqueado"
},
        "volume": {
          "title": "Series Semanales Óptimas",
          "desc": "Series efectivas realizadas esta semana vs rango hipertrófico óptimo (10 a 20 series semanales).",
          "currentWeek": "Semana Actual",
          "optimal": "Óptimo",
          "low": "Bajo estímulo",
          "high": "Volumen alto"
},
        "anatomy": {
          "title": "Mapa de Fatiga Muscular",
          "desc": "Estado de fatiga y recuperación estimado según los entrenamientos completados en los últimos 7 días.",
          "statusLegend": "Nivel de Fatiga:",
          "fatigued": "Fatigado (<24h)",
          "recovering": "Recuperando (24-60h)",
          "ready": "Listo (>60h)",
          "tapPrompt": "Toca cualquier músculo en la silueta para ver su estado de recuperación y volumen de series.",
          "statusReady": "Listo para entrenar con alta intensidad",
          "statusRecov": "En fase de recuperación activa (estímulo moderado)",
          "statusFatigued": "Fatigado recientemente. Recomendado descansar o entrenar otro grupo",
          "noData": "Sin registros en los últimos 7 días. Músculo completamente recuperado."
},
        "update": {
            "title": "¡Nueva versión disponible!",
            "desc": "Novedades y mejoras de esta actualización:",
            "currentTitle": "Novedades de la versión",
            "upToDateDesc": "Tu aplicación está actualizada a la última versión.",
            "download": "Descargar actualización",
            "reload": "Actualizar aplicación",
            "later": "Quizás más tarde",
            "understood": "Entendido",
            "checkBtn": "Comprobar actualización",
            "checking": "Comprobando...",
            "viewNews": "Ver novedades",
            "versionLabel": "Versión",
            "upToDateAlert": "✅ Tu aplicación está al día.\n\nVersión instalada: v{vInstalled}\nVersión en GitHub: v{vGitHub}\n\nNo hay nuevas actualizaciones.",
            "errorConnect": "No se pudo conectar con GitHub para comprobar la versión. Comprueba tu conexión a internet.",
            "errorGeneric": "Error al comprobar actualizaciones: ",
            "defaultChangelog": "Mejoras de rendimiento y correcciones de errores."
        },
        "ai": {
            "title": "Asistente IA",
            "inputPlaceholder": "Escribe tu mensaje...",
            "replyingTo": "Respondiendo a: ",
            "you": "Tú",
            "assistant": "Asistente IA",
            "clearChat": "Vaciar conversación",
            "confirmClear": "¿Quieres vaciar toda la conversación con el asistente?",
            "clearSuccess": "Conversación vaciada",
            "copySuccess": "Mensaje copiado al portapapeles",
            "deleteKey": "Eliminar Clave API",
            "confirmDeleteKey": "¿Seguro que quieres eliminar tu Clave API guardada?",
            "keyDeleted": "Clave API eliminada",
            "saveKey": "Guardar y Empezar",
            "invalidKey": "Introduce una API Key válida",
            "keySaved": "API Key guardada correctamente"
        },
        "setTypes": {
            "warmup": "Calentamiento",
            "approach": "Aproximación",
            "effective": "Efectiva",
            "failure": "Al fallo",
            "dropset": "Dropset",
            "dropsetFailure": "Dropset fallo"
        },
        "nav": {
            "menu": "Menú",
            "ai": "Asistente IA",
            "calendar": "Calendario",
            "exercises": "Ejercicios",
            "history": "Historial",
            "workout": "En curso",
            "progression": "Progresión",
            "evolution": "Evolución",
            "export": "Exp / Imp",
            "tutorial": "Guía y Tutorial"
        },
        "header": {
            "ai": "Asistente IA",
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
            "createSession": "Crear sesión",
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
            "activeNotificationTitle": "Тренування триває",
            "activeNotificationBody": "У вас активне тренування. Натисніть, щоб продовжити.",
            "reopenExercise": "Відновити вправу",
            "reopenSuperset": "Відновити суперсет",
            "activeNotificationTitle": "Treening pooleli",
            "activeNotificationBody": "Sul on aktiivne treening. Puuduta jätkamiseks.",
            "reopenExercise": "Taasava harjutus",
            "reopenSuperset": "Taasava supersett",
            "activeNotificationTitle": "Тренировка идет",
            "activeNotificationBody": "У вас активная тренировка. Нажмите, чтобы продолжить.",
            "reopenExercise": "Возобновить упражнение",
            "reopenSuperset": "Возобновить суперсет",
            "activeNotificationTitle": "Entrenamiento en curso",
            "activeNotificationBody": "Tienes un entrenamiento activo. Pulsa para continuar.",
            "reopenExercise": "Reabrir Ejercicio",
            "reopenSuperset": "Reabrir Superserie",
            "type": "Tipo",
            "reps": "Reps",
            "kg": "Kg",
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
            "githubRepo": "Repositorio GitHub",
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
            "workoutFinished": "¡Entrenamiento Finalizado! Duración: ",
            "dropsetEnterWeight": "Introduce primero el peso de la serie para calcular el Dropset."
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
                "workoutTitle": "Entrenamiento Suelto",
                "editTitle": "Editar Sesión",
                "date": "Fecha de la Sesión",
                "saveChanges": "Guardar Cambios",
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
        },
        "blocks": {
            "hypertrophyTitle": "Bloque de Hipertrofia",
            "hypertrophyDesc": "Enfoque en volumen y esfuerzo moderado-alto (RPE 7-9 / RIR 1-3). Prioriza la técnica estricta y el control excéntrico en todo el rango de movimiento.",
            "heavyTitle": "Bloque de Pesados / Fuerza",
            "heavyDesc": "Enfoque en cargas elevadas y series de bajas repeticiones con descansos completos para maximizar la fuerza y adaptación neuromuscular.",
            "intensityTitle": "Bloque de Alta Intensidad",
            "intensityDesc": "Enfoque en llevar las series al fallo muscular, técnicas de extensión como Dropsets (-20% a -40%) y pausas de descanso breves.",
            "goalTitle": "Sesión Objetivo",
            "goalDesc": "Concéntrate en la progresión de cargas y esfuerzo objetivo según lo planificado."
        },
        "plateCalc": {
            "title": "Calculadora de Discos",
            "barWeight": "Peso de la barra:",
            "targetWeight": "Peso objetivo (kg):",
            "perSide": "Discos a cada lado:",
            "totalLoaded": "Total cargado:",
            "balanced": "Distribución 100% simétrica",
            "weightTooLow": "El peso debe ser mayor al de la barra ({bar}kg)",
            "btnApply": "Aplicar a la serie",
            "close": "Cerrar",
            "barOlympic": "20 kg (Olímpica)",
            "barMultipower": "15 kg (Multipower)",
            "barEZ": "10 kg (EZ)"
        },
        "replaceEx": {
            "title": "Sustituir Ejercicio",
            "subtitle": "Elige una alternativa para {group}:",
            "search": "Buscar alternativa...",
            "confirm": "¿Sustituir '{oldEx}' por '{newEx}' conservando las series?",
            "btnReplace": "Sustituir"
        },
        "pr": {
            "newRecord": "¡RÉCORD!",
            "weightRecord": "Récord de peso",
            "est1rmRecord": "Récord 1RM est."
        },
        "summary": {
            "title": "¡Entrenamiento Completado!",
            "subtitle": "¡Gran trabajo superando tus límites hoy!",
            "time": "Tiempo Total",
            "volume": "Volumen Total",
            "sets": "Series Hechas",
            "prsTitle": "🏆 Récords Personales Rotos Hoy",
            "noPrs": "¡Buen entreno! Constancia en cada repetición.",
            "exList": "Resumen de Ejercicios",
            "btnShare": "Copiar Resumen",
            "copied": "¡Resumen copiado al portapapeles!",
            "btnClose": "Finalizar y Guardar"
        },
        "compare": {
            "title": "Comparador de Fotos",
            "btnOpen": "Comparar Fotos Antes / Después",
            "before": "Antes (Fecha inicial)",
            "after": "Después (Fecha reciente)",
            "angle": "Ángulo:",
            "front": "Frontal",
            "side": "Lateral",
            "back": "Espalda",
            "modeSideBySide": "Lado a Lado",
            "modeSlider": "Deslizador",
            "noPhotos": "Se necesitan al menos 2 registros con fotos para comparar.",
            "weightDiff": "Diferencia:"
        }
    },
    "en": {
        "story": {
          "title": "Story Card",
          "createStoryBtn": "Share Story (Instagram / WhatsApp)",
          "shareBtn": "Share",
          "downloadBtn": "Download Image",
          "storyWorkout": "Workout",
          "duration": "Duration",
          "volume": "Volume",
          "sets": "Sets",
          "prs": "New Records",
          "highlights": "SESSION HIGHLIGHTS",
          "watermark": "Gym Tracker • Pushing limits every day"
},
        "achievements": {
          "title": "Achievements & Trophies Wall",
          "globalProgress": "{count} / {total} Unlocked ({pct}%)",
          "toastUnlocked": "Achievement Unlocked!",
            "resetBtn": "Reset achievements",
            "resetHint": "Protected by 3 confirmation dialogs to prevent accidental resets.",
            "resetBtn": "Reset achievements",
            "resetHint": "Protected by 3 confirmation dialogs to prevent accidental resets.",
          "unlockedOn": "Unlocked on",
          "locked": "Locked"
},
        "volume": {
          "title": "Optimal Weekly Sets",
          "desc": "Working sets completed this week vs hypertrophy target range (10-20 weekly sets).",
          "currentWeek": "Current Week",
          "optimal": "Optimal",
          "low": "Low volume",
          "high": "High volume"
},
        "anatomy": {
          "title": "Muscle Fatigue Map",
          "desc": "Estimated fatigue and recovery status based on completed workouts in the last 7 days.",
          "statusLegend": "Fatigue Level:",
          "fatigued": "Fatigued (<24h)",
          "recovering": "Recovering (24-60h)",
          "ready": "Ready (>60h)",
          "tapPrompt": "Tap any muscle in the silhouette to see recovery status and set volume.",
          "statusReady": "Ready to train with high intensity",
          "statusRecov": "In active recovery phase",
          "statusFatigued": "Recently fatigued. Rest or train another group",
          "noData": "No sessions in the last 7 days. Fully recovered."
},
        "update": {
            "title": "New Version Available!",
            "desc": "What's new and improved in this update:",
            "currentTitle": "Version Highlights",
            "upToDateDesc": "Your app is up to date with the latest version.",
            "download": "Download Update",
            "reload": "Update App",
            "later": "Maybe Later",
            "understood": "Got it",
            "checkBtn": "Check for updates",
            "checking": "Checking...",
            "viewNews": "View what's new",
            "versionLabel": "Version",
            "upToDateAlert": "✅ Your app is up to date.\n\nInstalled version: v{vInstalled}\nGitHub version: v{vGitHub}\n\nNo new updates available.",
            "errorConnect": "Could not connect to GitHub to check for updates. Please check your internet connection.",
            "errorGeneric": "Error checking for updates: ",
            "defaultChangelog": "Performance improvements and bug fixes."
        },
        "ai": {
            "title": "AI Assistant",
            "inputPlaceholder": "Type your message...",
            "replyingTo": "Replying to: ",
            "you": "You",
            "assistant": "AI Assistant",
            "clearChat": "Clear conversation",
            "confirmClear": "Are you sure you want to clear the conversation?",
            "clearSuccess": "Conversation cleared",
            "copySuccess": "Message copied to clipboard",
            "deleteKey": "Delete API Key",
            "confirmDeleteKey": "Are you sure you want to delete your saved API Key?",
            "keyDeleted": "API Key deleted",
            "saveKey": "Save and Start",
            "invalidKey": "Please enter a valid API Key",
            "keySaved": "API Key saved successfully"
        },
        "setTypes": {
            "warmup": "Warm-up",
            "approach": "Approach",
            "effective": "Effective",
            "failure": "Failure",
            "dropset": "Dropset",
            "dropsetFailure": "Dropset failure"
        },
        "nav": {
            "menu": "Menu",
            "ai": "AI Assistant",
            "calendar": "Calendar",
            "exercises": "Exercises",
            "history": "History",
            "workout": "Workout",
            "progression": "Progression",
            "evolution": "Evolution",
            "export": "Exp / Imp",
            "tutorial": "Guía y Tutorial"
        },
        "header": {
            "ai": "AI Assistant",
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
            "activeNotificationTitle": "Workout in progress",
            "activeNotificationBody": "You have an active workout. Tap to resume.",
            "reopenExercise": "Reopen Exercise",
            "reopenSuperset": "Reopen Superset",
            "type": "Type",
            "reps": "Reps",
            "kg": "Kg",
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
            "githubRepo": "GitHub Repository",
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
            "workoutFinished": "Workout Finished! Duration: ",
            "dropsetEnterWeight": "Enter the set weight first to calculate the Dropset."
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
                "workoutTitle": "Single Workout",
                "editTitle": "Edit Session",
                "date": "Session Date",
                "saveChanges": "Save Changes",
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
        },
        "blocks": {
            "hypertrophyTitle": "Hypertrophy Block",
            "hypertrophyDesc": "Focus on volume and moderate-high effort (RPE 7-9 / RIR 1-3). Prioritize strict technique and eccentric control across the full range of motion.",
            "heavyTitle": "Heavy / Strength Block",
            "heavyDesc": "Focus on heavy loads and low-rep sets with full rest to maximize strength and neuromuscular adaptation.",
            "intensityTitle": "High Intensity Block",
            "intensityDesc": "Focus on taking sets to muscular failure, intensity techniques like Dropsets (-20% to -40%), and short rest pauses.",
            "goalTitle": "Target Session",
            "goalDesc": "Focus on load progression and target effort as planned."
        },
        "plateCalc": {
            "title": "Plate Calculator",
            "barWeight": "Bar weight:",
            "targetWeight": "Target weight (kg):",
            "perSide": "Plates on each side:",
            "totalLoaded": "Total loaded:",
            "balanced": "100% symmetric & balanced",
            "weightTooLow": "Weight must be greater than bar ({bar}kg)",
            "btnApply": "Apply to set",
            "close": "Close",
            "barOlympic": "20 kg (Olympic)",
            "barMultipower": "15 kg (Multipower)",
            "barEZ": "10 kg (EZ)"
        },
        "replaceEx": {
            "title": "Substitute Exercise",
            "subtitle": "Choose an alternative for {group}:",
            "search": "Search alternative...",
            "confirm": "Substitute '{oldEx}' with '{newEx}' keeping the sets?",
            "btnReplace": "Substitute"
        },
        "pr": {
            "newRecord": "PR!",
            "weightRecord": "Weight PR",
            "est1rmRecord": "Est. 1RM PR"
        },
        "summary": {
            "title": "Workout Completed!",
            "subtitle": "Great job pushing your limits today!",
            "time": "Total Time",
            "volume": "Total Volume",
            "sets": "Completed Sets",
            "prsTitle": "🏆 Personal Records Broken Today",
            "noPrs": "Great session! Consistency is key.",
            "exList": "Exercise Summary",
            "btnShare": "Copy Summary",
            "copied": "Summary copied to clipboard!",
            "btnClose": "Done & Save"
        },
        "compare": {
            "title": "Photo Comparator",
            "btnOpen": "Compare Before / After Photos",
            "before": "Before (Initial date)",
            "after": "After (Recent date)",
            "angle": "Angle:",
            "front": "Front",
            "side": "Side",
            "back": "Back",
            "modeSideBySide": "Side by Side",
            "modeSlider": "Slider",
            "noPhotos": "At least 2 records with photos are needed to compare.",
            "weightDiff": "Difference:"
        }
    },
    "ru": {
        "story": {
          "title": "Карточка для Историй",
          "createStoryBtn": "Поделиться в Истории (Instagram / WhatsApp)",
          "shareBtn": "Поделиться",
          "downloadBtn": "Скачать",
          "storyWorkout": "Тренировка",
          "duration": "Время",
          "volume": "Объем",
          "sets": "Подходы",
          "prs": "Новые рекорды",
          "highlights": "ГЛАВНОЕ ЗА ТРЕНИРОВКУ",
          "watermark": "Gym Tracker • Преодолевая границы каждый день"
},
        "achievements": {
          "title": "Стена достижений и трофеев",
          "globalProgress": "{count} / {total} Разблокировано ({pct}%)",
          "toastUnlocked": "Достижение разблокировано!",
            "resetBtn": "Сбросить достижения",
            "resetHint": "Защищено 3 окнами подтверждения для предотвращения случайного сброса.",
            "resetBtn": "Сбросить достижения",
            "resetHint": "Защищено 3 окнами подтверждения для предотвращения случайного сброса.",
          "unlockedOn": "Получено",
          "locked": "Заблокировано"
},
        "volume": {
          "title": "Оптимальные подходы за неделю",
          "desc": "Рабочие подходы за текущую неделю по сравнению с целевым диапазоном.",
          "currentWeek": "Текущая неделя",
          "optimal": "Оптимально",
          "low": "Мало подходов",
          "high": "Высокий объем"
},
        "anatomy": {
          "title": "Карта мышечной усталости",
          "desc": "Оценка восстановления по тренировкам за последние 7 дней.",
          "statusLegend": "Уровень усталости:",
          "fatigued": "Усталость (<24ч)",
          "recovering": "Восстановление (24-60ч)",
          "ready": "Готов (>60ч)",
          "tapPrompt": "Нажмите на мышцу для просмотра статуса и объема.",
          "statusReady": "Готов к интенсивной тренировке",
          "statusRecov": "В процессе восстановления",
          "statusFatigued": "Недавно тренирован. Рекомендуется отдых",
          "noData": "Нет тренировок за 7 дней. Полностью восстановлен."
},
        "update": {
            "title": "Доступна новая версия!",
            "desc": "Что нового и улучшено в этом обновлении:",
            "currentTitle": "Что нового в этой версии",
            "upToDateDesc": "Ваше приложение обновлено до последней версии.",
            "download": "Скачать обновление",
            "reload": "Обновить приложение",
            "later": "Позже",
            "understood": "Понятно",
            "checkBtn": "Проверить обновления",
            "checking": "Проверка...",
            "viewNews": "Что нового",
            "versionLabel": "Версия",
            "upToDateAlert": "✅ Ваше приложение обновлено.\n\nУстановленная версия: v{vInstalled}\nВерсия на GitHub: v{vGitHub}\n\nНовых обновлений нет.",
            "errorConnect": "Не удалось подключиться к GitHub для проверки обновлений. Проверьте подключение к интернету.",
            "errorGeneric": "Ошибка при проверке обновлений: ",
            "defaultChangelog": "Улучшения производительности и исправления ошибок."
        },
        "ai": {
            "title": "ИИ Ассистент",
            "inputPlaceholder": "Введите сообщение...",
            "replyingTo": "В ответ: ",
            "you": "Вы",
            "assistant": "ИИ Ассистент",
            "clearChat": "Очистить чат",
            "confirmClear": "Вы уверены, что хотите очистить весь чат?",
            "clearSuccess": "Чат очищен",
            "copySuccess": "Сообщение скопировано в буфер",
            "deleteKey": "Удалить API ключ",
            "confirmDeleteKey": "Вы уверены, что хотите удалить сохраненный API ключ?",
            "keyDeleted": "API ключ удален",
            "saveKey": "Сохранить и начать",
            "invalidKey": "Введите действительный API ключ",
            "keySaved": "API ключ успешно сохранен"
        },
        "setTypes": {
            "warmup": "Разминка",
            "approach": "Подводящий",
            "effective": "Рабочий",
            "failure": "До отказа",
            "dropset": "Дропсет",
            "dropsetFailure": "Дропсет отказ"
        },
        "nav": {
            "menu": "Меню",
            "ai": "ИИ Ассистент",
            "calendar": "Календарь",
            "exercises": "Упражнения",
            "history": "История",
            "workout": "Тренировка",
            "progression": "Прогресс",
            "evolution": "Эволюция",
            "export": "Эксп / Имп"
        },
        "header": {
            "ai": "ИИ Ассистент",
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
            "type": "Тип",
            "reps": "Повт.",
            "kg": "Кг",
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
            "githubRepo": "Репозиторий GitHub",
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
            "workoutFinished": "Тренировка завершена! Время: ",
            "dropsetEnterWeight": "Сначала введите вес подхода для расчета дропсета."
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
        },
        "blocks": {
            "hypertrophyTitle": "Блок гипертрофии",
            "hypertrophyDesc": "Фокус на объеме и умеренно-высоком усилии (RPE 7-9 / RIR 1-3). Приоритет строгой технике и контролю эксцентрики во всем диапазоне движения.",
            "heavyTitle": "Силовой / Тяжелый блок",
            "heavyDesc": "Фокус на больших весах и низком числе повторений с полным отдыхом для максимальной силы и нейромышечной адаптации.",
            "intensityTitle": "Блок высокой интенсивности",
            "intensityDesc": "Фокус на подходах до мышечного отказа, дропсетах (-20% до -40%) и коротких паузах отдыха.",
            "goalTitle": "Целевая тренировка",
            "goalDesc": "Сосредоточьтесь на прогрессии нагрузок и целевом усилии согласно плану."
        },
        "plateCalc": {
            "title": "Калькулятор блинов",
            "barWeight": "Вес грифа:",
            "targetWeight": "Целевой вес (кг):",
            "perSide": "Блины на каждую сторону:",
            "totalLoaded": "Итого на штанге:",
            "balanced": "100% симметрично и сбалансировано",
            "weightTooLow": "Вес должен быть больше грифа ({bar}кг)",
            "btnApply": "Применить к подходу",
            "close": "Закрыть",
            "barOlympic": "20 кг (Олимпийский)",
            "barMultipower": "15 кг (Мультипауэр)",
            "barEZ": "10 кг (EZ)"
        },
        "replaceEx": {
            "title": "Заменить упражнение",
            "subtitle": "Выберите альтернативу для {group}:",
            "search": "Поиск замены...",
            "confirm": "Заменить '{oldEx}' на '{newEx}' с сохранением подходов?",
            "btnReplace": "Заменить"
        },
        "pr": {
            "newRecord": "РЕКОРД!",
            "weightRecord": "Рекорд веса",
            "est1rmRecord": "Рекорд расч. 1ПМ"
        },
        "summary": {
            "title": "Тренировка завершена!",
            "subtitle": "Отличная работа на пределе сил!",
            "time": "Общее время",
            "volume": "Общий объем",
            "sets": "Подходов",
            "prsTitle": "🏆 Новые личные рекорды сегодня",
            "noPrs": "Отличная тренировка! Главное регулярность.",
            "exList": "Обзор упражнений",
            "btnShare": "Скопировать итог",
            "copied": "Итог скопирован в буфер обмена!",
            "btnClose": "Готово и сохранить"
        },
        "compare": {
            "title": "Сравнение фото",
            "btnOpen": "Сравнить фото До / После",
            "before": "До (Начальная дата)",
            "after": "После (Недавняя дата)",
            "angle": "Ракурс:",
            "front": "Спереди",
            "side": "Сбоку",
            "back": "Сзади",
            "modeSideBySide": "Рядом",
            "modeSlider": "Слайдер",
            "noPhotos": "Для сравнения нужно минимум 2 записи с фото.",
            "weightDiff": "Разница:"
        }
    },
    "et": {
        "story": {
          "title": "Story kaart",
          "createStoryBtn": "Jaga Storys (Instagram / WhatsApp)",
          "shareBtn": "Jaga",
          "downloadBtn": "Laadi alla",
          "storyWorkout": "Treening",
          "duration": "Aeg",
          "volume": "Maht",
          "sets": "Seeriad",
          "prs": "Uued rekordid",
          "highlights": "TREENINGU TIPP-HETKED",
          "watermark": "Gym Tracker • Ületades piire iga päev"
},
        "achievements": {
          "title": "Saavutuste sein",
          "globalProgress": "{count} / {total} Avatud ({pct}%)",
          "toastUnlocked": "Saavutus avatud!",
            "resetBtn": "Lähtesta saavutused",
            "resetHint": "Kaitstud 3 kinnitusaknaga juhusliku lähtestamise vältimiseks.",
            "resetBtn": "Lähtesta saavutused",
            "resetHint": "Kaitstud 3 kinnitusaknaga juhusliku lähtestamise vältimiseks.",
          "unlockedOn": "Avatud",
          "locked": "Lukus"
},
        "volume": {
          "title": "Nädala optimaalsed seeriad",
          "desc": "Sel nädalal tehtud seeriad võrreldes hüpertroofia sihttasemega.",
          "currentWeek": "Käesolev nädal",
          "optimal": "Optimaalne",
          "low": "Madal maht",
          "high": "Kõrge maht"
},
        "anatomy": {
          "title": "Lihaste väsimuse kaart",
          "desc": "Viimase 7 päeva treeningute põhjal hinnatud taastumise tase.",
          "statusLegend": "Väsimuse tase:",
          "fatigued": "Väsinud (<24h)",
          "recovering": "Taastumas (24-60h)",
          "ready": "Valmis (>60h)",
          "tapPrompt": "Puuduta lihast taastumise ja seeriate nägemiseks.",
          "statusReady": "Valmis treeninguks",
          "statusRecov": "Aktiivses taastumises",
          "statusFatigued": "Hiljuti treenitud. Puhka",
          "noData": "Pole viimase 7 päeva jooksul treenitud."
},
        "update": {
            "title": "Uus versioon on saadaval!",
            "desc": "Selle uuenduse uudised ja täiustused:",
            "currentTitle": "Selle versiooni uuendused",
            "upToDateDesc": "Teie rakendus on uuendatud viimasele versioonile.",
            "download": "Laadi alla uuendus",
            "reload": "Uuenda rakendust",
            "later": "Võib-olla hiljem",
            "understood": "Sain aru",
            "checkBtn": "Kontrolli uuendusi",
            "checking": "Kontrollimine...",
            "viewNews": "Vaata uuendusi",
            "versionLabel": "Versioon",
            "upToDateAlert": "✅ Teie rakendus on ajakohane.\n\nPaigaldatud versioon: v{vInstalled}\nGitHubi versioon: v{vGitHub}\n\nUusi uuendusi pole.",
            "errorConnect": "GitHubiga ei õnnestunud ühendust luua uuenduste kontrollimiseks. Palun kontrollige internetiühendust.",
            "errorGeneric": "Viga uuenduste kontrollimisel: ",
            "defaultChangelog": "Jõudluse parandused ja veaparandused."
        },
        "ai": {
            "title": "AI Assistent",
            "inputPlaceholder": "Kirjuta oma sõnum...",
            "replyingTo": "Vastus: ",
            "you": "Sina",
            "assistant": "AI Assistent",
            "clearChat": "Tühjenda vestlus",
            "confirmClear": "Kas oled kindel, et soovid kogu vestluse kustutada?",
            "clearSuccess": "Vestlus tühjendatud",
            "copySuccess": "Sõnum kopeeritud lõikelauale",
            "deleteKey": "Kustuta API võti",
            "confirmDeleteKey": "Kas oled kindel, et soovid salvestatud API võtme kustutada?",
            "keyDeleted": "API võti kustutatud",
            "saveKey": "Salvesta ja alusta",
            "invalidKey": "Palun sisesta kehtiv API võti",
            "keySaved": "API võti edukalt salvestatud"
        },
        "setTypes": {
            "warmup": "Soojendus",
            "approach": "Lähenemine",
            "effective": "Efektiivne",
            "failure": "Suutlikkuseni",
            "dropset": "Dropset",
            "dropsetFailure": "Dropset suutlikkuseni"
        },
        "nav": {
            "ai": "AI Assistent",
            "calendar": "Kalender",
            "exercises": "Harjutused",
            "history": "Ajalugu",
            "workout": "Treening",
            "progression": "Progress",
            "evolution": "Evolutsioon",
            "export": "Eksp / Imp"
        },
        "header": {
            "ai": "AI Assistent",
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
            "type": "Tüüp",
            "reps": "Kord.",
            "kg": "Kg",
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
            "githubRepo": "GitHubi repositoorium",
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
            "workoutFinished": "Treening lõpetatud! Aeg: ",
            "dropsetEnterWeight": "Sisesta esmalt seeria raskus dropseti arvutamiseks."
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
        },
        "blocks": {
            "hypertrophyTitle": "Hüpertroofia plokk",
            "hypertrophyDesc": "Fookus mahul ja mõõdukalt kõrgel pingutusel (RPE 7-9 / RIR 1-3). Eelista ranget tehnikat ja ekstsentrilist kontrolli kogu liikumisulatuse vältel.",
            "heavyTitle": "Raske / Jõuplokk",
            "heavyDesc": "Fookus suurtel raskustel ja madalatel kordustel koos täieliku puhkusega, et maksimeerida jõudu ja neuromuskulaarset kohanemist.",
            "intensityTitle": "Kõrge intensiivsuse plokk",
            "intensityDesc": "Fookus seeriate lihase ammendumiseni viimisel, tehnikatel nagu Dropset (-20% kuni -40%) ja lühikestel puhkepausidel.",
            "goalTitle": "Eesmärgipärane treening",
            "goalDesc": "Keskendu raskuste progressioonile ja planeeritud sihtpingutusele."
        },
        "plateCalc": {
            "title": "Kettakalkulaator",
            "barWeight": "Kangi kaal:",
            "targetWeight": "Sihtkaal (kg):",
            "perSide": "Kettad kummalegi poolele:",
            "totalLoaded": "Kokku kangil:",
            "balanced": "100% sümmeetriline ja tasakaalus",
            "weightTooLow": "Kaal peab olema suurem kui kangi kaal ({bar}kg)",
            "btnApply": "Rakenda seeriale",
            "close": "Sulge",
            "barOlympic": "20 kg (Olümpia)",
            "barMultipower": "15 kg (Multipower)",
            "barEZ": "10 kg (EZ)"
        },
        "replaceEx": {
            "title": "Asenda harjutus",
            "subtitle": "Vali alternatiiv rühmale {group}:",
            "search": "Otsi alternatiivi...",
            "confirm": "Kas asendada '{oldEx}' harjutusega '{newEx}', säilitades seeriad?",
            "btnReplace": "Asenda"
        },
        "pr": {
            "newRecord": "REKORD!",
            "weightRecord": "Kaalu rekord",
            "est1rmRecord": "Hinnangulise 1KM rekord"
        },
        "summary": {
            "title": "Treening lõpetatud!",
            "subtitle": "Suurepärane töö oma piiride ületamisel!",
            "time": "Koguaeg",
            "volume": "Kogumaht",
            "sets": "Tehtud seeriad",
            "prsTitle": "🏆 Täna purustatud isiklikud rekordid",
            "noPrs": "Vägev treening! Järjepidevus viib sihile.",
            "exList": "Harjutuste kokkuvõte",
            "btnShare": "Kopeeri kokkuvõte",
            "copied": "Kokkuvõte kopeeritud lõikelauale!",
            "btnClose": "Valmis ja salvesta"
        },
        "compare": {
            "title": "Fotode võrdleja",
            "btnOpen": "Võrdle fotosid Enne / Pärast",
            "before": "Enne (Alguskuupäev)",
            "after": "Pärast (Hiljutine kuupäev)",
            "angle": "Nurk:",
            "front": "Eest",
            "side": "Küljelt",
            "back": "Tagant",
            "modeSideBySide": "Kõrvuti",
            "modeSlider": "Liugur",
            "noPhotos": "Võrdlemiseks on vaja vähemalt 2 fotodega kirjet.",
            "weightDiff": "Erinevus:"
        }
    },
    "uk": {
        "story": {
          "title": "Картка для Історій",
          "createStoryBtn": "Поділитися в Історії (Instagram / WhatsApp)",
          "shareBtn": "Поділитися",
          "downloadBtn": "Завантажити",
          "storyWorkout": "Тренування",
          "duration": "Час",
          "volume": "Об'єм",
          "sets": "Підходи",
          "prs": "Нові рекорди",
          "highlights": "ГОЛОВНЕ ЗА ТРЕНУВАННЯ",
          "watermark": "Gym Tracker • Долаючи межі щодня"
},
        "achievements": {
          "title": "Стіна досягнень та трофеїв",
          "globalProgress": "{count} / {total} Розблоковано ({pct}%)",
          "toastUnlocked": "Досягнення розблоковано!",
            "resetBtn": "Скинути досягнення",
            "resetHint": "Захищено 3 вікнами підтвердження для запобігання випадкового скидання.",
            "resetBtn": "Скинути досягнення",
            "resetHint": "Захищено 3 вікнами підтвердження для запобігання випадкового скидання.",
          "unlockedOn": "Отримано",
          "locked": "Заблоковано"
},
        "volume": {
          "title": "Оптимальні підходи за тиждень",
          "desc": "Робочі підходи за поточний тиждень порівняно з цільовим діапазоном.",
          "currentWeek": "Поточний тиждень",
          "optimal": "Оптимально",
          "low": "Низький об'єм",
          "high": "Високий об'єм"
},
        "anatomy": {
          "title": "Карта м'язової втоми",
          "desc": "Оцінка відновлення за тренуваннями за останні 7 днів.",
          "statusLegend": "Рівень втоми:",
          "fatigued": "Втома (<24г)",
          "recovering": "Відновлення (24-60г)",
          "ready": "Готовий (>60г)",
          "tapPrompt": "Натисніть на м'яз для перегляду статусу та об'єму.",
          "statusReady": "Готовий до тренування",
          "statusRecov": "У процесі відновлення",
          "statusFatigued": "Нещодавно треновано. Відпочиньте",
          "noData": "Немає тренувань за 7 днів. Повністю відновлений."
},
        "update": {
            "title": "Доступна нова версія!",
            "desc": "Що нового та покращено в цьому оновленні:",
            "currentTitle": "Що нового в цій версії",
            "upToDateDesc": "Ваш додаток оновлено до останньої версії.",
            "download": "Завантажити оновлення",
            "reload": "Оновити додаток",
            "later": "Можливо пізніше",
            "understood": "Зрозуміло",
            "checkBtn": "Перевірити оновлення",
            "checking": "Перевірка...",
            "viewNews": "Що нового",
            "versionLabel": "Версія",
            "upToDateAlert": "✅ Ваш додаток оновлено.\n\nВстановлена версія: v{vInstalled}\nВерсія на GitHub: v{vGitHub}\n\nНових оновлень немає.",
            "errorConnect": "Не вдалося з'єднатися з GitHub для перевірки оновлень. Будь ласка, перевірте підключення до інтернету.",
            "errorGeneric": "Помилка перевірки оновлень: ",
            "defaultChangelog": "Покращення продуктивності та виправлення помилок."
        },
        "ai": {
            "title": "ШІ Асистент",
            "inputPlaceholder": "Введіть повідомлення...",
            "replyingTo": "У відповідь: ",
            "you": "Ви",
            "assistant": "ШІ Асистент",
            "clearChat": "Очистити чат",
            "confirmClear": "Ви впевнені, що хочете очистити весь чат?",
            "clearSuccess": "Чат очищено",
            "copySuccess": "Повідомлення скопійовано в буфер",
            "deleteKey": "Видалити API ключ",
            "confirmDeleteKey": "Ви впевнені, що хочете видалити збережений API ключ?",
            "keyDeleted": "API ключ видалено",
            "saveKey": "Зберегти та почати",
            "invalidKey": "Введіть дійсний API ключ",
            "keySaved": "API ключ успішно збережено"
        },
        "setTypes": {
            "warmup": "Розминка",
            "approach": "Підвідний",
            "effective": "Робочий",
            "failure": "До відмови",
            "dropset": "Дропсет",
            "dropsetFailure": "Дропсет відмова"
        },
        "nav": {
            "menu": "Меню",
            "ai": "ШІ Асистент",
            "calendar": "Календар",
            "exercises": "Вправи",
            "history": "Історія",
            "workout": "Тренування",
            "progression": "Прогрес",
            "evolution": "Еволюція",
            "export": "Експ / Імп"
        },
        "header": {
            "ai": "ШІ Асистент",
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
            "type": "Тип",
            "reps": "Повт.",
            "kg": "Кг",
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
            "githubRepo": "Репозиторій GitHub",
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
            "workoutFinished": "Тренування завершено! Час: ",
            "dropsetEnterWeight": "Спочатку введіть вагу підходу для розрахунку дропсету."
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
        },
        "blocks": {
            "hypertrophyTitle": "Блок гіпертрофії",
            "hypertrophyDesc": "Фокус на об'ємі та помірно-високому зусиллі (RPE 7-9 / RIR 1-3). Пріоритет суворої техніки та ексцентричного контролю у всьому діапазоні руху.",
            "heavyTitle": "Силовий / Важкий блок",
            "heavyDesc": "Фокус на великих вагах та низькій кількості повторень з повним відпочинком для максимальної сили та нейром'язової адаптації.",
            "intensityTitle": "Блок високої інтенсивності",
            "intensityDesc": "Фокус на підходах до м'язової відмови, дропсетах (-20% до -40%) та коротких паузах відпочинку.",
            "goalTitle": "Цільове тренування",
            "goalDesc": "Зосередьтеся на прогресії навантажень та цільовому зусиллі згідно з планом."
        },
        "plateCalc": {
            "title": "Калькулятор млинців",
            "barWeight": "Вага грифа:",
            "targetWeight": "Цільова вага (кг):",
            "perSide": "Млинці на кожен бік:",
            "totalLoaded": "Всього на штанзі:",
            "balanced": "100% симетрично та збалансовано",
            "weightTooLow": "Вага має бути більшою за вагу грифа ({bar}кг)",
            "btnApply": "Застосувати до підходу",
            "close": "Закрити",
            "barOlympic": "20 кг (Олімпійський)",
            "barMultipower": "15 кг (Мультипауер)",
            "barEZ": "10 кг (EZ)"
        },
        "replaceEx": {
            "title": "Замінити вправу",
            "subtitle": "Оберіть альтернативу для {group}:",
            "search": "Пошук альтернативи...",
            "confirm": "Замінити '{oldEx}' на '{newEx}' зі збереженням підходів?",
            "btnReplace": "Замінити"
        },
        "pr": {
            "newRecord": "РЕКОРД!",
            "weightRecord": "Рекорд ваги",
            "est1rmRecord": "Рекорд розрах. 1ПМ"
        },
        "summary": {
            "title": "Тренування завершено!",
            "subtitle": "Чудова робота на межі можливостей!",
            "time": "Загальний час",
            "volume": "Загальний об'єм",
            "sets": "Виконано підходів",
            "prsTitle": "🏆 Нові особисті рекорди сьогодні",
            "noPrs": "Чудове тренування! Головне регулярність.",
            "exList": "Огляд вправ",
            "btnShare": "Скопіювати підсумок",
            "copied": "Підсумок скопійовано в буфер обміну!",
            "btnClose": "Готово та зберегти"
        },
        "compare": {
            "title": "Порівняння фото",
            "btnOpen": "Порівняти фото До / Після",
            "before": "До (Початкова дата)",
            "after": "Після (Нещодавня дата)",
            "angle": "Ракурс:",
            "front": "Спереду",
            "side": "Збоку",
            "back": "Ззаду",
            "modeSideBySide": "Поруч",
            "modeSlider": "Слайдер",
            "noPhotos": "Для порівняння потрібно щонайменше 2 записи з фото.",
            "weightDiff": "Різниця:"
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
        
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (key) {
                const text = getT(key);
                if (text && text !== key) {
                    el.setAttribute('title', text);
                }
            }
        });

        // Re-render update modal if active or if latest data exists
        if (typeof window.renderUpdateModalContent === 'function' && (window.latestUpdateData || document.getElementById('modal-update')?.classList.contains('active'))) {
            window.renderUpdateModalContent(window.latestUpdateData);
        }

        // Force header update
        const activeView = document.querySelector('.view.active');
        const headerTitle = document.getElementById('header-title');
        if (activeView && headerTitle) {
            const viewId = activeView?.id || 'view-calendar';
            if(viewId === 'view-workout' && state.activeWorkoutState && state.activeWorkoutState.startTime) {
                headerTitle.textContent = getT('header.workoutActive');
            } else {
                headerTitle.textContent = getT('header.' + viewId.replace('view-', '')) || getT('nav.' + viewId.replace('view-', ''));
            if(typeof updateAiButtonsVisibility === 'function') updateAiButtonsVisibility();
            }
            const headerActionEl = document.getElementById('header-action');
            if (headerActionEl) {
                headerActionEl.classList.add('hidden');
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
            <div class="session-action" style="display:flex; align-items:center; gap:6px;">
                <button class="btn-icon edit-session-btn" title="Editar sesión" style="color:var(--text-secondary); padding:4px;"><i class="ph ph-pencil-simple" style="font-size: 18px;"></i></button>
                <button class="btn-icon delete-session-btn" title="Eliminar sesión" style="color:var(--color-heavy); padding:4px;"><i class="ph ph-trash" style="font-size: 18px;"></i></button>
                <i class="${session.completed ? 'ph-check-circle' : session.type === 'goal' ? 'ph-circle' : 'ph-play-circle'}" style="${session.completed ? 'color: var(--color-intensity); font-size:24px;' : 'font-size:24px;'}"></i>
            </div>
        `;
        
        card.querySelector('.delete-session-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            sessionToDelete = session;
            openModal(modalDeleteSession);
        });
        
        const editBtn = card.querySelector('.edit-session-btn');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
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

// --- RESTORED EXERCISES RENDER & MANAGEMENT ---
window.deleteExercise = function(id, event) {
    if (event) event.stopPropagation();
    if (confirm((typeof getT === 'function' ? getT('common.delete') : '¿Eliminar') + '?')) {
        state.exercises = (state.exercises || []).filter(e => e.id !== id);
        saveState();
        if (typeof recalculatePRs === 'function') recalculatePRs();
        renderExercises();
    }
};

const editExercise = (ex) => {
    if (typeof recalculatePRs === 'function') recalculatePRs();
    const freshEx = (state && state.exercises) ? (state.exercises.find(e => e.id === ex.id) || ex) : ex;
    document.getElementById('exercise-id').value = freshEx.id;
    document.getElementById('exercise-name').value = freshEx.name;
    document.getElementById('exercise-youtube').value = freshEx.youtubeLink || '';
    
    const max1rmEl = document.getElementById('exercise-max1rm');
    if (max1rmEl) max1rmEl.value = freshEx.max1RM || '';
    const prHypEl = document.getElementById('exercise-pr-hyp');
    if (prHypEl) prHypEl.value = freshEx.prHyp || '';
    const prHeavyEl = document.getElementById('exercise-pr-heavy');
    if (prHeavyEl) prHeavyEl.value = freshEx.prHeavy || '';
    
    const select = document.getElementById('exercise-group');
    if (select) {
        select.innerHTML = '';
        (state.groups || []).forEach(g => {
            let gKey = g === 'Abdominales y core' ? 'core' : (g === 'Tríceps' ? 'triceps' : (g === 'Bíceps' ? 'biceps' : g.toLowerCase()));
            let trGroup = typeof getT === 'function' ? getT('groups.' + gKey) : g;
            trGroup = trGroup !== 'groups.' + g.toLowerCase() ? trGroup : g;
            select.innerHTML += `<option value="${g}" ${ex.group === g ? 'selected' : ''}>${trGroup}</option>`;
        });
    }
    
    const imgData = ex.imageData || '';
    document.getElementById('exercise-image-data').value = imgData;
    const descEl = document.getElementById('exercise-description');
    if (descEl) descEl.value = ex.description || '';
    const preview = document.getElementById('exercise-image-preview');
    const removeImgBtn = document.getElementById('btn-remove-exercise-image');
    if (imgData && preview) {
        preview.src = imgData;
        preview.style.display = 'block';
        if (removeImgBtn) removeImgBtn.style.display = 'flex';
    } else if (preview) {
        preview.style.display = 'none';
        if (removeImgBtn) removeImgBtn.style.display = 'none';
    }
    
    const repHyp = document.getElementById('exercise-reps-hypertrophy');
    if (repHyp) repHyp.value = ex.defaults ? ex.defaults.hypertrophy : '10';
    const repHvy = document.getElementById('exercise-reps-heavy');
    if (repHvy) repHvy.value = ex.defaults ? ex.defaults.heavy : '5';
    const repInt = document.getElementById('exercise-reps-intensity');
    if (repInt) repInt.value = ex.defaults ? ex.defaults.intensity : '8';
    
    const delBtn = document.getElementById('btn-delete-exercise');
    if (delBtn) delBtn.style.display = 'block';
    
    const modalTitle = document.getElementById('modal-exercise-title');
    if (modalTitle && typeof getT === 'function') modalTitle.textContent = getT('modals.exercise.editTitle') || 'Editar Ejercicio';
    openModal(modalExercise);
};
window.editExercise = editExercise;

const renderExercises = () => {
    if (typeof recalculatePRs !== 'undefined') recalculatePRs();
    const container = document.querySelector('.exercise-groups-container');
    if (!container) return;
    container.innerHTML = '';
    
    if (!state.exercises || state.exercises.length === 0) {
        container.innerHTML = `<div class="empty-state" data-i18n="exercises.empty">${typeof getT === 'function' ? (getT('exercises.empty') || 'No hay ejercicios. Añade uno nuevo.') : 'No hay ejercicios. Añade uno nuevo.'}</div>`;
        return;
    }
    
    // Group grid
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    grid.style.gap = '8px';
    grid.style.marginBottom = '24px';
    
    (state.groups || []).forEach(g => {
        const card = document.createElement('div');
        let gKey = g === 'Abdominales y core' ? 'core' : (g === 'Tríceps' ? 'triceps' : (g === 'Bíceps' ? 'biceps' : g.toLowerCase()));
        let trGroup = typeof getT === 'function' ? getT('groups.' + gKey) : g;
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
    
    let filteredEx = state.exercises || [];
    const searchInput = document.getElementById('exercise-search');
    const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
    if (searchVal) {
        filteredEx = filteredEx.filter(ex => ex.name.toLowerCase().includes(searchVal) || (typeof getTrExName === 'function' && getTrExName(ex.name).toLowerCase().includes(searchVal)));
    } else if (window.exercisesSelectedGroup) {
        filteredEx = filteredEx.filter(ex => ex.group === window.exercisesSelectedGroup);
    }
    
    filteredEx.sort((a, b) => {
        const nameA = typeof getTrExName === 'function' ? getTrExName(a.name) : a.name;
        const nameB = typeof getTrExName === 'function' ? getTrExName(b.name) : b.name;
        return nameA.localeCompare(nameB);
    });
    
    if (filteredEx.length === 0) {
        exListContainer.innerHTML = `<div class="empty-state">No hay ejercicios para esta selección.</div>`;
    } else {
        filteredEx.forEach(ex => {
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.style.cursor = 'pointer';
            card.onclick = (e) => {
                if(e.target.closest('button')) return;
                if(e.target.closest('img')) return;
                editExercise(ex);
            };
            const trName = typeof getTrExName === 'function' ? getTrExName(ex.name) : ex.name;
            const trDesc = typeof getTrExDesc === 'function' ? getTrExDesc(ex.name, ex.description) : (ex.description || 'Haz clic para editar y añadir técnica.');
            card.innerHTML = `
                <div style="display: flex; flex-direction: row; width: 100%; align-items: stretch;">
                    ${ex.imageData ? `<div style="flex-shrink: 0; margin-right: 16px; display: flex; align-items: center; justify-content: center;"><img src="${ex.imageData}" onclick="event.stopPropagation(); openLightbox('${ex.imageData}')" title="Toca para ampliar" style="width: 140px; height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-color); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'"></div>` : ''}
                    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                            <div class="exercise-info" style="flex: 1; min-width: 0; text-align: center;">
                                <div class="exercise-name" style="font-size: 18px; font-weight: bold; color: var(--text-primary); margin-bottom: 2px;">${trName}</div>
                                <div class="exercise-group" style="font-size: 13px; color: var(--text-secondary);">${ex.group || 'Sin Grupo'}</div>
                                ${(ex.prHeavy || ex.prHyp) ? `
                                <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:6px; margin-top:6px;">
                                    ${ex.prHeavy ? `<span style="background:rgba(220,38,38,0.18); color:#f87171; border:1px solid rgba(220,38,38,0.4); padding:2px 8px; border-radius:6px; font-size:11px; font-weight:700;">🔴 PR Pesado: ${ex.prHeavy}</span>` : ''}
                                    ${ex.prHyp ? `<span style="background:rgba(37,99,235,0.18); color:#60a5fa; border:1px solid rgba(37,99,235,0.4); padding:2px 8px; border-radius:6px; font-size:11px; font-weight:700;">🔵 PR Hipertrofia: ${ex.prHyp}</span>` : ''}
                                </div>` : ''}
                            </div>
                            <div class="exercise-actions" style="margin-left: 12px; flex-shrink: 0;">
                                <button class="btn-icon text-danger" onclick="deleteExercise('${ex.id}', event)"><i class="ph ph-trash"></i></button>
                            </div>
                        </div>
                        <div class="exercise-desc" style="flex: 1; font-size: 13px; color: var(--text-secondary); line-height: 1.5; display: flex; align-items: center; justify-content: center; text-align: center;">
                            ${trDesc}
                        </div>
                    </div>
                </div>
            `;
            exListContainer.appendChild(card);
        });
    }
    container.appendChild(exListContainer);
    if (typeof updateLanguageUI !== 'undefined') updateLanguageUI();
};
window.renderExercises = renderExercises;



function parsePRString(prStr) {
    if (!prStr) return { weight: 0, reps: 0 };
    if (typeof prStr === 'number') return { weight: prStr, reps: 0 };
    const str = String(prStr).trim();
    const match = str.match(/([0-9]+(?:\.[0-9]+)?)\s*(?:kg)?(?:\s*x\s*([0-9]+))?/i);
    if (!match) return { weight: 0, reps: 0 };
    const weight = parseFloat(match[1]) || 0;
    const reps = parseInt(match[2]) || 0;
    return { weight, reps };
}

function syncActiveWorkoutInputsFromDOM() {
    if (!activeSession || !activeSession.exercises) return;
    const workoutContainer = document.getElementById('workout-content');
    if (!workoutContainer) return;
    
    const exSections = workoutContainer.querySelectorAll('.workout-exercise-inner');
    exSections.forEach((section) => {
        const exIdxAttr = section.getAttribute('data-exercise-idx');
        const exIdx = exIdxAttr !== null ? parseInt(exIdxAttr, 10) : -1;
        const ex = (exIdx >= 0 && exIdx < activeSession.exercises.length) ? activeSession.exercises[exIdx] : null;
        if (ex) {
            const commentInput = section.querySelector('.exercise-comments input');
            if (commentInput) {
                ex.comments = commentInput.value;
            }
            if (ex.sets) {
                const setRows = section.querySelectorAll('.set-row:not(.header-row)');
                setRows.forEach((row, sIdx) => {
                    const set = ex.sets[sIdx];
                    if (set) {
                        const wInput = row.querySelector('.weight-input');
                        const wDropInput = row.querySelector('.weight-drop-input');
                        const rInput = row.querySelector('.reps-input');
                        const rDropInput = row.querySelector('.reps-drop-input');
                        const tSelect = row.querySelector('.set-type-select');
                        if (wInput && wInput.value !== '') set.weight = parseFloat(wInput.value) || 0;
                        if (wDropInput && wDropInput.value !== '') set.weightDrop = parseFloat(wDropInput.value) || 0;
                        if (rInput && rInput.value !== '') set.reps = rInput.value;
                        if (rDropInput && rDropInput.value !== '') set.repsDrop = rDropInput.value;
                        if (tSelect && tSelect.value) set.type = tSelect.value;
                    }
                });
            }
        }
    });
}

function recalculatePRs() {
    if (!state || !state.exercises) return;
    
    const allWorkouts = [];
    if (Array.isArray(state.completedWorkouts)) {
        allWorkouts.push(...state.completedWorkouts);
    }
    if (Array.isArray(state.sessions)) {
        state.sessions.filter(s => s.completed).forEach(s => {
            if (!allWorkouts.some(w => w.id === s.id)) {
                allWorkouts.push(s);
            }
        });
    }
    if (typeof activeSession !== 'undefined' && activeSession && activeSession.exercises) {
        allWorkouts.push(activeSession);
    }
    
    state.exercises.forEach(ex => {
        let maxHeavyWeight = 0;
        let maxHeavyReps = 0;
        let maxHypWeight = 0;
        let maxHypReps = 0;
        let maxOverallWeight = 0;
        let maxOverallReps = 0;
        let best1RM = 0;
        
        allWorkouts.forEach(w => {
            const wType = (w.type || 'hypertrophy').toLowerCase();
            const isHeavy = wType === 'heavy' || wType === 'pesado';
            const isHyp = wType === 'hypertrophy' || wType === 'hipertrofia';
            
            (w.exercises || []).forEach(wEx => {
                const matches = (wEx.exerciseId && wEx.exerciseId === ex.id) ||
                                (wEx.name && ex.name && wEx.name.trim().toLowerCase() === ex.name.trim().toLowerCase());
                if (matches) {
                    (wEx.sets || []).forEach(set => {
                        const weight = parseFloat(set.weight) || 0;
                        const repsStr = set.reps ? String(set.reps) : (set.targetReps ? String(set.targetReps) : '');
                        const numReps = parseInt(repsStr) || 0;
                        
                        if (weight > 0) {
                            // 1RM calculation
                            const est1RM = Math.round(weight * (1 + (numReps || 1) / 30));
                            if (est1RM > best1RM) best1RM = est1RM;
                            
                            // Overall max weight comparison (weight always takes preference over reps)
                            if (weight > maxOverallWeight || (weight === maxOverallWeight && numReps > maxOverallReps)) {
                                maxOverallWeight = weight;
                                maxOverallReps = numReps;
                            }
                            
                            // Session type PRs:
                            // Weight has absolute priority; if equal weight, higher reps wins.
                            if (isHeavy) {
                                if (weight > maxHeavyWeight || (weight === maxHeavyWeight && numReps > maxHeavyReps)) {
                                    maxHeavyWeight = weight;
                                    maxHeavyReps = numReps;
                                }
                            } else if (isHyp) {
                                if (weight > maxHypWeight || (weight === maxHypWeight && numReps > maxHypReps)) {
                                    maxHypWeight = weight;
                                    maxHypReps = numReps;
                                }
                            }
                        }
                    });
                }
            });
        });
        
        if (maxHeavyWeight > 0) {
            ex.prHeavy = maxHeavyReps > 0 ? `${maxHeavyWeight}kg x ${maxHeavyReps}` : `${maxHeavyWeight}kg`;
        }
        if (maxHypWeight > 0) {
            ex.prHyp = maxHypReps > 0 ? `${maxHypWeight}kg x ${maxHypReps}` : `${maxHypWeight}kg`;
        }
        if (maxOverallWeight > 0) {
            ex.prWeight = maxOverallWeight;
            ex.prReps = maxOverallReps;
        }
        if (best1RM > 0) {
            ex.max1RM = `${best1RM}kg`;
        }
    });
}
window.recalculatePRs = recalculatePRs;


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
            ex.description = document.getElementById('exercise-description').value;
            ex.max1RM = max1rm;
            ex.prHyp = prHyp;
            ex.prHeavy = prHeavy;
            ex.defaults = { hypertrophy: rH, heavy: rHe, intensity: rI };
        }
    } else {
        state.exercises.push({
            id: Date.now().toString(),
            name, group, youtubeLink: yLink, imageData: iData,
            description: document.getElementById('exercise-description').value,
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
                        set.reps = (ex.dbEx && ex.dbEx.defaults && ex.dbEx.defaults[selectedBlockType]) ? ex.dbEx.defaults[selectedBlockType] : (set.reps || '10');
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
                    row.classList.add('set-row-builder');
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
                            <input type="number" inputmode="numeric" class="set-input set-reps" value="${set.reps || ''}" placeholder="${(ex.dbEx && ex.dbEx.defaults && ex.dbEx.defaults[blockType]) ? ex.dbEx.defaults[blockType] : '10'}" style="width:48px; padding:4px; border-radius:4px; font-size:12px; height:auto; text-align:center;">
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center;">
                            <span style="font-size:9px; color:var(--text-secondary); line-height:1;">kg</span>
                            <input type="number" step="any" inputmode="numeric" class="set-input set-weight" value="${set.weight || ''}" placeholder="0" style="width:48px; padding:4px; border-radius:4px; font-size:12px; height:auto; text-align:center;">
                        </div>
                        <button class="btn-icon delete-set"><i class="ph ph-trash"></i></button>
                    `;
                    
                    const syncSetsFromDOM = () => {
                        const allRows = setsList.querySelectorAll('.set-row-builder');
                        allRows.forEach((r, idx) => {
                            if (ex.sets[idx]) {
                                const repsInput = r.querySelector('.set-reps');
                                if (repsInput) ex.sets[idx].reps = repsInput.value;
                                const weightInput = r.querySelector('.set-weight');
                                if (weightInput) ex.sets[idx].weight = parseFloat(weightInput.value) || 0;
                                const typeSelect = r.querySelector('.set-type');
                                if (typeSelect) ex.sets[idx].type = typeSelect.value;
                            }
                        });
                    };

                    const repsInput = row.querySelector('.set-reps');
                    repsInput.addEventListener('input', (e) => { set.reps = e.target.value; });
                    repsInput.addEventListener('change', (e) => { set.reps = e.target.value; });
                    const wBuilderInput = row.querySelector('.set-weight');
                    if (wBuilderInput) {
                        wBuilderInput.addEventListener('input', (e) => { set.weight = parseFloat(e.target.value) || 0; });
                        wBuilderInput.addEventListener('change', (e) => { set.weight = parseFloat(e.target.value) || 0; });
                    }

                    row.querySelector('.set-type').addEventListener('change', (e) => {
                        syncSetsFromDOM();
                        set.type = e.target.value;
                        renderSets(); // Recalculate rest times on type change
                    });
                    
                    row.querySelector('.delete-set').addEventListener('click', () => {
                        syncSetsFromDOM();
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
                // Sync current DOM inputs into ex.sets before pushing
                const allRows = setsList.querySelectorAll('.set-row-builder');
                allRows.forEach((r, idx) => {
                    if (ex.sets[idx]) {
                        const repsIn = r.querySelector('.set-reps');
                        if (repsIn) ex.sets[idx].reps = repsIn.value;
                        const typeSel = r.querySelector('.set-type');
                        if (typeSel) ex.sets[idx].type = typeSel.value;
                    }
                });
                const lastSet = ex.sets[ex.sets.length - 1] || { type: 'Efectiva', reps: '' };
                ex.sets.push({ type: lastSet.type, reps: lastSet.reps || '' });
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
            const targetReps = (ex.defaults && ex.defaults[selectedBlockType]) || '10';
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
    const groups = combinedExercises.map(e => (e.dbEx && e.dbEx.group) || 'Sin Grupo');
    const uniqueGroups = [...new Set(groups)];
    const supersetName = `Superserie de ${uniqueGroups.join(' y ')}`;
    
    // Override sets to 3 Efectivas by default for supersets
    combinedExercises.forEach(ex => {
        const targetReps = (ex.dbEx && ex.dbEx.defaults && ex.dbEx.defaults[selectedBlockType]) || '10';
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
    
    // Sync all sets from DOM builder before saving
    const builderUl = document.getElementById('routine-selected-exercises-list');
    if (builderUl) {
        const liItems = builderUl.querySelectorAll('li[data-id]');
        liItems.forEach((li, itemIdx) => {
            const item = routineItems[itemIdx];
            if (item && item.exercises) {
                const exContainers = li.querySelectorAll('.set-row-builder');
                let rowCounter = 0;
                item.exercises.forEach(ex => {
                    if (ex.sets) {
                        ex.sets.forEach(set => {
                            const r = exContainers[rowCounter++];
                            if (r) {
                                const tSel = r.querySelector('.set-type');
                                const rIn = r.querySelector('.set-reps');
                                const wIn = r.querySelector('.set-weight');
                                if (tSel && tSel.value) set.type = tSel.value;
                                if (rIn && rIn.value !== '') set.reps = rIn.value;
                                if (wIn && wIn.value !== '') set.weight = parseFloat(wIn.value) || 0;
                            }
                        });
                    }
                });
            }
        });
    }

    const dateInputVal = document.getElementById('routine-date')?.value;
    const chosenDate = dateInputVal ? inputToDate(dateInputVal) : state.selectedDate;
    
    let workoutExercises = [];
    routineItems.forEach(item => {
        const supersetId = item.isSuperset ? (Date.now() + Math.random().toString()) : null;
        const sName = item.isSuperset ? item.name : null;
        
        item.exercises.forEach(e => {
            const exName = (e.dbEx && e.dbEx.name) ? e.dbEx.name : (e.name || 'Ejercicio');
            workoutExercises.push({
                exerciseId: e.exerciseId,
                name: exName,
                supersetId: supersetId,
                supersetName: sName,
                sets: e.sets ? e.sets.map(s => ({
                    type: s.type,
                    weight: parseFloat(s.weight) || 0,
                    targetReps: s.reps || s.targetReps || '10',
                    reps: editingSessionId ? (s.reps || '') : '',
                    repsDrop: s.repsDrop || '',
                    weightDrop: parseFloat(s.weightDrop) || 0,
                    restTime: s.restTime || '60s'
                })) : [
                    { type: 'Calentamiento', weight: 0, reps: '', targetReps: '15', restTime: '45s' },
                    { type: 'Aproximación', weight: 0, reps: '', targetReps: '10', restTime: '45s' },
                    { type: 'Efectiva', weight: 0, reps: '', targetReps: '8-10', restTime: '60s' }
                ],
                comments: ''
            });
        });
    });
    
    if (editingSessionId) {
        const existingSession = state.sessions.find(s => s.id === editingSessionId);
        if (existingSession) {
            existingSession.name = name;
            existingSession.type = selectedBlockType;
            existingSession.date = formatDate(chosenDate);
            existingSession.exercises = JSON.parse(JSON.stringify(workoutExercises));
            
            // If this session was already completed, update state.completedWorkouts as well!
            if (existingSession.completed) {
                let compRecord = (state.completedWorkouts || []).find(w => w.id === existingSession.id || w.sessionId === existingSession.id);
                if (!compRecord && existingSession.date) {
                    const [y, m, d] = existingSession.date.split('-');
                    const fDate = `${d}/${m}/${y}`;
                    compRecord = (state.completedWorkouts || []).find(w => w.name === existingSession.name && (w.date === fDate || w.date === existingSession.date));
                }
                if (compRecord) {
                    compRecord.name = name;
                    compRecord.type = selectedBlockType;
                    compRecord.exercises = JSON.parse(JSON.stringify(workoutExercises));
                    const newFormattedDate = formatDate(chosenDate);
                    if (newFormattedDate) compRecord.date = newFormattedDate;
                }
                if (typeof recalculatePRs === 'function') recalculatePRs();
                if (typeof renderGlobalHistory === 'function') renderGlobalHistory();
                if (typeof refreshMuscleFatigueMap === 'function') refreshMuscleFatigueMap();
                if (typeof renderWeeklyMuscleVolume === 'function') renderWeeklyMuscleVolume();
                if (typeof renderAchievementsView === 'function') renderAchievementsView();
            }
        }
        editingSessionId = null;
    } else {
        const blockId = duration > 1 ? ('blk_' + Date.now().toString() + Math.random().toString().slice(2, 6)) : null;
        for (let i = 0; i < duration; i++) {
            const d = new Date(chosenDate);
            d.setDate(d.getDate() + (i * 7));
            state.sessions.push({
                id: Date.now().toString() + '_' + i + '_' + Math.random().toString().slice(2, 5),
                blockId: blockId,
                date: formatDate(d),
                name: duration > 1 ? `${name} (${getT('calendar.week')} ${i+1})` : name,
                type: selectedBlockType,
                exercises: JSON.parse(JSON.stringify(workoutExercises))
            });
        }
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
    const h = Math.floor(totalS / 3600);
    const m = Math.floor((totalS % 3600) / 60);
    const s = totalS % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
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
    if (!session) return;
    activeSession = JSON.parse(JSON.stringify(session)); 

    workoutView.classList.add('active');
    document.getElementById('workout-title').textContent = session.name || 'Entrenamiento';
    workoutView.style.setProperty('--color-accent', `var(--color-${session.type || 'hypertrophy'})`); 
    
    const isActive = !!(state.activeWorkoutState && state.activeWorkoutState.session && state.activeWorkoutState.session.id === session.id); 
    
    // Recover completed data lazily if needed
    if (activeSession.completed) {
        openExerciseAccordions = [0]; 
        const startBtn = document.getElementById('btn-start-workout');
        if (startBtn) startBtn.style.display = 'none';
        
        // Hide timer and text "Completado" completely
        const tc = document.getElementById('workout-timer-container');
        if (tc) tc.style.display = 'none';
        const wt = document.getElementById('workout-timer');
        if (wt) wt.style.display = 'none';
        
        const bc = document.getElementById('btn-cancel-workout');
        if (bc) bc.style.display = 'none';
        
        document.getElementById('workout-footer').style.display = 'none';
        clearInterval(timerInterval);

        // Show sub-header with [Editar Sesión] and [Sesión Finalizada] badge
        window.isEditingCompletedWorkout = false;
        const completedActions = document.getElementById('completed-workout-header-actions');
        if (completedActions) completedActions.style.display = 'flex';
        const editCompBtn = document.getElementById('btn-edit-completed-workout');
        if (editCompBtn) editCompBtn.style.display = 'inline-flex';
        const compBadge = document.getElementById('completed-workout-status-badge');
        if (compBadge) compBadge.style.display = 'inline-flex';
        const editBtnText = document.getElementById('btn-edit-completed-workout-text');
        if (editBtnText) editBtnText.textContent = 'Editar Sesión';

        // Lazy sync: recover real completed exercises
        let matched = null;
        if (activeSession.completedWorkoutId) {
            matched = (state.completedWorkouts || []).find(w => w.id === activeSession.completedWorkoutId);
        }
        if (!matched && activeSession.id) {
            matched = (state.completedWorkouts || []).find(w => w.sessionId === activeSession.id || w.id === activeSession.id);
        }
        if (!matched && activeSession.name) {
            const dateStr = activeSession.date;
            let fDate = '';
            if (dateStr && dateStr.includes('-')) {
                const [y, m, d] = dateStr.split('-');
                fDate = `${d}/${m}/${y}`;
            }
            matched = (state.completedWorkouts || []).find(w => w.name === activeSession.name && (w.date === fDate || w.date === dateStr));
        }
        if (!matched && activeSession.name) {
            const byName = (state.completedWorkouts || []).filter(w => w.name === activeSession.name);
            if (byName.length > 0) matched = byName[byName.length - 1];
        }

        if (matched) {
            activeSession.completedWorkoutId = matched.id;
            if (matched.exercises && matched.exercises.length > 0) {
                activeSession.exercises = JSON.parse(JSON.stringify(matched.exercises));
            }
            if (matched.prs && matched.prs.length > 0) {
                activeSession.prs = JSON.parse(JSON.stringify(matched.prs));
            }
        }
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
        window.isEditingCompletedWorkout = false;
        const editCompBtn2 = document.getElementById('btn-edit-completed-workout');
        if (editCompBtn2) editCompBtn2.style.display = 'none';
        const compBadge2 = document.getElementById('completed-workout-status-badge');
        if (compBadge2) compBadge2.style.display = 'none';
        
        const completedActions = document.getElementById('completed-workout-header-actions');
        if (completedActions) completedActions.style.display = 'none';
        const wtTimer = document.getElementById('workout-timer');
        if (wtTimer) wtTimer.style.display = 'block';
        const isAnotherRunning = state.activeWorkoutState && state.activeWorkoutState.startTime;
        const startBtn = document.getElementById('btn-start-workout');
        startBtn.style.display = 'block';
        startBtn.textContent = isAnotherRunning ? 'Reemplazar Sesión Activa' : 'Iniciar';
        
        const tc3 = document.getElementById('workout-timer-container');
        if (tc3) tc3.style.display = 'none';
        else document.getElementById('workout-timer').style.display = 'none';
        document.getElementById('workout-footer').style.display = 'none';
        document.getElementById('workout-timer').textContent = '00:00:00';
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

let currentDropsetSetObj = null;

const openDropsetCalc = (weight, inputElem, setObj) => {
    if (!weight || weight <= 0) {
        alert(getT('alerts.dropsetEnterWeight') || 'Introduce primero el peso de la serie para calcular el Dropset.');
        return;
    }
    currentDropsetTargetWeightInput = inputElem;
    currentDropsetSetObj = setObj;
    document.getElementById('dropset-current-weight').textContent = weight;
    document.getElementById('dropset-20').textContent = (weight * 0.8).toFixed(1) + ' kg';
    document.getElementById('dropset-30').textContent = (weight * 0.7).toFixed(1) + ' kg';
    document.getElementById('dropset-40').textContent = (weight * 0.6).toFixed(1) + ' kg';
    openModal(modalDropset);
};

document.querySelectorAll('.btn-apply-dropset').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const mult = parseFloat(e.currentTarget.dataset.multiplier);
        const w = parseFloat(document.getElementById('dropset-current-weight').textContent);
        const calculated = parseFloat((w * mult).toFixed(1));
        if(currentDropsetTargetWeightInput) {
            currentDropsetTargetWeightInput.value = calculated;
            currentDropsetTargetWeightInput.dispatchEvent(new Event('input'));
            currentDropsetTargetWeightInput.dispatchEvent(new Event('change'));
        }
        if(currentDropsetSetObj) {
            currentDropsetSetObj.weightDrop = calculated;
            autoSaveWorkout();
        }
        closeModal(modalDropset);
    });
});

window.openLightbox = (src) => {
    document.getElementById('lightbox-img').src = src;
    openModal(modalLightbox);
};


function getLastSetPerformance(exerciseId, sessionType, setType, setIndex) {
    if (!exerciseId) return null;
    
    const allCompleted = [];
    if (Array.isArray(state.completedWorkouts)) {
        allCompleted.push(...state.completedWorkouts);
    }
    if (Array.isArray(state.sessions)) {
        state.sessions.filter(s => s.completed).forEach(s => {
            if (!allCompleted.some(w => w.id === s.id)) {
                allCompleted.push(s);
            }
        });
    }

    allCompleted.sort((a, b) => {
        const timeA = a.completedAt || (a.id && !isNaN(Number(a.id)) ? Number(a.id) : (new Date(a.date).getTime() || 0));
        const timeB = b.completedAt || (b.id && !isNaN(Number(b.id)) ? Number(b.id) : (new Date(b.date).getTime() || 0));
        return timeB - timeA;
    });

    for (const session of allCompleted) {
        if (!Array.isArray(session.exercises)) continue;
        const ex = session.exercises.find(e => e.exerciseId === exerciseId || (e.name && e.name === exerciseId));
        if (ex && Array.isArray(ex.sets)) {
            // First check same setIndex and same type
            const targetSet = (ex.sets[setIndex] && ex.sets[setIndex].type === setType && (ex.sets[setIndex].weight > 0 || ex.sets[setIndex].reps > 0))
                ? ex.sets[setIndex]
                : ex.sets.find(s => s.type === setType && (s.weight > 0 || s.reps > 0));

            if (targetSet) {
                const wt = targetSet.weight !== undefined && targetSet.weight !== null ? targetSet.weight : null;
                const reps = targetSet.reps !== undefined && targetSet.reps !== null ? targetSet.reps : null;
                if ((wt !== null && wt > 0) || (reps !== null && reps > 0)) {
                    return {
                        weight: wt,
                        reps: reps,
                        weightDrop: targetSet.weightDrop || null,
                        repsDrop: targetSet.repsDrop || null,
                        date: session.date || (session.completedAt ? new Date(session.completedAt).toISOString().split('T')[0] : null)
                    };
                }
            }
        }
    }
    return null;
}

window.copyGhostPerformance = function(flatExIdx, setIndex, wt, reps) {
    if (!activeSession || !activeSession.exercises) return;
    const sessionEx = activeSession.exercises[flatExIdx];
    if (!sessionEx || !sessionEx.sets || !sessionEx.sets[setIndex]) return;

    const s = sessionEx.sets[setIndex];
    if (wt !== null && wt !== undefined && wt !== '' && wt > 0) {
        s.weight = parseFloat(wt);
    }
    if (reps !== null && reps !== undefined && reps !== '') {
        s.reps = reps;
    }

    if (typeof autoSaveWorkout === 'function') autoSaveWorkout();
    if (typeof renderWorkout === 'function') renderWorkout();
};

function getLastWeightSuggestion(exerciseId, sessionType, setType, setIndex) {
    if (!exerciseId || !sessionType) return null;
    
    const allCompleted = [];
    if (Array.isArray(state.completedWorkouts)) {
        allCompleted.push(...state.completedWorkouts);
    }
    if (Array.isArray(state.sessions)) {
        state.sessions.filter(s => s.completed).forEach(s => {
            if (!allCompleted.some(w => w.id === s.id)) {
                allCompleted.push(s);
            }
        });
    }
    
    const targetType = (sessionType || 'hypertrophy').toLowerCase();
    const matchingSessions = allCompleted.filter(w => (w.type || 'hypertrophy').toLowerCase() === targetType);
    
    matchingSessions.sort((a, b) => {
        const timeA = a.id && !isNaN(Number(a.id)) ? Number(a.id) : (new Date(a.date).getTime() || 0);
        const timeB = b.id && !isNaN(Number(b.id)) ? Number(b.id) : (new Date(b.date).getTime() || 0);
        return timeB - timeA;
    });
    
    for (const session of matchingSessions) {
        if (!Array.isArray(session.exercises)) continue;
        const ex = session.exercises.find(e => e.exerciseId === exerciseId || (e.name && e.name === exerciseId));
        if (ex && Array.isArray(ex.sets)) {
            // First check same setIndex and same type
            if (ex.sets[setIndex] && ex.sets[setIndex].type === setType && ex.sets[setIndex].weight > 0) {
                return {
                    weight: ex.sets[setIndex].weight,
                    weightDrop: ex.sets[setIndex].weightDrop || null
                };
            }
            // Next check any set with the same type in this exercise
            const setMatch = ex.sets.find(s => s.type === setType && s.weight > 0);
            if (setMatch) {
                return {
                    weight: setMatch.weight,
                    weightDrop: setMatch.weightDrop || null
                };
            }
        }
    }
    return null;
}

const renderWorkout = () => {
    try {
    if (!activeSession) return;
    const content = document.getElementById('workout-content');
    if (!content) return;
    content.innerHTML = '';
    
    // Block description banner at top of session
    const blockBanner = document.createElement('div');
    blockBanner.classList.add('workout-block-banner');
    
    window.isMultipowerExercise = isMultipowerExercise;
function isMultipowerExercise(ex) {
    if (!ex || !ex.name) return false;
    return /multipower|smith/i.test(ex.name);
}

let activePlateCalcTargetInput = null;
let activePlateCalcSetObj = null;
let currentPlateCalcBar = 20;

window.calculateBarbellPlates = calculateBarbellPlates;
function calculateBarbellPlates(targetWeight, barWeight) {
    const platesAvailable = [25, 20, 15, 10, 5, 2.5, 1.25];
    const target = parseFloat(targetWeight) || 0;
    const bar = parseFloat(barWeight) || 20;

    if (target < bar) {
        return {
            barWeight: bar,
            targetWeight: target,
            totalLoaded: bar,
            platesPerSide: [],
            isTooLow: true
        };
    }

    let remPerSide = (target - bar) / 2;
    const platesPerSide = [];

    for (const p of platesAvailable) {
        while (remPerSide >= p - 0.001) {
            platesPerSide.push(p);
            remPerSide -= p;
        }
    }

    const loadedWeightPerSide = platesPerSide.reduce((a, b) => a + b, 0);
    const totalLoaded = bar + (loadedWeightPerSide * 2);

    return {
        barWeight: bar,
        targetWeight: target,
        totalLoaded: Math.round(totalLoaded * 100) / 100,
        platesPerSide: platesPerSide,
        isTooLow: false,
        remainder: Math.round(remPerSide * 2 * 100) / 100
    };
}

window.openPlateCalcModal = function(wInput, setObj, exObj) {
    activePlateCalcTargetInput = wInput;
    activePlateCalcSetObj = setObj;

    const initialWeight = parseFloat(wInput ? wInput.value : 0) || 60;
    const targetInput = document.getElementById('plate-calc-target-weight');
    if (targetInput) targetInput.value = initialWeight;

    if (exObj && isMultipowerExercise(exObj)) {
        currentPlateCalcBar = 15;
    } else if (exObj && /ez|curl.*barra/i.test(exObj.name)) {
        currentPlateCalcBar = 10;
    } else {
        currentPlateCalcBar = 20;
    }

    setPlateCalcBar(currentPlateCalcBar);
    recalculatePlates();

    const modal = document.getElementById('modal-plate-calc');
    if (modal) modal.classList.add('active');
};
    
    let bType = activeSession.type || 'hypertrophy';
    let bTitle = getT('blocks.hypertrophyTitle') || 'Bloque de Hipertrofia';
    let bColor = '#2563eb';
    let bIcon = 'ph-barbell';
    let bDesc = getT('blocks.hypertrophyDesc') || 'Enfoque en volumen y esfuerzo moderado-alto (RPE 7-9 / RIR 1-3). Prioriza la técnica estricta y el control excéntrico en todo el rango de movimiento.';
    
    if (bType === 'heavy') {
        bTitle = getT('blocks.heavyTitle') || 'Bloque de Pesados / Fuerza';
        bColor = '#dc2626';
        bIcon = 'ph-shield-check';
        bDesc = getT('blocks.heavyDesc') || 'Enfoque en cargas elevadas y series de bajas repeticiones con descansos completos para maximizar la fuerza y adaptación neuromuscular.';
    } else if (bType === 'intensity') {
        bTitle = getT('blocks.intensityTitle') || 'Bloque de Alta Intensidad';
        bColor = '#10b981';
        bIcon = 'ph-fire';
        bDesc = getT('blocks.intensityDesc') || 'Enfoque en llevar las series al fallo muscular, técnicas de extensión como Dropsets (-20% a -40%) y pausas de descanso breves.';
    } else if (bType === 'goal' || bType === 'objective') {
        bTitle = getT('blocks.goalTitle') || 'Sesión Objetivo';
        bColor = '#8b5cf6';
        bIcon = 'ph-target';
        bDesc = getT('blocks.goalDesc') || 'Concéntrate en la progresión de cargas y esfuerzo objetivo según lo planificado.';
    }
    
    blockBanner.style.cssText = `background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-left: 4px solid ${bColor}; border-radius: 12px; padding: 12px 14px; margin-bottom: 20px; text-align: left;`;
    blockBanner.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px; font-weight:700; color: ${bColor}; font-size: 14px;">
            <i class="ph-bold ${bIcon}" style="font-size: 18px;"></i>
            <span>${bTitle}</span>
        </div>
        <p style="margin: 6px 0 0 0; font-size: 12.5px; color: var(--text-secondary); line-height: 1.45;">${bDesc}</p>
    `;
    content.appendChild(blockBanner);
    
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
        
        const completedPrs = (activeSession && activeSession.prs) ? activeSession.prs : [];
        const livePrsList = typeof currentWorkoutPRs !== 'undefined' ? Array.from(currentWorkoutPRs.values()) : [];
        const blockHasPR = block.exercises.some(bEx => {
            const exId = bEx.exerciseId;
            const exNm = (bEx.name || '').toLowerCase();
            return completedPrs.some(p => p.exerciseId === exId || (p.exerciseName && p.exerciseName.toLowerCase() === exNm)) ||
                   livePrsList.some(p => p.exerciseId === exId || (p.exerciseName && p.exerciseName.toLowerCase() === exNm));
        });
        const prTrophyHeaderHtml = blockHasPR ? `<span class="badge-pr-trophy" title="¡Récord Personal superado en este ejercicio!" style="margin-left: 8px; color: #f59e0b; display: inline-flex; align-items: center; font-size: 16px; vertical-align: middle;"><i class="ph-fill ph-trophy"></i></span>` : '';

        // Header (Accordion)
        const header = document.createElement('div');
        header.classList.add('accordion-header');
        if(allCompleted) header.classList.add('completed');
        header.innerHTML = `
            <h3>
        <button type="button" class="btn-icon info-technique-btn" onclick="event.stopPropagation(); openTechniqueModal('${block.exercises[0].exerciseId}')" title="Ver técnica" style="margin-right: 6px; color: var(--color-accent); font-size: 18px; display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; padding: 2px;">
            <i class="ph-bold ph-info"></i>
        </button>
        <span>${headerTitle}</span>${prTrophyHeaderHtml}
        ${(() => {
            const firstEx = block.exercises[0];
            const match = getExerciseJointStress(firstEx.name, firstEx.group);
            if (match) {
                return `<button type="button" class="joint-warning-badge" onclick="event.stopPropagation(); openJointStressModal('${firstEx.exerciseId}', '${escapeHtml(firstEx.name)}')" title="Aviso de sobrecarga articular" style="margin-left: 8px; background: rgba(245, 158, 11, 0.18); border: 1px solid rgba(245, 158, 11, 0.4); color: #f59e0b; padding: 2px 7px; border-radius: 10px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle; cursor: pointer;"><i class="ph-bold ph-warning"></i> <span>Cuidado: ${match.jointName}</span></button>`;
            }
            return '';
        })()}
        <i class="ph ph-check-circle status-icon"></i>
    </h3>
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
            
            const flatExerciseIndex = activeSession.exercises.indexOf(ex);
            const exSection = document.createElement('div');
            exSection.classList.add('workout-exercise-inner');
            exSection.setAttribute('data-exercise-idx', flatExerciseIndex !== -1 ? flatExerciseIndex : exInnerIndex);
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
                    <div style="display:flex; gap:6px;">
                        <button type="button" class="btn-secondary substitute-btn" onclick="openReplaceExerciseModal('${ex.exerciseId}', ${exInnerIndex}, ${blockIndex})" style="padding: 4px 8px; font-size: 11.5px; border-radius: 8px; display: inline-flex; align-items: center; gap: 4px; cursor: pointer;" title="${getT('replaceEx.title') || 'Sustituir'}"><i class="ph ph-arrows-left-right"></i> <span>${getT('replaceEx.btnReplace') || 'Sustituir'}</span></button>
                        <button class="history-btn" onclick="openInlineHistory('${ex.exerciseId}')" style="min-width: 70px;"><i class="ph ph-clock-counter-clockwise"></i> Hist.</button>
                    </div>
                </div>
                
                <div class="set-row header-row" style="margin-top: 16px;">
                    <div></div>
                    <div style="font-size:12px; color:var(--text-secondary); text-align:center;">${getT('workout.type') || 'Tipo'}</div>
                    <div style="font-size:12px; color:var(--text-secondary); text-align:center;">${getT('workout.reps') || 'Reps'}</div>
                    <div style="font-size:12px; color:var(--text-secondary); width: 50px; text-align:center;">${getT('workout.kg') || 'Kg'}</div>
                </div>
            `;
            
            const setsContainer = document.createElement('div');
            
            ex.sets.forEach((set, setIndex) => {
                let targetReps = (set.targetReps !== undefined && set.targetReps !== null && String(set.targetReps).trim() !== '') ? String(set.targetReps) : '';
                if (!targetReps) {
                    if (set.type === 'Calentamiento') targetReps = '15-20';
                    else if (set.type === 'Aproximación') targetReps = '3-5';
                    else if (dbEx && dbEx.defaults) targetReps = dbEx.defaults[activeSession.type] || '';
                }
                
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

                const isDropset = set.type && (set.type.includes('Dropset') || set.type === 'Al fallo');
                const weightSugg = getLastWeightSuggestion(ex.exerciseId, activeSession.type, set.type, setIndex);
                const weightPlaceholder = (weightSugg && weightSugg.weight) ? weightSugg.weight : '0';
                const weightDropPlaceholder = (weightSugg && weightSugg.weightDrop) ? weightSugg.weightDrop : 'Drop kg';

                let repsHtml = '';
                let weightHtml = '';

                const isExCompleted = !!ex.completed;
                const isFieldEditable = (isWorkoutActive && !isExCompleted) || (activeSession.completed && window.isEditingCompletedWorkout);
                const disabledAttr = !isFieldEditable ? 'disabled' : '';
                const disabledStyle = !isFieldEditable ? 'opacity: 0.72; cursor: not-allowed;' : '';
                
                // Only show explicit value if user typed it or workout is completed, else keep placeholder as grey suggestion
                let displayReps = '';
                if (activeSession.completed || isExCompleted) {
                    displayReps = set.reps || '';
                } else if (set.reps && String(set.reps).trim() !== '' && String(set.reps) !== String(targetRepsBase) && String(set.reps) !== String(targetReps)) {
                    displayReps = set.reps;
                }
                let displayDropReps = (activeSession.completed || isExCompleted) ? (set.repsDrop || '') : (set.repsDrop && set.repsDrop !== targetRepsDrop ? set.repsDrop : '');

                if (isDropset) {
                    repsHtml = `
                        <div style="display: flex; flex-direction: column; gap: 4px; align-items: center;">
                            <input type="number" inputmode="numeric" class="set-input reps-input" value="${displayReps}" placeholder="${targetRepsBase}" style="width: 50px; height: 32px; text-align: center; font-size: 13px; ${disabledStyle}" ${disabledAttr}>
                            <input type="number" inputmode="numeric" class="set-input reps-drop-input" value="${displayDropReps}" placeholder="${targetRepsDrop || (set.type === 'Al fallo' ? 'Fallo' : 'Drop')}" style="width: 58px; height: 32px; text-align: center; font-size: 13px; ${disabledStyle}" ${disabledAttr}>
                        </div>
                    `;
                    weightHtml = `
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; align-items: center; gap: 4px;">
                                <input type="number" step="any" inputmode="numeric" pattern="[0-9]*" class="set-input weight-input" value="${set.weight || ''}" placeholder="${weightPlaceholder}" style="width: 50px; height: 32px; text-align: center; font-size: 13px; ${disabledStyle}" ${disabledAttr}>
                                <button type="button" class="btn-dropset-calc" style="background: #10b981; color: white; border: none; border-radius: 8px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; cursor: pointer; flex-shrink: 0; ${disabledStyle}" title="Calcular Dropset" ${disabledAttr}>%</button>
                            </div>
                            <input type="number" step="any" inputmode="numeric" pattern="[0-9]*" class="set-input weight-drop-input" value="${set.weightDrop || ''}" placeholder="${weightDropPlaceholder}" style="width: 58px; height: 32px; text-align: center; font-size: 13px; ${disabledStyle}" ${disabledAttr}>
                        </div>
                    `;
                } else {
                    repsHtml = `<input type="number" inputmode="numeric" class="set-input reps-input" value="${displayReps}" placeholder="${targetRepsBase}" style="width: 50px; height: 32px; text-align: center; font-size: 13px; ${disabledStyle}" ${disabledAttr}>`;
                    const isBarbell = isBarbellExercise(dbEx || ex);
                    const plateBtn = isBarbell ? `<button type="button" class="btn-plate-calc" style="background: var(--bg-surface-elevated); color: var(--color-accent); border: 1px solid var(--border-color); border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer; flex-shrink: 0;" title="${getT('plateCalc.title') || 'Calculadora de discos'}" ${disabledAttr} style="background: var(--bg-surface-elevated); color: var(--color-accent); border: 1px solid var(--border-color); border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer; flex-shrink: 0; ${disabledStyle}"><i class="ph-bold ph-barbell"></i></button>` : '';
                    weightHtml = `<div style="display:flex; align-items:center; gap:4px;"><input type="number" step="any" inputmode="numeric" pattern="[0-9]*" class="set-input weight-input" value="${set.weight || ''}" placeholder="${weightPlaceholder}" style="width: 50px; height: 32px; text-align: center; font-size: 13px; ${disabledStyle}" ${disabledAttr}>${plateBtn}</div>`;
                }

                const isSetPR = (set.isPR) || completedPrs.some(p => {
                    const matchEx = p.exerciseId === ex.exerciseId || (p.exerciseName && p.exerciseName.toLowerCase() === (ex.name || '').toLowerCase());
                    if (!matchEx) return false;
                    const pWeight = parseFloat(p.weight) || 0;
                    const sWeight = parseFloat(set.weight) || 0;
                    const pReps = parseFloat(p.reps) || 0;
                    const sReps = parseFloat(set.reps) || 0;
                    return pWeight === sWeight && (pReps === 0 || sReps === 0 || pReps === sReps);
                });
                const prBadgeHtml = isSetPR ? `<span class="pr-badge" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 6px; padding: 1px 5px; font-size: 10px; font-weight: 800; margin-left: 4px; display: inline-flex; align-items: center; gap: 2px;" title="Récord Personal superado en esta serie"><i class="ph-bold ph-trophy"></i> PR</span>` : '';

                setRow.innerHTML = `
                    <div class="set-number" style="margin-top: 8px;">${setIndex + 1}${prBadgeHtml}</div>
                    <div style="display:flex; flex-direction:column; justify-content: flex-start; flex: 1; min-width: 0;">
                        <select class="set-type-select" disabled style="opacity: 0.95; cursor: not-allowed; pointer-events: none; width: 100%;">
                            <option value="Calentamiento" ${set.type==='Calentamiento'?'selected':''}>${getSetTypeT('Calentamiento')}</option>
                            <option value="Aproximación" ${set.type==='Aproximación'?'selected':''}>${getSetTypeT('Aproximación')}</option>
                            <option value="Efectiva" ${set.type==='Efectiva'?'selected':''}>${getSetTypeT('Efectiva')}</option>
                            <option value="Al fallo" ${set.type==='Al fallo'?'selected':''}>${getSetTypeT('Al fallo')}</option>
                            <option value="Dropset" ${set.type==='Dropset'?'selected':''}>${getSetTypeT('Dropset')}</option>
                            <option value="Dropset fallo" ${set.type==='Dropset fallo'?'selected':''}>${getSetTypeT('Dropset fallo')}</option>
                        </select>
                        <div class="target-reps-text" style="margin-top: 4px;">Obj: ${targetReps}</div>
                        ${(() => {
                            const lastPerf = getLastSetPerformance(ex.exerciseId, activeSession.type, set.type, setIndex);
                            if (lastPerf && ((lastPerf.weight && lastPerf.weight > 0) || (lastPerf.reps && lastPerf.reps > 0))) {
                                const prevWt = (lastPerf.weight !== null && lastPerf.weight > 0) ? `${lastPerf.weight} kg` : '';
                                const prevReps = (lastPerf.reps !== null && lastPerf.reps !== '') ? `${lastPerf.reps} reps` : '';
                                const prevText = [prevWt, prevReps].filter(Boolean).join(' × ');
                                return `<div class="ghost-workout-tag" onclick="copyGhostPerformance(${flatExerciseIndex}, ${setIndex}, ${lastPerf.weight || 0}, '${lastPerf.reps || ''}')" title="Última vez (${lastPerf.date || ''}). Toca para rellenar" style="margin-top: 3px; font-size: 11px; font-weight: 600; color: var(--text-secondary); opacity: 0.88; display: inline-flex; align-items: center; gap: 4px; cursor: pointer; background: rgba(255, 255, 255, 0.04); padding: 1px 6px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.08); transition: background 0.15s ease;"><i class="ph-bold ph-ghost" style="font-size: 11px; color: var(--color-accent);"></i><span>Última vez: <strong style="color: var(--text-primary); font-weight: 700;">${prevText}</strong></span></div>`;
                            }
                            return '';
                        })()}
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content: flex-start;">
                        ${repsHtml}
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:flex-start; justify-content: flex-start;">${weightHtml}</div>
                `;
                
                const wInput = setRow.querySelector('.weight-input');
                const wDropInput = setRow.querySelector('.weight-drop-input');
                const rInput = setRow.querySelector('.reps-input');
                const rDropInput = setRow.querySelector('.reps-drop-input');
                const calcBtn = setRow.querySelector('.btn-dropset-calc');
                
                if (wInput) {
                    wInput.addEventListener('input', (e) => { 
                        set.weight = parseFloat(e.target.value) || 0; 
                        checkSetPR(ex.exerciseId, set.weight, set.reps, setRow, setIndex);
                        autoSaveWorkout(); 
                    });
                    wInput.addEventListener('change', (e) => { 
                        set.weight = parseFloat(e.target.value) || 0; 
                        checkSetPR(ex.exerciseId, set.weight, set.reps, setRow, setIndex);
                        autoSaveWorkout(); 
                    });
                }
                const plateBtnEl = setRow.querySelector('.btn-plate-calc');
                if (plateBtnEl) {
                    plateBtnEl.addEventListener('click', () => {
                        openPlateCalcModal(wInput, set, dbEx || ex);
                    });
                }
                if (wDropInput) {
                    wDropInput.addEventListener('input', (e) => { set.weightDrop = parseFloat(e.target.value) || 0; autoSaveWorkout(); });
                    wDropInput.addEventListener('change', (e) => { set.weightDrop = parseFloat(e.target.value) || 0; autoSaveWorkout(); });
                }
                if (rInput) {
                    rInput.addEventListener('input', (e) => { 
                        set.reps = e.target.value; 
                        checkSetPR(ex.exerciseId, set.weight, set.reps, setRow, setIndex);
                        autoSaveWorkout(); 
                    });
                    rInput.addEventListener('change', (e) => { 
                        set.reps = e.target.value; 
                        checkSetPR(ex.exerciseId, set.weight, set.reps, setRow, setIndex);
                        autoSaveWorkout(); 
                    });
                }
                if (rDropInput) {
                    rDropInput.addEventListener('input', (e) => { set.repsDrop = e.target.value; autoSaveWorkout(); });
                    rDropInput.addEventListener('change', (e) => { set.repsDrop = e.target.value; autoSaveWorkout(); });
                }
                if (calcBtn) {
                    calcBtn.addEventListener('click', () => {
                        const curW = set.weight || parseFloat(wInput.value) || (weightSugg ? weightSugg.weight : 0);
                        openDropsetCalc(curW, wDropInput, set);
                    });
                }
                
                const deleteBtn = setRow.querySelector('.delete-set');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', () => {
                        ex.sets.splice(setIndex, 1);
                        autoSaveWorkout();
                        renderWorkout();
                    });
                }
                
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
            const cInput = commentDiv.querySelector('input');
            cInput.addEventListener('input', (e) => { ex.comments = e.target.value; autoSaveWorkout(); });
            cInput.addEventListener('change', (e) => { ex.comments = e.target.value; autoSaveWorkout(); });
            exSection.appendChild(commentDiv);
            
            body.appendChild(exSection);
        });
        
                const finishExBtn = document.createElement('button');
        finishExBtn.classList.add('btn-secondary', 'full-width');
        if (allCompleted) {
            finishExBtn.innerHTML = '<i class="ph ph-arrow-counter-clockwise"></i> ' + (typeof getT === 'function' ? (block.type === 'superset' ? getT('workout.reopenSuperset') : getT('workout.reopenExercise')) : (block.type === 'superset' ? 'Reabrir Superserie' : 'Reabrir Ejercicio'));
            finishExBtn.style.borderColor = 'var(--color-accent)';
            finishExBtn.style.color = 'var(--color-accent)';
        } else {
            finishExBtn.innerHTML = '<i class="ph ph-check"></i> ' + (block.type === 'superset' ? 'Finalizar Superserie' : 'Finalizar Ejercicio');
        }
        finishExBtn.disabled = !isWorkoutActive;
        if (!isWorkoutActive) finishExBtn.style.opacity = '0.5';
        if (activeSession.completed) finishExBtn.style.display = 'none';
        finishExBtn.addEventListener('click', () => {
            syncActiveWorkoutInputsFromDOM();
            if (allCompleted) {
                // Reopen exercise to modify
                block.exercises.forEach(e => e.completed = false);
                if (!openExerciseAccordions.includes(block.id)) openExerciseAccordions.push(block.id);
            } else {
                // Finish exercise and lock
                block.exercises.forEach(e => e.completed = true);
                openExerciseAccordions = openExerciseAccordions.filter(i => i !== block.id && (blockIndex !== 0 || i !== 0));
            }
            recalculatePRs();
            autoSaveWorkout();
            saveState();
            renderWorkout();
            if (typeof renderExercises === 'function') renderExercises();
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
    workoutView.style.removeProperty('--color-accent');
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
            if (!dStr) return new Date();
            const parts = dStr.split('/');
            if (parts.length === 3) return new Date(parts[2], parts[1] - 1, parts[0]);
            return new Date(dStr);
        };
        const deletedDate = parseDateStr(sessionToDelete.date);
        const dayOfWeek = deletedDate.getDay();
        const baseName = (sessionToDelete.name || '').replace(/\s*\((?:Semana|Week|\d+)[^\)]*\)/i, '').trim().toLowerCase();
        
        
        const isRealLegSession = (sess) => {
            if (!sess) return false;
            const name = (sess.name || '').toLowerCase();
            if (sess.type === 'goal' || name.includes('objetivo') || name.includes('pasos')) return false;
            if (/\b(pierna|piernas|patas|cuadriceps|cuádriceps|femoral|femorales|isquios|isquiosurales|gemelo|gemelos|gluteo|glúteo|gluteos|glúteos|leg|legs|squat|squats)\b/i.test(name)) {
                return true;
            }
            const allEx = (state && state.exercises) ? state.exercises : [];
            return (sess.exercises || []).some(e => {
                const fullEx = allEx.find(db => db.id === (e.exerciseId || e.id)) || e;
                const exName = (fullEx.name || e.name || '').toLowerCase();
                const exGroup = (fullEx.group || e.group || '').toLowerCase();
                if (/\b(pierna|piernas|cuádriceps|cuadriceps|isquiosurales|glúteo|gluteo|gemelos)\b/i.test(exGroup)) return true;
                return /\b(sentadilla|prensa|zancada|zancadas|squat|lunge|lunges|leg press|extensión de pierna|curl femoral|peso muerto rumano|gemelos)\b/i.test(exName);
            });
        };

        if (isRealLegSession(sessionToDelete)) {
            localStorage.setItem('gym_unlocked_skipped_leg_day', 'true');
            if (typeof unlockAchievement === 'function') unlockAchievement('skipped_leg_day');
        }

        state.sessions = state.sessions.filter(s => {
            const sDate = parseDateStr(s.date);
            if (sDate < deletedDate) return true; // Mantener sesiones pasadas
            
            // Check matching blockId
            if (sessionToDelete.blockId && s.blockId && s.blockId === sessionToDelete.blockId) {
                return false;
            }
            
            // Check matching base name on same day of week
            const sBaseName = (s.name || '').replace(/\s*\((?:Semana|Week|\d+)[^\)]*\)/i, '').trim().toLowerCase();
            if (baseName && sBaseName && baseName === sBaseName && sDate.getDay() === dayOfWeek) {
                return false;
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
    syncActiveWorkoutInputsFromDOM();
    const confirmMsg = translations[state.language] && translations[state.language].workout && translations[state.language].workout.finishConfirm 
        ? translations[state.language].workout.finishConfirm 
        : '¿Finalizar entrenamiento?';
    
    if (!confirm(confirmMsg)) {
        return;
    }

    clearInterval(timerInterval);
    const duration = Date.now() - (state.activeWorkoutState?.startTime || workoutStartTime || Date.now());
    
    // Save to completed with real current date
    const realDate = formatDate(new Date());
    
    // Mark session as completed in calendar
    if (activeSession && activeSession.id) {
        const sessionInCalendar = state.sessions.find(s => s.id === activeSession.id);
        if(sessionInCalendar) {
            sessionInCalendar.completed = true;
            sessionInCalendar.exercises = JSON.parse(JSON.stringify(activeSession.exercises || []));
        }
    }
    
    const sessionData = activeSession || (state.activeWorkoutState && state.activeWorkoutState.session) || { name: 'Entrenamiento', type: 'hypertrophy', exercises: [] };
    
    if (!Array.isArray(state.completedWorkouts)) {
        state.completedWorkouts = [];
    }

    // Deduplicate PRs so each exercise only appears ONCE (the best set)
    const rawPrs = typeof currentWorkoutPRs !== 'undefined' ? Array.from(currentWorkoutPRs.values()) : [];
    const uniquePrMap = new Map();
    rawPrs.forEach(pr => {
        const existing = uniquePrMap.get(pr.exerciseId);
        if (!existing || (pr.weight > existing.weight) || (pr.weight === existing.weight && pr.reps > existing.reps)) {
            uniquePrMap.set(pr.exerciseId, pr);
        }
    });
    const workoutPrsList = Array.from(uniquePrMap.values());
    window.lastCompletedWorkoutData = {
        id: Date.now().toString(),
        sessionId: (activeSession && activeSession.id) ? activeSession.id : null,
        completedAt: Date.now(),
        date: realDate,
        name: sessionData.name || 'Entrenamiento',
        type: sessionData.type || 'hypertrophy',
        duration: formatTimer(duration > 0 ? duration : 0),
        exercises: JSON.parse(JSON.stringify(sessionData.exercises || [])),
        prs: workoutPrsList
    };
    state.completedWorkouts.push(window.lastCompletedWorkoutData);
    
    workoutView.classList.remove('active');
    workoutView.style.removeProperty('--color-accent');
    state.activeWorkoutState = null; // CLEAR active state fully
    if (window.manageWorkoutNotification) window.manageWorkoutNotification(false);
    activeSession = null;
    openExerciseAccordions = [];
    recalculatePRs();
    saveState();
    renderCalendar();
    renderGlobalHistory();
    if (typeof renderProgressionView === 'function') renderProgressionView();
    // Show modern workout summary modal
    const lastCompleted = state.completedWorkouts[state.completedWorkouts.length - 1];
    showWorkoutSummaryModal(lastCompleted);
    try {
        checkAndUnlockAchievements(lastCompleted);
    } catch(e) {}
});



// ============================================================
// 1. CALCULADORA DE DISCOS DE BARRA (PLATE CALCULATOR)
// ============================================================
window.isBarbellExercise = isBarbellExercise;
function isBarbellExercise(ex) {
    if (!ex || !ex.name) return false;
    const name = (ex.name || '').toLowerCase();
    if (/mancuerna|dumbbell|polea|cable|maquina|máquina/i.test(name) && !/multipower|smith/i.test(name)) {
        return false;
    }
    if (/barra|barbell|bench press|press banca|sentadilla|peso muerto|squat|deadlift|clean|snatch|remo con barra|curl con barra|multipower|smith/i.test(name)) {
        return true;
    }
    return false;
}

window.isMultipowerExercise = isMultipowerExercise;
function isMultipowerExercise(ex) {
    if (!ex || !ex.name) return false;
    return /multipower|smith/i.test(ex.name);
    return false;
}

let activePlateCalcTargetInput = null;
let activePlateCalcSetObj = null;
let currentPlateCalcBar = 20;

window.calculateBarbellPlates = calculateBarbellPlates;
function calculateBarbellPlates(targetWeight, barWeight) {
    const platesAvailable = [25, 20, 15, 10, 5, 2.5, 1.25];
    const target = parseFloat(targetWeight) || 0;
    const bar = parseFloat(barWeight) || 20;

    if (target < bar) {
        return {
            barWeight: bar,
            targetWeight: target,
            totalLoaded: bar,
            platesPerSide: [],
            isTooLow: true
        };
    }

    let remPerSide = (target - bar) / 2;
    const platesPerSide = [];

    for (const p of platesAvailable) {
        while (remPerSide >= p - 0.001) {
            platesPerSide.push(p);
            remPerSide -= p;
        }
    }

    const loadedWeightPerSide = platesPerSide.reduce((a, b) => a + b, 0);
    const totalLoaded = bar + (loadedWeightPerSide * 2);

    return {
        barWeight: bar,
        targetWeight: target,
        totalLoaded: Math.round(totalLoaded * 100) / 100,
        platesPerSide: platesPerSide,
        isTooLow: false,
        remainder: Math.round(remPerSide * 2 * 100) / 100
    };
}

window.openPlateCalcModal = function(wInput, setObj, exObj) {
    activePlateCalcTargetInput = wInput;
    activePlateCalcSetObj = setObj;

    const initialWeight = parseFloat(wInput ? wInput.value : 0) || 60;
    const targetInput = document.getElementById('plate-calc-target-weight');
    if (targetInput) targetInput.value = initialWeight;

    if (exObj && isMultipowerExercise(exObj)) {
        currentPlateCalcBar = 15;
    } else if (exObj && /ez|curl.*barra/i.test(exObj.name)) {
        currentPlateCalcBar = 10;
    } else {
        currentPlateCalcBar = 20;
    }

    setPlateCalcBar(currentPlateCalcBar);
    recalculatePlates();

    const modal = document.getElementById('modal-plate-calc');
    if (modal) modal.classList.add('active');
};

window.setPlateCalcBar = function(weight) {
    currentPlateCalcBar = weight;
    document.querySelectorAll('.plate-bar-btn').forEach(btn => {
        const bWeight = parseFloat(btn.getAttribute('data-bar'));
        if (bWeight === weight) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    recalculatePlates();
};

window.adjustPlateCalcWeight = function(delta) {
    const input = document.getElementById('plate-calc-target-weight');
    if (!input) return;
    let val = (parseFloat(input.value) || 0) + delta;
    if (val < 0) val = 0;
    input.value = Math.round(val * 100) / 100;
    recalculatePlates();
};

window.recalculatePlates = function() {
    const input = document.getElementById('plate-calc-target-weight');
    const targetVal = parseFloat(input ? input.value : 0) || 0;
    const res = calculateBarbellPlates(targetVal, currentPlateCalcBar);

    const listEl = document.getElementById('plate-calc-list');
    const summaryTextEl = document.getElementById('plate-calc-summary-text');
    const barbellEl = document.getElementById('plate-calc-barbell');

    if (res.isTooLow) {
        const msg = (getT('plateCalc.weightTooLow') || 'El peso debe ser mayor al de la barra ({bar}kg)').replace('{bar}', res.barWeight);
        if (listEl) listEl.innerHTML = `<span style="color: #ef4444; font-size: 13px;">${msg}</span>`;
        if (summaryTextEl) summaryTextEl.textContent = '';
        if (barbellEl) barbellEl.innerHTML = '<div class="barbell-bar"></div><div class="barbell-center-collar"></div>';
        return;
    }

    // Plate color class mapping
    const plateClassMap = {
        25: 'plate-25',
        20: 'plate-20',
        15: 'plate-15',
        10: 'plate-10',
        5: 'plate-5',
        2.5: 'plate-2-5',
        1.25: 'plate-1-25'
    };

    // Render list chips
    if (listEl) {
        if (res.platesPerSide.length === 0) {
            listEl.innerHTML = '<span style="color: var(--text-secondary); font-size: 13px; font-style: italic;">Sin discos (solo barra)</span>';
        } else {
            // Count plates
            const counts = {};
            res.platesPerSide.forEach(p => counts[p] = (counts[p] || 0) + 1);
            listEl.innerHTML = Object.keys(counts).map(p => {
                const cls = plateClassMap[p] || 'plate-20';
                return `<div class="plate-chip"><span style="width:10px; height:10px; border-radius:50%; display:inline-block;" class="${cls}"></span> ${counts[p]} x ${p} kg</div>`;
            }).join('');
        }
    }

    if (summaryTextEl) {
        summaryTextEl.textContent = `Barra (${res.barWeight} kg) + 2 x (${(res.totalLoaded - res.barWeight) / 2} kg) = ${res.totalLoaded} kg`;
    }

    // Render Visual Barbell
    if (barbellEl) {
        const leftPlatesHtml = res.platesPerSide.map(p => {
            const cls = plateClassMap[p] || 'plate-20';
            return `<div class="visual-plate ${cls}">${p}</div>`;
        }).join('');

        const rightPlatesHtml = res.platesPerSide.map(p => {
            const cls = plateClassMap[p] || 'plate-20';
            return `<div class="visual-plate ${cls}">${p}</div>`;
        }).join('');

        barbellEl.innerHTML = `
            <div class="barbell-bar"></div>
            <div class="barbell-center-collar"></div>
            <div class="barbell-collar-left"></div>
            <div class="barbell-collar-right"></div>
            <div class="barbell-sleeve-left">${leftPlatesHtml}</div>
            <div class="barbell-sleeve-right">${rightPlatesHtml}</div>
        `;
    }
};

window.applyPlateCalcWeight = function() {
    const input = document.getElementById('plate-calc-target-weight');
    const targetVal = parseFloat(input ? input.value : 0) || 0;
    if (activePlateCalcTargetInput) {
        activePlateCalcTargetInput.value = targetVal;
        if (activePlateCalcSetObj) {
            activePlateCalcSetObj.weight = targetVal;
        }
        activePlateCalcTargetInput.dispatchEvent(new Event('input', { bubbles: true }));
        activePlateCalcTargetInput.dispatchEvent(new Event('change', { bubbles: true }));
        if (typeof autoSaveWorkout === 'function') autoSaveWorkout();
    }
    const modal = document.getElementById('modal-plate-calc');
    if (modal) modal.classList.remove('active');
};


// ============================================================
// 2. SUSTITUCIÓN RÁPIDA DE EJERCICIOS EN VIVO
// ============================================================
let replaceTargetData = null;

window.openReplaceExerciseModal = function(exerciseId, exInnerIndex, blockIndex) {
    const currentEx = state.exercises.find(e => e.id === exerciseId);
    if (!currentEx) return;

    replaceTargetData = {
        oldExId: exerciseId,
        exInnerIndex: exInnerIndex,
        blockIndex: blockIndex,
        group: currentEx.group || 'Sin Grupo'
    };

    const subTitle = document.getElementById('replace-exercise-subtitle');
    if (subTitle) {
        const tpl = getT('replaceEx.subtitle') || 'Elige una alternativa para {group}:';
        subTitle.textContent = tpl.replace('{group}', replaceTargetData.group);
    }

    const searchInput = document.getElementById('replace-exercise-search');
    if (searchInput) searchInput.value = '';

    filterReplaceExerciseList();

    const modal = document.getElementById('modal-replace-exercise');
    if (modal) modal.classList.add('active');
};

window.filterReplaceExerciseList = function() {
    if (!replaceTargetData) return;
    const searchVal = (document.getElementById('replace-exercise-search')?.value || '').toLowerCase().trim();
    const listContainer = document.getElementById('replace-exercise-list');
    if (!listContainer) return;

    // Filter exercises of the same group, excluding current exercise
    const candidates = state.exercises.filter(ex => {
        if (ex.id === replaceTargetData.oldExId) return false;
        const matchesGroup = (ex.group || 'Sin Grupo').toLowerCase() === replaceTargetData.group.toLowerCase();
        if (!matchesGroup) return false;
        if (searchVal) {
            const nameMatch = (ex.name || '').toLowerCase().includes(searchVal) || getTrExName(ex.name).toLowerCase().includes(searchVal);
            return nameMatch;
        }
        return true;
    });

    if (candidates.length === 0) {
        listContainer.innerHTML = `<div class="empty-state" style="padding: 20px; font-size: 13px; color: var(--text-secondary);">No se encontraron alternativas en este grupo.</div>`;
        return;
    }

    listContainer.innerHTML = candidates.map(ex => {
        const trName = getTrExName(ex.name);
        const imgHtml = ex.imageData ? `<img src="${ex.imageData}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 8px; flex-shrink: 0;">` : `<div style="width: 44px; height: 44px; border-radius: 8px; background: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: center; color: var(--text-secondary); font-size: 20px; flex-shrink: 0;"><i class="ph ph-barbell"></i></div>`;
        return `
            <div class="card" style="padding: 10px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; gap: 10px; border-radius: 12px; transition: transform 0.1s ease;" onclick="confirmReplaceExercise('${ex.id}')">
                <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
                    ${imgHtml}
                    <div style="text-align: left; overflow: hidden;">
                        <div style="font-weight: 700; font-size: 13.5px; color: var(--text-primary); text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${trName}</div>
                        <div style="font-size: 11.5px; color: var(--text-secondary);">${ex.group || ''}</div>
                    </div>
                </div>
                <button type="button" class="btn-primary" style="padding: 6px 12px; font-size: 12px; border-radius: 8px; flex-shrink: 0;">${getT('replaceEx.btnReplace') || 'Sustituir'}</button>
            </div>
        `;
    }).join('');
};

window.confirmReplaceExercise = function(newExId) {
    if (!replaceTargetData || !activeSession) return;
    const newEx = state.exercises.find(e => e.id === newExId);
    const oldEx = state.exercises.find(e => e.id === replaceTargetData.oldExId);
    if (!newEx) return;

    // Find the exercise in activeSession.exercises
    const targetSessionEx = activeSession.exercises.find(e => e.exerciseId === replaceTargetData.oldExId);
    if (!targetSessionEx) return;

    // Replace exercise id and name, keep sets and comments intact
    targetSessionEx.exerciseId = newEx.id;
    targetSessionEx.name = newEx.name;

    if (typeof autoSaveWorkout === 'function') autoSaveWorkout();
    if (typeof renderWorkout === 'function') renderWorkout();

    const modal = document.getElementById('modal-replace-exercise');
    if (modal) modal.classList.remove('active');
};


// ============================================================
// 3. DETECCIÓN AUTOMÁTICA DE PR (RÉCORD PERSONAL) EN VIVO
// ============================================================
let currentWorkoutPRs = new Map();

window.getHistoricalBest = getHistoricalBest;
function getHistoricalBest(exerciseId) {
    let maxWeight = 0;
    let maxEst1RM = 0;

    if (Array.isArray(state.completedWorkouts)) {
        state.completedWorkouts.forEach(w => {
            if (Array.isArray(w.exercises)) {
                w.exercises.forEach(ex => {
                    if (ex.id === exerciseId || ex.exerciseId === exerciseId) {
                        if (Array.isArray(ex.sets)) {
                            ex.sets.forEach(s => {
                                const wVal = parseFloat(s.weight) || 0;
                                const rVal = parseFloat(s.reps) || 0;
                                if (wVal > maxWeight) maxWeight = wVal;
                                if (wVal > 0 && rVal > 0) {
                                    const est = wVal * (1 + (rVal / 30));
                                    if (est > maxEst1RM) maxEst1RM = est;
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    return { maxWeight, maxEst1RM };
}

window.checkSetPR = function(exerciseId, weight, reps, setRowEl, setIndex) {
    const wVal = parseFloat(weight) || 0;
    const rVal = parseFloat(reps) || 0;
    const prKey = `${exerciseId}_${setIndex}`;

    const existingBadge = setRowEl?.querySelector('.pr-badge');
    if (existingBadge) existingBadge.remove();

    if (wVal <= 0) {
        currentWorkoutPRs.delete(prKey);
        return;
    }

    const hist = getHistoricalBest(exerciseId);
    const dbEx = state.exercises.find(e => e.id === exerciseId);
    const exName = dbEx ? dbEx.name : 'Ejercicio';

    let isPR = false;
    let prType = '';
    let prLabel = '';

    if (hist.maxWeight > 0 && wVal > hist.maxWeight) {
        isPR = true;
        prType = 'weight';
        prLabel = `🏆 ${getT('pr.newRecord') || '¡RÉCORD!'} (${wVal}kg)`;
    } else if (rVal > 0 && hist.maxEst1RM > 0) {
        const curEst = wVal * (1 + (rVal / 30));
        if (curEst > hist.maxEst1RM + 0.5) {
            isPR = true;
            prType = '1rm';
            prLabel = `🏆 ${getT('pr.est1rmRecord') || '1RM'} (${Math.round(curEst)}kg)`;
        }
    }

    // Check if an earlier set in this same workout session already matched or beat this PR
    let beatenByEarlierSet = false;
    currentWorkoutPRs.forEach((val, k) => {
        if (k.startsWith(exerciseId + '_')) {
            const earlierIdx = parseInt(k.split('_')[1]);
            if (earlierIdx < setIndex) {
                if (val.weight >= wVal && val.reps >= rVal) {
                    beatenByEarlierSet = true;
                }
            }
        }
    });

    if (beatenByEarlierSet) {
        isPR = false;
    }

    // Check if an earlier set in this same workout session already matched or beat this PR
    let beatenByEarlierSet = false;
    currentWorkoutPRs.forEach((val, k) => {
        if (k.startsWith(exerciseId + '_')) {
            const earlierIdx = parseInt(k.split('_')[1]);
            if (earlierIdx < setIndex) {
                if (val.weight >= wVal && val.reps >= rVal) {
                    beatenByEarlierSet = true;
                }
            }
        }
    });

    if (beatenByEarlierSet) {
        isPR = false;
    }

    if (isPR) {
        currentWorkoutPRs.set(prKey, {
            exerciseId,
            exerciseName: exName,
            weight: wVal,
            reps: rVal,
            type: prType,
            label: prLabel
        });

        // Append visual PR badge
        if (setRowEl) {
            const setNumberEl = setRowEl.querySelector('.set-number');
            if (setNumberEl) {
                const badge = document.createElement('span');
                badge.className = 'pr-badge';
                badge.innerHTML = `<i class="ph-bold ph-trophy"></i> PR`;
                badge.title = prLabel;
                setNumberEl.appendChild(badge);
            }

            // Also show trophy icon in exercise accordion header
            const accordionItem = setRowEl.closest('.accordion-item');
            if (accordionItem) {
                const headerTitle = accordionItem.querySelector('.accordion-header h3 span') || accordionItem.querySelector('.accordion-header span');
                if (headerTitle && !accordionItem.querySelector('.live-pr-trophy')) {
                    const trophy = document.createElement('span');
                    trophy.className = 'live-pr-trophy';
                    trophy.style.cssText = 'color: #f59e0b; margin-left: 6px; font-size: 16px; display: inline-flex; align-items: center;';
                    trophy.title = '¡Récord Personal superado en esta sesión!';
                    trophy.innerHTML = '<i class="ph-fill ph-trophy"></i>';
                    headerTitle.parentElement.insertBefore(trophy, headerTitle.nextSibling);
                }
            }
        }

        // Trigger PR achievement immediately
        try {
            if (typeof unlockAchievement === 'function') unlockAchievement('first_pr');
            localStorage.setItem('gym_unlocked_first_pr', 'true');
        } catch(e) {}
    } else {
        currentWorkoutPRs.delete(prKey);
    }
};


// ============================================================
// 4. TARJETA DE RESUMEN AL FINALIZAR LA SESIÓN
// ============================================================
window.showWorkoutSummaryModal = function(workoutData) {
    const modal = document.getElementById('modal-workout-summary');
    if (!modal) return;

    // Set title and subtitle
    const titleEl = document.getElementById('summary-workout-title');
    const subtitleEl = document.getElementById('summary-workout-subtitle');
    if (titleEl) titleEl.textContent = getT('summary.title') || '¡Entrenamiento Completado!';
    if (subtitleEl) subtitleEl.textContent = `${workoutData.name || 'Entrenamiento'} • ${workoutData.duration || '00:00:00'}`;

    // Compute stats
    let totalVolume = 0;
    let completedSetsCount = 0;
    const exercisesSummary = [];

    if (Array.isArray(workoutData.exercises)) {
        workoutData.exercises.forEach(ex => {
            let exMaxWeight = 0;
            let exCompletedSets = 0;
            if (Array.isArray(ex.sets)) {
                ex.sets.forEach(s => {
                    const w = parseFloat(s.weight) || 0;
                    const r = parseFloat(s.reps) || 0;
                    if (w > 0 && r > 0) {
                        totalVolume += w * r;
                        completedSetsCount++;
                        exCompletedSets++;
                        if (w > exMaxWeight) exMaxWeight = w;
                    }
                });
            }
            exercisesSummary.push({
                name: ex.name,
                setsCount: exCompletedSets,
                maxWeight: exMaxWeight
            });
        });
    }

    // Set stat values
    const timeEl = document.getElementById('summary-stat-time');
    const volEl = document.getElementById('summary-stat-volume');
    const setsEl = document.getElementById('summary-stat-sets');
    const prsCountEl = document.getElementById('summary-stat-prs-count');

    if (timeEl) timeEl.textContent = workoutData.duration || '00:00:00';
    if (volEl) volEl.textContent = `${Math.round(totalVolume).toLocaleString()} kg`;
    if (setsEl) setsEl.textContent = completedSetsCount;

    // Deduplicate PRs so each exercise only appears ONCE
    const rawPrs = (workoutData && Array.isArray(workoutData.prs)) ? workoutData.prs : Array.from(currentWorkoutPRs.values());
    const uniquePrMap = new Map();
    rawPrs.forEach(pr => {
        const id = pr.exerciseId || pr.name || pr.exerciseName;
        const existing = uniquePrMap.get(id);
        if (!existing || (pr.weight > existing.weight) || (pr.weight === existing.weight && pr.reps > existing.reps)) {
            uniquePrMap.set(id, pr);
        }
    });
    const prsArray = Array.from(uniquePrMap.values());
    if (prsCountEl) prsCountEl.textContent = prsArray.length;

    // Render PRs
    const prsContainer = document.getElementById('summary-prs-container');
    const prsList = document.getElementById('summary-prs-list');
    if (prsContainer && prsList) {
        if (prsArray.length > 0) {
            prsContainer.style.display = 'block';
            prsList.innerHTML = prsArray.map(pr => {
                return `<div style="font-size: 12.5px; display:flex; justify-content:space-between; color: var(--text-primary);">
                    <span><b>${getTrExName(pr.exerciseName)}:</b> ${pr.weight} kg x ${pr.reps} reps</span>
                    <span style="color:#f59e0b; font-weight:800;">${pr.label}</span>
                </div>`;
            }).join('');
        } else {
            prsContainer.style.display = 'none';
        }
    }

    // Render Exercises List
    const exListEl = document.getElementById('summary-exercises-list');
    if (exListEl) {
        exListEl.innerHTML = exercisesSummary.map(item => {
            return `<div style="background: var(--bg-surface); padding: 8px 12px; border-radius: 10px; display:flex; justify-content:space-between; align-items:center; border: 1px solid var(--border-color); font-size: 13px;">
                <span style="font-weight: 600;">${getTrExName(item.name)}</span>
                <span style="color: var(--color-accent); font-weight: 700;">${item.setsCount} series • Max: ${item.maxWeight} kg</span>
            </div>`;
        }).join('');
    }

    // Save summary text for sharing
    const prsSummaryStr = prsArray.length > 0 ? ('\n🏆 Récords superados:\n' + prsArray.map(p => '• ' + getTrExName(p.exerciseName) + ': ' + p.weight + 'kg x ' + p.reps).join('\n')) : '';
    window.lastWorkoutSummaryText = `💪 Gym Tracker - ${getT('summary.title') || 'Entrenamiento Completado'}\n📅 ${workoutData.date || new Date().toLocaleDateString()} (${workoutData.name || 'Entrenamiento'})\n⏱️ ${getT('summary.time') || 'Tiempo'}: ${workoutData.duration || '00:00:00'}\n🏋️ ${getT('summary.volume') || 'Volumen'}: ${Math.round(totalVolume).toLocaleString()} kg\n🔢 ${getT('summary.sets') || 'Series'}: ${completedSetsCount}${prsSummaryStr}`;

    modal.classList.add('active');
    currentWorkoutPRs.clear();
};

window.copyWorkoutSummaryText = function() {
    if (window.lastWorkoutSummaryText && navigator.clipboard) {
        navigator.clipboard.writeText(window.lastWorkoutSummaryText).then(() => {
            alert(getT('summary.copied') || '¡Resumen copiado al portapapeles!');
        }).catch(() => {
            alert(window.lastWorkoutSummaryText);
        });
    }
};


// ============================================================
// 5. COMPARADOR DE FOTOS ANTES / DESPUÉS
// ============================================================
let currentCompareAngle = 'front';
let currentCompareMode = 'side-by-side';


function getEvolutionPhotos(item) {
    if (!item) return { front: null, side: null, back: null, list: [] };
    if (item.photosByAngle && typeof item.photosByAngle === 'object') {
        const list = [item.photosByAngle.front, item.photosByAngle.side, item.photosByAngle.back].filter(Boolean);
        return {
            front: item.photosByAngle.front || null,
            side: item.photosByAngle.side || null,
            back: item.photosByAngle.back || null,
            list: list
        };
    }
    if (item.photos && typeof item.photos === 'object' && !Array.isArray(item.photos)) {
        const list = [item.photos.front, item.photos.side, item.photos.back].filter(Boolean);
        return {
            front: item.photos.front || null,
            side: item.photos.side || null,
            back: item.photos.back || null,
            list: list
        };
    }
    if (Array.isArray(item.photos)) {
        const valid = item.photos.filter(Boolean);
        return {
            front: valid[0] || null,
            side: valid[1] || null,
            back: valid[2] || null,
            list: valid
        };
    }
    return { front: null, side: null, back: null, list: [] };
}
window.getEvolutionPhotos = getEvolutionPhotos;

window.openPhotoComparisonModal = function() {
        const historyWithPhotos = (state.evolution || []).filter(item => {
        const p = getEvolutionPhotos(item);
        return p.list && p.list.length > 0;
    }).sort((a,b) => {
        const tA = a.dateIso ? new Date(a.dateIso).getTime() : (a.date ? new Date(a.date).getTime() : Number(a.id) || 0);
        const tB = b.dateIso ? new Date(b.dateIso).getTime() : (b.date ? new Date(b.dateIso).getTime() : Number(b.id) || 0);
        return tA - tB;
    });

    if (historyWithPhotos.length < 2) {
        alert(getT('compare.noPhotos') || 'Se necesitan al menos 2 registros con fotos para comparar.');
        return;
    }

    const selBefore = document.getElementById('compare-select-before');
    const selAfter = document.getElementById('compare-select-after');

    if (selBefore && selAfter) {
        const optionsHtml = historyWithPhotos.map((item, idx) => {
            const dStr = item.date || (item.dateIso ? formatDate(new Date(item.dateIso)) : 'Fecha');
            const wStr = item.weight ? ` (${item.weight} kg)` : '';
            return `<option value="${item.id}">${dStr}${wStr}</option>`;
        }).join('');

        selBefore.innerHTML = optionsHtml;
        selAfter.innerHTML = optionsHtml;

        // Default: Before = oldest (first), After = newest (last)
        selBefore.selectedIndex = 0;
        selAfter.selectedIndex = historyWithPhotos.length - 1;
    }

    setCompareAngle('front');
    setCompareMode('side-by-side');
    renderPhotoComparison();

    const modal = document.getElementById('modal-evolution-compare');
    if (modal) modal.classList.add('active');
};

window.setCompareAngle = function(angle) {
    currentCompareAngle = angle;
    document.querySelectorAll('.compare-angle-btn').forEach(btn => {
        if (btn.getAttribute('data-angle') === angle) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    renderPhotoComparison();
};

window.setCompareMode = function(mode) {
    currentCompareMode = mode;
    document.querySelectorAll('.compare-mode-btn').forEach(btn => {
        if (btn.getAttribute('data-mode') === mode) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    renderPhotoComparison();
};

window.renderPhotoComparison = function() {
    const idBefore = document.getElementById('compare-select-before')?.value;
    const idAfter = document.getElementById('compare-select-after')?.value;

    const itemBefore = (state.evolution || []).find(e => String(e.id) === String(idBefore));
    const itemAfter = (state.evolution || []).find(e => String(e.id) === String(idAfter));

    const viewport = document.getElementById('compare-viewport-container');
    const metricsEl = document.getElementById('compare-metrics-container');
    if (!viewport) return;

    if (!itemBefore || !itemAfter) {
        viewport.innerHTML = '<div style="color: var(--text-secondary); padding: 20px;">Selecciona dos registros válidos</div>';
        return;
    }

    const pBefore = getEvolutionPhotos(itemBefore);
    const pAfter = getEvolutionPhotos(itemAfter);
    const photoBefore = pBefore[currentCompareAngle] || pBefore.list[0] || null;
    const photoAfter = pAfter[currentCompareAngle] || pAfter.list[0] || null;

    if (!photoBefore && !photoAfter) {
        viewport.innerHTML = `<div style="color: var(--text-secondary); padding: 20px;">No hay fotos registradas en el ángulo ${currentCompareAngle}.</div>`;
        return;
    }

    const dStrBefore = itemBefore.date || (itemBefore.dateIso ? formatDate(new Date(itemBefore.dateIso)) : 'Antes');
    const dStrAfter = itemAfter.date || (itemAfter.dateIso ? formatDate(new Date(itemAfter.dateIso)) : 'Después');

    if (currentCompareMode === 'side-by-side') {
        viewport.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; width: 100%; height: 100%; gap: 4px; padding: 4px; box-sizing: border-box;">
                <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; border-radius: 10px; overflow: hidden;">
                    ${photoBefore ? `<img src="${photoBefore}" style="width: 100%; height: 100%; object-fit: contain;">` : '<span style="color:#666; font-size:12px;">Sin foto</span>'}
                    <span style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 6px; font-size: 11px; font-weight: 700;">${dStrBefore}</span>
                </div>
                <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; border-radius: 10px; overflow: hidden;">
                    ${photoAfter ? `<img src="${photoAfter}" style="width: 100%; height: 100%; object-fit: contain;">` : '<span style="color:#666; font-size:12px;">Sin foto</span>'}
                    <span style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 6px; font-size: 11px; font-weight: 700;">${dStrAfter}</span>
                </div>
            </div>
        `;
    } else {
        // Interactive slider mode
        const pB = photoBefore || photoAfter;
        const pA = photoAfter || photoBefore;
        viewport.innerHTML = `
            <div class="compare-slider-box" id="compare-slider-box" style="background:#000;">
                <img src="${pA}" class="compare-slider-img" alt="Después">
                <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 6px; font-size: 11px; font-weight: 700; z-index: 5;">${dStrAfter}</span>
                <div class="compare-slider-before-wrapper" id="compare-slider-before-wrap">
                    <img src="${pB}" class="compare-slider-img" alt="Antes">
                    <span style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 6px; font-size: 11px; font-weight: 700; z-index: 5;">${dStrBefore}</span>
                </div>
                <div class="compare-slider-divider" id="compare-slider-divider">
                    <i class="ph-bold ph-arrows-left-right"></i>
                </div>
            </div>
        `;

        setupComparisonSlider();
    }

    // Render Metrics difference
    if (metricsEl) {
        const wDiff = (itemAfter.weight && itemBefore.weight) ? (itemAfter.weight - itemBefore.weight).toFixed(1) : null;
        const bfDiff = (itemAfter.bf && itemBefore.bf) ? (itemAfter.bf - itemBefore.bf).toFixed(1) : null;

        metricsEl.innerHTML = `
            <div><b>Antes:</b> ${itemBefore.weight || '-'} kg ${itemBefore.bf ? '('+itemBefore.bf+'%)' : ''}</div>
            <div style="font-weight: 700; color: ${wDiff && parseFloat(wDiff) < 0 ? '#10b981' : 'var(--color-accent)'};">
                ${wDiff !== null ? (wDiff > 0 ? '+' + wDiff : wDiff) + ' kg' : ''}
                ${bfDiff !== null ? ' • ' + (bfDiff > 0 ? '+' + bfDiff : bfDiff) + '%' : ''}
            </div>
            <div><b>Después:</b> ${itemAfter.weight || '-'} kg ${itemAfter.bf ? '('+itemAfter.bf+'%)' : ''}</div>
        `;
    }
};

function setupComparisonSlider() {
    const box = document.getElementById('compare-slider-box');
    const wrap = document.getElementById('compare-slider-before-wrap');
    const divider = document.getElementById('compare-slider-divider');
    if (!box || !wrap || !divider) return;

    let isDragging = false;

    function move(clientX) {
        const rect = box.getBoundingClientRect();
        let posX = clientX - rect.left;
        if (posX < 0) posX = 0;
        if (posX > rect.width) posX = rect.width;
        const pct = (posX / rect.width) * 100;
        wrap.style.width = pct + '%';
        divider.style.left = pct + '%';
    }

    divider.addEventListener('pointerdown', (e) => {
        isDragging = true;
        divider.setPointerCapture(e.pointerId);
    });

    window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        move(e.clientX);
    });

    window.addEventListener('pointerup', () => {
        isDragging = false;
    });

    box.addEventListener('click', (e) => {
        move(e.clientX);
    });
}


// --- HISTORY LOGIC ---
const renderGlobalHistory = () => {
    const list = document.getElementById('history-list');
    if (!list) return;
    list.innerHTML = '';
    
    if (!Array.isArray(state.completedWorkouts) || state.completedWorkouts.length === 0) {
        list.innerHTML = `<div class="empty-state">Aún no hay entrenamientos completados.</div>`;
        return;
    }
    
    const sorted = [...state.completedWorkouts].reverse();
    
    sorted.forEach((w) => {
        if (!w) return;
        const item = document.createElement('div');
        item.classList.add('history-item', `type-${w.type || 'hypertrophy'}`);
        
        const typeName = w.type === 'hypertrophy' ? (getT('types.hypertrophy') || 'Hipertrofia') : w.type === 'heavy' ? (getT('types.heavy') || 'Pesado') : (getT('types.intensity') || 'Alta Int.');
        
        // Accordion for History
        item.innerHTML = `
            <div class="accordion-header" style="background:transparent;" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
                <div style="flex:1;">
                    <h4 style="margin-bottom:4px; font-size:16px;">${w.name || 'Entrenamiento'}</h4>
                    <p style="font-size:12px; color:var(--text-secondary);"><i class="ph ph-calendar"></i> ${w.date || '-'} &bull; <i class="ph ph-clock"></i> ${w.duration || '00:00'} &bull; ${typeName}</p>
                </div>
                <button class="btn-icon edit-history-item-btn" style="color:var(--color-accent); margin-right:6px; z-index:10;" title="Editar Entrenamiento"><i class="ph ph-pencil-simple"></i></button>
                <button class="btn-icon share-history-story-btn" style="color:var(--color-accent); margin-right:6px; z-index:10;" title="Crear Historia"><i class="ph-bold ph-camera"></i></button>
                <button class="btn-icon delete-history-btn" style="color:var(--color-heavy); margin-right:8px; z-index:10;" title="Eliminar"><i class="ph ph-trash"></i></button>
                <i class="ph ph-caret-down"></i>
            </div>
            <div class="accordion-body"></div>
        `;

        item.querySelector('.edit-history-item-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const matchingSession = (state.sessions || []).find(s => s.id === w.sessionId || s.completedWorkoutId === w.id || (s.name === w.name && s.completed));
            const sessionToOpen = matchingSession ? matchingSession : {
                id: w.sessionId || ('sess_' + w.id),
                completedWorkoutId: w.id,
                completed: true,
                name: w.name,
                type: w.type || 'hypertrophy',
                date: w.date,
                duration: w.duration,
                exercises: JSON.parse(JSON.stringify(w.exercises || []))
            };
            startWorkout(sessionToOpen);
            toggleEditCompletedWorkout();
        });

        item.querySelector('.share-history-story-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            let totalVol = 0;
            (w.exercises || []).forEach(ex => {
                (ex.sets || []).forEach(s => {
                    totalVol += (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0);
                });
            });
            const sessionPrs = (w.prs && w.prs.length > 0) ? w.prs : [];
            openStoryCardModal({
                title: w.name || 'Entrenamiento',
                volume: totalVol.toLocaleString() + ' kg',
                duration: w.duration || '45m',
                date: w.date || new Date().toLocaleDateString(),
                prs: sessionPrs,
                exercises: w.exercises || []
            });
        });
        
        item.querySelector('.delete-history-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if(confirm('¿Eliminar este entrenamiento del historial permanentemente?')) {
                state.completedWorkouts = state.completedWorkouts.filter(cw => cw.id !== w.id);
                saveState();
                renderGlobalHistory();
            }
        });
        
        const body = item.querySelector('.accordion-body');
        const exercises = Array.isArray(w.exercises) ? w.exercises : [];
        
        exercises.forEach(ex => {
            if (!ex) return;
            let maxW = 0;
            const sets = Array.isArray(ex.sets) ? ex.sets : [];
            sets.forEach(s => { 
                if (s && s.weight && Number(s.weight) > maxW) maxW = Number(s.weight); 
            });
            
            const wPrs = Array.isArray(w.prs) ? w.prs : [];
            const exPr = wPrs.find(p => (ex.exerciseId && p.exerciseId === ex.exerciseId) || (p.exerciseName && p.exerciseName.toLowerCase() === (ex.name || '').toLowerCase()));
            const exPrTrophy = exPr ? `<span class="pr-badge" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 6px; padding: 1px 6px; font-size: 11px; font-weight: 800; margin-left: 6px; display: inline-flex; align-items: center; gap: 3px;" title="¡Récord Personal superado!"><i class="ph-fill ph-trophy"></i> PR</span>` : '';

            body.innerHTML += `<div class="history-set" style="margin-top:8px;">
                <strong style="color:var(--text-primary);">${getTrExName(ex.name)}${exPrTrophy}</strong> 
                <span style="color:var(--color-accent); font-weight:600;">Max: ${maxW}kg</span>
            </div>`;
            
            if (ex.comments && ex.comments.trim()) {
                body.innerHTML += `<div style="font-size:11.5px; color:var(--text-secondary); margin: 3px 0 6px 0; font-style:italic; background:var(--bg-surface-elevated); padding:4px 8px; border-radius:6px; border-left:3px solid var(--color-accent); display:flex; align-items:center; gap:6px;">
                    <i class="ph ph-chat-centered-text" style="font-size:13px; color:var(--color-accent);"></i>
                    <span>${ex.comments.trim()}</span>
                </div>`;
            }
            
            let prMarkedForEx = false;
            sets.forEach((s, idx) => {
                if (!s) return;
                const isSetPR = !prMarkedForEx && exPr && parseFloat(s.weight) === parseFloat(exPr.weight) && (!exPr.reps || parseFloat(s.reps) === parseFloat(exPr.reps));
                if (isSetPR) prMarkedForEx = true;
                if (isSetPR) prMarkedForEx = true;
                const setPrBadge = isSetPR ? `<span style="color:#f59e0b; font-weight:800; margin-left:4px;"><i class="ph-fill ph-trophy"></i> PR</span>` : '';
                body.innerHTML += `<div style="font-size:11px; display:flex; justify-content:space-between; color:var(--text-secondary); padding: 2px 0;">
                    <span>${getT('workout.series') || 'Serie'} ${idx+1} (${getSetTypeT(s.type)})${setPrBadge}</span> <span>${s.reps || '-'} x ${s.weight || 0}kg</span>
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
        if (typeof window.renderFullChatHistory === 'function') window.renderFullChatHistory();
        if (typeof updateAiButtonsVisibility === 'function') updateAiButtonsVisibility();
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
    
    // Setup buttons with correct type colors (Hypertrophy: Blue, Heavy: Red, Intensity: Green)
    const btnHyp = document.getElementById('btn-prog-hyp');
    const btnHeavy = document.getElementById('btn-prog-heavy');
    const btnInt = document.getElementById('btn-prog-int');
    
    if (btnHyp) {
        btnHyp.className = progressionTypeFilter === 'hypertrophy' ? 'btn-primary' : 'btn-secondary';
        btnHyp.style.backgroundColor = progressionTypeFilter === 'hypertrophy' ? 'var(--color-hypertrophy)' : '';
        btnHyp.style.borderColor = progressionTypeFilter === 'hypertrophy' ? 'var(--color-hypertrophy)' : '';
        btnHyp.style.color = progressionTypeFilter === 'hypertrophy' ? '#fff' : 'var(--text-secondary)';
    }
    if (btnHeavy) {
        btnHeavy.className = progressionTypeFilter === 'heavy' ? 'btn-primary' : 'btn-secondary';
        btnHeavy.style.backgroundColor = progressionTypeFilter === 'heavy' ? 'var(--color-heavy)' : '';
        btnHeavy.style.borderColor = progressionTypeFilter === 'heavy' ? 'var(--color-heavy)' : '';
        btnHeavy.style.color = progressionTypeFilter === 'heavy' ? '#fff' : 'var(--text-secondary)';
    }
    if (btnInt) {
        btnInt.className = progressionTypeFilter === 'intensity' ? 'btn-primary' : 'btn-secondary';
        btnInt.style.backgroundColor = progressionTypeFilter === 'intensity' ? 'var(--color-intensity)' : '';
        btnInt.style.borderColor = progressionTypeFilter === 'intensity' ? 'var(--color-intensity)' : '';
        btnInt.style.color = progressionTypeFilter === 'intensity' ? '#fff' : 'var(--text-secondary)';
    }
    
    grid.innerHTML = '';
    const groups = state.groups.filter(g => g !== 'Sin Grupo');
    groups.forEach(g => {
        const card = document.createElement('div');
        card.style.background = progressionSelectedGroup === g ? 'var(--color-accent)' : 'var(--bg-surface-elevated)';
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
        list.innerHTML = '<div style="color:var(--text-muted); font-size:13px; padding:12px; text-align:center;">No hay ejercicios para esta selección.</div>';
        return;
    }
    
    filtered.forEach(ex => {
        const item = document.createElement('div');
        item.style.padding = '10px 14px';
        item.style.background = progressionSelectedExId === ex.id ? 'rgba(37, 99, 235, 0.15)' : 'var(--bg-surface)';
        item.style.border = progressionSelectedExId === ex.id ? '1px solid var(--color-accent)' : '1px solid var(--border-color)';
        item.style.borderRadius = '8px';
        item.style.fontSize = '14px';
        item.style.fontWeight = progressionSelectedExId === ex.id ? '600' : '400';
        item.style.color = progressionSelectedExId === ex.id ? 'var(--color-accent)' : 'var(--text-primary)';
        item.style.cursor = 'pointer';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        
        item.innerHTML = `<span>${getTrExName(ex.name)}</span> ${progressionSelectedExId === ex.id ? '<i class="ph ph-check" style="font-weight:bold;"></i>' : ''}`;
        
        item.onclick = () => {
            progressionSelectedExId = ex.id;
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
        renderProgressionView();
    });
});

const updateProgressionChart = () => {
    const chartCard = document.getElementById('progression-chart-card');
    if (!chartCard) return;
    
    if (!progressionSelectedExId) {
        chartCard.style.display = 'none';
        if (progressionChartInstance) {
            progressionChartInstance.destroy();
            progressionChartInstance = null;
        }
        return;
    }
    
    chartCard.style.display = 'block';
    
    const targetEx = state.exercises.find(e => e.id === progressionSelectedExId);
    const targetName = targetEx ? targetEx.name.trim().toLowerCase() : '';
    const typeNames = {
        hypertrophy: 'Hipertrofia',
        heavy: 'Pesado',
        intensity: 'Alta intensidad'
    };
    const currentTypeName = typeNames[progressionTypeFilter] || progressionTypeFilter;
    
    // Ensure title header exists above canvas
    let titleEl = document.getElementById('progression-chart-title');
    if (!titleEl) {
        titleEl = document.createElement('h3');
        titleEl.id = 'progression-chart-title';
        titleEl.style.fontSize = '15px';
        titleEl.style.fontWeight = '700';
        titleEl.style.marginBottom = '12px';
        titleEl.style.textAlign = 'center';
        titleEl.style.color = 'var(--text-primary)';
        
        const chartCanvas = document.getElementById('progression-chart');
        if (chartCanvas && chartCanvas.parentElement) {
            chartCanvas.parentElement.insertBefore(titleEl, chartCanvas);
        }
    }
    if (titleEl && targetEx) {
        titleEl.textContent = `${getTrExName(targetEx.name)} (${currentTypeName})`;
    }
    
    const history = [];
    const allDoneSessions = [];
    if (Array.isArray(state.completedWorkouts)) allDoneSessions.push(...state.completedWorkouts);
    if (Array.isArray(state.sessions)) {
        state.sessions.filter(s => s.completed).forEach(s => {
            if (!allDoneSessions.some(w => w.id === s.id)) allDoneSessions.push(s);
        });
    }
    
    allDoneSessions.forEach(session => {
        const sType = (session.type || 'hypertrophy').toLowerCase();
        const filterType = (progressionTypeFilter || 'hypertrophy').toLowerCase();
        if (sType !== filterType) return;
        
        const sessionDate = session.date;
        let maxWeight = -1;
        let bestReps = -1;
        let found = false;
        
        (session.exercises || []).forEach(sesEx => {
            const matches = (sesEx.exerciseId && sesEx.exerciseId === progressionSelectedExId) ||
                            (targetName && sesEx.name && sesEx.name.trim().toLowerCase() === targetName);
            if (matches) {
                (sesEx.sets || []).forEach(set => {
                    const weight = parseFloat(set.weight) || 0;
                    const reps = parseFloat(set.reps) || (parseFloat(set.targetReps) || 0);
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
    
    const chartCanvas = document.getElementById('progression-chart');
    let emptyMsg = document.getElementById('progression-empty-msg');
    
    if (history.length === 0) {
        if (chartCanvas) chartCanvas.style.display = 'none';
        if (progressionChartInstance) {
            progressionChartInstance.destroy();
            progressionChartInstance = null;
        }
        if (!emptyMsg) {
            emptyMsg = document.createElement('div');
            emptyMsg.id = 'progression-empty-msg';
            chartCard.appendChild(emptyMsg);
        }
        emptyMsg.style.display = 'block';
        emptyMsg.style.cssText = 'text-align:center; padding:24px 16px; color:var(--text-secondary); font-size:14px;';
        emptyMsg.innerHTML = `No hay sesiones completadas de tipo <strong>${currentTypeName}</strong> para este ejercicio.<br><span style="font-size:12px; color:var(--text-muted); display:block; margin-top:6px;">Prueba seleccionando otro tipo arriba (Hipertrofia, Pesado o Alta intensidad) o completa una sesión en el calendario.</span>`;
        return;
    }
    
    if (emptyMsg) emptyMsg.style.display = 'none';
    if (chartCanvas) chartCanvas.style.display = 'block';
    
    history.sort((a,b) => {
        const parseDate = d => {
            const parts = d.split('/');
            if (parts.length === 3) return new Date(parts[2], parts[1] - 1, parts[0]);
            return new Date(d);
        };
        return parseDate(a.date) - parseDate(b.date);
    });
    
    const labels = history.map(h => h.date.substring(0, 5));
    const data = history.map(h => h.weight);
    const repsData = history.map(h => h.reps);
    
    const ctx = chartCanvas?.getContext('2d');
    if (!ctx) return;
    
    if (progressionChartInstance) progressionChartInstance.destroy();
    
    const chartColors = {
        hypertrophy: { line: '#2563EB', fill: 'rgba(37, 99, 235, 0.15)' },
        heavy: { line: '#DC2626', fill: 'rgba(220, 38, 38, 0.15)' },
        intensity: { line: '#10B981', fill: 'rgba(16, 185, 129, 0.15)' }
    };
    const c = chartColors[progressionTypeFilter] || chartColors.hypertrophy;
    
    progressionChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Peso Máximo (kg)',
                data: data,
                borderColor: c.line,
                backgroundColor: c.fill,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: c.line,
                pointRadius: 5,
                pointHoverRadius: 7
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
                    grid: { display: true, color: 'rgba(255,255,255,0.05)' },
                    title: { display: true, text: 'Fecha' }
                },
                y: { 
                    beginAtZero: true,
                    grid: { display: true, color: 'rgba(255,255,255,0.05)' },
                    title: { display: true, text: 'Kg' }
                }
            }
        }
    });
};

const renderEvolutionView = () => {
    const chartCard = document.getElementById('evolution-chart-card');
    const ctx = document.getElementById('evolution-chart')?.getContext('2d');
    
    const history = Array.isArray(state.evolution) ? [...state.evolution].sort((a,b) => new Date(a.dateIso || a.date) - new Date(b.dateIso || b.date)) : [];
    
    if (ctx) {
        if (history.length < 2) {
            if (chartCard) chartCard.style.display = 'none';
            if (evolutionChartInstance) {
                evolutionChartInstance.destroy();
                evolutionChartInstance = null;
            }
        } else {
            if (chartCard) chartCard.style.display = 'block';
            
            const labels = history.map(h => {
                const d = new Date(h.dateIso || h.date);
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
        }
    }
    
    renderEvolutionHistory();
};

const renderEvolutionHistory = () => {
    const container = document.getElementById('evolution-history');
    if (!container) return;
    container.innerHTML = '';
    
    if (!state.evolution || state.evolution.length === 0) {
        container.innerHTML = `<div class="empty-state" style="padding: 24px; text-align: center; color: var(--text-secondary);">No hay registros de evolución guardados.</div>`;
        return;
    }
    
    const history = [...state.evolution].sort((a,b) => new Date(b.dateIso || b.date) - new Date(a.dateIso || a.date));
    
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'evolution-item-card';
        div.style.cssText = `
            margin-bottom: 12px;
            border-radius: 16px;
            border: 1px solid var(--border-color);
            background: var(--bg-surface);
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            box-sizing: border-box;
            width: 100%;
        `;
        
        const d = item.dateIso ? new Date(item.dateIso) : new Date(item.date || Date.now());
        const dateStr = d.toLocaleDateString();
        const folderId = 'evol-details-' + (item.id || Math.random().toString(36).substr(2, 9));
        
        const hasPhotos = Array.isArray(item.photos) && item.photos.filter(Boolean).length > 0;
        const validPhotos = hasPhotos ? item.photos.filter(Boolean) : [];
        
        // Build measurements list
        const mList1 = [];
        const mList2 = [];
        
        if (item.m1) mList1.push({ label: 'Pecho', val: item.m1 });
        if (item.m2) mList1.push({ label: 'Brazo I.', val: item.m2 });
        if (item.m4) mList1.push({ label: 'Abdomen', val: item.m4 });
        if (item.m7) mList1.push({ label: 'Muslo I.', val: item.m7 });
        
        if (item.m5) mList2.push({ label: 'Cintura', val: item.m5 });
        if (item.m3) mList2.push({ label: 'Brazo D.', val: item.m3 });
        if (item.m6) mList2.push({ label: 'Caderas', val: item.m6 });
        if (item.m8) mList2.push({ label: 'Muslo D.', val: item.m8 });
        
        const hasMeasurements = mList1.length > 0 || mList2.length > 0;
        
        let photosHtml = '';
        if (validPhotos.length > 0) {
            photosHtml = `
                <div class="evol-photos-column" style="flex: 0 0 80px; width: 80px; display: flex; flex-direction: column; gap: 6px;">
                    ${validPhotos.map(photo => `
                        <img src="${photo}" 
                             style="width: 80px; height: 105px; border-radius: 10px; object-fit: cover; cursor: pointer; border: 1px solid var(--border-color); box-shadow: 0 2px 6px rgba(0,0,0,0.25);" 
                             onclick="event.stopPropagation(); document.getElementById('lightbox-img').src=this.src; document.getElementById('modal-lightbox').classList.add('active');" 
                             alt="Evolución"
                             title="Toca para ampliar">
                    `).join('')}
                </div>
            `;
        }
        
        let measurementsHtml = '';
        if (hasMeasurements) {
            measurementsHtml = `
                <div class="evol-measurements-column" style="flex: 1; min-width: 0; background: var(--bg-surface-elevated); padding: 8px 10px; border-radius: 12px; border: 1px solid var(--border-color); box-sizing: border-box;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px 8px; font-size: 11.5px; color: var(--text-secondary);">
                        <div style="display: flex; flex-direction: column; gap: 4px; min-width: 0;">
                            ${mList1.map(m => `
                                <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 2px; overflow: hidden;">
                                    <span style="font-weight: 500; color: var(--text-secondary); white-space: nowrap;">${m.label}</span>
                                    <span style="font-weight: 700; color: var(--text-primary); white-space: nowrap; margin-left: 2px;">${m.val}cm</span>
                                </div>
                            `).join('')}
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px; min-width: 0;">
                            ${mList2.map(m => `
                                <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 2px; overflow: hidden;">
                                    <span style="font-weight: 500; color: var(--text-secondary); white-space: nowrap;">${m.label}</span>
                                    <span style="font-weight: 700; color: var(--text-primary); white-space: nowrap; margin-left: 2px;">${m.val}cm</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else if (!hasPhotos) {
            measurementsHtml = `<div style="color: var(--text-secondary); font-size: 13px; font-style: italic;">Sin medidas corporales registradas.</div>`;
        }
        
        div.innerHTML = `
            <!-- Folder Top Bar (Always Visible) -->
            <div class="evol-folder-header" style="padding: 13px 15px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface-elevated); user-select: none;">
                <div style="display: flex; flex-direction: column; gap: 4px; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="ph-bold ph-folder" style="font-size: 18px; color: var(--color-accent); flex-shrink: 0;"></i>
                        <h4 style="margin: 0; font-size: 15.5px; font-weight: 700; color: var(--text-primary);">${dateStr}</h4>
                        <i id="icon-${folderId}" class="ph-bold ph-caret-down" style="font-size: 13px; color: var(--text-secondary); margin-left: 2px; transition: transform 0.2s ease;"></i>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px 10px; font-size: 13px; color: var(--text-secondary); align-items: center;">
                        <span><strong style="color: var(--text-muted);">Peso:</strong> <strong style="color: var(--text-primary);">${item.weight || '-'} kg</strong></span>
                        ${item.bf ? `<span style="color: var(--border-color);">&bull;</span> <span><strong style="color: var(--text-muted);">Grasa:</strong> <strong style="color: var(--text-primary);">${item.bf}%</strong></span>` : ''}
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-left: 8px;">
                    ${validPhotos.length > 0 ? `<span style="font-size: 12px; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.06); padding: 4px 8px; border-radius: 8px;"><i class="ph ph-camera"></i> ${validPhotos.length}</span>` : ''}
                    <button class="btn-icon delete-evol-btn" style="padding: 6px; color: var(--color-heavy); background: transparent; border: none; cursor: pointer;" title="Eliminar registro"><i class="ph ph-trash" style="font-size: 18px;"></i></button>
                </div>
            </div>
            
            <!-- Folder Expandable Content -->
            <div id="${folderId}" class="evol-folder-content" style="display: none; padding: 12px 14px; border-top: 1px solid var(--border-color); background: var(--bg-surface);">
                <div style="display: flex; gap: 12px; align-items: flex-start; width: 100%; box-sizing: border-box;">
                    ${photosHtml}
                    ${measurementsHtml}
                </div>
            </div>
        `;
        
        // Toggle folder on click
        const headerEl = div.querySelector('.evol-folder-header');
        headerEl.addEventListener('click', (e) => {
            if (e.target.closest('.delete-evol-btn') || e.target.closest('button')) return;
            const contentEl = document.getElementById(folderId);
            const iconEl = document.getElementById('icon-' + folderId);
            if (!contentEl) return;
            
            if (contentEl.style.display === 'none') {
                contentEl.style.display = 'block';
                if (iconEl) iconEl.style.transform = 'rotate(180deg)';
            } else {
                contentEl.style.display = 'none';
                if (iconEl) iconEl.style.transform = 'rotate(0deg)';
            }
        });
        
        // Delete button
        const delBtn = div.querySelector('.delete-evol-btn');
        if (delBtn) {
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteEvolution(item.id);
            });
        }
        
        container.appendChild(div);
    });
};

window.deleteEvolution = (id) => {
    const confirmMsg = getT('common.delete') ? (getT('common.delete') + '?') : '¿Eliminar este registro?';
    if (confirm(confirmMsg)) {
        state.evolution = (state.evolution || []).filter(e => String(e.id) !== String(id));
        saveState();
        renderEvolutionHistory();
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


// ============================================================
// ENFORCE STRICT NUMERIC KEYPAD & INPUT ON EVOLUTION INPUTS
// ============================================================
function setupEvolutionNumericInputs() {
    const ids = ['evolution-weight', 'evolution-bf', 'evol-m1', 'evol-m2', 'evol-m3', 'evol-m4', 'evol-m5', 'evol-m6', 'evol-m7', 'evol-m8'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        // Block non-numeric keystrokes
        el.addEventListener('keydown', function(e) {
            // Allow backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                (e.ctrlKey === true || e.metaKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            // Allow 0-9
            const isDigit = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105);
            // Allow dot or comma if not present
            const isDotOrComma = (e.key === '.' || e.key === ',' || e.keyCode === 190 || e.keyCode === 188 || e.keyCode === 110);
            if (isDotOrComma) {
                if (this.value.indexOf('.') !== -1 || this.value.indexOf(',') !== -1) {
                    e.preventDefault();
                }
                return;
            }
            if (!isDigit) {
                e.preventDefault();
            }
        });

        // Block non-numeric characters on beforeinput (mobile virtual keypad)
        el.addEventListener('beforeinput', function(e) {
            if (e.data) {
                if (!/^[0-9.,]+$/.test(e.data)) {
                    e.preventDefault();
                    return;
                }
                if ((e.data.includes('.') || e.data.includes(',')) && (this.value.includes('.') || this.value.includes(','))) {
                    e.preventDefault();
                    return;
                }
            }
        });

        // Clean up input value (converts comma to dot and removes non-numeric)
        el.addEventListener('input', function() {
            let val = this.value;
            val = val.replace(/,/g, '.');
            val = val.replace(/[^0-9.]/g, '');
            const parts = val.split('.');
            if (parts.length > 2) {
                val = parts[0] + '.' + parts.slice(1).join('');
            }
            if (this.value !== val) {
                this.value = val;
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEvolutionNumericInputs);
} else {
    setupEvolutionNumericInputs();
}


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
        
        const photosByAngle = {
            front: frontInput.files[0] ? await getBase64Image(frontInput.files[0]) : null,
            side: sideInput.files[0] ? await getBase64Image(sideInput.files[0]) : null,
            back: backInput.files[0] ? await getBase64Image(backInput.files[0]) : null
        };
        const photos = [photosByAngle.front, photosByAngle.side, photosByAngle.back].filter(Boolean);
        
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
            weight: parseFloat(String(weight).replace(',', '.')),
            bf: bf ? parseFloat(String(bf).replace(',', '.')) : null,
            photos: photos,
            photosByAngle: photosByAngle,
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
    
    const countEl = document.getElementById("export-selected-count");
    if (countEl) countEl.textContent = exportSelected.size;
    const actionCont = document.getElementById("export-action-container");
    if (actionCont) actionCont.style.display = exportSelected.size > 0 ? "flex" : "none";
};

const renderExportList = () => {
    const container = document.getElementById("export-list-container");
    const countEl = document.getElementById("export-selected-count");
    const actionCont = document.getElementById("export-action-container");
    if(!container) return;
    
    if (countEl) countEl.textContent = exportSelected.size;
    if (actionCont) actionCont.style.display = exportSelected.size > 0 ? "flex" : "none";
    
    if (window.isApkEnv) {
        const viewExport = document.getElementById("view-export");
        const modeButtons = viewExport?.querySelector('div:first-child');
        const descText = viewExport?.querySelector('p');
        if (modeButtons) modeButtons.style.display = 'none';
        if (descText) descText.style.display = 'none';
        if (actionCont) actionCont.style.display = 'none';
        container.style.display = 'none';
    }
    
    container.innerHTML = "";
    
    if (exportMode === "calendar") {
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
                <h3 style="font-size:14px; margin-top:16px; margin-bottom:8px; color:var(--text-secondary);" data-i18n="calendar.dayPlan">Plan para el día</h3>
                <div id="export-day-sessions-list" class="sessions-list"></div>
            </div>
        `;
        
        state.exportWeekStart = state.exportWeekStart || new Date(state.currentWeekStart);
        state.exportSelectedDate = state.exportSelectedDate || new Date(state.selectedDate);
        
        document.getElementById('export-prev-week')?.addEventListener('click', () => {
            state.exportWeekStart.setMonth(state.exportWeekStart.getMonth() - 1);
            window.renderExportCalendar();
        });
        document.getElementById('export-next-week')?.addEventListener('click', () => {
            state.exportWeekStart.setMonth(state.exportWeekStart.getMonth() + 1);
            window.renderExportCalendar();
        });
        window.renderExportCalendar();
        if (countEl) countEl.textContent = exportSelected.size;
        if (actionCont) actionCont.style.display = exportSelected.size > 0 ? "flex" : "none";
        return;
    }
    
    const workouts = state.sessions ? [...state.sessions] : [];
    if(workouts.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay entrenamientos planificados para exportar. Añade entrenamientos al calendario primero.</div>';
        if (actionCont) actionCont.style.display = "none";
        return;
    }
    
    if (actionCont) actionCont.style.display = "flex";
    
    let renderData = [];
    if (exportMode === "single") {
        workouts.forEach(w => renderData.push({ type: 'item', label: w.name, sub: w.type, id: w.id, dateStr: w.date }));
    } else if (exportMode === "block") {
        const blocks = {};
        workouts.forEach(w => {
            const baseName = w.name ? w.name.replace(/\s+\(.*?\d+\)$/, '').trim() : (getT('workout.title') || 'Entrenamiento');
            if(!blocks[baseName]) blocks[baseName] = [];
            blocks[baseName].push(w.id);
        });
        Object.keys(blocks).forEach(key => {
            renderData.push({ type: 'group', label: 'Bloque: ' + key, count: blocks[key].length, ids: blocks[key] });
        });
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
                <div style="flex:1;">
                    <div style="font-weight:600; font-size:15px; color:var(--text-primary);">${item.label}</div>
                    <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                        <span>📅 ${dateStr}</span> &bull; <span>${typeName}</span>
                    </div>
                </div>
                <input type="checkbox" ${isChecked ? 'checked' : ''} style="pointer-events:none; accent-color:var(--color-accent); width:18px; height:18px;">
            `;
            
            div.addEventListener("click", () => {
                if(exportSelected.has(item.id)) exportSelected.delete(item.id);
                else exportSelected.add(item.id);
                renderExportList();
            });
        } else {
            const allChecked = item.ids.every(id => exportSelected.has(id));
            const someChecked = item.ids.some(id => exportSelected.has(id));
            div.style.background = allChecked ? "var(--bg-export-selected)" : "var(--bg-surface)";
            
            div.innerHTML = `
                <div style="flex:1;">
                    <div style="font-weight:600; font-size:15px; color:var(--text-primary);">${item.label}</div>
                    <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
                        <span>${item.count} entrenamientos</span>
                    </div>
                </div>
                <input type="checkbox" ${allChecked ? 'checked' : ''} style="pointer-events:none; accent-color:var(--color-accent); width:18px; height:18px;">
            `;
            
            div.addEventListener("click", () => {
                if(allChecked) {
                    item.ids.forEach(id => exportSelected.delete(id));
                } else {
                    item.ids.forEach(id => exportSelected.add(id));
                }
                renderExportList();
            });
        }
        
        container.appendChild(div);
    });
    
    if(countEl) countEl.textContent = exportSelected.size;
    if(actionCont) actionCont.style.display = exportSelected.size > 0 ? "flex" : "none";
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

        const dropsetFormula = session.type === 'intensity' ? `<p style="margin: 8px 0 0 0; color: #4B5563; font-size: 13px;"><em>Fórmula Dropset: 20% = Peso × 0.2 &nbsp;|&nbsp; 30% = Peso × 0.3 &nbsp;|&nbsp; 40% = Peso × 0.4</em></p>` : '';
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
                `;
                const tbody = table.querySelector('tbody');
                
                (ex.sets || []).forEach((set, i) => {
                    let setTypeLabel = getSetTypeT(set.type);
                    if (set.type && ['Calentamiento', 'Aproximación', 'Efectiva', 'Al fallo', 'Dropset', 'Dropset fallo'].includes(set.type)) {
                        setTypeLabel = set.type; 
                    }
                    
                    const isDropset = set.type && (set.type.toLowerCase().includes('dropset') || set.type === 'Al fallo');
                    
                    const weightBox = isDropset ? 
                        '<div style="display:flex; flex-direction:column; align-items:center; gap:4px;"><div class="print-input-box" style="width:50px; height:18px;"></div><div class="print-input-box" style="width:50px; height:18px;"></div></div>' : 
                        '<div class="print-input-box"></div>';
                    
                    const repsBox = isDropset ? 
                        '<div style="display:flex; flex-direction:column; align-items:center; gap:4px;"><div class="print-input-box" style="width:50px; height:18px;"></div><div class="print-input-box" style="width:50px; height:18px;"></div></div>' : 
                        '<div class="print-input-box"></div>';
                    
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
    if (!session) return;
    
    editingSessionId = session.id;
    
    const modalTitle = document.getElementById('modal-routine-title');
    if (modalTitle) modalTitle.textContent = getT('modals.routine.editTitle') || 'Editar Sesión';
    
    const saveBtn = document.getElementById('btn-save-routine');
    if (saveBtn) saveBtn.textContent = getT('modals.routine.saveChanges') || 'Guardar Cambios';
    
    const rn = document.getElementById('routine-name'); if(rn) rn.value = session.name || '';
    const rd = document.getElementById('routine-duration'); if(rd) rd.value = session.duration || 1;
    const rDate = document.getElementById('routine-date'); if(rDate) rDate.value = dateToInputFormat(session.date);
    
    selectedBlockType = session.type || 'hypertrophy';
    typeBtns.forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.type === selectedBlockType);
    });
    
    // If session is completed, also look up the real completed exercises
    let sourceExercises = session.exercises || [];
    if (session.completed) {
        let compRecord = (state.completedWorkouts || []).find(w => w.id === session.id || w.sessionId === session.id);
        if (!compRecord && session.date) {
            const [y, m, d] = session.date.split('-');
            const formattedDate = `${d}/${m}/${y}`;
            compRecord = (state.completedWorkouts || []).find(w => w.name === session.name && (w.date === formattedDate || w.date === session.date));
        }
        if (compRecord && compRecord.exercises && compRecord.exercises.length > 0) {
            sourceExercises = compRecord.exercises;
        }
    }
    
    routineItems = [];
    const grouped = {};
    sourceExercises.forEach(ex => {
        const id = ex.supersetId || 'single_' + (ex.exerciseId || Math.random());
        if(!grouped[id]) grouped[id] = { isSuperset: !!ex.supersetId, name: ex.supersetName || '', exercises: [] };
        
        const dbEx = state.exercises ? state.exercises.find(e => e.id === ex.exerciseId) : null;
        grouped[id].exercises.push({
            exerciseId: ex.exerciseId,
            dbEx: dbEx || { id: ex.exerciseId, name: ex.name, group: 'Sin Grupo' },
            sets: (ex.sets || []).map(s => ({
                type: s.type || 'Efectiva',
                reps: s.reps || s.targetReps || '10',
                weight: s.weight || 0,
                weightDrop: s.weightDrop || 0,
                repsDrop: s.repsDrop || '',
                restTime: s.restTime || '60s'
            }))
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

// Nav arrows logic
const navScroll = document.getElementById('bottom-nav');
const navArrows = document.querySelectorAll('.nav-arrow');
if(navScroll && navArrows.length === 2) {
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

    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        const { App } = window.Capacitor.Plugins;
        App.addListener('appStateChange', (stateObj) => {
            if (stateObj && stateObj.isActive) {
                if (!state || !state.activeWorkoutState) {
                    if (window.manageWorkoutNotification) window.manageWorkoutNotification(false);
                }
            }
        });
        App.addListener('backButton', ({ canGoBack }) => {
            const wrapper = document.querySelector('.nav-wrapper');
            if (wrapper && wrapper.classList.contains('drawer-open')) {
                closeMobileDrawer();
                return;
            }
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                return;
            }
            if (canGoBack) {
                window.history.back();
            } else {
                App.exitApp();
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

        localStorage.setItem('gym_has_exported_json', 'true');
        localStorage.setItem('gym_last_export_json_raw', jsonStr.trim());
        localStorage.setItem('gym_last_export_date_str', new Date().toISOString().split('T')[0]);
        if (typeof unlockAchievement === 'function') unlockAchievement('data_analyst');

        
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
            
            // Check Nudo de Automatización (Exportar e importar el mismo día sin modificar nada)
            const todayStr = new Date().toISOString().split('T')[0];
            const lastExpDate = localStorage.getItem('gym_last_export_date_str');
            const lastExpRaw = localStorage.getItem('gym_last_export_json_raw');
            const importedRaw = String(ev.target.result).trim();

            if (lastExpDate === todayStr && lastExpRaw && lastExpRaw === importedRaw) {
                localStorage.setItem('gym_unlocked_automation_loop', 'true');
                if (typeof unlockAchievement === 'function') unlockAchievement('automation_loop');
            }

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


function updateMobileClass() {
    if (window.innerWidth < 768 || window.isApkEnv) {
        document.body.classList.add('is-mobile');
    } else {
        document.body.classList.remove('is-mobile');
    }
}
window.addEventListener('resize', updateMobileClass);
updateMobileClass();


// GLOBAL BACKUP LISTENERS
document.getElementById('btn-backup-export')?.addEventListener('click', async () => {
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

        localStorage.setItem('gym_has_exported_json', 'true');
        localStorage.setItem('gym_last_export_json_raw', jsonStr.trim());
        localStorage.setItem('gym_last_export_date_str', new Date().toISOString().split('T')[0]);
        if (typeof unlockAchievement === 'function') unlockAchievement('data_analyst');

        
        if (window.Capacitor && window.Capacitor.Plugins.SaveAs && window.Capacitor.Plugins.Filesystem) {
            try {
                const { Filesystem } = window.Capacitor.Plugins;
                const cacheResult = await Filesystem.writeFile({
                    path: 'temp_backup.json',
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

document.getElementById('btn-backup-import')?.addEventListener('click', () => {
    document.getElementById('file-import-json')?.click();
});

document.getElementById('file-import-json')?.addEventListener('change', (e) => {
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
            alert((getT('alerts.readError') || 'Read error: ') + err.message);
        }
    };
    reader.readAsText(file);
});
window.openDashboardModal = function() {
    document.getElementById('modal-dashboard-options').classList.add('active');
};


window.openDashboardApiKeyModal = function() {
    const key = localStorage.getItem('gemini_api_key') || localStorage.getItem('dashboard_gemini_api_key') || '';
    const input = document.getElementById('dashboard-apikey-input');
    if (input) {
        input.value = key;
        input.type = 'password';
    }
    const icon = document.getElementById('dashboard-key-vis-icon');
    if (icon) icon.className = 'ph ph-eye';
    
    const modal = document.getElementById('modal-dashboard-apikey');
    if (modal) modal.classList.add('active');
};

window.toggleDashboardKeyVisibility = function() {
    const input = document.getElementById('dashboard-apikey-input');
    const icon = document.getElementById('dashboard-key-vis-icon');
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.className = 'ph ph-eye-slash';
    } else {
        input.type = 'password';
        if (icon) icon.className = 'ph ph-eye';
    }
};

window.saveDashboardApiKey = function() {
    const input = document.getElementById('dashboard-apikey-input');
    const key = input ? input.value.trim() : '';
    if (!key) {
        alert('Por favor introduce una clave API válida.');
        return;
    }
    
    localStorage.setItem('gemini_api_key', key);
    localStorage.setItem('dashboard_gemini_api_key', key);
    
    const modal = document.getElementById('modal-dashboard-apikey');
    if (modal) modal.classList.remove('active');
    
    if (typeof showToast === 'function') showToast('Clave API guardada correctamente');
    else alert('Clave API guardada correctamente.');
    
    // If iframe is currently active, re-sync data with the new key
    const iframeModal = document.getElementById('modal-dashboard-iframe');
    const iframe = document.getElementById('dashboard-iframe');
    if (iframeModal && iframeModal.classList.contains('active') && iframe) {
        iframe.src = `https://streetoh.github.io/Gym-dashboard/#apiKey=${encodeURIComponent(key)}`;
    }
};

window.generateDashboard = function(mode) {
    document.getElementById('modal-dashboard-options').classList.remove('active');
    
    const key = localStorage.getItem('gemini_api_key') || localStorage.getItem('dashboard_gemini_api_key') || '';
    
    if (mode === 'manual') {
        const baseUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'dashboard.html' : 'https://streetoh.github.io/Gym-dashboard/';
        const targetUrl = key ? `${baseUrl}#apiKey=${encodeURIComponent(key)}` : baseUrl;
        window.open(targetUrl, '_blank');
    } else if (mode === 'auto') {
        const iframeModal = document.getElementById('modal-dashboard-iframe');
        const iframe = document.getElementById('dashboard-iframe');
        
        iframeModal.classList.add('active');
        const baseUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'dashboard.html' : 'https://streetoh.github.io/Gym-dashboard/';
        const targetUrl = key ? `${baseUrl}#apiKey=${encodeURIComponent(key)}` : baseUrl;
        iframe.src = targetUrl;
        
        const exportData = {
            gym_exercises: localStorage.getItem('gym_exercises') || '[]',
            gym_evolution: localStorage.getItem('gym_evolution') || '[]',
            gym_completed: localStorage.getItem('gym_completed') || '[]',
            apiKey: key,
            gemini_api_key: key,
            GEMINI_API_KEY: key
        };

        iframe.onload = function() {
            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                if (attempts > 20) {
                    clearInterval(interval);
                    return;
                }
                try {
                    iframe.contentWindow.postMessage({ type: 'GYM_TRACKER_DATA', data: exportData }, '*');
                    iframe.contentWindow.postMessage({ type: 'SET_API_KEY', apiKey: key, key: key }, '*');
                } catch(e) {}
            }, 500);

            window.addEventListener('message', function ackListener(event) {
                if (event.data === 'GYM_TRACKER_DATA_RECEIVED') {
                    clearInterval(interval);
                    window.removeEventListener('message', ackListener);
                }
            });
        };
    }
};

const CURRENT_APP_VERSION = '1.2.8';
function compareVersions(v1, v2) {
    const p1 = String(v1).split('.').map(Number);
    const p2 = String(v2).split('.').map(Number);
    for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
        const n1 = p1[i] || 0;
        const n2 = p2[i] || 0;
        if (n1 > n2) return 1;
        if (n1 < n2) return -1;
    }
    return 0;
}
window.latestUpdateData = null;

const DEFAULT_APP_CHANGELOG = {
    es: [
        "🏃 **Pestaña de Actividad & Samsung Health**: Integración con el sensor de podómetro del dispositivo y enlace directo con Samsung Health a través de Conexión de Salud (Health Connect), mostrando pasos diarios, distancia real en km, calorías y sesiones de entrenamiento.",
        "🏆 **36 Logros y Medallas Desbloqueables**: 10 nuevos hitos míticos implementados (Club 100 kg Banca, Respeto al Leg Day, 250t, 500t, 1 Millón de kg, Sesión Gladiador 20t, Maestro de la Biomecánica, El Escultor, Vientre de Acero, Embajador del Esfuerzo).",
        "🌐 **Apertura en Navegador por Defecto**: Todos los enlaces externos y descargas ahora se abren en el navegador predeterminado del teléfono (Samsung Internet, Brave, Firefox, etc.) mediante intent nativo de Android en lugar de forzar Chrome.",
        "🩺 **Gestor de Molestias y Articulaciones Sensibles**: Registra molestias en hombros, codos, rodillas, lumbares, muñecas o caderas y recibe avisos inteligentes preventivos durante el entreno ('⚠️ Cuidado: Hombro') con sugerencias de variantes seguras sustituibles en 1 toque.",
        "👻 **Modo Fantasma en Vivo (Ghost Workout)**: Durante tu entrenamiento en vivo, cada serie muestra de forma tenue tu marca anterior ('Última vez: X kg × Y reps') para saber exactamente qué tienes que batir, con autorrellenado automático en 1 toque al tocar la marca.",
        "📸 **Tarjeta para Historias (PNG Nativo)**: Compartición directa del archivo de imagen a Instagram Stories, WhatsApp y Telegram.",
        "💾 **Descarga Directa en Dispositivo**: Guardado directo de la imagen de tarjeta de entreno en la galería/almacenamiento.",
        "✏️ **Edición de Sesiones Finalizadas**: Rediseño limpio de cabecera con botón de editar y distintivo verde sin textos redundantes.",
        "🔄 **Sincronización Total con el Historial**: Actualización en tiempo real de pesos y repeticiones editadas en el historial y marcas personales (PRs)."
],
    en: [
        "🏃 **Activity Tab & Samsung Health Integration**: Native pedometer hardware sensor integration and direct Samsung Health linking via Health Connect, displaying daily steps, real distance in km, calories, and training sessions.",
        "🏆 **36 Unlockable Achievements & Trophies**: 10 new iconic milestones implemented (Bench Club 100 kg, Leg Day Respect, 250t, 500t, 1M kg, Gladiator Session 20t, Technique Master, The Sculptor, Steel Waist, Story Ambassador).",
        "🌐 **Default Browser Support**: External links and downloads now open in your phone's selected default browser (Samsung Internet, Brave, Firefox, etc.) via native Android intent instead of forcing Chrome.",
        "🩺 **Joint Discomfort & Injury Manager**: Log active discomfort in shoulders, elbows, knees, lower back, wrists, or hips and receive live preventive alerts ('⚠️ Careful: Shoulder') with 1-tap safe exercise replacements.",
        "👻 **Live Ghost Workout Mode**: Every set displays your previous performance ('Last time: X kg × Y reps') so you know what to beat, with 1-tap autofill by tapping the ghost tag.",
        "📸 **Story Cards (Native PNG)**: Share real image files directly to Instagram Stories, WhatsApp, and Telegram.",
        "💾 **Direct Device Download**: Working save image to device/gallery button.",
        "✏️ **Completed Session Editing**: Clean header layout without redundant text.",
        "🔄 **Full History Sync**: Real-time update of edited weights and reps in the History tab and PRs."
]
};

function getChangelogForLanguage(changelogData, lang) {
    const currentLang = lang || (typeof state !== 'undefined' && state.language) || 'es';
    
    // 1. If changelogData is an object with language keys (es, en, ru, et, uk)
    if (changelogData && typeof changelogData === 'object' && !Array.isArray(changelogData)) {
        if (changelogData[currentLang] && Array.isArray(changelogData[currentLang]) && changelogData[currentLang].length > 0) {
            return changelogData[currentLang];
        }
        if (DEFAULT_APP_CHANGELOG[currentLang]) {
            return DEFAULT_APP_CHANGELOG[currentLang];
        }
        if (changelogData['es'] && Array.isArray(changelogData['es']) && changelogData['es'].length > 0) {
            return changelogData['es'];
        }
    }
    
    // 2. If changelogData is an array of strings
    if (Array.isArray(changelogData) && changelogData.length > 0) {
        if (currentLang !== 'es' && DEFAULT_APP_CHANGELOG[currentLang]) {
            return DEFAULT_APP_CHANGELOG[currentLang];
        }
        return changelogData;
    }
    
    // 3. If changelogData is a string
    if (typeof changelogData === 'string' && changelogData.trim()) {
        if (currentLang !== 'es' && DEFAULT_APP_CHANGELOG[currentLang]) {
            return DEFAULT_APP_CHANGELOG[currentLang];
        }
        return changelogData.split(/\r?\n|•/).map(s => s.trim()).filter(s => s.length > 0);
    }
    
    // 4. Default to built-in changelog for current language
    if (DEFAULT_APP_CHANGELOG[currentLang]) {
        return DEFAULT_APP_CHANGELOG[currentLang];
    }
    
    return [getT('update.defaultChangelog') || 'Mejoras de rendimiento y correcciones de errores.'];
}

window.renderUpdateModalContent = function(data) {
    if (!data) return;
    window.latestUpdateData = data;
    
    if (typeof closeMobileDrawer === 'function') {
        closeMobileDrawer();
    }
    
    const versionTag = document.getElementById('update-modal-version-tag');
    if (versionTag) {
        const vLabel = getT('update.versionLabel') || 'Versión';
        versionTag.textContent = `${vLabel} ${data.version || CURRENT_APP_VERSION}${data.releaseDate ? ' (' + data.releaseDate + ')' : ''}`;
    }

    const isNewer = compareVersions(data.version || CURRENT_APP_VERSION, CURRENT_APP_VERSION) > 0;
    const modalTitle = document.getElementById('update-modal-title') || document.querySelector('#modal-update [data-i18n="update.title"]');
    const modalDesc = document.getElementById('update-modal-desc') || document.querySelector('#modal-update [data-i18n="update.desc"]');
    if (modalTitle) {
        modalTitle.textContent = isNewer ? (getT('update.title') || '¡Nueva versión disponible!') : (getT('update.currentTitle') || 'Novedades de la versión');
    }
    if (modalDesc) {
        modalDesc.textContent = isNewer ? (getT('update.desc') || 'Novedades y mejoras de esta actualización:') : (getT('update.upToDateDesc') || 'Tu aplicación está actualizada a la última versión.');
    }
    
    const changelogEl = document.getElementById('update-changelog');
    if (changelogEl) {
        const currentLang = (typeof state !== 'undefined' && state.language) || 'es';
        const changelogItems = getChangelogForLanguage(data.changelog, currentLang);
        let changelogHtml = '';
                if (Array.isArray(changelogItems) && changelogItems.length > 0) {
            const parsedItems = [];
            changelogItems.forEach(rawItem => {
                if (typeof rawItem !== 'string') return;
                let clean = rawItem.replace(/^Versi[oó]n\s+[\d\.]+\s*:\s*/i, '').replace(/^Version\s+[\d\.]+\s*:\s*/i, '');
                if (/\d+\)\s*/.test(clean)) {
                    const parts = clean.split(/\s*\d+\)\s*/).map(p => p.trim()).filter(p => p.length > 0);
                    parsedItems.push(...parts);
                } else {
                    parsedItems.push(clean.trim());
                }
            });

            const getFeatureIcon = (text) => {
                const t = text.toLowerCase();
                if (t.includes('mapa') || t.includes('anatóm') || t.includes('anatomical') || t.includes('fatiga')) {
                    return { icon: 'ph-person-simple', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' };
                }
                if (t.includes('serie') || t.includes('volumen') || t.includes('volume') || t.includes('optima')) {
                    return { icon: 'ph-chart-bar', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
                }
                if (t.includes('logro') || t.includes('trofeo') || t.includes('achievement') || t.includes('medal')) {
                    return { icon: 'ph-trophy', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
                }
                if (t.includes('historia') || t.includes('story') || t.includes('instagram') || t.includes('tarjeta')) {
                    return { icon: 'ph-camera', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)' };
                }
                if (t.includes('teclado') || t.includes('keypad') || t.includes('número') || t.includes('numeric')) {
                    return { icon: 'ph-keyboard', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' };
                }
                if (t.includes('disco') || t.includes('barra') || t.includes('plate') || t.includes('calculadora')) {
                    return { icon: 'ph-barbell', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' };
                }
                return { icon: 'ph-sparkle', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' };
            };

            changelogHtml = '<div style="display: flex; flex-direction: column; gap: 8px; text-align: left;">' +
                parsedItems.map(item => {
                    // Clean emoji if at start
                    let content = item.replace(/^[\uD800-\uDBFF][\uDC00-\uDFFF]|^[\u2600-\u27BF]|^[\uD83C-\uD83E][\uDD00-\uDFFF]\s*/, '').trim();
                    const styleMeta = getFeatureIcon(content);

                    content = content.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: var(--text-primary); font-weight: 700;">$1</strong>');
                    if (!content.includes('<strong>') && content.includes(':')) {
                        const colonIdx = content.indexOf(':');
                        const title = content.substring(0, colonIdx).trim();
                        const rest = content.substring(colonIdx + 1).trim();
                        content = `<strong style="color: var(--text-primary); font-weight: 700;">${title}:</strong> ${rest}`;
                    }

                    return `<div style="display: flex; gap: 12px; align-items: center; padding: 10px 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: 14px;">
                        <div style="width: 32px; height: 32px; border-radius: 10px; background: ${styleMeta.bg}; color: ${styleMeta.color}; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">
                            <i class="ph-bold ${styleMeta.icon}"></i>
                        </div>
                        <div style="font-size: 13px; line-height: 1.45; color: var(--text-secondary); flex: 1;">${content}</div>
                    </div>`;
                }).join('') +
                '</div>';
        } else {
            const fallbackText = getT('update.defaultChangelog') || 'Mejoras de rendimiento y correcciones de errores.';
            changelogHtml = `<p style="margin:0; text-align:left; font-size: 13.5px; color: var(--text-secondary); font-style: italic;">${fallbackText}</p>`;
        }
        changelogEl.innerHTML = changelogHtml;
    }
    
    const isNative = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
    const actionContainer = document.getElementById('update-action-container');
    const laterBtn = document.querySelector('#modal-update .close-modal.btn-secondary');
    if (laterBtn) {
        laterBtn.textContent = getT('update.later') || 'Quizás más tarde';
        laterBtn.style.setProperty('display', isNewer ? 'block' : 'none', 'important');
    }

    if (actionContainer) {
        if (isNewer) {
            if (isNative) {
                actionContainer.innerHTML = `<button class="btn-primary full-width" style="margin-bottom: 10px; padding: 14px; background-color: #10b981; border-color: #10b981; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer;" onclick="openExternalUrl((window.latestUpdateData && window.latestUpdateData.downloadUrl) || 'https://github.com/Streetoh/Gym-tracker/releases')">
                        <i class="ph ph-download-simple" style="font-size: 20px;"></i> <span>${getT('update.download') || 'Descargar actualización'}</span>
                    </button>`;
            } else {
                actionContainer.innerHTML = `<button class="btn-primary full-width" style="margin-bottom: 10px; padding: 14px; background-color: #10b981; border-color: #10b981; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer;" onclick="forceReloadApp()">
                        <i class="ph ph-arrows-clockwise" style="font-size: 20px;"></i> <span>${getT('update.reload') || 'Actualizar aplicación'}</span>
                    </button>`;
            }
        } else {
            // Already up to date
            actionContainer.innerHTML = `<button class="btn-primary full-width" style="margin-bottom: 10px; padding: 14px; background-color: #10b981; border-color: #10b981; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer;" onclick="document.getElementById('modal-update').classList.remove('active')">
                    <i class="ph ph-check-circle" style="font-size: 20px;"></i> <span>${getT('update.understood') || 'Entendido'}</span>
                </button>`;
        }
    }
};

window.openUpdateModal = function(customData) {
    if (typeof closeMobileDrawer === 'function') {
        closeMobileDrawer();
    }
    const dataToUse = customData || window.latestUpdateData || {
        version: CURRENT_APP_VERSION,
        releaseDate: "02/09/2026",
        changelog: DEFAULT_APP_CHANGELOG
    };
    window.renderUpdateModalContent(dataToUse);
    const modalUpdate = document.getElementById('modal-update');
    if (modalUpdate) modalUpdate.classList.add('active');
};

async function checkForUpdates(manual = false) {
    try {
        if (!manual && !window.isApkEnv && (window.location.hostname === '127.0.0.1' || window.location.port === '8080' || window.location.port === '5500')) {
            return; // In localhost development on desktop browser, do not auto show update modal
        }

        const checkBtn = document.getElementById('btn-manual-check-update');
        let origBtnHtml = '';
        if (manual && checkBtn) {
            origBtnHtml = checkBtn.innerHTML;
            checkBtn.innerHTML = `<i class="ph ph-spinner ph-spin"></i> <span>${getT('update.checking') || 'Comprobando...'}</span>`;
            checkBtn.disabled = true;
        }

        const endpoints = [
            'https://raw.githubusercontent.com/Streetoh/Gym-tracker/main/version.json?t=' + Date.now(),
            'https://streetoh.github.io/Gym-tracker/version.json?t=' + Date.now()
        ];

        let data = null;
        let lastError = null;

        for (const url of endpoints) {
            try {
                // Try Capacitor native HTTP plugin first if available
                if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.CapacitorHttp) {
                    try {
                        const capRes = await window.Capacitor.Plugins.CapacitorHttp.get({
                            url: url,
                            headers: { 'Cache-Control': 'no-cache' },
                            connectTimeout: 6000,
                            readTimeout: 6000
                        });
                        if (capRes && capRes.data) {
                            data = typeof capRes.data === 'string' ? JSON.parse(capRes.data) : capRes.data;
                            if (data && data.version) break;
                        }
                    } catch (capErr) {
                        console.warn('CapacitorHttp error, falling back to fetch:', capErr);
                    }
                }

                // Standard fetch fallback with timeout
                const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
                const timeoutId = ctrl ? setTimeout(() => ctrl.abort(), 6000) : null;
                const response = await fetch(url, {
                    cache: 'no-store',
                    signal: ctrl ? ctrl.signal : undefined
                });
                if (timeoutId) clearTimeout(timeoutId);
                if (response && response.ok) {
                    data = await response.json();
                    if (data && data.version) break;
                }
            } catch (err) {
                lastError = err;
                console.warn('Fetch error for url:', url, err);
            }
        }

        if (manual && checkBtn) {
            checkBtn.innerHTML = origBtnHtml;
            checkBtn.disabled = false;
        }

        if (!data || !data.version) {
            if (manual) {
                alert(getT('update.errorConnect') || 'No se pudo conectar con GitHub para comprobar la versión. Comprueba tu conexión a internet.');
            }
            return;
        }

        window.latestUpdateData = data;
        const cmp = compareVersions(data.version, CURRENT_APP_VERSION);

        if (cmp > 0) {
            // New version available!
            if (typeof closeMobileDrawer === 'function') closeMobileDrawer();
            window.renderUpdateModalContent(data);
            const modalUpdate = document.getElementById('modal-update');
            if (modalUpdate) modalUpdate.classList.add('active');
            
            const btnUpdate = document.getElementById('btn-header-update');
            if (btnUpdate) btnUpdate.style.display = 'flex';
        } else {
            if (manual) {
                if (typeof closeMobileDrawer === 'function') closeMobileDrawer();
                window.renderUpdateModalContent(data);
                const modalUpdate = document.getElementById('modal-update');
                if (modalUpdate) modalUpdate.classList.add('active');

                const upToDateTemplate = getT('update.upToDateAlert') || '✅ Tu aplicación está al día.\n\nVersión instalada: v{vInstalled}\nVersión en GitHub: v{vGitHub}\n\nNo hay nuevas actualizaciones.';
                const msg = upToDateTemplate.replace('{vInstalled}', CURRENT_APP_VERSION).replace('{vGitHub}', data.version);
                alert(msg);
            }
        }
    } catch (e) {
        console.error('No se pudo comprobar la versión', e);
        if (manual) {
            const checkBtn = document.getElementById('btn-manual-check-update');
            if (checkBtn) {
                checkBtn.innerHTML = `<i class="ph ph-arrows-clockwise"></i> <span>${getT('update.checkBtn') || 'Comprobando...'}</span>`;
                checkBtn.disabled = false;
            }
            const errPrefix = getT('update.errorGeneric') || 'Error al comprobar actualizaciones: ';
            alert(errPrefix + (e.message || e));
        }
    }
}
window.checkForUpdates = checkForUpdates;

function checkFirstRunOfVersion() {
    const seenVersion = localStorage.getItem('gym_seen_version');
    if (seenVersion !== CURRENT_APP_VERSION) {
        localStorage.setItem('gym_seen_version', CURRENT_APP_VERSION);
        if (seenVersion) {
            setTimeout(() => {
                window.openUpdateModal();
            }, 1200);
        }
    }
}
checkFirstRunOfVersion();

window.forceReloadApp = function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.update();
            }
        });
    }
    window.location.reload(true);
};

setTimeout(checkForUpdates, 1500);

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        checkForUpdates();
    }
});

document.getElementById('exercise-search')?.addEventListener('input', () => { renderExercises(); });


// ==========================================
// FINAL INITIALIZATION AT END OF FILE
// ==========================================
function initApp() {
    state.currentWeekStart = getMonday(state.selectedDate);
    updateLanguageUI();
    
    if (typeof renderCalendar === 'function') renderCalendar();
    if (typeof renderExercises === 'function') renderExercises();
    if (typeof renderGlobalHistory === 'function') renderGlobalHistory();
    if (typeof renderProgressionView === 'function') renderProgressionView();
    if (typeof renderEvolutionHistory === 'function') renderEvolutionHistory();
    if (typeof renderEvolutionView === 'function') renderEvolutionView();
    if (typeof renderExportList === 'function') renderExportList();

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
    
    
    // Check first run welcome tutorial
    if (!localStorage.getItem('gym_tutorial_seen')) {
        setTimeout(() => {
            if (typeof openWelcomeTutorialModal === 'function') {
                openWelcomeTutorialModal();
            }
        }, 1200);
    }

    const calNav = document.querySelector('.nav-item[data-target="view-calendar"]');
    if (calNav) {
        calNav.click();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

window.renderWorkout = renderWorkout;


// =========================================================================
// 1. PROGRESSION TABS NAVIGATION
// =========================================================================
window.switchProgressionTab = function(tabName) {
    document.querySelectorAll('.prog-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.prog-subview').forEach(view => {
        view.style.display = 'none';
        view.classList.remove('active');
    });

    const activeBtn = document.getElementById('tab-btn-prog-' + tabName);
    const activeView = document.getElementById('prog-subview-' + tabName);
    if (activeBtn) activeBtn.classList.add('active');
    if (activeView) {
        activeView.style.display = 'block';
        activeView.classList.add('active');
    }

    if (tabName === 'fatigue') {
        refreshMuscleFatigueMap();
        renderWeeklyMuscleVolume();
    } else if (tabName === 'achievements') {
        renderAchievementsView();
    }
};

// =========================================================================
// 2. ANATOMICAL MUSCLE FATIGUE MAP
// =========================================================================
const ANATOMY_SVG_MARKUP = `
<div class="anatomical-map-container" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-bottom: 16px;">
    <!-- VISTA FRONTAL -->
    <div class="anatomy-view-card" style="flex: 1; min-width: 240px; max-width: 310px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 18px; padding: 14px; text-align: center;">
        <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Vista Frontal</div>
        <svg viewBox="0 0 200 360" class="anatomy-svg" style="width: 100%; max-height: 270px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));">
            <g class="body-base" fill="#1e293b" stroke="#334155" stroke-width="1.5">
                <ellipse cx="100" cy="30" rx="16" ry="20" />
                <path d="M92 48 L108 48 L110 60 L90 60 Z" />
            </g>
            <path id="mf-delts-left" class="muscle-group" data-muscle="Hombros" d="M68 62 C62 65 52 78 54 94 C56 100 62 102 65 92 C68 84 70 74 72 65 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-delts-right" class="muscle-group" data-muscle="Hombros" d="M132 62 C138 65 148 78 146 94 C144 100 138 102 135 92 C132 84 130 74 128 65 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-chest-left" class="muscle-group" data-muscle="Pecho" d="M72 65 C78 64 96 66 98 78 C98 90 94 98 75 98 C68 98 67 85 70 75 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-chest-right" class="muscle-group" data-muscle="Pecho" d="M128 65 C122 64 104 66 102 78 C102 90 106 98 125 98 C132 98 133 85 130 75 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-biceps-left" class="muscle-group" data-muscle="Bíceps" d="M54 97 C50 105 48 118 52 130 C56 134 60 130 63 122 C66 114 64 104 62 96 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-biceps-right" class="muscle-group" data-muscle="Bíceps" d="M146 97 C150 105 152 118 148 130 C144 134 140 130 137 122 C134 114 136 104 138 96 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-forearms-left" class="muscle-group" data-muscle="Bíceps" d="M50 133 C45 145 42 165 44 175 C48 178 52 172 56 160 C60 148 57 138 54 133 Z" fill="#1e293b" stroke="#334155" stroke-width="1" />
            <path id="mf-forearms-right" class="muscle-group" data-muscle="Bíceps" d="M150 133 C155 145 158 165 156 175 C152 178 148 172 144 160 C140 148 143 138 146 133 Z" fill="#1e293b" stroke="#334155" stroke-width="1" />
            <path id="mf-abs" class="muscle-group" data-muscle="Core" d="M78 102 C85 101 115 101 122 102 C125 125 120 148 116 162 C108 165 92 165 84 162 C80 148 75 125 78 102 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-quads-left" class="muscle-group" data-muscle="Cuádriceps" d="M76 170 C84 170 96 172 96 195 C96 225 90 248 86 260 C80 262 76 250 72 230 C68 210 70 185 76 170 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-quads-right" class="muscle-group" data-muscle="Cuádriceps" d="M124 170 C116 170 104 172 104 195 C104 225 110 248 114 260 C120 262 124 250 128 230 C132 210 130 185 124 170 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-calves-left" class="muscle-group" data-muscle="Gemelos" d="M72 272 C78 272 84 275 84 290 C84 315 80 335 78 345 C74 345 70 330 68 310 C66 295 68 280 72 272 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mf-calves-right" class="muscle-group" data-muscle="Gemelos" d="M128 272 C122 272 116 275 116 290 C116 315 120 335 122 345 C126 345 130 330 132 310 C134 295 132 280 128 272 Z" fill="#334155" stroke="#475569" stroke-width="1" />
        </svg>
    </div>

    <!-- VISTA DORSAL -->
    <div class="anatomy-view-card" style="flex: 1; min-width: 240px; max-width: 310px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 18px; padding: 14px; text-align: center;">
        <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Vista Dorsal</div>
        <svg viewBox="0 0 200 360" class="anatomy-svg" style="width: 100%; max-height: 270px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));">
            <g class="body-base" fill="#1e293b" stroke="#334155" stroke-width="1.5">
                <ellipse cx="100" cy="30" rx="16" ry="20" />
                <path d="M92 48 L108 48 L110 60 L90 60 Z" />
            </g>
            <path id="mb-traps" class="muscle-group" data-muscle="Espalda" d="M90 55 L110 55 L126 65 L100 95 L74 65 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-delts-left" class="muscle-group" data-muscle="Hombros" d="M68 64 C62 67 52 80 54 94 C56 100 62 100 66 92 C70 82 72 72 74 65 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-delts-right" class="muscle-group" data-muscle="Hombros" d="M132 64 C138 67 148 80 146 94 C144 100 138 100 134 92 C130 82 128 72 126 65 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-lats-left" class="muscle-group" data-muscle="Espalda" d="M74 72 C78 88 82 110 96 125 C92 135 84 138 78 132 C70 120 66 98 70 80 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-lats-right" class="muscle-group" data-muscle="Espalda" d="M126 72 C122 88 118 110 104 125 C108 135 116 138 122 132 C130 120 134 98 130 80 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-triceps-left" class="muscle-group" data-muscle="Tríceps" d="M54 96 C50 106 48 118 52 130 C56 132 60 128 63 120 C66 112 64 102 62 96 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-triceps-right" class="muscle-group" data-muscle="Tríceps" d="M146 96 C150 106 152 118 148 130 C144 132 140 128 137 120 C134 112 136 102 138 96 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-lumbar" class="muscle-group" data-muscle="Espalda" d="M88 126 C96 124 104 124 112 126 C116 142 114 154 110 162 C104 164 96 164 90 162 C86 154 84 142 88 126 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-glutes-left" class="muscle-group" data-muscle="Glúteos" d="M74 165 C82 164 96 166 98 180 C98 198 90 208 76 208 C68 206 66 185 74 165 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-glutes-right" class="muscle-group" data-muscle="Glúteos" d="M126 165 C118 164 104 166 102 180 C102 198 110 208 124 208 C132 206 134 185 126 165 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-hamstrings-left" class="muscle-group" data-muscle="Isquios" d="M76 210 C86 210 94 214 94 230 C94 245 88 258 84 265 C78 265 74 252 72 235 C70 220 72 212 76 210 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-hamstrings-right" class="muscle-group" data-muscle="Isquios" d="M124 210 C114 210 106 214 106 230 C106 245 112 258 116 265 C122 265 126 252 128 235 C130 220 128 212 124 210 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-calves-left" class="muscle-group" data-muscle="Gemelos" d="M72 272 C78 272 84 276 84 292 C84 315 80 335 78 345 C74 345 70 330 68 310 C66 295 68 280 72 272 Z" fill="#334155" stroke="#475569" stroke-width="1" />
            <path id="mb-calves-right" class="muscle-group" data-muscle="Gemelos" d="M128 272 C122 272 116 276 116 292 C116 315 120 335 122 345 C126 345 130 330 132 310 C134 295 132 280 128 272 Z" fill="#334155" stroke="#475569" stroke-width="1" />
        </svg>
    </div>
</div>`;

window.normalizeMuscleName = function(name) {
    if (!name) return 'Pecho';
    const n = name.toLowerCase();
    if (n.includes('pecho') || n.includes('pectoral') || n.includes('press banca') || n.includes('aperturas')) return 'Pecho';
    if (n.includes('espalda') || n.includes('dorsal') || n.includes('remo') || n.includes('jalón') || n.includes('dominada') || n.includes('trapecio') || n.includes('lumbar')) return 'Espalda';
    if (n.includes('hombro') || n.includes('deltoides') || n.includes('press militar') || n.includes('lateral')) return 'Hombros';
    if (n.includes('bíceps') || n.includes('biceps') || n.includes('curl') || n.includes('antebrazo')) return 'Bíceps';
    if (n.includes('tríceps') || n.includes('triceps') || n.includes('fondos') || n.includes('extensión polea')) return 'Tríceps';
    if (n.includes('cuádriceps') || n.includes('cuadriceps') || n.includes('sentadilla') || n.includes('prensa') || n.includes('extensión de piernas') || n.includes('pierna')) return 'Cuádriceps';
    if (n.includes('isquio') || n.includes('femoral') || n.includes('peso muerto') || n.includes('curl femoral')) return 'Isquios';
    if (n.includes('gemelo') || n.includes('pantorrilla') || n.includes('elevación de talones')) return 'Gemelos';
    if (n.includes('glúteo') || n.includes('gluteo') || n.includes('hip thrust')) return 'Glúteos';
    if (n.includes('core') || n.includes('abdomen') || n.includes('abdominal') || n.includes('plancha') || n.includes('crunch')) return 'Core';
    return 'Pecho';
};


function getWorkoutTimestamp(w) {
    if (!w) return 0;
    if (w.completedAt && !isNaN(Number(w.completedAt))) return Number(w.completedAt);
    if (w.dateTimestamp && !isNaN(Number(w.dateTimestamp))) return Number(w.dateTimestamp);
    if (w.id && !isNaN(Number(w.id)) && Number(w.id) > 1600000000000) return Number(w.id);
    if (w.date) {
        if (typeof w.date === 'string' && w.date.includes('/')) {
            const parts = w.date.split('/');
            if (parts.length === 3) {
                const d = parseInt(parts[0], 10);
                const m = parseInt(parts[1], 10) - 1;
                const y = parseInt(parts[2], 10);
                const dt = new Date(y, m, d);
                if (!isNaN(dt.getTime())) return dt.getTime();
            }
        }
        if (typeof w.date === 'string' && w.date.includes('-')) {
            const parts = w.date.split('-');
            if (parts.length === 3) {
                if (parts[0].length === 4) {
                    const dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
                    if (!isNaN(dt.getTime())) return dt.getTime();
                } else {
                    const dt = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
                    if (!isNaN(dt.getTime())) return dt.getTime();
                }
            }
        }
        const parsed = new Date(w.date).getTime();
        if (!isNaN(parsed)) return parsed;
    }
    return 0;
}
window.getWorkoutTimestamp = getWorkoutTimestamp;

window.refreshMuscleFatigueMap = function() {
    const mount = document.getElementById('anatomy-silhouette-mount');
    if (!mount) return;
    if (!mount.innerHTML || mount.innerHTML.trim() === '') {
        mount.innerHTML = ANATOMY_SVG_MARKUP;
    }

    const completed = state.completedWorkouts || [];
    const now = Date.now();
    const muscleStats = {
        'Pecho': { lastTime: 0, weeklySets: 0 },
        'Espalda': { lastTime: 0, weeklySets: 0 },
        'Hombros': { lastTime: 0, weeklySets: 0 },
        'Bíceps': { lastTime: 0, weeklySets: 0 },
        'Tríceps': { lastTime: 0, weeklySets: 0 },
        'Cuádriceps': { lastTime: 0, weeklySets: 0 },
        'Isquios': { lastTime: 0, weeklySets: 0 },
        'Gemelos': { lastTime: 0, weeklySets: 0 },
        'Glúteos': { lastTime: 0, weeklySets: 0 },
        'Core': { lastTime: 0, weeklySets: 0 }
    };

    // Calculate start of current week (Monday 00:00:00)
    const monday = new Date();
    const day = monday.getDay();
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    const mondayTime = monday.getTime();

    completed.forEach(w => {
        const wTime = getWorkoutTimestamp(w);
        if (!w.exercises) return;

        w.exercises.forEach(ex => {
            const m = normalizeMuscleName(ex.group || ex.name);
            if (!muscleStats[m]) muscleStats[m] = { lastTime: 0, weeklySets: 0 };

            if (wTime > muscleStats[m].lastTime) {
                muscleStats[m].lastTime = wTime;
            }

            if (wTime >= mondayTime) {
                const count = (ex.sets || []).filter(s => s.type !== 'Calentamiento' && s.type !== 'Aproximación').length;
                muscleStats[m].weeklySets += count;
            }
        });
    });

    // Color mapping
    const getMuscleColor = (mName) => {
        const stat = muscleStats[mName];
        if (!stat || !stat.lastTime) return '#10b981'; // Fresh / Ready
        const hoursAgo = (now - stat.lastTime) / (1000 * 60 * 60);
        if (hoursAgo < 24) return '#ef4444'; // Fatigued
        if (hoursAgo < 60) return '#f59e0b'; // Recovering
        return '#10b981'; // Ready
    };

    // Apply colors to all SVG muscle paths
    if (typeof renderWeeklyMuscleVolume === 'function') renderWeeklyMuscleVolume();
    document.querySelectorAll('.anatomy-svg .muscle-group').forEach(el => {
        const muscle = el.getAttribute('data-muscle');
        const color = getMuscleColor(muscle);
        el.setAttribute('fill', color);

        el.onclick = () => {
            document.querySelectorAll('.anatomy-svg .muscle-group').forEach(m => m.classList.remove('active'));
            el.classList.add('active');

            const stat = muscleStats[muscle] || { lastTime: 0, weeklySets: 0 };
            const detailEl = document.getElementById('anatomy-selected-muscle-detail');
            if (!detailEl) return;

            let statusText = '';
            let statusColor = '#10b981';
            let lastTrainedText = '';

            if (!stat.lastTime) {
                statusText = getT('anatomy.noData') || 'Sin entrenar en los últimos 7 días. Completamente recuperado.';
                lastTrainedText = 'Ninguno reciente';
            } else {
                const hoursAgo = Math.round((now - stat.lastTime) / (1000 * 60 * 60));
                if (hoursAgo < 24) {
                    statusText = getT('anatomy.statusFatigued') || 'Fatigado recientemente. Recomendado descansar.';
                    statusColor = '#ef4444';
                    lastTrainedText = 'Hace ' + hoursAgo + ' horas';
                } else if (hoursAgo < 60) {
                    statusText = getT('anatomy.statusRecov') || 'En fase de recuperación activa.';
                    statusColor = '#f59e0b';
                    lastTrainedText = 'Hace ' + Math.round(hoursAgo / 24) + ' días (' + hoursAgo + 'h)';
                } else {
                    statusText = getT('anatomy.statusReady') || 'Listo para entrenar con alta intensidad.';
                    statusColor = '#10b981';
                    lastTrainedText = 'Hace ' + Math.round(hoursAgo / 24) + ' días';
                }
            }

            detailEl.innerHTML = `
                <div style="font-weight: 700; font-size: 14px; color: ${statusColor}; margin-bottom: 4px;">${muscle}</div>
                <div style="font-size: 12px; margin-bottom: 4px;"><strong>Estado:</strong> ${statusText}</div>
                <div style="display:flex; justify-content:center; gap:16px; font-size: 11px; opacity:0.85;">
                    <span><strong>Último entreno:</strong> ${lastTrainedText}</span>
                    <span><strong>Series esta semana:</strong> ${stat.weeklySets} series</span>
                </div>
            `;
        };
    });
};

// =========================================================================
// 3. WEEKLY MUSCLE VOLUME MONITOR
// =========================================================================
window.renderWeeklyMuscleVolume = function() {
    const container = document.getElementById('weekly-volume-bars-container');
    if (!container) return;

    const completed = state.completedWorkouts || [];
    const monday = new Date();
    const day = monday.getDay();
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    const mondayTime = monday.getTime();

    const targets = {
        'Pecho': 14,
        'Espalda': 16,
        'Cuádriceps': 14,
        'Hombros': 14,
        'Bíceps': 12,
        'Tríceps': 12,
        'Isquios': 12,
        'Glúteos': 10,
        'Core': 8,
        'Gemelos': 8
    };

    const currentSets = {};
    Object.keys(targets).forEach(m => currentSets[m] = 0);

    completed.forEach(w => {
        const wTime = getWorkoutTimestamp(w);
        if (wTime >= mondayTime && w.exercises) {
            w.exercises.forEach(ex => {
                const m = normalizeMuscleName(ex.group || ex.name);
                if (currentSets[m] !== undefined) {
                    const workingSets = (ex.sets || []).filter(s => s.type !== 'Calentamiento' && s.type !== 'Aproximación').length;
                    currentSets[m] += workingSets;
                }
            });
        }
    });

    let html = '';
    Object.entries(targets).forEach(([muscle, target]) => {
        const done = currentSets[muscle] || 0;
        const pct = Math.min(Math.round((done / target) * 100), 100);
        
        let badgeColor = '#3b82f6';
        let badgeText = getT('volume.optimal') || 'Óptimo';
        let barGradient = 'linear-gradient(90deg, #3b82f6, #10b981)';

        if (done < target * 0.6) {
            badgeColor = '#f59e0b';
            badgeText = getT('volume.low') || 'Bajo estímulo';
            barGradient = 'linear-gradient(90deg, #f59e0b, #eab308)';
        } else if (done > target * 1.3) {
            badgeColor = '#8b5cf6';
            badgeText = getT('volume.high') || 'Volumen alto';
            barGradient = 'linear-gradient(90deg, #10b981, #8b5cf6)';
        }

        html += `
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: 12px; padding: 10px 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${muscle}</span>
                        <span style="font-size: 10px; padding: 2px 6px; border-radius: 6px; background: rgba(59, 130, 246, 0.15); color: ${badgeColor}; font-weight: 600;">${badgeText}</span>
                    </div>
                    <span style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">${done} / ${target} series</span>
                </div>
                <div style="height: 6px; background: var(--bg-surface); border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: ${pct}%; background: ${barGradient}; border-radius: 3px; transition: width 0.4s ease;"></div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
};

// =========================================================================
// 4. ACHIEVEMENTS SYSTEM (50 LOGROS & MEDALLAS MULTI-IDIOMA CON PROGRESO)
// =========================================================================

const ACHIEVEMENTS_CATALOG = [
    { id: 'first_workout', title: "Primer paso", desc: "Completa tu primer entrenamiento en la app.", icon: 'ph-sneaker', tier: 'bronze', category: 'streak' },
    { id: 'strength_60', title: "Club 60 kg", desc: "Levanta 60 kg o más en cualquier ejercicio.", icon: 'ph-barbell', tier: 'bronze', category: 'strength' },
    { id: 'strength_80', title: "Club 80 kg", desc: "Levanta 80 kg o más en cualquier ejercicio.", icon: 'ph-barbell', tier: 'silver', category: 'strength' },
    { id: 'strength_100', title: "Club 100 kg", desc: "¡Tres dígitos! Levanta 100 kg o más en un ejercicio.", icon: 'ph-trophy', tier: 'gold', category: 'strength' },
    { id: 'bench_100', title: "Club de la banca (100 kg)", desc: "¡El rito sagrado! Levanta 100 kg o más en press de banca.", icon: 'ph-barbell', tier: 'gold', category: 'strength' },
    { id: 'strength_120', title: "Club 120 kg", desc: "Fuerza pesada: levanta 120 kg o más.", icon: 'ph-crown', tier: 'diamond', category: 'strength' },
    { id: 'strength_140', title: "Club 140 kg+", desc: "Fuerza de élite: supera los 140 kg en un levantamiento.", icon: 'ph-fire', tier: 'master', category: 'strength' },
    { id: 'streak_3_week', title: "Semana de fuego", desc: "Completa al menos 3 entrenamientos en la misma semana.", icon: 'ph-flame', tier: 'bronze', category: 'streak' },
    { id: 'perfect_week', title: "Semana perfecta", desc: "Completa 4 o más entrenamientos en una semana.", icon: 'ph-lightning', tier: 'silver', category: 'streak' },
    { id: 'leg_day_respect', title: "Respeto al leg day", desc: "Completa al menos 4 entrenamientos de pierna en el mismo mes.", icon: 'ph-shield-check', tier: 'silver', category: 'streak' },
    { id: 'workouts_5', title: "Iniciación constante", desc: "Completa 5 entrenamientos registrados en tu historial.", icon: 'ph-medal', tier: 'bronze', category: 'streak' },
    { id: 'workouts_15', title: "Hábito forjado", desc: "Completa 15 entrenamientos totales.", icon: 'ph-medal', tier: 'silver', category: 'streak' },
    { id: 'workouts_30', title: "Guerrero del hierro", desc: "Completa 30 entrenamientos en tu trayectoria.", icon: 'ph-medal', tier: 'gold', category: 'streak' },
    { id: 'workouts_50', title: "Medio centenar", desc: "Alcanza 50 entrenamientos completados.", icon: 'ph-crown', tier: 'diamond', category: 'streak' },
    { id: 'workouts_100', title: "Centurión legendario", desc: "¡100 entrenamientos! Hito reservado a los más disciplinados.", icon: 'ph-trophy', tier: 'master', category: 'streak' },
    { id: 'volume_5k', title: "Camión ligero", desc: "Mueve más de 5.000 kg de volumen total en una sola sesión.", icon: 'ph-truck', tier: 'bronze', category: 'volume' },
    { id: 'volume_10k', title: "Grúa pesada", desc: "Mueve más de 10.000 kg de volumen total en una sesión.", icon: 'ph-gauge', tier: 'silver', category: 'volume' },
    { id: 'volume_15k', title: "Titán del acero", desc: "Mueve más de 15.000 kg de volumen en una sesión épica.", icon: 'ph-rocket', tier: 'gold', category: 'volume' },
    { id: 'volume_20k_session', title: "Sesión gladiador", desc: "Mueve más de 20.000 kg de volumen total en una sola sesión.", icon: 'ph-sword', tier: 'gold', category: 'volume' },
    { id: 'volume_total_100k', title: "Rompedor de cargas", desc: "Acumula más de 100.000 kg de volumen total histórico.", icon: 'ph-mountains', tier: 'diamond', category: 'volume' },
    { id: 'volume_250k', title: "El peso de un tren", desc: "Acumula más de 250.000 kg de volumen total levantado.", icon: 'ph-train', tier: 'gold', category: 'volume' },
    { id: 'volume_500k', title: "El Boeing 747", desc: "Medio millón de kilos: acumula más de 500.000 kg de volumen histórico.", icon: 'ph-airplane-tilt', tier: 'diamond', category: 'volume' },
    { id: 'volume_1m', title: "Millonario del acero", desc: "¡1.000.000 kg! Hito legendario reservado a auténticos titanes.", icon: 'ph-crown', tier: 'master', category: 'volume' },
    { id: 'to_failure', title: "Hasta el límite", desc: "Registra tu primera serie llevada \"Al fallo\".", icon: 'ph-skull', tier: 'bronze', category: 'effort' },
    { id: 'dropset_done', title: "Maestro del dropset", desc: "Completa una serie dropset utilizando la calculadora %.", icon: 'ph-percent', tier: 'bronze', category: 'effort' },
    { id: 'first_pr', title: "Rompe-límites", desc: "Consigue tu primer récord personal (PR) histórico.", icon: 'ph-trend-up', tier: 'silver', category: 'pr' },
    { id: 'pr_triple', title: "Lluvia de récords", desc: "Supera 3 o más récords personales en un solo entrenamiento.", icon: 'ph-sparkle', tier: 'gold', category: 'pr' },
    { id: 'early_bird', title: "Madrugador", desc: "Completa un entrenamiento antes de las 9:00 AM.", icon: 'ph-sun-horizon', tier: 'bronze', category: 'lifestyle' },
    { id: 'night_owl', title: "Guerrero nocturno", desc: "Completa un entrenamiento después de las 20:30 PM.", icon: 'ph-moon-stars', tier: 'bronze', category: 'lifestyle' },
    { id: 'iron_hour', title: "Sesión de hierro", desc: "Completa un entrenamiento con más de 60 minutos de duración.", icon: 'ph-timer', tier: 'silver', category: 'lifestyle' },
    { id: 'first_evolution', title: "Seguimiento riguroso", desc: "Guarda tu primer registro de peso o medidas corporales.", icon: 'ph-scales', tier: 'bronze', category: 'lifestyle' },
    { id: 'photo_sculptor', title: "El escultor", desc: "Registra fotos de evolución corporal y compáralas en el visor antes/después.", icon: 'ph-camera', tier: 'silver', category: 'lifestyle' },
    { id: 'steel_waist', title: "Vientre de acero", desc: "Registra una reducción de 2 cm o más en tu medida de cintura.", icon: 'ph-arrows-in-line-horizontal', tier: 'gold', category: 'lifestyle' },
    { id: 'technique_master', title: "Maestro de la biomecánica", desc: "Consulta la técnica y ejecución de al menos 10 ejercicios diferentes.", icon: 'ph-book-open-text', tier: 'silver', category: 'lifestyle' },
    { id: 'story_ambassador', title: "Embajador del esfuerzo", desc: "Genera y comparte una tarjeta de historias para mostrar tu entrenamiento.", icon: 'ph-share-network', tier: 'bronze', category: 'lifestyle' },
    { id: 'full_body_week', title: "Atleta completo", desc: "Entrena pecho, espalda, hombros y piernas en la misma semana.", icon: 'ph-person-simple-run', tier: 'gold', category: 'lifestyle' },
    { id: 'data_analyst', title: "Analista de datos", desc: "Exportar el historial de entrenamientos a JSON por primera vez para alimentar el dashboard.", icon: 'ph-chart-pie-slice', tier: 'bronze', category: 'special' },
    { id: 'the_architect', title: "El arquitecto", desc: "Crear y guardar una rutina compleja de varios meses utilizando los grupos de ejercicios colapsables.", icon: 'ph-tree-structure', tier: 'gold', category: 'special' },
    { id: 'controlled_chaos', title: "Caos controlado", desc: "Utilizar la función de reordenar ejercicios en medio de una sesión activa para adaptarte a un gimnasio lleno.", icon: 'ph-shuffle', tier: 'bronze', category: 'effort' },
    { id: 'server_overload', title: "Sobrecarga del servidor", desc: "Superar las 1.000 series totales registradas en la base de datos de la app.", icon: 'ph-hard-drives', tier: 'diamond', category: 'volume' },
    { id: 'iron_discipline', title: "Disciplina de hierro", desc: "Entrenar en tu cumpleaños o en un día festivo nacional de tu país.", icon: 'ph-calendar-check', tier: 'gold', category: 'streak' },
    { id: 'grindelwald_legs', title: "Piernas de Grindelwald", desc: "Acumular 50.000 kg de volumen en sentadillas, prensa y zancadas como para escalar una montaña.", icon: 'ph-mountains', tier: 'master', category: 'volume' },
    { id: 'skipped_leg_day', title: "Día de pierna saltado", desc: "Salta tu primer entrenamiento de pierna.", icon: 'ph-prohibit', tier: 'bronze', category: 'special' },
    { id: 'paladin_aura', title: "Aura del paladín", desc: "Completar 20 sesiones enfocadas en el core y músculos estabilizadores.", icon: 'ph-shield-plus', tier: 'gold', category: 'strength' },
    { id: 'cleave_strike', title: "Golpe de rajar (Cleave)", desc: "Batir récords personales en 3 ejercicios compuestos diferentes en una sola sesión.", icon: 'ph-sword', tier: 'diamond', category: 'pr' },
    { id: 'total_sync_365', title: "Sincronización total", desc: "Tener registros en la base de datos JSON que abarquen los 365 días del año.", icon: 'ph-globe', tier: 'master', category: 'streak' },
    { id: 'gemini_oracle', title: "Oráculo de Gemini", desc: "Utilizar la integración de IA por primera vez para analizar tu rendimiento o generar una rutina.", icon: 'ph-sparkle', tier: 'bronze', category: 'special' },
    { id: 'assembler_optimizer', title: "Optimizador de ensamblador", desc: "Terminar una rutina en un 15% menos de tiempo manteniendo el mismo volumen.", icon: 'ph-timer', tier: 'gold', category: 'effort' },
    { id: 'carlos_awakening', title: "El despertar de Carlo", desc: "Registra un entrenamiento de al menos media hora un domingo a las 03:00 AM. \"Dónde demonios estoy?\"", icon: 'ph-mask-happy', tier: 'gold', category: 'pr' },
    { id: 'automation_loop', title: "Nudo de automatización", desc: "Exportar la base de datos JSON e importarla de nuevo el mismo día sin haber modificado nada.", icon: 'ph-arrows-counter-clockwise', tier: 'silver', category: 'special' }
];
window.ACHIEVEMENTS_CATALOG = ACHIEVEMENTS_CATALOG;

const ACHIEVEMENT_TRANSLATIONS = {
  "first_workout": {
    "es": {
      "title": "Primer paso",
      "desc": "Completa tu primer entrenamiento en la app."
    },
    "en": {
      "title": "First step",
      "desc": "Complete your first workout in the app."
    },
    "ru": {
      "title": "Первый шаг",
      "desc": "Завершите свою первую тренировку в приложении."
    },
    "et": {
      "title": "Esimene samm",
      "desc": "Lõpeta oma esimene treening rakenduses."
    },
    "uk": {
      "title": "Перший крок",
      "desc": "Завершіть своє перше тренування у додатку."
    }
  },
  "strength_60": {
    "es": {
      "title": "Club 60 kg",
      "desc": "Levanta 60 kg o más en cualquier ejercicio."
    },
    "en": {
      "title": "60 kg club",
      "desc": "Lift 60 kg or more in any exercise."
    },
    "ru": {
      "title": "Клуб 60 кг",
      "desc": "Поднимите 60 кг или более в любом упражнении."
    },
    "et": {
      "title": "60 kg klubi",
      "desc": "Tõsta 60 kg või rohkem mis tahes harjutuses."
    },
    "uk": {
      "title": "Клуб 60 кг",
      "desc": "Підніміть 60 кг або більше у будь-якій вправі."
    }
  },
  "strength_80": {
    "es": {
      "title": "Club 80 kg",
      "desc": "Levanta 80 kg o más en cualquier ejercicio."
    },
    "en": {
      "title": "80 kg club",
      "desc": "Lift 80 kg or more in any exercise."
    },
    "ru": {
      "title": "Клуб 80 кг",
      "desc": "Поднимите 80 кг или более в любом упражнении."
    },
    "et": {
      "title": "80 kg klubi",
      "desc": "Tõsta 80 kg või rohkem mis tahes harjutuses."
    },
    "uk": {
      "title": "Клуб 80 кг",
      "desc": "Підніміть 80 кг або більше у будь-якій вправі."
    }
  },
  "strength_100": {
    "es": {
      "title": "Club 100 kg",
      "desc": "¡Tres dígitos! Levanta 100 kg o más en un ejercicio."
    },
    "en": {
      "title": "100 kg club",
      "desc": "Triple digits! Lift 100 kg or more in an exercise."
    },
    "ru": {
      "title": "Клуб 100 кг",
      "desc": "Трехзначный вес! Поднимите 100 кг или более."
    },
    "et": {
      "title": "100 kg klubi",
      "desc": "Kolmekohaline number! Tõsta 100 kg või rohkem."
    },
    "uk": {
      "title": "Клуб 100 кг",
      "desc": "Тризначна вага! Підніміть 100 кг або більше."
    }
  },
  "bench_100": {
    "es": {
      "title": "Club de la banca (100 kg)",
      "desc": "¡El rito sagrado! Levanta 100 kg o más en press de banca."
    },
    "en": {
      "title": "Bench club (100 kg)",
      "desc": "The sacred rite! Lift 100 kg or more in bench press."
    },
    "ru": {
      "title": "Клуб жима (100 кг)",
      "desc": "Священный рубеж! Выжмите 100 кг или более в жиме лежа."
    },
    "et": {
      "title": "Surumise klubi (100 kg)",
      "desc": "Püha verstapost! Suru lamades 100 kg või rohkem."
    },
    "uk": {
      "title": "Клуб жиму (100 кг)",
      "desc": "Священний рубіж! Витисніть 100 кг або більше у жимі лежачи."
    }
  },
  "strength_120": {
    "es": {
      "title": "Club 120 kg",
      "desc": "Fuerza pesada: levanta 120 kg o más."
    },
    "en": {
      "title": "120 kg club",
      "desc": "Heavy duty: lift 120 kg or more."
    },
    "ru": {
      "title": "Клуб 120 кг",
      "desc": "Тяжелый вес: поднимите 120 кг или более."
    },
    "et": {
      "title": "120 kg klubi",
      "desc": "Raskekaal: tõsta 120 kg või rohkem."
    },
    "uk": {
      "title": "Клуб 120 кг",
      "desc": "Важка вага: підніміть 120 кг або більше."
    }
  },
  "strength_140": {
    "es": {
      "title": "Club 140 kg+",
      "desc": "Fuerza de élite: supera los 140 kg en un levantamiento."
    },
    "en": {
      "title": "140 kg+ club",
      "desc": "Elite strength: surpass 140 kg in a lift."
    },
    "ru": {
      "title": "Клуб 140+ кг",
      "desc": "Элитная сила: преодолейте 140 кг в подъеме."
    },
    "et": {
      "title": "140 kg+ klubi",
      "desc": "Eliitjõud: ületa 140 kg mis tahes tõstes."
    },
    "uk": {
      "title": "Клуб 140+ кг",
      "desc": "Елітна сила: подолайте 140 кг у підйомі."
    }
  },
  "streak_3_week": {
    "es": {
      "title": "Semana de fuego",
      "desc": "Completa al menos 3 entrenamientos en la misma semana."
    },
    "en": {
      "title": "Fire week",
      "desc": "Complete at least 3 workouts in the same week."
    },
    "ru": {
      "title": "Огненная неделя",
      "desc": "Выполните не менее 3 тренировок за одну неделю."
    },
    "et": {
      "title": "Tulenädal",
      "desc": "Lõpeta vähemalt 3 treeningut samal nädalal."
    },
    "uk": {
      "title": "Вогняний тиждень",
      "desc": "Виконайте щонайменше 3 тренування за один тиждень."
    }
  },
  "perfect_week": {
    "es": {
      "title": "Semana perfecta",
      "desc": "Completa 4 o más entrenamientos en una semana."
    },
    "en": {
      "title": "Perfect week",
      "desc": "Complete 4 or more workouts in a single week."
    },
    "ru": {
      "title": "Идеальная неделя",
      "desc": "Выполните 4 или более тренировок за неделю."
    },
    "et": {
      "title": "Täiuslik nädal",
      "desc": "Lõpeta 4 või enam treeningut ühe nädala jooksul."
    },
    "uk": {
      "title": "Ідеальний тиждень",
      "desc": "Виконайте 4 або більше тренувань за тиждень."
    }
  },
  "leg_day_respect": {
    "es": {
      "title": "Respeto al leg day",
      "desc": "Completa al menos 4 entrenamientos de pierna en el mismo mes."
    },
    "en": {
      "title": "Respect the leg day",
      "desc": "Complete at least 4 leg workouts in the same month."
    },
    "ru": {
      "title": "Уважение к дню ног",
      "desc": "Выполните не менее 4 тренировок ног за один месяц."
    },
    "et": {
      "title": "Jalapäeva austus",
      "desc": "Tee samal kuul vähemalt 4 jalatreeningut."
    },
    "uk": {
      "title": "Повага до дня ніг",
      "desc": "Виконайте щонайменше 4 тренування ніг за один місяць."
    }
  },
  "workouts_5": {
    "es": {
      "title": "Iniciación constante",
      "desc": "Completa 5 entrenamientos registrados en tu historial."
    },
    "en": {
      "title": "Consistent start",
      "desc": "Complete 5 workouts logged in your history."
    },
    "ru": {
      "title": "Уверенное начало",
      "desc": "Завершите 5 тренировок в истории."
    },
    "et": {
      "title": "Järjekindel algus",
      "desc": "Lõpeta 5 treeningut oma ajaloos."
    },
    "uk": {
      "title": "Впевнений початок",
      "desc": "Завершіть 5 тренувань в історії."
    }
  },
  "workouts_15": {
    "es": {
      "title": "Hábito forjado",
      "desc": "Completa 15 entrenamientos totales."
    },
    "en": {
      "title": "Habit forged",
      "desc": "Complete 15 total workouts."
    },
    "ru": {
      "title": "Привычка создана",
      "desc": "Завершите 15 тренировок всего."
    },
    "et": {
      "title": "Harjumus loodud",
      "desc": "Lõpeta kokku 15 treeningut."
    },
    "uk": {
      "title": "Звичка сформована",
      "desc": "Завершіть 15 тренувань загалом."
    }
  },
  "workouts_30": {
    "es": {
      "title": "Guerrero del hierro",
      "desc": "Completa 30 entrenamientos en tu trayectoria."
    },
    "en": {
      "title": "Iron warrior",
      "desc": "Complete 30 workouts in your journey."
    },
    "ru": {
      "title": "Железный воин",
      "desc": "Завершите 30 тренировок на своем пути."
    },
    "et": {
      "title": "Rauasõdalane",
      "desc": "Lõpeta oma teekonnal 30 treeningut."
    },
    "uk": {
      "title": "Залізний воїн",
      "desc": "Завершіть 30 тренувань на своєму шляху."
    }
  },
  "workouts_50": {
    "es": {
      "title": "Medio centenar",
      "desc": "Alcanza 50 entrenamientos completados."
    },
    "en": {
      "title": "Half a hundred",
      "desc": "Reach 50 completed workouts."
    },
    "ru": {
      "title": "Полсотни",
      "desc": "Достигните 50 завершенных тренировок."
    },
    "et": {
      "title": "Poolsada",
      "desc": "Jõua 50 lõpetatud treeninguni."
    },
    "uk": {
      "title": "Півсотні",
      "desc": "Досягніть 50 завершених тренувань."
    }
  },
  "workouts_100": {
    "es": {
      "title": "Centurión legendario",
      "desc": "¡100 entrenamientos! Hito reservado a los más disciplinados."
    },
    "en": {
      "title": "Legendary centurion",
      "desc": "100 workouts! Milestone reserved for the disciplined."
    },
    "ru": {
      "title": "Легендарный центурион",
      "desc": "100 тренировок! Рубеж самых дисциплинированных."
    },
    "et": {
      "title": "Legendaarne tsenturioon",
      "desc": "100 treeningut! Tõelise distsipliini verstapost."
    },
    "uk": {
      "title": "Легендарний центуріон",
      "desc": "100 тренувань! Рубіж найбільш дисциплінованих."
    }
  },
  "volume_5k": {
    "es": {
      "title": "Camión ligero",
      "desc": "Mueve más de 5.000 kg de volumen total en una sola sesión."
    },
    "en": {
      "title": "Light truck",
      "desc": "Move over 5,000 kg of total volume in a single session."
    },
    "ru": {
      "title": "Легкий грузовик",
      "desc": "Поднимите более 5 000 кг общего объема за тренировку."
    },
    "et": {
      "title": "Kerge veok",
      "desc": "Tõsta ühel treeningul üle 5 000 kg kogumahtu."
    },
    "uk": {
      "title": "Легка вантажівка",
      "desc": "Підніміть понад 5 000 кг загального обсягу за одне тренування."
    }
  },
  "volume_10k": {
    "es": {
      "title": "Grúa pesada",
      "desc": "Mueve más de 10.000 kg de volumen total en una sesión."
    },
    "en": {
      "title": "Heavy crane",
      "desc": "Move over 10,000 kg of total volume in a session."
    },
    "ru": {
      "title": "Тяжелый кран",
      "desc": "Поднимите более 10 000 кг объема за тренировку."
    },
    "et": {
      "title": "Raske kraana",
      "desc": "Tõsta ühel treeningul üle 10 000 kg mahtu."
    },
    "uk": {
      "title": "Важкий кран",
      "desc": "Підніміть понад 10 000 кг обсягу за одне тренування."
    }
  },
  "volume_15k": {
    "es": {
      "title": "Titán del acero",
      "desc": "Mueve más de 15.000 kg de volumen en una sesión épica."
    },
    "en": {
      "title": "Steel titan",
      "desc": "Move over 15,000 kg of volume in an epic session."
    },
    "ru": {
      "title": "Стальной титан",
      "desc": "Поднимите более 15 000 кг объема в эпической сессии."
    },
    "et": {
      "title": "Terastitaan",
      "desc": "Tõsta eepilisel treeningul üle 15 000 kg mahtu."
    },
    "uk": {
      "title": "Сталевий титан",
      "desc": "Підніміть понад 15 000 кг обсягу в епічній сесії."
    }
  },
  "volume_20k_session": {
    "es": {
      "title": "Sesión gladiador",
      "desc": "Mueve más de 20.000 kg de volumen total en una sola sesión."
    },
    "en": {
      "title": "Gladiator session",
      "desc": "Move over 20,000 kg of total volume in a single session."
    },
    "ru": {
      "title": "Сессия гладиатора",
      "desc": "Преодолейте 20 000 кг объема за одну тренировку."
    },
    "et": {
      "title": "Gladiaatori treening",
      "desc": "Tõsta ühel treeningul üle 20 000 kg kogumahtu."
    },
    "uk": {
      "title": "Сесія гладіатора",
      "desc": "Подолайте 20 000 кг обсягу за одне тренування."
    }
  },
  "volume_total_100k": {
    "es": {
      "title": "Rompedor de cargas",
      "desc": "Acumula más de 100.000 kg de volumen total histórico."
    },
    "en": {
      "title": "Load breaker",
      "desc": "Accumulate over 100,000 kg of total career volume."
    },
    "ru": {
      "title": "Сокрушитель тяжестей",
      "desc": "Накопите более 100 000 кг суммарного объема."
    },
    "et": {
      "title": "Raskuste murdja",
      "desc": "Kogu kokku üle 100 000 kg kogumahtu."
    },
    "uk": {
      "title": "Нищівник навантажень",
      "desc": "Накопичіть понад 100 000 кг сумарного обсягу."
    }
  },
  "volume_250k": {
    "es": {
      "title": "El peso de un tren",
      "desc": "Acumula más de 250.000 kg de volumen total levantado."
    },
    "en": {
      "title": "Weight of a train",
      "desc": "Accumulate over 250,000 kg of total lifted volume."
    },
    "ru": {
      "title": "Вес поезда",
      "desc": "Накопите более 250 000 кг общего поднятого веса."
    },
    "et": {
      "title": "Rongi raskus",
      "desc": "Kogu kokku üle 250 000 kg tõstetud mahtu."
    },
    "uk": {
      "title": "Вага поїзда",
      "desc": "Накопичіть понад 250 000 кг загальної піднятої ваги."
    }
  },
  "volume_500k": {
    "es": {
      "title": "El Boeing 747",
      "desc": "Medio millón de kilos: acumula más de 500.000 kg de volumen histórico."
    },
    "en": {
      "title": "The Boeing 747",
      "desc": "Half a million kilos: accumulate over 500,000 kg lifetime volume."
    },
    "ru": {
      "title": "Боинг 747",
      "desc": "Полмиллиона килограммов: преодолейте рубеж в 500 000 кг."
    },
    "et": {
      "title": "Boeing 747",
      "desc": "Pool miljonit kilo: kogu üle 500 000 kg kogumahtu."
    },
    "uk": {
      "title": "Боїнг 747",
      "desc": "Півмільйона кілограмів: подолайте рубіж у 500 000 кг."
    }
  },
  "volume_1m": {
    "es": {
      "title": "Millonario del acero",
      "desc": "¡1.000.000 kg! Hito legendario reservado a auténticos titanes."
    },
    "en": {
      "title": "Steel millionaire",
      "desc": "1,000,000 kg! Legendary milestone for true titans."
    },
    "ru": {
      "title": "Стальной миллионер",
      "desc": "1 000 000 кг! Легендарный рубеж для истинных титанов."
    },
    "et": {
      "title": "Terase miljonär",
      "desc": "1 000 000 kg! Legendaarne saavutus tõelistele titaanidele."
    },
    "uk": {
      "title": "Сталевий мільйонер",
      "desc": "1 000 000 кг! Легендарний рубіж для справжніх титанів."
    }
  },
  "to_failure": {
    "es": {
      "title": "Hasta el límite",
      "desc": "Registra tu primera serie llevada \"Al fallo\"."
    },
    "en": {
      "title": "To the limit",
      "desc": "Log your first set taken \"To failure\"."
    },
    "ru": {
      "title": "До предела",
      "desc": "Запишите свой первый подход \"До отказа\"."
    },
    "et": {
      "title": "Viimse piirini",
      "desc": "Märgi oma esimene seeria \"Suutlikkuseni\"."
    },
    "uk": {
      "title": "До межі",
      "desc": "Запишіть свій перший підхід \"До відмови\"."
    }
  },
  "dropset_done": {
    "es": {
      "title": "Maestro del dropset",
      "desc": "Completa una serie dropset utilizando la calculadora %."
    },
    "en": {
      "title": "Dropset master",
      "desc": "Complete a dropset using the % calculator."
    },
    "ru": {
      "title": "Мастер дропсетов",
      "desc": "Завершите дропсет с помощью калькулятора %."
    },
    "et": {
      "title": "Dropseti meister",
      "desc": "Tee dropset kasutades % kalkulaatorit."
    },
    "uk": {
      "title": "Майстер дропсетів",
      "desc": "Виконайте дропсет за допомогою калькулятора %."
    }
  },
  "first_pr": {
    "es": {
      "title": "Rompe-límites",
      "desc": "Consigue tu primer récord personal (PR) histórico."
    },
    "en": {
      "title": "Limit breaker",
      "desc": "Achieve your first personal record (PR)."
    },
    "ru": {
      "title": "Преодоление предела",
      "desc": "Установите свой первый персональный рекорд (PR)."
    },
    "et": {
      "title": "Piiride ületaja",
      "desc": "Saavuta oma esimene isiklik rekord (PR)."
    },
    "uk": {
      "title": "Подолання меж",
      "desc": "Встановіть свій перший особистий рекорд (PR)."
    }
  },
  "pr_triple": {
    "es": {
      "title": "Lluvia de récords",
      "desc": "Supera 3 o más récords personales en un solo entrenamiento."
    },
    "en": {
      "title": "Record shower",
      "desc": "Break 3 or more personal records in a single workout."
    },
    "ru": {
      "title": "Ливень рекордов",
      "desc": "Побейте 3 или более рекордов за одну тренировку."
    },
    "et": {
      "title": "Rekordite sadu",
      "desc": "Ületa ühel treeningul 3 või enam isiklikku rekordit."
    },
    "uk": {
      "title": "Злива рекордів",
      "desc": "Побийте 3 або більше рекордів за одне тренування."
    }
  },
  "early_bird": {
    "es": {
      "title": "Madrugador",
      "desc": "Completa un entrenamiento antes de las 9:00 AM."
    },
    "en": {
      "title": "Early bird",
      "desc": "Complete a workout before 9:00 AM."
    },
    "ru": {
      "title": "Ранняя пташка",
      "desc": "Завершите тренировку до 9:00 утра."
    },
    "et": {
      "title": "Varajane ärkaja",
      "desc": "Lõpeta treening enne kella 9:00 hommikul."
    },
    "uk": {
      "title": "Рання пташка",
      "desc": "Завершіть тренування до 9:00 ранку."
    }
  },
  "night_owl": {
    "es": {
      "title": "Guerrero nocturno",
      "desc": "Completa un entrenamiento después de las 20:30 PM."
    },
    "en": {
      "title": "Night warrior",
      "desc": "Complete a workout after 8:30 PM."
    },
    "ru": {
      "title": "Ночной воин",
      "desc": "Завершите тренировку после 20:30 вечера."
    },
    "et": {
      "title": "Öine sõdalane",
      "desc": "Lõpeta treening pärast kella 20:30 õhtul."
    },
    "uk": {
      "title": "Нічний воїн",
      "desc": "Завершіть тренування після 20:30 вечора."
    }
  },
  "iron_hour": {
    "es": {
      "title": "Sesión de hierro",
      "desc": "Completa un entrenamiento con más de 60 minutos de duración."
    },
    "en": {
      "title": "Iron session",
      "desc": "Complete a workout lasting over 60 minutes."
    },
    "ru": {
      "title": "Железная сессия",
      "desc": "Завершите тренировку продолжительностью более 60 минут."
    },
    "et": {
      "title": "Rauasessioon",
      "desc": "Lõpeta treening, mille kestus on üle 60 minuti."
    },
    "uk": {
      "title": "Залізна сесія",
      "desc": "Завершіть тренування тривалістю понад 60 хвилин."
    }
  },
  "first_evolution": {
    "es": {
      "title": "Seguimiento riguroso",
      "desc": "Guarda tu primer registro de peso o medidas corporales."
    },
    "en": {
      "title": "Rigorous tracking",
      "desc": "Save your first body weight or measurement entry."
    },
    "ru": {
      "title": "Строгий контроль",
      "desc": "Сохраните первую запись веса или замеров тела."
    },
    "et": {
      "title": "Range jälgimine",
      "desc": "Salvesta oma esimene kehakaalu või mõõtude kanne."
    },
    "uk": {
      "title": "Суворий контроль",
      "desc": "Збережіть перший запис ваги або вимірів тіла."
    }
  },
  "photo_sculptor": {
    "es": {
      "title": "El escultor",
      "desc": "Registra fotos de evolución corporal y compáralas en el visor antes/después."
    },
    "en": {
      "title": "The sculptor",
      "desc": "Log progress photos and compare them in the before/after viewer."
    },
    "ru": {
      "title": "Скульптор",
      "desc": "Сделайте фото прогресса и сравните их до/после."
    },
    "et": {
      "title": "Skulptor",
      "desc": "Lisa arengufotod ja võrdle neid enne/pärast vaates."
    },
    "uk": {
      "title": "Скульптор",
      "desc": "Зробіть фото прогресу та порівняйте їх до/після."
    }
  },
  "steel_waist": {
    "es": {
      "title": "Vientre de acero",
      "desc": "Registra una reducción de 2 cm o más en tu medida de cintura."
    },
    "en": {
      "title": "Steel waist",
      "desc": "Log a reduction of 2 cm or more in your waist measurement."
    },
    "ru": {
      "title": "Стальная талия",
      "desc": "Зафиксируйте уменьшение талии на 2 см или более."
    },
    "et": {
      "title": "Terastalje",
      "desc": "Märgi vööümbermõõdu vähenemine 2 cm või rohkem."
    },
    "uk": {
      "title": "Сталева талія",
      "desc": "Зафіксуйте зменшення талії на 2 см або більше."
    }
  },
  "technique_master": {
    "es": {
      "title": "Maestro de la biomecánica",
      "desc": "Consulta la técnica y ejecución de al menos 10 ejercicios diferentes."
    },
    "en": {
      "title": "Biomechanics master",
      "desc": "View technique and form guide for at least 10 different exercises."
    },
    "ru": {
      "title": "Мастер биомеханики",
      "desc": "Изучите технику выполнения не менее 10 различных упражнений."
    },
    "et": {
      "title": "Biomehaanika meister",
      "desc": "Vaata tehnika juhiseid vähemalt 10 erineva harjutuse kohta."
    },
    "uk": {
      "title": "Майстер біомеханіки",
      "desc": "Вивчіть техніку виконання щонайменше 10 різних вправ."
    }
  },
  "story_ambassador": {
    "es": {
      "title": "Embajador del esfuerzo",
      "desc": "Genera y comparte una tarjeta de historias para mostrar tu entrenamiento."
    },
    "en": {
      "title": "Effort ambassador",
      "desc": "Generate and share a story card to showcase your workout."
    },
    "ru": {
      "title": "Амбассадор усилий",
      "desc": "Создайте карточку для историй и поделитесь тренировкой."
    },
    "et": {
      "title": "Pingutuse saadik",
      "desc": "Loo ja jaga loo kaarti oma treeningu näitamiseks."
    },
    "uk": {
      "title": "Амбасадор зусиль",
      "desc": "Створіть картку для історій та поділіться тренуванням."
    }
  },
  "full_body_week": {
    "es": {
      "title": "Atleta completo",
      "desc": "Entrena pecho, espalda, hombros y piernas en la misma semana."
    },
    "en": {
      "title": "Complete athlete",
      "desc": "Train chest, back, shoulders, and legs in the same week."
    },
    "ru": {
      "title": "Универсальный атлет",
      "desc": "Потренируйте грудь, спину, плечи и ноги за одну неделю."
    },
    "et": {
      "title": "Täielik sportlane",
      "desc": "Treeni rinda, selga, õlgu ja jalgu samal nädalal."
    },
    "uk": {
      "title": "Універсальний атлет",
      "desc": "Потренуйте груди, спину, плечі та ноги за один тиждень."
    }
  },
  "data_analyst": {
    "es": {
      "title": "Analista de datos",
      "desc": "Exportar el historial de entrenamientos a JSON por primera vez para alimentar el dashboard."
    },
    "en": {
      "title": "Data analyst",
      "desc": "Export workout history to JSON for the first time."
    },
    "ru": {
      "title": "Аналитик данных",
      "desc": "Экспортируйте историю тренировок в JSON впервые."
    },
    "et": {
      "title": "Andmeanalüütik",
      "desc": "Ekspordi treeningute ajalugu esmakordselt JSON-faili."
    },
    "uk": {
      "title": "Аналітик даних",
      "desc": "Експортуйте історію тренувань у JSON вперше."
    }
  },
  "the_architect": {
    "es": {
      "title": "El arquitecto",
      "desc": "Crear y guardar una rutina compleja de varios meses utilizando los grupos de ejercicios colapsables."
    },
    "en": {
      "title": "The architect",
      "desc": "Create and save a complex multi-month routine with collapsible groups."
    },
    "ru": {
      "title": "Архитектор",
      "desc": "Создайте и сохраните многомесячную программу тренировок."
    },
    "et": {
      "title": "Arhitekt",
      "desc": "Loo ja salvesta mitmekuine kompleksne treeningkava."
    },
    "uk": {
      "title": "Архітектор",
      "desc": "Створіть та збережіть багатомісячну програму тренувань."
    }
  },
  "controlled_chaos": {
    "es": {
      "title": "Caos controlado",
      "desc": "Utilizar la función de reordenar ejercicios en medio de una sesión activa para adaptarte a un gimnasio lleno."
    },
    "en": {
      "title": "Controlled chaos",
      "desc": "Reorder exercises during a live workout to adapt to a busy gym."
    },
    "ru": {
      "title": "Управляемый хаос",
      "desc": "Измените порядок упражнений во время тренировки в переполненном зале."
    },
    "et": {
      "title": "Kontrollitud kaos",
      "desc": "Muuda harjutuste järjekorda aktiivse treeningu ajal."
    },
    "uk": {
      "title": "Керований хаос",
      "desc": "Змініть порядок вправ під час тренування у заповненому залі."
    }
  },
  "server_overload": {
    "es": {
      "title": "Sobrecarga del servidor",
      "desc": "Superar las 1.000 series totales registradas en la base de datos de la app."
    },
    "en": {
      "title": "Server overload",
      "desc": "Surpass 1,000 total sets recorded in the app database."
    },
    "ru": {
      "title": "Перегрузка сервера",
      "desc": "Преодолейте 1 000 записанных подходов в базе данных."
    },
    "et": {
      "title": "Serveri ülekoormus",
      "desc": "Ületa 1 000 salvestatud seeriat rakenduse andmebaasis."
    },
    "uk": {
      "title": "Перевантаження сервера",
      "desc": "Подолайте 1 000 записаних підходів у базі даних."
    }
  },
  "iron_discipline": {
    "es": {
      "title": "Disciplina de hierro",
      "desc": "Entrenar en tu cumpleaños o en un día festivo nacional de tu país."
    },
    "en": {
      "title": "Iron discipline",
      "desc": "Train on your birthday or on a national public holiday in your country."
    },
    "ru": {
      "title": "Железная дисциплина",
      "desc": "Потренируйтесь в свой день рождения или в национальный праздник."
    },
    "et": {
      "title": "Raudne distsipliin",
      "desc": "Tee trenni oma sünnipäeval või riigipühal."
    },
    "uk": {
      "title": "Залізна дисципліна",
      "desc": "Потренуйтеся у свій день народження або в національне свято."
    }
  },
  "grindelwald_legs": {
    "es": {
      "title": "Piernas de Grindelwald",
      "desc": "Acumular 50.000 kg de volumen en sentadillas, prensa y zancadas como para escalar una montaña."
    },
    "en": {
      "title": "Grindelwald legs",
      "desc": "Accumulate 50,000 kg volume in squats, leg press, and lunges."
    },
    "ru": {
      "title": "Ноги Грин-де-Вальда",
      "desc": "Накопите 50 000 кг объема в приседаниях, жиме ногами и выпадах."
    },
    "et": {
      "title": "Grindelwaldi jalad",
      "desc": "Kogu 50 000 kg mahtu kükkides, jalapressil ja väljaastetes."
    },
    "uk": {
      "title": "Ноги Грін-де-Вальда",
      "desc": "Накопичіть 50 000 кг обсягу в присіданнях, жимі ногами та випадах."
    }
  },
  "skipped_leg_day": {
    "es": {
      "title": "Día de pierna saltado",
      "desc": "Salta tu primer entrenamiento de pierna."
    },
    "en": {
      "title": "Skipped leg day",
      "desc": "Skip your first leg workout."
    },
    "ru": {
      "title": "Пропущенный день ног",
      "desc": "Пропустите свою первую тренировку ног."
    },
    "et": {
      "title": "Vahele jäänud jalapäev",
      "desc": "Jäta oma esimene jalapäev vahele."
    },
    "uk": {
      "title": "Пропущений день ніг",
      "desc": "Пропустіть своє перше тренування ніг."
    }
  },
  "paladin_aura": {
    "es": {
      "title": "Aura del paladín",
      "desc": "Completar 20 sesiones enfocadas en el core y músculos estabilizadores."
    },
    "en": {
      "title": "Paladin's aura",
      "desc": "Complete 20 sessions focused on core and stabilizer muscles."
    },
    "ru": {
      "title": "Аура паладина",
      "desc": "Завершите 20 тренировок мышц кора и стабилизаторов."
    },
    "et": {
      "title": "Paladini aura",
      "desc": "Tee 20 treeningut kerelihastele ja stabilisaatoritele."
    },
    "uk": {
      "title": "Аура паладина",
      "desc": "Завершіть 20 тренувань м'язів кору та стабілізаторів."
    }
  },
  "cleave_strike": {
    "es": {
      "title": "Golpe de rajar (Cleave)",
      "desc": "Batir récords personales en 3 ejercicios compuestos diferentes en una sola sesión."
    },
    "en": {
      "title": "Cleave strike",
      "desc": "Break PRs in 3 different compound exercises in a single workout."
    },
    "ru": {
      "title": "Рассекающий удар",
      "desc": "Установите рекорды в 3 базовых упражнениях за одну сессию."
    },
    "et": {
      "title": "Hoolöök",
      "desc": "Loo uued rekordid 3 baasharjutuses ühe treeningu jooksul."
    },
    "uk": {
      "title": "Розсікаючий удар",
      "desc": "Встановіть рекорди у 3 базових вправах за одну сесію."
    }
  },
  "total_sync_365": {
    "es": {
      "title": "Sincronización total",
      "desc": "Tener registros en la base de datos JSON que abarquen los 365 días del año."
    },
    "en": {
      "title": "Total sync",
      "desc": "Have records spanning all 365 days of the year."
    },
    "ru": {
      "title": "Полная синхронизация",
      "desc": "Имейте записи за все 365 дней года."
    },
    "et": {
      "title": "Täielik sünkroonimine",
      "desc": "Omage kandeid aasta kõigi 365 päeva kohta."
    },
    "uk": {
      "title": "Повна синхронізація",
      "desc": "Майте записи за всі 365 днів року."
    }
  },
  "gemini_oracle": {
    "es": {
      "title": "Oráculo de Gemini",
      "desc": "Utilizar la integración de IA por primera vez para analizar tu rendimiento o generar una rutina."
    },
    "en": {
      "title": "Gemini oracle",
      "desc": "Use the AI assistant for the first time to analyze performance or create a routine."
    },
    "ru": {
      "title": "Оракул Gemini",
      "desc": "Используйте ИИ впервые для анализа тренировок или составления программы."
    },
    "et": {
      "title": "Gemini oraakel",
      "desc": "Kasuta tehisintellekti esmakordselt soorituse analüüsimiseks või kava loomiseks."
    },
    "uk": {
      "title": "Оракул Gemini",
      "desc": "Скористайтеся ШІ вперше для аналізу тренувань або створення програми."
    }
  },
  "assembler_optimizer": {
    "es": {
      "title": "Optimizador de ensamblador",
      "desc": "Terminar una rutina en un 15% menos de tiempo manteniendo el mismo volumen."
    },
    "en": {
      "title": "Assembly optimizer",
      "desc": "Finish a full workout in 15% less time while maintaining volume."
    },
    "ru": {
      "title": "Оптимизатор ассемблера",
      "desc": "Завершите тренировку на 15% быстрее при том же объеме."
    },
    "et": {
      "title": "Assembleri optimeerija",
      "desc": "Lõpeta treening 15% kiiremini, säilitades sama treeningmahu."
    },
    "uk": {
      "title": "Оптимізатор асемблера",
      "desc": "Завершіть тренування на 15% швидше, зберігши той самий обсяг."
    }
  },
  "carlos_awakening": {
    "es": {
      "title": "El despertar de Carlo",
      "desc": "Registra un entrenamiento de al menos media hora un domingo a las 03:00 AM. \"Dónde demonios estoy?\""
    },
    "en": {
      "title": "Carlo's awakening",
      "desc": "Log a workout of at least 30 minutes on a Sunday at 03:00 AM. \"Where the hell am I?\""
    },
    "ru": {
      "title": "Пробуждение Карло",
      "desc": "Запишите тренировку длительностью не менее 30 минут в воскресенье в 03:00 ночи. \"Где я, черт возьми?\""
    },
    "et": {
      "title": "Carlo ärkamine",
      "desc": "Salvesta vähemalt 30-minutiline treening pühapäeval kell 03:00 öösel. \"Kus kurat ma olen?\""
    },
    "uk": {
      "title": "Пробудження Карло",
      "desc": "Запишіть тренування тривалістю не менше 30 хвилин у неділю о 03:00 ночі. \"Де я, в біса?\""
    }
  },
  "automation_loop": {
    "es": {
      "title": "Nudo de automatización",
      "desc": "Exportar la base de datos JSON e importarla de nuevo el mismo día sin haber modificado nada."
    },
    "en": {
      "title": "Automation loop",
      "desc": "Export your workout database and import it back the same day without changes."
    },
    "ru": {
      "title": "Петля автоматизации",
      "desc": "Экспортируйте базу JSON и импортируйте её обратно в тот же день."
    },
    "et": {
      "title": "Automatiseerimise silmus",
      "desc": "Ekspordi JSON andmebaas ja impordi see samal päeval muutmata kujul tagasi."
    },
    "uk": {
      "title": "Петля автоматизації",
      "desc": "Експортуйте базу JSON та імпортуйте її назад у той самий день."
    }
  }
};
window.ACHIEVEMENT_TRANSLATIONS = ACHIEVEMENT_TRANSLATIONS;


window.getTrAchievementTitle = function(id, defaultTitle) {
    const lang = (window.state && window.state.language) || localStorage.getItem('gym_language') || 'es';
    if (ACHIEVEMENT_TRANSLATIONS[id] && ACHIEVEMENT_TRANSLATIONS[id][lang] && ACHIEVEMENT_TRANSLATIONS[id][lang].title) {
        return ACHIEVEMENT_TRANSLATIONS[id][lang].title;
    }
    return defaultTitle || (ACHIEVEMENT_TRANSLATIONS[id] && ACHIEVEMENT_TRANSLATIONS[id]['es'] ? ACHIEVEMENT_TRANSLATIONS[id]['es'].title : id);
};

window.getTrAchievementDesc = function(id, defaultDesc) {
    const lang = (window.state && window.state.language) || localStorage.getItem('gym_language') || 'es';
    if (ACHIEVEMENT_TRANSLATIONS[id] && ACHIEVEMENT_TRANSLATIONS[id][lang] && ACHIEVEMENT_TRANSLATIONS[id][lang].desc) {
        return ACHIEVEMENT_TRANSLATIONS[id][lang].desc;
    }
    return defaultDesc || (ACHIEVEMENT_TRANSLATIONS[id] && ACHIEVEMENT_TRANSLATIONS[id]['es'] ? ACHIEVEMENT_TRANSLATIONS[id]['es'].desc : '');
};

window.detectUserCountry = function() {
    try {
        const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
        if (tz.includes('madrid') || tz.includes('canary')) return 'ES';
        if (tz.includes('mexico')) return 'MX';
        if (tz.includes('buenos_aires') || tz.includes('argentina')) return 'AR';
        if (tz.includes('bogota') || tz.includes('colombia')) return 'CO';
        if (tz.includes('santiago') || tz.includes('chile')) return 'CL';
        if (tz.includes('tallinn') || tz.includes('estonia')) return 'EE';
        if (tz.includes('kyiv') || tz.includes('kiev') || tz.includes('ukraine')) return 'UA';
        if (tz.includes('moscow') || tz.includes('russia')) return 'RU';
        if (tz.includes('london')) return 'GB';
        if (tz.includes('new_york') || tz.includes('chicago') || tz.includes('los_angeles') || tz.includes('denver')) return 'US';
        
        const navLang = (navigator.language || navigator.userLanguage || '').toUpperCase();
        if (navLang.includes('-')) {
            const country = navLang.split('-')[1];
            if (country && country.length === 2) return country;
        }
    } catch(e) {}
    return 'ES';
};

window.getCountryHolidays = function(countryCode) {
    const c = (countryCode || 'ES').toUpperCase();
    const map = {
        'ES': ['01-01', '01-06', '05-01', '08-15', '10-12', '11-01', '12-06', '12-08', '12-25', '03-29', '04-18'],
        'MX': ['01-01', '02-05', '03-21', '05-01', '09-16', '11-20', '12-25'],
        'AR': ['01-01', '03-24', '04-02', '05-01', '05-25', '06-20', '07-09', '12-08', '12-25'],
        'CO': ['01-01', '05-01', '07-20', '08-07', '12-08', '12-25'],
        'CL': ['01-01', '05-01', '05-21', '07-16', '09-18', '09-19', '10-31', '11-01', '12-08', '12-25'],
        'EE': ['01-01', '02-24', '05-01', '06-23', '06-24', '08-20', '12-24', '12-25', '12-26'],
        'UA': ['01-01', '01-07', '03-08', '05-01', '05-09', '06-28', '08-24', '10-14', '12-25'],
        'RU': ['01-01', '01-02', '01-03', '01-07', '02-23', '03-08', '05-01', '05-09', '06-12', '11-04'],
        'US': ['01-01', '07-04', '11-11', '12-25'],
        'GB': ['01-01', '12-25', '12-26']
    };
    return map[c] || map['ES'];
};


window.loadAchievements = function() {
    try {
        const raw = localStorage.getItem('gym_achievements');
        return raw ? JSON.parse(raw) : { unlocked: {} };
    } catch(e) {
        return { unlocked: {} };
    }
};

window.saveAchievements = function(data) {
    try {
        localStorage.setItem('gym_achievements', JSON.stringify(data));
    } catch(e) {}
};

window.unlockAchievement = function(id) {
    if (!window.ACHIEVEMENTS_CATALOG) return false;
    const data = typeof loadAchievements === 'function' ? loadAchievements() : { unlocked: {} };
    if (!data.unlocked) data.unlocked = {};
    
    if (!data.unlocked[id]) {
        data.unlocked[id] = { unlockedAt: Date.now() };
        if (typeof saveAchievements === 'function') saveAchievements(data);
        const ach = ACHIEVEMENTS_CATALOG.find(a => a.id === id);
        if (ach && typeof showAchievementToast === 'function') {
            showAchievementToast(ach);
        }
        if (document.getElementById('view-achievements')?.classList.contains('active')) {
            if (typeof renderAchievementsView === 'function') renderAchievementsView();
        }
        return true;
    }
    return false;
};


window.getAchievementProgress = function(achId, state, data) {
    const resetTs = parseInt(localStorage.getItem('gym_achievements_reset_timestamp') || '0', 10);
    const completed = (Array.isArray(state?.completedWorkouts) ? state.completedWorkouts : [])
        .filter(w => {
            const wTime = w.completedAt || (w.date ? new Date(w.date).getTime() : 0);
            return wTime >= resetTs;
        });
    const isUnlocked = !!(data?.unlocked && data.unlocked[achId]);

    // 1. Single session max volume
    if (['volume_5k', 'volume_10k', 'volume_15k', 'volume_20k_session'].includes(achId)) {
        const targets = { 'volume_5k': 5000, 'volume_10k': 10000, 'volume_15k': 15000, 'volume_20k_session': 20000 };
        const target = targets[achId];
        let maxSessionVol = 0;
        completed.forEach(w => {
            let v = 0;
            (w.exercises || []).forEach(ex => {
                (ex.sets || []).forEach(s => {
                    v += (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0);
                });
            });
            if (v > maxSessionVol) maxSessionVol = v;
        });
        const current = Math.round(maxSessionVol);
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current.toLocaleString()} / ${target.toLocaleString()} kg`,
            label: 'Máx. sesión'
        };
    }

    // 2. Cumulative volume
    if (['volume_total_100k', 'volume_250k', 'volume_500k', 'volume_1m'].includes(achId)) {
        const targets = { 'volume_total_100k': 100000, 'volume_250k': 250000, 'volume_500k': 500000, 'volume_1m': 1000000 };
        const target = targets[achId];
        let totalVol = 0;
        completed.forEach(w => {
            (w.exercises || []).forEach(ex => {
                (ex.sets || []).forEach(s => {
                    totalVol += (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0);
                });
            });
        });
        const current = Math.round(totalVol);
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current.toLocaleString()} / ${target.toLocaleString()} kg`,
            label: 'Volumen total'
        };
    }

    // 3. Grindelwald legs
    if (achId === 'grindelwald_legs') {
        const target = 50000;
        let legVol = 0;
        completed.forEach(w => {
            (w.exercises || []).forEach(ex => {
                const n = (ex.name || '').toLowerCase();
                if (n.includes('sentadilla') || n.includes('squat') || n.includes('prensa') || n.includes('press de pierna') || n.includes('zancada') || n.includes('lunge') || n.includes('búlgara') || n.includes('hack')) {
                    (ex.sets || []).forEach(s => {
                        legVol += (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0);
                    });
                }
            });
        });
        const current = Math.round(legVol);
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current.toLocaleString()} / 50.000 kg`,
            label: 'Volumen de pierna'
        };
    }

    // 4. Strength clubs (max weight in any exercise)
    if (['strength_60', 'strength_80', 'strength_100', 'strength_120', 'strength_140'].includes(achId)) {
        const targets = { 'strength_60': 60, 'strength_80': 80, 'strength_100': 100, 'strength_120': 120, 'strength_140': 140 };
        const target = targets[achId];
        let maxWeight = 0;
        completed.forEach(w => {
            (w.exercises || []).forEach(ex => {
                (ex.sets || []).forEach(s => {
                    const wt = parseFloat(s.weight) || 0;
                    if (wt > maxWeight) maxWeight = wt;
                });
            });
        });
        const current = maxWeight;
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current} / ${target} kg`,
            label: 'Máx. levantado'
        };
    }

    // 5. Bench press 100kg
    if (achId === 'bench_100') {
        const target = 100;
        let maxBench = 0;
        completed.forEach(w => {
            (w.exercises || []).forEach(ex => {
                const n = (ex.name || '').toLowerCase();
                if (n.includes('press de banca') || n.includes('press plano con barra') || n.includes('bench press')) {
                    (ex.sets || []).forEach(s => {
                        const wt = parseFloat(s.weight) || 0;
                        if (wt > maxBench) maxBench = wt;
                    });
                }
            });
        });
        const current = maxBench;
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current} / 100 kg`,
            label: 'Press banca máx.'
        };
    }

    // 6. Workout count milestones
    if (['first_workout', 'workouts_5', 'workouts_15', 'workouts_30', 'workouts_50', 'workouts_100'].includes(achId)) {
        const targets = { 'first_workout': 1, 'workouts_5': 5, 'workouts_15': 15, 'workouts_30': 30, 'workouts_50': 50, 'workouts_100': 100 };
        const target = targets[achId];
        const current = completed.length;
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current} / ${target}`,
            label: 'Sesiones'
        };
    }

    // 7. Technique master (10 different exercises)
    if (achId === 'technique_master') {
        const target = 10;
        let viewed = 0;
        try {
            const raw = localStorage.getItem('gym_viewed_techniques');
            if (raw) viewed = JSON.parse(raw).length;
        } catch(e) {}
        const current = viewed;
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current} / 10`,
            label: 'Ejercicios vistos'
        };
    }

    // 8. Server overload (1,000 total sets)
    if (achId === 'server_overload') {
        const target = 1000;
        let totalSets = 0;
        completed.forEach(w => {
            (w.exercises || []).forEach(ex => {
                totalSets += (ex.sets || []).length;
            });
        });
        const current = totalSets;
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current.toLocaleString()} / 1.000`,
            label: 'Series registradas'
        };
    }

    // 9. Paladin aura (20 core sessions)
    if (achId === 'paladin_aura') {
        const target = 20;
        let coreCount = 0;
        completed.forEach(w => {
            const hasCore = (w.exercises || []).some(ex => {
                const n = (ex.name || '').toLowerCase();
                return n.includes('abdominal') || n.includes('core') || n.includes('plancha') || n.includes('crunch') || n.includes('lumbar') || n.includes('rueda abdominal') || n.includes('elevaciones de piernas');
            });
            if (hasCore) coreCount++;
        });
        const current = coreCount;
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current} / 20`,
            label: 'Sesiones de core'
        };
    }

    // 10. Total sync 365
    if (achId === 'total_sync_365') {
        const target = 365;
        const daysSet = new Set();
        completed.forEach(w => {
            const d = w.date || (w.completedAt ? new Date(w.completedAt).toISOString().split('T')[0] : '');
            if (d && d.length >= 10) daysSet.add(d.substring(5, 10)); // MM-DD
        });
        const current = daysSet.size;
        const pct = Math.min(100, Math.round((current / target) * 100));
        return {
            current,
            target,
            pct: isUnlocked ? 100 : pct,
            formatted: `${current} / 365 días`,
            label: 'Días del año'
        };
    }

    return null;
};


window.checkAndUnlockAchievements = function() {
    const data = loadAchievements();
    if (!data.unlocked) data.unlocked = {};

    const newlyUnlocked = [];
    const unlock = (id) => {
        if (!data.unlocked[id]) {
            data.unlocked[id] = { unlockedAt: Date.now() };
            const ach = ACHIEVEMENTS_CATALOG.find(a => a.id === id);
            if (ach) newlyUnlocked.push(ach);
            return true;
        }
        return false;
    };

    const resetTs = parseInt(localStorage.getItem('gym_achievements_reset_timestamp') || '0', 10);
    const completed = (Array.isArray(state.completedWorkouts) ? state.completedWorkouts : [])
        .filter(w => {
            const wTime = w.completedAt || (w.date ? new Date(w.date).getTime() : 0);
            return wTime >= resetTs;
        });
    const totalWorkouts = completed.length;

    // 1. Workouts count milestones
    if (totalWorkouts >= 1) unlock('first_workout');
    if (totalWorkouts >= 5) unlock('workouts_5');
    if (totalWorkouts >= 15) unlock('workouts_15');
    if (totalWorkouts >= 30) unlock('workouts_30');
    if (totalWorkouts >= 50) unlock('workouts_50');
    if (totalWorkouts >= 100) unlock('workouts_100');

    // 2. Strength milestones
    let maxLifted = 0;
    let maxBench = 0;
    let hadFailure = false;
    let hadDropset = false;
    let had3PRsInSession = false;

    completed.forEach(w => {
        let sessionPRCount = (w.prs && Array.isArray(w.prs)) ? w.prs.length : 0;
        if (sessionPRCount >= 3) had3PRsInSession = true;

        (w.exercises || []).forEach(ex => {
            const exName = (ex.name || '').toLowerCase();
            const isBench = exName.includes('press de banca') || exName.includes('press plano con barra') || exName.includes('bench press');

            (ex.sets || []).forEach(s => {
                const wt = parseFloat(s.weight) || 0;
                if (wt > maxLifted) maxLifted = wt;
                if (isBench && wt > maxBench) maxBench = wt;
                if (s.type === 'Al fallo' || s.type === 'Dropset fallo') hadFailure = true;
                if (s.type === 'Dropset' || s.type === 'Dropset fallo' || s.weightDrop) hadDropset = true;
            });
        });
    });

    if (maxLifted >= 60) unlock('strength_60');
    if (maxLifted >= 80) unlock('strength_80');
    if (maxLifted >= 100) unlock('strength_100');
    if (maxLifted >= 120) unlock('strength_120');
    if (maxLifted >= 140) unlock('strength_140');
    if (maxBench >= 100) unlock('bench_100');

    // 3. Effort & PRs
    if (hadFailure) unlock('to_failure');
    if (hadDropset) unlock('dropset_done');
    if (had3PRsInSession) unlock('pr_triple');
    if (localStorage.getItem('gym_unlocked_first_pr') === 'true' || completed.some(w => w.prs && w.prs.length > 0)) {
        unlock('first_pr');
    }

    // 4. Volume milestones
    let totalHistoricalVolume = 0;
    let maxSessionVolume = 0;

    completed.forEach(w => {
        let sessionVol = 0;
        (w.exercises || []).forEach(ex => {
            (ex.sets || []).forEach(s => {
                const wt = parseFloat(s.weight) || 0;
                const r = parseFloat(s.reps) || 0;
                sessionVol += (wt * r);
            });
        });
        totalHistoricalVolume += sessionVol;
        if (sessionVol > maxSessionVolume) maxSessionVolume = sessionVol;
    });

    if (maxSessionVolume >= 5000) unlock('volume_5k');
    if (maxSessionVolume >= 10000) unlock('volume_10k');
    if (maxSessionVolume >= 15000) unlock('volume_15k');
    if (maxSessionVolume >= 20000) unlock('volume_20k_session');

    if (totalHistoricalVolume >= 100000) unlock('volume_total_100k');
    if (totalHistoricalVolume >= 250000) unlock('volume_250k');
    if (totalHistoricalVolume >= 500000) unlock('volume_500k');
    if (totalHistoricalVolume >= 1000000) unlock('volume_1m');

    // 5. Streaks & Frequency
    const workoutsByWeek = {};
    completed.forEach(w => {
        const d = w.completedAt ? new Date(w.completedAt) : (w.date ? new Date(w.date) : null);
        if (d && !isNaN(d.getTime())) {
            const y = d.getFullYear();
            const oneJan = new Date(y, 0, 1);
            const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
            const week = Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
            const key = `${y}_W${week}`;
            workoutsByWeek[key] = (workoutsByWeek[key] || 0) + 1;
        }
    });

    let maxInWeek = 0;
    Object.values(workoutsByWeek).forEach(cnt => {
        if (cnt > maxInWeek) maxInWeek = cnt;
    });

    if (maxInWeek >= 3) unlock('streak_3_week');
    if (maxInWeek >= 4) unlock('perfect_week');

    // Leg day respect (at least 4 leg workouts in same month)
    const legsByMonth = {};
    completed.forEach(w => {
        const d = w.completedAt ? new Date(w.completedAt) : (w.date ? new Date(w.date) : null);
        if (d && !isNaN(d.getTime())) {
            const mKey = `${d.getFullYear()}_M${d.getMonth() + 1}`;
            const hasLegs = (w.exercises || []).some(ex => {
                const n = (ex.name || '').toLowerCase();
                return n.includes('pierna') || n.includes('sentadilla') || n.includes('prensa') || n.includes('cuádriceps') || n.includes('isquio') || n.includes('gemelo') || n.includes('femoral') || n.includes('búlgara') || n.includes('zancada') || n.includes('hack') || n.includes('peso muerto');
            });
            if (hasLegs) {
                legsByMonth[mKey] = (legsByMonth[mKey] || 0) + 1;
            }
        }
    });

    if (Object.values(legsByMonth).some(cnt => cnt >= 4)) {
        unlock('leg_day_respect');
    }

    // 6. Lifestyle & Timing
    completed.forEach(w => {
        const d = w.completedAt ? new Date(w.completedAt) : (w.date ? new Date(w.date) : null);
        if (d && !isNaN(d.getTime())) {
            const h = d.getHours();
            const m = d.getMinutes();
            if (h < 9) unlock('early_bird');
            if (h > 20 || (h === 20 && m >= 30)) unlock('night_owl');
        }

        const dur = (w.duration || '').toLowerCase();
        let min = 0;
        if (dur.includes(':')) {
            const p = dur.split(':').map(Number);
            if (p.length === 2) min = p[0] + (p[1] / 60);
            if (p.length === 3) min = (p[0] * 60) + p[1] + (p[2] / 60);
        } else if (dur.includes('h') || dur.includes('m')) {
            const hMatch = dur.match(/(\d+)\s*h/);
            const mMatch = dur.match(/(\d+)\s*m/);
            if (hMatch) min += parseInt(hMatch[1]) * 60;
            if (mMatch) min += parseInt(mMatch[1]);
        }
        if (min >= 60) unlock('iron_hour');
    });

    // 7. Evolution & Measurements
    try {
        const evoRaw = localStorage.getItem('gym_evolution_data');
        if (evoRaw) {
            const evo = JSON.parse(evoRaw);
            if (Array.isArray(evo) && evo.length > 0) {
                unlock('first_evolution');
                const hasPhotos = evo.some(e => e.photos && e.photos.length > 0);
                if (hasPhotos) unlock('photo_sculptor');

                const waistEntries = evo.filter(e => e.waist && Number(e.waist) > 0).sort((a,b) => new Date(a.date) - new Date(b.date));
                if (waistEntries.length >= 2) {
                    const diff = Number(waistEntries[0].waist) - Number(waistEntries[waistEntries.length - 1].waist);
                    if (diff >= 2) unlock('steel_waist');
                }
            }
        }
    } catch(e) {}

    // Technique Master
    try {
        const viewed = JSON.parse(localStorage.getItem('gym_viewed_techniques') || '[]');
        if (viewed.length >= 10) unlock('technique_master');
    } catch(e) {}

    // 8. Server Overload (1,000 sets)
    let totalAllCompletedSets = 0;
    completed.forEach(w => {
        (w.exercises || []).forEach(ex => {
            totalAllCompletedSets += (ex.sets || []).length;
        });
    });
    if (totalAllCompletedSets >= 1000) unlock('server_overload');

    // 9. Disciplina de Hierro (Entrenar en cumpleaños o festivo nacional del país del usuario)
    const userCountry = detectUserCountry();
    const countryHolidays = getCountryHolidays(userCountry);
    const userBirth = state.profile?.birthDate || localStorage.getItem('gym_user_birthdate') || '';
    let birthMonthDay = '';
    if (userBirth && userBirth.includes('-')) {
        const parts = userBirth.split('-');
        if (parts.length === 3) birthMonthDay = parts[1] + '-' + parts[2];
    }
    completed.forEach(w => {
        const dObj = w.completedAt ? new Date(w.completedAt) : (w.date ? new Date(w.date) : null);
        if (dObj && !isNaN(dObj.getTime())) {
            const m = String(dObj.getMonth() + 1).padStart(2, '0');
            const d = String(dObj.getDate()).padStart(2, '0');
            const key = m + '-' + d;
            if (countryHolidays.includes(key) || (birthMonthDay && key === birthMonthDay)) {
                unlock('iron_discipline');
            }
        }
    });

    // 10. Piernas de Grindelwald (50.000 kg acumulados en pierna)
    let grindelwaldLegVol = 0;
    completed.forEach(w => {
        (w.exercises || []).forEach(ex => {
            const n = (ex.name || '').toLowerCase();
            if (n.includes('sentadilla') || n.includes('squat') || n.includes('prensa') || n.includes('press de pierna') || n.includes('zancada') || n.includes('lunge') || n.includes('búlgara') || n.includes('hack')) {
                (ex.sets || []).forEach(s => {
                    const wt = parseFloat(s.weight) || 0;
                    const r = parseFloat(s.reps) || 0;
                    grindelwaldLegVol += (wt * r);
                });
            }
        });
    });
    if (grindelwaldLegVol >= 50000) unlock('grindelwald_legs');

    // 11. Aura del Paladín (20 sesiones de core)
    let paladinCoreCount = 0;
    completed.forEach(w => {
        const hasCore = (w.exercises || []).some(ex => {
            const n = (ex.name || '').toLowerCase();
            return n.includes('abdominal') || n.includes('core') || n.includes('plancha') || n.includes('crunch') || n.includes('lumbar') || n.includes('rueda abdominal') || n.includes('elevaciones de piernas');
        });
        if (hasCore) paladinCoreCount++;
    });
    if (paladinCoreCount >= 20) unlock('paladin_aura');

    // 12. Golpe de Rajar (Cleave) (3 PRs en ejercicios compuestos en una sola sesión)
    completed.forEach(w => {
        if (w.prs && Array.isArray(w.prs) && w.prs.length >= 3) {
            let compoundPrCount = 0;
            w.prs.forEach(pr => {
                const n = (pr.exerciseName || '').toLowerCase();
                if (n.includes('banca') || n.includes('press') || n.includes('sentadilla') || n.includes('squat') || n.includes('peso muerto') || n.includes('deadlift') || n.includes('dominada') || n.includes('remo') || n.includes('fondos')) {
                    compoundPrCount++;
                }
            });
            if (compoundPrCount >= 3) unlock('cleave_strike');
        }
    });

    // 13. Sincronización Total (365 días del año)
    const allDaysOfYears = new Set();
    completed.forEach(w => {
        const d = w.date || (w.completedAt ? new Date(w.completedAt).toISOString().split('T')[0] : '');
        if (d && d.length >= 10) allDaysOfYears.add(d.substring(5, 10));
    });
    if (allDaysOfYears.size >= 365) unlock('total_sync_365');

    // 14. El despertar de Carlo: Registra un entrenamiento de al menos media hora un domingo a las 03:00 AM.
    completed.forEach(w => {
        const dObj = w.completedAt ? new Date(w.completedAt) : (w.date ? new Date(w.date) : null);
        if (dObj && !isNaN(dObj.getTime())) {
            const isSunday = dObj.getDay() === 0;
            const is3AM = dObj.getHours() === 3;
            
            // Calculate minutes
            const dur = (w.duration || '').toLowerCase();
            let min = 0;
            if (dur.includes(':')) {
                const p = dur.split(':').map(Number);
                if (p.length === 2) min = p[0] + (p[1] / 60);
                if (p.length === 3) min = (p[0] * 60) + p[1] + (p[2] / 60);
            } else if (dur.includes('h') || dur.includes('m')) {
                const hMatch = dur.match(/(\d+)\s*h/);
                const mMatch = dur.match(/(\d+)\s*m/);
                if (hMatch) min += parseInt(hMatch[1]) * 60;
                if (mMatch) min += parseInt(mMatch[1]);
            }
            if (isSunday && is3AM && min >= 30) {
                unlock('carlos_awakening');
            }
        }
    });

    // 15. Flag-based achievements
    if (localStorage.getItem('gym_unlocked_data_analyst') === 'true') unlock('data_analyst');
    if (localStorage.getItem('gym_unlocked_the_architect') === 'true') unlock('the_architect');
    if (localStorage.getItem('gym_unlocked_controlled_chaos') === 'true') unlock('controlled_chaos');
    if (localStorage.getItem('gym_unlocked_skipped_leg_day') === 'true') unlock('skipped_leg_day');
    if (localStorage.getItem('gym_unlocked_gemini_oracle') === 'true') unlock('gemini_oracle');
    if (localStorage.getItem('gym_unlocked_story_ambassador') === 'true') unlock('story_ambassador');
    if (localStorage.getItem('gym_unlocked_automation_loop') === 'true') unlock('automation_loop');

    saveAchievements(data);

    if (newlyUnlocked.length > 0) {
        newlyUnlocked.forEach((ach, index) => {
            setTimeout(() => showAchievementToast(ach), index * 4200);
        });
    }

    return newlyUnlocked;
};


window.showAchievementToast = function(ach) {
    const toast = document.getElementById('achievement-celebration-toast');
    if (!toast) return;

    const iconEl = document.getElementById('toast-achievement-icon') || document.getElementById('achievement-toast-icon') || toast.querySelector('i');
    const titleEl = document.getElementById('toast-achievement-name') || document.getElementById('achievement-toast-title');
    const descEl = document.getElementById('toast-achievement-desc') || document.getElementById('achievement-toast-desc');

    if (iconEl) iconEl.className = 'ph-fill ' + (ach.icon || 'ph-trophy');
    if (titleEl) titleEl.textContent = typeof getTrAchievementTitle === 'function' ? getTrAchievementTitle(ach.id, ach.title) : ach.title;
    if (descEl) descEl.textContent = typeof getTrAchievementDesc === 'function' ? getTrAchievementDesc(ach.id, ach.desc) : ach.desc;

    toast.style.visibility = 'visible';
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    if (window.achievementToastTimeout) clearTimeout(window.achievementToastTimeout);
    window.achievementToastTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(120px)';
        setTimeout(() => {
            if (toast.style.opacity === '0') {
                toast.style.visibility = 'hidden';
            }
        }, 400);
    }, 3800);
};


window.achCurrentFilter = window.achCurrentFilter || 'all';

window.setAchievementsFilter = function(filter) {
    window.achCurrentFilter = filter;
    renderAchievementsView();
};

window.renderAchievementsView = function() {
    const mount = document.getElementById('achievements-grid-mount');
    const filterBar = document.getElementById('achievements-filter-bar');
    const countEl = document.getElementById('achievements-global-count');
    const barEl = document.getElementById('achievements-global-bar');
    if (!mount) return;

    checkAndUnlockAchievements();
    const data = loadAchievements();
    const unlockedCount = Object.keys(data.unlocked).length;
    const totalCount = ACHIEVEMENTS_CATALOG.length;
    const lockedCount = totalCount - unlockedCount;
    const pct = Math.round((unlockedCount / totalCount) * 100);

    const lang = (window.state && window.state.language) || localStorage.getItem('gym_language') || 'es';

    const tAll = (typeof getT === 'function' ? getT('common.all') : null) || (lang === 'en' ? 'All' : (lang === 'ru' ? 'Все' : (lang === 'et' ? 'Kõik' : (lang === 'uk' ? 'Всі' : 'Todos'))));
    const tUnlocked = lang === 'en' ? 'Unlocked' : (lang === 'ru' ? 'Открытые' : (lang === 'et' ? 'Avatud' : (lang === 'uk' ? 'Відкриті' : 'Desbloqueados')));
    const tLocked = lang === 'en' ? 'Locked' : (lang === 'ru' ? 'В ожидании' : (lang === 'et' ? 'Ootel' : (lang === 'uk' ? 'В очікуванні' : 'Pendientes')));
    const tUnlockedOn = lang === 'en' ? 'Unlocked on' : (lang === 'ru' ? 'Разблокировано' : (lang === 'et' ? 'Avatud' : (lang === 'uk' ? 'Розблоковано' : 'Desbloqueado el')));
    const tEmpty = lang === 'en' ? 'No achievements in this category.' : (lang === 'ru' ? 'В этой категории пока нет достижений.' : (lang === 'et' ? 'Selles kategoorias pole saavutusi.' : (lang === 'uk' ? 'У цій категорії поки немає досягнень.' : 'No hay logros en esta categoría.')));

    if (countEl) countEl.textContent = `${unlockedCount} / ${totalCount} ${tUnlocked} (${pct}%)`;
    if (barEl) barEl.style.width = pct + '%';

    if (filterBar) {
        const curF = window.achCurrentFilter || 'all';
        filterBar.innerHTML = `
            <button type="button" class="btn-secondary" onclick="setAchievementsFilter('all')" style="padding: 6px 14px; font-size: 12px; border-radius: 20px; font-weight: 700; cursor: pointer; transition: all 0.2s; ${curF === 'all' ? 'background: var(--color-accent); color: white; border-color: var(--color-accent);' : 'background: var(--bg-surface-elevated); color: var(--text-secondary);'}">${tAll} (${totalCount})</button>
            <button type="button" class="btn-secondary" onclick="setAchievementsFilter('unlocked')" style="padding: 6px 14px; font-size: 12px; border-radius: 20px; font-weight: 700; cursor: pointer; transition: all 0.2s; ${curF === 'unlocked' ? 'background: #f59e0b; color: white; border-color: #f59e0b;' : 'background: var(--bg-surface-elevated); color: var(--text-secondary);'}">🏆 ${tUnlocked} (${unlockedCount})</button>
            <button type="button" class="btn-secondary" onclick="setAchievementsFilter('locked')" style="padding: 6px 14px; font-size: 12px; border-radius: 20px; font-weight: 700; cursor: pointer; transition: all 0.2s; ${curF === 'locked' ? 'background: var(--color-heavy); color: white; border-color: var(--color-heavy);' : 'background: var(--bg-surface-elevated); color: var(--text-secondary);'}">🔒 ${tLocked} (${lockedCount})</button>
        `;
    }

    const sortedList = [...ACHIEVEMENTS_CATALOG].sort((a, b) => {
        const aUnlocked = !!data.unlocked[a.id];
        const bUnlocked = !!data.unlocked[b.id];
        if (aUnlocked && !bUnlocked) return -1;
        if (!aUnlocked && bUnlocked) return 1;
        if (aUnlocked && bUnlocked) {
            const timeA = data.unlocked[a.id].unlockedAt || 0;
            const timeB = data.unlocked[b.id].unlockedAt || 0;
            return timeB - timeA;
        }
        return 0;
    });

    const curF = window.achCurrentFilter || 'all';
    const filteredList = sortedList.filter(ach => {
        const isUnlocked = !!data.unlocked[ach.id];
        if (curF === 'unlocked') return isUnlocked;
        if (curF === 'locked') return !isUnlocked;
        return true;
    });

    if (filteredList.length === 0) {
        mount.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 32px 16px; color: var(--text-secondary); font-size: 13px;">${tEmpty}</div>`;
        return;
    }

    let html = '';
    filteredList.forEach(ach => {
        const isUnlocked = !!data.unlocked[ach.id];
        const dateStr = isUnlocked ? new Date(data.unlocked[ach.id].unlockedAt).toLocaleDateString() : '';
        const title = getTrAchievementTitle(ach.id, ach.title);
        const desc = getTrAchievementDesc(ach.id, ach.desc);
        const prog = getAchievementProgress(ach.id, state, data);

        let progressHtml = '';
        if (prog) {
            const progressColor = isUnlocked ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #3b82f6, #6366f1)';
            const numColor = isUnlocked ? '#10b981' : 'var(--color-accent)';
            progressHtml = `
                <div style="margin-top: 8px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 5px 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; margin-bottom: 3px;">
                        <span style="color: var(--text-muted); font-weight: 600;">${prog.label || 'Progreso'}</span>
                        <strong style="color: ${numColor}; font-weight: 700;">${prog.formatted}</strong>
                    </div>
                    <div style="width: 100%; height: 5px; background: rgba(255, 255, 255, 0.08); border-radius: 999px; overflow: hidden;">
                        <div style="width: ${prog.pct}%; height: 100%; background: ${progressColor}; border-radius: 999px; transition: width 0.3s ease;"></div>
                    </div>
                </div>
            `;
        }

        html += `
            <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div style="display: flex; gap: 12px; align-items: flex-start;">
                    <div class="achievement-icon-wrapper" style="flex-shrink: 0;">
                        <i class="ph-bold ${ach.icon}"></i>
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
                            <span style="font-weight: 700; font-size: 13px; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${title}</span>
                            ${isUnlocked ? '<span style="color: #f59e0b; font-size: 12px; flex-shrink: 0;"><i class="ph-bold ph-check-circle"></i></span>' : '<span style="color: var(--text-muted); font-size: 11px; flex-shrink: 0;"><i class="ph ph-lock"></i></span>'}
                        </div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px; line-height: 1.35;">${desc}</div>
                    </div>
                </div>
                ${progressHtml}
                ${isUnlocked ? `<div style="font-size: 10px; color: #f59e0b; margin-top: 6px; font-weight: 600;">${tUnlockedOn} ${dateStr}</div>` : ''}
            </div>
        `;
    });

    mount.innerHTML = html;

    let resetContainer = document.getElementById('achievements-reset-container');
    if (!resetContainer && mount.parentNode) {
        resetContainer = document.createElement('div');
        resetContainer.id = 'achievements-reset-container';
        resetContainer.style.cssText = 'margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-color); text-align: center;';
        resetContainer.innerHTML = `
            <button type="button" id="btn-reset-achievements" onclick="confirmResetAchievements()" style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); color: #ef4444; padding: 10px 18px; border-radius: 12px; font-size: 12.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;">
                <i class="ph-bold ph-arrow-counter-clockwise"></i>
                <span id="btn-reset-achievements-text" data-i18n="achievements.resetBtn">Restablecer logros</span>
            </button>
            <p id="reset-achievements-hint" style="font-size: 11px; color: var(--text-muted); margin-top: 6px; margin-bottom: 0;">Protegido con 3 ventanas de confirmación para evitar borrados accidentales.</p>
        `;
        mount.parentNode.appendChild(resetContainer);
    }

    const resetBtnText = document.getElementById('btn-reset-achievements-text');
    const resetHintText = document.getElementById('reset-achievements-hint');
    if (resetBtnText) {
        const btnMap = {
            es: 'Restablecer logros',
            en: 'Reset achievements',
            ru: 'Сбросить достижения',
            et: 'Lähtesta saavutused',
            uk: 'Скинути досягнення'
        };
        resetBtnText.textContent = btnMap[lang] || btnMap['es'];
    }
    if (resetHintText) {
        const hintMap = {
            es: 'Protegido con 3 ventanas de confirmación para evitar borrados accidentales.',
            en: 'Protected by 3 confirmation dialogs to prevent accidental resets.',
            ru: 'Защищено 3 окнами подтверждения для предотвращения случайного сброса.',
            et: 'Kaitstud 3 kinnitusaknaga juhusliku lähtestamise vältimiseks.',
            uk: 'Захищено 3 вікнами підтвердження для запобігання випадкового скидання.'
        };
        resetHintText.textContent = hintMap[lang] || hintMap['es'];
    }
};


window.confirmResetAchievements = function() {
    const lang = (window.state && window.state.language) || localStorage.getItem('gym_language') || 'es';

    const msgs = {
        es: [
            "¿Estás seguro de que deseas restablecer todos tus logros?\n\nEsta acción eliminará todas las medallas y trofeos que has desbloqueado.",
            "¡ATENCIÓN! (Confirmación 2 de 3)\n\n¿Realmente quieres reiniciar todo tu progreso de logros? Tendrás que volver a completar cada desafío desde cero para desbloquearlos de nuevo.",
            "⚠️ ÚLTIMA ADVERTENCIA (Confirmación 3 de 3)\n\n¿Confirmas el borrado DEFINITIVO de tus logros?\nEsta acción es completamente irreversible."
        ],
        en: [
            "Are you sure you want to reset all your achievements?\n\nThis action will remove all badges and trophies earned so far.",
            "ATTENTION! (Confirmation 2 of 3)\n\nDo you really want to reset all achievement progress? You will have to complete each challenge from scratch to unlock them again.",
            "⚠️ FINAL WARNING (Confirmation 3 of 3)\n\nDo you confirm the PERMANENT deletion of your achievements?\nThis action cannot be undone."
        ],
        ru: [
            "Вы уверены, что хотите сбросить все свои достижения?\n\nЭто действие удалит все полученные медали и трофеи.",
            "ВНИМАНИЕ! (Подтверждение 2 из 3)\n\nВы действительно хотите сбросить весь прогресс достижений? Вам придется выполнять задания заново.",
            "⚠️ ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ (Подтверждение 3 из 3)\n\nПодтверждаете ОКОНЧАТЕЛЬНЫЙ сброс достижений?\nЭто действие необратимо."
        ],
        et: [
            "Kas olete kindel, et soovite kõik saavutused lähtestada?\n\nSee toiming eemaldab kõik seni teenitud medalid ja karikad.",
            "TÄHELEPANU! (Kinnitus 2 / 3)\n\nKas soovite tõesti kogu saavutuste edenemise nullida? Peate kõike uuesti alustama.",
            "⚠️ VIIMANE HOIATUS (Kinnitus 3 / 3)\n\nKas kinnitate saavutuste LÕPLIKKU kustutamist?\nSeda toimingut ei saa tagasi võtta."
        ],
        uk: [
            "Ви впевнені, що хочете скинути всі свої досягнення?\n\nЦя дія видалить усі отримані медалі та трофеї.",
            "УВАГА! (Підтвердження 2 з 3)\n\nВи дійсно бажаєте скинути весь прогрес досягнень? Вам доведеться виконувати завдання заново.",
            "⚠️ ОСТАННЄ ПОПЕРЕДЖЕННЯ (Підтвердження 3 з 3)\n\nПідтверджуєте ОСТАТОЧНЕ видалення досягнень?\nЦя дія незворотна."
        ]
    };

    const currentMsgs = msgs[lang] || msgs['es'];

    // Ventana 1 de confirmación
    if (!confirm(currentMsgs[0])) return;

    // Ventana 2 de confirmación
    if (!confirm(currentMsgs[1])) return;

    // Ventana 3 de confirmación
    if (!confirm(currentMsgs[2])) return;

    // Ejecutar el restablecimiento completo
    resetAllAchievements();
};

window.resetAllAchievements = function() {
    localStorage.setItem('gym_achievements_reset_timestamp', Date.now().toString());
    localStorage.setItem('gym_achievements', JSON.stringify({ unlocked: {} }));
    localStorage.removeItem('gym_unlocked_first_pr');
    localStorage.removeItem('gym_unlocked_carlos_awakening');
    localStorage.removeItem('gym_unlocked_data_analyst');
    localStorage.removeItem('gym_unlocked_the_architect');
    localStorage.removeItem('gym_unlocked_controlled_chaos');
    localStorage.removeItem('gym_unlocked_skipped_leg_day');
    localStorage.removeItem('gym_unlocked_gemini_oracle');
    localStorage.removeItem('gym_unlocked_story_ambassador');
    localStorage.removeItem('gym_unlocked_automation_loop');
    localStorage.removeItem('gym_viewed_techniques');

    if (typeof renderAchievementsView === 'function') {
        renderAchievementsView();
    }

    const lang = (window.state && window.state.language) || localStorage.getItem('gym_language') || 'es';
    const successMsg = {
        es: "¡Logros restablecidos con éxito! Puedes comenzar a desbloquearlos de nuevo.",
        en: "Achievements successfully reset! You can start unlocking them from scratch.",
        ru: "Достижения успешно сброшены! Вы можете разблокировать их заново.",
        et: "Saavutused on edukalt lähtestatud! Võid alustada nende avamist uuesti.",
        uk: "Досягнення успішно скинуто! Ви можете розблокувати їх заново."
    };
    alert(successMsg[lang] || successMsg['es']);
};



// =========================================================================
// 5. STORY CARD GENERATOR (1080x1920 CANVAS FOR INSTAGRAM & WHATSAPP)
// =========================================================================
window.activeStoryData = null;

window.openStoryCardModalFromSummary = function() {
    const lastComp = window.lastCompletedWorkoutData || (state.completedWorkouts && state.completedWorkouts[state.completedWorkouts.length - 1]) || {};
    const volumeVal = document.getElementById('summary-stat-volume')?.textContent || (lastComp.volume || '0 kg');
    const timeVal = document.getElementById('summary-stat-time')?.textContent || (lastComp.duration || '45m');
    const prsList = (lastComp.prs && lastComp.prs.length > 0) ? lastComp.prs : Array.from(document.querySelectorAll('#summary-prs-list > div')).map(d => d.textContent.trim());

    const sessionData = {
        title: lastComp.name || 'Entrenamiento',
        volume: volumeVal,
        duration: timeVal,
        date: new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
        prs: prsList,
        exercises: (lastComp.exercises && lastComp.exercises.length > 0) ? lastComp.exercises : []
    };

    openStoryCardModal(sessionData);
};

window.openStoryCardModal = function(sessionData) {
    window.activeStoryData = sessionData;
    const modal = document.getElementById('modal-story-card');
    if (!modal) return;

    modal.classList.add('active');
    drawStoryCardCanvas(sessionData);
};

window.drawStoryCardCanvas = function(data) {
    const canvas = document.getElementById('story-canvas');
    const previewImg = document.getElementById('story-preview-img');
    if (!canvas || !previewImg) return;

    const ctx = canvas.getContext('2d');
    const W = 1080;
    const H = 1920;
    canvas.width = W;
    canvas.height = H;

    // 1. Dark Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#060913');
    bgGrad.addColorStop(0.25, '#0b1120');
    bgGrad.addColorStop(0.75, '#020617');
    bgGrad.addColorStop(1, '#000000');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Ambient Mesh Glow
    const glow1 = ctx.createRadialGradient(250, 360, 10, 250, 360, 480);
    glow1.addColorStop(0, 'rgba(139, 92, 246, 0.28)');
    glow1.addColorStop(1, 'rgba(139, 92, 246, 0)');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, W, H);

    const glow2 = ctx.createRadialGradient(850, 1200, 10, 850, 1200, 520);
    glow2.addColorStop(0, 'rgba(16, 185, 129, 0.22)');
    glow2.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, H);

    // Helper: Rounded Rect
    const roundRect = (x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
    };

    // 3. Header Branding (GYM TRACKER)
    ctx.textAlign = 'center';
    ctx.fillStyle = '#3b82f6';
    ctx.font = '800 36px sans-serif';
    ctx.fillText('🏋️  GYM TRACKER', W / 2, 130);

    // 4. Workout Title (Auto-scaling & Wrap, never truncated or clipped)
    const rawTitle = (data.title || 'ENTRENAMIENTO').toUpperCase();
    let titleFontSize = 62;
    ctx.font = '900 ' + titleFontSize + 'px sans-serif';
    const maxTitleW = W - 160;

    // Check if wrapping is needed
    if (ctx.measureText(rawTitle).width > maxTitleW) {
        // Try decreasing font down to 42px
        while (ctx.measureText(rawTitle).width > maxTitleW && titleFontSize > 42) {
            titleFontSize -= 3;
            ctx.font = '900 ' + titleFontSize + 'px sans-serif';
        }
    }

    ctx.fillStyle = '#ffffff';
    // If still wider than maxTitleW, split into 2 lines
    if (ctx.measureText(rawTitle).width > maxTitleW) {
        const words = rawTitle.split(' ');
        let line1 = '';
        let line2 = '';
        words.forEach((w, idx) => {
            if (idx < Math.ceil(words.length / 2)) line1 += (line1 ? ' ' : '') + w;
            else line2 += (line2 ? ' ' : '') + w;
        });
        ctx.fillText(line1, W / 2, 210);
        ctx.fillText(line2, W / 2, 210 + titleFontSize + 8);
    } else {
        ctx.fillText(rawTitle, W / 2, 230);
    }

    // Date
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 32px sans-serif';
    ctx.fillText(data.date || new Date().toLocaleDateString(), W / 2, 315);

    // 5. Stat Cards Grid (4 boxes: Tiempo, Volumen, Series, PRs)
    const cardW = 440;
    const cardH = 170;
    const gapX = 40;
    const startX = 80;
    const startY = 390;

    const prsCount = Array.isArray(data.prs) ? data.prs.length : 0;
    const stats = [
        { label: 'DURACIÓN', val: data.duration || '45m', icon: '⏱️', color: '#38bdf8' },
        { label: 'VOLUMEN TOTAL', val: data.volume || '0 kg', icon: '🏋️', color: '#10b981' },
        { label: 'SERIES TOTALES', val: (data.exercises ? data.exercises.reduce((acc, ex) => acc + (ex.sets ? ex.sets.length : 0), 0) : 16) + ' series', icon: '🔢', color: '#a855f7' },
        { label: 'RÉCORDS (PRs)', val: prsCount + (prsCount === 1 ? ' Nuevo' : ' Nuevos'), icon: '🏆', color: '#f59e0b' }
    ];

    stats.forEach((st, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const x = startX + col * (cardW + gapX);
        const y = startY + row * (cardH + 24);

        // Box background
        ctx.fillStyle = '#1e293b';
        roundRect(x, y, cardW, cardH, 22);
        ctx.fill();

        // Border with color tint
        ctx.strokeStyle = st.color;
        ctx.lineWidth = 2.5;
        roundRect(x, y, cardW, cardH, 22);
        ctx.stroke();

        // Icon & Label
        ctx.textAlign = 'left';
        ctx.fillStyle = '#94a3b8';
        ctx.font = '700 22px sans-serif';
        ctx.fillText(st.icon + ' ' + st.label, x + 26, y + 50);

        // Value
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 44px sans-serif';
        ctx.fillText(st.val, x + 26, y + 124);
    });

    // 6. Section: Highlights / Exercises list
    const boxY = 800;
    const boxH = 810;
    ctx.fillStyle = '#0f172a';
    roundRect(80, boxY, 920, boxH, 28);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    roundRect(80, boxY, 920, boxH, 28);
    ctx.stroke();

    // Box Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 32px sans-serif';
    ctx.fillText('⚡ RESUMEN DEL ENTRENAMIENTO', W / 2, boxY + 65);

    // List exercises (Full names without ellipses, auto-scaling)
    const exs = data.exercises || [];
    let curY = boxY + 115;
    const maxShow = 5;

    if (exs.length === 0) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#64748b';
        ctx.font = '500 34px sans-serif';
        ctx.fillText('¡Gran esfuerzo completado hoy!', W / 2, boxY + 410);
    } else {
        exs.slice(0, maxShow).forEach((ex) => {
            const bestSet = (ex.sets || []).reduce((best, s) => {
                const wt = parseFloat(s.weight) || 0;
                return wt > (best.wt || 0) ? { wt, reps: s.reps } : best;
            }, { wt: 0, reps: 10 });

            // Row card background
            const rowH = 120;
            ctx.fillStyle = '#1e293b';
            roundRect(110, curY, 860, rowH, 18);
            ctx.fill();

            // Right side: Best set metrics
            ctx.textAlign = 'right';
            ctx.fillStyle = '#10b981';
            ctx.font = '800 30px sans-serif';
            const setStr = bestSet.wt > 0 ? (bestSet.wt + ' kg × ' + bestSet.reps) : ((ex.sets ? ex.sets.length : 0) + ' series');
            ctx.fillText(setStr, 940, curY + 68);

            // Left side: Exercise full name (with dynamic wrapping and sizing)
            ctx.textAlign = 'left';
            ctx.fillStyle = '#ffffff';
            const exFullName = ex.name || 'Ejercicio';
            const maxNameW = 540; // available width before set metric
            
            let nameFont = 27;
            ctx.font = '700 ' + nameFont + 'px sans-serif';

            if (ctx.measureText(exFullName).width <= maxNameW) {
                ctx.fillText(exFullName, 135, curY + 68);
            } else {
                // Auto wrap into 2 lines
                const words = exFullName.split(' ');
                let l1 = '';
                let l2 = '';
                words.forEach((w) => {
                    if (ctx.measureText((l1 ? l1 + ' ' : '') + w).width <= maxNameW && !l2) {
                        l1 += (l1 ? ' ' : '') + w;
                    } else {
                        l2 += (l2 ? ' ' : '') + w;
                    }
                });
                ctx.font = '700 23px sans-serif';
                ctx.fillText(l1, 135, curY + 48);
                ctx.fillText(l2, 135, curY + 84);
            }

            curY += 134;
        });
    }

    // 7. Footer Watermark (Generously above canvas bottom, no overflow)
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = '600 26px sans-serif';
    ctx.fillText('🔥 Superando límites cada día • Gym Tracker', W / 2, 1690);

    // Badge at bottom
    ctx.fillStyle = '#1e293b';
    roundRect(W / 2 - 170, 1740, 340, 56, 28);
    ctx.fill();
    ctx.fillStyle = '#3b82f6';
    ctx.font = '700 22px sans-serif';
    ctx.fillText('github.com/Streetoh', W / 2, 1776);

    // Render preview
    previewImg.src = canvas.toDataURL('image/png');
};

window.downloadStoryCard = async function() {
    const canvas = document.getElementById('story-canvas');
    if (!canvas) return;

    const dlBtn = document.querySelector('#modal-story-card button[onclick="downloadStoryCard()"]');
    const origHtml = dlBtn ? dlBtn.innerHTML : '';
    if (dlBtn) dlBtn.innerHTML = '<i class="ph-bold ph-spinner ph-spin"></i> Guardando...';

    try {
        const dataUrl = canvas.toDataURL('image/png');
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const fileName = 'gym_tracker_historia_' + Date.now() + '.png';

        // 1. Android Capacitor Native (Write file and trigger Save / Share intent)
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem) {
            const { Filesystem } = window.Capacitor.Plugins;
            let fileUri = null;
            try {
                const writeResult = await Filesystem.writeFile({
                    path: fileName,
                    data: base64Data,
                    directory: 'CACHE'
                });
                fileUri = writeResult.uri;
            } catch (writeErr) {
                console.warn('Filesystem CACHE write error:', writeErr);
            }

            if (fileUri && window.Capacitor.Plugins.Share) {
                await window.Capacitor.Plugins.Share.share({
                    title: 'Guardar Imagen',
                    dialogTitle: 'Guardar Imagen en Dispositivo / Galería',
                    files: [fileUri]
                });
            } else {
                alert('¡Imagen guardada en tu dispositivo!');
            }
            return;
        }

        // 2. Web Browser Fallback (Blob + virtual link)
        if (canvas.toBlob) {
            canvas.toBlob((blob) => {
                if (!blob) return;
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.download = fileName;
                a.href = blobUrl;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    a.remove();
                    URL.revokeObjectURL(blobUrl);
                }, 400);
            }, 'image/png');
        } else {
            const a = document.createElement('a');
            a.download = fileName;
            a.href = dataUrl;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => a.remove(), 400);
        }
    } catch(e) {
        console.error('Error in downloadStoryCard:', e);
        alert('Error al descargar imagen: ' + (e.message || e));
    } finally {
        if (dlBtn) dlBtn.innerHTML = origHtml;
    }
};

window.shareStoryCard = async function() {
    const canvas = document.getElementById('story-canvas');
    if (!canvas) return;

    const shareBtn = document.querySelector('#modal-story-card button[onclick="shareStoryCard()"]');
    const origHtml = shareBtn ? shareBtn.innerHTML : '';
    if (shareBtn) shareBtn.innerHTML = '<i class="ph-bold ph-spinner ph-spin"></i> Compartiendo...';

    try {
        const dataUrl = canvas.toDataURL('image/png');
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const fileName = 'gym_tracker_historia_' + Date.now() + '.png';

        // 1. Android Capacitor Native Sharing (Passes REAL PNG FILE to Instagram, WhatsApp, etc. WITHOUT PLAIN TEXT!)
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem && window.Capacitor.Plugins.Share) {
            try {
                const { Filesystem, Share } = window.Capacitor.Plugins;
                const writeResult = await Filesystem.writeFile({
                    path: fileName,
                    data: base64Data,
                    directory: 'CACHE'
                });

                await Share.share({
                    title: 'Mi Historia de Entrenamiento',
                    dialogTitle: 'Compartir Imagen de Historia',
                    files: [writeResult.uri]
                });
                try {
                    const achData = loadAchievements();
                    if (!achData.unlocked['story_ambassador']) {
                        achData.unlocked['story_ambassador'] = { unlockedAt: Date.now() };
                        saveAchievements(achData);
                        const aObj = ACHIEVEMENTS_CATALOG.find(a => a.id === 'story_ambassador');
                        if (aObj && typeof showAchievementToast === 'function') showAchievementToast(aObj);
                    }
                } catch(e) {}
                return;
            } catch (capErr) {
                console.warn('Capacitor native share error, trying Web Share fallback:', capErr);
            }
        }

        // 2. Web Share API with File object
        if (canvas.toBlob && navigator.canShare) {
            const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
            if (blob) {
                const file = new File([blob], fileName, { type: 'image/png' });
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: 'Gym Tracker Historia',
                        files: [file]
                    });
                    return;
                }
            }
        }

        // 3. Fallback: Download
        await downloadStoryCard();
    } catch(err) {
        console.error('Error in shareStoryCard:', err);
        await downloadStoryCard();
    } finally {
        if (shareBtn) shareBtn.innerHTML = origHtml;
    }
};

// Check achievements upon completing workouts
const origFinishWorkout = window.finishWorkout;


window.openTechniqueModal = function(exerciseId) {
    const dbEx = (state.exercises || []).find(e => e.id === exerciseId);
    if (!dbEx) return;
    const modal = document.getElementById('modal-exercise-technique');
    if (!modal) return;

    try {
        let viewed = JSON.parse(localStorage.getItem('gym_technique_viewed') || '[]');
        if (!viewed.includes(exerciseId)) {
            viewed.push(exerciseId);
            localStorage.setItem('gym_technique_viewed', JSON.stringify(viewed));
            if (viewed.length >= 10 && typeof checkAndUnlockAchievements === 'function') {
                checkAndUnlockAchievements();
            }
        }
    } catch(e) {}

    const titleEl = document.getElementById('modal-technique-title');
    const groupEl = document.getElementById('modal-technique-group');
    if (titleEl) titleEl.textContent = typeof getTrExName === 'function' ? getTrExName(dbEx.name) : dbEx.name;
    if (groupEl) groupEl.textContent = (translations[state.language]?.groups && translations[state.language].groups[dbEx.group]) ? translations[state.language].groups[dbEx.group] : (dbEx.group || 'Sin Grupo');

    const mediaContainer = document.getElementById('modal-technique-media');
    if (mediaContainer) {
        mediaContainer.innerHTML = '';
        const ytID = typeof extractYouTubeID === 'function' ? extractYouTubeID(dbEx.youtubeLink) : null;
        if (ytID) {
            mediaContainer.style.display = 'block';
            mediaContainer.innerHTML = '<iframe src="https://www.youtube.com/embed/' + ytID + '" allowfullscreen style="width: 100%; aspect-ratio: 16/9; border: none; border-radius: 12px;"></iframe>';
        } else if (dbEx.imageData) {
            mediaContainer.style.display = 'block';
            mediaContainer.innerHTML = '<img src="' + dbEx.imageData + '" onclick="openLightbox(\'' + dbEx.imageData + '\')" style="width: 100%; max-height: 220px; object-fit: contain; border-radius: 12px; background: #000; cursor: pointer;">';
        } else {
            mediaContainer.style.display = 'none';
        }
    }

    let descText = dbEx.description;
    if (!descText && typeof defaultExercises !== 'undefined') {
        const def = defaultExercises.find(e => e.id === dbEx.id || e.name === dbEx.name);
        if (def && def.description) descText = def.description;
    }
    if (!descText) {
        descText = 'Técnica: Mantén una postura firme, controla la respiración y enfatiza la fase excéntrica (bajada) para maximizar la hipertrofia y seguridad.';
    }
    if (typeof getTrExDesc === 'function') {
        descText = getTrExDesc(dbEx.name, descText);
    }
    const descContainer = document.getElementById('modal-technique-desc');
    if (descContainer) {
        descContainer.textContent = descText;
    }

    const prsContainer = document.getElementById('modal-technique-prs');
    if (prsContainer) {
        prsContainer.innerHTML = '';
        const prHeavy = typeof getBestPR === 'function' ? getBestPR(dbEx.id, 'heavy') : null;
        const prHyp = typeof getBestPR === 'function' ? getBestPR(dbEx.id, 'hypertrophy') : null;
        if (prHeavy && prHeavy.weight > 0) {
            prsContainer.innerHTML += '<div style="background: rgba(220, 38, 38, 0.15); border: 1px solid rgba(220, 38, 38, 0.4); border-radius: 8px; padding: 4px 10px; font-size: 11.5px; font-weight: 700; color: #f87171;"><i class="ph-bold ph-trophy"></i> PR Pesado: ' + prHeavy.weight + ' kg × ' + prHeavy.reps + '</div>';
        }
        if (prHyp && prHyp.weight > 0) {
            prsContainer.innerHTML += '<div style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 8px; padding: 4px 10px; font-size: 11.5px; font-weight: 700; color: #60a5fa;"><i class="ph-bold ph-trophy"></i> PR Hipertrofia: ' + prHyp.weight + ' kg × ' + prHyp.reps + '</div>';
        }
    }

    modal.classList.add('active');
};



window.isEditingCompletedWorkout = false;

window.toggleEditCompletedWorkout = function() {
    window.isEditingCompletedWorkout = !window.isEditingCompletedWorkout;
    const btn = document.getElementById('btn-edit-completed-workout');
    const btnText = document.getElementById('btn-edit-completed-workout-text');
    const footer = document.getElementById('workout-footer');
    const saveBtn = document.getElementById('btn-save-completed-workout');
    const finishBtn = document.getElementById('finish-workout');

    if (window.isEditingCompletedWorkout) {
        if (btnText) btnText.textContent = 'Cancelar Edición';
        if (btn) {
            btn.style.borderColor = 'var(--color-heavy)';
            btn.style.color = 'var(--color-heavy)';
        }
        if (footer) footer.style.display = 'block';
        if (saveBtn) saveBtn.style.display = 'flex';
        if (finishBtn) finishBtn.style.display = 'none';
    } else {
        if (btnText) btnText.textContent = 'Editar Sesión';
        if (btn) {
            btn.style.borderColor = 'var(--color-accent)';
            btn.style.color = 'var(--color-accent)';
        }
        if (saveBtn) saveBtn.style.display = 'none';
        if (footer) footer.style.display = 'none';
    }

    renderWorkout();
};

window.saveEditedCompletedWorkout = function() {
    if (!activeSession) return;
    syncActiveWorkoutInputsFromDOM();

    // 1. Update session in state.sessions
    const sessionInCal = (state.sessions || []).find(s => s.id === activeSession.id);
    if (sessionInCal) {
        sessionInCal.exercises = JSON.parse(JSON.stringify(activeSession.exercises || []));
        if (activeSession.completedWorkoutId) sessionInCal.completedWorkoutId = activeSession.completedWorkoutId;
    }

    // 2. Find matching record in state.completedWorkouts using all strategies
    let compRecord = null;
    if (activeSession.completedWorkoutId) {
        compRecord = (state.completedWorkouts || []).find(w => w.id === activeSession.completedWorkoutId);
    }
    if (!compRecord && activeSession.id) {
        compRecord = (state.completedWorkouts || []).find(w => w.sessionId === activeSession.id || w.id === activeSession.id);
    }
    if (!compRecord && activeSession.name) {
        let fDate = '';
        if (activeSession.date && activeSession.date.includes('-')) {
            const [y, m, d] = activeSession.date.split('-');
            fDate = `${d}/${m}/${y}`;
        }
        compRecord = (state.completedWorkouts || []).find(w => w.name === activeSession.name && (w.date === fDate || w.date === activeSession.date));
    }
    if (!compRecord && activeSession.name) {
        const byName = (state.completedWorkouts || []).filter(w => w.name === activeSession.name);
        if (byName.length > 0) compRecord = byName[byName.length - 1];
    }

    // 3. Update existing record or insert if missing
    if (compRecord) {
        compRecord.exercises = JSON.parse(JSON.stringify(activeSession.exercises || []));
        compRecord.sessionId = activeSession.id;
        activeSession.completedWorkoutId = compRecord.id;
        if (sessionInCal) sessionInCal.completedWorkoutId = compRecord.id;
    } else {
        const newRecord = {
            id: Date.now().toString(),
            sessionId: activeSession.id,
            completedAt: Date.now(),
            date: formatDate(activeSession.date || new Date()),
            name: activeSession.name || 'Entrenamiento',
            type: activeSession.type || 'hypertrophy',
            duration: activeSession.duration || '45:00',
            exercises: JSON.parse(JSON.stringify(activeSession.exercises || []))
        };
        if (!Array.isArray(state.completedWorkouts)) state.completedWorkouts = [];
        state.completedWorkouts.push(newRecord);
        activeSession.completedWorkoutId = newRecord.id;
        if (sessionInCal) sessionInCal.completedWorkoutId = newRecord.id;
    }

    // 4. Recalculate PRs and refresh all views
    recalculatePRs();
    saveState();
    renderGlobalHistory();
    renderCalendar();
    if (typeof refreshMuscleFatigueMap === 'function') refreshMuscleFatigueMap();
    if (typeof renderWeeklyMuscleVolume === 'function') renderWeeklyMuscleVolume();
    if (typeof renderAchievementsView === 'function') renderAchievementsView();

    window.isEditingCompletedWorkout = false;
    const btnText = document.getElementById('btn-edit-completed-workout-text');
    const btn = document.getElementById('btn-edit-completed-workout');
    const footer = document.getElementById('workout-footer');
    const saveBtn = document.getElementById('btn-save-completed-workout');
    
    if (btnText) btnText.textContent = 'Editar Sesión';
    if (btn) {
        btn.style.borderColor = 'var(--color-accent)';
        btn.style.color = 'var(--color-accent)';
    }
    if (saveBtn) saveBtn.style.display = 'none';
    if (footer) footer.style.display = 'none';

    renderWorkout();
    alert('¡Cambios guardados con éxito en el historial y récords!');
};



// =========================================================================
// GESTOR DE MOLESTIAS Y ARTICULACIONES SENSIBLES
// =========================================================================
window.JOINT_DEFINITIONS = [
    { id: 'hombro', name: 'Hombro', icon: 'ph-hand-fist', desc: 'Manguito rotador / Impingement subacromial' },
    { id: 'codo', name: 'Codo', icon: 'ph-arm', desc: 'Epicondilitis / Epitrocleitis / Tendón tríceps' },
    { id: 'muneca', name: 'Muñeca', icon: 'ph-hand', desc: 'Inestabilidad / Tendinitis flexores/extensores' },
    { id: 'lumbar', name: 'Espalda Baja (Lumbar)', icon: 'ph-spine', desc: 'Sobrecarga lumbar / Compresión discal' },
    { id: 'rodilla', name: 'Rodilla', icon: 'ph-person-simple-walk', desc: 'Tendón rotuliano / Menisco / Cargas profundas' },
    { id: 'cadera', name: 'Cadera', icon: 'ph-person', desc: 'Pinzamiento / Flexores / Movilidad profunda' }
];

window.getExerciseJointStress = function(exName, exGroup) {
    if (!state.jointIssues) return null;
    const n = (exName || '').toLowerCase();
    const g = (exGroup || '').toLowerCase();

    // Check Hombro
    if (state.jointIssues['hombro'] && state.jointIssues['hombro'].active) {
        const triggers = ['militar tras nuca', 'tras nuca', 'fondos', 'dips', 'apertura', 'press de banca plano', 'press banca plano', 'press declinado', 'remo al mentón', 'remo mentón'];
        if (triggers.some(t => n.includes(t))) {
            return {
                jointId: 'hombro',
                jointName: 'Hombro',
                issue: state.jointIssues['hombro'],
                reason: 'Este ejercicio coloca el hombro en rotación externa extrema o máxima palanca anterior, aumentando el estrés sobre el manguito rotador.',
                safeKeywords: ['neutro', 'convergente', 'polea', 'mancuerna']
            };
        }
    }

    // Check Codo
    if (state.jointIssues['codo'] && state.jointIssues['codo'].active) {
        const triggers = ['francés', 'frances', 'skull crusher', 'barra recta', 'rompecráneos', 'fondos entre bancos'];
        if (triggers.some(t => n.includes(t))) {
            return {
                jointId: 'codo',
                jointName: 'Codo',
                issue: state.jointIssues['codo'],
                reason: 'El agarre rígido con barra recta o la flexión profunda de codo en este ángulo genera sobrecarga en los tendones del tríceps o antebrazo.',
                safeKeywords: ['cuerda', 'martillo', 'barra z', 'polea']
            };
        }
    }

    // Check Lumbar
    if (state.jointIssues['lumbar'] && state.jointIssues['lumbar'].active) {
        const triggers = ['peso muerto', 'deadlift', 'buenos días', 'buenos dias', 'good morning', 'sentadilla con barra', 'remo con barra', 'pendlay'];
        if (triggers.some(t => n.includes(t))) {
            return {
                jointId: 'lumbar',
                jointName: 'Lumbar',
                issue: state.jointIssues['lumbar'],
                reason: 'Carga axial directa o flexión de tronco bajo carga pesada, con alto estrés de compresión en las vértebras lumbares.',
                safeKeywords: ['apoyo en pecho', 'pecho apoyado', 'prensa', 'búlgara', 'bulgara', 'máquina']
            };
        }
    }

    // Check Rodilla
    if (state.jointIssues['rodilla'] && state.jointIssues['rodilla'].active) {
        const triggers = ['sentadilla profunda', 'prensa vertical', 'sissy', 'extensión de cuádriceps', 'extension de cuadriceps', 'extensión cuádriceps', 'sentadilla hack'];
        if (triggers.some(t => n.includes(t))) {
            return {
                jointId: 'rodilla',
                jointName: 'Rodilla',
                issue: state.jointIssues['rodilla'],
                reason: 'Ángulos de flexión aguda de rodilla con desplazamiento tibial que incrementan la tensión sobre el tendón rotuliano y la rótula.',
                safeKeywords: ['búlgara', 'bulgara', 'zancada hacia atrás', 'pies altos', 'curl femoral']
            };
        }
    }

    // Check Muñeca
    if (state.jointIssues['muneca'] && state.jointIssues['muneca'].active) {
        const triggers = ['barra recta', 'fondos en paralelas'];
        if (triggers.some(t => n.includes(t))) {
            return {
                jointId: 'muneca',
                jointName: 'Muñeca',
                issue: state.jointIssues['muneca'],
                reason: 'El ángulo forzado en pronación o extensión máxima genera tensión sobre los ligamentos de la muñeca.',
                safeKeywords: ['mancuerna', 'barra z', 'cuerda', 'neutro']
            };
        }
    }

    // Check Cadera
    if (state.jointIssues['cadera'] && state.jointIssues['cadera'].active) {
        const triggers = ['sumo', 'sentadilla profunda', 'prensa profunda'];
        if (triggers.some(t => n.includes(t))) {
            return {
                jointId: 'cadera',
                jointName: 'Cadera',
                issue: state.jointIssues['cadera'],
                reason: 'Gran abducción o flexión extrema de cadera que puede generar pinzamiento en el labrum o tensión en flexores.',
                safeKeywords: ['media', 'controlada', 'elevación de talones', 'zancada corta']
            };
        }
    }

    return null;
};

window.openJointIssuesModal = function() {
    state.jointIssues = state.jointIssues || {};
    renderJointIssuesList();
    const modal = document.getElementById('modal-joint-issues');
    if (modal) modal.classList.add('active');
};

window.renderJointIssuesList = function() {
    const container = document.getElementById('joint-issues-list');
    if (!container) return;

    state.jointIssues = state.jointIssues || {};

    let html = '';
    JOINT_DEFINITIONS.forEach(def => {
        const issue = state.jointIssues[def.id] || { active: false, side: 'ambos', severity: 'moderada', notes: '' };
        const isActive = !!issue.active;

        html += `
            <div class="card joint-card-${def.id}" style="padding: 12px 14px; border-radius: 16px; background: var(--bg-surface); border: 1px solid ${isActive ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)'};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 34px; height: 34px; border-radius: 10px; background: ${isActive ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-surface-elevated)'}; display: flex; align-items: center; justify-content: center; color: ${isActive ? '#f59e0b' : 'var(--text-secondary)'}; font-size: 18px;">
                            <i class="ph-bold ${def.icon}"></i>
                        </div>
                        <div>
                            <div style="font-weight: 700; font-size: 13.5px; color: var(--text-primary);">${def.name}</div>
                            <div style="font-size: 11px; color: var(--text-secondary);">${def.desc}</div>
                        </div>
                    </div>
                    <label class="switch" style="position: relative; display: inline-block; width: 44px; height: 24px;">
                        <input type="checkbox" ${isActive ? 'checked' : ''} onchange="toggleJointIssue('${def.id}', this.checked)" style="opacity: 0; width: 0; height: 0;">
                        <span class="slider round" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isActive ? '#f59e0b' : 'rgba(255,255,255,0.1)'}; transition: .3s; border-radius: 24px;">
                            <span style="position: absolute; content: ''; height: 18px; width: 18px; left: ${isActive ? '23px' : '3px'}; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%;"></span>
                        </span>
                    </label>
                </div>

                ${isActive ? `
                    <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 11.5px; font-weight: 600; color: var(--text-secondary);">Lado:</span>
                            <div style="display: flex; gap: 4px;">
                                ${['izq', 'der', 'ambos'].map(s => {
                                    const sel = issue.side === s;
                                    const labels = { izq: 'Izquierdo', der: 'Derecho', ambos: 'Ambos' };
                                    return `<button type="button" class="btn-secondary" onclick="setJointSide('${def.id}', '${s}')" style="font-size: 10.5px; padding: 3px 8px; border-radius: 6px; background: ${sel ? '#f59e0b' : 'var(--bg-surface-elevated)'}; color: ${sel ? '#000' : 'var(--text-secondary)'}; font-weight: 700; border: none; cursor: pointer;">${labels[s]}</button>`;
                                }).join('')}
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 11.5px; font-weight: 600; color: var(--text-secondary);">Intensidad:</span>
                            <div style="display: flex; gap: 4px;">
                                ${['leve', 'moderada', 'alta'].map(sev => {
                                    const sel = issue.severity === sev;
                                    const colors = { leve: '#10b981', moderada: '#f59e0b', alta: '#ef4444' };
                                    return `<button type="button" class="btn-secondary" onclick="setJointSeverity('${def.id}', '${sev}')" style="font-size: 10.5px; padding: 3px 8px; border-radius: 6px; background: ${sel ? colors[sev] : 'var(--bg-surface-elevated)'}; color: ${sel ? '#fff' : 'var(--text-secondary)'}; font-weight: 700; border: none; cursor: pointer; text-transform: capitalize;">${sev}</button>`;
                                }).join('')}
                            </div>
                        </div>

                        <input type="text" placeholder="Notas (ej: dolor en rotación externa)..." value="${escapeHtml(issue.notes || '')}" onchange="setJointNotes('${def.id}', this.value)" style="width: 100%; font-size: 11.5px; padding: 6px 10px; border-radius: 8px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); color: var(--text-primary); margin-top: 2px;">
                    </div>
                ` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
};

window.toggleJointIssue = function(jointId, active) {
    state.jointIssues = state.jointIssues || {};
    state.jointIssues[jointId] = state.jointIssues[jointId] || { side: 'ambos', severity: 'moderada', notes: '' };
    state.jointIssues[jointId].active = active;
    renderJointIssuesList();
    updateJointIssuesBadge();
};

window.setJointSide = function(jointId, side) {
    if (state.jointIssues && state.jointIssues[jointId]) {
        state.jointIssues[jointId].side = side;
        renderJointIssuesList();
    }
};

window.setJointSeverity = function(jointId, severity) {
    if (state.jointIssues && state.jointIssues[jointId]) {
        state.jointIssues[jointId].severity = severity;
        renderJointIssuesList();
    }
};

window.setJointNotes = function(jointId, notes) {
    if (state.jointIssues && state.jointIssues[jointId]) {
        state.jointIssues[jointId].notes = notes;
    }
};

window.updateJointIssuesBadge = function() {
    const badge = document.getElementById('joint-issues-count-badge');
    if (!badge) return;
    const activeCount = Object.values(state.jointIssues || {}).filter(j => j.active).length;
    if (activeCount > 0) {
        badge.style.display = 'inline-block';
        badge.textContent = activeCount;
    } else {
        badge.style.display = 'none';
    }
};

window.saveAndCloseJointIssuesModal = function() {
    if (typeof saveState === 'function') saveState();
    updateJointIssuesBadge();
    const modal = document.getElementById('modal-joint-issues');
    if (modal) modal.classList.remove('active');
    if (activeSession && typeof renderWorkout === 'function') {
        renderWorkout();
    }
    if (typeof showToast === 'function') {
        showToast('Molestias articulares guardadas');
    }
};

window.openJointStressModal = function(exerciseId, exerciseName) {
    const targetEx = (state.exercises || []).find(e => e.id === exerciseId) || { name: exerciseName };
    const stressMatch = getExerciseJointStress(targetEx.name, targetEx.group);
    if (!stressMatch) return;

    const modal = document.getElementById('modal-joint-stress-alert');
    if (!modal) return;

    document.getElementById('joint-stress-modal-title').textContent = `Aviso: ${stressMatch.jointName} Sensible`;
    document.getElementById('joint-stress-modal-exname').textContent = getTrExName(targetEx.name);

    const sideText = stressMatch.issue.side ? ` (${stressMatch.issue.side === 'ambos' ? 'ambos lados' : 'lado ' + stressMatch.issue.side})` : '';
    const sevText = stressMatch.issue.severity ? ` • Severidad ${stressMatch.issue.severity}` : '';
    const noteText = stressMatch.issue.notes ? `<div style="margin-top:6px; font-style: italic; color: #f59e0b;">Nota: "${escapeHtml(stressMatch.issue.notes)}"</div>` : '';

    document.getElementById('joint-stress-modal-explanation').innerHTML = `
        <div style="font-weight: 700; color: #f59e0b; margin-bottom: 4px;">
            ⚠️ Tienes registrada una molestia en ${stressMatch.jointName}${sideText}${sevText}
        </div>
        <div>${stressMatch.reason}</div>
        ${noteText}
    `;

    // Find safe alternative exercises from database
    const altsContainer = document.getElementById('joint-stress-modal-alternatives');
    const safeCandidates = getSafeAlternativesForExercise(targetEx.name, targetEx.group, stressMatch.safeKeywords);

    if (safeCandidates.length === 0) {
        altsContainer.innerHTML = `<div class="empty-state" style="padding: 12px; font-size: 12.5px; color: var(--text-secondary);">No hay variantes automáticas disponibles. Puedes usar el botón estándar de Sustituir para elegir cualquier otro ejercicio.</div>`;
    } else {
        altsContainer.innerHTML = safeCandidates.map(alt => {
            const trName = getTrExName(alt.name);
            return `
                <div class="card" style="padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px; border-radius: 12px; background: var(--bg-surface); border: 1px solid var(--border-color);">
                    <div style="text-align: left; overflow: hidden;">
                        <div style="font-weight: 700; font-size: 13px; color: var(--text-primary); text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${trName}</div>
                        <div style="font-size: 11px; color: #10b981; font-weight: 600;">Amigable con ${stressMatch.jointName}</div>
                    </div>
                    <button type="button" class="btn-primary" style="padding: 6px 12px; font-size: 11.5px; border-radius: 8px; flex-shrink: 0; background: #10b981; border-color: #10b981; color: #fff;" onclick="replaceWithSafeAlternative('${alt.id}', '${exerciseId}')">
                        Sustituir
                    </button>
                </div>
            `;
        }).join('');
    }

    modal.classList.add('active');
};

window.getSafeAlternativesForExercise = function(oldExName, oldExGroup, safeKeywords) {
    const allEx = state.exercises || [];
    const oldGroupLower = (oldExGroup || '').toLowerCase();

    const groupMatches = allEx.filter(e => {
        if (e.name === oldExName) return false;
        const eGroup = (e.group || '').toLowerCase();
        const sameGroup = eGroup === oldGroupLower || 
            (oldGroupLower.includes('pecho') && eGroup.includes('pecho')) || 
            (oldGroupLower.includes('espalda') && eGroup.includes('espalda')) || 
            (oldGroupLower.includes('pierna') && eGroup.includes('pierna')) || 
            (oldGroupLower.includes('tríceps') && eGroup.includes('tríceps')) || 
            (oldGroupLower.includes('bíceps') && eGroup.includes('bíceps')) || 
            (oldGroupLower.includes('hombro') && eGroup.includes('hombro'));
        return sameGroup;
    });

    const safeCandidates = groupMatches.filter(e => !getExerciseJointStress(e.name, e.group));
    safeCandidates.sort((a, b) => {
        const aHits = (safeKeywords || []).filter(k => a.name.toLowerCase().includes(k)).length;
        const bHits = (safeKeywords || []).filter(k => b.name.toLowerCase().includes(k)).length;
        return bHits - aHits;
    });

    return safeCandidates.slice(0, 4);
};

window.replaceWithSafeAlternative = function(newExId, oldExId) {
    if (!activeSession) return;
    const newEx = (state.exercises || []).find(e => e.id === newExId);
    if (!newEx) return;

    const targetSessionEx = (activeSession.exercises || []).find(e => e.exerciseId === oldExId);
    if (!targetSessionEx) return;

    targetSessionEx.exerciseId = newEx.id;
    targetSessionEx.name = newEx.name;

    if (typeof autoSaveWorkout === 'function') autoSaveWorkout();
    if (typeof renderWorkout === 'function') renderWorkout();

    const modal = document.getElementById('modal-joint-stress-alert');
    if (modal) modal.classList.remove('active');
};


// =========================================================================
// REAL ACTIVITY & SAMSUNG HEALTH INTEGRATION
// =========================================================================
let activityDateOffset = 0; // 0 = today, -1 = yesterday, etc.
let cachedDailySteps = 0;
let hasSensorHardware = true;
let hasSensorPermission = true;


window.renderActivityView = function() {
    const container = document.getElementById('activity-cards-container');
    if (!container) return;

    // Daily step goal
    const goal = (state.activityGoal && state.activityGoal > 0) ? state.activityGoal : 10000;
    
    // Calculate date label
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + activityDateOffset);
    const dateStr = targetDate.toISOString().split('T')[0];
    
    const dateLabelEl = document.getElementById('activity-current-date-label');
    if (dateLabelEl) {
        if (activityDateOffset === 0) dateLabelEl.textContent = 'Hoy, ' + targetDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        else if (activityDateOffset === -1) dateLabelEl.textContent = 'Ayer, ' + targetDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        else dateLabelEl.textContent = targetDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    }

    const nextBtn = document.getElementById('btn-activity-next-day');
    if (nextBtn) nextBtn.disabled = (activityDateOffset >= 0);

    // Get real step count from state or cachedDailySteps
    if (!state.activityStepsByDate) state.activityStepsByDate = {};
    const steps = (activityDateOffset === 0) ? (state.activityStepsByDate[dateStr] || cachedDailySteps || 0) : (state.activityStepsByDate[dateStr] || 0);
    const distanceKm = (steps * 0.00075).toFixed(2);
    const stepKcal = Math.round(steps * 0.04);
    
    // Progress calculation
    const progressPercent = Math.min(100, Math.round((steps / goal) * 100));
    const circumference = 2 * Math.PI * 52; // r = 52
    const dashoffset = circumference - (circumference * progressPercent / 100);

    
    // Synced Sleep Card (from Health Connect)
    if (!state.activitySleepByDate) state.activitySleepByDate = {};
    const sleepData = state.activitySleepByDate[dateStr];
    let sleepCardHtml = '';
    if (sleepData) {
        sleepCardHtml = `
            <div class="card" style="padding: 16px; background: var(--bg-surface); border-radius: 18px; border: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <div style="font-size: 13.5px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                        <i class="ph-bold ph-moon" style="color: #8b5cf6;"></i> Sueño y Descanso
                    </div>
                    <span style="font-size: 11px; color: #8b5cf6; font-weight: 700; background: rgba(139,92,246,0.12); padding: 3px 8px; border-radius: 6px;">Samsung Health</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div>
                        <div style="font-size: 24px; font-weight: 900; color: var(--text-primary);">${sleepData.hours}h ${sleepData.minutes}m</div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">Tiempo total dormido</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 13px; font-weight: 700;">${sleepData.bedtime} → ${sleepData.wakeTime}</div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">Horario de sueño</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Synced Exercises Card (from Health Connect)
    if (!state.activityExercisesByDate) state.activityExercisesByDate = {};
    const externalExercises = state.activityExercisesByDate[dateStr] || [];
    let externalExHtml = '';
    if (externalExercises.length > 0) {
        externalExHtml = `
            <div class="card" style="padding: 16px; background: var(--bg-surface); border-radius: 18px; border: 1px solid var(--border-color);">
                <div style="font-size: 13.5px; font-weight: 800; display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                    <i class="ph-bold ph-person-simple-walk" style="color: #10b981;"></i> Actividades Samsung Health
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${externalExercises.map(ex => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--bg-surface-elevated); border-radius: 10px;">
                            <div style="font-weight: 700; font-size: 13px;">${escapeHtml(ex.title)}</div>
                            <div style="font-size: 11.5px; color: #10b981; font-weight: 700;">${ex.durationMin} min</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Real workouts from Gym Tracker for this date
    const todayWorkouts = (state.workouts || []).filter(w => {
        if (!w.date) return false;
        return w.date.startsWith(dateStr);
    });

    let workoutsListHtml = '';
    if (todayWorkouts.length > 0) {
        workoutsListHtml = todayWorkouts.map(w => {
            const setsCount = (w.exercises || []).reduce((acc, ex) => acc + (ex.sets || []).length, 0);
            return `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--bg-surface-elevated); border-radius: 12px; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; color: #10b981;">
                            <i class="ph-bold ph-barbell"></i>
                        </div>
                        <div>
                            <div style="font-weight: 700; font-size: 13px;">${escapeHtml(w.name || 'Entrenamiento Gym Tracker')}</div>
                            <div style="font-size: 11px; color: var(--text-secondary);">${setsCount} series completadas</div>
                        </div>
                    </div>
                    <span style="font-size: 11px; font-weight: 700; color: #10b981; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: 6px;">Completado</span>
                </div>
            `;
        }).join('');
    } else {
        workoutsListHtml = `
            <div style="font-size: 12px; color: var(--text-secondary); text-align: center; padding: 12px 0;">
                No hay entrenamientos de Gym Tracker registrados en este día.
            </div>
        `;
    }

    // Hardware / permission banner
    let permissionBannerHtml = '';
    if (!hasSensorPermission) {
        permissionBannerHtml = `
            <div style="padding: 12px 14px; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #f59e0b; font-weight: 600;">
                    <i class="ph-bold ph-warning" style="font-size: 18px;"></i> Permiso de actividad física pendiente
                </div>
                <button type="button" class="btn-primary" onclick="requestNativeSensorPermission()" style="padding: 6px 12px; font-size: 11.5px; font-weight: 700; background: #f59e0b; border: none; border-radius: 8px; color: #000; cursor: pointer;">
                    Permitir
                </button>
            </div>
        `;
    }

    container.innerHTML = `
        ${permissionBannerHtml}

        <!-- MAIN STEP RING CARD -->
        <div class="card" style="padding: 22px 16px; display: flex; flex-direction: column; align-items: center; background: var(--bg-surface); border-radius: 20px; border: 1px solid var(--border-color);">
            <div style="position: relative; width: 140px; height: 140px; display: flex; align-items: center; justify-content: center;">
                <svg width="140" height="140" style="transform: rotate(-90deg);">
                    <circle cx="70" cy="70" r="52" stroke="rgba(255,255,255,0.07)" stroke-width="12" fill="none"/>
                    <circle cx="70" cy="70" r="52" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"
                        stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}" style="transition: stroke-dashoffset 0.6s ease;"/>
                </svg>
                <div style="position: absolute; text-align: center; display: flex; flex-direction: column; align-items: center;">
                    <i class="ph-bold ph-sneaker-move" style="font-size: 20px; color: #10b981; margin-bottom: 2px;"></i>
                    <span style="font-size: 22px; font-weight: 900; line-height: 1;">${steps.toLocaleString('es-ES')}</span>
                    <span style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">de ${goal.toLocaleString('es-ES')}</span>
                </div>
            </div>

            <!-- Distance and Calories Row -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; margin-top: 20px;">
                <div style="padding: 12px; background: var(--bg-surface-elevated); border-radius: 14px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">Distancia</div>
                    <div style="font-size: 16px; font-weight: 800; margin-top: 2px;">${distanceKm} km</div>
                </div>
                <div style="padding: 12px; background: var(--bg-surface-elevated); border-radius: 14px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">Calorías en Pasos</div>
                    <div style="font-size: 16px; font-weight: 800; color: #f59e0b; margin-top: 2px;">${stepKcal} kcal</div>
                </div>
            </div>

            <!-- Fast Action: Adjust / Sync Steps Button -->
            <button type="button" class="btn-secondary" onclick="openActivitySettingsModal()" style="margin-top: 14px; width: 100%; padding: 10px 14px; border-radius: 12px; font-weight: 700; font-size: 12.5px; display: flex; align-items: center; justify-content: center; gap: 8px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer;">
                <i class="ph-bold ph-pencil-simple" style="color: #10b981; font-size: 16px;"></i> Ajustar / Sincronizar Pasos de Hoy
            </button>
        </div>

        <!-- SAMSUNG HEALTH LINKING CARD -->
        <div class="card" style="padding: 16px; background: var(--bg-surface); border-radius: 18px; border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 13.5px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                    <i class="ph-bold ph-heartbeat" style="color: #10b981;"></i> Conexión con Samsung Health
                </div>
                <span style="font-size: 11px; color: #10b981; font-weight: 600;">Health Connect</span>
            </div>
            <div style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
                Samsung Health comparte datos mediante <strong>Conexión de Salud (Health Connect)</strong>. Abre Samsung Health para verificar que está activa la sincronización:
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button type="button" class="btn-primary" onclick="openNativeHealthConnect()" style="padding: 9px 12px; font-size: 12px; font-weight: 700; background: #10b981; border: none; border-radius: 10px; color: white; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                    <i class="ph-bold ph-sliders"></i> Abrir Conexión
                </button>
                <button type="button" class="btn-secondary" onclick="openNativeSamsungHealth()" style="padding: 9px 12px; font-size: 12px; font-weight: 600; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                    <i class="ph-bold ph-arrow-square-out"></i> Samsung Health
                </button>
            </div>
        </div>

        ${sleepCardHtml}
        ${externalExHtml}
        <!-- REAL GYM TRACKER WORKOUTS CARD -->
        <div class="card" style="padding: 16px; background: var(--bg-surface); border-radius: 18px; border: 1px solid var(--border-color);">
            <div style="font-size: 13.5px; font-weight: 800; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <i class="ph-bold ph-barbell" style="color: #3b82f6;"></i> Sesiones de Entrenamiento del Día
            </div>
            ${workoutsListHtml}
        </div>
    `;
};



window.syncActivityData = function() {
    const spinIcon = document.getElementById('icon-sync-spin');
    if (spinIcon) spinIcon.classList.add('ph-spin');

    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.HealthSync) {
        // Call Kotlin Health Connect sync method
        window.Capacitor.Plugins.HealthSync.syncSamsungHealthData({ daysOffset: activityDateOffset }).then(res => {
            if (spinIcon) spinIcon.classList.remove('ph-spin');
            console.log('Health Connect sync result:', res);
            
            if (res && res.success) {
                const targetDate = new Date();
                targetDate.setDate(targetDate.getDate() + activityDateOffset);
                const dateStr = targetDate.toISOString().split('T')[0];

                if (!state.activityStepsByDate) state.activityStepsByDate = {};
                state.activityStepsByDate[dateStr] = res.steps || 0;
                cachedDailySteps = res.steps || 0;

                // Cache sleep data
                if (!state.activitySleepByDate) state.activitySleepByDate = {};
                if (res.hasSleep) {
                    state.activitySleepByDate[dateStr] = {
                        hours: res.sleepHours || 0,
                        minutes: res.sleepMinutes || 0,
                        bedtime: res.sleepBedtime || '--:--',
                        wakeTime: res.sleepWakeTime || '--:--',
                        title: res.sleepTitle || 'Sueño registrado'
                    };
                }

                // Cache exercises
                if (!state.activityExercisesByDate) state.activityExercisesByDate = {};
                if (res.exercises && res.exercises.length > 0) {
                    state.activityExercisesByDate[dateStr] = res.exercises;
                }

                if (typeof saveState === 'function') saveState();
                renderActivityView();

                if (typeof showToast === 'function') {
                    showToast('Samsung Health sincronizado: ' + (res.steps || 0).toLocaleString('es-ES') + ' pasos');
                }
            } else {
                // If permission needed or failed, open permission flow or show message
                if (res && res.error && res.error.includes('Permission')) {
                    if (window.Capacitor.Plugins.HealthSync.requestHealthPermissions) {
                        window.Capacitor.Plugins.HealthSync.requestHealthPermissions();
                    }
                } else {
                    renderActivityView();
                    if (typeof showToast === 'function') {
                        showToast(res?.error || 'No se recibieron datos de Health Connect');
                    }
                }
            }
        }).catch(err => {
            if (spinIcon) spinIcon.classList.remove('ph-spin');
            console.warn('Error syncing with Health Connect:', err);
            renderActivityView();
            if (typeof showToast === 'function') {
                showToast('Abre Conexión de Salud para conceder permisos a Gym Tracker');
            }
        });
    } else {
        setTimeout(() => {
            if (spinIcon) spinIcon.classList.remove('ph-spin');
            renderActivityView();
        }, 300);
    }
};

window.requestNativeSensorPermission = function() {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.HealthSync) {
        window.Capacitor.Plugins.HealthSync.requestHealthPermissions().catch(e => {
            window.Capacitor.Plugins.HealthSync.openHealthConnectSettings().catch(err => console.warn(err));
        });
    }
};


// =========================================================================
// ACTIVITY VIEW CONTROLLER & HELPERS
// =========================================================================

window.changeActivityDay = function(delta) {
    activityDateOffset += delta;
    if (activityDateOffset > 0) activityDateOffset = 0;
    renderActivityView();
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.HealthSync) {
        syncActivityData();
    }
};

window.openActivitySettingsModal = function() {
    const modal = document.getElementById('modal-activity-settings');
    const inputGoal = document.getElementById('input-step-goal');
    const inputSteps = document.getElementById('input-manual-steps');
    
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + activityDateOffset);
    const dateStr = targetDate.toISOString().split('T')[0];

    if (!state.activityStepsByDate) state.activityStepsByDate = {};
    const curSteps = state.activityStepsByDate[dateStr] || cachedDailySteps || 0;

    if (inputGoal) inputGoal.value = (state.activityGoal && state.activityGoal > 0) ? state.activityGoal : 10000;
    if (inputSteps) inputSteps.value = curSteps > 0 ? curSteps : '';

    if (modal) {
        modal.classList.add('active');
    }
};

window.setQuickStepGoal = function(goal) {
    const input = document.getElementById('input-step-goal');
    if (input) input.value = goal;
};

window.addStepsToManualInput = function(delta) {
    const input = document.getElementById('input-manual-steps');
    const current = parseInt(input ? input.value : 0, 10) || 0;
    if (input) input.value = current + delta;
};

window.setManualStepsQuick = function(val) {
    const input = document.getElementById('input-manual-steps');
    if (input) input.value = val;
};

window.applyManualSteps = function() {
    const input = document.getElementById('input-manual-steps');
    const val = parseInt(input ? input.value : 0, 10);
    if (!isNaN(val) && val >= 0) {
        cachedDailySteps = val;
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + activityDateOffset);
        const dateStr = targetDate.toISOString().split('T')[0];

        if (!state.activityStepsByDate) state.activityStepsByDate = {};
        state.activityStepsByDate[dateStr] = val;
        if (typeof saveState === 'function') saveState();

        const modal = document.getElementById('modal-activity-settings');
        if (modal) modal.classList.remove('active');

        renderActivityView();
        if (typeof showToast === 'function') {
            showToast('Pasos actualizados: ' + val.toLocaleString('es-ES'));
        }
    }
};

window.saveActivitySettings = function() {
    const input = document.getElementById('input-step-goal');
    const val = parseInt(input?.value, 10);
    if (!isNaN(val) && val > 0) {
        state.activityGoal = val;
        if (typeof saveState === 'function') saveState();
    }
    const modal = document.getElementById('modal-activity-settings');
    if (modal) modal.classList.remove('active');
    renderActivityView();
    if (typeof showToast === 'function') {
        showToast('Meta de pasos guardada: ' + (state.activityGoal || 10000).toLocaleString('es-ES'));
    }
};

window.openNativeHealthConnect = function() {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.HealthSync) {
        window.Capacitor.Plugins.HealthSync.requestHealthPermissions().catch(() => {
            window.Capacitor.Plugins.HealthSync.openHealthConnectSettings().catch(e => console.warn(e));
        });
    } else {
        alert('En tu teléfono Samsung, abre Samsung Health y ve a Ajustes > Conexión de Salud para autorizar a Gym Tracker.');
    }
};

window.openNativeSamsungHealth = function() {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.HealthSync) {
        window.Capacitor.Plugins.HealthSync.openSamsungHealthApp().catch(e => console.warn(e));
    } else {
        alert('Abre la app Samsung Health en tu dispositivo.');
    }
};


window.moveWorkoutExercise = function(idx, direction) {
    if (!window.activeSession || !window.activeSession.exercises) return;
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= window.activeSession.exercises.length) return;

    try {
        if (typeof syncActiveWorkoutInputsFromDOM === 'function') syncActiveWorkoutInputsFromDOM();
    } catch(e) {}

    const temp = window.activeSession.exercises[idx];
    window.activeSession.exercises[idx] = window.activeSession.exercises[targetIdx];
    window.activeSession.exercises[targetIdx] = temp;

    // UNLOCK CAOS CONTROLADO (Reordenar ejercicios en sesión activa)
    localStorage.setItem('gym_unlocked_controlled_chaos', 'true');
    if (typeof unlockAchievement === 'function') {
        unlockAchievement('controlled_chaos');
    }

    try {
        if (typeof autoSaveWorkout === 'function') autoSaveWorkout();
        if (typeof renderWorkout === 'function') renderWorkout();
    } catch(e) {}
    
    if (typeof showToast === 'function') {
        showToast('Orden del ejercicio actualizado');
    }
};


window.trackPRChangeForCarlo = function(exId, newWeight) {
    try {
        const wt = parseFloat(newWeight) || 0;
        if (wt <= 0) return;
        const todayStr = new Date().toISOString().split('T')[0];
        const key = 'gym_carlo_pr_history_' + todayStr;
        const raw = localStorage.getItem(key);
        const data = raw ? JSON.parse(raw) : {};

        if (!data[exId]) data[exId] = [];
        // If there was an earlier edit today and the new weight is higher:
        if (data[exId].length > 0) {
            const lastWt = data[exId][data[exId].length - 1];
            if (wt > lastWt) {
                localStorage.setItem('gym_unlocked_carlos_awakening', 'true');
                if (typeof unlockAchievement === 'function') unlockAchievement('carlos_awakening');
            }
        }
        data[exId].push(wt);
        localStorage.setItem(key, JSON.stringify(data));
    } catch(e) {}
};


// =========================================================================
// WELCOME TUTORIAL & GUIDE INTEGRATION
// =========================================================================
window.openWelcomeTutorialModal = function() {
    let m = document.getElementById('modal-welcome-tutorial');
    if (!m) {
        m = document.createElement('div');
        m.id = 'modal-welcome-tutorial';
        m.className = 'modal';
        m.style.cssText = 'display: none; position: fixed; inset: 0; z-index: 999999; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(5px); padding: 12px;';
        m.innerHTML = `
            <div class="modal-backdrop" style="position: absolute; inset: 0;" onclick="closeWelcomeTutorialModal()"></div>
            <iframe id="iframe-welcome-tutorial" src="tutorial-preview.html" style="width: 100%; max-width: 680px; height: min(92vh, 760px); border: none; border-radius: 24px; position: relative; z-index: 1000000; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); background: #0f172a;"></iframe>
        `;
        document.body.appendChild(m);
    }
    m.style.display = 'flex';
    m.classList.add('active');
    const iframe = document.getElementById('iframe-welcome-tutorial');
    if (iframe && (!iframe.src || iframe.src === 'about:blank')) {
        iframe.src = 'tutorial-preview.html';
    }
};

window.closeWelcomeTutorialModal = function() {
    const m = document.getElementById('modal-welcome-tutorial');
    if (m) {
        m.style.display = 'none';
        m.classList.remove('active');
    }
};
