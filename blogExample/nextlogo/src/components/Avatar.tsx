type Props = { image?: string | null };

export default function Avatar({image} : Props) {
  
  return (
    <div>
      <img src={image ?? undefined} alt="user profile" referrerPolicy="no-referrer" />
    </div>
  );
} 