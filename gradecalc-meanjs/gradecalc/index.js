/**
 * Created by filiptodoric on 2016-02-23.
 */
/* GLOBAL VARIABLES */
var user = [];
var li;
/* GLOBAL VARIABLES */

function calcluateGrades() {
    var marks = getMarks();
    var grades = getGrades();
    var totalGrade = 0;
    var currentGrade = 0;
    var totalGradeAvailible = 0;
    // calculate total grade
    if (marks.length == grades.length) {
        for(var i = 0; i < marks.length; i++)  {
            totalGrade = totalGrade + (marks[i] * (grades[i]/100));
            totalGradeAvailible += grades[i];
        }
    }
    else {
        error();
    }
    // calculate current grade
    currentGrade = totalGrade/totalGradeAvailible;
    currentGrade = currentGrade*100;
    if(isNaN(currentGrade)) { currentGrade = 0; }
    if(isNaN(totalGrade)) { totalGrade = 0; }
    if(totalGradeAvailible > 100)   {
        $("#totalGrade").html("N/A");
    }
    else    {
        $("#totalGrade").html(totalGrade.toFixed(2) + "%");
    }
    $("#currentGrade").html(currentGrade.toFixed(2) + "%");

}

function error()  {
    console.log("A grade or mark is missing");
}


// TODO: these functions need to be generalized
function getMarks() {
    var arrayOfMarks = $(".marks");
    var marks = [];
    var x = 0;
    $.each(arrayOfMarks , function(index, value){
        var trimedValue = value.value.trim();
        if (trimedValue !== "")  {
            marks[x] = parseFloat(trimedValue);
        }
        x++;
    });
    return marks;
}

function getGrades() {
    var arrayOfGrades = $(".grades");
    var grades = [];
    var x = 0;
    $.each(arrayOfGrades , function(index, value){
        var trimedValue = value.value.trim();
        if (trimedValue !== "")  {
            grades[x] = parseFloat(trimedValue);
        }
        x++;
    });
    return grades;
}

function addNewRow()    {
    var strVar="";
    strVar += "<div class=\"table-row\">";
    strVar += "                    <div class=\"table-cell\"> <input type=\"text\" class=\"marks form-control\" maxlength=\"8\" > <\/div>";
    strVar += "<div class=\"table-cell\"> <input type=\"text\" class=\"grades form-control\" maxlength=\"8\" > <\/div>";
    strVar += "<\/div>";
    var tableOfGrades = $('#table-of-grades');
    tableOfGrades.append(strVar);
}

function addKeyListeners()  {
    var inputs = $('.form-control');
    var lastGradeInput = inputs[inputs.length - 2];
    var alreadyAdded = false;
    inputs.off('keypress');
    // each time a key is pressed I need to check if it was the last one and if it is, then
    // call addNewRow()
    $(lastGradeInput).keypress(function() {
        if(alreadyAdded == false)   {
            addNewRow();
            alreadyAdded = true;
            addKeyListeners();
        }
    });
}

$(window).load(function(){
    addKeyListeners();

    // Mobile menu dropdown
    var mainNav = $('.main-nav');
    mainNav.on('click', function(event){
        $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
    });

    // enter key now presses the mark button
    $(document).keypress(function(e){
        if (e.which == 13){
            $("#markButton").click();
        }
    });

});

function clearTextBoxes(divID)  {
    $('#' + divID).find('input:text').each(function() {
            $(this).val('');
        }
    );
}