/**
 * 该文件是用来检测package.json下每个模块占用的磁盘空间大小
 */
const fs = require("fs");
const { readdir, stat } = require("fs/promises");
const { join } = require("path");
const packageJson = require("./package.json");

const dirSize = async (dir) => {
  const files = await readdir(dir, { withFileTypes: true });
  const paths = files.map(async (file) => {
    const path = join(dir, file.name);
    if (file.isDirectory()) return await dirSize(path);
    if (file.isFile()) {
      const { size } = await stat(path);
      return size;
    }
    return 0;
  });
  return (await Promise.all(paths)).flat(Infinity).reduce((i, size) => i + size, 0);
};

const result = [];
async function main(keysList) {
  for (const key of keysList) {
    const size = await dirSize("./node_modules/" + key);
    result.push({
      name: key,
      size,
    });
  }
}

const { dependencies, devDependencies } = packageJson;
const keys = Object.keys(dependencies);
const keysd = Object.keys(devDependencies);
const arr = [...keys, ...keysd];
const start = (list) => {
  main(list).then(() => {
    result.sort((a, b) => {
      return a.size - b.size;
    });
    console.table(result);
    const totalSize = result.reduce((total, m) => {
      total += m.size;
      return total;
    }, 0);
    console.log(`total dir count: ${result.length} size: ${totalSize}`);
  });
};
const allDir = () => {
  const items = fs.readdirSync("./node_modules");
  const ignoreList = [".package-lock.json", ".yarn-integrity"];
  const dirList = items.filter((item) => !ignoreList.includes(item));
  start(dirList);
};
// allDir()

start(arr);
