import { Button } from '@/components/molecules';
import { useCIModal } from '@/components/organisms';

export default function HomePage() {
  const { openCIModal } = useCIModal();

  return (
    <>
      <Button
        text="인증"
        color="primary"
        onClick={() =>
          openCIModal({
            onSuccess: ({ ciToken }) => {
              alert(ciToken);
            },
          })
        }
      />
    </>
  );
}
