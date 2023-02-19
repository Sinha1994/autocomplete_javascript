let tableEle = document.querySelector("table");
let inputEle = document.querySelector("input");
let selectEle = document.querySelector("#searchResult");
let fetchUsers = async (loadAll = true) => {
  try {
    const controller = new AbortController();
    let url = "https://jsonplaceholder.typicode.com/users";
    if (!loadAll && inputEle.value.length < 3) {
      controller.abort();
    }
    if (!loadAll) url += `?q=${inputEle.value}`;
    let data = await fetch(url, { signal: controller.signal });
    if (data.ok) {
      return data.json();
    } else {
      throw new Error("Error occured");
    }
  } catch (err) {
    console.log(err.message);
  }
};

let renderOptionsList = async () => {
  try {
    selectEle.style.display = "none";
    let users = await fetchUsers(false);
    let currentBody = document.querySelector("tbody");
    if (currentBody) currentBody.remove();
    users.forEach((user) => {
      let optionEle = document.createElement("option");
      optionEle.setAttribute("value", user.name);
      optionEle.innerHTML = user.name;
      selectEle.appendChild(optionEle);
    });
    selectEle.style.display = "block";
  } catch (err) {
    console.log(err.message);
  }
};

let selectUser = () => {};

let renderUsersList = async () => {
  try {
    let users = await fetchUsers(true);
    let currentBody = document.querySelector("tbody");
    if (currentBody) currentBody.remove();
    let tBodyEle = document.createElement("tbody");
    users.forEach((user) => {
      let trEle = document.createElement("tr");
      let td = document.createElement("td");
      td.innerHTML = user.id;
      trEle.appendChild(td);
      td = document.createElement("td");
      td.innerHTML = user.name;
      trEle.appendChild(td);
      td = document.createElement("td");
      td.innerHTML = user.username;
      trEle.appendChild(td);
      td = document.createElement("td");
      td.innerHTML = user.email;
      trEle.appendChild(td);
      td = document.createElement("td");
      td.innerHTML = user.address.city;
      trEle.appendChild(td);
      td = document.createElement("td");
      td.innerHTML = user.company.name;
      trEle.appendChild(td);
      tBodyEle.appendChild(trEle);
    });
    tableEle.appendChild(tBodyEle);
  } catch (err) {
    console.log(err.message);
  }
};

renderUsersList();
