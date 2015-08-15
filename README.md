# jQuery-widowFix
Widow Fix is a jQuery plugin to fix widows, or orphans, or whatever you call them—those single words on their own line. It does this by adding a &amp;nbsp; (non-breaking space) in between the last 2 words. It's super lite and easy to use!

## How To Use
```javascript
$(document).ready(function() {
    $('h1').widowFix();
    $('#mainColumn h1').widowFix();
});
```

## Options
```javascript
$('h1').widowFix({
    letterLimit: 10,
    prevLimit: 5,
    linkFix: true
})
```
`letterLimit` will set the number of letters that you think still counts as a widow/orphan. Some people think that long words look fine by themselves and shouldn't be Widow Fixed. So if you think words of 10+ letters look fine, set the limit to 10 and it will ignore those words. Any words shorter than 10 characters will still be fixed. The default is to fix all words regardless of characters.

`prevLimit` will set the ignore amount for the previous (second to last) word. If you don't want to fix widows/orphans when the second to last word is shorter than 5 letters, set prevLimit: 5 and it will skip those widows. The default is to fix all words regardless of the previous word length.

`linkFix` will maintain your link and replace the proper space. Only add this option if this is a contant problem, as it will slightly slow down the script.

