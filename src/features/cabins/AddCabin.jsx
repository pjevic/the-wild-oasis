/** @format */

import { useState } from "react";

import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModel, setisOpenModel] = useState(false);

  return (
    <div>
      <Button onClick={() => setisOpenModel((show) => !show)}>Add new cabin</Button>
      {isOpenModel && (
        <Modal onClose={() => setisOpenModel((open) => !open)}>
          <CreateCabinForm onCloseModal={() => setisOpenModel((open) => !open)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
