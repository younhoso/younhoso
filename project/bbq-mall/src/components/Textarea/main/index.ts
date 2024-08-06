import TextareaMobile from './mobile/TextareaMobile';
import _Textarea from './pc/Textarea';

type TextareaP = typeof _Textarea;

interface TextareaType extends TextareaP {
  Mobile: typeof TextareaMobile;
}

const Textarea = _Textarea as TextareaType;

Textarea.Mobile = TextareaMobile;

export default Textarea;
