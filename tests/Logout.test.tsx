import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Logout from "../src/pages/Logout";
import { signOut } from "firebase/auth";

// ✅ Mock react-router navigate
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

// ✅ Mock firebase auth
jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(() => ({})),
}));

// ✅ Mock Firebase config
jest.mock("../src/lib/firebase", () => ({
  auth: {},
  db:{},
}))

describe("Logout Component", () => {
  test("renders signed out confirmation message", () => {
    render(<Logout />);

    expect(
      screen.getByText("You’re signed out")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Thanks for stopping by. Redirecting you home…")
    ).toBeInTheDocument();
  });

  test("calls signOut on mount", () => {
    render(<Logout />);
    expect(signOut).toHaveBeenCalled();
  });
});
