// Change element

var its_container_wrapper;
var itsa_styles_check;
if ( document.getElementById('its-wrapper') ) {
  its_container_wrapper = document.getElementById('its-wrapper');
} else {
  its_container_wrapper = document.createElement('div');
  its_container_wrapper.setAttribute("id", "its-wrapper");
  document.body.insertBefore(its_container_wrapper, document.body.firstChild);
}




// If I want a custom element to display messages
// Create an element with the id="its-wrapper"
// var its_container_wrapper = document.getElementById('its-wrapper');


//-// -------------- its.a -------------- //-//
var its = {
  
  // -- API Useage -- //
  // Description Output Options
  heading: function(ctx){
    its.appendContent('// ---------------- ' + ctx + ' --------------- //');
  },
  subheading: function(ctx){
    its.appendContent( '// -- ' + ctx + ' -- //');
  },
  linebreak: function(){
    its.appendContent( '// ---------------------------------------------------------------- //');
  },
  message: function(heading, message){
    var wrapper = document.createElement('div'),
        headingElement = document.createElement('div'),
        headingText = document.createTextNode(heading),
        messageElement = document.createElement('pre'),
        messageText = document.createTextNode(message);
    
    wrapper.style.position = 'relative';


    headingElement.setAttribute('class', 'its-a-message');
    headingElement.appendChild(headingText);
    
    messageElement.appendChild(messageText);
    

    
    // Close Button
    this.createCloseButton(wrapper);

    // Message
    messageElement.setAttribute('class', 'its-a-object-container');

    messageElement.appendChild(messageText);
    wrapper.appendChild(headingElement);
    wrapper.appendChild(messageElement);
    its_container_wrapper.appendChild(wrapper);
  },
  
  snippet: function(){
    var wrapper = document.createElement('div'),
        headingElement = document.createElement('div'),
        headingText = document.createTextNode('Test Code Snippet'),
        messageElement = document.createElement('textarea'),
        messageText = document.createTextNode('// Code Here'),
        runScriptButton = document.createElement('button'),
        runScriptButtonText = document.createTextNode('Run Code');
    
    wrapper.style.position = 'relative';
    
    // Heading
    headingElement.appendChild(headingText);
    wrapper.appendChild(headingElement);
    
    // Close Button
    this.createCloseButton(wrapper);
    
    // Message
    MessageElement.setAttribute('class', 'its-a-object-container');
    messageElement.appendChild(messageText);
    messageElement.style.minHeight = '160px';
    wrapper.appendChild(messageElement);

    // Run Script Button
    runScriptButton.appendChild(runScriptButtonText);
    (function(){ 
      runScriptButton.style.position = 'absolute';
      runScriptButton.style.right = '0';
      runScriptButton.style.bottom = '0';
      runScriptButton.style.padding = '1em';
      wrapper.appendChild(runScriptButton);
    })();
    runScriptButton.addEventListener("click", function(){
      ( new Function( messageElement.value ))();
    });

    // Append it all
    its_container_wrapper.appendChild(wrapper);
  },
  // Clear The Entire Error Board
  clearAll: function(){
    its_container_wrapper.innerHTML = '';
  },

  setFixedPosition: function(){
    its_container_wrapper.style.position = 'fixed';
    its_container_wrapper.style.top = '0';
    its_container_wrapper.style.left = '0';
    its_container_wrapper.style.width = '100%';
  },
  
  setDefaultPosition: function(){
    its_container_wrapper.style.position = 'relative';
  },

  styles: function(){
  var style_tag = document.createElement('style');
  var styles = [
  '#its-wrapper{',
    'box-sizing: border-box;',
    'position: relative;',
    'z-index: 100;',
    'max-width: 100%;',
    'margin: 0px auto;',
    'background: white;',
  '}',
  '#its-wrapper .its-close-button{',
    'position: absolute;',
    'top: 3px;',
    'right: 3px;',
    'z-index: 10;',
    'color: white;',
    'padding: 2px 5px;',
    'border: 1px solid white;',
    'background: none;',
  '}',
  '#its-wrapper .its-a-message{',
    'color: white;',
    'display: block;',
    'padding: 5px 1%;',
    'box-sizing: border-box;',
    'width: 100%;',
    'margin: 1px;',
    'position: relative;',
    'border: 3px solid rgb(170, 0, 0);',
    'background-color: rgb(170, 0, 0);',
  '}',
  '#its-wrapper .its-a-object-container{',
    'padding: 10px;',
    'border: 3px solid rgb(170, 0, 0);',
    'margin: 0px;',
    'overflow: scroll;',
    'width: 100%;',
    'box-sizing: border-box;',
    'background: rgb(255, 255, 255);',
  '}'
  ].join('');

  style_tag.innerHTML = styles;

  document.getElementsByTagName('head')[0].appendChild(style_tag);

  },
  
  
  
  // -- Close Single Message Button -- //
  // Create Close Button Element
  createCloseButton: function(parentContainer){
    var closeButton = document.createElement('button'),
        closeCtx = document.createTextNode('x');

    closeButton.setAttribute('class', 'its-close-button');
    closeButton.appendChild(closeCtx);
    parentContainer.appendChild(closeButton);
    this.removeSingleMessage(closeButton, parentContainer);
  },
  // Remove Single Message Functionality
  removeSingleMessage: function(closeButton, container){
    closeButton.onclick = function () { 
      container.parentNode.removeChild(container);
    };
  },
  
  
  
  // -- Standard Message Handeling -- //
  // Adds the Type the message context
  assembleContext: function(ctx, type){
    if(type){
      ctx = ctx + ' (' + type + ')';
    }else{
      ctx = ctx;
    }
    console.log(ctx);
    return ctx;
  },
  // Creates and Appends all the information for standard things
  appendContent : function(ctx, checkToAppendCloseButton){
    // Output Elements
    var container = document.createElement('div'),
        content = document.createTextNode(ctx),
        closeButton;
    
    // Pass false to disable type detection.
    // its.a(whatever, false);
    if(checkToAppendCloseButton !== false){
      this.createCloseButton(container);
    }
    
    // Set Output Class
    container.className += "its-a-message";
    
    
    // Append
    container.appendChild(content);
    its_container_wrapper.appendChild(container);
    
    //-- Insert the results as the first element in body
   its_container_wrapper.insertBefore(container, container.nextSibling);
  },
  
  
  
  // -- HTML Element Message Handeling -- //
  htmlElement:function(ctx, container, iterator){
    var wrapper = document.createElement('div'),
        heading = document.createElement('div'),
        headingText,
        pre = document.createElement('pre'),
        tmp = document.createElement('div'),
        ctxHeader = ctx.cloneNode(false),
        ctxCopyChildren = ctx.cloneNode(true),
        headerToString,
        elementToString;
    
    wrapper.style.position = 'relative';
    
    // Heading
    heading.setAttribute('class', 'its-a-message');
    tmp.appendChild(ctxHeader);

    if (iterator === 'single-element'){
      pre.setAttribute('class', 'its-a-object-container');
      headerToString = document.createTextNode(tmp.innerHTML);
    } else{
      headerToString = document.createTextNode(tmp.innerHTML + ' [' + iterator + ']');
    }

    heading.appendChild(headerToString);
    tmp.innerHTML = '';
    
    // Close Button
    this.createCloseButton(wrapper);
    
    // Convert html element to text

    tmp.appendChild(ctxCopyChildren);
    elementToString = document.createTextNode(tmp.innerHTML);



    pre.appendChild(elementToString);
    wrapper.appendChild(heading);
    wrapper.appendChild(pre);
    container.appendChild(wrapper);
  },
  
  
  
  // -- Object Message Handeling -- //
  // Object Traversal and Nesting
  // Basically - loop through object properties
  // Create and Append List Item of Information
  // Each sub object is appended in a nested ul.
  processObject: function(key,value, objectContainer, objectFirstContainer, toggleTypeCheck){

    var objIterativeType = this.checkType(value),
        combined = ': ' + value + ' ',
        type = document.createElement('span'),
        typeText,
        text = document.createTextNode(combined),
        keyStrong = document.createElement('strong'),
        li = document.createElement('li'),
        propertyValueEl = document.createElement('span');
        keyText = document.createTextNode(key);

        if (toggleTypeCheck === false){
          typeText = document.createTextNode( '' );
        } else{
          typeText = document.createTextNode( '(' + objIterativeType + ')');
        }


    keyStrong.appendChild(keyText);
    
    li.appendChild(keyStrong);
    li.appendChild(text);
    

    type.appendChild(typeText);
    type.style.color = 'rgb(170, 0, 0)';
    li.appendChild(type);

    
    objectFirstContainer.appendChild(li);

    objectContainer.appendChild(objectFirstContainer);
  },
  traverseObject: function(ctx, processObject, objectContainer, toggleTypeCheck){
    var objectFirstContainer = document.createElement('ul');
        objectFirstContainer.setAttribute('data-traverse','nested-properties');
        objectFirstContainer.style.display='block';


    for (var key in ctx) {
        its.processObject.apply(this, [key,ctx[key], objectContainer, objectFirstContainer, toggleTypeCheck]);
        if (ctx[key] !== null && typeof(ctx[key])=="object") {
          var objectCtx = ctx[key];
          this.traverseObject(objectCtx, its.processObject, objectFirstContainer, toggleTypeCheck );
        }
    }
    
  },

  // Group Object and Array Results
  groupObjectTogether: function( ctx, type, toggleTypeCheck ){
    var objectWrapper = document.createElement('div'),
        objectHeading = document.createElement('div'),
        objectHeadingText = document.createTextNode( type ),
        objectContainer = document.createElement('div');


    // Header
    objectHeading.setAttribute('class', 'its-a-message');
    objectHeading.appendChild(objectHeadingText);
    objectWrapper.style.position = 'relative';

    // Object Content
    objectContainer.setAttribute('class', 'its-a-object-container');

    this.createCloseButton(objectWrapper);

    if (type === 'htmlcollection' || type === 'nodelist'){
      this.processHTMLCollection(ctx, objectContainer);
    } else {

      // Traverse the object and process the results for display.
      this.traverseObject(ctx, this.processObject, objectContainer, toggleTypeCheck);

      this.correctNestedObjectElements(objectContainer);
    }
    objectWrapper.appendChild(objectHeading);
    objectWrapper.appendChild(objectContainer);
    its_container_wrapper.appendChild(objectWrapper);
  },
  
correctNestedObjectElements: function(objectContainer){
  var nestedGrouping = objectContainer.querySelectorAll( '[data-traverse = nested-properties]' );
  
  for (var i = 1, len = nestedGrouping.length; i < len; i++){

    // Button so you can tab through everything and use spacebar
    // Thanks to Mr. Scott Vinkle for the feedback and education that made this possible.
    var levelExpandTitleAndButton = document.createElement('button');
    levelExpandTitleAndButton.className = 'has-child-list';
    levelExpandTitleAndButton.setAttribute('type', 'button');
    levelExpandTitleAndButton.style.cursor = 'pointer'; 
    levelExpandTitleAndButton.appendChild(nestedGrouping[i].previousSibling.firstChild);

    nestedGrouping[i].previousSibling.insertBefore(levelExpandTitleAndButton, nestedGrouping[i].previousSibling.firstChild);
    //nestedGrouping[i].previousSibling.firstChild.remove();
    nestedGrouping[i].previousSibling.appendChild(nestedGrouping[i]);
    nestedGrouping[i].parentNode.firstChild.setAttribute('class','has-child-list');

    levelExpandTitleAndButton.addEventListener("click", function(e){
      var childMenu = this.parentNode.getElementsByTagName('ul')[0];
      if (childMenu){
        if(childMenu.style.display == 'block'){
          childMenu.style.display = 'none';
        }else {
            childMenu.style.display = 'block';
        }
      }
    });
  }
},

  processHTMLCollection: function(ctx, objectContainer){
    console.log(ctx);
    for (var i = 0, len = ctx.length; i < len; i++){
      this.htmlElement(ctx[i], objectContainer, i);
    }
  },
  

  
  
  // -- Get the type of the input -- //
  checkType: function(global){
    var cache = {};
     return function(obj) {
        var key;
        return obj === null ? 'null' // null
            // window in browser or global in nodejs
            : obj === global ? 'global' 
            // basic: string, boolean, number, undefined, function
            : (key = typeof obj) !== 'object' ? key
            // DOM element
            : obj.nodeType ? 'object:DOMelement'
            // cached. date, regexp, error, object, array, math
            : cache[key = ({}).toString.call(obj)]
            // get XXXX from [object XXXX], and cache it
            || (cache[key] = key.slice(8, -1).toLowerCase()); 
    };
  }(),


  
 
  // -- Initialization function - its.a(thing); -- //
  // Controller Starts it all up - distributes the workload
  a: function(ctx, toggleTypeCheck){
    // Pass false to disable type detection.
    // its.a(whatever, false);
    var type = this.checkType(ctx);
    
    // Object/Array
    if( type === 'object' || type === 'array' || type === 'htmlcollection' || type === 'nodelist'){

      this.groupObjectTogether(ctx, type, toggleTypeCheck);
      console.log(ctx);
   
    // HTML Element
    } else if ( type === 'object:DOMelement' ){
      console.log(its_container_wrapper);
      this.htmlElement(ctx, its_container_wrapper, 'single-element');
      
    // Variables, Strings, Numbers, Booleon
    }else{
      // Return value and type as string of anything other than an array or object.
      if( toggleTypeCheck === false ){
        type = '';
      }

      type = this.assembleContext(ctx, type);
      // Display the output
      this.appendContent(type);
    }

    if (itsa_styles_check !== 1){
      this.styles();
      itsa_styles_check = 1;
    }
    
  },
  
};