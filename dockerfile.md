## node服务本地构建需替换

### iuap5-basedoc-fe（ok）

FROM ycr.yonyoucloud.com/base/node:8-alpine

WORKDIR /design/ucf-basedoc-fe

ADD ./ /design/ucf-basedoc-fe

#RUN ynpm install && npm run build
RUN sed -i  's/"start": "cross-env/"start": "cross-env SERVER_PORT=${basedoc.port} SRV_URL=${ucfbasedoc.rest.url}/g' package.json
RUN tar -zcvf  ucf-basedoc-fe.zip ./
RUN mkdir -p /yonyoucloud-buildproduct 
RUN cp -r /design/ucf-basedoc-fe/ucf-basedoc-fe.zip /yonyoucloud-buildproduct/ 
RUN rm -rf /design/ucf-basedoc-fe/ucf-basedoc-fe.zip
RUN sed -i  's/${ucfbasedoc.rest.url}/http:\/\/basedoc.dev-on-premises.yyuap.com\/ucfbasedoc/g' package.json
RUN sed -i  's/${ucfbasedoc.rest.url}/http:\/\/basedoc.dev-on-premises.yyuap.com\/ucfbasedoc/g' bin/web/common/config.env.js
RUN sed -i  's/${basedoc.port}/3003/g' package.json
RUN ynpm install
EXPOSE 3003

CMD ["npm start"]

#### 打包器
* zip包名称：ucf-basedoc-fe.zip
* 拷贝node_modules
* 根据describe.xml执行替换
* 执行npm start



### iuap5-userdef-fe（ok）

FROM ycr.yonyoucloud.com/base/node:8-alpine

WORKDIR /design/ucf-userdef-fe

ADD ./ /design/ucf-userdef-fe

#RUN ynpm install && npm run build
RUN sed -i  's/"start": "cross-env/"start": "cross-env SERVER_PORT=${userdef.port} SRV_URL=${bd-ext.url.u8cuserdefine}/g' package.json
RUN tar -zcvf  ucf-userdef-fe.zip ./
RUN mkdir -p /yonyoucloud-buildproduct 
RUN cp -r /design/ucf-userdef-fe/ucf-userdef-fe.zip /yonyoucloud-buildproduct/ 
RUN rm -rf /design/ucf-userdef-fe/ucf-userdef-fe.zip
RUN sed -i  's/${bd-ext.url.u8cuserdefine}/http:\/\/bd-ext.dev-on-premises.yyuap.com\/u8c-userdefine/g' package.json
RUN sed -i  's/${userdef.port}/3003/g' package.json
RUN ynpm install
EXPOSE 3003

CMD ["npm start"]

#### 打包器
* zip包名称：ucf-userdef-fe.zip
* 拷贝node_modules
* 根据describe.xml执行替换
* 执行npm start

### iuap5-staff-fe（ok）

FROM ycr.yonyoucloud.com/base/node:8-alpine
WORKDIR /design/ucf-staff-fe

ADD ./ /design/ucf-staff-fe

#RUN npm install && npm run build
RUN sed -i  's/"start": "cross-env/"start": "cross-env SERVER_PORT=${staff.port} SRV_URL=${staff.url.ucfstaffcenter}/g' package.json
RUN tar -zcvf  ucf-staff-fe.zip ./
RUN mkdir -p /yonyoucloud-buildproduct 
RUN cp -r /design/ucf-staff-fe/ucf-staff-fe.zip /yonyoucloud-buildproduct/ 
RUN rm -rf /design/ucf-staff-fe/ucf-staff-fe.zip
RUN sed -i  's/${staff.url.ucfstaffcenter}/http:\/\/staff.dev-on-premises.yyuap.com\/ucf-staff-center/g' package.json
RUN sed -i  's/${staff.port}/3003/g' package.json
RUN npm install
EXPOSE 3003

CMD ["npm start"]

#### 打包器
* zip包名称：ucf-staff-fe.zip
* 拷贝node_modules
* 根据describe.xml执行替换
* 执行npm start

### iuap5-org-fe（ok）

FROM ycr.yonyoucloud.com/base/node:8-alpine
WORKDIR /design/ucf-org-fe

ADD ./ /design/ucf-org-fe

#RUN npm install && npm run build
RUN sed -i  's/"start": "cross-env/"start": "cross-env SERVER_PORT=${org.port} SRV_URL=${org.url.ucforgcenter}/g' package.json
RUN tar -zcvf  ucf-org-fe.zip ./
RUN mkdir -p /yonyoucloud-buildproduct 
RUN cp -r /design/ucf-org-fe/ucf-org-fe.zip /yonyoucloud-buildproduct/ 
RUN rm -rf /design/ucf-org-fe/ucf-org-fe.zip
RUN sed -i  's/${org.url.ucforgcenter}/http:\/\/org.dev-on-premises.yyuap.com\/ucf-org-center/g' package.json
RUN sed -i  's/${org.port}/3003/g' package.json
RUN npm install
EXPOSE 3003

CMD ["npm start"]

#### 打包器
* zip包名称：ucf-org-fe.zip
* 拷贝node_modules
* 根据describe.xml执行替换
* 执行npm start


### iuap5-yonyou-mdf-manage

#FROM dockerhub.yonyou.com:5000/nginx-node:1.13.9-2

FROM dockerhub.yonyou.com:5000/node:8

WORKDIR /design/yonyou-mdf-manage

ADD ./ /design/yonyou-mdf-manage

RUN sed -i  's/"start": "cross-env/"start": "cross-env SERVER_PORT=${mdf.port}/g' package.json \
    && tar -zcvf  iuap5-yonyou-mdf-manage.zip ./ \
    && mkdir -p /yonyoucloud-buildproduct \
    && cp -r /design/yonyou-mdf-manage/iuap5-yonyou-mdf-manage.zip /yonyoucloud-buildproduct/ \
    && rm -rf /design/yonyou-mdf-manage/iuap5-yonyou-mdf-manage.zip \
    && cnpm install \
    && sed -i  's/${mdf.port}/3003/g' package.json

EXPOSE 3003

CMD ["npm start"]


#### 打包器
* zip包名称：iuap5-yonyou-mdf-manage.zip
* 拷贝node_modules
* 将package.json中的端口进行替换
* 执行npm run start


### iuap5-omc-fe（ok）

FROM ycr.yonyoucloud.com/base/nginx:1.14-alpine
MAINTAINER 谢毅舜 "xieyshh@yonyou.com"
WORKDIR /design/omc-test-web
ADD ./ /design/omc-test-web
RUN apk update && apk add git python

RUN sed -i 's/http:\/\/u8ciccb-test.yyuap.com/${fin.url}/g' package.json \
    && sed -i  's/"start": "cross-env/"start": "cross-env SERVER_PORT=${omc.port}/g' package.json \
    && tar -zcvf  iuap5-omc-web.zip ./ \
    && mkdir -p /yonyoucloud-buildproduct \
    && cp -r /design/omc-test-web/iuap5-omc-web.zip /yonyoucloud-buildproduct/ \
    && rm -rf /design/omc-test-web/iuap5-omc-web.zip \
    && ynpm install \
    && sed -i  's/${fin.url}/http:\/\/fin.demo01-on-premises.yyuap.com/g' package.json \
    && sed -i  's/${omc.port}/3003/g' package.json

VOLUME /design/omc-test-web/log
EXPOSE 3003
WORKDIR /design/omc-test-web
CMD ["npm run start"]

#### 打包器
* zip包名称：iuap5-omc-web.zip
* 拷贝node_modules
* 根据describe.xml执行替换
* 执行npm run start




















## node服务线上构建需替换

### iuap5-auth-web（ok）

FROM ycr.yonyoucloud.com/base/node:8-alpine
ENV TZ "Asia/Shanghai"
ENV LANG en_US.UTF-8
ENV LANGUAGE zh_CN:zh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ADD ./ /design/
RUN cd /design/UPC-Web  \
    &&  echo  `date`  \
    &&  ls  -alh  \ 
    && npm config set unsafe-perm true \
    && cd /design/UPC-Web \
    && ynpm install -g pm2  \
    && chown -R root /usr/local  \
    && ynpm install \
    && pm2 status  \
    && mkdir -p /UPC-Web-temp \
    && cp -r ./ /UPC-Web-temp \
    && cd /UPC-Web-temp \
    && rm -rf /UPC-Web-temp/node_modules \
    && tar -zcvf  iuap5-auth-web.zip ./ \
    && mkdir -p /yonyoucloud-buildproduct \
    && cp -r /UPC-Web-temp/iuap5-auth-web.zip /yonyoucloud-buildproduct/ \
    && rm -rf /UPC-Web-temp \
    && sed -i 's@${pom.org.permission.url}@http://tenantauth.dev-on-premises.yyuap.com/@g' /design/UPC-Web/pm2.json \
    && sed -i 's@${auth.port}@3006@g' /design/UPC-Web/pm2.json \
		&& sed -i 's@${ms.url}@http://ms.dev-on-premises.yyuap.com@g' /design/UPC-Web/static/public/javascripts/index.min.js 


VOLUME /design/UPC-Web/log
WORKDIR /design/UPC-Web
EXPOSE 3006
CMD  pm2 restart  pm2.json && pm2 logs   


#### 打包器
* zip包名称：iuap5-auth-web.zip
* 拷贝node_modules
* 根据describe.xml执行替换
* 执行pm2 restart  pm2.json && pm2 logs


### iuap5-upc-web（ok）

FROM ycr.yonyoucloud.com/base/node:8-alpine
ENV TZ "Asia/Shanghai"
ENV LANG en_US.UTF-8
ENV LANGUAGE zh_CN:zh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ADD ./ /design/
RUN cd /design/UPC-Web  \
    &&  echo  `date`  \
    &&  ls  -alh  \ 
    && npm config set unsafe-perm true \
    && cd /design/UPC-Web \
    && ynpm install -g pm2  \
    && chown -R root /usr/local  \
    && ynpm install \
    && pm2 status  \
    && mkdir -p /UPC-Web-temp \
    && cp -r ./ /UPC-Web-temp \
    && cd /UPC-Web-temp \
    && rm -rf /UPC-Web-temp/node_modules \
    && tar -zcvf  iuap5-upc-web.zip ./ \
    && mkdir -p /yonyoucloud-buildproduct \
    && cp -r /UPC-Web-temp/iuap5-upc-web.zip /yonyoucloud-buildproduct/ \
    && rm -rf /UPC-Web-temp \
    && sed -i 's@${upcs.url}@http://upcs.dev-on-premises.yyuap.com/@g' /design/UPC-Web/pm2.json \
    && sed -i 's@${upc.port}@3006@g' /design/UPC-Web/pm2.json 

VOLUME /design/UPC-Web/log
WORKDIR /design/UPC-Web
EXPOSE 3006
CMD  pm2 restart  pm2.json && pm2 logs

#### 打包器
* zip包名称：iuap5-upc-web.zip
* 拷贝node_modules
* 根据describe.xml执行替换
* 执行pm2 restart  pm2.json && pm2 logs










## node服务线上构建不需替换











## 静态网站需要替换

### iuap5-diwork-fe-pages（ok）

FROM ycr.yonyoucloud.com/base/node:8-alpine

WORKDIR workspace
ADD ./ /workspace
RUN apk update && apk add git

RUN sed -i  "s/\${pom.diwork.login}/http:\/\/workbench.dev-on-premises.yyuap.com/g" `grep \\${pom.diwork.login} -rl dist`
RUN sed -i  "s/\${sso.url}/http:\/\/sso.dev-on-premises.yyuap.com/g" `grep \\${sso.url} -rl dist`
RUN sed -i  "s/\${user.url}/http:\/\/user.dev-on-premises.yyuap.com/g" `grep \\${user.url} -rl dist`
RUN sed -i  "s/\${ms.url}/http:\/\/ms.dev-on-premises.yyuap.com/g" `grep \\${ms.url} -rl dist`
RUN sed -i  "s/\${auth.url}/http:\/\/auth.dev-on-premises.yyuap.com/g" `grep \\${auth.url} -rl dist`
RUN sed -i  "s/\${org.url}/http:\/\/org.dev-on-premises.yyuap.com/g" `grep \\${org.url} -rl dist`
RUN sed -i  "s/\${pom.org.permission.url}/http:\/\/tenantauth.dev-on-premises.yyuap.com/g" `grep \\${pom.org.permission.url} -rl dist`
RUN sed -i  "s/\${mc.url}/http:\/\/mc.dev-on-premises.yyuap.com/g" `grep \\${mc.url} -rl dist`
RUN sed -i  "s/\${upc.url}/http:\/\/upc.dev-on-premises.yyuap.com/g" `grep \\${upc.url} -rl dist`
RUN sed -i  "s/\${bd-ext.url}/http:\/\/bd-ext.dev-on-premises.yyuap.com/g" `grep \\${bd-ext.url} -rl dist`
RUN sed -i  "s/\${staff.url}/http:\/\/staff.dev-on-premises.yyuap.com/g" `grep \\${staff.url} -rl dist`
RUN sed -i  "s/\${fastdfs.url}/http:\/\/fastdfs.dev-on-premises.yyuap.com/g" `grep \\${fastdfs.url} -rl dist`
RUN sed -i  "s/\${message.url}/http:\/\/message.dev-on-premises.yyuap.com/g" `grep \\${message.url} -rl dist`
RUN sed -i  "s/\${manager.url}/http:\/\/manager.dev-on-premises.yyuap.com/g" `grep \\${manager.url} -rl dist`
RUN sed -i  "s/\${bdyyuap.url}/http:\/\/bd.dev-on-premises.yyuap.com/g" `grep \\${bdyyuap.url} -rl dist`
RUN sed -i  "s/\${bd.url}/http:\/\/basedoc.dev-on-premises.yyuap.com/g" `grep \\${bd.url} -rl dist`
RUN sed -i  "s/\${config.ucf.search.endpoint}/http:\/\/isearch.dev-on-premises.yyuap.com/g" `grep \\${config.ucf.search.endpoint} -rl dist`



# FROM dockerhub.yonyou.com:5000/nginx:latest
FROM ycr.yonyoucloud.com/base/nginx:1.15-alpine-perl
WORKDIR workspace
COPY --from=0  /workspace/dist /workbench/dist
COPY --from=0  /workspace/build/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /yonyoucloud-buildproduct 
COPY --from=0  /workspace/dist/iuap5-diwork-fe-pages.zip /yonyoucloud-buildproduct/iuap5-diwork-fe-pages.zip
RUN chmod 755 -R /workbench/

#### 打包器
* zip包名称：iuap5-diwork-fe-pages.zip
* 根据describe.xml执行替换
* 根据build/default.conf 来配置nginx


### iuap5-diwork-fe-manager（ok）

FROM ycr.yonyoucloud.com/base/node:8-alpine

WORKDIR workspace
ADD ./ /workspace
RUN apk update && apk add git

RUN sed -i  "s/\${pom.diwork.login}/http:\/\/workbench.dev-on-premises.yyuap.com/g" `grep \\${pom.diwork.login} -rl dist`
RUN sed -i  "s/\${sso.url}/http:\/\/sso.dev-on-premises.yyuap.com/g" `grep \\${sso.url} -rl dist`
RUN sed -i  "s/\${user.url}/http:\/\/user.dev-on-premises.yyuap.com/g" `grep \\${user.url} -rl dist`
RUN sed -i  "s/\${ms.url}/http:\/\/ms.dev-on-premises.yyuap.com/g" `grep \\${ms.url} -rl dist`
RUN sed -i  "s/\${auth.url}/http:\/\/auth.dev-on-premises.yyuap.com/g" `grep \\${auth.url} -rl dist`
RUN sed -i  "s/\${org.url}/http:\/\/org.dev-on-premises.yyuap.com/g" `grep \\${org.url} -rl dist`
RUN sed -i  "s/\${pom.org.permission.url}/http:\/\/tenantauth.dev-on-premises.yyuap.com/g" `grep \\${pom.org.permission.url} -rl dist`
RUN sed -i  "s/\${mc.url}/http:\/\/mc.dev-on-premises.yyuap.com/g" `grep \\${mc.url} -rl dist`
RUN sed -i  "s/\${upc.url}/http:\/\/upc.dev-on-premises.yyuap.com/g" `grep \\${upc.url} -rl dist`
RUN sed -i  "s/\${bd-ext.url}/http:\/\/bd-ext.dev-on-premises.yyuap.com/g" `grep \\${bd-ext.url} -rl dist`
RUN sed -i  "s/\${staff.url}/http:\/\/staff.dev-on-premises.yyuap.com/g" `grep \\${staff.url} -rl dist`
RUN sed -i  "s/\${fastdfs.url}/http:\/\/fastdfs.dev-on-premises.yyuap.com/g" `grep \\${fastdfs.url} -rl dist`
RUN sed -i  "s/\${message.url}/http:\/\/message.dev-on-premises.yyuap.com/g" `grep \\${message.url} -rl dist`
RUN sed -i  "s/\${manager.url}/http:\/\/manager.dev-on-premises.yyuap.com/g" `grep \\${manager.url} -rl dist`
RUN sed -i  "s/\${bdyyuap.url}/http:\/\/bd.dev-on-premises.yyuap.com/g" `grep \\${bdyyuap.url} -rl dist`
RUN sed -i  "s/\${bd.url}/http:\/\/basedoc.dev-on-premises.yyuap.com/g" `grep \\${bd.url} -rl dist`
RUN sed -i  "s/\${config.ucf.search.endpoint}/http:\/\/isearch.dev-on-premises.yyuap.com/g" `grep \\${config.ucf.search.endpoint} -rl dist`



# FROM dockerhub.yonyou.com:5000/nginx:latest
FROM ycr.yonyoucloud.com/base/nginx:1.15-alpine-perl
WORKDIR workspace
COPY --from=0  /workspace/dist /workbench/dist
COPY --from=0  /workspace/build/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /yonyoucloud-buildproduct 
COPY --from=0  /workspace/dist/iuap5-diwork-fe-manager.zip /yonyoucloud-buildproduct/iuap5-diwork-fe-manager.zip
RUN chmod 755 -R /workbench/

#### 打包器
* zip包名称：iuap5-diwork-fe-manager.zip
* 根据describe.xml执行替换
* 根据build/default.conf 来配置nginx



### iuap5-bpaas-dispatch-fe（ok）

FROM ycr.yonyoucloud.com/base/nginx:1.14-alpine
WORKDIR /dispatch
ADD ./dist /dispatch/dist/
ADD ./buildDocker/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /yonyoucloud-buildproduct 
RUN cp -r /dispatch/dist/iuap5-bpaas-dispatch-fe.zip /yonyoucloud-buildproduct/ 
RUN sed -i  's/${message.url}/http:\/\/message.dev-on-premises.yyuap.com/g' /dispatch/dist/js/chunk/1-1.js
RUN chmod -R 777 /dispatch
EXPOSE 80

#### 打包器
* zip包名称：iuap5-bpaas-dispatch-fe
* 根据describe.xml执行替换



### iuap5-prewarning-fe

FROM ycr.yonyoucloud.com/base/nginx:1.14-alpine

WORKDIR /prewarning

ADD ./dist /prewarning/dist/
ADD ./build/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /yonyoucloud-buildproduct 
RUN cp -r /prewarning/dist/iuap5-prewarning-fe.zip /yonyoucloud-buildproduct/ 
RUN sed -i  's/${message.url}/http:\/\/message.dev-on-premises.yyuap.com/g' /prewarning/dist/js/chunk/2-2.js
RUN chmod -R 777 /prewarning
EXPOSE 80

#### 打包器
* zip包名称：iuap5-prewarning-fe
* 根据describe.xml执行替换


### iuap5-message-fe

FROM ycr.yonyoucloud.com/base/nginx:1.14-alpine

WORKDIR /message

ADD ./ucf-publish /message/dist/
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
#RUN mkdir -p /yonyoucloud-buildproduct 
#RUN cp -r /prewarning/dist/iuap5-prewarning-fe.zip /yonyoucloud-buildproduct/ 
#RUN sed -i  's/${message.url}/http:\/\/message.dev-on-premises.yyuap.com/g' /prewarning/dist/js/chunk/2-2.js
RUN chmod -R 777 /message
EXPOSE 80

#### 打包器
* zip包名称：iuap5-message-fe
* 根据describe.xml执行替换











## 静态网站


### iuap5-event-fe

FROM ycr.yonyoucloud.com/base/nginx:1.14-alpine

WORKDIR /event

ADD ./dist /event/dist/
ADD ./buildDocker/default.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 777 /event
EXPOSE 80




### iuap5-log-fe

FROM ycr.yonyoucloud.com/base/nginx:1.14-alpine

WORKDIR /log-fe

ADD ./dist /log-fe/dist/

ADD ./build/default.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 777 /log-fe
EXPOSE 80



### iuap5-bpaas-international-fe

FROM ycr.yonyoucloud.com/base/nginx:1.14-alpine
WORKDIR /international
ADD ./dist /international/dist/
ADD ./build/default.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 777 /international
EXPOSE 80




### iuap5-message-platform-fe

FROM ycr.yonyoucloud.com/base/nginx:1.14-alpine-perl
WORKDIR /message
ADD dist /message/dist
ADD build/default.conf /etc/nginx/conf.d/default.conf
RUN chmod 777 -R /message
EXPOSE 80

### iuap5-billcode-fe

FROM ycr.yonyoucloud.com/base/nginx:1.14-alpine

WORKDIR /billnumber-fe
WORKDIR /billnumber-map-fe

ADD ./dist /billnumber-fe/dist/
ADD ./dist-map /billnumber-map-fe/dist/

ADD ./config/default.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 777 /billnumber-fe
RUN chmod -R 777 /billnumber-map-fe
EXPOSE 80



















