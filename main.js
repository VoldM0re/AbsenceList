let students = [
    'Александров К.',
    'Батищев А.',
    'Белякова П.',
    'Буланов В.',
    'Буреева А.',
    'Величутин М.',
    'Воронов Р.',
    'Вострикова А.',
    'Давтян К.',
    'Евдокименко А.',
    'Иванов В.',
    'Игнатенков А.',
    'Карпенко Д.',
    'Лучин М.',
    'Малевич С.',
    'Меркулов Д.',
    'Никифоров Д.',
    'Осян А.',
    'Петренко В.',
    'Петросян А.',
    'Проворова Д.',
    'Романов И.',
    'Романюк И.',
    'Саталова Д.',
    'Сидорова А.',
    'Старковская М.',
    'Хабет Г.',
    'Хвесько В.',
    'Хмурович М.'
];

// Шаблон карточки студента
const studentCard = `
<label class='student-card' style='background-color: hsl(%colorIncrement%, 100%, 46%);'>
    <div class='name-check'>
        <input class='checkbox' value='%index%' type='checkbox'> %position%. %student%
    </div>
    <div class='hidden'>
        <input class='reason' placeholder='Причина отсутствия?' type='text'>
        <form class="presets">
            <label class='preset'>
                <input name='presets' type='radio'>
                <span>Работает</span>
            </label>
            <label class='preset'>
                <input name='presets' type='radio'>
                <span>Болеет</span>
            </label>
            <label class='preset'>
                <input name='presets' type='radio'>
                <span>По семейным</span>
            </label>
        </form>
    </div>
</label>`;

// На каждого студента цветовой тон смещается на colorIncrement вправо
let colorIncrement = 0;
for (const student of students) {
    const index = students.indexOf(student);
    document.getElementById('main').insertAdjacentHTML('beforeend', studentCard
        .replace('%student%', student)
        .replace(/%index%/g, index)
        .replace(/%position%/g, index + 1)
        .replace('%colorIncrement%', colorIncrement));
    colorIncrement += 10;
}

const copyButton = document.getElementById('button');
const checkboxes = document.querySelectorAll('.checkbox');
let absents = [];

// Сначала заполняется список отсутсвтующих с причинами, затем в его начало добавляется элемент с их кол-вом
function copyToClipboard() {
    absents.length = 0;
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            const hidden = checkbox.closest('.student-card').querySelector('.hidden');
            const presets = hidden.querySelectorAll('.preset');

            let presetText = '';
            for (const preset of presets) {
                if (preset.querySelector('input[type="radio"]').checked) {
                    presetText = preset.lastElementChild.textContent;
                    break;
                }
            }

            const fieldText = hidden.querySelector('.reason').value.trim();
            const studentId = students[checkbox.value]
            if (fieldText) {
                absents.push(`${studentId} (${fieldText})`);
            } else if (presetText) {
                absents.push(`${studentId} (${presetText})`);
            } else {
                absents.push(studentId);
            }

        }
    }

    absents.unshift(`Число отсутствующих студентов: ${absents.length}`);
    navigator.clipboard.writeText(absents.join('\n')).then(() => {
        copyButton.innerText = 'Скопировано!';
        starAnimation();
        setTimeout(() => {
            copyButton.innerText = 'Скопировать';
        }, 2000);
    });
}

// Слушает каждый чекбокс, берёт student-card и делает видимым элемент .hidden
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const hidden = checkbox.closest('.student-card').querySelector('.hidden');;
        hidden.style.display = checkbox.checked ? 'flex' : 'none';
    });
});


function starAnimation() {
    const star = document.getElementById('star');
    star.style.display = 'block';
    star.classList.add('animate');

    setTimeout(() => {
        star.style.display = 'none';
        star.classList.remove('animate');
    }, 2000);

}