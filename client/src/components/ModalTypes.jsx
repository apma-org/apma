import { Modal } from "./Modal";
import { CONFIRM, DELETE_MESSAGE } from "../utils/constants";

export const DeleteModal = ({
  handleModalClick,
  handleDeleteConfirm,
  obType,
}) => (
  <Modal close={handleModalClick}>
    <h4 className="text-xl block justify-center text-center font-extrabold">
      {`${DELETE_MESSAGE}${" "}${obType}${" ?"}`}
    </h4>
    <div className="flex flex-row space-x-20 justify-center items-center">
      <button
        className="mt-10 py-3 bg-green-300 text-white w-6/12 hover:bg-green-200 rounded-xl"
        onClick={handleDeleteConfirm}
      >
        {CONFIRM}
      </button>
    </div>
  </Modal>
);
