import { Dispatch, SetStateAction, useEffect } from "react";

export function Toast({
  validation,
  setValidation,
  message,
}: {
  validation: boolean;
  setValidation: Dispatch<SetStateAction<boolean>>;
  message: string;
}) {
  useEffect(() => {
    if (!validation) {
      setValidation(false);
      return;
    }

    setValidation(true);

    const timer = setTimeout(() => {
      setValidation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [validation]);

  if (!validation) {
    return null;
  }

  return (
    <div>
      <p className="text-red-500">{message}</p>
    </div>
  );
}
