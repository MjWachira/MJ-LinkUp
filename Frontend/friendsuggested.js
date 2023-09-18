
if(window.location.pathname =='/friendsuggested.html'){
    // Fetching all users
    
    const dataDisplayDiv = document.getElementById("dataDisplay");
    
    let id = localStorage.getItem('userID')
    const apiUrl = `http://localhost:4200/user/follows/${id}`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); 
        })
    .then(data => {
        const usersHTML = data.users.map(user => `
        <div class="friendlist">
                <img class="profpic" src="${user.profPic}" alt="">
                <h3>${user.fullname}</h3>
                <p>@${user.username}</p>        
        
                <div class="btnbox">
                <button class="pbtn follow-btn" data-userid="${user.userID}">Follow</button>
                <button class="unfollow dismiss-btn" data-userid="${user.userID}">Dismiss</button>
            </div>
        </div>
      `).join("");
      // Render the user displays in the div
      dataDisplayDiv.innerHTML = usersHTML;
      const followButtons = document.querySelectorAll(".follow-btn");
        const dismissButtons = document.querySelectorAll(".dismiss-btn");

followButtons.forEach(button => {
    button.addEventListener("click", () => {
        const userIdToFollow = button.getAttribute("data-userid");
        // Implement your follow logic here, e.g., make a POST request to follow the user.
        console.log(`Follow user with ID ${userIdToFollow}`);
        const apiUrl = 'http://localhost:4200/user/follow';
        let token = localStorage.getItem('token')

        // Data to send in the POST request body
        const data = {
        FollowUserID: userIdToFollow,
        FollowedUserID: id
        };

        // Define request headers
        const headers = {
        'Content-Type': 'application/json',
        'token': token
        };

        // Configure the fetch request
        const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
        };

        // Make the POST request
        fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            // Handle the response data here (e.g., check if the follow was successful)
            console.log('Follow request successful:', responseData);
            window.location.href = '/friendsuggested.html'; 
        })
        .catch(error => {
            console.error('Follow request error:', error);
        });

    });
});

dismissButtons.forEach(button => {
    button.addEventListener("click", () => {
        const userIdToDismiss = button.getAttribute("data-userid");
        // Implement your dismiss logic here, e.g., remove the user from the list or make a request to dismiss the user.
        console.log(`Dismiss user with ID ${userIdToDismiss}`);
    });
});
    
    
        console.log(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

}
const dataDisplayDiv = document.getElementById("pbox");

    let userID = localStorage.getItem('userID')

    const oneUser = 'http://localhost:4200/user/check';

    fetch(oneUser,{
    headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json',
        "token": localStorage.getItem('token')
    },
    method: "GET"})
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); 
        })
    .then(data => {
        const usersHTML = 
        `
        <div class="pbox" id="pbox">
        <div class="bgimg"></div>
        <img class="pimg" src="${data.info.profpic}" alt="">
        <h3>${data.info.fullname}</h3>
        <p class="username" >@${data.info.username}</p>  
        </div>

        `
      dataDisplayDiv.innerHTML = usersHTML;
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });