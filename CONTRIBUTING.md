# Contributing

Thanks for considering contributing to this project. Ways you can help:

- [Create a pull request](https://help.github.com/articles/creating-a-pull-request)
- [Add an issue](https://github.com/braintree/credit-card-type/issues)

## Development

Clone this repo, then install the project's dependencies:

```
npm install
```

## Tests

```
npm test
```

### Test Stability, Quarantine & Remediation Policy

Flaky tests are any test that passes and fails intermittently without code changes (this could be due to things like timeouts, inconsistent return values, poor assertions, etc). Flaky tests erode confidence in the test suite and slow down development. This section defines how we detect, quarantine, and remediate them.

#### Detection

- **Automatic retries**: Jest unit tests can be configured to automatically retry on failure via `jest.retryTimes()`. Playwright integration tests (where applicable) have retries configured per-project. A test that fails once but passes on retry can be considered as potentially flaky.
- **Repeat failures**: If a test fails intermittently across multiple CI runs or PRs, it should be reported by opening a GitHub issue with the `flaky-test` label. Include the test name, file path, failure frequency, and any relevant error output.

#### Quarantine

When a test is confirmed flaky:

1. **Open a tracking issue** in GitHub Issues. Use the `flaky-test` label and include:
   - Test file path and test name
   - Observed failure rate and pattern (e.g., "fails ~10% of runs", "only in CI")
   - Stack trace or error message
2. **Skip the test** using `.skip` and add a comment referencing the tracking issue:

   ```javascript
   // Quarantined: flaky due to timing sensitivity (https://github.com/braintree/credit-card-type/issues/123)
   it.skip("should handle the edge case", function () {
     // ...
   });
   ```

   For `describe` blocks with multiple flaky tests, you may quarantine the entire block:

   ```javascript
   // Quarantined: intermittent failures under load (https://github.com/braintree/credit-card-type/issues/123)
   describe.skip("feature under investigation", function () {
     // ...
   });
   ```

3. **Skipped tests are excluded from coverage reporting.** Since quarantined tests do not execute, their associated source code is not counted toward coverage metrics. This is expected and acceptable while the test is in quarantine.

#### Remediation SLA

Quarantined tests must be remedied within **30 days** of being quarantined. Remediation means one of the following:

- **Fixed**: The root cause is identified and corrected, the `.skip` is removed, and the test passes reliably.
- **Deleted**: If the test is no longer valuable or the feature it covers has changed, delete the test and close the tracking issue.

If a quarantined test exceeds **14 days** without progress, it should be escalated and prioritized. Tests that remain skipped indefinitely are not acceptable.
