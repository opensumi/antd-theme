const fse = require('fs-extra');
const os = require('os');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// 需要忽略掉的 antd components 组件列表
const ignoreDir = [
  'app', 'anchor', 'overview'
];

async function runCommandInDir(command, directory) {
  try {
    await exec(command, { cwd: directory, stdio: 'inherit' });
  } catch (error) {
    console.error(error);
    throw new Error('');
  }
}

async function copyComponentsDir(srcPath, targetPath) {
  const files = fse.readdirSync(srcPath);

  files.forEach((file) => {
    const srcFilePath = path.join(srcPath, file);
    const targetFilePath = path.join(targetPath, file);

    const stat = fse.statSync(srcFilePath);

    if (stat.isDirectory()) {
      const basename = path.basename(srcFilePath);

      if (ignoreDir.includes(basename)) {
        return;
      }

      // 判断文件夹名称是否是 demo，如果是，那么直接全量拷贝
      if (basename === 'demo') {
        fse.copy(srcFilePath, targetFilePath);
      } else {
        copyComponentsDir(srcFilePath, targetFilePath);
      }
    } else {
      if (file.includes('index.en-US.md') || file.includes('index.zh-CN.md')) {
        fse.copySync(srcFilePath, targetFilePath);

        // 如果是 markdown 文件，那么只获取头部跟演示代码部分
        const markdownFile = fse.readFileSync(targetFilePath, 'utf-8');
        const regex = /^---([\s\S]*?)---|(##\s*Examples\s*|##\s*代码演示\s*)\n([\s\S]*?)(?=\n#)/gm;

        try {
          const match = markdownFile.match(regex);
          const [header, examples] = match;

          fse.writeFileSync(targetFilePath, `${header}\n\n${examples}`, 'utf-8');
        } catch(err) {
          console.error(`解析 markdown 失败，失败文件：${srcFilePath}`);
        }
      }
    }
  });
}

(async () => {
  // 获取用户的临时目录
  const tempDir = os.tmpdir();

  // 定义 antd 代码的下载地址和目标目录
  const repoUrl = 'https://github.com/ant-design/ant-design.git';
  const targetDir = path.join(tempDir, 'opensumi-ant-design');

  // 判断文件是否存在，如果存在那么删除
  if (fse.existsSync(targetDir)) {
    fse.removeSync(targetDir);
  }

  console.log('start clone ant-design to temp dir');

  await runCommandInDir(`git clone ${repoUrl} ${targetDir} --depth=1`);

  console.log(`Antd code is downloaded to ${targetDir}`);

  // 读取 package.json 文件，获取版本号
  const pkgPath = path.join(targetDir, 'package.json');
  const pkgData = fse.readFileSync(pkgPath);
  const pkg = JSON.parse(pkgData);
  const version = pkg.version;

  console.log(`Antd version: ${version}`);

  // 将 components 目录拷贝至当前目录下
  const srcDir = path.join(targetDir, 'components');
  const destDir = path.join(__dirname, '../components');

  console.log('start empty src dir');

  // 清空 src 文件夹
  await fse.emptyDir(destDir);

  // 读取源文件夹下的所有文件和子文件夹
  copyComponentsDir(srcDir, destDir);
})();
