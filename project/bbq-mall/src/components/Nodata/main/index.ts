import NodataMobile from './mobile/NodataMobile';
import _Nodata from './pc/Nodata';

type NodataP = typeof _Nodata;

interface NodataType extends NodataP {
  Mobile: typeof NodataMobile;
}

const Nodata = _Nodata as NodataType;

Nodata.Mobile = NodataMobile;

export default Nodata;
