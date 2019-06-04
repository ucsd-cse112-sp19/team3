### How to generate JSDoc

go to root directory of repo, run script with our configuration file,
> source directory, destination directory, and all other configs are specified in this file
```
jsdoc -c docs/conf/conf.json
```

### What to do next

enable our component script in the generated `.html` pages,

add `<script>` into the body of each specific `.html` page, for example,
```
<script src="../Components/CoreHello/CoreHello.js"></script>
```

then open the generated `CoreHello.html`, search for keyword `"section-examples"`,

copy the example code we have inside `<pre><code>`, and paste it below,
```
<div class="section-examples">
<h5>Example</h5>

    <pre class="prettyprint"><code>&lt;core-hello lang="es" rainbow> Peter &lt;/core-hello></code></pre>
    <core-hello lang="es" rainbow> Peter </core-hello>
</div>
```

### Shortcut paste board

##### CoreHello.html
```
<div class="section-examples">
<h5>Example</h5>

<script src="../Components/CoreHello/CoreHello.js"></script>

    <pre class="prettyprint"><code>&lt;core-hello lang="es" rainbow> Peter &lt;/core-hello></code></pre>
    <core-hello lang="es" rainbow> Peter </core-hello>

</div>
```

##### CustomeButton.html
```
  <script src="../Components/CustomButton/CustomButton.js"></script>
<div class="section-examples">
<h5>Examples</h5>

<script src="../Components/CustomButton/CustomButton.js"></script>

    

</div>
```