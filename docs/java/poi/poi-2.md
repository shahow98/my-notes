# POI(二)

Java POI-3.17

##### 数据有效性

Excel中单元格的数据有效性验证功能通过**DataValidation**接口支持。HSSFWorkbook和XSSFWorkbook设置数据有效性的API略有差异。

+ HSSFWorkbook

    ```java
    // 数据有效性的单元格范围
    CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, firstCow, lastCow);
    // 数据有效性类型
    DVConstraint constraint = DVConstraint.create...Constraint(...);
    // 实例化数据有效性
    DataValidation dataValidation = new HSSFDataValidation(regions, constraint);
    ```

+ XSSFWorkbook

  ```java
  // 数据有效性的单元格范围
  CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, firstCow, lastCow);
XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper((XSSFSheet) sheet);
  // 数据有效性类型
  DataValidationConstraint dvConstraint = dvHelper.create...Constraint(...);
  // 实例化数据有效性
  DataValidation dataValidation = dvHelper.createValidation(dvConstraint, regions);
  ```
  
+ 作用到Sheet

  ```java
  DataValidation dataValidation = ...;// 实例化数据绑定
  sheet.addValidationData(dataValidation);
  ```

##### 日期有效性

```java
/**
* 获取日期数据有效性
* 日期固定在1900-1-1 ~ 2999-12-31
*
* @param fileType
* @param sheet
* @param firstRow
* @param lastRow
* @param firstCow
* @param lastCow
* @return
*/
public static DataValidation getDataValidationByDateValidation(String fileType, 															   Sheet sheet, 																   int firstRow,
                                                               int lastRow, 															   	   int firstCow,
                                                               int lastCow) {
	DataValidation dataValidation = null;
    
    if (Objects.nonNull(fileType) && "xls".equals(fileType)) {
    // 设置第key列的1-65535行为下拉列表
    CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, firstCow, lastCow);
    // 创建下拉列表数据
    DVConstraint constraint = DVConstraint.createDateConstraint(
DataValidationConstraint.OperatorType.BETWEEN,
"1900-1-1", "2099-12-31", "yyyy-MM-dd");
    // 绑定
   	dataValidation = new HSSFDataValidation(regions, constraint);
        
   } else if (Objects.nonNull(fileType) && "xlsx".equals(fileType)) {
   XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper((XSSFSheet) sheet);
   DataValidationConstraint dvConstraint = dvHelper.createDateConstraint(
DataValidationConstraint.OperatorType.BETWEEN, "Date(1900, 1, 1)", 
"Date(2099, 12, 31)", DEFAULT_DATE_FORMAT);
   CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, 	firstCow, lastCow);
   dataValidation = dvHelper.createValidation(dvConstraint, regions);
        
   }
    
   return dataValidation;
}
```

##### 时间有效性

```java
/**
* 获取时间数据有效性
* 日期固定在00:00:00 ~ 23:59:59
*
* @param fileType
* @param sheet
* @param firstRow
* @param lastRow
* @param firstCow
* @param lastCow
* @return
*/
public static DataValidation getDataValidationByDateValidation(String fileType, 															   Sheet sheet, 																   int firstRow,
                                                               int lastRow, 															   	   int firstCow,
                                                               int lastCow) {
	DataValidation dataValidation = null;
    
    if (Objects.nonNull(fileType) && "xls".equals(fileType)) {
    // 设置第key列的1-65535行为下拉列表
    CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, firstCow, lastCow);
    // 创建下拉列表数据
    DVConstraint constraint = DVConstraint
        .createTimeConstraint(DataValidationConstraint.OperatorType.BETWEEN,
                    "00:00:00", "23:59:59");
    // 绑定
   	dataValidation = new HSSFDataValidation(regions, constraint);
        
   } else if (Objects.nonNull(fileType) && "xlsx".equals(fileType)) {
   XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper((XSSFSheet) sheet);
   DataValidationConstraint dvConstraint = dvHelper           .createTimeConstraint(DataValidationConstraint.OperatorType.BETWEEN, "00:00:00", "23:59:59");
   CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, firstCow, lastCow);
   dataValidation = dvHelper.createValidation(dvConstraint, regions);
        
   }
    
   return dataValidation;
}
```

##### 序列有效性(下拉框)

序列数据有效性生成后会已下拉框的形式进行展示，不足是POI只能支持单选下拉框。多选下拉框功能查阅资料，需要借助vbs脚本进行实现(T_T)。

+ ExplicitList

  如果已经有明确的下拉序列就可以使用这种**ExplicitListConstraint**数据有效性。

    ```java
    /**
    * 获取下拉样式
    *
    * @param fileType
    * @param sheet
    * @param firstRow
    * @param lastRow
    * @param firstCow
    * @param lastCow
    * @param explicitList
    * @return
    */
    public static DataValidation getDataValidation(String fileType, 															 Sheet sheet, 																 int firstRow,
                                                   int lastRow, 															   	 int firstCow,
                                                   int lastCow,
                                                   String[] explicitList) {
            DataValidation dataValidation = null;
            if (Objects.nonNull(fileType) && "xls".equals(fileType)) {
                CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, firstCow, lastCow);
                DVConstraint constraint = DVConstraint.
                    createExplicitListConstraint(explicitList);
                dataValidation = new HSSFDataValidation(regions, constraint);

            } else if (Objects.nonNull(fileType) && "xlsx".equals(fileType)) {
                XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper((XSSFSheet) sheet);
                DataValidationConstraint dvConstraint = dvHelper
                        .createExplicitListConstraint(explicitList);
                CellRangeAddressList addressList = new CellRangeAddressList(firstRow, lastRow, firstCow, lastCow);
                dataValidation = dvHelper.createValidation(dvConstraint, addressList);

            }
            return dataValidation;
    }
    ```

+ FormulaList

  FormulaList是基于公式进行序列生成，比ExplicitList更加强大。联级下拉框的实现是通过该方法进行实现。

  ```java
  public static DataValidation getDataValidation(String fileType,
                                                 Sheet sheet,
                                                 int firstRow,
                                                 int lastRow,
                                                 int firstCow,
                                                 int lastCow,
                                                 String formulaList) {
          DataValidation dataValidation = null;
          if (Objects.nonNull(fileType) && "xls".equals(fileType)) {
              CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, firstCow, lastCow);
              DVConstraint constraint = DVConstraint.createFormulaListConstraint(formulaList);
              dataValidation = new HSSFDataValidation(regions, constraint);
  
          } else if (Objects.nonNull(fileType) && "xlsx".equals(fileType)) {
              XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper((XSSFSheet) sheet);
              XSSFDataValidationConstraint dvConstraint = (XSSFDataValidationConstraint) dvHelper
                      .createFormulaListConstraint(formulaList);
              CellRangeAddressList regions = new CellRangeAddressList(firstRow, lastRow, firstCow, lastCow);
              dataValidation = dvHelper.createValidation(dvConstraint, regions);
  
          }
      
          return dataValidation;
      }
  ```

  formulaList参数示例:

  'sheet1'!$A2:$A20 ：选择sheet名为sheet1的A列第2行至第20行，绑定后下拉框相应展示这些内容。

##### 其他有效性

其他有效性API也是类似上面的，只要按要求放入参数即可。

#####  数据有效性的辅助功能

+ 允许单元格为空

  ```java
  DataValidation dataValidation = ...;
  dataValidation.setEmptyCellAllowed(true);
  ```

+ 提供下拉箭头

  ```java
  DataValidation dataValidation = ...;
  dataValidation.setSuppressDropDownArrow(true);
  ```

+ 输入提示

  让绑定了数据有效性的单元格支持输入提示。该功能也属于**DataValidation**。

  ```java
  DataValidation dataValidation = ...;
  dataValidation.setShowPromptBox(true);
  dataValidation.createPromptBox(TITLE, CONTENT);//标题-TITLE，内容-CONTENT
  ```

+ 错误提示

  + 不对错误数据进行验证

      ```java
      DataValidation dataValidation = ...;
      dataValidation1.setShowErrorBox(false);
      ```

  + 对错误进行验证并提示

      错误提示有三种错误样式：停止、警告、信息。在停止样式下，错误数据将无法录入单元格。

      ```java
      DataValidation dataValidation = ...;
      dataValidation1.setShowErrorBox(true);
      dataValidation.setErrorStyle(DataValidation.ErrorStyle.STOP);//错误样式
      dataValidation.createErrorBox(TITLE, CONTENT);//标题-TITLE，内容-CONTENT
      ```

      






