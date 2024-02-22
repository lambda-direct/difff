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
				"box-shadow": "none",
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
				"box-shadow": "none",
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
				"box-shadow": "none",
			},
		};
		Toastify(options).showToast();
	}
}

export default new Alert();
