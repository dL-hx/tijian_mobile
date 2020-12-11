let data = {
    // 数据缓存
    code:sessionStorage.getItem('code')||''
}

export default function (state = data, action) {
    // 打印action
    console.log('action', action)

    switch (action.type) {
        case 'setWxCode':
            sessionStorage.setItem('code', action.data)

            return {
                ...state, // 旧值
                code: action.data // 新值
            };

        default:
            return {
                ...state
            };
    }
}