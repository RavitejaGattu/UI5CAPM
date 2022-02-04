sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "xom/com/cmms/sapui/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, models) {
        "use strict";

        return Controller.extend("xom.com.cmms.sapui.controller.View1", {
            onInit: function () {
                var AddItem = models.addItemModel();
                this.getOwnerComponent().setModel(AddItem, "AddItemModel");
                this.oCAPMModel = this.getOwnerComponent().getModel("CAPM");
                this.oCAPMModel.read("/Books",{
                    // urlParameters : "$top=5&$skip=0&$inlinecount=allpages",
                    success: function(oData){
                        console.log(oData);
                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(oData.results);
                        this.getOwnerComponent().setModel(oModel, "BooksModel");
                    }.bind(this),
                    error: function(oError){
                        console.log(oError);
                    }
                });
            },
            onAdd: function(oEvent){
                var oView = this.getView();
                if(!this.oAddDialog){
                    this.oAddDialog =  sap.ui.xmlfragment("xom.com.cmms.sapui.fragments.AddDialog", this);
                    oView.addDependent(this.oAddDialog);
                }
                this.oAddDialog.open();
            },

            AddConfirm: function(){
                var oPayload = this.getOwnerComponent().getModel("AddItemModel").getData();
                this.oCAPMModel.create("/Books", oPayload, {
                    success: function(oData){
                        this.oAddDialog.close();
                        sap.m.MessageToast.show("Successfully Added");
                        var AddItem = models.addItemModel();
                        this.getOwnerComponent().setModel(AddItem, "AddItemModel");
                    }.bind(this),
                    error: function(oError){
                        console.log(oError);
                    }
                });
            },
            onClose: function(){
                this.oAddDialog.close();
                var AddItem = models.addItemModel();
                this.getOwnerComponent().setModel(AddItem, "AddItemModel");
            },
            onListItemPress: function(oEvent){
                var oView = this.getView();
                if(!this.oEditDialog){
                    this.oEditDialog =  sap.ui.xmlfragment("xom.com.cmms.sapui.fragments.EditDialog", this);
                    oView.addDependent(this.oEditDialog);
                }
                this.oEditDialog.open();
                var sPath = oEvent.getSource().getBindingContext("BooksModel").getPath()
                this.oEditDialog.bindElement({
                    path:  sPath,
                    model: "BooksModel"
                });
            },
            UpdateConfirm: function(oEvent){
                var sPath = oEvent.getSource().getBindingContext("BooksModel").getPath();
                sPath = sPath.split("/");
                var oData = this.getOwnerComponent().getModel("BooksModel").getData()[sPath[1]];
                var oPayload = {
                    ID: oData.ID,
                    title: oData.title,
                    descr: oData.descr,
                    stock: oData.stock,
                    Price: oData.Price
                }
                this.oCAPMModel.update("/Books", oPayload, {
                    success: function(oData){
                        this.oEditDialog.close();
                        sap.m.MessageToast.show("Updated Added");
                    }.bind(this),
                    error: function(oError){
                        console.log(oError);
                    }
                });
            },
            onCloseEditDialog: function(){
                this.oEditDialog.close();
            }
        });
    });
