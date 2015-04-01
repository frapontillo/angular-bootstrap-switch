Contributing
============

## <a name="report-issue"></a> Report an Issue

If you have found an issue with `angular-bootstrap-switch` and want to report it, **please make a live demo** first 
so that the misbehaviour can be reproduced. If you don't know how to do it, simply fork and edit 
**[this plnkr template](http://plnkr.co/edit/SWy8YmrVi8IsTa4FuqSZ)**.

Issues with no live demo can get automatically closed.

Also, make sure to:
  - look for **similar issues** in the repository bug tracker
  - specify the `angular-bootstrap-switch` **version** showing the issue
  - check if the issue was already fixed in an `alpha`/`beta` release or in the latest commit of the `develop` branch
  (commits on the `develop` branch don't generate a single file in the `build` directory, you need to check against 
  files in the `src` directory)
  - clearly describe how the plugin should be changed to address your request

## <a name="submit-pr"></a> Submit a Pull Request

If you want to submit a Pull Request, please follow the same rules as in [Report an Issue](#report-issue), plus all the
**[submission guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#submitting-a-pull-request)**,
**[coding rules](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#rules)** and 
**[commit message rules](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)** that apply to the 
main angular.js project.

**IMPORTANT**: Before submitting your PR, write new tests for it (where applicable) and test everything by running:

```shell
$ grunt test-travis
```

Previously existing tests *should* never break.
