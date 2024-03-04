let progress = document.querySelector(".progress"),
  str = "",
  lowLet = "qwertyuiopasdfghjklzxcvbnm",
  uppLet = lowLet.toUpperCase(),
  numbers = "1234567890",
  symbols = '!@#$%^&*()_+-="][|/.,?><',
  count = 0,
  strengthArrType = ["", "LOW", "MEDIUM", "HIGH", "PERFECT"],
  strengthArrBg = ["transparent", "red", "rebeccapurple", "yellow", "green"],
  nameForInpValue = [
    ["uppLet", "QWERTYUIOPASDFGHJKLZXCVBNM"],
    ["lowLet", "qwertyuiopasdfghjklzxcvbnm"],
    ["numbers", "1234567890"],
    ["symbols", '!@#$%^&*()_+-="][|/.,?><'],
  ];
let func = {};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.querySelectorAll(".check").forEach((item, index) => {
  item.addEventListener("change", function () {
    if (item.checked) {
      count++;
      item.nextElementSibling.innerHTML = `
   <svg width="20" height="20" viewBox="0 0 20 20" fill="none"xmlns="http://www.w3.org/2000/svg">
   <rect width="20" height="20" fill="#A4FFAF"/>
   <path d="M4 10.6066L7.39341 14L15.3934 6" stroke="#18171F" stroke-width="3"/>
   </svg>
   `;

      // pasword generatsiya qilish uchun obj hosil qilish

      func[index] = function () {
        return nameForInpValue[index][1][
          random(0, nameForInpValue[index][1].length - 1)
        ];
      };
    } else {
      item.nextElementSibling.innerHTML = `<svg
   width="20"
   height="20"
   viewBox="0 0 20 20"
   fill="none"
   xmlns="http://www.w3.org/2000/svg"
   >
   <rect
   x="1"
   y="1"
   width="18"
   height="18"
   stroke="#E6E5EA"
   stroke-width="2"
   />
   </svg>`;
      count--;
      delete func[index];
    }
    document.querySelectorAll(".strength-box").forEach((item, index) => {
      index < count
        ? document.querySelectorAll(".strength-box")[index].classList.add("act")
        : document
            .querySelectorAll(".strength-box")
            [index].classList.remove("act");

      // .strength div'ini kamida 1 input checked bo'lgandan so'ng chiqarish

      count > 0
        ? (document.querySelector(".strength").style = "display:flex;")
        : (document.querySelector(".strength").style = "display:none;");

      // .act div'ini backgroundini o'zgartirish

      document.querySelectorAll(".act").forEach((item, index) => {
        index < count
          ? ((document.querySelectorAll(".act")[index].style.background =
              strengthArrBg[count]),
            (document.querySelectorAll(".act")[
              index
            ].style.border = `1px solid ${strengthArrBg[count]}`))
          : (document.querySelectorAll(".act")[index].style.background =
              strengthArrBg[0]);
      });

      // .strength-type_h2 tegi'ning contentini count ga qarab o'zgartirish

      document.querySelector(".strength-type_h2").textContent =
        strengthArrType[count];
    });
  });
});

// password generatsiya qilish uchun

document.querySelector("button").addEventListener("click", () => {
  let arr = Object.keys(func).map((item) => +item);
  if (count > 0) {
    for (let i = 0; i < document.querySelector(".progress").value; i++) {
      let ran = arr[random(0, arr.length - 1)];
      str += func[ran]();
    }
    document.querySelector(".res-text").textContent = str;
    str = "";

    // copy

    document.querySelector("#copy").addEventListener("click", () => {
      navigator.clipboard.writeText(
        document.querySelector(".res-text").textContent
      );
      alert("copied ✅");
    });
  } else {
    document.querySelector(".err-modal").classList.add("err-modal-true");
    setTimeout(() => {
      document.querySelector(".err-modal").classList.remove("err-modal-true");
    }, 3000);
    document.querySelector(".res-text").textContent = "";
  }
});

// range input uchun

progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${
    (100 * value) / 20
  }%, #000 ${(100 * value) / 20}%, #000 100%)`;
  document.querySelector(".lgth").value = this.value;
});

// inputdagi value billan range input qiymatini o'zgartirish

document.querySelector(".lgth").addEventListener("input", (e) => {
  let value = document.querySelector(".lgth").value;
  if (value < 0) {
    document.querySelector(".lgth").value = 1;
  }
  if (value >= 20) {
    document.querySelector(".lgth").value = 20;
  }
  progress.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${
    (100 * value) / 20
  }%, #000 ${(100 * value) / 20}%, #000 100%)`;
  progress.value = document.querySelector(".lgth").value;
});

// dark va ligth mode

document.querySelectorAll(".mode").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector("body").classList.toggle("ligth");
  });
});
