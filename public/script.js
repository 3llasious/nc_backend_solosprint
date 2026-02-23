const downbuttons = document.querySelectorAll(".down_button");
console.log("Hello from script js");
console.log(downbuttons);

downbuttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log("being clicked bro");
    const card = button.closest(".card");
    //finds the closest parent with the class card and assigns to the variable card
    card.classList.toggle("open");
    //adds an open class to the card we just retrieved
  });
});
