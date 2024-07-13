"use strict";
var searchName = document.querySelector("#searchName");
// if (searchName) {
//   searchName.addEventListener("input", () => {
//     const searBy = searchName.value.trim();
//     if (searBy.length === 0) {
//       loadCars();
//       return;
//     }
//     // @ts-ignore
//     axios
//       .get(`https://d1e7c9536fcd237f.mokky.dev/car?description=${searBy}`)
//       .then((response) => {
//         const searchResult = response.data;
//         if (searchResult.length === 0) {
//           renderBody.innerHTML = "";
//           return;
//         }
//       });
//   });
// }
// Modal initialization
// @ts-ignore
var myModal = new bootstrap.Modal("#exampleModal", { keyboard: false });
// @ts-ignore
// Modal event listeners
var exampleModal = document.getElementById("exampleModal");
exampleModal === null || exampleModal === void 0 ? void 0 : exampleModal.addEventListener("shown.bs.modal", function () {
    console.log("Modal is shown");
});
exampleModal === null || exampleModal === void 0 ? void 0 : exampleModal.addEventListener("hidden.bs.modal", function () {
    console.log("Modal is hidden");
    resetForm();
});
var secondAdd = document.querySelector(".secondAdd");
var renderBody = document.querySelector("#renderBody");
var inputV = document.querySelector("#inputV");
var input_V = document.querySelector("#input_V");
var addCar_1 = document.querySelector("#addCar_1");
var addCar_2 = document.querySelector("#addCar_2");
var saveValue = document.querySelector("#saveValue");
var currentCarId = null;
var addcars = document.querySelector("#addcars");
var addCars = document.querySelector("#addCars");
// addCars?.addEventListener("click", () => {
//   resetForm();
//   addMyModal.show();
// });
addcars === null || addcars === void 0 ? void 0 : addcars.addEventListener("click", function () {
    var car = {
        img: addCar_1.value,
        name: addCar_2.value,
    };
    // @ts-ignore
    axios
        .post("https://d1e7c9536fcd237f.mokky.dev/car", car)
        .then(function () {
        console.log("Car added successfully");
        loadCars();
        addMyModal.hide();
    })
        .catch(console.error);
});
var resetForm = function () {
    addCar_1.value = "";
    addCar_2.value = "";
    inputV.value = "";
    input_V.value = "";
    currentCarId = null;
};
var lastId = 0;
var loadCars = function () {
    //@ts-ignore
    axios
        .get("https://d1e7c9536fcd237f.mokky.dev/car")
        .then(function (res) {
        if (!renderBody)
            return;
        renderBody.innerHTML = ""; // Clear previous content
        res.data.forEach(function (item) {
            lastId = item.id;
            var div = createCarElement(item);
            renderBody.appendChild(div);
        });
    })
        .catch(console.error);
};
var createCarElement = function (item) {
    var _a, _b;
    var div = document.createElement("div");
    div.classList.add("item1");
    div.innerHTML = "\n    <div class=\"t-op-nextlvl\">\n      <img src=\"".concat(item.img, "\" style=\"width: 90px; border-radius: 10px\" />\n    </div>\n    <h3 class=\"t-op-nextlvl\">").concat(item.name, "</h3>\n    <div>\n      <button class=\"btn btn-primary mx-2 edit-btn\">\n        <i class=\"fa-regular fa-pen-to-square\"></i>\n      </button>\n      <button class=\"btn btn-danger delete-btn\">\n        <i class=\"fa-solid fa-trash-can\"></i>\n      </button>\n    </div>\n  ");
    // Edit button click listener
    (_a = div.querySelector(".edit-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        inputV.value = item.img;
        input_V.value = item.name;
        currentCarId = item.id;
        myModal.show();
    });
    // Delete button click listener
    (_b = div.querySelector(".delete-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        //@ts-ignore
        axios
            .delete("https://d1e7c9536fcd237f.mokky.dev/car/".concat(item.id))
            .then(loadCars)
            .catch(console.error);
    });
    return div;
};
saveValue === null || saveValue === void 0 ? void 0 : saveValue.addEventListener("click", function () {
    if (!inputV.value || !input_V.value)
        return;
    var car = {
        img: inputV.value,
        name: input_V.value,
    };
    // @ts-ignore
    var axiosMethod = currentCarId ? axios.patch : axios.post;
    var url = currentCarId
        ? "https://d1e7c9536fcd237f.mokky.dev/car/".concat(currentCarId)
        : "https://d1e7c9536fcd237f.mokky.dev/car";
    axiosMethod(url, car)
        .then(function () {
        myModal.hide();
        loadCars();
    })
        .catch(console.error);
});
var loadDeclarations = function () {
    var renderBody_1 = document.querySelector(".renderBody_1");
    //@ts-ignore
    axios
        .get("https://d1e7c9536fcd237f.mokky.dev/declaretion")
        .then(function (res) {
        if (!renderBody_1)
            return;
        renderBody_1.innerHTML = ""; // Clear previous content
        // if (!emptyHeader) return;
        res.data.forEach(function (item) {
            var div = document.createElement("div");
            // emptyHeader.innerHTML = "";
            div.classList.add("item1");
            div.className = "d-flex justify-content-between gap-2";
            div.innerHTML = "\n          <div class=\"t-op-nextlvl mb-3 text-end\"><h6>".concat(item.id, "</h6></div>\n          <div class=\"t-op-nextlvl mb-3 text-end\"><h6>").concat(item.customerN, "</h6></div>\n          <div class=\"t-op-nextlvl mb-3 text-end\"><h6>").concat(item.color, "</h6></div>\n          <div class=\"t-op-nextlvl label-tag mb-3\"><h6>").concat(item.sana, "</h6></div>\n        ");
            renderBody_1.appendChild(div);
        });
    })
        .catch(console.error);
};
var active_1 = document.querySelector("#active_1");
var active_2 = document.querySelector("#active_2");
active_1 === null || active_1 === void 0 ? void 0 : active_1.addEventListener("click", loadCars);
active_2 === null || active_2 === void 0 ? void 0 : active_2.addEventListener("click", loadDeclarations);
window.onload = loadCars;
System.register("type", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
