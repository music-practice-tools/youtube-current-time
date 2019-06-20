(function() {
  var supportsES6 = (function() {
    try {
      new Function("(a = 0) => a");
      return true;
    } catch (err) {
      return false;
    }
  })();

  if (supportsES6) {
    function getES6Script(path) {
      const pathA = path.split("/");
      pathA.splice(-1, 1, "ytct-es6.js");
      return pathA.join("/");
    }

    const script = document.createElement("script");
    const path = getES6Script(document.currentScript.src);
    script.src = path;
    document.head.appendChild(script);
  } else {
    alert(
      "Unable to use YouTube Time with your Web Browser.\n\nPlease use a more recent browser."
    );
  }
})();
