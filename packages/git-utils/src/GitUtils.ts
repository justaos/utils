export default class GitUtils {
  static async checkoutRepository(
    checkoutFolderPath: URL,
    repositoryUrl: string
  ): Promise<any> {
    const command = new Deno.Command("git", {
      args: ["clone", repositoryUrl],
      stdin: "piped",
      stdout: "piped",
      cwd: checkoutFolderPath
    });
    const process = command.spawn();

    // open a file and pipe the subprocess output to it.
    await process.stdin.close();
    const result = await process.output();
    console.log(new TextDecoder().decode(result.stdout));
  }
}
