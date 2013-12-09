/**
 * ���߷���
 */

// ��������¼� ��ֹ���˼���Backspace��������С������ı������
function banBackSpace(e) {
	var ev = e || window.event;
	// ��ȡevent����
	var obj = ev.target || ev.srcElement;
	// ��ȡ�¼�Դ
	var t = obj.type || obj.getAttribute('type');
	// ��ȡ�¼�Դ����
	// ��ȡ��Ϊ�ж��������¼�����
	var vReadOnly = obj.readOnly;
	var vDisabled = obj.disabled;
	// ����undefinedֵ���
	vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	vDisabled = (vDisabled == undefined) ? true : vDisabled;
	// ����Backspace��ʱ���¼�Դ����Ϊ������С������ı��ģ�
	// ����readOnly����Ϊtrue��disabled����Ϊtrue�ģ����˸��ʧЧ
	var flag1 = ev.keyCode == 8
			&& (t == "password" || t == "text" || t == "textarea")
			&& (vReadOnly == true || vDisabled == true);
	// ����Backspace��ʱ���¼�Դ���ͷ�������С������ı��ģ����˸��ʧЧ
	var flag2 = ev.keyCode == 8 && t != "password" && t != "text"
			&& t != "textarea";
	// �ж�
	if (flag2 || flag1)
		return false;
}
// ��ֹ�˸�� ������Firefox��Opera
document.onkeypress = banBackSpace;
// ��ֹ�˸�� ������IE��Chrome
document.onkeydown = banBackSpace;
$(function() {
	$.extend(
					$.fn.validatebox.defaults.rules,
					{
						minLength : { // �ж���С����
							validator : function(value, param) {
								return value.length >= param[0];
							},
							message : '�������� {0} ���ַ���'
						},
						phone : {// ��֤�绰����
							validator : function(value) {
								return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i
										.test(value);
							},
							message : '��ʽ����ȷ,��ʹ�������ʽ:020-88888888'
						},
						mobile : {// ��֤�ֻ�����
							validator : function(value) {
								return /^(13|15|18)\d{9}$/i.test(value);
							},
							message : '�ֻ������ʽ����ȷ(��ȷ��ʽ�磺13450774432)'
						},
						idcard : {// ��֤���֤
							validator : function(value) {
								return /^\d{15}(\d{2}[A-Za-z0-9])?$/i
										.test(value);
							},
							message : '���֤�����ʽ����ȷ'
						},
						qq : {// ��֤QQ,��10000��ʼ
							validator : function(value) {
								return /^[1-9]\d{4,9}$/i.test(value);
							},
							message : 'QQ�����ʽ����ȷ(��ȷ�磺453384319)'
						},
						integer : {// ��֤����
							validator : function(value) {
								return /^[+]?[1-9]+\d*$/i.test(value);
							},
							message : '������������'
						},
						chinese : {// ��֤����
							validator : function(value) {
								return /^[\u0391-\uFFE5]+$/i.test(value);
							},
							message : '����������'
						},
						english : {// ��֤Ӣ��
							validator : function(value) {
								return /^[A-Za-z]+$/i.test(value);
							},
							message : '������Ӣ��'
						},
						unnormal : {// ��֤�Ƿ�����ո�ͷǷ��ַ�
							validator : function(value) {
								return /.+/i.test(value);
							},
							message : '����ֵ����Ϊ�պͰ��������Ƿ��ַ�'
						},
						zip : {// ��֤��������
							validator : function(value) {
								return /^[1-9]\d{5}$/i.test(value);
							},
							message : '���������ʽ����ȷ'
						},
						email : {
							validator : function(value) {
								return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
										.test(value);
							},
							message : '��������Ч�ĵ����ʼ��˺�(����abc@126.com)'
						},
						msn : {
							validator : function(value) {
								return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
										.test(value);
							},
							message : '��������Ч��msn�˺�(����abc@hotnail(msn/live).com)'
						},
						department : {
							validator : function(value) {
								return /^[0-9]*$/.test(value);
							},
							message : '�����벿�������(����1)'
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
							message : '������������벻һ�£�'
						}
					});
	//���ù��ͣ����λ��:$("input").position(4);
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
	//ѡ���ı�����
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
	//�Ƴ���֤�ͻ�ԭ��֤$('#id').validatebox('remove'); 
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
	$.fn.panel.defaults.onBeforeDestroy = function() {/* tab�ر�ʱ�����ڴ� */
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
	
	//datagrid���غ���ʾ��ť
	//$('#tt').datagrid("addToolbarItem",[{"text":"xxx"},"-",{"text":"xxxsss","iconCls":"icon-ok"}])
	//$('#tt').datagrid("removeToolbarItem","GetChanges")//����btn��textɾ��
	//$('#tt').datagrid("removeToolbarItem",0)//�����±�ɾ��
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
					//ȥ��������
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
	 
	//���·�ҳ��ȡ��ѡ�б�ͷ�ĸ�ѡ��
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
//Ա��
var easyuiPanelOnMove1 = function(left, top) {/* ��ֹ����������߽� */
	if(!$(this).window("options").closed) {
		var t = top;
		var l = left;
		if (left < 0) {
			$(this).parent().css({/* �������λ�� */
				left : 1,
				top : t
			});
		}
		if (top < 0) {
			$(this).parent().css({/* �������λ�� */
				left : l,
				top : 1
			});
		}
		if (top + $(this).dialog('options').height > $("body").height()) {
			$(this).dialog("move",{/* �������λ�� */
				left : l,
				top : $("body").height() - $(this).dialog('options').height - 1
			});
		}
		if (left + $(this).dialog('options').width > $("body").width()) {
			$(this).parent().css({/* �������λ�� */
				left : $("body").width() - $(this).dialog('options').width,
				top : t
			});
		}
	}
};
//��������и�ѡ��Ԫ�أ�����ʹ�ô˷���
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
//�򵥹���SQL�ؼ���
function filterSQL(formInput) {
	$.each(formInput,function(index,value) {
		var val = $(value).val();
		val = val.replace(/'/g," ");
		val = val.replace(/[ ]/g,""); //ȥ���м�ո�
		$(value).val($.trim(val));
	});
}

var easyuiErrorFunction = function(XMLHttpRequest) {
	/* $.messager.progress('close'); */
	/* alert(XMLHttpRequest.responseText.split('<script')[0]); */
	$.messager.alert('����', "ϵͳ���������������ϵ����Ա");
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