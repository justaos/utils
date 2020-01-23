import * as shell from "shelljs";

// generating a hash
export function checkoutRepository(path: string, repositoryUrl: string) {
    if (!path)
        throw new Error("path is required parameter");
    if (!repositoryUrl)
        throw new Error("repositoryUrl is required parameter");


    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1)
    }

    shell.cd(path);

    return new Promise(function (resolve, reject) {
        shell.exec('git clone ' + repositoryUrl, function () {
            resolve();
        });
    });
}