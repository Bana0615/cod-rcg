import { randomNumber } from './randomNumber';

export async function fetchWeapon(type: string, game: string = '') {
    if (game === '') {
        let randomNum = randomNumber(0, 6);

        switch (randomNum) {
            case 1:
            case 3:
            case 5:
                game = 'modern-warfare-two';
                break;
            default:
                game = 'modern-warfare-three';
                break;
        }
    }
    const response = await fetch(`/api/${game}/${type}`);

    if (!response.ok) {
        throw new Error(`Error fetching ${type} weapons: ${response.statusText}`);
    }

    const weapon = await response.json();
    return weapon;
}