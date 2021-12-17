# nginx location中root和alias区别

+ root

  location /project {

  ​		root	/web/project

  ​		index index.html

  }

+ alias

  location /project {

  ​		alias	/web/project

  ​		index index.html

  }

区别:

当配置为root时，浏览器访问http://127.0.0.1/project/，映射路径为：/web/project/project/index.html

但配置为alias时，浏览器访问http://127.0.0.1/project/，映射路径为：/web/project/index.html

总结：

root路径为：root路径+url请求路径

alias路径为：alias路径+去除匹配后的url请求路径