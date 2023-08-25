import { useEffect, useState } from "react";

export function Toast({ validation }: { validation: boolean }) {
  let [valid, setValid] = useState(false);

  useEffect(() => {
    if (validation) {
      setValid(true);

      const timer = setTimeout(() => {
        setValid(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setValid(false);
    }
  }, [validation]);

  if (!validation || !valid) {
    return null;
  }

  return (
    <div>
      <p className="text-red-500">Email or password not found</p>
    </div>
  );
}
