const hospital = document.getElementById("hospital");
const doctor = document.getElementById("doctor");
const form = document.getElementById("form");

addEventListener("load", () => {
  fetch("api.php")
    .then((res) => (res.ok ? Promise.resolve(res) : Promise.reject(res)))
    .then((res) => res.json())
    .then((res) => {
      const fragment = document.createDocumentFragment();
      for (const hospitales of res) {
        const option = document.createElement("OPTION");
        option.setAttribute("value", hospitales.idhospital);
        option.textContent = hospitales.nombrehospital;
        fragment.append(option);
      }
      hospital.appendChild(fragment);
    })
    .catch((error) => console.log(error));
});

hospital.addEventListener("change", () => {
  let id = hospital.children[hospital.selectedIndex].value;
  if (id == "undefined") {
    while (doctor.options.length) {
      doctor.remove(0);
    }
    doctor.classList.replace("mostrar", "ocultar");
  } else {
    doctor.classList.replace("ocultar", "mostrar");
    fetch(`api.php?id=${id}`)
      .then((res) => (res.ok ? Promise.resolve(res) : Promise.reject(res)))
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const fragment = document.createDocumentFragment();
        for (const doctores of res) {
          const option = document.createElement("OPTION");
          option.setAttribute("value", doctores.idcontacto);
          option.textContent = doctores.nombrecontacto;
          fragment.append(option);
        }
        if (doctor.children[0]) {
          while (doctor.options.length) {
            doctor.remove(0);
          }
        }
        doctor.appendChild(fragment);
      })
      .catch((error) => console.log(error));
  }
});
