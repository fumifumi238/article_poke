import About from "../../pages/about";
import { render } from "@testing-library/react";

describe("Sampleコンポーネント", () => {
  test("should first", () => {
    const { getByText } = render(<About />);
    expect(getByText("リバティノート")).toBeTruthy();
  });
});
