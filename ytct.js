var supportsES6 = (function() {
  try {
    new Function("(a = 0) => a");
    return true;
  } catch (err) {
    return false;
  }
})();

if (supportsES6) {
  var script = document.createElement("script");
  script.src = "ytct-es6.js";
  document.head.appendChild(script);
} else {
  alert(
    "Unable to use YouTube Time with your Web Browser. Please use a more recent browser. "
  );
}
