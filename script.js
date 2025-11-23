// --- 학습 문제 데이터 ---
// word: 정답 단어
// strip: 알파벳 숨김띠에 표시될 전체 문자열 (정답 단어가 반드시 포함되어야 함, 대문자)
// sentence: 완성할 문장 (빈칸은 '_____' 또는 '________'으로 표시)

const questions = [
    // 1. SWEET
    {
        word: "SWEET",
        strip: "A P S W E E T G D X B Q",
        sentence: "This is a chocolate. It is ________. Do you want some more?"
    },
    // 2. SALTY
    {
        word: "SALTY",
        strip: "P L K M S A L T Y R D I H",
        sentence: "This is a french fry. It is ________. Do you want some more?"
    },
    // 3. SPICY
    {
        word: "SPICY",
        strip: "K Z F S P I C Y M N W E",
        sentence: "This is Tteokbokki. It is ________. Do you want some more?"
    },
    // 4. SOUR
    {
        word: "SOUR",
        strip: "R P Z T S O U R D I B C",
        sentence: "This is a lemon. It is ________. Do you want some more?"
    },
    // 5. DO YOU WANT SOME MORE?
    {
        word: "DO YOU WANT SOME MORE?",
        strip: "T D O F Y O U W A N T P S O M E M O R E Q X Z",
        sentence: "This is an apple. It is sweet. ________?"
    },
    // 6. YES, PLEASE.
    {
        word: "YES, PLEASE.",
        strip: "A X Y E S V P L E A S E B G Q T",
        sentence: "This is a cookie. It is sweet. Do you want some more? ________"
    },
    // 7. NO, THANKS.
    {
        word: "NO, THANKS.",
        strip: "N O Q Z T H A N K S L K F Y",
        sentence: "This is a tomato. It is sour. Do you want some more? ________"
    }
    // 여기에 새로운 문제를 추가할 수 있습니다.
];

let currentQuestionIndex = 0;
let score = 0;

// DOM 요소 가져오기
const paperStrip = document.getElementById('paper-strip');
const sentenceArea = document.getElementById('sentence-area');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const feedback = document.getElementById('feedback');
const statusMessage = document.getElementById('status-message');


// --- 핵심 기능 함수들 ---

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // 모든 문제 완료 시
        paperStrip.textContent = "Finished!";
        sentenceArea.textContent = `모든 문제를 다 풀었습니다! 최종 점수: ${score} / ${questions.length}`;
        submitButton.style.display = 'none';
        nextButton.style.display = 'none';
        answerInput.style.display = 'none';
        feedback.textContent = "";
        statusMessage.textContent = "";
        return;
    }

    // 현재 문제 데이터 로드
    const currentQ = questions[currentQuestionIndex];
    
    // 화면 업데이트
    statusMessage.textContent = `문제 ${currentQuestionIndex + 1} / ${questions.length}`;
    paperStrip.textContent = currentQ.strip;
    
    // 긴 문장 정답 처리: 단어의 길이에 따라 빈칸 길이를 다르게 표시
    const blank = currentQ.word.length > 8 ? '____________________' : '_________'; 
    sentenceArea.textContent = currentQ.sentence.replace(/_+/g, blank); 

    answerInput.value = '';
    feedback.textContent = '';
    
    submitButton.style.display = 'block';
    nextButton.style.display = 'none';
    answerInput.disabled = false;
}
function checkAnswer() {
    const currentQ = questions[currentQuestionIndex];
    
    // 정답과 사용자 입력에서 공백, 마침표, 물음표, 쉼표를 모두 제거하고 대문자로 변환하여 비교합니다.
    const cleanInput = answerInput.value.trim().toUpperCase()
                                .replace(/ /g, '')
                                .replace(/[.,?!]/g, ''); // <--- 이 부분이 추가되었습니다.
    
    const cleanAnswer = currentQ.word.toUpperCase()
                                .replace(/ /g, '')
                                .replace(/[.,?!]/g, ''); // <--- 이 부분이 추가되었습니다.

    if (cleanInput === cleanAnswer) {
        // 정답인 경우
        score++;
        feedback.className = 'correct';
        feedback.textContent = '✅ 정답입니다! 잘했어요!';
        
        // 빈칸을 정답 단어로 채우기
        const completedSentence = currentQ.sentence.replace(/_+/g, `**${currentQ.word}**`);
        sentenceArea.innerHTML = completedSentence.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        submitButton.style.display = 'none';
        nextButton.style.display = 'block';
        answerInput.disabled = true;

    } else {
        // 오답인 경우
        feedback.className = 'incorrect';
        feedback.textContent = '❌ 틀렸습니다. 다시 한번 종이띠에서 단어를 찾아보세요.';
    }
}
