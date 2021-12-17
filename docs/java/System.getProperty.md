# System.getProperty（String key）

JAVA 文档：https://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html

**System.getProperty（String key）**的key含义：

file.separator：分隔文件路径各部分的字符。在UNIX上是“ `/`”，在Windows 上是“`\` ” 。

java.class.path：用于查找包含类文件的目录和JAR归档文件的路径。类路径的元素由`path.separator`属性中指定的特定于平台的字符分隔。

java.home：Java Runtime Environment（JRE）的安装目录。

java.vendor：JRE供应商名称。

java.vendor.url：JRE供应商URL

java.version：JRE版本号。

line.separator：操作系统用于分隔文本文件中各行的顺序。

os.arch：操作系统架构。

os.name：操作系统名称。

os.version：系统版本。

path.separator：用于的路径分隔符 `java.class.path`。

user.dir：用户工作目录（项目路径）。

user.home：用户主目录。

user.name：用户帐号名称。