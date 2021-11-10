(function() 
 {
  var allQuestions = [{
    question: "What does HTML stand for ?",
    options: ["	Home tool Markup language" , "Hyper Text Markup language" , "Hyperlinks and text Markup language"],
    answer: 1
  }, {
    question: " The h1 element in the HTML defines ",
    options: ["Headings" , "Hyperlink" , "HyperText" , "Html-text"],
    answer: 0
  }, {
    question:"What is the difference between an opening tag and a closing tag?",
    options: ["Opening tag has a / in front" , "Closing tag has a / in front" , "There is no difference"],
    answer: 1
  },{
    question: "< br  / > What type of tag is this?",
    options: ["A broken one" , "Break tag" ,"An opening tag"],
    answer: 1
  }, {
    question: "what defines the word CSS ?",
    options: ["Cascading Style Sheets", "Create Simple Samples"],
    answer: 0
  },{
    question: "the________property is mostly used to remove underlines from links",
    options: ["Text-trans", "Text-transformation" , "Text-decoration"],
    answer: 2
  },{
    question: "element-width property can be used to set the width of an element  ",
    options: ["True", "False"],
    answer: 1
  }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('vous avez eu ' + correct + ' sur ' +allQuestions.length);
        return score;
  }
})();