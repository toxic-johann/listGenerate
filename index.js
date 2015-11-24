'use strict'
//after consideration, i desicide to use hardcode.

var listGenerate = {
    preifx:"toxic",
    data:{
        0:{type:'text',name:'name',show:'name:'},
        1:{
            0:{type:'text',name:'source',show:'source:'},
            1:{type:'text',name:'target',show:'target:'},
            more:{num:4,value:'more'},
            delete:{value:'delete'},
            myself:{test:'i am a test'}
        },
        2:{
            0:{type:'radio',name:'type',show:'oh',value:'oj'},
            1:{type:'radio',name:'type',show:'no',value:'eie'},
            2:{type:'radio',name:'type',show:'OMG',value:'efw'},
            show:"oh-come-on",
            more:{num:5},
            delete:{value:'kick me out'}
        },
        3:{
            0:{type:'selection',name:'select',show:'select!!',option:{
                0:{value:'fuck',show:'hello'},
                1:{value:'shit',show:'goodluck'}
                }
            },
            more:{num:12}
        },
        4:{
            0:{type:'checkbox',name:"text",value:"ok"},
            1:{type:'checkbox',name:"text",value:"ok1"},
            2:{type:'checkbox',name:"text",value:"ok2"},
            3:{type:'checkbox',name:"text",value:"ok3"},
            4:{type:'checkbox',name:"text",value:"ok4"},
            more:{num:5}
        }
    },
    myEvent:{},

    initTemplate:function (data,content) {
        let self=this;
        self.data = data || self.data;
        data = self.data;
        let promise = new Promise(function(resolve,reject){
            let list = self.generateItem(data);
            $(content).html("<ul>"+list+"</ul>");
            let _radioList = $("input[type='radio']."+self.preifx);
            for (let i=_radioList.length-1;i>-1;i--){
                $(_radioList[i]).attr("name",$(_radioList[i]).attr("name")+"-0");
            }
            resolve('success');
        });
        return promise;
    },

    generateItem:function (data){
        let self=this;
        let list = [];
        for (let item in data){
            let listItem = [
            "<list-item class='",
            " ",
            data.myclass,
            self.preifx+" "+self.preifx+"-item-"+item,
            "' mark='",
            item,
            "' ",
            "myself",
            " count=0>",
            "element",
            "</list-item>"];
            if(Object.keys(data[item]).find((n)=>!isNaN(n)) && !isNaN(item)){
                if(Object.keys(data[item]).find((n)=>n=='show')){
                    listItem.splice(listItem.findIndex((n)=>n==="element"), 0, "<list-item-head>"+data[item].show+"</list-item-head>");  
                }
                if(Object.keys(data[item]).find((n)=>n=='more')){
                    let button=[
                    "<list-item-choice class='",
                    self.preifx," ",self.preifx,"-more-",item,
                    "''><input type='button' name='more' value = '",
                    (data[item].more.value || 'more'),
                    "'></list-item-choice>"
                    ];

                    listItem.splice(-1, 0, button.join(""));
                    button = "."+self.preifx+"-more-"+item;
                    self.myEvent[button] = self.myEvent[button] ||{};
                    self.myEvent[button].more={
                        num:data[item].more.num,
                        target:"."+self.preifx+"-item-"+item
                    };
                }
                if(Object.keys(data[item]).find((n)=>n=='delete')){
                    let button=[
                    "<list-item-choice class='",
                    self.preifx," ",self.preifx,"-delete-",item,
                    "''><input type='button' name='delete' value = '",
                    (data[item].delete.value || 'delete'),
                    "'></list-item-choice>"
                    ];

                    listItem.splice(-1, 0, button.join(""));
                    button = "."+self.preifx+"-delete-"+item;
                    self.myEvent[button] = self.myEvent[button] ||{};
                    self.myEvent[button].delete={
                        num:data[item].more.num,
                        target:"."+self.preifx+"-item-"+item
                    };
                }
                listItem[listItem.findIndex((n)=>n==="myself")] = self.generateSelfAttr(data[item]);
                listItem[listItem.findIndex((n)=>n==="element")] = self.generateSubItem(data[item]);
            } else if(typeof data[item] === 'object' && !isNaN(item)){
                listItem[listItem.findIndex((n)=>n==="element")] = self.generateElement(data[item]);
            }
            
           if(!isNaN(item)){
                list.push(listItem.join(""));
            }
        }
        return list.join("");
    },

    generateSubItem:function (data){
        let self=this;
        let list = [];
        for (let item in data){
            let listItem = [
            "<list-sub-item class='",
            self.preifx,
            " ",
            data.myclass,
            "' ",
            "myself",
            ">",
            "element",
            "</list-sub-item>"];
            if(Object.keys(data[item]).find((n)=>!isNaN(n)) 
                && Object.keys(data[item]).length>1
                && !isNaN(item)){
                listItem[listItem.findIndex((n)=>n==="element")]  = self.generateSubItem(data[item]);
            } else if(typeof data[item] === 'object' && !isNaN(item)){
                listItem[listItem.findIndex((n)=>n==="element")]  = self.generateElement(data[item]);
            }

            listItem[listItem.findIndex((n)=>n==="myself")] = self.generateSelfAttr(data[item]);
            if(!isNaN(item)){
                list.push(listItem.join(""));
            }
        }
        return list.join("");
    },

    generateElement:function (data){
        let self=this;
        if(data.type == 'selection'){
            return self.generateSelect(data);
        } else{
            return self.generateInput(data);
        }
    },

    generateInput:function (data){
        let self=this;
        let temp = [
        "<list-element><list-element-head class='",
        self.preifx,
        " ",
        data.type,
        "-",
        data.name,
        "-",
        data.value,
        ,"'>",
        data.show,
        "</list-element-head>",
        "selfLabel",
        "<input type='",
        data.type,
        "' name='",
        data.name,
        "' class='",
        self.preifx,
        " ",
        data.type,
        "-",
        data.name,
        "-",
        data.value,
        " ",
        data.myclass,
        data.checked?"' checked='"+data.checked:"",
        data.disabled?"' disabled='"+data.disabled:"",
        "' value='",
        data.value,
        "' ",
        "myself",
        "></list-element>"
        ];


        temp[temp.findIndex((n)=>n==="myself")] = self.generateSelfAttr(data);
        if((data.bindLabel || (data.whole?data.whole.bindLabel:false)) && 
            (data.type === 'checkbox' || data.type === 'radio')){
            let button = ["list-element-head.",self.preifx,".",data.type,"-",data.name,"-",data.value].join("");
            self.myEvent[button] = self.myEvent[button] ||{};
            self.myEvent[button].bindLabel = {
                target:["input.",self.preifx,".",data.type,"-",data.name,"-",data.value].join("")
            };
        }
        if((data.selfStyle || (data.whole?data.whole.selfStyle:false)) &&
            (data.type === 'checkbox' || data.type === 'radio' || data.type === 'button')){

        }
        return temp.join("");
    },

    generateSelect:function (data){
        let self=this;
        let temp = [
        "<list-element><list-element-head>",
        data.show,
        "</list-element-head><select type='",
        data.type,
        "' name='",
        data.name,
        "' class='",
        self.preifx,
        "' ",
        "myself",
        ,">",
        "option",
        "</select></list-element>"
        ];
        temp[temp.findIndex((n)=>n==="option")] = self.generateOption(data.option);
        temp[temp.findIndex((n)=>n==="myself")] = self.generateSelfAttr(data);
        return temp.join("");
    },

    generateOption:function (data){
        let self=this;
        if(!data){
            return "";
        }
        let temp=[];
        for (let item in data){
            temp.push("<option value='");
            temp.push(data[item].value);
            temp.push("'>");
            temp.push(data[item].show);
            temp.push("</option>");
        }
        return temp.join("");
    },

    generateSelfAttr:function(data){
        let self=this;
        if(!data.myself){
            return "";
        }
        let myself=[];
        for(let each in data.myself){
            myself.push(each);
            myself.push("='");
            myself.push(data.myself[each]);
            myself.push("' ");
        }
        return myself.join("");
    },

    bindEvent:function (eventList){
        let self=this;
        let promise = new Promise(function(resolve,reject){
            for (let every in eventList){
                for(let each in eventList[every]){
                    if(each === 'more'){
                        let _target = eventList[every][each].target.split("-");
                        _target = _target.splice(_target.length-1,1)[0];
                        let temp={};
                        temp[_target] = self.data[_target];
                        let _code = self.generateItem(temp);
                        $($(every)[0]).on('click',function(evt){
                            self.addItem($(evt.currentTarget).parent(),_code,every);
                        });
                    }else if(each === 'delete'){
                        $($(every)[0]).on('click',function(evt){
                            self.deleteItem($(evt.currentTarget).parent());
                        });
                    } else if(each === 'bindLabel'){
                        $($(every)[0]).on('click',function(evt){
                            $($(eventList[every][each].target)[0]).click();
                        });
                    }
                }
            }
            resolve('success');
        });
        return promise;
    },

    addItem:function (_target,_code,_source){
        let self=this;
        _target.after(_code);
        let _sameItem = $(_target).parent().find("[mark='"+$(_target).attr("mark")+"']");
        let _sameItemCount = 0;
        for(let i=_sameItem.length-1;i>-1;i--){
            if(_sameItemCount<$(_sameItem[i]).attr('count')){
                _sameItemCount = $(_sameItem[i]).attr('count');
            }
        }
        $(_target).next().attr("count",parseInt(_sameItemCount)+1);  
        if(_target.next().find("input[type='radio']").length>0){
            let _radioList = _target.next().find("input[type='radio']");
            for (let i=_radioList.length-1;i>-1;i--){
                $(_radioList[i]).attr("name",$(_radioList[i]).attr("name")+'-'+$(_target).next().attr("count"));
            }
        }
        _target.next().find(_source).on('click',function(evt){
            self.addItem($(evt.currentTarget).parent(),_code,_source);
        });
        if(_target.next().find("[name='delete']")){
            _target.next().find("[name='delete']")
            .on('click',function(evt){
                self.deleteItem($(evt.currentTarget).parent().parent());
            });
        }
    },

    deleteItem:function (_target){
        _target.remove();
    },

    collectData:function (preifx){
        let self=this;
        let list = $("list-item."+self.preifx);
        let collect={};
        for (let i=list.length-1;i>-1;i--){
            let subCollect = collect[$(list[i]).attr("mark")+"-"+$(list[i]).attr("count")]=[];
            if($(list[i]).find('list-sub-item').length<=0){
                let element = $(list[i]).find('list-element')[0];
                let data = self.collectDataFromElement(element);
                if(typeof data != "undefined"){
                    subCollect.push(data);
                }
            } else {
                let subList = $(list[i]).find('list-sub-item');
                for (let j=subList.length;j>-1;j--){
                    let element = $(subList[j]).find('list-element')[0];
                    let data = self.collectDataFromElement(element);
                    if(typeof data != "undefined"){
                        subCollect.push(data);
                    }
                }
            }
        }
        return collect;
    },

    collectDataFromElement:function (_target){
        let self=this;
        if($(_target).find('input').length>0){
            let _input = $(_target).find('input')[0];
            if($(_input).attr('type') === 'radio'){
                if($(_input).is(':checked')){
                    let tempName = $(_input).attr('name').split("-");
                    if(tempName.length>1){  
                        tempName = tempName.splice(0,tempName.length-1).join("-");
                    }
                    let temp={};
                    temp[tempName] = $(_input).val();
                    return temp;
                }
                return;
            } else if( $(_input).attr('type') === 'checkbox' ){
                if($(_input).is(':checked')){
                    let temp={};
                    temp[$(_input).attr('name')] = $(_input).val();
                    return temp;
                }
                return;
            }else if (!$(_input).attr('type')){
                return;
            } else {
                let temp={};
                temp[$(_input).attr('name')] = $(_input).val();
                return temp;
            }
        } else if ($(_target).find('select').length>0){
            let _select = $(_target).find('select')[0];
            let temp={};
            temp[$(_select).attr('name')] = $(_select).val();
            return temp;
        }
    },

    init:function(data,componet){
        let self=this;
        self.data = data || self.data;
        data = self.data;
        let promise = new Promise(function(resolve,reject){
            self.registerComponent()
            .then(self.initTemplate(data,componet))
            .then(self.bindEvent(self.myEvent))
            .then(function(){
                resolve('success');
            });
        });
        return promise;
    },

    registerComponent:function(){
        let promise = new Promise(function(resolve,reject){
            document.registerElement('list-item');
            document.registerElement('list-sub-item');
            document.registerElement('list-element');
            document.registerElement('list-element-head');
            resolve('success');
        });
        return promise;
       
    }
}