# handleFontResize.js

handleFontResize.js is a Javascript library to dynamically resize the input font-size of text to fit a fixed size div. This was designed to work for text input primarily, but could work in other use cases.


## How to use it

I built handleFontResize.js to work on 'keyup' event handlers, but it should work with any other event handler that can pass data with events.


jQuery:
<code>$('YourSelectorHere').keyup(**{'maxFontSize':60,'paddingWidth':50},handleFontResize**);</code>

Live demo available [here](http://thebestfrenchie.github.io/handleFontResize.js/).


## How does it work

I originally built this because I couldn't find anything that would work to dynamically resize font as I entered text, but during the project I discovered a few options out there. Make sure you check these out:

* [CSS Viewport sized Typography](http://css-tricks.com/viewport-sized-typography/),
* [FitText.js](https://github.com/davatron5000/FitText.js),
* [Lettering.js](https://github.com/davatron5000/Lettering.js),


handleFontResize.js works by taking two variables: 

**maxFontSize** - set the upper limit for your font sizes. Kinda self explanatory.

**paddingWidth** - effectively, sets the 'padding-right' on the 'invisible line' which triggers your text resize.
</br>

```
Input Text box:			
 ________________________
|	Variable	   |	|
|    Length        |    |
|_____Input________|____|

				   ^    ^
				   |----|
		  var paddingWidth
						
```

Other, non-declarable variables:

**maxWidth** - the width of the in-focus element when handleFontSize() is called.

**measureResult** - the returned value from measureText(), which copies the input out into an invisible div (id='text-width-tester'), and returns the length in pixels.

**widthDelta** - the difference between measureResult & maxWidth.

**flip** - prevents the 'too big -> too small -> too big' infinite loop of font re-sizing. Allows the sign of widthDelta to flip 3 times consecutively before breaking.


Set 'debug' to true to console.log these values, as needed.
	
## Contact me

If you have any questions, please grab me on Twitter: [@nfFrenchie](https://twitter.com/nfFrenchie).

</br>

- possible extension: add in default values for maxFontSize & paddingWidth so that it doesn't error out if these aren't set.