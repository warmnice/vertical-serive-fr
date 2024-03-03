# 使用 Node.js 18 镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app


# 复制项目文件到工作目录
COPY . .

# 安装依赖
RUN yarn install

# 构建项目
RUN yarn build

# 指定运行时命令
CMD ["yarn", "serve"]