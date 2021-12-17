module.exports = {
    title: 'NOTES',
    description: 'shahow\'s notes',
    host: '127.0.0.1',
    port: 8080,
    themeConfig: {
        logo: '/imgs/logo.jpg',
        sidebar:{
            '/java/spring/':[
                '',
                'value'
            ],
            'java/poi/': [
                '',
                'poi-1',
                'poi-2'
            ],
            '/java/': [
                '',
                'spring/'
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