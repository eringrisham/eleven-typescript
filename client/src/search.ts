export class Search {
    element: HTMLDivElement = document.querySelector(
        '#search'
    ) as HTMLDivElement;
    inputElement: HTMLInputElement = this.element?.querySelector(
        'input'
    ) as HTMLInputElement;
    ulElement: HTMLUListElement = this.element?.querySelector(
        'ul'
    ) as HTMLUListElement;

    constructor() {
        this.element?.addEventListener('click', () =>
            this.inputElement.focus()
        );
        this.inputElement?.addEventListener('focus', () => this.toggle(true));
        this.inputElement?.addEventListener('blur', () => this.toggle(false));
    }

    private toggle(force?: boolean): void {
        this.element.classList.toggle('active', force);
    }
}
