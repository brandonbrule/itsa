// Change element

var its_container_wrapper;

var config = {
  expanded: true,
  type_detection: true
}

// Let the the user set a custom location for the wrapper
// so if theres an element with its-wrapper do stuff there.
if ( document.getElementById('its-wrapper') ) {
  its_container_wrapper = document.getElementById('its-wrapper');

// Create its-wrapper at the top of page.
} else {
  its_container_wrapper = document.createElement('div');
  its_container_wrapper.setAttribute("id", "its-wrapper");
  document.body.insertBefore(its_container_wrapper, document.body.firstChild);
}


// Styles Config
( function () {
  var style_tag = document.createElement('style');
  var styles = [
  '#its-wrapper{',
    'box-sizing: border-box;',
    'position: relative;',
    'z-index: 100;',
    'max-width: 100%;',
    'margin: 0px auto;',
    'line-height: 1.35;',
    'background: white;',
    'font-family: "Lucida Sans Typewriter";',
  '}',
  '.its-close-button{',
    'position: absolute;',
    'top: 3px;',
    'right: 3px;',
    'z-index: 10;',
    'color: white;',
    'padding: 2px 5px;',
    'border: 1px solid white;',
    'background: none;',
  '}',
  '.its-close-all-button{',
    'position: absolute;',
    'top: 3px;',
    'right: 35px;',
  '}',
  '.its-a-message{',
    'color: white;',
    'display: block;',
    'padding: 5px 1%;',
    'box-sizing: border-box;',
    'width: 100%;',
    'word-wrap: break-word;',
    'margin: 1px;',
    'position: relative;',
    'border: 3px solid rgb(170, 0, 0);',
    'background-color: rgb(170, 0, 0);',
  '}',
  '.its-a-message input{',
    'background: none;',
    'color: #fff;',
    'border: none;',
    'width: auto',
  '}',
  '.its-a-object-container{',
    'padding: 10px;',
    'border: 3px solid rgb(170, 0, 0);',
    'margin: 0px;',
    'overflow: scroll;',
    'width: 100%;',
    'box-sizing: border-box;',
    'background: rgb(255, 255, 255);',
  '}',
  '.code-snippet{',
    'position: fixed;',
    'bottom: 0;',
    'left: 0;',
    'width: 100%;',
  '}',
  '#its-wrapper ul.closed{',
    'display: none;',
  '}',
  '#its-wrapper li{',
    'color:#555;',
    'position: relative;',
  '}',
  '#its-wrapper li button{',
    'position: absolute;',
    'left: -27px;',
    'width: 25px;',
    'height: 25px;',
  '}',
  '#its-wrapper li span{',
    'display: inline-block;',
  '}',
  '#its-wrapper li strong{',
    'color:#222;',
    'font-family: Arial, helvetica;',
    'font-size: 14px;',
    'display: inline-block;',
    'font-weight: 600;',
  '}'
  ].join('');

  style_tag.innerHTML = styles;
  document.getElementsByTagName('head')[0].appendChild(style_tag);
})();



//-// -------------- its.a -------------- //-//
var its = {
  collapsed: true,
  custom_title: false,

  setConfig: function(config){
    this.collapsed = config.collapsed;
  },
  
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

    its.closeAllButton();
  },
  
  snippet: function(){
    var wrapper = document.createElement('div'),
        headingElement = document.createElement('div'),
        headingText = document.createTextNode('Test Code Snippet'),
        messageElement = document.createElement('textarea'),
        messageText = document.createTextNode('its.a("test")'),
        runScriptButton = document.createElement('button'),
        runScriptButtonText = document.createTextNode('Run Code');
    
    // Heading
    headingElement.setAttribute('class', 'its-a-message');
    headingElement.appendChild(headingText);
    wrapper.appendChild(headingElement);
    
    // Close Button
    this.createCloseButton(wrapper);
    
    // Message
    messageElement.setAttribute('class', 'its-a-object-container');
    messageElement.appendChild(messageText);
    wrapper.appendChild(messageElement);

    // Run Script Button
    runScriptButton.appendChild(runScriptButtonText);
    (function(){ 
      runScriptButton.style.position = 'absolute';
      runScriptButton.style.right = '25px';
      runScriptButton.style.top = '5px';
      wrapper.appendChild(runScriptButton);
    })();
    runScriptButton.addEventListener("click", function(e){
      ( new Function( messageElement.value ))();
      e.stopPropagation();
    });

    wrapper.setAttribute('class', 'code-snippet');

    // Append it all
    document.getElementsByTagName('body')[0].appendChild(wrapper);
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

  htmlEntities: function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  // Close All Button
  closeAllButton : function(){
    if (!document.getElementById('its-close-all-button')){
      var closeButton = document.createElement('button'),
          closeCtx = document.createTextNode('Clear All');

      closeButton.setAttribute('class', 'its-close-all-button');
      closeButton.id= "its-close-all-button";
      closeButton.appendChild(closeCtx);
      closeButton.addEventListener('click', function(e){
        its.clearAll();
      });
      its_container_wrapper.appendChild(closeButton);
    }
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
    closeButton.addEventListener('click', function(e){
      container.parentNode.removeChild(container);
      e.stopPropagation();
    });
  },
  
  
  // Creates and Appends all the information for standard things
  appendContent : function(ctx, type){
    // Output Elements
    var container = document.createElement('div'),
        content = document.createElement('span'),
        custom_title = document.createElement('strong'),
        type_element = document.createElement('span');

    // Pass false to disable type detection.
    this.createCloseButton(container);

    // Set Custom Title if Passed In
    if (its.custom_title){
      custom_title.innerHTML = its.custom_title + ': ';
      container.appendChild(custom_title);
    }

    // Set Input value with value passed in
    content.innerHTML = ctx;
    content.setAttribute('contenteditable', true);
    content.setAttribute('style', 'padding: 5px;');
    container.appendChild(content);

    // If the user hasnt'
    type_element.innerHTML = '( ' + type + ' )';
    type_element.setAttribute('style', 'padding-left: 5px;');
    container.appendChild(type_element);

    // Set Output Class
    container.className += "its-a-message";
    
    // Append
    its_container_wrapper.appendChild(container);
    
    //-- Insert the results as the first element in body
   its_container_wrapper.insertBefore(container, container.nextSibling);
  },
  
  
  
  // -- HTML Element Message Handeling -- //
  htmlElement:function(ctx, container, iterator){
    var wrapper = document.createElement('div'),
        heading = document.createElement('div'),
        pre = document.createElement('pre'),
        tmp = document.createElement('div'),
        ctxHeader = ctx.cloneNode(false),
        ctxCopyChildren = ctx.cloneNode(true),
        headerToString,
        elementToString,
        str;
    
    wrapper.style.position = 'relative';
    
    // Heading
    heading.setAttribute('class', 'its-a-message');
    tmp.appendChild(ctxHeader);

    if (iterator === 'single-element'){
      pre.setAttribute('class', 'its-a-object-container');
      headerToString = tmp.innerHTML;
    } else{
      headerToString = tmp.innerHTML + ' [' + iterator + ']';
    }

    headerToString = this.htmlEntities(headerToString);

    if (this.custom_title){
      headerToString = '<strong>' + this.custom_title + '</strong>: ' + headerToString;
    }

    heading.innerHTML = headerToString;
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
  
  cookies: function(){
    this.a(document.cookie);
    console.log(document.cookie);
  },
  
  // -- Object Message Handeling -- //
  // Object Traversal and Nesting
  // Basically - loop through object properties
  // Create and Append List Item of Information
  // Each sub object is appended in a nested ul.
  createItem: function(key,value, objectContainer, objectFirstContainer){

    var li = document.createElement('li'),
        type_of = this.checkType(value),
        type_of_el = document.createElement('span'),
        type_of_text,

        prop_el,
        key_el = document.createElement('strong'),

        type_of_text = document.createTextNode( ' (' + type_of + ')');


    if(type_of === 'function'){
      prop_el = document.createElement('PRE');
      prop_el.innerHTML = value;
      key_el.innerHTML =  key + '( )';
    } else {
      prop_el = document.createTextNode(': ' + value);
      key_el.innerHTML = key;
    }


   
    // Styles for Type (type)
    type_of_el.style.color = 'rgb(170, 0, 0)';
    type_of_el.setAttribute('class', 'its-type');
    type_of_el.appendChild(type_of_text);


    li.appendChild(key_el);

    if(type_of === 'function'){
      li.appendChild(type_of_el);
      li.appendChild(prop_el);

    } else {
      li.appendChild(prop_el);
      li.appendChild(type_of_el);
    }
      
    
    objectFirstContainer.appendChild(li);

    objectContainer.appendChild(objectFirstContainer);


  },

  traverseObject: function(ctx, createItem, objectContainer){
    var objectFirstContainer = document.createElement('ul');
        objectFirstContainer.setAttribute('data-traverse','nested-properties');

    if (this.collapsed !== false){
      objectFirstContainer.setAttribute('class', 'closed');
    }
    
    // Types inside an Object
    for (var key in ctx) {
      var property_value;

      if (ctx[key] === null){
        property_value = null;
        its.createItem.apply(this, [key, property_value, objectContainer, objectFirstContainer]);

      } else if (ctx[key] === undefined){
        property_value = undefined;
        its.createItem.apply(this, [key, property_value, objectContainer, objectFirstContainer]);

      // If it's an HTML element nested in an object
      } else if (ctx[key].nodeName){
        property_value = {
          el: ctx[key].nodeName
        };

        var nodes=[], values=[];
        var attrs = [];
        for (var att, i = 0, atts = ctx[key].attributes, n = attrs.length; i < n; i++){
            att = attrs[i];
            var att_type = att.nodeName;
            attrs.push( "[" + att.nodeName + '="' + att.nodeValue + '"]' );
        }
        property_value.attributes = attrs;
        
        its.createItem.apply(this, [key, property_value, objectContainer, objectFirstContainer]);
        this.traverseObject(property_value, its.createItem, objectFirstContainer );

      } else {

        property_value = ctx[key];
        its.createItem.apply(this, [key, property_value, objectContainer, objectFirstContainer]);
        if (property_value !== null && typeof(property_value)=="object") {
          this.traverseObject(property_value, its.createItem, objectFirstContainer );
        }
      }

    }
    
  },

  // Group Object and Array Results
  groupObjectTogether: function( ctx, type ){
    var objectWrapper = document.createElement('div'),
        objectHeading = document.createElement('div'),
        objectHeadingText = document.createTextNode( type ),
        objectContainer = document.createElement('div');

    if (its.custom_title !== false){
      objectHeadingText = document.createTextNode(its.custom_title + ': ' + type);
    }


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
      this.traverseObject(ctx, this.createItem, objectContainer);
      this.correctNestedObjectElements(objectContainer);
    }
    objectWrapper.appendChild(objectHeading);
    objectWrapper.appendChild(objectContainer);
    if (objectWrapper.getElementsByTagName('ul')[0]){
      objectWrapper.getElementsByTagName('ul')[0].removeAttribute('class');
    }
    its_container_wrapper.appendChild(objectWrapper);
  },
    
  correctNestedObjectElements: function(objectContainer){
    var nestedGrouping = objectContainer.querySelectorAll( '[data-traverse = nested-properties]' );
    
    for (var i = 1, len = nestedGrouping.length; i < len; i++){

      // Button so you can tab through everything and use spacebar
      // Thanks to Mr. Scott Vinkle for the feedback and education that made this possible.
      var li = nestedGrouping[i].previousSibling;
      var strong = li.firstChild;
      var property_name = strong.innerHTML;
      
      var expand_button = document.createElement('button');
      expand_button.setAttribute('type', 'button');
      expand_button.style.cursor = 'pointer';

      if (this.collapsed !== true){
        expand_button.innerHTML = '-';
      } else {
        expand_button.innerHTML = '+';
      }
      
      // Expand Button
      li.insertBefore(expand_button, strong);

      // Children List Menus appended
      li.appendChild(nestedGrouping[i]);

      expand_button.addEventListener("click", function(e){
        if ( e.target.nodeName === 'BUTTON'){
          var childMenu = e.target.parentNode.getElementsByTagName('ul')[0];
          if (childMenu){
            if ( childMenu.getAttribute('class') ){
              childMenu.removeAttribute('class');
              e.target.innerHTML = '-';
            } else {
              childMenu.setAttribute('class', 'closed');
              e.target.innerHTML = '+';
            }
          }
        }
        e.stopPropagation();
      });
    }
  },

  processHTMLCollection: function(ctx, objectContainer){
    for (var i = 0, len = ctx.length; i < len; i++){
      this.htmlElement(ctx[i], objectContainer, i);
    }
  },
  

  // -- Get the type of the input -- //
  checkType : function(arg){
    if (arg != null || arg != undefined){
      if (arg.nodeType){
        return 'DOMelement';
      }
    }

    return Object.prototype.toString.call(arg).replace('[object ', '').replace(']', '').toLowerCase();
  },

  // -- Initialization function - its.a(thing); -- //
  // Controller Starts it all up - distributes the workload
  a: function(ctx){

    var type = this.checkType(ctx);

    if(ctx){
      console.log(ctx);
    }


    // Primatives
    if(type === 'string' || type === 'number' || type === 'booleon' || type === 'date'){
      this.appendContent(ctx, type);
   
    // HTML Element
    } else if ( type === 'DOMelement' ){
      this.htmlElement(ctx, its_container_wrapper, 'single-element');

    // localStorage
    } else if ( type === 'storage' ){

      for (var key in ctx) {
        var localstoragetype = this.checkType(ctx[key]);
        var localStorageItemObject = JSON.parse( ctx[key] );
        this.groupObjectTogether(localStorageItemObject, key + ' (' + type + ')');
        console.log(key + ':' + ctx[key]);
      }

    // Various JS Objects
    } else {
      // Window Exceeds maximum callstack :(
      if(type !== 'window'){
        this.groupObjectTogether(ctx, type);
      }
      
    }

    this.closeAllButton();

    its.custom_title = false;

  },
  
};
