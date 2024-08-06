import ExchangeMobile from './mobile/ExchangeMobile';
import _Exchange from './pc/Exchange';

type ExchangeP = typeof _Exchange;

interface ExchangeType extends ExchangeP {
  Mobile: typeof ExchangeMobile;
}

const Exchange = _Exchange as ExchangeType;

Exchange.Mobile = ExchangeMobile;

export default Exchange;
