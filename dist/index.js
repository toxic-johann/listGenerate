'use strict';
//after consideration, i desicide to use hardcode.

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var toxicInput = {
    preifx: "toxic",
    data: {
        children: [{
            type: 'text',
            name: 'name',
            show: "name",
            events: [{
                type: 'more',
                num: 3,
                show: "show sth"
            }, { type: 'delete' }]
        }, {
            children: [{ type: 'text', name: 'source', show: 'source:' }, { type: 'text', name: 'target', show: 'target:' }, {
                children: [{ type: 'text', name: 'source', show: 'source:' }, { type: 'text', name: 'target', show: 'target:' }]
            }],
            events: [{
                type: 'more',
                num: 3,
                show: "show sth"
            }]
        }, {
            type: 'selection',
            name: 'select',
            show: 'select!!',
            option: [{ value: 'fuck', show: 'hello' }, { value: 'shit', show: 'goodluck' }],
            events: []
        }, {
            children: [{ type: 'show', show: "test" }, { type: 'checkbox', name: "text", value: "ok" }, { type: 'checkbox', name: "text", value: "ok1" }, { type: 'checkbox', name: "text", value: "ok2" }, { type: 'checkbox', name: "text", value: "ok3" }, { type: 'checkbox', name: "text", value: "ok4" }],
            events: []
        }, {
            children: [{ type: "show", show: "here is an radio" }, { type: "radio", name: "sex", value: "male" }, { type: "radio", name: "sex", value: "female" }]
        }],
        events: [{ type: 'more' }, { type: 'delete' }]
    },
    myEvent: {},
    isEmpty: function isEmpty(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    },
    error: {
        "NULL_DATA": "your data input is empty",
        "CHILDREN_MUST_BE_ARRAY": "children must be array",
        "NULL_INPUT": "input cannot be empty"
    },
    remind: {
        "ACHIEVE_MORE_LIMIT": "your have achieve the more button limit",
        "ACHIEVE_DELETE_LIMIT": "your have only one that you can't delete any more"
    },
    start: function start() {
        return function (id, data) {
            var target = document.getElementById(id);
            target.innerHTML = toxicInput.generate(toxicInput.data);
            this.bindEvents();
        }.apply(toxicInput, arguments);
    },
    generate: function generate() {
        return function (data) {
            if (!data || this.isEmpty(data)) {
                return this.error["NULL_DATA"];
            } else if (data.children) {
                var reply = [];
                reply.push(this.generatePrefix());
                reply.push(this.generateChildren(data.children));
                reply.push(this.generateEventButton(data.events));
                reply.push(this.generateSuffix());
                return reply.join("");
            } else {
                return this.generateToxicElement(data);
            }
        }.apply(toxicInput, arguments);
    },
    generatePrefix: function generatePrefix() {
        return "<toxic-item>";
    },
    generateSuffix: function generateSuffix() {
        return "</toxic-item>";
    },
    generateChildren: function generateChildren() {
        return function (data) {
            var _this = this;

            var self = this;
            if (!Array.isArray(data)) {
                return this.error["CHILDREN_MUST_BE_ARRAY"];
            } else {
                var _ret = function () {
                    var childern = [];
                    data.forEach(function (child) {
                        childern.push(_this.generate(child));
                    });
                    return {
                        v: childern.join("")
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        }.apply(toxicInput, arguments);
    },
    generateElement: function generateElement() {
        return function (tag, property, content, events) {
            content = content || "";
            var header = [];
            header.push("<" + tag);
            header.push(this.generateProperty(property));
            header.push(">");
            header = header.join(" ");
            var tailer = '</' + tag + '>';
            var eventsButton = this.generateEventButton(events);
            return header + content + eventsButton + tailer;
        }.apply(toxicInput, arguments);
    },
    generateToxicElement: function generateToxicElement() {
        return function (data) {
            var content = undefined;
            if (data.type == 'selection') {
                content = this.generateSelect(data);
            } else if (data.type == 'show') {
                content = this.generateShow(data.show);
            } else {
                content = this.generateInput(data);
            }
            return this.generateElement('toxic-' + data.type, {}, content, data.events);
        }.apply(toxicInput, arguments);
    },
    generateInput: function generateInput() {
        return function (property) {
            if (!property || this.isEmpty(property)) {
                return this.error["NULL_INPUT"];
            }
            var show = "";
            if (property.show) {
                show = this.generateShow(property.show);
            }
            var prop = this.generateProperty(property);
            var input = '<input ' + prop + ' />';
            var reply = '<toxic-input>' + show + input + '</toxic-input>';
            return reply;
        }.apply(toxicInput, arguments);
    },
    generateSelect: function generateSelect() {
        return function (property) {
            var _this2 = this;

            if (!property || this.isEmpty(property)) {
                return this.error["NULL_INPUT"];
            }
            var show = "";
            if (property.show) {
                show = this.generateShow(property.show);
            }
            var prop = this.generateProperty(property);
            var option = property.option.map(function (opt) {
                return _this2.generateElement("option", { value: opt.value }, opt.show);
            });
            option = option.join("");
            var reply = '<toxic-select>' + show + '<select ' + prop + '>' + option + '</select></toxic-select>';
            return reply;
        }.apply(toxicInput, arguments);
    },
    generateShow: function generateShow() {
        return function (show) {
            return this.generateElement("toxic-show", {}, show);
        }.apply(toxicInput, arguments);
    },
    generateProperty: function generateProperty() {
        return function (property) {
            var prop = [];
            for (var each in property) {
                if (each != 'events' && each != 'option') {
                    var tmp = each + '=' + property[each];
                    prop.push(tmp);
                }
            }
            prop = prop.join(" ");
            return prop;
        }.apply(toxicInput, arguments);
    },
    generateEventButton: function generateEventButton() {
        return function (events) {
            if (!events || events.length < 1) {
                return "";
            }
            var ret = [];
            events.forEach(function (each) {
                if (each.type == 'more') {
                    var moreId = '';
                    if (each.num) {
                        var tmp = Math.trunc(Math.random() * 100000);
                        moreId = 'more-id=' + tmp;
                    }
                    ret.push('<button class="toxic-more" data-limit=' + (each.num || -1) + ' ' + moreId + '>' + (each.show || "more") + '</button>');
                }
                if (each.type == 'delete') {
                    var tmp = Math.trunc(Math.random() * 100000);
                    ret.push('<button class="toxic-delete" all-del=' + (each.allDel || false) + ' del-id=' + tmp + '>' + (each.show || "delete") + '</button>');
                }
            });

            return ret.join("");
        }.apply(toxicInput, arguments);
    },
    bindEvents: function bindEvents() {
        $(document).delegate(".toxic-more", "click", function (evt) {
            var parent = $(evt.target).parent();
            var grandParent = $(parent).parent();
            if ($(evt.target).attr("data-limit") > 1) {
                if ($(grandParent).find("[more-id=" + $(evt.target).attr("more-id") + "]").length >= $(evt.target).attr("data-limit")) {
                    console.warn(toxicInput.remind["ACHIEVE_MORE_LIMIT"]);
                    return toxicInput.remind["ACHIEVE_MORE_LIMIT"];
                }
            }
            $(parent).after(toxicInput.moreFilter($(parent).clone(true)));
        });
        $(document).delegate(".toxic-delete", 'click', function (evt) {
            var parent = $(evt.target).parent();
            var grandParent = $(parent).parent();
            if ($(grandParent).find("[del-id=" + $(evt.target).attr("del-id") + "]").length <= 1) {
                console.warn(toxicInput.remind["ACHIEVE_DELETE_LIMIT"]);
                return toxicInput.remind["ACHIEVE_DELETE_LIMIT"];
            }
            $(parent).remove();
        });
    },
    moreFilter: function moreFilter(clone) {
        var tmp = Math.trunc(Math.random() * 100000);
        //unique the radio
        $(clone).find("input:radio").attr("name", $(clone).find("input:radio").attr("name") + "-" + tmp);

        //remove value
        $(clone).find("input").val("");

        //remove checked
        $(clone).find("input:checked").attr("checked", false);
        return clone;
    }
};

toxicInput.start("test", toxicInput.data);