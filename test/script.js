// Create a function that will generate new question objects
function newQuestion(params) {
    var temp = {
        question:  params[0],
        choices: params[1],
        correctAnswer: params[2]
    };
    return temp;
}
// Create the array allQuestions and generate all of the new questions
var allQuestions = [
    ["<p><b>Question 1:</b><br/> ¿Como se llama el festival?<p/>", ["Tomorrowcrack", "Tomorrowland", "Las quintas de don simon", "Teres Festival"],0 ],
    ["<p><b>Question 2:</b><br/>¿Cual de estos no patrocina el festival?<p/>", ["Mc Donalds", "Spotify", "Ferretería la 13", "TDT"], 2],
    ["<p><b>Question 3:</b><br/>¿En donde toma lugar el festival?<p/>", ["La piedra del peñon", "Autocine Cali", "El hueco", "El Boulevar"], 1],
    ["<p><b>Question 4:</b><br/>¿M de ...?<p/>", ["Minecraft", "Miercoles", "Motomami, Motomami, Motomami 🏍️", "Macta llega"], 2],
    ["<p><b>Question 5:</b><br/>¿Cual es el mejor album de Billie Eillish?<p/>", ["Los 50 de Joselito", "El mal querer", "when we all fall asleep where do we go", "Thriller"], 2],
    ["<p><b>Question 6:</b><br/>¿De dónde es Bad Bunny?<p/>", ["Rusia", "Puerto Rico", "Colombia", "Venezuela"], 1],
    ["<p><b>Question 7:</b><br/>¿De dónde es Billie Eilish?<p/>", ["Chile", "Hondura", "Uganda", "EEUU"], 3],
    ["<p><b>Question 8:</b><br/>¿De dónde es Drake?<p/>", ["Brazil", "Canada", "Australia", "Argentina"], 1],
    ["<p><b>Question 9:</b><br/>¿Cúal es el mejor álbum de Bad bunny?<p/>", ["YHLQMDLG (2020)", "La cucaracha (1990)", "Jordan (2021)", "Mujeriego (2022)"], 0],
    ["<p><b>Question 10:</b><br/>¿Cúal es el mejor Álbum de Drake?<p/>", ["SANZ (2005)", "UNLIMITED LOVE (2000)", "Take Care (2011)", "Mi sangre (2005)"], 2]
   ].map(newQuestion);
// Create and initialize the total (to 0), number (to 0), and totalQuestions (to the length of allQuestions) variables
var total = 0, number = 0, totalQuestions = allQuestions.length, answers = [];

$(document).ready(function() {

    function newQuestionAnswers() {
        $("#content").fadeOut(500, function() {
            $("#answers").empty();
            if (number < totalQuestions)
                $("#questCount").text("Question: " + (number + 1) + " of 10");
            var query = allQuestions[number];
            $("#question").html(query.question);

            // make sure to put in the name parameter and make sure that it's the same as the div that groups
            // the radio buttons together, otherwise they can all be checked at the same time, you'll never have
            // just one answer. The use of the html <label> element was discovered here:
            // http://stackoverflow.com/questions/5795499/changing-text-of-radio-button
            // Where it was explained that the text of the radio button was now explicitly associated with the
            // use of <label>
            for(var i = 0; i < query.choices.length; i++)
                $("#answers").append("<input type='radio' name='answers' id='radio" + i + "' value='answer" + i
                    + "'><label for='test" + i + "'>" + query.choices[i] + "</label><br>");
            if(answers.length > number)
                $("#radio" + answers[number]).prop("checked", true);
            if (number > 0)
                $("#back").prop("disabled", false);
        });
        $("#content").fadeIn(500);
    }

    function checkAnswer() {
        // Make sure a radio button is checked before proceeding. If one is checked add it to answers, else if
        // the last radio button is reached and it is not checked alert the user that they must select an answer.
        for(var i = 0; i < $("input").length; i++) {
            if ($("#radio" + i).is(":checked")) {
                answers[number] = i;
                break;
            }
            else if ( i === $("input").length -1 && !$("#radio" +i).is(":checked")) {
                $("#next").after("<p id='warning'>Please select an answer and then click next</p>");
                return false;
            }
        }

        // Check to see if the current radio button checked is the correct answer. If correct increment the
        // score 10 points. This answer helped figure out if a radio box was checked and allowed you to use it in
        // an if statement http://stackoverflow.com/a/12932116
        var query = allQuestions[number];
        if($("#radio" + query.correctAnswer).is(":checked"))
            updateScore(10);
        number += 1;
        return true;
    }

    function finalScore() {
        $("#score").text("Final Score: " + total + "/" + totalQuestions * 10).show(1000);
        $("#question, #answers, #questCount, #next, #back").hide(10);
         $("#startagain").hide(100);
        if (total > 60)
         $("#result").show(1000);
        if (total < 100)
         $("#resultbad").show(1000);
         
        
         
        
    }

    function updateScore(change) {
        total += change;
        $("#score").text("Score: " + total);
    }

    $("#back").hide();
    $("#next").hide();
    $("#startagain").hide();
    $("#score").hide();
    $("#bar10").hide();
    $("#result").hide();
    $("#resultbad").hide();
    
    
    $("#start").on('click', function() {
        $("#start").hide();
        $('#h4Start').hide(1000);
         $("#next").show(1000);
        $("#bar").width('5%');
        newQuestionAnswers();
        updateScore(0);
    });

      $("#startagain").on('click', function() {
        
       location.reload();
     
    
         
    });
    
    $("#next").on('click', function() {
        $("#back").show(100);
        $("#warning").remove();
        if(checkAnswer()) {
            if (number < totalQuestions)
                newQuestionAnswers();
            else
                finalScore();
            
            
        }
        
       
        
        // Enable the back button if past first question
        if (number > 0)
            $("#back").prop("disabled", false);
            $("#bar").width('10%');
        
        if (number > 1)
        $("#bar").width('20%');
        if (number > 2)
        $("#bar").width('30%');
        if (number > 3)
        $("#bar").width('40%');
        if (number > 4)
        $("#bar").width('50%');
        if (number > 5)
        $("#bar").width('60%');
        if (number > 6)
        $("#bar").width('70%');
        if (number > 7)
        $("#bar").width('80%');
        if (number > 8)
        $("#bar").width('90%');
        if (number > 9)
        $("#bar").width('100%');
        
        
   
    });
    
    
    
        

    $("#back").on('click', function() {
        if ( number === totalQuestions) {
            $("#score").hide();
            $("#question, #answers, #questCount, #next, #score").show(2500);
        }
        
        if (number > 0)
        $("#bar").width('5%');
        if (number > 1)
        $("#bar").width('10%');
        if (number > 2)
        $("#bar").width('20%');
        if (number > 3)
        $("#bar").width('30%');
        if (number > 4)
        $("#bar").width('40%');
        if (number > 5)
        $("#bar").width('50%');
        if (number > 6)
        $("#bar").width('60%');
        if (number > 7)
        $("#bar").width('70%');
        if (number > 8)
        $("#bar").width('80%');
        if (number > 9)
        $("#bar").width('90%');
        
        number -= 1;
        $("#back").prop("disabled", true);
        if (allQuestions[number].correctAnswer === answers[number])
            updateScore(-10);
        newQuestionAnswers();
        
          
    });
});