// const CryptoJS = require("crypto-js");

// const encryptWithAES = (text) => {
// 	const passphrase =
// 		"A%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z$C&F)J@NcRfUjXn2r5u7x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+MbQeThWmZq4t7w!z%C&F)J@NcRfUjXn2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&E)H@McQeThWmZq4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?D(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/B?E(H+MbQeThWmYq3t6w9z$C&F)J@NcRfUjXn2r4u7x!A%D*G-KaPdSgVkYp3s6v8y/B?E(H+MbQeThWmZq4t7w!z$C&F)J@NcRfUjXn2r5u8x";
// 	return CryptoJS.AES.encrypt(text, passphrase).toString();
// };

// const decryptWithAES = (ciphertext) => {
// 	const passphrase =
// 		"A%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z$C&F)J@NcRfUjXn2r5u7x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+MbQeThWmZq4t7w!z%C&F)J@NcRfUjXn2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&E)H@McQeThWmZq4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?D(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/B?E(H+MbQeThWmYq3t6w9z$C&F)J@NcRfUjXn2r4u7x!A%D*G-KaPdSgVkYp3s6v8y/B?E(H+MbQeThWmZq4t7w!z$C&F)J@NcRfUjXn2r5u8x";
// 	const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
// 	const originalText = bytes.toString(CryptoJS.enc.Utf8);
// 	return originalText;
// };

function checkValidity() {
	var allowed_chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

	if (weight_input.value.length > 5 || weight_input.value == "") {
		return false;
	}
	for (var i = 0; i < weight_input.value.length; i++) {
		if (allowed_chars.indexOf(weight_input.value.charAt(i)) == -1) {
			return false;
		}
		if (weight_input.value.charAt(i) == ".") {
			allowed_chars.pop();
		}
	}
	return true;
}
const button = document.getElementById("submit"),
	date = document.querySelector(".date"),
	weight = document.querySelector(".weight"),
	weight_input = document.getElementById("weight-input"),
	weight_stat = document.querySelector(".weight-stat");

weight_stat.innerHTML = window.localStorage.getItem("weight-stat");

button.addEventListener("click", () => {
	if (
		checkValidity() &&
		parseFloat(weight_input.value) <= 200 &&
		parseFloat(weight_input.value) >= 10
	) {
		var newStat = document.createElement("div"),
			weight = document.createElement("div"),
			date = document.createElement("div");

		newStat.className = "stat";
		newStat.appendChild(weight);
		newStat.appendChild(date);
		weight.className = "weight";
		date.className = "date";
		date.setAttribute("title", new Date());
		window.localStorage.setItem("weight-stat", weight_stat.innerHTML);
		weight_stat.appendChild(newStat);
		weight.append(parseFloat(weight_input.value) + "kg");
		date.append(new Date().toLocaleDateString());
		newStat.addEventListener("click", () => {
			weight_stat.removeChild(newStat);
		});
	}
	weight_input.value = "";
});

const stat = document.querySelectorAll(".stat");
stat.forEach((element) => {
	element.addEventListener("click", () => {
		weight_stat.removeChild(element);
		window.localStorage.setItem("weight-stat", weight_stat.innerHTML);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.code == "Enter") {
		button.click();
		window.localStorage.setItem("weight-stat", weight_stat.innerHTML);
		e.preventDefault();
	}
});

const reset_btn = document.getElementById("reset"),
	confirm_btn = document.getElementById("confirm");

reset_btn.addEventListener("click", () => {
	reset_btn.classList.toggle("hidden");
	confirm_btn.classList.toggle("hidden");
	setTimeout(() => {
		if (!confirm_btn.classList.contains("hidden")) {
			reset_btn.classList.toggle("hidden");
			confirm_btn.classList.toggle("hidden");
		}
	}, 5000);
});

confirm_btn.addEventListener("click", () => {
	Array.from(weight_stat.childNodes).forEach((element) => {
		weight_stat.removeChild(element);
	});
	weight_input.value = "";
	window.localStorage.removeItem("weight-stat");
	reset_btn.classList.toggle("hidden");
	confirm_btn.classList.toggle("hidden");
});

confirm_btn.addEventListener("contextmenu", (e) => {
	reset_btn.classList.toggle("hidden");
	confirm_btn.classList.toggle("hidden");
	e.preventDefault();
});
