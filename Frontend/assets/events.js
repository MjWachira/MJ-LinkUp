    // Get references to the modal and close button
    const modal = document.getElementById("myModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const openModalBtn = document.getElementById("openModalBtn");

    // Open the modal when the button is clicked
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close the modal when the close button is clicked
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
