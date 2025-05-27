afterLoad(() => {
  const profilePopupTrigger = document.querySelector("#profile-popup");
  const profilePopup = document.querySelector("#profile-popup-content");

  PopupMenu.attach(profilePopupTrigger, profilePopup, {
    position: "bottom-right",
  });

  document.querySelectorAll(".accordion-item").forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const content = item.querySelector(".accordion-content");
    Accordion.attach(trigger, content);
  });
});
