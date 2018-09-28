(function ($) {
    this.RangeHourdayPicker = function () {
        var defaults = {
            id : '',
            days : [0,1,2,3,4,5,6],
            day_names : ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'],
            hours : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            debug : false,
            callback : function () {

            }
        };

        this.values = {};

        if(arguments[0] && typeof arguments[0] === "object"){
            this.options = extendDefaults(defaults,arguments[0])
        }else{
            this.options = extendDefaults(defaults,{});
        }

        var $PARENT = this;
        var $containers = $('.rangehourdaypicker'+this.options.id);

        if($containers.find('.rhdp-day').length===0) {
            $.each($containers, function (i, o) {
                $($PARENT.options.days).each(function (a, day) {
                    var $day = "<div class='rhdp-day' data-id='" + day + "'></div>";
                    $(o).append($day);
                    $(o).find('.rhdp-day:nth-child(' + (a + 1) + ')').append("<div class='rhdp-day-name' data-id='" + $PARENT.options.days[a] + "'>" + $PARENT.options.day_names[a] + "</div>");
                    $($PARENT.options.hours).each(function (b, hour) {
                        $(o).find('.rhdp-day:nth-child(' + (a + 1) + ')').append("<div class='rhdp-hour' data-id='" + hour + "'>" + hour + "</div>");
                    });
                });
            });
        }

        read.call($containers.find('.rhdp-day>.rhdp-day-name'),$PARENT);

        $containers.on('click','.rhdp-day>.rhdp-day-name',function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).siblings('.rhdp-hour').toggleClass('active');
            read.call(this,$PARENT);
        }).on('click','.rhdp-day>.rhdp-hour',function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
            read.call(this,$PARENT);
        }).on('update.rhdp','.rhdp-day>.rhdp-day-name',function (e) {
            e.stopPropagation();
            read.call(this,$PARENT);
        });
    };

    function read($PARENT) {
        var $row = $(this).parent();
        var $rowId = $row.data('id');
        var $rangesX = $row.find('.rhdp-hour:not(.active)').next('.active');
        var $rangesY = $row.find('.rhdp-hour:not(.active)').prev('.active');

        $PARENT.values[$rowId] = [];
        if($rangesX.length===0 && $rangesY.length===1){
            $PARENT.values[$rowId].push({
                '_day' : $rowId,
                '_start' : 0,
                '_end' : $($rangesY[0]).data('id')+1
            });
        }else if($rangesY.length===0 && $rangesX.length===1){
            $PARENT.values[$rowId].push({
                '_day' : $rowId,
                '_start' : $($rangesX[0]).data('id'),
                '_end' : 24
            });
        }else if($rangesX.length===0 && $rangesY.length===0){
            if($row.find('.active').length===0){
                delete $PARENT.values[$rowId];
            }else{
                $PARENT.values[$rowId].push({
                    '_day' : $rowId,
                    '_start' : 0,
                    '_end' : 24
                });
            }
        }else{
            var main,sub,maxmin;
            if($rangesX.length<$rangesY.length){
                main = $rangesY;
                sub = $rangesX;
                maxmin = 0;
            }else{
                main = $rangesX;
                sub = $rangesY;
                maxmin = 24;
            }
            $(main).each(function (x,o) {
                if($(o).data('id')>$(sub[x]).data('id')){
                    if(x===0){
                        $PARENT.values[$rowId].push({
                            '_day' : $rowId,
                            '_start' : 0,
                            '_end' : $(sub[x]).data('id')+1
                        });
                    }
                    $PARENT.values[$rowId].push({
                        '_day' : $rowId,
                        '_start' : $(o).data('id'),
                        '_end' : $(sub[x+1]).data('id')+1||24
                    });
                }else if($(o).data('id')<$(sub[x]).data('id')){
                    if($rangesX.length<$rangesY.length) {
                        $PARENT.values[$rowId].push({
                            '_day': $rowId,
                            '_start': $(sub[x-1]).data('id')|| 0,
                            '_end': ($(o).data('id') + 1)
                        });
                    }else{
                        $PARENT.values[$rowId].push({
                            '_day': $rowId,
                            '_start': $(o).data('id'),
                            '_end': ($(sub[x]).data('id') + 1) || 24
                        });
                    }
                }else{
                    if($rangesX.length<$rangesY.length){
                        $PARENT.values[$rowId].push({
                            '_day' : $rowId,
                            '_start' : $(sub[x-1]).data('id'),
                            '_end' : $(o).data('id')+1
                        });
                    }else if($rangesX.length>$rangesY.length){
                        $PARENT.values[$rowId].push({
                            '_day' : $rowId,
                            '_start' : $(o).data('id'),
                            '_end' : ($(sub[x]).data('id')+1)||maxmin
                        });
                    }else{
                        $PARENT.values[$rowId].push({
                            '_day' : $rowId,
                            '_start' : $(o).data('id'),
                            '_end' : $(o).data('id')+1
                        });
                    }
                }
            });
        }
        if($PARENT.options.debug)console.log($PARENT.values);
        $PARENT.options.callback($PARENT.values);
    }

    function extendDefaults(source,properties) {
        var property;
        for(property in properties){
            if(properties.hasOwnProperty(property)){
                source[property] = properties[property];
            }
        }
        return source;
    }

    RangeHourdayPicker.prototype.getValues = function () {
        return this.values;
    };

    RangeHourdayPicker.prototype.setValues = function (values) {
        var $PARENT = this;
        var $containers = $('.rangehourdaypicker'+this.options.id);
        this.values = {};
        $containers.find('.rhdp-hour').removeClass('active');
        $.each(values,function (k,o) {
            $containers.find('.rhdp-day[data-id='+o._day+']')
                .find('.rhdp-hour[data-id='+o._start+']')
                .addClass('active')
                .nextUntil('.rhdp-hour[data-id='+o._end+']')
                .addClass('active');
            read.call($containers.find('.rhdp-day-name[data-id='+o._day+']'),$PARENT)
        });
    };
}(jQuery));