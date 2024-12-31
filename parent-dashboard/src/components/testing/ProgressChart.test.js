// import React from "react";
// import { render, screen, fireEvent, act } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import axios from "axios";
// import ProgressChart from "../ProgressChart";

// jest.mock("axios", () => ({
//   get: jest.fn(),
// }));

// describe("ProgressChart Component", () => {
//   const mockUser = { uid: "123" };
//   const mockCourse = "Mathematics";

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("renders the ProgressChart component correctly", () => {
//     render(<ProgressChart user={mockUser} selectedCourse={mockCourse} />);

//     expect(screen.getByText(/progres student/i)).toBeInTheDocument();
//     expect(screen.getByText(/progres level:/i)).toBeInTheDocument();
//   });

//   test("fetches and displays progress data", async () => {
//     const mockResponse = {
//       progress: {
//         attendance: 80,
//         activity: 70,
//         understanding: 90,
//         task_completion: 60,
//       },
//     };

//     axios.get.mockResolvedValueOnce({ data: { progress: mockResponse } });

//     await act(async () => {
//       render(<ProgressChart user={mockUser} selectedCourse={mockCourse} />);
//     });

//     expect(screen.getByText(/kehadiran/i)).toBeInTheDocument();
//     expect(screen.getByText("80%")) .toBeInTheDocument();
//     expect(screen.getByText(/gold/i)).toBeInTheDocument();
//   });

//   test("displays the correct progress level", async () => {
//     const mockResponse = {
//       progress: {
//         attendance: 40,
//         activity: 50,
//         understanding: 55,
//         task_completion: 45,
//       },
//     };

//     axios.get.mockResolvedValueOnce({ data: { progress: mockResponse } });

//     await act(async () => {
//       render(<ProgressChart user={mockUser} selectedCourse={mockCourse} />);
//     });

//     expect(screen.getByText(/silver/i)).toBeInTheDocument();
//   });

//   test("handles expand/collapse behavior correctly", async () => {
//     const mockResponse = {
//       progress: {
//         attendance: 80,
//         activity: 70,
//         understanding: 90,
//         task_completion: 60,
//       },
//     };

//     axios.get.mockResolvedValueOnce({ data: { progress: mockResponse } });

//     await act(async () => {
//       render(<ProgressChart user={mockUser} selectedCourse={mockCourse} />);
//     });

//     const expandButton = screen.getAllByTestId("ExpandMoreIcon")[0];
//     fireEvent.click(expandButton);

//     expect(
//       screen.getByText(/menunjukkan seberapa konsisten siswa/i)
//     ).toBeInTheDocument();
//   });

//   test("displays correct bar colors based on values", async () => {
//     const mockResponse = {
//       progress: {
//         attendance: 20,
//         activity: 55,
//         understanding: 65,
//         task_completion: 90,
//       },
//     };

//     axios.get.mockResolvedValueOnce({ data: { progress: mockResponse } });

//     await act(async () => {
//       render(<ProgressChart user={mockUser} selectedCourse={mockCourse} />);
//     });

//     const bars = screen.getAllByRole("progressbar");

//     expect(bars[0]).toHaveStyle("background-color: red");
//     expect(bars[1]).toHaveStyle("background-color: yellow");
//     expect(bars[2]).toHaveStyle("background-color: #0652DD");
//   });

//   test("displays fallback content when API fails", async () => {
//     axios.get.mockRejectedValueOnce(new Error("API Error"));

//     await act(async () => {
//       render(<ProgressChart user={mockUser} selectedCourse={mockCourse} />);
//     });

//     expect(screen.queryByText(/kehadiran/i)).not.toBeInTheDocument();
//     expect(screen.getByText(/progres level:/i)).toBeInTheDocument();
//   });
// });
