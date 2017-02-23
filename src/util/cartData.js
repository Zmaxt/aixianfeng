export default{
    /*
        获取购物车数据，并解析成对象
     */
    getCartData(){
        if(sessionStorage.cartData)
            return JSON.parse(sessionStorage.cartData);
        return {};
    },
    /*
        将购物车数据转为字符串，存到sessionStorage
     */
    setCartData(cartData){
        if(!cartData)
            return;
        sessionStorage.cartData = JSON.stringify(cartData);
    }
}