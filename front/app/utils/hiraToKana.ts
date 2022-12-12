export const hiraToKana = (text: unknown) => {
  return String(text).replace(/[\u3042-\u3093]/g, (m) =>
    String.fromCharCode(m.charCodeAt(0) + 96)
  );
};
