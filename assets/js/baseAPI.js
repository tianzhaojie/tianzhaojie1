const baseUrl = "http://www.liulongbin.top:3007"
$.ajaxPrefilter(option => {
    //option 就是ajax对象里面东西
    option.url = baseUrl + option.url
})