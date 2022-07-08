/*!
 DMXzone Date Picker
 Version: 2.0.7
 (c) 2021 DMXzone.com
 @build 2021-06-17 09:40:05
 */
dmx.Component("date-picker",{extends:"input",attributes:{name:{type:String,default:""},showdropdowns:{type:Boolean,default:!1},minyear:{type:Number,default:null},maxyear:{type:Number,default:null},opens:{type:String,default:"right"},dropsup:{type:Boolean,default:!1},showweeknumbers:{type:Boolean,default:!1},mindate:{type:String,default:""},maxdate:{type:String,default:""},format:{type:String,default:null},invaliddates:{type:Array,default:[]},"invaliddates-start":{type:String,default:"start"},"invaliddates-end":{type:String,default:"end"},customdates:{type:Array,default:[]},"customdates-start":{type:String,default:"start"},"customdates-end":{type:String,default:"end"},"customdates-class":{type:String,default:"class"},disableweekends:{type:Boolean,default:!1},direction:{type:String,default:"ltr"},weeklabel:{type:String,default:"W"},applylabel:{type:String,default:"Apply"},cancellabel:{type:String,default:"Cancel"},timepicker:{type:Boolean,default:!1},use24hours:{type:Boolean,default:!1},"minutes-increment":{type:Number,default:1},utc:{type:Boolean,default:!1}},events:{show:Event,hide:Event,apply:Event,cancel:Event},render:function(t){dmx.Component("form-element").prototype.render.call(this,t),this.createHiddenInput(),this.$node.removeAttribute("name"),this.$node.autocomplete="off",this.update({})},createHiddenInput:function(){this.input=document.createElement("input"),this.$node.name&&(this.input.name=this.$node.name),this.input.value=this.$node.value,this.input.type="hidden",this.$node.parentNode.insertBefore(this.input,this.$node)},update:function(t){if(this.props.name&&(this.input.name=this.props.name),JSON.stringify(t)!=JSON.stringify(this.props)){if(this.props.format||(this.props.format=this.props.timepicker?"L LT":"L"),$(this.$node).daterangepicker({singleDatePicker:!0,autoUpdateInput:!1,showWeekNumbers:!!this.props.showweeknumbers,showDropdowns:!!this.props.showdropdowns,minYear:this.props.minyear||void 0,maxYear:this.props.maxyear||void 0,opens:this.props.opens,drops:this.props.dropsup?"up":"down",minDate:this.formatDate(this.props.mindate),maxDate:this.formatDate(this.props.maxdate),locale:{format:this.props.format,direction:this.props.direction,weekLabel:this.props.weeklabel,applyLabel:this.props.applylabel,cancelLabel:this.props.cancellabel},buttonClasses:"",applyButtonClasses:"",cancelButtonClasses:"",isCustomDate:this.isCustomDate.bind(this),isInvalidDate:this.isInvalidDate.bind(this),timePicker:this.props.timepicker,timePicker24Hour:this.props.use24hours,timePickerIncrement:this.props["minutes-increment"]},this.updateValue.bind(this)),$(this.$node).on("change.daterangepicker",this.onChange.bind(this)),$(this.$node).on("apply.daterangepicker",this.onApply.bind(this)),$(this.$node).on("show.daterangepicker",this.dispatchEvent.bind(this,"show")),$(this.$node).on("hide.daterangepicker",this.dispatchEvent.bind(this,"hide")),$(this.$node).on("apply.daterangepicker",this.dispatchEvent.bind(this,"apply")),$(this.$node).on("cancel.daterangepicker",this.dispatchEvent.bind(this,"cancel")),this.daterangepicker=$(this.$node).data("daterangepicker"),t.value!==this.props.value){var e=this.props.value;"now"!=e&&"today"!=e||(e=this.props.utc?moment().toISOString():moment().format("YYYY-MM-DD HH:mm:ss")),this.$node.defaultValue=this.formatDate(e)||"",this.input.defaultValue=e||"",this.setValue(e)}t.disabled!=this.props.disabled&&(this.$node.disabled=this.props.disabled,this.input.disabled=this.props.disabled)}this.updateData()},updateData:function(t){t&&this.$node.dirty&&dmx.validate(this.$node),this.input.value!==this.data.value&&dmx.nextTick(function(){this.dispatchEvent("updated")},this),this.set("value",this.input.value),this.set("disabled",this.$node.disabled),this.$node.dirty&&(this.set("invalid",!this.$node.validity.valid),this.set("validationMessage",this.$node.validationMessage))},formatDate:function(t){if(t){if("now"==t||"today"==t)return moment().format(this.props.format);var e=moment(t);return e.isValid()?e.format(this.props.format):void 0}},isInvalidDate:function(e){if(this.props.disableweekends){var t=e.day();if(0===t||6===t)return!0}return this.props.invaliddates.some(function(t){return this.isInRange(e,t,this.props["invaliddates-start"],this.props["invaliddates-end"])},this)},isCustomDate:function(e){return this.props.customdates.filter(function(t){return this.isInRange(e,t,this.props["customdates-start"],this.props["customdates-end"])},this).map(function(t){return t[this.props["customdates-class"]]},this)},isInRange:function(t,e,s,i){return e[s]&&e[i]?t.isSameOrAfter(e[s])&&t.isSameOrBefore(e[i]):e[s]?t.isSameOrAfter(e[s]):!!e[i]&&t.isSameOrBefore(e[i])},onChange:function(t){moment(this.$node.value,this.props.format).isValid()||this.setValue("")},onApply:function(t){var e=this.data.value;this.updateValue(this.daterangepicker.startDate),this.input.value!==e&&dmx.nextTick(function(){this.dispatchEvent("changed")},this)},updateValue:function(t){this.setValue(this.props.utc?t.toISOString():t.format("YYYY-MM-DD HH:mm:ss"))},setValue:function(t){t&&(this.daterangepicker.setStartDate(this.formatDate(t)),this.daterangepicker.setEndDate(this.formatDate(t))),this.$node.value=this.formatDate(t)||"",this.input.value=t||"",this.updateData(!0)},format:function(t){return t?moment(t,"YYYY-MM-DD HH:mm:ss").format(this.props.format):""},destroy:function(){this.input.off(".daterangepicker")}}),function(){var e=daterangepicker.prototype.clickDate;daterangepicker.prototype.clickDate=function(t){if(!this.container.find(".in-range:not(.available)").length)return e.call(this,t)}}(),dmx.Component("date-range-picker",{extends:"date-picker",initialData:{start:"",end:""},attributes:{startdate:{type:String,default:""},enddate:{type:String,default:""},autoapply:{type:Boolean,default:!1},separator:{type:String,default:" - "},unlinked:{type:Boolean,default:!1},"maxspan-years":{type:Number,default:null},"maxspan-months":{type:Number,default:null},"maxspan-weeks":{type:Number,default:null},"maxspan-days":{type:Number,default:null}},methods:{setValue:function(t,e){this.setValue(t,e)}},createHiddenInput:function(){dmx.Component("date-picker").prototype.createHiddenInput.call(this),this.input1=document.createElement("input"),this.$node.name&&(this.input1.name=this.$node.name+"_start"),this.input1.value=this.props.startDate,this.input1.type="hidden",this.input2=document.createElement("input"),this.$node.name&&(this.input2.name=this.$node.name+"_end"),this.input2.value=this.props.startDate,this.input2.type="hidden",this.$node.parentNode.insertBefore(this.input1,this.$node),this.$node.parentNode.insertBefore(this.input2,this.$node)},update:function(t){if(this.props.name&&(this.input.name=this.props.name,this.input1.name=this.props.name+"_start",this.input2.name=this.props.name+"_end"),JSON.stringify(t)!=JSON.stringify(this.props)){if(this.props.format||(this.props.format=this.props.timepicker?"L LT":"L"),$(this.$node).daterangepicker({autoUpdateInput:!1,autoApply:!!this.props.autoapply,linkedCalendars:!this.props.unlinked,showWeekNumbers:!!this.props.showweeknumbers,showDropdowns:!!this.props.showdropdowns,minYear:this.props.minYear||void 0,maxYear:this.props.maxYear||void 0,opens:this.props.opens,drops:this.props.dropsup?"up":"down",minDate:this.formatDate(this.props.mindate),maxDate:this.formatDate(this.props.maxdate),maxSpan:this.props["maxspan-years"]||this.props["maxspan-months"]||this.props["maxspan-weeks"]||this.props["maxspan-days"]?{years:this.props["maxspan-years"],months:this.props["maxspan-months"],weeks:this.props["maxspan-weeks"],days:this.props["maxspan-days"]}:void 0,locale:{format:this.props.format,separator:this.props.separator,direction:this.props.direction,weekLabel:this.props.weeklabel,applyLabel:this.props.applylabel,cancelLabel:this.props.cancellabel},buttonClasses:"",applyButtonClasses:"",cancelButtonClasses:"",isCustomDate:this.isCustomDate.bind(this),isInvalidDate:this.isInvalidDate.bind(this),timePicker:this.props.timepicker,timePicker24Hour:this.props.use24hours,timePickerIncrement:this.props["minutes-increment"]},this.updateValue.bind(this)),$(this.$node).on("change.daterangepicker",this.onChange.bind(this)),$(this.$node).on("apply.daterangepicker",this.onApply.bind(this)),$(this.$node).on("show.daterangepicker",this.dispatchEvent.bind(this,"show")),$(this.$node).on("hide.daterangepicker",this.dispatchEvent.bind(this,"hide")),$(this.$node).on("apply.daterangepicker",this.dispatchEvent.bind(this,"apply")),$(this.$node).on("cancel.daterangepicker",this.dispatchEvent.bind(this,"cancel")),this.daterangepicker=$(this.$node).data("daterangepicker"),t.startdate!==this.props.startdate||t.enddate!==this.props.enddate){var e=this.props.startdate,s=this.props.enddate;"now"!=e&&"today"!=e||(e=this.props.utc?moment().toISOString():moment().format("YYYY-MM-DD HH:mm:ss")),"now"!=s&&"today"!=s||(s=this.props.utc?moment().toISOString():moment().format("YYYY-MM-DD HH:mm:ss")),this.$node.defaultValue=e&&s?this.formatDate(e)+this.props.separator+this.formatDate(s):"",this.input.defaultValue=e&&s?e+"/"+s:"",this.input1.defaultValue=e||"",this.input2.defaultValue=s||"",this.setValue(e,s)}t.disabled!=this.props.disabled&&(this.$node.disabled=this.props.disabled,this.input1.disabled=this.props.disabled,this.input2.disabled=this.props.disabled)}this.updateData()},updateData:function(t){this.input1.value===this.data.start&&this.input2.value===this.data.end||dmx.nextTick(function(){this.dispatchEvent("updated")},this),dmx.Component("date-picker").prototype.updateData.call(this,t)},onApply:function(t){var e=this.data.start,s=this.data.end;this.updateValue(this.daterangepicker.startDate,this.daterangepicker.endDate),this.input1.value===e&&this.input2.value===s||dmx.nextTick(function(){this.dispatchEvent("changed")},this)},updateValue:function(t,e){this.setValue(this.props.utc?t.toISOString():t.format("YYYY-MM-DD HH:mm:ss"),this.props.utc?e.toISOString():e.format("YYYY-MM-DD HH:mm:ss"))},setValue:function(t,e){t&&this.daterangepicker.setStartDate(this.formatDate(t)),e&&this.daterangepicker.setEndDate(this.formatDate(e)),this.$node.value=t&&e?this.formatDate(t)+this.props.separator+this.formatDate(e):"",this.input.value=t&&e?t+"/"+e:"",this.input1.value=t||"",this.input2.value=e||"",this.set("start",t),this.set("end",e),this.updateData(!0)}});
//# sourceMappingURL=../maps/dmxDatePicker.js.map
