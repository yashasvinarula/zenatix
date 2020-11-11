export const uuid = () => {
    const maxLen = 10;
    const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let ans = '';
    for(let i=0;i<maxLen;i++){
        ans += values[Math.floor(Math.random()*values.length)]
    }
    return ans
}
