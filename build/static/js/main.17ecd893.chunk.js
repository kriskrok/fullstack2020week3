(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(14),c=t.n(r),l=t(4),o=t(2),i=t(3),m=t.n(i),d="/api/persons",f=function(){return m.a.get(d)},s=function(e){return m.a.post(d,e)},b=function(e,n){return m.a.put("".concat(d,"/").concat(e),n)},h=function(e){return m.a.delete("".concat(d,"/").concat(e))},g=(t(37),function(e){var n=e.errorMessage;return null===n?null:u.a.createElement("div",{className:"error"},n)}),E=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"notification"},n)},v=function(e){var n=e.contact,t=e.onClick;return u.a.createElement("li",null,n.name," ",n.number,u.a.createElement("button",{onClick:function(){return t(n.id)}},"delete"))},p=function(e){var n=e.filter,t=e.handleChange;return u.a.createElement("form",null,u.a.createElement("div",null,"filter shown with: ",u.a.createElement("input",{value:n,onChange:t})))},C=function(e){return u.a.createElement("form",{onSubmit:e.handleSubmit},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:e.newAcquaintance.name,onChange:e.nameChangeHandler})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:e.newAcquaintance.number,onChange:e.numberChangeHandler})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add")))},w=function(e){var n=e.filtered,t=e.handleClick;return u.a.createElement("ul",{style:{listStyleType:"none"}},n.map((function(e){return u.a.createElement(v,{key:e.id,contact:e,onClick:t})})))},j=function(){var e=Object(a.useState)(""),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)([]),i=Object(o.a)(c,2),m=i[0],d=i[1],v=Object(a.useState)({name:"",number:"",id:""}),j=Object(o.a)(v,2),O=j[0],k=j[1],S=Object(a.useState)(null),y=Object(o.a)(S,2),T=y[0],A=y[1],H=Object(a.useState)(null),q=Object(o.a)(H,2),N=q[0],D=q[1];Object(a.useEffect)((function(){f().then((function(e){d(e.data)}))}),[]);var F=m.some((function(e){return e.name===O.name})),J=0===t.length?m:m.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return u.a.createElement(u.a.Fragment,null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(E,{message:N}),u.a.createElement(g,{errorMessage:T}),u.a.createElement(p,{filter:t,handleChange:function(e){return r(e.target.value)}}),u.a.createElement("h3",null,"add a new"),u.a.createElement(C,{handleSubmit:function(e){e.preventDefault();var n={name:O.name,number:O.number};if(F){if(window.confirm("".concat(O.name," is already added to phonebook, replace the old number with a new one?"))){var t=m.find((function(e){return e.name===O.name})),a=Object(l.a)({},t,{number:O.number}),u=t.id;b(u,a).then((function(e){console.log(e),d(m.map((function(n){return n.id!==u?n:e.data}))),D("Updated ".concat(O.name)),setTimeout((function(){D(null)}),5e3)})).catch((function(e){A("Failed to update ".concat(O.name,". Perhaps you ought to go fishing?")),setTimeout((function(){A(null)}),5e3)}))}}else s(n).then((function(e){d(m.concat(e.data))})),D("Added ".concat(O.name)),setTimeout((function(){D(null)}),5e3);k(Object(l.a)({},O,{name:"",number:"",id:""}))},numberChangeHandler:function(e){console.log("numberChange",e.target.value),k(Object(l.a)({},O,{number:e.target.value}))},newAcquaintance:O,nameChangeHandler:function(e){console.log("nameChange",e.target.value),k(Object(l.a)({},O,{name:e.target.value}))}}),u.a.createElement("h3",null,"Numbers"),u.a.createElement(w,{filtered:J,handleClick:function(e){var n=m.find((function(n){return n.id===e})).name;window.confirm("Delete ".concat(n," ?"))&&(h(e),d(m.filter((function(n){return n.id!==e}))),D("Removed ".concat(n)),setTimeout((function(){D(null)}),5e3))}}))};c.a.render(u.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.17ecd893.chunk.js.map