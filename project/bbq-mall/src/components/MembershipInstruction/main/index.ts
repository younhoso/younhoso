import MembershipInstructionMobile from './mobile/MembershipInstructionMobile';
import _MembershipInstruction from './pc/MembershipInstruction';

type MembershipInstructionP = typeof _MembershipInstruction;

interface MembershipInstructionType extends MembershipInstructionP {
  Mobile: typeof MembershipInstructionMobile;
}

const MembershipInstruction = _MembershipInstruction as MembershipInstructionType;

MembershipInstruction.Mobile = MembershipInstructionMobile;

export default MembershipInstruction;
