function generateMap(p) {
    var placeName = getPlaceName(p.name);
    if (!placeName) return console.log('该地区数据缺失');
    var map = typeof p.map === 'string' ? echarts.init(document.getElementById(p.map)) : p.map;
    // 配置
    var optionMap = {
        backgroundColor: '#FFFFFF',
        title: {
            text: p.title ? p.title : p.name,
            subtext: '',
            x: 'center',
            y: ''
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            show: true,
            x: 'left',
            y: 'center',
            splitList: [{
                    start: 500,
                    end: 600
                }, {
                    start: 400,
                    end: 500
                },
                {
                    start: 300,
                    end: 400
                }, {
                    start: 200,
                    end: 300
                },
                {
                    start: 100,
                    end: 200
                }, {
                    start: 0,
                    end: 100
                },
            ],
            color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
        },
        series: [{
            name: '投资数量',
            type: 'map',
            mapType: 'HK',
            roam: true,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false
                }
            },
            data: p.data ? p.data : []
        }],

    };
    // 覆盖配置项
    if (p.option) $.extend(true, optionMap, p.option);
    $.get((p.json?p.json:'../../map_json/') + placeName + '.json', function (geoJson) {
        // 假数据
        var mapData = [];
        $.each(geoJson.features, function (index, item) {
            mapData.push({
                name: item.properties.name,
                value: randomData()
            });
        });
        optionMap.series[0].data = mapData;

        map.hideLoading();
        echarts.registerMap('HK', geoJson);
        // 渲染地图
        map.setOption(optionMap, true);
        // 执行回调
        if (p.callback && typeof p.callback === 'function') p.callback();
    });
    // 汉字转拼音
    function getPlaceName(placeName) {
        switch (placeName) {
            case '中国':
                return 'china';
                break;
            case '北京':
                return 'beijing';
                break;
            case '天津':
                return 'tianjin';
                break;
            case '上海':
                return 'shanghai';
                break;
            case '重庆':
                return 'chongqing';
                break;
            case '河北':
                return 'hebei';
                break;
            case '山西':
                return 'shan1xi';
                break;
            case '辽宁':
                return 'liaoning';
                break;
            case '吉林':
                return 'jilin';
                break;
            case '黑龙江':
                return 'heilongjiang';
                break;
            case '江苏':
                return 'jiangsu';
                break;
            case '浙江':
                return 'zhejiang';
                break;
            case '安徽':
                return 'anhui';
                break;
            case '福建':
                return 'fujian';
                break;
            case '江西':
                return 'jiangxi';
                break;
            case '山东':
                return 'shandong';
                break;
            case '河南':
                return 'henan';
                break;
            case '湖北':
                return 'hubei';
                break;
            case '湖南':
                return 'hunan';
                break;
            case '广东':
                return 'guangdong';
                break;
            case '海南':
                return 'hainan';
                break;
            case '四川':
                return 'sichuan';
                break;
            case '贵州':
                return 'guizhou';
                break;
            case '云南':
                return 'yunnan';
                break;
            case '陕西':
                return 'shan3xi';
                break;
            case '甘肃':
                return 'gansu';
                break;
            case '青海':
                return 'qinghai';
                break;
            case '台湾':
                return 'taiwan';
                break;
            case '内蒙古':
                return 'neimenggu';
                break;
            case '广西':
                return 'guangxi';
                break;
            case '西藏':
                return 'xizang';
                break;
            case '宁夏':
                return 'ningxia';
                break;
            case '新疆':
                return 'xinjiang';
                break;
            default:
                return null;
        }
    }
    // 生成随机数（0~600）
    function randomData() {
        return Math.round(Math.random() * 600);
    }
};