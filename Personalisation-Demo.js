var line1LastPosition = 0;
var line2LastPosition = 0;
var line3LastPosition = 0;

var totalLines = 3;

var charWidth = 34;
var charHeight = 27;

var offSet = 4;
var maxChar = 24;
var imgWidth = 0;
var imgHeight = 0;

function GetImageUrl(code) {
    var imageUrl = 'https://ealite.s3.amazonaws.com/Developers/Images/Person-chr/' + String.fromCharCode(code).toUpperCase() + '.png';
    return imageUrl;
}

function RemoveCharacter(textBox, lastPosition, containingClass, top) {
    $(containingClass + 'Char' + (lastPosition - 1)).remove();
    $(containingClass).empty();
    
    ReDraw(textBox.val().substring(0, textBox.val().length - 1), (lastPosition - 1), 'false', containingClass, '', top)
}

function ReDraw(textBoxValue, lastPosition, firstCharacter, containingClass, code, top) {
    if (firstCharacter == 'true') {
        $(containingClass).append('<img class="' + containingClass.substring(1) + 'Char' + lastPosition + '" src="' + GetImageUrl(code) + '" alt="char" title="char" style="position:absolute;top:' + top + 'px;left:' + ((imgWidth - charWidth) / 2) + 'px;"/>');
    } 
    else {
        var charIndex = 0;
        var calculatedPosition = 0;

        var letters = jQuery.map((textBoxValue).split(''), function(e) {
            var char = e + '';
            if (charIndex == 0) {     
                calculatedPosition = ((imgWidth - (charWidth * (textBoxValue.length))) / 2);
              
                $(containingClass).append('<img class="' + containingClass.substring(1) + 'Char' + charIndex + '" src="https://ealite.s3.amazonaws.com/Developers/Images/Person-chr/' + char.toUpperCase() + '.png" alt="char" title="char" style="position:absolute;top:' + top + 'px;left:' + (calculatedPosition + offSet) + 'px;"/>');
            }
            else {
                calculatedPosition = calculatedPosition + charWidth;  
                
                $('<img class="' + containingClass.substring(1) + 'Char' + charIndex + '" src="https://ealite.s3.amazonaws.com/Developers/Images/Person-chr/' + char.toUpperCase() + '.png" alt="char" title="char" style="position:absolute;top:' + top + 'px;left:' + (calculatedPosition + offSet) + 'px;"/>').insertAfter(containingClass + 'Char' + (charIndex - 1));
            }
            charIndex++;
        });
    }
}

function Update(textBox, lastPosition, containingClass, top, e) {
    if (lastPosition < maxChar) {   
        var code = e.keyCode;
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
    var img = new Image();
    img.onload = function() {
      imgWidth = this.width;
      imgHeight = this.height;
    }
    img.src = 'https://ealite.s3.amazonaws.com/Developers/Images/Person-bkg/BACKIMG3.jpg';
    
    var textBoxLine1 = $('#tbLine1');
    var textBoxLine2 = $('#tbLine2');
    var textBoxLine3 = $('#tbLine3');
    
    textBoxLine1.on('click keyup keypress keydown', function () {
        var tempStr = $(this).val();
        $(this).focus().val(tempStr);
    }).on('keypress', function (e) {
        Update(textBoxLine1, textBoxLine1.val().length, '.line1', (((imgHeight / totalLines) * 0) + ((imgHeight / totalLines) - charHeight) / 2), e);
    }).on('keydown', function (e) {
        var code = e.keyCode;
        if (code == 8 && textBoxLine1.val().length > 0) {
            RemoveCharacter(textBoxLine1, textBoxLine1.val().length, '.line1', (((imgHeight / totalLines) * 0) + ((imgHeight / totalLines) - charHeight) / 2));
        }   
    });
    
    textBoxLine2.on('click keyup keypress keydown', function () {
        var tempStr = $(this).val();
        $(this).focus().val(tempStr);
    }).on('keypress', function (e) {
        Update(textBoxLine2, textBoxLine2.val().length, '.line2', (((imgHeight / totalLines) * 1) + (((imgHeight / totalLines) - charHeight) / 2)), e);
        line2LastPosition++;
    }).on('keydown', function (e) {
        var code = e.keyCode;
        if (code == 8 && textBoxLine2.val().length > 0) {
            RemoveCharacter(textBoxLine2, textBoxLine2.val().length, '.line2', (((imgHeight / totalLines) * 1) + (((imgHeight / totalLines) - charHeight) / 2)));
        }   
    });
    
    textBoxLine3.on('click keyup keypress keydown', function () {
        var tempStr = $(this).val();
        $(this).focus().val(tempStr);
    }).on('keypress', function (e) {
        Update(textBoxLine3, textBoxLine3.val().length, '.line3', (((imgHeight / totalLines) * 2) + (((imgHeight / totalLines) - charHeight) / 2)), e);
        line3LastPosition++;
    }).on('keydown', function (e) {
        var code = e.keyCode;
        if (code == 8 && textBoxLine3.val().length > 0) {
            RemoveCharacter(textBoxLine3, textBoxLine3.val().length, '.line3', (((imgHeight / totalLines) * 2) + (((imgHeight / totalLines) - charHeight) / 2)));
            line3LastPosition--;
        }   
    });

});