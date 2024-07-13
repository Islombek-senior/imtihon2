interface Car {
  id: number;
  img: string;
  name: string;
}

interface Cars {
  img: string;
  name: string;
}

interface Declare {
  id: number;
  customerN: string;
  color: string;
  sana: string;
}

const searchName = document.querySelector("#searchName") as HTMLInputElement;

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
const myModal = new bootstrap.Modal("#exampleModal", { keyboard: false });
// @ts-ignore

// Modal event listeners
const exampleModal = document.getElementById("exampleModal");
exampleModal?.addEventListener("shown.bs.modal", () => {
  console.log("Modal is shown");
});

exampleModal?.addEventListener("hidden.bs.modal", () => {
  console.log("Modal is hidden");
  resetForm();
});

const secondAdd = document.querySelector(".secondAdd");

const renderBody = document.querySelector("#renderBody");
const inputV = document.querySelector("#inputV") as HTMLInputElement;
const input_V = document.querySelector("#input_V") as HTMLInputElement;
const addCar_1 = document.querySelector("#addCar_1") as HTMLInputElement;
const addCar_2 = document.querySelector("#addCar_2") as HTMLInputElement;
const saveValue = document.querySelector("#saveValue");

let currentCarId: number | null = null;

const addcars = document.querySelector("#addcars");
const addCars = document.querySelector("#addCars");

// addCars?.addEventListener("click", () => {
//   resetForm();
//   addMyModal.show();
// });

addcars?.addEventListener("click", () => {
  const car: Cars = {
    img: addCar_1.value,
    name: addCar_2.value,
  };

  // @ts-ignore
  axios
    .post(`https://d1e7c9536fcd237f.mokky.dev/car`, car)
    .then(() => {
      console.log("Car added successfully");
      loadCars();
      addMyModal.hide();
    })
    .catch(console.error);
});

const resetForm = () => {
  addCar_1.value = "";
  addCar_2.value = "";
  inputV.value = "";
  input_V.value = "";
  currentCarId = null;
};

let lastId = 0;

const loadCars = () => {
  //@ts-ignore
  axios
    .get<Car[]>("https://d1e7c9536fcd237f.mokky.dev/car")
    .then((res) => {
      if (!renderBody) return;
      renderBody.innerHTML = ""; // Clear previous content
      res.data.forEach((item: Car) => {
        lastId = item.id;
        const div = createCarElement(item);
        renderBody.appendChild(div);
      });
    })
    .catch(console.error);
};

const createCarElement = (item: Car) => {
  const div = document.createElement("div");
  div.classList.add("item1");
  div.innerHTML = `
    <div class="t-op-nextlvl">
      <img src="${item.img}" style="width: 90px; border-radius: 10px" />
    </div>
    <h3 class="t-op-nextlvl">${item.name}</h3>
    <div>
      <button class="btn btn-primary mx-2 edit-btn">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button class="btn btn-danger delete-btn">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `;

  // Edit button click listener
  div.querySelector(".edit-btn")?.addEventListener("click", () => {
    inputV.value = item.img;
    input_V.value = item.name;
    currentCarId = item.id;
    myModal.show();
  });

  // Delete button click listener
  div.querySelector(".delete-btn")?.addEventListener("click", () => {
    //@ts-ignore
    axios
      .delete(`https://d1e7c9536fcd237f.mokky.dev/car/${item.id}`)
      .then(loadCars)
      .catch(console.error);
  });

  return div;
};

saveValue?.addEventListener("click", () => {
  if (!inputV.value || !input_V.value) return;

  const car: Partial<Car> = {
    img: inputV.value,
    name: input_V.value,
  };

  // @ts-ignore
  const axiosMethod = currentCarId ? axios.patch : axios.post;
  const url = currentCarId
    ? `https://d1e7c9536fcd237f.mokky.dev/car/${currentCarId}`
    : "https://d1e7c9536fcd237f.mokky.dev/car";

  axiosMethod(url, car)
    .then(() => {
      myModal.hide();
      loadCars();
    })
    .catch(console.error);
});

const loadDeclarations = () => {
  const renderBody_1 = document.querySelector(".renderBody_1");

  //@ts-ignore
  axios
    .get<Declare[]>("https://d1e7c9536fcd237f.mokky.dev/declaretion")
    .then((res) => {
      if (!renderBody_1) return;
      renderBody_1.innerHTML = ""; // Clear previous content
      // if (!emptyHeader) return;
      res.data.forEach((item: Declare) => {
        const div = document.createElement("div");
        // emptyHeader.innerHTML = "";
        div.classList.add("item1");
        div.className = "d-flex justify-content-between gap-2";
        div.innerHTML = `
          <div class="t-op-nextlvl mb-3 text-end"><h6>${item.id}</h6></div>
          <div class="t-op-nextlvl mb-3 text-end"><h6>${item.customerN}</h6></div>
          <div class="t-op-nextlvl mb-3 text-end"><h6>${item.color}</h6></div>
          <div class="t-op-nextlvl label-tag mb-3"><h6>${item.sana}</h6></div>
        `;
        renderBody_1.appendChild(div);
      });
    })
    .catch(console.error);
};

const active_1 = document.querySelector("#active_1");
const active_2 = document.querySelector("#active_2");

active_1?.addEventListener("click", loadCars);
active_2?.addEventListener("click", loadDeclarations);

window.onload = loadCars;
