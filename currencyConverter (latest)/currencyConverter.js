const rateURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const reverseBtn = document.querySelector("#reverse_btn");

const changeEvt = new Event('change');
const clickEvt = new Event('click');

for( let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        btn.dispatchEvent(clickEvt);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

reverseBtn.addEventListener('click', () => {
    temp = dropdowns[0].value;
    dropdowns[0].value = dropdowns[1].value;
    dropdowns[0].dispatchEvent(changeEvt);
    dropdowns[1].value = temp;
    dropdowns[1].dispatchEvent(changeEvt);
    btn.dispatchEvent(clickEvt);
})

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<=0){
        amtVal = 1;
        amount.value = "1";
    }
    //console.log(fromCurr.value, toCurr.value)
    URL = `${rateURL}/${fromCurr.value.toLowerCase()}.json`;
    response = await fetch(URL);
    data = await response.json();
    rates = data[fromCurr.value.toLowerCase()];
    rate = rates[toCurr.value.toLowerCase()]
    fullAmount = amtVal * rate
    console.log(fullAmount)
    msg.innerText = `${amtVal} ${fromCurr.value} = ${fullAmount} ${toCurr.value}`
    
});
