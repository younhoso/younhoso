import data from '../data/data_tradein.json';
import tradeIn from '../js/modules/tradein';

$(document).ready(function() {
    // let param = 'subtime';
    
    // if (param) {
    //     data.result.forEach((v,i) => {
    //         if (param === 'subtime') i === 7 ? v.default = 'O' : '';
    //     });
    // }

    const tradIn1 = new tradeIn('.tradein_container', data);
});