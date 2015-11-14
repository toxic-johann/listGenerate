##why i write this?

i am so lazy so that i think to write about list on the html is not convenient.I want to wirte only json.In this way, i can change it easily.Also, i can generate a json and call the list by the function.

##how to use this?

it's easy to call this.you only pass the data in the initTemplay function.

we use the number to set the list order.you should input type,name for input.

you can use show attr to generate info for your component.

you can insert more button and delete buttom by using more and delete attr. 

you should use the collectData function to get the data if you want.

you can use myself attr to set your own attr

you can set the prefix to set a prefix class for the table.

you can use css to change the style if you want.

you can set many input in one item. I will generate subitem for that.

```
data:{
        0:{type:'text',name:'name',show:'name:'},
        1:{
            0:{type:'text',name:'source',show:'source:'},
            1:{type:'text',name:'target',show:'target:'},
            more:{value:'more'},
            delete:{value:'delete'},
            myself:{test:'i am a test'}
        },
        2:{
            0:{type:'radio',name:'type',show:'oh',value:'oj'},
            1:{type:'radio',name:'type',show:'no',value:'eie'},
            2:{type:'radio',name:'type',show:'OMG',value:'efw'},
            show:"oh-come-on",
            more:true,
            delete:{value:'kick me out'}
        },
        3:{
            0:{type:'selection',name:'select',show:'select!!',option:{
                0:{value:'fuck',show:'hello'},
                1:{value:'shit',show:'goodluck'}
                }
            },
            more:true
        },
        4:{
            0:{type:'checkbox',name:"text",value:"ok"},
            1:{type:'checkbox',name:"text",value:"ok1"},
            2:{type:'checkbox',name:"text",value:"ok2"},
            3:{type:'checkbox',name:"text",value:"ok3"},
            4:{type:'checkbox',name:"text",value:"ok4"},
            more:true
        }
    }
```

for example,you can generate data like that.

##what should i do more

1. i decide to add the limit option on more.
2. it's not easy to add your own function if you are no good at css.
3. it's depents on webcomponent,which it's no support by most explorer.i may try polyfill later.
4. if you use this and find any problem.Please info me.
5. if you have any good idea.Please tell me.
6. Thanks for your reading.