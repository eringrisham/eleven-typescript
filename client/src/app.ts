import { Search } from './search';

interface Pilot {
    first: string;
    last: string;
    serial: string;
    callsign: string;
}

export class App {
    pilots: Pilot[];
    search: Search = new Search();
    filteredPilots: Pilot[];
    card: HTMLDivElement = document.getElementById('card') as HTMLDivElement;
    isInitialized: boolean;

    constructor() {
        this.pilots = [];
        this.filteredPilots = [];
        this.getPilotData();
        this.captureInput();

        this.isInitialized = false;
        this.initialize();
    }

    initialize(): void {
        if (!this.isInitialized) {
            this.showAllPilots();
            this.isInitialized = true;
        }
    }

    async getPilotData() {
        try {
            const response = await fetch('../../api/pilots.json');
            const pilotData = await response.json();
            this.pilots = this.sortPilots(pilotData);
        } catch (error) {
            console.error('Error fetching pilot data: ', error);
        }
    }

    sortPilots(pilots: Pilot[]): Pilot[] {
        const sorted = pilots.sort((a: any, b: any) =>
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

                li.addEventListener(
                    'click',
                    () => {
                        this.search.ulElement.classList.add('active');
                        this.showPilotCard(pilot);
                    },
                    { once: true }
                );

                this.search.ulElement?.appendChild(li);
            });
        });
    }

    showAllPilots() {
        this.search.element?.addEventListener(
            'click',
            () => {
                this.pilots.forEach((pilot) => {
                    const li = document.createElement('li');
                    li.textContent = `${pilot.first} ${pilot.last}`;
                    this.search.ulElement.appendChild(li);
                });
            },
            { once: true }
        );
    }

    showPilotCard(pilot: Pilot) {
        this.card.classList.add('active');
        const div = document.createElement('div');
        div.innerHTML = `
        <h1>${pilot.first} ${pilot.last}</h1>
        <h2>${pilot.callsign}</h2>
        <h3>${pilot.serial}</h3>`;
        this.card.appendChild(div);
    }

    removePilotCard() {
        if (this.card.classList.contains('active')) {
            this.card.classList.remove('active');
        }
    }
}
