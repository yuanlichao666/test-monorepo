// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("node:path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const childProcess = require("child_process");

const cliPath = path.resolve(__dirname, "./build-react.ts");
const envPath = path.resolve(__dirname, "../node_modules/.bin");

//将bin目录扩展到子进程的env
const env = Object.assign(process.env, {
    PATH: `${envPath}:${process.env.PATH}`,
});

//使用ts-node直接执行ts
//由于ts不会编译别名，所以使用tsconfig-paths/register注册
childProcess.spawn("ts-node", ["-r tsconfig-paths/register", cliPath], {
    env,
    shell: true,
    stdio: "inherit",
});
