afterLoad(() => {
  const trigger = document.querySelector("#popup-button");
  const popup = document.querySelector("#popup");

  PopupMenu.attach(trigger, popup, {
    position: "bottom-left",
  });
});
