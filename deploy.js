const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const ora = require("ora");
const maxBuffer = 5000 * 1024;
// 任务列表
let taskList;
const execCmd = function (cmd, cwd) {
  return new Promise((res, rej) => {
    const process = exec(
      cmd,
      {
        encoding: "utf8",
        cwd,
      },
      async (error, stdout, stderr) => {
        error
          ? rej(error)
          : res({
              error,
              stdout,
              stderr,
            });
      }
    );
    process.stderr.on("data", (data) => console.log(data));
    process.stdout.on("data", (data) => console.log(data));
    process.stdout.on("close", (data) => {
      console.log(data);
      res(data);
    });
  });
};
// 执行打包脚本
const execBuild = async (config, index) => {
  try {
    const script = "npm run build";
    log(`(${index}) ${script}`);
    const spinner = ora("正在打包中\n");

    spinner.start();

    await new Promise((resolve, reject) => {
      childProcess.exec(
        script,
        { cwd: process.cwd(), maxBuffer: maxBuffer },
        (e) => {
          spinner.stop();
          if (e === null) {
            succeed("打包成功");
            resolve();
          } else {
            reject(e.message);
          }
        }
      );
    });
  } catch (e) {
    error("打包失败");
    error(e);
    process.exit(1);
  }
};
const toGitee = async (config, index) => {
  await new Promise((resolve, reject) => {
    const script1 = "git add *";
    const script2 = "git commit -m 'xxxxxx'";
    const script3 = "git push -u origin gh-page:refs/heads/gh-page";
    childProcess.exec(
      script1 + "&& " + script2 + "&&" + script3,
      { cwd: process.cwd(), maxBuffer: maxBuffer },
      (e) => {
        if (e === null) {
          succeed("push成功");
          resolve();
        } else {
          reject(e.message);
        }
      }
    );
  });
};

const refreshGitPage = async (config, index) => {
  return await new Promise((resolve, reject) => {
    // gitee应该有提供refresh的接口，走token
  });
};
// 创建任务列表
const createTaskList = (config) => {
  taskList = [];
  script && taskList.push(execBuild);
  taskList.push(toGitee);
  taskList.push(refreshGitPage);
};

// 执行任务列表
const executeTaskList = async (config) => {
  for (const [index, execute] of new Map(
    taskList.map((execute, index) => [index, execute])
  )) {
    await execute(config, index + 1);
  }
};
(async () => {
  createTaskList();
  executeTaskList();
})();
