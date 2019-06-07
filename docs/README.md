### How to generate JSDoc

go to root directory of repo, run script with our configuration file,
> source directory, destination directory, and all other configs are specified in this file
```
jsdoc -c docs/conf/conf.json
```

### What to do next

1. open the generated `CoreHello.html`, search for keyword `"section-examples"` and find the related block of codes,

copy the example code we have inside `<pre><code>  </code></pre>`, and paste it as below,
```
<div class="section-examples">
<h5>Example</h5>

    <pre class="prettyprint"><code>&lt;core-hello lang="es" rainbow> Peter &lt;/core-hello></code></pre>
    <core-hello lang="es" rainbow> Peter </core-hello>
</div>
```

2. then enable our component script in the generated `.html` pages,

add `<script>` into the body of each specific `.html` page, for example,
```
<script src="./CoreHello.js"></script>
```
> *Note that `<script>` must be added outside of `<div>`, it'd be good to add at the end of a `</div>`

see below as the version after proper edits,
```
<div class="section-examples">
<h5>Example</h5>

    <pre class="prettyprint"><code>&lt;core-hello lang="es" rainbow> Peter &lt;/core-hello></code></pre>
    <core-hello lang="es" rainbow> Peter </core-hello>
</div>
<script src="./CoreHello.js"></script>
```

### Shortcut paste board

##### CoreHello.html
```
<div class="section-examples">
<h5>Example</h5>

    <pre class="prettyprint"><code>&lt;core-hello lang="es" rainbow>
    Peter
&lt;/core-hello></code></pre>
    <core-hello lang="es" rainbow> Peter </core-hello>

</div>
<script src="./demo_components/CoreHello/CoreHello.js"></script>
```

##### CustomButton.html
```
<div class="section-examples">
<h5>Examples</h5>

    <pre class="prettyprint"><code>&lt;custom-button onclick="alert('Hello world!')">
     Button
&lt;/custom-button></code></pre>
    <custom-button onclick="alert('Hello world!')">Button</custom-button>


    <pre class="prettyprint"><code>&lt;custom-button rounded>
     Click Me
&lt;/custom-button></code></pre>
    <custom-button rounded>Click Me</custom-button>

    <pre class="prettyprint"><code>&lt;custom-button theme="pink-lemonade" active-background-color="blue">
     Click Me
&lt;/custom-button></code></pre>
    <custom-button theme="pink-lemonade" active-background-color="#ff34b3">Click Me</custom-button>

</div>
<script src="./demo_components/CustomButton/CustomButton.js"></script>
```

##### CustomPopover.html
```
<div class="section-examples">
<h5>Examples</h5>

    <pre class="prettyprint"><code>&lt;custom-button id='default-btn'>
     &lt;custom-popover anchor='default-btn'>
         Popover Text
     &lt;/custom-popover>
     Click Me
&lt;/custom-button></code></pre>
    <custom-button id='defaultBtn'><custom-popover anchor='defaultBtn'>Popover Text</custom-popover>Click Me</custom-button>

    <pre class="prettyprint"><code>&lt;custom-button id='topBtn'>
     &lt;custom-popover anchor='topBtn' placement='top'>
         Popover Text
     &lt;/custom-popover>
     Click Me
&lt;/custom-button></code></pre>
    <custom-button id='topBtn'><custom-popover anchor='topBtn' placement='top'>Popover Text</custom-popover>Click Me</custom-button>

    <pre class="prettyprint"><code>&lt;custom-button class="btn-warning" id='btnWarning'>
     &lt;custom-popover class='btn-warning' anchor='btnWarning' placement='top'>
         Popover Text
     &lt;/custom-popover>
     Warning
&lt;/custom-button></code></pre>
    <custom-button class="btn-warning" id='btnWarning'><custom-popover class='btn-warning' anchor='btnWarning' placement='top'>Popover Text</custom-popover>Warning</custom-button>

</div>
<script src='./demo_components/CustomButton/CustomButton.js'></script>
<script src='./demo_components/CustomPopover/CustomPopover.js'></script>
```

##### CustomSlider.html
```
<div class="section-examples">
<h5>Examples</h5>

    <pre class="prettyprint"><code>&lt;custom-slider min="5" max="105" value="50">&lt;/custom-slider></code></pre>
    <custom-slider min="5" max="105" value="50"></custom-slider>

    <pre class="prettyprint"><code>&lt;custom-slider min="5" max="105" value="50" disabled>&lt;/custom-slider></code></pre>
    <custom-slider min="5" max="105" value="50" disabled></custom-slider>

    <pre class="prettyprint"><code>&lt;custom-slider min="5" max="105" value="50" size="L" showinput>&lt;/custom-slider></code></pre>
    <custom-slider min="5" max="105" value="50" size="L" showinput></custom-slider>

</div>
<script src="./demo_components/CustomSlider/CustomSlider.js"></script>
```