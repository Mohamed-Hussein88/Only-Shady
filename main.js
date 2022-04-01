// let cards = document.querySelector(".ghosts .box.shady");
// let stars = document.querySelectorAll(".far.fa-star");
// let shadyStars = document.querySelectorAll(".filled.fas.fa-star.shady")
// let shadyStarsEmpty = document.querySelectorAll(".far.fa-star.shady")

// function allStars() {
//     for (let i = 0; i < stars.length; i++) {
//         stars[i].className = "filled fas fa-star";
//     }
// }
// function choxStars() {
//     for (let i = 0; i < shadyStars.length; i++) {
//         shadyStars[i].className = "far fa-star";
//     }
// }
// function choxStarsEmpty() {
//     for (let i = 0; i < shadyStarsEmpty.length; i++) {
//         shadyStarsEmpty[i].className = "far fa-star shady";
//     }
// }

// cards.addEventListener("click", allStars);
// cards.addEventListener("click", choxStars);
// cards.addEventListener("click", choxStarsEmpty);

// JS Version 2
let passBtn = document.querySelector(".ghosts .password")
let allStars = document.querySelectorAll(".stars")

// add id for each star 
let mystars = document.querySelectorAll(".fa-star")
let i = 0;
let lsArr;
for(let star of mystars){
    i++
    let starID = `id${i}`
    star.setAttribute("id" , starID)
}
if(window.localStorage.getItem("StarStatus")){
    lsArr = JSON.parse(window.localStorage.getItem("StarStatus"))
}else{
    lsArr = []
}

// restore last status or create new localStorage
if(window.localStorage.getItem("StarStatus") && lsArr.length > 0) {
    for(let star of mystars){
        for (let starLs of lsArr){
            if((Object.values(starLs).toString())=== "true" && (Object.keys(starLs).toString()) === star.id){
                star.className = "filled fas fa-star"
            }else if((Object.values(starLs).toString()) === "false" && (Object.keys(starLs).toString()) === star.id) {
                star.className = "far fa-star"
            }
        }
    }
} else {
    for( let star of mystars){
        let status = star.classList.contains("fas") ? true : false
        let starID = star.id
        let lsobj = {[starID] : status }
        lsArr.push(lsobj)
    }
    window.localStorage.setItem("StarStatus", JSON.stringify(lsArr))
}


passBtn.addEventListener("click", function() {
    let promptMsg = prompt("Enter Your Password")
    if(promptMsg === "Shadymalt"){
        for(let star of allStars){
            let plus = document.createElement("span")
            let negative = document.createElement("span")
            plus.style.cssText = "display:inline-block; width:18px; border-radius:50%; background-color:green; color:white;  text-align:center; font-size:18px"
            negative.style.cssText = "display:inline-block; width:18px; border-radius:50%; background-color:red; color:white;  text-align:center; font-size:18px"
            plus.innerHTML = "+"
            negative.innerHTML = "-"
            star.prepend(negative)
            star.append(plus)
            plus.addEventListener("click", function(e){
                let starChilds = star.children
                for(let child of starChilds){
                    if(child.tagName === "I" && child.classList.contains("far")){
                        child.className = "filled fas fa-star"
                        for(let starLs of lsArr) {
                            if(Object.keys(starLs).toString() === child.id){
                                starLs[child.id] = true
                                window.localStorage.setItem("StarStatus", JSON.stringify(lsArr))
                            }
                        }
                        break;
                    }
                }
            })
            negative.addEventListener("click", function(){
                let starChilds = star.children
                let reverseArr = [...starChilds].reverse()
                for(let child of reverseArr){
                    if(child.tagName === "I" && child.classList.contains("fas")){
                        child.className = "far fa-star"
                        for(let starLs of lsArr) {
                            if(Object.keys(starLs).toString() === child.id){
                                starLs[child.id] = false
                                window.localStorage.setItem("StarStatus", JSON.stringify(lsArr))
                            }
                        }
                        break;
                    }
                }
            })
        }
        
    }else{
        alert("Wrong Password!")
    }
})




