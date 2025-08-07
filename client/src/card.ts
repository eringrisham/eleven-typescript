import { Pilot } from './types';
import { Search } from './search';

export class Card {
    card: HTMLDivElement = document.getElementById('card') as HTMLDivElement;
    search: Search = new Search();

    showPilotCard(pilot: Pilot): void {
        this.resetPilotCard(pilot);
        this.card.classList.add('active');
        const div = document.createElement('div');
        div.classList.add('pilot-info');
        div.innerHTML = `
        <h1>${pilot.first} ${pilot.last}</h1>
        <h2>Call Sign: ${pilot.callsign}</h2>
        <h3>Serial Number: ${pilot.serial}</h3>`;
        this.card.appendChild(div);
    }

    resetPilotCard(pilot: Pilot): void {
        this.search.inputElement.value = '';
        this.search.inputElement.placeholder = `${pilot.first} ${pilot.last}`;
        const pilotInfo = this.card.querySelector('.pilot-info');
        pilotInfo?.remove();
    }
}
