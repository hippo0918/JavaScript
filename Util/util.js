/**
 * 工具方法
 */

// 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e) {
	var ev = e || window.event;
	// 获取event对象
	var obj = ev.target || ev.srcElement;
	// 获取事件源
	var t = obj.type || obj.getAttribute('type');
	// 获取事件源类型
	// 获取作为判断条件的事件类型
	var vReadOnly = obj.readOnly;
	var vDisabled = obj.disabled;
	// 处理undefined值情况
	vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	vDisabled = (vDisabled == undefined) ? true : vDisabled;
	// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	// 并且readOnly属性为true或disabled属性为true的，则退格键失效
	var flag1 = ev.keyCode == 8
			&& (t == "password" || t == "text" || t == "textarea")
			&& (vReadOnly == true || vDisabled == true);
	// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = ev.keyCode == 8 && t != "password" && t != "text"
			&& t != "textarea";
	// 判断
	if (flag2 || flag1)
		return false;
}
// 禁止退格键 作用于Firefox、Opera
document.onkeypress = banBackSpace;
// 禁止退格键 作用于IE、Chrome
document.onkeydown = banBackSpace;
$(function() {
	$.extend(
					$.fn.validatebox.defaults.rules,
					{
						minLength : { // 判断最小长度
							validator : function(value, param) {
								return value.length >= param[0];
							},
							message : '最少输入 {0} 个字符。'
						},
						phone : {// 验证电话号码
							validator : function(value) {
								return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i
										.test(value);
							},
							message : '格式不正确,请使用下面格式:020-88888888'
						},
						mobile : {// 验证手机号码
							validator : function(value) {
								return /^(13|15|18)\d{9}$/i.test(value);
							},
							message : '手机号码格式不正确(正确格式如：13450774432)'
						},
						idcard : {// 验证身份证
							validator : function(value) {
								return /^\d{15}(\d{2}[A-Za-z0-9])?$/i
										.test(value);
							},
							message : '身份证号码格式不正确'
						},
						qq : {// 验证QQ,从10000开始
							validator : function(value) {
								return /^[1-9]\d{4,9}$/i.test(value);
							},
							message : 'QQ号码格式不正确(正确如：453384319)'
						},
						integer : {// 验证整数
							validator : function(value) {
								return /^[+]?[1-9]+\d*$/i.test(value);
							},
							message : '请输入正整数'
						},
						chinese : {// 验证中文
							validator : function(value) {
								return /^[\u0391-\uFFE5]+$/i.test(value);
							},
							message : '请输入中文'
						},
						english : {// 验证英语
							validator : function(value) {
								return /^[A-Za-z]+$/i.test(value);
							},
							message : '请输入英文'
						},
						unnormal : {// 验证是否包含空格和非法字符
							validator : function(value) {
								return /.+/i.test(value);
							},
							message : '输入值不能为空和包含其他非法字符'
						},
						zip : {// 验证邮政编码
							validator : function(value) {
								return /^[1-9]\d{5}$/i.test(value);
							},
							message : '邮政编码格式不正确'
						},
						email : {
							validator : function(value) {
								return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
										.test(value);
							},
							message : '请输入有效的电子邮件账号(例：abc@126.com)'
						},
						msn : {
							validator : function(value) {
								return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
										.test(value);
							},
							message : '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
						},
						department : {
							validator : function(value) {
								return /^[0-9]*$/.test(value);
							},
							message : '请输入部门排序号(例：1)'
						},
						same : {
							validator : function(value, param) {
								if ($("#" + param[0]).val() != ""
										&& value != "") {
									return $("#" + param[0]).val() == value;
								} else {
									return true;
								}
							},
							message : '两次输入的密码不一致！'
						}
					});
	//设置光标停留的位置:$("input").position(4);
	$.fn.extend({
		myPosition:function( value ){
			var elem = this[0];
				if (elem&&(elem.tagName=="TEXTAREA"||elem.type.toLowerCase()=="text")) {
				   if($.browser.msie){
						   var rng;
						   if(elem.tagName == "TEXTAREA"){ 
							    rng = event.srcElement.createTextRange();
							    rng.moveToPoint(event.x,event.y);
						   }else{ 
						    	rng = document.selection.createRange();
						   }
						   if( value === undefined ){
						   	 rng.moveStart("character",-event.srcElement.value.length);
						     return  rng.text.length;
						   }else if(typeof value === "number" ){
						   	 var index=this.position();
							 index>value?( rng.moveEnd("character",value-index)):(rng.moveStart("character",value-index))
							 rng.select();
						   }
					}else{
						if( value === undefined ){
						   	 return elem.selectionStart;
						   }else if(typeof value === "number" ){
						   	 elem.selectionEnd = value;
	       			         elem.selectionStart = value;
						   }
					}
				}else{
					if( value === undefined )
					   return undefined;
				}
		}
	});
	//选中文本内容
	$.fn.mySelectRange = function(start, end){
	    return this.each(function(){
	        if (this.setSelectionRange) {
	            this.focus();
	            this.setSelectionRange(start, end);
	        }
	        else 
	            if (this.createTextRange) {
	                var range = this.createTextRange();
	                range.collapse(true);
	                range.moveEnd('character', end);
	                range.moveStart('character', start);
	                range.select();
	            }
	    });
	};
	//移除验证和还原验证$('#id').validatebox('remove'); 
	$.extend($.fn.validatebox.methods, {  
		remove: function(jq, newposition){  
			return jq.each(function(){  
				$(this).removeClass("validatebox-text validatebox-invalid").unbind('focus.validatebox').unbind('blur.validatebox');
			});  
		},
		reduce: function(jq, newposition){ 
			return jq.each(function(){  
			   var opt = $(this).data().validatebox.options;
			   $(this).addClass("validatebox-text").validatebox(opt);
			});  
		}	
	}); 
	$.fn.panel.defaults.onBeforeDestroy = function() {/* tab关闭时回收内存 */
		var frame = $('iframe', this);
		try {
			if (frame.length > 0) {
				frame[0].contentWindow.document.write('');
				frame[0].contentWindow.close();
				frame.remove();
				if ($.browser.msie) {
					CollectGarbage();
				}
			} else {
				$(this).find('.combo-f').each(function() {
					var panel = $(this).data().combo.panel;
					panel.panel('destroy');
				});
			}
		} catch (e) {
		}
	};
	
	//tree.tree("unSelect");
	$.extend($.fn.tree.methods,{
		unSelect:function(jq,target){
			return jq.each(function(){
				$(target).removeClass("tree-node-selected");
			});
		}
	});
	
	//datagrid隐藏和显示按钮
	//$('#tt').datagrid("addToolbarItem",[{"text":"xxx"},"-",{"text":"xxxsss","iconCls":"icon-ok"}])
	//$('#tt').datagrid("removeToolbarItem","GetChanges")//根据btn的text删除
	//$('#tt').datagrid("removeToolbarItem",0)//根据下标删除
	$.extend($.fn.datagrid.methods, {
		addToolbarItem : function (jq, items) {
			return jq.each(function () {
				var dpanel = $(this).datagrid('getPanel');
				var toolbar = dpanel.children("div.datagrid-toolbar");
				if (!toolbar.length) {
					toolbar = $("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(dpanel);
					$(this).datagrid('resize');
				}
				var tr = toolbar.find("tr");
				for (var i = 0; i < items.length; i++) {
					var btn = items[i];
					if (btn == "-") {
						$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
					} else {
						var td = $("<td></td>").appendTo(tr);
						var b = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
						b[0].onclick = eval(btn.handler || function () {});
						b.linkbutton($.extend({}, btn, {
								plain : true
							}));
					}
				}
			});
		},
		removeToolbarItem : function (jq, param) {
			return jq.each(function () {
				var dpanel = $(this).datagrid('getPanel');
				var toolbar = dpanel.children("div.datagrid-toolbar");
				var cbtn = null;
				if (typeof param == "number") {
					cbtn = toolbar.find("a").eq(param).find('span.l-btn-text');
					//去掉那条杠
					$(toolbar.find("a").eq(param).next()[0]).remove();
				} else if (typeof param == "string") {
					cbtn = toolbar.find("span.l-btn-text:contains('" + param + "')");
				}
				if (cbtn && cbtn.length > 0) {
					cbtn.closest('a').remove();
					cbtn = null;
				}
			});
		}
	});
	 
	//上下翻页，取消选中表头的复选框
	$.extend($.fn.datagrid.methods,{
		unChecked:function(jq,target){
			return jq.each(function(){
				var dpanel = $(this).datagrid('getPanel');
				dpanel.find("div.datagrid-header-check :checkbox").attr({checked : false});
			});
		}
	});
});

var easyuiPanelOnMove = function(left, top) {
	if(!$(this).window("options").closed) {
		var l = left;
		var t = top;
		if (l < 1) {
			l = 1;
		}
		if (t < 1) {
			t = 1;
		}
		var width = parseInt($(this).parent().css('width')) + 14;
		var height = parseInt($(this).parent().css('height')) + 14;
		var right = l + width;
		var buttom = t + height;
		var browserWidth = $(window).width();
		var browserHeight = $(window).height();
		if (right > browserWidth) {
			l = browserWidth - width;
		}
		if (buttom > browserHeight) {
			t = browserHeight - height;
		}
		$(this).parent().css({
			left : l,
			top : t
		});
	}
};
//员工
var easyuiPanelOnMove1 = function(left, top) {/* 防止超出浏览器边界 */
	if(!$(this).window("options").closed) {
		var t = top;
		var l = left;
		if (left < 0) {
			$(this).parent().css({/* 修正面板位置 */
				left : 1,
				top : t
			});
		}
		if (top < 0) {
			$(this).parent().css({/* 修正面板位置 */
				left : l,
				top : 1
			});
		}
		if (top + $(this).dialog('options').height > $("body").height()) {
			$(this).dialog("move",{/* 修正面板位置 */
				left : l,
				top : $("body").height() - $(this).dialog('options').height - 1
			});
		}
		if (left + $(this).dialog('options').width > $("body").width()) {
			$(this).parent().css({/* 修正面板位置 */
				left : $("body").width() - $(this).dialog('options').width,
				top : t
			});
		}
	}
};
//如果表单中有复选框元素，则不能使用此方法
function serializeForm(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
}
//简单过滤SQL关键字
function filterSQL(formInput) {
	$.each(formInput,function(index,value) {
		var val = $(value).val();
		val = val.replace(/'/g," ");
		val = val.replace(/[ ]/g,""); //去除中间空格
		$(value).val($.trim(val));
	});
}

var easyuiErrorFunction = function(XMLHttpRequest) {
	/* $.messager.progress('close'); */
	/* alert(XMLHttpRequest.responseText.split('<script')[0]); */
	$.messager.alert('错误', "系统发生错误错误，请联系管理员");
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;

jsonToString = function(o) {
	var r = [];
	if (typeof o == "string")
		return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
	if (typeof o == "object") {
		if (!o.sort) {
			for ( var i in o)
				r.push(i + ":" + obj2str(o[i]));
			if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
				r.push("toString:" + o.toString.toString());
			}
			r = "{" + r.join() + "}";
		} else {
			for ( var i = 0; i < o.length; i++)
				r.push(obj2str(o[i]));
			r = "[" + r.join() + "]";
		}
		return r;
	}
	return o.toString();
};