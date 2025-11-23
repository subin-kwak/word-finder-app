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
