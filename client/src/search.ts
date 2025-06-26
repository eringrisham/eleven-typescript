export class Search {
	private readonly element: HTMLDivElement = document.querySelector('#search') as HTMLDivElement;
	private readonly inputElement: HTMLInputElement = this.element.querySelector('input') as HTMLInputElement;

	constructor() {
		this.element.addEventListener('click', () => this.inputElement.focus());
		this.inputElement.addEventListener('focus', () => this.toggle(true));
		this.inputElement.addEventListener('blur', () => this.toggle(false));
	}

	private toggle(force?: boolean): void {
		this.element.classList.toggle('active', force);
	}
}
