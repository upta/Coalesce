﻿/// <reference path="../coalesce.dependencies.d.ts" />

class EnumValue {
    id: number;
    value: string;
}

module Coalesce {
    interface ComputedConfiguration<T> extends KnockoutComputed<T> {
        raw: () => T
    };

    class CoalesceConfiguration<T> {
        protected parentConfig: CoalesceConfiguration<any>;

        constructor(parentConfig?: CoalesceConfiguration<any>) {
            this.parentConfig = parentConfig;
        }

        protected prop = <TProp>(name: string): ComputedConfiguration<TProp> => {
            var k = "_" + name;
            var raw = this[k] = ko.observable<TProp>(null);
            var computed: ComputedConfiguration<TProp>;
            computed = ko.computed<TProp>({
                deferEvaluation: true, // This is essential. If not deferred, the observable will be immediately evaluated without parentConfig being set.
                read: () => {
                    var rawValue = raw();
                    if (rawValue !== null) return rawValue;
                    return this.parentConfig && this.parentConfig[name] ? this.parentConfig[name]() : null
                },
                write: raw
            }) as any as ComputedConfiguration<TProp>;
            computed.raw = raw;
            return computed;
        }

        public baseApiUrl = this.prop<string>("baseApiUrl");
        public baseViewUrl = this.prop<string>("baseViewUrl");
        public showFailureAlerts = this.prop<boolean>("showFailureAlerts");

        public onFailure = this.prop<(object: T, message: string) => void>("onFailure");
        public onStartBusy = this.prop<(object: T) => void>("onStartBusy");
        public onFinishBusy = this.prop<(object: T) => void>("onFinishBusy");
    }

    export class ViewModelConfiguration<T extends BaseViewModel<T>> extends CoalesceConfiguration<T> {
        public saveTimeoutMs = this.prop<number>("saveTimeoutMs");
        public autoSaveEnabled = this.prop<boolean>("autoSaveEnabled");
        public autoSaveCollectionsEnabled = this.prop<boolean>("autoSaveCollectionsEnabled");
        public showBusyWhenSaving = this.prop<boolean>("showBusyWhenSaving");
        public loadResponseFromSaves = this.prop<boolean>("loadResponseFromSaves");

        public onLoadFromDto = this.prop<(object: T) => void>("onLoadFromDto");

        public raw = (name: keyof ViewModelConfiguration<T>) => {
            return this["_" + name];
        }
    }

    export class ListViewModelConfiguration<T extends BaseListViewModel<T, TItem>, TItem extends BaseViewModel<TItem>> extends CoalesceConfiguration<T> {
        public raw = (name: keyof ListViewModelConfiguration<T, TItem>) => {
            return this["_" + name];
        }
    }

    class RootConfig extends CoalesceConfiguration<any> {
        public viewModel = new ViewModelConfiguration<BaseViewModel<any>>(this);
        public listViewModel = new ListViewModelConfiguration<BaseListViewModel<any, BaseViewModel<any>>, BaseViewModel<any>>(this);
    }

    export var GlobalConfiguration = new RootConfig();
    GlobalConfiguration.baseApiUrl("/api");
    GlobalConfiguration.baseViewUrl("");
    GlobalConfiguration.showFailureAlerts(true);
    GlobalConfiguration.showFailureAlerts(true);
    GlobalConfiguration.onFailure((obj, message) => alert(message));
    GlobalConfiguration.onStartBusy(obj => Coalesce.Utilities.showBusy());
    GlobalConfiguration.onFinishBusy(obj => Coalesce.Utilities.hideBusy());

    GlobalConfiguration.viewModel.saveTimeoutMs(500);
    GlobalConfiguration.viewModel.autoSaveEnabled(true);
    GlobalConfiguration.viewModel.autoSaveCollectionsEnabled(true);
    GlobalConfiguration.viewModel.showBusyWhenSaving(false);
    GlobalConfiguration.viewModel.loadResponseFromSaves(true);


    export class BaseViewModel<T extends BaseViewModel<T>> {

        protected modelName: string;
        protected modelDisplayName: string;
        protected primaryKeyName: string;

        protected apiController: string;
        protected viewController: string;

        // Generic definitions of properties that are generated for each implementation of BaseViewModel with more specific typing.
        public dataSources: any;
        public dataSource: any;
        public coalesceConfig: ViewModelConfiguration<BaseViewModel<T>> = null;

        /** Stack for number of times loading has been called. */
        protected loadingCount: number = 0;
        /** Stores the return value of setInterval for automatic save delays. */
        protected saveTimeout: number = 0;

     
        /** Callbacks to call after a save. */
        protected saveCallbacks: { (self: T): void; }[] = [];
        
        /**
            String that will be passed to the server when loading and saving that allows for data trimming via C# Attributes & loading control via IIncludable.
        */
        public includes = "";

        /**
            If true, the busy indicator is shown when loading.
            @deprecated Use coalesceConfig.showBusyWhenSaving instead.
        */
        get showBusyWhenSaving() { return this.coalesceConfig.showBusyWhenSaving() }
        set showBusyWhenSaving(value) { this.coalesceConfig.showBusyWhenSaving(value) }

        /**
            Whether or not alerts should be shown when loading fails.
            @deprecated Use coalesceConfig.showFailureAlerts instead.
        */
        get showFailureAlerts() { return this.coalesceConfig.showFailureAlerts() }
        set showFailureAlerts(value) { this.coalesceConfig.showFailureAlerts(value) }

        /** Parent of this object, if this object was loaded as part of a hierarchy. */
        public parent = null;
        /** Parent of this object, if this object was loaded as part of list of objects. */
        public parentCollection = null;
        /**
            Primary Key of the object.
            @deprecated Use the strongly-typed property of the key for this model whenever possible. This property will be removed once Coalesce supports composite keys.
        */
        public myId: any = 0;

        /** Dirty Flag. Set when a value on the model changes. Reset when the model is saved or reloaded. */
        public isDirty: KnockoutObservable<boolean> = ko.observable(false);
        /** Contains the error message from the last failed call to the server. */
        public errorMessage: KnockoutObservable<string> = ko.observable(null);
        /** ValidationIssues returned from the server when trying to persist data */
        public validationIssues: any = ko.observableArray([]);

        /**
            If this is true, all changes will be saved automatically.
            @deprecated Use coalesceConfig.autoSaveEnabled instead.
        */
        get isSavingAutomatically() { return this.coalesceConfig.autoSaveEnabled() }
        set isSavingAutomatically(value) { this.coalesceConfig.autoSaveEnabled(value) }


        /** Flag to use to determine if this item is shown. Provided for convenience. */
        public isVisible: KnockoutObservable<boolean> = ko.observable(false);
        /** Flag to use to determine if this item is expanded. Provided for convenience. */
        public isExpanded: KnockoutObservable<boolean> = ko.observable(false);
        /** Flag to use to determine if this item is selected. Provided for convenience. */
        public isSelected: KnockoutObservable<boolean> = ko.observable(false);
        /** Flag to use to determine if this item is checked. Provided for convenience. */
        public isChecked: KnockoutObservable<boolean> = ko.observable(false);
        /** Flag to use to determine if this item is being edited. Only for convenience. */
        public isEditing: KnockoutObservable<boolean> = ko.observable(false);

        /** Toggles the isExpanded flag. Use with a click binding for a button. */
        public toggleIsExpanded = () => this.isExpanded(!this.isExpanded());

        /** Toggles the isEditing flag. Use with a click binding for a button. */
        public toggleIsEditing = () => this.isEditing(!this.isEditing());

        /** Toggles the isSelected flag. Use with a click binding for a button. */
        public toggleIsSelected = () => this.isSelected(!this.isSelected());

        // Sets isSelected(true) on this object and clears on the rest of the items in the parentCollection.
        // Returns true to bubble additional click events.
        public selectSingle = () => {
            if (this.parentCollection()) {
                $.each(this.parentCollection(), (i, obj) => {
                    obj.isSelected(false);
                });
            }
            this.isSelected(true);
            return true; // Allow other click events
        };


        /** List of errors found during validation. Any errors present will prevent saving. */
        public errors: KnockoutValidationErrors = null;
        /** List of warnings found during validation. Saving is still allowed with warnings present. */
        public warnings: KnockoutValidationErrors = null;

        /** True if the object is currently saving. */
        public isSaving: KnockoutObservable<boolean> = ko.observable(false);
        /** Internal count of child objects that are saving. */
        protected savingChildCount: KnockoutObservable<number> = ko.observable(0);

        /** 
            Returns true if there are no client-side validation issues.
            Saves will be prevented if this returns false.
        */
        public isValid = () => this.errors().length == 0;

        /**
            Triggers any validation messages to be shown, and returns a bool that indicates if there are any validation errors.
        */
        public validate = () => {
            this.errors.showAllMessages();
            this.warnings.showAllMessages();
            return this.isValid();
        };


        /** Deletes the object after a confirmation box. */
        public deleteItemWithConfirmation = (callback?: () => void, message?: string) => {
            if (typeof message != 'string') {
                message = "Delete this item?";
            }
            if (confirm(message)) {
                this.deleteItem(callback);
            }
        };

        // True if the object is loading.
        public isLoading: KnockoutObservable<boolean> = ko.observable(false);
        // True once the data has been loaded.
        public isLoaded: KnockoutObservable<boolean> = ko.observable(false);
        // URL to a stock editor for this object.
        public editUrl: KnockoutComputed<string>;


        /**
          * Loads this object from a data transfer object received from the server.
          * @param force - Will override the check against isLoading that is done to prevent recursion.
          * @param allowCollectionDeletes - Set true when entire collections are loaded. True is the default.
                In some cases only a partial collection is returned, set to false to only add/update collections.
        */
        public loadFromDto: (data: any, force?: boolean, allowCollectionDeletes?: boolean) => void;

        /** Saves this object into a data transfer object to send to the server. */
        public saveToDto: () => any;

        // Loads any children that have an ID but have not been loaded. 
        // This is useful when creating an object that has a parent object and the ID is set on the new child.
        public loadChildren: (callback?: () => void) => void;


        /** Returns true if the current object, or any of its children, are saving. */
        public isThisOrChildSaving = ko.computed(() => {
            if (this.isSaving()) return true;
            if (this.savingChildCount() > 0) return true;
            return false;
        });

        // Handle children that are saving.
        // Internally used member to count the number of saving children.
        protected onSavingChildChange = (isSaving: boolean) => {
            if (isSaving)
                this.savingChildCount(this.savingChildCount() + 1);
            else
                this.savingChildCount(this.savingChildCount() - 1);

            if (this.parent && $.isFunction(this.parent.onSavingChildChange)) {
                this.parent.onSavingChildChange(isSaving);
            }
        };

        // Saves the object to the server and then calls the callback.
        public save = (callback?: (self: T) => void) => {
            if (!this.isLoading()) {
                if (this.validate()) {
                    if (this.coalesceConfig.showBusyWhenSaving()) this.coalesceConfig.onStartBusy()(this);
                    this.isSaving(true);

                    var url = this.coalesceConfig.baseApiUrl() + this.apiController + "/Save?includes=" + this.includes + '&dataSource=';
                    if (typeof this.dataSource === "string") url += this.dataSource;
                    else url += this.dataSources[this.dataSource];

                    return $.ajax({ method: "POST", url: url, data: this.saveToDto(), xhrFields: { withCredentials: true } })
                        .done((data) => {
                            this.isDirty(false);
                            this.errorMessage('');
                            if (this.coalesceConfig.loadResponseFromSaves()) {
                                this.loadFromDto(data.object, true);
                            }
                            // The object is now saved. Call any callback.
                            for (var i in this.saveCallbacks) {
                                this.saveCallbacks[i](this as any as T);
                            }
                        })
                        .fail((xhr) => {
                            var errorMsg = "Unknown Error";
                            var validationIssues = [];
                            if (xhr.responseJSON && xhr.responseJSON.message) errorMsg = xhr.responseJSON.message;
                            if (xhr.responseJSON && xhr.responseJSON.validationIssues) validationIssues = xhr.responseJSON.validationIssues;
                            this.errorMessage(errorMsg);
                            this.validationIssues(validationIssues);
                            // If an object was returned, load that object.
                            if (xhr.responseJSON && xhr.responseJSON.object) {
                                this.loadFromDto(xhr.responseJSON.object, true);
                            }
                            if (this.coalesceConfig.showFailureAlerts())
                                this.coalesceConfig.onFailure()(this, "Could not save the item: " + errorMsg);
                        })
                        .always(() => {
                            this.isSaving(false);
                            if ($.isFunction(callback)) {
                                callback(this as any as T);
                            }
                            if (this.coalesceConfig.showBusyWhenSaving()) this.coalesceConfig.onFinishBusy()(this);
                        });
                }
                else {
                    // If validation fails, we still want to try and load any child objects which may have just been set.
                    // Normally, we get these from the result of the save.
                    this.loadChildren();
                }
            }
        }


        // Loads the object from the server based on the id specified. Once complete calls the callback.
        public load = (id: any, callback?: (self: T) => void) => {
            if (!id) {
                id = this[this.primaryKeyName]();
            }
            if (id) {
                this.isLoading(true);
                this.coalesceConfig.onStartBusy()(this);

                var url = this.coalesceConfig.baseApiUrl() + this.apiController + "/Get/" + id + '?includes=' + this.includes + '&dataSource=';
                if (typeof this.dataSource === "string") url += this.dataSource;
                else url += this.dataSources[this.dataSource];

                return $.ajax({ method: "GET", url: url, xhrFields: { withCredentials: true } })
                    .done((data) => {
                        this.loadFromDto(data, true);
                        this.isLoaded(true);
                        if ($.isFunction(callback)) callback(this as any as T);
                    })
                    .fail(() => {
                        this.isLoaded(false);
                        if (this.coalesceConfig.showFailureAlerts())
                            this.coalesceConfig.onFailure()(this, "Could not load " + this.modelName + " with ID = " + id);
                    })
                    .always(() => {
                        this.coalesceConfig.onFinishBusy()(this);
                        this.isLoading(false);
                    });
            }
        };

        // Deletes the object without confirmation.
        public deleteItem = (callback?: (self: T) => void) => {
            var currentId = this[this.primaryKeyName]();
            if (currentId) {
                return $.ajax({ method: "POST", url: this.coalesceConfig.baseApiUrl() + this.apiController + "/Delete/" + currentId, xhrFields: { withCredentials: true } })
                    .done((data) => {
                        if (data) {
                            this.errorMessage('');

                            // Remove it from the parent collection
                            if (this.parentCollection && this.parent) {
                                this.parent.isLoading(true);
                                this.parentCollection.splice(this.parentCollection().indexOf(this), 1);
                                this.parent.isLoading(false);
                            }
                        } else {
                            this.errorMessage(data.message);
                        }
                    })
                    .fail(() => {
                        if (this.coalesceConfig.showFailureAlerts())
                            this.coalesceConfig.onFailure()(this, "Could not delete the item");
                    })
                    .always(() => {
                        if ($.isFunction(callback)) {
                            callback(this as any as T);
                        }
                    });
            } else {
                // No ID has been assigned yet, just remove it.
                if (this.parentCollection && this.parent) {
                    this.parent.isLoading(true);
                    this.parentCollection.splice(this.parentCollection().indexOf(this), 1);
                    this.parent.isLoading(false);
                }
                if ($.isFunction(callback)) {
                    callback(this as any as T);
                }
            }
        };

        // Saves a many-to-many collection change. This is done automatically and doesn't need to be called.
        protected saveCollection = (propertyName: string, childId: any, operation: string) => {
            var method = (operation === "added" ? "AddToCollection" : "RemoveFromCollection");
            var currentId = this[this.primaryKeyName]();
            return $.ajax({ method: "POST", url: this.coalesceConfig.baseApiUrl() + this.apiController + '/' + method + '?id=' + currentId + '&propertyName=' + propertyName + '&childId=' + childId, xhrFields: { withCredentials: true } })
                .done((data) => {
                    this.errorMessage('');
                    this.loadFromDto(data.object, true);
                    // The object is now saved. Call any callback.
                    for (var i in this.saveCallbacks) {
                        this.saveCallbacks[i](this as any as T);
                    }
                })
                .fail((xhr) => {
                    var errorMsg = "Unknown Error";
                    var validationIssues = [];
                    if (xhr.responseJSON && xhr.responseJSON.message) errorMsg = xhr.responseJSON.message;
                    if (xhr.responseJSON && xhr.responseJSON.validationIssues) errorMsg = xhr.responseJSON.validationIssues;
                    this.errorMessage(errorMsg);
                    this.validationIssues(validationIssues);

                    if (this.coalesceConfig.showFailureAlerts())
                        this.coalesceConfig.onFailure()(this, "Could not save the item: " + errorMsg);
                })
                .always(() => {
                    // Nothing here yet.
                });
        };

        // Saves many to many collections if autoSaveEnabled is true.
        protected autoSaveCollection = (property: string, id: any, changeStatus: string) => {
            if (!this.isLoading() && this.coalesceConfig.autoSaveCollectionsEnabled()) {
                // TODO: Eventually Batch saves for many-to-many collections.
                if (changeStatus === 'added') {
                    this.saveCollection(property, id, "added");
                } else if (changeStatus === 'deleted') {
                    this.saveCollection(property, id, "deleted");
                }
            }
        };

        
        /** Register a callback to be called when a save is done. */
        public onSave = (fn) => {
            if ($.isFunction(fn)) this.saveCallbacks.push(fn);
        };

        // Saves the object is coalesceConfig.autoSaveEnabled is true.
        protected autoSave = () => {
            if (!this.isLoading()) {
                this.isDirty(true);
                if (this.coalesceConfig.autoSaveEnabled()) {
                    // Batch saves.
                    if (this.saveTimeout) clearTimeout(this.saveTimeout);
                    this.saveTimeout = setTimeout(() => {
                        this.saveTimeout = 0;
                        // If we have a save in progress, wait...
                        if (this.isSaving()) {
                            this.autoSave();
                        } else if (this.coalesceConfig.autoSaveEnabled()) {
                            this.save();
                        }
                    }, this.coalesceConfig.saveTimeoutMs());
                }
            }
        }

        // Supply methods to pop up a modal editor
        public showEditor = (callback?: any) => {
            // Close any existing modal
            $('#modal-dialog').modal('hide');
            // Get new modal content
            this.coalesceConfig.onStartBusy()(this);
            return $.ajax({
                method: "GET",
                url: this.coalesceConfig.baseViewUrl() + this.viewController + '/EditorHtml',
                data: { simple: true },
                xhrFields: { withCredentials: true }
            })
                .done((data) => {
                    // Add to DOM
                    Coalesce.ModalHelpers.setupModal('Edit ' + this.modelDisplayName, data, true, false);
                    // Data bind
                    var lastValue = this.coalesceConfig.autoSaveEnabled.raw();
                    this.coalesceConfig.autoSaveEnabled(false);
                    ko.applyBindings(this, document.getElementById("modal-dialog"));
                    this.coalesceConfig.autoSaveEnabled(lastValue);
                    // Show the dialog
                    $('#modal-dialog').modal('show');
                    // Make the callback when the form closes.
                    $("#modal-dialog").on("hidden.bs.modal", () => {
                        if ($.isFunction(callback)) callback(this);
                    });
                })
                .always(() => {
                    this.coalesceConfig.onFinishBusy()(this);
                });
        }

        constructor() {
            // Handles setting the parent savingChildChange
            this.isSaving.subscribe((newValue: boolean) => {
                if (this.parent && $.isFunction(this.parent.onSavingChildChange)) {
                    this.parent.onSavingChildChange(newValue);
                }
            })
        }
    }

    export class BaseListViewModel<T, TItem extends BaseViewModel<any>> {

        protected modelName: string;

        protected apiController: string;

        public dataSources: any;
        public modelKeyName: string;
        public itemClass: typeof BaseViewModel;

        public coalesceConfig: ListViewModelConfiguration<BaseListViewModel<T, TItem>, TItem> = null;

        // The custom code to run in order to pull the initial datasource to use for the object that should be returned
        public dataSource: any;

        // Query string to limit the list of items.
        public queryString: string = "";
        // Object that is passed as the query parameters.
        public query: any = null;

        // String the represents the child object to load 
        public includes: string = "";

        // Deprecated. Use coalesceConfig.showFailureAlerts instead.
        // Whether or not alerts should be shown when loading fails.
        get showFailureAlerts() { return this.coalesceConfig.showFailureAlerts() }
        set showFailureAlerts(value) { this.coalesceConfig.showFailureAlerts(value) }

        // List of items. This the main collection.
        public items: KnockoutObservableArray<TItem> = ko.observableArray([]);
        // Load the list.
        public load = (callback?: any) => {
                this.coalesceConfig.onStartBusy()(this);
                if (this.query) {
                    this.queryString = $.param(this.query);
                }
                this.isLoading(true);

                var url = this.coalesceConfig.baseApiUrl() + this.apiController + "/List?" + this.queryParams();

                if (this.queryString !== null && this.queryString !== "") url += "&" + this.queryString;

                return $.ajax({ method: "GET",
                         url: url,
                        xhrFields: { withCredentials: true } })
                .done((data) => {

                    Coalesce.KnockoutUtilities.RebuildArray(this.items, data.list, this.modelKeyName, this.itemClass, this, true);
                    $.each(this.items(), (_, model) => {
                        model.includes = this.includes;
                    });
                    this.count(data.list.length);
                    this.totalCount(data.totalCount);
                    this.pageCount(data.pageCount);
                    this.page(data.page);
                    this.message(data.message);
                    this.isLoaded(true);
                    if ($.isFunction(callback)) callback(this);
                })
                .fail((xhr) => {
                    var errorMsg = "Unknown Error";
                    if (xhr.responseJSON && xhr.responseJSON.message) errorMsg = xhr.responseJSON.message;
                    this.message(errorMsg);
                    this.isLoaded(false);

                    if (this.coalesceConfig.showFailureAlerts())
                        this.coalesceConfig.onFailure()(this, "Could not get list of " + this.modelName + " items: " + errorMsg);
                })
                .always(() => {
                    this.coalesceConfig.onFinishBusy()(this);
                    this.isLoading(false);
                });
        };
        protected queryParams = (pageSize?: number) => {
            return $.param({
                includes: this.includes,
                page: this.page(),
                pageSize: pageSize || this.pageSize(),
                search: this.search(),
                orderBy: this.orderBy(),
                orderByDescending: this.orderByDescending(),
                dataSource: this.dataSources[this.dataSource]
            });
        }
        protected createItem: (newItem?: any, parent?: any) => TItem;
        // Adds a new item to the collection.
        public addNewItem = () => {
            var item = this.createItem();
            this.items.push(item);
            return item;
        };;
        // Deletes an item.
        public deleteItem = (item: TItem) => {
            item.deleteItem();
        };;
        // True if the collection is loading.
        public isLoading: KnockoutObservable<boolean> = ko.observable(false);
        // Gets the count of items without getting all the items. Data put into count.
        public getCount = (callback?: any) => {
            this.coalesceConfig.onStartBusy()(this);
            if (this.query) {
                this.queryString = $.param(this.query);
            }
            return $.ajax({
                method: "GET",
                url: this.coalesceConfig.baseApiUrl() + this.apiController + "/Count?" + "dataSource="
                    + this.dataSources[this.dataSource] + "&" + this.queryString,
                xhrFields: { withCredentials: true } })
            .done((data) => {
                this.count(data);
                if ($.isFunction(callback)) callback();
            })
            .fail(() => {
                if (this.coalesceConfig.showFailureAlerts())
                    this.coalesceConfig.onFailure()(this, "Could not get count of " + this.modelName + " items.");
            })
            .always(() => {
                this.coalesceConfig.onFinishBusy()(this);
            });
        };
        // The result of getCount() or the total on this page.
        public count: KnockoutObservable<number> = ko.observable(null);
        // Total count of items, even ones that are not on the page.
        public totalCount: KnockoutObservable<number> = ko.observable(null);
        // Total page count
        public pageCount: KnockoutObservable<number> = ko.observable(null);
        // Page number. This can be set to get a new page.
        public page: KnockoutObservable<number> = ko.observable(1);
        // Number of items on a page.
        public pageSize: KnockoutObservable<number> = ko.observable(10);
        // If a load failed, this is a message about why it failed.
        public message: KnockoutObservable<string> = ko.observable(null);
        // Search criteria for the list. This can be exposed as a text box for searching.
        public search: KnockoutObservable<string> = ko.observable("");

        // If there is another page, this is true.
        public nextPageEnabled = ko.computed(() => this.page() < this.pageCount());

        // If there is a previous page, this is true.
        public previousPageEnabled = ko.computed(() => this.page() > 1);

        // Gets the next page.
        public nextPage = () => {
            if (this.nextPageEnabled()) {
                this.page(this.page() + 1);
            }
        };
        // Gets the previous page.
        public previousPage = () => {
            if (this.previousPageEnabled()) {
                this.page(this.page() - 1);
            }
        };

        // Control order of results
        // Set to field name to order by ascending.
        public orderBy: KnockoutObservable<string> = ko.observable("");
        // Set to field name to order by descending.
        public orderByDescending: KnockoutObservable<string> = ko.observable("");
        // Set to field name to toggle ordering, ascending, descending, none.
        public orderByToggle = (field: string) => {
            if (this.orderBy() == field && !this.orderByDescending()) {
                this.orderBy('');
                this.orderByDescending(field);
            }
            else if (!this.orderBy() && this.orderByDescending() == field) {
                this.orderBy('');
                this.orderByDescending('');
            }
            else {
                this.orderBy(field);
                this.orderByDescending('');
            }
        };

        // True once the data has been loaded.
        public isLoaded: KnockoutObservable<boolean> = ko.observable(false);

        // Gets a URL to download a CSV for the current list with all elements.
        public downloadAllCsvUrl: KnockoutComputed<string> = ko.computed<string>(() => {
            var url = this.coalesceConfig.baseApiUrl() + this.apiController + "/CsvDownload?" + this.queryParams(10000);
            return url;
        }, null, { deferEvaluation: true });
        // Starts an upload of a CSV file
        public csvUploadUi = (callback?: any) => {
            // Remove the form if it exists.
            $('#csv-upload').remove();
            // Add the form to the page to take the input
            $('body')
                .append('<form id="csv-upload" display="none"></form>'); 
            $('#csv-upload')
                .attr("action", this.coalesceConfig.baseApiUrl() + this.apiController + "/CsvUpload").attr("method", "post")
                .append('<input type="file" style="visibility: hidden;" name="file"/>');

            // Set up the click callback.
            $('#csv-upload input[type=file]').change(() => {
                // Get the files
                var fileInput = $('#csv-upload input[type=file]')[0] as any;
                var file = fileInput.files[0];
                if (file) {
                    var formData = new FormData();
                    formData.append('file', file);
                    this.coalesceConfig.onStartBusy()(this);
                    this.isLoading(true);
                    $.ajax({
                        url: this.coalesceConfig.baseApiUrl() + this.apiController + "/CsvUpload",
                        data: formData,
                        processData: false,
                        contentType: false,
                        type: 'POST'
                    } as any)
                    .done((data) => {
                        this.isLoading(false);
                        if ($.isFunction(callback)) callback(data);
                    })
                    .fail((data) => {
                        if (this.coalesceConfig.showFailureAlerts())
                            this.coalesceConfig.onFailure()(this, "CSV Upload Failed");
                    })
                    .always(() => {
                        this.load();
                        this.coalesceConfig.onFinishBusy()(this);
                    });
                }
                // Remove the form
                $('#csv-upload').remove();
            });
            // Click on the input box
            $('#csv-upload input[type=file]').click();
        };

        private loadTimeout: number = 0;
        // reloads the page after a slight delay (100ms default) to ensure that all changes are made.
        private delayedLoad = (milliseconds?: number) => {
            if(this.loadTimeout) {
                clearTimeout(this.loadTimeout);
            }
            this.loadTimeout = setTimeout(() => {
                this.loadTimeout = 0;
                this.load();
            }, milliseconds || 100);
        }


        public constructor() {
            var searchTimeout: number = 0;

            this.pageSize.subscribe(() => {
                if (this.isLoaded()) {
                    this.load();
                }
            });
            this.page.subscribe(() => {
                if (this.isLoaded() && !this.isLoading()) {
                    this.delayedLoad(300);
                }
            });
            this.search.subscribe(() => {
                if (searchTimeout) {
                    clearTimeout(searchTimeout);
                }
                searchTimeout = setTimeout(() => {
                    searchTimeout = 0;
                    this.load();
                }, 300);
            });
            this.orderBy.subscribe(() => { if (this.isLoaded()) this.delayedLoad(); });
            this.orderByDescending.subscribe(() => { if (this.isLoaded()) this.delayedLoad(); });
        }
    }
}