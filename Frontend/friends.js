
if(window.location.pathname =='/friends.html'){
    // Fetching all users
    const dataDisplayDiv = document.getElementById("dataDisplay");
    const apiUrl = 'http://localhost:4200/user';

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); 
        })
    .then(data => {
        const usersHTML = data.allUsers.map(user => `
        <div class="friendlist">
                <img class="profpic" src="${user.profpic}" alt="">
                <h3>${user.fullname}</h3>
                <p>@${user.username}</p>        
        
          <div class="btnbox">
                        <button class="pbtn">Profile</button>
                        <button class="unfollow">Unfollow</button>
                    </div>
        </div>
      `).join("");
      // Render the user displays in the div
      dataDisplayDiv.innerHTML = usersHTML;
    
    
        console.log(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}