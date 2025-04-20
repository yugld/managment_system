import { useState } from 'react';
import ModalTask from '@components/ModalTask';

interface CreateTaskButtonProps {
  defaultTaskId?: number | null;
}

const CreateTaskButton = ({ defaultTaskId = null }: CreateTaskButtonProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(defaultTaskId);

  const handleClick = () => {
    setTaskId(defaultTaskId ?? null);
    setOpenModal(true);
  };

  return (
    <>
      <button
        className="rounded-xl bg-sky-500 px-5 py-2.5 font-medium text-white hover:bg-sky-600 transition"
        onClick={handleClick}
      >
        Создать задачу
      </button>

      {openModal && (
        <ModalTask
          open={openModal}
          onClose={() => setOpenModal(false)}
          taskId={taskId ?? undefined}
        />
      )}
    </>
  );
};

export default CreateTaskButton;
