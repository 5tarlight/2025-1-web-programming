afterLoad(() => {
  const trigger = document.querySelector("#popup-button");
  const popup = document.querySelector("#popup");

  PopupMenu.attach(trigger, popup, {
    position: "bottom-left",
  });

  document.querySelectorAll(".accordion-item").forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const content = item.querySelector(".accordion-content");
    Accordion.attach(trigger, content);
  });
});
