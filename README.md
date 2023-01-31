
fastify 整合 nest ioc container 项目。

## 目的

虽然 nest 框架官方自带 fastify adapter，但是这个仅仅是兼容层 adapter，整体还是围绕 nest 生态，无法
完全利用 fastify 的优势，例如校验，序列化，路由等。

该项目仅仅使用 nest 的 ioc 容器去集成 fastify，整体围绕 fastify 生态以及性能优势，通过 nest 的
依赖注入来增强 fastify 横向扩展，组件化以及模块之间的解耦。


## 安装

```bash
$ pnpm install
```

## 运行

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```


## License

Nest is [MIT licensed](LICENSE).
