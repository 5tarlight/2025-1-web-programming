afterLoad(() => {
  const profilePopupTrigger = document.querySelector("#profile-popup");
  const profilePopup = document.querySelector("#profile-popup-content");

  PopupMenu.attach(profilePopupTrigger, profilePopup, {
    position: "bottom-right",
  });
});
