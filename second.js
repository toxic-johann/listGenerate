'use strict'
//after consideration, i desicide to use hardcode.

let inputListGenerate = {
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
        },
        5:{
            0:{
                0:{type:'text',name:'source',show:'source:'},
                1:{type:'text',name:'target',show:'target:'},
                more:{num:4,value:'more'},
                delete:{value:'delete'},
                myself:{test:'i am a test'}
            },
            1:{
                0:{type:'text',name:'source',show:'source:'},
                1:{type:'text',name:'target',show:'target:'},
                more:{num:4,value:'more'},
                delete:{value:'delete'},
                myself:{test:'i am a test'}
            }
        }
    },
    myEvent:{},
    generateElement(){
        let [tag,property,content] = [].splice.call(arguments);
        let header=[];
        header.push("<"+tag);
        for(let each in property){
            header.push(each);
            header.push("=");
            header.push(property[each]);
        } 
        header.push(">");
        header.join(" ");
        let tailer = `< /${tag} >`;
        return reply = header+content+tailer;
    }
}