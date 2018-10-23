var popupInfoTimeout;

function serialize( obj ) {
    return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
}

function getEventInfo () {
    var nameEvent = $("#nameEventInput").val();
    var date = $("#dateInput").val();
    var time = $("#timeInput").val();
    var fulldate = date + ' '  + time;
    return {
        eventName: nameEvent,
        alldate: fulldate
    }
}

function diffUserTimeToNow (alldate) {
    var userTime = moment(alldate,"YYYY-MM-DD HH:mm");
    return moment.duration(userTime.diff(moment()))._data;
    
}


$(".buttonCounting").on("click", function() {
    var params = serialize(getEventInfo());
    window.location.href = window.location.href + params;
});

function prepareShareButton() {
    $("#shareButton").attr("data-clipboard-text", window.location.href);
    var clipboard = new ClipboardJS("#shareButton");
    clipboard.on('success', function() {
        clearTimeout(popupInfoTimeout);
        $('.popup-info').addClass("animated slideInDown").fadeIn();
        popupInfoTimeout = setTimeout(function(){
            $('.popup-info')
                .removeClass("animated slideInDown")
                .addClass("animated slideOutUp")
                .fadeOut(function(){
                    $(this).attr("class", 'popup-info');
                });
        }, 3000);
    });
}

$(document).ready(function(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var nameOfEvent = url.searchParams.get("eventName");
    var dateOfEvent = url.searchParams.get("alldate");
    if(nameOfEvent) {
        prepareShareButton();
        setInterval(function(){
            $("#timeCountdown").css({"display":"grid"});
            var d = diffUserTimeToNow(dateOfEvent);
            $("#nameOfEvent").text(`To ${nameOfEvent} remain`);
            console.log(d);
            if(d.years) {
                //$("#years").text(d.years);
                //$("#yearCountdownPlace").css({"display":"flex"}); 
            }else {
                //$("#yearCountdownPlace").remove();
                //$("#yearClone").remove();
                //$("#timeCountdown").css({"width":"700px"})
            }
            if(d.months) {
                //$("#months").text(d.months);
                //$("#monthCountdownPlace").css({"display":"flex"});
                //$("#monthClone").css({"display":"flex"})  
            }else {
                //$("#monthCountdownPlace").remove();
                //$("#monthClone").hide();
            }
            if(d.days) {
                //$("#days").text(d.days);
                //$("#dayCountdownPlace").css({"display":"flex"});
                //$("#dayClone").css({"display":"flex"})  
            }else {
               // $("#dayCountdownPlace").remove();
               // $("#dayClone").hide();
                //$("#timeCountdown").css({"width":"500px"})
            }
            $("#years").text(d.years);
            $("#months").text(d.months);
            $("#days").text(d.days);
            $("#hours").text(`${d.hours}`);
            $("#minutes").text(`${d.minutes}`);
            $("#seconds").text(`${d.seconds}`);
        }, 1000);
        $("#mainCountingContent").css('display','flex');
        $(".mainContent").hide();
    }
});