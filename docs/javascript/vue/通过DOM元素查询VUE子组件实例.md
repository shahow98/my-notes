# 通过DOM元素查询VUE子组件实例

```javascript
function findElByVueComponentTree(vm, el) {
    const results = [];
    const findStack = [vm];
    while (findStack.length) {
        let findPoint = findStack.shift();
        if (findPoint.$el == el) {
            results.push(findPoint);
        }
        if (findPoint.$children.length) {
            findStack.push(...findPoint.$children);
        }
    }
    return results;
}
```

```java
function findMethodByVueComponentTree(vm, method) {
    const results = [];
    const findStack = [vm];
    while (findStack.length) {
        let findPoint = findStack.shift();
        if (findPoint[method] instanceof Function) {
            results.push(findPoint);
        }
        if (findPoint.$children.length) {
            findStack.push(...findPoint.$children);
        }
    }
    return results;
}
```

