##### 20240521

- [ ] 使用 obsidian 生成当天日报，默认会有一个换行
- [x] 运行 @@SETRBPATH@@ 时，如果没有输入参数，会将其置为空，导致 _getPath 函数拼接出 "当前命令执行的路径"
- [x] 拆分 _getPath 为两个函数，一个用于读取 ENV 中存储的路径，与 _setPath 函数对应；另一个用于拼接路径得出当前日志文件的路径 -- 20240522

##### 20240527

- [ ] RGB Hex Hsl Hsv Cmyk 互相转换
- [ ] 颜色对比度
- [ ] rgba => rgb
- [ ] 进制转换

- [ ] le 换行问题

##### 20240719

- [ ] rgba => 16进制 https://rgbacolorpicker.com/rgba-to-hex

##### 20240925

- [ ] 单元测试

##### 20241015

- [x] 展示上一次的日报 -- 20241130

##### 20241202

- [ ] 日期计算

```js
new Date("2024-08-11T22:40:00+0800").getTime();
new Date("2024-10-27T22:44:00+0800").getTime();

(new Date().getTime() - new Date("2024-08-11T22:40:00+0800").getTime()) / 1000 / 60 / 60 / 24

new Date(new Date("2024-07-01T00:00:00+0800").getTime() + (365 / 5) * 1000 * 60 * 60 * 24 * 2)

// 第
Math.floor((new Date().getTime() - new Date("2024-08-11T22:40:00+0800").getTime()) / 1000 / 60 / 60 / 24) + 1
```

##### 20250517

- [x] 多个 bin 是否需要多个入口？打包结果是否需要多个？ -- 20250801

- [ ] 一键同步note

- [ ] version-bump && tag-push
- [ ] 单元测试

##### 20250612

- [ ] 一键删除 `.DS_Store`

##### 20250711

- [ ] 迁移 obsidian 日报/周报逻辑
- [ ] url parse
- [ ] image <==> base64
