/*
 * handleFontResize.js
 *  
 * Copyright (C) 2013, Sam "Frenchie" Stewart 
 * Dual-licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and the Beerware (http://en.wikipedia.org/wiki/Beerware) license.
 */

function handleFontResize(evt) {
  var debug = true;
  if (debug) {console.log('calling handleFontResize:')};
  var target = $(evt.target);

  var ourText = $(target);
  var maxHeight = ourText.height();
  var maxWidth = ourText.width();
  var maxFontSize = evt.data.maxFontSize;      // Need to Add in default
  var paddingWidth  = evt.data.paddingWidth;   // Need to Add in default
  var fontFamily = ourText.css('font-family');

  var lastDeltaIsPositive = null;
  var thisDeltaIsPositive = null;
  var flip = 0

  while(flip<3) {
    // Grab current values
    var fontSizeStr = ourText.css('font-size');
    var fontSize = stripPx(fontSizeStr); //strip "px"
    measureResult = measureText(ourText.val(), fontFamily, fontSizeStr);
    var widthDelta = maxWidth - measureResult.width - paddingWidth;

    if (debug){
      console.log('\tmaxFontSize\t\t\t'+maxFontSize);
      console.log('\tpaddingWidth\t\t'+paddingWidth);
      console.log('\tEntering Font-size:\t'+fontSize);
      console.log('\tmaxWidth:\t\t\t'+maxWidth);
      console.log('\tMeasured Width:\t\t'+measureResult.width);
      console.log('\tDelta:\t\t\t\t'+widthDelta);
    };

    // Prevents a "too big -> too small -> too big" infinite loop.
    thisDeltaIsPositive = widthDelta>=0;
    if(thisDeltaIsPositive=!lastDeltaIsPositive){
      flip +=1;
    };
    lastDeltaIsPositive = thisDeltaIsPositive; 

    // Adjust font size based upon our delta.
    if (widthDelta < 0){          // too big! Delta negative! font down.
        fontSize -= 1;
      if (debug) {console.log('\tFont change:\t\tDown!')};
      }
    else if (widthDelta > 0){     // too small! Delta postive! font up.
      fontSize += 1;
      if (debug) {console.log('\tFont change:\t\tUp!')};
      }
    if (ourText.val().length ==0){// Text deleted, reset size to default.
     fontSize = maxFontSize;
    }
    if (fontSize>maxFontSize){   // Font too big & out of bounds. Break.
      if (debug) {console.log('\tOut of bounds. Breaking Font-size.\n')};
      break;
    }

    // Save & loop.
    ourText.css('font-size', fontSize+'px');
    if (debug) {
      console.log('\tExiting Font-size:\t'+fontSize+'\n');
    };
  }
  return target;
};

function stripPx (input) {
  return parseInt(input.substr(0,2));
};

// txt is the text to measure, font is the full CSS font declaration,
// e.g. "bold 12px Verdana"
function measureText(txt, fontFamily, fontSize) {
    var id = 'text-width-tester',
    $tag = $('#' + id);

    // Create this element if it does not already exist
    if (!$tag.length) {
      $tag = $('<span id="' + id + '" style="display:none;"></span>');
      $('body').append($tag);
    } 

    // Update with new values
    $tag.css({'font-family':fontFamily, 'font-size': fontSize}).html(txt);
    return {  
      width: $tag.width()
    }
};
