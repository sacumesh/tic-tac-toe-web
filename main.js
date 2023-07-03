function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const playerNameInput = document.getElementById("playerName");
  const difficultyRadios = document.querySelectorAll(
    'input[name="difficulty"]:checked'
  );

  // Retrieve the values from the form
  const playerName = playerNameInput.value;
  const difficulty =
    difficultyRadios.length > 0 ? difficultyRadios[0].value : "";

  if (playerName.trim() === "" || difficulty === "") {
    // Display a warning message using a browser popup
    alert("Please fill in all fields.");
    return; // Stop further execution
  }

  // Store the values in local storage
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("difficulty", difficulty);
  localStorage.setItem("playerScore", 0);
  localStorage.setItem("computerScore", 0);

  // Optionally, perform any additional actions here

  // Reset the form
  window.location.href = "./pages/game.page/game.page.html";
  event.target.reset();
}
