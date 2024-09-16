// Function to decode the Y values based on their base
function decodeValue(base, value) {
    return parseInt(value, base);
  }
  
  // Function to perform Lagrange interpolation
  function lagrangeInterpolation(points) {
    const n = points.length;
    return function (x) {
      let result = 0;
      for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
          if (j !== i) {
            term *= (x - points[j].x) / (points[i].x - points[j].x);
          }
        }
        result += term;
      }
      return result;
    };
  }
  
  // Input JSON (Test Case 1)
  const testCase1 = {
    keys: {
      n: 4,
      k: 3,
    },
    1: {
      base: "10",
      value: "4",
    },
    2: {
      base: "2",
      value: "111",
    },
    3: {
      base: "10",
      value: "12",
    },
    6: {
      base: "4",
      value: "213",
    },
  };
  
  // Input JSON (Test Case 2)
  const testCase2 = {
    keys: {
      n: 9,
      k: 6,
    },
    1: {
      base: "10",
      value: "28735619723837",
    },
    2: {
      base: "16",
      value: "1A228867F0CA",
    },
    3: {
      base: "12",
      value: "32811A4AA0B7B",
    },
    4: {
      base: "11",
      value: "917978721331A",
    },
    5: {
      base: "16",
      value: "1A22886782E1",
    },
    6: {
      base: "10",
      value: "28735619654702",
    },
    7: {
      base: "14",
      value: "71AB5070CC4B",
    },
    8: {
      base: "9",
      value: "122662581541670",
    },
    9: {
      base: "8",
      value: "642121030037605",
    },
  };
  
  // Prompt user for input (choose Test Case 1 or Test Case 2)
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.question("Choose Test Case (1 or 2): ", (testCaseNumber) => {
    if (testCaseNumber === "1") {
      executeLagrangeInterpolation(testCase1);
    } else if (testCaseNumber === "2") {
      executeLagrangeInterpolation(testCase2);
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
    }
    rl.close();
  });
  
  // Execute Lagrange interpolation
  function executeLagrangeInterpolation(testCase) {
    const points = [];
    for (const key in testCase) {
      if (key !== "keys") {
        const x = parseInt(key);
        const y = decodeValue(testCase[key].base, testCase[key].value);
        points.push({ x, y });
        console.log(`Decoded value for key ${key}: (${x}, ${y})`);
      }
    }
  
    const polynomial = lagrangeInterpolation(points);
    const constantTerm = Math.round(polynomial(0));
    console.log("The constant term (c) of the polynomial is:", constantTerm);
  }
  