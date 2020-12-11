let data = {
/*   list: [
     {
          goodsId: '10001',
          goodsSrc: 'https://wm.source.wiimedia.cn/hemeiyoujia/taocan1.jpg',
          goodsTitle: '和美佑家大健康(Health 100) 体验卡',
          // goodsSubtitle: '关爱父母精细套餐',
          goodsPrice: '25.8',
          goodsNum: '1',
      },
      {
          goodsId: '10002',
          goodsSrc: 'https://wm.source.wiimedia.cn/hemeiyoujia/taocan1.jpg',
          goodsTitle: '和美佑家大健康(Health 100) 体验卡',
          // goodsSubtitle: '关爱父母精细套餐',
          goodsPrice: '88.8',
          goodsNum: '1',
      },
      {
          goodsId: '10003',
          goodsSrc: 'https://wm.source.wiimedia.cn/hemeiyoujia/taocan1.jpg',
          goodsTitle: '和美佑家大健康(Health 100) 体验卡',
          // goodsSubtitle: '关爱父母精细套餐',
          goodsPrice: '100',
          goodsNum: '1',
      },
      {
          goodsId: '10004',
          goodsSrc: 'https://wm.source.wiimedia.cn/hemeiyoujia/taocan1.jpg',
          goodsTitle: '和美佑家大健康(Health 100) 体验卡',
          // goodsSubtitle: '关爱父母精细套餐',
          goodsPrice: '30.5',
          goodsNum: '1',
      }
    ],*/

    // 数据缓存
    list: JSON.parse(localStorage.getItem('goods')|| '{"list":[]}').list ,
}

export default function (state = data, action) {
    // 打印action
    // console.log('action', action)

    switch (action.type) {
        // 加入购物车
        case 'addGoods':
            // 点击加入购物车，把商品信息，保存到 store 中的 car 上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

            // 假设 在购物车中，没有找到对应的商品

            let List = state.list

            let flag = false

            List.some(item => {
                if (item.goodsId == action.data.goodsId) {
                    item.goodsNum += parseInt(action.data.goodsNum)
                    flag = true
                    return true
                }
            })

            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                List.push(action.data)
            }

            localStorage.setItem('goods', JSON.stringify({list: [...List]}))

            return Object.assign({}, state, {list: [...List]})

        // 选中商品，如果当前商品数量为0 那么选中之后变为1
        case 'checkGoods':
            let checkList = state.list
            checkList.map((item, index) => {
                if (item.goodsId == action.data){
                    item.check = !item.check
                    item.goodsNum == '0' ? item.goodsNum = '1' : ''
                }
            })

            localStorage.setItem('goods', JSON.stringify({list: [...checkList]}))

            return Object.assign({}, state, {list: [...checkList]})

        // 切换数量
        case 'changeGoodsNum':
            let changeList = state.list
            changeList.map((item, index) => {
                if (item.goodsId == action.data.goodsId) {
                    action.data.status == 'add' ? item.goodsNum++ : item.goodsNum--
                    item.goodsNum == '0' ? item.check = false : '' // 如果当前商品选中并且减到0，自动取消选择
                }
            })


            localStorage.setItem('goods', JSON.stringify({list: [...changeList]}))


            return Object.assign({}, state, {list: [...changeList]})


        // 全选
        case 'checkAllGoods':
            let checkAllList = state.list
            checkAllList.map((item, index) => {
                item.check = !action.data
            })

            localStorage.setItem('goods', JSON.stringify({list: [...checkAllList]}))


            return Object.assign({}, state, {list: [...checkAllList]})


        // 删除一个商品
        case 'delGoods':
            return ;

        // 删除全部商品
        case 'delAllGoods':
            localStorage.setItem('goods', JSON.stringify({list: []}))

            return Object.assign({}, state, {list: []})


        default:
            // 默认给商品添加一个check 字段、默认所有商品选中
            let list = state.list
            list.map((item, index) => {
                item.check = true
            })

            localStorage.setItem('goods', JSON.stringify({list: [...list]}))

            return Object.assign({}, state, {list: [...list]})
    }
}