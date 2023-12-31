if(window.location.pathname =='/index.html'){
    const post_form =  document.getElementById('post-form')
    const txtpostdes = document.getElementById('post-des')
    const txtpostimg1 = document.getElementById('post-img')
    const notification = document.getElementById('notification')

    // const txtpostimg ="https://res.cloudinary.com/du1zkniut/image/upload/v1692710889/cld-sample.jpg"
    let txtpostimg = "https://res.cloudinary.com/du1zkniut/image/upload/v1692710889/cld-sample.jpg"  
    
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
        
        let userID=localStorage.getItem('userID')

        post = 
        txtpostdes.value !== '' &&
        txtpostimg !=='' 

        const uid= userID
        console.log(uid)

        if(post){
            const promise = new Promise ((resolve , reject)=>{
                fetch('http://localhost:4200/post',{
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    method:'POST',
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
    // Fetching all users
    const comDisplayDiv = document.querySelector("#sugfriends")
    // Fetching all users
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
                    window.location.href = '/index.html'; 
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



///GETTING ALL POSTS
    

    function fetchAndDisplayPosts() {
        const allPostsURL = 'http://localhost:4200/post';
    
        fetch(allPostsURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const displayData = document.querySelector('.allposts');
                // console.log(data.posts.dateCreated);
                // const data = data.posts.reverse();
    
                if (data && data.posts && Array.isArray(data.posts)) {
                    

                    const postsHTML = data.posts.reverse().map(post =>
                        // console.log(`${posts.dateCreated}`)
                        `
                        
                        <div class="postbox" data-post-id="${post.postID}">
                            <div class="postprofile">
                                <div style="display: flex; gap: 10px; align-items: center;">
                                    <img class="postpimg" src="${post.profPic}" alt="">
                                    <p class="username">@${post.username}</p>
                                
                                </div>
                                <script>
                              

                                </script>
                                <p>${
                                    
                                    // date =  (((new Date()-new Date(post.dateCreated))/3600000)+3).toFixed(2)
                                    date =  ((new Date(post.dateCreated)).toLocaleTimeString())
                                    // post.dateCrea
                                }</p>
                                <img src="/icons/dots.svg" style="height: 20px;" alt="">
                            </div>
                            <div class="postcontent">
                                <p>${post.postDescription}</p>
                                <img class="postimg" src="${post.postImage}" alt="no img">
                            </div>
                            <div class="pbtn">
                                <button class="like" data-post-id="${post.postID}"><img class="like" src="/icons/uiw_like-o.svg" alt="">2 Likes</button>
                                <button class="comment" data-post-id="${post.postID}"><img src="/icons/Vector.svg" alt="">4 Comments</button>
                                <button><img src="/icons/uil_share.svg" alt="">share</button>
                            </div>
                            <div class="comments">
                                <form action="">
                                    <input type="text">
                                    <button><img src="/icons/material-symbols_send-outline.svg" alt=""></button>
                                </form>
                            </div>
                        </div>
                    `).join("");
                    displayData.innerHTML = postsHTML;
    
                    // Add event listeners for edit and delete buttons
                    const editButton = document.querySelectorAll('.like');
                    const deleteButtons = document.querySelectorAll('.delete');
                    const postbox = document.querySelectorAll('.postbox')
    
                    editButton.forEach(button => {
                        button.addEventListener('click', (e) => {
                            e.preventDefault
                            // const postId = event.target.getAttribute('data-post-id');
                            // Implement the edit logic for postId here
                            // You can open a modal or redirect to an edit page
                            // console.log(`like post with ID ${postId}`);
                            const apiUrl = 'http://localhost:4200/post/like';
                            const token = localStorage.getItem('token'); // Replace with your actual authorization token
                            
                            let userID = localStorage.getItem('userID');
                            let postID = localStorage.getItem('postID');

                            // Data to send in the POST request body
                            const data = {
                            postID: postID,
                            userID: userID
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
                                // Handle the response data here (e.g., check if the post was liked successfully)
                                console.log('Post liked successfully:', responseData);
                            })
                            .catch(error => {
                                console.error('Post like request error:', error);
                            });

                        });

                    });
    
                    deleteButtons.forEach(button => {
                        button.addEventListener('click', (event) => {
                            const postId = event.target.getAttribute('data-post-id');                 
                            console.log(`Delete post with ID ${postId}`);
                            const confirmDelete = window.confirm(`Are you sure you want to delete post with ID ${postId}?`);

                            if (confirmDelete) {
                
                                fetch(`http://localhost:4200/post/${postId}`, {
                                    method: 'DELETE',
                                })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Network response was not ok');
                                        }
                                        // Assuming the server returns a success message on successful deletion
                                        return response.json();
                                    })
                                    .then(data => {
                                        // Handle the response from the server
                                        console.log(`Post with ID ${postId} deleted successfully:`, data);
                                        // Optionally, you can also remove the deleted post from the UI
                                        event.target.closest('.postbox').remove();
                                    })
                                    .catch(error => {
                                        console.error(`Error deleting post with ID ${postId}:`, error);
                                    });
                            }




                        });
                    });
                    postbox.forEach(post => {
                        post.addEventListener('click', (event) => {
                            let postId = event.target.getAttribute('data-post-id');
                            // Implement the edit logic for postId here
                            // You can open a modal or redirect to an edit page
                    
    
                            localStorage.setItem('postID', postId)   
                            console.log(`Edit post with ID ${postId}`);

                            id = localStorage.getItem('postID')

                            if(postId !== null){
                                window.location.href = '/index2.html'; 
                            }
                            if(postId == null){
                                window.location.href = '/index.html'; 
                            }
                            
                            
                        });

                    });
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    const dataDisplayDiv =  document.getElementById("pbox");


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
        // let userID = data?.info?.userID
        // localStorage.setItem('userID',userID)

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

    
    // Call the function to fetch and display posts
    fetchAndDisplayPosts();
    
}