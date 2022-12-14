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

const submit = document.getElementById("submit"),
	date = document.querySelector(".date"),
	weight = document.querySelector(".weight"),
	weight_input = document.getElementById("weight-input"),
	weight_stat = document.querySelector(".weight-stat");

function clearStats() {
	Array.from(weight_stat.childNodes).forEach((element) => {
		weight_stat.removeChild(element);
	});
	weight_input.value = "";
	window.localStorage.removeItem("weight-stat");
}

weight_stat.innerHTML = window.localStorage.getItem("weight-stat");

function setAverage() {
	const weights = document.querySelectorAll(".weight");
	const avg_weight = document.getElementById("average-weight");
	var average = 0;
	if (weights.length != 0) {
		weights.forEach((element) => {
			average += parseFloat(element.innerHTML.replace("kg", ""));
		});
		avg_weight.innerHTML = (average / weights.length).toFixed(1) + "kg";
	} else {
		avg_weight.innerHTML = 0 + "kg";
	}
	return (average / weights.length).toFixed(1);
}

if (setAverage() === "NaN" || setAverage() > 200 || setAverage() < 10) {
	clearStats();
}

const stat = document.querySelectorAll(".stat");

submit.addEventListener("click", () => {
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
		weight_stat.appendChild(newStat);
		weight.append(parseFloat(weight_input.value) + "kg");
		date.append(new Date().toLocaleDateString());
		newStat.addEventListener("click", () => {
			weight_stat.removeChild(newStat);
			window.localStorage.setItem("weight-stat", weight_stat.innerHTML);
		});
		setAverage();
	} else {
		weight_input.classList.remove("shake");
		setTimeout(() => {
			weight_input.classList.add("shake");
			setTimeout(() => {
				weight_input.classList.remove("shake");
			}, 250);
		}, 10);
	}
	weight_input.value = "";
	window.localStorage.setItem("weight-stat", weight_stat.innerHTML);
});

stat.forEach((element) => {
	element.addEventListener("click", () => {
		weight_stat.removeChild(element);
		window.localStorage.setItem("weight-stat", weight_stat.innerHTML);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.code == "Enter") {
		submit.click();
		window.localStorage.setItem("weight-stat", weight_stat.innerHTML);
		e.preventDefault();
	}
});

const reset_btn = document.getElementById("reset"),
	confirm_btn = document.getElementById("confirm");

reset_btn.addEventListener("click", () => {
	reset_btn.classList.toggle("hidden");
	confirm_btn.classList.toggle("hidden");
});

confirm_btn.addEventListener("click", () => {
	clearStats();
	reset_btn.classList.toggle("hidden");
	confirm_btn.classList.toggle("hidden");
	setAverage();
});

confirm_btn.addEventListener("contextmenu", (e) => {
	reset_btn.classList.toggle("hidden");
	confirm_btn.classList.toggle("hidden");
	e.preventDefault();
});

document.addEventListener("click", (e) => {
	if (!confirm_btn.classList.contains("hidden")) {
		if (e.target.id != "reset") {
			reset_btn.classList.toggle("hidden");
			confirm_btn.classList.toggle("hidden");
		}
	}
});

weight_stat.addEventListener("click", () => {
	setAverage();
});
setAverage();
