import primaryList from '../../../json/modern-warfare-three/primary.json';
import { randomListItem } from '../../../helpers/randomListItem';
import { randomNumber } from '../../../helpers/randomNumber';

export default async function handler(req, res) {
    let type: string;
    let primary: string;
    const randNum = randomNumber(0, 6);

    switch (randNum) {
        //Battle Rifles
        case 1:
            type = 'BR';
            break;
        case 2:
            type = 'SMG';
            break;
        case 3:
            type = 'SHOTGUN';
            break;
        case 4:
            type = 'LMG';
            break;
        //Marksmen Rifle
        case 5:
            type = 'MR';
            break;
        case 6:
            type = 'SNIPER';
            break;
        default:
            type = 'AR'
            break;
    }

    primary = randomListItem(primaryList[type]);

    res.status(200).json(primary);
}