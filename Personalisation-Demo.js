var line1LastPosition = 0;
var line2LastPosition = 0;
var line3LastPosition = 0;

var charWidth = 34;
var charHeight = 27;

var offSet = 4;
var maxChar = 24;
var imgWidth = 300;
var imgHeight = 150;

function RemoveCharacter(textBox, lastPosition, containingClass, top) {
    $(containingClass + 'Char' + (lastPosition - 1)).remove();
    $(containingClass).empty();
    
    ReDraw(textBox.val().substring(0, textBox.val().length - 1), (lastPosition - 1), 'false', containingClass, '', top)
}

function GetImageUrl(code) {
    var imageUrl = 'https://ealite.s3.amazonaws.com/Developers/Images/Person-chr/' + String.fromCharCode(code).toUpperCase() + '.png';
    return imageUrl;
}

function ReDraw(textBoxValue, lastPosition, firstCharacter, containingClass, code, top) {
    if (firstCharacter == 'true') {
        $(containingClass).append('<img class="' + containingClass.substring(1) + 'Char' + lastPosition + '" src="' + GetImageUrl(code) + '" alt="char" title="char" style="position:absolute;top:' + top + 'px;left:' + ((imgWidth - charWidth) / 2) + 'px;"/>');
    } 
    else {
        var currentPosition = 0;
        var calculatedPosition = 0;
        
        //var textBoxValue = textBox.val() + String.fromCharCode(code).toUpperCase();       
        
        var letters = jQuery.map((textBoxValue).split(''), function(e) {
            var char = e + '';
            if (currentPosition == 0) {     
                calculatedPosition = ((imgWidth - (charWidth * (textBoxValue.length))) / 2);
              
                $(containingClass).append('<img class="' + containingClass.substring(1) + 'Char' + currentPosition + '" src="https://ealite.s3.amazonaws.com/Developers/Images/Person-chr/' + char.toUpperCase() + '.png" alt="char" title="char" style="position:absolute;top:' + top + 'px;left:' + (calculatedPosition + offSet) + 'px;"/>');
            }
            else {
                calculatedPosition = calculatedPosition + charWidth;  
                
                $('<img class="' + containingClass.substring(1) + 'Char' + currentPosition + '" src="https://ealite.s3.amazonaws.com/Developers/Images/Person-chr/' + char.toUpperCase() + '.png" alt="char" title="char" style="position:absolute;top:' + top + 'px;left:' + (calculatedPosition + offSet) + 'px;"/>').insertAfter(containingClass + 'Char' + (currentPosition - 1));
            }
            currentPosition++;
        });
    }
}

function Update(textBox, lastPosition, containingClass, top, e) {
    if (lastPosition < maxChar) {   
        var code = e.keyCode;
        var lastChar = $('.' + containingClass + '.char' + lastPosition);
        var firstCharacter = 'true';
        
        if (lastPosition > 0) 
        {
            $(containingClass).empty();
            firstCharacter = 'false';
        }
        
        if (code != 'undefined') {
            ReDraw(textBox.val() + String.fromCharCode(code).toUpperCase(), lastPosition, firstCharacter, containingClass, code, top);           
        }
    }
}

$(document).ready(function () {
    var textBoxLine1 = $('#tbLine1');
    var textBoxLine2 = $('#tbLine2');
    var textBoxLine3 = $('#tbLine3');
    
    textBoxLine1.on('keypress', function (e) {
        Update(textBoxLine1, line1LastPosition, '.line1', 12, e);
        line1LastPosition++;
    }).on('click keyup', function () {
        var tempStr = $(this).val();
        $(this).focus().val(tempStr);
    }).on('keydown', function (e) {
        var code = e.keyCode;
        if (code == 8) {
            RemoveCharacter(textBoxLine1, line1LastPosition, '.line1', 12);
            line1LastPosition--;
           
        }   
    });
    
    textBoxLine2.on('keypress', function (e) {
        Update(textBoxLine2, line2LastPosition, '.line2', 62, e);
        line2LastPosition++;
    }).on('click keyup', function () {
        var tempStr = $(this).val();
        $(this).focus().val(tempStr);
    }).on('keydown', function (e) {
        var code = e.keyCode;
        if (code == 8) {
            RemoveCharacter(textBoxLine2, line2LastPosition, '.line2', 62);
            line2LastPosition--;
        }   
    });
    
    textBoxLine3.on('keypress', function (e) {
        Update(textBoxLine3, line3LastPosition, '.line3', 112, e);
        line3LastPosition++;
    }).on('click keyup', function () {
        var tempStr = $(this).val();
        $(this).focus().val(tempStr);
    }).on('keydown', function (e) {
        var code = e.keyCode;
        if (code == 8) {
            RemoveCharacter(textBoxLine3, line3LastPosition, '.line3', 112);
            line3LastPosition--;
        }   
    });

});