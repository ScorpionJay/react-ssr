/**
 * format
 */
const format = {
    // format secondes
    formatSeconds: (value) => {
        var theTime = parseInt(value | 0);// 秒 
        var theTime1 = 0;// 分 
        var theTime2 = 0;// 小时 
        // alert(theTime); 
        if (theTime >= 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            // alert(theTime1+"-"+theTime); 
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        var result = parseInt(theTime);
        result = (result >= 10) ? "" + parseInt(theTime) : "0" + parseInt(theTime);
        if (theTime1 > 0) {
            var m = parseInt(theTime1)
            m = m >= 10 ? "" + m : "0" + m;
            result = "" + m + ":" + result;
        } else {
            result = '00:' + result
        }

        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + ":" + result;
        }

        return result;
    }
}

export default format