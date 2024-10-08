
document.getElementById("b1").addEventListener("click", onclick)

function onclick () {
    document.getElementById("heading").value 
    // document.getElementById("heading").innerHTML = "Hi, I hacked you."
    document.getElementById("heading").innerHTML = document.getElementById("data").value
}