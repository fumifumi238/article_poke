export const isEqualArray = <T>(a: T[], b: T[]) => {
  if (a.length !== b.length || a.length === 0) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};
