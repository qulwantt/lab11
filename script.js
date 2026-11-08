$(document).ready(function() {
    let vocabulary = [
        { en: "always", uk: "завжди" },
        { en: "never", uk: "ніколи" },
        { en: "sometimes", uk: "іноді" },
        { en: "often", uk: "часто" },
        { en: "usually", uk: "зазвичай" },
        { en: "rarely", uk: "рідко" },
        { en: "everywhere", uk: "скрізь" },
        { en: "nowhere", uk: "ніде" },
        { en: "everything", uk: "все" },
        { en: "nothing", uk: "нічого" }
    ];

    vocabulary.sort(() => 0.5 - Math.random());

    let currentIndex = 0;
    let correct = 0;
    let incorrect = 0;
    let answered = new Array(10).fill(false);
    let totalAnswered = 0;

    function updateUI() {
        $('#wordDisplay').text(vocabulary[currentIndex].en);
        $('#stepCounter').text((currentIndex + 1) + '/10');
        $('#translationInput').val('');
        
        if (answered[currentIndex]) {
            $('#translationInput').prop('disabled', true).attr('placeholder', 'Вже перевірено');
            $('#card').css('background-color', '#f0f0f0');
        } else {
            $('#translationInput').prop('disabled', false).attr('placeholder', 'введіть переклад');
            $('#card').css('background-color', 'white');
        }
    }

    $('#card').on('click', function() {
        if (answered[currentIndex]) {
            alert("Слово вже перевірено! Перейдіть до наступного.");
            return;
        }

        let inputVal = $('#translationInput').val().trim().toLowerCase();
        
        if (inputVal === "") {
            alert("Спочатку введіть переклад!");
            return;
        }

        if (inputVal === vocabulary[currentIndex].uk) {
            correct++;
            $('#correctScore').text(correct);
            $(this).css('border-color', '#00cc00');
        } else {
            incorrect++;
            $('#incorrectScore').text(incorrect);
            $(this).css('border-color', '#ff0000');
        }

        answered[currentIndex] = true;
        totalAnswered++;

        setTimeout(() => {
            $(this).css('border-color', '#eee');
            
            if (totalAnswered === 10) {
                showModal();
            } else {
                $('#nextBtn').trigger('click');
            }
        }, 400);
    });

    $('#prevBtn').on('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateUI();
        }
    });

    $('#nextBtn').on('click', function() {
        if (currentIndex < 9) {
            currentIndex++;
            updateUI();
        } else if (totalAnswered < 10) {
            let nextUnanswered = answered.indexOf(false);
            if (nextUnanswered !== -1) {
                currentIndex = nextUnanswered;
                updateUI();
            }
        }
    });

    function showModal() {
        let level = "";
        let scorePercentage = (correct / 10) * 100;

        if (scorePercentage >= 90) level = "Відмінний (C1-C2)";
        else if (scorePercentage >= 70) level = "Хороший (B1-B2)";
        else if (scorePercentage >= 50) level = "Задовільний (A2)";
        else level = "Початковий (A1)";

        $('#modalLevelText').text(`Ваш рівень знань: ${level}`);
        $('#resultModal').fadeIn(300);
    }

    $('#closeModalBtn').on('click', function() {
        $('#resultModal').fadeOut(300);
    });

    updateUI();
});