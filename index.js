function Questions(qText, options, ans) {
    this.qText = qText;
    this.options = options;
    this.ans = ans;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.qIndex = 0;
}
let questionsList = [
    new Questions("Javascript supports",
        ["Function", "XHTML", "CSS", "HTML"], "Function"),
    new Questions("Which language is used for styling web pages",
        ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Questions("Which is not a JS Framework",
        ["Python Script", "JQuery", "Django", "Node.js"], "Django"),
    new Questions("which is getting used to connect DB",
        ["PHP", "HTML", "JS", "All"], "php"),
    new Questions("Javascript is a",
        ["Language", "Programming Language", "Development", "All"], "Programming Language")
    ]

let quiz = new Quiz(questionsList);

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.qIndex]
}

Quiz.prototype.checkOptionWithAns = function(option){
    if (this.getQuestionByIndex().ans === option ) {
        this.score++;
    }
    this.qIndex++;
}

function handleChoiseBtn(btnId, option) {
    let btn = document.getElementById(btnId);
    btn.onclick = function () {
        //check answer and load question update the score and update the qindex
       quiz.checkOptionWithAns(option)
       
        loadAQuestions();
    }
}

function loadAQuestions() {
    if( quiz.qIndex === quiz.questions.length){
        showScores();
    }
    else {
        let questions = document.getElementById("question");
        questions.innerHTML = quiz.getQuestionByIndex().qText;

        let options = quiz.getQuestionByIndex().options;
        for (let i = 0; i < options.length; i++) {
            let eachOption = document.getElementById("choice" + i);
            eachOption.innerHTML = options[i];
            handleChoiseBtn("btn" + i, options[i]);
            
        }
        showProgress();
    }
}
loadAQuestions();

function showScores() {
    let result = "<h1>Result<h1>"

    console.log(quiz.score,this.score)
    result += "<h2 id='score' > Your Score is " + quiz.score + " Percentage is  " + (quiz.score / quiz.questions.length * 100) + "% <h2>"
    let quizelement = document.getElementById("quiz");
    quizelement.innerHTML = result
}
function showProgress() {
    let progressElement = document.getElementById("progress")
    progressElement.innerHTML = "Question " + (quiz.qIndex + 1) + " of " + quiz.questions.length
}