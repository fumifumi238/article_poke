export const textToNumber = (
  value: string,
  defaultValue: 0 | "",
  setValue: (num: number | string) => void,
  min: number,
  max: number,
  sum?: number
) => {
  if (value === "") {
    if (defaultValue === 0) {
      setValue(0);
    }

    if (defaultValue === "") {
      setValue("");
    }

    return;
  }
  if (Number.isNaN(value)) {
    return;
  }

  const valueToNumber = parseInt(value);
  if (valueToNumber >= min && valueToNumber <= max) {
    if (sum && sum + valueToNumber > 510) {
      return;
    }
    setValue(valueToNumber);
  }
};
