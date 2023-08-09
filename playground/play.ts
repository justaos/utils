const command = new Deno.Command('gitf', {
  args: [
    "clone",
    "https://github.com/justaos/git-utils-test.git"
  ],
  stdin: "piped",
  stdout: "piped",
  cwd: "."
});
const child = command.spawn();

// open a file and pipe the subprocess output to it.
child.stdout.pipeTo(
  Deno.openSync("output", { write: true, create: true }).writable,
);

// manually close stdin
child.stdin.close();
const status = await child.status;
console.log(status.success);
