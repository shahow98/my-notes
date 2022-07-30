# JAXB添加<!CDATA[[]]>标签

背景：使用JAXB方式输出Java Bean时，默认不加<!CDATA[[]]>，但个别属性要求加上<!CDATA[[]]>标签

#### 解决方案

1. 对需要加CDATA的属性加上@XmlJavaTypeAdapter注解

2. 编写自定义XmlAdapter适配器，分别实现`marshal`和`unmarshal`方法

   ```java
   public class CDataAdapter extends XmlAdapter<String, String> {
       @Override
       public String marshal(String v) {
           return "<![CDATA[" + v + "]]>";
       }
   
       @Override
       public String unmarshal(String v) {
           boolean isCData = v.matches("<!\\[CDATA\\[.*\\]\\]>");
           return isCData ? v.substring("<![CDATA[".length(), v.length() - "]]>".length()) : v;
       }
   }
   ```

3. 配置对应的属性

   ```java
   @Data
   @XmlAccessorType(XmlAccessType.NONE)
   @XmlRootElement(name = "bean")
   public class Bean {
   	@XmlJavaTypeAdapter(CDataAdapter.class)
       @XmlElement(name = "test")
       private String test;
   }
   ```