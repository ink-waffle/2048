# 2048 in Brainfuck

`2048.bf` is the whole game: it reads a seed byte and then the key code of every keyup, slides, combines and scores the squares, drops new 2s on random empty squares, decides win and game over, and prints the markup of the page after every key. `brainfuck.js` runs it in the browser and `script.js` hands it the keys.

The page fetches `2048.bf`, so serve the folder and open http://localhost:8000

```sh
python3 -m http.server
```

Any 8-bit Brainfuck interpreter runs `2048.bf` in a terminal too. The first byte is the seed, then 37 left, 38 up, 39 right, 40 down:

```sh
printf '*%%&(' | bf 2048.bf   # seed 42, then left, up, down
```
