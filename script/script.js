    //элементы страницы
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modal = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.querySelector('.burger');
    const nameComp = document.querySelector('.contacts');
    const next = document.querySelector('#next');
    const prev = document.querySelector('#prev');
    const send = document.querySelector('#send');
    const modalDialog = document.querySelector('.modal-dialog')

    //условие появления "бургер" кнопки
    let clientWidth = document.documentElement.clientWidth;
    if (clientWidth<=768){
        burgerBtn.style = "display: flex;"
    } else{
        burgerBtn.style = "display: none;"
    }
     //объект с вопросами и вариантами ответа
    const questions = [
        {
            question: "Какого цвета бургер вы хотите?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    //анимация появления модального окна
    let count = 0; 

    modalDialog.style = `transform: scale(${count});`;
    const animateModal = () => {
        modalDialog.style = `transform: scale(${count});`;
        count+=0.1;
        if(count <=1){
            requestAnimationFrame(animateModal);
        } else{
            count = 0;
        }
        
    }

    //функция запуска теста
    const playTest = () => {
        //итоговый выбор
        const finalAnswer = [];
        const object = {};

        let numQuestion = 0; //номер вопроса
        //рендер вариантов ответа
        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                    `
                formAnswers.appendChild(answerItem);
            })
        }
        //рендер вопроса
        const renderQuestions = (index) => {
            formAnswers.innerHTML = '';

            switch (true){
                case (numQuestion > 0 && numQuestion <= questions.length - 1):
                    questionTitle.textContent = `${questions[index].question}`;
                    next.classList.remove('d-none');
                    prev.classList.remove('d-none');
                    send.classList.add('d-none');
                    break;
                case  (numQuestion === 0):
                    questionTitle.textContent = `${questions[index].question}`;
                    prev.classList.add('d-none');
                    renderAnswers(numQuestion);
                    break;
                case (numQuestion === questions.length):
                    questionTitle.textContent = ``;
                    next.classList.add('d-none');
                    prev.classList.add('d-none');
                    send.classList.remove('d-none');
                    formAnswers.innerHTML = `
                    <div class="form-group">
                        <label for="numberPhone">Your phone...</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                    `;
                    break;
                case (numQuestion === questions.length+1):
                    formAnswers.textContent = `Спасибо за заявку! Менеджер свяжется с вами в ближайшее время!`

                    for (let key in object){
                        let newObject = {};
                        newObject[key] = object[key];
                        finalAnswer.push(newObject);
                    }                    

                    setTimeout(() =>{
                        modal.classList.toggle('d-block');
                        burgerBtn.classList.remove('active');
                        numQuestion = 0;
                    }, 3000);
                    break;
            }
        }

        const checkAnswer = () => {
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === "numberPhone");

            inputs.forEach((input, index) => {
                if (numQuestion >= 0 && numQuestion <= questions.length - 1){
                    object[`${index}_${questions[numQuestion].question}`] = input.value;
                } 
                if (numQuestion === questions.length){
                    object[`Номер телефона`] = input.value;
                }
            })



        }
        //обработчики событий кнопок далее и назад
        next.onclick = () => {
            checkAnswer();
            numQuestion++;
            renderQuestions(numQuestion);
            renderAnswers(numQuestion);
        }
        prev.onclick = () => {
            numQuestion--;
            renderQuestions(numQuestion);
            if(!numQuestion == 0){renderAnswers(numQuestion)}
        }
        send.onclick = () => {
            send.classList.add('d-none');
            numQuestion++;
            renderQuestions(numQuestion);
            checkAnswer();
            console.log(finalAnswer);
        }

        renderQuestions(numQuestion);
    }

    //слушатель для отлавливания ширины браузера (для появления "бургер" кнопки)
    window.addEventListener('resize', function(){
        clientWidth = document.documentElement.clientWidth;
        if(clientWidth>=768) {
            burgerBtn.style = "display: none;"
            nameComp.style = "display: flex;"
        }
        else {
            nameComp.style = "display: none;"
            burgerBtn.style = "display: flex;"
        }
    });
    //слушатель для з-акрытия модалки по клику за ее пределами
    document.addEventListener('click', function (e){
        if(!e.target.closest('.modal-dialog') &&
            !e.target.closest('.burger') &&
            !e.target.closest('#btnOpenModal')
        ){
            modal.classList.remove('d-block');
            burgerBtn.classList.remove('active');
        }
    });
    //слушатель для открытия модалки и запуска теста через "бургер" кнопку
    burgerBtn.addEventListener('click', function(){
        burgerBtn.classList.toggle('active');
        modal.classList.toggle('d-block');
        playTest();
    })
    //слушатель для открытия модалки и запуска теста через обычную кнопку
    btnOpenModal.addEventListener('click', function () {
        requestAnimationFrame(animateModal);
        modal.classList.toggle('d-block');
        next.classList.remove('d-none');
        playTest();
    });
    //слушатель для закрытия модалки по нажатию на крестик
    closeModal.addEventListener('click', function () {
        modal.classList.toggle('d-block');
        burgerBtn.classList.remove('active');
    });


