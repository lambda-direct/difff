import Toastify from "toastify-js";

class Alert {
	settings: Toastify.Options = {
		duration: 3000,
		gravity: "top",
		position: "right",
		stopOnFocus: true,
		newWindow: true,
		close: true,
	};

	error(message: string) {
		const options = {
			...this.settings,
			text: message,
			style: {
				background: "#ff416c",
			},
		};
		Toastify(options).showToast();
	}

	success(message: string) {
		const options = {
			...this.settings,
			text: message,
			style: {
				background: "#248127",
			},
		};
		Toastify(options).showToast();
	}

	warning(message: string) {
		const options = {
			...this.settings,
			text: message,
			style: {
				background: "#f83600",
			},
		};
		Toastify(options).showToast();
	}
}

export default new Alert();
