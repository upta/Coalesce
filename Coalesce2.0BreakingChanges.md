## Breaking Changes in Coalesce "2.0":

* NPM Packages: Upgraded to `gulp-typescript` 3.0 and `typescript` 2.3. Breaking changes may be found at http://dev.ivogabe.com/gulp-typescript-3/.
** You will need to add/update references to `"gulp-typescript": "^3.1.6"` and `"typescript": "~2.3.2"` in your package.json.

* TypeScript Global variable `baseUrl` is gone. Replaced by `Coalesce.GlobalConfiguration.baseApiUrl` and `baseViewUrl`.
* TypeScript gloabl variable `saveTimeoutInMs` is gone. Replaced by `Coalesce.GlobalConfiguration.saveTimeoutMs`.
* Various knockout bindings that took a `saveImmediately` supplimentary binding no longer do so. 
** The `saveImmediately` standalone binding still exists, but will only function if the currently scoped binding object is a Coalesce `BaseViewModel<T>`. This is beacuse the binding must access the model's `coalesceConfig` to set the save timeout, since `saveTimeoutInMs` is no longer a global.
* Knockout binding `select2AjaxText`: no longer takes `object` as a complimentary binding in order to compute the url - now takes `url` instead to be consistent with other select2 bindings.
* (Non-breaking, but very signigicant): References to Scripts/Coalesce/coalesce.*.ts files are now located in Scripts/coalesce.depdenencies.d.ts. This file is not regenerated and may be modified at will, but must remain in its location relative to Scripts/Generated.
* Scripts/intellitect.references.d.ts is now named viewmodels.generated.d.ts. This is the file that should be referenced in your custom typescript files in order to consume Coalesce generated typescript files.
* Scripts/Coalesce/intellitect.* files are now named Scripts/Coalesce/coalesce.*
* Namespace intellitect.utilities is now Coalesce.Utilities
* Namespace intellitect.webApi is now Coalesce.ModalHelpers

## Deprications in Coalesce "2.0":

* `BaseViewModel<T>.autoSaveEnabled`: Use `BaseViewModel<T>.coalesceConfig.autoSaveEnabled` observable instead.
* `BaseViewModel<T>.showBusyWhenSaving`: Use `BaseViewModel<T>.coalesceConfig.showBusyWhenSaving` observable instead.
* `BaseViewModel<T>.showFailureAlerts`: Use `BaseViewModel<T>.coalesceConfig.showFailureAlerts` observable instead.




