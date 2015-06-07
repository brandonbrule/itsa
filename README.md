itsa
====

See how it works - http://brandonbrule.github.io/itsa/

A friendlier alert with type detection. This little script's goal is to replace alerts entirely and reduce the number of times you need to open the console. It will break down objects, arrays, DOM nodes and will accurately tell you the type associated with each value.

There's an api for custom messaging, a code snippet tester, and type detection is toggleable.

There is also control to set where each messages will display, by default this will be at the top of the page, but feel free to update the container wrapper anytime you want to call a test and it will display there.

var its_container_wrapper = document.getElementById('element'); its.a(myObject);

var its_container_wrapper = document.getElementById('a-different-element'); its.a(myOtherObject);

I've been adding to this for the past few months as things come up. I use it on everything I do and I hope that you find it helpful too.

Any contributions would be greatly appreciated. Currently, I know jQuery seems to crash it, I'd be really happy if someone could take a look there. I'll make a note when that's fixed.