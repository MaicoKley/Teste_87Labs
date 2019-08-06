import Withdrawal from '../models/Withdrawal';

/* eslint-disable no-restricted-syntax */

export default async function noteCounter(id, value) {
  const banknotes = [100, 50, 20, 10, 5];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= 1; i++) {
    let restOfMoney = value;
    let hundred;
    let fifty;
    let twenty;
    let ten;
    let five;

    for (const note of banknotes) {
      const quantity = Math.floor(restOfMoney / note);
      switch (note) {
        case 100:
          hundred = quantity;
          break;
        case 50:
          fifty = quantity;
          break;
        case 20:
          twenty = quantity;
          break;
        case 10:
          ten = quantity;
          break;
        case 5:
          five = quantity;
          break;
        default:
          break;
      }
      restOfMoney -= quantity * note;
    }
    // eslint-disable-next-line no-await-in-loop
    await Withdrawal.create({
      user_id: id,
      value,
      hundred,
      fifty,
      twenty,
      ten,
      five,
    });
    banknotes.shift();
  }
}
