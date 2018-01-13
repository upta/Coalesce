
/// <reference path="../coalesce.dependencies.d.ts" />

// Knockout View Model for: Case
// Generated by IntelliTect.Coalesce

module ViewModels {

	export class Case extends Coalesce.BaseViewModel
    {
        protected modelName = "Case";
        protected primaryKeyName: keyof this = "caseKey";
        protected modelDisplayName = "Case";

        protected apiController = "/Case";
        protected viewController = "/Case";

        /** Behavioral configuration for all instances of Case. Can be overidden on each instance via instance.coalesceConfig. */
        public static coalesceConfig: Coalesce.ViewModelConfiguration<Case>
            = new Coalesce.ViewModelConfiguration<Case>(Coalesce.GlobalConfiguration.viewModel);

        /** Behavioral configuration for the current Case instance. */
        public coalesceConfig: Coalesce.ViewModelConfiguration<this>
            = new Coalesce.ViewModelConfiguration<Case>(Case.coalesceConfig);
    
        /** 
            The namespace containing all possible values of this.dataSource.
        */
        public dataSources: typeof ListViewModels.CaseDataSources = ListViewModels.CaseDataSources;
    

        /** The Primary key for the Case object */
        public caseKey: KnockoutObservable<number> = ko.observable(null);
        public title: KnockoutObservable<string> = ko.observable(null);
        public description: KnockoutObservable<string> = ko.observable(null);
        public openedAt: KnockoutObservable<moment.Moment> = ko.observable(moment());
        public assignedToId: KnockoutObservable<number> = ko.observable(null);
        public assignedTo: KnockoutObservable<ViewModels.Person> = ko.observable(null);
        public reportedById: KnockoutObservable<number> = ko.observable(null);
        public reportedBy: KnockoutObservable<ViewModels.Person> = ko.observable(null);
        public attachment: KnockoutObservable<string> = ko.observable(null);
        public severity: KnockoutObservable<string> = ko.observable(null);
        public status: KnockoutObservable<number> = ko.observable(null);
        /** Text value for enumeration Status */
        public statusText: KnockoutComputed<string> = ko.pureComputed(() => {
            for(var i = 0; i < this.statusValues.length; i++){
                if (this.statusValues[i].id == this.status()){
                    return this.statusValues[i].value;
                }
            }
        });
        public caseProducts: KnockoutObservableArray<ViewModels.CaseProduct> = ko.observableArray([]);
        public products: KnockoutObservableArray<ViewModels.Product> = ko.observableArray([]);
        public devTeamAssignedId: KnockoutObservable<number> = ko.observable(null);
        public devTeamAssigned: KnockoutObservable<ViewModels.DevTeam> = ko.observable(null);

       
        /** Display text for AssignedTo */
        public assignedToText: KnockoutComputed<string>;
        /** Display text for ReportedBy */
        public reportedByText: KnockoutComputed<string>;
        /** Display text for DevTeamAssigned */
        public devTeamAssignedText: KnockoutComputed<string>;
        

        /** Url for a table view of all members of collection CaseProducts for the current object. */
        public caseProductsListUrl: KnockoutComputed<string> = ko.computed(
            () => this.coalesceConfig.baseViewUrl() + '/CaseProduct/Table?filter.caseId=' + this.caseKey(),
            null, { deferEvaluation: true }
        );

        /** Pops up a stock editor for object assignedTo */
        public showAssignedToEditor: (callback?: any) => void;
        /** Pops up a stock editor for object reportedBy */
        public showReportedByEditor: (callback?: any) => void;
        /** Pops up a stock editor for object devTeamAssigned */
        public showDevTeamAssignedEditor: (callback?: any) => void;


        /** Array of all possible names & values of enum status */
        public statusValues: EnumValue[] = [ 
            { id: 0, value: 'Open' },
            { id: 1, value: 'In Progress' },
            { id: 2, value: 'Resolved' },
            { id: 3, value: 'Closed No Solution' },
            { id: 4, value: 'Cancelled' },
        ];


        /** 
            Load the ViewModel object from the DTO. 
            @param force: Will override the check against isLoading that is done to prevent recursion. False is default.
            @param allowCollectionDeletes: Set true when entire collections are loaded. True is the default. In some cases only a partial collection is returned, set to false to only add/update collections.
        */
        public loadFromDto = (data: any, force: boolean = false, allowCollectionDeletes: boolean = true): void => {
            if (!data || (!force && this.isLoading())) return;
            this.isLoading(true);
            // Set the ID 
            this.myId = data.caseKey;
            this.caseKey(data.caseKey);
            // Load the lists of other objects
            if (data.caseProducts != null) {
                // Merge the incoming array
                Coalesce.KnockoutUtilities.RebuildArray(this.caseProducts, data.caseProducts, 'caseProductId', CaseProduct, this, allowCollectionDeletes);
                // Add many-to-many collection
                let objs: any[] = [];
                $.each(data.caseProducts, (index, item) => {
                    if (item.product){
                        objs.push(item.product);
                    }
                });
                Coalesce.KnockoutUtilities.RebuildArray(this.products, objs, 'productId', Product, this, allowCollectionDeletes);
            } 
            // Objects are loaded first so that they are available when the IDs get loaded.
            // This handles the issue with populating select lists with correct data because we now have the object.
            if (!data.assignedTo) { 
                if (data.assignedToId != this.assignedToId()) {
                    this.assignedTo(null);
                }
            } else {
                if (!this.assignedTo()){
                    this.assignedTo(new Person(data.assignedTo, this));
                } else {
                    this.assignedTo().loadFromDto(data.assignedTo);
                }
                if (this.parent instanceof Person && this.parent !== this.assignedTo() && this.parent.personId() == this.assignedTo().personId())
                {
                    this.parent.loadFromDto(data.assignedTo, null, false);
                }
            }
            if (!data.reportedBy) { 
                if (data.reportedById != this.reportedById()) {
                    this.reportedBy(null);
                }
            } else {
                if (!this.reportedBy()){
                    this.reportedBy(new Person(data.reportedBy, this));
                } else {
                    this.reportedBy().loadFromDto(data.reportedBy);
                }
                if (this.parent instanceof Person && this.parent !== this.reportedBy() && this.parent.personId() == this.reportedBy().personId())
                {
                    this.parent.loadFromDto(data.reportedBy, null, false);
                }
            }
            if (!data.devTeamAssigned) { 
                if (data.devTeamAssignedId != this.devTeamAssignedId()) {
                    this.devTeamAssigned(null);
                }
            } else {
                if (!this.devTeamAssigned()){
                    this.devTeamAssigned(new DevTeam(data.devTeamAssigned, this));
                } else {
                    this.devTeamAssigned().loadFromDto(data.devTeamAssigned);
                }
            }

            // The rest of the objects are loaded now.
            this.title(data.title);
            this.description(data.description);
            if (data.openedAt == null) this.openedAt(null);
            else if (this.openedAt() == null || this.openedAt().valueOf() != new Date(data.openedAt).getTime()){
                this.openedAt(moment(new Date(data.openedAt)));
            }
            this.assignedToId(data.assignedToId);
            this.reportedById(data.reportedById);
            this.attachment(data.attachment);
            this.severity(data.severity);
            this.status(data.status);
            this.devTeamAssignedId(data.devTeamAssignedId);
            if (this.coalesceConfig.onLoadFromDto()){
                this.coalesceConfig.onLoadFromDto()(this as any);
            }
            this.isLoading(false);
            this.isDirty(false);
    
            if (this.coalesceConfig.validateOnLoadFromDto()) this.validate();
        };
    
        /** Saves this object into a data transfer object to send to the server. */
        public saveToDto = (): any => {
            var dto: any = {};
            dto.caseKey = this.caseKey();

            dto.title = this.title();
            dto.description = this.description();
            if (!this.openedAt()) dto.openedAt = null;
            else dto.openedAt = this.openedAt().format('YYYY-MM-DDTHH:mm:ssZZ');
            dto.assignedToId = this.assignedToId();
            if (!dto.assignedToId && this.assignedTo()) {
                dto.assignedToId = this.assignedTo().personId();
            }
            dto.reportedById = this.reportedById();
            if (!dto.reportedById && this.reportedBy()) {
                dto.reportedById = this.reportedBy().personId();
            }
            dto.attachment = this.attachment();
            dto.severity = this.severity();
            dto.status = this.status();
            dto.devTeamAssignedId = this.devTeamAssignedId();
            if (!dto.devTeamAssignedId && this.devTeamAssigned()) {
                dto.devTeamAssignedId = this.devTeamAssigned().devTeamId();
            }

            return dto;
        }
    
        /**
            Loads any child objects that have an ID set, but not the full object.
            This is useful when creating an object that has a parent object and the ID is set on the new child.
        */
        public loadChildren = (callback?: () => void): void => {
            var loadingCount = 0;
            // See if this.assignedTo needs to be loaded.
            if (this.assignedTo() == null && this.assignedToId() != null){
                loadingCount++;
                var assignedToObj = new Person();
                assignedToObj.load(this.assignedToId(), () => {
                    loadingCount--;
                    this.assignedTo(assignedToObj);
                    if (loadingCount == 0 && typeof(callback) == "function"){
                        callback();
                    }
                });
            }
            // See if this.reportedBy needs to be loaded.
            if (this.reportedBy() == null && this.reportedById() != null){
                loadingCount++;
                var reportedByObj = new Person();
                reportedByObj.load(this.reportedById(), () => {
                    loadingCount--;
                    this.reportedBy(reportedByObj);
                    if (loadingCount == 0 && typeof(callback) == "function"){
                        callback();
                    }
                });
            }
            if (loadingCount == 0 && typeof(callback) == "function"){
                callback();
            }
        };
        
        public setupValidation = (): void => {
            if (this.errors !== null) return;
            this.errors = ko.validation.group([
                this.title.extend({ required: {params: true, message: "You must enter a title for the case."} }),
                this.openedAt.extend({ moment: { unix: true } }),
            ]);
            this.warnings = ko.validation.group([
            ]);
        }
    
        // Computed Observable for edit URL
        public editUrl: KnockoutComputed<string> = ko.pureComputed(() => {
            return this.coalesceConfig.baseViewUrl() + this.viewController + "/CreateEdit?id=" + this.caseKey();
        });

        constructor(newItem?: object, parent?: Coalesce.BaseViewModel | ListViewModels.CaseList){
            super(parent);
            this.baseInitialize();
            var self = this;
            self.myId;

            // Create computeds for display for objects
			self.assignedToText = ko.pureComputed(function()
			{   // If the object exists, use the text value. Otherwise show 'None'
				if (self.assignedTo() && self.assignedTo().name()) {
					return self.assignedTo().name().toString();
				} else {
					return "None";
				}
			});
			self.reportedByText = ko.pureComputed(function()
			{   // If the object exists, use the text value. Otherwise show 'None'
				if (self.reportedBy() && self.reportedBy().name()) {
					return self.reportedBy().name().toString();
				} else {
					return "None";
				}
			});
			self.devTeamAssignedText = ko.pureComputed(function()
			{   // If the object exists, use the text value. Otherwise show 'None'
				if (self.devTeamAssigned() && self.devTeamAssigned().name()) {
					return self.devTeamAssigned().name().toString();
				} else {
					return "None";
				}
			});

    


            self.showAssignedToEditor = function(callback: any) {
                if (!self.assignedTo()) {
                    self.assignedTo(new Person());
                }
                self.assignedTo().showEditor(callback)
            };
            self.showReportedByEditor = function(callback: any) {
                if (!self.reportedBy()) {
                    self.reportedBy(new Person());
                }
                self.reportedBy().showEditor(callback)
            };

            // This stuff needs to be done after everything else is set up.
            self.title.subscribe(self.autoSave);
            self.description.subscribe(self.autoSave);
            self.openedAt.subscribe(self.autoSave);
            self.assignedToId.subscribe(self.autoSave);
            self.assignedTo.subscribe(self.autoSave);
            self.reportedById.subscribe(self.autoSave);
            self.reportedBy.subscribe(self.autoSave);
            self.attachment.subscribe(self.autoSave);
            self.severity.subscribe(self.autoSave);
            self.status.subscribe(self.autoSave);
            self.devTeamAssignedId.subscribe(self.autoSave);
            self.devTeamAssigned.subscribe(self.autoSave);
        
            self.products.subscribe<KnockoutArrayChange<Product>[]>(changes => {
                for (var i in changes){
                    var change = changes[i];
                    self.autoSaveCollection(
                        change.status, 
                        this.caseProducts, 
                        CaseProduct, 
                        'caseId',
                        'productId',
                        change.value.productId()
                    );
                }
            }, null, "arrayChange");
            
            if (newItem) {
                self.loadFromDto(newItem, true);
            }
        }
    }





    export namespace Case {
        export enum StatusEnum {
            Open = 0,
            InProgress = 1,
            Resolved = 2,
            ClosedNoSolution = 3,
            Cancelled = 4,
        };

        // Classes for use in method calls to support data binding for input for arguments
    }
}