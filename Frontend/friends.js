
if(window.location.pathname =='/friends.html'){
    // Fetching all users
    
    const dataDisplayDiv = document.getElementById("dataDisplay");

let id = localStorage.getItem('userID');
const apiUrl = `http://localhost:4200/user/follow/${id}`;

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
                    <button class="profile" data-userid="${user.userID}">Profile</button>
                    <button class="unfollow" data-userid="${user.userID}">Unfollow</button>
                </div>
            </div>
        `).join("");

        // Render the user displays in the div
        dataDisplayDiv.innerHTML = usersHTML;

        // Add event listeners to profile and unfollow buttons
        const profileButtons = document.querySelectorAll(".profile");
        const unfollowButtons = document.querySelectorAll(".unfollow");

        profileButtons.forEach(button => {
            button.addEventListener("click", () => {
                const userIdToViewProfile = button.getAttribute("data-userid");
                // Implement logic to view the profile of the user.
                console.log(`View profile of user with ID ${userIdToViewProfile}`);
            });
        });

        unfollowButtons.forEach(button => {
            button.addEventListener("click", () => {
                const userIdToUnfollow = button.getAttribute("data-userid");
                // Implement logic to unfollow the user.
                console.log(`Unfollow user with ID ${userIdToUnfollow}`);
                const apiUrl = 'http://localhost:4200/user/unfollow';
                const token = localStorage.getItem('token')

                // Data to send in the POST request body
                const data = {
                FollowerUserID: userIdToUnfollow,
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
                    // Handle the response data here (e.g., check if the unfollow was successful)
                    console.log('Unfollow request successful:', responseData);
                    window.location.href = '/friends.html'; 
                })
                .catch(error => {
                    console.error('Unfollow request error:', error);
                });

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

