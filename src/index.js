'use strict'
//after consideration, i desicide to use hardcode.

let toxicInput = {
    preifx:"toxic",
    data:{
        children:[
            {
                type:'text',
                name:'name',
                show:"name",
                events:[
                    {   
                        type:'more',
                        num:3,
                        show:"show sth"
                    },
                    {type:'delete'}
                ]
            },
            {
                children:[
                    {type:'text',name:'source',show:'source:'},
                    {type:'text',name:'target',show:'target:'},
                    {
                        children:[
                            {type:'text',name:'source',show:'source:'},
                            {type:'text',name:'target',show:'target:'},
                        ],
                    }
                ],
                events:[
                    {   
                        type:'more',
                        num:3,
                        show:"show sth"
                    }
                ]
            },
            {
                name:'selection',
                type:'select',
                show:'select!!',
                option:[
                    {value:'fuck',show:'hello'},
                    {value:'shit',show:'goodluck'}
                ],
                events:[]
            },
            {
                children:[
                    {type:'show',show:"test"},
                    {type:'checkbox',name:"text",value:"ok"},
                    {type:'checkbox',name:"text",value:"ok1"},
                    {type:'checkbox',name:"text",value:"ok2"},
                    {type:'checkbox',name:"text",value:"ok3"},
                    {type:'checkbox',name:"text",value:"ok4"}
                ],
                events:[],
            },
            {
                children:[
                    {type:"show",show:"here is an radio"},
                    {type:"radio",name:"sex",value:"male"},
                    {type:"radio",name:"sex",value:"female"},
                ]
            }
        ],
        events:[
            {type:'more'},
            {type:'delete'}
        ]
    },
    myEvent:{},
    isEmpty:function(obj){
        for(let name in obj){
            return false;
        }
        return true;
    },
    error:{
        "NULL_DATA":"your data input is empty",
        "CHILDREN_MUST_BE_ARRAY":"children must be array",
        "NULL_INPUT":"input cannot be empty",
    },
    remind:{
        "ACHIEVE_MORE_LIMIT":"your have achieve the more button limit",
        "ACHIEVE_DELETE_LIMIT":"your have only one that you can't delete any more",
    },
    start:function(){
        return function(id,data){
            let target = document.getElementById(id);
            target.innerHTML = toxicInput.generate(toxicInput.data);
            this.bindEvents();
        }.apply(toxicInput,arguments);
    },
    generate:function(){
        return function(data){
            if(!data || this.isEmpty(data)){
                return this.error["NULL_DATA"];
            }
            else if(data.children){
                let reply =[];
                reply.push(this.generatePrefix());
                reply.push(this.generateChildren(data.children));
                reply.push(this.generateEventButton(data.events))
                reply.push(this.generateSuffix());
                return reply.join("");
            } else{
                return this.generateToxicElement(data);
            }
        }.apply(toxicInput,arguments);
    },
    generatePrefix:function(){
        return `<toxic-item>`;
    },
    generateSuffix:function(){
        return "</toxic-item>";
    },
    generateChildren:function(){
        return function(data){
            let self=this;
            if(!Array.isArray(data)){
                return this.error["CHILDREN_MUST_BE_ARRAY"];
            } else {
                let childern = [];
                data.forEach(child=>{
                    childern.push(this.generate(child));
                })
                return childern.join("");
            }
        }.apply(toxicInput,arguments)
    },
    generateElement:function(){
        return function(tag,property,content,events){
            content = content || "";
            let header=[];
            header.push("<"+tag);
            header.push(this.generateProperty(property));
            header.push(">");
            header = header.join(" ");
            let tailer = `</${tag}>`;
            let eventsButton = this.generateEventButton(events);
            return header+content+eventsButton+tailer;
        }.apply(toxicInput,arguments);
    },
    generateToxicElement:function(){
        return function(data){
            let content;
            if(data.type == 'select'){
                content = this.generateSelect(data);
            }else if(data.type == 'show'){
                content = this.generateShow(data.show);
            } else {
                content = this.generateInput(data);
            }
            return this.generateElement(`toxic-element`,{type:data.type},content,data.events);
        }.apply(toxicInput,arguments);
    },
    generateInput:function(){
        return function(property){
            if(!property ||this.isEmpty(property)){
                return this.error["NULL_INPUT"];
            }
            let show = "";
            if(property.show){
                show = this.generateShow(property.show);
            }
            let prop = this.generateProperty(property);
            let input = `<input ${prop} />`;
            let reply = `<toxic-input>${show}${input}</toxic-input>`
            return reply;
        }.apply(toxicInput,arguments);
    },
    generateSelect:function(){
        return function(property){
            if(!property ||this.isEmpty(property)){
                return this.error["NULL_INPUT"];
            }
            let show ="";
            if(property.show){
                show = this.generateShow(property.show);
            }
            let prop = this.generateProperty(property);
            let option = property.option.map(opt=>{
                return this.generateElement("option",{value:opt.value},opt.show);
            });
            option = option.join("");
            let reply = `<toxic-select>${show}<select ${prop}>${option}</select></toxic-select>`;
            return reply;
        }.apply(toxicInput,arguments);
    },
    generateShow:function(){
        return function(show){
            return this.generateElement("toxic-show",{},show);
        }.apply(toxicInput,arguments);
    },
    generateProperty:function(){
        return function(property){
            let prop = [];
            for(let each in property){
                if(each != 'events' && each != 'option'){
                    let tmp = `${each}=${property[each]}`;
                    prop.push(tmp);
                }
            }
            prop = prop.join(" ");
            return prop;
        }.apply(toxicInput,arguments);
            
    },
    generateEventButton:function(){
        return function(events){
            if(!events || events.length < 1){
                return "";
            }
            let ret = [];
            events.forEach(function(each){
                if(each.type == 'more'){
                    let moreId = ''
                    if(each.num){
                        let tmp = Math.trunc(Math.random()*100000);
                        moreId = `more-id=${tmp}`;
                    }
                    ret.push(`<button class="toxic-more" data-limit=${each.num || -1} ${moreId}>${each.show || "more"}</button>`);
                }
                if(each.type == 'delete'){
                    let tmp = Math.trunc(Math.random()*100000);
                    ret.push(`<button class="toxic-delete" all-del=${each.allDel || false} del-id=${tmp}>${each.show || "delete"}</button>`);
                }
            })
            
            return ret.join("");
        }.apply(toxicInput,arguments);
    },
    bindEvents:function(){
        $(document).delegate(".toxic-more","click",function(evt){
            let parent = $(evt.target).parent();
            let grandParent = $(parent).parent();
            if($(evt.target).attr("data-limit") > 1){
                if($(grandParent).find("[more-id="+$(evt.target).attr("more-id")+"]").length >= $(evt.target).attr("data-limit")){
                    console.warn(toxicInput.remind["ACHIEVE_MORE_LIMIT"]);
                    return toxicInput.remind["ACHIEVE_MORE_LIMIT"];
                }
            }
            $(parent).after(toxicInput.moreFilter($(parent).clone(true)));
        });
        $(document).delegate(".toxic-delete",'click',function(evt){
            let parent = $(evt.target).parent();
            let grandParent = $(parent).parent();
            if($(grandParent).find("[del-id="+$(evt.target).attr("del-id")+"]").length <= 1){
                console.warn(toxicInput.remind["ACHIEVE_DELETE_LIMIT"]);
                return toxicInput.remind["ACHIEVE_DELETE_LIMIT"];
            }
            $(parent).remove();
        })
    },
    moreFilter:function(clone){
        let tmp = Math.trunc(Math.random()*100000);
        //unique the radio
        $(clone).find("input:radio").attr("name",$(clone).find("input:radio").attr("name")+"-"+tmp);

        //remove value
        $(clone).find("input:not([type=radio]):not([type=checkbox])").val("");

        //remove checked
        $(clone).find("input:checked").attr("checked",false)
        return clone;
    },
    getData:function(selector){
        let elements = $("toxic-element");
        elements.each(function(index,element){
            if($(element).attr("type") == 'radio' || $(element).attr("type") == 'checkbox'){
                console.log($(element).find("input:checked").val());
            } else if($(element).attr("type") == 'select'){
                console.log($(element).find("select").val());
            } else if($(element).attr("type") == 'show'){
                //do nothing
            } else {
                console.log($(element).find("input").val());
            }
        })

    }
}

toxicInput.start("test",toxicInput.data)

