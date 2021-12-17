# @value

+ @value用法

  通过@value注入application.properties(yml)的配置项值

  1、在application.properties中写入要注入的属性值

  ```properties
  img-path=/resources/img
  ```

  2、注入值

  ```java
  @Value("${img-path}")
  private String imgPath;
  ```

+ @value默认值

  为注入的属性设置默认值，在@value找不到属性值时，将使用该默认值

  ```java
  @Value("${img-path:/resources/img}")
  private String imgPath;
  ```

+ @propertysource指定配置文件

  1、在项目中创建path.properties

  ```properties
  img-path=/resources/img
  ```

  2、从指定的配置文件中注入属性值

  ```java
  @PropertySource(value = {"classpath:path.properties"})
  public class Path{
      @Value("${img-path:/resources/img}")
  	private String imgPath;
  }
  ```

  