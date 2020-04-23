1.安装ts
  安装node npm  全局安装typescript
  npm install -g typescript
2.使用vscode自动编译ts文件
  运行：tsc --init,创建tsconfig.json文件
  修改tsconfig.json文件，设置js文件夹："outDir":"./js/"
  设置js监视任务  终端--》运行任务--》选择ts文件 --》监视任务，之后修改项目中的ts,自动生成js文件
