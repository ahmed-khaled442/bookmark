var siturl = document.getElementById("SITEURL");
console.log(siturl);
var sitename = document.getElementById("SITENAME");
console.log(sitename);
var sumbmit = document.getElementById("submit");
console.log(sumbmit);
var boxrong = document.getElementById("box-rong");
console.log(boxrong);
// sumbmit.onclick = product;

var productslist;
if (localStorage.getItem("productT") !== null) {
  productslist = JSON.parse(localStorage.getItem("productT"));
  display();
} else {
  productslist = [];
}

sumbmit.addEventListener("click", function () {
  if (
    sitename.classList.contains("is-valid") &&
    siturl.classList.contains("is-valid")
  ) {
    product();
    sitename.classList.remove("is-valid");
    siturl.classList.remove("is-valid");
  } else {
    boxrong.classList.replace("d-none", "d-flex");
  }
});
boxrong.addEventListener("click", function () {
  boxrong.classList.replace("d-flex", "d-none");
});
function product() {
  console.log("hi");
  var PProduct = {
    pName: sitename.value,
    purl: `${siturl.value}`,
  };

  productslist.push(PProduct);
  localStorage.setItem("productT", JSON.stringify(productslist));
  display();
  clear();
}

var visite;

function display() {
  box = "";
  for (var i = 0; i < productslist.length; i++) {
    box += `
        <tr>
              <th scope="row">${i + 1}</th>
              <td>${productslist[i].pName}</td>
            <td><button type="button"  id="btnurl" class="btn btn-success  ">visite</button></td>
             <td><button onclick="del(${i})"  class="btn btn-outline-danger p-1 ">Delete<i class="mx-2 fa fa-trash"></i></button></td>
            </tr>
    `;
    visite = productslist[i].purl;
    console.log(visite);
  }
  document.getElementById("inner").innerHTML = box;
}
var btn = document.querySelectorAll("#btnurl");
for (var b = 0; b < btn.length; b++) {
  btn[b].addEventListener("click", function (e) {
    open(visite);
  });
}
console.log(visite);

function del(index) {
  console.log(index);
  productslist.splice(index, 1);
  localStorage.setItem("productT", JSON.stringify(productslist));
  display();
}

function clear() {
  sitename.value = null;
  siturl.value = null;
}

// sitename.addEventListener("input", function () {
//   var regex = /^[A-Z][a-z]{3,6}/;
//   var reName = sitename.value;
//   if (regex.test(reName) == true) {
//     console.log("match");
//   } else console.log("no");
// });

var vald = document.querySelectorAll(".valdiation");
console.log(vald);
for (var v = 0; v < vald.length; v++) {
  vald[v].addEventListener("input", function (e) {
    var nameid = e.target.id;
    var nameval = e.target.value;
    valdation(nameid, nameval);
  });
}

function valdation(nameid, nameval) {
  var regex = {
    SITEURL:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    SITENAME: /^[A-Z][a-z]{3,15}$/,
  };

  var elm = document.getElementById(nameid);

  var nextelment = elm.nextElementSibling;

  if (regex[nameid].test(nameval) == true) {
    elm.classList.add("is-valid");
    elm.classList.remove("is-invalid");
    nextelment.classList.replace("d-block", "d-none");

    return true;
  } else {
    elm.classList.add("is-invalid");
    elm.classList.remove("is-valid");
    nextelment.classList.replace("d-none", "d-block");
    return false;
  }
}
