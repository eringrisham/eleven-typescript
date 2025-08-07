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
    }
}
