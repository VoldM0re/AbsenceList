const List = {
    1: 'Александров К.',
    2: 'Батищев А.',
    3: 'Белякова П.',
    4: 'Буланов В.',
    5: 'Буреева А.',
    6: 'Величутин М.',
    7: 'Воронов Р.',
    8: 'Вострикова А.',
    9: 'Давтян К.',
    10: 'Евдокименко А.',
    11: 'Иванов В.',
    12: 'Игнатенков А.',
    13: 'Карпенко Д.',
    14: 'Лучин М.',
    15: 'Малевич С.',
    16: 'Меркулов Д.',
    17: 'Никифоров Д.',
    18: 'Новиков Н.',
    19: 'Осян А.',
    20: 'Петренко В.',
    21: 'Петросян А.',
    22: 'Проворова Д.',
    23: 'Романов И.',
    24: 'Романюк И.',
    25: 'Сараполов Р.',
    26: 'Саталова Д.',
    27: 'Сидорова А.',
    28: 'Старковская М.',
    29: 'Сунцов С.',
    30: 'Хабет Г.',
    31: 'Хвесько В.',
    32: 'Хмурович М.'
};

// Шаблон карточки студента
const studentCard = `
<label class='student-card' style='background-color: hsl(%colorIncrement%, 100%, 45%);' onclick='openReason()'>
    <div class='name-check'><input class='checkbox' value='%index%' type='checkbox'> %index%. %student%</div>
    <input class='reason hidden' placeholder='Причина отсутствия?' type='text'>
</label>`;


// На каждого студента цветовой тон смещается на colorIncrement вправо
let colorIncrement = 0;
for ([index, student] of Object.entries(List)) {
    document.getElementById('main').innerHTML += studentCard
        .replace('%student%', student)
        .replace(/%index%/g, index)
        .replace('%colorIncrement%', colorIncrement);

    colorIncrement += 9;
}



// Сперва заполняется список отсутсвтующих, затем в его начало добавляется элемент с их кол-вом
let copyButton = document.getElementById('button');
function copyToClipboard() {
    let absent = [];
    for (checkbox of document.getElementsByClassName('checkbox')) {
        if (checkbox.checked) {
            absent.push(List[checkbox.value]);
        }
    }

    absent.unshift(`Отсутствует: ${absent.length} студентов`);
    navigator.clipboard.writeText(absent.join('\n'));
    copyButton.innerText = 'Скопировано!';
}

function openReason() {

}

//Нужно найти следующего ребёнка