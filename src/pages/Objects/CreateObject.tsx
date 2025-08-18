import React from "react";
import { useUnit } from "effector-react";
import { useAppDispatch } from "@/app/hooks";
import { hideCreateForm } from "@/features/object-management/slices/objectFormSlice";
import ObjectForm, { FormValues } from "@widgets/ObjectForm/ObjectForm";
import { submitFormFx } from "@/features/object-management/model/store";

const CreateObject: React.FC = () => {
  const submit = useUnit(submitFormFx);
  const dispatch = useAppDispatch();

  const handleSubmit = (data: FormValues) => {
    submit(data);
  };

  const handleBack = () => {
    dispatch(hideCreateForm());
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <button
          onClick={handleBack}
          style={{
            marginRight: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 18
          }}
        >
          ←
        </button>
        <h2 style={{ margin: 0 }}>Создание объекта</h2>
      </div>

      <ObjectForm onSubmit={handleSubmit} />

      <div style={{ marginTop: 16 }}>
        <button type="submit" form="object-form">
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default CreateObject;