sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";

    return {

        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        addItemModel: function(){
            var data = {
                author: "",
                title: "",
                Price: 0,
                stock: 0
            }
            var oModel = new JSONModel();
            oModel.setData(data);
            return oModel;
        }

    };
});