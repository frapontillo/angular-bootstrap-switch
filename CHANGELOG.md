CHANGELOG
=========

## 0.4.1 (2015-06-15)

- Update to `angular` 1.4.0
- Add test support for IE
- Enable indeterminate state
- Enable generic true value (not just strings)

## 0.4.0 (2015-04-13)

- Alpha to stable with no changes

## 0.4.0-alpha.2 (2015-04-01)

- Add new parameters
  - `switch-inverse`
  - `switch-readonly`
- Fix for radio switches
- Handle models using getterSetter option
- `'use strict'` to module-level only
- Update to `angular` 1.3.15

## 0.4.0-alpha.1 (2014-11-21)

- Update to `bootstrap-switch` 3.2.2
- Update to `angular` 1.3.3
- Add new parameters
  - `switch-label-width`
  - `switch-handle-width`
- Multiple bug fixes
- Code optimization improvements

## 0.3.0 (2014-06-27)

- Update to `bootstrap-switch` 3.0.2
- Update to `angular` 1.2.18
- Support for `jquery` > 1.9.0
- Promotion to stable

## 0.3.0-alpha.2 (2014-03-30)

- Update to `bootstrap-switch` 3.0.0 stable
- Update to `angular` 1.2.15
- **bsSwitch**: add `switch-wrapper` property

## 0.3.0-alpha.1 (2014-02-22)

### Breaking changes

This is an alpha release based on the `HEAD` of the `bootstrap-switch` `3.0` branch. Therefore, specifications
have slightly changed in order to reflect the original API. Use in production environment is discouraged, since the API
may change unexpectedly.

- Handle text:
  - Use `switch-on-text` instead of `switch-on-label`
  - Use `switch-off-text` instead of `switch-off-label`
- Handle color:
  - Use `switch-on-color` instead of `switch-on`
  - Use `switch-off-color` instead of `switch-off`

- When setting `switch-icon`, `bootstrap-switch~2` used to inject an `<i>` tag with a predefined `icon` class,
while it now injects a `<span>` tag without any additional classes other than the ones you specify.

### Other changes

- Update to `angular` 1.2.13
- Update to `bootstrap-switch#3.0.0`
- Update to `jquery` 2.1.0

## 0.2.1 (2013-12-31)

- Update to `angular` 1.2.6
- Update to `bootstrap-switch` 2.0.0
- **bsSwitch**: fix for `type` enforcing
- **bsSwitchSpec**: fix tests
- Add `CHANGELOG.md`

## 0.2.0 (2013-12-16)

- Improve build process
- **bsSwitchSpec**: fix stop test-travis
- **bsSwitch**: fix `$apply already in progress`, default active state
- Update to `angular` 1.2.5
- Update to `bootstrap-switch` 1.9.0
- Add example page
- Add contribution guidelines
- **bsSwitchSpec**: Add test file (24 tests)
- **bsSwitch**: fix class size (thanks to [@bardusco](https://github.com/bardusco))

## 2.0.0 (2013-09-24)

- Update to `angular` 1.2.0-rc.1
- Update to `develop` branch of `bootstrap-switch`
- **bsSwitch**: handle undefined `ngModel`

## 0.1.0 (2013-08-12)

- First release
