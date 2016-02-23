/**
 * Created by filiptodoric on 2016-02-23.
 */
/* GLOBAL VARIABLES */
var user = null;
var li;
var classIndexId;
/* GLOBAL VARIABLES */

function calcluateGrades() {
    var marks = getMarks();
    var grades = getGrades();
    var totalGrade = 0;
    var currentGrade = 0;
    var totalGradeAvailible = 0;
    makeClassIndexIdNotUndefined();
    // calculate total grade
    if (marks.length == grades.length) {
        for(var i = 0; i < marks.length; i++)  {
            totalGrade = totalGrade + (marks[i] * (grades[i]/100));
            totalGradeAvailible += grades[i];
        }
        saveGrades();
        // update the grades on the client
        user[classIndexId].marks = marks;
        user[classIndexId].grades = grades;
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

//TODO this function should be genralized with the one above. Messy code.
function refreshGrades() {
    var marks = getMarks();
    var grades = getGrades();
    var totalGrade = 0;
    var currentGrade = 0;
    var totalGradeAvailible = 0;
    if (marks.length == grades.length) {
        for(var i = 0; i < marks.length; i++)  {
            totalGrade = totalGrade + (marks[i] * (grades[i]/100));
            totalGradeAvailible += grades[i];
        }
    }
    else {
        error();
    }
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

function makeClassIndexIdNotUndefined()   {
    if(classIndexId == undefined)  {
        classIndexId = 0;
    }
}

function error()  {
    console.log("A grade or mark is missing");
}

function saveGrades() {
    var marksToSend = getMarks();
    var gradesToSend = getGrades();
    $.post("/savegrades",
        {
            classIndex: classIndexId,
            grades: gradesToSend,
            marks: marksToSend
        }, 'json');
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

function getUser()  {
    $.ajax({
        type: "GET",
        url: '/getUser',
        contentType: 'json',
        success: function(data) {
            user = data;
            fillDropdown();
            classIndexId = 0;
            fillGrades(0);
        },
        error: function(data)    {
            console.error(data)
            user = [];
        }
    });
}

function fillDropdown() {
    var classes = user;
    var list = document.getElementById("classDropdown");
    for (var i = 0; i < classes.length; i++)  {
        var opt = classes[i].className;
        var li = document.createElement("li");
        li.id = i;
        var link = document.createElement("a");
        var text = document.createTextNode(opt);
        link.appendChild(text);
        link.href = "#";
        li.appendChild(link);
        list.appendChild(li);
    }
    setDropdown();
}

function clearDropdown()    {
    var myDropdown = $('.dropdown-menu').children();
    for(var i = 2; i < myDropdown.length; i++)  {
        myDropdown[i].remove();
    }
}
function fillGrades(x) {
    var grades = user[x].grades;
    var marks = user[x].marks;
    $(".table-row.dynamically-added").remove();
    if(grades.length > 7)   {
        for(var x = 7; x <= grades.length; x++)  {
            addNewRow();
        }
    }
    addKeyListeners();
    var arrayOfMarks = $(".marks");
    var arrayOfGrades = $(".grades");
    clearTextBoxes('the-grades');
    for(var x = 0; x < grades.length; x++)  {
        arrayOfMarks[x].value = marks[x];
        arrayOfGrades[x].value = grades[x];
    }
    refreshGrades();
}


// When page is loaded.
$(function()  {
    getUser();
});

// Changes the Dropdown text to what class is selected
function setDropdown()  {
    $(".dropdown-menu li a").click(function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
        var classIndexAsString = this.parentNode.id;
        classIndexId = parseInt(classIndexAsString);
        if(classIndexAsString == "")  {
            $("#myModal").modal('show');
        }
        else if(classIndexId == undefined)  {
            classIndexId = 0;
            fillGrades(classIndexId);
        }
        else {
            fillGrades(classIndexId);
        }
    });
}

function setVisibleClassInDropdown(classID)    {
    var className = $(".dropdown-menu li").filter($('#' + classID)).children().html();
    var dropdown = $(".dropdown-menu li a");
    dropdown.parents(".dropdown").find('.btn').html(className + ' <span class="caret"></span>');
    classIndexId = classID;
    fillGrades(classIndexId);
}

function addNewClass()  {
    //on success close the modal window
    var newClassCode = $("#newClassName").val();
    $.ajax({
        type: "POST",
        url: '/addNewClass',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({ className: newClassCode }),
        success: function(data) {
            //$("#myModal").modal('hide');
        }
    });
    $("#myModal").modal('hide');
    $("#newClassName").val("");
    // add the class to the clientside as well
    var clientSide = {className: newClassCode, grades: [], marks: []};
    user.push(clientSide);
    clearDropdown();
    fillDropdown();
    setVisibleClassInDropdown(user.length - 1);
}

function addKeyListeners()  {
    var inputs = $('.form-control');
    var lastGradeInput = inputs[inputs.length - 3];
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

function confirmDelete(classIndexId)    {
    var deleteConfirmation = confirm("Are you sure you want to delete this class?");
    if(deleteConfirmation) {
        deleteClass(classIndexId);
    }
}

function deleteClass(classIndexId)  {
    //on success close the modal window
    var toDeleteId = classIndexId;
    $.ajax({
        type: "POST",
        url: '/deleteclass',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({ classIndex: toDeleteId }),
        success: function(data) {
            //$("#myModal").modal('hide');
        }
    });
    user.splice(toDeleteId, 1);
    clearDropdown();
    fillDropdown();
    setVisibleClassInDropdown(0);
}

function addNewRow()    {
    var strVar="";
    strVar += "<div class=\"table-row dynamically-added\">";
    strVar += "                    <div class=\"table-cell\"> <input type=\"text\" class=\"marks form-control\" maxlength=\"8\" > <\/div>";
    strVar += "<div class=\"table-cell\"> <input type=\"text\" class=\"grades form-control\" maxlength=\"8\" > <\/div>";
    strVar += "<\/div>";
    var tableOfGrades = $('#table-of-grades');
    tableOfGrades.append(strVar);

}

function clearTextBoxes(divID)  {
    $('#' + divID).find('input:text').each(function() {
            $(this).val('');
        }
    );
}