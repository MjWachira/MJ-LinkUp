if(window.location.pathname =='/postedit.html'){

    

        const comDisplayDiv = document.querySelector("#sugfriends")
        // Fetching all users
        let uid = localStorage.getItem('userID')
        const apiUrl = `http://localhost:4200/user/follows/${uid}`;
    
    
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); 
            })
        .then(data => {
            const usersHTML = data.users.map(user => `
            
            <div class="sfriend">
                        <img class="spimg" src="${user.profPic}" alt="">
                        <h5>${user.fullname}</h5>
                        <div class="icons">
                            <img id="follow-btn" data-userid="${user.userID}" class="" src="/icons/follow.svg" alt="" style="width: 20px;">
                            <img class="" src="/icons/dismiss.svg" alt="" style="width: 29px ;">
                        </div>
              
            </div>
            
          `).join("");
          // Render the user displays in the div
          comDisplayDiv.innerHTML = usersHTML;
          const followButtons = document.querySelectorAll("#follow-btn");
            console.log(data);
    
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
                    })
                    .catch(error => {
                        console.error('Follow request error:', error);
                    });
            
                });
            })
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });



    const post_form =  document.getElementById('post-form')
    const txtpostdes = document.getElementById('post-des')
    const txtpostimg1 = document.getElementById('post-img')
    const notification = document.getElementById('notification')

    // const txtpostimg ="https://res.cloudinary.com/du1zkniut/image/upload/v1692710889/cld-sample.jpg"
    let txtpostimg = ""  
    
    txtpostimg1.addEventListener('change',(event)=>{
        const target =event.target 
        const files = target.files

        if(files){
            const formData = new FormData()
            
            formData.append("file",files[0])
            formData.append("upload_preset","mjlinkup")
            formData.append("cloud_name", "du1zkniut")

            fetch('https://api.cloudinary.com/v1_1/du1zkniut/image/upload',{
                method:"POST",
                body: formData
            }).then((res)=>res.json()).then(res=>txtpostimg =res.url)
        }
    })

    post_form.addEventListener('submit',(e)=>{
        e.preventDefault()

        if(txtpostdes.value == ''){
            notification.textContent = 'cant post empty post'
            return
        }
        let postID =localStorage.getItem('postId')
        let userID=localStorage.getItem('userID')

        post = 
        txtpostdes.value !== '' &&
        txtpostimg !=='' 
        const uid= userID
        console.log(uid)

        if(post){
            const promise = new Promise ((resolve , reject)=>{
                fetch(`http://localhost:4200/post/${postID}`,{
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json',
                        "token": localStorage.getItem('token')

                    },
                    method:'PUT',
                    body:JSON.stringify({
                        "postDescription":txtpostdes.value,
                        "postImage":txtpostimg,
                        "userID": uid
                    })
                }).then(res=>(res.json())).then(data=>{
                    console.log(data);
                    
                    notification.innerHTML = data[0]?.message ?? data?.message
                    resolve(data)
                    // window.location.href = '/login.html'; 
                    setTimeout(()=>{
                        notification.innerHTML=''
                    },3000)
                }).catch(error =>{
                    console.log(error);
                    reject(error)
                })
            })
        
        }

    })
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

}