# POI(一)

Java POI-3.17

#### 单元格相关

+ **文本格式**

![image-20200726172526341](C:\Users\shahow\AppData\Roaming\Typora\typora-user-images\image-20200726172526341.png)

通常，Excel的单元格格式能够根据输入的值进行智能转换（其实没那么智能），所以更多的    是在智能转换不满足需求时，需要手动规范单元格格式，即自定义格式。

**CellStyle**通过**void setDataFormat(short fmt);**方法设置单元格自定义格式。但由于参数是short类型，所以需要通过**DataFormat**提供的**short getFormat(String format);**方法进行转换，该方法format参数的值只要传入如上图中Excel支持的类型即可。

示例：

```java
    /**
     * 设置单元格自定义格式
     * @param workbook 工作薄
     * @param format 自定义格式
     * @return
     */
    public static CellStyle getCellStyleDataFormat(Workbook workbook, String format) {
    	CellStyle cellStyle = workbook.createCellStyle();
        DataFormat dataFormat = workbook.createDataFormat();
        cellStyle.setDataFormat(dataFormat.getFormat(format));
        return cellStyle;
    }
```

**!**单元格文本格式是弱约束（不知道是不是这么定义），如果输入的值符合或者能够被转换为设置的格式（数字、日期、货币等），那么Excel将按设置的单元格格式进行展示。否则，如果数据不能匹配设置的格式，那么格式将以"文本"格式进行展示，即单元格不做任何处理直接展示传入的值。如果要做正确性验证，通过单元格数据有效性**DVConstraint**绑定实现（先挖个坑）。

+ **边框**

**CellStyle**支持设置单元格的上下左右边框样式。**BorderStyle**枚举中定义了边框的类型。

如下：


```java
    /** 
	 * 边框设置
     * @param workbook
     * @return
     */
    public static CellStyle getCellStyleBorder(Workbook workbook) {
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        return cellStyle;
    }
```

+ **字体**

**Font**接口提供了一系列的方法设置字体、大小、颜色、粗体等字体样式。而**CellStyle**接口则提供了**void setFont(Font font);**方法用于设置单元格字体。

如下:

```java
    /**
     * 设置单元格字体
     * @param workbook 工作薄
     * @return
     */
public static CellStyle getCellStyleFont(Workbook workbook) {
        CellStyle cellStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
    	/*
    	//设置字体样式
        font.setFontName("Times New Roman"); //设置字体类型
        font.setFontHeightInPoints((short) 10); //设置字体大小
        font.setBold(true);//字体加粗
        font.setColor(Font.COLOR_RED);//红色
    	*/
    	//设置单元格字体样式
        cellStyle.setFont(font);
        return cellStyle;
    }
```

* **填充**

填充同样可以通过**CellStyle**直接设置。通过**void setFillPattern(FillPatternType fp);**设置填充的样式，通过**void setFillForegroundColor(short bg);**设置填充的颜色。

如下：

```java
    /** 
	 * 填充设置
     * @param workbook
     * @return
     */
    public static CellStyle getCellStyleBorder(Workbook workbook) {
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellStyle.setFillForegroundColor(IndexedColors.ORANGE.getIndex());
        return cellStyle;
    }
```

* **CellStyle**样式覆盖

**CellStyle**使用不当可能会出现样式覆盖的问题。

如下：

```java
public void demo1(CellStyle cellStyle, Row row) {
    	/*
    	1、假设这里对cellStyle设置了单元格样式
    	*/
    	Cell cell1 = row.createCell(0);//在row行1列创建一个单元格
    	cell1.setCellStyle(cellStyle);//设置单元格样式
    	/*
    	2、假设这里对cellStyle单元格样式进行了修改
    	*/
    	Cell cell2 = row.createCell(1);//在row行2列创建一个单元格
    	cell2.setCellStyle(cellStyle);//设置单元格样式
    }
```

**CellStyle**对象实例后，作用域在整个**Workbook**对象，而不是**Cell**独有。所以，如果多个**Cell**对象需要不同的样式风格，那么**CellStyle**对象同样需要设置多个（Poi中规定了最大数量为4000）。否则，被修改的**CellStyle**对象同样会作用到Workbook中所有setCellStyle该cellStyle的**Cell**对象中，导致之前设置的单元格风格被覆盖。

+ 单元格样式克隆

**CellStyle**提供了**void cloneStyleFrom(CellStyle source);**方法用于克隆样式。通过样式继承的思路，不仅可以提高CellStyle对象的利用率，还可以减少很多的代码量。

如下:

```java
    /**
     * 克隆原CellStyle,防止之前设置的样式被覆盖
     * @param workbook
     * @param source
     * @return
     */
    public static CellStyle cloneCellStyleFrom(Workbook workbook, CellStyle source) {
        CellStyle dest = workbook.createCellStyle();
        dest.cloneStyleFrom(source);
        /*
        这里可以在克隆样式的基础上做一些样式修改
        */
        return dest;
    }
```

+ 按列设置单元格样式

通常单元格样式是按列进行样式设置的，所以**Sheet**提供了一个**void setDefaultColumnStyle(int column, CellStyle style);**方法进行按列为单位设置单元格样式。

如下：

```java
    public void demo2(Sheet sheet, int colIndex, CellStyle cellStyle) {
        sheet.setDefaultColumnStyle(colIndex, cellStyle);
    }
```

