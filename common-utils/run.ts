run(Deno.args, {
  start() {
    exec(['deno', 'run', './src/mod.ts']);
  },
  echo(str) {
    return exec(['echo', str, "\nThis is javascript, y'all"]);
  },

});

