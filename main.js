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
    <div class='name-check'><input class='checkbox' value='%index%' type='checkbox'> %position%. %student%</div>
    <input class='reason hidden' placeholder='Причина отсутствия?' type='text'>
</label>`;

// На каждого студента цветовой тон смещается на colorIncrement вправо
let colorIncrement = 0;
for (const student of students) {
    const index = students.indexOf(student);
    document.getElementById('main').innerHTML += studentCard
        .replace('%student%', student)
        .replace(/%index%/g, index)
        .replace(/%position%/g, index + 1)
        .replace('%colorIncrement%', colorIncrement);

    colorIncrement += 10;
}

// Сперва заполняется список отсутсвтующих с причинами, затем в его начало добавляется элемент с их кол-вом
let copyButton = document.getElementById('button');
function copyToClipboard() {
    let absent = [];
    for (checkbox of document.getElementsByClassName('checkbox')) {
        if (checkbox.checked) {
            let reason = checkbox.parentNode.parentNode.lastElementChild.value.trim();
            reason != ''
                ? absent.push(`${students[checkbox.value]} (${reason})`)
                : absent.push(students[checkbox.value]);
        }
    }

    absent.unshift(`Число отсутствующих студентов на первой паре: ${absent.length}`);
    navigator.clipboard.writeText(absent.join('\n'));
    copyButton.innerText = 'Скопировано!';
}

// Слушает каждый чекбокс, берёт последний элемент родителя (student-card)
// и делает видимыи последний элемент - текстовое поле
let checkboxes = document.getElementsByClassName("checkbox");
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", function () {
        var textField = this.parentNode.parentNode.lastElementChild;
        this.checked
            ? textField.style.display = "block"
            : textField.style.display = "none";
    });
}
