import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";

import Search from ".";
import store from "../../app/store";

jest.mock("axios");

const data = {
  data: {
    hits: [
      {
        objectID: "1",
        title: "title 1",
        author: "auhtor 1",
        num_comments: 123,
      },
      {
        objectID: "2",
        title: "title 2",
        author: "auhtor 2",
        num_comments: 456,
      },
    ],
  },
};

describe("search component", () => {
  test("happy path", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const element = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    fireEvent.click(element.getByRole("search"));

    await waitFor(() => element.getByText("title 1"));

    //the two articles are correctly rendered
    expect(element.getAllByText(/title/).length).toBe(2);
  });
});
