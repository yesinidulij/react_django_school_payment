const max=1000000;
const min=1000;
const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

const tx_ref=`kefiyalew-tx-${randomNum}`;
export default tx_ref