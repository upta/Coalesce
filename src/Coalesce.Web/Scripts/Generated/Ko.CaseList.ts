
/// <reference path="../coalesce.dependencies.d.ts" />

// Knockout List View Model for: Case
// Auto Generated by IntelliTect.Coalesce

var baseUrl = baseUrl || '';

module ListViewModels {

    // Add an enum for all methods that are static and IQueryable
    export enum CaseDataSources {
            Default,
            GetAllOpenCases,
        }
    export class CaseList extends Coalesce.BaseListViewModel<CaseList, ViewModels.Case> {
        protected modelName = "Case";

        protected apiController = "/Case";

        public modelKeyName = "caseKey";
        public dataSources = CaseDataSources;
        public itemClass = ViewModels.Case;

        public query: {
            where?: string;
            caseKey?:number;
            title?:String;
            description?:String;
            openedAt?:moment.Moment;
            assignedToId?:number;
            reportedById?:number;
            severity?:String;
            status?:number;
            devTeamAssignedId?:number;
        } = null;

        // The custom code to run in order to pull the initial datasource to use for the collection that should be returned
        public dataSource: CaseDataSources = CaseDataSources.Default;

        public static coalesceConfig = new Coalesce.ListViewModelConfiguration<CaseList, ViewModels.Case>(Coalesce.GlobalConfiguration.listViewModel);
        public coalesceConfig = new Coalesce.ListViewModelConfiguration<CaseList, ViewModels.Case>(CaseList.coalesceConfig);


        // Call server method (GetAllOpenCasesCount)
        public getAllOpenCasesCount = (callback: () => void = null, reload: boolean = true) => {
            this.getAllOpenCasesCountIsLoading(true);
            this.getAllOpenCasesCountMessage('');
            this.getAllOpenCasesCountWasSuccessful(null);
            $.ajax({ method: "POST",
                     url: this.coalesceConfig.baseApiUrl() + "/Case/GetAllOpenCasesCount",
                     data: {  },
                     xhrFields: { withCredentials: true } })
            .done((data) => {
                this.getAllOpenCasesCountResultRaw(data.object);
                this.getAllOpenCasesCountMessage('');
                this.getAllOpenCasesCountWasSuccessful(true);
                this.getAllOpenCasesCountResult(data.object);
        
                if (reload) {
                    this.load(callback);
                } else if ($.isFunction(callback)) {
                    callback();
                }
            })
            .fail((xhr) => {
                var errorMsg = "Unknown Error";
                if (xhr.responseJSON && xhr.responseJSON.message) errorMsg = xhr.responseJSON.message;
                this.getAllOpenCasesCountWasSuccessful(false);
                this.getAllOpenCasesCountMessage(errorMsg);

                //alert("Could not call method getAllOpenCasesCount: " + errorMsg);
            })
            .always(() => {
                this.getAllOpenCasesCountIsLoading(false);
            });
        } 
        // Result of server method (GetAllOpenCasesCount) strongly typed in a observable.
        public getAllOpenCasesCountResult: KnockoutObservable<number> = ko.observable(null);
        // Raw result object of server method (GetAllOpenCasesCount) simply wrapped in an observable.
        public getAllOpenCasesCountResultRaw: KnockoutObservable<any> = ko.observable();
        // True while the server method (GetAllOpenCasesCount) is being called
        public getAllOpenCasesCountIsLoading: KnockoutObservable<boolean> = ko.observable(false);
        // Error message for server method (GetAllOpenCasesCount) if it fails.
        public getAllOpenCasesCountMessage: KnockoutObservable<string> = ko.observable(null);
        // True if the server method (GetAllOpenCasesCount) was successful.
        public getAllOpenCasesCountWasSuccessful: KnockoutObservable<boolean> = ko.observable(null);
        // Presents a series of input boxes to call the server method (GetAllOpenCasesCount)
        public getAllOpenCasesCountUi = (callback: () => void = null) => {
            this.getAllOpenCasesCount(callback);
        }
        // Presents a modal with input boxes to call the server method (GetAllOpenCasesCount)
        public getAllOpenCasesCountModal = (callback: () => void = null) => {
            this.getAllOpenCasesCountUi(callback);
        }
        

        // Call server method (RandomizeDatesAndStatus)
        public randomizeDatesAndStatus = (callback: () => void = null, reload: boolean = true) => {
            this.randomizeDatesAndStatusIsLoading(true);
            this.randomizeDatesAndStatusMessage('');
            this.randomizeDatesAndStatusWasSuccessful(null);
            $.ajax({ method: "POST",
                     url: this.coalesceConfig.baseApiUrl() + "/Case/RandomizeDatesAndStatus",
                     data: {  },
                     xhrFields: { withCredentials: true } })
            .done((data) => {
                this.randomizeDatesAndStatusResultRaw(data.object);
                this.randomizeDatesAndStatusMessage('');
                this.randomizeDatesAndStatusWasSuccessful(true);
                this.randomizeDatesAndStatusResult(data.object);
        
                if (reload) {
                    this.load(callback);
                } else if ($.isFunction(callback)) {
                    callback();
                }
            })
            .fail((xhr) => {
                var errorMsg = "Unknown Error";
                if (xhr.responseJSON && xhr.responseJSON.message) errorMsg = xhr.responseJSON.message;
                this.randomizeDatesAndStatusWasSuccessful(false);
                this.randomizeDatesAndStatusMessage(errorMsg);

                //alert("Could not call method randomizeDatesAndStatus: " + errorMsg);
            })
            .always(() => {
                this.randomizeDatesAndStatusIsLoading(false);
            });
        } 
        // Result of server method (RandomizeDatesAndStatus) strongly typed in a observable.
        public randomizeDatesAndStatusResult: KnockoutObservable<any> = ko.observable(null);
        // Raw result object of server method (RandomizeDatesAndStatus) simply wrapped in an observable.
        public randomizeDatesAndStatusResultRaw: KnockoutObservable<any> = ko.observable();
        // True while the server method (RandomizeDatesAndStatus) is being called
        public randomizeDatesAndStatusIsLoading: KnockoutObservable<boolean> = ko.observable(false);
        // Error message for server method (RandomizeDatesAndStatus) if it fails.
        public randomizeDatesAndStatusMessage: KnockoutObservable<string> = ko.observable(null);
        // True if the server method (RandomizeDatesAndStatus) was successful.
        public randomizeDatesAndStatusWasSuccessful: KnockoutObservable<boolean> = ko.observable(null);
        // Presents a series of input boxes to call the server method (RandomizeDatesAndStatus)
        public randomizeDatesAndStatusUi = (callback: () => void = null) => {
            this.randomizeDatesAndStatus(callback);
        }
        // Presents a modal with input boxes to call the server method (RandomizeDatesAndStatus)
        public randomizeDatesAndStatusModal = (callback: () => void = null) => {
            this.randomizeDatesAndStatusUi(callback);
        }
        

        // Call server method (GetAllOpenCases)
        public getAllOpenCases = (callback: () => void = null, reload: boolean = true) => {
            this.getAllOpenCasesIsLoading(true);
            this.getAllOpenCasesMessage('');
            this.getAllOpenCasesWasSuccessful(null);
            $.ajax({ method: "POST",
                     url: this.coalesceConfig.baseApiUrl() + "/Case/GetAllOpenCases",
                     data: {  },
                     xhrFields: { withCredentials: true } })
            .done((data) => {
                this.getAllOpenCasesResultRaw(data.object);
                this.getAllOpenCasesMessage('');
                this.getAllOpenCasesWasSuccessful(true);
                if (this.getAllOpenCasesResult()){
                    Coalesce.KnockoutUtilities.RebuildArray(this.getAllOpenCasesResult, data.object, 'caseKey', ViewModels.Case, this, true);
                }
        
                if (reload) {
                    this.load(callback);
                } else if ($.isFunction(callback)) {
                    callback();
                }
            })
            .fail((xhr) => {
                var errorMsg = "Unknown Error";
                if (xhr.responseJSON && xhr.responseJSON.message) errorMsg = xhr.responseJSON.message;
                this.getAllOpenCasesWasSuccessful(false);
                this.getAllOpenCasesMessage(errorMsg);

                //alert("Could not call method getAllOpenCases: " + errorMsg);
            })
            .always(() => {
                this.getAllOpenCasesIsLoading(false);
            });
        } 
        // Result of server method (GetAllOpenCases) strongly typed in a observable.
        public getAllOpenCasesResult: KnockoutObservableArray<ViewModels.Case> = ko.observableArray([]);
        // Raw result object of server method (GetAllOpenCases) simply wrapped in an observable.
        public getAllOpenCasesResultRaw: KnockoutObservable<any> = ko.observable();
        // True while the server method (GetAllOpenCases) is being called
        public getAllOpenCasesIsLoading: KnockoutObservable<boolean> = ko.observable(false);
        // Error message for server method (GetAllOpenCases) if it fails.
        public getAllOpenCasesMessage: KnockoutObservable<string> = ko.observable(null);
        // True if the server method (GetAllOpenCases) was successful.
        public getAllOpenCasesWasSuccessful: KnockoutObservable<boolean> = ko.observable(null);
        // Presents a series of input boxes to call the server method (GetAllOpenCases)
        public getAllOpenCasesUi = (callback: () => void = null) => {
            this.getAllOpenCases(callback);
        }
        // Presents a modal with input boxes to call the server method (GetAllOpenCases)
        public getAllOpenCasesModal = (callback: () => void = null) => {
            this.getAllOpenCasesUi(callback);
        }
        

        // Call server method (GetCaseSummary)
        // Returns a list of summary information about Cases
        public getCaseSummary = (callback: () => void = null, reload: boolean = true) => {
            this.getCaseSummaryIsLoading(true);
            this.getCaseSummaryMessage('');
            this.getCaseSummaryWasSuccessful(null);
            $.ajax({ method: "POST",
                     url: this.coalesceConfig.baseApiUrl() + "/Case/GetCaseSummary",
                     data: {  },
                     xhrFields: { withCredentials: true } })
            .done((data) => {
                this.getCaseSummaryResultRaw(data.object);
                this.getCaseSummaryMessage('');
                this.getCaseSummaryWasSuccessful(true);
                if (!this.getCaseSummaryResult()){
                    this.getCaseSummaryResult(new ViewModels.CaseSummary());
                }
                this.getCaseSummaryResult().loadFromDto(data.object);
        
                if (reload) {
                    this.load(callback);
                } else if ($.isFunction(callback)) {
                    callback();
                }
            })
            .fail((xhr) => {
                var errorMsg = "Unknown Error";
                if (xhr.responseJSON && xhr.responseJSON.message) errorMsg = xhr.responseJSON.message;
                this.getCaseSummaryWasSuccessful(false);
                this.getCaseSummaryMessage(errorMsg);

                //alert("Could not call method getCaseSummary: " + errorMsg);
            })
            .always(() => {
                this.getCaseSummaryIsLoading(false);
            });
        } 
        // Result of server method (GetCaseSummary) strongly typed in a observable.
        public getCaseSummaryResult: KnockoutObservable<ViewModels.CaseSummary> = ko.observable(null);
        // Raw result object of server method (GetCaseSummary) simply wrapped in an observable.
        public getCaseSummaryResultRaw: KnockoutObservable<any> = ko.observable();
        // True while the server method (GetCaseSummary) is being called
        public getCaseSummaryIsLoading: KnockoutObservable<boolean> = ko.observable(false);
        // Error message for server method (GetCaseSummary) if it fails.
        public getCaseSummaryMessage: KnockoutObservable<string> = ko.observable(null);
        // True if the server method (GetCaseSummary) was successful.
        public getCaseSummaryWasSuccessful: KnockoutObservable<boolean> = ko.observable(null);
        // Presents a series of input boxes to call the server method (GetCaseSummary)
        public getCaseSummaryUi = (callback: () => void = null) => {
            this.getCaseSummary(callback);
        }
        // Presents a modal with input boxes to call the server method (GetCaseSummary)
        public getCaseSummaryModal = (callback: () => void = null) => {
            this.getCaseSummaryUi(callback);
        }
        

        protected createItem = (newItem?: any, parent?: any) => new ViewModels.Case(newItem, parent);

        constructor() {
            super();
        }
    }

    export namespace CaseList {
        // Classes for use in method calls to support data binding for input for arguments
    }
}