function afterLoad(cb) {
  if (document.readyState === "complete") {
    cb();
  } else {
    window.addEventListener("load", cb);
  }
}
