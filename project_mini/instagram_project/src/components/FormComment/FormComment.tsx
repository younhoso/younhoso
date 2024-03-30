import clsx from 'clsx';
import { FormCommentStyled } from './styled';
import SmileIcon from '../ui/icons/SmileIcon';

export default function FormComment() {
 
 return (
  <FormCommentStyled className={clsx('FormComment')}>
    <form action="" className='form-comment'>
      <SmileIcon />
      <input type="text" placeholder="Add a comment..." />
      <button>Post</button>
    </form>
   </FormCommentStyled>
 );
};