import { render, screen } from "../../app/testUtils";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

// mock react-router-dom
const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
    useHistory: () => ({
        push: mockPush,
    }),
}));

it("一个没有登陆的游客", () => {
    render(<Header />);
    expect(screen.getByText(/好西瓜/i)).toBeInTheDocument();

    expect(screen.getByText(/注册/i)).toBeInTheDocument();
    expect(screen.getByText(/登陆/i)).toBeInTheDocument();
});

it("游客点击 login 和 signup 按钮", () => {
    render(<Header />);

    userEvent.click(screen.getByText(/登陆/i));
    expect(mockPush).toBeCalledWith("/login");
    userEvent.click(screen.getByText(/注册/i));
    expect(mockPush).toBeCalledWith("/signup");
});

it("已经登陆的用户", () => {
    const authState = {
        isAuthenticated: true,
        user: { name: "testUser", karma: 30 },
    };
    render(<Header />, { preloadedState: { auth: authState } });

    expect(screen.getByText(/登出/i)).toBeInTheDocument();
    expect(screen.getByText(/testUser/i)).toBeInTheDocument();
    expect(screen.getByText(/30/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/登出/i));
    expect(screen.queryByText(/登出/i)).toBeNull();
    expect(screen.queryByText(/testUser/i)).toBeNull();
    expect(screen.queryByText(/30/i)).toBeNull();
});
