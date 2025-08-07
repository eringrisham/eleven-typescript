import { Search } from './search';

interface Pilot {
    first: string;
    last: string;
    serial: string;
    callsign: string;
}

export class App {
    pilots: Pilot[] = [];
    search: Search = new Search();
    filteredPilots: Pilot[] = [];
    card: HTMLDivElement = document.getElementById('card') as HTMLDivElement;

    constructor() {
        this.initialize();
        this.showAllPilots();
    }

    initialize(): void {
        this.setClickListeners();
        this.getPilotData();
        this.captureInput();
    }

    async getPilotData(): Promise<void> {
        try {
            const response = await fetch('../../api/pilots.json');
            const pilotData = await response.json();
            this.pilots = this.sortPilots(pilotData);
        } catch (error) {
            console.error('Error fetching pilot data: ', error);
        }
    }

    sortPilots(pilots: Pilot[]): Pilot[] {
        const sorted = pilots.sort((a: Pilot, b: Pilot) =>
            a.last.localeCompare(b.last)
        );
        return sorted;
    }

    captureInput(): void {
        this.search.inputElement?.addEventListener('input', () => {
            const value = this.search.inputElement.value.toLowerCase();
            this.filteredPilots = [...this.pilots].filter((pilot) => {
                const fullName = `${pilot.first} ${pilot.last}`;
                return fullName.toLowerCase().includes(value);
            });
            this.search.ulElement.innerHTML = '';

            this.filteredPilots.forEach((pilot) => {
                const li = document.createElement('li');
                li.textContent = `${pilot.first} ${pilot.last}`;

                li.addEventListener('click', () => {
                    this.search.ulElement.classList.add('active');
                    this.showPilotCard(pilot);
                });

                this.search.ulElement?.appendChild(li);
            });
        });
    }

    resetPilotCard(): void {
        const pilotInfo = this.card.querySelector('.pilot-info');
        pilotInfo?.remove();
    }

    showAllPilots(): void {
        this.search.element?.addEventListener(
            'click',
            () => {
                this.pilots.forEach((pilot) => {
                    const li = document.createElement('li');
                    li.classList.add('dropdown-item');
                    li.textContent = `${pilot.first} ${pilot.last}`;
                    this.search.ulElement.appendChild(li);
                });
            },
            { once: true }
        );
    }

    showPilotCard(pilot: Pilot): void {
        this.resetPilotCard();
        this.card.classList.add('active');
        const div = document.createElement('div');
        div.classList.add('pilot-info');
        div.innerHTML = `
        <h1>${pilot.first} ${pilot.last}</h1>
        <h2>${pilot.callsign}</h2>
        <h3>${pilot.serial}</h3>`;
        this.card.appendChild(div);
    }

    setClickListeners(): void {
        window.addEventListener('load', () => {
            window.addEventListener('click', (windowClickEvent) => {
                const dropdown = document.querySelector('.dropdown-box');
                const dropdownContent =
                    document.querySelector('.dropdown-content');
                const selectedItem = document.querySelector('.selected-item');
                if (dropdown?.classList.contains('active')) {
                    if (
                        !dropdownContent?.contains(
                            windowClickEvent.target as Node
                        )
                    ) {
                        this.closeDropdown();
                    }
                } else if (
                    selectedItem?.contains(windowClickEvent.target as Node)
                ) {
                    this.openDropdown();
                }
            });
        });
    }

    openDropdown(): void {
        const dropdown = document.querySelector('.dropdown-box');
        dropdown?.classList.add('active');
    }

    closeDropdown(): void {
        const dropdown = document.querySelector('.dropdown-box');
        dropdown?.classList.remove('active');
    }
}
