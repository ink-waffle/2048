// A tiny 8-bit Brainfuck interpreter that pauses whenever the program
// wants input that has not arrived yet.
function brainfuck(program) {
  const code = [...program].filter((c) => "+-<>[].,".includes(c));
  const jumps = [];
  const open = [];
  code.forEach((c, i) => {
    if (c === "[") open.push(i);
    if (c === "]") {
      const j = open.pop();
      jumps[i] = j;
      jumps[j] = i;
    }
  });

  const tape = new Uint8Array(30000);
  let ptr = 0;
  let pc = 0;

  // Gives the program one byte and returns what it prints before it asks
  // for the next one.
  return (byte) => {
    const input = [byte];
    let output = "";
    for (; pc < code.length; pc++) {
      switch (code[pc]) {
        case "+": tape[ptr]++; break;
        case "-": tape[ptr]--; break;
        case ">": ptr++; break;
        case "<": ptr--; break;
        case ".": output += String.fromCharCode(tape[ptr]); break;
        case ",":
          if (!input.length) return output;
          tape[ptr] = input.pop();
          break;
        case "[": if (!tape[ptr]) pc = jumps[pc]; break;
        case "]": if (tape[ptr]) pc = jumps[pc]; break;
      }
    }
    return output;
  };
}
