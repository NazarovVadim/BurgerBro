    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modal = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.querySelector('.burger');
    const nameComp = document.querySelector('.contacts');
    const next = document.querySelector('#next');
    const prev = document.querySelector('#prev');
    const modalDialog = document.querySelector('.modal-dialog')

    let clientWidth = document.documentElement.clientWidth;
    if (clientWidth<=768){
        burgerBtn.style = "display: flex;"
    } else{
        burgerBtn.style = "display: none;"
    }
    
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

    const playTest = () => {
        let numQuestion = 0;

        const renderAnswers = (index) => {
            formAnswers.innerHTML = '';

            if(index == 0) prev.style.display = "none";
            else prev.style.display = "block";
            
            if (index == questions.length-1) next.style.display = "none"
            else next.style.display = "block";

            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                    `
                formAnswers.appendChild(answerItem);
            })
        }
        const renderQuestions = (index) => {
            questionTitle.textContent = `${questions[index].question}`;
            renderAnswers(numQuestion);
            }
        
        next.onclick = () => {
            if (numQuestion < questions.length){
                numQuestion++;
                renderQuestions(numQuestion);
                renderAnswers(numQuestion);
            }
        }
        prev.onclick = () => {
            if (numQuestion>0){
                numQuestion--;
                renderQuestions(numQuestion);
                renderAnswers(numQuestion);
            }
        }

        renderQuestions(numQuestion);
    }

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

    document.addEventListener('click', function (e){
        if(!e.target.closest('.modal-dialog') &&
            !e.target.closest('.burger') &&
            !e.target.closest('#btnOpenModal')
        ){
            modal.classList.remove('d-block');
            burgerBtn.classList.remove('active');
        }
    });

    burgerBtn.addEventListener('click', function(){
        burgerBtn.classList.toggle('active');
        modal.classList.toggle('d-block');
        playTest();
    })
    btnOpenModal.addEventListener('click', function () {
        requestAnimationFrame(animateModal);
        modal.classList.toggle('d-block');
        playTest();
    });
    closeModal.addEventListener('click', function () {
        modal.classList.toggle('d-block');
        burgerBtn.classList.remove('active');
    });


