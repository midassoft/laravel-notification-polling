

function ajax(param) {
    let vars;

    if(param.route) {

    	if(!param.div)
            param.div = "div"+param.request_id;

        if(!param.method)
            param.method = "GET";

        vars = [];
		if(param.form_id) {
            vars = $('#' + param.form_id + '').serialize();
		}
        if(!param.success_callback) {
            param.success_callback = null;
		}

		if(param.modal) {

            param.div = 'modal_base_div';

            $('#'+param.div).html('');

            if($('#myModalBase').is(":hidden")) {
                $("#modal_base").click();
                $("#accion_btn").unbind("click");
			}

            if(param.modal_title) {
                $('#myModalBase .modal-header').show();
                $('#modal_titulo').text(param.modal_title);
			} else {
                $('#myModalBase .modal-header').hide();
			}
		}

		$.ajax({
			type: param.method,
			url: param.route,
			data: vars,
			success: function(response, status, xhr	) {

                if(param.success_callback) {
                    if(typeof param.success_callback === "function") {
                        return param.success_callback(response);
                    }
                }

				if(response.cod ===1) {

                    for (var error in response.errors) {
                        renderAlert({type:"danger",subject:""+error,message:""+response.errors[error], render_in:"#flash_messages_"+param.request_id});
                    }

				} else {
                    $('#' + param.div + '').html(response);
				}
			}
		});

    } else {
        return false;
    }

}

function renderAlert(param)
{
	if(!param.type)
        param.type = 'success';

	var html ='';
	html = '<div class="alert alert-'+param.type+'">\n' +
        '  <strong>'+param.subject+'</strong> '+ param.message +'\n' +
        '</div>';

	if(param.render_in)
        $(param.render_in).append(html);

	return html;
}


function CargarAjax2(arch, vares, tipo, div)
{
	$('#labelcargando').show();

	$.ajax({
		type: tipo,
		url: arch,
		data: vares,
		success: function (data) {

			if (div == '') {
				$('#div_apps_carga_ajax').html(data);
			} else {
				$('#' + div + '').html(data);
			}
			
			$('#labelcargando').hide();
			
			try {
				$('input, textarea').placeholder();
				/* ---------- Auto Height texarea ---------- */
				$('textarea').autosize();
				jQuery('a').tooltip();
			} catch (Execption) {}
		}
	});
}
// -----------------------------------------------------
$(window).load( function () {

// 	$('#div_apps_carga_ajax').after('<div id=\"apps_cargar_ajax\" style=\"display:none\"><center><img src=\"images/ajax-loading.gif\" hspace=\"4\" vspace=\"4\" align=\"absmiddle\" /><br>Cargando...</center></div>');
});
// -----------------------------------------------------

function CargarAjax2_form(arch, form1, div1) {

	vares = $('#' + form1 + '').serialize();

	$('#apps_cargar_ajax').fadeIn();
	$.ajax({
		type: 'POST',
		url: arch,
		data: vares,
		success: function (data) {
			if (div1 == '') {
				$('#div_apps_carga_ajax').html(data);
			} else {
				$('#' + div1 + '').html(data);
			}
			$('#apps_cargar_ajax').fadeOut();
		}
	});
	
}

// ------------------------------------------------------
// ALERT DE RESPUESTAS A LLAMADAS AJAX
// ------------------------------------------------------
/*
function AlertRespuestaOK(text) {
	var text = '<div class=\"alert_respuesta_ok\">' + text + '</div>';

	$('#alert_respuesta').html('' + text + '');
	$('#alert_respuesta').show();
	setTimeout('$(\"#alert_respuesta\").fadeOut(2000)', 5000);

}
*/
function AlertRespuestaOK(text) {
	sweetAlert("¡Listo!",text, "success");
}

function AlertRespuestaError(text) {
	sweetAlert("¡Error!",text, "error");
}



function notificaciones() {
	// ACTUALIZACIONES...
	$.ajax({
		url: 'AJAX/Actualizaciones.php',
		success: function(data1) {
			$("#div_actualizaciones").html(data1);
			//alert(a);
			setTimeout(notificaciones, 40000);
		}
	});
	//$("#labelcargando").hide();

}

$(document).ready(function() {

	// var funcion_id = $("#funcion_id").val();
    //
	// if (funcion_id !== '3') {
	// 	setTimeout(function() {
	// 		notificaciones();
	// 	}, 20000);
	// }


});


/**
 * Elimina los valores que evaluan
 * a falso dentro de un array
 *
 * @param  Array actual
 * @return Array
 */
function cleanArray(actual) {
    var newArray = new Array();
    for( var i = 0, j = actual.length; i < j; i++ ) {
        if ( actual[ i ] )
            newArray.push( actual[ i ] );
    }
    return newArray;
}

/**
 * Convierte un "datetime" de formato
 * de base de datos a formato "español"
 *
 * @param  string date
 * @return string
 */
function reformatDateTime(dateTime) {
	dateTime = new Date(dateTime);
	return dateTime.getDay() +"/"+ dateTime.getMonth() +"/"+ dateTime.getFullYear() +" "+ convertHoursToTwelveFormat(dateTime.getHours()) +":"+ dateTime.getMinutes() +":"+ dateTime.getSeconds() + " " + getMeridianFromHour(dateTime.getHours());
}

function convertHoursToTwelveFormat(hour) {
    if (hour > 12)
        return hour - 12;
    else
        return hour;
}

function getMeridianFromHour(hour) {
    if (hour >= 12)
        return 'PM';
    else
        return 'AM';
}

/**
 * Obtiene la hora de un "datetime"
 *
 * @param  string dateTime
 * @return string
 */
function getTimeFromDateTime(dateTime) {
	dateTime = new Date(dateTime);
	return convertHoursToTwelveFormat(dateTime.getHours()) +":"+ dateTime.getMinutes() +":"+ dateTime.getSeconds() + " " + getMeridianFromHour(dateTime.getHours());
}

/**
 * Allows you use parameters for
 * format your strings
 * 
 */
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
};
/******************************** Mascara **************************************/ 

/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2014 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.0
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(a.length<o.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a)},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});