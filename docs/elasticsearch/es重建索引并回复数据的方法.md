# ES修改Mappings的一种方法

+ 获得index的mappings、settings配置

  ```
  GET index
  ```

+ 创建index模板

  es提供的索引模板功能，index创建后，有新数据录入时，会自动匹配模板创建index

  ```shell
  PUT _template/tmp_20200703  // 模板名称
  {
    "index_patterns": ["index*"],  // 模板匹配
    "settings":{  // 一般复制原index的settings即可，或根据需要重新配置
      "index" : {
          "number_of_shards" : "5",
          "number_of_replicas" : "1"
        }
    },
    "mappings": {  // 1、复制原index的mappings,替换修改的propertie
      "doc" : {
          "properties" : {
          ... ...
          }
        }
     }
  }
  ```

+ index备份

  这是高版本的es提供的API，低版本好像用的是bulk

  ```shell
  POST _reindex
  {
    "source": {
      "index": "index"
    },
    "dest": {
      "index": "index_bak_20200703"
    }
  }
  ```

  ！ 这里index_bak_20200703会自动使用索引模板，所以source和dest的mappings应该是不一致的，这可能会导致数据在reindex时出现不匹配的问题，有点麻烦Orz。我是因为需要修改一个date类型的属性，给这个属性补上format(源index里漏了这个属性的format，然后程序这里规范了yyyy-MM-dd HH:mm:ss正好是es不支持需要format的)，发现这个问题，好在format可以用"||"这个来兼容旧的日期format，添加新日期format。

+ index导入数据

  ```shell
  POST _reindex
  {
    "source": {
      "index": "index_bak_20200703"
    },
    "dest": {
      "index": "index"
    }
  }
  ```

  

