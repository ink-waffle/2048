document.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector(".main");
  const response = await fetch("2048.bf");
  const game = brainfuck(await response.text());

  // the first byte seeds the random numbers, then every keyup sends its key code
  main.innerHTML = game(Math.floor(Math.random() * 256));

  document.addEventListener("keyup", (e) => {
    const html = game(e.keyCode);
    if (html) main.innerHTML = html;
  });
});
