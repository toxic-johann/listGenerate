## 这个东西有什么卵用

主要因为我这个人比较懒，所以我很多时候甚至懒得一些html或者事件都不想写。

然而我们发现，人们一般需要参数的时候，会写一个可视化的页面来传入参数，而且这个参数的数目大部分的时候还是可变的。

一般这种情况下，我们需要一个表格，并且表格里应该有增加或者删除的功能。

所以我就想，我不想写html和js效率这么低下了，基于一般这种参数都是用于后台的，我们就随便用一下浏览器的表格就好了。

然后，我还想，我们可不可以用json这种数据结构去表示这种需求，因为往后台大部分的情况下，我们需要的只是简单地json数据，我们可以依照json数据设置这个表格。

所以我就弄出了这么个东西。

##这个东西怎么用

这个是第二个版本了，之前的由于写的方式有问题，所以在循环上不太可行。

用这个东西我们只需要一个data和你想要展示的地方输入。

`
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
                type:'selection',
                name:'select',
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
    }
`

children表示内含子对象，然后你可以加各种的input元素和select

events用于表示需要绑定的事件，这个版本暂时只支持增加和删除两种功能。more用于增加，如果有num可以设置数目限制

show表示用于展示的信息。

###待完善方面

由于是抽空的重写，还是有很多可以改进的。

如果你有关注的话，你会记得我前一版本有些自定义的地方，我迟点再弄哈哈哈。