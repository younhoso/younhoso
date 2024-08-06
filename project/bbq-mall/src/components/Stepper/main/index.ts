import StepperMobile from './mobile/StepperMobile';
import _Stepper from './pc/Stepper';

type StepperP = typeof _Stepper;

interface StepperType extends StepperP {
  Mobile: typeof StepperMobile;
}

const Stepper = _Stepper as StepperType;

Stepper.Mobile = StepperMobile;

export default Stepper;
