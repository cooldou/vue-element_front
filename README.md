# risk-management

> Risk management

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for staging with production
npm run build staging
```

## Deploy

### Staging
```bash
# 政府端
scp dist/management/index.html root@47.104.246.119:/mnt/shuangkong/management
scp -r dist/static root@47.104.246.119:/mnt/shuangkong/management

# 集团端
scp dist/group/index.html root@47.104.246.119:/mnt/shuangkong/group
scp -r dist/static root@47.104.246.119:/mnt/shuangkong/group

# 企业端
scp dist/enterprise/index.html root@47.104.246.119:/mnt/shuangkong/enterprise
scp -r dist/static root@47.104.246.119:/mnt/shuangkong/enterprise
```

### Production
```bash
# 政府端
scp dist/management/index.html root@47.104.28.97:/mnt/shuangkong/management
scp -r dist/static root@47.104.28.97:/mnt/shuangkong/management

# 企业端
scp dist/enterprise/index.html root@47.104.28.97:/mnt/shuangkong/enterprise
scp -r dist/static root@47.104.28.97:/mnt/shuangkong/enterprise
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
