module.exports = {
    base: '/notes/',
    title: 'NOTES',
    description: 'shahow\'s notes',
    host: '127.0.0.1',
    port: 8080,
    themeConfig: {
        logo: '/imgs/logo.jpg',
        sidebar:{
            '/java/JAXB/': [
                '',
                'JAXB添加CDATA'
            ],
            '/java/spring/':[
                '',
                'value'
            ],
            '/java/poi/': [
                '',
                'poi-1',
                'poi-2'
            ],
            '/java/': [
                '',
                'JAXB/',
                'spring/',
                'poi/',
                '异常是否会影响代码运行',
                '注解继承性',
                'System.getProperty',
                '正则需要转义的特殊字符'
            ],
            '/javascript/vue/': [
                '',
                '通过DOM元素查询VUE子组件实例'
            ],
            '/javascript/': [
                '',
                'vue/'
            ],
            '/elasticsearch/': [
                '',
                'es重建索引并回复数据的方法'
            ],
            '/nginx/': [
                '',
                'nginx安装'
            ],
            '/opentsdb/': [
                '',
                '数据添加和查询'
            ],
            '/': [
                '',
                'java/',
                'javascript/',
                'elasticsearch/',
                'nginx/',
                'opentsdb/'
            ]
        }
    }
}