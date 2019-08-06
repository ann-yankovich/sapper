import { getEmptyItems, setValue, getValue } from "./helpers";

var board = [
  [
    { value: 1, row: 0, column: 0 },
    { value: 0, row: 0, column: 1 },
    { value: "+", row: 0, column: 2 }
  ],
  [
    { value: 1, row: 1, column: 0 },
    { value: "*", row: 1, column: 1 },
    { value: 2, row: 1, column: 2 }
  ],
  [
    { value: "+", row: 2, column: 0 },
    { value: "□", row: 2, column: 1 },
    { value: 3, row: 2, column: 2 }
  ]
];

test("sapper", () => {
  it("getValue", () => {
    expect(getValue(1, 2, board)).toBe(2);
  });

  it("setValue", () => {
    const item = { value: 2, row: 0, column: 0 };
    setValue(item, 2, board);
    expect(getValue(0, 0, board)).toBe(2);
  });

  it("getEmptyItems", () => {
    const emptyItems = [
      { value: "+", row: 0, column: 2 },
      { value: "+", row: 2, column: 0 }
    ];

    expect(getEmptyItems(board)).toEqual(emptyItems);
  });
});
