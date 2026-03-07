document.getElementById('login-btn').addEventListener('click', function(){
    // 1. get the username input
    const userInput = document.getElementById('input-name');
    const userName = userInput.value;
    console.log(userName);
    // 2.get the pin input
    const inputPin = document.getElementById('input-pin');
    const pin = inputPin.value;
    console.log(pin)
    // 3.match pin and username
    if(userName == "admin" && pin == "admin123"){
        //4. 3-1 true ::>>alert> homepage
        alert("login success");
        // window.location.replace("/home.html")
        window.location.assign("/home.html")
    }
    else{
        //4. 3-1 false ::>>alert> return
        alert("login failed");
        return;
    }
    
})
